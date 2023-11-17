import { OperationInventoryService } from '@project-management-system/shared-services';
import { Button, Card, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const OperationInventoryView = () => {
    const service = new OperationInventoryService()
    const [data, setData] = useState<any[]>([]);
    const page = 1;
    let navigate = useNavigate();



    useEffect(() => {
        getOperation();
    }, [])

    const getOperation = () => {
        service.getOperationInverntory().then(res => {
            if (res.status) {
                setData(res.data)
            }
        })
    }

    const allocate =(rowData)=>{
        return  navigate('/operation-tracking/operation-mapping',{state:{data: rowData}})
    }
    const columns: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '20px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1),
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            fixed: 'left',
        },

        {
            title: 'Style',
            dataIndex: 'styleName',
            width: '80px',
        },
        // {
        //     title: 'Size',
        //     dataIndex: '',
        //     width: '80px',

        // },
        {
            title: 'Operation',
            dataIndex: 'operation',
            width: '80px'
        },
        {
            title: 'Quantity',
            dataIndex: 'physicalQuantity',
            width: '80px'

        },
        {
            title: 'Mapped Quantity',
            dataIndex: '',
            width: '80px'

        },
        {
            title: 'Balance',
            dataIndex: '',
            width: '80px'

        },
        {
            title: 'Action',
            align: "center",
            width: '10px',
            render: (text, rowData, index) => (
                <span>
                    <Tooltip placement="top" title="Detail View">
                        <Button  onClick={() => {
                            allocate(rowData.OperationId)
                        }}
                        type='primary'
                        > Allocate</Button>

                    </Tooltip>
                </span>
            ),
        }
    ]
    return (
        <Card title="FG Location Pending" className='card-header' extra={<span style={{ color: 'white' }}> </span>}>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </Card>
    )
}

export default OperationInventoryView;