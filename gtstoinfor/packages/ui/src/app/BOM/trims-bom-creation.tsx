import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import Commonscreen from "./common-screen";
import { CurrencyService, LiscenceTypeService, TaxesService, UomService } from "@project-management-system/shared-services";
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";

export const TrimsBomCreation = () => {
  const [form] = Form.useForm();
  const currencyServices = new CurrencyService();
  const licenseservice = new LiscenceTypeService();
  const uomservice = new UomService();
  const taxService = new TaxesService



  const [currencydata,setCurrencyData] = useState([])
  const [licenseTypeData,setLicenseTypeData] = useState([])
  const [uomData,setUomData] = useState([])
  const [tax,setTax] = useState([])




  useEffect (()=>{
    getAllCurrencies();
    getAllActiveLiscenceTypes();
    getAllUoms();
    getTax();
  },[])


  const getAllCurrencies=() =>{
  currencyServices.getAllActiveCurrencys().then(res =>{
    if (res.status){
      setCurrencyData(res.data);
       
    } else{
      AlertMessages.getErrorMessage(res.internalMessage);
       }
  }).catch(err => {
    setCurrencyData([]);
     AlertMessages.getErrorMessage(err.message);
   })
  
}

const getAllActiveLiscenceTypes=() =>{
  licenseservice.getAllActiveLiscenceTypes().then(res =>{
    if (res.status){
      setLicenseTypeData(res.data);
       
    } else{
      AlertMessages.getErrorMessage(res.internalMessage);
       }
  }).catch(err => {
    setLicenseTypeData([]);
     AlertMessages.getErrorMessage(err.message);
   })
  
}

const getAllUoms = () => {
  uomservice.getAllUoms().then((res) => {
    if (res.status) {
      setUomData(res.data);
    }else{
      AlertMessages.getErrorMessage(res.internalMessage);
       }
  }).catch(err => {
    setUomData([]);
     AlertMessages.getErrorMessage(err.message);
   })
};

const getTax = () =>{
  taxService.getAllActiveTaxes().then((res)=>{
      if(res.status){
          setTax(res.data)
      }
  })
}



  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: any) => {
    console.log(values,"values")
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
                      <Input placeholder="Trim code" allowClear/>
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
                      <Select placeholder="Select Trim" allowClear>
                        <option value="Rivets">Rivets</option>
                        <option value="Overriders">Overriders</option>
                        <option value="Swing Tags">Swing Tags</option>

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
                    <Form.Item label="Generic Code" name="Generic Code">
                      <Input placeholder="Generic Code" allowClear/>
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
                      <Select placeholder=" Select Type" allowClear>
                      <option value="Type1">Type1</option>
                       
                      </Select>
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
                      <Select placeholder="Select Group" allowClear>
                      <option value="group1">Group1</option>

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
                    <Form.Item
                      label="Use In Operation"
                      name="useinoperation"
                      rules={[
                        { required: true, message: "Enter Use In Operation" },
                      ]}
                    >
                      <Select placeholder="Select Use in Operation" allowClear>
                      <option value="Operation1">Operation1</option>

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
                    <Form.Item label="Description" name="description">
                      <Input.TextArea
                        rows={1}
                        placeholder="Enter Description"
                        allowClear
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
                      >
                      <option value="Team">Team1</option>
                      <option value="Team1">Team2</option>

                         
                      </Select>
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
                    <Select placeholder="Select Basic UOM" allowClear>
                   
                    {uomData.map((rec) => (
                    <option key={rec.uomId} value={rec.uomId}>
                      {rec.uom}
                      </option>
                       )) }

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
                  <Form.Item label="Alternate UOM" name="Alternateuom">
                    
                    <Select placeholder="Alternate UOM" allowClear>
                    {uomData.map((rec) => (
                    <option key={rec.uomId} value={rec.uomId}>
                      {rec.uom}
                      </option>
                       )) }
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
                    <Input placeholder="Factor" allowClear/>
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
                    <Input placeholder="Order Multple" allowClear />
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
                    <Input placeholder="MOQ" allowClear />
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
                    <Input placeholder="Order Multiple" allowClear/>
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
                    <Select placeholder="Select Currency" allowClear>

                    
                    {currencydata.map((rec) => (
                    <option key={rec.currencyId} value={rec.currencyId}>
                      {rec.currencyName}
                      </option>
                       ))
                       }
                       
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
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Enter Price" }]}
                  >
                    <Input placeholder="Price" allowClear/>
                  </Form.Item>
                </Col>
                <span style={{ fontSize: "24px", lineHeight: "70px" }}>+</span>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item label="Tax" name="tax">
                        <Select
                        placeholder="Select Tax"
                        // onChange={handleTaxChange}
                        defaultValue="0"
                        allowClear
                        >
                            {tax.map((e)=>(
                                <option key={e.taxId} value={e.taxId}>
                                    {e.taxPercentage}
                                </option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <span style={{ fontSize: "24px", lineHeight: "70px" }}>=</span>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                    <Form.Item label="Total" name="total">
                        <Input disabled 
                        // value={calculateTotal()}
                         />
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
                    <Input placeholder="Purchase Price Quantity" allowClear  />
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
                    <Select placeholder="Select Sales Tax" allowClear>
                    <option value="SaleTax1">Sale Tax</option>
                    <option value="SaleTax2">Sale Taxs</option>


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
                  <Form.Item label="Excise Duty" name="Exciseduty">
                    <Input placeholder="Excise Duty" allowClear />
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
                    <Select placeholder="Select Licence" allowClear>
                    {licenseTypeData.map((rec) => (
                    <option key={rec.liscenceTypeId} value={rec.liscenceTypeId}>
                      {rec.liscenceType}
                      </option>
                       )) }


                    </Select>
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
                      <Select placeholder ="SaleItem" allowClear>
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
                      <Input placeholder="Consumption" allowClear />
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
                      <Input placeholder="Wastage %" allowClear />
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
                      <Input placeholder="Cost Group" allowClear />
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
                      <Input placeholder="Remarks" allowClear/>
                    </Form.Item>
                  </Col>
                </Row>
              {/* </Card> */}
            </Col>
          </Row>

          <Row gutter={24} justify="end">
            {/* <Col
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
            </Col> */}
            <Col>
              <Form.Item>
                  <Button type="primary" htmlType="submit" className="ant-submit-btn" >
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
