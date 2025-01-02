#!/bin/bash

# Crea un directorio para los certificados si no existe
mkdir -p /etc/ssl/certs /etc/ssl/private

# Genera un certificado autofirmado
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/apache-selfsigned.key \
  -out /etc/ssl/certs/apache-selfsigned.crt \
  -subj "/C=US/ST=California/L=San Francisco/O=My Company/OU=My Department/CN=localhost"
