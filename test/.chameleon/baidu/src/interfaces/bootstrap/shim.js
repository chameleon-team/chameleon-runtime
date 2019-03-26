/**
 * Promise.finally、Promise.done 垫片
 */
if (typeof Promise.prototype.finally !== 'function') {
  Promise.prototype.finally = function (onFinally) {
    let P = this.constructor;
    return this.then(
      value  => P.resolve(onFinally()).then(() => value),
      reason => P.resolve(onFinally()).then(() => { throw reason })
    );
  };
}

if (typeof Promise.prototype.done === 'undefined') {
  Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected).catch(function (error) {
        setTimeout(function () {
            throw error;
        }, 0);
    });
  };
}
