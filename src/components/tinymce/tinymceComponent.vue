<template>
    <div class="tinymce-box">
        <editor v-model="value" :init="init" :disabled="disabled"></editor>
    </div>
</template>

<script lang="ts">
import tinymce from 'tinymce/tinymce'; // tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver/theme'; // 主题文件
import 'tinymce/icons/default';
import 'tinymce/models/dom';
// tinymce插件可按自己的需要进行导入
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'; // 插入上传图片插件
import 'tinymce/plugins/importcss'; // 图片工具
import 'tinymce/plugins/media'; // 插入视频插件
import 'tinymce/plugins/table'; // 插入表格插件
import 'tinymce/plugins/lists'; // 列表插件
import 'tinymce/plugins/advlist'; // 列表插件
import 'tinymce/plugins/charmap'; // 特殊字符
import 'tinymce/plugins/wordcount'; // 字数统计插件
import 'tinymce/plugins/codesample'; // 插入代码
import 'tinymce/plugins/code'; // 查看源码
import 'tinymce/plugins/fullscreen'; // 全屏
import 'tinymce/plugins/link'; //
import 'tinymce/plugins/preview'; // 预览
import 'tinymce/plugins/template'; // 插入模板
import 'tinymce/plugins/save'; // 保存
import 'tinymce/plugins/searchreplace'; // 查询替换
import 'tinymce/plugins/pagebreak'; // 分页
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/help';

import { computed, defineComponent, onMounted } from 'vue';
// 时间插入
export default defineComponent({
    name: 'tinymceComponent',
    components: { Editor },
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        plugins: {
            type: [String, Array],
            default: 'code preview lists advlist autolink image emoticons help',
            // 插件需要import进来
            // default: 'wordcount visualchars visualblocks toc textpattern template tabfocus spellchecker searchreplace save quickbars print preview paste pagebreak noneditable nonbreaking media insertdatetime importcss imagetools image hr help fullscreen fullpage directionality codesample code charmap link code table lists advlist anchor autolink autoresize autosave media table'
        },
        toolbar: {
            type: [String, Array],
            default: () => [
                // { name: 'history', items: ['undo', 'redo'] },
                // { name: 'styles', items: ['styles'] },
                // { name: 'formatting', items: ['bold', 'italic'] },
                // { name: 'alignment', items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify'] },
                // { name: 'indentation', items: ['outdent', 'indent'] },
                'code preview | bold italic underline strikethrough lineheight | bullist numlist |  outdent indent blockquote | alignleft aligncenter alignright alignjustify',
                'styles fontfamily fontsize image emoticons help',
            ],

            // default:
            //     'code preview | bold italic underline strikethrough lineheight | bullist numlist |  outdent indent blockquote | alignleft aligncenter alignright alignjustify',

            // 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
        },
    },
    // emits: ['update:modelValue'],
    setup(props, ctx) {
        const init = {
            // width: 720,
            height: 300,
            language_url: '/resource/tinymce/langs/zh-Hans.js',
            language: 'zh-Hans',
            // 皮肤：这里引入的是public下的资源文件
            skin_url: '/resource/tinymce/skins/ui/oxide',

            // skin_url: 'tinymce/skins/ui/oxide-dark',//黑色系
            plugins: props.plugins,
            toolbar: props.toolbar,
            content_css: '/resource/tinymce/skins/content/default/content.css',
            branding: false,
            // 隐藏菜单栏
            menubar: false,
            // 是否显示底部状态栏
            statusbar: true,
            // convert_urls: false,
            // 初始化完成
            init_instance_callback: (editor) => {
                console.log('初始化完成：', editor);
            },
            // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
            // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
            images_upload_handler: (blobInfo, success) => {
                const img = `data:image/jpeg;base64,${blobInfo.base64()}`;
                console.log('图片上传处理：', img);
                success(img);
            },
        };
        const value = computed({
            get() {
                return props.modelValue;
            },
            set(val) {
                ctx.emit('update:modelValue', val);
            },
        });

        function clear() {
            value.value = '';
        }
        // 自定义事件给父组件传递数据

        // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
        // 需要什么事件可以自己增加

        onMounted(() => {
            // 初始化 tinymce
            tinymce.init({});
        });

        return { init, value, clear };
    },
});
</script>

<style scoped></style>
