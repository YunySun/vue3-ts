/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-11-01 09:54:14
 * @LastEditors: 李昶
 * @LastEditTime: 2022-11-02 17:14:40
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `use std::collections::BTreeMap;

fn main() {
    let mut map = BTreeMap::new();
    map.insert("hello", "world");
    println!("map: {:?}", map);
}`;

const demo2 = `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let even_numbers = numbers.into_iter().filter(|n| n % 2 == 0).collect();

    println!("{:?}", even_numbers)
}`;

const demo3 = `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let even_numbers: Vec<_> = numbers.into_iter().filter(|n| n % 2 == 0).collect();

    println!("{:?}", even_numbers)
}`;

const demo4 = `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let even_numbers = numbers
        .into_iter()
        .filter(|n| n % 2 == 0)
        .collect::<Vec<_>>();

    println!("{:?}", even_numbers)
}`;

const demo5 = `use std::net::SocketAddr;

fn main() {
    let addr = "127.0.0.1:8080".parse::<SocketAddr>().unwrap();
    println!("addr: {:?}, port: {:?}", addr.ip(), addr.port());
}`;

const demo6 = `const PI: f64 = 3.1415926;
static E: f32 = 2.71828;

fn main() {
    const V: u32 = 10;
    static V1: &str = "hello";
    println!("PI: {}, E: {}, V {}, V1: {}", PI, E, V, V1);
}`;

export default {
    demo1,
    demo2,
    demo3,
    demo4,
    demo5,
    demo6,
};
