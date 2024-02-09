import { RightSquareOutlined } from "@ant-design/icons";
import { ItemTypeEnumDisplay, ItemTypeEnum, TrimParamsMappingRequestDto, TrimDtos, TrimIdRequestDto } from "@project-management-system/shared-models";
import { TrimParamsMappingService, TrimService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Popconfirm, Row, Select, Switch } from "antd"
import { useEffect, useState } from "react";
import AlertMessages from "../../common/common-functions/alert-messages";

export interface mappingProps {
    mappingData: TrimParamsMappingRequestDto;
    updateDetails: (column: TrimParamsMappingRequestDto) => void;
    isUpdate: boolean;
    closeForm: () => void;
  }
export const TrimParamsMapping=(props:mappingProps)=>{
    const { Option } = Select;
    const trimService = new TrimService();
    const [trimData, setTrimData] = useState<any[]>([]);
    const [form] = Form.useForm();
    const services = new TrimParamsMappingService()
    const [trimUpdateData, setTrimUpdateData] = useState<any[]>([]);
    useEffect(()=>{
        getTrims()
        // if(props.isUpdate === true){
        // getTrimsById()
    // }
    },[])
    const getTrims = () => {
        trimService.getAllTrim().then((res) => {
          if (res.status) {
            setTrimData(res.data);
          }
        });
      };
      const getTrimsById = () => {
        const req = new TrimIdRequestDto(3,19)
        services.getMappedParamsByTrim(req).then((res) => {
          if (res.status) {
            setTrimUpdateData(res.data);
            // form.setFieldsValue({type:res.data[0].type})
            // form.setFieldsValue({category:res.data[0].category})
            // form.setFieldsValue({structure:res.data[0].structure})
            // form.setFieldsValue({content:res.data[0].type})
            form.setFieldsValue({trimCategoryId:res.data[0].trimId}) 
            form.setFieldsValue({trimType:res.data[0].trimType}) 


                 }
        });
      };
      const onReset = () => {
        form.resetFields();
      };
      const finish=(val)=>{
        // console.log(val,'---------------val')
        // console.log(val.structure,'str------')
        // if(val.structure === undefined){
        //     val.structure = false
        // }
        
          val.structure === true ? val.structure : val.structure = false ? val.structure : false
          val.content === true ? val.content : val.content = false ? val.content : false
          val.hole === true ? val.hole : val.hole = false ? val.hole : false
          val.finish === true ? val.finish : val.finish = false ? val.finish : false
          val.variety === true ? val.variety : val.variety = false ? val.variety : false
          val.logo === true ? val.logo : val.logo = false ? val.logo : false
          val.part === true ? val.part : val.part = false ? val.part : false
          val.quality === true ? val.quality : val.quality = false ? val.quality : false
          val.uom === true ? val.uom : val.uom = false ? val.uom : false
          val.thickness === true ? val.thickness : val.thickness = false ? val.thickness : false
          val.color === true ? val.color : val.color = false ? val.color : false
          val.buyer === true ? val.buyer : val.buyer = false ? val.buyer : false
          val.parts === true ? val.parts : val.parts = false ? val.parts : false
          val.ply === true ? val.ply : val.ply = false ? val.ply : false
          val.length === true ? val.length : val.length = false ? val.length : false
          val.line === true ? val.line : val.line = false ? val.line : false
          val.shape === true ? val.shape : val.shape = false ? val.shape : false
          val.slider === true ? val.slider : val.slider = false ? val.slider : false
      
            //   if (trimUpdateData.length>=0) {
            //     updateDetails(val);
            //   } else {
            //     create(val);
            //   }
              console.log(val);
              create(val)
      }
      const create = (val)=>{
        const req = new TrimParamsMappingRequestDto(undefined,val.category,val.trimCategoryId,val.color,val.content,val.finish,val.hole,val.logo,val.part,val.quality,val.structure,val.thickness,val.type,val.uom,val.variety,undefined,undefined,undefined,val.ply,val.parts,val.shape,val.length,val.line,val.slider,val.buyer,undefined,val.trimType)
        services.createMapping(req).then((res)=>{
       if(res.status){
       AlertMessages.getSuccessMessage(res.internalMessage)
       }else{
        AlertMessages.getErrorMessage(res.internalMessage)
       }}
        )
      }
      const updateDetails = (val)=>{
        const req = new TrimParamsMappingRequestDto(undefined,val.category,val.trimCategoryId,val.color,val.content,val.finish,val.hole,val.logo,val.part,val.quality,val.structure,val.thickness,val.type,val.uom,val.variety,'',undefined,'',val.ply,val.parts,val.shape,val.length,val.line,val.slider,val.buyer,undefined,val.trimType)
        services.updateMapping(req).then((res)=>{
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                       }else{
                        AlertMessages.getErrorMessage(res.internalMessage)
                       }}
                           )
      }
return(
    <Card title='Trim Params Mapping'  headStyle={{ backgroundColor: '#69c0ff', border: 0 }} >
        <Form form={form} onFinish={finish} layout="vertical" >
            <Row gutter={[12,12]}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="trimType" label="Trim Type" rules={[{ required: true, message: "Trim Type is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select Trim Type"
                    disabled={trimUpdateData?.[0]?.trimType}
                    >
                        {Object.values(ItemTypeEnumDisplay).filter((val) => val.displayVal !== ItemTypeEnum.FABRIC).map((val) => (
                            <Option key={val.name} value={val.name}>
                                {val.displayVal}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="trimCategoryId" label="Trim Category" rules={[{ required: true, message: "Trim Category is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select Trim Category"
                    disabled={trimUpdateData?.[0]?.trimId}

                    >
                        {trimData.map((e) => {
                            return (
                            <Option key={e.trimId} value={e.trimId}>
                                {e.trimCategory}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </Row>
            <Row gutter={[12,12]}>
            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="category" label="Category">
              
        <Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // defaultChecked = {false}
            // checked={trimUpdateData?.[0]?.category === true}
            disabled={trimUpdateData?.[0]?.category === true}

            />
            
            </Form.Item>
            </Col>
            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="structure" label="Structure" >
            <Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.structure === true}
            disabled={trimUpdateData?.[0]?.structure === true}
            />
            </Form.Item>
            </Col>
            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="content" label="Content">
              
        <Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.content === true}
            disabled={trimUpdateData?.[0]?.content === true}
            />
            
            </Form.Item>
            </Col>
            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="finish" label="Finish">
              
            <Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.finish === true}
            disabled={trimUpdateData?.[0]?.finish === true}            />
            
            </Form.Item>
            </Col>
            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="hole" label="Hole">
             <Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.hole === true}
            disabled={trimUpdateData?.[0]?.hole === true}            />
            </Form.Item>
            </Col>
            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="quality" label="Quality">
             
            <Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.quality === true}
            disabled={trimUpdateData?.[0]?.quality === true}            />
            </Form.Item>
            </Col>
            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="thickness" label="Thickness">
              <Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.thickness === true}
            disabled={trimUpdateData?.[0]?.thickness === true}
            />
            </Form.Item>
            </Col>
            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="variety" label="Variety">
              <Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.variety === true}
            disabled={trimUpdateData?.[0]?.variety === true}            />
            </Form.Item>
            </Col>
            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="uom" label="UOM">
        <Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.uom === true}
            disabled={trimUpdateData?.[0]?.uom === true}
            />
            </Form.Item>
            </Col>
            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="color" label="Color">
             <Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.color === true}
            disabled={trimUpdateData?.[0]?.color === true}            />
            </Form.Item>
            </Col>
            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
  <Form.Item name="logo" label="Logo">
    <Switch
    //   checked={trimUpdateData?.[0]?.logo === true}
      disabled={trimUpdateData?.[0]?.logo != false}
    />
  </Form.Item>
</Col>

            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="part" label="Part">
            
<Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.part === true}
            disabled={trimUpdateData?.[0]?.part === true}            />           
            </Form.Item>
            </Col>
            <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="buyer" label="Buyer">
            
<Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.buyer === true}
            disabled={trimUpdateData?.[0]?.buyer === true}            />           
            </Form.Item>
            </Col><Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="length" label="Length">
            
<Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.length === true}
            disabled={trimUpdateData?.[0]?.length === true}            />           
            </Form.Item>
            </Col><Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="line" label="Line">
            
<Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.line === true}
            disabled={trimUpdateData?.[0]?.line === true}            />           
            </Form.Item>
            </Col><Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="parts" label="Parts">
            
<Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.parts === true}
            disabled={trimUpdateData?.[0]?.parts === true}            />           
            </Form.Item>
            </Col><Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="ply" label="Ply">
            
<Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.ply === true}
            disabled={trimUpdateData?.[0]?.ply === true}            />           
            </Form.Item>
            </Col><Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="slider" label="Slider">
            
<Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.slider === true}
            disabled={trimUpdateData?.[0]?.slider === true}            />           
            </Form.Item>
            </Col><Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="shape" label="Shape">
            
<Switch size="default"  
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            // checked={trimUpdateData?.[0]?.shape === true}
            disabled={trimUpdateData?.[0]?.shape === true}            />           
            </Form.Item>
            </Col>
            </Row>
            <Row>
            <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button htmlType="button" style={{ margin: "0 14px" }} onClick={onReset}>Reset</Button>
            </Col>
        </Row>
        </Form>
    </Card>
)
}
export default TrimParamsMapping