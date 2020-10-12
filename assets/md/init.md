# 一. 项目环境及初始化项目
## 项目环境
- 运行环境
  - node v12.16.1
  - npm 6.14.4
  - mysql 8.0.19
  - typescript Version3.8.3
  - nestjs 7.1.0
  - create-react-app 3.4.1
- 操作系统
  - macOS Catalina 10.15.4
- 编辑器
  - vscode
- 命令行工具
  - zsh
- 接口调试工具
  - chrome
  - insomnia
  
## 项目初始化
准备好项目环境之后即可初始化项目。基本目录如下：
```
ifimcat
├── README.md
├── assets
│   └── md
│       ├── init.md
│       └── preface.md
├── packages         //放置项目的三部分到里面
├── package.json
├── .gitignore
└── tree.text
```
我们使用命令行工具进入到 `ifimcat/packages`目录下，使用`create-reat-app admin.ifimcat`命令创建 **admin.ifimcat**后台管理项目部分；使用`create-reat-app ifimcat.con`命令创建 **ifimcat.com**博客官网项目部分；使用`nest new server.ifimcat`命令创建后端服务项目部分。然后等待命令运行结束。
> 如果没有 `create-reat-app`与`nest`命令的话，使用`yarn`或`npm`全局安装即可，mac系统下需要使用`sudo`命令以获取管理员权限。如：`sudo npm i create-reat-app -g`；`sudo npm i @nestjs/cli -g`

命令运行结束后，目录大致如下（*个人手动删减了一部分文件，但是并不影响*）：

```
.
├── README.md
├── assets
│   └── md
│       ├── init.md
│       └── preface.md
├── package.json
├── packages
│   ├── admin.ifimcat
│   │   ├── README.md
│   │   ├── package.json
│   │   ├── public
│   │   │   ├── favicon.ico
│   │   │   ├── index.html
│   │   │   ├── logo192.png
│   │   │   ├── logo512.png
│   │   │   ├── manifest.json
│   │   │   └── robots.txt
│   │   ├── src
│   │   │   ├── App.css
│   │   │   ├── App.js
│   │   │   ├── App.test.js
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   │   ├── logo.svg
│   │   │   ├── serviceWorker.js
│   │   │   └── setupTests.js
│   │   └── yarn.lock
│   ├── ifimcat.com
│   │   ├── README.md
│   │   ├── package.json
│   │   ├── public
│   │   │   ├── favicon.ico
│   │   │   ├── index.html
│   │   │   ├── logo192.png
│   │   │   ├── logo512.png
│   │   │   ├── manifest.json
│   │   │   └── robots.txt
│   │   ├── src
│   │   │   ├── App.js
│   │   │   ├── index.js
│   │   │   └── serviceWorker.js
│   │   └── yarn.lock
│   └── server.ifimcat
│       ├── README.md
│       ├── nest-cli.json
│       ├── package.json
│       ├── src
│       │   ├── app.controller.ts
│       │   ├── app.module.ts
│       │   ├── app.service.ts
│       │   └── main.ts
│       ├── tsconfig.build.json
│       ├── tsconfig.json
│       └── yarn.lock
└── tree.text
```

接下来使用 `git` 命令以初始化git仓库，创建 **.gitignore** 文件，设置忽略的目录与文件，然后提交到git仓库。到这里，基本的项目初始化就已经完成了。**要注意一点的是，命令创建的项目自动初始化了git仓库，需要手动删除** 。 个人 **.gitignore**  如下：
```javascript
# compiled output
/dist
node_modules

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store

# Tests
/coverage
/.nyc_output

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.env
```



