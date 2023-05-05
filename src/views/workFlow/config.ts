export const nodeList = [
    {
        type: 'start',
        text: '开始',
        style: {
            width: '30px',
            height: '30px',
            borderRadius: '15px',
            border: '2px solid #FF6347'
        },
        class: 'node-start',
        properties: {
            isPass: true
        }
    },
    {
        type: 'approver',
        text: '审批',
        style: {
            width: '30px',
            height: '30px',
            borderRadius: '4px',
            border: '2px solid #3CB371'
        }
    },
    {
        type: 'jugement',
        text: '判断',
        style: {
            width: '30px',
            height: '30px',
            border: '2px solid #6495ED',
            transform: 'rotate(45deg)',
            marginBottom: '8px'
        }
    },
    {
        type: 'end',
        text: '结束',
        class: 'node-end'
    }
]
