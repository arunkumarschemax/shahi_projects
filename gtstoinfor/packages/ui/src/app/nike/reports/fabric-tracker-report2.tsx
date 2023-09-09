import { FileExcelFilled } from '@ant-design/icons';
import { NikeService } from '@project-management-system/shared-services';
import { Button, Card, Table } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import React, { useEffect, useState } from 'react'

const FabricTrackerReport2 = () => {
    const [gridData, setGridData] = useState<any[]>([]); 
    const [filteredData, setFilteredData] = useState<any[]>([]); 
    const service = new NikeService(); 
    
    useEffect(() => {
        getData();
      }, [])
    
      const getData = () => {
        service.getFabricTrackerReport().then(res => {
          if (res) {
            setGridData(res.data)
            setFilteredData(res.data)
            console.log(res,"pppppppppppppp")
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
          {title:"FABRIC QUALITY DESCRIPTION", dataIndex:'fabricQualityDescription'},  
          {title: 'Colour Description', dataIndex: 'colorDesc' },
          {title:"MRP",dataIndex:'MRP'},
          {title:"MRP Week", dataIndex:''},
         
        ]
    
    
        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`fabric-tracker-report2-${currentDate}.xlsx`);
      }
    




const Columns:any =[
    {
        title: "SL",
        render: (_text: any, record: any, index: number) => <span>{index + 1}</span>
  
      },  
    {
        title: 'Item',
        dataIndex: 'item',
       
      }, 
      {
        title:"FABRIC QUALITY DESCRIPTION",
        dataIndex:'fabricQualityDescription'
      },
      {
        title: 'Colour Description',
        dataIndex: 'colorDesc'
      },
      {
        title:"MRP",
        dataIndex:'MRP'
      },
      {
        title:"MRP Week",
        dataIndex:'MRPWeek'
      }
       
] 

  return (
    <>
    <Card title="FabricTrackerReport2" headStyle={{ color: 'black', fontWeight: 'bold' }}
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

export default FabricTrackerReport2;

