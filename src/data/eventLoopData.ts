/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-09-02 14:09:54
 * @LastEditors: 李昶
 * @LastEditTime: 2022-09-02 17:23:03
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `console.log('script start');

async function async1() {
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2 end');
}

async1();

setTimeout(() => {
    console.log('setTimeout');
}, 0);

new Promise((resolve) => {
    console.log('Prmomise');
    resolve();
})
    .then(() => {
        console.log('promise1');
    })
    .then(() => {
        console.log('promise2');
    });

console.log('script end');
// script start => async2 end => Promise => script end => async1 end => promise1 => promise2 => setTimeout`;

export default {
    demo1,
};
