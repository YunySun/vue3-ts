/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-10-02 17:12:14
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-03 17:48:24
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `cargo new rust-project // 创建新项目
cd rust-project
cargo build 
cargo run `;

const demo2 = `[dependencies]
reqwest = {version = "0.11", features = ["blocking"]}
html2md = "0.2"`;

const demo3 = `use std::fs;

fn main() {
    let url = "https://www.rust-lang.org/";
    let output = "rust.md";

    println!("Fetching url: {}", url);
    let body = reqwest::blocking::get(url).unwrap().text().unwrap();

    println!("Converting html to markdown...");
    let md = html2md::parse_html(&body);

    fs::write(output, md.as_bytes()).unwrap();
    println!("Converted markdown has been saved in {}.", output);
}`;

const demo4 = `Fetching url: https://www.bilibili.com/
Converting html to markdown...
Converted markdown has been saved in rust.md.`;

const demo5 = `// 定义一个参数为数字和函数的函数
fn apply(value: i32, f: fn(i32) -> i32) -> i32 {
    f(value)
}

// 定义一个数字次方的函数
fn square(value: i32) -> i32 {
    return value * value;
}

// 定义一个数字立方的函数
fn cube(value: i32) -> i32 {
    return value * value * value;
}

fn main() {
    println!("apply square: {}", apply(10, square));
    println!("apply cube: {}", apply(20, cube))
}

// cargo run
// apply square: 100
// apply cube: 8000`;

const demo6 = `// 定义一个无return的函数
fn pi() -> f64 {
    3.1415926
}

// 定义一个未设置返回值类型的函数
fn not_pi() {
    3.1415926;
}

fn main() {
    let is_pi = pi();
    let is_unit1 = not_pi();
    let is_unit2 = {
        pi();
    };
    println!(
        "is_pi: {:?}, is_unit1: {:?}, is_unit2: {:?}",
        is_pi, is_unit1, is_unit2
    );
}

// cargo run
// is_pi: 3.1415926, is_unit1: (), is_unit2: ()`;

const demo7 = `#[derive(Debug)]
enum Gender {
    Unspecified = 0,
    Male = 1,
    Female = 2,
}

#[derive(Debug, Copy, Clone)]
struct UserId(u64);

#[derive(Debug, Copy, Clone)]
struct TopicId(u64);

#[derive(Debug)]
struct User {
    id: UserId,
    name: String,
    gender: Gender,
}

#[derive(Debug)]
struct Topic {
    id: TopicId,
    name: String,
    owner: UserId,
}

// 定义聊天室可能发生的事
#[derive(Debug)]
enum Event {
    Join((UserId, TopicId)),
    Leave((UserId, TopicId)),
    Message((UserId, TopicId, String)),
}

fn main() {
    let alice = User {
        id: UserId(1),
        name: "Alice".into(),
        gender: Gender::Female,
    };
    let bob = User {
        id: UserId(2),
        name: "Bob".into(),
        gender: Gender::Male,
    };
    let topic = Topic {
        id: TopicId(1),
        name: "rust".into(),
        owner: UserId(1),
    };
    let event1 = Event::Join((alice.id, topic.id));
    let event2 = Event::Join((bob.id, topic.id));
    let event3 = Event::Message((alice.id, topic.id, "Hello world!".into()));
    println!(
        "event1: {:?}, event2: {:?}, event3: {:?}",
        event1, event2, event3
    );
}

// event1: Join((UserId(1), TopicId(1))), event2: Join((UserId(2), TopicId(1))), event3: Message((UserId(1), TopicId(1), "Hello world!"))
`;

const demo8 = `// 定义一个通过loop实现的斐波那契数列
fn fib_loop(n: u8) {
    let mut a = 1;
    let mut b = 1;
    let mut i = 2u8;

    loop {
        let c = a + b;
        a = b;
        b = c;
        i += 1;
        println!("next val is {}", b);

        if i > n {
            break;
        }
    }
}

// 定义一个通过while实现的斐波那契数列
fn fib_while(n: u8) {
    let (mut a, mut b, mut i) = (1, 1, 2);
    while i < n {
        let c = a + b;
        a = b;
        b = c;
        i += 1;
        println!("next val is {}", b);
    }
}

// 定义一个通过for循环实现的斐波那契数列
fn fib_for(n: u8) {
    let (mut a, mut b) = (1, 1);
    for _i in 2..n {
        let c = a + b;
        a = b;
        b = c;
        println!("next val is {}", b);
    }
}

fn main() {
    let n = 10;
    fib_loop(n);
    fib_while(n);
    fib_for(n);
}`;

const demo9 = `let arr = [1, 2, 3];
assert_eq!(arr[..], [1, 2, 3]);
assert_eq!(arr[0..=1], [1, 2]);`;

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
};
