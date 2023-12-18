import {BuyersService,FabricTypeService,FabricWeaveService,FinishService,M3ItemsService,UomService,WeightService } from"@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Radio, Row, Select, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import AlertMessages from "../../common/common-functions/alert-messages";
import {FabricContentDto, FabricTypeIdReq,M3FabricsDTO,M3ItemsDTO,UomCategoryEnum,m3ItemsContentEnum} from "@project-management-system/shared-models";
import { useNavigate } from "react-router-dom";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const {Option} = Select

const M3Items = () => {
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
  const [yarnType, setYarnType] = useState<any[]>([])
  const [epiData, setEPIData] = useState<any[]>([])
  const [ppiData, setPPIData] = useState<any[]>([])
  const [weightChange, setWeightChange] = useState<number>()
  const [widthChange, setWidthChange] = useState<any[]>([])
  const [widthUom, setWidthUom] = useState<any[]>([])
  const [weightUom, setWeightUom] = useState<number>()
  const [fabricContent, setFabricContent]= useState<any[]>([])
  const [yarn, setYarn]= useState([{count:'',uomId: null}])
  const [yarnUom, setYarnUom]= useState<any[]>([])
  const [onContent, setOnContent] = useState<any[]>([])
  const [onPercent, setOnPercent] = useState<any[]>([])
  const [formData, setFormData] = useState([{ content: '', percentage: null }]);

  const service = new M3ItemsService();
  const uomService = new UomService();
  const fabricService = new FabricTypeService();
  const weaveService = new FabricWeaveService();
  const weightService = new WeightService()
  const buyerService = new BuyersService();
  const finishService = new FinishService()


  const getVarcodeDefaultValue = (defaultCode: string) => {
    console.log(defaultCode);
    // if(code==''){
    form.setFieldsValue({
      description: defaultCode,
    });
    // }
  }

  const getAllWeights = ()=>{
    weightService.getAllActiveWeight().then((res)=>{
      if(res.status){
        setWeight(res.data)
      }
    })
  }

  const getAllFinish = ()=>{
    finishService.getFabricFinishData().then((res)=>{
      if(res.status){
        setFabricFinish(res.data)
      }
    })
  }

  const generateItemCode = (value?) => {
    getWeaveData(value)
    // console.log(form.getFieldsValue())
    let buyerDetails = buyer.find((e) => e.buyerId === form.getFieldValue("buyerId"))?.shortCode;
    const buyersData = buyerDetails != undefined? buyerDetails + '/' : "";
    form.setFieldsValue({buyerCode:buyerDetails != undefined ? buyerDetails : ""});
    console.log(buyersData)
    // console.log(buyer.find((e) => e.buyerId === form.getFieldValue("buyerId")));
    // const Content = form.getFieldValue("content") != undefined ? form.getFieldValue("content") + '/' : "" ;
    // // console.log(Content);

    const weight = form.getFieldValue("weight") != undefined ? form.getFieldValue("weight") : "";
    // console.log(weight);

    const construction = form.getFieldValue("construction") != undefined ? form.getFieldValue("construction") + '/' : "" ;
    // console.log(construction);

    const yarnCount = form.getFieldValue("yarnCount") != undefined ? form.getFieldValue("yarnCount") : "";
    // console.log(yarnCount);

    const finish = form.getFieldValue("finish") != undefined ? form.getFieldValue("finish") + '/' : "" ;
    // console.log(finish);


    const shrinkage = form.getFieldValue("shrinkage") != undefined ? form.getFieldValue("shrinkage") : "";
    // console.log(shrinkage);

    let weightDetails = weightData.find((e) => e.uomId === form.getFieldValue("weightUnit"))?.uom;
    const weightUnit = weightDetails != undefined ? weightDetails + '/' : ""  ;
    // console.log(weightUnit);

    let weaveDetails = weave.find((e) => e.fabricWeaveId === form.getFieldValue("weaveId"))?.fabricWeaveName;
    const weaveData = weaveDetails != undefined ? weaveDetails + '/' : ""  ;
    // console.log(weaveData);

    let yarnDetails = yarnData.find((e) => e.uomId === form.getFieldValue("yarnUnit"))?.uom;
    const yarnUnit = yarnDetails != undefined ?  yarnDetails + '/' : ""  ;
    // console.log(yarnUnit);

    const width = form.getFieldValue("width") != undefined ? form.getFieldValue("width") : "";
    // console.log(width);

    let widthDetails = widthData.find((e) => e.uomId === form.getFieldValue("widthUnit"))?.uom;
    const widthUnit = widthDetails != undefined ? widthDetails + '/' : ""  ;
    // console.log(widthUnit);

    let fabricTypeDetails = fabricType.find((e) => e.fabricTypeId === form.getFieldValue("fabricTypeId"))?.fabricTypeName;
    const fabricTypeData =  fabricTypeDetails != undefined ? fabricTypeDetails + '/' : "" ;
    // console.log(fabricTypeData);

    // let code = buyersData != undefined? buyersData:""+"/"+Content!=undefined?Content:""+"/"+fabricTypeData!=undefined?fabricTypeData:""+"/"+weaveData!=undefined?weaveData:""+"/"+weight+weightUnit!=undefined?weightUnit:""+"/"+width+widthUnit+"/"+construction+"/"+yarnCount+yarnUnit+"/"+finish+"/"+shrinkage;
    // console.log(code);
    getVarcodeDefaultValue(`${buyersData != undefined ? buyersData : ''}${fabricTypeData != undefined ? fabricTypeData : ''}${weaveData != undefined ? weaveData : ''}${weight != undefined ? weight + ' ' : ''}${weightUnit != undefined ? weightUnit : ''}${width != undefined ? width + ' ' : ''}${widthUnit != undefined ? widthUnit : ''}${construction != undefined ? construction : ''}${yarnCount != undefined ? yarnCount + ' ' : ''}${yarnUnit != undefined ? yarnUnit : ''}${finish != undefined ? finish : ''}${shrinkage != undefined ? shrinkage : ''}`);
    // form.setFieldsValue({"itemCode":code})
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
  }, []);

  const getUom = () => {
    uomService.getAllUoms().then((res) => {
      if (res.status) {
        const yarn = res.data.filter(
          (rec) => rec.uomCategory == UomCategoryEnum.LENGTH
        );
        const weight = res.data.filter(
          (rec) => rec.uomCategory == UomCategoryEnum.MASS
        );
        const width = res.data.filter(
          (rec) => rec.uomCategory == UomCategoryEnum.AREA
        );
        setYarnData(yarn);
        setWeightData(weight);
        setWidthData(width);
        setUom(res.data);
      }
    });
  };

  const onFinish = (val) => {

  const totalPercentage = formData.reduce((sum, item) => sum + (item.percentage || 0), 0);
  if (totalPercentage !== 100) {
    AlertMessages.getErrorMessage("Total percentage must be equal to 100.");
    return;
  }
  
  if (yarnType.length > 0) {
    const yarnCountInvalid = yarn.some((item) => item.count === '' || item.uomId === null);
    if (yarnCountInvalid) {
      AlertMessages.getErrorMessage("Yarn count should not be empty, and uomId should not be null.");
      return;
    }
  }


    console.log(formData,'on content')
     const req = new M3FabricsDTO(0,val.buyerId,val.itemCode,val.fabricTypeId,val.weaveId,weightChange,weightUom,epiData,ppiData,yarnType,widthChange,widthUom,val.finishId,val.shrinkage,val.description,val.buyerCode,val.m3Code,val.hsnCode,yarn,formData)
     console.log(req,"LLLLLLLLLLLLLLLLLLLL");
    service.createM3Items(req).then((res) => {
      if (res.status) {
        AlertMessages.getSuccessMessage(res.internalMessage);
        setTimeout(() => {
          message.success("Submitted successfully")
          navigate('/m3-items-view')
        }, 500)
      }else{
        AlertMessages.getWarningMessage(res.internalMessage);
      }}).catch((err) => {
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const clearData = () => {
    form.resetFields();
  };

  const yarnSelect = (val) =>{
    setYarnRadio(true)
    setYarnType(val)
  }

  const epiChange = (val)=>{
    console.log(val,'epi change')
    setEPIData(val)
  }

  const ppiChange =(val)=>{
    console.log(val,'ppi change')
    setPPIData(val)
  }

  const onWeightChange =(val)=>{
    console.log(val,'weight change')
    setWeightChange(val)
  }

  const onWeightUom =(val)=>{
    console.log(val,'weight uom change')
    setWeightUom(val)
  }

  const onWidthChange =(val)=>{
    console.log(val,'width change')
    setWidthChange(val)
  }

  const onWidthUomChange =(val)=>{
    console.log(val,'width uom change')
    setWidthUom(val)
  }

  const onContentChange = (index, value) => {
    setFormData((prevData) => {
      const updatedFormData = [...prevData];
      if (updatedFormData[index]) {
        updatedFormData[index].content = value;
      } else {
        updatedFormData[index] = { content: value, percentage: null };
      }
      return updatedFormData;
    });
  };
  
  // Function to handle percentage change
  const onPercentChange = (index, value) => {
    setFormData((prevData) => {
      const updatedFormData = [...prevData];
      if (updatedFormData[index]) {
        updatedFormData[index].percentage = value !== '' ? Number(value) : null;
      } else {
        updatedFormData[index] = { content: null, percentage: value !== '' ? Number(value) : null };
      }
      return updatedFormData;
    });
  };
  


  const handleYarnCountChange = (index, value) => {
  setYarn((prevData) => {
    const updatedFormData = [...prevData];
    if (updatedFormData[index]) {
      updatedFormData[index].count = value;
    } else {
      updatedFormData[index] = { count: value, uomId: null };
    }
    return updatedFormData;
  });
};

const handleYarnUnitChange = (index, value) => {
  setYarn((prevData) => {
    const updatedFormData = [...prevData];
    if (updatedFormData[index]) {
      updatedFormData[index].uomId = value;
    } else {
      updatedFormData[index] = { count: null, uomId: value };
    }
    return updatedFormData;
  });
};


  

  return (
  <div>
    <Card
    title={<span>M3 Items</span>}
    headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
    extra={<Button onClick={() => navigate("/m3-items-view")}type="primary">View</Button>}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item name="buyerId" label="Buyer" rules={[{ required: true, message: "Buyer is required" }]}>
              <Select
              allowClear
              showSearch
              optionFilterProp="children"
              placeholder="Select Buyer"
              onChange={generateItemCode}
              >
                {buyer.map((e) => {
                  return (<Option key={e.buyerId} value={e.buyerId}>
                    {`${e.buyerCode} - ${e.buyerName}`}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col style={{display:"none"}}>
            <Form.Item name="buyerCode" rules={[{ required: true, message: "BuyerCode is required" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item label=" Fabric Type" name="fabricTypeId" rules={[{ required: true, message: "Field is required" }]}>
              <Select 
              placeholder=" Select Fabric Type" 
              onChange={generateItemCode}
              >
                {fabricType.map((option) => (
                <Option key={option.fabricTypeId} value={option.fabricTypeId}>
                  {option.fabricTypeName}
                </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item label=" Weave" name="weaveId" rules={[{ required: true, message: "Field is required" }]}>
              <Select 
              placeholder=" Select Weave" 
              onChange={generateItemCode}
              >
                {weave.map((option) => (
                <Option key={option.weaveId} value={option.weaveId}>
                  {option.weaveName}
                </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item label="Weight" name="weightId" rules={[{ required: false, message: "Field is required" }]}>
            <Space.Compact>
                <Select allowClear placeholder="Select Weight" onChange={onWeightChange}>
                  {weight.map((e) => (
                    <Option key={e.weightId} value={e.weightId}>
                      {e.weight}
                    </Option>
                  ))}
                </Select>
                <Select allowClear placeholder="Select Unit" onChange={onWeightUom}>
                  {weightData.map((e) => (
                    <Option key={e.uomId} value={e.uomId}>
                      {e.uom}
                    </Option>
                  ))}
                </Select>
            </Space.Compact>
            </Form.Item>
          </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item label="Width" name="width" rules={[{ required: true, message: "Field is required" }]} >
                <Space.Compact>
                  <Input placeholder="Enter Width" allowClear onChange={(e)=>onWidthChange(e?.target?.value)}/>
                  <Select  allowClear placeholder="Select Unit" onChange={onWidthUomChange}>
                    {weightData.map((e) => {
                      return (
                      <Option key={e.uomId} value={e.uomId}>
                        {e.uom}
                      </Option>
                    )})}
                  </Select>
                </Space.Compact>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item label="Construction" name="construction" rules={[{ required: false, message: "Field is required" }]}>
                <Space.Compact>
                  <Input placeholder="Enter EPI" allowClear onChange={(e) => epiChange(e?.target?.value)}/>
                  <Input placeholder="Enter PPI" allowClear onChange={(e) => ppiChange(e?.target?.value)}/>
                </Space.Compact>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="m3Code" label="M3 Code" >
                    <Input placeholder="Enter M3 Code"/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="hsnCode" label="HSN Code" >
                    <Input placeholder="Enter HSN Code"/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
            <Form.Item name="yarnType">
              Yarn Type : <Radio.Group name="yarnType" style={{ marginTop: "25px" }} onChange={(e)=>yarnSelect(e?.target?.value)}>
                <Radio value="Wrap">Wrap</Radio>
                <Radio value="Weft">Weft</Radio>
              </Radio.Group>
            </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item label=" Finish" name="finishId" rules={[
                  { required: true, message: 'Field is required' },
                ]}
              >
                <Select  allowClear placeholder="Select Unit">
                    {fabricFinish.map((e) => {
                      return (
                      <Option key={e.finishId} value={e.finishId}>
                        {e.finish}
                      </Option>
                    )})}
                  </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item label=" Shrinkage" name="shrinkage"  rules={[{ required: true, message: 'Field is required' },]}>
                <Input placeholder=" Enter  Shrinkage"  onBlur={generateItemCode}/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="description" label="Description" rules={[{required: true,message: 'Description is required'},
              ]}
            >
              <TextArea rows={2}  disabled />
            </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
          {yarnRadio && (
  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }} xl={{ span: 8 }}>
    <Card>
      <Form.List name="yarnCount" initialValue={[{ count: '', uomId: null }]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Row key={field.key} style={{ marginBottom: '16px' }} gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'count']}
                    fieldKey={[field.fieldKey, 'count']}
                    rules={[{ required: false, message: 'Field is required' }]}
                  >
                    <Space.Compact>
                      <Input
                        placeholder="Enter Count"
                        allowClear
                        onChange={(e) => handleYarnCountChange(index, e.target.value)}
                      />
                      <Select
                        allowClear
                        placeholder="Unit"
                        onChange={(value) => handleYarnUnitChange(index, value)}
                      >
                        {weightData.map((e) => (
                          <Option key={e.uomId} value={e.uomId}>
                            {e.uom}
                          </Option>
                        ))}
                      </Select>
                      {fields.length > 1 && (
                        <MinusOutlined
                          style={{ fontSize: '16px', cursor: 'pointer', marginLeft: '8px' }}
                          onClick={() => remove(field.name)}
                        />
                      )}
                    </Space.Compact>
                  </Form.Item>
                </Col>
              </Row>
            ))}
            {fields.length < 3 && (
              <Row justify="center">
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 14 }} lg={{ span: 12 }} xl={{ span: 10 }}>
                  <Button type="dashed" onClick={() => add()} style={{ width: '60%', marginTop: '16px' }}>
                    Add
                  </Button>
                </Col>
              </Row>
            )}
          </>
        )}
      </Form.List>
    </Card>
  </Col>
)}

            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }} xl={{ span: 8 }}>
              <Card>
              <Form.List name="content" initialValue={[{ content: '', percentage: null }]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Row key={field.key} style={{ marginBottom: '16px' }} gutter={24}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'content']}
                            fieldKey={[field.fieldKey, 'content']}
                            rules={[{ required: false, message: 'Field is required' }]}
                          >
                            <Space.Compact>
                              <Input
                                placeholder="Enter content"
                                allowClear
                                onChange={(e) => onContentChange(index, e?.target?.value)}
                              />
                              <Input
                                placeholder="Enter %"
                                allowClear
                                onChange={(e) => onPercentChange(index, e.target.value)}
                              />
                              {fields.length > 1 && (
                                <MinusOutlined
                                  style={{ fontSize: '16px', cursor: 'pointer', marginLeft: '8px' }}
                                  onClick={() => remove(field.name)}
                                />
                              )}
                            </Space.Compact>
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                    {fields.length < 5 && (
                      <Row justify="center">
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 14 }} lg={{ span: 12 }} xl={{ span: 10 }}>
                          <Button type="dashed" onClick={() => add()} style={{ width: '70%', marginTop: '16px' }}>
                            Add
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </>
                )}
              </Form.List>
              </Card>
            </Col>
            </Row>
            <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Submit
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

export default M3Items;
