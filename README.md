# 洗衣顺 微信公众号 前端开发说明文档

### 安装项目依赖的 npm 包
npm install

### 启动开发服务 进行本地开发
npm run dev

### 打包生成生产环境下的压缩代码
npm run build

### 技术选型

Vue + vue-router + axios + jquery + mint-ui

### 目录说明

|目录名称|功能|备注|
|-|-|-|
|build|webpack在各个环境下的打包配置文集||
|config|开发在各个环境下的自定义配置||
|qrocde|公众号中我的二维码页面代码|页面比较简单，未进行打包|
|src|下单和派单员的主要业务代码目录|下面会对该目录进行详细说|
|static|开发中模拟数据和一些静态资源|该目录下的代码对功能没有影响|
|stu_vue|打包生成的用于生产环境的代码|部署将里面 static 和 index.html 代码拖到服务器xdd目录下就完成部署|
|stu_vue 下 scanInOut|出库入库扫描二维码的web页面|该业务比较简单，未做打包，对应服务上的h5目录|

### src业务代码目录详细说明

|目录名称|功能|备注|
|:-|:-|:-|
|assets|项目中各个模块的图片资源文件||
|common|项目中使用到的第三方库文件||
|common 下 httpService.js|对axios的请求进行了封装, 添加了拦截器||
|common 下 httpServiceUrl.js|项目中接口地址集合||
|components|项目中各个页面组件|一个vue页面对应一个页面|
|components 下 widget |项目中自定义封装的ui组件|empty是暂无数据提示组件，startLevel是星级评分组件，widgetMaskSheet是交易那边的弹出遮罩组件|
|router|项目路由文件|路由的配置写在了main.js中|
|scss|项目中各个页面的样式文件||
|config.js|项目接口host配置文件||
|main.js|项目主js|路由以及路由守卫等都写在该文件内|

### main.js 详细说明

路由配置写在该文件中，每个页面对应的路由都谢了注释，便于查找

该文件中各个函数的作用都谢了详细的注释


