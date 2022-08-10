<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-09 14:57:19
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-10 10:36:03
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="edit-wrapper">
        <tinymce-component ref="editor" v-model="editContent" :disabled="disabled" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import tinymceComponent from '../components/tinymce/tinymceComponent.vue';

export default defineComponent({
    components: { tinymceComponent },
    name: 'editPage',
    setup() {
        const editContent = ref<string>('Welcome to Use Tinymce Editor');
        const disabled = ref<boolean>(false);
        // 清空内容
        function clear() {
            this.$refs.editor.clear();
        }
        return {
            editContent,
            disabled,
            clear,
        };
    },
});
</script>

<style></style>
