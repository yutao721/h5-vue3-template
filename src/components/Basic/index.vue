<template>
  <div class="main-page">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>


  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="search" replace to="/list">列表</van-tabbar-item>
    <van-tabbar-item icon="friends-o" replace to="/member">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const active = ref('home');
</script>

<style scoped lang="scss">

.main-page {
  height: calc(100vh - 50px);
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
