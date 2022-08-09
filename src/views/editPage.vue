<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-09 14:57:19
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-09 22:38:15
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="edit-wrapper">
        <tinymce-component ref="editor" v-model="msg" :disabled="disabled" />
    </div>
</template>

<script>
import tinymceComponent from '../components/tinymce/tinymceComponent.vue';

export default {
    components: { tinymceComponent },
    name: 'editPage',
    data() {
        return {
            msg: 'Welcome to Use Tinymce Editor',
            disabled: false,
        };
    },
    methods: {
        // 清空内容
        clear() {
            this.$refs.editor.clear();
        },
    },
};
</script>

<style></style>
