import { UndoOutlined } from '@ant-design/icons';
import { SampleFilterRequest, StockFilterRequest, StocksDto } from '@project-management-system/shared-models';
import { StockService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select, Statistic, Table } from 'antd'
import React, { useEffect, useState } from 'react'

const StockReport = () => {

    const service = new StockService();
    const [data, setData] = useState<any>([]);
    const [form] = Form.useForm();
    const [itemCode, setItemCode] = useState<any>([]);
    const [itemType, setItemType] = useState<any>([]);
    const [location, setLocation] = useState<any>([]);
    const [plant, setPlant] = useState<any>([]);
    const [stockData, setStockData] = useState<any[]>([]);
    const [filterData, setFilterData] = useState<any[]>([]);


    

    useEffect(() => {
        getData();
        getAllItemCode();
        getAllItemType();
        getAllLocation();
        getAllPlant();
        getAllStockReportData();
      }, []);

    const getData = () => {
        service.getStockReport().then(res => {
            if(res.status){
                setData(res.data);
        
            }
        })
      };

      const getAllItemCode= () => {
        service.getAllItemCode().then((res) => {
          if (res.status) {
            setItemCode(res.data)
          }
        });
      };

      const getAllItemType= () => {
        service.getAllItemType().then((res) => {
          if (res.status) {
            setItemType(res.data)
          }
        });
      };

      const getAllLocation= () => {
        service.getAllLocation().then((res) => {
          if (res.status) {
            setLocation(res.data)
          }
        });
      };

      const getAllPlant= () => {
        service.getAllPlant().then((res) => {
          if (res.status) {
            setPlant(res.data)
          }
        });
      };

      const getAllStockReportData = () => {
        const req = new StockFilterRequest()
        if (form.getFieldValue('m3ItemCode') !== undefined) {
          req.m3ItemCode = form.getFieldValue('m3ItemCode')
        }
        if (form.getFieldValue('itemType') !== undefined) {
          req.itemType = form.getFieldValue('itemType')
        }
        if (form.getFieldValue('location') !== undefined) {
          req.location = form.getFieldValue('location')
        }
        if (form.getFieldValue('plant') !== undefined) {
          req.plant = form.getFieldValue('plant')
        }
        service.getAllStockReportData(req).then((res) => {
          console.log(req,'77777777777777')
          if (res.data) {
            setStockData(res.data);
            setFilterData(res.data)
          }
        });
      };

      const onFinish = () => {
        getAllStockReportData();
      };

      const onReset = () => {
        form.resetFields();
        getAllStockReportData();
      };
   

    const Columns:any=[
        {
            title:"Buyer",
            dataIndex:"buyer"
            
        },
        {
          title:"Material Type",
          dataIndex:"MaterialType"
          
      },
        {
            title:"M3 Item",
            dataIndex:"m3Item"
        },
        {
            title:"Location",
            dataIndex:"location"
            
        },
        {
          title:"Quantity",
          dataIndex:"quantity"
          
      },
        
    ]


  return (
    <div>
        <Card  title={<span>STOCK REPORT</span>} style={{textAlign:'center'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
        >
        <Form form={form} 
        onFinish={onFinish}
        >
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="m3ItemCode" label="Item Code">
              <Select
                showSearch
                placeholder="Select Item Code"
                optionFilterProp="children"
                allowClear
              >
                {itemCode.map((qc: any) => (
                  <Select.Option key={qc.m3ItemCode} value={qc.m3ItemCode}>
                    {qc.m3ItemCode}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="itemType" label="Item Type">
              <Select
                showSearch
                placeholder="Select Item Type"
                optionFilterProp="children"
                allowClear
              >
                {itemType.map((qc: any) => (
                  <Select.Option key={qc.item_type_id} value={qc.item_type_id}>
                    {qc.item_type_id}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="location" label="Location">
              <Select
                showSearch
                placeholder="Select Location"
                optionFilterProp="children"
                allowClear
              >
                {location.map((qc: any) => (
                  <Select.Option key={qc.location_id} value={qc.location_id}>
                    {qc.location_id}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="plant" label="Plant">
              <Select
                showSearch
                placeholder="Select Plant"
                optionFilterProp="children"
                allowClear
              >
                {plant.map((qc: any) => (
                  <Select.Option key={qc.plant_id} value={qc.plant_id}>
                    {qc.plant_id}
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
        <Table columns={Columns}  
        dataSource={filterData}
        className="custom-table-wrapper"
            /> 
        </Card>
        </Card>
    </div>
  )
}

export default StockReport