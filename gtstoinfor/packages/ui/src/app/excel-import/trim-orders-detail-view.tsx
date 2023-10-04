import { Button, Card, Descriptions, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function TrimOrderDetailView() {
    const [page,setPage] = useState<number>(1);
    const [sizeData, setSizeData] = useState<any[]>([])
    let location = useLocation();
    const stateData = location.state;


    console.log(stateData,'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
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
        <Card title={<span style={{ color: 'black' }}> Order No : <span style={{color:'black'}}>{stateData?.data[0]?.order_no?stateData?.data[0]?.order_no:''
        }</span></span>}  headStyle={{ fontWeight: 'bold' }} extra={<Link to='/excel-import/trim-order' ><span style={{color:'white'}} ><Button type="primary">View </Button> </span></Link>}>
              {/* <Descriptions  style={{ alignItems: 'right' }} column={4}>
              <Descriptions.Item><span style={{fontWeight:"bold", fontSize:"15px"}}>Order Details</span></Descriptions.Item>
              </Descriptions> */}
              <Descriptions  style={{ alignItems: 'right' }} column={4}>
                <Descriptions.Item label={'Order Plan No'}>{stateData.data[0].order_plan_number}</Descriptions.Item>
                <Descriptions.Item label={`Order Qty Pc's`}>{stateData.data[0].order_qty_pcs} </Descriptions.Item>
                <Descriptions.Item label={'Month'}>{stateData.data[0].month}</Descriptions.Item>
                <Descriptions.Item label={'Revision No'}>{stateData?.data[0]?.revision_no?stateData?.data[0]?.revision_no:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Planned Season'}>{stateData?.data[0]?.planning_ssn?stateData?.data[0]?.planning_ssn:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Global Business Unit'}>{stateData?.data[0]?.global_business_unit?stateData?.data[0]?.global_business_unit:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Business Unit'}>{stateData?.data[0]?.business_unit?stateData?.data[0]?.business_unit:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Department'}>{stateData?.data[0]?.department?stateData?.data[0]?.department:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Revised Date'}>{stateData?.data[0]?.revised_date?stateData?.data[0]?.revised_date:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Document Status'}>{stateData?.data[0]?.document_status?stateData?.data[0]?.document_status:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Answered Status'}>{stateData?.data[0]?.answered_status?stateData.data[0].answered_status:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Vendor Person InCharge'}>{stateData?.data[0]?.vendor_person_incharge?stateData?.data[0]?.vendor_person_incharge:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Decision Date'}>{stateData?.data[0]?.decision_date?stateData?.data[0]?.decision_date:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Payment Terms'}>{stateData?.data[0]?.payment_terms?stateData?.data[0]?.payment_terms:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Contracted ETD'}>{stateData?.data[0]?.contracted_etd?stateData?.data[0]?.contracted_etd:'-'}</Descriptions.Item>
                <Descriptions.Item label={'ETA WH'}>{stateData?.data[0]?.eta_wh?stateData?.data[0]?.eta_wh:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Approver'}>{stateData?.data[0]?.approver?stateData?.data[0]?.approver:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Approval Date'}>{stateData?.data[0]?.approval_date?stateData?.data[0]?.approval_date:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Order Conditions'}>{stateData?.data[0]?.order_conditions?stateData?.data[0]?.order_conditions:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Remark'}>{stateData?.data[0]?.remark?stateData?.data[0]?.remark:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Year'}>{stateData?.data[0]?.year?stateData?.data[0]?.year:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Buyer Item No'}>{stateData?.data[0]?.buyer_item_number?stateData?.data[0]?.buyer_item_number:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Item Brand'}>{stateData?.data[0]?.item_brand?stateData?.data[0]?.item_brand:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Item Code'}>{stateData?.data[0]?.item_code?stateData?.data[0]?.item_code:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Item'}>{stateData?.data[0]?.item?stateData?.data[0]?.item:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Representative Sample Code'}>{stateData?.data[0]?.representative_sample_code?stateData?.data[0]?.representative_sample_code:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Sample Code'}>{stateData?.data[0]?.sample_code?stateData?.data[0]?.sample_code:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Color Code'}>{stateData?.data[0]?.color_code?stateData?.data[0]?.color_code:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Color'}>{stateData?.data[0]?.color?stateData?.data[0]?.color:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Pattern Dimension Code'}>{stateData?.data[0]?.pattern_dimension_code?stateData?.data[0]?.pattern_dimension_code:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Size Code'}>{stateData?.data[0]?.size_code?stateData?.data[0]?.size_code:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Size'}>{stateData?.data[0]?.size?stateData?.data[0]?.size:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Raw Material Code'}>{stateData?.data[0]?.raw_material_code?stateData?.data[0]?.raw_material_code:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Supplier Raw Material Code'}>{stateData?.data[0]?.supplier_raw_material_code?stateData?.data[0]?.supplier_raw_material_code:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Supplier Raw Material'}>{stateData?.data[0]?.supplier_raw_material?stateData?.data[0]?.supplier_raw_material:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Trim Item No'}>{stateData?.data[0]?.trim_item_no?stateData?.data[0]?.trim_item_no:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Trim Supplier'}>{stateData?.data[0]?.trim_supplier?stateData?.data[0]?.trim_supplier:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Trim Description'}>{stateData?.data[0]?.trim_description?stateData?.data[0]?.trim_description:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Vendor Code'}>{stateData?.data[0]?.vendor_code?stateData?.data[0]?.vendor_code:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Vendor'}>{stateData?.data[0]?.vendor?stateData?.data[0]?.vendor:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Management Factory Code'}>{stateData?.data[0]?.management_factory_code?stateData?.data[0]?.management_factory_code:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Management Factory'}>{stateData?.data[0]?.management_factory?stateData?.data[0]?.management_factory:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Branch Factory Code'}>{stateData?.data[0]?.branch_factory_code?stateData?.data[0]?.branch_factory_code:'-'}</Descriptions.Item>
                <Descriptions.Item label={'Branch Factory'}>{stateData?.data[0]?.branch_factory?stateData?.data[0]?.branch_factory:'-'}</Descriptions.Item>
              </Descriptions>
            <Card>
     {/* <Table columns={columns} 
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
      scroll={{ x: 'max-content' }}
       /> */}
            </Card>

        </Card>
    )
}
export default TrimOrderDetailView;