import { SearchOutlined } from "@ant-design/icons";
import { BuyersService, FabricTypeService, FabricWeaveService, M3ItemsService, StockService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Space, Table, Select, message, Descriptions } from "antd";
import { ColumnType, ColumnProps } from "antd/es/table";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import AlertMessages from "../common/common-functions/alert-messages";
import { useLocation, useNavigate } from "react-router-dom";

export const Reclassification = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [page, setPage] = React.useState(1);
  const [buyer, setBuyer] = useState<any[]>([]);
  const [stockData, setStockData] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buyerService = new BuyersService();
  const location = useLocation()
  const stateData :any=location.state
  useEffect(() => {
    getBuyers();
  }, []);
  useEffect(() => {
    console.log(stateData.data)
    setStockData(stateData?.data)
    form.setFieldsValue({ 
        buyerId: stateData?.data?.buyer,
      });
      setVisible(true)
  }, [stateData?.data]);
  

  const getBuyers = () => {
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyer(res.data);
      }
    });
  };

  const columns: ColumnProps<any>[] = [
    {
      title: "S No",
      key: "sno",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    // {
    //   title: "M3 Style",
    //   dataIndex: "m3_style_code",
    //   ...getColumnSearchProps("m3_style_code"),
    //   // sorter: (a, b) => a.plant - b.plant,
    //   // sortDirections: ['descend', 'ascend'],
    // },
    

    {
      title: "Buyer",
      dataIndex: "buyer",
    //   ...getColumnSearchProps("buyer"),
      sorter: (a, b) => a.buyer.localeCompare(b.buyer),
      sortDirections: ["descend", "ascend"],
      
    },
    {
      title: "Material Type",
      dataIndex: "itemType",
    //   ...getColumnSearchProps("itemType"),
      sorter: (a, b) => a.itemType.localeCompare(b.itemType),
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "Item Code",
    //   dataIndex: "code",
    //   render: (text) => (
    //     <span>
    //       {text ? text : "Fab001"} {/* Display data if available, otherwise show "No Data" */}
    //     </span>
    //   ),
    //   ...getColumnSearchProps("item_code"),
    // },
    {
      title: "M3 Item",
      dataIndex: "m3Item",
    //   ...getColumnSearchProps("m3Item"),
      sorter: (a, b) => a.m3Item.localeCompare(b.m3Item),
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "Style",
    //   dataIndex: "style",
    //   ...getColumnSearchProps("style"),
    // },
    {
      title: "Location",
      dataIndex: "location",
    //   ...getColumnSearchProps("location"),

    },

    {
      title: "Quantity",
      dataIndex: "qty",
      render: (record) => (
        <span>
          {record.qty} + " " + {record.uom} 
        </span>
      ),
    //   ...getColumnSearchProps("qty"),
      // sorter: (a, b) => a.itemQuantity - b.itemQuantity,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title:`Action`,
      dataIndex: 'action',
      render: (text, rowData) => (
        <span>  
         <Button style={{backgroundColor:'#69c0ff'}} onClick={(e) => navigate('/reclassification')}><b>Assign Reclassification</b></Button>
        </span>
      )
    }
  ];
  const onFinish = (data: any) => {
    console.log(data)
  };
  return (
    <Card title="RM Inventory" headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
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
    <Table
        className="custom-table-wrapper"
        dataSource={stockData.length > 0 ? stockData : undefined}
        columns={columns}
        size="small"
      />
      :""
    }
    </Card>
  );
};
