/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-10-28 15:44:16
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-31 15:19:24
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

const demo4 = `fn main() {
    let s1 = String::from("Lindsey");
    let s2 = String::from("Rosie");

    let result = max(&s1, &s2);

    println!("bigger one: {}", result);
}

fn get_max(s1: &str) -> &str {
    max(s1, "Cynthia")
}

fn max(s1: &str, s2: &str) -> &str {
    if s1 > s2 {
        s1
    } else {
        s2
    }
}`;

const demo5 = `fn main() {
    let s1 = String::from("Lindsey");
    let s2 = String::from("Rosie");

    let result = max(&s1, &s2);

    println!("bigger one: {}", result);

    let result = get_max(&s1);

    println!("bigger one: {}", result);
}

fn get_max<'a>(s1: &str) -> &str {
    max(s1, "Cynthia")
}

fn max<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1 > s2 {
        s1
    } else {
        s2
    }
}`;

const demo6 = `fn main() {
    let s1 = "Hello,world";

    println!("first world of s1: {}", first(&s1));
}

fn first(s: &str) -> &str {
    let trimmed = s.trim();
    println!("trimmed: {}", trimmed);
    match trimmed.find(' ') {
        None => "",
        Some(pos) => &trimmed[..pos],
    }
}`;

const demo7 = `fn main() {
    let s1 = "Hello,world";

    println!("first world of s1: {}", first(&s1));
}

fn first<'a>(s: &'a str) -> &'a str {
    let trimmed = s.trim();
    println!("trimmed: {}", trimmed);
    match trimmed.find(' ') {
        None => "",
        Some(pos) => &trimmed[..pos],
    }
}`;

const demo8 = `fn main() {
    let s = "hello world".to_owned();
    let mut s1 = s.as_str();
    let hello = strtok(&mut s1, ' ');
    println!("s: {}, s1: {}, hello: {}", s, s1, hello);
}

pub fn strtok(s: &mut &str, delimiter: char) -> &str {
    println!("s: {:?}", s.find(delimiter));
    if let Some(i) = s.find(delimiter) {
        let prefix = &s[..i];
        println!("prefix: {:?}", prefix);
        println!("delimiter.len_utf8(): {:?}", delimiter.len_utf8());
        let suffix = &s[(i + delimiter.len_utf8())..];
        *s = suffix;
        println!("suffix: {:?}", suffix);
        prefix
    } else {
        let prefix = *s;
        *s = "";
        prefix
    }
}`;

const demo9 = `pub fn strtok<'a>(s: &mut &'a str, delimiter: char) -> &'a str`;

const demo10 = `struct Employee<'a, 'b> {
    name: &'a str,
    title: &'b str,
    age: u8,
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
};
