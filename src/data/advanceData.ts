/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-09-14 11:17:37
 * @LastEditors: 李昶
 * @LastEditTime: 2022-09-14 11:19:16
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `function func(x, y, z) {
    console.log(x, y, z);
    console.log(this.sound);
}

let obj = {
    sound: '你好',
};

func.call(obj, 1, 2, 3);`;

export default {
    demo1,
};
