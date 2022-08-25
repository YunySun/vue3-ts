/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-08-23 22:57:05
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-25 17:05:40
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `setTimeout(() => {
    // 处理逻辑
});`;

const demo2 = `setTimeout(() => {
    // 逻辑
    setTimeout(() => {
        // 逻辑
        setTimeout(() => {
            // 逻辑
        });
    });
});`;

const demo3 = `function* gen(x) {
    const y = 4 * (yield x + 2);
    const z = 2 * (yield y / 2);
    return x + y + z;
}
const g = gen(10);
console.log(g.next()); // 12 x 10 y 48
console.log(g.next(10)); // 20 y 40
console.log(g.next(5)); // 55  z 10`;

const demo4 = `function* gen() {
    yield setTimeout(() => {});
    yield setTimeout(() => {});
    yield setTimeout(() => {});
}
const g = gen();
g.next();
g.next();
g.next();`;

const demo5 = `new Promise((resolve, reject) => {
    resolve('success');
    // 无效
    reject('failed');
});`;

const demo6 = `console.log('Promise 前');
new Promise(() => {
    console.log('Promise回调函数');
});
console.log('Promise 后');
// Promise 前
// Promise回调函数
// Promise 后`;

export default {
    demo1,
    demo2,
    demo3,
    demo4,
    demo5,
    demo6,
};
