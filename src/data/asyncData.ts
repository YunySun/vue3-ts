/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-08-23 22:57:05
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-26 17:03:59
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

const demo7 = `new Promise((resolve) => {
    resolve(1);
})
.then((res) => {
    console.log(res); // 1
    return 2; // 包装成Promise.resolve(2)
})
.then((res) => {
    console.log(res); // 2
});`;

const demo8 = `new Promise((resolve) => {
    setTimeout(() => {
        resolve(2);
    }, 1000);
})
.then((res) => {
    console.log(res);
    return Promise.resolve(3);
})
.then((res) => {
    console.log(res);
});`;

const demo9 = `async function doSomething() {
    return 'doSomething';
}
console.log(doSomething()); // Promise{<fulfilled>: 'doSomething'}`;

const demo10 = `async function doSomething() {
    const data = await useRequest({ pageconfig: 'index' });
    console.log(data);
    console.log('doSomething');
}
doSomething();
// Promise{<pending>} 不用await
// doSomething

// {data: {}} 用await
// doSomething`;

const demo11 = `let a = 0;
async function b() {
    console.log('async: ', a);
    a += await 10;
    console.log('await: ', a);
}
b();
a += 1;
console.log('a: ', a);
// async:  0
// a:  1
// await:  10`;

const demo12 = `function myInterval(cb, duration) {
    let timer;
    let { now } = Date;
    // 定义初始时间和这段循环的结束时间
    let startTime = now();
    let endTime = startTime;
    // 循环
    function loop() {
        // 循环调用
        timer = requestAnimationFrame(loop);
        // 调用回调现在的时间
        endTime = now();
        // 在达到duration时间调用回调函数
        if (endTime - startTime >= duration) {
            // 符合更新结束和开始时间
            endTime = now();
            startTime = endTime;
            cb(timer); // 将计时器返回给回调函数
        }
    }
    // 返回timer用于取消
    timer = requestAnimationFrame(loop);
    return timer;
}
myInterval((timer) => {
    console.log(timer);
    console.log(new Date());
}, 1000);`;

export default {
    demo1,
    demo2,
    demo3,
    demo4,
    demo5,
    demo6,
    demo7,
    demo8,
    demo9,
    demo10,
    demo11,
    demo12,
};
