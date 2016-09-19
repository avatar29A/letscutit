#!/bin/bash
for dir in dockerfiles/buildpack/*/
do
    dir=${dir%*/}
    echo "------------------ Building ${dir#*/} ------------------"
    docker build -t hub.mellody.cloud:5000/${dir#*/}:latest ${dir}
    docker push hub.mellody.cloud:5000/${dir#*/}
done