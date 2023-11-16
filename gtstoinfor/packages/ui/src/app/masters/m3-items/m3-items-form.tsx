import { M3ItemsService, UomService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import AlertMessages from '../../common/common-functions/alert-messages';
import { M3ItemsDTO, UomCategoryEnum } from '@project-management-system/shared-models';
import { useNavigate } from 'react-router-dom';

const M3Items = () => {

  const service = new M3ItemsService();
  const [form] = Form.useForm();
  const navigate=useNavigate();
  const [uom,setUom] = useState<any[]>([])
  const [weightData, setWeightData] = useState<any[]>([])
  const [yarnData, setYarnData] = useState<any[]>([])
  const uomService =  new UomService()

  
  useEffect(() => {
    getUom()
  },[])


  const getUom = () => {
    uomService.getAllUoms().then(res => {
        if(res.status) {
            const yarn = res.data.filter(rec => rec.uomCategory == UomCategoryEnum.LENGTH)
            const weight = res.data.filter(rec=> rec.uomCategory == UomCategoryEnum.MASS)
            setYarnData(yarn);
            setWeightData(weight);
            setUom(res.data)
        }
    })
  }

  const onFinish = (m3StyleDto: M3ItemsDTO) => {
      service.createM3Items(m3StyleDto).then(res => {
          if (res.status) {
              AlertMessages.getSuccessMessage(res.internalMessage)
              setTimeout(() => {
                  message.success('Submitted successfully');
                  window.location.reload();
              }, 500);;
          }
      }).catch(err => {
          AlertMessages.getErrorMessage(err.message);
      })
  }

  const clearData = () => {
      form.resetFields()
    }

  return (
    <div>
        <Card title={<span>M3 ITEMS</span>} style={{ textAlign: 'center' }} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
        extra={<Button
            onClick={() => navigate('/m3-items-view')}
            type="primary"
            style={{ background: "white", color: "#3C085C" }}
        >View</Button>
        }>
        <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={24}>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label="Content" name="content"
               rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
                <Input placeholder=" Enter Content"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Fabric Type" name="fabricType"
               rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
            <Input placeholder=" Enter  Fabric Type"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Weave" name="weave"
               rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
            <Input placeholder=" Enter  Weave"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label="Weight" name="weight"
               rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
                <Input placeholder=" Enter Weight"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item name='weightUnit'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            {weightData.map(e => {
                                return(
                                    <option key={e.uomId} value={e.uomId}>{e.uom}</option>
                                    
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Construction" name="construction"
              //  rules={[
              //   { required: true, message: 'Field is required' },
              // ]}
              >
            <Input placeholder=" Enter  Construction"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Yarn Count" name="yarnCount"
              //  rules={[
              //   { required: true, message: 'Field is required' },
              // ]}
              >
            <Input placeholder=" Enter  Yarn Count"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item name='yarnUnit'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            {yarnData.map(e => {
                                return(
                                    <option key={e.uomId} value={e.uomId}>{e.uom}</option>
                                    
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
  
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Finish" name="finish"
              //  rules={[
              //   { required: true, message: 'Field is required' },
              // ]}
              >
            <Input placeholder=" Enter  Finish"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Shrinkage" name="shrinkage"
              //  rules={[
              //   { required: true, message: 'Field is required' },
              // ]}
              >
            <Input placeholder=" Enter  Shrinkage"/>
              </Form.Item>
            </Col>
            
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" style={{ margin: '0 14px' }}
                onClick={clearData}
              >
                Reset
              </Button>
            </Col>
          </Row> 
        </Form>
        </Card>
    </div>
  )
}

export default M3Items