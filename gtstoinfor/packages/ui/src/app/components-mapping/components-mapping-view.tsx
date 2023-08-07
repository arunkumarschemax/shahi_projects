import { ComponentMappingService } from "@project-management-system/shared-services"
import { Card, Table } from "antd"
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react"

export const ComponentMappingView = () => {
    const [page, setPage] = useState<number>(1);
    const [data,setData] = useState<any[]>([])
    const service = new ComponentMappingService()

    useEffect(() => {
        getMappedComponents()
    })

    const getMappedComponents = () =>{
        service.getMappedComponents().then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }

    const columns: ColumnProps<any>[]  = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:'Style',
            dataIndex:'styleName'
        },
        {
            title:'Garment Category',
            dataIndex:'garmentCategory'
        },
        {
            title:'Garment',
            dataIndex:'garmentName'
        },
        {
            title:'Component',
            dataIndex:'component'
        },
        // {
        //     title:'Style',
        //     dataIndex:'styleName'
        // },

    ]

    return(
        <Card>
            <Table columns={columns} dataSource={data}/>
        </Card>
    )

}
export default ComponentMappingView