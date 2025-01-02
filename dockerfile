FROM php:8.2-apache

# Argumento para UID/GID del host
ARG uid=1000
ARG gid=1000

# Crear usuario/grupo y asignar permisos
RUN groupadd -g ${gid} devgroup && useradd -G www-data,root -u ${uid} -g ${gid} -d /home/devuser devuser

# Instalar dependencias del sistema, incluyendo la versión correcta de Node.js y npm
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get install --no-install-recommends -y \
    cron git zip sudo libonig-dev unzip libicu-dev libbz2-dev \
    libpng-dev libjpeg-dev libfreetype6-dev libzip-dev g++ wget \
    libxfixes3 xdg-utils chromium \
    && rm -rf /var/lib/apt/lists/*

# Configurar e instalar extensiones de PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install -j$(nproc) gd bz2 intl iconv bcmath opcache calendar mbstring pdo_mysql zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN mkdir -p /home/devuser/.composer && chown -R devuser:devgroup /home/devuser/.composer

# Configurar Apache y PHP
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf && \
    a2enmod rewrite ssl

# Configuración de PHP
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini" && \
    sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 128M/g' $PHP_INI_DIR/php.ini && \
    sed -i 's/post_max_size = 8M/post_max_size = 256M/g' $PHP_INI_DIR/php.ini

# Copiar los scripts y ajustar permisos
COPY entrypoint.sh /entrypoint.sh
COPY generate_cert.sh /usr/local/bin/generate_cert.sh
RUN chmod +x /entrypoint.sh /usr/local/bin/generate_cert.sh && /usr/local/bin/generate_cert.sh

# Copiar la app y ajustar permisos
COPY . /var/www/html/
RUN chown -R devuser:devgroup /var/www/html && chmod -R 775 /var/www/html/storage

# Configurar SSL y habilitar sitio
COPY vhost-ssl.conf /etc/apache2/sites-available/default-ssl.conf
USER root
RUN a2ensite default-ssl.conf

# Establecer el entrypoint
ENTRYPOINT ["/entrypoint.sh"]
