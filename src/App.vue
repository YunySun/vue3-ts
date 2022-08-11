<!--
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-22 21:36:52
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-11 11:57:13
-->
<template>
    <div class="app-wrapper flex-b">
        <div class="app-side-menu">
            <el-menu :default-active="routerPath" class="el-menu-vertical-demo" @select="handleOpen" @open="handleOpen">
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
    height: 100vh;
    overflow: hidden;
    .app-side-menu {
        width: 300px;
        // height: 100vh;
        overflow-y: scroll;
        .el-menu {
            min-height: 100%;
        }
    }

    .app-container {
        overflow-y: scroll;
        padding: 20px;
    }
}
</style>
