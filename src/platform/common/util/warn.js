export const OBFUSCATED_ERROR =
    "An invariant failed, however the error is obfuscated because this is an production build."

export function fail(message) {
    invariant(false, message)
    throw "X" // unreachable
}

export function invariant(check, message) {
    if (!check) throw new Error("[chameleon-runtime] " + (message || OBFUSCATED_ERROR))
}

/**
 * Prints a deprecation message, but only one time.
 * Returns false if the deprecated message was already printed before
 */
const deprecatedMessages = []

export function deprecated(msg, thing) {
    if (process.env.media === "build") return false
    if (thing) {
        return deprecated(`'${msg}', use '${thing}' instead.`)
    }
    if (deprecatedMessages.indexOf(msg) !== -1) return false
    deprecatedMessages.push(msg)
    console.error("[chameleon-runtime] Deprecated: " + msg)
    return true
}