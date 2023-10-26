 

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


    console.log('welcome to detail view')
    console.log(stateData,'stateData')


    


    return(
        <Card title={<span style={{ color: 'black' }}>Item Creation Detailed View - <span style={{color:'#0A93E1  '}}></span></span>}  headStyle={{ fontWeight: 'bold' }} extra={<Link to='/materialCreation/item-creation-view' ><span style={{color:'white'}} >
          <Button className='panel_button' >Back </Button>
           </span></Link>}>
            <span>      
                <Row gutter={16}><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}><Card title='Item Details'>
                <Descriptions  style={{ alignItems: 'right' }} column={8}>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Po + Line</span>} >{stateData.altUom}</Descriptions.Item>
                    </Descriptions>
</Card></Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}><Card title='Profit Controllers'> <Descriptions  style={{ alignItems: 'right' }} column={8}>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Po + Line</span>} >{stateData.altUom}</Descriptions.Item>
                    </Descriptions></Card></Col>
                </Row>
                <Row>
                <Card title='Manufacturing Information'> <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}><Descriptions  style={{ alignItems: 'right' }} column={8}>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Po + Line</span>} >{stateData.altUom}</Descriptions.Item>
                    </Descriptions></Col></Card>
                <Card title='Performance Responsible Team'></Card>
                </Row>
                <Row>
                <Card title='Sales Price Information'> <Descriptions  style={{ alignItems: 'right' }} column={4}>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Po + Line</span>} >{stateData.altUom}</Descriptions.Item>
                    </Descriptions></Card>
                <Card title='TNA'> <Descriptions  style={{ alignItems: 'right' }} column={4}>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Po + Line</span>} >{stateData.altUom}</Descriptions.Item>
                    </Descriptions></Card></Row>

                          </span>
            
    
        </Card>
  
    )
}
export default ItemCreationDetailView
