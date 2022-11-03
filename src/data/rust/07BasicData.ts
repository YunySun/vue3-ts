/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-11-03 16:11:25
 * @LastEditors: 李昶
 * @LastEditTime: 2022-11-03 22:34:30
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

export default {
    demo1,
};
