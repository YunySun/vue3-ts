/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-08-16 23:03:34
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-23 16:36:15
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

const demo7 = `const myModules = (function () {
    // 私有变量 外部无法访问
    const myPrivate = '私有变量';
    // 私有函数
    function myMethod(txt) {
        console.log('私有函数调用传值：', txt);
    }
    return {
        // 公有配置
        commonConf: {
            common: '共有变量',
            status: true,
        },
        // 根据配置信息输出
        conf() {
            // 输出私有变量
            console.log('输出：', myPrivate);
            // 调用私有函数
            myMethod(this.commonConf.status ? '开启状态' : '关闭状态');
        },
    };
})();

// 调用输出函数
myModules.conf();
// 输出： 私有变量
// 私有函数调用传值： 开启状态

// 调用私有函数
myModules.myMethod(); // TypeError: myModules.myMethod is not a function

myModules.commonConf.status = false;
myModules.conf();
// 输出： 私有变量
// 私有函数调用传值： 关闭状态`;

const demo8 = `const myModule = (function () {
    // 私有函数
    function method1(txt) {
        console.log('私有函数1输出：', txt);
    }
    function method2(txt) {
        console.log('私有函数2输出：', txt);
    }
    // 将私有函数开放
    return {
        method1,
        method2,
    };
})();`;

const demo9 = `const person = {
    name: 'Michael',
};
// 重新封装对象的属性 定义一个只能访问值 不能修改值的属性
Object.defineProperty(person, 'age', {
    value: new Date().getFullYear() - 1992,
    get function() {
        return this.age;
    },
});
console.log(person.age);
person.age = 18;
console.log(person.age);
// 30
// 30`;

const demo10 = `function ClassFunction(id, name, price) {
    // 私有属性
    const name = '';
    const price = 0;
    // 私有函数
    function checkId() {}

    // 公有属性
    this.id = id;

    // 特权函数 用于操作私有的函数和方法
    this.setName = function () {};
    this.setPrice = function () {};
    this.getName = function () {};
    this.getPrice = function () {};

    // 公有函数
    console.log(this);
    if (this instanceof ClassFunction) {
        console.log('this instanceof ClassFunction: ', this);
        this.setName(name);
        this.setPrice(price);
    } else {
        console.log('this not instanceof ClassFunction: ', this);
        return new ClassFunction(id, name, price);
    }
}

// 类静态公有属性和函数
ClassFunction.commonAttr = '类属性';
ClassFunction.commonFunc = function () {};

// 实例公有属性函数
ClassFunction.prototype = {
    protoAttr: 'Prototype 属性',
    protoFunc() {
        console.log('Prototype Function');
    },
};

const class1 = new ClassFunction(1, 'class1', 12);
class1.commonAttr = '类';
class1.protoAttr = 'Prototype1';
console.log(class1.commonAttr); // 类
console.log(class1.protoAttr); // Prototype1
const class2 = new ClassFunction(2, 'class2', 13);
console.log(class2.commonAttr); // undefined
console.log(class2.protoAttr); // Prototype 属性
`;

const demo11 = `class ClassFunction {}
console.log(ClassFunction instanceof Function); // true;`;

const demo12 = `function Biology(species) {
    this.species = species;
}

Biology.prototype.speak = function (speak) {
    console.log(this.species+'说：'+speak);
};

function Human(species) {
    Biology.call(this, species);
}

Human.prototype = new Biology();

const human = new Human('人类');
human.speak('你好'); // 人类说：你好
console.log(human instanceof Biology); // true;`;

const demo13 = `function Biology(species) {
    this.species = species;
}
Biology.prototype.speak = function (speak) {
    console.log(this.species+'说：'+speak);
};

function Human(species) {
    Biology.call(this, species);
}

Human.prototype = Object.create(Biology.prototype, {
    constructor: {
        value: Human,
        enumerable: false,
        writable: true,
        configurable: true,
    },
});

const human = new Human('人类');
human.speak('你好'); // 人类说：你好`;

const demo14 = `class Biology {
    constructor(species) {
        this.species = species;
    }

    speak(speak) {
        console.log(this.species+'说：'+speak);
    }
}

class Human extends Biology {
    constructor(species) {
        super(species);
    }
}

const human = new Human('人类');
human.speak('你好');`;

const demo15 = `
/**
 * Proxy
 * @param target 需要代理的对象
 * @param handler 用于对对象的操作 如自定义的set和get函数
 */
const p = new Proxy(target, handler);`;

const demo16 = `function onWatch(target, setCb, getCb) {
    const handler = {
        get(t, p, r) {
            getCb(t, p);
            return Reflect.get(t, p, r);
        },
        set(t, p, v, r) {
            setCb(p, v);
            return Reflect.set(t, p, v, r);
        },
    };

    return new Proxy(target, handler);
}

const obj = { a: 1 };

const watchObj = onWatch(
    obj,
    (p, v) => {
        console.log('监听到属性'+p+'值为：'+v);
    },
    (t, p) => {
        console.log('属性'+p+'的值为：'+t[p]);
    }
);

watchObj.b = 2; // 监听到属性b值为：2
watchObj.b; // 属性b的值为：2`;

const demo17 = `console.log([1, 2, 3].map((item) => item + 2)); // [3, 4, 5]`;
const demo18 = `console.log([1, 2, 4, 9, 99].filter((item) => item > 4)); // [9, 99]`;
const demo19 = `const sum = [1, 4, 9].reduce((add, current) => add + current, 10);
console.log(sum); // 24`;

const demo20 = `function Human() {}
Human.prototype.sound = function () {
    console.log('你好呀');
};
function Dog() {}
Dog.prototype.sound = function () {
    console.log('汪汪汪~');
};
function makeSound(animal) {
    if (animal && animal.sound instanceof Function) {
        animal.sound();
    }
}
makeSound(new Human()); // 你好呀
makeSound(new Dog()); // 汪汪汪~`;

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
    demo13,
    demo14,
    demo15,
    demo16,
    demo17,
    demo18,
    demo19,
    demo20,
};
