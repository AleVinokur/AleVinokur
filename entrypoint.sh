#!/bin/bash

# Setup a cron schedule
echo "* * * * * cd /var/www/html && /usr/local/bin/php artisan schedule:run >> /var/log/cron.log 2>&1
# This extra line makes it a valid cron" > /scheduler.txt

crontab /scheduler.txt

cron &
apache2-foreground
