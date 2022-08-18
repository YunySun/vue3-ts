/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-08-12 17:01:52
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-18 22:57:25
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `function test() {
    var a = 1;
    return function() {
        console.log(a)
    }
}
test()()
1`;

const demo2 = `for(var i=0; i<4; i++){
    setTimeout(function() {
        console.log(i)
    })
}
4`;

const demo3 = `function asyncAction(i) {
    setTimeout(function () {
        console.log(i);
    }, 100);
}

for (var i = 0; i < 4; i++) {
    asyncAction(i);
}
0
1
2
3
for(var i=0; i< 4; i++) {
    ~function(j) {
        setTimeout(function() {
            console.log(j)
        })
    }(i)
}
0
1
2
3`;

const demo4 = `for(var i=0; i<4; i++) {
    setTimeout(function(j) {
        console.log(j)
    }, 100, i)
}
0
1
2
3`;

const demo5 = `for(let i=0; i<4; i++){
    setTimeout(function() {
        console.log(i)
    })
}
0
1
2
3`;

const demo6 = `function deepClone(obj) {
    return new Promise((resolve) => {
        const { port1, port2 } = new MessageChannel();
        // 异步
        port2.onmessage = (ev) => resolve(ev.data);
        port1.postMessage(obj);
    });
}

const testObj = {
    a: ['1', 2, 3],
    b: { c: 'test', d: 2 },
};

const test = async () => {
    const clone = await deepClone(testObj);
    console.log(clone);
};

test();`;
const demo7 = `function deepClone(obj) {
    // 判断是否是对象
    function isObject(o) {
        return (typeof o === 'object' || typeof o === 'function') && o !== null;
    }

    if (!isObject(obj)) {
        throw new Error('传递的参数不是对象');
    }

    const isArray = Array.isArray(obj);
    const newObj = isArray ? [...obj] : { ...obj };
    Object.keys(newObj).forEach((key) => {
        newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
    });
    return newObj;
}

const testObj = {
    a: ['1', 2, 3],
    b: { c: 'test', d: 2 },
};

const newObj = deepClone(testObj);
newObj.b.c = 'clone';
console.log(testObj.b.c);
test`;

const demo8 = `obj.__proto__ === obj.__proto__.constructor.prototype
true`;

export default { demo1, demo2, demo3, demo4, demo5, demo6, demo7, demo8 };
