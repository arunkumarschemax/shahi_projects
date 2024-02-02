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

  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [contentData, setContentData] = useState<any[]>([]);
  const [typeData, setTypeData] = useState<any[]>([]);
  const [finishData, setFinishData] = useState<any[]>([]);
  const [holeData, setHoleData] = useState<any[]>([]);
  const [trimData, setTrimData] = useState<any[]>([]);
  const [mapData, setMapData] = useState<any[]>([])
  const [mapDataId, setMapDataId] = useState<any[]>([])

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

  const createReqCode = () => {
      const req = new TrimRequestCodeDto(form.getFieldValue('trimType'),form.getFieldValue('trimCategoryId'),form.getFieldValue('buyerId'),form.getFieldValue('typeId'),form.getFieldValue('holeId'),
      form.getFieldValue('finishId'),form.getFieldValue('contentId'),form.getFieldValue('categoryId'),form.getFieldValue('m3Code'),form.getFieldValue('hsnCode'));
      trimReqCodeService.createTrimRequestedCode(req).then((res) => {
        if (res.status) {
          message.success(res.internalMessage, 2);
          navigate("/sample-development/trim-request-code-view");
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
                <Form.Item name="hsnCode" label="Hsn Code" >
                    <Input placeholder="Enter Hsn Code"/>
                </Form.Item>
            </Col>
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
           
        </Row>
        <Row>
            <Col span={24} style={{ textAlign: "right" }}>
                <span style={{paddingRight:"10px"}}><Button type="primary" htmlType="submit" onClick={createReqCode}>Request</Button></span>
                <span><Button type="primary" htmlType="submit">Search</Button></span>
                <Button htmlType="button" style={{ margin: "0 14px" }} onClick={onReset}>Reset</Button>
            </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default M3TrimsReqFile;
