/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-23 16:02:20
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-09 10:17:57
 */
interface ParameterSecondary {
    id: string;
}

interface ParameterBase {
    name: string;
    params?: ParameterSecondary;
}

export interface CommandBase {
    action: string;
    params: ParameterBase;
}
