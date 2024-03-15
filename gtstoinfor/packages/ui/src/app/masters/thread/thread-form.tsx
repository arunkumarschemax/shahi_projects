import { ProSkeleton } from '@ant-design/pro-components';
import { SupplierCreateDto, ThreadsDto } from '@project-management-system/shared-models';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { offset } from 'highcharts';
import SupplierService from 'packages/libs/shared-services/src/supplier/supplier-service';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import { BomService, ThreadService, ThreadSupplierService } from '@project-management-system/shared-services';


export interface ThreadFormprops {
    Data: any;
    // updateItem: (Data:ThreadsDto ) => void;
    // isUpdate: boolean;
    // closeForm: () => void;
}

export function ThreadForm(props:ThreadFormprops) {
    const navigate = useNavigate();


    const service = new SupplierService();
    const bomServices = new BomService();
    const threadsupplierService = new ThreadSupplierService()

    const services = new ThreadService
    const [form] = Form.useForm();
    const [styleNumber, setStyleNumber] = useState<any>([]);
    const [threadSupplier, setThreadSupplier] = useState<any>([]);

    const [disable,setDisable] = useState<boolean>(false)
    const { Option } = Select;


    useEffect(() => {
        getStyleNumber()
        getThreadSupplier()
     }, [])


    const getStyleNumber = () => {
        bomServices.getStylesData().then(res => {
            setStyleNumber(res.data)
        })
    }

    
    const getThreadSupplier = () => {
        threadsupplierService.getAllThreadSupplier().then(res => {
            setThreadSupplier(res.data)
        })
    }

    const create = (data: ThreadsDto) =>{
        setDisable(true)
        
        services.createThread(data).then(res => {
          setDisable(false)
          if(res.status){
            AlertMessages.getSuccessMessage("Created Successfully")
                    setTimeout(() => {
                        navigate('/masters/thread-view')
                    }, 500);
          }else {
            AlertMessages.getErrorMessage("Failed")
        }
        }).catch(err => {
          setDisable(false)
          AlertMessages.getErrorMessage(err.message);
        })
      }
    //   const saveData = (values: ThreadsDto) => {
    //     setDisable(false)
    //     if(props.isUpdate){
    //       props.updateItem(values);
    //     }else{
    //       setDisable(false)
    //       create(values);
    //     }
    //   };

     const onFinish = (values : ThreadsDto ) =>{
        setDisable(false)

        // if(props.isUpdate){
        //   props.updateItem(values)
        // } else {
        //     setDisable(false)
        //     saveData(values)

        // }

     }



    const handleReset = () => {
        form.resetFields();
    }

    return (


        <Card
            extra={<span><Button type='primary' onClick={() => navigate('/bom/thread-view')}>View</Button></span>} headStyle={{  height: '40px' }}
            bodyStyle={{ paddingTop: '2px', paddingBottom: '12px' }}
            title={<h4 style={{ textAlign: 'left', padding: '20px' }}>Threads</h4>}>
            <Form layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={props.Data}
            >
                <Row gutter={24}>
                    <Form.Item name="id" hidden={true} >
                        <Input />
                    </Form.Item>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ paddingBottom: '12px' }}>
                        <Form.Item name="styleId" label="Style"
                        rules={[{ required: true },]}
                        >
                            <Select placeholder="Select Style" style={{ width: 150 }}>
                            {styleNumber?.map((inc: any) => {
                                    return <Option key={inc.id} value={inc.id}>{inc.style}</Option>
                                })
                                }
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="tex" label="Tex"
                        >
                            <Input placeholder='Enter Tex' />
                        </Form.Item>

                    </Col>

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="quality" label="Quality"
                            // rules={[{ required: true },
                            

                            // ]}
                        >
                            <Input placeholder='Enter Quality' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="colorCombo" label="Color Combo"
                            // rules={[
                            //     {
                            //         pattern: /^[a-zA-Z0-9]+$/,
                            //         message: 'Please enter valid GstNumber',
                            //     },
                            // ]}
                        >
                            <Input placeholder='Enter Color Combo ' />

                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="colorCode" label="Color Code"
                            // rules={[{ required: true },
                            // { min: 3, message: 'Contact Person must be at least 3 characters' }

                            // ]}
                             >
                            <Input placeholder='Enter Color Code' />
                        </Form.Item>

                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ paddingBottom: '12px' }}>
                        <Form.Item name="shadeNumber" label="Shade Number"
                            // rules={[
                            //     {
                            //         min: 3,
                            //         message: 'Apartment Name contains atleast 3 characters ',
                            //     },

                            // ]}
                        >
                            <Input placeholder='Shade Number' />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ paddingBottom: '12px' }}>
                        <Form.Item name="supplierId" label="Thread Supplier"
                        rules={[{ required: true },]}
                        >
                            <Select placeholder="Select Thread Supplier" style={{ width: 150 }}>
                            {threadSupplier?.map((inc: any) => {
                                    return <Option key={inc.threadSupplierId} value={inc.threadSupplierId}>{inc.supplierName}</Option>
                                })
                                }
                            </Select>
                        </Form.Item>

                    </Col> 
                </Row>
               
               

                <Row style={{ textAlign: 'right', marginRight: '30px' }}>
                    <Col span={24}>
                        <Form.Item>
                            <Button htmlType='submit' style={{ marginRight: '18px', backgroundColor: ' green',color:"white" }}>Submit</Button>
                            
                            <Button htmlType='reset' onClick={handleReset}  >Reset</Button>

                        </Form.Item>
                    </Col>

                </Row>
            </Form>

        </Card>

    )

}

export default ThreadForm;