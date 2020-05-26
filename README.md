# npm-plus-tools

> npm 相关能力增强工具集

### 安装

```
npm i npm-plus-tools -g
```

### 场景一

电脑里有太多的仓库，里面又有无数的 node_moudles，占用空间非常大，而通常很多 node_modules 是当下不需要用的。
如何批量删除这些 node_modules ？

```
np-clean ./
```

### 场景二

本地联调 npm link 有问题、不方便？不如直接将 package 源码推送到项目 node_mudles 目录下下。

```
cd ./packageRootPath
np-sync ./targetProjectRootPath
```

### 场景三(Todo)

一次性想将一个 group 下的 repo 都 clone 到本地？

```
np-clone groupName
```
