/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-10-26 15:54:42
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-26 17:17:05
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `fn main() {
    let data = vec![10, 42, 9, 8];
    let v = 42;
    if let Some(pos) = find_pos(data, v) {
        println!("Found {} at {}", v, pos);
    }
}

fn find_pos(data: Vec<u32>, v: u32) -> Option<usize> {
    for (pos, item) in data.iter().enumerate() {
        if *item == v {
            return Some(pos);
        }
    }
    None
}`;

const demo2 = `fn main() {
    let data = vec![1, 2, 3, 4];
    let data1 = data;
    println!("sum of data1: {}", sum(data1));
    println!("data1: {:?}", data1);
    println!("sum of data: {}", sum(data));
}

fn sum(data: Vec<u32>) -> u32 {
    data.iter().fold(0, |acc, x| acc + x)
}
`;

export default {
    demo1,
    demo2,
};
