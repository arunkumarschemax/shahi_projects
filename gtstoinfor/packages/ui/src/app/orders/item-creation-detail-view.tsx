 import { Button, Card, Col, Descriptions, Row, Table } from "antd";
import moment from "moment";
import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export interface Props {
  data: any
}
export function ItemCreationDetailView  (props: Props)  {

    // const [page,setPage] = useState<number>(1);
    // const [sizeData, setSizeData] = useState<any[]>([])
    let location = useLocation();
    const stateData = location.state;

     console.log(stateData,"stateData")
    
   

      
    return(
        <Card title={<span style={{ color: 'white' }}>Item Creation<span style={{color:'#0A93E1  '}}></span></span>}  headStyle={{ fontWeight: 'bold' }} extra={<Link to='/materialCreation/item-creation-view' ><span style={{color:'white'}} >
          <Button className='panel_button' >Back </Button>
           </span></Link>}>
            <span>    
              <Row  gutter={16}>  
              <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}><Card bordered={false} headStyle={{ backgroundColor: 'transparent', color:'green' }}  title='Item Details'>
                <Descriptions column={2} style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ color:'#687170',fontWeight: 'bold' }}>Style</span>} >{stateData.style_no}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>ItemType</span>} >{stateData.item_type}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Brand</span>} >{(stateData.brand_name)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Category</span>} >{stateData.item_category}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Item Group</span>} >{stateData.item_group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Season</span>} >{stateData.season}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Shahi Style</span>} >{stateData?.style}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Referenced</span>} >{stateData.reference}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Item Code</span>} >{stateData.item_code}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#687170',fontWeight: 'bold' }}>Item Name</span>} >{stateData.item_name}</Descriptions.Item>

                    </Descriptions>
</Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}><Card headStyle={{ backgroundColor: 'transparent', color:'green' }} bordered={false} title='Profit Controllers'> <Descriptions column={2}  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Buying House</span>} >{stateData.buying_house}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Licence</span>} >{stateData.liscence_type}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Custom Group</span>} >{stateData.custom_group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>National DBK%</span>} >{stateData.national_dbk}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Rosl Group</span>} >{stateData.rosl_group}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Group Tech Class</span>} >{stateData.group_tech_class}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Search Group</span>} >{stateData.search_grp_name}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Sales Person</span>} >{stateData.sale_person_id}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>No Of Lace Panel</span>} >{stateData.no_of_lace_panel}</Descriptions.Item>

                    </Descriptions></Card></Col>
                    </Row>
                <br></br>
                <Row gutter={16}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                <Card title='Performance Responsible Team' headStyle={{ backgroundColor: 'transparent', color:'green' }}   bordered={false}>
                <Descriptions column={2} style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Responsible</span>} >{stateData.responsible_person}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Approve</span>} >{stateData.approver}</Descriptions.Item>            
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Product Designer</span>} >{stateData.product_designer}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Production Merchant</span>} >{stateData.pd_merchant}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Factory Merchant</span>} >{stateData.factory_merchant}</Descriptions.Item>

                    </Descriptions>
                </Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                <Card title='TNA' bordered={false} headStyle={{ backgroundColor: 'transparent', color:'green' }}> <Descriptions column={2} style={{ alignItems: 'right' }} >
                <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: '#687170',whiteSpace: 'nowrap' }}> Order Confirm Date</span>}>
                 <span style={{ whiteSpace: 'nowrap' }}>
                 {moment(stateData.order_confirmed_date).format('DD-MM-YYYY')}</span></Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170',whiteSpace: 'nowrap' }}>PCD</span>} >{moment(stateData.order_close_date).format('DD-MM-YYYY')}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>1stEx-Factory Date</span>} >{moment(stateData.first_ex_factory_date).format('DD-MM-YYYY')}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>FR TNA</span>} >-</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold', color: '#687170' }}>Total Order Qty</span>}>
                     {Number(stateData.order_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Range</span>} >{stateData.rangee}</Descriptions.Item>

                    </Descriptions></Card>
                    
               </Col>
                </Row>
               
                <br></br>
                    <Row gutter={16}><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                    <Card title='Sales Price Information' bordered={false} headStyle={{ backgroundColor: 'transparent', color:'green' }}> <Descriptions column={2} style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Basic UOM</span>} >{stateData.uom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Alt UOM</span>} >{stateData.alt_uom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Conversion Factor</span>} >{stateData.conversion_factor}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Currency</span>} >{stateData.currency_name}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Sales Price</span>} >{stateData.sale_price}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Target Currency</span>} >{stateData.target_currency}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Projection Order</span>} >{stateData.projection_order}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Business Area</span>} >{stateData.business_area}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Composition</span>} >{stateData.composition}</Descriptions.Item>
                    </Descriptions></Card>
             </Col>
                    <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                    <Card title='Manufacturing Information' headStyle={{ backgroundColor: 'transparent', color:'green' }} bordered={false}> <Descriptions style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#687170' }}>Property</span>} >{stateData.altUom}</Descriptions.Item>
                    </Descriptions></Card></Col>
                    </Row>

                          </span>
            
    
        </Card>
  
    )
}
export default ItemCreationDetailView
