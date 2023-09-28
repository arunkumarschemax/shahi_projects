import { FactoryService, FobService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, message,Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
// import FactoriesView from './factories-view';
import { AlertMessages, FactoryDto, Fobdto } from '@project-management-system/shared-models';
import Papa from 'papaparse'

const {Option} = Select
export interface Formprops {
  Data: Fobdto;
  updateItem: (Data:Fobdto ) => void;
  isUpdate: boolean;
  closeForm: () => void;
}


export  function FobPriceListForm( props:Formprops) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const service = new FobService();
  const [disable,setDisable] = useState<boolean>(false)
//   const pathToreDirect = '/masters/fob-price-list-view'
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([]);
  const [type,setType] = useState<string>('')
  const loc = useLocation()
  const state = loc?.state

  
  const create = (data: Fobdto) =>{
    setDisable(true)
      service.createFobplist(data).then(res => {
        setDisable(false)
        if(res.status){
          AlertMessages.getSuccessMessage("Created Successfully")
                  setTimeout(() => {
                      navigate('/masters/fob-price-list-view')
                  }, 500);
        }else {
          AlertMessages.getErrorMessage("Data Already Exist")
      }
      }).catch(err => {
        setDisable(false)
        AlertMessages.getErrorMessage(err.message);
      })
  }

  const handleUpload = async () => {
    try {
      form.validateFields().then(values => {
          const formData = new FormData();
          formData.append('file', selectedFile);
          if(data.length > 0){

            service.uploadFobPrice(data).then(res => {
              if(res.status){
                AlertMessages.getSuccessMessage("Created Successfully")
                    setTimeout(() => {
                        navigate('/masters/fob-price-list-view')
                    }, 500);
              } else{
                AlertMessages.getErrorMessage(res.internalMessage)
              }
            })
          } else{
            AlertMessages.getErrorMessage('Please Upload File')
          }
        })
  
  }catch (error) {
    message.error(error.message)
  }
}


  const saveData = (values: Fobdto) => {
    setDisable(false)
    if(props.isUpdate){
      props.updateItem(values);
    }else{
      setDisable(false)
      if(state.name === 'excel'){
        handleUpload()
      } else{
        create(values);
      }
    }
  };

 const submitForm = (values : Fobdto ) =>{
    setDisable(false)

    if(props.isUpdate){
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(event.target.files[0]);
      Papa.parse(event.target.files[0], {
        header: true,
        complete: function (result) {
          {
            const columnArray = [];
            const valueArray = [];

            result.data.map((d) => {
              columnArray.push(Object.keys(d))
              valueArray.push(Object.values(d))
            });
            setData(result.data)
            setColumns(columnArray[0])
            setValues(valueArray)
          }
        }
      });
    } else {
      // Display an error message or take appropriate action for invalid file type
      alert('Please select a valid .csv file.');
      setSelectedFile(null);
    }
  };

  const onTypeChange = (value) => {
    setType(value)
  }

  return (
    
    <Card title='Add Fob Price List' extra={<span><Button onClick={() => navigate('/masters/fob-price-list-view')} type={'primary'}>View</Button></span>}>
        <Form form={form}
         title='Factories'
          layout='vertical'
           onFinish={submitForm} 
           initialValues={props.Data} >
            <Row gutter={24}>
            <Form.Item name='id' hidden={true}>
                  <Input/>
                </Form.Item>
            {
              state?.name === 'excel' ? (<>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item label = "" name='excel'>
              <input type="file" accept=".csv" onChange={handleFileChange} />
            </Form.Item>
            </Col>
              </>) : (<>
             
              </>)
            }

            {
              state?.name === 'new' || state == null? (<>
               <Row gutter={24}>
                
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='planningSeasonCode' label='Planning Season Code'
                 rules={[{ required: true, message: 'Please enter the Planning Season Code', },
                    {
                        
                        message: 'Please enter a valid code ',
                      },
                  ]}>
                  <Input placeholder='Planning Season Code'/>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item name='planningSeasonYear' label='Planning Season Year'
                   rules={[
                            { required: true, message: 'Please enter the Planning Season Year', },
                           { pattern: /^[0-9]{4}$/,  
                            message: 'Please enter a valid 4-digit year', },
                           ]}>
                    <Input placeholder='Planning Season Year' /></Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='styleNumber' label='Style Number'
                                 rules={[{ required: true, message: 'Please enter the Style Number', }]}>
                <Input placeholder='Style Number'
                 />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='colorCode' label='Color Code'  rules={[{ required: true, message: 'Please enter the Color Code', },]}>
                <Input placeholder='Color Code'/>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='sizeDescription' label='Size Description'  rules={[{ required: true, message: 'Please enter the Color Code', },]}>
                <Input placeholder='Size Description'/>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='shahiConfirmedGrossPrice' label='Shahi Confirmed Gross Price'
                 rules={[{ required: true, message: 'Please enter the Color Code', },
                  { pattern: /^(?!0\d)(\d{1,5}(\.\d{2})?)?$/,  
                  message: 'Please enter a valid price 00.00 type is required', }
                 ]}>
                <Input placeholder='Shahi Confirmed Gross Price' />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='shahiConfirmedGrossPriceCurrencyCode' label='Shahi Confirmed Gross Price Currency Code'
                                 rules={[{ required: true, message: 'Please enter the Color Code' },
                                 {
                                    pattern: /^[A-Z]{0,5}$/,
                                    message: 'Please enter up to 5 capital letters',
                                  }
                                 ]}
                                  >
                <Input  placeholder='Shahi Confirmed Gross Price Currency Code'/>
                </Form.Item>
              </Col>
              </Row>
              </>) : (<></>)
            }
              
            
            </Row>
            <Row  gutter={24} justify={'end'}>
              <Col xs={{ span: 6 }} sm={{ span: 6}} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button onClick={onReset} style={{ backgroundColor: ' red' }}>Reset</Button></Col>
              <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span:2  }}><Button type='primary' htmlType='submit' style={{ backgroundColor: ' green' }} >Submit</Button></Col>
            </Row>
        </Form>
    </Card>
   
  )
}
export default FobPriceListForm;
