import {BuyersService,CategoryService,ColourService,ContentService,FabricRequestCodeService,FabricStructuresService,FinishService,HoleService,M3ItemsService,M3TrimsService,QualitysService,StructureService,ThicknessService,TrimParamsMappingService,TrimService,TypeService,UomService,VarietyService} from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ItemTypeEnum, ItemTypeEnumDisplay, LogoEnum, LogoEnumDisplay, M3ItemsDTO, M3TrimFilterReq, M3trimsDTO, PartEnum, PartEnumDisplay, TrimIdRequestDto, TrimRequestCodeDto } from "@project-management-system/shared-models";
import FormItem from "antd/es/form/FormItem";
import AlertMessages from "../common/common-functions/alert-messages";

const { TextArea } = Input;
const { Option } = Select;

export interface M3Trimprps{
  trimCategoryId:number
 close: (value: any) => void;
 formValues:any
 buyerId?: number
 trimType?: string
}


export function M3TrimsReqFile(props:M3Trimprps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const categoryService = new CategoryService();
  const contentService = new ContentService();
  const typeService = new TypeService();
  const finishService = new FinishService();
  const holeService = new HoleService();
  const trimService = new TrimService();
  const paramsService = new TrimParamsMappingService()
  const m3TrimService = new M3TrimsService()
  const structureService = new StructureService();
  const qtyService = new QualitysService();
  const thickService = new ThicknessService();
  const varietyService = new VarietyService();
  const uomService = new UomService();
  const colorService = new ColourService();

  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [contentData, setContentData] = useState<any[]>([]);
  const [typeData, setTypeData] = useState<any[]>([]);
  const [finishData, setFinishData] = useState<any[]>([]);
  const [holeData, setHoleData] = useState<any[]>([]);
  const [trimData, setTrimData] = useState<any[]>([]);
  const [mapData, setMapData] = useState<any[]>([])
  const [mapDataId, setMapDataId] = useState<any[]>([])
  const [structureData, setStructureData] = useState<any[]>([]);
  const [qtyData, setQtyData] = useState<any[]>([]);
  const [thickData, setThickData] = useState<any[]>([]);
  const [varietyData, setVarietyData] = useState<any[]>([]);
  const [uomData, setUomData] = useState<any[]>([]);
  const [colorData, setColorData] = useState<any[]>([]);

  const trimReqCodeService = new FabricRequestCodeService()
  useEffect(() =>{
    if(props.trimCategoryId != undefined){
      getMappedTrims(props.trimCategoryId)
      form.setFieldsValue({trimCategoryId : props.trimCategoryId})
    }
    if (props.buyerId !== undefined) {
      form.setFieldsValue({ buyerId: props.buyerId });
    }
    if (props.trimType !== undefined) {
      form.setFieldsValue({ trimType: props.trimType });
    }
  },[props.trimCategoryId,props.buyerId,props.trimType])

  const getMappedTrims = (value) => {
    const req = new TrimIdRequestDto(value)
    paramsService.getMappedParamsByTrim(req).then((res) => {
      if (res.status) {
        setMapData(res.data)
        form.setFieldsValue({trimMappingId:res.data[0].trimMappingId})
        setMapDataId(res.data[0]?.trimMappingId)
      }
    });
  }

  useEffect(() => {
    if (mapData[0]?.category === true) {
      getCategories();
    }
    if (mapData[0]?.content === true) {
      getContents();
    }
    if (mapData[0]?.type === true) {
      getTypes();
    }
    if (mapData[0]?.finish === true) {
      getFinishes();
    }
    if (mapData[0]?.hole === true) {
      getHoles();
    }
    if (mapData[0]?.structure === true) {
      getStructures();
    }
    if (mapData[0]?.quality === true) {
      getQuality();
    }
    if (mapData[0]?.thickness === true) {
      getThicks();
    }
    if (mapData[0]?.variety === true) {
      getVarieties();
    }
    if (mapData[0]?.uom === true) {
      getUom();
    }
    if (mapData[0]?.color === true) {
      getColors();
    }

  }, [mapData]);

  const getCategories = () => {
    categoryService.getAllCategory().then((res) => {
      if (res.status) {
        setCategoryData(res.data);
      }
    });
  };

  const getContents = () => {
    contentService.getAllContent().then((res) => {
      if (res.status) {
        setContentData(res.data);
      }
    });
  };

  const getTypes = () => {
    typeService.getAllTypeInfo().then((res) => {
      if (res.status) {
        setTypeData(res.data);
      }
    });
  };

  const getFinishes = () => {
    finishService.getAllFinish().then((res) => {
      if (res.status) {
        setFinishData(res.data);
      }
    });
  };

  const getHoles = () => {
    holeService.getAllHoles().then((res) => {
      if (res.status) {
        setHoleData(res.data);
      }
    });
  };

  const getStructures = () => {
    structureService.getAllStructureInfo().then((res) => {
      if (res.status) {
        setStructureData(res.data);
      }
    });
  };

  const getQuality = () => {
    qtyService.getAllQualitys().then((res) => {
      if (res.status) {
        setQtyData(res.data);
      }
    });
  };

  const getThicks = () => {
    thickService.getAllThicknessInfo().then((res) => {
      if (res.status) {
        setThickData(res.data);
      }
    });
  };

  const getVarieties = () => {
    varietyService.getAllVariety().then((res) => {
      if (res.status) {
        setVarietyData(res.data);
      }
    });
  };

  const getUom = () => {
    uomService.getAllUoms().then((res) => {
      if (res.status) {
        setUomData(res.data);
      }
    });
  };

  const getColors = () => {
    colorService.getAllColour().then((res) => {
      if (res.status) {
        setColorData(res.data);
      }
    });
  };




  const createReqCode = () => {
    const fieldValues = form.getFieldsValue();
  const excludedFields = ['buyerId', 'trimCategoryId', 'trimType'];
  let hasAtLeastOneValue = false;

  for (const key in fieldValues) {
    if (!excludedFields.includes(key) && fieldValues[key]) {
      hasAtLeastOneValue = true;
      break;
    }
  }

  if (!hasAtLeastOneValue) {
    message.error("At least one field is required for the request", 2);
    return;
  }

      const req = new TrimRequestCodeDto(form.getFieldValue('trimType'),form.getFieldValue('logo'),form.getFieldValue('part'),form.getFieldValue('trimCategoryId'),form.getFieldValue('buyerId'),form.getFieldValue('varietyId'),form.getFieldValue('uomId'),form.getFieldValue('typeId'),form.getFieldValue('thicknessId'),form.getFieldValue('structureId'),form.getFieldValue('qualityId'),form.getFieldValue('holeId'),
      form.getFieldValue('finishId'),form.getFieldValue('contentId'),form.getFieldValue('categoryId'),form.getFieldValue('colorId'),form.getFieldValue('m3Code'),form.getFieldValue('hsnCode'));
      trimReqCodeService.createTrimRequestedCode(req).then((res) => {
        if (res.status) {
          message.success(res.internalMessage, 2);
          // navigate("/sample-development/trim-request-code-view");
        } else {
          message.error(res.internalMessage, 2);
        }
      }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
      });
  };


  const onFinish = (value) => {
    console.log(value)
    const req= new M3TrimFilterReq(value.buyerId,undefined,undefined,value.categoryId,value.contentId,value.finishId,value.holeId,value.hsnCode?value.hsnCode:undefined,value.m3Code?value.m3Code:undefined,value.typeId)
    props.formValues([req])
    props.close(null)
  };

  const onReset = () => {
    form.resetFields();
    props.formValues(undefined)
    props.close(null)
  };



  return (
    <Card 
    title={<span>M3 Trim Items</span>}
      style={{ textAlign: "left" }}
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
    >
      <Form form={form} layout={"vertical"} name="control-hooks" onFinish={onFinish}
      >
        <Row gutter={24}>
        <Form.Item name={'buyerId'} hidden><Input></Input></Form.Item>
        <Form.Item name={'trimCategoryId'} hidden><Input></Input></Form.Item>
        <Form.Item name={'trimType'} hidden><Input></Input></Form.Item>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="m3Code" label="M3 Code" >
                    <Input placeholder="Enter M3 Code"/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="hsnCode" label="HSN Code" >
                    <Input placeholder="Enter HSN Code"/>
                </Form.Item>
            </Col>
            {mapData[0]?.structure === true ? (
              <>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                  <Form.Item
                    name="structureId"
                    label="Structure"
                    rules={[{ required: true, message: "Structure is required" }]}
                  >
                    <Select
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      placeholder="Select Structure"
                    >
                      {structureData.map((e) => (
                        <Option key={e.structureId} value={e.structureId}>
                          {e.structure}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </>
            ) : (<></>)}
            {mapData[0]?.category == true ? (
            <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="categoryId" label="Category">
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Category"
                    >
                        {categoryData.map((e) => {
                            return (
                            <Option key={e.categoryId} value={e.categoryId}>
                                {e.category}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.content === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="contentId" label="Content" >
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Content"
                    >
                        {contentData.map((e) => {
                            return (
                            <Option key={e.contentId} value={e.contentId}>
                                {e.content}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.type === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="typeId" label="Type" >
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Type"
                    >
                        {typeData.map((e) => {
                            return (
                            <Option key={e.typeId} value={e.typeId}>
                                {e.type}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}

                <Form.Item name="trimMappingId" style={{display:'none'}} >
                  <Input hidden/>
                </Form.Item>
            {mapData[0]?.finish === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="finishId" label="Finish">
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Finish"
                    >
                        {finishData.map((e) => {
                            return (
                            <Option key={e.finishId} value={e.finishId}>
                                {e.finish}-{e.finishCode}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.hole === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="holeId" label="Hole" >
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Hole"
                    >
                        {holeData.map((e) => {
                            return (
                            <Option key={e.holeId} value={e.holeId}>
                                {e.hole}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.quality === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="qualityId" label="Quality" rules={[{ required: false, message: "Quality is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Quality"
                    >
                        {qtyData.map((e) => {
                            return (
                            <Option key={e.qualityId} value={e.qualityId}>
                                {e.qualityName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.thickness === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="thicknessId" label="Thickness" rules={[{ required: false, message: "Thickness is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Thickness"
                    >
                        {thickData.map((e) => {
                            return (
                            <Option key={e.thicknessId} value={e.thicknessId}>
                                {e.thickness}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.variety === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="varietyId" label="Variety" rules={[{ required: false, message: "Variety is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Variety"
                    >
                        {varietyData.map((e) => {
                            return (
                            <Option key={e.varietyId} value={e.varietyId}>
                                {e.variety}-{e.varietyCode}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.uom === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="uomId" label="UOM" rules={[{ required: false, message: "UOM is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select UOM"
                    >
                        {uomData.map((e) => {
                            return (
                            <Option key={e.uomId} value={e.uomId}>
                                {e.uom}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.color === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="colorId" label="Color" rules={[{ required: false, message: "Color is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Color"
                    >
                        {colorData.map((e) => {
                            return (
                            <Option key={e.colourId} value={e.colourId}>
                                {e.colour}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
                        {mapData[0]?.logo === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="logo" label="Logo" rules={[{ required: false, message: "Logo is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Logo"
                    >
                        {Object.values(LogoEnum).map((val) => {
                            return <Option key={val} value={val}>{LogoEnumDisplay.find((e)=>e.name == val)?.displayVal}</Option>
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.part === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="part" label="Part" rules={[{ required: false, message: "Part is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Part"
                    >
                        {Object.values(PartEnum).map((val) => {
                            return <Option key={val} value={val}>{PartEnumDisplay.find((e)=>e.name == val)?.displayVal}</Option>
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
           
        </Row>
        <Row>
          <Col span={12} style={{ textAlign: "left" }}>
            <Button type="primary" htmlType="submit" onClick={createReqCode}>
              Request
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <span style={{ paddingRight: "10px" }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </span>
            <Button htmlType="button" style={{ margin: "0 14px" }} onClick={onReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default M3TrimsReqFile;
