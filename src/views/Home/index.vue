<template>
  <van-nav-bar title="首页" />
  <van-cell-group class="supportList">
    <van-cell title="Vue3" icon="Check" />
    <van-cell title="Vue-router" icon="Check" />
    <van-cell title="Axios" icon="Check" />
    <van-cell title="Pinia" icon="Check" />
    <van-cell title="vantUi" icon="Check" />
    <van-cell title="Jsx" icon="Check" />
  </van-cell-group>
  <div class="box"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
const getUserInfo = computed(() => {
  const { name = '' } = userStore.getUserInfo || {};
  return name;
});

</script>
<style lang="scss">
.box {
  width: 750px;
  height: 200px;
  background-color: red;

}

.header {
  display: flex;
  justify-content: center;
  margin: 26px 0 10px;
  padding: 0 20px;
  height: 50px;
  height: 30px;
  font-size: 20px;
}

.intro-title {
  text-align: center;
}

.intro-header {
  height: 30px;
  font-size: 16px;
  text-align: center;
}

.supportList {
  margin: 0 16px;

  .nut-icon {
    color: green;
  }
}

.github-icon {
  margin-top: 4px;
  font-size: 24px;
}

.btn-wrap {
  margin: 20px;
}
</style>
