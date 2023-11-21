import { FeatureDTO, OptionEnum } from '@project-management-system/shared-models';
import { ColourService, DestinationService, FeatureService, SizeService } from '@project-management-system/shared-services';
import { Form, Input, Button, Select,Card, Row, Col, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Console } from 'console';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const FeatureCreation = () => {
    const [form] = Form.useForm()
    const { Option } = Select;
    const [color, setColor] = useState<any[]>([])
    const [size, setSize] = useState<any[]>([])
    const [des, setDes] = useState<any[]>([])
    const [selectedOption, setSelectedOption] = useState('');
    const colorService = new ColourService()
    const sizeService = new SizeService()
    const desService = new DestinationService()
    const service = new FeatureService()
    const [selectedColors,setSelectedColors] = useState<any[]>([])
    const [selectedSize,setSelectedSize] = useState<any[]>([])
    const [selectedDestination,setSelectedDestination] = useState<any[]>([])

    useEffect(() => {
        colorData();
        sizeData();
        desData();
      }, []);

    const colorData = () =>{
        colorService.getAllActiveColour().then((res)=>{
            if(res.status){
                setColor(res.data)
            }
        })
    }

    const sizeData = () =>{
        sizeService.getAllActiveSize().then((res)=>{
            if(res.status){
                setSize(res.data)
            }
        })
    }

    const desData = () =>{
        desService.getAllActiveDestination().then((res)=>{
            if(res.status){
                setDes(res.data)
            }
        })
    }


    const handleOptionChange = (value) => {
        setSelectedOption(value);
      };

      const onReset = () => {
        form.resetFields();
        setSelectedOption(null)
      };

      const saveData = (values) => {
    form.validateFields().then(() => {
    const selectedOption = values.option;
    let optionInfo = [];

    if (selectedOption === 'COLOR') {
      optionInfo = values.optionId.map(colorId => ({
        option: selectedOption,
        optionId: colorId,
        optionValue: selectedColors.filter(e => e.key == colorId)[0].name
      }));
    } else if (selectedOption === 'SIZE') {
      optionInfo = values.optionId.map(sizeId => ({
        option: selectedOption,
        optionId: sizeId,
        optionValue: selectedSize.filter(e => e.key == sizeId)[0].name
      }));
    } else if (selectedOption === 'DESTINATION') {
      optionInfo = values.optionId.map(destinationId => ({
        option: selectedOption,
        optionId: destinationId,
        optionValue: selectedDestination.filter(e => e.key == destinationId)[0].name
      }));
    }

    const data = {
      featureName: values.featureName,
      description: values.description,
      option: selectedOption,
      optionInfo,
    };
console.log(data,"data")
    service.createFeature(data).then((res) => {
      if (res.status) {
        message.success(res.internalMessage, 2);
        form.resetFields()
        setSelectedOption(null)
      } else {
        message.error(res.internalMessage, 2);
      }
    });
  });
};

const colorChange = (val,option) =>{
  console.log(option,'--')
  setSelectedColors(option)
}

const sizeChange = (val,option) => {
  setSelectedSize(option)
}

const destinationChange = (val,option) => {
  setSelectedDestination(option)
}

      

  return (
  <Card title={<span >Feature</span>}extra={(<Link to="/materialCreation/feature-creation-view">
  <span style={{ color: 'white' }}><Button type="primary">View</Button></span></Link> )} style={{textAlign:'left'}} >
    <Form form={form} layout={'vertical'} name="control-hooks"  onFinish={saveData}>
        <Row gutter={10}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item
                  name="featureName"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message:"Name Is Required"
                      
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Name'/>
                </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item
                  name="description"
                  label="Description"
                >
                  <TextArea placeholder='Enter Description' rows={1}/>
                </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item
                  name="option"
                  label="Options"
                  rules={[
                    {
                      required: true,
                      message: 'Select at least one option',
                    },
                  ]}
                    >
                  <Select
                  placeholder='Select Option' 
                  allowClear
                  optionFilterProp="children"
                  showSearch
                  onChange={handleOptionChange}>
                {Object.values(OptionEnum).map(e => {
                                return(
                                    <Option key={e} value={e}>{e}</Option>
                                )
                            })}
                  </Select>
                </Form.Item>
        </Col>
        {selectedOption === 'COLOR' && (
            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item name="optionId" label="Color"
              rules={[
                {
                  required: true,
                  message: 'Select at least one Color',
                },
              ]}
              >
                <Select 
                mode='multiple'
                  placeholder='Select Color'
                  allowClear
                  optionFilterProp="children"
                  onChange={colorChange}
                  showSearch>
                  {color?.map((val) => {
                    return (
                      <Option key={val.colourId} name={val.colour} value={val.colourId}>{val.colour}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
          )}
        {selectedOption === 'SIZE' && (
            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item name="optionId" label="Size"
              rules={[
                {
                  required: true,
                  message: 'Select at least one Size',
                },
              ]}
              >
                <Select
                mode='multiple'
                  placeholder='Select Size'
                  allowClear
                  optionFilterProp="children"
                  showSearch
                  onChange={sizeChange}
                  >
                  {size?.map((val) => {
                    return (
                      <Option key={val.sizeId} value={val.sizeId} name={val.size}>
                        {val.size}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
          )}
          {selectedOption === 'DESTINATION' && (
            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item name="optionId" label="Destination"
              rules={[
                {
                  required: true,
                  message: 'Select at least one Destination',
                },
              ]}
              >
                <Select
                mode='multiple'
                  placeholder='Select Destination'
                  allowClear
                  optionFilterProp="children"
                  showSearch
                  onChange={destinationChange}
                
                  >
                  {des?.map((val) => {
                    return (
                      <Option key={val.destinationId} value={val.destinationId} name={val.destination}>
                        {val.destination}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
          )}
      </Row>
        <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
         <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset} danger>
            Reset
          </Button>
            </Col>
          </Row>
      </Form>
    </Card>
  );
}

export default FeatureCreation