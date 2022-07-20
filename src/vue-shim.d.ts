// 告诉ts *.vue后缀的文件可以交给vue模块处理
// 不要再shims-vue.d.ts中最外层使用import，使用这种写法

declare module '*.vue' {
    import type { defineComponent } from 'vue';

    const component: ReturnType<typeof defineComponent>;
    export default component;
}

declare module '*.css';
