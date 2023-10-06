
import {  Card, Col, Form, Input, Row, Select } from 'antd'

import FabricDevelopmentDynamicForm from './fabric-development-dynamicform'
import { useEffect, useState } from 'react';
import { FabricItemInfoRequest, FabricQuantitiesInfo, QualitiesEnum } from '@project-management-system/shared-models';
import { FabricRequestQualitiesRequest } from 'packages/libs/shared-models/src/common/fabric-development/fabric-request-qualities.request';

export interface ReqProps {
  
  itemsInfo: (ItemsData: any[]) => void;
  
}



export const  FabricDevelopmentRequestQuality = (props:ReqProps) => {
  const [formData,setFormData] = useState<any>([])
  const [itemData,setItemData] = useState<any>([])
  const [dynamicData,setDynamicData] = useState<any>([])
  const [placementForm] = Form.useForm();
  const [dynamicForm] = Form.useForm();


  


  const onChange = () =>{
    placementForm.validateFields().then((values) => {
      console.log(values, 'onchange');
      setFormData(values)

    })
    
   }
  

 
  const itemsData = (data) => {
    console.log(data,"m3data")
    setItemData(data)
    props.itemsInfo(data)
  }
   
  // console.log(itemData,"8585")

  const dynamicformData = (data) =>{
    console.log(data,'dynamicformData')
    setDynamicData(data)
  }
  // console.log(dynamicData,"1234")

  

const itemsinfo = [];
const FabricQuantities = [];

itemData.forEach((itemInfo) => {
  const record = new FabricItemInfoRequest(
    itemInfo.itemsCode, itemInfo.description
  );
  itemsinfo.push(record);

 console.log(itemsinfo,'[itemsinfo]')




 dynamicData.forEach((rec) => {
  const records:any = new FabricQuantitiesInfo(
    rec.styleId, rec.colorId, rec.garmentQuantity, rec.consumption, rec.wastage, rec.fabricQuantity, rec.uomId, "", "", rec.remarks,itemsinfo
  );
  FabricQuantities.push(records); 
   

});
});
console.log(FabricQuantities,"[FabricQuantities]");


const finalDto = []
const qualitiesarray = new FabricRequestQualitiesRequest(placementForm.getFieldValue('quality'),placementForm.getFieldValue('placement'),placementForm.getFieldValue('width'),placementForm.getFieldValue('fabricDescription'),placementForm.getFieldValue('description'),FabricQuantities)
finalDto.push(qualitiesarray)

console.log(finalDto,"pppp")


     
  
  return (
    
      <><Form
      style={{ fontSize: "10px" }}
      layout="vertical"
      form={placementForm}
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
        
                   {Object.values(QualitiesEnum).map((val) => {
                       return <option key={val} value={val}>{val}</option>
                     })}
  
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
        <FabricDevelopmentDynamicForm form={dynamicForm} itemsData={itemsData} dynamicformData={dynamicformData} />
      </Card>
      </>
       
    
  )
}

export default FabricDevelopmentRequestQuality 