import { Button, Card, Descriptions, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function PoDetailedview() {
    const [page,setPage] = useState<number>(1);
    const [sizeData, setSizeData] = useState<any[]>([])
    let location = useLocation();
    const stateData = location.state;


    console.log(sizeData)
    const columns: ColumnsType<any> = [
    {
      title: "S.No",
      key: "sno",
      responsive: ["sm"],
      width:130,
      render: (text,object,index) => (page - 1) * 10 + (index + 1)
    },
    {
      title: 'size Description',
      dataIndex: 'sizeDescription',
      width:180,
    },
    {
      title: 'size Quantity',
      dataIndex: 'sizeQty',
      width:180,
    },
    {
        title: 'Legal Po Quantity',
        dataIndex: 'legalPoQty',
        width:180,
        // sorter: (a, b) => a.sourceName.localeCompare(b.sourceName),
        // sortDirections: ["ascend", "descend"],
      },
    {
        title: 'Legal Po Price',
        dataIndex: 'legalPoPrice',
        width:180,
        // sorter: (a, b) => a.sourceName.localeCompare(b.sourceName),
        // sortDirections: ["ascend", "descend"],
      },
      {
        title: 'Legal Po Currency',
        dataIndex: 'legalPoCurrencyCode',
        width:180,
        // sorter: (a, b) => a.sourceName.localeCompare(b.sourceName),
        // sortDirections: ["ascend", "descend"],
      },
    {
      title: 'Actual ShippedQty',
      dataIndex: 'actualShippedQty',
      width:180,
    //   sorter: (a, b) => a.actualShippedQty.localeCompare(b.actualShippedQty),
    //   sortDirections: ["ascend", "descend"],
    },
    {
      title:'Co Price',
      dataIndex:'coPrice',
      width:20,
    },
    {
      title:'Crm Co Quantity',
      dataIndex:'CRMCoQty',
      width:20,
    },
    {
        title: 'Net Including Disc Currency Code',
        dataIndex: 'netIncludingDiscCurrencyCode',
        width:200,
        // sorter: (a, b) => a.description.localeCompare(b.description),
        // sortDirections: ["ascend", "descend"],
        // ...getColumnSearchProps('description'),
      },
  
    {
      title: 'Net Including Discount ',
      dataIndex: 'netIncludingDisc',
      width:200,
    //   sorter: (a, b) => a.description.localeCompare(b.description),
    //   sortDirections: ["ascend", "descend"],
    },
    {
        title: 'Trading CoNet Including Disc CurrencyCode',
        dataIndex: 'trConetIncludingDiscCurrencyCode',
        width:200,
        // sorter: (a, b) => a.description.localeCompare(b.description),
        // sortDirections: ["ascend", "descend"],
      },
    ];
    return(
        <Card title={<span style={{ color: 'black' }}> Detailed View - <span style={{color:'black'}}>{stateData?.data[0]?.purchaseOrderNumber?stateData?.data[0]?.purchaseOrderNumber:''
        }</span></span>}  headStyle={{ fontWeight: 'bold' }} extra={<Link to='/Reports/ppm-report' ><span style={{color:'white'}} ><Button className='panel_button' >View </Button> </span></Link>}>
            <span>
                <Descriptions  style={{ alignItems: 'right' }} column={4}>
                    <Descriptions.Item label={'Po + Line'}>{stateData.data[0].poAndLine}</Descriptions.Item>
                    <Descriptions.Item label={'Document Date'}>{stateData?.data[0]?.documentDate?moment(stateData.data[0].documentDate).format('YYYY-MM-DD'):'-'} </Descriptions.Item>
                    <Descriptions.Item label={'LineItem Status'}>{}</Descriptions.Item>
                    <Descriptions.Item label={'Document Type Code'}>{stateData?.data[0]?.docTypeCode?stateData?.data[0]?.docTypeCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Style Number'}>{stateData?.data[0]?.styleNumber?stateData?.data[0]?.styleNumber:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Product Code'}>{stateData?.data[0]?.productCode?stateData?.data[0]?.productCode:'-'}             </Descriptions.Item>
                    <Descriptions.Item label={'Color'}>{stateData?.data[0]?.colorDesc?stateData?.data[0]?.colorDesc:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Description'}>{}</Descriptions.Item>
                    <Descriptions.Item label={'Planning Season'}>{stateData?.data[0]?.planningSeasonCode?stateData?.data[0]?.planningSeasonCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'CO'}>{}</Descriptions.Item>
                    <Descriptions.Item label={'CO Final ApprovalDate'}>{stateData?.data[0]?.coFinalApprovalDate?moment(stateData.data[0].coFinalApprovalDate).format('YYYY-MM-DD'):'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Plan No'}>{stateData?.data[0]?.planNo?stateData?.data[0]?.planNo:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Category Code'}>{stateData?.data[0]?.categoryCode?stateData?.data[0]?.categoryCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Category Description'}>{stateData?.data[0]?.categoryDesc?stateData?.data[0]?.categoryDesc:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Destination'}>{stateData?.data[0]?.destinationCountry?stateData?.data[0]?.destinationCountry:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Country Code'}>{stateData?.data[0]?.destinationCountryCode?stateData?.data[0]?.destinationCountryCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'geo Code'}>{stateData?.data[0]?.geoCode?stateData?.data[0]?.geoCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Plant Code'}>{stateData?.data[0]?.plant?stateData?.data[0]?.plant:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Plant Name'}>{stateData?.data[0]?.plantName?stateData?.data[0]?.plantName:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'UPC'}>{stateData?.data[0]?.destinationCountryCode?stateData?.data[0]?.destinationCountryCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'MRGAC'}>{stateData?.data[0]?.MRGAC?stateData?.data[0]?.MRGAC:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'OGAC'}>{stateData?.data[0]?.OGAC?stateData?.data[0]?.OGAC:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'GAC'}>{stateData?.data[0]?.GAC?stateData?.data[0]?.GAC:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Shipping Type'}>{stateData?.data[0]?.shippingType?stateData?.data[0]?.shippingType:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Mode of transport'}>{stateData?.data[0]?.modeOfTransportationCode?stateData?.data[0]?.modeOfTransportationCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Transportation'}>{}</Descriptions.Item>
                    <Descriptions.Item label={'Inco Terms'}>{stateData?.data[0]?.inCoTerms?stateData?.data[0]?.inCoTerms:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Inventory Segment Code'}>{stateData?.data[0]?.inventorySegmentCode?stateData?.data[0]?.inventorySegmentCode:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Purchase Group Name'}>{stateData?.data[0]?.purchaseGroupName?stateData?.data[0]?.purchaseGroupName:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Total Item Quantity'}>{stateData?.data[0]?.totalItemQty?stateData?.data[0]?.totalItemQty:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Ship TO Address Legal po'}>{stateData?.data[0]?.shipToAddressLegalPO?stateData?.data[0]?.shipToAddressLegalPO:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Ship TO Address DIA'}>{stateData?.data[0]?.shipToAddressDIA?stateData?.data[0]?.shipToAddressDIA:'-'}</Descriptions.Item>
                    <Descriptions.Item label={'Diff Of Shipp TO Address'}>{}</Descriptions.Item>
                    <Descriptions.Item label={'CAB'}>{stateData?.data[0]?.CABCode?stateData?.data[0]?.CABCode:'-'}</Descriptions.Item>
                </Descriptions>
            </span>
            <Card>
     <Table columns={columns} 
      className="custom-table-wrapper"
     dataSource={stateData.data[0].sizeWiseData} 
     bordered
     rowKey={record => record.id}
        size='small'
       pagination={{
        onChange(current) {
          setPage(current);
        }
      }}
       />
            </Card>

        </Card>
    )
}
export default PoDetailedview;