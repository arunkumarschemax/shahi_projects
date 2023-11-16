import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Row, Select, Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const PurchaseOrderView = () => {
  const page = 1;
  const [hideCancelButton, setHideCancelButton] = useState(false);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const { RangePicker } = DatePicker;
  let navigate = useNavigate();
  const Service = new PurchaseOrderservice()

  useEffect(() => {
    getPo();
  }, [])

  const getPo = () => {
    Service.getPurchaseOrder().then(res => {
      if (res.status) {
        setData(res.data)
      }
    })
  }
  const renderCellData = (data) => {
    return data ? data : "-";
  }

  // const DetailView = (rowData, cancel) => {
  //   const navigateData = filterData.filter(req => req.sample_request_id === rowData)
  //   return navigate(`/purchase-detali-view`, { state: { data: navigateData, cancelVisible: cancel } });
  // };
  const columns: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '20px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
   
    // {
    //   title: 'Po type',
    //   dataIndex: 'requestNumber',
    // },
    // {
    //   title: 'Indent Code ',
    //   dataIndex: 'indentCode',
    //   width:'80px',

    // },
    {
      title: 'PO Number',
      dataIndex: 'poNumber',
      width:'80px'
    },
    {
      title: 'Style',
      dataIndex: 'requestNumber',
    },
    // {
    //   title: <div style={{ textAlign: 'center' }}>Material Type</div>,
    //   dataIndex: "type",
    //   key: "type",
    //   align: 'center',
    //   width:'80px',

    //   render: (type, text) => {
    //     renderCellData(text)
    //     return (
    //       <Table
    //         dataSource={type}
    //         columns={[
    //           {
    //             dataIndex: "materialType",
    //             key: "materialType", align: 'center',
    //           },
    //         ]}
    //         pagination={false}
    //       />
    //     );
    //   }
    // },
    {
      title: 'Material Type',
      dataIndex: 'materialType',
      width:'80px'
    },
    {
      title: 'Po Date',
      dataIndex: 'orderDate',
      width:'80px',

      render: (text, record) => {
        return record.orderDate
          ? moment(record.orderDate).format('YYYY-MM-DD')
          : "";
      },
    },
    {
      title: 'VenderName',
      dataIndex: 'vendorName',
      width:'100px',

    },
    {
      title: 'Expected Date',
      dataIndex: 'deliveryDate',
      width:'100px',
      render: (text, record) => {
        return record.deliveryDate
          ? moment(record.deliveryDate).format('YYYY-MM-DD')
          : "";
      },
    },
    // {
    //   title: 'Aging',
    //   dataIndex: 'deliveryDate',
    //   render: (value, record) => {
    //     const currentDate = new Date();
    //     const deliveryDate = new Date(moment(record.deliveryDate).format('YYYY-MM-DD'));
    //     const aging = deliveryDate.getTime() - currentDate.getTime();
    //     const daysDifference = Math.ceil(aging / (1000 * 60 * 60 * 24)); // Use Math.ceil to round up to the nearest whole day
    //     const isAboveDueDate = daysDifference > 0;
    
    //     return (
    //       <>
    //         {isAboveDueDate ? '+' : ''}
    //         {Math.abs(daysDifference)}
    //       </>
    //     );
    //   }
    // },
    {
      title: 'Aging(EPD)',
      dataIndex:'aging',
      width:'20px',
      fixed: 'right',
      align:'right',
      render : (text,record) => {
          const age : any ={
              children:(moment(record.pickupDate).diff(moment(),'days')),
              props:{
                style:{
                  background:(moment(record.pickupDate).diff(moment(),'days'))>0?'#3BC744':'',
                 color:'black'
                }
              }
            }
            return age
      }
  },
    
    {
      title: 'Action',
      dataIndex: 'requestNumber',
      align: "center",
      width:'30px',
      render: (text, rowData, index) => (
        <span>
          <Tooltip placement="top" title="Detail View">
            <EyeOutlined
              onClick={() => {
                navigate('/purchase-detali-view')
                // setHideCancelButton(false);
                // DetailView(rowData.SampleRequestId, false);
              }}
              style={{ color: "blue", fontSize: 20 }}
            />
          </Tooltip>
        </span>
      ),

    },


  ]
  return (
    <div><Card title="Purchase Orders"  headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
      <Form>
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item label="Expected Date	" name="deliveryDate">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Po Date" name="orderDate">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button htmlType='submit' type="primary"> Get Detail </Button>
          </Col>
          <Col span={2}>
            <Button htmlType='reset' danger >Reset</Button>
          </Col>
        </Row>
        <Row gutter={24}>  
      <Col className="gutter-row" xs={24 } sm={ 24 } md={ 5 } lg={ 5} xl={{ span: 2}}>
                    <Card size="small" title={'OPEN :'  } style={{ height:'35px',width:100,backgroundColor:'#FFFFFF', borderRadius:3}}></Card>
                   </Col>
                   <Col className="gutter-row" xs={24 } sm={ 24 } md={ 5 } lg={ 5} xl={{ span: 3}}>
                   <Card size="small"title={'INPROGRESS  : ' } style={{ height:'35px',width:150,marginBottom:'8',backgroundColor:'#FFFFFF', borderRadius:3}}></Card>
                   </Col>
                    <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3}}>
                   <Card size="small"title={'CLOSED : ' } style={{ height:'35px',width:150,backgroundColor:'#FFFFFF',marginBottom:'2px', borderRadius:3}}></Card>                   
                   </Col>
                   <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3}}>
                   <Card size="small"title={'CANCLED : '} style={{ height:'35px',backgroundColor:'#FFFFFF',marginBottom:'2px', borderRadius:3}}></Card>                   
                   </Col> 
                   <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3}}>
                   <Card size="small"title={'TOTAL : '} style={{ height:'35px',backgroundColor:'#FFFFFF',marginBottom:'2px', borderRadius:3}}></Card>                   
                   </Col>    
               </Row>
      </Form>
      <Card>
        {/* <Table columns={columns} dataSource={data} bordered /> */}
        <Table columns={columns} dataSource={data} bordered size='small' />

      </Card>
    </Card>

    </div>
  )
}

export default PurchaseOrderView;

