<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LogicFlow from "@logicflow/core";
import { BpmnElement } from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";

import demoData from './components/flow/demodata.json'
import CustomNode from "./components/flow/CustomNode";
const container = ref()
const lf = ref()
const initLf = () => {
  LogicFlow.use(BpmnElement);
  lf.value = new LogicFlow({
    container: container.value,
    grid: true,
  });
  lf.value.setDefaultEdgeType("bpmn:sequenceFlow");
  lf.value.register(CustomNode);
  lf.value.render(demoData);

  // 单击事件，修改节点文本
  lf.value.on("node:click", ({ data }) => {
    const nodeModel = lf.value.getNodeModelById(data.id);
    nodeModel.updateText('id为【' + data.id + '】的被修改过了');
    const modifiedAllData = lf.value.getGraphData();
    const modifiedNodeData = nodeModel.getData();
    // console
    console.log('修改后的全部数据：', modifiedAllData)
    console.log('修改后的当前节点数据：', modifiedNodeData)
  });
}
onMounted(() => {
  initLf()
})
</script>

<template>
  <div class="container" ref="container"></div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
