
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Card, Row, Col, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import { BuyerACcountTypes, BuyersDto, CountryDto, CurrencyDto, PaymentMethodDto, PaymentTermsDto } from '@project-management-system/shared-models';
import { BuyersService, CountryService, CurrencyService, PaymentMethodService, PaymentTermsService } from '@project-management-system/shared-services';
import { useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';

// const currencyService = new CurrencyService();

/* eslint-disable-next-line */
const { Option } = Select;

export interface BuyersFormProps {
  buyersData: BuyersDto;
  updateDetails: (customers: BuyersDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function BuyersForm(props: BuyersFormProps) {
  let accountTypes = BuyerACcountTypes;
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const buyerService = new BuyersService;
//   const paymentModeService = new PaymentmodesService;
  const [selectedpaymentmode, setSelectedPaymentModes] = useState<number>(null);
  const paymentMethodService =  new PaymentMethodService()
  const [paymentMethodData, setPaymentMethodData] = useState<PaymentMethodDto[]>([]);
  const countryService = new CountryService();
  const [countries, setCountries] = useState<CountryDto[]>([]);
  const currencyService = new CurrencyService()
  const [currencies, setCurrencies] = useState<CurrencyDto[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<number>(null);
  const [disable, setDisable] = useState<boolean>(false)
  const [paymentTerms,setPaymentTerms] = useState<PaymentTermsDto[]>([])
  const paymentTermsService = new PaymentTermsService()

  useEffect(() => {
    getAllActiveCountries()
    getAllActiveCurrencys()
    getAllPaymentMethods()
    getAllPaymentTerms()
  }, [])


  const getAllActiveCountries = () => {
    countryService.getAllActiveCountries().then((res) => {
      if (res.status) {
        setCountries(res.data);
      } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        setCountries([]);
      }
    })
      .catch((err) => {
        AlertMessages.getErrorMessage(err.message);
        setCountries([]);
      });
  }

  const getAllActiveCurrencys = () => {
    currencyService.getAllActiveCurrencys().then((res) => {
      if (res.status) {
        setCurrencies(res.data);
      } else {
          message.error(res.internalMessage);
        setCurrencies([]);
      }
    })
      .catch((err) => {
        message.error(err.message);
        setCurrencies([]);
      });
  }

  const getAllPaymentMethods = () => {
    paymentMethodService.getAllActiveMethod().then(res => {
      if(res.status){
        setPaymentMethodData(res.data)
      }
    })
  }

  const getAllPaymentTerms = () => {
    paymentTermsService.getAllPaymentTerms().then(res => {
      if(res.status){
        setPaymentTerms(res.data)
      }
    })
  }

  const handleCurrency = (value) => {
    setSelectedCurrency(value);
  }

  const saveBuyer = (buyersData: BuyersDto) => {
    buyersData.paymentMethodId = Number(buyersData.paymentMethodId)
    buyersData.createdUser = 'admin'
    setDisable(true)
    buyerService.createBuyer(buyersData).then(res => {
      setDisable(false)
      if (res.status) {
        message.success('Buyer Details Created Successfully')
        onReset();
        navigate('/global/buyers/buyers-view')
      } else {
        message.error(res.internalMessage)
      }
    }).catch(err => {
      setDisable(false)
      message.error(err)
    })
  }

  const handlePaymentMode = (value) => {
    setSelectedPaymentModes(value);
  }



  const saveData = (values: BuyersDto) => {
    setDisable(false)
    if (props.isUpdate) {
      props.updateDetails(values);
    } else {
      setDisable(false)
      saveBuyer(values);
    }

  };
  const onReset = () => {
    form.resetFields();
  };
  let createdUser = "";
  if (!props.isUpdate) {
    // createdUser = localStorage.getItem("createdUser");
    createdUser= 'admin'
  }

 // props.customersData.currency=Number(props.customersData.currency);
  return (
    <>
    <Card title={props.isUpdate ? 'Update Buyer' : 'Add Buyer'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/global/buyers/buyers-view')} type={'primary'}>View</Button></span>} size='small'>
        <Form form={form} onFinish={saveData} initialValues={props.buyersData} layout="vertical">
          <Form.Item name="buyerId" style={{ display: "none" }} >
            <Input hidden />
          </Form.Item>
          <Form.Item style={{ display: "none" }} name="createdUser" initialValue={createdUser}>
            <Input hidden />
          </Form.Item>
          <Row gutter={24}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item
                  name="buyerCode"
                  label="Buyer Code"
                  rules={[
                    {
                      required: true, message: 'Missing buyer code',
                    },
                    {
                      pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z\\0-9\[\]()@#$_\-+/`~{}:";'<>,.?|\s-]*$/,
                      message: `Invalid buyer code`
                    }
                  ]}
                >
                  <Input placeholder='Enter Buyer Code'/>
                </Form.Item>
              </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
              <Form.Item
                name="buyerName"
                label="Buyer Name"
                rules={[
                  {
                    required: true, message: 'Missing Buyer Name'
                  },
                  {
                    pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                    message: `Should contain only alphabets.`
                  }
                ]}
              >
                <Input placeholder='Enter Buyer Name'/>
              </Form.Item>  
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
              <Form.Item
                name="contactPerson"
                label="Contact Person"
                rules={[
                  {
                    required: true, message: 'Missing Contact Person'
                  },
                  {
                    pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                    message: `Don't Allow Spaces`
                  }
                ]}
              >
                <Input placeholder='Enter Contact Person'/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>

              <Form.Item
                name="phoneNo"
                label="Mobile No"
                rules={[
                  {
                    required: true,
                    message: 'Enter valid mobile number',
                    max:13,
                  },
                  {
                    pattern: /^[0-9]*$/,
                    message: `Don't Allow letters and Spaces`
                  }


                ]}
              >
                <Input placeholder='Enter Mobile Number'/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
              <Form.Item
                name="gstNumber"
                label="GST No"
                rules={[
                  {
                    required: false, message: 'Missing GST Number',
                  },
                  {
                    pattern: /^[^-\s][a-zA-Z0-9_\s-]*$/,
                    message: `Don't Allow Spaces`
                  }
                ]}
              >
                <Input placeholder='Enter GST Number'/>
              </Form.Item>
            </Col>
          
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: false,
                  },
                  {
                    pattern: /^[^-\s][a-zA-Z0-9_@.\s-]*$/,
                    message: `Don't Allow Spaces`
                  }
                ]}
              >
                <Input placeholder='Enter Email'/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
              <Form.Item
                name="currency"
                label="Currency"
                rules={[
                  {
                    required: true, message: 'Missing currency',
                  },
                ]}
              >
                <Select
                  placeholder="Select Currency"
                  // onChange={getSkuCode}
                  onChange={handleCurrency}
                  allowClear
                >
                  {currencies.map(curencyDropData => {
                    return <Option value={curencyDropData.currencyId} >{curencyDropData.currencyName}</Option>
                  })}
                </Select>
                {/* <Input /> */}
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
              <Form.Item
                name="paymentTermsId"
                label="Payment Terms"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                 <Select
                  placeholder="Select Payment Terms"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
                  {paymentTerms.map(e => {
                    return <Option key={e.paymentTermsId} value={e.paymentTermsId} >{e.paymentTermsName}</Option>
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
              <Form.Item
                name="shipmentTerms"
                label="Shipment Terms"
                rules={[
                  {
                    required: false,
                  },
                ]}
                initialValue='NA'
              >
                <Input  />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4}}>
              <Form.Item
                name="paymentMethodId"
                label="Payment Method"
                rules={[
                  {
                    required: true, message: 'Missing payment mode',
                  },
                ]}
              >
                <Select
                  showSearch
                  // style={{ width: 200 }}
                  placeholder="Select Payment method"
                  optionFilterProp="children"
                  onChange={handlePaymentMode}
                >
                  {paymentMethodData.map((e) => {
                    return <Option key={e.paymentMethodId} value={e.paymentMethodId}>{e.paymentMethod}</Option>
                  })}
                </Select>
                {/* <Input/> */}
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 4 }}>
              <Form.Item
                name="publicNote"
                label="Public Note"
                rules={[
                  {
                    required: false,
                  },
                  {
                    pattern: /^[^-\s][a-zA-Z0-9_\s-]*$/,
                    message: `Don't Allow Spaces`
                  }
                ]}

              >
                <TextArea rows={1} placeholder="Enter Public Note" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 4 }}>
              <Form.Item
                name="privateNote"
                label="Private Note"
                rules={[
                  {
                    required: false,
                  },
                  {
                    pattern: /^[^-\s][a-zA-Z0-9_\s-]*$/,
                    message: `Don't Allow Spaces`
                  }
                ]}
              >
                <TextArea rows={1} placeholder="Enter Private Note" />
              </Form.Item>
            </Col>
            </Row>
            <Row gutter={8}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 24 }}>
                <Form.List name='addressInfo' initialValue={[{}]}>
                  {(fields,{add,remove}) => (
                    <>
                      <Form.Item>
                        <Button type='dashed' style={{ backgroundColor: 'darkseagreen' }} onClick={() => add()} block icon={<PlusOutlined />}>Add Address</Button>
                      </Form.Item>
                      <Row gutter={8}>
                        {fields.map((field,index) => (
                          <Space key={field.key}>
                            <Form.Item {...field} name={[field.name,'addressId']} fieldKey={[field.key, 'id']} style={{display:'none'}}>
                            <Input hidden />
                            </Form.Item>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 24 }}>
                            <Form.Item  {...field} label='Country' name={[field.name, 'countryId']} fieldKey={[field.key, 'countryId']}
                              rules={[
                                {
                                  required: true, message: 'Missing country',
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select Country"
                                // onChange={getSkuCode}
                                showSearch
                                allowClear
                              >
                                {countries.map(dropData => {
                                  return <Option value={dropData.countryId}>{dropData.countryName}</Option>
                                })}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 24 }}>
                          <Form.Item {...field} label='State' name={[field.name, 'state']} fieldKey={[field.key, 'state']}
                            rules={[
                              {
                                required: true, message: 'Missing state',
                              },
                            ]}
                          >
                            <Input placeholder='Enter State'/>
                          </Form.Item>
                        </Col>
                        <Col>
                        <Form.Item {...field} label='District' name={[field.name, 'district']} fieldKey={[field.key, 'district']}
                          // rules={[
                          //   {
                          //     required: true, message: 'Missing district',
                          //   },
                          // ]}
                        >
                          <Input placeholder='Enter District'/>
                        </Form.Item>
                        </Col>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 24 }}>
                        <Form.Item {...field} label='City' name={[field.name, 'city']} fieldKey={[field.key, 'city']}
                          rules={[
                            {
                              required: true, message: 'Missing city',
                            },
                          ]}
                        >
                          <Input placeholder='Enter City'/>
                        </Form.Item>
                      </Col>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 24 }}>
                        <Form.Item {...field} label='Landmark' name={[field.name, 'landmark']} fieldKey={[field.key, 'landmark']}
                          rules={[
                            {
                              required: true, message: 'Missing landmark',
                            },
                          ]}
                        >
                          <Input placeholder='Enter Landmark'/>
                        </Form.Item>
                      </Col>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 24 }}>
                        <Form.Item {...field} label='Lane 1' name={[field.name, 'lane1']} fieldKey={[field.key, 'lane1']}
                          rules={[
                            {
                              required: true, message: 'Missing lane1',
                            },
                          ]}
                        >
                          <Input placeholder='Enter Lane 1'/>
                        </Form.Item>
                      </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 24 }}>
                          <Form.Item {...field} label='Lane 2' name={[field.name, 'lane2']} fieldKey={[field.key, 'lane2']}
                          >
                            <Input placeholder='Enter Lane 2'/>
                          </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 24 }}>
                          <Form.Item {...field} label='Pincode' name={[field.name, 'pincode']} fieldKey={[field.key, 'pincode']}
                            rules={[
                              {
                                required: true, message: 'Missing pincode',
                              },
                            ]}
                          >
                            <Input placeholder='Enter Pincode'/>
                          </Form.Item>
                        </Col>
                        {fields.length > 1 && (
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                        )}                        
                        </Space>
                        ))}
                      </Row>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
            <Row  gutter={24} justify={'end'}>
            { props.isUpdate === false && 
            
              <Col xs={{ span: 6 }} sm={{ span: 6}} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button onClick={onReset}>Reset</Button></Col>
            }
              <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span:2  }}><Button type='primary' htmlType='submit'>Submit</Button></Col>
            </Row>
        </Form>
      </Card>
    </>
  );

}



export default BuyersForm;

