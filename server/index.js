const path = require('path');
const fs = require('fs');
const jsonServer = require('json-server');
const mockJs = require('mockjs');
const glob = require('glob');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
// mock数据，常驻内存
let data = {};
/**
 * mock解析json文件
 * @param file
 * @returns {*}
 */
function parsingToMockJs(file) {
  const json = fs.readFileSync(file, 'utf-8');
  return mockJs.mock(JSON.parse(json));
}

/**
 * 合并json数据
 * @param path
 */
function mergeJsonData(path) {
  Object.assign(data, parsingToMockJs(path));
}

/**
 * 扫描mock目录，生成mock数据
 */
glob(path.join(__dirname, `/mock/**/*.json`), {}, (err, files) => {
  files.forEach((item) => {
    mergeJsonData(item);
  });

  const router = jsonServer.router(data);

  server.use(jsonServer.bodyParser);
  server.use(middlewares);
  // 添加响应头
  server.use((req, res, next) => {
    res.header('author', 'mockData');
    next();
  });

  // 数据统一封装
  router.render = (req, res) => {
    res.jsonp({
      flag: true,
      code: 200,
      msg: 'success',
      data: res.locals.data,
    });
  };
  server.use('/mock', router);
  server.listen(3000, () => {
    console.log('Ready on http://localhost:3000');
  });
});
