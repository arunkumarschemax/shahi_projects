import {
  BuyersService,
  FabricTypeService,
  FabricWeaveService,
  M3ItemsService,
  UomService,
} from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import AlertMessages from "../../common/common-functions/alert-messages";
import {
  M3ItemsDTO,
  UomCategoryEnum,
  m3ItemsContentEnum,
} from "@project-management-system/shared-models";
import { useNavigate } from "react-router-dom";

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


  const generateItemCode = () => {
    console.log(form.getFieldsValue())
    const buyersData = buyer.find((e) => e.buyerId === form.getFieldValue("buyerId"))?.shortCode;
    console.log(buyer.find((e) => e.buyerId === form.getFieldValue("buyerId")));
    const Content = form.getFieldValue("content")
    console.log(Content);

    const weight = form.getFieldValue("weight")
    console.log(weight);

    const construction = form.getFieldValue("construction");
    console.log(construction);

    const yarnCount = form.getFieldValue("yarnCount")
    console.log(yarnCount);

    const finish = form.getFieldValue("finish");
    console.log(finish);

    const weightUnit = weightData.find((e) => e.uomId === form.getFieldValue("weightUnit"))?.uom
    console.log(weightUnit);

    const weaveData = weave.find((e) => e.buyerId === form.getFieldValue("weave"))?.fabricWeaveName;
    console.log(weaveData);

    const yarnUnit = yarnData.find((e) => e.uomId === form.getFieldValue("yarnUnit"))?.uom
    console.log(yarnUnit);

    let code = buyersData != undefined? buyersData:""+"/"+Content!=undefined?Content:""+"/"+weaveData!=undefined?weaveData:""+"/"+weight+weightUnit!=undefined?weightUnit:""+"/"+construction+"/"+yarnCount+yarnUnit+"/"+finish;
    form.setFieldsValue({"itemCode":code})
  }
  const getBuyers = () => {
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyer(res.data);
      }
    });
  };

  const getFabricTypedata = () => {
    fabricService
      .getAllFabricType()
      .then((res) => {
        if (res.status) {
          setFabricType(res.data);
        } else {
          setFabricType([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getWeaveData = () => {
    weaveService
      .getAllFabricWeave()
      .then((res) => {
        if (res.status) {
          setWeave(res.data);
        } else {
          setWeave([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getUom();
    getFabricTypedata();
    getWeaveData();
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

  const onFinish = (m3StyleDto: M3ItemsDTO) => {
    service
      .createM3Items(m3StyleDto)
      .then((res) => {
        if (res.status) {
          AlertMessages.getSuccessMessage(res.internalMessage);
          setTimeout(() => {
            message.success("Submitted successfully");
            window.location.reload();
          }, 500);
        }
      })
      .catch((err) => {
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const clearData = () => {
    form.resetFields();
  };

  return (
    <div>
      <Card
        title={<span>M3 ITEMS</span>}
        style={{ textAlign: "center" }}
        headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
        extra={
          <Button
            onClick={() => navigate("/m3-items-view")}
            type="primary"
            style={{ background: "white", color: "#3C085C" }}
          >
            View
          </Button>
        }
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
            <Form.Item
              name="buyerId"
              label="Buyer"
              rules={[{ required: true, message: "Buyer is required" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Buyer"
                onChange={generateItemCode}
              >
                {buyer.map((e) => {
                  return (
                    <option
                      key={e.buyerId}
                      value={e.buyerId}
                    >
                      {`${e.buyerCode} - ${e.buyerName}`}
                    </option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
              <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true, message: "Field is required" }]}
              >
                <Select
                  optionFilterProp="children"
                  placeholder=" Select Content"
                  onChange={generateItemCode}
                >
                  {Object.keys(m3ItemsContentEnum)
                    .sort()
                    .map((content) => (
                      <Select.Option
                        key={m3ItemsContentEnum[content]}
                        value={m3ItemsContentEnum[content]}
                      >
                        {m3ItemsContentEnum[content]}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>

              <Form.Item
                label=" Fabric Type"
                name="fabricType"
                rules={[{ required: false, message: "Field is required" }]}
              >
                <Select placeholder=" Select Fabric Type">
                  {fabricType.map((option) => (
                    <option
                      key={option.fabricTypeName}
                      value={option.fabricTypeName}
                    >
                      {option.fabricTypeName}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>

              <Form.Item
                label=" Weave"
                name="weave"
                rules={[{ required: true, message: "Field is required" }]}
              >
                <Select placeholder=" Select Weave" 
                  onChange={generateItemCode}
                >
                  {weave.map((option) => (
                    <option
                      key={option.fabricWeaveName}
                      value={option.fabricWeaveName}
                    >
                      {option.fabricWeaveName}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>

              <Form.Item
                label="Weight"
                name="weight"
                rules={[{ required: true, message: "Field is required" }]}
              >
                <Input placeholder=" Enter Weight" onBlur={generateItemCode} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} style={{ marginTop: "2%" }}>

              <Form.Item name="weightUnit" 
                rules={[{ required: true, message: "Field is required" }]}
              >
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Unit"
                  onChange={generateItemCode}
                >
                  {weightData.map((e) => {
                    return (
                      <option key={e.uomId} value={e.uomId}>
                        {e.uom}
                      </option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>

              <Form.Item
                label="Width"
                name="width"
                rules={[{ required: false, message: "Field is required" }]}
              >
                <Input placeholder=" Enter Width" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} style={{ marginTop: "2%" }}>

              <Form.Item name="widthUnit">
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Unit"
                >
                  {widthData.map((e) => {
                    return (
                      <option key={e.uomId} value={e.uomId}>
                        {e.uom}
                      </option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>

              <Form.Item
                label=" Construction"
                name="construction"
                 rules={[
                  { required: true, message: 'Field is required' },
                ]}
              >
                <Input placeholder=" Enter  Construction" onBlur={generateItemCode}/>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 4 }}
              lg={{ span: 8 }}
              xl={{ span: 5 }}
            >
              <Form.Item
                label=" Yarn Count"
                name="yarnCount"
                 rules={[
                  { required: true, message: 'Field is required' },
                ]}
              >
                <Input placeholder=" Enter  Yarn Count"  onBlur={generateItemCode}/>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 2 }}
              style={{ marginTop: "2%" }}
            >
              <Form.Item name="yarnUnit"
              rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Unit"
                  onChange={generateItemCode}
                >
                  {yarnData.map((e) => {
                    return (
                      <option key={e.uomId} value={e.uomId}>
                        {e.uom}
                      </option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 4 }}
              lg={{ span: 8 }}
              xl={{ span: 5 }}
            >
              <Form.Item
                label=" Finish"
                name="finish"
                 rules={[
                  { required: true, message: 'Field is required' },
                ]}
              >
                <Input placeholder=" Enter  Finish" onBlur={generateItemCode} />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 4 }}
              lg={{ span: 8 }}
              xl={{ span: 5 }}
            >
              <Form.Item
                label=" Shrinkage"
                name="shrinkage"
                 rules={[
                  { required: true, message: 'Field is required' },
                ]}
              >
                <Input placeholder=" Enter  Shrinkage" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
            <Form.Item
              name="itemCode"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'Description is required'
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
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
