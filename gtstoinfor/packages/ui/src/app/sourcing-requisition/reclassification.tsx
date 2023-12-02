import { SearchOutlined } from "@ant-design/icons";
import { BuyersService, FabricTypeService, FabricWeaveService, M3ItemsService, ReclassificationService, StockService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Space, Table, Select, message, FormInstance, Descriptions } from "antd";
import { ColumnType, ColumnProps } from "antd/es/table";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import AlertMessages from "../common/common-functions/alert-messages";
import { useLocation, useNavigate } from "react-router-dom";
// import {StockDetailsInfo} from "./stock-details-info"
import DescriptionsItem from "antd/es/descriptions/Item";
import { ReclassificationDto } from "@project-management-system/shared-models";
export interface ReclassificationProps {
  data:any,
  buyer:any,
  type:string
  status: (boolean) => void;
}

export const Reclassification = (props:ReclassificationProps) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [page, setPage] = React.useState(1);
  const [buyer, setBuyer] = useState<any[]>([]);
  const [stockData, setStockData] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buyerService = new BuyersService();
  const reclassificationService = new ReclassificationService();
  // const location = useLocation()
  // const stateData :any=location.state
  useEffect(() => {
    getBuyers();
  }, []);
  useEffect(() => {
    console.log(props.data)
    setStockData(props?.data)
    form.setFieldsValue({ 
        quantity:props?.data.qty, m3Item:props?.data.m3itemId, locationId:props?.data.locationId, stockId:props?.data.stockId, grnItemId:props?.data.grnItemId,uomId:props?.data.uomId,fromBuyer:props?.data.buyer_id
      });
      setVisible(true)
  }, [props?.data]);


  useEffect(() => {
    form.setFieldsValue({ 
        buyerId: props?.buyer
      });
  }, [props?.buyer]);
  

  const getBuyers = () => {
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyer(res.data);
      }
    });
  };

  const onFinish = (data: any) => {
    console.log(data)
    const req = new ReclassificationDto(0,data.stockId,form.getFieldValue("quantity"),data.m3Item,data.locationId,form.getFieldValue("buyerId"),data.fromBuyer,undefined,"","",0,data.grnItemId,data.uomId);
    reclassificationService.createReclassification(req).then((res) => {
      if(res.status){
        AlertMessages.getSuccessMessage(res.internalMessage);
        props.status(false)
      }
      else{
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getInfoMessage(err);
    })
  };
  return (
    <Card title="Reclassification" headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
       <Form layout="vertical" form={form} onFinish={onFinish}>
       <Row gutter={24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
            <Form.Item
              name="buyerId"
              label="Buyer"
              rules={[{ required: true, message: "Buyer is required" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Buyer"
              >
                {buyer.map((e) => {
                  return (
                    <option
                      key={e.buyerId}
                      value={e.buyerId}
                    >
                      {`${e.buyerCode} - ${e.buyerName}`}
                    </option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Form.Item
                label="m3Item"
                name="m3Item" style={{display:'none'}}
              >
                <Input placeholder=" Enter  m3Item" />
              </Form.Item>
              <Form.Item
                label="locationId"
                name="locationId" style={{display:'none'}}
              >
                <Input placeholder=" Enter  locationId" />
              </Form.Item>
              <Form.Item
                label="stockId"
                name="stockId" style={{display:'none'}}
              >
                <Input placeholder=" Enter  stockId" />
              </Form.Item>
              <Form.Item
                label="grnItemId"
                name="grnItemId" style={{display:'none'}}
              >
                <Input placeholder=" Enter  grnItemId" />
              </Form.Item>
              <Form.Item
                label="fromBuyer"
                name="fromBuyer" style={{display:'none'}}
              >
                <Input placeholder=" Enter  fromBuyer" />
              </Form.Item>
              <Form.Item
                label="uomId"
                name="uomId" style={{display:'none'}}
              >
                <Input placeholder=" Enter  uomId" />
              </Form.Item>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 4 }}
              lg={{ span: 8 }}
              xl={{ span: 3 }}
            >
              <Form.Item
                label="Quantity"
                name="quantity"
                 rules={[
                  { required: false, message: 'Field is required' },
                ]}
              >
                <Input placeholder=" Enter  quantity" />
              </Form.Item>
            </Col>
            <Col span={4}  style={{paddingTop:'20px'}}>
              <Button type="primary" htmlType="submit">
               Submit
              </Button>
                </Col>
            
          </Row>
    </Form>
    {
      visible ? 
      <><Descriptions size='small'>
            <DescriptionsItem label='Buyer'>{props.data.buyer}</DescriptionsItem>
            <DescriptionsItem label='Material Type'>{props.data.itemType}</DescriptionsItem>
            <DescriptionsItem label='M3 Item'>{props.data.m3Item}</DescriptionsItem>
            <DescriptionsItem label='Location'>{props.data.location}</DescriptionsItem>
            <DescriptionsItem label='Quantity'>{props.data.qty}</DescriptionsItem>
          </Descriptions></>
          :""
    }
    </Card>
  );
};
