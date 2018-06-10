const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());

const resolve = (dir) => {
  if (dir === void 0 || dir === null) { dir = '' };
  return path.resolve(appDirectory, dir);
};

const resolveOwn = (dir) => {
  if (dir === void 0 || dir === null) { dir = '' };
  return path.resolve(__dirname, '..', dir);
};

module.exports = {resolve, appDirectory, resolveOwn}
