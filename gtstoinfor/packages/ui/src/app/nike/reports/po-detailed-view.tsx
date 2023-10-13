import { PpmDetails } from "@project-management-system/shared-models";
import { Button, Card, Descriptions, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export interface Props {
  data: any
}

export function PoDetailedview(props: Props) {
    const [page,setPage] = useState<number>(1);
    const [sizeData, setSizeData] = useState<any[]>([])
    let location = useLocation();
    // const stateData = location.state;



    

    const columns: ColumnsType<any> = [
    {
      title: "S.No",
      key: "sno",
      responsive: ["sm"],
      render: (text,object,index) => (page - 1) * 10 + (index + 1)
    },
    {
      title: 'size Description',
      dataIndex: 'sizeDescription',
    },
    {
      title: 'size Quantity',
      dataIndex: 'sizeQty',
    },
    {
      title: 'Trading Co Net including discounts',
      dataIndex: 'trConetIncludingDiscCurrencyCode',

    },
    {
      title: 'Trading CoNet Including Disc CurrencyCode',
      dataIndex: 'trConetIncludingDiscCurrencyCode',

    },
    {
      title: 'Legal Po Price',
      dataIndex: 'legalPoPrice',

    },
    {
      title: 'Legal Po Price Currency',
      dataIndex: 'legalPoCurrencyCode',

    },
    {
      title: 'Co Price',
      dataIndex: 'coPrice',
    
    },
    {
      title: 'Co Price Currency',
      dataIndex: 'coPriceCurrencyCode',
    },
    {
      title: 'Diff of Price',
      dataIndex: '',
    
    },
    {
      title: 'Diff of Price Currency',
      dataIndex: '',
    
    },
    {
      title: 'CRm Co Quantity',
      dataIndex: 'CRMCoQty',
   
    
    },
    {
      title: 'Legal Po Quantity',
       dataIndex: 'legalPoQty',

    },
    {
      title: 'Diff Of Quantity',
      dataIndex: '',
      
    },
    {
      title: 'Allowed Excess ship Quantity',
       dataIndex: '',
      
    },
    {
      title: 'Actual Shipped quantity',
      dataIndex: 'actualShippedQty',
    },
    {
      title: 'Actual Ship %',
      dataIndex: 'actualShippedQty',
    },
    {
        title: 'Net Including Disc Currency Code',
        dataIndex: 'netIncludingDiscCurrencyCode',
     },
    {
      title: 'Net Including Discount ',
      dataIndex: 'netIncludingDisc',
    },
  
    ];
    return(
        <Card title={<span style={{ color: 'black' }}> Detailed View - <span style={{color:'#0A93E1  '}}>{props?.data?.poLineProp?.purchaseOrderNumber?props?.data?.poLineProp?.purchaseOrderNumber:''
        }</span></span>}  headStyle={{ fontWeight: 'bold' }} extra={<Link to='/Reports/ppm-report' ><span style={{color:'white'}} >
          {/* <Button className='panel_button' >View </Button> */}
           </span></Link>}>
            <span>
                <Descriptions  style={{ alignItems: 'right' }} column={4}>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#26678C' }}>Po + Line</span>} >{props.data.poLineProp.poAndLine}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Document Date</span>} >{props.data.poLineProp.documentDate?moment(props.data.poLineProp.documentDate).format('YYYY-MM-DD'):'-'} </Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>LineItem Status</span>} >{props.data.poLineProp.DPOMLineItemStatus}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Document Type Code</span>} >{props.data.poLineProp.docTypeCode?props.data.poLineProp.docTypeCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Style Number</span>}>{props.data.poLineProp.styleNumber?props.data.poLineProp.styleNumber:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Product Code</span>}>{props.data.poLineProp.productCode?props.data.poLineProp.productCode:'-'}             </Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Color</span>}>{props.data.poLineProp.colorDesc?props.data.poLineProp.colorDesc:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Description</span>} >{}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Planning Season</span>}>{props.data.poLineProp.planningSeasonCode?props.data.poLineProp.planningSeasonCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>CO</span>}>{props.data.poLineProp.customerOrder}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>CO Final ApprovalDate</span>}>{props.data.poLineProp.coFinalApprovalDate?moment(props.data.poLineProp.coFinalApprovalDate).format('YYYY-MM-DD'):'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Plan No</span>}>{props.data.poLineProp.planNo?props.data.poLineProp.planNo:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Category Code</span>}>{props.data.poLineProp.categoryCode?props.data.poLineProp.categoryCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Category Description</span>}>{props.data.poLineProp.categoryDesc?props.data.poLineProp.categoryDesc:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Destination</span>}>{props.data.poLineProp.destinationCountry?props.data.poLineProp.destinationCountry:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Country Code</span>}>{props.data.poLineProp.destinationCountryCode?props.data.poLineProp.destinationCountryCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>geo Code</span>}>{props.data.poLineProp.geoCode?props.data.poLineProp.geoCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Plant Code</span>}>{props.data.poLineProp.plant?props.data.poLineProp.plant:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Plant Name</span>}>{props.data.poLineProp.plantName?props.data.poLineProp.plantName:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>UPC</span>}>{props.data.poLineProp.destinationCountryCode?props.data.poLineProp.destinationCountryCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>MRGAC</span>}>{props.data.poLineProp.MRGAC?props.data.poLineProp.MRGAC:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>OGAC</span>}>{props.data.poLineProp.OGAC?props.data.poLineProp.OGAC:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>GAC</span>}>{props.data.poLineProp.GAC?props.data.poLineProp.GAC:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Shipping Type</span>}>{props.data.poLineProp.shippingType?props.data.poLineProp.shippingType:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Mode of transport</span>}>{props.data.poLineProp.modeOfTransportationCode?props.data.poLineProp.modeOfTransportationCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Transportation</span>}>{props.data.poLineProp.modeOfTransportationCode}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Inco Terms</span>}>{props.data.poLineProp.inCoTerms?props.data.poLineProp.inCoTerms:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Inventory Segment Code</span>}>{props.data.poLineProp.inventorySegmentCode?props.data.poLineProp.inventorySegmentCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Purchase Group Name</span>}>{props.data.poLineProp.purchaseGroupName?props.data.poLineProp.purchaseGroupName:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Total Item Quantity</span>}>{props.data.poLineProp.totalItemQty?props.data.poLineProp.totalItemQty:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Ship TO Address Legal po</span>}>{props.data.poLineProp.shipToAddressLegalPO?props.data.poLineProp.shipToAddressLegalPO:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Ship TO Address DIA</span>}>{props.data.poLineProp.shipToAddressDIA?props.data.poLineProp.shipToAddressDIA:'-'}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>Diff Of Shipp TO Address</span>}>{}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ fontWeight: 'bold',color:'#0C486A' }}>CAB</span>}>{props.data.poLineProp.CABCode?props.data.poLineProp.CABCode:'-'}</Descriptions.Item>
                </Descriptions>
            </span>
            
     <Table columns={columns} 
      className="custom-table-wrapper"
       dataSource={props.data.poLineProp.sizeWiseData} 
     bordered
     rowKey={record => record.id}
        size='small'
      //  pagination={{
      //   onChange(current) {
      //     setPage(current);
      //   }
      // }}
      scroll={{ x: 'max-content' }}
       />
        </Card>
  
    )
}
export default PoDetailedview;