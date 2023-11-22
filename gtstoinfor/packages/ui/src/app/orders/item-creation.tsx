import { Button, Card, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space, message } from "antd";
import { HomeOutlined, PlusCircleOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { BusinessAreaService, BuyingHouseService, CompositionService, CurrencyService, CustomGroupsService, EmployeeDetailsService, FactoryService, GroupTechClassService, ItemCategoryService, ItemCreationService, ItemGroupService, ItemTypeService, LiscenceTypeService, MasterBrandsService, OperationsService, ProductGroupService, ROSLGroupsService, RangeService, SearchGroupService, SettingsService, StyleService, UomService } from "@project-management-system/shared-services";
import { ItemCreationDTO, ItemGroupEnum, PropertyEnum, SettingsIdReq, SubContractStatus } from "@project-management-system/shared-models";
import { setOptions } from "highcharts";
import moment from "moment";
 
export interface FormProps {
  itemCreationData:any;
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
         const grouptech = new GroupTechClassService();
         const itemTypeservice =new ItemTypeService();
         const facilityservice =new FactoryService();
         const proDUCTService = new ProductGroupService();
         const business = new BusinessAreaService
         const [Business,setBusiness]= useState([])
         const [Product,setProduct] = useState([]);
         const [currencydata,setCurrencyData] = useState([]);
         const [uomdata,setUomData] = useState([]);
         const [itemgroup,setitemgroup] = useState([]);
         const [group,setGroup] = useState([]);
         const [compositiondata,setCompositionData] = useState([]);
         const [facilitydata,setfacilityData] = useState([]);
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
         const service = new SettingsService()
         const [data,setData] = useState<any[]>([])
         const externalRefNo = JSON.parse(localStorage.getItem("currentUser")).user.externalRefNo;
         const role = JSON.parse(localStorage.getItem("currentUser")).user.roles;
     
     
         useEffect(() => {
             getAllInfo()
     
         },[])
     
         const getAllInfo = () => {
             const req = new SettingsIdReq()
             req.externalRefNumber = externalRefNo
             service.getAllSettingsInfo(req).then(res => {
                 if(res.status){
                     setData(res.data)
form.setFieldValue('currency',res.data?.[0]?.currencyName)                   
form.setFieldValue('salesPersonId',res.data?.[0]?.salesPersonId)                     
form.setFieldValue('facilityId',res.data?.[0]?.facilityId)                     

                 }
             })
         }
         
              const navigate = useNavigate()


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
            getAllGroupTech();
            getAllFacilitys();
            getAllBusinessArea();
            getAllProducts();
          },[])
          const getAllProducts = () => {
            proDUCTService
              .getAllActiveProductGroup()
              .then((res) => {
                if (res.status) {
                  setProduct(res.data);
                } 
                // else {
                //   AlertMessages.getErrorMessage(res.internalMessage);
                // }
              })
              // .catch((err) => {
              //   setProduct([]);
              //   AlertMessages.getErrorMessage(err.message);
              // });
          };
         const getAllCurrencies=() =>{
            currencyServices.getAllActiveCurrencys().then(res =>{
              if (res.status){
                // console.log(res,'llllll')
                setCurrencyData(res.data);
                 
              } 
              // else{
              //   AlertMessages.getErrorMessage(res.internalMessage);
              //    }
            })
            // .catch(err => {
            //   setCurrencyData([]);
            //    AlertMessages.getErrorMessage(err.message);
            //  })        
          }

          

          const getAllFacilitys=() =>{
            facilityservice.getFactories().then(res =>{
              if (res.status){
                // console.log(res,'llllll')
                setfacilityData(res.data);
                 
              } 
              // else{
              //   AlertMessages.getErrorMessage(res.internalMessage);
              //    }
            })
            // .catch(err => {
            //   setfacilityData([]);
            //    AlertMessages.getErrorMessage(err.message);
            //  })        
          }
          const getAllGroupTech=() =>{
           grouptech.getAllActiveGroupTechClass().then(res =>{
              if (res.status){
                // console.log(res,'llllll')
                setGroup(res.data);
                 
              }
              //  else{
              //   AlertMessages.getErrorMessage(res.internalMessage);
              //    }
            })
            // .catch(err => {
            //   setGroup([]);
            //    AlertMessages.getErrorMessage(err.message);
            //  })        
          }
          const getAllItemType=() =>{
            itemTypeservice.getAllActiveItemType().then(res =>{
              if (res.status){
                // console.log(res,'llllll')
                setItemType(res.data);
                 
              }
              //  else{
              //   AlertMessages.getErrorMessage(res.internalMessage);
              //    }
            })
            // .catch(err => {
            //   setItemType([]);
            //    AlertMessages.getErrorMessage(err.message);
            //  })        
          }
          const getAllItemGroups=() =>{
            itemGroupservice.getAllActiveItemGroup().then(res =>{
              if (res.status){
                console.log(res.data,'llllll')
                setitemgroup(res.data);
              }
              // else{
              //   AlertMessages.getErrorMessage(res.internalMessage);
              //    }
            })
            // .catch(err => {
            //   setitemgroup([]);
            //    AlertMessages.getErrorMessage(err.message);
            //  })        
          }
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

          const getAllUoms=() =>{
            uomservice.getAllActiveUoms().then(res =>{
              if (res.status){
                // console.log(res,'llllll')
                setUomData(res.data);
                 
               } 
             // else{
              //   AlertMessages.getErrorMessage(res.internalMessage);
              //    }
            })
            // .catch(err => {
            //   setUomData([]);
            //    AlertMessages.getErrorMessage(err.message);
            //  })        
          }

const getAllComposition=()=>{
compositionservice.getActiveComposition().then(res=>{
  if(res.status){
    setCompositionData(res.data);
  }
  // else{
  //   AlertMessages.getErrorMessage(res.internalMessage);
  // }
})
// .catch(err => {
//   setCompositionData([]);
//    AlertMessages.getErrorMessage(err.message);
//  })
}


          const getAllSearchgroup=()=>{
            searchgroup.getActiveSearchGroup().then(res=>{
              if(res.status){
                setSearchData(res.data)
              }
              // else{
              //   AlertMessages.getErrorMessage(res.internalMessage);
              // }
            })
            // .catch(err => {
            //   setSearchData([]);
            //    AlertMessages.getErrorMessage(err.message);
            //  })        
          }

          const getAllStyles=()=>{
         styleService.getAllActiveStyle().then(res=>{
           if(res.status){
           setStyle(res.data);

          }
          // else{
          //   AlertMessages.getErrorMessage(res.internalMessage);
          // }
          })
          // .catch(err=>{
          //   setStyle([]);
          //   AlertMessages.getErrorMessage(err.message)
          // })
          }

          const getAllLicense=()=>{
            LicenceService.getAllActiveLiscenceTypes().then(res=>{
                if(res.status){
                    setLicence(res.data);
                }
                // else{
                //     AlertMessages.getErrorMessage(res.internalMessage);

                // }
            })
            // .catch(err=>{
            //     setLicence([]);
            //     AlertMessages.getErrorMessage(err.message)
            // })
          }

          const getAllBrands=()=>{
            brandservice.getAllActiveBrands().then(res=>{
                if(res.status){
                    setBrand(res.data);
                }
                // else{
                //     AlertMessages.getErrorMessage(res.internalMessage)
                // }
            })
            // .catch(err=>{
            //     setBrand([]);
            //     AlertMessages.getErrorMessage(err.message)
            // })
          }

           const getAllRanges=()=>{
            Rangeservice.getActiveRange().then(res=>{
              if(res.status){
                setRangeData(res.data);
              }
              // else{
              //   AlertMessages.getErrorMessage(res.internalMessage)

              // }
            })
            // .catch(err=>{setRangeData([])
            //   AlertMessages.getErrorMessage(err.message)

            // })
           }
          const getAllCategory=()=>{
            categoryService.getActiveItemCategories().then(res=>{
                if(res.status){
                    setItemCategory(res.data);
                }
                // else{
                //     AlertMessages.getErrorMessage(res.internalMessage)
                // }
            })
            // .catch(err=>{
            //     setItemCategory([]);
            //     AlertMessages.getErrorMessage(err.message)
            // })
        }

        const getAllROSL=()=>{
            roslservice.getAllActiveROSLGroups().then(res=>{
                if(res.status){
                    setRosl(res.data);
                }
                // else{
                //     AlertMessages.getErrorMessage(res.internalMessage)
                // }
            })
            // .catch(err=>{
            //     setRosl([]);
            //     AlertMessages.getErrorMessage(err.message)
            // })
        }

         const getAllCustomGrops=()=>{
            customGroupservice.getAllActiveCustomGroups ().then(res=>{
                if(res.status){
                    setCustomGroup(res.data);
                    
                }
                // else{
                //     AlertMessages.getErrorMessage(res.internalMessage)
                // }
                
            })
            // .catch(err=>{
            //     setCustomGroup([]);
            //     AlertMessages.getErrorMessage(err.message)
            // })
            // console.log(customGroup,"customGroupId");
            
         }
         const getAllBuyingHouse=()=>{
            buyingHouseservice.getAllActiveBuyingHouse().then(res=>{
                if(res.status){
                    setHouse(res.data);
                }
                // else{
                //     AlertMessages.getErrorMessage(res.internalMessage)
                // }
            })
            // .catch(err=>{
            //     setHouse([]);
            //     AlertMessages.getErrorMessage(err.message)
            // })
         }
 const getAllBusinessArea =()=>{
  business.getAllBusinessAreaInfo().then(res=>{
    if(res.status){
      setBusiness(res.data)
    }
  })
 }
         


  const onReset = () => {
  form.resetFields()
      }

         const saveItem=(values)=>{
          const req = new ItemCreationDTO(values.itemName,values.itemCode,values.description,values.itemTypeId,values.brandId,null,values.category,null,values.season,values.responsiblePersonId,values.property,values.productDesignerId,values.approver,values.productionMerchant,values.pdMerchant,values.factoryMerchant,values.salesPersonId,values.styleNo,values.internalStyleId,values.basicUom,values.altUoms,values.currency,values.targetCurrency,values.conversionFactor,values.projectionOrder,values.buyingHouseCommision,values.salePriceQty,values.licenseId,values.customGroupId,values.nationalDbk,values.roslGroup,values.isSubContract,values.salePrice,values.orderConfirmedDate,values.firstExFactoryDate,values.orderCloseDate,values.moq,values.orderQty,values.facilityId,values.itemGroup,values.productGroup,values.businessArea,values.basicUom,values.groupTechClass,values.composition,values.range,values.noOfLacePanel,values.searchGroup,values.reference,null,values.createdUser,null,null,null,null)
          // form.validateFields().then((values) => {
            //  console.log(values,"ooooooooooooooo");
              itemCreationService.createItem(req).then((res) => {
                console.log(res,"res")
                if(res.status){
                  message.success(res.internalMessage,2)
                  onReset();
                  navigate("/materialCreation/item-creation-view")
                }
                else{
                  message.error("something went wrong")
                }
              })
              // .catch(err => {
              //   AlertMessages.getWarningMessage(err.message)
              // })
          // })
         }

        
         return (
         <>
        <Card title=" FG Item Creation" extra={!props.isUpdate && (<Link to="/materialCreation/item-creation-view">
         <span style={{ color: 'white' }}><Button type="primary">View</Button></span></Link> )}>

               <Form  form={form} style={{ fontSize: "10px" }}  layout="vertical" onFinish = {saveItem} initialValues={props.itemCreationData}>
               <Form.Item name='trim' style={{display:'none'}}>
                    <Input hidden/>
                </Form.Item>
                <Form.Item name='createdUser' style={{display:'none'}} initialValue={"Admin"}>
                    <Input hidden/>
                </Form.Item>
                <div style={{marginTop:"-10px"}}>
                <Row gutter={16}>
               
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                 <Card bordered={false} >
                  <h1 style={{ color: 'grey', fontSize: '15px', textAlign: 'left', marginTop:"-10px"}}>Item Details</h1>
                  <Row gutter={8}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                              <Form.Item style={{flexDirection:'row'}} label="Style" name="styleNo" 
                              rules={[{ required: true, message: "Enter Style" }]} >
                                   <Input placeholder="Style" allowClear/>
                              </Form.Item>
                   </Col>
                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                   <Form.Item  label="Item Type" name="itemTypeId" rules={[{ required: true, message: "Enter Type" }]}>
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
                    <Form.Item label="Brand" name="brandId" rules={[{ required: true, message: "Enter Brand" }]} >
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
                    <Form.Item label="Item Code" name="itemCode"
                       rules={[{ required: true, message: "Enter Item code" }]}>

                    <Input placeholder="Item Code" allowClear disabled={props.isUpdate ? true : false}/>

                    </Form.Item>
                   </Col>
                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                    <Form.Item label="Item Group" name="itemGroup"
                      //  rules={[{ required: true, message: "Enter Item Group" }]}
                       >
                       <Select
                     placeholder="Select Item Group" allowClear >
                      
                     {/* {Object.values(ItemGroupEnum).map((key,value)=>{
            return <Option key={key} value={key}>{key}</Option>
           })} */}
                     {itemgroup.map((e)=>{
                      return(<Option key={e.itemGroupId} value={e.itemGroupId}>
                          {e.itemGroup}
                      </Option>)
                    })}
                 
                    </Select>
                    </Form.Item>
                   </Col>
                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item   name="itemName" label="Item Name" 
                      rules={[{ required: true, message: "Enter Item Name" }]}>
                                                       <Input placeholder="Item Name" allowClear/>

                      </Form.Item>
                    </Col>
                   </Row>
                   <Row gutter={8}>
                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item  label="Shahi Style" name="internalStyleId" rules={[{ required: true, message: "Fill Shahi Style" }]}>
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
                      <Form.Item   name="reference" label="Referenced" >
                      <Select
                        placeholder="Select Referenced"
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
                    <Form.Item label="Category" name="category" rules={[{ required: true, message: "Enter category" }]}>
                       {/* <Select placeholder="Select Category" allowClear>
                    {itemCategory.map((e)=>{
                        return(
                            <Option key={e.itemCategoryId} value={e.itemCategoryId}>
                             {e.itemCategory}
                            </Option>
                        )
                        
                    })}
                      </Select> */}
                      <Input placeholder="Enter Category" allowClear />
                    </Form.Item>
                   </Col>
                    </Row>

                    <h1 style={{ color: 'grey', fontSize: '15px', textAlign: 'left' }}>Manufacturing Information</h1>
                              <Row gutter={8}>
                              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                              <Form.Item name="property" label="Property">
                  <Select
                    showSearch
                  
                        placeholder="Select Property" allowClear>
                     {Object.values(PropertyEnum).map((key,value)=>{
                       return <Option key={key} value={key}>{key}</Option>
                        })}
                    </Select>                  </Form.Item>
                           </Col>
                           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                           <Form.Item name = "checkbox">
                <div style={{ padding: '25px' }}>
                  <Checkbox>Check if Manufacturing Subcontracted</Checkbox>
                </div>
              </Form.Item>

                           </Col>
                           </Row>
                   
                         <h1 style={{ color: "grey", fontSize: "15px", textAlign: "left" }}>Sales Price Information</h1>
                         <Row gutter={8}>
                         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                <Form.Item   name="basicUom" label="Basic UOM" rules={[{ required: true, message: "Enter Basic UOM" }]}>
                <Select placeholder="Select Basic UOM" allowClear >
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
                <Form.Item   name="altUoms" label="Alt UOM" 
                // rules={[{ required: true, message: "Enter Alt UOM" }]}
                >
                <Select placeholder="Select Alt UOM" allowClear >
                  {uomdata.map((e)=>{

                    return(
                    <Option key={e.uomId} value={e.uomId}>{e.uom}

                    </Option>)
                  })

                  }
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
                       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name="conversionFactor"
                      label="Conversion Factor"
                      rules={[{ required: true, message: "slecet Currency" }]}>
                      
                      <Input placeholder="Conversion Factor" allowClear />
                        </Form.Item>
                      </Col>
                     </Row>
                     <Row gutter={8}>
                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item  name="currency" label="Currency" 
                      rules={[{ required: true, message: "Enter Currency" }]}>
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
                        <Form.Item  name="salePrice" label="Sales Price"
                        //  rules={[{ required: true, message: "Enter Sales Price" }]}
                        rules={[{ required: true, message: "Enter Sales Price" },
                        { 
                          pattern: /^[0-9]+$/, 
                          message: "Please Enter numbers only" 
                        },
                           ]}
                        >
                        <Input placeholder="Sales  Price"  />
                        </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name="targetCurrency" label="Target Currency" rules={[{ required: true, message: "Enter Target Currency" }]}>
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
                        </Row>
                        <Row gutter={8}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                          <Form.Item name="projectionOrder" label="Projection Order"
                    rules={[{ required: true, message: "enter projectionOrder" }]}>
                    <Input placeholder="Projection Order" allowClear />

                          </Form.Item>
                       </Col>

                       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                       <Form.Item
                    label="Business Area"
                    name="businessArea"
                    rules={[{ required: true, message: "select Business Area" }]}
                  >
                    <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Business Area"
                    >
                      {Business.map((rec)=>(
                        <option key={rec.businessAreaId} value={rec.businessAreaId}>
                      {rec.businessAreaName}
                        </option>
                      ))}
                    </Select>
                    {/* <Input placeholder="Business Area" allowClear /> */}
                  </Form.Item>
                       </Col>
                       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                            <Form.Item
                      name="salePriceQty"
                      label="Sales Price Qty"
                      rules={[{ required: true, message: "Enter Sales Price Qty" }]}

                    >
        <InputNumber placeholder="Sales Price Qty" style={{ width: '100%' }} />
                    </Form.Item>
                                  </Col>
                                 
                     
                     
                        </Row>
                        
                        <Row gutter={8}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                            <Form.Item
                      name="description"
                      label="Description"
                    >
                      <Input placeholder="Description" allowClear />
                    </Form.Item>
                                  </Col>
                                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                     <Form.Item  label="Facility"name="facilityId"
                                           rules={[{ required: true, message: "Select Facility" }]}

                     >
                     <Select
                    allowClear
                    showSearch
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
                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                     <Form.Item  label="Season"name="season">
                     <Input placeholder="Season"  allowClear/>
                     </Form.Item>
                     </Col>
                     {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                     <Form.Item  label="Internal Style"name="internalStyleId">
                     <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Internal Style"
                    >

                     {facilitydata.map((e)=>{
                    return(
                    <Option key={e.id} value={e.id}>{e.name}
                    </Option>)
                  })

                  }
                  </Select>

                     </Form.Item>
                     </Col> */}

                   
                        </Row>
                        <Row gutter={8}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item   name="range" label="Range" >
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

                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                          <Card bordered={false} >
                          <h1 style={{ color: 'grey', fontSize: '15px', textAlign: 'left',marginTop:"-10px" }}>Profit Controllers</h1>
                          <Row gutter={8}>
                          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                            <Form.Item name="buyingHouseCommision" label="Buying House Commission">
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
                            <Form.Item  name="licenseId" label="Licence"
                                                  rules={[{ required: true, message: "Enter Licence" }]}>

                          
                            <Select
                        placeholder="Select Licence"
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
                      name="customGroupId"
                      label="Custom Group"
                      rules={[{ required: true, message: "select CustomGroup" }]}>

                    
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
                            </Row>
                            <Row gutter={8}>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                            <Form.Item
                      name="nationalDbk"
                      label="National DBK%"
                      rules={[
                        // { required: true, message: "Enter Order Qty" },
                      { 
                        pattern: /^[0-9]+$/, 
                        message: "Please Enter numbers only" 
                      },
                         ]}
                      
                    >
                      <Input placeholder="National DBK%" allowClear  />
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
                            {
                              group.map((e=>{
                                return(<Option key={e.groupTechClassId} value={e.groupTechClassId}>
                                  {e.groupTechClassCode}
                                </Option>)
                              }))
                            }
                      </Select>
                          </Form.Item>
                       </Col>

                              </Row>
                              <Row gutter={8}>
                              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item   name="searchGroup" label="Search Group" >
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
                     <Form.Item  label="Sales Person"name="salesPersonId"
                     rules={[{ required: true, message: "Enter Sales Person" }]}
                     >
                     <Select
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Sales Person"
                    >

                     {employedata.map((e)=>{
                    return(
                    <Option key={e.employeeId} value={e.employeeId}>{e.firstName}
                    </Option>)
                  })

                  }
                  </Select>

                     </Form.Item>
                     </Col>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name="salesPersonId" label="Sales Person" initialValue={data?.[0]?.salesPersonId}
                        rules={[{ required: true, message: "Enter Sales Person" }]}>
                        <Select placeholder="Select Approve" allowClear defaultValue={data?.[0]?.salesPersonId}> 
                          {employedata.map((e)=>{
                            console.log(typeof e.employeeId,'employeeeeeeee');
                            
                            return(
                              <Option key={e.employeeId} values={e.employeeId}>{e.firstName}

                              </Option>
                            )
                          })}                       
                        </Select>
                        </Form.Item>
                         </Col> */}
                         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item   name="noOfLacePanel" label="No Of Lace Panel" 
                      rules={[{ required: true, message: "Enter No Of Lace Panel" }]}>
                      <Input placeholder="No Of Lace Panel" allowClear />

                      {/* <Select
                        placeholder="Select No Of Lace Panel"
                        allowClear>
                      </Select> */}
                      </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={8} >
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item  name="productGroup" label="Product Group" 
                      rules={[{ required: true, message: "Enter Product Group" }]}>
                      <Select placeholder="Select Product Group" allowClear> 
                          {Product.map((e)=>{
                            return(
                              <Option key={e.productGroupId} values={e.productGroupId}>{e.productGroup}

                              </Option>
                            )
                          })}                       
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                            <Form.Item
                      name="moq"
                      label="Moq"
                      rules={[
                        // { required: true, message: "Enter Sales Price" },
                      { 
                        pattern: /^[0-9]+$/, 
                        message: "Please Enter numbers only" 
                      },
                         ]}
                      
    
                    >
                      <Input placeholder="moq" style={{ width: '100%' }} />
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
                    <Form.Item
                    label="Is SubContract Status"
                    name="isSubContract"
                    rules={[{ required: true, message: "Enter Is SubContract Status" }]}
                  >
                    <Select
                    showSearch
                  
                        placeholder="Select Is SubContract Status" allowClear>
                     {Object.values(SubContractStatus).map((key,value)=>{
            return <Option key={key} value={key}>{key}</Option>
           })}
                    </Select>
                    {/* <Input placeholder="Fabric code" allowClear /> */}
                  </Form.Item>
                    </Row>
                              
                              <h1 style={{ color: 'grey', fontSize: '15px', textAlign: 'left' }}>Performance Responsible Team</h1>
                    <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item name="responsiblePersonId"label="Responsible" rules={[{ required: true, message: "Enter Responsible" }]}>
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
                      <Form.Item name="approver" label="Approve" rules={[{ required: true, message: "Enter Approve" }]}>
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
                      <Form.Item name="productDesignerId" label="Product Designer">
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
                      <Form.Item   name="productionMerchant" label="Production Merchant"
                       rules={[{ required: true, message: "Enter Production Merchant" }]}>
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
                      <Form.Item  name="pdMerchant" label="PD Merchant">
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
                     <Form.Item  name="factoryMerchant" label="Factory Merchant">
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
                name="orderConfirmedDate"
                rules={[{ required: true, message: "Enter Order ConfirmedDate" }]}>

              
                <DatePicker style={{ width: "100%" }} 
                disabledDate={(current) => current && current > moment().endOf('day')} 
                />
              </Form.Item>
</Col>
<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
<Form.Item
                label="Order Close Date"
                name="orderCloseDate"
                rules={[{ required: true, message: "Enter order CloseDate" }]}>
                <DatePicker style={{ width: "100%" }}  
                
                />
              </Form.Item>
</Col>
<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
<Form.Item
                label="1stEx-Factory Date"
                name="firstExFactoryDate"
                rules={[{ required: true, message: "Enter  1stEx-Factory Date" }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
</Col>
</Row>
<Row gutter={16}>
{/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
<Form.Item
                      name="FR TNA"
                      label="FR TNA"
                    >
                      <Input placeholder="FR TNA" allowClear />
                    </Form.Item>
</Col> */}
<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
<Form.Item
                      name="orderQty"
                      label="Order Qty"
                      rules={[{ required: true, message: "Enter Order Qty" },
                      { 
                        pattern: /^[0-9]+$/, 
                        message: "Please Enter numbers only" 
                      },
                         ]}
                      >
                      <Input placeholder="Total Order Qty" allowClear />
                    </Form.Item>
                     </Col>
                    
                      </Row>
                     

                      </Card>
                    </Col>
                  
                    </Row>
                    </div>
                <br></br>
                <Row justify={'end'} style={{marginTop: '-30px'}}>
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