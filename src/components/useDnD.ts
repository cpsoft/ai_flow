import { useVueFlow } from '@vue-flow/core'
import { ref, watch } from 'vue'
import type { DragEvent as NativeDragEvent } from 'dom'

let id = 0

function getId() {
    return `dndnode_${id++}`
}

const state = {
    draggedType: ref<string | undefined>(undefined), // 正在拖动的节点类型
    isDragOver: ref(false), // 是否有节点在上面
    isDragging: ref(false), // 是否正在拖动 
}

export default function useDragAndDrop() {
    const { draggedType, isDragOver, isDragging } = state
    const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

    watch(isDragging, (dragging) => {
        document.body.style.userSelect = dragging ? 'none' : ''
    })

    function onDragStart(event: DragEvent, type: string) {
        if (event.dataTransfer) {
            event.dataTransfer.setData('application/vueflow', type)
            event.dataTransfer.effectAllowed = 'move'
        }
        console.log('onDragStart', type)
        draggedType.value = type
        isDragging.value = true

        document.addEventListener('drop', onDragEnd)
    }

    function onDragOver(event: DragEvent) {
        event.preventDefault()
        if (draggedType.value) {
            isDragOver.value = true
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move'
            }
        }
    }

    function onDragLeave() {
        isDragOver.value = false
    }

    function onDragEnd() {
        isDragging.value = false
        isDragOver.value = false
        draggedType.value = undefined
        document.removeEventListener('drop', onDragEnd)
    }

    function onDrop(event: DragEvent) {
        const position = screenToFlowCoordinate({
            x: event.clientX,
            y: event.clientY,
        })

        const nodeId = getId()
        const newNode = {
            id: nodeId,
            type: draggedType.value as unknown as string | undefined,
            position,
            data: { label: nodeId },
        }

        console.log('New Node: ', newNode)

        const { off } = onNodesInitialized(() => {
            updateNode(nodeId, (node) => ({
                position: {
                    x: node.position.x - node.dimensions.width / 2,
                    y: node.position.y - node.dimensions.height / 2,
                },
            }))
            off()
        })
        addNodes(newNode)
    }

    return {
        draggedType,
        isDragOver,
        isDragging,
        onDragStart,
        onDragLeave,
        onDragOver,
        onDrop,

    }
}