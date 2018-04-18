#!/usr/bin/env node

const program = require('commander')
    , pkg_config = require('../package.json')
    , path = require('path')
    , { qnx, wait } = require('eczn-utils')
    , configer = require('./utils/configer')
    , config = configer.get()
    , globby = require('globby')
; 

// init 
let { AK, SK, DOMAIN, BUCKET } = config; 
qnx.init(AK, SK, DOMAIN, BUCKET); 


function getPaths(location, remote){
    location = location.replace(/\\/g, '/');
    let location_all = path.join(location, '**/*').replace(/\\/g, '/');

    const locations_paths = await globby(location_all);
    const relative_paths = locations_paths.map(
        e => {
            let temp = e.replace(location, ''); 

            if (temp[0] !== '/'){
                return '/' + temp; 
            } else {
                return temp; 
            }
        }
    ); 

    console.log(location)
    console.log(relative_paths); 
}

program
    .version(pkg_config.version)
    .arguments('[location] [remote]')
    .action(async (location, remote) => {
        getPaths(location, remote); 
        
    })
    .parse(process.argv)




