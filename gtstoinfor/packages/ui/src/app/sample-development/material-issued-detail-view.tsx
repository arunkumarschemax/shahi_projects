import { PurchaseOrderservice, SampleDevelopmentService } from '@project-management-system/shared-services';
import { Button, Card, Col, Descriptions, Form, Modal, Row, Select, Table } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { type } from 'os';
import { MaterailViewDto, PurchaseViewDto } from '@project-management-system/shared-models';

export interface MaterailDetailViewPagesProps {
    sample_request_id:number
}

// export const PurchaseOrderDetailsView = (props:PoDetailViewPagesProps) => {
    export const MaterialIssuesDetailsView = (props:MaterailDetailViewPagesProps) => {

  const [data, setData] = useState<any[]>([])
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const page = 1
  const navigate = useNavigate();
  const service = new SampleDevelopmentService();
  const [form] = Form.useForm()
  const [material, setMaterial] = useState<any[]>([])
  const { Option } = Select
  const [drop, setDrop] = useState('')
  const location = useLocation()
  const [sampleData, setSampleData] = useState<any[]>([]);


  useEffect(() => {
    // if(location?.state?.sample_request_id){
      getAllData()

    // }

  },[])
  // ,[props.sample_request_id])
console.log(location.state,"namuuuuuuuuuuuuuu");

  const getAllData = () => {
    const req = new MaterailViewDto(location?.state)
    service.getbyID(req).then((res) => {
        if(res.status){

            // setSampleData(res.data);
        // console.log(res.data, "?????????????????????????????");
        setData(res.data)

        }
    })
}
//   }, [props.purchaseOrderId])

console.log(data,"LLLLLLLLLLLLL");

  const renderCellData = (data) => {
    return data ? data : "-";
  }

  const onChange = ((value) => {
    setDrop(value)
    // console.log(value,'[[[[[[[[[[[[[[')
  })
//   const itemColumns: any = [
//     {
//       title: 'S No',
//       key: 'sno',
//       width: '70px',
//       responsive: ['sm'],
//       render: (text, object, index) => (page - 1) * 10 + (index + 1),
//       onCell: (record: any) => ({
//         rowSpan: record.rowSpan,
//       }),
//       fixed: 'left',
//     },
//     {
//       title: 'Material Type',
//       key: 'Material Type',
//       dataIndex: 'po_material_type',
//     },
//     {
//       title: 'Item Code',
//       key: 'Item Code',
//       dataIndex: 'item_code',
//     },
//     {
//       title: 'PO Quantity',
//       key: 'PO Quantity',
//       dataIndex: 'po_quantity',
//     },
//     {
//       title: 'GRN Quantity',
//       key: 'GRN Quantity',
//       dataIndex: 'grn_quantity',
//       render: (text, record) => {
//         return (<span>{record.grn_quantity > 0 ? record.grn_quantity : 0}</span>)
//       }
//     },

//     {
//       title: 'Unit Price',
//       key: 'Unit Price',
//       dataIndex: 'unit_price',
//     },
//     {
//       title: 'Discount %',
//       key: 'Discount',
//       dataIndex: 'discount',
//     },
//     {
//       title: 'Tax %',
//       key: 'Tax %',
//       dataIndex: 'tax',
//     },
//     {
//       title: 'Total Amount',
//       key: 'Tax %',
//       dataIndex: 'subjective_amount',
//     },

//   ]


  const handleCancel = () => {
    setIsModalVisible(false);
  };



  /**
 * get form data 
 * @param fromDoc 
 * @param toDoc 
 */
  
  const openPrint = () => {
    setIsModalVisible(true);
  }

  return (
    <div>
      <Card>
        <Card title="Material Detail View" headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
        extra={<span style={{ color: 'white' }} >  <Button className='panel_button' onClick={() => navigate('/masters/material-issued-view')}>Material Issued View</Button> </span>} >
          <Descriptions size='small' >
          <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Status</span>}>{data[0]?.STATUS || "-"}</DescriptionsItem>

            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Remarks</span>}>{data[0]?.reamrks || "-"}
              </DescriptionsItem>

              <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>User</span>}>{data[0]?.user || "-"}</DescriptionsItem>
              <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Cost Ref</span>}>{data[0]?.costRef || "-"}</DescriptionsItem>
              <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Contact</span>}>{data[0]?.contact || "-"}</DescriptionsItem>
              <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Extension</span>}>{data[0]?.extension || "-"}</DescriptionsItem>
              <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Sam Value</span>}>{data[0]?.samValue || "-"}</DescriptionsItem>
              {/* <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Description</span>}>{data[0]?.description}</DescriptionsItem> */}

            {/* <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Material Type</span>}>{data[0]?.materialType}</DescriptionsItem> */}
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Expected DeliveryDate:</span>}>{moment(data[0]?.expected_delivery_date || "-").format('YYYY-MM-DD')}
            </DescriptionsItem>
            {/* <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Country Name:</span>}>{data[0]?.country_name}</DescriptionsItem> */}
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Colour:</span>}>{data[0]?.colour || "-"}</DescriptionsItem>
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Style: </span>}>{data[0]?.style || "-"}</DescriptionsItem>
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Pch: </span>}>{data[0]?.profit_control_head || "-"}</DescriptionsItem>
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Tech Name:</span>}>{data[0]?.techName || "-"}</DescriptionsItem>
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Total Requirement:</span>}>{data[0]?.total_requirement || "-"}</DescriptionsItem>
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Consumption:</span>}>{data[0]?.consumption || "-"}</DescriptionsItem>
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Item Type</span>}>{data[0]?.item_type || "-"}</DescriptionsItem>
            {/* <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Location</span>}>{data[0]?.location || "-"}</DescriptionsItem> */}

          

          </Descriptions>

          {/* <Form form={form}>
                  <Row>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 5 }}>
                          <Form.Item label='Material Type' name='materialType'>
                              <Select showSearch allowClear optionFilterProp="children" placeholder='Select Operation' onChange={onChange}>
                                  {
                                      material.map(e => {
                                          return (
                                              <Option key={e.purchaseOrderId} value={e.materialType}>{e.materialType}</Option>
                                          )
                                      })
                                  }

                              </Select>
                          </Form.Item>
                      </Col>
                  </Row>
            </Form> */}

          
          {/* {isModalVisible ?
            <Modal
              key={'modal' + Date.now()}
              width={'100%'}
              style={{ top: 30, alignContent: 'right' }}
              visible={isModalVisible}
              title={<React.Fragment>
              </React.Fragment>}
              onCancel={handleCancel}
              footer={[

              ]}
            >

            </Modal> : ""} */}
        </Card>
      </Card>
    </div>
  )
}

export default MaterialIssuesDetailsView;