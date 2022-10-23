/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-10-22 16:43:28
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-23 17:13:41
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `// 解析出来的图片处理的参数
struct ImageSpec {
    specs: Vec<Spec>,
}

// 每个参数是支持的某种方式
enum Spec {
    Resize(Resize),
    Crop(Crop),
}

// 处理图片的resize
struct Resize {
    width: u32,
    height: u32,
}`;

const demo2 = `message ImageSpec { repeated Spec specs = 1; }

message Spec {
    oneof data {
        Resize resize = 1;
        Crop crop = 2;
    }
} `;

const demo3 = `http://localhost:3000/image/CgoKCAjYBBCgBiADCgY6BAgUEBQKBDICCAM/`;

const demo4 = `fn print_test_url(url: &str) {
    use std::borrow::Borrow;
    let spec1 = Spec::new_resize(600, 800, resize::SampleFilter::CatmullRom);
    let spec2 = Spec::new_watermark(20, 20);
    let spec3 = Spec::new_filter(filter::Filter::Marine);
    let image_spec = ImageSpec::new(vec![spec1, spec2, spec3]);
    let s: String = image_spec.borrow().into();
    let test_image = percent_encode(url.as_bytes(), NON_ALPHANUMERIC).to_string();
    println!("test url: http://localhost:3000/image/{}/{}", s, test_image);
}`;

const demo5 = `[package]
name = "thumbor"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
axum = "0.5" # web服务器
anyhow = "1" # 错误处理
base64 = "0.13" # base64 编码/解码
bytes = "1" # 处理字节流
image = "0.24" # 处理图片
lazy_static= "1" # 通过宏更方便地初始化静态变量
lru = "0.8" # LRU缓存
percent-encoding = "2" # url 编码/解码
photon-rs = "0.3" # 图片效果
prost = "0.11" # protobuf处理
reqwest = "0.11" # http client
serde = { version = "1", features = ["derive"] } # 序列化/反序列化数据
tokio = { version =  "1", features = ["full"]} # 异步处理
tower = { version = "0.4", features = ["util", "timeout", "load-shed", "limit"] } # 服务处理中间件
tower-http = { version = '0.3', features = ["add-extension", "compression-full", "trace"] } # http中间件
tracing = "0.1" # 日志和追踪
tracing-subscriber  = "0.3" # 日志和追踪

[build-dependencies]
prost-build = "0.11" # 编译protobuf`;

const demo6 = `syntax = "proto3";

package abi; // 这个名字会被用作编译结果，prost会产生：abi.rs

// 一个ImageSpec是一个有序的数组，服务器按照spec的顺序处理
message ImageSpec { repeated Spec specs = 1; }

// 处理图片改变大小
message Resize {
    uint32 width = 1;
    uint32 height = 2;

    enum ResizeType {
        NORMAL = 0;
        SEAM_CRAVE = 1;
    }

    ResizeType rtype = 3;

    enum SampleFilter {
        UNDEFINED = 0;
        NEAREST = 1;
        TRIANGLE = 2;
        CATMULL_ROM = 3;
        GAUSSIAN = 4;
        LANCZ0S3 = 5;
    }

    SampleFilter filter = 4;
}

// 处理图片截取
message Crop {
    uint32 x1 = 1;
    uint32 y1 = 2;
    uint32 x2 = 3;
    uint32 y2 = 4;
}

// 处理水平翻转
message Fliph {}
// 处理垂直翻转
message Flipv {}
// 处理对比度
message Contrast { float contrast = 1; }
// 处理滤镜
message Filter {
    enum Filter {
        UNSPECIFIED = 0;
        OCEANIC = 1;
        ISLANDS = 2;
        MARINE = 3;
        // more: https://docs.rs/photon-rs/0.3.1/photon_rs/filters/fn.filter.html
    }

    Filter filter = 1;
}

// 处理水印
message Watermark {
    uint32 x = 1;
    uint32 y = 2;
}

// 一个spec可以包含上述的处理方式之一
message Spec {
    oneof data {
        Resize resize = 1;
        Crop crop = 2;
        Flipv flipv = 3;
        Fliph fliph = 4;
        Contrast contrast = 5;
        Filter filter = 6;
        Watermark watermark = 7;
    }
}`;

const demo7 = `fn main() {
    let mut prost_build = prost_build::Config::new();
    prost_build.out_dir("src/pb");
    prost_build.compile_protos(&["abi.proto"], &["."]).unwrap();
}`;

const demo8 = `/*
* @Description:
* @Author: 李昶
* @Date: 2022-10-23 11:46:38
* @LastEditors: 李昶
* @LastEditTime: 2022-10-23 17:06:24
* @Profile: 一个比较废柴的前端开发
*/
use base64::{decode_config, encode_config, URL_SAFE_NO_PAD};
use photon_rs::transform::SamplingFilter;
use prost::Message;
use std::convert::TryFrom;

mod abi; // 声明abi.rs
pub use abi::*;
impl ImageSpec {
   pub fn new(specs: Vec<Spec>) -> Self {
       Self { specs }
   }
}

// 让ImageSpec 可以生成一个字符串
impl From<&ImageSpec> for String {
   fn from(image_spec: &ImageSpec) -> Self {
       let data = image_spec.encode_to_vec();
       encode_config(data, URL_SAFE_NO_PAD)
   }
}

// 让ImageSpec可以通过一个字符串创建。比如s.parse().unwrap()
impl TryFrom<&str> for ImageSpec {
   type Error = any::Error;

   fn try_from(value: &str) -> Result<Self, Self::Error> {
       let data = decode_config(value, URL_SAFE_NO_PAD)?;
       Ok(ImageSpec::decode(&data[..])?)
   }
}

// 辅助函数，photo_rs相应的方法需要字符串
impl filter::Filter {
   pub fn to_str(&self) -> Option<&'static str> {
       match self {
           filter::Filter::Unspecified => None,
           filter::Filter::Oceanic => Some("oceanic"),
           filter::Filter::Islands => Some("islands"),
           filter::Filter::Marine => Some("marine"),
       }
   }
}

// 在我们定义的SampleFilter和photo_rs的SamplingFilter间转换
impl From<resize::SampleFilter> for SampleFilter {
   fn from(v: resize::SampleFilter) -> Self {
       match v {
           resize::SampleFilter::Undefined => SampleFilter::Nearest,
           resize::SampleFilter::Nearest => SampleFilter::Nearest,
           resize::SampleFilter::Triangle => SampleFilter::Triangle,
           resize::SampleFilter::CatmullRom => SampleFilter::CatmullRom,
           resize::SampleFilter::Gaussian => SampleFilter::Gaussian,
           resize::SampleFilter::Lancz0s3 => SampleFilter::Lancz0s3,
       }
   }
}

impl Spec {
   pub fn new_resize_seam_carve(width: u32, height: u32) -> Self {
       Self {
           data: Some(spec::Date::Resize(Resize {
               width,
               height,
               rtype: resize::ResizeType::SeamCrave as i32,
               filter: resize::SampleFilter::Undefined as i32,
           })),
       }
   }

   pub fn new_resize(width: u32, height: u32, filter: resize::SampleFilter) -> Self {
       Self {
           data: Some(spec::Data::Resize(Resize {
               width,
               height,
               rtype: resize::ResizeType::Normal as i32,
               filter: filter as i32,
           })),
       }
   }

   pub fn new_filter(filter: filter::Filter) -> Self {
       Self {
           data: Some(spec::Data::Filter(Filter {
               filter: filter as i32,
           })),
       }
   }

   pub fn new_watermark(x: u32, y: u32) -> Self {
       Self {
           data: Some(spec::Data::Watermark(Watermark { x, y })),
       }
   }
}

#[cfg(test)]
mod tests {
   use super::*;
   use std::borrow::Borrow;
   use std::convert::TryInto;

   #[test]
   fn encoded_spec_could_be_decoded() {
       let spec1 = Spec::new_resize(600, 600, resize::SampleFilter::CatmullRom);
       let spec2 = Spec::new_filter(filter::Filter::Marine);
       let image_spec = ImageSpec::new(vec![spec1, spec2]);
       let s: String = image_spec::borrow().into();
       assert_eq!(image_spec, s.as_str().try_into().unwrap());
   }
}
`;

export default {
    demo1,
    demo2,
    demo3,
    demo4,
    demo5,
    demo6,
    demo7,
    demo8,
};
