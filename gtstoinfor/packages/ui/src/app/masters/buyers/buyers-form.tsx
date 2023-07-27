
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Card, Row, Col, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import { BuyerACcountTypes, BuyersDto, CurrencyDto } from '@project-management-system/shared-models';
import { BuyersService, CurrencyService } from '@project-management-system/shared-services';
import { useNavigate } from 'react-router-dom';

// const countryService = new CountryService();
// const currencyService = new CurrencyService();

/* eslint-disable-next-line */
const { Option } = Select;
const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 8,
  },
};


const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 10,
  },
};



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
//   const [paymentModeData, setPaymentModeData] = useState<PaymentmodesDto[]>([]);
//   const [countries, setCountries] = useState<CountryDto[]>([]);
  const currencyService = new CurrencyService()
  const [currencies, setCurrencies] = useState<CurrencyDto[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<number>(null);
  const [disable, setDisable] = useState<boolean>(false)
  // const [cusAccountTypes, setCusAccountTypes] = useState<any[]>([]);

  useEffect(() => {
    // getAllActivePaymentModes()
    // getAllActiveCountries()
    getAllActiveCurrencys()
  }, [])


//   const getAllActiveCountries = () => {
//     countryService.getAllActiveCountries().then((res) => {
//       if (res.status) {
//         setCountries(res.data);
//       } else {
//         if (res.intlCode) {
//           AlertMessages.getErrorMessage(res.internalMessage);
//         } else {
//           AlertMessages.getErrorMessage(res.internalMessage);
//         }
//         setCountries([]);
//       }
//     })
//       .catch((err) => {
//         AlertMessages.getErrorMessage(err.message);
//         setCountries([]);
//       });
//   }

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
  const handleCurrency = (value) => {
    setSelectedCurrency(value);
  }

  const saveBuyer = (buyersData: BuyersDto) => {
    setDisable(true)
    buyerService.createBuyer(buyersData).then(res => {
      setDisable(false)
      if (res.status) {
        message.success('Customer Details Created Successfully')
        onReset();
      } else {
        message.error(res.internalMessage)
      }
    }).catch(err => {
      setDisable(false)
      message.error(err)
    })
  }

//   const getAllActivePaymentModes = () => {
//     paymentModeService.getAllActivePaymentmodes().then(res => {
//       if (res.status) {
//         // AlertMessages.getSuccessMessage('PaymentModes Retrived successfully');
//         setPaymentModeData(res.data);
//       } else {
//         if (res.intlCode) {
//           AlertMessages.getErrorMessage(res.internalMessage);
//         } else {
//           AlertMessages.getErrorMessage(res.internalMessage);
//         }
//       }
//     }).catch(err => {
//       AlertMessages.getErrorMessage(err.message);
//     })
//   }

  const handlePaymentMode = (value) => {
    setSelectedPaymentModes(value);
  }



  const saveData = (values: BuyersDto) => {
    setDisable(false)
    console.log(values);
    if (props.isUpdate) {
      console.log('update')
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
    createdUser = localStorage.getItem("createdUser");
  }
  const onFocus = () => {
    console.log('focus');
  }

  const onSearch = (val) => {
    console.log('search:', val);
  }
  const onBlur = () => {
    console.log('blur');
  }


 // props.customersData.currency=Number(props.customersData.currency);
  return (
    <>
    <Card title='Add Buyer' extra={<span><Button onClick={() => navigate('/masters/buyers/buyers-view')} type={'primary'}>View</Button></span>}>
        <Form form={form} onFinish={saveData} initialValues={props.buyersData} layout="vertical">
          <Form.Item name="buyerId" style={{ display: "none" }} >
            <Input hidden />
          </Form.Item>
          <Form.Item style={{ display: "none" }} name="createdUser" initialValue={createdUser}>
            <Input hidden />
          </Form.Item>
          <Row gutter={24}>
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
                <Input />
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
                <Input />
              </Form.Item>  
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item
                name="accountType"
                label="Account Type"
                rules={[
                  {
                    required: false, message: 'Missing Account Type',
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                >
                    {BuyerACcountTypes.map((e) => {
                        return(
                            <Option key={e.value} value={e.value}>{e.name}</Option>
                        )
                    })}
                </Select>
              </Form.Item>
            </Col>
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
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
                name="countryId"
                label="Country"
                rules={[
                  {
                    required: true, message: 'Missing country',
                  },
                ]}
              >
                {/* <Select
                  placeholder="Select Country"
                  // onChange={getSkuCode}
                  allowClear
                >
                  {countries.map(dropData => {
                    return <Option value={dropData.countryId}>{dropData.countryName}</Option>
                  })}
                </Select> */}
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item
                name="state"
                label="State"
                rules={[
                  {
                    required: true, message: 'Missing state',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item
                name="district"
                label="District"
                rules={[
                  {
                    required: true, message: 'Missing district',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item
                name="city"
                label="City"
                rules={[
                  {
                    required: true, message: 'Missing city',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item
                name="landmark"
                label="Landmark"
                rules={[
                  {
                    required: true, message: 'Missing landmark',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item
                name="lane1"
                label="Lane 1"
                rules={[
                  {
                    required: true, message: 'Missing lane1',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item
                name="lane2"
                label="Lane 2"
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item
                name="pincode"
                label="Pincode"
                rules={[
                  {
                    required: true, message: 'Missing pincode',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
            </Col>
          {/* </Row>

          <Row gutter={24}> */}
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item
                name="paymentTerms"
                label="Payment Terms"
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
                name="paymentModeId"
                label="Payment Mode"
                rules={[
                  {
                    required: true, message: 'Missing payment mode',
                  },
                ]}
              >
                {/* <Select
                  showSearch
                  // style={{ width: 200 }}
                  placeholder="Select Payment mode"
                  optionFilterProp="children"
                  onChange={handlePaymentMode}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  
                >
                  <Option key={0} value={null}>Select Payment</Option>
                  {paymentModeData.map((paymentMode) => {
                    return <Option key={paymentMode.paymentModeId} value={paymentMode.paymentModeId}>{paymentMode.paymentMode}</Option>
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
          {/* </Row>
          <Row gutter={24}> */}
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
          <Row  gutter={24} justify={'end'}>
              <Col xs={{ span: 6 }} sm={{ span: 6}} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button onClick={onReset}>Reset</Button></Col>
              <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span:2  }}><Button type='primary' htmlType='submit'>Submit</Button></Col>
            </Row>
        </Form>
      </Card>
    </>
  );

}



export default BuyersForm;

