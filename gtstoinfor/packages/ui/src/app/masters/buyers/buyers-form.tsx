
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
    // getAllPaymentMethods()
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
        message.success('Customer Details Created Successfully')
        onReset();
        navigate('/masters/buyers/buyers-view')
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
  // const onFocus = () => {
  //   console.log('focus');
  // }

  // const onSearch = (val) => {
  //   console.log('search:', val);
  // }
  // const onBlur = () => {
  //   console.log('blur');
  // }


 // props.customersData.currency=Number(props.customersData.currency);
  return (
    <>
    <Card title={props.isUpdate ? 'Update Buyer' : 'Add Buyer'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/buyers/buyers-view')} type={'primary'}>View</Button></span>} size='small'>
        <Form form={form} onFinish={saveData} initialValues={props.buyersData} layout="vertical">
          <Form.Item name="buyerId" style={{ display: "none" }} >
            <Input hidden />
          </Form.Item>
          <Form.Item style={{ display: "none" }} name="createdUser" initialValue={createdUser}>
            <Input hidden />
          </Form.Item>
          <Row gutter={16}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 14 }}>
            <Card size='small' bordered={false}>
              <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>PERSONAL DETAILS</h1>
              <Row gutter={8}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item
                  name="clientCode"
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item
                name="clientName"
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>

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
           
            </Row>
            <Row gutter={8}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
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
          
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
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
            </Row>
            <Row gutter={8}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item
                name="paymentMethodId"
                label="Payment Method"
                rules={[
                  {
                    required: true, message: 'Missing payment mode',
                  },
                ]}
              >
                {/* <Select
                  showSearch
                  // style={{ width: 200 }}
                  placeholder="Select Payment method"
                  optionFilterProp="children"
                  onChange={handlePaymentMode}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  defaultValue={'NA'}
                >
                  {paymentMethodData.map((e) => {
                    return <Option key={e.paymentMethodId} value={e.paymentMethodId}>{e.paymentMethod}</Option>
                  })}
                </Select> */}
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 12 }}>
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
            </Row>
            <Row gutter={8}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 12 }} xl={{ span: 12 }}>
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
            </Card>
            </Col>
            <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 10 }}>
            <Card size='small' bordered={false}>
              <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>ADDRESS</h1>
              <Row gutter={8}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
              <Form.Item
                name="countryId"
                label="Country"
                rules={[
                  {
                    required: true, message: 'Missing country',
                  },
                ]}
              >
                <Select
                  placeholder="Select Country"
                  // onChange={getSkuCode}
                  allowClear
                >
                  {countries.map(dropData => {
                    return <Option value={dropData.countryId}>{dropData.countryName}</Option>
                  })}
                </Select>
                {/* <Input/> */}
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
              <Form.Item
                name="state"
                label="State"
                rules={[
                  {
                    required: true, message: 'Missing state',
                  },
                ]}
              >
                <Input placeholder='Enter State'/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
              <Form.Item
                name="district"
                label="District"
                // rules={[
                //   {
                //     required: true, message: 'Missing district',
                //   },
                // ]}
              >
                <Input placeholder='Enter District'/>
              </Form.Item>
            </Col>
              </Row>
              <Row gutter={8}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
              <Form.Item
                name="city"
                label="City"
                rules={[
                  {
                    required: true, message: 'Missing city',
                  },
                ]}
              >
                <Input placeholder='Enter City'/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
              <Form.Item
                name="landmark"
                label="Landmark"
                rules={[
                  {
                    required: true, message: 'Missing landmark',
                  },
                ]}
              >
                <Input placeholder='Enter Landmark'/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
              <Form.Item
                name="lane1"
                label="Lane 1"
                rules={[
                  {
                    required: true, message: 'Missing lane1',
                  },
                ]}
              >
                <Input placeholder='Enter Lane 1'/>
              </Form.Item>
            </Col>
              </Row>
              <Row gutter={8}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
              <Form.Item
                name="lane2"
                label="Lane 2"
              >
                <Input placeholder='Enter Lane 2'/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
              <Form.Item
                name="pincode"
                label="Pincode"
                rules={[
                  {
                    required: true, message: 'Missing pincode',
                  },
                ]}
              >
                <Input placeholder='Enter Pincode'/>
              </Form.Item>
            </Col>
              </Row>
              {/* <Row gutter={8}>
              <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>Add Attributes</h1>
              </Row>
              <Row>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                <Button onClick={() => navigate('/masters/buyers/buyers-general-attributes-form')}>General</Button>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                <Button>Order</Button>
              </Col>
              </Row> */}
              </Card>
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

