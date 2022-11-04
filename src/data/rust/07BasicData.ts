/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-11-03 16:11:25
 * @LastEditors: 李昶
 * @LastEditTime: 2022-11-04 17:11:59
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
