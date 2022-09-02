/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-08-30 16:00:14
 * @LastEditors: 李昶
 * @LastEditTime: 2022-09-01 16:54:05
 * @Profile: 一个比较废柴的前端开发
 */

const demo1 = `let a = 2;
new Promise((resolve, reject) => {
    if (a === 1) {
        resolve(1);
    } else {
        reject(1);
    }
})
    .then((res) => {
        console.log('then: ', res);
    })
    .catch((err) => {
        console.log('err: ', err); // err: 1
    });`;

const demo2 = `new MyPromise((resolve, reject) => {
    resolve(1);
}).then((res) => {
    console.log(res);
});`;

const demo3 = `
/**
 * 实现简易Promise
 * @param callback Function 回调函数
 * 三种状态 pending resolved rejected 默认pending等待中
 * 如何实现异步完成后在调用函数 通过数组将要做的函数存数组中 在异步完成过后调用
 * 但是要分为then和catch 即成功和失败两个数组
 */
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
function MyPromise(callback) {
    let that = this;
    this.state = PENDING; // 默认状态
    this.resolvedCallbackList = []; // 成功的回调数组
    this.rejectedCallbackList = []; // 是败的回调数组
    this.value = ''; // 传递的值

    function resolve(res) {
        // 进入resolve状态
        that.state = RESOLVED;
        // 更新传递的值
        that.value = res;
        // 循环当前完成的成功的回调函数数组 并且调用
        that.resolvedCallbackList.map((cb) => cb(that.value));
    }

    function reject(res) {
        // 进入resolve状态
        that.state = REJECTED;
        // 更新传递的值
        that.value = res;
        // 循环当前完成的成功的回调函数数组 并且调用
        that.rejectedCallbackList.map((cb) => cb(that.value));
    }

    // 调用回调函数
    callback(resolve, reject);
}

/**
 * @param cb then函数调用的函数
 */
MyPromise.prototype.then = function (cb) {
    console.log(this.state);
    // 如果当前是等待状态 将回调函数加入成功的数组中
    if (this.state === PENDING) {
        this.resolvedCallbackList.push(cb);
    } else if (this.state === RESOLVED) {
        // 如果当前是完成状态直接调用函数
        cb(this.value);
    }
    return this;
};

/**
 * @param cb catch函数调用的函数
 */
MyPromise.prototype.catch = function (cb) {
    console.log(this.state);
    // 如果当前是等待状态 将回调函数加入成功的数组中
    if (this.state === PENDING) {
        this.rejectedCallbackList.push(cb);
    } else if (this.state === REJECTED) {
        // 如果当前是完成状态直接调用函数
        cb(this.value);
    }
    return this;
};

let myPromise = new MyPromise((resolve, reject) => {
    // console.log('1');
    // resolve(1); // 当前未异步
    setTimeout(() => {
        resolve(2);
    }, 1000);
}).then((res) => {
    console.log(res);
    return 1;
});`;

export default { demo1, demo2, demo3 };
