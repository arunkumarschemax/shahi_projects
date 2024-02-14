import { RightSquareOutlined } from "@ant-design/icons";
import { ItemTypeEnumDisplay, ItemTypeEnum, TrimParamsMappingRequestDto, TrimDtos, TrimIdRequestDto } from "@project-management-system/shared-models";
import { TrimParamsMappingService, TrimService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Popconfirm, Row, Select, Switch } from "antd"
import { useEffect, useState } from "react";
import AlertMessages from "../../common/common-functions/alert-messages";
import { Link, useNavigate } from "react-router-dom";

export interface mappingProps {
  mappingData: any;
  updateDetails: (column: TrimParamsMappingRequestDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}
export const TrimParamsMapping = (props: mappingProps) => {
  const { Option } = Select;
  const trimService = new TrimService();
  const [trimData, setTrimData] = useState<any[]>([]);
  const [form] = Form.useForm();
  const services = new TrimParamsMappingService()
  const [trimUpdateData, setTrimUpdateData] = useState<any[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    getTrims()
    if (props.isUpdate) {
    }
  }, [])

  const getTrims = () => {
    trimService.getAllTrim().then((res) => {
      if (res.status) {
        setTrimData(res.data);
      }
    });
  };
  const resetFormInstance = () => {
    form.resetFields();
    form.setFieldsValue(props.mappingData); // Set initial values if needed
  };

  const finish = (val: TrimParamsMappingRequestDto) => {
    if (props.isUpdate) {
      props.updateDetails(val);
    } else {
      create(val);
    }
    console.log(val);
    resetFormInstance(); 
  };
  const onReset = () => {
    console.log("resetting");

    form.resetFields();
    console.log("resetted");

  };

  const create = (val) => {
    const req = new TrimParamsMappingRequestDto(undefined, val.category, val.trimCategoryId, val.color, val.content, val.finish, val.hole, val.logo, val.part, val.quality, val.structure, val.thickness, val.type, val.uom, val.variety, undefined, undefined, undefined, val.ply, val.parts, val.shape, val.length, val.line, val.slider, val.buyer, undefined, val.trimType,val.size)
    services.createMapping(req).then((res) => {
      if (res.status) {
        AlertMessages.getSuccessMessage(res.internalMessage)
        onReset()
        navigate("/trim-master/trim-params-mapping-view")
      } else {
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    }
    )
  }
  useEffect(() => {
    resetFormInstance(); // Initialize form instance
  }, [props.mappingData]);


  return (
    <Card title='Trim Params Mapping' headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<Link to = "/trim-master/trim-params-mapping-view"  ><span><Button type={'primary'} >View </Button> </span></Link>}>
      <Form form={form} onFinish={finish} layout="vertical" initialValues={props.mappingData}>
        <Row gutter={[12, 12]}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item name="trimType" label="Trim Type" rules={[{ required: true, message: "Trim Type is required" }]}>
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                placeholder="Select Trim Type"
              disabled={props?.mappingData?.trimType != undefined}
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
              disabled={props?.mappingData?.trimCategoryId != undefined}
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
        <Row gutter={[12, 12]}>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="category" label="Category">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                // defaultChecked = {false}
                defaultChecked={props?.mappingData?.category}
                disabled={props?.mappingData?.category}

              />

            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="type" label="Type">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                // defaultChecked = {false}
                defaultChecked={props?.mappingData?.type}
                disabled={props?.mappingData?.type}

              />

            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="structure" label="Structure" >
              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.structure}
                disabled={props?.mappingData?.structure}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="content" label="Content">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.content}
                disabled={props?.mappingData?.content}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="finish" label="Finish">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.finish}
                disabled={props?.mappingData?.finish} />

            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="hole" label="Hole">
              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.hole}
                disabled={props?.mappingData?.hole} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="quality" label="Quality">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.quality}
                disabled={props?.mappingData?.quality} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="thickness" label="Thickness">
              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.thickness}
                disabled={props?.mappingData?.thickness}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="variety" label="Variety">
              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.variety}
                disabled={props?.mappingData?.variety} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="uom" label="UOM">
              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.uom}
                disabled={props?.mappingData?.uom}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="color" label="Color">
              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.color}
                disabled={props?.mappingData?.color} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="logo" label="Logo">
              <Switch
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.logo}
                disabled={props?.mappingData?.logo}
              />
            </Form.Item>
          </Col>

          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="part" label="Part">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.part}
                disabled={props?.mappingData?.part} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="buyer" label="Buyer">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.buyer}
                disabled={props?.mappingData?.buyer} />
            </Form.Item>
          </Col><Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="length" label="Length">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.length}
                disabled={props?.mappingData?.length} />
            </Form.Item>
          </Col><Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="line" label="Line">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.line}
                disabled={props?.mappingData?.line} />
            </Form.Item>
          </Col><Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="parts" label="Parts">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.parts}
                disabled={props?.mappingData?.parts} />
            </Form.Item>
          </Col><Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="ply" label="Ply">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.ply}
                disabled={props?.mappingData?.ply} />
            </Form.Item>
          </Col><Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="slider" label="Slider">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.slider}
                disabled={props?.mappingData?.slider} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="shape" label="Shape">

              <Switch size="default"
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                defaultChecked={props?.mappingData?.shape}
                disabled={props?.mappingData?.shape} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
            <Form.Item name="size" label="Size">
            
<Switch size="default"  
           checkedChildren={<RightSquareOutlined type="check" />}
           unCheckedChildren={<RightSquareOutlined type="close" />}
           defaultChecked={props?.mappingData?.size}
           disabled={props?.mappingData?.size }          />           
            </Form.Item>
            </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit" >Submit</Button>
            <Button htmlType="button" style={{ margin: "0 14px" }} onClick={onReset}>Reset</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
export default TrimParamsMapping