
import {  Card, Col, Form, Input, Row, Select } from 'antd'

import FabricDevelopmentDynamicForm from './fabric-development-dynamicform'
import { useEffect, useState } from 'react';
// import { FabricInfo, ItemInfo } from '@project-management-system/shared-models';

export interface ReqProps {
  
  itemsInfo: (ItemsData: any[]) => void;
}

const dynamicformData = (data) =>{
  console.log(data,"dynamicformData")
 

}

export const  FabricDevelopmentRequestQuality = (props:ReqProps) => {
  const [formData,setFormData] = useState<any>([])
  const [itemData,setItemData] = useState<any>([])




  const onChange = () =>{
    placementForm.validateFields().then((values) => {
      console.log(values, 'onchange');
      setFormData(values) 
    })
    
   }

   console.log(formData,"form")
  
  const [placementForm] = Form.useForm();
  const [dynamicForm] = Form.useForm();

  const itemsData = (data) => {
    console.log(data,"m3data")
    setItemData(data)
    props.itemsInfo(data)
  }
   
  console.log(itemData,"8585")
    
  // let itemsInfo:ItemInfo[] = []
  // const rec = new ItemInfo(itemData[0].itemsCode,itemData[0].description)
  // itemsInfo.push (rec)
  // console.log(rec,"00000")
  //  const fabic = new FabricInfo(1,1,1,1,1,1,1,1,1)
   
   
  //  let items:ItemInfo[] = itemData
  //   console.log(items,"969696969")

    
  
  return (
    
      <><Form
      style={{ fontSize: "10px" }}
      layout="vertical"
      form={placementForm}
      // onValuesChange={onChange}
      onChange={onChange}
    >
      <Row gutter={12}>
      <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Quality"
                name="quality"
                rules={[{ required: true, message: "Location" }]}
              >
                <Select placeholder="Select Qualities" allowClear>
                  <option key="1" value="Quality1">Quality1</option>
                  <option key="2" value="Quality2">Quality2</option>
                  <option key="3" value="Quality3">Quality3</option>
                  <option key="4" value="Quality4">Quality4</option>
                  <option key="5" value="Quality5">Quality5</option>
                  <option key="6" value="Quality6">Quality6</option>
                  <option key="7" value="Quality7">Quality7</option>
                  <option key="8" value="Quality8">Quality8</option>
                  <option key="9" value="Quality9">Quality9</option>
                  <option key="10" value="Quality10">Quality10</option>
                  <option key="11" value="Quality11">Quality11</option>
                  <option key="12" value="Quality12">Quality12</option>


                  {/* {locationData.map((rec) => (
                    <option key={rec.locationId} value={rec.locationId}>
                      {rec.locationName}
                     </option>
                         ))}
                          */}
  
                  </Select>
              </Form.Item>
            </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
        >
          <Form.Item
            label="Placement"
            name="placement"
          >
            <Input placeholder="Placement" allowClear />
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
        >
          <Form.Item
            label="Width"
            name="width"
          >
            <Input placeholder="width" allowClear />
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
        >
          <Form.Item
            label="Fabric Description"
            name="fabricDescription"
          >
            <Input placeholder="Fabric Description" allowClear />
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
        >
          <Form.Item
            label="Fabric Code"
            name="fabriccode"
          >
            <Input placeholder="Fabric Code" allowClear disabled={true} />
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
        >
          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea rows={1} placeholder="Description" allowClear />
          </Form.Item>
        </Col>


      </Row>
    </Form>
      <Card>
        <FabricDevelopmentDynamicForm form={dynamicForm} itemsData = {itemsData}  dynamicformData={dynamicformData}/>
      </Card>
      </>
       
    
  )
}

export default FabricDevelopmentRequestQuality 