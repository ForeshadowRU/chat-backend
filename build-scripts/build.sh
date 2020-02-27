#!/usr/bin/env bash

BUILD_ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [[ ${BUILD_ROOT_DIR} != *"/build-scripts"* ]]
then
 BUILD_ROOT_DIR="$BUILD_ROOT_DIR/build-scripts"
fi
ROOT_DIR=$(dirname "${BUILD_ROOT_DIR}")
cd ${ROOT_DIR}

nvm use 13.0.9
npm install
npm run start