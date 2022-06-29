<template>
  <van-nav-bar title="我的" />

  <van-grid>
    <van-grid-item icon="photo-o" text="文字" />
    <van-grid-item icon="photo-o" text="文字" />
    <van-grid-item icon="photo-o" text="文字" />
    <van-grid-item icon="photo-o" text="文字" />
  </van-grid>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
  .avatar-wrap {
    display: flex;
    margin: 30px;
    height: 50px;
    align-items: center;
    .member-detail {
      margin-left: 20px;
      .nickname {
        font-size: 16px;
        font-weight: bold;
      }
      .info {
      }
    }
  }
</style>
