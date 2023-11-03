import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import Commonscreen from "./common-screen";
import {
  CurrencyService,
  DeliveryMethodService,
  DeliveryTermsService,
  EmployeeDetailsService,
  FactoryService,
  HierachyLevelService,
  ItemCategoryService,
  ItemGroupService,
  ItemTypeService,
  LiscenceTypeService,
  ProcurmentGroupService,
  ProductGroupService,
  ProfitControlHeadService,
  RmCreationService,
  TaxesService,
  UomService,
} from "@project-management-system/shared-services";
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import TextArea from "antd/es/input/TextArea";
import { ItemGroupEnum } from "@project-management-system/shared-models";

export const FabricBomCreation = () => {
  const [form] = Form.useForm();
 
  const [tax,setTax] = useState([])
  const [pchData, setpchData] = useState([]);
  const [facilitydata,setfacilityData] = useState([]);
  const [employedata,setEmployeData] = useState([]);
  const [itemgroup,setitemgroup] = useState([]);
  const [Procurement,setProcurement] = useState([]);
  const [Product,setProduct] = useState([]);
  const [hierarchyLevel,sethierarchyLevel] = useState([]);
  const [currencydata, setCurrencyData] = useState([]);
  const [licenseTypeData, setLicenseTypeData] = useState([]);
  const [uomData, setUomData] = useState([]);
  const { Option } = Select;
  const [taxRate, setTaxRate] = useState(0);
  const [ItemType,setItemType]= useState([])
  const [ItemCategory,setItemCategory]= useState([])
  const [Deliveryterms,setDeliveryTerms]= useState([])
  const [DeliveryMethod,setDeliveryMethod]= useState([])
  const taxService = new TaxesService
  const currencyServices = new CurrencyService();
  const licenseservice = new LiscenceTypeService();
  const uomservice = new UomService();
  const itemTypeservice =new ItemTypeService();
  const  hierarchyLevelservice = new HierachyLevelService
const  itemcategoryService = new ItemCategoryService
const rmservice = new RmCreationService
const itemGroupservice = new ItemGroupService();
const pchservice = new ProfitControlHeadService();
const facilityservice =new FactoryService();
const employeservice = new EmployeeDetailsService();
const procurementservice = new ProcurmentGroupService();
const proDUCTService = new ProductGroupService();
const DeliveryServive = new DeliveryMethodService();
const deliveryTermsService= new DeliveryTermsService()


useEffect(() => {
    getAllCurrencies();
    getAllActiveLiscenceTypes();
    getAllUoms();
    getTax();
    getAllItemType();
    getAllItemGroups();
    getAllPch();
    getAllFacilitys();
    getAllEmployes();
    getAllItemCategory();
    getAllProcurement();
    getAllProducts();
    getAllHierarchy();
    getAllDeliveryTerms();
    getAllDeliveryMethod();
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
  const getAllHierarchy = () => {
    hierarchyLevelservice
      .getAllActivehierachyLevel()
      .then((res) => {
        if (res.status) {
          sethierarchyLevel(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        sethierarchyLevel([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const getAllDeliveryTerms = () => {
    deliveryTermsService
      .getAllActiveDeliveryTerms()
      .then((res) => {
        if (res.status) {
          setDeliveryTerms(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setDeliveryTerms([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const getAllDeliveryMethod = () => {
    DeliveryServive
      .getAllActiveDeliveryMethods()
      .then((res) => {
        if (res.status) {
          setDeliveryMethod(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setDeliveryMethod([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };
  const getAllProducts = () => {
    proDUCTService
      .getAllActiveProductGroup()
      .then((res) => {
        if (res.status) {
          setProduct(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setProduct([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };
  const getAllProcurement = () => {
    procurementservice
      .getAllActiveProcurmentGroup()
      .then((res) => {
        if (res.status) {
          setProcurement(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setProcurement([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };
  const getAllItemCategory = () => {
    itemcategoryService
      .getActiveItemCategories()
      .then((res) => {
        if (res.status) {
          setItemCategory(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setItemCategory([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };
  const getAllEmployes=() =>{
    employeservice.getAllActiveEmploee().then(res =>{
      if (res.status){
        // console.log(res,'llllll')
        setEmployeData(res.data);
         
      } else{
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    }).catch(err => {
      setEmployeData([]);
       AlertMessages.getErrorMessage(err.message);
     })        
  }
  const getAllFacilitys=() =>{
    facilityservice.getFactories().then(res =>{
      if (res.status){
        // console.log(res,'llllll')
        setfacilityData(res.data);
         
      } else{
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    }).catch(err => {
      setfacilityData([]);
       AlertMessages.getErrorMessage(err.message);
     })        
  }

  const getAllPch = () => {
    pchservice.getAllActiveProfitControlHead()
      .then((res) => {
        if (res.status) {
          setpchData(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setpchData([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };
  const getAllItemGroups=() =>{
    itemGroupservice.getAllActiveItemGroup().then(res =>{
      if (res.status){
        // console.log(res,'llllll')
        setitemgroup(res.data);
         
      } else{
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    }).catch(err => {
      setitemgroup([]);
       AlertMessages.getErrorMessage(err.message);
     })        
  }
  const getAllItemType=() =>{
    itemTypeservice.getAllActiveItemType().then(res =>{
      if (res.status){
        // console.log(res,'llllll')
        setItemType(res.data);
         
      } else{
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    }).catch(err => {
      setItemType([]);
       AlertMessages.getErrorMessage(err.message);
     })        
  }

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

  const saveFabric=()=>{
    form.validateFields().then((values)=>{
rmservice.createRm(values).then((res)=>{
  if(res.status){
    AlertMessages.getSuccessMessage(res.internalMessage)

  }
  else{
    AlertMessages.getWarningMessage(res.internalMessage)
  }
}).catch(err =>{
  AlertMessages.getWarningMessage(err.message)
})
    })
  }
  const calculateTotal = () => {

    const price = form.getFieldValue("price");
    const selectedTaxId = form.getFieldValue("tax");
    
    const selectedTax = tax.find((e) => e.taxId === selectedTaxId);
  
    if (price && selectedTax) {
     
      const total = Number(price) + ( Number(price) * Number(selectedTax.taxPercentage)) / 100;
     
      return isNaN(total) ? 0 : Number(total).toFixed(2);
    } else{    return 0;
    }
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
                       {ItemType.map((e)=>{
                      return(<Option key={e.itemTypeId} value={e.itemTypeId}>
                          {e.itemType}
                      </Option>)
                    })}
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
                    showSearch
                    optionFilterProp="children"
                  
                        placeholder="Select Item Group" allowClear>
                     {Object.values(ItemGroupEnum).map((key,value)=>{
            return <Option key={key} value={key}>{key}</Option>
           })}
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="PCH"
                    name="profitControlHead"
                    rules={[{ required: true, message: "Enter PCH" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select PCH"
                    >
                      {pchData.map((e)=>{
                      return(<Option key={e.profitControlHeadId} value={e.profitControlHeadId}>
                          {e.profitControlHead}
                      </Option>)
                    })}
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
                  >
                                      <Input placeholder="Enter structure"/>

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
                <Form.Item  label="Facility"name="name">
                     <Select
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select facility"
                    >

                     {facilitydata.map((e)=>{
                    return(
                    <Option key={e.id} value={e.id}>{e.name}
                    </Option>)
                  })

                  }
                  </Select>

                     </Form.Item>
                </Col>
              </Row>

<Row gutter={8}>
<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                  <Form.Item
                    label="Item Category"
                    name="itemCategory"
                    
                  >
 <Select placeholder="Select Item Category" allowClear> 
                          {ItemCategory.map((e)=>{
                            return(
                              <Option key={e.itemCategoryId} values={e.itemCategoryId}>{e.itemCategory}

                              </Option>
                            )
                          })}                       
                        </Select>                  </Form.Item>
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
                        <Select placeholder="Select Responsible" allowClear> 
                          {employedata.map((e)=>{
                            return(
                              <Option key={e.employeeId} values={e.employeeId}>{e.firstName}

                              </Option>
                            )
                          })}                       
                        </Select>
                                       </Form.Item>
                </Col>
                
                {/* </Row>
                <Row> */}
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    name="developmentResponsible"
                    label="Development Responsible"
                  >
                                       <Input placeholder="Development Responsible" allowClear />

                  </Form.Item>
                </Col>
                
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Sourcing Merchant"
                    name="sourcingMerchant"
                  >
                    <Input placeholder="Sourcing Merchan" allowClear />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Product Group"
                    name="productGroup"
                    rules={[{ required: true, message: "Enter Product Group" }]}
                  >
                    <Select placeholder="Select Product Group" allowClear> 
                          {Product.map((e)=>{
                            return(
                              <Option key={e.productGroupId} values={e.productGroupId}>{e.productGroup}

                              </Option>
                            )
                          })}                       
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
                    <Select placeholder="Select Product Group" allowClear> 
                          {Procurement.map((e)=>{
                            return(
                              <Option key={e.procurmentGroupId} values={e.procurmentGroupId}>{e.procurmentGroup}

                              </Option>
                            )
                          })}                       
                        </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Attached WareHouse"
                    name="attachedWareHouse"
                    // rules={[{ required: true, message: "Enter Attached WareHouse" }]}
                  >
                    {/* <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Attached WareHouse"
                    >
                    </Select> */}
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                    <Input placeholder="Attached WareHouse" allowClear />

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
                    // rules={[{ required: true, message: "Enter Planner" }]}
                  >
                    {/* <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Planner"
                    >
                    </Select> */}
                                        <Input placeholder="Planner" allowClear />

                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Business Area"
                    name="businessArea"
                    // rules={[{ required: true, message: "Enter Business Area" }]}
                  >
                    {/* <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Business Area"
                    >
                    </Select> */}
                    <Input placeholder="Business Area" allowClear />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Supplier"
                    name="supplier"                  >
                    {/* <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Supplier"
                    >
                    </Select> */}
                                        <Input placeholder="Supplier" allowClear />

                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={8}>
                
              {/* </Card> */}
             
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
                  <Input placeholder="Sales Tax" allowClear />

                    {/* <Select placeholder="Select Sales Tax" allowClear>

                    </Select> */}
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
                    {/* <Select placeholder="SaleItem" allowClear>
                    </Select> */}
                                        <Input placeholder="Sales Item" allowClear />

                  </Form.Item>
                </Col>
              
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item label="Supply Lead Time" name="supplyLeadTime">
                  <Input placeholder="Supply Lead Time" allowClear />

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
                       {hierarchyLevel.map((e)=>{
                            return(
                              <Option key={e.hierarchyLevelId} values={e.hierarchyLevelId}>{e.hierarchyLevel}

                              </Option>
                            )
                          })}  
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
                    rules={[{ required: true, message: "Enter Delivery Terms" }]}

                  >
                                         <Select
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select facility"
                    >

                     {Deliveryterms.map((e)=>{
                            return(
                              <Option key={e.deliveryTermsId} values={e.deliveryTermsId}>{e.deliveryTermsName}

                              </Option>
                            )
                          })}         
                                            </Select>
           </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                    label="Delivery Method"
                    name="deliveryMethod"
                    rules={[{ required: true, message: "Enter Delivery Method" }]}

                  >
                                         <Select
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select facility"
                    >

                 {DeliveryMethod.map((e)=>{
                            return(
                              <Option key={e.deliveryMethodId} values={e.deliveryMethodId}>{e.deliveryMethod}

                              </Option>
                            )
                          })}           
                                            </Select>
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
