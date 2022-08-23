/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-08-23 22:57:05
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-23 23:05:45
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

export default {
    demo1,
    demo2,
};
