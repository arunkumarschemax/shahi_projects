import { Button, Card, Checkbox, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import { HomeOutlined, PlusCircleOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import { Link } from "react-router-dom";
import { BuyingHouseService, CurrencyService, CustomGroupsService, ItemCategoryService, ItemCreationService, LiscenceTypeService, MasterBrandsService, ROSLGroupsService, StyleService } from "@project-management-system/shared-services";


        export const ItemCreation =()=>{
         const [form] = Form.useForm();
         const currencyServices = new CurrencyService();
         const styleService = new StyleService();
         const LicenceService = new LiscenceTypeService();
         const brandservice = new MasterBrandsService();
         const categoryService = new ItemCategoryService();
         const roslservice = new ROSLGroupsService();
         const customGroupservice = new CustomGroupsService();
         const buyingHouseservice = new BuyingHouseService();
         const itemCreationService = new ItemCreationService();
         const [currencydata,setCurrencyData] = useState([]);
         const [customGroup,setCustomGroup]= useState([]);
         const [licence,setLicence]=useState([])
         const [itemCategory,setItemCategory]= useState([])
         const [rosl,setRosl] = useState([])
         const [house,setHouse]= useState([])
         const [styledata,setStyle]=useState([])
         const[brand,setBrand]=useState([])
         const {Option}=Select


         useEffect (()=>{
            getAllCurrencies();
            getAllStyles();
            getAllLicense();
            getAllBrands();
            getAllCategory();
            getAllCustomGrops();
            getAllROSL();
            getAllBuyingHouse();
          },[])

         const getAllCurrencies=() =>{
            currencyServices.getAllActiveCurrencys().then(res =>{
              if (res.status){
                // console.log(res,'llllll')
                setCurrencyData(res.data);
                 
              } else{
                AlertMessages.getErrorMessage(res.internalMessage);
                 }
            }).catch(err => {
              setCurrencyData([]);
               AlertMessages.getErrorMessage(err.message);
             })        
          }
          
          const getAllStyles=()=>{
         styleService.getAllActiveStyle().then(res=>{
           if(res.status){
           setStyle(res.data);

          }else{
            AlertMessages.getErrorMessage(res.internalMessage);
          }
          }).catch(err=>{
            setStyle([]);
            AlertMessages.getErrorMessage(err.message)
          })
          }

          const getAllLicense=()=>{
            LicenceService.getAllActiveLiscenceTypes().then(res=>{
                if(res.status){
                    setLicence(res.data);
                }else{
                    AlertMessages.getErrorMessage(res.internalMessage);

                }
            }).catch(err=>{
                setLicence([]);
                AlertMessages.getErrorMessage(err.message)
            })
          }

          const getAllBrands=()=>{
            brandservice.getAllActiveBrands().then(res=>{
                if(res.status){
                    setBrand(res.data);
                }else{
                    AlertMessages.getErrorMessage(res.internalMessage)
                }
            }).catch(err=>{
                setBrand([]);
                AlertMessages.getErrorMessage(err.message)
            })
          }

          const getAllCategory=()=>{
            categoryService.getActiveItemCategories().then(res=>{
                if(res.status){
                    setItemCategory(res.data);
                }else{
                    AlertMessages.getErrorMessage(res.internalMessage)
                }
            }).catch(err=>{
                setItemCategory([]);
                AlertMessages.getErrorMessage(err.message)
            })
        }

        const getAllROSL=()=>{
            roslservice.getAllActiveROSLGroups().then(res=>{
                if(res.status){
                    setRosl(res.data);
                }else{
                    AlertMessages.getErrorMessage(res.internalMessage)
                }
            }).catch(err=>{
                setRosl([]);
                AlertMessages.getErrorMessage(err.message)
            })
        }

         const getAllCustomGrops=()=>{
            currencyServices.getAllActiveCurrencys().then(res=>{
                if(res.status){
                    setCustomGroup(res.data);
                }else{
                    AlertMessages.getErrorMessage(res.internalMessage)
                }
            }).catch(err=>{
                setCustomGroup([]);
                AlertMessages.getErrorMessage(err.message)
            })
         }
         const getAllBuyingHouse=()=>{
            buyingHouseservice.getAllActiveBuyingHouse().then(res=>{
                if(res.status){
                    setHouse(res.data);
                }else{
                    AlertMessages.getErrorMessage(res.internalMessage)
                }
            }).catch(err=>{
                setHouse([]);
                AlertMessages.getErrorMessage(err.message)
            })
         }

         const saveItem=()=>{
          form.validateFields().then((values) => {
            console.log(values);
              itemCreationService.createItem(values).then((res) => {
                if(res.status){
                  AlertMessages.getSuccessMessage(res.internalMessage)
                }
                else{
                  AlertMessages.getWarningMessage(res.internalMessage)
                }
              }).catch(err => {
                AlertMessages.getWarningMessage(err.message)
              })
          })
         }
         return (
         <>
        <Card title="Item Creation">
            <Form form={form}
          style={{ fontSize: "10px" }}
          layout="vertical"
          onFinish = {saveItem}>

          
        <Row gutter ={8} >
       <Card size="small" bordered={false} style={{width:"100%"}} >
       <h1 style={{color:"grey",fontSize:"15px" }}>
        Item Details
       </h1>
       <Col>
                <Form.Item 
                name="trim" style={{display:'none'}}>
                {/* <Select
                 placeholder="Select Item No" allowClear>
                 <option value="item9001"> item9001</option>
                 <option value="item9002"> item9002</option>
                 <option value="item9003"> item9003</option>
                 </Select> */}
                 <Input disabled/>
                    </Form.Item>
                    </Col>
                    
                   <Row gutter ={16}>
       
                    <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24}}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 5 }}
                    
                  >
                    <Form.Item
                    style={{flexDirection:'row'}}
                      label="Style"
                      name="style"
                      rules={[{ required: true, message: "Enter Style" }]}
                    >
                      {/* <Select
                      placeholder="Select Style"
                      allowClear
                      >
                    {styledata.map((e)=>{
                        return(
                            <Option key={e.styleId} value={e.styleId}>
                             {e.style}
                            </Option>
                        )
                    })}
                      </Select> */
                      }

                      <Input placeholder="Style" allowClear/>
                  
                    </Form.Item>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24}}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 5 }}
                    
                  >
                    <Form.Item
                    label="Type"
                    name="type"
                    rules={[{ required: true, message: "Enter Style" }]}
                    >
                <Select
                 placeholder="Select Type" allowClear>
                 
                 </Select>
                    </Form.Item>
                    </Col>
                    {/* </Row>
                    <Row gutter={24}> */}
                     <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24}}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 5 }}
                    
                  >
                    <Form.Item
                      label="Brand"
                      name="brand"
                      rules={[{ required: true, message: "Enter Brand" }]}
                    >
                       <Select
                        placeholder="Select Brand"
                        allowClear
                      >
                    {brand.map((e)=>{
                        return(
                            <Option key={e.brandId} value={e.brandId}>
                            {e.brandName}
                            </Option>
                        )
                    })}
                      </Select>
                    </Form.Item>
                  </Col>
                  
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24}}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 5 }}
                    
                  >
                    <Form.Item
                      label="Category"
                      name="category"
                      rules={[{ required: true, message: "Enter category" }]}
                    >
                       <Select
                      placeholder="Select Category"
                      allowClear
                      >
                    {itemCategory.map((e)=>{
                        return(
                            <Option key={e.itemCategoryId} value={e.itemCategoryId}>
                             {e.itemCategory}
                            </Option>
                        )
                    })}
                      </Select>
                    </Form.Item>
                  </Col>
                  

                                     
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24}}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 5 }}
                    
                  >
                    <Form.Item
                    label="Item Group"
                    name="itemgroup"
                    rules={[{ required: true, message: "Enter Item Group" }]}
                    >
                <Select
                 placeholder="Select Item Group" allowClear>
                 
                 </Select>
                    </Form.Item>
                    </Col>
                    {/* </Row>
                 <Row gutter={24}> */}
                    <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24}}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 5 }}
                    
                  >
                    <Form.Item
                      label="Season"
                      name="season"
                      // rules={[{ required: true, message: "Enter Season" }]}
                    >
                      <Input placeholder="Season" 
                      allowClear
                      
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24}}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 5 }}
                    
                  >
                    <Form.Item
                    label="Shahi Style"
                    // name="Shahi Style"
                    rules={[{ required: true, message: "Fill Shahi Style" }]}
                    >

                <Select
                 showSearch
                 placeholder="Select Shahi Style"
                 allowClear
                 suffixIcon={<SearchOutlined />}

                 >
                {styledata.map((e)=>{
                        return(
                            <Option key={e.styleId} value={e.styleId}>
                             {e.style}
                            </Option>
                        )
                    })}
                 </Select>
                    </Form.Item>
                    </Col>
                      </Row>


                   <h1 style={{ color: "grey", fontSize: "15px", textAlign: "left" }}>
                    Performance Responsible Team
                    </h1> 
                    <Row gutter={16}>
                    <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                     <Form.Item
                      name="responsible"
                      label="Responsible"
                      rules={[{ required: true, message: "Enter Responsible" }]}
                    >
                      <Input placeholder="Responsible" allowClear />
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="Approve"
                      label="Approve"
                      rules={[{ required: true, message: "Enter Approve" }]}

                    >
                      <Select
                        placeholder="Select Approve"
                        allowClear
                      >
                    

                         
                      </Select>
                    </Form.Item>
                    </Col>
                    <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                     <Form.Item
                      name="Product Designer"
                      label="Product Designer"
                    //   rules={[{ required: true, message: "Enter Product Designer" }]}
                    >
                      <Input placeholder="Product Designer" allowClear />
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="production Merchant"
                      label="Production Merchant"
                      rules={[{ required: true, message: "Enter Production Merchant" }]}

                    >
                      <Select
                        placeholder="Select Production Merchant"
                        allowClear
                      >
                     
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="pd Merchant"
                      label="PD Merchant"
                    //   rules={[{ required: true, message: "Enter PD Merchant" }]}

                    >
                      <Select
                        placeholder="Select PD Merchant"
                        allowClear
                      >
                                     
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="factory Merchant"
                      label="Factory Merchant"
                    //   rules={[{ required: true, message: "Enter Factory Merchant" }]}

                    >
                      <Select
                        placeholder="Select Factory Merchant"
                        allowClear
                      >
                                       
                      </Select>
                    </Form.Item>
                  </Col>
               
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                     <Form.Item
                      name="salesPerson"
                      label="Sales Person"
                      rules={[{ required: true, message: "Enter Sales Person" }]}
                    >
                      <Input placeholder="Sales Person" allowClear />
                    </Form.Item>
                  </Col>
                  </Row>

                  <h1 style={{ color: "grey", fontSize: "15px", textAlign: "left" }}>
                    Sales Price Information
                    </h1> 

                    <Row gutter={16}>
                    <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="basicUOM"
                      label="Basic UOM"
                      rules={[{ required: true, message: "Enter Basic UOM" }]}
                    >
                       <Select
                        placeholder="Select Basic UOM"
                        allowClear
                      >
                     

                         
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="altUOM"
                      label="Alt UOM"
                   
                    >
                      <Input placeholder="Alt UOM" allowClear />
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                  <Form.Item
                      name="conversionFactor"
                      label="Conversion Factor"
                   
                    >
                      <Input placeholder="Conversion Factor" allowClear />
                    </Form.Item>
                  </Col>
                    <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="currency"
                      label="Currency"
                      rules={[{ required: true, message: "Enter Currency" }]}
                    >
                       <Select
                        placeholder="Select Currency"
                        allowClear
                      >
                    {currencydata.map((e) => {
                  return (
                    <Option key={e.currencyId} value={e.currencyId}>
                      {e.currencyName}
                    </Option>
                  );
                })}               
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                  <Form.Item
                      name="salesPrice"
                      label="Sales Price"
                      rules={[{ required: true, message: "Enter Sales Price" }]}
                    >
                      <Input placeholder="Sales  Price" allowClear />
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                  <Form.Item
                      name="salesPriceQty"
                      label="Sales Price Qty"
                      rules={[{ required: true, message: "Enter Sales Price Qty" }]}
                    >
                      <Input placeholder="Sales  Price Qty" allowClear />
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="targetCurrency"
                      label="Target Currency"
                      rules={[{ required: true, message: "Enter Target Currency" }]}
                    >
                       <Select
                        placeholder="Select Target Currency"
                        allowClear
                      >
                     
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="projection Order"
                      label="Projection Order"
                    >
                       <Select
                         showSearch
                         placeholder="Select Projection Order"
                         allowClear
                         suffixIcon={<SearchOutlined />}
                      >
                    
                      </Select>
                    </Form.Item>
                  </Col>
                    </Row>

                    <h1
                  style={{ color: "grey", fontSize: "15px", textAlign: "left" }}>
               Profit Controllers
                </h1>
                <Row gutter={16}>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="buyingHouseCommission"
                      label="Buying House Commission"
                    >
                       <Select
                        placeholder="Select BuyingHouseCommission"
                        allowClear
                      >
                      {house.map((e)=>{
                        return(
                            <Option  key={e.buyingHouseId} value={e.buyingHouseId}>
                             {e.buyingHouse}
                            </Option>
                        )
                      })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                  <Form.Item
                      name="licence"
                      label="Licence"
                    >
                       <Select
                        placeholder="Select Currency"
                        allowClear
                      >
                        {licence.map((e)=>{
                            return(
                                <Option key={e.liscenceTypeId} value={e.liscenceTypeId}>
                                  {e.liscenceType}
                                </Option>
                            )
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="customGroup"
                      label="Custom Group"
                    >
                       <Select
                        placeholder="Select Custom Group"
                        allowClear
                      >
                      {customGroup.map((e)=>{
                        return(
                            <Option key={e.customGroupId} value={e.customGroupId}>
                            {e.customGroup}
                            </Option>
                        )
                      })}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                  <Form.Item
                      name="nationalDBK"
                      label="National DBK%"
                    >
                      <Input placeholder="National DBK%" allowClear />
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="roslGroup"
                      label="Rosl Group"
                    >
                       <Select
                        placeholder="Select ROSL Group"
                        allowClear
                      >
                      {rosl.map((e)=>{
                        return(
                            <Option key={e.roslGroupId} value={e.roslGroupId}>
                                {e.roslGroup}
                            </Option>
                        )
                      })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <h1  style={{ color: "grey", fontSize: "15px", textAlign: "left" }}>
                    Manufacturing Information
                </h1>
                <Row gutter={16}>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                    <Form.Item
                      name="property"
                      label="Property"
                    >
                       <Select
                        placeholder="Select Property"
                        allowClear
                      >
                      
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 5 }}
                >
                
                <Form.Item name="isSubcontracted">
                <div style={{ padding: '25px' }}>
                  <Checkbox>Check if Manufacturing Subcontracted</Checkbox>
                </div>
              </Form.Item>
              </Col>
                </Row>
                <h1
                 style={{ color: "grey", fontSize: "15px", textAlign: "left" }}>
                TNA
                </h1>
           <Row gutter={16}>
           <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 6 }}
                ><Form.Item
                label="Order Confirmation Date"
                name="orderConfirmationDate"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 6 }}
                >
              <Form.Item
                label="PCD"
                name="pcd"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 6 }}
                >
              <Form.Item
                label="1stEx-Factory Date"
                name="1stExFactoryDate"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
           <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 6 }}
                >
                  <Form.Item
                      name="FR TNA"
                      label="FR TNA"
                    >
                      <Input placeholder="FR TNA" allowClear />
                    </Form.Item>
                  </Col>
                  <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 6 }}
                >
                  <Form.Item
                      name="total orderqty"
                      label="Total Order Qty"
                    >
                      <Input placeholder="Total Order Qty" allowClear />
                    </Form.Item>
                  </Col>
                  </Row>
                </Card>
                </Row>
                <Row gutter={24} justify="end">
                <Space size={16}>
                  <Button type="primary" >
                   Submit
                  </Button>
                  {/* <Link to="">
                    <Button type="primary" icon={<HomeOutlined />}>
                      Item Home
                    </Button>
                  </Link> */}
                </Space>
              </Row>
                </Form>
        </Card>
        </>
             )
                
}
export default ItemCreation