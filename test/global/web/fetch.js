module.exports = function (url, fetchOptions) {
  return Promise.resolve({
    status: 200,
    text: function () {
      var fromData = queryParse(fetchOptions.body);
      var fromDataLength = Object.keys(fromData).length;
      var res = {
        errno: "0"
      }
      if (fromDataLength) {
        res = fromData;
      }
      return Promise.resolve(res);
    }
  })
}

function queryParse(search = '') {
  let arr = search.split(/(\?|&)/);
  let parmsObj = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf('=') !== -1) {
      let keyValue = arr[i].match(/([^=]*)=(.*)/);
      parmsObj[keyValue[1]] = keyValue[2];
    }
  }
  return parmsObj;
}
