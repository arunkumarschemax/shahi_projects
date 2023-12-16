import {
  BuyersService,
  FabricTypeService,
  FabricWeaveService,
  M3ItemsService,
  UomService,
} from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Radio, Row, Select, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import AlertMessages from "../../common/common-functions/alert-messages";
import {
  FabricTypeIdReq,
  M3ItemsDTO,
  UomCategoryEnum,
  m3ItemsContentEnum,
} from "@project-management-system/shared-models";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
const {Option} = Select

const M3Items = () => {
  const service = new M3ItemsService();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [uom, setUom] = useState<any[]>([]);
  const [weightData, setWeightData] = useState<any[]>([]);
  const [yarnData, setYarnData] = useState<any[]>([]);
  const [widthData, setWidthData] = useState<any[]>([]);
  const [buyer, setBuyer] = useState<any[]>([]);
  const uomService = new UomService();
  const fabricService = new FabricTypeService();
  const weaveService = new FabricWeaveService();
  const [weave, setWeave] = useState<any[]>([]);
  const buyerService = new BuyersService();
  const [fabricType, setFabricType] = useState<any[]>([]);
  const [formData, setFormData] = useState([...Array(5)].map(() => ({ content: '', percentage: '' })));

  const getVarcodeDefaultValue = (defaultCode: string) => {
    console.log(defaultCode);
    // if(code==''){
    form.setFieldsValue({
      description: defaultCode,
    });
    // }
  }

  const generateItemCode = (value?) => {
    getWeaveData(value)
    // console.log(form.getFieldsValue())
    let buyerDetails = buyer.find((e) => e.buyerId === form.getFieldValue("buyerId"))?.shortCode;
    const buyersData = buyerDetails != undefined? buyerDetails + '/' : "";
    form.setFieldsValue({buyerCode:buyerDetails != undefined ? buyerDetails : ""});
    // console.log(buyersData)
    // console.log(buyer.find((e) => e.buyerId === form.getFieldValue("buyerId")));
    const Content = form.getFieldValue("content") != undefined ? form.getFieldValue("content") + '/' : "" ;
    // console.log(Content);

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

    let weaveDetails = weave.find((e) => e.fabricWeaveId === form.getFieldValue("weave"))?.fabricWeaveName;
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

    let fabricTypeDetails = fabricType.find((e) => e.fabricTypeId === form.getFieldValue("fabricType"))?.fabricTypeName;
    const fabricTypeData =  fabricTypeDetails != undefined ? fabricTypeDetails + '/' : "" ;
    // console.log(fabricTypeData);

    // let code = buyersData != undefined? buyersData:""+"/"+Content!=undefined?Content:""+"/"+fabricTypeData!=undefined?fabricTypeData:""+"/"+weaveData!=undefined?weaveData:""+"/"+weight+weightUnit!=undefined?weightUnit:""+"/"+width+widthUnit+"/"+construction+"/"+yarnCount+yarnUnit+"/"+finish+"/"+shrinkage;
    // console.log(code);
    getVarcodeDefaultValue(`${buyersData != undefined ? buyersData : ''}${Content != undefined ? Content : ''}${fabricTypeData != undefined ? fabricTypeData : ''}${weaveData != undefined ? weaveData : ''}${weight != undefined ? weight + ' ' : ''}${weightUnit != undefined ? weightUnit : ''}${width != undefined ? width + ' ' : ''}${widthUnit != undefined ? widthUnit : ''}${construction != undefined ? construction : ''}${yarnCount != undefined ? yarnCount + ' ' : ''}${yarnUnit != undefined ? yarnUnit : ''}${finish != undefined ? finish : ''}${shrinkage != undefined ? shrinkage : ''}`);
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
    // getWeaveData();
    getBuyers();
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
console.log(formData,'---------------------')
     const req = new M3ItemsDTO(0,val.itemCode,val.content,val.fabricType,val.weave,val.weight,val.weightUnit,val.construction,val.yarnCount,val.yarnUnit,val.width,val.widthUnit,val.finish,val.shrinkage,val.buyerId,val.description,val.buyerCode,null,null,null,null,val.hsnCode)
     console.log(req,"LLLLLLLLLLLLLLLLLLLL");

     
    service
      .createM3Items(req)
      .then((res) => {
        if (res.status) {
          AlertMessages.getSuccessMessage(res.internalMessage);
          setTimeout(() => {
            message.success("Submitted successfully");
            // window.location.reload();
            navigate('/m3-items-view')
          }, 500);
        }
        else{
          AlertMessages.getWarningMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const clearData = () => {
    form.resetFields();
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
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
            <Form.Item label=" Fabric Type" name="fabricType" rules={[{ required: false, message: "Field is required" }]}>
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
            <Form.Item label=" Weave" name="weave" rules={[{ required: true, message: "Field is required" }]}>
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
          {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item label="Content" name="content" rules={[{ required: true, message: "Field is required" }]}>
              <Select
              optionFilterProp="children"
              placeholder=" Select Content"
              onChange={generateItemCode}
              >
                {Object.keys(m3ItemsContentEnum).sort().map((content) => (
                <Select.Option key={m3ItemsContentEnum[content]} value={m3ItemsContentEnum[content]} >
                  {m3ItemsContentEnum[content]}
                </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col> */}
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item label="Weight" name="weight" rules={[{ required: false, message: "Field is required" }]}>
              <Space.Compact>
                <Input placeholder="Enter Weight" allowClear />
                <Select  allowClear placeholder="Unit" >
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
              <Form.Item label="Width" name="width" rules={[{ required: false, message: "Field is required" }]} >
                <Space.Compact>
                  <Input placeholder="Enter Width" allowClear/>
                  <Select  allowClear placeholder="Unit">
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
              <Form.Item label="Construction" name="weight" rules={[{ required: false, message: "Field is required" }]}>
                <Space.Compact>
                  <Input placeholder="Enter EPI" allowClear />
                  <Input placeholder="Enter PPI" allowClear />
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
              Yarn Count :   <Radio.Group name='yarnCount' style={{marginTop:"25px"}}>
                <Radio value={'Wrap'}>Wrap</Radio>
                <Radio value={'Weft'}>Weft</Radio>
              </Radio.Group>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item label=" Finish" name="finish" rules={[
                  { required: true, message: 'Field is required' },
                ]}
              >
                <Input placeholder=" Enter  Finish" onBlur={generateItemCode} />
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }} xl={{ span: 8 }}>
              <Card>
                {[...Array(3)].map((_, index) => (
                  <Row key={index} style={{ marginBottom: '16px' }} gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                      <Form.Item name={`count${index}`} rules={[{ required: false, message: 'Field is required' }]}>
                        <Space.Compact>
                          <Input placeholder="Enter Count" allowClear />
                          <Select allowClear placeholder="Unit">
                            {weightData.map((e) => (
                              <Option key={e.uomId} value={e.uomId}>
                                {e.uom}
                              </Option>
                            ))}
                          </Select>
                        </Space.Compact>
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }} xl={{ span: 8 }}>
            <Card>
              {formData.map((data, index) => (
                <Row key={index} style={{ marginBottom: '16px' }} gutter={24}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                    <Form.Item name={`content${index}`} rules={[{ required: false, message: 'Field is required' }]}>
                      <Space.Compact>
                        <Input
                          placeholder="Enter Content"
                          allowClear
                          value={data.content}
                          onChange={(e) => handleInputChange(index, 'content', e.target.value)}
                        />
                        <Input
                          placeholder="Enter %"
                          allowClear
                          value={data.percentage}
                          onChange={(e) => handleInputChange(index, 'percentage', e.target.value)}
                        />
                      </Space.Compact>
                    </Form.Item>
                  </Col>
                </Row>
              ))}
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
