> 因实际需要，在公司移动端项目上线后机组做pc版，此时，如果重新构建一个pc项目的话一来维护不便，二来很多公共资源可以重复利用，因此在原来移动端的基础上构建多入口，实现一个项目两个版本，甚至多个

### 一、目录结构分析
> 配置多入口其实就是将pc版和手机版共用一个cli，在src目录下创建一个entries目录，里面分别创建pc、mobile目录存放分别的入口文件，接下来，将index.html、main.js、App.vue移动到pc目录并改名，手机端复制pc改名
#### 原目录结构
```
├── README.md            项目介绍
├── index.html           入口页面
├── build              构建脚本目录
│  ├── build-server.js         运行本地构建服务器，可以访问构建后的页面
│  ├── build.js            生产环境构建脚本
│  ├── dev-client.js          开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
│  ├── dev-server.js          运行本地开发服务器
│  ├── utils.js            构建相关工具方法
│  ├── webpack.base.conf.js      wabpack基础配置
│  ├── webpack.dev.conf.js       wabpack开发环境配置
│  └── webpack.prod.conf.js      wabpack生产环境配置
├── config             项目配置
│  ├── dev.env.js           开发环境变量
│  ├── index.js            项目配置文件
│  ├── prod.env.js           生产环境变量
│  └── test.env.js           测试环境变量
├── package.json          npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
├── src               源码目录
│  ├── main.js             入口js文件
│  ├── app.vue             根组件
│  ├── components           公共组件目录
│  ├── assets             资源目录，这里的资源会被wabpack构建
│  │  └── images
│  │    └── logo.png
│  ├── routes             前端路由
│  │  └── index.js
├── static             纯静态资源，不会被wabpack构建。
└── test              测试文件目录（unit&e2e）
  └── unit              单元测试
  ```

#### 配置多入口目录

```
├── src
│  ├── entries        新的入口目录
│  │    │── pc            pc版入口文目录
│  │	│  ├──pc.js          pc版入口js(以前的main.js)
│  │	│  ├──pc.vue         pc版入口vue(以前的App.vue)
│  │	│  └──pc.html        pc版入口html(以前的index.html)
│  │    └── mobile        手机版入口文目录
│  │	   ├──mobile.js      手机版入口js(以前的main.js)
│  │	   ├──mobile.vue     手机版入口vue(以前的App.vue)
│  │	   └──mobile.html    手机版入口vue(以前的App.vue)
│  └─── router
│     ├──mobile.js     手机版路由
│     └──pc.js 		   pc版路由

 ```
### 二、入口文件修改
以pc.vue为例，mobile同理
``` javascript
import Vue from 'vue'
import Pc from './pc.vue'
import router from '../.././router/pc.js'
new Vue({
  el: '#app',
  router,
  components: { Pc },
  template: '<Pc/>'
})

```
### 三、修改utils配置文件
打开/build/utils.js加入如下内容
```javascript
var glob = require('glob')
// 页面模板
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的entries文件夹
var PAGE_PATH = path.resolve(__dirname, '../src/entries')
    // 用于做相应的merge处理
var merge = require('webpack-merge')

//多入口配置
// 通过glob模块读取page文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function() {
    var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')  // 寻找入口js（原main.js）
    var map = {}
    entryFiles.forEach((filePath) => {
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    })
    return map
}
//多页面输出配置
// 与上面的多页面入口配置相同，读取page文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function() {
	let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
	let arr = []
	entryHtml.forEach((filePath) => {
	    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
	    let conf = {
	        // 模板来源
	        template: filePath,
	        // 文件名称
	        filename: filename + '.html',
	        // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
	        chunks: ['manifest', 'vendor', filename],
	        inject: true
	    }
	    if (process.env.NODE_ENV === 'production') {
	        conf = merge(conf, {
	            minify: {
	                removeComments: true,
	                collapseWhitespace: true,
	                removeAttributeQuotes: true
	            },
	            chunksSortMode: 'dependency'
	        })
	    }
	    arr.push(new HtmlWebpackPlugin(conf))
	})
	return arr
}
```
### 四、修改webpack.dev.conf
打开/build/webpack.dev.conf.js做如下修改：
1. 找到 plugins:数组，将如下内容注释或删除
```javascript
 new HtmlWebpackPlugin({
   filename: 'index.html',
   template: 'index.html',
   inject: true
 }),
```
2. 在plugins数组上拼接上在utils.js内获取到的入口内容
修改完成以后的plugins如下：
```javascript
plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 注释开始
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    // 注释结束
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ].concat(utils.htmlPlugin())  // 这里是添加的部分
```
### 修改webpack.prod.conf
打开/build/webpack.prod.conf做如下修改：
1. 找到 plugins:数组，将如下内容注释或删除
```javascript
 new HtmlWebpackPlugin({
   filename: process.env.NODE_ENV === 'testing'
     ? 'index.html'
     : config.build.index,
   template: 'index.html',
   inject: true,
   minify: {
     removeComments: true,
     collapseWhitespace: true,
     removeAttributeQuotes: false
     // more options:
     // https://github.com/kangax/html-minifier#options-quick-reference
   },
   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
   chunksSortMode: 'dependency'
 }),
```
2. 在plugins数组上拼接上在utils.js内获取到的入口内容 (操作同上一步)

### 五、添加客户端判断
客户端访问项目时，通过js判断展示哪个版本
在pc版本入口pc.html文件内添加如下js
```javascript
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
	window.location.href = '/mobile.html#/'
}
```
同理，在mobile.html添加如下js
```javascript
if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
	window.location.href = '/pc.html#/'
}
```

### 六、后续说明
以上步骤操作完成以后便成功的添加了多入口，但是有几点需要注意：
1. 本地运行调试的时候，以前我们是localhost:8080就可以访问了，但是现在我们需要 localhost:8080/pc.html或者localhost:8080/mobile.html
2. 项目通过webpack打包以后会在根目录生成mobile.html和pc.html,在项目部署的时候需要配置默首页，也就是指定是mobile.html或者pc.html
