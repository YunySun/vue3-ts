/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-08-11 17:05:54
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-12 16:09:33
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

const demo5 = `class PrimitiveString {
    static [Symbol.hasInstance](x) {
        return typeof x === 'string'
    }
}
'123' instanceof PrimitiveString
true`;

const demo6 = `1 + '2'
'12'
true + true
2
5 + [1, 2,3]
'51,2,3'`;

const demo7 = `'a' + + 'b'
'aNaN'`;

const demo8 = `4-'1'
3
4-[]
4
4-[1,2,3]
NaN`;

const demo9 = `function test() {
    console.log(this.a)
}
var a = 10
const obj = {
    a: 11,
    test: test
}
test()
10 // window
undefined
obj.test()
11 // obj
var t = new test()
undefined //t`;

const demo10 = `function test() {
    return () => {
        return () => {
            console.log(this)
        }
    }
}
console.log(test()()())
Window`;

const demo11 = `function test() {
    console.log(this)
}
const a = {}
test.bind().bind(a)()
Window`;

const demo12 = `function test() {
    console.log(this)
}
function fn2() {
    return function() {
        return test.apply()
    }.apply(a)
}
const a = {}
fn2()
Window`;

export default { demo1, demo2, demo3, demo4, demo5, demo6, demo7, demo8, demo9, demo10, demo11, demo12 };
