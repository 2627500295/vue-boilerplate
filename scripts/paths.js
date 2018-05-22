const fs = require('fs');
const path = require('path');

export const appDirectory = fs.realpathSync(process.cwd());

export const resolve = (dir = '') => {
  return path.resolve(appDirectory, dir);
};

export const resolveOwn = (dir = '') => {
  return path.resolve(__dirname, '..', dir);
};
