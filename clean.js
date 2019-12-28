#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const exec = require('child_process').execSync;
const targetFoler = 'node_modules';
const clear = require('./lib/clear');
const pkg = require('./package.json');

program
  .version(pkg.version)
  .parse(process.argv);

if (program.args && program.args[0]) {
  const currentPath = path.resolve(program.args[0]);
  exec(`find ${currentPath} -name ${targetFoler} | xargs rm -rf`);
  console.log(`已成功移除 ${currentPath} 下的所有 ${targetFoler} 文件夹！`);
} else {
  console.log('请指定目录');
}