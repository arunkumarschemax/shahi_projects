import { PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Col, Descriptions, Form, Modal, Row, Select, Table, Tooltip } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { type } from 'os';
import { ItemTypeEnumDisplay, PurchaseViewDto } from '@project-management-system/shared-models';
import PoPrint from './po-print';

export interface PoDetailViewPagesProps {
  purchaseOrderId:number
}

export const PurchaseOrderDetailsView = (props:PoDetailViewPagesProps) => {
  const [data, setData] = useState<any[]>([])
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const Service = new PurchaseOrderservice()
  const [form] = Form.useForm()
  const [material, setMaterial] = useState<any[]>([])
  const { Option } = Select
  const [drop, setDrop] = useState('')
  const location = useLocation()


  useEffect(() => {
    getPo();
    // getMaterialTypeDate();

  }, [props.purchaseOrderId])

  const renderCellData = (data) => {
    return data ? data : "-";
  }
  const getPo = () => {
    const req = new PurchaseViewDto(location.state)
    console.log(req, '-----------');

    // Service.getPurchaseOrder(req).then(res => {
    //   if (res.status) {
    //     setData(res.data)
    //   }
    // })
    Service.getPodetailsById(req).then(res => {
      if (res.status) {
        console.log(res.data)
        console.log(res.data.fabricInfo)
        setData(res.data)
      }
    })
  }
  // const getMaterialTypeDate = (() => {
  //   const req = new PurchaseViewDto(location.state)
  //   // console.log(req,'5555555555555555555555555')
  //   Service.getPAllPurchaseOrderData(req).then(res => {
  //     if (res.status) {
  //        console.log(res.data,'44444444444444444444444444')
  //       setMaterial(res.data)
  //     }
  //   })

  // })

  const onChange = ((value) => {
    setDrop(value)
    // console.log(value,'[[[[[[[[[[[[[[')
  })
  const itemColumns: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: 'Material Type',
      key: 'Material Type',
      dataIndex: 'po_material_type',
      render: (text) => {
        const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
        return EnumObj ? EnumObj.displayVal : text;
      },
    },
    {
      title: 'Item Code',
      key: 'Item Code',
      dataIndex: 'item_code',
      render: (m3FabricCode, row) => (
        <Tooltip title={row.description} placement="top" arrowPointAtCenter>
          <span className="fabCode">
            {`${row.item_code} - ${row.description}`}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'PO Quantity',
      key: 'PO Quantity',
      dataIndex: 'po_quantity',
    },
    {
      title: 'GRN Quantity',
      key: 'GRN Quantity',
      dataIndex: 'grn_quantity',
      render: (text, record) => {
        return (<span>{record.grn_quantity > 0 ? record.grn_quantity : 0}</span>)
      }
    },

    {
      title: 'Unit Price',
      key: 'Unit Price',
      dataIndex: 'unit_price',
    },
    {
      title: 'Discount %',
      key: 'Discount',
      dataIndex: 'discount',
      render: (text) => {
        return text !== undefined && text !== null ? text : '-';
      },
    },
    {
      title: 'Tax %',
      key: 'Tax %',
      dataIndex: 'taxPercentage',
    },
    {
      title: 'Total Amount',
      key: 'Tax %',
      dataIndex: 'subjective_amount',
    },

  ]
  // const column1 : any =[
  //   {
  //     title: 'S No',
  //     key: 'sno',
  //     width: '70px',
  //     responsive: ['sm'],
  //     render: (text, object, index) => (page - 1) * 10 + (index + 1),
  //     onCell: (record: any) => ({
  //       rowSpan: record.rowSpan,
  //     }),
  //     fixed: 'left',
  //   },
  //   {
  //     title: 'Indent Code',
  //     dataIndex: 'indentTrimId',
  //   },
  //   {
  //     title: 'Trim Code',
  //     dataIndex: 'm3trimCode',
  //   },
  //   // {
  //   //   title: 'M3 Code',
  //   //   dataIndex: 'm3trimCode',
  //   // },
  //   // {
  //   //   title: 'Colour',
  //   //   dataIndex: 'trimColor', 
  //   // },
  //   {
  //     title: 'Po Quantity',
  //     dataIndex: 'poQuantity',
  //   },

  //   {
  //     title: 'Grn Quantity',
  //     dataIndex: 'grnQuantity',
  //   }, {
  //     title: 'Status',
  //     dataIndex: 'trimItemStaus',
  //   },


  // ]

  // const columns : any=[
  //   {
  //     title: 'S No',
  //     key: 'sno',
  //     width: '70px',
  //     responsive: ['sm'],
  //     render: (text, object, index) => (page - 1) * 10 + (index + 1),
  //     onCell: (record: any) => ({
  //       rowSpan: record.rowSpan,
  //     }),
  //     fixed: 'left',
  //   },
  //   // {
  //   //   title: 'Fabric Type',
  //   //   dataIndex: 'trimtype',
  //   //   render: text => (text ? text : "-")

  //   // },
  //   {
  //     title: 'Fabric Code',
  //     key: 'Fabric Code',
  //     dataIndex: 'itemCode',
  //     render: text => (text ? text : "-")

  //   },
  //   // {
  //   //   title: 'M3 Code',
  //   //   dataIndex: 'm3fabricCode',
  //   // },
  //   // {
  //   //   title: 'Colour',
  //   //   dataIndex: 'fabricColor', 
  //   // },
  //   {
  //     title: 'Po Quantity',
  //     key: 'Po Quantity',
  //     dataIndex: 'poQuantity',
  //     render: text => (text ? text : "-")

  //   }, 
  //   {
  //     title: 'Grn Quantity',
  //     dataIndex: 'grn_quantity',
  //     render: text => (text ? text : "-")

  //   },
  //   // {
  //   //   title: 'Indent Quantity',
  //   //   dataIndex: 'indentQuantity',
  //   // },
  //   {
  //     title: 'Status',
  //     dataIndex: 'fabItemStatus',
  //     render: text => (text ? text : "-")

  //   },

  // ]

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const printOrder = () => {
    const divContents = document.getElementById('printme').innerHTML;
    const element = window.open('', '', 'height=700, width=1024');
    element.document.write(divContents);
    getCssFromComponent(document, element.document);
    element.document.close();
    element.print();
    element.close(); // to close window when click on cancel/Save
    setIsModalVisible(true); // model should be open
  };

  /**
 * get form data 
 * @param fromDoc 
 * @param toDoc 
 */
  const getCssFromComponent = (fromDoc, toDoc) => {
    Array.from(fromDoc.styleSheets).forEach((styleSheet: any) => {
      if (styleSheet.cssRules) { // true for inline styles
        const newStyleElement = toDoc.createElement('style');
        Array.from(styleSheet.cssRules).forEach((cssRule: any) => {
          newStyleElement.appendChild(toDoc.createTextNode(cssRule.cssText));
        });
        toDoc.head.appendChild(newStyleElement);
      }
    });
  }
  const openPrint = () => {
    setIsModalVisible(true);
  }

  return (
    <div>
      <Card>
        <Card title="PO Detail View" headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<span style={{ color: 'white' }} > <Button className='panel_button' onClick={openPrint}>Print</Button> <Button className='panel_button' onClick={() => navigate('/purchase-view')}>Po View</Button> </span>} >
          <Descriptions size='small' >

            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>PO Number</span>}>{data[0]?.po_number}</DescriptionsItem>
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>PO Date</span>}>{moment(data[0]?.purchase_order_date).format('YYYY-MM-DD')}
              {data[0]?.orderDates}</DescriptionsItem>
            {/* <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Material Type</span>}>{data[0]?.materialType}</DescriptionsItem> */}
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>PO Against</span>}>{data[0]?.po_against}</DescriptionsItem>
            {data[0]?.po_against === 'Sample Order' ? (            
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Sample Request No</span>}>{data[0]?.sample_req_no}</DescriptionsItem>
            ):(
              <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Indent No</span>}>{data[0]?.request_no}</DescriptionsItem>
              )}
            {/* <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Indent No</span>}>{data[0]?.Number}</DescriptionsItem> */}
            {data[0]?.po_against === 'Sample Order' ? (            
              <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Expected Delivery Date</span>}>{moment(data[0]?.date).format('YYYY-MM-DD')}</DescriptionsItem>
            ):(
              <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Indent Date</span>}>{moment(data[0]?.indent_date).format('YYYY-MM-DD')}</DescriptionsItem>
            )}
            {/* <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Indent Date</span>}>{moment(data[0]?.req_date).format('YYYY-MM-DD')}</DescriptionsItem> */}
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>Vendor Name</span>}>{data[0]?.vendor_name}</DescriptionsItem>
            <DescriptionsItem label={<span style={{ fontWeight: 'bold', color: 'darkblack' }}>ETD</span>}>{moment(data[0]?.expected_delivery_date).format('YYYY-MM-DD')}
            </DescriptionsItem>

            <DescriptionsItem label={<span style={{ marginBottom: '30px', fontWeight: 'bold', color: 'darkblack' }}>Delivery Address</span>}>
              {data[0]?.address}
            </DescriptionsItem>

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

          <Card >
            <Table
              rowKey={record => record.purchase_order_item_id}
              columns={itemColumns}
              pagination={{
                onChange(current) {
                  setPage(current);
                }
              }}
              dataSource={data}
            />
          </Card>
          {isModalVisible ?
            <Modal
              className='print-docket-modal'
              key={'modal' + Date.now()}
              width={'90%'}
              style={{ top: 30, alignContent: 'right' }}
              visible={isModalVisible}
              title={<React.Fragment>
              </React.Fragment>}
              onCancel={handleCancel}
              footer={[

              ]}
            >

              <PoPrint poId={props.purchaseOrderId} printOrder={printOrder} />
            </Modal> : ""}
        </Card>
      </Card>
    </div>
  )
}

export default PurchaseOrderDetailsView;