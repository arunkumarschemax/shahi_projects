import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Card, Row, Col, message } from 'antd';
import { Link,useNavigate } from "react-router-dom";
import { CurrencyDto, GlobalVariables, VendorsDto } from '@project-management-system/shared-models';
import { CurrencyService, VendorsService } from '@project-management-system/shared-services';
const { TextArea } = Input;
const { Option } = Select;


/* eslint-disable-next-line */
export interface VendorsFormProps {

  vendorsData: VendorsDto;
  updateDetails: (vendors: VendorsDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function VendorsForm(
  props: VendorsFormProps
) {
//   const countryService = new CountryService;
  const currencyService = new CurrencyService;
  const [form] = Form.useForm();
  const service = new VendorsService;
  const [selectedCountry, setSelectedCountry] = useState<number>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<number>(null)
//   const [countryData, setCountryData] = useState<CountryDto[]>([]);
  const [currencyData, setCurrencyData] = useState<CurrencyDto[]>([]);
  const [disable,setDisable]=useState<boolean>(false)
  let navigate = useNavigate()

//   useEffect(() => { getAllActiveCountries() }, [])

  useEffect(() => { getAllActiveCurrencys() }, [])


//   const getAllActiveCountries = () => {
//     countryService.getAllActiveCountries().then(res => {
//       if (res.status) {
//         // AlertMessages.getSuccessMessage('Countries Retrived successfully');
//         setCountryData(res.data);
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


  const getAllActiveCurrencys = () => {
    currencyService.getAllActiveCurrencys().then(res => {
      if (res.status) {
        // AlertMessages.getSuccessMessage('Countries Retrived successfully');
        setCurrencyData(res.data);
      } else {
          message.error(res.internalMessage);
      }
    }).catch(err => {
      message.error(err.message);
    })
  }

  const save = (Data: VendorsDto) => {
    Data.createdUser=localStorage.getItem('username')
    setDisable(true)
    service.create(Data).then(res => {
      setDisable(false)
      if (res.status) {
        message.success('Created Successfully');
        navigate('/global/vendors/vendors-view')
        onReset();
      } else {
          message.error(res.internalMessage);
      }
    }).catch(err => {
      setDisable(false)
      message.error(err.message);
    })
  }

  const saveData = (values: VendorsDto) => {
    setDisable(false)
    if (props.isUpdate) {
      props.updateDetails(values);
    } else {
      setDisable(false)
      save(values);
    }

  };
  const onReset = () => {
    form.resetFields();
  };



  return (
      <Card  headStyle={{ backgroundColor: '#69c0ff', border: 0 }} title={props.isUpdate ? 'Update Vendor' : 'Add Vendor'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/global/vendors/vendors-view')} type={'primary'}>View</Button></span>}>
      <Form form={form} initialValues={props.vendorsData} name="control-hooks" onFinish={saveData}
        layout="vertical"
      >
        <Form.Item name="vendorId" style={{ display: "none" }} >
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: "none" }} name="createdUser" initialValue={props.vendorsData}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: "none" }} name="countryId" initialValue={GlobalVariables.countryId}>
          <Input hidden defaultValue={GlobalVariables.countryId}/>
        </Form.Item>
        <Form.Item style={{ display: "none" }} name="currencyId" initialValue={GlobalVariables.currencyId}>
          <Input hidden defaultValue={GlobalVariables.currencyId}/>
        </Form.Item>
        <Row gutter={8}>
             <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 12}}>
             <Card size='small' bordered={false}>
             <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>PERSONAL DETAILS</h1>
                <Row gutter={8}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                      name="vendorCode"
                      label="Vendor Code"
                      rules={[
                        {
                          required: true,
                          message:'Vendor Code Required'
                        },     
                        {
                          pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z\\0-9\[\]()@#$_\-+/\s-]*$/,
                          message: `Invalid Vendor Code`
                          },
                        
                      ]}
                      >
                     <Input  placeholder='Enter Vendor Code'/>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                      name="vendorName"
                      label="Vendor Name"
                      rules={[
                        {
                          required: true,
                          message:"Vendor Name is required"
                        },     
                        {
                          pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=~{}:;<>,.?|][a-zA-Z.'"`\s ]*$/,
                          message: `Invalid Vendor Name`
                          },
                      ]}>
                     <Input placeholder='Enter Vendor Name'/>
                    </Form.Item>
                  </Col> 
                   
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                      name="contactPerson"
                      label="Contact Person"
                      rules={[
                        {
                          required: true,
                          message:"Contact Person is required"
                        },     
                        {
                          pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=~{}:;<>,.?|][a-zA-Z.'"`\s ]*$/,
                          message: `Invalid Contact Person`
                        }
                      ]}>
                     <Input placeholder='Enter Contact Person'/>
                    </Form.Item>
            </Col>
            </Row>
            <Row gutter={8}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                      name="contactNumber"
                      label="Contact Number"
                      rules={[
                        {
                          required: true,
                          message: `Enter valid Contact Number`,
                          max:10
                        },     
                        {
                          pattern: /^[^-\s\\a-zA-Z\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][Z0-9\s]*$/,
                          message: `Should contain only numbers`
                        }
                       
                      ]}>
                     <Input placeholder='Enter Contact Number'/>
                    </Form.Item>
            </Col>
           
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>
            <Form.Item
              name="gstNumber"
              label="GST Number"
               rules={[
              {
                required: true,
                message:'GST Number is required'
              },
              {
                max:15,
                message:'GST Number should not be greater than 15 characters'
              },
              {
                pattern:/[0-9a-zA-Z]/,
                message:`Special characters not allowed`
              }
            ]}
            >
              <Input placeholder='Enter GST Number'/>
            </Form.Item>
          </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Form.Item
                      name="emailId"
                      label="Email Id"
                      // rules={[
                      //   {
                      //     required: true,
                      //   },
                      // ]}
                      >
                     <Input placeholder='Enter Email'/>
                    </Form.Item>
            </Col>
            </Row>
            <Row gutter={8}>
          
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>
            <Form.Item
              name="website"
              label="Website"
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
            >
              <Input placeholder='Enter Website'/>
            </Form.Item>
          </Col>
            
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 16 }}>
            <Form.Item
              name="privateNote"
              label="Private Note"
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
            >
              <TextArea rows={1} placeholder="Enter Public Note" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 16 }}>
            <Form.Item
              name="publicNote"
              label="Public Note"
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
            >
              <TextArea rows={1} placeholder="Enter Public Note" />
            </Form.Item>
          </Col>
                </Row>
              </Card>
            </Col> 
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Card size='small' bordered={false}>
              <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>BANK DETAILS</h1>
              <Row gutter={8}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 18 }}>
            <Form.Item
              name="bankAccNo"
              label="Bank Account Number"
            rules={[
              {
                required: true,
              },
              {
                min:9,
                max:18,
                message:'Account Number should be in between 9 to 18 digits'
              },
              {
                pattern: /^[0-9.]*$/,
                message: `Special charecters and alphabets are not allowed`,
              },
            ]}>
            
            <Input placeholder='Enter Bank Account Number'/>
            </Form.Item>
          </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 18 }}>
            <Form.Item
              name="bankIfsc"
              label="Bank IFSC"
            rules={[
              {
                required: true,
              },
              {
                max:11,
                message:'IFSC Code should not be greater than 11'
              },
              {
                pattern: /^[0-9.A-Z]*$/,
                message: `Invalid IFSC Code`,
              },
            ]}
            >
              <Input placeholder='Enter IFSC Code'/>
            </Form.Item>
          </Col>
          </Row>
          <Row gutter={8}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span:18 }}>
            <Form.Item
              name="bankName"
              label="Bank Name"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=~{}:;<>,.?|][a-zA-Z.'"`\s ]*$/,
                message: `Invalid Bank Name`
                },
            ]}
            >
              <Input placeholder='Enter Bank Name' />
            </Form.Item>
          </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 18 }}>
            <Form.Item
              name="bankBranch"
              label="Bank Branch"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=~{}:;<>,.?|][a-zA-Z.'"`\s ]*$/,
                message: `Invalid Branch Name`
              },
            ]}
            >
              <Input placeholder='Enter Branch'/>
            </Form.Item>
          </Col>
              </Row>
            </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Card size='small' bordered={false}>
              <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>ADDRESS</h1>
              <Row gutter={24}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 18 }}>
            <Form.Item
              name="street"
              label="Street"
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
            >
              <Input placeholder='Enter Street'/>
            </Form.Item>
          </Col>
          </Row>
          <Row gutter={24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 18 }}>
            <Form.Item
              name="apartment"
              label="Apartment"
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
            >
              <Input placeholder='Enter Apartment'/>
            </Form.Item>
          </Col>
            </Row>
            <Row gutter={24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 18 }}>
            <Form.Item
              name="city"
              label="City"
            rules={[
              {
                required: true,
              },
            ]}
            >
              <Input placeholder='Enter City'/>
            </Form.Item>
          </Col>
          </Row>
          <Row gutter={24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 18 }}>
            <Form.Item
              name="postalCode"
              label="Postal Code"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^[0-9.]*$/,
                message: `Letters , Spaces and Special charecters are not allowed`,
              },
              {
                max:6,
                message:'It accept only 6 digits'
              }
            ]}
            
            >
              <Input placeholder='Enter Postal Code'/>
            </Form.Item>
          </Col>
            </Row>

            </Card>
            </Col>
        </Row>
        <br/>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>

            <Button type="primary"disabled={disable} htmlType="submit" >
              Submit
                </Button>
            {(props.isUpdate === false) &&
              <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
                Reset
          </Button>
            }
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default VendorsForm;
