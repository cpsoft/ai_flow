<script setup>
import { ref, onMounted } from 'vue'
import { ElButton } from 'element-plus'
import { useVueFlow } from '@vue-flow/core'
import useDragAndDrop from './useDnD'
import axios from 'axios'
import '../mock'

const { onDragStart } = useDragAndDrop()

const originalData = ref([])

onMounted(async () => {
    try {
        const res = await axios.get('/api/getNodesTools')
        console.log('res', res)
        if (res.data.code == 200) {
            console.log('data', res.data.data.nodesTools)
            var data = res.data.data.nodesTools
            console.log('nodesTools', data)
            originalData.value = data
            filterNodes(null)
        }
    } catch (err) {
        console.log('err', err)
    }
})


const filterText = ref('')
const collapseData = ref([...originalData.value])
console.log('collapseData', collapseData.value)
const activeNames = ref(['tools'])

const filterNodes = (value) => {
    if (!value) {
        collapseData.value = [...originalData.value]
        return
    }

    const lowerText = value.toLowerCase()

    // 递归过滤函数
    const deepFilter = (nodes) => {
        if (!Array.isArray(nodes)) return []
        return nodes.reduce((acc, node) => {
            // 当前节点匹配
            if (node.title.toLowerCase().includes(lowerText)) {
                acc.push({ ...node, nodes: node.nodes }) // 保留完整子节点
            } else {
                // 过滤子节点
                const filteredChildren = deepFilter(node.nodes)
                if (filteredChildren.length > 0) {
                    acc.push({ ...node, nodes: filteredChildren }) // 保留父节点并显示匹配子节点
                }
            }
            return acc
        }, [])
    }

    // 执行过滤
    collapseData.value = deepFilter(originalData.value)
}

const openDialog = () => {
    console.log('openDialog')
}

</script>

<template>
    <el-aside class="nodes_tool">
        <h3>AI Flow节点</h3>
        <hr />
        <el-input class="search" v-model="filterText" placeholder="请输入搜索内容" @input="filterNodes" clearable
            suffix-icon="el-icon-search"></el-input>
        <hr />
        <div>
            <el-collapse class="nodeslist" v-model="activeNames">
                <el-collapse-item v-for="(item, index) in collapseData" :key="item.name" :title="item.title"
                    :name="item.name">
                    <div v-for="(item, index) in item.nodes">
                        <div class="nodeitem" :draggable="true" @dragstart="onDragStart($event, item.type)">
                            <span>{{ item.title }}</span>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </el-aside>
</template>

<style scoped>
.nodes_tool {
    background-color: #f0f0f0;
    height: 100%;
    padding: 4px;
}

.search {
    padding: 4px;
}

.el-collapse {
    /* background-color: #303f4b !important; */
}

.el-collapse-item__wrap {
    border: none;
    background-color: transparent !important;
}

.el-collapse-item__header {
    color: #fff;
    collapse-header-bg-color: transparent !important;
    background-color: transparent !important;
}

.el-collapse-item__content {
    color: #fff;
    background-color: transparent !important;
}

.nodeslist {
    padding: 4px;
    margin: 4px;
}

.nodeitem {
    width: 80%;
    margin: 4px 10px;
    border: 2px solid #ccc;
    background-color: transparent;
    color: #000;
    padding: 4px;
}
</style>