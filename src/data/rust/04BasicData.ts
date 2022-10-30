/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-10-28 15:44:16
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-30 18:26:13
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `fn main() {
    let x;
    {
        let y = 42;
        x = &y;
    }
    println!("x: {}", x);
}`;

const demo2 = `fn main() {
    let y = 42;

    let x = &y;

    println!("x: {}", x);
}`;

const demo3 = `fn main() {
    let s1 = String::from("Lindsey");
    let s2 = String::from("Rosie");

    let result = max(&s1, &s2);

    println!("bigger one: {}", result);
}

fn max(s1: &str, s2: &str) -> &str {
    if s1 > s2 {
        s1
    } else {
        s2
    }
}
// expected named lifetime parameter`;

export default {
    demo1,
    demo2,
    demo3,
};
