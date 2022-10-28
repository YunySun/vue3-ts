/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-10-27 16:47:49
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-28 14:54:51
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `use std::rc::Rc;
fn main() {
    let a = Rc::new(1);
}`;

const demo2 = `use std::rc::Rc;
fn main() {
    let a = Rc::new(1);
    let b = a.clone();
    let c = a.clone();
}
`;

const demo3 = `fn clone(&self) -> Rc<T> {
    unsafe {
        // 增加引用计数
        self.inner().inc_strong();
        // 通过 self.ptr 生成一个新的 Rc 结构
        Self::from_inner(self.ptr)
    }
}`;

const demo4 = `use std::rc::Rc;

#[derive(Debug)]
struct Node {
    id: usize,
    downstream: Option<Rc<Node>>,
}

impl Node {
    // pub 使用pub关键字来标记new模块
    pub fn new(id: usize) -> Self {
        Self {
            id,
            downstream: None,
        }
    }

    pub fn update_downstream(&mut self, downstream: Rc<Node>) {
        self.downstream = Some(downstream);
    }

    pub fn get_downstream(&self) -> Option<Rc<Node>> {
        self.downstream.as_ref().map(|v| v.clone())
    }
}

fn main() {
    let mut node1 = Node::new(1);
    let mut node2 = Node::new(2);
    let mut node3 = Node::new(3);
    let node4 = Node::new(4);

    node3.update_downstream(Rc::new(node4));

    node1.update_downstream(Rc::new(node3));
    node2.update_downstream(node1.get_downstream().unwrap());
    println!("node1: {:?}, node2: {:?}", node1, node2);
}
`;

const demo5 = `let node5 = Node::new(5);
let node3 = node1.get_downstream().unwrap();
node3.update_downstream(Rc::new(node5));`;

const demo6 = `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(1);

    {
        // 获得RefCell内部数据的可变借用
        let mut v = data.borrow_mut();
        *v += 1;
    }
    println!("data: {:?}", data.borrow());
}`;

const demo7 = `use std::cell::RefCell;
fn main() {
    let data = RefCell::new(1);
    let mut v = data.borrow_mut();
    *v += 1;

    println!("data: {:?}", data.borrow()); // already mutably borrowed: BorrowError
}`;

const demo8 = `use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
struct Node {
    id: usize,
    // 使用Rc<RefCell<T>>让节点变得可以被修改
    downstream: Option<Rc<RefCell<Node>>>,
}

impl Node {
    pub fn new(id: usize) -> Self {
        Self {
            id,
            downstream: None,
        }
    }

    pub fn update_downstream(&mut self, downstream: Rc<RefCell<Node>>) {
        self.downstream = Some(downstream);
    }

    pub fn get_downstream(&self) -> Option<Rc<RefCell<Node>>> {
        self.downstream.as_ref().map(|v| v.clone())
    }
}

fn main() {
    let mut node1 = Node::new(1);
    let mut node2 = Node::new(2);
    let mut node3 = Node::new(3);
    let node4 = Node::new(4);

    node3.update_downstream(Rc::new(RefCell::new(node4)));
    node1.update_downstream(Rc::new(RefCell::new(node3)));
    node2.update_downstream(node1.get_downstream().unwrap());
    println!("node1: {:?}, node2: {:?}", node1, node2);

    let node5 = Node::new(5);
    let node3 = node1.get_downstream().unwrap();
    println!("node3: {:?}", node3);
    // 获得可变引用修改downstream
    node3.borrow_mut().downstream = Some(Rc::new(RefCell::new(node5)));
    println!("node1: {:?}, node2: {:?}", node1, node2);
}`;

const demo9 = `use std::sync::Mutex;

fn main() {
    let m = Mutex::new(1);
    {
        let mut num = m.lock().unwrap();
        *num = 6;
    }

    println!("m = {:?}", m);
}`;

const demo10 = `fn main() {
    let arr = vec![1];

    std::thread::spawn(|| println!("{:?}", arr));
}`;

const demo11 = `fn main() {
    let arr = vec![1];

    let handle = std::thread::spawn(move || println!("{:?}", arr)); 
    handle.join().unwrap();
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
