/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-08-16 23:03:34
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-20 17:14:59
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

const demo4 = `function Factory(machines, humans) {
    return {
        machines,
        humans,
        operatorMachine() {
            console.log('有'+humans'个员工在操作'+machines+'个机器。');
        },
    };
}

const lenovoFactory = Factory(100, 10);
const miFactory = Factory(200, 25);
lenovoFactory.operatorMachine();//有10个员工在操作100个机器。
miFactory.operatorMachine(); //有25个员工在操作200个机器。`;

const demo5 = `function Factory(machines, humans) {
    this.machines = machines;
    this.humans = humans;
    this.operatorMachine = function() {
        console.log('有'+this.humans+'个员工在操作'+this.machines+'个机器。');
    }
}
const lenovoFactory = new Factory(100, 10);
const miFactory = new Factory(200, 25);
lenovoFactory.operatorMachine(); //有10个员工在操作100个机器。
miFactory.operatorMachine(); //有25个员工在操作200个机器。

console.log(lenovoFactory instanceof Factory);//true
console.log(miFactory instanceof Factory);//true`;

const demo6 = `const PI = (function () {
    const _pi = 3.1415927;
    return {
        get() {
            return _pi;
        },
    };
})();
console.log(PI.get()); // 3.1415927`;

export default { demo1, demo2, demo3, demo4, demo5, demo6 };
