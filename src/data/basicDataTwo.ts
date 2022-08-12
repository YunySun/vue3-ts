/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-08-12 17:01:52
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-12 17:29:18
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

export default { demo1, demo2, demo3, demo4, demo5 };
