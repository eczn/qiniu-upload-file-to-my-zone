const { qnx, wait } = require('eczn-utils')
    , fs = require('fs')
    , mkdir = require('./mkdir')
    , path = require('path')
    , HOME_DIR = require('os-homedir')()
    , CONFIG_BASE = path.join(
        HOME_DIR, '.qiniu-upload-file-to-my-zone'
    )
    , CONFIG_FILE = path.join(
        CONFIG_BASE, 'config.json'
    )
;

mkdir(CONFIG_BASE); 

let configer = {}; 

/**
 * @description 保存配置 
 * @param { { AK: String, SK: String, BUCKET: String, DOMAIN: String } } config 
 */
configer.set = function(config){
    let str = JSON.stringify(config); 
    fs.writeFileSync(CONFIG_FILE, str, 'utf-8'); 

    return configer; 
}

/**
 * @description 获取配置 若配置不存在 则退出 node 进程 
 * @returns { { AK: String, SK: String, BUCKET: String, DOMAIN: String } } 配置 
 */
configer.get = function(){
    let obj; 
    try {
        obj = JSON.parse(
            fs.readFileSync(CONFIG_FILE, 'utf-8')
        ); 
    } catch (err) {
        console.log('  未配置或配置出错，请重新配置'); 
        console.log('  run `up2zone config` to re-config'); 
        process.exit(1); 
    }
    
    return obj;  
}

/**
 * @description 获取配置 若配置不存在 则返回 null 
 * @returns { { AK: String, SK: String, BUCKET: String, DOMAIN: String } } 配置 
 */
configer.read = function(){
    let str; 
    try {
        str = fs.readFileSync(CONFIG_FILE, 'utf-8'); 
    } catch (err) {
        str = 'null'; 
    }

    return JSON.parse(str); 
}

module.exports = configer; 
