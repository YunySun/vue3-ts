/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-10-27 16:47:49
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-27 17:00:18
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

export default {
    demo1,
    demo2,
    demo3,
};
