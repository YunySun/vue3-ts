/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-11-01 09:54:14
 * @LastEditors: 李昶
 * @LastEditTime: 2022-11-03 12:10:03
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

const demo7 = `enum Option<T> {
    Some(T),
    None,
}`;

const demo8 = `pub struct Vec<T, #[unstable(feature = "allocator_api", issue = "32838")] A: Allocator = Global> {
    buf: RawVec<T, A>,
    len: usize,
}

pub(crate) struct RawVec<T, A: Allocator = Global> {
    ptr: Unique<T>,
    cap: usize,
    alloc: A,
}`;

const demo9 = `pub enum Cow<'a, B: ?Sized + 'a>
where
    B: ToOwned,
{
    // 借用的数据
    Borrowed(&'a B),
    // 拥有的数据
    Owned(<B as ToOwned>::Owned),
}`;

const demo10 = `use std::fs::File;
use std::io::{BufReader, Read, Result};

// 定义一个带有泛型参数R的reader，此处不限制R
struct MyReader<R> {
    reader: R,
    buf: String,
}

// 实现new函数 不需要限制R
impl<R> MyReader<R> {
    pub fn new(reader: R) -> Self {
        Self {
            reader,
            buf: String::with_capacity(1024),
        }
    }
}

// 定义process函数 此时使用到R方法 所以必须约束R
impl<R> MyReader<R>
where
    R: Read,
{
    pub fn process(&mut self) -> Result<usize> {
        self.reader.read_to_string(&mut self.buf)
    }
}

fn main() {
    let f = File::open("rust.md").unwrap();
    let mut reader = MyReader::new(BufReader::new(f));

    let size = reader.process().unwrap();
    println!("total size read: {}", size);
}`;

const demo11 = `fn id<T>(x: T) -> T {
    return x;
}

fn main() {
    let int = id(10);
    let string = id("hello world!");
    println!("{}, {}", int, string); // 10, hello world!
}`;

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
};
