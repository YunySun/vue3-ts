<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-09 10:00:20
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-09 11:44:12
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="state-wrapper">
        <h3 class="project__title">Pinia的使用</h3>
        <el-form :model="user" label-width="120px">
            <el-form-item label="Username">
                <el-input v-model="user.username" />
            </el-form-item>
            <el-form-item label="Nickname">
                <el-input v-model="user.nickname" />
            </el-form-item>
            <el-form-item label="Telphone">
                <el-input v-model="user.tel" />
            </el-form-item>
        </el-form>
        <h3 class="project__title">Pinia非组合使用</h3>
        <el-form :model="anotherUser" label-width="120px">
            <el-form-item label="Username">
                <el-input v-model="anotherUser.username" />
            </el-form-item>
            <el-form-item label="Nickname">
                <el-input v-model="anotherUser.nickname" />
            </el-form-item>
            <el-form-item label="Telphone">
                <el-input v-model="anotherUser.tel" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useUser } from '@/store/user';

export default defineComponent({
    name: 'statePage',
    setup() {
        const userStore = useUser();
        const { user } = userStore;
        console.log(user);
        return { user };
    },
    computed: {
        ...mapState(useUser, {
            anotherUser: 'user',
        }),
    },
});
</script>

<style></style>
