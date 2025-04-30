import Mock from 'mockjs'

const nodesTools = Mock.mock({
    'nodesTools': [{
        'title': '开始节点',
        'name': 'start_nodes',
        'nodes': [
            { 'title': '节点1', 'name': 'node1' },
            { 'title': '节点2', 'name': 'node2' },
            { 'title': '节点3', 'name': 'node3' },
        ]
    },
    {
        'title': '结束节点',
        'name': 'end_nodes',
        'nodes': [
            { 'title': 'Ollama', 'name': 'node4' },
            { 'title': '节点5', 'name': 'node5' },
            { 'title': '节点6', 'name': 'node6' },
        ]
    },
    {
        'title': '大模型节点',
        'name': 'llm_nodes',
        'nodes': [
            { 'title': 'Ollama', 'name': 'node4', 'type': 'chatmodel' },
            { 'title': '节点5', 'name': 'node5' },
            { 'title': '节点6', 'name': 'node6' },
        ]
    }]
})

Mock.mock('/api/getNodesTools', 'get', () => ({
    code: 200,
    data: nodesTools,
    message: 'success'
}))