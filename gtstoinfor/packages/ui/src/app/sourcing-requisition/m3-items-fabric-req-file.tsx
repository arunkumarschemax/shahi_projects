import {BuyersService,ContentService,FabricFinishTypeService,FabricRequestCodeService,FabricTypeService,FabricWeaveService,FinishService,M3ItemsService,UomService,WeightService } from"@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Radio, Row, Select, Space, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import {FabricContentDto, FabricRequestCodeDto, FabricTypeIdReq,M3FabricsDTO,M3ItemsDTO,UomCategoryEnum,m3FabricFiltersReq,m3ItemsContentEnum} from "@project-management-system/shared-models";
import { useNavigate } from "react-router-dom";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import AlertMessages from "../common/common-functions/alert-messages";
const { TextArea } = Input;
const {Option} = Select
export interface M3FabricFilterProps{
 formValues:any
 close: (value: any) => void;
 buyerId?: number
}
const M3FabricFilters = (props:M3FabricFilterProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [uom, setUom] = useState<any[]>([]);
  const [weightData, setWeightData] = useState<any[]>([]);
  const [yarnData, setYarnData] = useState<any[]>([]);
  const [widthData, setWidthData] = useState<any[]>([]);
  const [buyer, setBuyer] = useState<any[]>([]);
  const [weave, setWeave] = useState<any[]>([]);

  const [fabricType, setFabricType] = useState<any[]>([]);
  const [weight, setWeight] = useState<any[]>([])
  const [yarnRadio, setYarnRadio] = useState<Boolean>(false)
  const [fabricFinish, setFabricFinish] = useState<any[]>([])
  const [yarnType, setYarnType] = useState('');  
  const [epiData, setEPIData] = useState<any[]>([])
  const [ppiData, setPPIData] = useState<any[]>([])
  const [weightChange, setWeightChange] = useState<number>()
  const [widthChange, setWidthChange] = useState<any[]>([])
  const [widthUom, setWidthUom] = useState<any[]>([])
  const [weightUom, setWeightUom] = useState<number>()
  const [fabricContent, setFabricContent]= useState<any[]>([])
  const [yarn, setYarn]= useState([{countNum:'',countDenom:'',uomId: null}])
  const [onContent, setOnContent] = useState<any[]>([])
  const [onPercent, setOnPercent] = useState<any[]>([])
  const [formData, setFormData] = useState([{ content: '', percentage: null }]);
  const [contentData, setContentData] = useState<any[]>([])
  const [weightUomData, setWeightUomData] = useState<any[]>([])
  const [yarnUom, setYarnUom]= useState<any[]>([])
  const [selectedValues, setSelectedValues] = useState([]);

  const service = new M3ItemsService();
  const uomService = new UomService();
  const fabricService = new FabricTypeService();
  const weaveService = new FabricWeaveService();
  const weightService = new WeightService()
  const buyerService = new BuyersService();
  const finishService = new FinishService()
  const fabFinishService = new FabricFinishTypeService()
  const contentService = new ContentService()
  const fabReqCodeService = new FabricRequestCodeService()

  const getAllWeights = ()=>{
    weightService.getAllActiveWeight().then((res)=>{
      if(res.status){
        setWeight(res.data)
      }
    })
  }

  const getAllFinish = ()=>{
    fabFinishService.getAll().then((res)=>{
      if(res.status){
        setFabricFinish(res.data)
      }
    })
  }

  const getAllContents = ()=>{
    contentService.getFabricContentData().then((res)=>{
      if(res.status){
        setContentData(res.data)
      }
    })
  }


  const getBuyers = () => {
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyer(res.data);
      }
    });
  };

  const getFabricTypedata = () => {
    fabricService.getAllFabricType().then((res) => {
      if (res.status) {
        setFabricType(res.data);
      } else {
        setFabricType([]);
      }
    }).catch((err) => {
      console.log(err.message);
    });
  };

  const getWeaveData = (value) => {
    const req =new FabricTypeIdReq(value)
    weaveService.getWeaveByTypeId(req).then((res) => {
        if (res.status) {
          setWeave(res.data);
        } else {
          setWeave([]);
        }
      }).catch((err) => {
        console.log(err.message);
      });
  };



  useEffect(() => {
    getUom();
    getFabricTypedata();
    getBuyers();
    getAllWeights()
    getAllFinish()
    getAllContents()
    getWeightUom()
    getYarnUom()
    if (props.buyerId !== undefined) {
      form.setFieldsValue({ buyerId: props.buyerId });
    }
  }, [props.buyerId]);

  const getUom = () => {
    uomService.getAllUoms().then((res) => {
      if (res.status) {
        const yarn = res.data.filter(
          (rec) => rec.uomCategory == UomCategoryEnum.yarn_count
        );
        const weight = res.data.filter(
          (rec) => rec.uomCategory == UomCategoryEnum.WEIGHT
        );
        const width = res.data.filter(
          (rec) => rec.uomCategory == UomCategoryEnum.AREA
        );
        setYarnData(yarn);
        setWeightData(weight);
        setWidthData(width);
        setUom(res.data);
        // form.setFieldValue('widthUomId',res?.data[2].uomId)
      }
    });
  };

  const getYarnUom = ()=>{
    uomService.getUomByYarn().then((res)=>{
      if(res.status){
        setYarnUom(res.data)
      }
    })
  }

  const getWeightUom = ()=>{
    uomService.getUomByWeight().then((res)=>{
      if(res.status){
        setWeightUomData(res.data)
      }
    })
  }

  const createReqCode = () => {
    const requiredFields = [
      'fabricTypeId', 'weaveId', 'weightId', 'weightUomId', 'epiConstruction',
      'ppiConstruction', 'yarnType', 'widthValue', 'widthUomId', 'finishId',
      'content', 'shrinkage', 'm3Code', 'hsnCode',
    ];
  
    // if (requiredFields.every(field => form.getFieldValue(field))) {
      const req = new FabricRequestCodeDto(form.getFieldValue('buyerId'),form.getFieldValue('fabricTypeId'),form.getFieldValue('weaveId'),form.getFieldValue('weightId'),form.getFieldValue('weightUomId'),
      form.getFieldValue('epiConstruction'),form.getFieldValue('ppiConstruction'),yarnType,form.getFieldValue('widthValue'),form.getFieldValue('widthUomId'),form.getFieldValue('finishId'),
      form.getFieldValue('content'),form.getFieldValue('shrinkage'),form.getFieldValue('m3Code'),form.getFieldValue('hsnCode')
      );
      fabReqCodeService.createFabricRequestedCode(req).then((res) => {
        if (res.status) {
          message.success(res.internalMessage, 2);
          navigate("/sample-development/fabric-request-code-view");
        } else {
          message.error(res.internalMessage, 2);
        }
      }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
      });
    // } else {
    //   message.error("All fields are required for requesting", 2);
    // }
  };

  const onFinish = (val) => {
    const req = new m3FabricFiltersReq(undefined,val.fabricTypeId,val.weaveId,val.weightUomId,val.epiConstruction?val.epiConstruction:undefined,val.ppiConstruction?val.ppiConstruction:undefined,yarnType,val.widthUomId,val.finishId,val.shrinkage?val.shrinkage:undefined,val.hsnCode?val.hsnCode:undefined,val.content,val.weightValue?val.weightValue:undefined,val.widthValue?val.widthValue:undefined,val.m3Code?val.m3Code:undefined)
      props.formValues([req]);
      props.close(null);
     };


  const clearData = () => {
    setYarnType('')
    form.resetFields();
    console.log(yarnType)
    props.formValues(undefined)
    // props.close(null)
  };


  const yarnSelect = (val) =>{
    setYarnRadio(true)
    setYarnType(val)
  }

const onFabricTpe = (val) =>{
    getWeaveData(val)
  }
  

  return (
  <div>
    <Card
    title={<span>M3 Items</span>}
    headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={18}>
        <Form.Item name={'buyerId'} hidden><Input></Input></Form.Item>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 8 }}>
            <Form.Item label=" Fabric Type" name="fabricTypeId" >
              <Select 
              showSearch
              placeholder=" Select Fabric Type" 
              optionFilterProp="children"
              onChange={onFabricTpe}
              allowClear
              >
                {fabricType.map((option) => (
                <Option key={option.fabricTypeId} value={option.fabricTypeId}>
                  {option.fabricTypeName}
                </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 8 }}>
            <Form.Item label=" Weave" name="weaveId">
              <Select 
              showSearch
              placeholder=" Select Weave" 
              optionFilterProp="children"
              allowClear
              >
                {weave.map((option) => (
                <Option key={option.weaveId} value={option.weaveId}>
                  {option.weaveName}
                </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 8 }}>
            <Form.Item label="Weight" name="weightId">
            <Space.Compact>
              <Form.Item name='weightValue'>
              <Input placeholder="Enter Weight" 
            //   onChange={(e)=>onWeightChange(e?.target?.value)} 
             />
              </Form.Item>
              <Form.Item name='weightUomId'>
                <Select  showSearch placeholder="Select Unit" optionFilterProp="children"
                allowClear
                // onChange={onWeightUom} onBlur={generateItemCode}
                 style={{width:'180px'}}>
                  {weightUomData.map((e) => (
                    <Option key={e.id} value={e.id} name={e.uom}>
                      {e.uom}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Space.Compact>
            </Form.Item>
          </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 8 }}>
              <Form.Item label="Width" name="widthValue"  >
                <Space.Compact>
                  <Form.Item name="width">
                  <Input placeholder="Enter Width"  
                //   onChange={(e)=>onWidthChange(e?.target?.value)}
                  />
                  </Form.Item>
                  <Form.Item name='widthUomId'>
                  <Select showSearch placeholder="Select Unit" optionFilterProp="children"
                   style={{width:'150px'}}
                   allowClear
                //    onChange={onWidthUomChange} style={{width:'120px'}}
                   >
                    {uom.map((e) => {
                      return (
                      <Option key={e.uomId} value={e.uomId}>
                        {e.uom}
                      </Option>
                    )})}
                  </Select>
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
              <Form.Item label="Construction" name="construction">
                <Space.Compact>
                  <Form.Item name='epiConstruction'>
                  <Input placeholder="Enter EPI"  
                //   onChange={(e) => epiChange(e?.target?.value)}
                  />
                  </Form.Item>
                  <Form.Item name='ppiConstruction'>
                  <Input placeholder="Enter PPI"  
                //   onChange={(e) => ppiChange(e?.target?.value)}
                  />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                <Form.Item name="m3Code" label="M3 Code" >
                    <Input placeholder="Enter M3 Code"/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                <Form.Item name="hsnCode" label="HSN Code" >
                    <Input placeholder="Enter HSN Code"/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
            <Form.Item name="yarnType">
              Yarn Type : <Radio.Group name="yarnType" style={{ marginTop: "25px" }}
               onChange={(e)=>yarnSelect(e?.target?.value)} >
                <Radio value="Warp">Warp</Radio>
                <Radio value="Weft">Weft</Radio>
              </Radio.Group>
            </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item label=" Finish" name="finishId"
              >
                <Select   showSearch placeholder="Select Finish" optionFilterProp="children"
                  allowClear
                >
                    {fabricFinish.map((e) => {
                      return (
                      <Option key={e.fabricFinishTypeId} value={e.fabricFinishTypeId}>
                        {e.fabricFinishType}
                      </Option>
                    )})}
                  </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item label=" Shrinkage" name="shrinkage" >
                <Input placeholder=" Enter  Shrinkage"  />
              </Form.Item>
            </Col>
          {/* </Row> */}
          {/* <Row gutter={24}> */}
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item label=" Content" name="content" >
                <Select showSearch placeholder="Select Content" allowClear optionFilterProp="children" >
                  {contentData.map((e) => (
                      <Option key={e.contentId} value={e.contentId}>
                        {e.content}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}> */}
            {/* </Row> */}
            <Row>
            <Col span={24} style={{ textAlign: "right" }}>
            <span style={{paddingRight:"10px"}}><Button type="primary" onClick={createReqCode}>
              Request
            </Button></span>
            <Button type="primary" onClick={() => onFinish(form.getFieldsValue())}>
              Search
            </Button>
              <Button
                htmlType="button"
                style={{ margin: "0 14px" }}
                onClick={clearData}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default M3FabricFilters;
