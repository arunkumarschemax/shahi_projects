 

import { CompositionService, EmployeeDetailsService, ItemCategoryService, LiscenceTypeService, MasterBrandsService, SearchGroupService, StyleService } from "@project-management-system/shared-services";
import { Button, Card, Col, Descriptions, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AlertMessages from "../common/common-functions/alert-messages";
import { LiscenceTypeIdRequest } from "@project-management-system/shared-models";

export interface Props {
  data: any
}
export function ItemCreationDetailView  (props: Props)  {

    // const [page,setPage] = useState<number>(1);
    // const [sizeData, setSizeData] = useState<any[]>([])
    let location = useLocation();
    const stateData = location.state;

    console.log(stateData,"stateData")
    
    const [licence,setLicence]=useState([])
    const [employedata,setEmployeData] = useState([]);
    const [styledata,setStyle]=useState([]);
    const [compositiondata,setCompositionData] = useState([]);
    const [searchdata,setSearchData] = useState([]);
    const[brand,setBrand]=useState([]);
    const [itemCategory,setItemCategory]= useState([]);




    const employeservice = new EmployeeDetailsService();
    const styleService = new StyleService();
    const LicenceService = new LiscenceTypeService();
    const searchgroup = new SearchGroupService();
    const compositionservice = new CompositionService();
    const brandservice = new MasterBrandsService();
    const categoryService = new ItemCategoryService();









    useEffect(() => {

       
       getAllLicense();
       getAllEmployes();
       getAllStyles();
    //    getAllSearchgroup();
       getAllComposition();
       getAllBrands();
       getAllCategory();

      }, [])

      const getAllLicense=()=>{
        LicenceService.getAllActiveLiscenceTypes().then(res=>{
            if(res.status){
                setLicence(res.data);
            }
        })
      }
    const getAllEmployes=() =>{
        employeservice.getAllActiveEmploee().then(res =>{
          if (res.status){
            setEmployeData(res.data);
          } })        
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
         const getAllComposition=()=>{
            compositionservice.getActiveComposition().then(res=>{
              if(res.status){
                setCompositionData(res.data);
              }else{
                AlertMessages.getErrorMessage(res.internalMessage);
              }
            })
            }
            const getAllBrands=()=>{
                brandservice.getAllActiveBrands().then(res=>{
                    if(res.status){
                        setBrand(res.data);
                    }else{
                        AlertMessages.getErrorMessage(res.internalMessage)
                    }
                })
              }

              const getAllCategory=()=>{
                categoryService.getActiveItemCategories().then(res=>{
                    if(res.status){
                        setItemCategory(res.data);
                    }else{
                        AlertMessages.getErrorMessage(res.internalMessage)
                    }
                })
            }

        //  const getAllSearchgroup=()=>{
        //     searchgroup.getActiveSearchGroup().then(res=>{
        //       if(res.status){
        //         setSearchData(res.data)
        //       }else{
        //         AlertMessages.getErrorMessage(res.internalMessage);
        //       }
        //     }).catch(err => {
        //       setSearchData([]);
        //        AlertMessages.getErrorMessage(err.message);
        //      })        
        //   }
      function getLicenseType(licenseId) {
        const foundLicense = Object.assign(licence).find(license => license.liscenceTypeId === licenseId);
        return foundLicense ? foundLicense.liscenceType : "-";
      }
    
      
        function getEmp(data) {
        const foundemp = Object.assign(employedata).find((emp) => emp.employeeId === data);
        const ftname = `${foundemp?.firstName} ${foundemp?.lastName}`;
        return ftname ? ftname : '-';
      }
      
      function getEmpreaponse(data) {
        const foundemp = Object.assign(employedata).find((emp) => emp.employeeId === data);
        const ftname = `${foundemp?.firstName} ${foundemp?.lastName}`;
        return ftname ? ftname : '-';
      }
      
      function getEmpProductDesigne(data) {
        const foundemp = Object.assign(employedata).find((emp) => emp.employeeId === data);
        const ftname = `${foundemp?.firstName} ${foundemp?.lastName}`;
        return ftname ? ftname : '-';
      }

      function getEmpProductionMerchant(data) {
        const foundemp = Object.assign(employedata).find((emp) => emp.employeeId === data);
        const ftname = `${foundemp?.firstName} ${foundemp?.lastName}`;
        return ftname ? ftname : '-';
      }
      function getEmpPdMerchant(data) {
        const foundemp = Object.assign(employedata).find((emp) => emp.employeeId === data);
        const ftname = `${foundemp?.firstName} ${foundemp?.lastName}`;
        return ftname ? ftname : '-';
      }
      function getEmpFactoryMerchant(data) {
        const foundemp = Object.assign(employedata).find((emp) => emp.employeeId === data);
        const ftname = `${foundemp?.firstName} ${foundemp?.lastName}`;
        return ftname ? ftname : '-';
      }
      function getEmpSalePerson(data) {
        const foundemp = Object.assign(employedata).find((emp) => emp.employeeId === data);
        const ftname = `${foundemp?.firstName} ${foundemp?.lastName}`;
        return ftname ? ftname : '-';
      }
      function getStyle(data) {
        const foundStyle = Object.assign(styledata).find(dat => dat.style_no === data);
        return foundStyle ? foundStyle.style : "-";
      }
    //   function getSearchGroup(data) {
    //     const foundStyle = Object.assign(searchdata).find(dat => dat.style_no === data);
    //     return foundStyle ? foundStyle.style : "-";
    //   }
    function getComposition(data) {
        const foundComp = Object.assign(compositiondata).find(dat => dat.id === data);
        return foundComp ? foundComp.compositionCode : "-";
      }
      function getBrand(data) {
        const foundComp = Object.assign(brand).find(dat => dat.brandId === data);
        return foundComp ? foundComp.brandName : "-";
      }
      function ItemCategory(data) {
        const foundIC = Object.assign(itemCategory).find(dat => dat.itemCategoryId === data);
        return foundIC ? foundIC.itemCategory : "-";
      }
    return(
        <Card title={<span style={{ color: 'black' }}>Item Creation Detailed View - <span style={{color:'#0A93E1  '}}></span></span>}  headStyle={{ fontWeight: 'bold' }} extra={<Link to='/materialCreation/item-creation-view' ><span style={{color:'white'}} >
          <Button className='panel_button' >Back </Button>
           </span></Link>}>
            <span>      
                <Row gutter={16}><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}><Card bordered={false} title='Item Details'>
                <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ color:'',fontWeight: 'bold' }}>Style</span>} >{getStyle(stateData.style_no)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>ItemType</span>} >{stateData.item_type_id}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Brand</span>} >{getBrand(stateData.brand_id)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Category</span>} >{ItemCategory(stateData.category_id)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Item Group</span>} >{stateData.item_group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Season</span>} >{stateData.season_id}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Shahi Style</span>} >{stateData?.internal_style_id}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Referenced</span>} >{stateData.reference_id}</Descriptions.Item>

                    </Descriptions>
</Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}><Card bordered={false} title='Profit Controllers'> <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Buying House Commission</span>} >{stateData.buying_house_commision}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Licence</span>} >{getLicenseType(stateData.license_id)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Custom Group</span>} >{stateData.custom_group_id}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>National DBK%</span>} >{stateData.national_dbk}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Rosl Group</span>} >{stateData.rosl_group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Group Tech Class</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Search Group</span>} >{stateData.search_group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Sales Person</span>} >{getEmpSalePerson(stateData.sale_person_id)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>No Of Lace Panel</span>} >{stateData.no_of_lace_panel}</Descriptions.Item>

                    </Descriptions></Card></Col>
                </Row><br></br>
                <Row gutter={16}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:11}}>
                <Card title='Performance Responsible Team' bordered={false}>
                <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Responsible</span>} >{getEmpreaponse(stateData.responsible_person_id)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Approve</span>} >{getEmp(stateData.approver)}</Descriptions.Item>            
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Product Designer</span>} >{getEmpProductDesigne(stateData.product_designer_id)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Production Merchant</span>} >{getEmpProductionMerchant(stateData.production_merchant)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>PD Merchant</span>} >{getEmpPdMerchant(stateData.pd_merchant)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Factory Merchant</span>} >{getEmpFactoryMerchant(stateData.factory_merchant)}</Descriptions.Item>

                    </Descriptions>
                </Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:13}}>
                <Card title='TNA' bordered={false}> <Descriptions  style={{ alignItems: 'right' }} >
                <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: '',whiteSpace: 'nowrap' }}> Order Confom Date</span>}>
                 <span style={{ whiteSpace: 'nowrap' }}>
                 {moment(stateData.order_confirmed_date).format('DD-MM-YYYY')}</span></Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'',whiteSpace: 'nowrap' }}>PCD</span>} >{moment(stateData.order_close_date).format('DD-MM-YYYY')}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>1stEx-Factory Date</span>} >{moment(stateData.first_ex_factory_date).format('DD-MM-YYYY')}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>FR TNA</span>} >-</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: '' }}>Total Order Qty</span>}>
                     {Number(stateData.order_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Range</span>} >{stateData.range}</Descriptions.Item>

                    </Descriptions></Card>
                    
               </Col>
                </Row>
               
                <br></br>
                    <Row gutter={16}><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                    <Card title='Sales Price Information' bordered={false}> <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Basic UOM</span>} >{stateData.basic_uom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Alt UOM</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Conversion Factor</span>} >{stateData.conversion_factor_id}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Currency</span>} >{stateData.currency}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Sales Price</span>} >{stateData.sale_price}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Target Currency</span>} >{stateData.target_currency}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Projection Order</span>} >{stateData.projection_order_id}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Business Area</span>} >{stateData.business_area}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Composition</span>} >{getComposition(stateData.composition)}</Descriptions.Item>
                    </Descriptions></Card>
             </Col>
                    <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                    <Card title='Manufacturing Information' bordered={false}> <Descriptions style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Property</span>} >{stateData.altUom}</Descriptions.Item>
                    </Descriptions></Card></Col>
                    </Row>

                          </span>
            
    
        </Card>
  
    )
}
export default ItemCreationDetailView
