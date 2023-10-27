import { Button, Card, Checkbox, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import { HomeOutlined, PlusCircleOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import { Link } from "react-router-dom";
import { BuyingHouseService, CompositionService, CurrencyService, CustomGroupsService, EmployeeDetailsService, ItemCategoryService, ItemCreationService, ItemGroupService, ItemTypeService, LiscenceTypeService, MasterBrandsService, ROSLGroupsService, RangeService, SearchGroupService, StyleService, UomService } from "@project-management-system/shared-services";
import { ItemGroupEnum } from "@project-management-system/shared-models";
 
export interface FormProps {
  // itemCreationData:CompositionDto;
  // updateData:(item:CompositionDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function ItemCreation (props: FormProps){    
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
         const searchgroup = new SearchGroupService();
         const employeservice = new EmployeeDetailsService();
         const Rangeservice = new RangeService();
         const compositionservice = new CompositionService();
         const itemGroupservice = new ItemGroupService();
         const uomservice = new UomService();
         const itemTypeservice =new ItemTypeService();
         const [currencydata,setCurrencyData] = useState([]);
         const [uomdata,setUomData] = useState([]);
         const [itemgroup,setitemgroup] = useState([]);
         const [compositiondata,setCompositionData] = useState([]);
         const [searchdata,setSearchData] = useState([]);
         const [employedata,setEmployeData] = useState([]);
         const [rangedata,setRangeData] = useState([]);
         const [customGroup,setCustomGroup]= useState([]);
         const [licence,setLicence]=useState([])
         const [itemCategory,setItemCategory]= useState([])
         const [ItemType,setItemType]= useState([])
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
            getAllSearchgroup();
            getAllRanges();
            getAllComposition();
            getAllUoms();
            getAllEmployes();
            getAllItemType();
            getAllItemGroups();
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

          const getAllUoms=() =>{
            uomservice.getAllActiveUoms().then(res =>{
              if (res.status){
                // console.log(res,'llllll')
                setUomData(res.data);
                 
              } else{
                AlertMessages.getErrorMessage(res.internalMessage);
                 }
            }).catch(err => {
              setUomData([]);
               AlertMessages.getErrorMessage(err.message);
             })        
          }

const getAllComposition=()=>{
compositionservice.getActiveComposition().then(res=>{
  if(res.status){
    setCompositionData(res.data);
  }else{
    AlertMessages.getErrorMessage(res.internalMessage);
  }
}).catch(err => {
  setCompositionData([]);
   AlertMessages.getErrorMessage(err.message);
 })
}

          const getAllSearchgroup=()=>{
            searchgroup.getActiveSearchGroup().then(res=>{
              if(res.status){
                setSearchData(res.data)
              }else{
                AlertMessages.getErrorMessage(res.internalMessage);
              }
            }).catch(err => {
              setSearchData([]);
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

           const getAllRanges=()=>{
            Rangeservice.getActiveRange().then(res=>{
              if(res.status){
                setRangeData(res.data);
              }else{
                AlertMessages.getErrorMessage(res.internalMessage)

              }
            }).catch(err=>{setRangeData([])
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
         const onReset = () => {
          form.resetFields()
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
        <Card title="Item Creation" size="small" extra={!props.isUpdate && (<Link to="/materialCreation/item-creation-view">
         <span style={{ color: 'white' }}><Button type="primary">View</Button></span></Link> )}>

               <Form  form={form} style={{ fontSize: "10px" }}  layout="vertical" onFinish = {saveItem}>
               <Form.Item name='trim' style={{display:'none'}}>
                    <Input hidden/>
                </Form.Item>
                <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                 <Card bordered={false}>
                  <h1 style={{ color: 'grey', fontSize: '15px', textAlign: 'left' }}>Item Details</h1>
                  <Row gutter={8}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                              <Form.Item style={{flexDirection:'row'}} label="Style" name="style" rules={[{ required: true, message: "Enter Style" }]} >
                                   <Input placeholder="Style" allowClear/>
                              </Form.Item>
                   </Col>
                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                   <Form.Item  label="ItemType" name="type" rules={[{ required: true, message: "Enter Type" }]}>
                   <Select placeholder="Select ItemType" allowClear>
                    {ItemType.map((e)=>{
                      return(<Option key={e.itemTypeId} value={e.itemTypeId}>
                          {e.itemType}
                      </Option>)
                    })}
                   </Select>
                    </Form.Item> 
                   </Col>
                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                    <Form.Item label="Brand" name="brand" rules={[{ required: true, message: "Enter Brand" }]} >
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
                   </Row>
                   <Row gutter={8}>
                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                    <Form.Item label="Category" name="category" rules={[{ required: true, message: "Enter category" }]}>
                       <Select placeholder="Select Category" allowClear>
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
                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                    <Form.Item label="Item Group" name="itemgroup" rules={[{ required: true, message: "Enter Item Group" }]}>
                    <Select
                     placeholder="Select Item Group" allowClear>
                     {Object.values(ItemGroupEnum).map((key,value)=>{
            return <Option key={key} value={key}>{key}</Option>
           })}
                 
                    </Select>
                    </Form.Item>
                   </Col>
                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                     <Form.Item  label="Season"name="season">
                     <Input placeholder="Season"  allowClear/>
                     </Form.Item>
                     </Col>
                   </Row>
                   <Row gutter={8}>
                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item  label="Shahi Style" rules={[{ required: true, message: "Fill Shahi Style" }]}>
                      <Select showSearch placeholder="Select Shahi Style" allowClear >
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item   name="referenced" label="Referenced" rules={[{ required: true, message: "Enter Referenced" }]}>
                      <Select
                        placeholder="Select Referenced"
                        allowClear>
                         
                      </Select>
                      </Form.Item>
                    </Col>
                    </Row>

                    <h1 style={{ color: 'grey', fontSize: '15px', textAlign: 'left' }}>Manufacturing Information</h1>
                              <Row gutter={8}>
                              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
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
                           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                           <Form.Item name="isSubcontracted">
                <div style={{ padding: '25px' }}>
                  <Checkbox>Check if Manufacturing Subcontracted</Checkbox>
                </div>
              </Form.Item>

                           </Col>
                           </Row>
                   
                         <h1 style={{ color: "grey", fontSize: "15px", textAlign: "left" }}>Sales Price Information</h1>
                         <Row gutter={8}>
                         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                <Form.Item   name="basicUOM" label="Basic UOM" rules={[{ required: true, message: "Enter Basic UOM" }]}>
                <Select placeholder="Select Basic UOM" allowClear>
                  {uomdata.map((e)=>{
                    return(
                    <Option key={e.uomId} value={e.uomId}>{e.uom}
                    </Option>)
                  })

                  }
                </Select>
                </Form.Item>
                       </Col>
                       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item  name="altUOM" label="Alt UOM">
                        <Select placeholder="Select Basic UOM" allowClear>

                        {uomdata.map((e)=>{
                    return(<Option key={e.id} value={e.id}>{e.uom}</Option>)
                  })

                  }                    
                                  </Select>
                                 </Form.Item>
                       </Col>
                       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name="conversionFactor"
                      label="Conversion Factor">
                      <Input placeholder="Conversion Factor" allowClear />
                        </Form.Item>
                      </Col>
                     </Row>
                     <Row gutter={8}>
                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item  name="currency" label="Currency" rules={[{ required: true, message: "Enter Currency" }]}>
                      <Select placeholder="Select Currency" allowClear>{currencydata.map((e) => {
                  return (
                    <Option key={e.currencyId} value={e.currencyId}>
                      {e.currencyName}
                    </Option>
                  );
                })}               
                      </Select>
                      </Form.Item>
                      </Col>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item  name="salesPrice" label="Sales Price" rules={[{ required: true, message: "Enter Sales Price" }]}>
                        <Input placeholder="Sales  Price" allowClear />
                        </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name="targetCurrency" label="Target Currency" rules={[{ required: true, message: "Enter Target Currency" }]}>
                       <Select placeholder="Select Target Currency" allowClear></Select>
                       </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={8}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                          <Form.Item name="projectionOrder" label="Projection Order">
                          <Select showSearch placeholder="Select Projection Order" allowClear >
                      </Select>
                          </Form.Item>
                       </Col>

                       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                          <Form.Item name="businessArea" label="Business Area">
                          <Select showSearch placeholder="Select Business Area" allowClear >
                      </Select>
                          </Form.Item>
                       </Col>
                         
                       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                          <Form.Item name="composition" label="Composition">
                          <Select showSearch placeholder="Select Composition" allowClear >
                            {compositiondata.map((e)=>{
                              return(<Option key={e.id} value={e.id}>{e.compositionCode}</Option>)
                            })}
                      </Select>
                          </Form.Item>
                       </Col>
                        </Row>
                        
                        <Row gutter={8}>
                      
                     
                        </Row>
</Card>
</Col>

                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                          <Card bordered={false} >
                          <h1 style={{ color: 'grey', fontSize: '15px', textAlign: 'left' }}>Profit Controllers</h1>
                          <Row gutter={8}>
                          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                            <Form.Item name="buyingHouseCommission" label="Buying House Commission">
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
                          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                            <Form.Item  name="licence" label="Licence">
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
                           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
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
                            <Option key={e.currencyId} value={e.currencyId}>
                            {e.currencyName}
                            </Option>
                        )
                      })}
                      </Select>
                    </Form.Item>
                         </Col>
                            </Row>
                            <Row gutter={8}>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                            <Form.Item
                      name="nationalDBK"
                      label="National DBK%"
                    >
                      <Input placeholder="National DBK%" allowClear />
                    </Form.Item>
                                  </Col>
                                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
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
                       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                          <Form.Item name="groupTechClass" label="Group Tech Class">
                          <Select showSearch placeholder="Select Group Tech Class" allowClear >
                      </Select>
                          </Form.Item>
                       </Col>

                              </Row>
                              <Row gutter={8}>
                              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item   name="searchGroup" label="Search Group" rules={[{ required: true, message: "Enter Search Group" }]}>
                      <Select
                        placeholder="Select searchGroup"
                        allowClear>
                          {searchdata.map((e)=>{
                            return(
                            <Option key={e.id} values={e.id}>{e.searchGrpName}</Option>
                            )
                          })}
                      </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name="salesPerson" label="Sales Person" rules={[{ required: true, message: "Enter Sales Person" }]}>
                        <Input placeholder="Sales Person" allowClear />
                        </Form.Item>
                         </Col>
                         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item   name="noOfLacePanel" label="No Of Lace Panel" rules={[{ required: true, message: "Enter No Of Lace Panel" }]}>
                      <Input placeholder="No Of Lace Panel" allowClear />

                      {/* <Select
                        placeholder="Select No Of Lace Panel"
                        allowClear>
                      </Select> */}
                      </Form.Item>
                    </Col>
                              </Row>
                              <h1 style={{ color: 'grey', fontSize: '15px', textAlign: 'left' }}>Performance Responsible Team</h1>
                    <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item name="responsible"label="Responsible" rules={[{ required: true, message: "Enter Responsible" }]}>
                      {/* <Input placeholder="Responsible" allowClear /> */}
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item name="Approve" label="Approve" rules={[{ required: true, message: "Enter Approve" }]}>
                      <Select placeholder="Select Approve" allowClear> 
                      {employedata.map((e)=>{
                        return(
                          <Option key={e.employeeId} values={e.employeeId}>{e.firstName}

                          </Option>
                        )
                      })}                       
                      </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item name="Product Designer" label="Product Designer">
                        <Select placeholder="Select Product Designer"
                        allowClear>
                      {employedata.map((e)=>{
                        return(
                          <Option key={e.employeeId} values={e.employeeId}>{e.firstName}

                          </Option>
                        )
                      })}
                          </Select>
                      </Form.Item>
                     </Col>
                    </Row>
                    <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item   name="production Merchant" label="Production Merchant" rules={[{ required: true, message: "Enter Production Merchant" }]}>
                      <Select
                        placeholder="Select Production Merchant"
                        allowClear>
                          {employedata.map((e)=>{
                        return(
                          <Option key={e.employeeId} values={e.employeeId}>{e.firstName}

                          </Option>
                        )
                      })}
                      </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item  name="pd Merchant" label="PD Merchant">
                      <Select placeholder="Select PD Merchant" allowClear>
                      {employedata.map((e)=>{
                        return(
                          <Option key={e.employeeId} values={e.employeeId}>{e.firstName}

                          </Option>
                        )
                      })}
                      </Select>

                      </Form.Item>
                     </Col>
                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                     <Form.Item  name="factory Merchant" label="Factory Merchant">
                     <Select placeholder="Select Factory Merchant" allowClear>
                     {employedata.map((e)=>{
                        return(
                          <Option key={e.employeeId} values={e.employeeId}>{e.firstName}

                          </Option>
                        )
                      })}
                      </Select>
                      </Form.Item>
                     </Col>
                      </Row>
                      
                           
                           <h1 style={{ color: 'grey', fontSize: '15px', textAlign: 'left' }}>TNA</h1>
                           <Row gutter={16}>
                           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                           <Form.Item
                label="Order Confirmation Date"
                name="orderConfirmationDate"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
</Col>
<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
<Form.Item
                label="PCD"
                name="pcd"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
</Col>
<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
<Form.Item
                label="1stEx-Factory Date"
                name="1stExFactoryDate"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
</Col>
</Row>
<Row gutter={16}>
<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
<Form.Item
                      name="FR TNA"
                      label="FR TNA"
                    >
                      <Input placeholder="FR TNA" allowClear />
                    </Form.Item>
</Col>
<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
<Form.Item
                      name="total orderqty"
                      label="Total Order Qty"
                    >
                      <Input placeholder="Total Order Qty" allowClear />
                    </Form.Item>
                     </Col>
                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item   name="range" label="Range" rules={[{ required: true, message: "Enter Range" }]}>
                      <Select
                        placeholder="Select Range"
                        allowClear>
                          {rangedata.map((e)=>{
                            return(
                            <Option key={e.id} values={e.id}>{e.rangeCode}</Option>)
                            })}
                      </Select>
                      </Form.Item>
                    </Col>
                      </Row>
                     

                      </Card>
                    </Col>
                     
                </Row>
                

                <Row justify={'end'} style={{marginTop: '-40px'}}>
  <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}>
    <Button type='primary' htmlType='submit'>Submit</Button>
  </Col>
  <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}>
    <Button onClick={onReset}>Reset</Button>
  </Col>
</Row>

          </Form>
         </Card>
         </>
       )              
}
export default ItemCreation