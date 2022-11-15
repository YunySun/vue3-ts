/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-11-15 14:17:09
 * @LastEditors: 李昶
 * @LastEditTime: 2022-11-15 14:39:26
 * @Profile: 一个比较废柴的前端开发
 */
const demo1 = `pub trait Clone: Sized {
    #[stable(feature = "rust1", since = "1.0.0")]
    #[must_use = "cloning is often expensive and is not expected to have side effects"]
    fn clone(&self) -> Self;
    #[inline]
    #[stable(feature = "rust1", since = "1.0.0")]
    fn clone_from(&mut self, source: &Self)
    where
        Self: ~const Destruct,
    {
        *self = source.clone()
    }
}`;

export default {
    demo1,
};
