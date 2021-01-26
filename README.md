<!--
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-13 10:53:14
 * @Describe: 疯草抖音数据
-->
## 疯草抖音数据平台--前端框架

- [github](https://codeup.aliyun.com/5ffbe5a1168c689c9272ce9b/FE/Locower.git) jiashuangxi

- [需求地址]
1.0 (https://org.modao.cc/app/fed71120096d3f798e826345cc6f1e1b5f7f6631?simulator_type=device&sticky=#screen=skhwrngd23rbyty) liuchao jiashuangxi 
1.0补充说明 https://org.modao.cc/app/7d3e80a0f974586a418ed689dc997765fa22612a?simulator_type=device&sticky=#screen=ski8gr92fj18ru7
1.2 https://org.modao.cc/app/e4312e3b04f3fea2b4853b89e86b47d147026fbd?simulator_type=device&sticky

- [UI地址]
(https://lanhuapp.com/web/#/item/project/detailDetach?pid=b96a0f0c-96ff-4549-9e6d-b72ab5b2a9c7&project_id=b96a0f0c-96ff-4549-9e6d-b72ab5b2a9c7&image_id=2bd3f32d-2cc4-438d-86f7-a392153b1af2) zhangyanyu

[后台接口地址]
https://note.youdao.com/ynoteshare1/index.html?id=9a35c5832380db0e3b77b52d9e51e7b0&type=note#/

### Build Setup

> 1.项目初始化  
> npm install
>
> 2.项目运行  
> **npm run serve**
>
> 3.执行本地mock  
> **npm run serve --mock**
>
> 4.代理测试环境  
> **npm run serve --proxy**


###创建 mock 数据步骤

- 1.在文件夹 `mocks` 添加对应模块的文件夹。例如：`adminManage`
- 2.在`adminManage`文件夹下面，添加`index.json`文件和对应数据的 json 数据
- 3.在`mock.config.js` 文件中加入请求信息。例如：
```javascript
app
.get('/api/adminManage', (req, res) => {
  res.json(require('./mocks/adminManage/index.json'));
})
```

## 接口请求

- `src/utils/featch.js` 封装了 axios 实例

#### 示例 1
- 1.在文件夹 `api` 添加对应模块的文件。例如：`adminManage.js`
- 2.在`adminManage`文件下面，添加接口信息数据
```javascript
export const getContentManagePage = (params = {}) => fetch({
  url: '/manage/contentManage/getContentManagePage',
  method: 'get',
  params,
});
```
- 3.在引用接口的地方引入
```javascript
import { getContentManagePage } from '@/api/adminManage.js';
getContentManagePage(params).then(res => {
  console.log(res);
});
```


## npm 与 yarn 对应

- 安装 npm install ---- yarn
- 卸载 npm uninstall ---- yarn remove
- 全局安装 npm install xxx --global ---- yarn global add xxx
- 安装包 npm install xxx -save ---- yarn add xxx
- 开发模式安装包 npm install xxx -save-dev ---- yarn add xxx -dev
- 更新 npm update -save ---- yarn upgrade
- 全局更新 npm update -global ---- yarn global upgrade
- 卸载 npm uninstall ---- yarn remove xx
- 清除缓存 npm cache clean ---- yarn cache clean
- 重装 rm -rf node_modules && npm insatll ---- yarn upgrade

## 代码书写

1. 提倡 es6
2. 页面组件拆分
3. data 与 props 数据过多请单独提出
4. vuex 分割成模块[module](https://vuex.vuejs.org/zh/guide/modules.html)

