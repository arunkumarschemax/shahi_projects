 import { Button, Card, Col, Descriptions, Row, Table } from "antd";
import moment from "moment";
import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export interface Props {
  data: any
}
export function RMDetailView  (props: Props)  {

    // const [page,setPage] = useState<number>(1);
    // const [sizeData, setSizeData] = useState<any[]>([])
    let location = useLocation();
    const stateDatas = location.state;

    //  console.log(stateDatas,"data through state")
    
   

      
    return(
        <Card title={<span style={{ color: 'white' }}>RM Creation<span style={{color:'#0A93E1 '}}></span></span>}  headStyle={{ fontWeight: 'bold' }} extra={<Link to='/materialCreation/rm-creation-view' ><span style={{color:'white'}} >
          <Button className='panel_button' >Back </Button>
           </span></Link>}>
            <span>    
              <Row gutter={16} >  
              <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}><Card bordered={false} title='Fabric Details'>
                <Descriptions column={2}  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ color:'#687170',fontWeight: 'bold' }}>Item Type</span>} >{stateDatas?.item_type}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>PCH</span>} >{(stateDatas?.pch)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Structure</span>} >{stateDatas?.item_category}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Item Group</span>} >{stateDatas?.item_group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Quality</span>} >{stateDatas?.quality}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Item Name</span>} >{stateDatas?.descr}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Placement</span>} >{stateDatas?.placement}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Fabric Code</span>} >{stateDatas?.item_code}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Facility</span>} >{stateDatas?.facility}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Item Category</span>} >{stateDatas?.item_category}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Is Imported Item</span>} >{stateDatas?.is_imported_item}</Descriptions.Item>

                    </Descriptions>
</Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}><Card  bordered={false} title='Performance Responsible Team'> <Descriptions column={2} style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Responsible</span>} >{stateDatas?.responsible_person}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Development Responsible</span>} >{stateDatas?.dev_responsible}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Sourcing Merchant</span>} >-</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Product Group</span>} >{stateDatas?.product_group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Procurement Group</span>} >{stateDatas?.procurment_group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Attached WareHouse</span>} >{stateDatas?.attached_warehouse}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Planner</span>} >{stateDatas?.planner}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Business Area</span>} >{stateDatas?.business_area}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Supplier</span>} >{stateDatas?.supplier}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Generic Code</span>} >{stateDatas?.generic_code}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Fabric Finish</span>} >{stateDatas?.fabricFinish}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Use In Operation</span>} >{stateDatas?.use_in_operation}</Descriptions.Item>

                    </Descriptions></Card></Col></Row>
                <br></br>
                <Row gutter={16}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                <Card title='Purchase Price Information' bordered={false}>
                <Descriptions column={2} style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Basic UOM</span>} >{stateDatas?.uom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Alt UOM</span>} >{stateDatas?.altuom}</Descriptions.Item>            
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Multiplication Factor</span>} >{stateDatas?.multiplication_factor}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Currency</span>} >{stateDatas?.currency}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Purchase Price Quantity</span>} >{stateDatas?.purchase_price_qty}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Sales Tax</span>} >{stateDatas?.sale_tax}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Excise Duty</span>} >{stateDatas?.excise_duty}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>License</span>} >{stateDatas?.liscence_type}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Property</span>} >{stateDatas?.property}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Is Sales Item</span>} >{stateDatas?.is_sale_item}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Supply Lead Time</span>} >{stateDatas?.supply_lead_time}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Hierarchy Level</span>} >{stateDatas?.hierarchy_level}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}> Price</span>} >{stateDatas?.price}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}> Tax %</span>} >{stateDatas?.tax}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}> Total</span>} >{stateDatas?.total}</Descriptions.Item>

                    </Descriptions>
                </Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                <Card title='Bill Of Material Data' bordered={false}> <Descriptions column={2} style={{ alignItems: 'right' }} >
                <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: '',whiteSpace: 'nowrap' }}>Consumption</span>}>
                 <span style={{ whiteSpace: 'nowrap' }}>
                 {stateDatas?.consumption}</span></Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170',whiteSpace: 'nowrap' }}>Wastage %</span>} >{stateDatas?.wastage}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Cost Group</span>} >{stateDatas?.cost_Group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Usage Remarks</span>} >{stateDatas?.remarks}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: '' }}>Delivery Terms</span>}>{stateDatas?.delivery_terms_name}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Delivery Method</span>} >{stateDatas?.delivery_method}</Descriptions.Item>

                    </Descriptions></Card>
                    
               </Col>
                </Row>
                          </span>
            
    
        </Card>
  
    )
}
export default RMDetailView
