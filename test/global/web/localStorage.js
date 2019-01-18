module.exports = {
  _storage: {},
  setItem: function (key, value) {
    this._storage[key] = value;
  },
  getItem: function (key) {
    return this._storage[key];
  }
}
