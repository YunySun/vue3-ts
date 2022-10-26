/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-10-26 15:54:42
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-26 23:10:22
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

const demo3 = `/*
* @Description:
* @Author: 李昶
* @Date: 2022-10-26 22:56:45
* @LastEditors: 李昶
* @LastEditTime: 2022-10-26 23:08:20
* @Profile: 一个比较废柴的前端开发
*/
fn is_copy<T: Copy>() {}

fn types_impl_copy_trait() {
   is_copy::<bool>();
   is_copy::<char>();

   // all iXX and uXX,usize/isize,fXX implement Copy trait
   is_copy::<i8>();
   is_copy::<u64>();
   is_copy::<i64>();
   is_copy::<usize>();

   // function (actually a pointer) is Copy
   is_copy::<fn()>();

   // raw pointer is Copy
   is_copy::<*const String>();
   is_copy::<*mut String>();

   // immutable reference is Copy
   is_copy::<&[Vec<u8>]>();
   is_copy::<&String>();

   // array/tuple with values which is Copy is Copy
   is_copy::<[u8; 4]>();
   is_copy::<(&str, &str)>();
}

fn types_not_impl_copy_trait() {
   // unsized or dynamic sized type is not Copy
   is_copy::<str>();
   is_copy::<[u8]>();
   is_copy::<Vec<u8>>();
   is_copy::<String>();

   // mutable reference is not Copy
   is_copy::<&mut String>();

   // array/tuple with values that not Copy is not Copy
   is_copy::<[Vec<u8>; 4]>();
   is_copy::<(String, u32)>();
}

fn main() {
   types_impl_copy_trait();
   types_not_impl_copy_trait();
}
`;

export default {
    demo1,
    demo2,
    demo3,
};
