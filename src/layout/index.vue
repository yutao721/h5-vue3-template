<template>
  <div class="main-page">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>


  <van-tabbar route>
    <van-tabbar-item icon="home-o" replace to="/index">首页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" replace to="/member">我的</van-tabbar-item>
  </van-tabbar>
</template>



<style scoped lang="scss">
.main-page {
  height: 100vh;
}
</style>
