import { SearchOutlined } from "@ant-design/icons";
import { BuyersService, FabricTypeService, FabricWeaveService, M3ItemsService, ReclassificationService, StockService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Space, Table, Select, message, FormInstance, Descriptions } from "antd";
import { ColumnType, ColumnProps } from "antd/es/table";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import AlertMessages from "../common/common-functions/alert-messages";
import { useLocation, useNavigate } from "react-router-dom";
import {StockDetailsInfo} from "./stock-details-info"
import DescriptionsItem from "antd/es/descriptions/Item";
export interface ReclassificationProps {
  data:any,
  type:string
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
        buyerId: props?.data?.buyer,quantity:props?.data.qty
      });
      setVisible(true)
  }, [props?.data]);
  

  const getBuyers = () => {
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyer(res.data);
      }
    });
  };

  const onFinish = (data: any) => {
    console.log(data)
    data.buyer = form.getFieldValue("buyerId");
    data.quantity = form.getFieldValue("quantity");
    reclassificationService.createReclassification(data).then((res) => {
      if(res.status){
        AlertMessages.getSuccessMessage(res.internalMessage);
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
