import Mock from 'mockjs'

const nodesTools = Mock.mock({
    'nodesTools': [{
        'title': '开始节点',
        'name': 'start_nodes',
        'nodes': [
            { 'title': '节点1', 'name': 'node1', 'type': 'input' },
            { 'title': '节点2', 'name': 'node2', 'type': 'input' },
            { 'title': '节点3', 'name': 'node3', 'type': 'input' },
        ]
    },
    {
        'title': '结束节点',
        'name': 'end_nodes',
        'nodes': [
            { 'title': '结束', 'name': 'node4', 'type': 'output' },
            { 'title': '节点5', 'name': 'node5', 'type': 'output' },
            { 'title': '节点6', 'name': 'node6', 'type': 'output' },
        ]
    },
    {
        'title': '大模型节点',
        'name': 'llm_nodes',
        'nodes': [
            { 'title': 'Ollama', 'name': 'node4', 'type': 'chatmodel' },
            { 'title': '节点5', 'name': 'node5', 'type': 'chatmodel' },
            { 'title': '节点6', 'name': 'node6', 'type': 'chatmodel' },
        ]
    }]
})

Mock.mock('/api/getNodesTools', 'get', () => ({
    code: 200,
    data: nodesTools,
    message: 'success'
}))