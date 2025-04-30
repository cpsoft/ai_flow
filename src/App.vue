<script setup lang="ts">
import { ElContainer, ElAside, ElMain } from 'element-plus'
import NodeTools from './components/NodeTools.vue'
import FlowView from './components/FlowView.vue'
</script>

<template>
  <div class="common-layout">
    <el-container class="container">
      <NodeTools style="height: 100%;" />
      <el-main>
        <FlowView />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
}

.el-main {
  margin: 0px 2px;
  padding: 0px;
  height: 100%;
  width: 100%;
}
</style>