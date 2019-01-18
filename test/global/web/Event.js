var Event = module.exports = function(type, config) {
  this.type = type
  this.bubbles = config && config.bubbles || false
  return this
}

Event.prototype.initCustomEvent = function(type) {
  this.type = type
}
