import { FileExcelFilled } from '@ant-design/icons';
import { OrdersService } from '@project-management-system/shared-services';
import { Button, Card, Table, Tabs, TabsProps } from 'antd'
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import TabPane from "antd/es/tabs/TabPane"
import React, { useEffect, useState } from 'react'

const SeasonWiseReport = () => {

    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);
    const [SSWH,setSSWH] = useState([])
    const [SSEXF,setSSEXF] = useState([])
    const [FWWH,setFWWH] = useState([])
    const [FWEXF,setFWEXF] = useState([])
    const [SSWH1,setSSWH1] = useState([])
    const [SSEXF1,setSSEXF1] = useState([])
    const service = new OrdersService()

    useEffect(()=>{
        getSSWH()
        getSSEXF()
        getFWWH()
        getFWEXF()
        getSSWH1()
        getSSEXF1()
    },[])


    const getSSWH = () =>{
        service.getSSWHData().then((res)=>{
            setSSWH(res)
        })
    }
    
    const getSSEXF = () =>{
        service.getSSEXFData().then((res)=>{
            setSSEXF(res)
        })
    }

    const getFWWH = () =>{
        service.getFWWHData().then((res)=>{
            setFWWH(res)
        })
    }

    const getFWEXF = () =>{
        service.getFWEXFData().then((res)=>{
            setFWEXF(res)
        })
    }

    const getSSWH1 = () =>{
        service.getSSWH1Data().then((res)=>{
            setSSWH1(res)
        })
    }

    const getSSEXF1 = () =>{
        service.getSSEXF1Data().then((res)=>{
            setSSEXF1(res)
        })
    }


    

    const columns = [
        {
            title: "S No",
            key: "sno",
            render: (text, object,index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Item code',
            dataIndex: 'itemCode',
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName',
        },
        {
            title: 'Month',
            dataIndex: 'new_val',
            children :[
                {
                    title: `January`,
                    dataIndex: "janQty",
                    render: (text) => (text ? text : '-'),
                },
                {
                    title: `February`,
                    dataIndex: "febQty",
                    render: (text) => (text ? text : '-'),
                },
                {
                    title: `March`,
                    dataIndex: "marQty",
                    render: (text) => (text ? text : '-'),
                },
                {
                    title: `April`,
                    dataIndex: "aprQty",
                    render: (text) => (text ? text : '-'),
                },
                {
                    title: `May`,
                    dataIndex: "mayQty",
                    render: (text) => (text ? text : '-'),
                },
                {
                    title: `June`,
                    dataIndex: "junQty",
                    render: (text) => (text ? text : '-'),
                },
                {
                    title: `July`,
                    dataIndex: "julQty",
                    render: (text) => (text ? text : '-'),
                },
                {
                    title: `August`,
                    dataIndex: "augQty",
                    render: (text) => (text ? text : '-'),
                },
                {
                    title: `September`,
                    dataIndex: "sepQty",
                    render: (text) => (text ? text : '-'),
                },
                {
                    title: `October`,
                    dataIndex: "octQty",
                    render: (text) => (text ? text : '-'),
                },
                {
                    title: `November`,
                    dataIndex: "novQty",
                    render: (text) => (text ? text : '-'),
                },
                {
                    title: `December`,
                    dataIndex: "decQty",
                    render: (text) => (text ? text : '-'),
                },
            ]
        },
        {
            title:"Total",
            dataIndex:"total"
        }
        
    ]

    const exportExcel = () => {
        const excel = new Excel();
        if (SSWH?.length > 0) {
            excel
                .addSheet('23SS-WH')
                .addColumns(excelColumns)
                .addDataSource(SSWH, { str2num: true })
        }
        if (SSEXF?.length > 0) {
            excel
                .addSheet('23SS-EXF')
                .addColumns(excelColumns)
                .addDataSource(SSEXF, { str2num: true })
        }
        if (FWWH?.length > 0) {
            excel
                .addSheet('23FW-WH')
                .addColumns(excelColumns)
                .addDataSource(FWWH, { str2num: true })
        }
        if (FWEXF?.length > 0) {
            excel
                .addSheet('23FW-EXF')
                .addColumns(excelColumns)
                .addDataSource(FWEXF, { str2num: true })
        }
        if (SSWH1?.length > 0) {
            excel
                .addSheet('24SS-WH')
                .addColumns(excelColumns)
                .addDataSource(SSWH1, { str2num: true })
        }
        if (SSEXF1?.length > 0) {
            excel
                .addSheet('24SS-EXF')
                .addColumns(excelColumns)
                .addDataSource(SSEXF1, { str2num: true })
        }
        excel.saveAs('SeasonWise.xlsx');
    }

    let excelColumns: IExcelColumn[] = []
    excelColumns = [
        { title: 'Item code', dataIndex: 'itemCode' },
        { title: 'Item Name', dataIndex: 'itemName' },
        { title: 'January', dataIndex: 'janQty', render: (text) => (text ? text : '-')  },
        { title: 'February', dataIndex: 'febQty', render: (text) => (text ? text : '-')  },
        { title: 'March', dataIndex: 'marQty', render: (text) => (text ? text : '-')  },
        { title: 'April', dataIndex: 'aprQty', render: (text) => (text ? text : '-')  },
        { title: 'May', dataIndex: 'mayQty', render: (text) => (text ? text : '-')  },
        { title: 'June', dataIndex: 'junQty', render: (text) => (text ? text : '-')  },
        { title: 'July', dataIndex: 'julQty', render: (text) => (text ? text : '-')  },
        { title: 'August', dataIndex: 'augQty', render: (text) => (text ? text : '-')  },
        { title: 'September', dataIndex: 'sepQty', render: (text) => (text ? text : '-')  },
        { title: 'October', dataIndex: 'octQty', render: (text) => (text ? text : '-')  },
        { title: 'November', dataIndex: 'novQty', render: (text) => (text ? text : '-')  },
        { title: 'December', dataIndex: 'decQty', render: (text) => (text ? text : '-')  },
        { title: 'Total', dataIndex: 'total' },
    ]

    const items: TabsProps['items'] = [
        {
            key:"1",
            label:<b>23SS-WH </b>,
            children: <Table bordered dataSource={SSWH} columns={columns} />,
        },
        {
            key:"2",
            label:<b>23SS-EXF </b>,
            children: <Table bordered dataSource={SSEXF} columns={columns} />,
        },
        {
            key:"3",
            label:<b>23FW-WH </b>,
            children: <Table bordered dataSource={FWWH} columns={columns} />,
        },
        {
            key:"4",
            label:<b>23FW-EXF </b>,
            children: <Table bordered dataSource={FWEXF} columns={columns} />,
        },
        {
            key:"5",
            label:<b>24SS-WH</b>,
            children: <Table bordered dataSource={SSWH1} columns={columns} />,
        },
        {
            key:"6",
            label:<b>24SS-EXF </b>,
            children: <Table bordered dataSource={SSEXF1} columns={columns} />,
        },
    ]

  return (
    <>
    <Card title="Season Wise Order Quantity" extra ={SSWH || SSEXF || FWWH || FWEXF || SSWH1 || SSEXF1 ? (<Button
        type="default"
        style={{ color: 'green' }}
        onClick={exportExcel}
        icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
            <Tabs type={'card'} items={items}/>
    </Card>
    </>
  )
}

export default SeasonWiseReport