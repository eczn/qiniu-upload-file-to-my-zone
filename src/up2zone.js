#!/usr/bin/env node

const program = require('commander')
    , { qnx, wait, mkdir } = require('eczn-utils')
    , pkg_config = require('../package.json')
// Init 


program
    .version(pkg_config.version)
    .command('config', '配置')
    .command('up', '上传')
    .command('hello', 'say hello')
    .parse(process.argv)
