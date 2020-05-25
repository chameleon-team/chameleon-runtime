import '../../global/wx/index'

import * as mock from '../../mock/wx/component/options'
import { createComponent } from '../../mock/wx/base'

import chai from 'chai'
const expect = chai.expect

const _case = mock.case1
const input = _case.get('in')
const shouldOut = _case.get('out')

const component = createComponent(input)
const actualOut = component.getOptions()

describe('【wx】-【createComponent】', function () {
  describe('lifecycle unit test', function () {
    it('created', function () {
      const created = actualOut.created.bind(__CML__GLOBAL.Component)
      created()
    })

    it('attached', function () {
      const attached = actualOut.attached.bind(__CML__GLOBAL.Component)
      attached()
    })

    it('ready', function () {
      const ready = actualOut.ready.bind(__CML__GLOBAL.Component)
      ready()
    })

    it('detached', function () {
      const detached = actualOut.detached.bind(__CML__GLOBAL.Component)
      detached()
    })
  })
})
