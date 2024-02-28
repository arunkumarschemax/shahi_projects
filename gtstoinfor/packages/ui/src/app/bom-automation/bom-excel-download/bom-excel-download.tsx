import { FileExcelFilled } from '@ant-design/icons';
import { BomService } from '@project-management-system/shared-services';
import { Button, Card, Row, Table } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const BomExcelDownload = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [data,setData] = useState<any[]>([])
   const Service = new BomService()
   const [selectedRowKeys, setSelectedRowKeys] = useState([]);

   const onSelectChange = (selectedRowKeys) => {
     setSelectedRowKeys(selectedRowKeys);
   };
   useEffect(() => {
    getBom()
},[])

const getBom = () => {
    Service.getbomExcel().then(res => {
        if(res.status){
            setData(res.data)
        }
    })
}

    const columns : any[] = [
        {
            title: 'S No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1) + (pageSize * (page - 1))
        },
        {
            title:'Geo Code',
            dataIndex:'geo_code',
        },
        {
            title:'Item',
            dataIndex:'item',
            // align:'right'
        },
        {
            title:'Style',
            dataIndex:'style',
            // align:'right'
        },
    ]

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };
    let i = 1;
    const exceldata = [
        { title: 'S No', dataIndex: 'sNo', render: (text:any, object:any, index:any) => { return i++; } },
        { title: 'GEO Code', dataIndex: 'geo_code',render:(text:any,record:any) => {return record.geo_code ? record.geo_code : '-'} },
        { title: 'Item', dataIndex: 'item',render:(text:any,record:any) => {return record.item ? record.item : '-'} },
        { title: 'Style', dataIndex: 'style',render:(text:any,record:any) => {return record.style ? record.style : '-'} },
       

    ]
    const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet('BOM Excel')
          .addColumns(exceldata)
          .addDataSource(data, { str2num: true })
          .saveAs('Bom.xlsx');
      }
  return (
    <Card title='BOM EXCEL' extra={<Link to='/masters/address-upload' >
    {/* <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span> */}
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
        <Table className="custom-table-wrapper"
        rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
           columns={columns} dataSource={data} size='small'
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
