/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-10-31 17:17:26
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-31 17:17:34
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `use std::mem::{align_of, size_of};

struct S1 {
    a: u8,
    b: u16,
    c: u8,
}

struct S2 {
    a: u8,
    c: u8,
    b: u16,
}

fn main() {
    println!("sizeof S1: {}, S2: {}", size_of::<S1>(), size_of::<S2>()); // sizeof S1: 4, S2: 4
    println!("alignof S1: {}, S2: {}", align_of::<S1>(), align_of::<S2>()) // alignof S1: 2, S2: 2
}`;

export default {
    demo1,
};
