 

import { BuyingHouseService, CompositionService, CurrencyService, CustomGroupsService, EmployeeDetailsService, GroupTechClassService, ItemCategoryService, ItemGroupService, ItemTypeService, LiscenceTypeService, MasterBrandsService, ROSLGroupsService, RangeService, SearchGroupService, StyleService, UomService } from "@project-management-system/shared-services";
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
export function RMDetailView  (props: Props)  {

    // const [page,setPage] = useState<number>(1);
    // const [sizeData, setSizeData] = useState<any[]>([])
    let location = useLocation();
    const stateData = location.state;

     console.log(stateData,"data through state")
    
   

      
    return(
        <Card title={<span style={{ color: 'white' }}>RM Creation<span style={{color:'#0A93E1 '}}></span></span>}  headStyle={{ fontWeight: 'bold' }} extra={<Link to='/materialCreation/rm-creation-view' ><span style={{color:'white'}} >
          <Button className='panel_button' >Back </Button>
           </span></Link>}>
            <span>      
              <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:24}}><Card bordered={false} title='Fabric Details'>
                <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ color:'',fontWeight: 'bold' }}>Item Type</span>} >{stateData.style_no}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Item Group</span>} >{stateData.item_type}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>PCH</span>} >{(stateData.brand_name)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Structure</span>} >{stateData.item_category}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Item Group</span>} >{stateData.item_group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Quality</span>} >{stateData.season}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Description</span>} >{stateData?.style}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Placement</span>} >{stateData.reference}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Fabric Code</span>} >{stateData.reference}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Facility</span>} >{stateData.reference}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Item Category</span>} >{stateData.reference}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'',fontWeight: 'bold' }}>Is Imported Item</span>} >{stateData.reference}</Descriptions.Item>

                    </Descriptions>
</Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:24}}><Card bordered={false} title='Performance Responsible Team'> <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Responsible</span>} >{stateData.buying_house}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Development Responsible</span>} >{stateData.liscence_type}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Sourcing Merchant</span>} >{stateData.custom_group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Product Group</span>} >{stateData.national_dbk}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Procurement Group</span>} >{stateData.rosl_group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Attached WareHouse</span>} >{stateData.group_tech_class}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Planner</span>} >{stateData.search_grp_name}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Business Area</span>} >{stateData.sale_person_id}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Supplier</span>} >{stateData.no_of_lace_panel}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Generic Code</span>} >{stateData.no_of_lace_panel}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Fabric Finish</span>} >{stateData.no_of_lace_panel}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Use In Operation</span>} >{stateData.no_of_lace_panel}</Descriptions.Item>

                    </Descriptions></Card></Col>
                <br></br>
                <Row gutter={16}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:24}}>
                <Card title='Purchase Price Information' bordered={false}>
                <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Basic UOM</span>} >{stateData.responsible_person}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Alt UOM</span>} >{stateData.approver}</Descriptions.Item>            
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Multiplication Factor</span>} >{stateData.product_designer}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Currency</span>} >{stateData.pd_merchant}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Purchase Price Quantity</span>} >{stateData.factory_merchant}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Sales Tax</span>} >{stateData.factory_merchant}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Excise Duty</span>} >{stateData.factory_merchant}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>License</span>} >{stateData.factory_merchant}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Property</span>} >{stateData.factory_merchant}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Sales Item</span>} >{stateData.factory_merchant}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Supply Lead Time</span>} >{stateData.factory_merchant}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Hierarchy Level</span>} >{stateData.factory_merchant}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Total Price with tax</span>} >{stateData.factory_merchant}</Descriptions.Item>

                    </Descriptions>
                </Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:24}}>
                <Card title='Bill Of Material Data' bordered={false}> <Descriptions  style={{ alignItems: 'right' }} >
                <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: '',whiteSpace: 'nowrap' }}>Consumption</span>}>
                 <span style={{ whiteSpace: 'nowrap' }}>
                 {stateData.order_confirmed_date}</span></Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'',whiteSpace: 'nowrap' }}>Wastage %</span>} >{moment(stateData.order_close_date).format('DD-MM-YYYY')}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Cost Group</span>} >{moment(stateData.first_ex_factory_date).format('DD-MM-YYYY')}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Usage Remarks</span>} >-</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: '' }}>Delivery Terms</span>}>
                     {Number(stateData.order_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Delivery Method</span>} >{stateData.rangee}</Descriptions.Item>

                    </Descriptions></Card>
                    
               </Col>
                </Row>
                          </span>
            
    
        </Card>
  
    )
}
export default RMDetailView
