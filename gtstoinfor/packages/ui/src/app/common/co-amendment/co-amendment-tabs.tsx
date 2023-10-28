import { Button, Card, Col, Descriptions, Form, Row, Select, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import Test from './test';
import { StyleOrderService } from '@project-management-system/shared-services';

export interface FabricDevelopmentTabsProps {
  key: string;
}
const COAmendmentTabs = (props: FabricDevelopmentTabsProps) => {

  const [activeTab, setActiveTab] = useState('1');
  const [form] = Form.useForm();
  const {Option} = Select;

  const styleorderService = new StyleOrderService()
  const [codata, setCOData] = useState<any[]>([]);



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

    styleorderService.getCoLine().then((res) => {
      if (res.status) {
        setCOData(res.data);
       }
    });
}

  const items: TabsProps['items'] = [
    {
      key: 'orderline',
      label: (
        <span style={{ color: "green" }}>
         Change Order Line
        </span>
      ),
      children: <Test />,
    },
    {
      key: 'fob',
      label: (
        <span style={{ color:"brown" }}>
         Change FOB
        </span>
      ),
      children: <Test />,

    },
    {
      key: 'deliverydate',
      label: (
        <span style={{ color: "green" }}>
         Change Delivery Date
        </span>
      ),
      children: <Test />,

    },
    {
      key: 'quality',
      label: (
        <span style={{ color:"brown" }}>
          Change Quality
        </span>
      ),
      children: <Test />,

    },
    {
      key: 'vponumber',
      label: (
        <span style={{ color: "green" }}>
          Change VPO Number
        </span>
      ),
     children: <Test />,

    },
    {
      key: 'destinationaddress',
      label: (
        <span style={{ color:"brown" }}>
          Change Destination Address
        </span>
      ),
      children: <Test />
    },
   
  
  ];

  return (
    <Card
      title="CO Amendment"
      
    >
        <Form  form={form} >
    <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='coNumber' label='CO Number'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select CO Line' >
                    {
                            codata.map((e) => {
                                return(
                                    <Option key={e.styleOrderInfo.coId} value={e.styleOrderInfo.coId}>{e.styleOrderInfo.coNumber}</Option>
                                )
                            })
                        }

                    </Select>
                </Form.Item>
                </Col>
                <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
         <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
            Reset
          </Button>
          </Col>
        </Row>
    </Row>

    </Form>
      <Descriptions>
        <Descriptions.Item
          children={''}
          label={"CO Number"}
          labelStyle={{
            color: "black",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        />
         <Descriptions.Item
          children={''}
          label={"Buyer"}
          labelStyle={{
            color: "black",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        />
         <Descriptions.Item
          children={''}
          label={"Order Quantity"}
          labelStyle={{
            color: "black",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        />
           <Descriptions.Item
          children={''}
          label={"Shipment Type"}
          labelStyle={{
            color: "black",
            fontStyle: "italic",
            fontWeight: "bolder",
          }}
        />  
         <Descriptions.Item
        children={''}
        label={"Buyer PO Number"}
        labelStyle={{
          color: "black",
          fontStyle: "italic",
          fontWeight: "bolder",
        }}
      /> 
        <Descriptions.Item
      children={''}
      label={"Payment Terms"}
      labelStyle={{
        color: "black",
        fontStyle: "italic",
        fontWeight: "bolder",
      }}
    />   
    <Descriptions.Item
    children={''}
    label={"Payment Method"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
     <Descriptions.Item
    children={''}
    label={"Packing Terms"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
      <Descriptions.Item
    children={''}
    label={"Ware House"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
        <Descriptions.Item
    children={''}

    label={"Delivery Method"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
        <Descriptions.Item
    children={''}

    label={"Delivery Term"}
    labelStyle={{
      color: "black",
      fontStyle: "italic",
      fontWeight: "bolder",
    }}
  />
    </Descriptions>

    <Card>
    <Tabs items={items} onChange={onChange} defaultActiveKey={props.key} type='card'  className="custom-tab-styles" tabPosition="left" />
    </Card>
    </Card>

  )
}

export default COAmendmentTabs;



