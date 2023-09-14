import { FileExcelFilled } from '@ant-design/icons';
import { PpmDateFilterRequest } from '@project-management-system/shared-models';
import { NikeService } from '@project-management-system/shared-services';
import { Button, Card, Table } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import React, { useEffect, useState } from 'react'

const FabricTrackerReport1 = () => {
    const [gridData, setGridData] = useState<any[]>([]); 
    const [filteredData, setFilteredData] = useState<any[]>([]); 
    const service = new NikeService(); 

    useEffect(() => {
        getData();
      }, [])
    
      const getData = () => {
        const req = new PpmDateFilterRequest
        service.getFabricTrackerReport(req).then(res => {
          if (res.status) {
            setGridData(res.data)
            setFilteredData(res.data)
          }
        }).catch(err => {
          console.log(err.message)
        })
      }
     console.log(gridData,"rrrrrrrrrrrrrrrrrrrrrr")



     const handleExport = (e: any) => {
        e.preventDefault();
    
    
        const currentDate = new Date()
          .toISOString()
          .slice(0, 10)
          .split("-")
          .join("/");
    
        let exportingColumns: IExcelColumn[] = []
        exportingColumns = [
          {title: 'Item', dataIndex: 'item' },
          {title:"GAC", dataIndex:'GAC'},
          {title:"FABRIC QUALITY DESCRIPTION", dataIndex:'fabricQualityDescription'},  
          {title: 'Colour Description', dataIndex: 'colorDesc' },
          {title:"Total Required Fabric Quantity", dataIndex:''},
          {title:"Total Inhoused Qty", dataIndex:''},
          {title:"Total Inhoused%", dataIndex:''},
          {title:"balance to Inhouse",dataIndex:''},
          {title:"balance to Inhouse%", dataIndex:''},
         
        ]
    
    
        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`fabric-tracker-report1-${currentDate}.xlsx`);
      }
    




const Columns:any =[
    {
        title: "SL",
        render: (_text: any, record: any, index: number) => <span>{index + 1}</span>
  
      },  
    {
        title: 'Item',
        dataIndex: 'item',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
       
      },
      {
        title:"GAC",
        dataIndex:'GAC'

      },
      {
        title:"FABRIC QUALITY DESCRIPTION",
        dataIndex:'fabricQualityDescription'
      },
      {
        title: 'Colour Description',
        dataIndex: 'colorDesc'
      },
       
] 

  return (
    <>
    <Card title="FabricTrackerReport1" headStyle={{ color: 'black', fontWeight: 'bold' }}
extra={filteredData.length > 0 ? 
<Button
  type="default"
  style={{ color: 'green' }}
  onClick={handleExport}
  icon={<FileExcelFilled />}>Download Excel</Button> : null}
  >
        <Table
            columns={Columns}
            dataSource={gridData}
            bordered
            className="custom-table-wrapper"
        ></Table>
    </Card>
</>
    
  )
}

export default FabricTrackerReport1;
