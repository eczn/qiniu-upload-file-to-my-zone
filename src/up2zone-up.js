#!/usr/bin/env node

const program = require('commander')
    , { qnx, wait } = require('eczn-utils')
    , pkg_config = require('../package.json')
// Init 


qnx.init('AK', 'SK', 'domain', 'bucket')
