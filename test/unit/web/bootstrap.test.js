import '../../global/web/index'

import chai from 'chai';
const expect = chai.expect

import { resolveTestOutput } from '../../build/util'

const bootPath = resolveTestOutput('src/interfaces/bootstrap', 'web')

const {bootstrap, getinfo} = require(bootPath).default
