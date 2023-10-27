 

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
                    <Descriptions.Item label={<span style={{ color:'#26678C' }}>Style</span>} >{stateData.styleNo}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#26678C' }}>ItemType</span>} >{stateData.itemTypeId}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#26678C' }}>Brand</span>} >{stateData.brandId}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#26678C' }}>Category</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#26678C' }}>Item Group</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#26678C' }}>Season</span>} >{stateData.seasonId}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#26678C' }}>Shahi Style</span>} >{stateData?.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#26678C' }}>Referenced</span>} >{stateData.referenceId}</Descriptions.Item>

                    </Descriptions>
</Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}><Card bordered={false} title='Profit Controllers'> <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Buying House Commission</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Licence</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Custom Group</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>National DBK%</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Rosl Group</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Group Tech Class</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Search Group</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Sales Person</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>No Of Lace Panel</span>} >{stateData.altUom}</Descriptions.Item>

                    </Descriptions></Card></Col>
                </Row><br></br>
                <Row gutter={16}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                <Card title='Performance Responsible Team' bordered={false}>
                <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Responsible</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Approve</span>} >{stateData.altUom}</Descriptions.Item>            
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Product Designer</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Production Merchant</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>PD Merchant</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Factory Merchant</span>} >{stateData.altUom}</Descriptions.Item>

                    </Descriptions>
                </Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                <Card title='Sales Price Information' bordered={false}> <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Basic UOM</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Alt UOM</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Conversion Factor</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Currency</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Sales Price</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Target Currency</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Projection Order</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Business Area</span>} >{stateData.altUom}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Composition</span>} >{stateData.altUom}</Descriptions.Item>
                    </Descriptions></Card></Col>
                </Row>
               
                <br></br>
                    <Row gutter={16}><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                <Card title='TNA' bordered={false}> <Descriptions  style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}></span>} >{stateData.altUom}</Descriptions.Item>
                    </Descriptions></Card></Col>
                    <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:12}}>
                    <Card title='Manufacturing Information' bordered={false}> <Descriptions style={{ alignItems: 'right' }} >
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Property</span>} >{stateData.altUom}</Descriptions.Item>
                    </Descriptions></Card></Col>
                    </Row>

                          </span>
            
    
        </Card>
  
    )
}
export default ItemCreationDetailView
