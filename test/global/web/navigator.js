var testConfig = require('./config');

module.exports = {
  userAgent: testConfig.ua.browser,
  geolocation: {
    getCurrentPosition: function (cb) {
      cb({
        pos: {
          coords: {
            latitude: '123.456',
            longitude: '123.456'
          }
        }
      })
    }
  }
}
