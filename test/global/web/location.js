var visible = require('./visible');

var location = module.exports = {
  href: 'https://a.b.com?a=a&b=b&#hash=pa',
  search: '?a=a&b=b&',
  hash: '#hash=pa',
  replace: function (url) {
    visible.webview.page.replaced = true;
    location.href = url;
  }
}
