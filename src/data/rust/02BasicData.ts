/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-10-26 23:22:41
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-27 16:13:07
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `fn main() {
    let data = vec![1, 2, 3, 4];
    let data1 = &data;
    // 值的地址是什么？引用的地址又是什么？
    println!(
        "addr of value: {:p}({:p}), addr of data {:p}, data1: {:p}",
        &data, data1, &&data, &data1
    );
    println!("sum of data1: {}", sum(data1));

    // 对上的地址是什么？
    println!(
        "addr of items: [{:p}, {:p}, {:p}, {:p}]",
        &data[0], &data[1], &data[2], &data[3]
    );
}

fn sum(data: &Vec<u32>) -> u32 {
    // 值的地址会改变么？引用的地址会改变吗？
    println!("addr of value: {:p}, addr of ref: {:p}", data, &data);
    data.iter().fold(0, |acc, x| acc + x)
}
// addr of value: 0x7e3eeff718(0x7e3eeff718), addr of data 0x7e3eeff7b8, data1: 0x7e3eeff730
// addr of value: 0x7e3eeff718, addr of ref: 0x7e3eeff558
// sum of data1: 10
// addr of items: [0x1a19aa50590, 0x1a19aa50594, 0x1a19aa50598, 0x1a19aa5059c]`;

const demo2 = `fn main() {
    let r = local_ref();
    println!("r: {:p}", r);
}

fn local_ref<'a>() -> &'a i32 {
    let a = 42;
    &a
}`;

const demo3 = `fn main() {
    let mut data: Vec<&u32> = Vec::new();
    let v = 42;
    data.push(&v);
    println!("data: {:?}", data);
}
`;

const demo4 = `fn main() {
    let mut data: Vec<&u32> = Vec::new();
    push_local_ref(&mut data);
    println!("data: {:?}", data);
}

fn push_local_ref(data: &mut Vec<u32>) {
    let v = 42;
    data.push(v)
}
`;

const demo5 = `fn main() {
    let mut data = vec![1, 2, 3];

    for item in data.iter_mut() {
        data.push(*item + 1);
    }
}
`;

const demo6 = `fn main() {
    let mut data = vec![1, 2, 3];
    let data1 = vec![&data[0]];
    println!("data[0]: {:p}", &data[0]);

    for i in 0..100 {
        data.push(i);
    }

    println!("data[0]: {:p}", &data[0]);
    println!("boxed: {:p}", &data1);
}`;

export default {
    demo1,
    demo2,
    demo3,
    demo4,
    demo5,
    demo6,
};
