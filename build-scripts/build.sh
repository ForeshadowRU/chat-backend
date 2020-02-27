#!/usr/bin/env bash

BUILD_ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [[ ${BUILD_ROOT_DIR} != *"/build-scripts"* ]]
then
 BUILD_ROOT_DIR="$BUILD_ROOT_DIR/build-scripts"
fi
ROOT_DIR=$(dirname "${BUILD_ROOT_DIR}")
cd ${ROOT_DIR}

/home/foreshadow/.nvm/.sh use 13.0.9
/home/foreshadow/.nvm/versions/node/v13.9.0/bin/npm install
/home/foreshadow/.nvm/versions/node/v13.9.0/bin/npm npm run start