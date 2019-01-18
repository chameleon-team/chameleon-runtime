

function extend (to, ...args) {
  if (!args || args.length <= 0) { return to }
  args.forEach(from => {
    if (typeof from !== 'object') { return }
    for (const key in from) {
      to[key] = from[key]
    }
  })
  return to
}

// if support passive event listeners. 支持的浏览器会优化滚动性能：https://segmentfault.com/a/1190000007913386
let _supportsPassive = false
try {
  document.createElement('div').addEventListener('test', _ => {}, {
    get passive () {
      _supportsPassive = true
    }
  })
}
catch (e) {
  // do nothing.
}
export function supportsPassive () {
  return _supportsPassive
}

/**
 * Create Event.
 * @param {DOMString} type
 * @param {Object} props
 */
export function createEvent (target, type, props) {
  const event = new Event(type, { bubbles: false })

  extend(event, props)
  //  phantomjs don't support customer event
  if (window.navigator.userAgent.toLowerCase().indexOf('phantomjs') !== -1) {
    return event
  }
  try {
    Object.defineProperty(event, 'target', {
      enumerable: true,
      value: target
    })
  }
  catch (err) {
    return extend({}, event, { target: target })
  }
  return event
}

/**
 * Create a bubbable Event.
 * @param {DOMString} type
 * @param {Object} props
 */
export function createBubblesEvent (target, type, props) {
  const event = new Event(type, { bubbles: true })
  extend(event, props)
  //  phantomjs don't support customer event
  if (window.navigator.userAgent.toLowerCase().indexOf('phantomjs') !== -1) {
    return event
  }
  try {
    Object.defineProperty(event, 'target', {
      enumerable: true,
      value: target
    })
  }
  catch (err) {
    return extend({}, event, { target: target })
  }
  return event
}

/**
 * Create Custom Event.
 * @param {DOMString} type
 * @param {Object} props
 */
export function createCustomEvent (target, type, props) {
  // compatibility: http://caniuse.com/#search=customevent
  // const event = new CustomEvent(type)
  const event = document.createEvent('CustomEvent')
  event.initCustomEvent(type, false, true, {})
  // event.preventDefault()
  // event.stopPropagation()

  extend(event, props)

  // event.target is readonly
  try {
    Object.defineProperty(event, 'target', {
      enumerable: true,
      value: target || null
    })
  }
  catch (err) {
    return extend({}, event, { target: target || null })
  }

  return event
}

/**
 * dispatch a event on a HTML element.
 * @param  {HTMLElement} elm
 * @param  {Event} type event name.
 * @param  {Object} data extra data.
 */
export function dispatchNativeEvent (elm, type, data) {
  elm.dispatchEvent(createEvent(elm, type, data))
}
