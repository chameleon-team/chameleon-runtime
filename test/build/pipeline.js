var fs = require('fs');
var glob = require('glob');

/**
 * 处理glob匹配的所有文件并处理
 * make：所有处理
 * pipeline：单文件处理
 */
var PL = module.exports = {
  _hooks: {
    beforeMake: function () { },
    afterMake: function () { },
    beforePipe: function () { },
    afterPipe: function () { }
  },
  globMatch: '',
  match: match,
  hooks: hooks,
  pipe: pipe
};

function match(globMatch) {
  this.globMatch = globMatch;
  return this;
}

function hooks(hooks) {
  var that = this;
  Object.keys(hooks).forEach(function (key) {
    that._hooks[key] = hooks[key];
  })
  return this;
}

function pipe(pipeline) {
  glob(this.globMatch, function (err, filePaths) {
    if (err) {
      console.error(err);
    }

    // 总处理信息
    var makeInfo = {
      filePaths: filePaths
    }

    // hook 所有处理开始前
    PL._hooks.beforeMake(makeInfo);

    // 开始处理
    
    filePaths.length && filePaths.forEach(function (path) {
      
      var source = fs.readFileSync(path).toString();
      
      // 单文件数据信息
      var pipeInfo = {
        path: path,
        source: source
      }

      // hook 单文件处理开始前
      PL._hooks.beforePipe(pipeInfo);

      // 流水线处理单文件
      pipeline.forEach(function (pipe) {
        // 单元处理
        pipeInfo.source = pipe(pipeInfo);
      });

      // pipe流水线处理完成后，将处理后的内容写入文件
      fs.writeFileSync(pipeInfo.path, pipeInfo.source);

      // hook 单文件处理结束后
      PL._hooks.afterPipe(pipeInfo);

    });

    // hook 所有处理结束后
    PL._hooks.afterMake(makeInfo);
  });

  return this;
}
