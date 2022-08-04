<!--
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-22 21:36:52
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-04 16:27:02
-->
<template>
    <div class="app-wrapper flex-b">
        <div class="app-side-menu">
            <el-menu :default-active="routerPath" class="el-menu-vertical-demo" @select="handleOpen">
                <template v-for="route in routesRef" :key="route.name">
                    <el-sub-menu v-if="route.children && route.children.length > 0" :index="route.path">
                        <template #title>
                            <el-icon>
                                <component :is="route.meta.icon" />
                            </el-icon>
                            <span>{{ route.meta.title }}</span>
                        </template>
                        <el-menu-item
                            :index="route.path + '/' + child.path"
                            v-for="child in route.children"
                            :key="child.name"
                        >
                            <span>{{ child.meta.title }}</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item :index="route.path" :route="route.path" v-else>
                        <el-icon>
                            <component :is="route.meta.icon" />
                        </el-icon>
                        <span>{{ route.meta.title }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
        <div class="app-container flex-1">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { routes } from './router';

export default defineComponent({
    name: 'app',
    setup() {
        const routesRef = ref(routes);
        const router = useRouter();
        const route = useRoute();
        console.log(route.path);
        const routerPath = ref<string>('/');
        const handleOpen = (key: string) => {
            router.push(key);
        };

        watch(route, (value) => {
            console.log('watch: ', value.path);
            routerPath.value = value.path;
        });

        return { routerPath, handleOpen, routesRef };
    },
});
</script>

<style lang="scss">
.app-wrapper {
    height: 100%;
    .app-side-menu {
        width: 300px;
        height: 100vh;
        overflow-y: scroll;
        /*---滚动条默认显示样式--*/
        &::-webkit-scrollbar-thumb {
            // background-color: #018ee8;
            height: 50px;
            outline-offset: -2px;
            outline: 2px solid #fff;
            border-radius: 4px;
            border: 2px solid #fff;
        }
        /*---鼠标点击滚动条显示样式--*/
        &::-webkit-scrollbar-thumb:hover {
            // background-color: #fb4446;
            height: 50px;
            border-radius: 4px;
        }
        /*---滚动条大小--*/
        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        /*---滚动框背景样式--*/
        &::-webkit-scrollbar-track-piece {
            background-color: #fff;
            border-radius: 0;
        }
        .el-menu {
            min-height: 100%;
        }
    }
}
</style>
