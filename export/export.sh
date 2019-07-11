#!/bin/bash

exportPlatformRuntime() {
  echo "导出 $1 端运行时"
  cd export
  cml $1 build
}

rm -rf ./export/src
rm -rf ./export/index.js
cp -R ./src ./export/src
cp -R ./index.js ./export/index.js

exportPlatformRuntime $1

