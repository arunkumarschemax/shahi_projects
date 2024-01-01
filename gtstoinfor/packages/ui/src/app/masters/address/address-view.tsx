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
            title:'Destination',
            dataIndex:'destination',
            sorter: (a, b) => a.destination.localeCompare(b.destination),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
        },
        {
            title:'Buyer Code',
            dataIndex:'buyerCode',
            // sorter: (a, b) => a.buyerCode.localeCompare(b.buyerCode),
            // sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
         
        },
        {
            title:'Buyer Address',
            dataIndex:'buyerAddress',
            sorter: (a, b) => a.buyerAddress.localeCompare(b.buyerAddress),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
            
           
        },
       
        {
            title:'Delivery Code',
            dataIndex:'deliveryCode',
            // sorter: (a, b) => a.deliveryCode.localeCompare(b.deliveryCode),
            // sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
          
        },
        {
            title:'Delivery Address',
            dataIndex:'deliveryAddress',
            sorter: (a, b) => a.deliveryAddress.localeCompare(b.deliveryAddress),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
            
        },
    ]

    let i = 1;
    let rowIndex = 1;
    const exceldata = [
        { title: 'S No', dataIndex: 'sNo', render: (text, object, index) => { 
            if(index == data.length) { 
              return null;
            } else { 
              return rowIndex++; 
            } 
          },
          width: 60, 
         
        }, 
        { title: 'Destination', dataIndex: 'destination',width: 100,render:(text:any,record:any) => {return record.destination ? record.destination : '-'} },  
        { title: 'Buyer Code', dataIndex: 'buyerCode',width: 100,render:(text:any,record:any) => {return record.buyerCode ? record.buyerCode : '-'} },
        { title: 'Buyer Address', dataIndex: 'buyerAddress',width: 300,render:(text:any,record:any) => {return record.buyerAddress ? record.buyerAddress : '-'} },
        { title: 'Delivery Code', dataIndex: 'deliveryCode',width: 100,render:(text:any,record:any) => {return record.deliveryCode ? record.deliveryCode : '-'} },
        { title: 'Delivery Address', dataIndex: 'deliveryAddress',width: 800,render:(text:any,record:any) => {return record.deliveryAddress ? record.deliveryAddress : '-'} }

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