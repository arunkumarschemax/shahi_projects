
 

import { FabricContentService, FactoryService, FobService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, message, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
// import FactoriesView from './factories-view';
import { AlertMessages, FabricContentdto, FactoryDto } from '@project-management-system/shared-models';
import Papa from 'papaparse'
import { FileExcelFilled, UndoOutlined } from '@ant-design/icons';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { CSVLink } from 'react-csv';

const { Option } = Select
export interface Formprops {
  Data: FabricContentdto;
  updateItem: (Data: FabricContentdto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}


const FabricContentForm = (props:Formprops) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const service = new FabricContentService();
  const [disable, setDisable] = useState<boolean>(false)
  //   const pathToreDirect = '/masters/fob-price-list-view'
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([])
  const loc = useLocation()
  const state = loc?.state;
  const [csvData, setcsvData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([]);
  const [type, setType] = useState<string>('')



  const create = (data: FabricContentdto) => {
    setDisable(true)
    service.createFabricContentplist(data).then(res => {
      setDisable(false)
      if (res.status) {
        AlertMessages.getSuccessMessage("Created Successfully")
        setTimeout(() => {
          navigate('/masters/fabric-content-view')
        }, 500);
      } else {
        AlertMessages.getErrorMessage("Data Already Exist")
      }
    }).catch(err => {
      setDisable(false)
      AlertMessages.getErrorMessage(err.message);
    })
  }

  // const handleUpload = async () => {
  //   try {
  //     form.validateFields().then(values => {
  //       const formData = new FormData();
  //       formData.append('file', selectedFile);
  //       if (data.length > 0) {
  //         service.uploadFobPrice(data).then(res => {
  //           if (res.status) {
  //             AlertMessages.getSuccessMessage("Created Successfully")
  //             setTimeout(() => {
  //               navigate('/masters/fabric-content-view')
  //             }, 500);
  //           } else {
  //             alert('Please upload right format file')
  //           }
  //         })
  //       } else {
  //         message.error('Please Upload File')
  //       }
  //     })

  //   } catch (error) {
  //     message.error(error.message)
  //   }
  // }


  const saveData = (values: FabricContentdto) => {
    setDisable(false)
    if (props.isUpdate) {
      props.updateItem(values);
    } else {
      setDisable(false)
      if (state.name === 'excel') {
      //  handleUpload()
      } else {
        create(values);
      }
    }
  };

  const submitForm = (values: FabricContentdto) => {
    setDisable(false)

    if (props.isUpdate) {
      props.updateItem(values)
    } else {
      setDisable(false)
      saveData(values)
    }
  }

  const onReset = () => {
    form.resetFields()
    setSelectedFile([])
  }

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.type === 'text/csv') {
  //     setSelectedFile(event.target.files[0]);
  //     Papa.parse(event.target.files[0], {
  //       header: true,
  //       complete: function (result) {
  //         {
  //           const columnArray = [];
  //           const valueArray = [];

  //           result.data.map((d) => {
  //             columnArray.push(Object.keys(d))
  //             valueArray.push(Object.values(d))
  //           });
  //           setData(result.data)
  //           setColumns(columnArray[0])
  //           setValues(valueArray)
  //         }
  //       }
  //     });
  //   } else {
  //     // Display an error message or take appropriate action for invalid file type
  //     alert('Please select a valid .csv file.');
  //     setSelectedFile(null);
  //   }
  // };

  // const onTypeChange = (value) => {
  //   setType(value)
  // }
  // let csvdata = [
  //   { 'Planning Season Code': '' },
  //       { 'Planning Season Year': '' },
  //       { 'Style Number': '' },
  //       { 'Color Code': '' },
  //       { 'Size Description': '' },
  //       { 'Shahi Confirmed Gross Price': '' },
  //       { 'Shahi Confirmed Gross Price currency code': '' },
  // ]
 

  return (

    <Card title={props.isUpdate ? 'Update Fabric Content ':'Fabric Content' } extra={(props.isUpdate === false) && <span> 
      {/* <Button type="default" style={{ color: 'green' , margin:10}} icon={<FileExcelFilled />}><CSVLink className="downloadbtn" filename="FOB-Sample-Format.csv" data={csvdata}>
      Download Sample Format </CSVLink></Button> */}
       <Button onClick={() => navigate('/masters/fabric-content-view')} type={'primary'}>View</Button></span>}>
      <Form form={form}
        // title='Fob Price List'
        layout='vertical'
        onFinish={submitForm}
        initialValues={props.Data} >
          
        <Row gutter={24}>
          <Form.Item name='id' hidden={true}>
            <Input />
          </Form.Item>
          {/* {
            state?.name === 'excel' ? (<>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item label="" name='excel' >
                  <input type="file" accept=".csv" onChange={handleFileChange} />
                  <label style={{color:'blue'}} >Only  CSV file allowed</label>

                </Form.Item>
              </Col>
            </>) : (<>

            </>)
          } */}

          {
            state?.name === 'new' || state == null ? (<>
              <Row gutter={24}>

              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item name='style' label='Style'
                    rules={[{ required: true, message: 'Style is Required', }]}>
                    <Input placeholder='Style '
                    />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item name='component' label='Component'
                    rules={[
                      { required: true, message: 'Planning Component is Required', },
                    
                   
                    {
                      pattern: /^[A-Z]+$/,
                      message: 'Please enter up to capital letters Only',
                    }
                    
                    ]}>
                    <Input placeholder='Component' />
                  </Form.Item>
                </Col>
            
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item name='fabricContent' label='Fabric Content'
                    rules={[{ required: true, message: 'Please enter the Fabric Content' },
                    ]}
                  >
                    <Input placeholder='Fabric Content' />
                  </Form.Item>
                </Col>
              </Row>
            </>) : (<></>)
          }


        </Row>
        {/* <Row gutter={24} justify={'end'}> */}
          {/* <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button onClick={onReset} style={{ color:'red' }}><UndoOutlined /> Reset</Button></Col>
          <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button type='primary' htmlType='submit' style={{ backgroundColor: ' green' }} >Submit</Button></Col> */}
        {/* </Row> */}

        <Row  gutter={24} justify={'end'}>
        <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span:2  }}><Button type='primary' disabled={disable} htmlType='submit'>Submit</Button></Col>
              <Col xs={{ span: 6 }} sm={{ span: 6}} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button type="primary"  onClick={onReset}><UndoOutlined />Reset</Button></Col>
            </Row>
      </Form>
    </Card>

  )
}
export default FabricContentForm

