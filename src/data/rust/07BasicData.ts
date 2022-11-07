/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-11-03 16:11:25
 * @LastEditors: 李昶
 * @LastEditTime: 2022-11-07 11:43:30
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `pub trait Write {
    #[stable(feature = "rust1", since = "1.0.0")]
    fn write(&mut self, buf: &[u8]) -> Result<usize>;
    #[stable(feature = "iovec", since = "1.36.0")]
    fn write_vectored(&mut self, bufs: &[IoSlice<'_>]) -> Result<usize> {}
    #[unstable(feature = "can_vector", issue = "69941")]
    fn is_write_vectored(&self) -> bool {}
    #[stable(feature = "rust1", since = "1.0.0")]
    fn flush(&mut self) -> Result<()>;
    #[stable(feature = "rust1", since = "1.0.0")]
    fn write_all(&mut self, mut buf: &[u8]) -> Result<()> {}

    #[unstable(feature = "write_all_vectored", issue = "70436")]
    fn write_all_vectored(&mut self, mut bufs: &mut [IoSlice<'_>]) -> Result<()> {}

    #[stable(feature = "rust1", since = "1.0.0")]
    fn write_fmt(&mut self, fmt: fmt::Arguments<'_>) -> Result<()> {}

    #[stable(feature = "rust1", since = "1.0.0")]
    fn by_ref(&mut self) -> &mut Self where Self: Sized,{}
}`;

const demo2 = `use std::fmt;
use std::io::Write;

struct BufBuilder {
    buf: Vec<u8>,
}

impl BufBuilder {
    pub fn new() -> Self {
        Self {
            buf: Vec::with_capacity(1024),
        }
    }
}

// 实现Debug trait，打印字符串
impl fmt::Debug for BufBuilder {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", String::from_utf8_lossy(&self.buf))
    }
}

impl Write for BufBuilder {
    fn write(&mut self, buf: &[u8]) -> std::io::Result<usize> {
        // 将buf添加到BufBuilder的尾部
        self.buf.extend_from_slice(buf);
        Ok(buf.len())
    }

    fn flush(&mut self) -> std::io::Result<()> {
        // 由于是在内存操作 所以不需要flush
        Ok(())
    }
}

fn main() {
    let mut buf = BufBuilder::new();
    buf.write_all(b"hello world").unwrap();
    println!("{:?}", buf);
}`;

const demo3 = `pub trait Parse {
    fn parse(s: &str) -> Self;
}`;

const demo4 = `use regex::Regex;

pub trait Parse {
    fn parse(s: &str) -> Self;
}

impl Parse for u8 {
    fn parse(s: &str) -> Self {
        let re: Regex = Regex::new(r"^[0-9]+").unwrap();
        if let Some(captures) = re.captures(s) {
            captures
                .get(0)
                .map_or(0, |s| s.as_str().parse().unwrap_or(0))
        } else {
            0
        }
    }
}

#[test]
fn parse_should_work() {
    assert_eq!(u8::parse("123abcd"), 123);
    assert_eq!(u8::parse("1234abcd"), 0);
    assert_eq!(u8::parse("abcd"), 0);
}

fn main() {
    println!("result: {}", u8::parse("255 hello world"));
    println!("result: {}", f64::parse("255.52hello world"))
}`;

const demo5 = `impl Parse for f64 {
    fn parse(s: &str) -> Self {
        let re: Regex = Regex::new(r"[0-9]+\\.[0-9]+").unwrap();
        if let Some(captures) = re.captures(s) {
            captures
                .get(0)
                .map_or(0.0, |s| s.as_str().parse().unwrap_or(0.0))
        } else {
            0.0
        }
    }
}`;

const demo6 = `use regex::Regex;
use std::str::FromStr;

pub trait Parse {
    fn parse(s: &str) -> Self;
}

// 约束T必须同时实现了FromStr和Default 否则Default::default作为缺省值报错
impl<T> Parse for T
where
    T: FromStr + Default,
{
    fn parse(s: &str) -> Self {
        let re: Regex = Regex::new(r"^[0-9]+(\\.[0-9]+)?").unwrap();
        // 生成一个创建缺省值的闭包
        // Default::default()返回的类型根据上下文能推导出来，是Self
        // 约定了Self，T需要实现Default trait
        let d = || Default::default();
        if let Some(captures) = re.captures(s) {
            captures
                .get(0)
                .map_or(d(), |s| s.as_str().parse().unwrap_or(d()))
        } else {
            d()
        }
    }
}

#[test]
fn parse_should_work() {
    assert_eq!(u8::parse("123abcd"), 123);
    assert_eq!(u8::parse("1234abcd"), 0);
    assert_eq!(u8::parse("abcd"), 0);
}

fn main() {
    println!("result: {}", u8::parse("255 hello world"));
    println!("result: {}", f64::parse("255.52hello world"));
    println!("result: {}", f64::parse("abcd"))
}`;

const demo7 = `pub trait Parse {
    fn parse(s: &str) -> Result<Self, E>; // error: cannot find type E in this scope
}`;

const demo8 = `pub trait Parse {
    type Error;
    fn parse(s: &str) -> Result<Self, Self::Error>; // the size for values of type Self cannot be known at compilation time 添加where Self: Sized;
}`;

const demo9 = `use regex::Regex;
use std::str::FromStr;

pub trait Parse {
    type Error;
    fn parse(s: &str) -> Result<Self, Self::Error>
    where
        Self: Sized;
}

// 约束T必须同时实现了FromStr和Default 否则Default::default作为缺省值报错
impl<T> Parse for T
where
    T: FromStr + Default,
{
    // 定义关联类型Error为String
    type Error = String;
    fn parse(s: &str) -> Result<Self, Self::Error> {
        let re: Regex = Regex::new(r"^[0-9]+(\\.[0-9]+)?").unwrap();
        if let Some(captures) = re.captures(s) {
            captures.get(0).map_or(Err("failed".to_string()), |s| {
                s.as_str().parse().map_err(|_err| "failed".to_string())
            })
        } else {
            Err("failed".to_string())
        }
    }
}

#[test]
fn parse_should_work() {
    assert_eq!(u8::parse("123abcd"), Ok(123));
    assert_eq!(u32::parse("1234abcd"), Ok(1234));
    assert_eq!(u8::parse("abcd"), Err("failed".into()));
}

fn main() {
    println!("result: {:?}", u8::parse("255 hello world"));
    println!("result: {:?}", f64::parse("255.52hello world"));
    println!("result: {:?}", f64::parse("abcd"))
}`;

const demo10 = `pub trait Add<Rhs = Self> {
    #[stable(feature = "rust1", since = "1.0.0")]
    type Output;
    #[must_use]
    #[stable(feature = "rust1", since = "1.0.0")]
    fn add(self, rhs: Rhs) -> Self::Output;
}`;

const demo11 = `use std::ops::Add;

#[derive(Debug)]
struct Complex {
    real: f64,
    imagine: f64,
}

impl Complex {
    pub fn new(real: f64, imagine: f64) -> Self {
        Self { real, imagine }
    }
}

impl Add for Complex {
    type Output = Self;
    fn add(self, rhs: Self) -> Self::Output {
        let real = self.real + rhs.real;
        let imagine = self.imagine + rhs.imagine;
        Self::new(real, imagine)
    }
}

fn main() {
    let c1 = Complex::new(1.0, 1f64);
    let c2 = Complex::new(2 as f64, 3.0);
    println!("{:?}", c1 + c2);
    println!("{:?}", c1 + c2); // 报错 无法编译
}`;

const demo12 = `// 如果不想移动所有权，可以使用&Complex实现add，这样可以做&c1+&c2
impl Add for &Complex {
    // 所以返回值不是Self了，因为此时的Self是&Complex
    type Output = Complex;
    fn add(self, rhs: Self) -> Self::Output {
        let real = self.real + rhs.real;
        let imagine = self.imagine + rhs.imagine;
        Complex::new(real, imagine)
    }
}

fn main() {
    let c1 = Complex::new(1.0, 1f64);
    let c2 = Complex::new(2 as f64, 3.0);
    println!("{:?}", &c1 + &c2);
    println!("{:?}", &c1 + &c2); 
}`;

const demo13 = `// 因为Add<Rhs=Self>是个泛型的trait，所以可以为Complex实现Add<f64>
impl Add<f64> for &Complex {
    type Output = Complex;
    fn add(self, rhs: f64) -> Self::Output {
        let real = self.real + rhs;
        Complex::new(real, self.imagine)
    }
}

fn main() {
    let c1 = Complex::new(1.0, 1f64);
    let c2 = Complex::new(2 as f64, 3.0);
    println!("{:?}", &c1 + &c2);
    println!("{:?}", &c1 + &c2);
    println!("{:?}", &c1 + 5.0);
}`;

const demo14 = `impl<T: ?Sized> StreamExt for T where T: Stream {}`;

const demo15 = `struct Cat;
struct Dog;

trait Animal {
    fn name(&self) -> &'static str;
}

impl Animal for Cat {
    fn name(&self) -> &'static str {
        "Cat"
    }
}

impl Animal for Dog {
    fn name(&self) -> &'static str {
        "Dog"
    }
}

fn animal_name(animal: impl Animal) -> &'static str {
    animal.name()
}

fn main() {
    let cat = Cat;
    println!("cat: {}", animal_name(cat));
}`;

const demo16 = `fn animal_name(animal: T:Animal) -> &'static str;`;

const demo17 = `pub trait Formatter {
    fn format(&self, input: &mut String) -> bool;
}

struct MarkdownFormatter;
impl Formatter for MarkdownFormatter {
    fn format(&self, input: &mut String) -> bool {
        input.push_str("\nformatted with Markdown formatter");
        true
    }
}

struct RustFormatter;
impl Formatter for RustFormatter {
    fn format(&self, input: &mut String) -> bool {
        input.push_str("\nformatted with Rust formatter");
        true
    }
}

struct HtmlFormatter;
impl Formatter for HtmlFormatter {
    fn format(&self, input: &mut String) -> bool {
        input.push_str("\nformatted with HTML formatter");
        true
    }
}`;

const demo18 = `pub fn format(input: &mut String, formatters: Vec<???>) {
    for formatter in formatters {
        formatter.format(input);
    }
}`;

const demo19 = `pub fn format(input: &mut String, formatters: Vec<&dyn Formatter>) {
    for formatter in formatters {
        formatter.format(input);
    }
}`;

const demo20 = `pub trait Formatter {
    fn format(&self, input: &mut String) -> bool;
}

struct MarkdownFormatter;
impl Formatter for MarkdownFormatter {
    fn format(&self, input: &mut String) -> bool {
        input.push_str("\nformatted with Markdown formatter");
        true
    }
}

struct RustFormatter;
impl Formatter for RustFormatter {
    fn format(&self, input: &mut String) -> bool {
        input.push_str("\nformatted with Rust formatter");
        true
    }
}

struct HtmlFormatter;
impl Formatter for HtmlFormatter {
    fn format(&self, input: &mut String) -> bool {
        input.push_str("\nformatted with HTML formatter");
        true
    }
}

pub fn format(input: &mut String, formatters: Vec<&dyn Formatter>) {
    for formatter in formatters {
        formatter.format(input);
    }
}

fn main() {
    let mut text = "hello world".to_string();
    let html: &dyn Formatter = &HtmlFormatter;
    let rust: &dyn Formatter = &RustFormatter;
    let formatters = vec![html, rust];
    format(&mut text, formatters);
    println!("text: {}", text);
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
    demo12,
    demo13,
    demo14,
    demo15,
    demo16,
    demo17,
    demo18,
    demo19,
    demo20,
};
