import { Button, Card, Col, Form, Input, Row, Select, Table } from 'antd'
import React, { useState } from 'react'
import MyModal from './m3-model'
import Upload from 'antd/es/upload/Upload'
import { UploadOutlined } from '@ant-design/icons'

interface Tbl {
  styleno: string,
  color: string,
  gmtQty:string,
  consumption:string
  wastage:string
  fabQty:string
  UOM:string
  remarks:string
  itemUnit: number,
  unitPrice: number,
  totalAmount: number
  
}


export const  FabricDevelopmentRequestQuality = () => {
  

const [maintenanceTableRows, setMaintenanceTableRows] = useState<Tbl[]>
([{
  styleno: '',
  color: '',
  gmtQty:'',
  consumption:'',
  wastage:'',
  fabQty:'',
  UOM:'',
  remarks:'',
  itemUnit: 0,
  unitPrice: 0,
  totalAmount: 0
}]);
  const [form] = Form.useForm();
  const [tblkey, setTblkey] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };




  const changeitemstyleno = (styleno: string, index: number) => {
    const data = maintenanceTableRows;
    data[index].styleno = styleno;
    setMaintenanceTableRows(data)
}
const changeitemcolor = (color: string, index: number) => {
    const data = maintenanceTableRows;
    data[index].color = color;
    setMaintenanceTableRows(data)
}

const changegmtQty = (gmtQty:string, index: number) => {
  const data = maintenanceTableRows;
  data[index].gmtQty = gmtQty;
  setMaintenanceTableRows(data)
  
}

const changeconsumption = (consumption:string, index: number) => {
  const data = maintenanceTableRows;
  data[index].consumption = consumption;
  setMaintenanceTableRows(data)
}

const changewastage = (wastage:string, index: number) => {
  const data = maintenanceTableRows;
  data[index].wastage = wastage;
  setMaintenanceTableRows(data)
}

const changefabQty = (fabQty:string, index: number) => {
  const data = maintenanceTableRows;
  data[index].fabQty = fabQty;
  setMaintenanceTableRows(data)
}
const changeUOM = (UOM:string, index: number) => {
  const data = maintenanceTableRows;
  data[index].UOM = UOM;
  setMaintenanceTableRows(data)
}

const changeremarks = (remarks:string, index: number) => {
  const data = maintenanceTableRows;
  data[index].remarks = remarks;
  setMaintenanceTableRows(data)
}
const changeitemUnit = (itemUnit: number, index: number) => {
    const data = maintenanceTableRows;
    data[index].itemUnit = itemUnit;
    setMaintenanceTableRows(data)
    setTblkey(prestate => prestate + 1)
}
const changeunitPrice = (unitPrice: number, index: number) => {
    const data = maintenanceTableRows;
    data[index].unitPrice = unitPrice;
    setMaintenanceTableRows(data)
    setTblkey(prestate => prestate + 1)
}

  const columns = [


    {
      title: 'Style No',
      dataIndex: 'styleno',
      key: 'styleno',
      render: (text: any, record: any, index: number) => (
          <div style={{ display: 'flex'}}>
              <Form.Item name={[index, 'styleno']} initialValue={text}>
                  <Input placeholder="Style No" onChange={(e) => changeitemstyleno(e.target.value, index)} />
              </Form.Item>
              <Button type="primary" onClick={showModal} > Map items</Button>
               <MyModal visible={modalVisible} onClose={closeModal} />
          </div>
      ),
  },

    {
      title: 'Color',
      dataIndex: 'color',
      // width: 200,
      key: 'color',
      render: (text: any, record: any, index: number) => (
          <Form.Item name={[ index, 'color']} initialValue={text}>
              <Input placeholder="Color " onChange={(e) => changeitemcolor(e.target.value, index)} />

          </Form.Item>
      ),
  },
    
    {
      title: 'Garment Qty',
      dataIndex: 'gmtQty',
      // width: 200,
      key: 'gmtQty',
      render: (text: any, record: any, index: number) => (
          <Form.Item name={[ index, 'gmtQty']} initialValue={text}>
              <Input placeholder="Garment Qty" onChange={(e) => changegmtQty(e.target.value, index)} />

          </Form.Item>
      ),
  },
  {
    title: 'Consumption(YY)',
    dataIndex: 'consumption',
    // width: 200,
    key: 'consumption',
    render: (text: any, record: any, index: number) => (
        <Form.Item name={[ index, 'consumption']} initialValue={text}>
            <Input placeholder="Consumption" onChange={(e) => changeconsumption(e.target.value, index)} />

        </Form.Item>
    ),
},
{
  title: 'Wastage(X%)',
  dataIndex: 'wastage',
  // width: 200,
  key: 'wastage',
  render: (text: any, record: any, index: number) => (
      <Form.Item name={[ index, 'wastage']} initialValue={text}>
          <Input placeholder="Wastage" onChange={(e) => changewastage(e.target.value, index)} />

      </Form.Item>
  ),
},
{
  title: 'Fabic Qty',
  dataIndex: 'fabQty',
  // width: 200,
  key: 'fabQty',
  render: (text: any, record: any, index: number) => (
      <Form.Item name={[ index, 'fabQty']} initialValue={text}>
          <Input placeholder="Fabric Qty" onChange={(e) => changefabQty(e.target.value, index)} />

      </Form.Item>
  ),
},
{
  title: 'UOM',
  dataIndex: 'UOM',
  width: 150,
  key: 'UOM',
  render: (text: any, record: any, index: number) => (
      <Form.Item name={[ index, 'UOM']} initialValue={text}>
          <Select placeholder="Select UOM" onChange={(e) => changeUOM(e.target.value, index)}></Select>

      </Form.Item>
  ),
},
{
  title: 'Remarks',
  dataIndex: 'remarks',
  // width: 200,
  key: 'remarks',
  render: (text: any, record: any, index: number) => (
      <Form.Item name={[ index, 'remarks']} initialValue={text}>
          <Input placeholder="Remarks" onChange={(e) => changeremarks(e.target.value, index)} />

      </Form.Item>
  ),
},
{
  title: 'File',
  dataIndex: 'File',
  // width: 200,
  key: 'File',
  render: (text: any, record: any, index: number) => (
      <Form.Item name={[ index, 'File']} >
        <Upload>
          <Button icon={<UploadOutlined />}>
            Choose File
          </Button>
        </Upload>

      </Form.Item>
  ),
},




  
    // {
    //     title: 'Item Unit',
    //     dataIndex: 'itemUnit',
    //     key: 'itemUnit',
    //     render: (text: any, record: any, index: number) => (
    //         <Form.Item name={['packingListTable', index, 'itemUnit']} initialValue={text}
    //             rules={[
    //                 {
    //                     required: true,

    //                 },
    //             ]}>
    //             <Input placeholder=" 0.00" onChange={(e) => changeitemUnit(Number(e.target.value), index)} />
    //         </Form.Item>
    //     ),
    // },
    // {
    //     title: 'Unit Price',
    //     dataIndex: 'unitPrice',
    //     key: 'unit Price',
    //     render: (text: any, record: any, index: number) => (
    //         <Form.Item name={['packingListTable', index, 'unitPrice']} initialValue={text}
    //             rules={[
    //                 { required: true },

    //             ]}

    //         >
    //             <Input placeholder="0.00 " onChange={(e) => changeunitPrice(Number(e.target.value), index)} />
    //         </Form.Item>
    //     ),
    // },
    // {
    //     title: 'Total Amount',
    //     dataIndex: 'totalAmount ',
    //     key: 'totalAmount',
    //     width: 200,
    //     render: (text: any, record: any, index: number) => {
    //         console.log(record)
    //         const itemUnit = parseFloat(record.itemUnit);
    //         const unitPrice = parseFloat(record.unitPrice);
    //         const totalAmount = (itemUnit * unitPrice).toFixed(2);

    //         return <span>{totalAmount}</span>;
    //     },

    // },


];
 
  const colums1 = [
    {
     title: "S.No" 
    },
    {
      title: "Submission" 
     },
     {
      title: "Date" 
     },
     {
      title: "Expected 1st Submited By" 
     },
     {
      title: "Remarks" 
     },
     {
      title: "Status" 
     },
  ]
  
  

  return (
    <Card>
      <Form
         style={{ fontSize: "10px" }}
          layout="vertical"
        >
      <Row gutter={12}>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 4 }}
                  >
                    <Form.Item
                      label="Placement"
                      name ="placement"
                    >
                      <Input placeholder="Placement" allowClear/>
                    </Form.Item>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 4 }}
                  >
                    <Form.Item
                      label="Width"
                      name ="width"
                    >
                      <Input placeholder="width" allowClear/>
                    </Form.Item>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 4 }}
                  >
                    <Form.Item
                      label="Fabric Description"
                      name="fabricdescription"
                    >
                      <Input placeholder="Fabric Description" allowClear/>
                    </Form.Item>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 4 }}
                  >
                    <Form.Item
                      label="Fabric Code"
                      name = "fabriccode"
                    >
                      <Input placeholder="Fabric Code" allowClear/>
                    </Form.Item>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 4 }}
                  >
                    <Form.Item
                      label="Description"
                      name="description"
                    >
                      <Input.TextArea  rows={1} placeholder="Description" allowClear/>
                    </Form.Item>
                  </Col>
                  
                  {/* <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 6 }}
                    lg={{ span: 6}}
                    xl={{ span: 5 }}
                  >
                 
                 <div>
               <Button type="primary" onClick={showModal} > M3</Button>
               <MyModal visible={modalVisible} onClose={closeModal} />
                </div>
                
                  </Col> */}

      </Row>

        </Form>
         
        <Table columns={columns} dataSource={maintenanceTableRows}   scroll={{x:"max-content"}} pagination={false} />
        <br></br>
        <br></br>
        <Table columns={colums1}   />

    </Card>
  )
}

export default FabricDevelopmentRequestQuality 