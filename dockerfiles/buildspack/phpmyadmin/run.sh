#!/bin/sh
set -x

exec php -S 0.0.0.0:80 -t /www/ \
    -d upload_max_filesize=$PHP_UPLOAD_MAX_FILESIZE \
    -d post_max_size=$PHP_UPLOAD_MAX_FILESIZE \
    -d max_input_vars=$PHP_MAX_INPUT_VARS