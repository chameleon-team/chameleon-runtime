import { getViewportSize } from '../utils/viewport'

let idCnt = 0

export default {
  updated () {
    const el = this.$el
    if (!el || el.nodeType !== 1) {
      return
    }
    if (this._rootId) {
      if (el.className.indexOf('cml-root') <= -1) {
        el.classList.add('cml-root')
        el.classList.add('cml-flx')
        el.setAttribute('data-cml-root-id', this._rootId)
      }
    }

    const tagName = this.$options && this.$options._componentTag
    const metaUp = chameleon._meta.updated
    if (!metaUp[tagName]) {
      metaUp[tagName] = 0
    }
    metaUp[tagName]++
  },

  mounted () {
    const tagName = this.$options && this.$options._componentTag
    const el = this.$el
    if (!el || el.nodeType !== 1) {
      return
    }
    if (typeof chameleon._components[tagName] !== 'undefined') {
      chameleon._components[tagName]++
    }
    const metaMt = chameleon._meta.mounted
    if (!metaMt[tagName]) {
      metaMt[tagName] = 0
    }
    metaMt[tagName]++

    // when this is the root element of Vue instance.
    if (this === this.$root) {
      const rootId = `cml-root-${idCnt++}`
      if (!chameleon._root) {
        chameleon._root = {}
      }
      chameleon._root[rootId] = this
      this._rootId = rootId
      if (el.nodeType !== 1) {
        return
      }
      el.classList.add('cml-root')
      el.classList.add('cml-flx')
      el.setAttribute('data-cml-root-id', rootId)

      const {viewportHeight} = getViewportSize()

      el.style.height = `${viewportHeight}px`
    }
  },

  destroyed () {
    const el = this.$el
    if (!el || el.nodeType !== 1) {
      return
    }

    if (this._rootId) {
      delete chameleon._root[this._rootId]
      delete this._rootId
    }
    const tagName = this.$options && this.$options._componentTag
    if (typeof chameleon._components[tagName] !== 'undefined') {
      chameleon._components[tagName]--
    }
    const metaDs = chameleon._meta.destroyed
    if (!metaDs[tagName]) {
      metaDs[tagName] = 0
    }
    metaDs[tagName]++
  },

  methods: {
  }
}
