var document = require('./document');
var navigator = require('./navigator');
var location = require('./location');
var visible = require('./visible');

module.exports = {
  innerWidth: 375,
  innerHeight: 667,
  document: document,
  navigator: navigator,
  location: location,
  open: function (URL, name, specs, replace) {
    if (name === '_self') {
      location.href = URL;
      visible.webview.page.replaced = true;
    }
  },
  close: function () {
    visible.webview.page.closed = true;
  },
  getComputedStyle: function () {
    return {
      width: '100px',
      height: '100px'
    }
  },
  requestAnimationFrame: function (cb) {
    cb(true);
  },
  cancelAnimationFrame: function () {
    return true;
  }
}
