<template>
  <div class="wrap">
    <van-list class="lists" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="list" v-for="item in list" :key="item.id">
        <div class="list-item">{{ item.id }}</div>
      </div>
    </van-list>
  </div>

</template>

<script lang="ts" setup>
import { queryIndex } from '@/api/index'
import { onMounted, ref } from 'vue'

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const page = ref(0);
const fetchData = (pageNo: number) => {
  const nowPage = pageNo || 1;
  queryIndex({ page: nowPage, limit: 10 }).then((res) => {
    console.log(res)
    page.value = nowPage;
    list.value = [...list.value, ...res.data];
    loading.value = false;
    if (page.value >= res.last_page) {
      finished.value = true;
    }
    console.log(list.value)
  })
}

const onLoad = () => {
  fetchData(page.value + 1);
};


</script>


<style lang="scss" scoped>
@use './index.scss';
</style>
