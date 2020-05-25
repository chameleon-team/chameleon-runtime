import '../../global/web/index'
import chai from 'chai'

import { resolveTestSrc } from '../../build/util'
const expect = chai.expect

const evtModulePath = resolveTestSrc('platform/web/render/utils/event', 'web')

const event = require(evtModulePath)

describe('【web】-【Event】', function () {
  it('createEvent', () => {
    const {
      createEvent
    } = event
    const clickEvent = createEvent('', 'click')
    expect(createEvent).to.be.a('function')
    expect(clickEvent.type).to.be.equal('click')
    const target = clickEvent.target
    expect(target === '' || target === null).to.be.true
  })

  it('createBubblesEvent', () => {
    const {
      createBubblesEvent
    } = event
    const clickEvent = createBubblesEvent('', 'click')
    expect(createBubblesEvent).to.be.a('function')
    expect(clickEvent.type).to.be.equal('click')
    const target = clickEvent.target
    expect(target === '' || target === null).to.be.true
    expect(clickEvent.bubbles).to.be.true
  })

  it('createCustomEvent', () => {
    const {
      createCustomEvent
    } = event
    const customEvent = createCustomEvent('', 'customEvent')
    expect(createCustomEvent).to.be.a('function')
    expect(customEvent.type).to.be.equal('customEvent')
    const target = customEvent.target
    expect(target === '' || target === null).to.be.true
  })

  it('dispatchNativeEvent', (done) => {
    const {
      dispatchNativeEvent
    } = event
    expect(dispatchNativeEvent).to.be.a('function')
    const node = document.createElement('div')
    const shouldBe = 'test'
    document.body.appendChild(node)
    node.addEventListener('click', (e) => {
      expect(e.shouldBe).to.be.equal(shouldBe)
      document.body.removeChild(node)
      done()
    })
    dispatchNativeEvent(node, 'click', { shouldBe })
  })
})
