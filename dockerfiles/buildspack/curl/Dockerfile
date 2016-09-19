FROM registry.ng.bluemix.net/mellody/debian:8

MAINTAINER Glebov Boris "bglebov@mellody.cloud"

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        wget \
    && rm -rf /var/lib/apt/lists/*