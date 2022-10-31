/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-10-31 17:17:26
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-31 22:31:07
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

const demo2 = `use std::collections::HashMap;
use std::mem::size_of;

enum E {
    A(f64),
    B(HashMap<String, String>),
    C(Result<Vec<u8>, String>),
}

// 这是一个声明宏，它会打印各种数据结构本身的大小，在Option中的大小，以及在Result中的大小
macro_rules! show_size {
    (header) => {
        println!(
            "{:<24} {:>4}  {}  {}",
            "Type", "T", "Option<T>", "Result<T, io::Error>",
        );

        println!("{}", "-".repeat(64))
    };
    ($t:ty) => {
        println!(
            "{:<24} {:4}  {:8}  {:12}",
            stringify!($t),
            size_of::<$t>(),
            size_of::<Option<$t>>(),
            size_of::<Result<$t, std::io::Error>>(),
        )
    };
}

fn main() {
    show_size!(header);
    show_size!(u8);
    show_size!(f64);
    show_size!(&u8);
    show_size!(Box<u8>);
    show_size!(&[u8]);

    show_size!(String);
    show_size!(Vec<u8>);
    show_size!(HashMap<String, String>);
    show_size!(E)
}`;

const demo3 = `Type                        T  Option<T>  Result<T, io::Error>
----------------------------------------------------------------
u8                          1         2            16
f64                         8        16            16
&u8                         8         8            16
Box<u8>                     8         8            16
&[u8]                      16        16            24
String                     24        24            32
Vec<u8>                    24        24            32
HashMap<String, String>    48        48            56
E                          56        56            64`;

const demo4 = `use std::fs::File;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    let mut file = File::create("foo.txt")?;
    file.write_all(b"hello world!")?;
    Ok(())
}`;

export default {
    demo1,
    demo2,
    demo3,
    demo4,
};
