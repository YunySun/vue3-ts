<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-04 16:41:05
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-05 14:58:14
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="reactive-wrapper">
        <h3 class="project__title">reactive的使用</h3>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="日期" prop="date" />
            <el-table-column label="姓名" prop="name">
                <template #default="scope">
                    <el-input v-model="scope.row.name" placeholder="Please input" />
                </template>
            </el-table-column>
            <el-table-column label="地址" prop="address" />
            <el-table-column label="操作" prop="name">
                <template #default="scope">
                    <el-button size="small" @click="printEdit(scope.row)">打印</el-button>
                </template>
            </el-table-column>
        </el-table>

        <h3 class="project__title">reactive解构失去响应无法修改数据</h3>
        <el-input v-model="name" placeholder="Please input" />
        <el-input v-model="date" placeholder="Please input" />
        <el-input v-model="address" placeholder="Please input" />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { User } from '@/interface/common';

export default defineComponent({
    name: 'reactivePage',
    setup() {
        const tableData = reactive<User[]>([
            {
                date: '2022-08-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2022-08-04',
                name: 'John',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2022-08-04',
                name: 'Morgan',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2022-08-04',
                name: 'Jessy',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ]);
        function printEdit(user: User) {
            console.log(user, tableData);
        }

        /**
         * reactive 局限性
         * 1 只能对对象类型有效 对string number boolean类型无效
         * 2 解构或者赋值本地变量后 就会失去响应性 不能随意替换响应对象 会导致对初始的响应连接丢失
         */
        // 类型“string”不满足约束“object”。ts(2344)
        // const primitiveType = reactive<string>('Primitive type word');
        const user = reactive<User>({
            date: '2022-08-05',
            name: '李昶',
            address: '江苏南京',
        });
        const { date, name, address } = user; // 结构后无法修改
        return { tableData, printEdit, date, name, address };
    },
});
</script>

<style lang="scss" scoped>
.reactive-wrapper {
    .el-input + .el-input {
        margin-top: 20px;
    }
}
</style>
