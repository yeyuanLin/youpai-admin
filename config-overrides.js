const { override, fixBabelImports,addLessLoader } = require('customize-cra');

// module.exports = function override(config, env) {
//       // do stuff with the webpack config...
//            return config;
//      };
// 针对antd实现按需打包：根据import来打包（使用babel-plugin-import）
module.exports = override(
       fixBabelImports('import', {
           libraryName: 'antd',
           libraryDirectory: 'es',
        style: 'true', //自动打包相关样式
       }),
    // 使用lessLoader源码中的Less的变量重新指定样式
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1890ff' },
    }),
);
