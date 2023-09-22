import { FileExcelFilled } from '@ant-design/icons';
import { OrdersService } from '@project-management-system/shared-services';
import { Button, Card, Table, Tabs, TabsProps, Typography } from 'antd'
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import TabPane from "antd/es/tabs/TabPane"
import React, { useEffect, useState } from 'react'

const SeasonWiseReport = () => {
    const { Text } = Typography;
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);
    const [data, setData] = useState<any[]>([])
    const [ssData,setSSData] = useState([])
    const [fwData,setFWData] = useState([])
    const [ss1Data,setSS1Data] = useState([])
    const [FWEXF,setFWEXF] = useState([])
    const [SSWH1,setSSWH1] = useState([])
    const [SSEXF1,setSSEXF1] = useState([])
    const service = new OrdersService()

    useEffect(()=>{
        reportSS()
        // reportFW()
        // reportSS1()
    },[])

    const reportSS = () => {
        service.seasonWiseReport().then((res) => {
            setData(res.data);
            console.log(res.data,'hiiiiiiiiiii');
        });
    }

    // const reportFW = () => {
    //     service.seasonWiseReport().then((res) => {
    //         const filteredData = res.data?.filter(item => item.year === "2023" && item.plannedSeason === "FW") || [];
    //         setFWData(filteredData);
    //         console.log(filteredData, 'hiiiiiiiiiii');
    //     });
    // }

    // const reportSS1 = () => {
    //     service.seasonWiseReport().then((res) => {
    //         const filteredData = res.data?.filter(item => item.year === "2024" && item.plannedSeason === "SS") || [];
    //         setSS1Data(filteredData);
    //         console.log(filteredData, 'hiiiiiiiiiii');
    //     });
    // }
    
    


    

    const columnsWH = [
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
            // dataIndex: 'new_val',
            children :[
                {
                    title: `January`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.whMonth === 1 ? text : '-'),
                },
                {
                    title: `February`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.whMonth === 2 ? text : '-'),
                },
                {
                    title: `March`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.whMonth === 3 ? text : '-'),
                },
                {
                    title: `April`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.whMonth === 4 ? text : '-'),
                },
                {
                    title: `May`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.whMonth === 5 ? text : '-'),                
                },
                {
                    title: `June`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.whMonth === 6 ? text : '-'),                
                },
                {
                    title: `July`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.whMonth === 7 ? text : '-'),                
                },
                {
                    title: `August`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.whMonth === 8 ? text : '-'),                
                },
                {
                    title: `September`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.whMonth === 9 ? text : '-'),
                },
                {
                    title: `October`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.whMonth === 10 ? text : '-'),                
                },
                {
                    title: `November`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.whMonth === 11 ? text : '-'),                
                },
                {
                    title: `December`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.whMonth === 12 ? text : '-'),                
                },
            ]
        },
        {
            title:"Total",
            dataIndex:"total",
        }
        
    ]

    const columnsEXF = [
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
            // dataIndex: 'new_val',
            children :[
                {
                    title: `January`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.exfMonth === 1 ? text : '-'),
                },
                {
                    title: `February`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.exfMonth === 2 ? text : '-'),
                },
                {
                    title: `March`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.exfMonth === 3 ? text : '-'),
                },
                {
                    title: `April`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.exfMonth === 4 ? text : '-'),
                },
                {
                    title: `May`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.exfMonth === 5 ? text : '-'),                
                },
                {
                    title: `June`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.exfMonth === 6 ? text : '-'),                
                },
                {
                    title: `July`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.exfMonth === 7 ? text : '-'),                
                },
                {
                    title: `August`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.exfMonth === 8 ? text : '-'),                
                },
                {
                    title: `September`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.exfMonth === 9 ? text : '-'),
                },
                {
                    title: `October`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.exfMonth === 10 ? text : '-'),                
                },
                {
                    title: `November`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.exfMonth === 11 ? text : '-'),                
                },
                {
                    title: `December`,
                    dataIndex: "orderQty",
                    align:"right",
                    render: (text, record) => (record.exfMonth === 12 ? text : '-'),                
                },
            ]
        },
        {
            title:"Total",
            dataIndex:"total",
        }
        
    ]

    const exportExcel = () => {
        const excel = new Excel();
        if (data?.[0].length > 0) {
            excel
                .addSheet('23SS-WH')
                .addColumns(excelColumnsWH)
                .addDataSource(data?.[0], { str2num: true })
        }
        if (data?.[1].length > 0) {
            excel
                .addSheet('23SS-EXF')
                .addColumns(excelColumnsEXf)
                .addDataSource(data?.[1], { str2num: true })
        }
        if (data?.[2].length > 0) {
            excel
                .addSheet('23FW-WH')
                .addColumns(excelColumnsWH)
                .addDataSource(data?.[2], { str2num: true })
        }
        if (data?.[3].length > 0) {
            excel
                .addSheet('23FW-EXF')
                .addColumns(excelColumnsEXf)
                .addDataSource(data?.[3], { str2num: true })
        }
        if (data?.[4].length > 0) {
            excel
                .addSheet('24SS-WH')
                .addColumns(excelColumnsWH)
                .addDataSource(data?.[4], { str2num: true })
        }
        if (data?.[5].length > 0) {
            excel
                .addSheet('24SS-EXF')
                .addColumns(excelColumnsEXf)
                .addDataSource(data?.[5], { str2num: true })
        }
        excel.saveAs('SeasonWise.xlsx');
    }

    let excelColumnsWH: IExcelColumn[] = []
    excelColumnsWH = [
        { title: 'Item code', dataIndex: 'itemCode' },
        { title: 'Item Name', dataIndex: 'itemName' },
        { title: 'January', dataIndex: "orderQty",render: (text, record) => (record.whMonth === 1 ? text : '-')},
        { title: 'February', dataIndex: "orderQty",render: (text, record) => (record.whMonth === 2 ? text : '-')},
        { title: 'March', dataIndex: "orderQty",render: (text, record) => (record.whMonth === 3 ? text : '-')},
        { title: 'April', dataIndex: "orderQty",render: (text, record) => (record.whMonth === 4 ? text : '-')},
        { title: 'May', dataIndex: "orderQty",render: (text, record) => (record.whMonth === 5 ? text : '-')},
        { title: 'June', dataIndex: "orderQty",render: (text, record) => (record.whMonth === 6 ? text : '-')},
        { title: 'July', dataIndex: "orderQty",render: (text, record) => (record.whMonth === 7 ? text : '-')},
        { title: 'August', dataIndex: "orderQty",render: (text, record) => (record.whMonth === 8 ? text : '-')},
        { title: 'September', dataIndex: "orderQty",render: (text, record) => (record.whMonth === 9 ? text : '-')},
        { title: 'October', dataIndex: "orderQty",render: (text, record) => (record.whMonth === 10 ? text : '-')},
        { title: 'November', dataIndex: "orderQty",render: (text, record) => (record.whMonth === 11 ? text : '-')},
        { title: 'December', dataIndex: "orderQty",render: (text, record) => (record.whMonth === 12 ? text : '-')},
        { title: 'Total', dataIndex: 'total' },
    ]

    let excelColumnsEXf: IExcelColumn[] = []
    excelColumnsEXf = [
        { title: 'Item code', dataIndex: 'itemCode' },
        { title: 'Item Name', dataIndex: 'itemName' },
        { title: 'January', dataIndex: "orderQty",render: (text, record) => (record.exfMonth === 1 ? text : '-')},
        { title: 'February', dataIndex: "orderQty",render: (text, record) => (record.exfMonth === 2 ? text : '-')},
        { title: 'March', dataIndex: "orderQty",render: (text, record) => (record.exfMonth === 3 ? text : '-')},
        { title: 'April', dataIndex: "orderQty",render: (text, record) => (record.exfMonth === 4 ? text : '-')},
        { title: 'May', dataIndex: "orderQty",render: (text, record) => (record.exfMonth === 5 ? text : '-')},
        { title: 'June', dataIndex: "orderQty",render: (text, record) => (record.exfMonth === 6 ? text : '-')},
        { title: 'July', dataIndex: "orderQty",render: (text, record) => (record.exfMonth === 7 ? text : '-')},
        { title: 'August', dataIndex: "orderQty",render: (text, record) => (record.exfMonth === 8 ? text : '-')},
        { title: 'September', dataIndex: "orderQty",render: (text, record) => (record.exfMonth === 9 ? text : '-')},
        { title: 'October', dataIndex: "orderQty",render: (text, record) => (record.exfMonth === 10 ? text : '-')},
        { title: 'November', dataIndex: "orderQty",render: (text, record) => (record.exfMonth === 11 ? text : '-')},
        { title: 'December', dataIndex: "orderQty",render: (text, record) => (record.exfMonth === 12 ? text : '-')},
        { title: 'Total', dataIndex: 'total' },
    ]


    const generateSummaryWH = (pageData) => {
        let january = 0;
        let february = 0
        let march = 0
        let april = 0
        let may = 0
        let june = 0
        let july = 0
        let august = 0
        let september = 0
        let october = 0
        let november = 0
        let december = 0
        let total = 0
      
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 1) {
              january += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 2) {
              february += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 3) {
              march += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 4) {
              april += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 5) {
              may += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 6) {
              june += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 7) {
              july += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 8) {
              august += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 9) {
              september += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 10) {
              october += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 11) {
              november += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 12) {
              december += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, whMonth}) => {
            if(Number(orderQty) && whMonth === 1) {
              total += Number(orderQty)
            }
          })
      
          return (
            <>
              <Table.Summary.Row className='tableFooter'>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}><Text type="danger">Grand Total</Text></Table.Summary.Cell>
                <Table.Summary.Cell index={3}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(january).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={4}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(february).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={5}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(march).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={6}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(april).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={7}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(may).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={8}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(june).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={9}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(july).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={10}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(august).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={11}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(september).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={12}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(october).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={13}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(november).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={14}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(december).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={15}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(total).toLocaleString('en-IN')}</div></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
      };

      const generateSummaryEXF = (pageData) => {
        let january = 0;
        let february = 0
        let march = 0
        let april = 0
        let may = 0
        let june = 0
        let july = 0
        let august = 0
        let september = 0
        let october = 0
        let november = 0
        let december = 0
        let total = 0
      
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 1) {
              january += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 2) {
              february += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 3) {
              march += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 4) {
              april += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 5) {
              may += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 6) {
              june += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 7) {
              july += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 8) {
              august += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 9) {
              september += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 10) {
              october += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 11) {
              november += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 12) {
              december += Number(orderQty)
            }
          })
        pageData.forEach(({orderQty, exfMonth}) => {
            if(Number(orderQty) && exfMonth === 1) {
              total += Number(orderQty)
            }
          })
      
          return (
            <>
              <Table.Summary.Row className='tableFooter'>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}><Text type="danger">Grand Total</Text></Table.Summary.Cell>
                <Table.Summary.Cell index={3}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(january).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={4}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(february).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={5}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(march).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={6}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(april).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={7}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(may).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={8}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(june).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={9}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(july).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={10}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(august).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={11}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(september).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={12}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(october).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={13}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(november).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={14}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(december).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={15}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(total).toLocaleString('en-IN')}</div></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
      };

    const items: TabsProps['items'] = [
        {
            key:"1",
            label:<b>23SS-WH </b>,
            children: <Table bordered dataSource={data?.[0]} columns={columnsWH} summary={generateSummaryWH}/>,
        },
        {
            key:"2",
            label:<b>23SS-EXF </b>,
            children: <Table bordered dataSource={data?.[1]} columns={columnsEXF} summary={generateSummaryEXF}/>,
        },
        {
            key:"3",
            label:<b>23FW-WH </b>,
            children: <Table bordered dataSource={data?.[2]} columns={columnsWH} summary={generateSummaryWH}/>,
        },
        {
            key:"4",
            label:<b>23FW-EXF </b>,
            children: <Table bordered dataSource={data?.[3]} columns={columnsEXF} summary={generateSummaryEXF}/>,
        },
        {
            key:"5",
            label:<b>24SS-WH</b>,
            children: <Table bordered dataSource={data?.[4]} columns={columnsWH} summary={generateSummaryWH}/>,
        },
        {
            key:"6",
            label:<b>24SS-EXF </b>,
            children: <Table bordered dataSource={data?.[5]} columns={columnsEXF} summary={generateSummaryEXF}/>,
        },
    ]

  return (
    <>
    <Card title="Season Wise Order Quantity" extra ={data?.[0] || data?.[1] || data?.[2] || data?.[3] || data?.[4] || data?.[5] ? (<Button
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