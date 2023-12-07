import {BuyersService,CategoryService,ColourService,ContentService,FabricStructuresService,FinishService,HoleService,M3ItemsService,M3TrimsService,QualitysService,StructureService,ThicknessService,TrimParamsMappingService,TrimService,TypeService,UomService,VarietyService} from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useEffect, useState } from "react";
import { ItemTypeEnum, ItemTypeEnumDisplay, LogoEnum, LogoEnumDisplay, M3ItemsDTO, M3trimsDTO, PartEnum, PartEnumDisplay, TrimIdRequestDto } from "@project-management-system/shared-models";
import FormItem from "antd/es/form/FormItem";

const { TextArea } = Input;
const { Option } = Select;


export function M3TrimItemsForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const structureService = new StructureService();
  const categoryService = new CategoryService();
  const contentService = new ContentService();
  const typeService = new TypeService();
  const finishService = new FinishService();
  const holeService = new HoleService();
  const qtyService = new QualitysService();
  const thickService = new ThicknessService();
  const varietyService = new VarietyService();
  const trimService = new TrimService();
  const uomService = new UomService();
  const colorService = new ColourService();
  const buyerService = new BuyersService();
  const paramsService = new TrimParamsMappingService()
  const service = new M3ItemsService()
  const m3TrimService = new M3TrimsService()

  const [structureData, setStructureData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [contentData, setContentData] = useState<any[]>([]);
  const [typeData, setTypeData] = useState<any[]>([]);
  const [finishData, setFinishData] = useState<any[]>([]);
  const [holeData, setHoleData] = useState<any[]>([]);
  const [qtyData, setQtyData] = useState<any[]>([]);
  const [thickData, setThickData] = useState<any[]>([]);
  const [varietyData, setVarietyData] = useState<any[]>([]);
  const [trimData, setTrimData] = useState<any[]>([]);
  const [uomData, setUomData] = useState<any[]>([]);
  const [colorData, setColorData] = useState<any[]>([]);
  const [buyerData, setBuyerData] = useState<any[]>([]);
  const [mapData, setMapData] = useState<any[]>([])
  const [mapDataId, setMapDataId] = useState<any[]>([])
  const [buyerCode, setBuyerCode] = useState<any[]>([])

  useEffect(() => {
    if (mapData[0]?.structure === true) {
      getStructures();
    }
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
    getTrims();
    getBuyers();
  }, [mapData]);

  const getStructures = () => {
    structureService.getAllStructureInfo().then((res) => {
      if (res.status) {
        setStructureData(res.data);
      }
    });
  };

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

  const getTrims = () => {
    trimService.getAllTrim().then((res) => {
      if (res.status) {
        setTrimData(res.data);
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

  const getBuyers = () => {
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyerData(res.data);
      }
    });
  };

  const getMappedTrims = (value) => {
    const req = new TrimIdRequestDto(value)
    paramsService.getMappedParamsByTrim(req).then((res) => {
      if (res.status) {
        setMapData(res.data)
        setMapDataId(res.data[0]?.trimMappingId)
        console.log(res.data[0]?.trimMappingId,'============')
      }
    });
  }

  const onFinish = (value) => {
    console.log(form.getFieldValue('trimType'),'8888888888')
    const req = new M3trimsDTO(0,value.buyerId,"",value.categoryId,value.colorId,value.contentId,value.finishId,value.holeId,value.logo,value.part,value.qualityId,value.structureId,value.thicknessId,value.typeId,value.uomId,value.varietyId,value.trimCategoryId,mapDataId,form.getFieldValue("buyerCode"),value.trimType,value.description,"")
    console.log(req,'---------------------')
    m3TrimService.createM3Trims(req).then((res) => {
      if (res.status) {
        AlertMessages.getSuccessMessage(res.internalMessage);
        // navigate('/grn-view')
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    })
  };

  const onReset = () => {
    form.resetFields();
  };

  const getVarCodeDefaultValue = (defaultCode: string) => {
    console.log(defaultCode);
    form.setFieldsValue({ description: defaultCode });
  }

  const generateItemCode = () => {
    console.log(form.getFieldsValue())
    let structureDal = ""
    let categoryDal = ""
    let contentDal = ""
    let typeDal = ""
    let finishDal = ""
    let holeDal = ""
    let qualityDal = ""
    let thickDal = ""
    let varietyDal = ""
    let uomDal = ""
    let colorDal = ""
    let logo = "";
    let part = "";

    let buyerDetails = buyerData.find((e) => e.buyerId === form.getFieldValue("buyerId"))?.shortCode;
    const buyersData = buyerDetails != undefined? buyerDetails + '/' : "";
    form.setFieldsValue({buyerCode:buyerDetails != undefined ? buyerDetails : ""});
  
    const trimType = form.getFieldValue("trimType") != undefined ? form.getFieldValue("trimType")+'/' : "";
    
    let trimCategoryDetails = trimData.find((e) => e.trimId === form.getFieldValue("trimCategoryId"))?.trimCategory;
    const trimCategoryDal = trimCategoryDetails != undefined ? trimCategoryDetails + '/' : ""  ;
    console.log(trimCategoryDetails);

    if (mapData[0]?.structure === true) {
      let structureDetails = structureData.find((e) => e.structureId === form.getFieldValue("structureId"))?.structure;
    structureDal = structureDetails != undefined ? structureDetails + '/' : ""  ;
    }

    if (mapData[0]?.category === true) {
      let categoryDetails = categoryData.find((e) => e.categoryId === form.getFieldValue("categoryId"))?.category;
    categoryDal = categoryDetails != undefined ? categoryDetails + '/' : ""  ;
    }

    if (mapData[0]?.content === true) {
    let contentDetails = contentData.find((e) => e.contentId === form.getFieldValue("contentId"))?.content;
    contentDal = contentDetails != undefined ? contentDetails + '/' : ""  ;
    }

    if (mapData[0]?.type === true) {
    let typeDetails = typeData.find((e) => e.typeId === form.getFieldValue("typeId"))?.type;
    typeDal = typeDetails != undefined ? typeDetails + '/' : ""  ;
    }

    if (mapData[0]?.finish === true) {
    let finishDetails = finishData.find((e) => e.finishId === form.getFieldValue("finishId"))?.finish;
    finishDal = finishDetails != undefined ? finishDetails + '/' : ""  ;
    }

    if (mapData[0]?.hole === true) {
    let holeDetails = holeData.find((e) => e.holeId === form.getFieldValue("holeId"))?.hole;
    holeDal = holeDetails != undefined ? holeDetails + '/' : ""  ;
    }

    if (mapData[0]?.quality === true) {
      let qualityDetails = qtyData.find((e) => e.qualityId === form.getFieldValue("qualityId"))?.qualityName;
      qualityDal = qualityDetails !== undefined ? qualityDetails + '/' : "";
    }

    if (mapData[0]?.thickness === true) {
    let thicknessDetails = thickData.find((e) => e.thicknessId === form.getFieldValue("thicknessId"))?.thickness;
    thickDal = thicknessDetails != undefined ?  thicknessDetails + '/' : ""  ;
    }

    if (mapData[0]?.variety === true) {
    let varietyDetails = varietyData.find((e) => e.varietyId === form.getFieldValue("varietyId"))?.variety;
    varietyDal = varietyDetails != undefined ? varietyDetails + '/' : ""  ;
    }

    if (mapData[0]?.uom === true) {
    let uom = uomData.find((e) => e.uomId === form.getFieldValue("uomId"))?.uom;
    uomDal =  uom != undefined ? uom + '/' : "" ;
    }

    if (mapData[0]?.color === true) {
    let colorDetails = colorData.find((e) => e.colourId === form.getFieldValue("colorId"))?.colour;
    colorDal = colorDetails != undefined ? colorDetails + '/' : ""  ;
    }

    if(mapData[0]?.logo === true){
    logo = form.getFieldValue("logo") != undefined ? form.getFieldValue("logo") : "";
    }

    if(mapData[0]?.part === true){
    part = form.getFieldValue("part") != undefined ? form.getFieldValue("part") : "";
    }

    let mainDal = `${buyersData}${trimType}${trimCategoryDal}${structureDal}${categoryDal}${contentDal}${typeDal}${finishDal}${holeDal}${qualityDal}${thickDal}${varietyDal}${uomDal}${colorDal}${logo}${part}`;

    mainDal = mainDal.replace(/\/$/, '');

    getVarCodeDefaultValue(mainDal);
  }

  const buyerOnChange = (val,Option) =>{
    generateItemCode()
    setBuyerCode(Option?.name)
    form.setFieldsValue({buyerCode : buyerData.find((e) => e.buyerId === val)?.shortCode})
  }
  const trimOnChange = (val) =>{
    generateItemCode()
    getMappedTrims(val)
  }

  const trimTypeOnChange = (val,Option) =>{
    generateItemCode()
    console.log(Option?.name)
  }

  return (
    <Card 
    title={<span>M3 Items</span>}
      style={{ textAlign: "left" }}
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      extra={<Link to='/trim-master/m3-trim-items/m3-trim-items-view' >
      <span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span>
      </Link>}
    >
      <Form form={form} layout={"vertical"} name="control-hooks" onFinish={onFinish}
      >
        <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="buyerId" label="Buyer" rules={[{ required: true, message: "Buyer is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Buyer"
                    onChange={buyerOnChange}
                    >
                        {buyerData.map((e) => {
                            return (
                            <Option key={e.buyerId} value={e.buyerId} name={e.buyerCode}>
                                {e.buyerName}-{e.buyerCode}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="trimType" label="Trim Type" rules={[{ required: true, message: "Trim Type is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select Trim Type"
                    onChange={trimTypeOnChange}
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
                    onChange={trimOnChange}
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
                      onChange={generateItemCode}
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
                <Form.Item name="categoryId" label="Category" rules={[{ required: true, message: "Category is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Category"
                    onChange={generateItemCode}
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
                <Form.Item name="contentId" label="Content" rules={[{ required: true, message: "Content is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Content"
                    onChange={generateItemCode}
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
                <Form.Item name="typeId" label="Type" rules={[{ required: true, message: "Type is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Type"
                    onChange={generateItemCode}
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
             <Form.Item name="buyerCode" style={{display:'none'}} >
                  <Input hidden/>
                </Form.Item>
            {mapData[0]?.finish === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="finishId" label="Finish" rules={[{ required: true, message: "Finish is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Finish"
                    onChange={generateItemCode}
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
                <Form.Item name="holeId" label="Hole" rules={[{ required: true, message: "Hole is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Hole"
                    onChange={generateItemCode}
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
                <Form.Item name="qualityId" label="Quality" rules={[{ required: true, message: "Quality is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Quality"
                    onChange={generateItemCode}
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
                <Form.Item name="thicknessId" label="Thickness" rules={[{ required: true, message: "Thickness is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Thickness"
                    onChange={generateItemCode}
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
                <Form.Item name="varietyId" label="Variety" rules={[{ required: true, message: "Variety is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Variety"
                    onChange={generateItemCode}
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
                <Form.Item name="uomId" label="UOM" rules={[{ required: true, message: "UOM is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select UOM"
                    onChange={generateItemCode}
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
                <Form.Item name="colorId" label="Color" rules={[{ required: true, message: "Color is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Color"
                    onChange={generateItemCode}
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
                <Form.Item name="logo" label="Logo" rules={[{ required: true, message: "Logo is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Logo"
                    onChange={generateItemCode}
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
                <Form.Item name="part" label="Part" rules={[{ required: true, message: "Part is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Part"
                    onChange={generateItemCode}
                    >
                        {Object.values(PartEnum).map((val) => {
                            return <Option key={val} value={val}>{PartEnumDisplay.find((e)=>e.name == val)?.displayVal}</Option>
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="description" label="Description" rules={[{ required: true, message: "Description is required" }]}>
                    <TextArea rows={3} disabled={true} />
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
  );
}

export default M3TrimItemsForm;
