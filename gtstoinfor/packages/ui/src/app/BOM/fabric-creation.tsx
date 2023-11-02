import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import Commonscreen from "./common-screen";
import {
  CurrencyService,
  LiscenceTypeService,
  TaxesService,
  UomService,
} from "@project-management-system/shared-services";
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import TextArea from "antd/es/input/TextArea";

export const FabricBomCreation = () => {
  const [form] = Form.useForm();
  const currencyServices = new CurrencyService();
  const licenseservice = new LiscenceTypeService();
  const uomservice = new UomService();
  const [currencydata, setCurrencyData] = useState([]);
  const [licenseTypeData, setLicenseTypeData] = useState([]);
  const [uomData, setUomData] = useState([]);
  const { Option } = Select;
  const [taxRate, setTaxRate] = useState(0);
  const [tax,setTax] = useState([])
  const taxService = new TaxesService


  useEffect(() => {
    getAllCurrencies();
    getAllActiveLiscenceTypes();
    getAllUoms();
    getTax();
  }, []);

  const getAllCurrencies = () => {
    currencyServices
      .getAllActiveCurrencys()
      .then((res) => {
        if (res.status) {
          setCurrencyData(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setCurrencyData([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const getAllActiveLiscenceTypes = () => {
    licenseservice
      .getAllActiveLiscenceTypes()
      .then((res) => {
        if (res.status) {
          setLicenseTypeData(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setLicenseTypeData([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const getAllUoms = () => {
    uomservice.getAllUoms().then((res) => {
        if (res.status) {
          setUomData(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setUomData([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const getTax = () =>{
    taxService.getAllActiveTaxes().then((res)=>{
        if(res.status){
            setTax(res.data)
        }
    })
  }

  const handleTaxChange = (value) => {
    setTaxRate(Number(value));
  };

  const calculateTotal = () => {
    const price = form.getFieldValue("price");
    const selectedTaxId = form.getFieldValue("tax");
    const selectedTax = tax.find((e) => e.taxId === selectedTaxId);
  
    if (price && selectedTax) {
      const total = price + (price * selectedTax.taxPercentage) / 100;
      return isNaN(total) ? 0 : Number(total).toFixed(2);
    }
    return 0;
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: any) => {
    console.log(values, "values");
  };

  return (
    <>
    <Card title="Fabric Creation">
        <Form
          form={form}
          style={{ fontSize: "10px" }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={16}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
            <Card  bordered={false} >
              <h1 style={{ color: "grey", fontSize: "15px", textAlign: "left" }}>Fabric Details</h1>
              <Row gutter={8}>
              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="Item Code"
                    name="itemCode"
                    rules={[{ required: true, message: "Enter Item Code" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Item Code"
                    >
                    </Select>
                  </Form.Item>
                </Col> */}
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="Item Type"
                    name="itemType"
                    rules={[{ required: true, message: "Enter Item Type" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Item Type"
                    >
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="Item Group"
                    name="itemGroup"
                    rules={[{ required: true, message: "Enter Item Group" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Item Group"
                    >
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="PCH"
                    name="pch"
                    rules={[{ required: true, message: "Enter PCH" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select PCH"
                    >
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={8}>
                
              
                {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="Fabric Code"
                    name="fabricCode"
                    rules={[{ required: true, message: "Enter Fabric Code" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Fabric Code"
                    >
                        {uomData.map((e) => {
                            return (
                            <Option key={e.fabricCodeId} value={e.fabricCodeId}>
                                {e.fabricCode}
                            </Option>
                            );
                        })}
                    </Select>
                  </Form.Item>
                </Col> */}
</Row>
              
              
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="Structure"
                    name="structure"
                    rules={[{ required: true, message: "Enter Structure" }]}
                  >
                    <Select placeholder="Select Structure" allowClear>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item label="Quality" name="quality">
                    <Input placeholder="quality" allowClear />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: "Enter Description" }]}
                  >
                    <TextArea rows={1} placeholder="Enter Description"/>
                  </Form.Item>
                </Col>
                  </Row>
                <Row gutter={8}>
               
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="Placement"
                    name="placement"
                    rules={[{ required: true, message: "Enter Placement" }]}
                  >
                    <Input placeholder="Enter Placement"/>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="Fabric Code"
                    name="itemCode"
                  >
                    <Input placeholder="Enter Fabric Code"/>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="Facility"
                    name="facility"
                    rules={[{ required: true, message: "Enter Facility" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Facility"
                    >
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
              </Row>

<Row gutter={8}>
<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="Item Category"
                    name="itemCategory"
                  >
                    <Input placeholder="Enter Item Category"/>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>

                <Form.Item
                    label="Facility"
                    name="facility"
                    rules={[{ required: true, message: "Enter Facility" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Facility"
                    >
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
</Row>
            
              <h1 style={{ color: "grey", fontSize: "15px", textAlign: "left" }}>Performance Responsible Team</h1>
              <Row gutter={8}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                
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
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    name="developmentResponsible"
                    label="Development Responsible"
                  >
                    <Select
                      placeholder="Select Development Responsible"
                      allowClear
                    >
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                
                  <Form.Item
                    name="itemresponsible"
                    label="Item Responsible"
                  >
                    <Input placeholder="Item Responsible" allowClear />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Product Group"
                    name="productGroup"
                    rules={[{ required: true, message: "Enter Product Group" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Product Group"
                    >
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Procurement Group"
                    name="producurementGroup"
                    rules={[{ required: true, message: "Enter Procurement Group" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Procurement Group"
                    >
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Attached WareHouse"
                    name="attachedWareHouse"
                    rules={[{ required: true, message: "Enter Attached WareHouse" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Attached WareHouse"
                    >
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={8}>
                
               
             
                </Row>
                <Row gutter={8}>

                
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Planner"
                    name="planner"
                    rules={[{ required: true, message: "Enter Planner" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Planner"
                    >
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Business Area"
                    name="businessArea"
                    rules={[{ required: true, message: "Enter Business Area" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Business Area"
                    >
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Supplier"
                    name="supplier"                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Supplier"
                    >
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={8}>
                
              {/* </Card> */}
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Sourcing Merchant"
                    name="sourcingMerchant"
                  >
                    <Input placeholder="Sourcing Merchan" allowClear />
                  </Form.Item>
                </Col>
              </Row>
              </Card>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
              <Card bordered={false} >

              <h1 style={{ color: "grey", fontSize: "15px", textAlign: "left" }}>Purchase Price Information
              </h1>

              <Row gutter={8}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Basic UOM"
                    name="Basicuom"
                    rules={[{ required: true, message: "Enter Basic UOM" }]}
                  >
                    <Select placeholder="Select Basic UOM" allowClear>
                      {uomData.map((rec) => (
                        <option key={rec.uomId} value={rec.uomId}>
                          {rec.uom}
                        </option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item label="Alt UOM" name="alternateUom">
                    <Select placeholder="Alt UOM" allowClear>
                      {uomData.map((rec) => (
                        <option key={rec.uomId} value={rec.uomId}>
                          {rec.uom}
                        </option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item label="Multiplication Factor" name="multiplicationFactor">
                    <Input placeholder="Factor" allowClear />
                  </Form.Item>
                </Col>
                </Row>

                <Row gutter={8}>
                        
                {/* <Card> */}
               
                </Row>
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Currency"
                    name="currency"
                    rules={[{ required: true, message: "Select the Currency" }]}
                  >
                    <Select placeholder="Select Currency" allowClear>
                      {currencydata.map((rec) => (
                        <option key={rec.currencyId} value={rec.currencyId}>
                          {rec.currencyName}
                        </option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                
                <Form.Item
                  label="Purchase Price Quantity"
                  name="purchaseorderquantity"
                >
                  <Input placeholder="Purchase Price Quantity" allowClear />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item label="Sales Tax" name="salesTax">
                    <Select placeholder="Select Sales Tax" allowClear>
                      <option value="SaleTax1">Sale Tax</option>
                      <option value="SaleTax2">Sale Taxs</option>
                    </Select>
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={8}>
                
                {/* </Card> */}
              
                {/* </Row>
                        <Row gutter={8}> */}
                         
                </Row>
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item label="Excise Duty" name="Exciseduty">
                    <Input placeholder="Excise Duty" allowClear />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item label="License" name="license">
                    <Select placeholder="Select License" allowClear>
                      {licenseTypeData.map((rec) => (
                        <option
                          key={rec.liscenceTypeId}
                          value={rec.liscenceTypeId}
                        >
                          {rec.liscenceType}
                        </option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item name="property" label="Property">
                    <Input placeholder="Property" allowClear />
                  </Form.Item>
                </Col>
                </Row>
                {/* </Row>
                <Row> */}
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item name="salesItem" label="Sales Item">
                    <Select placeholder="SaleItem" allowClear>
                    </Select>
                  </Form.Item>
                </Col>
              
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item label="Supply Lead Time" name="supplyLeadTime">
                    <Select placeholder="Supply Lead Time" allowClear>
                      
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Hierarchy Level"
                    name="hierarchyLevel"
                    rules={[{ required: true, message: "Enter Hierarchy Level" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Hierarchy Level"
                    >
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Enter Price" }]}
                  >
                    <Input placeholder="Price" allowClear />
                  </Form.Item>
                </Col>
                <span style={{ fontSize: "24px", lineHeight: "70px" }}>+</span>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                    <Form.Item label="Tax" name="tax">
                        <Select
                        placeholder="Select Tax"
                        onChange={handleTaxChange}
                        defaultValue="0"
                        >
                            {tax.map((e)=>(
                                <Option key={e.taxId} value={e.taxId}>
                                    {e.taxPercentage}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                
                </Row>
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                    <Form.Item label="Total" name="total">
                        <Input disabled value={calculateTotal()} />
                    </Form.Item>
                </Col>
                </Row>
              {/* <Card size="small" bordered={false}> */}
              <h1
                style={{ color: "grey", fontSize: "15px", textAlign: "left" }}
              >
                Bill Of Material Data
              </h1>
              <Row gutter={8}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item label="Consumption" name="consumption">
                    <Input placeholder="Consumption" allowClear />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item label="Wastage %" name="wastage">
                    <Input placeholder="Wastage %" allowClear />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item label="Cost Group" name="costgroup">
                    <Input placeholder="Cost Group" allowClear />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Placement/Usage Remarks"
                    name="placementremarks"
                  >
                    <Input placeholder="Remarks" allowClear />
                  </Form.Item>
                </Col>
               
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Delivery Terms"
                    name="deliveryTerms"
                  >
                    <Input placeholder="Delivery Terms" allowClear />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Delivery Method"
                    name="deliveryMethod"
                  >
                    <Input placeholder="Delivery Method" allowClear />
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={8}>
                
              </Row>
              {/* </Card> */}
            
</Card>
</Col>
</Row>
<br></br>
          <Row  justify="end">
          <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="ant-submit-btn"
                >
                  Submit
                </Button>
                </Col>
                <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}>

                <Button
                  type="default"
                  danger
                  icon={<UndoOutlined />}
                  onClick={onReset}
                  style={{ marginLeft: 30 }}
                >
                  Reset
                </Button>
             
            </Col>
            
          </Row>
        </Form>
      </Card></>
  )
   
  
  }

export default FabricBomCreation;
