 

import { Button, Card, Col, Descriptions, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export interface Props {
  data: any
}
export function ItemCreationDetailView  (props: Props)  {

    const [page,setPage] = useState<number>(1);
    const [sizeData, setSizeData] = useState<any[]>([])
    let location = useLocation();
    const stateData = location.state;
    console.log(stateData,"stateData")

    return(
        <Card title={<span style={{ color: 'black' }}>Item Creation Detailed View - <span style={{color:'#0A93E1  '}}></span></span>}  headStyle={{ fontWeight: 'bold' }} extra={<Link to='/materialCreation/item-creation-view' ><span style={{color:'white'}} >
          <Button className='panel_button' >Back </Button>
           </span></Link>}>
            <span>      
                <Row gutter={16}><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}><Card bordered={false} title='Item Details'>
                <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ color:'' }}>Style</span>} >{stateData.styleNo}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'' }}>ItemType</span>} >{stateData.itemTypeId}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'' }}>Brand</span>} >{stateData.brandId}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'' }}>Category</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'' }}>Item Group</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'' }}>Season</span>} >{stateData.seasonId}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'' }}>Shahi Style</span>} >{stateData?.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'' }}>Referenced</span>} >{stateData.referenceId}</Descriptions.Item>

                    </Descriptions>
</Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}><Card bordered={false} title='Profit Controllers'> <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Buying House Commission</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Licence</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Custom Group</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>National DBK%</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Rosl Group</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Group Tech Class</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Search Group</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Sales Person</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>No Of Lace Panel</span>} >{stateData.altUom}</Descriptions.Item>

                    </Descriptions></Card></Col>
                </Row><br></br>
                <Row gutter={16}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                <Card title='Performance Responsible Team' bordered={false}>
                <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Responsible</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Approve</span>} >{stateData.altUom}</Descriptions.Item>            
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Product Designer</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Production Merchant</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>PD Merchant</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Factory Merchant</span>} >{stateData.altUom}</Descriptions.Item>

                    </Descriptions>
                </Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                <Card title='TNA' bordered={false}> <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Order Confirmation Date</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>PCD</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>1stEx-Factory Date</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>FR TNA</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Total Order Qty</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'revert-layer',color:'' }}>Range</span>} >{stateData.altUom}</Descriptions.Item>

                    </Descriptions></Card>
                    
               </Col>
                </Row>
               
                <br></br>
                    <Row gutter={16}><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                    <Card title='Sales Price Information' bordered={false}> <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Basic UOM</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Alt UOM</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Conversion Factor</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Currency</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Sales Price</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Target Currency</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Projection Order</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Business Area</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'' }}>Composition</span>} >{stateData.altUom}</Descriptions.Item>
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
