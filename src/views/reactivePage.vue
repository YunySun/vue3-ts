<template>
    <div class="reactive-wrapper">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="日期" prop="date" />
            <el-table-column label="姓名" prop="name">
                <template #default="scope">
                    <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改姓名</el-button> -->
                </template>
            </el-table-column>
            <el-table-column label="地址" prop="address" />
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { User } from '@/interface/common';

export default defineComponent({
    name: 'reactivePage',
    setup() {
        const tableData: User[] = [
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: 'John',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Morgan',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Jessy',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ];
        return { tableData };
    },
});
</script>

<style></style>
