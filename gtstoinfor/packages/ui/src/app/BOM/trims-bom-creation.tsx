// import { Card, Col, Form, Input, Row, Select } from 'antd'
// import FormItem from 'antd/es/form/FormItem'
// import React from 'react'

//  export const  TrimsBomCreation = ()=> {

//     const [form] = Form.useForm()

//   return (
//  <Card title= "Trim Details" >
//     <Form form= {form} >
//         <Row gutter={24}>

//         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5}}>
//         <FormItem label ="Trim Code" name= "TrimCode">
//             <Input placeholder='Trim code' />
//         </FormItem>
//         </Col>

//         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }}>
//         <FormItem label ="Trim" name= "Trim">
//             <Select
//              placeholder="Trim">

//             </Select>
//         </FormItem>
//         </Col>

//         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }}>
//         <FormItem label ="Type" name= "Type" >
//             <Select
//              placeholder="Type">

//             </Select>
//         </FormItem>
//         </Col>

//         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }}>
//         <FormItem label ="Group" name= "group">
//             <Select
//              placeholder="Group">

//             </Select>
//         </FormItem>
//         </Col>

//         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }}>
//         <FormItem label ="Use In Operation" name= "useinoperation">
//             <Select
//              placeholder="Use in Operation">

//             </Select>
//         </FormItem>
//         </Col>

//         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }}>
//         <FormItem label ="Description" name= "description">
//         <Input.TextArea rows={1} placeholder="Enter Description" />
//         </FormItem>
//         </Col>
//         <br></br>
//         <Card title="Performance Responsible Team">
//             <Row gutter={24}>

//             <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5}}>
//                <FormItem label ="Responsible" name= "responsible">
//                  <Input placeholder='Responsible' />
//                </FormItem>
//             </Col>

//             </Row>
//         </Card>

//         </Row>
//     </Form>
//  </Card>
//   )
// }

// export default  TrimsBomCreation

import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import Commonscreen from "./common-screen";

export const TrimsBomCreation = () => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: any) => {
    console.log(values)
  };

  return (
    <>
      <Card title="Trim Creation">
        <Form
          form={form}
          style={{ fontSize: "10px" }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={16}>
          
            <div >
            < Commonscreen />
            </div>
           
           
            {/* <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 6 }}
              xl={{ span: 12 }}
            > */}
              <Card size="small" bordered={false} style={{width:"100%"}}>
                <h1
                  style={{ color: "grey", fontSize: "15px", textAlign: "left" }}
                >
                  Trim Details
                </h1>
                <Row gutter={8}>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 4 }}
                  >
                    <Form.Item
                      label="Trim Code"
                      name="TrimCode"
                      rules={[{ required: true, message: "Enter Trim Code" }]}
                    >
                      <Input placeholder="Trim code" />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 4}}
                  >
                    <Form.Item
                      label="Trim"
                      name="Trim"
                      rules={[{ required: true, message: "Enter Trim" }]}
                    >
                      <Select placeholder="Select Trim"></Select>
                    </Form.Item>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Form.Item label="Generic Code" name="Generic Code">
                      <Input placeholder="Generic Code" />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Form.Item
                      label="Type"
                      name="Type"
                      rules={[{ required: true, message: "Enter Type" }]}
                    >
                      <Select placeholder=" Select Type"></Select>
                    </Form.Item>
                  </Col>
                  {/* </Row>
                          <Row gutter={8}> */}
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Form.Item
                      label="Group"
                      name="group"
                      rules={[{ required: true, message: "Enter Group" }]}
                    >
                      <Select placeholder="Select Group"></Select>
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Form.Item
                      label="Use In Operation"
                      name="useinoperation"
                      rules={[
                        { required: true, message: "Enter Use In Operation" },
                      ]}
                    >
                      <Select placeholder="Select Use in Operation"></Select>
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Form.Item label="Description" name="description">
                      <Input.TextArea
                        rows={1}
                        placeholder="Enter Description"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            {/* </Col> */}

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 6 }}
              xl={{ span: 10 }}
            >
              {/* <Card size="small" bordered={false} style={{width:"100%"}}> */}
                <h1
                  style={{ color: "grey", fontSize: "15px", textAlign: "left" }}
                >
                  Performance Responsible Team
                </h1>
                <Row gutter={36}>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 10 }}
                    xl={{ span: 10 }}
                  >
                    <Form.Item
                      name="responsible"
                      label="Responsible"
                      rules={[{ required: true, message: "Enter Responsible" }]}
                    >
                      <Input placeholder="Responsible" allowClear />
                    </Form.Item>
                  </Col>
                {/* </Row>
                <Row> */}
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 10 }}
                    xl={{ span: 10}}
                  >
                    <Form.Item
                      name="developmentresponsible"
                      label="Development Responsible"
                    >
                      <Select
                        placeholder="Select Development Responsible"
                        allowClear
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>
              {/* </Card> */}
            </Col>

            {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 12 }}> */}
            <Card size="small" bordered={false} style={{ width: "100%" }}>
              <h1
                style={{ color: "grey", fontSize: "15px", textAlign: "left" }}
              >
                Purchase Price Information
              </h1>

              <Row gutter={8}>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item
                    label="Basic UOM"
                    name="Basicuom"
                    rules={[{ required: true, message: "Enter Basic UOM" }]}
                  >
                    <Select placeholder="Select Basic UOM"></Select>
                  </Form.Item>
                </Col>

                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item label="Alternate UOM" name="Alternateuom">
                    
                    <Select placeholder="Alternate UOM">

                    </Select>
                  </Form.Item>
                </Col>

                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item label="Factor" name="factor">
                    <Input placeholder="Factor" />
                  </Form.Item>
                </Col>

                {/* <Row gutter={8}> */}
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item label="Order Multiple (BUOM)" name="ordermultiple">
                    <Input placeholder="Order Multple" />
                  </Form.Item>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item label="MOQ" name="moq">
                    <Input placeholder="MOQ" />
                  </Form.Item>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item label="Order Multiple (AUOM)" name="OrderMultiple">
                    <Input placeholder="Order Multiple" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item
                    label="Currency"
                    name="currency"
                    rules={[{ required: true, message: "Select the Currency" }]}
                  >
                    <Select placeholder="Select Currency"></Select>
                  </Form.Item>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Enter Price" }]}
                  >
                    <Input placeholder="Price" />
                  </Form.Item>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item
                    label="Purchase Price Quantity"
                    name="purchaseorderquantity"
                  >
                    <Input placeholder="Purchase Price Quantity" />
                  </Form.Item>
                </Col>
                {/* </Row>
                        <Row gutter={8}> */}
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item label="Sales Tax" name="salesTax">
                    <Select placeholder="Select Sales Tax"></Select>
                  </Form.Item>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item label="Excise Duty" name="Exciseduty">
                    <Input placeholder="Excise Duty" />
                  </Form.Item>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item label="Licence" name="licence">
                    <Select placeholder="Select Licence"></Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            {/* </Col> */}

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 6 }}
              xl={{ span: 12 }}
            >
              {/* <Card size="small" bordered={false}> */}
                <h1
                  style={{ color: "grey", fontSize: "15px", textAlign: "left" }}
                >
                  Other Resourcing Details
                </h1>
                <Row gutter={24}>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 8 }}
                    xl={{ span: 8 }}
                  >
                    <Form.Item name="property" label="Property">
                      <Input placeholder="Property" allowClear />
                    </Form.Item>
                  </Col>
                {/* </Row>
                <Row> */}
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 8 }}
                    xl={{ span: 8 }}
                  >
                    <Form.Item name="Issaleitem" label=" Is sale Item">
                      <Select placeholder ="SaleItem">
                        <option key={1}>Not Sale Item</option>
                        <option key={2}>Sale Item</option>

                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              {/* </Card> */}
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 6 }}
              xl={{ span: 12 }}
            >
              {/* <Card size="small" bordered={false}> */}
                <h1
                  style={{ color: "grey", fontSize: "15px", textAlign: "left" }}
                >
                  Bill Of Material Data
                </h1>
                <Row gutter={8}>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 6 }}
                    xl={{ span: 8 }}
                  >
                    <Form.Item label="Consumption" name="consumption">
                      <Input placeholder="Consumption" />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 6 }}
                    xl={{ span: 8 }}
                  >
                    <Form.Item label="Wastage %" name="wastage">
                      <Input placeholder="Wastage %" />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 6 }}
                    xl={{ span: 8 }}
                  >
                    <Form.Item label="Cost Group" name="costgroup">
                      <Input placeholder="Cost Group" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 6 }}
                    xl={{ span: 8 }}
                  >
                    <Form.Item
                      label="Placement/Usage Remarks"
                      name="placementremarks"
                    >
                      <Input placeholder="Remarks" />
                    </Form.Item>
                  </Col>
                </Row>
              {/* </Card> */}
            </Col>
          </Row>

          <Row gutter={24} justify="end">
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 6 }}
              xl={{ span: 4 }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="ant-submit-btn"
                >
                  Submit
                </Button>
                <Button
                  type="default"
                  danger
                  icon={<UndoOutlined />}
                  onClick={onReset}
                  style={{ marginLeft: 30 }}
                >
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
    </>
  );
};

export default TrimsBomCreation;
