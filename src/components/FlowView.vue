<script setup lang="ts">
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import useDragAndDrop from './useDnD'
import ChatModelNode from './ChatModelNode.vue'

const { onConnect, addEdges } = useVueFlow()
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

// 定义节点和边的数据
const nodes = ref([])
const edges = ref([])

onConnect(addEdges)
</script>

<template>
    <div class="main_flow" @drop="onDrop">
        <VueFlow :nodes="nodes" :edges="edges" @dragover="onDragOver" @dragleave="onDragLeave">
            <Background />
            <MiniMap />
            <Controls />
            <template #node-chatmodel="chatModelProps">
                <ChatModelNode v-bind="chatModelProps" />
            </template>"
        </VueFlow>
    </div>
</template>

<style scoped>
.main_flow {
    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    background-color: #f0f0f0;
}
</style>