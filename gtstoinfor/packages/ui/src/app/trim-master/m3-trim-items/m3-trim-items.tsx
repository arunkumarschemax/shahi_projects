import {BuyersService,CategoryService,ColourService,ContentService,FabricStructuresService,FinishService,HoleService,QualitysService,ThicknessService,TrimService,TypeService,UomService,VarietyService,
} from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useEffect, useState } from "react";
import { LogoEnum, LogoEnumDisplay, PartEnum, PartEnumDisplay } from "@project-management-system/shared-models";

const { TextArea } = Input;
const { Option } = Select;


export function M3TrimItemsForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const structureService = new FabricStructuresService();
  const categoryService = new CategoryService();
  const contentService = new ContentService();
  const typeService = new TypeService();
  const finishService = new FinishService();
  const holeService = new HoleService();
  const qtyService = new QualitysService();
  const thickService = new ThicknessService();
  const varietyService = new VarietyService();
//   const trimService = new TrimService();
  const uomService = new UomService();
  const colorService = new ColourService();
  const buyerService = new BuyersService();

  const [structureData, setStructureData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [contentData, setContentData] = useState<any[]>([]);
  const [typeData, setTypeData] = useState<any[]>([]);
  const [finishData, setFinishData] = useState<any[]>([]);
  const [holeData, setHoleData] = useState<any[]>([]);
  const [qtyData, setQtyData] = useState<any[]>([]);
  const [thickData, setThickData] = useState<any[]>([]);
  const [varietyData, setVarietyData] = useState<any[]>([]);
//   const [trimData, setTrimData] = useState<any[]>([]);
  const [uomData, setUomData] = useState<any[]>([]);
  const [colorData, setColorData] = useState<any[]>([]);
  const [buyerData, setBuyerData] = useState<any[]>([]);

  useEffect(() => {
    // getStructures();
    getCategories();
    getContents();
    getTypes();
    getFinishes();
    getHoles();
    getQuantity();
    getThicks();
    getVarieties();
    // getTrims();
    getUom();
    getColors();
    getBuyers();
  }, []);

  const getStructures = () => {
    structureService.getAll().then((res) => {
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

  const getQuantity = () => {
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

//   const getTrims = () => {
//     trimService.getAllTrim().then((res) => {
//       if (res.status) {
//         setTrimData(res.data);
//       }
//     });
//   };

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
    buyerService.getAllBuyer().then((res) => {
      if (res.status) {
        setBuyerData(res.data);
      }
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card 
    title={<span>M3 Items</span>}
      style={{ textAlign: "left" }}
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      extra={
        <Link to="/trim-master/hole/hole-view">
          <span style={{ color: "white" }}>
            <Button type={"primary"}>View </Button>{" "}
          </span>
        </Link>
      }
    >
      <Form form={form} layout={"vertical"} name="control-hooks" //onFinish={saveData}
      >
        <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="itemCode" label="Buyer" rules={[{ required: true, message: "Item is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Item"
                    >
                        {buyerData.map((e) => {
                            return (
                            <Option key={e.itemId} value={e.itemCode}>
                                {e.itemCode}-{e.itemName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="buyer" label="Structure" rules={[{ required: true, message: "Buyer is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Buyer"
                    >
                        {structureData.map((e) => {
                            return (
                            <Option key={e.buyerId} value={e.buyerId}>
                                {e.buyerCode}-{e.buyerName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="facility" label="Category" rules={[{ required: true, message: "Facility is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Facility"
                    >
                        {categoryData.map((e) => {
                            return (
                            <Option key={e.id} value={e.id}>
                                {e.name}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="warehouse" label="Content" rules={[{ required: true, message: "Warehouse is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Warehouse"
                    >
                        {contentData.map((e) => {
                            return (
                            <Option key={e.warehouseId} value={e.warehouseId}>
                                {e.warehouseName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="warehouse" label="Type" rules={[{ required: true, message: "Warehouse is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Warehouse"
                    >
                        {typeData.map((e) => {
                            return (
                            <Option key={e.warehouseId} value={e.warehouseId}>
                                {e.warehouseName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="warehouse" label="Finish" rules={[{ required: true, message: "Warehouse is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Warehouse"
                    >
                        {finishData.map((e) => {
                            return (
                            <Option key={e.warehouseId} value={e.warehouseId}>
                                {e.warehouseName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="warehouse" label="Hole" rules={[{ required: true, message: "Warehouse is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Warehouse"
                    >
                        {holeData.map((e) => {
                            return (
                            <Option key={e.warehouseId} value={e.warehouseId}>
                                {e.warehouseName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="warehouse" label="Quality" rules={[{ required: true, message: "Warehouse is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Warehouse"
                    >
                        {qtyData.map((e) => {
                            return (
                            <Option key={e.warehouseId} value={e.warehouseId}>
                                {e.warehouseName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="warehouse" label="Thickness" rules={[{ required: true, message: "Warehouse is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Warehouse"
                    >
                        {thickData.map((e) => {
                            return (
                            <Option key={e.warehouseId} value={e.warehouseId}>
                                {e.warehouseName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="variety" label="Variety" rules={[{ required: true, message: "Variety is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Variety"
                    >
                        {varietyData.map((e) => {
                            return (
                            <Option key={e.varietyId} value={e.varietyId}>
                                {e.varietyName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="warehouse" label="Trim" rules={[{ required: true, message: "Warehouse is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Warehouse"
                    >
                        {trimData.map((e) => {
                            return (
                            <Option key={e.warehouseId} value={e.warehouseId}>
                                {e.warehouseName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col> */}
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="uom" label="UOM" rules={[{ required: true, message: "UOM is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select UOM"
                    >
                        {uomData.map((e) => {
                            return (
                            <Option key={e.id} value={e.id}>
                                {e.uom}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="color" label="Color" rules={[{ required: true, message: "Color is required" }]}>
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="logo" label="Logo" rules={[{ required: true, message: "Logo is required" }]}>
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="part" label="Part" rules={[{ required: true, message: "Part is required" }]}>
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
