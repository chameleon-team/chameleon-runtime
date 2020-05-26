import '../../global/web/index'

import { resolveTestOutput } from '../../build/util'

import chai from 'chai'
const expect = chai.expect

const bootPath = resolveTestOutput('src/interfaces/bootstrap', 'web')

const { bootstrap, getinfo } = require(bootPath).default
