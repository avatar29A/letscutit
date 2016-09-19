FROM registry.ng.bluemix.net/mellody/nginx

MAINTAINER Glebov Boris "bglebov@mellody.cloud"

RUN apt-get update && apt-get install -y \
    wget tar bzip2 curl \
    mysql-client \
    php5-fpm php5-cli php5-json php5-mcrypt php5-mysql php5-gd php5-curl \
    --no-install-recommends  && rm -rf /var/lib/apt/lists/*

RUN curl --location https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.tar.gz | tar xzf - \
 && mv phpMyAdmin* /www \
 && rm -rf /www/js/jquery/src/ /www/examples /www/po/

COPY config.inc.php /www/
COPY run.sh /run.sh
RUN chmod u+rwx /run.sh

RUN echo "<?php\n\$cfg['blowfish_secret'] = '`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1`';" > /www/config.secret.inc.php

EXPOSE 80

ENV PHP_UPLOAD_MAX_FILESIZE=64M \
    PHP_MAX_INPUT_VARS=2000

CMD "/run.sh"