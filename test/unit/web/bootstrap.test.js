import '../../global/web/index'

import chai from 'chai'

import { resolveTestOutput } from '../../build/util'
const expect = chai.expect

const bootPath = resolveTestOutput('src/interfaces/bootstrap', 'web')

const { bootstrap, getinfo } = require(bootPath).default
