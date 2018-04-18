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

/**
 * @description 获取路径 
 * @param { String } location 本地 
 * @param { String } remote 远程 
 * @returns { Array<Array> } 路径 
 */
async function getPaths(location, remote){
    location = location.replace(/\\/g, '/');
    let location_all = path.join(location, '**/*').replace(/\\/g, '/');

    const location_paths = await globby(location_all);
    const relative_paths = location_paths.map(e => {
        let temp = e.replace(location, ''); 

        if (temp[0] === '/'){
            return temp.substring(1); 
        } else {
            return temp; 
        }
    }); 

    const qiniu_paths = relative_paths.map(e => {
        return path.join(remote, e).replace(/\\/g, '/'); 
    });

    return [
        location_paths,
        relative_paths,
        qiniu_paths
    ]; 
}

program
    .version(pkg_config.version)
    .arguments('[location] [remote]')
    .action(async (location, remote) => {
        let [
            location_paths,
            relative_paths,
            qiniu_paths
        ] = await getPaths(location, remote); 

        let results = []; 
        for (let i = 0; i < qiniu_paths.length; i++){
            let location_path = location_paths[i]; 
            let qiniu_path = qiniu_paths[i]; 

            let res = await qnx.upload(location_path, qiniu_path); 
            let { hash, key, url } = res; 
            console.log('Upload Success'); 
            console.log('  HASH:', hash); 
            console.log('   KEY:', key); 
            console.log('   URL:', url); 
        }

        console.log('\n  All Tasks Done, Exit ...'); 
    })
    .parse(process.argv)
