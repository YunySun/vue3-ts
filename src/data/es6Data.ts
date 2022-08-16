/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-08-16 23:03:34
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-16 23:18:58
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `console.log(a);
var a = 100
undefined // 打印的a是undefined`;

const demo2 = `var a;
console.log(a);
a = 100;
undefined`;

const demo3 = `console.log(a);
let a = 100;
Uncaught SyntaxError: Identifier 'a' has already been declared`;

export default { demo1, demo2, demo3 };
