import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { SeasonWiseRequest } from '@project-management-system/shared-models';
import { OrdersService } from '@project-management-system/shared-services';
import { Alert, Button, Card, Col, Form, Row, Select, Table, Tabs, TabsProps, Typography } from 'antd'
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { ColumnsType } from 'antd/es/table';
import TabPane from "antd/es/tabs/TabPane"
import React, { useEffect, useState } from 'react'

const SeasonWiseReport = () => {
    const { Text } = Typography;
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);
    const service = new OrdersService()
    const [data, setData] = useState<any>([]);
    const [itemCode, setItemCode] = useState<any>([]);
    const [itemName, setItemName] = useState<any>([])
    const [activeTabKey, setActiveTabKey] = useState<string>('1');
    const [form] = Form.useForm()
    const { Option } = Select;

    useEffect(()=>{
        reportSS()
        getItemCode()
        getItemName()
    },[])  

    const handleTabChange = (newTabKey) => {
      form.resetFields();
      setActiveTabKey(newTabKey)
  };

    const reportSS = () =>{
      const req = new SeasonWiseRequest()
        if(form.getFieldValue('itemCode') !== undefined){
            req.itemCode = form.getFieldValue('itemCode')
        }
        if(form.getFieldValue('itemName') !== undefined){
            req.itemName = form.getFieldValue('itemName')
        }
        console.log(req,'oooooooo')
        console.log(req.itemCode,req.itemName,'yoyoyoyoyooyoyoyoyo')
        service.seasonWiseReport(req).then((res)=>{
          if(res.data){
            setData(res.data)
          }
        })
    }

    const getItemCode = ()=>{
      service.getSeasonWiseItemCode().then((res)=>{
        setItemCode(res.data)
      })
    }

    const getItemName = ()=>{
      service.getSeasonWiseItemName().then((res)=>{
        setItemName(res.data)
      })
    }

    const OnReset = () => {
      form.resetFields()
      reportSS()
  }
    

    const columnsWH: ColumnsType<any> = [
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
            children :[
                {
                    title: `January`,
                    dataIndex: "january",
                    align:"right",
                    // render: (text) => (record.whMonth === 1 ? text : '-'),
                },
                {
                    title: `February`,
                    dataIndex: "february",
                    align:"right",
                    // render: (text, record) => (record.whMonth === 2 ? text : '-'),
                },
                {
                    title: `March`,
                    dataIndex: "march",
                    align:"right",
                    // render: (text, record) => (record.whMonth === 3 ? text : '-'),
                },
                {
                    title: `April`,
                    dataIndex: "april",
                    align:"right",
                    // render: (text, record) => (record.whMonth === 4 ? text : '-'),
                },
                {
                    title: `May`,
                    dataIndex: "may",
                    align:"right",
                    // render: (text, record) => (record.whMonth === 5 ? text : '-'),                
                },
                {
                    title: `June`,
                    dataIndex: "june",
                    align:"right",
                    // render: (text, record) => (record.whMonth === 6 ? text : '-'),                
                },
                {
                    title: `July`,
                    dataIndex: "july",
                    align:"right",
                    // render: (text, record) => (record.whMonth === 7 ? text : '-'),                
                },
                {
                    title: `August`,
                    dataIndex: "august",
                    align:"right",
                    // render: (text, record) => (record.whMonth === 8 ? text : '-'),                
                },
                {
                    title: `September`,
                    dataIndex: "september",
                    align:"right",
                    // render: (text, record) => (record.whMonth === 9 ? text : '-'),
                },
                {
                    title: `October`,
                    dataIndex: "october",
                    align:"right",
                    // render: (text, record) => (record.whMonth === 10 ? text : '-'),                
                },
                {
                    title: `November`,
                    dataIndex: "november",
                    align:"right",
                    // render: (text, record) => (record.whMonth === 11 ? text : '-'),                
                },
                {
                    title: `December`,
                    dataIndex: "december",
                    align:"right",
                    // render: (text, record) => (record.whMonth === 12 ? text : '-'),                
                },
            ]
        },
        {
            title: 'Total',
            dataIndex: 'whTotal',
            align: 'right',
            width:"100px",
            render: (text, record) => (<strong>{text}</strong>),
        },
        
    ]

    const columnsEXF: ColumnsType<any> = [
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
                    dataIndex: "exfJan",
                    align:"right",
                    // render: (text, record) => (record.exfMonth === 1 ? text : '-'),
                },
                {
                    title: `February`,
                    dataIndex: "exfFeb",
                    align:"right",
                    // render: (text, record) => (record.exfMonth === 2 ? text : '-'),
                },
                {
                    title: `March`,
                    dataIndex: "exfMarch",
                    align:"right",
                    // render: (text, record) => (record.exfMonth === 3 ? text : '-'),
                },
                {
                    title: `April`,
                    dataIndex: "exfApril",
                    align:"right",
                    // render: (text, record) => (record.exfMonth === 4 ? text : '-'),
                },
                {
                    title: `May`,
                    dataIndex: "exfMay",
                    align:"right",
                    // render: (text, record) => (record.exfMonth === 5 ? text : '-'),                
                },
                {
                    title: `June`,
                    dataIndex: "exfJune",
                    align:"right",
                    // render: (text, record) => (record.exfMonth === 6 ? text : '-'),                
                },
                {
                    title: `July`,
                    dataIndex: "exfJuly",
                    align:"right",
                    // render: (text, record) => (record.exfMonth === 7 ? text : '-'),                
                },
                {
                    title: `August`,
                    dataIndex: "exfAug",
                    align:"right",
                    // render: (text, record) => (record.exfMonth === 8 ? text : '-'),                
                },
                {
                    title: `September`,
                    dataIndex: "exfSep",
                    align:"right",
                    // render: (text, record) => (record.exfMonth === 9 ? text : '-'),
                },
                {
                    title: `October`,
                    dataIndex: "exfOct",
                    align:"right",
                    // render: (text, record) => (record.exfMonth === 10 ? text : '-'),                
                },
                {
                    title: `November`,
                    dataIndex: "exfNov",
                    align:"right",
                    // render: (text, record) => (record.exfMonth === 11 ? text : '-'),                
                },
                {
                    title: `December`,
                    dataIndex: "exfDec",
                    align:"right",
                    // render: (text, record) => (record.exfMonth === 12 ? text : '-'),                
                },
            ]
        },
        {
            title: 'Total',
            dataIndex: 'exfTotal',
            align: 'right',
            width:"100px",
            render: (text, record) => (<strong>{text}</strong>),
        },
]


    const exportExcel = () => {
        const excel = new Excel();
        if (data?.[0].length > 0) {
            excel
                .addSheet('23SS-WH')
                .addColumns(excelColumnsWH)
                .addDataSource(data?.[0], { str2num: true })
        }
        if (data?.[0].length > 0) {
            excel
                .addSheet('23SS-EXF')
                .addColumns(excelColumnsEXf)
                .addDataSource(data?.[0], { str2num: true })
        }
        if (data?.[1].length > 0) {
            excel
                .addSheet('23FW-WH')
                .addColumns(excelColumnsWH)
                .addDataSource(data?.[1], { str2num: true })
        }
        if (data?.[1].length > 0) {
            excel
                .addSheet('23FW-EXF')
                .addColumns(excelColumnsEXf)
                .addDataSource(data?.[1], { str2num: true })
        }
        if (data?.[2].length > 0) {
            excel
                .addSheet('24SS-WH')
                .addColumns(excelColumnsWH)
                .addDataSource(data?.[2], { str2num: true })
        }
        if (data?.[2].length > 0) {
            excel
                .addSheet('24SS-EXF')
                .addColumns(excelColumnsEXf)
                .addDataSource(data?.[2], { str2num: true })
        }
        excel.saveAs('SeasonWise.xlsx');
    }

    let excelColumnsWH: IExcelColumn[] = []
    excelColumnsWH = [
        { title: 'Item code', dataIndex: 'itemCode' },
        { title: 'Item Name', dataIndex: 'itemName' },
        { title: 'January', dataIndex: "january"},
        { title: 'February', dataIndex: "february"},
        { title: 'March', dataIndex: "march"},
        { title: 'April', dataIndex: "april"},
        { title: 'May', dataIndex: "may"},
        { title: 'June', dataIndex: "june"},
        { title: 'July', dataIndex: "july"},
        { title: 'August', dataIndex: "august"},
        { title: 'September', dataIndex: "september"},
        { title: 'October', dataIndex: "october"},
        { title: 'November', dataIndex: "november"},
        { title: 'December', dataIndex: "december"},
        { title: 'Total', dataIndex: 'whTotal'}
    ]

    let excelColumnsEXf: IExcelColumn[] = []
    excelColumnsEXf = [
        { title: 'Item code', dataIndex: 'itemCode' },
        { title: 'Item Name', dataIndex: 'itemName' },
        { title: 'January', dataIndex: "exfJan"},
        { title: 'February', dataIndex: "exfFeb"},
        { title: 'March', dataIndex: "exfMarch"},
        { title: 'April', dataIndex: "exfApril"},
        { title: 'May', dataIndex: "exfMay"},
        { title: 'June', dataIndex: "exfJune"},
        { title: 'July', dataIndex: "exfJuly"},
        { title: 'August', dataIndex: "exfAug"},
        { title: 'September', dataIndex: "exfSep"},
        { title: 'October', dataIndex: "exfOct"},
        { title: 'November', dataIndex: "exfNov"},
        { title: 'December', dataIndex: "exfDec"},
        { title: 'Total', dataIndex: 'exfTotal'}
    ]


    const generateSummaryWH = (pageData) => {
        let jan = 0;
        let feb = 0
        let mar = 0
        let apr = 0
        let may1 = 0
        let jun= 0
        let jul = 0
        let aug = 0
        let sep = 0
        let oct = 0
        let nov = 0
        let dec = 0
        let total = 0
      
        pageData.forEach(({january}) => {
            if(Number(january)) {
              jan += Number(january)
            }
          })
        pageData.forEach(({february}) => {
            if(Number(february)) {
              feb += Number(february)
            }
          })
        pageData.forEach(({march}) => {
            if(Number(march)) {
              mar += Number(march)
            }
          })
        pageData.forEach(({april}) => {
            if(Number(april)) {
              apr += Number(april)
            }
          })
        pageData.forEach(({may}) => {
            if(Number(may)) {
              may1 += Number(may)
            }
          })
        pageData.forEach(({june}) => {
            if(Number(june)) {
              jun += Number(june)
            }
          })
        pageData.forEach(({july}) => {
            if(Number(july)) {
              jul += Number(july)
            }
          })
        pageData.forEach(({august}) => {
            if(Number(august)) {
              aug += Number(august)
            }
          })
        pageData.forEach(({september}) => {
            if(Number(september)) {
              sep += Number(september)
            }
          })
        pageData.forEach(({october}) => {
            if(Number(october)) {
              oct += Number(october)
            }
          })
        pageData.forEach(({november}) => {
            if(Number(november)) {
              nov += Number(november)
            }
          })
        pageData.forEach(({december}) => {
            if(Number(december)) {
              dec += Number(december)
            }
          })
        pageData.forEach(({whTotal}) => {
            if(Number(whTotal)) {
              total += Number(whTotal)
            }
          })
      
          return (
            <>
              <Table.Summary.Row className='tableFooter'>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}><Text type="danger">Grand Total</Text></Table.Summary.Cell>
                <Table.Summary.Cell index={3}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(jan).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={4}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(feb).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={5}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(mar).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={6}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(apr).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={7}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(may1).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={8}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(jun).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={9}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(jul).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={10}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(aug).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={11}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(sep).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={12}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(oct).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={13}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(nov).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={14}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(dec).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={15}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(total).toLocaleString('en-IN')}</div></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
      };

      const generateSummaryEXF = (pageData) => {
        let jan = 0;
        let feb = 0
        let mar = 0
        let apr = 0
        let may1 = 0
        let jun= 0
        let jul = 0
        let aug = 0
        let sep = 0
        let oct = 0
        let nov = 0
        let dec = 0
        let total = 0
      
        pageData.forEach(({exfJan}) => {
            if(Number(exfJan)) {
              jan += Number(exfJan)
            }
          })
        pageData.forEach(({exfFeb}) => {
            if(Number(exfFeb)) {
              feb += Number(exfFeb)
            }
          })
        pageData.forEach(({exfMarch}) => {
            if(Number(exfMarch)) {
              mar += Number(exfMarch)
            }
          })
        pageData.forEach(({exfApril}) => {
            if(Number(exfApril)) {
              apr += Number(exfApril)
            }
          })
        pageData.forEach(({exfMay}) => {
            if(Number(exfMay)) {
              may1 += Number(exfMay)
            }
          })
        pageData.forEach(({exfJune}) => {
            if(Number(exfJune)) {
              jun += Number(exfJune)
            }
          })
        pageData.forEach(({exfJuly}) => {
            if(Number(exfJuly)) {
              jul += Number(exfJuly)
            }
          })
        pageData.forEach(({exfAug}) => {
            if(Number(exfAug)) {
              aug += Number(exfAug)
            }
          })
        pageData.forEach(({exfSep}) => {
            if(Number(exfSep)) {
              sep += Number(exfSep)
            }
          })
        pageData.forEach(({exfOct}) => {
            if(Number(exfOct)) {
              oct += Number(exfOct)
            }
          })
        pageData.forEach(({exfNov}) => {
            if(Number(exfNov)) {
              nov += Number(exfNov)
            }
          })
        pageData.forEach(({exfDec}) => {
            if(Number(exfDec)) {
              dec += Number(exfDec)
            }
          })
        pageData.forEach(({exfTotal}) => {
            if(Number(exfTotal)) {
              total += Number(exfTotal)
            }
          })
      
          return (
            <>
              <Table.Summary.Row className='tableFooter'>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}><Text type="danger">Grand Total</Text></Table.Summary.Cell>
                <Table.Summary.Cell index={3}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(jan).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={4}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(feb).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={5}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(mar).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={6}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(apr).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={7}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(may1).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={8}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(jun).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={9}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(jul).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={10}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(aug).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={11}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(sep).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={12}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(oct).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={13}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(nov).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={14}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(dec).toLocaleString('en-IN')}</div></Table.Summary.Cell>
                <Table.Summary.Cell index={15}><div style={{textAlign:'right', fontWeight:"bold"}}>{Number(total).toLocaleString('en-IN')}</div></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
      };


      const items = [
        {
          key: "1",
          label: <b>23SS-WH </b>,
          children: (
            data?.[0]?.length > 0 ? (
              <Table
                bordered
                dataSource={data?.[0]}
                columns={columnsWH}
                summary={generateSummaryWH}
              />
            ) : (
              <Alert message="No data available" type="warning" showIcon style={{ width: "150px", margin: "auto" }}/>
            )
          )
        },
        {
          key: "2",
          label: <b>23SS-EXF </b>,
          children: (
            data?.[0]?.length > 0 ? (
              <Table
                bordered
                dataSource={data?.[0]}
                columns={columnsEXF}
                summary={generateSummaryEXF}
              />
            ) : (
              <Alert message="No data available" type="warning" showIcon style={{ width: "150px", margin: "auto" }}/>
            )
          )
        },
        {
          key: "3",
          label: <b>23FW-WH </b>,
          children: (
            data?.[1]?.length > 0 ? (
              <Table
                bordered
                dataSource={data?.[1]}
                columns={columnsWH}
                summary={generateSummaryWH}
              />
            ) : (
              <Alert message="No data available" type="warning" showIcon style={{ width: "150px", margin: "auto" }}/>
            )
          )
        },
        {
          key: "4",
          label: <b>23FW-EXF </b>,
          children: (
            data?.[1]?.length > 0 ? (
              <Table
                bordered
                dataSource={data?.[1]}
                columns={columnsEXF}
                summary={generateSummaryEXF}
              />
            ) : (
              <Alert message="No data available" type="warning" showIcon style={{ width: "150px", margin: "auto" }}/>
            )
          )
        },
        {
          key: "5",
          label: <b>24SS-WH</b>,
          children: (
            data?.[2]?.length > 0 ? (
              <Table
                bordered
                dataSource={data?.[2]}
                columns={columnsWH}
                summary={generateSummaryWH}
              />
            ) : (
              <Alert message="No data available" type="warning" showIcon style={{ width: "150px", margin: "auto" }}/>
            )
          )
        },
        {
          key: "6",
          label: <b>24SS-EXF </b>,
          children: (
            data?.[2]?.length > 0 ? (
              <Table
                bordered
                dataSource={data?.[2]}
                columns={columnsEXF}
                summary={generateSummaryEXF}
              />
            ) : (
              <Alert message="No data available" type="warning" showIcon style={{ width: "150px", margin: "auto" }}/>
            )
          )
        }
      ];
      
      

      return (
        <Card title="Season Wise Order Quantity" extra={data?.[0] || data?.[1] || data?.[2] ? (
          <Button
            type="default"
            style={{ color: 'green' }}
            onClick={exportExcel}
            icon={<FileExcelFilled />}
          >
            Download Excel
          </Button>
        ) : null}>
          <Form layout="vertical" form={form} onFinish={reportSS}>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={8} lg={6} xl={4}>
                <Form.Item label='Item Code' name='itemCode'>
                  <Select
                    showSearch
                    placeholder="Select Item Code"
                    optionFilterProp="children"
                    allowClear
                    value={activeTabKey === '1' ? form.getFieldValue('itemCode') : undefined}
                  >
                    {itemCode.filter((e) => {
                      return (
                        (activeTabKey === '1' || activeTabKey === '2') &&
                        data?.[0]?.some((item) => item.itemCode === e.itemCode)
                      ) || (
                        (activeTabKey === '3' || activeTabKey === '4') &&
                        data?.[1]?.some((item) => item.itemCode === e.itemCode)
                      ) || (
                        (activeTabKey === '5' || activeTabKey === '6') &&
                        data?.[2]?.some((item) => item.itemCode === e.itemCode)
                      ) || true;
                    }).map((inc: any) => (
                      <Option key={inc.itemCode} value={inc.itemCode}>
                        {inc.itemCode}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                <Form.Item label='Item Name' name='itemName'>
                  <Select
                    showSearch
                    placeholder="Select Item Name"
                    optionFilterProp="children"
                    allowClear
                    value={activeTabKey === '1' ? form.getFieldValue('itemName') : undefined}
                  >
                    {itemName.filter((e) => {
                      return (
                        (activeTabKey === '1' || activeTabKey === '2') &&
                        data?.[0]?.some((item) => item.itemName === e.itemName)
                      ) || (
                        (activeTabKey === '3' || activeTabKey === '4') &&
                        data?.[1]?.some((item) => item.itemName === e.itemName)
                      ) || (
                        (activeTabKey === '5' || activeTabKey === '6') &&
                        data?.[2]?.some((item) => item.itemName === e.itemName)
                      ) || true;
                    }).map((e: any) => (
                      <Option key={e.itemName} value={e.itemName}>
                        {e.itemName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={4} lg={4} xl={3} style={{ marginTop: "22px", marginRight: "-50px", marginLeft:"40px" }}>
                <Form.Item>
                  <Button icon={<SearchOutlined />} htmlType="submit" type='primary'>
                    Search
                  </Button>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={4} lg={4} xl={2} style={{ marginTop: "22px" }}>
                <Form.Item>
                  <Button danger icon={<UndoOutlined />} onClick={OnReset}>
                    Reset
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Tabs
            type={'card'}
            items={items}
            activeKey={activeTabKey}
            onChange={(newTabKey) => handleTabChange(newTabKey)}
          />
        </Card>
      );
}

export default SeasonWiseReport