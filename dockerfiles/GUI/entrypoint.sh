#!/bin/bash
set -e

#if [ "$1" = 'npm' ]; then
#
#fi

( cd gui && npm install && gulp)

exec "$@"