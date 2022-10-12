/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-10-12 11:26:32
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-12 17:27:44
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `[package]
name = "httpie"
version = "0.1.0"
edition = "2021"

[dependencies]
anyhow = "1" # 错误处理
clap = { version = "3", features = ["derive"] } # 命令行解析
colored = "2" # 命令终端多彩显示
jsonxf = "1.1" # JSON数据格式化
mime = "0.3" # 处理mime类型
# reqwest 默认使用 openssl，有些 linux 用户如果没有安装好 openssl 会无法编译，这里我改成了使用 rustls
reqwest = { version = "0.11", default-features = false, features = ["json", "rustls-tls"] } # Http 客户端
tokio = { version = "1", features = ["full"] } # 异步处理库
syntect = "4"`;

const demo2 = `use clap::Parser;

// 定义HTTPie的cli的主入口，包含若干子命令

// 下方 ///是注释文档，clap会将其作为cli的帮助

/// A naive httpie implementation with Rust, can you imagine how easy it is?
#[derive(Parser, Debug)]
#[clap(version = "1.0", author = "Tyr chen <tyr@chen.com>")]
struct Opts {
    #[clap(subcommand)]
    subcmd: SubCommand,
}

// 子命令分别对应不同的HTTP方法，目前只支持get/post
#[derive(Parser, Debug)]
enum SubCommand {
    Get(Get),
    Post(Post),
}

// get子命令
#[derive(Parser, Debug)]
struct Get {
    /// Http请求的URL
    url: String,
}

// post子命令

/// feed post with an url and optional key=value pairs. We will post the data
/// as JSON, and retrieve the response for you
#[derive(Parser, Debug)]
struct Post {
    /// Http请求的URL
    url: String,
    /// Http请求的body
    body: Vec<String>,
}

fn main() {
    let opts: Opts = Opts::parse();
    println!("{:?}", opts)
}

// cargo run post http://xxx a=1 b=2
// Opts { subcmd: Post(Post { url: "http://xxx", body: ["a=1", "b=2"] }) }`;

const demo3 = `use anyhow::{Ok, Result};
use reqwest::Url;

// get子命令
#[derive(Parser, Debug)]
struct Get {
    /// Http请求的URL
    #[clap(parse(try_from_str = parse_url))]
    url: String,
}

// 定义一个检查URL是否合法的函数
fn parse_url(s: &str) -> Result<String> {
    // 检查url是否合法
    let _url: Url = s.parse()?;

    Ok(s.into())
}`;

const demo4 = `use anyhow::{anyhow, Ok, Result};
use std::str::FromStr;

#[derive(Parser, Debug)]
struct Post {
    /// Http请求的URL
    #[clap(parse(try_from_str = parse_url))]
    url: String,
    /// Http请求的body
    #[clap(parse(try_from_str = parse_kv_pair))]
    body: Vec<KvPair>,
}

/// 命令行中的key=value可以通过parse_kv_pair解析成KvPair结构
#[derive(Debug)]
struct KvPair {
    k: String,
    v: String,
}

// 当实现FromStr trait后，可以通过str.parse()方法将字符串解析成KvPair
impl FromStr for KvPair {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        // 使用 = 进行split，会得到一个迭代器
        let mut split = s.split('=');
        let err = || anyhow!(format!("Failed to parse {}", s));

        Ok(Self {
            // 从迭代器中取第一个结果作为key， 迭代器返回Some(T)/None
            // 将其转换成Ok(T)/Err(E)，然后用？处理错误
            k: (split.next().ok_or_else(err)?).to_string(),
            // 从迭代器中取得第二个结果作为value
            v: (split.next().ok_or_else(err)?).to_string(),
        })
    }
}

// 因为为KvPair实现了FromStr，可以直接通过s.parse()得到KvPair
fn parse_kv_pair(s: &str) -> Result<KvPair> {
    Ok(s.parse()?)
}`;

const demo5 = `
use reqwest::{header, Client, Response, Url};

#[tokio::main]
async fn main() -> Result<()> {
    let opts: Opts = Opts::parse();
    // 生成一个Http客户端
    let client = Client::new();
    let result = match opts.subcmd {
        SubCommand::Get(ref args) => get(client, args).await?,
        SubCommand::Post(ref args) => post(client, args).await?,
    };

    Ok(result)
}`;

const demo6 = `use std::{collections::HashMap, str::FromStr};

async fn get(client: Client, args: &Get) -> Result<()> {
    let resp = client.get(&args.url).send().await?;
    println!("{:?}", resp.text().await?);
    Ok(())
}

async fn post(client: Client, args: &Post) -> Result<()> {
    let mut body = HashMap::new();
    for pair in args.body.iter() {
        body.insert(&pair.k, &pair.v);
    }
    let resp = client.post(&args.url).json(&body).send().await?;
    println!("{:?}", resp.text().await?);
    Ok(())
}`;

export default {
    demo1,
    demo2,
    demo3,
    demo4,
    demo5,
    demo6,
};
