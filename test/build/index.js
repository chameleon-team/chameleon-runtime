require('shelljs/global')

var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var PL = require('./pipeline');

var util  = require('./util');

var { resolveRoot, resolveTestOutput } = util

var types = ['web', 'wx', 'weex', 'alipay', 'baidu'];

var type = process.argv[2];
if (!type || !types.includes(type)) {
  console.error('What type of file do you want to make?[weex/web/wx]');
  return;
}

var srcPath = resolveRoot('src');
var testSrcPath = resolveOutput('src');

var indexPath = resolveRoot('index.js');
var testIndexPath = resolveOutput('index.js');

var interfacePath = resolveRoot('src/interfaces');
var testInterfacePath = resolveOutput('src/interfaces');

var platformPath = resolveRoot('src/platform');
var testPlatfromPath = resolveOutput('src/platfrom');

build()
// types.forEach(async function(type) {
//   await build(type)
// })

// function resolveTest(dir) {
//   return path.resolve(__dirname, '..', dir)
// }

function resolveOutput(dir) {
  return resolveTestOutput(dir, type)
}

async function build() {
  
  // 拷贝文件，处理文件
  try {
    // delete web/weex/wx output
    rm('-rf', resolveOutput(''))

    fse.copySync(indexPath, testIndexPath)
    fse.copySync(srcPath, testSrcPath)

    // fse.copySync(platformPath, testPlatfromPath);
    
    // fse.copySync(interfacePath, testInterfacePath);

    // var dirs = fs.readdirSync(interfacePath)
    
    // dirs.forEach(function(name) {
    //   var oldPath = `${testInterfacePath}/${name}`
    //   var newPath = `${testInterfacePath}/${type}-${name}`

    //   rm('-rf', newPath)

    //   fs.renameSync(oldPath, newPath, function (err, data) {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });
    // })

    // delete 其他端代码
    deleteUseless()
    // PLMake(testPlatfromPath + '/common/util/interface/*.{js,interface}');
    PLMake(testSrcPath + '/**/**/*.{js,interface}');
    
  } catch (err) {
    console.error(err)
  }
}

function deleteUseless() {
  types.forEach(function(item) {
    if (item !== type) {
      let dir = resolveOutput(`src/platform/${item}`)
      rm('-rf', dir)
    }
  })
}

// 流水线处理
function PLMake(globMatch) {
  // 每次单文件处理后改名 .interface => .interface.js
  var hooks = {
    afterPipe: function (pipeInfo) {
      var filepath = pipeInfo.path;
      if (filepath.match(/\.interface$/)) {
        var newPath = filepath.replace(/.interface$/, '.interface.js');
        fs.renameSync(filepath, newPath, function (err, data) {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  }
  // 流水线针对单文件要做的处理
  PL.match(globMatch).hooks(hooks).pipe([
    makeInterfaceFile,
    replaceRequireFileExt
  ]);
}

// 处理interface文件，只保留对应type的js内容，移除接口
function makeInterfaceFile(pipeInfo) {
  var path = pipeInfo.path;
  var source = pipeInfo.source;
  if (path.match(/\.interface$/)) {
    var regReplaceTag = new RegExp('<script\\s+cml-type="' + type + '"\\s*>([\\s\\S]*?)<\/script>');
    source.replace(regReplaceTag, function ($1, $2, $3) {
      $2 = $2.replace(/implements(\s+\w+\s*?)(?={)/g, '');
      source = $2;
    });
  }
  return source;
}

// 处理引入文件后缀
function replaceRequireFileExt(pipeInfo) {
  var source = pipeInfo.source;
  source = source.replace(/\.interface(['"])/g, function ($1, $2) {
    return '.interface.js' + $2;
  });
  return source;
}
