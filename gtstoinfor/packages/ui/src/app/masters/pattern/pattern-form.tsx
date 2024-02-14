import { PatternDto } from '@project-management-system/shared-models'
import { FactoryService, PatternService } from '@project-management-system/shared-services'
import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertMessages from '../../common/common-functions/alert-messages'

export interface PatternProps{
    data : PatternDto
    updatePattern: (dto: PatternDto) => void
    isUpdate: boolean
    closeForm: () => void
}

const PatternForm = (props: PatternProps) => {
    const [form] = Form.useForm()
    const {Option}= Select;
    const navigate = useNavigate()

    const service = new PatternService()
    const factoryService = new FactoryService()

    const [ factoryData, setFactoryData ] = useState<any[]>([])
    
    useEffect(()=>{
        getAllFactories()
    },[])

    const createPattern = (req: PatternDto) =>{
        console.log(req,'-------------------')
        service.createPattern(req).then((res)=>{
            if(res.status){
                message.success(res.internalMessage,2)
                navigate('/masters/pattern-view')
            }else{
                message.error(res.internalMessage,2)
            }
        })
        .catch(err=>AlertMessages.getErrorMessage(err.message))
    }

    const getAllFactories = () =>{
        factoryService.getActiveFactories().then((res)=>{
            setFactoryData(res.data)
        })
    }

    const onReset = () =>{
        form.resetFields()
    }

    const saveData = (values: PatternDto) =>{
        if(props.isUpdate){
            props.updatePattern(values)
        }else{
            createPattern(values)
        }
    }


  return (
    <div>
        <Card 
        title='Pattern' 
        style={{textAlign: 'left'}} 
        headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
        extra={
            props.isUpdate == true?"" :
            <Link to= ''>
                <span style={{color:'white'}}>
                    <Button type='primary'>
                        View
                    </Button>
                </span>
            </Link>
        }>
            <Form form={form} 
            layout='vertical' 
            initialValues={props.data}
            name='control-hooks'
            onFinish={saveData}
            >
                <Form.Item name='patternId' style={{display:'none'}}>
                    <Input hidden/>
                </Form.Item>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                        name={'factoryLocationId'}
                        label={'Location'}
                        rules={[{required:true,message:"Location is required"}]}
                        >
                            <Select
                            allowClear
                            showSearch
                            optionFilterProp='children'
                            placeholder='Select Location'
                            >
                                {factoryData.map((e)=>{
                                    return(
                                        <Option key={e.id} value={e.id}>
                                            {e.name}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item 
                        name={'patternName'}
                        label={'Pattern'}
                        rules={[
                            {
                                required: true,
                                message: 'Pattern is required'
                            },
                            {
                                pattern: /^[A-Za-z]+$/,
                                message: `Should contain only alphabets.`
                            }
                        ]}
                        >
                            <Input placeholder='Enter Pattern'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item 
                        name={'email'}
                        label={'Mail Id'}
                        rules={[
                            {
                                required: true,
                                message: 'Mail Id is required'
                            },
                            {
                                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                                message: 'Please enter a valid email address.'
                            }                            
                        ]}
                        >
                            <Input placeholder='Enter Mail Id'/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24} justify="end">
                    <Col>
                        <Button type='primary' htmlType='submit' size="middle">Submit</Button>
                    </Col>
                    <Col>
                        {(props.isUpdate === false) &&
                            <Button htmlType='button' danger type='default' size="middle" onClick={onReset}>Reset</Button>
                        }
                    </Col>
                </Row>
            </Form>
        </Card>
    </div>
  )
}

export default PatternForm