import { noop } from './util'

export let warn = noop
export let tip = noop

if (process.env.media !== "build") {
  const hasConsole = typeof console !== 'undefined'

  warn = (msg, vm) => {
    const trace = vm ? generateComponentTrace(vm) : ''

    if (hasConsole) {
      console.error(`[CML warn]: ${msg}${trace}`)
    }
  }

  tip = (msg, vm) => {
    const trace = vm ? generateComponentTrace(vm) : ''

    if (hasConsole) {
      console.error(`[CML tip]: ${msg}${trace}`)
    }
  }
}

function generateComponentTrace (vm) {
  return ''
}