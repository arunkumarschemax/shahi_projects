import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  message,
} from "antd";
import { UndoOutlined } from "@ant-design/icons";
import Commonscreen from "./common-screen";
import {
  CurrencyService,
  EmployeeDetailsService,
  FactoryService,
  ItemTypeService,
  LiscenceTypeService,
  ProfitControlHeadService,
  TaxesService,
  UomService,
  bomTrimService,
} from "@project-management-system/shared-services";
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import { BomRequest } from "@project-management-system/shared-models";
import { Link } from "react-router-dom";

export interface TrimsBomCreationProps {}

export const TrimsBomCreation = (props: TrimsBomCreationProps) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const currencyServices = new CurrencyService();
  const licenseservice = new LiscenceTypeService();
  const uomservice = new UomService();
  const taxService = new TaxesService();
  const Pchservice = new ProfitControlHeadService();
  const bomservice = new bomTrimService();
  const facilityservice = new FactoryService();
  const itemTypeservice = new ItemTypeService();
  const employeservice = new EmployeeDetailsService();


  const [currencydata, setCurrencyData] = useState([]);
  const [licenseTypeData, setLicenseTypeData] = useState([]);
  const [uomData, setUomData] = useState([]);
  const [tax, setTax] = useState([]);
  const [pchData, setPchData] = useState<any>([]);
  const [taxvalue, setTaxValues] = useState<any>("");
  const [calData, setCalData] = useState<number>(0);
  const [facilitydata, setfacilityData] = useState([]);
  const [ItemType, setItemType] = useState([]);
  const [employedata,setEmployeData] = useState([]);


  useEffect(() => {
    getAllCurrencies();
    getAllActiveLiscenceTypes();
    getAllUoms();
    getTax();
    getAllActiveProfitControlHead();
    getAllFacilitys();
    getAllItemType();
    getAllEmployes();
  }, []);

  useEffect(() => {
    if (taxvalue) {
      const taxcal = Number(taxvalue / 100);
      const cal: any = Number(form.getFieldValue("price")) + taxcal;
      form.setFieldsValue({ totalPrice: cal });
    }
  }, [taxvalue]);

  const getAllEmployes=() =>{
    employeservice.getAllActiveEmploee().then(res =>{
      if (res.status){
        // console.log(res,'llllll')
        setEmployeData(res.data);
         
      }
      //  else{
      //   AlertMessages.getErrorMessage(res.internalMessage);
      //    }
    })
    // .catch(err => {
    //   setEmployeData([]);
    //    AlertMessages.getErrorMessage(err.message);
    //  })        
  }

  const getAllItemType = () => {
    itemTypeservice
      .getAllActiveItemType()
      .then((res) => {
        if (res.status) {
          // console.log(res,'llllll')
          setItemType(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setItemType([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const getAllFacilitys = () => {
    facilityservice
      .getFactories()
      .then((res) => {
        if (res.status) {
          // console.log(res,'llllll')
          setfacilityData(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setfacilityData([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };

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
    uomservice
      .getAllUoms()
      .then((res) => {
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

  const getTax = () => {
    taxService.getAllActiveTaxes().then((res) => {
      if (res.status) {
        setTax(res.data);
      }
    });
  };

  const getAllActiveProfitControlHead = () => {
    Pchservice.getAllActiveProfitControlHead()
      .then((res) => {
        if (res.status) {
          setPchData(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setPchData([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleTaxChange = (value) => {
    console.log(value, "tax");
    setTaxValues(value);
  };

  const changeHandlerPrice = (value) => {
    console.log(value.price);
  };

  const onFinish = (values: any) => {
    console.log(values.trimCode, "values");
    const req = new BomRequest(
      values.itemTypeId,
      values.pchId,
      values.facilityId,
      "",
      values.trim,
      values.genericCode,
      values.typeId,
      values.groupId,
      values.useInOperationId,
      values.description,
      values.responsible,
      values.developmentResponsible,
      values.basicUomId,
      values.alternateUomId,
      values.factor,
      values.orderMultipleBuom,
      values.moq,
      values.orderMultipleAuom,
      values.currencyId,
      values.price,
      values.purchasePriceQuantity,
      values.salesTax,
      values.exciseDuty,
      values.licenceId,
      values.property,
      values.isSaleItem,
      values.consumption,
      values.wastagePercentage,
      values.costGroup,
      values.usageRemarks,
      values.tax,
      values.totalPrice
    );

    bomservice
      .createBomTrim(req)
      .then((res) => {
        if (res.status) {
          onReset();
          message.success(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        AlertMessages.getErrorMessage(err.message);
      });
  };

  return (
    <>
      <Card
        title="Trim Creation"
        extra={
          <Link to="/materialCreation/rm-creation-view">
            <span style={{ color: "white" }}>
              <Button type="primary">View</Button>
            </span>
          </Link>
        }
      >
        <Form
          form={form}
          style={{ fontSize: "10px" }}
          layout="vertical"
          onFinish={onFinish}
        >
          <div style={{ marginTop: "-10px" }}>
            <Row gutter={16}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 5 }}
                lg={{ span: 6 }}
                xl={{ span: 12 }}
              >
                <Card bordered={false}>
                  <h1
                    style={{
                      color: "grey",
                      fontSize: "15px",
                      textAlign: "left",
                      marginTop: "-10px",
                    }}
                  >
                    Details
                  </h1>
                  <Row gutter={8}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        label="Item Type"
                        name="itemTypeId"
                        rules={[{ required: true, message: "Enter Item Type" }]}
                        style={{ flexDirection: "row" }}
                      >
                        <Select
                          allowClear
                          showSearch
                          optionFilterProp="children"
                          placeholder="Select Item Type"
                        >
                          {ItemType.map((e) => {
                            return (
                              <Option key={e.itemTypeId} value={e.itemTypeId}>
                                {e.itemType}
                              </Option>
                            );
                          })}
                        </Select>
                        {/* <Input placeholder="Fabric code" allowClear /> */}
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        label="PCH"
                        name="pchId"
                        rules={[{ required: true, message: "PCH" }]}
                      >
                        <Select placeholder="PCH" allowClear>
                          {pchData.map((rec) => (
                            <option
                              key={rec.profitControlHeadId}
                              value={rec.profitControlHeadId}
                            >
                              {rec.profitControlHead}
                            </option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item name="facilityId" label="Facility">
                        <Select placeholder="facility" allowClear>
                          {facilitydata.map((e) => {
                            return (
                              <Option key={e.id} value={e.id}>
                                {e.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <h1
                    style={{
                      color: "grey",
                      fontSize: "15px",
                      textAlign: "left",
                    }}
                  >
                    Trim Details
                  </h1>
                  <Row gutter={8}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        label="Trim"
                        name="trim"
                        rules={[{ required: true, message: "Enter Trim" }]}
                      >
                        <Input placeholder="Trim " />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8}}
                    >
                      <Form.Item label="Generic Code" name="genericCode">
                        <Input placeholder="Generic Code" allowClear />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8}}
                    >
                      <Form.Item
                        label="Type"
                        name="typeId"
                        rules={[{ required: true, message: "Enter Type" }]}
                      >
                        <Select placeholder=" Select Type" allowClear>
                          <option value="1">Type1</option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={8}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        label="Group"
                        name="groupId"
                        rules={[{ required: true, message: "Enter Group" }]}
                      >
                        <Select placeholder="Select Group" allowClear>
                          <option value="1">Group1</option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        label="Use In Operation"
                        name="useInOperationId"
                        rules={[
                          { required: true, message: "Enter Use In Operation" },
                        ]}
                      >
                        <Select
                          placeholder="Select Use in Operation"
                          allowClear
                        >
                          <option value="1">Operation1</option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
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

                  <h1
                    style={{
                      color: "grey",
                      fontSize: "15px",
                      textAlign: "left",
                    }}
                  >
                    {" "}
                    Performance Responsible Team
                  </h1>
                  <Row gutter={8}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        name="responsible"
                        label="Responsible"
                        rules={[
                          { required: true, message: "Enter Responsible" },
                        ]}
                        style={{ marginTop: 30 }}
                      >
                       <Select
                          placeholder="Select  Responsible"
                          allowClear
                        >
                      {employedata.map((e)=>{
                        return(
                          <Option key={e.employeeId} values={e.employeeId}>{e.firstName}

                          </Option>
                        )
                      })}
                      </Select> 
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        name="developmentResponsible"
                        label="Development Responsible"
                        style={{ marginTop: 30 }}
                      >
                        <Select
                          placeholder="Select Development Responsible"
                          allowClear
                        >
                          
                      {employedata.map((e)=>{
                        return(
                          <Option key={e.employeeId} values={e.employeeId}>{e.firstName}

                          </Option>
                        )
                      })}
                        </Select>
                      </Form.Item>
                    </Col>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item  name="altUom" label="Alt UOM">
                        <Select placeholder="Select Basic UOM" allowClear >
                  {uomdata.map((e)=>{

                    return(
                    <Option key={e.uomId} value={e.uomId}>{e.uom}

                    </Option>)
                  })

                  }
                </Select>
                                 </Form.Item>
                       </Col> */}
                  </Row>
                  <h1
                    style={{
                      color: "grey",
                      fontSize: "15px",
                      textAlign: "left",
                    }}
                  >
                    Other Resourcing Details
                  </h1>
                  <Row gutter={8}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item name="property" label="Property">
                        <Input placeholder="Property" allowClear />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item name="isSaleItem" label=" Is sale Item">
                        <Select placeholder="SaleItem" allowClear>
                          <option key={1} value="Not Sale Item">
                            Not Sale Item
                          </option>
                          <option key={2} value="Sale Item">
                            Sale Item
                          </option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 5 }}
                lg={{ span: 6 }}
                xl={{ span: 12 }}
              >
                <Card bordered={false}>
                  <h1
                    style={{
                      color: "grey",
                      fontSize: "15px",
                      textAlign: "left",
                      marginTop: "-10px",
                    }}
                  >
                    Purchase Price Information
                  </h1>
                  <Row gutter={8}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        label="Basic UOM"
                        name="basicUomId"
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
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item label="Alternate UOM" name="alternateUomId">
                        <Select placeholder="Alternate UOM" allowClear>
                          {uomData.map((rec) => (
                            <option key={rec.uomId} value={rec.uomId}>
                              {rec.uom}
                            </option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item label="Factor" name="factor">
                        <Input placeholder="Factor" allowClear />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={8}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        label="Order Multiple (BUOM)"
                        name="orderMultipleBuom"
                      >
                        <Input placeholder="Order Multple" allowClear />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item label="MOQ" name="moq">
                        <Input placeholder="MOQ" allowClear />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        label="Order Multiple (AUOM)"
                        name="orderMultipleAuom"
                      >
                        <Input placeholder="Order Multiple" allowClear />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={8}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        label="Currency"
                        name="currencyId"
                        rules={[
                          { required: true, message: "Select the Currency" },
                        ]}
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
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Enter Price" }]}
                      >
                        <Input
                          placeholder="Price"
                          allowClear
                          onChange={changeHandlerPrice}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item label="Tax" name="tax">
                        <Select
                          placeholder="Select Tax"
                          onChange={handleTaxChange}
                          defaultValue="0"
                          allowClear
                        >
                          {tax.map((e) => (
                            <option key={e.taxId} value={e.taxPercentage}>
                              {e.taxPercentage}
                            </option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={8}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item label="Total Price" name="totalPrice">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        label="Purchase Price Quantity"
                        name="purchasePriceQuantity"
                      >
                        <Input
                          placeholder="Purchase Price Quantity"
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item label="Sales Tax" name="salesTax">
                        <Select placeholder="Select Sales Tax" allowClear>
                          <option value="SaleTax1">Sale Tax</option>
                          <option value="SaleTax2">Sale Taxs</option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={8}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item label="Excise Duty" name="exciseDuty">
                        <Input placeholder="Excise Duty" allowClear />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item label="Licence" name="licenceId">
                        <Select placeholder="Select Licence" allowClear>
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
                  </Row>

                  {/* <h1
                    style={{
                      color: "grey",
                      fontSize: "15px",
                      textAlign: "left",
                    }}
                  >
                    Other Resourcing Details
                  </h1>
                  <Row gutter={8}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item name="property" label="Property">
                        <Input placeholder="Property" allowClear />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item name="isSaleItem" label=" Is sale Item">
                        <Select placeholder="SaleItem" allowClear>
                          <option key={1} value="Not Sale Item">
                            Not Sale Item
                          </option>
                          <option key={2} value="Sale Item">
                            Sale Item
                          </option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row> */}

                  <h1
                    style={{
                      color: "grey",
                      fontSize: "15px",
                      textAlign: "left",
                    }}
                  >
                    {" "}
                    Bill Of Material Data
                  </h1>
                  <Row gutter={16}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
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
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item label="Wastage %" name="wastagePercentage">
                        <Input placeholder="Wastage %" allowClear />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item label="Cost Group" name="costGroup">
                        <Input placeholder="Cost Group" allowClear />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 5 }}
                      lg={{ span: 6 }}
                      xl={{ span: 8 }}
                    >
                      <Form.Item
                        label="Placement/Usage Remarks"
                        name="usageRemarks"
                      >
                        <Input placeholder="Remarks" allowClear />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
          <br></br>
          <Row justify={"end"} style={{ marginTop: "-30px" }}>
            <Col
              xs={{ span: 6 }}
              sm={{ span: 6 }}
              md={{ span: 4 }}
              lg={{ span: 2 }}
              xl={{ span: 2 }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
            <Col
              xs={{ span: 6 }}
              sm={{ span: 6 }}
              md={{ span: 4 }}
              lg={{ span: 2 }}
              xl={{ span: 2 }}
            >
              <Button onClick={onReset}>Reset</Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
    </>
  );
};

export default TrimsBomCreation;
