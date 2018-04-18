#!/usr/bin/env node

const program = require('commander')
    , { qnx, wait } = require('eczn-utils')
    , pkg_config = require('../package.json')
    , getInput = require('./utils/get-input')
    , configer = require('./utils/configer')
;
// Init 


async function getAndSetConfig(_AK, _SK, _DOMAIN, _BUCKET){
    let AK = (await getInput('  Input Your Qiniu AK: ')).trim() || _AK; 
    let SK = (await getInput('  Input Your Qiniu SK: ')).trim() || _SK; 
    let DOMAIN = (await getInput('  Input Your Qiniu Domain: ')).trim() || _DOMAIN;
    let BUCKET = (await getInput('  Input Your Qiniu Bucket: ')).trim() || _BUCKET;
    
    console.log(''); 
    console.log('  AK:'.padStart(10),     AK); 
    console.log('  SK:'.padStart(10),     SK); 
    console.log('  DOMAIN:'.padStart(10), DOMAIN); 
    console.log('  BUCKET:'.padStart(10), BUCKET); 
    console.log(''); 
    

    let isok = await getInput.isOK('  is it ok (Y / N) ? '); 
    if (isok){
        let new_config = { AK, SK, DOMAIN, BUCKET}; 
        configer.set(new_config); 
        console.log(''); 
        console.log('  ... Config OK, have fun'); 
    } else {
        console.log(''); 
        console.log('  cancel ... exit'); 
        process.exit(0); 
    }
}

(async function(){
    let config = configer.read(); 

    if (!config) {
        getAndSetConfig(); 
    } else {
        let { AK, SK, DOMAIN, BUCKET} = config; 

        console.log('  检测到上次的配置: '); 
        console.log(''); 
        console.log('  AK:'.padStart(10),     AK); 
        console.log('  SK:'.padStart(10),     SK); 
        console.log('  DOMAIN:'.padStart(10), DOMAIN); 
        console.log('  BUCKET:'.padStart(10), BUCKET); 
        console.log('');     

        let isok = await getInput.isOK('  是否要修改? (Y / N) ? '); 
        if (isok) {
            console.log('\n  重新配置中... 留空表示不修改此项'); 
            getAndSetConfig(AK, SK, DOMAIN, BUCKET); 
        } else {
            console.log('  bye ~~ '); 
        }
    }
    // configer.set(new_config); 
})(); 

