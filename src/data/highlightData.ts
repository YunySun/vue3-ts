/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-08-11 17:05:54
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-11 17:30:22
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `function test(a) {
    a.a = 11;
    a = { a:10, b:2 }
    return a
}
const a1 = {a:1, b:0}
const a2 = test(a1)
console.log(a1)
{a: 11, b: 0}
console.log(a2)
{a: 10, b: 2}
a2.b = 3
console.log(a1)
{a: 11, b: 0}`;

const demo2 = `typeof '123'
'string'
typeof 123
'number'
typeof Symbol()
'symbol'
typeof true
'boolean'
typeof undefined
'undefined'
typeof null
'object'`;

const demo3 = `typeof []
'object'
typeof {}
'object'
typeof alert
'function'`;

const demo4 = `function func() {}
const func1 = new func()
func1 instanceof func
true
'123' instanceof String
false
new String('123') instanceof String
true`;

export { demo1, demo2, demo3 };
