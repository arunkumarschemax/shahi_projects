import {BuyersService,ContentService,FabricFinishTypeService,FabricTypeService,FabricWeaveService,FinishService,M3ItemsService,UomService,WeightService } from"@project-management-system/shared-services";
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
  const [yarnType, setYarnType] = useState('');  
  const [epiData, setEPIData] = useState<any[]>([])
  const [ppiData, setPPIData] = useState<any[]>([])
  const [weightChange, setWeightChange] = useState<number>()
  const [widthChange, setWidthChange] = useState<any[]>([])
  const [widthUom, setWidthUom] = useState<any[]>([])
  const [weightUom, setWeightUom] = useState<number>()
  const [fabricContent, setFabricContent]= useState<any[]>([])
  const [yarn, setYarn]= useState([{count:'',uomId: null}])
  const [onContent, setOnContent] = useState<any[]>([])
  const [onPercent, setOnPercent] = useState<any[]>([])
  const [formData, setFormData] = useState([{ content: '', percentage: null }]);
  const [contentData, setContentData] = useState<any[]>([])
  const [weightUomData, setWeightUomData] = useState<any[]>([])
  const [yarnUom, setYarnUom]= useState<any[]>([])
  const [selectedContentValues, setSelectedContentValues] = useState([]);

  const service = new M3ItemsService();
  const uomService = new UomService();
  const fabricService = new FabricTypeService();
  const weaveService = new FabricWeaveService();
  const weightService = new WeightService()
  const buyerService = new BuyersService();
  const finishService = new FinishService()
  const fabFinishService = new FabricFinishTypeService()
  const contentService = new ContentService()

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

  const generateItemCode = () => {
    const buyerId = form.getFieldValue("buyerId");
    const fabricTypeId = form.getFieldValue("fabricTypeId");
    const weaveId = form.getFieldValue("weaveId");
    const weightUomId = form.getFieldValue("weightUomId");
    const weightValue = form.getFieldValue("weightValue");
    const contentId = form.getFieldValue("contentId");
    const finishId = form.getFieldValue("finishId");
    const shrinkage = form.getFieldValue("shrinkage");
    const epi = form.getFieldValue("epiConstruction")
    const ppi = form.getFieldValue("ppiConstruction")
    const yarnTypeInfo = form.getFieldValue("yarnType");
  
    const buyerDetails = buyer.find((e) => e.buyerId === buyerId)?.shortCode || "";
    console.log(buyerDetails,'........kl')
    console.log(buyerId,'kllkl')
    const fabricTypeDetails = fabricType.find((e) => e.fabricTypeId === fabricTypeId)?.fabricTypeName || "";
    const weaveDetails = weave.find((e) => e.weaveId === weaveId)?.weaveName || "";
    const weightUomInfo = weightUomData.find((e) => e.id === weightUomId)?.uom || "";
    const weightInfo = weightValue !== undefined ? weightValue  : "";
    const finishInfo = fabricFinish.find((e)=>e.fabricFinishTypeId === finishId)?.fabricFinishType || "";
    const shrinkageInfo = shrinkage !== undefined ? shrinkage : "";
    const epiInfo = epi != undefined? epi :"";
    const ppiInfo = ppi != undefined ? ppi :""
    const yarnTypeDetails = yarnTypeInfo != undefined ? yarnTypeInfo :"";

    const yarnDetails = yarn.map((yarnItem) => {
      const count = yarnItem.count || '';
      const uomId = yarnItem.uomId;
      const uom = uomId !== null ? yarnUom.find((e) => e.id === uomId)?.uom || '' : '';
      return `${count}${uom}`;
    }).join(', ');
  
    const contentInfo = formData.map((cont)=>{
      const content = cont.content || '';
      const percentage = cont.percentage
      const data = contentData.find((e)=>e.contentId === content )?.content || ''
      return`${data}${percentage}`
    })
  
    const buyersData = buyerDetails + '...';
    console.log(buyersData,'........114 line')
    const fabricTypeData = fabricTypeDetails + '...';
    const weaveData = weaveDetails + '...';
    const finishData = finishInfo + '...'
    const epiData = epiInfo + '-';
    const ppiData = ppiInfo + '...';
    const yarnInfo = yarnDetails + '...';
  
    getVarcodeDefaultValue(`${buyersData}${fabricTypeData}${weaveData}${yarnDetails}${epiData}${ppiData}${contentInfo}${finishData}${shrinkageInfo}${weightInfo}${weightUomInfo}`);
  };
  

  const getVarcodeDefaultValue = (defaultCode: string) => {
    console.log(defaultCode);
    // if(code==''){
    form.setFieldsValue({
      description: defaultCode,
    });
    // }
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

  const onFabricTpe = (val) =>{
    generateItemCode()
    getWeaveData(val)
  }

  useEffect(() => {
    getUom();
    getFabricTypedata();
    getBuyers();
    getAllWeights()
    getAllFinish()
    getAllContents()
    getWeightUom()
    getYarnUom()
  }, []);

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
        form.setFieldValue('widthUomId',res?.data[2].uomId)
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

  const onBuyerChange = (val,option)=>{
    generateItemCode()
    form.setFieldValue('buyerCode', option?.name)
  }

  const onFinish = (val) => {
console.log('coming')
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
     const req = new M3FabricsDTO(0,val.buyerId,val.itemCode,val.fabricTypeId,val.weaveId,weightChange,weightUom,epiData,ppiData,yarnType,widthChange,form.getFieldValue('widthUomId'),val.finishId,val.shrinkage,val.description,val.buyerCode,val.m3Code,val.hsnCode,yarn,formData)
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

  const onWeightUom =(val,option)=>{
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
              onChange={onBuyerChange}
              >
                {buyer.map((e) => {
                  return (<Option key={e.buyerId} value={e.buyerId} name={e.shortCode}>
                    {`${e.buyerCode} - ${e.buyerName}`}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
            <Form.Item name="buyerCode" rules={[{ required: true, message: "BuyerCode is required" }]} hidden>
              <Input />
            </Form.Item>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item label=" Fabric Type" name="fabricTypeId" rules={[{ required: true, message: "Field is required" }]}>
              <Select 
              placeholder=" Select Fabric Type" 
              onChange={onFabricTpe}
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
              <Form.Item name='weightValue'>
              <Input placeholder="Enter Weight" allowClear onChange={(e)=>onWeightChange(e?.target?.value)} onBlur={generateItemCode}/>
              </Form.Item>
              <Form.Item name='weightUomId'>
                <Select allowClear placeholder="Select Unit" onChange={onWeightUom} onBlur={generateItemCode}>
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item label="Width" name="widthValue" rules={[{ required: false, message: "Field is required" }]} >
                <Space.Compact>
                  <Form.Item name="width">
                  <Input placeholder="Enter Width" allowClear onChange={(e)=>onWidthChange(e?.target?.value)}/>
                  </Form.Item>
                  <Form.Item name='widthUomId'>
                  <Select  allowClear placeholder="Select Unit" onChange={onWidthUomChange}>
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item label="Construction" name="construction" rules={[{ required: false, message: "Field is required" }]}>
                <Space.Compact>
                  <Form.Item name='epiConstruction'>
                  <Input placeholder="Enter EPI" allowClear onChange={(e) => epiChange(e?.target?.value)}/>
                  </Form.Item>
                  <Form.Item name='ppiConstruction'>
                  <Input placeholder="Enter PPI" allowClear onChange={(e) => ppiChange(e?.target?.value)}/>
                  </Form.Item>
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
            <Form.Item name="yarnT">
              Yarn Type : <Radio.Group name="yarnType" style={{ marginTop: "25px" }} onChange={(e)=>yarnSelect(e?.target?.value)} onBlur={generateItemCode}>
                {/* <Form.Item name='yarnType'> */}
                <Radio value="Wrap">Wrap</Radio>
                <Radio value="Weft">Weft</Radio>
                {/* </Form.Item> */}
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
                      <Option key={e.fabricFinishTypeId} value={e.fabricFinishTypeId}>
                        {e.fabricFinishType}
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
                                  placeholder="Yarn Count"
                                  allowClear
                                  onChange={(e) => handleYarnCountChange(index, e.target.value)}
                                  onBlur={generateItemCode}
                                />
                                <Select
                                  allowClear
                                  placeholder="Unit"
                                  onChange={(value) => handleYarnUnitChange(index, value)}
                                  onBlur={generateItemCode}
                                >
                                  {yarnUom.map((e) => (
                                    <Option key={e.id} value={e.id}>
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
                            {/* <Form.Item name='contentId'> */}
                            <Select
                                  allowClear
                                  placeholder="Select Content"
                                  onChange={(value) => onContentChange(index, value)}
                                  onBlur={generateItemCode}
                                >
                                  {contentData.map((e) => (
                                    <Option key={e.contentId} value={e.contentId}>
                                      {e.content}
                                    </Option>
                                  ))}
                                </Select>
                              {/* </Form.Item> */}
                              {/* <Form.Item name='percentage'> */}
                              <Input
                                placeholder="Enter %"
                                allowClear
                                onChange={(e) => onPercentChange(index, e.target.value)}
                              />
                              {/* </Form.Item> */}
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
