import { DownloadOutlined, FilePdfOutlined, UndoOutlined } from '@ant-design/icons';
import { ItemTypeEnumDisplay, SampleFilterRequest, StockFilterRequest, StocksDto } from '@project-management-system/shared-models';
import { StockService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select, Statistic, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Excel } from 'antd-table-saveas-excel';
import { useIAMClientState } from "../common/iam-client-react";


const PurchaseOrderReport = () => {

    const service = new StockService();
    const [data, setData] = useState<any>([]);
    const [form] = Form.useForm();
    const [itemCode, setItemCode] = useState<any>([]);
    const [itemType, setItemType] = useState<any>([]);
    const [location, setLocation] = useState<any>([]);
    const [plant, setPlant] = useState<any>([]);
    const [stockData, setStockData] = useState<any[]>([]);
    const [filterData, setFilterData] = useState<any[]>([]);
    const [key, setKey] = useState();
    const { IAMClientAuthContext } = useIAMClientState();
    const [isBuyer, setIsBuyer] = useState(false);
    const page = 1;



    

    useEffect(() => {
        getData();
       
       
      }, []);

    const getData = () => {
      
        service.getStockReport().then(res => {
          
            if(res.status){
                setData(res.data);
        
            }
        })
      };

    


     
   

    const Columns:any=[
      {
        title: 'S No',
        key: 'sno',
        width: '70px',
        style: { background: 'red' },
        responsive: ['sm'],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
        onCell: (record: any) => ({
          rowSpan: record.rowSpan,
        }),
        fixed: 'left',
      },
        {
            title:"Po No",
            dataIndex:"pono"
            
        },
        {
          title:"Material Type",
          dataIndex:"itemType",
         
          
      },
        {
            title:"Po Against",
            dataIndex:"poAgainst",
            width:250
        },
        {
            title:"Item Code",
            dataIndex:"itemCode"
            
        },
        {
          title:"VendorName",
          dataIndex:"vendorName"
          
      },
      {
        title:"Status",
        dataIndex:"status"
        
    },
        
    ]
    const onChange =(key)=>{
      setKey(key)
      
    }
  
    const exportExcel = () => {
      const currentDate = new Date()
      .toISOString()
      .slice(0, 10)
      .split("-")
      .join("/");

  if (key === 'pop'){
    const excel = new Excel();
  excel
    .addSheet('Stock-report')
    .addColumns(Columns)
    .addDataSource(filterData, { str2num: true })
    .saveAs(`Stock-report-${currentDate}.xlsx`);
  } else {
    const excel = new Excel();
    excel
      .addSheet('Stock-report')
      .addColumns(Columns)
      .addDataSource(filterData, { str2num: true })
      .saveAs(`Stock-report-${currentDate}.xlsx`);
  }
  
}






const onFinish = () => {
  };

  const onReset = () => {
    form.resetFields();
  };
  return (
    <div>
        <Card  title={<span>Purchase Order Report</span>} style={{textAlign:'center'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
        extra={
          <div>
            <Button icon={<DownloadOutlined />} onClick={() => { exportExcel(); }} style={{marginRight:30}}>
              GET EXCEL
            </Button>
            {/* <Button icon={<FilePdfOutlined  />} onClick={() => { handleExportPDF(); }}>
              Download PDF
            </Button> */}
          </div>
        }
  
        >
        <Form form={form} 
        onFinish={onFinish}
        >
        <Row gutter={24}>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="poNo" label="Po No">
              <Select
                showSearch
                placeholder="Select Po No"
                optionFilterProp="children"
                allowClear
              >
                {location.map((qc: any) => (
                  <Select.Option key={qc.poNo} value={qc.poNo}>
                    {qc.poNo}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="fabricCode" label="Fabric Code">
              <Select
                showSearch
                placeholder="Select Fabric Code"
                optionFilterProp="children"
                allowClear
              >
                {itemCode.map((qc: any) => (
                  <Select.Option key={qc.fabricCode} value={qc.fabricCode}>
                    {qc.fabricCode}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="trimCode" label="Trim Code">
              <Select
                showSearch
                placeholder="Select Trim Code"
                optionFilterProp="children"
                allowClear
              >
                {itemType.map((qc: any) => (
                  <Select.Option key={qc.trimCode} value={qc.trimCode}>
                    {qc.trimCode}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col>
         
          
          <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "green", width: "100%" }}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                danger
                icon={<UndoOutlined />}
                onClick={onReset}
                style={{ width: "100%" }}
              >
                Reset
              </Button>
            </Form.Item>
          </Col>
          </Row>
          </Form> 
 {/* <Row gutter={40} justify={'space-evenly'}>
            <Col span={4}><Card style={{textAlign: 'left', width: 200, height: 38, backgroundColor: '#A5F5D7'}}
             title={"Total Item Code:" +data.filter(el => el.m3ItemCode).length}>
              </Card> </Col>
              <Col span={4}><Card style={{textAlign: 'left', width: 200, height: 38,  backgroundColor: '#E6D2F0'}}
              title={"Item Type:"+data.filter(el => el.item_type_id).length}>
              </Card> </Col>
              <Col span={4}><Card style={{textAlign: 'left', width: 200, height: 38,  backgroundColor: '#E6DC7B'}}
              title={"Location:"+data.filter(el => el.location_id).length}>
              </Card> </Col>
              <Col span={4}><Card style={{textAlign: 'left', width: 200, height: 38,  backgroundColor: '#A4A3A4'}}
              title={"Plant:"+data.filter(el => el.plant_id).length}>
              </Card> </Col>
          </Row><br></br> */}
        <Card >
        <Table columns={Columns}  pagination={{pageSize:50}}
        dataSource={stockData}
        className="custom-table-wrapper"
            /> 
        </Card>
        </Card>
    </div>
  )
}

export default PurchaseOrderReport