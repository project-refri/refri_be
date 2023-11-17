/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = [
  {
    name: 'app',
    script: 'main.js',
    exec_mode: 'cluster',
    instances: Math.max(require('os').cpus().length - 1, 1), // CPU 코어 수에서 1를 뺀 값
  },
];
