#!/bin/bash

BUILD_ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [[ ${BUILD_ROOT_DIR} != *"/build-scripts"* ]]
then
 BUILD_ROOT_DIR="$BUILD_ROOT_DIR/build-scripts" 

fi
ROOT_DIR=$(dirname "${BUILD_ROOT_DIR}")
cd ${ROOT_DIR}
ls -alF ~/ | echo

/home/foreshadow/.nvm/nvm.sh use 13.0.9
killall node
npm run typeorm:run
npm install
npm run build
npm run start:prod&
