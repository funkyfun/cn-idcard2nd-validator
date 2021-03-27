const validator = require('../dist/index.umd');
const rs = validator.isValid('430000198101118929');
console.log('430000198101118929验证结果', rs ? '合法' : '非法');
