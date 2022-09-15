/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-09-14 11:17:37
 * @LastEditors: 李昶
 * @LastEditTime: 2022-09-15 17:07:12
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `function func(x, y, z) {
    console.log(x, y, z);
    console.log(this.sound);
    return this
}

let obj = {
    sound: '你好',
};

console.log(func.call(obj, 1, 2, 3));`;

const demo2 = `Function.prototype.myCall = function (ctx) {
    // this 是调用myCall的函数 this必须是函数
    if (typeof this !== 'function') {
        throw new TypeError('Type Error');
    }
    let args = [...arguments].slice(1);
    // 改变调用myCall函数的this
    // this(...args); // 这时候函数的this是window
    // 函数谁调用 this就指向谁 在没有传参的基础上  函数指向为window
    ctx = ctx || window;
    ctx.fn = this; // 将函数赋值给调用myCall函数的一个属性上
    let result = ctx.fn(args);
    delete ctx.fn;
    return result;
};

function func(x, y, z) {
    console.log(x, y, z);
    console.log(this);
    return this.sound;
}

let obj = {
    sound: '你好',
};

console.log(func.myCall(obj, 1, 2, 3))`;

const demo3 = `Function.prototype.myApply = function (ctx) {
    if (typeof this !== 'function') {
        throw new TypeError('Type Error');
    }
    ctx = ctx || window;
    ctx.fn = this;
    let result;
    if (arguments[1]) {
        result = ctx.fn(...arguments[1]);
    } else {
        result = ctx.fn();
    }
    delete ctx.fn;
    return result;
};

function func(x, y, z) {
    console.log(x, y, z);
    console.log(this);
    return this.sound;
}

let obj = {
    sound: '你好',
};

console.log(func.myApply(obj, [1, 2, 3]));`;

export default {
    demo1,
    demo2,
    demo3,
};
