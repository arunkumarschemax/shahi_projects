
import { PriceListDto } from '@project-management-system/shared-models';
import { PriceListService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, Radio, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import PriceListUpload from './price-list-excel-upload';

export interface PriceListFormProps {
  Data: PriceListDto;
  updateData: (PriceList: PriceListDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export const PriceListForm = (props: PriceListFormProps) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const priceService = new PriceListService();
  const { state } = useLocation();
  const [disable, setDisable] = useState<boolean>(false);
  const [dataEntryType, setDataEntryType] = useState<'manual' | 'upload'>('manual'); // Track the data entry type

  useEffect(() => {
    if (state?.id) {
      form.setFieldsValue({ operationGroupId: state?.id });
    }
  }, [state]);

  const createPriceList = (Dto: PriceListDto) => {
    setDisable(true);
    priceService.createPriceList(Dto).then((res) => {
      setDisable(false);

      if (res.status) {
        AlertMessages.getSuccessMessage('Price List Created Successfully');
        navigate('/masters/pricelist/price-list-view');
        onReset();
      } else {
        if (res.status) {
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          message.error('Style, Destination details already existed');
        }
      }
      console.log(Dto,'lllllllllllllll')
    }).catch((err) => {
      setDisable(false);
      AlertMessages.getErrorMessage(err.message);
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const saveData = (values: PriceListDto) => {
    setDisable(false);
    if (props.isUpdate) {
      props.updateData(values);
    } else {
      setDisable(false);
      createPriceList(values);
    }
  };

  return (
    <Card title="Add Price List" extra={<span><Button onClick={() => navigate('/masters/pricelist/price-list-view')} type="primary">View</Button></span>}>
      <Row gutter={24}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
          <Radio.Group onChange={(e) => setDataEntryType(e.target.value)} value={dataEntryType} style={{ marginBottom: '16px' }}>
            <Radio.Button value="manual">Manual Entry</Radio.Button>
            <Radio.Button value="upload">Upload Excel</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      {dataEntryType === 'manual' ? (
        <Form form={form}  layout='vertical' onFinish={saveData} initialValues={props.Data} >
        <Form.Item name="id"  style={{display:"none"}} >
                  <Input hidden/>
                </Form.Item>
            <Row gutter={24}>

              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name='sampleCode' label='Style'   rules={[
              {
                required: true,
                message: 'Style is Required',

              },
              {
                //pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9_/`"-',.|\s-]*$/,
                message: `Invalid Style Name`
              }

              
            ]} >
                  <Input placeholder='Enter Style'/>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name='business' label='Destination '  rules={[
              {
                required: true,
                message: 'Destination is Required',

              },
              {
                //pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9_/`"-',.|\s-]*$/,
                message: `Invalid Destination`
              }

              
            ]}>
                  <Input placeholder='Enter Destination'/>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name='item' label='Item '  rules={[
              {
                required: true,
                message: 'Item is Required',

              },
              {
                //pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9_/`"-',.|\s-]*$/,
                message: `Invalid Item`
              }

              
            ]}>
                  <Input placeholder='Enter Item'/>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name='seasonCode' label='Season Code'
                 rules={[{
                  required: true,
                  message: 'Season Code is Required',
  
                },
                {
                  pattern: /^[A-Z]$/, 
                  message: 'Invalid Season Code all letters must be captial only'
                }
                  
                ]}>
                  <Input placeholder='Enter Season Code'/>
                </Form.Item>
              </Col>
             
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name='year' label='Year'
                rules={[{
                  required: true,
                  message: 'Year is Required',
  
                },
                  {
                    pattern: /^[0-9]+$/,
                    message: `Enter Numbers Only`
                  }
                ]}>
                  <Input placeholder='Enter Year'/>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name='fobLocalCurrency' label='Price ' 
                 rules={[ {
                  required: true,
                  message: 'Price is Required',
  
                },
                  {
                    pattern: /^\d+(\.\d{1,5})?$/, 
                    message: 'Enter a valid number look like this 123.1234',
                  },
                ]}
                >
                  <Input placeholder='Enter Price'/>
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name='currency' label='Currency 
                 '
                 rules={[{
                    required: true,
                    message: 'Currency is Required',
    
                  },
                  
                  {
                    pattern: /^[A-Z]{1,5}$/, 
                    message: 'Invalid Currency all letters must be captial only'
                  }
    
                  
                ]}>
                  <Input placeholder='Enter Currency'/>
                </Form.Item>
              </Col>
           
            </Row>
            <Row  gutter={24} justify={'end'}>
              <Col xs={{ span: 6 }} sm={{ span: 6}} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button onClick={onReset}>Reset</Button></Col>
              <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span:2  }}><Button type='primary' disabled={disable} htmlType='submit'>Submit</Button></Col>
            </Row>
        </Form>
      ) : (
        <PriceListUpload />
      )}
    </Card>
  );
};

export default PriceListForm;
