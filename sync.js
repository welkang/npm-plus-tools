#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const readJson = require('read-package-json')
const copydir = require('./utils/copy-dir');
const exec = require('child_process').execSync;

const targetFoler = 'node_modules';
const pkg = require('./package.json');

// 读取执行命令的文件夹 package.json 信息
function getTargetPath(callback) {
  const packagePath = path.resolve('./package.json');
  readJson(packagePath, console.error, false, function (er, data) {
    if (er) {
      console.error("There was an error reading the file")
      return
    }
    const packageName = data.name;
    const version = data.version;
    // "name": "@ali/mo-dish-select",
    // "version": "1.1.13-beta.4",
    let middlePath = '';
    if (packageName.indexOf('@') === 0) {
      middlePath = '_' + packageName.replace('/', '_') + '@' + version + '@'; // _@ali_mo-dish-select@1.1.13-beta.2@
    }
    const targetPath = path.resolve(program.args[0]) + `/node_modules/${middlePath}${packageName}`;

    callback(targetPath);
  });
}

program
  .version(pkg.version)
  .parse(process.argv);

if (program.args && program.args[0]) {
  getTargetPath(function(targetFoler) {
    // 首先判断是否有文件夹=
    copydir('./', targetFoler, {
      filter(stat, filepath, filename) {
        // do not want copy .html files
        if (stat === 'directory' && filename === 'node_modules') {
          return false;
        }
        // do not want copy .svn directories
        if (stat === 'directory' && filename === '.git') {
          return false;
        }
        // do not want copy symbolicLink directories
        if (stat === 'symbolicLink') {
          return false;
        }
        return true; // remind to return a true value when file check passed.
      },
    })
    console.log('已同步至', targetFoler);
  });
} else {
  console.log('请指定项目目录');
}
