<template>
  <div class="node-box">
    <span class="node-text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: ""
  }
});
</script>
<style scoped>
.node-box {
  width: 100%;
  height: 100%;
  border: 1px solid #867ef5;
  border-radius: 5px;
  background: #fff;
  text-align: center;
}

.node-text {
  font-size: 13px;
  color: #656381;
}
</style>
