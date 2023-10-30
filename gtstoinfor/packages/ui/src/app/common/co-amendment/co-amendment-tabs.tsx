import { Button, Card, Col, Descriptions, Form, Row, Select, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import Test from './test';
import { BuyersService, EmployeeDetailsService, StyleOrderService } from '@project-management-system/shared-services';
import { BuyerIdReq, StyleOrderIdReq, styleOrderReq } from '@project-management-system/shared-models';
import moment from 'moment';

export interface COAmendmentTabsProps {}
const COAmendmentTabs = (props: COAmendmentTabsProps) => {

  const [activeTab, setActiveTab] = useState('1');
  const [form] = Form.useForm();
  const {Option} = Select;

  const styleorderService = new StyleOrderService()
  const buyerService = new BuyersService()
  const empService = new EmployeeDetailsService()


  const [codata, setCOData] = useState<any[]>([]);
  const [coId, setCoId] = useState<any>();
  const [data, setData] = useState<any[]>([]);
 




  const onChange = (key: string) =>  {
    console.log('onChange', key)
    setActiveTab(key);
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    getCoData();
   
  }, []);

  const getCoData = () => {

    styleorderService.getCoNumber().then((res) => {
      if (res.status) {
        setCOData(res.data);
       }
    });
}
  const onchange =(value)=>{
    setCoId(value)
  }
  
  const getData = () =>{
    const req = new StyleOrderIdReq(coId,undefined)
    styleorderService.getCOInfoById(req).then((res) => {
      if (res.status) {
        setData(res.data);
       }
    });

  }

  console.log(data,"data1111111111111")
 

 
  


  const items: TabsProps['items'] = [
    {
      key: 'orderline',
      label: (
        <span style={{ color: "green" }}>
         Change Order Line
        </span>
      ),
      children: <Test poData={data}  key={activeTab}/>,
    },
    {
      key: 'fob',
      label: (
        <span style={{ color:"brown" }}>
         Change FOB
        </span>
      ),
      children: <Test poData={data}  key={activeTab} />,

    },
    {
      key: 'deliverydate',
      label: (
        <span style={{ color: "green" }}>
         Change Delivery Date
        </span>
      ),
      children: <Test poData={data}  key={activeTab} />

    },
    {
      key: 'quality',
      label: (
        <span style={{ color:"brown" }}>
          Change Quality
        </span>
      ),
      children: <Test poData={data}  key={activeTab} />,

    },
    {
      key: 'vponumber',
      label: (
        <span style={{ color: "green" }}>
          Change VPO Number
        </span>
      ),
     children: <Test poData={data}  key={activeTab} />,

    },
    {
      key: 'destinationaddress',
      label: (
        <span style={{ color:"brown" }}>
          Change Destination Address
        </span>
      ),
      children: <Test poData={data}  key={activeTab} />
    },
   
  
  ];

  return (
    <Card
      title="CO Amendment"
      
    >
        <Form  form={form} >
    <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='coNumber' label='CO Number' >
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select CO Line' onChange={onchange} >
                    {
                            codata.map((e) => {
                                return(
                                    <Option key={e.coId} value={e.coId}>{e.coNumber}</Option>
                                )
                            })
                        }

                    </Select>
                </Form.Item>
                </Col>
                <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" onClick={getData}>
              Submit
            </Button>
         <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
            Reset
          </Button>
          </Col>
        </Row>
    </Row>
    </Form>
   { data.length > 0 ? 
     <Descriptions >
          <Descriptions.Item label='CO Number'labelStyle={{ color: 'black', fontWeight: 'bold' }}>{data[0]?.coNumber}</Descriptions.Item>
          <Descriptions.Item label='Item Code'labelStyle={{ color: 'black', fontWeight: 'bold' }}>{data[0]?.itemCode}</Descriptions.Item>
           <Descriptions.Item label='Order Date'labelStyle={{ color: 'black', fontWeight: 'bold' }}>{data[0]?.orderDate ? moment(data[0].orderDate).format('DD-MM-YYYY') : ''}</Descriptions.Item>
            <Descriptions.Item label='Buyer Style'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.buyerStyle}</Descriptions.Item>
            <Descriptions.Item label='Sale Price'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.salePrice}</Descriptions.Item>
            <Descriptions.Item label='Shipment Type'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.shipmentType}</Descriptions.Item>
            <Descriptions.Item label='Buyer PO Number'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.buyerPoNumber}</Descriptions.Item>
            <Descriptions.Item label='Price Quantity'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.priceQuantity}</Descriptions.Item> 
            <Descriptions.Item label='Agent'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.agentName}</Descriptions.Item>
            <Descriptions.Item label='BuyerAddress'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.landmark}-{data[0]?.city}-{data[0]?.state}</Descriptions.Item> 
            <Descriptions.Item label='ExFactoryDate'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.exFactoryDate ? moment(data[0].exFactoryDate).format('DD-MM-YYYY') : ''}</Descriptions.Item> 
            <Descriptions.Item label='Delivery Date'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.deliveryDate ? moment(data[0].deliveryDate).format('DD-MM-YYYY') : ''}</Descriptions.Item> 
            <Descriptions.Item label='Instore Date'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.instoreDate ? moment(data[0].instoreDate).format('DD-MM-YYYY') : ''}</Descriptions.Item> 
            <Descriptions.Item label='Price Quantity'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.priceQuantity}</Descriptions.Item>
            <Descriptions.Item label='Discount Percent'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.discountPercent}</Descriptions.Item>
            <Descriptions.Item label='Discount Amount 'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.discountAmount}</Descriptions.Item>
            <Descriptions.Item label='Payment Method'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.paymentMethod}</Descriptions.Item>
            <Descriptions.Item label='Packing Terms'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.packageTermsName}</Descriptions.Item>
            <Descriptions.Item label='Ware House'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.warehouseName}</Descriptions.Item>
            <Descriptions.Item label='Delivery Method'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.deliveryMethod}</Descriptions.Item>
            <Descriptions.Item label='Delivery Term'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.deliveryTermsName}</Descriptions.Item>
            <Descriptions.Item label='Remarks'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.remarks}</Descriptions.Item>
            <Descriptions.Item label='Status'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{data[0]?.status}</Descriptions.Item>


     </Descriptions>
    : ""  }
   
   { data.length > 0 ? 
   <Card>
    <Tabs items={items} onChange={onChange} defaultActiveKey={activeTab} type='card'  className="custom-tab-styles" tabPosition="left" />
   </Card>
    : ""}

    </Card>

  )
}

export default COAmendmentTabs;



