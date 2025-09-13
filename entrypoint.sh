#!/bin/bash

# Crear directorio y archivo SQLite si es necesario y no existen
if grep -q '^DB_CONNECTION=sqlite' /var/www/html/.env; then
  if [ ! -d /var/www/html/database ]; then
    mkdir -p /var/www/html/database
    chown devuser:devgroup /var/www/html/database
  fi
  if [ ! -f /var/www/html/database/database.sqlite ]; then
    touch /var/www/html/database/database.sqlite
    chown devuser:devgroup /var/www/html/database/database.sqlite
    chmod 664 /var/www/html/database/database.sqlite
  fi
fi

# Setup a cron schedule
echo "* * * * * cd /var/www/html && /usr/local/bin/php artisan schedule:run >> /var/log/cron.log 2>&1
# This extra line makes it a valid cron" > /scheduler.txt

crontab /scheduler.txt

cron &
apache2-foreground
