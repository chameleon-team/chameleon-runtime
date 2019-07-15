#!/bin/bash


exportPlatformRuntime() {
  echo "导出 $1 端运行时"
  cml $1 export
  rm -rf ./package/$1/index.js
  cp -R ./dist/$1/index.js ./package/$1/index.js
}
changeFileContent() {
  # 修改微信文件的内容
  # macOS 需要多一个参数，用于缓存，所以多一个''占位
  sed -i '' 's/__CML__GLOBAL.//g' ./src/platform/wx/**/*.js
  sed -i '' 's/__CML__GLOBAL.//g' ./src/platform/baidu/**/*.js
}

rm -rf ./export/src
rm -rf ./export/index.js
rm -rf ./export/package.json
cp -R ./src ./export/src
cp -R ./index.js ./export/index.js
cp -R ./package.json ./export/package.json

cd export
npm i
changeFileContent
exportPlatformRuntime $1

rm -rf ./dist
rm -rf ./node_modules
rm -rf ./src
rm -rf ./index.js
rm -rf ./package.json
rm -rf ./package-lock.json


