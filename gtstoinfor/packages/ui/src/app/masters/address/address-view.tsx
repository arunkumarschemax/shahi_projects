import { FileExcelFilled } from "@ant-design/icons";
import { AddressService } from "@project-management-system/shared-services";
import { Button, Card, Row, Table } from "antd"
import { Excel } from "antd-table-saveas-excel";
import { ColumnProps } from "antd/es/table"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AddressView = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const service = new AddressService()
    const [data,setData] = useState<any[]>([])

    useEffect(() => {
        getInfo()
    },[])

    const getInfo = () => {
        service.getAddressInfo().then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }
  

    const columns : any[] = [
        {
            title: 'S No',
            key: 'sno',
            width:"60px",
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1) + (pageSize * (page - 1))
        },
        {
            title:'Bill To',
            dataIndex:'billTo',
        },
        {
            title:'Buyer Code',
            dataIndex:'buyerCode',
            width:"60px",
        },
        {
            title:'Buyer Address',
            dataIndex:'buyerAddress',
            // align:'right'
        },
       
        {
            title:'Ship To',
            dataIndex:'shipTo',
            // align:'right'
        },
        {
            title:'Delivery Code',
            dataIndex:'deliveryCode',
            // align:'right'
        },
        {
            title:'Delivery Address',
            dataIndex:'deliveryAddress',
            // align:'right'
        },
    ]

    let i = 1;
    const exceldata = [
        // { title: 'S No', dataIndex: 'sNo', render: (text:any, object:any, index:any) => { return i++; } },
        
        { title: 'Bill To', dataIndex: 'billTo',render:(text:any,record:any) => {return record.billTo ? record.billTo : '-'} },
        { title: 'Buyer Code', dataIndex: 'buyerCode',render:(text:any,record:any) => {return record.buyerCode ? record.buyerCode : '-'} },
        { title: 'Buyer Address', dataIndex: 'buyerAddress',render:(text:any,record:any) => {return record.buyerAddress ? record.buyerAddress : '-'} },
        { title: 'Ship To', dataIndex: 'shipTo',render:(text:any,record:any) => {return record.shipTo ? record.shipTo : '-'} },
        { title: 'Delivery Code', dataIndex: 'deliveryCode',render:(text:any,record:any) => {return record.deliveryCode ? record.deliveryCode : '-'} },
        { title: 'Delivery Address', dataIndex: 'deliveryAddress',render:(text:any,record:any) => {return record.deliveryAddress ? record.deliveryAddress : '-'} }

    ]

    const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet('Address Excel')
          .addColumns(exceldata)
          .addDataSource(data, { str2num: true })
          .saveAs('Address.xlsx');
      }
    return(
        <Card title='Address' extra={<Link to='/centric/masters/address/address-excel-upload' >
        <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
        </Link>}>
            <Row justify={'end'}>
            <Button
                type="default"
                style={{ color: "green" }}
                onClick={exportExcel}
                icon={<FileExcelFilled />}
            >
                Download Excel
            </Button>
            </Row>
            <Table className="custom-table-wrapper" columns={columns} dataSource={data} size='small'
            pagination={{
                pageSize: 100, 
                onChange(current, pageSize) {
                    setPage(current);
                    setPageSize(pageSize);
                }
            }}
            />
        </Card>
    )

}

export default AddressView