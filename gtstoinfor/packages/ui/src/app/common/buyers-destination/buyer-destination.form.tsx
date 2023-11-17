import {
  BuyerExtrnalRefIdReq,
  BuyerIdReq,
  BuyersDestinationDto,
  // BuyersDestinationModel,
  BuyersDestinationRequest,
  BuyersDestinationResponseModel,
  MappingResponseModel,
  MenusAndScopesEnum,
} from "@project-management-system/shared-models";
import {
  BuyerDestinationService,
  BuyersService,
  ColourService,
  DestinationService,
  SizeService,
} from "@project-management-system/shared-services";
import {
  Card,
  Button,
  Row,
  Col,
  Select,
  Checkbox,
  Descriptions,
  Form,
  message,
  Collapse,
  Table,
} from "antd";
import style from "antd/es/alert/style";
import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessages from "../common-functions/alert-messages";
import { SizeInfoModel } from "packages/libs/shared-models/src/common/Buyers Destination/size-info-model";
import { DestinationInfoModel } from "packages/libs/shared-models/src/common/Buyers Destination/destination-info-model";
import { ColourInfoModel } from "packages/libs/shared-models/src/common/Buyers Destination/colour-info-model";
import { ColumnProps } from "antd/es/table";
import { MappedData } from "packages/libs/shared-models/src/common/Buyers Destination/mapped-data-model";
import { MappedDetails } from "packages/libs/shared-models/src/common/Buyers Destination/mapped-details-model";

export const BuyersDestinationForm = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [size, setSize] = useState<any[]>([]);
  const [destination, setDestination] = useState<any[]>([]);
  const [sizes, setSizes] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [colours, setColours] = useState<any[]>([]);
  const [colour, setColour] = useState<any[]>([]);
  const [buyers, setBuyers] = useState<any[]>([]);
  const [selectedBuyerIds, setSelectedBuyerIds] = useState([]);
  const [isSizeEnabled, setIsSizeEnabled] = useState(false);
  const [isDestinationEnabled, setIsDestinationEnabled] = useState(false);
  const [isColorEnabled, setIsColorEnabled] = useState(false);
  const service = new BuyerDestinationService();
  const sizeService = new SizeService();
  const buyerService = new BuyersService();
  const desService = new DestinationService();
  const colorService = new ColourService();
  const [mapping] = Form.useForm();
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [checkBoxName, setCheckBoxName] = useState("");
  const [names, setName] = useState("");
  const [sizeCheck, setSizeCheck] = useState("");
  const [desCheck, setDesCheck] = useState("");
  const [colorCheck, setColorCheck] = useState("");
  const [isBuyerSelected, setIsBuyerSelected] = useState(false);
  const [userId, setUserId] = useState([]);
  const [loginBuyer, setLoginBuyer] = useState<number>(0);
  const externalRefNo = JSON.parse(localStorage.getItem("currentUser")).user
    .externalRefNo;
  const role = JSON.parse(localStorage.getItem("currentUser")).user.roles;
  let userRef;
  
  let sizedata = [];
  let Desdata = [];
  let colourData = [];
  let TotalData = [];

  useEffect(() => {
    getSizes();
    getDestinations();
    getColours();
    // getBuyers();
    Login();
  }, []);
  const Login = () => {
    const req = new BuyerExtrnalRefIdReq();
    if (role === MenusAndScopesEnum.roles.crmBuyer) {
      req.extrnalRefId = externalRefNo;
    }
    buyerService.getBuyerByRefId(req).then((res) => {
      if (res.status) {
        setUserId(res.data);
        setLoginBuyer(res.data?.buyerId);
        if(req.extrnalRefId){
            form.setFieldsValue({'buyer': res.data.buyerId})
            }      }
    });
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyers(res.data);
      }
    });
  };
  let tableData = [];
  const getSizes = () => {
    sizeService.getAllActiveSize().then((res) => {
      if (res.status) {
        setSizes(res.data);
      } else {
        setSizes([]);
      }
    });
  };
  const getDestinations = () => {
    desService.getAllActiveDestination().then((res) => {
      if (res.status) {
        setDestinations(res.data);
      } else {
        setDestinations([]);
      }
    });
  };
  const getColours = () => {
    colorService.getAllColour().then((res) => {
      if (res.status) {
        setColours(res.data);
      } else {
        setColours([]);
      }
    });
  };
  //     const getBuyers = () => {
  //    const loginId = new BuyerIdReq(loginBuyer)
  //         buyerService.getAllActiveBuyers(loginId).then((res) => {
  //             if (res.status) {
  //                 setBuyers(res.data);
  //             }
  //         });
  //     };
  const onReset = () => {
    form.resetFields();
    setSelectedOptions([]);
    setSize([]);
    setDestination([]);
    setColour([]);
    setIsSizeEnabled(false);
    setIsDestinationEnabled(false);
    setIsColorEnabled(false);
    setIsBuyerSelected(false);
    form.setFieldsValue({
      buyer: undefined,
      size: undefined,
      destination: undefined,
      colour: undefined,
    });
  };
  const handleBuyerSelection = (selectedIds) => {
    setSelectedBuyerIds(selectedIds);
    setIsBuyerSelected(true);
    onBuyerChange(selectedIds);
  };
  // const handleBuyerSelection = (value) => {
  //     const selectedBuyerDetails = buyers.find(buyer => buyer.buyerId === value);
  //     setSelectedBuyerIds(selectedBuyerDetails);
  //     onBuyerChange(selectedBuyerIds)
  // };

  const onBuyerChange = (selectedId) => {
    if (selectedId !== null) {
      const selectedDetails = buyers.find(
        (option) => option.buyerId === selectedId
      );
      setSelectedBuyer(selectedDetails);
    } else {
      setSelectedBuyer([]);
    }
  };

  const handleCheckboxChange = (isChecked, checkboxName) => {
    console.log(isChecked,checkboxName,'checkkk');
    
    setIsSizeEnabled(checkboxName === "Size" ? isChecked : false);
    setIsDestinationEnabled(checkboxName === "Destination" ? isChecked : false);
    setIsColorEnabled(checkboxName === "Color" ? isChecked : false);
    setCheckBoxName(checkboxName);
  };
  const onSizeChange = (val, option) => {
    if (val !== null) {
      const selectedDetails = sizes.filter((option) =>
        val.includes(option.sizeId)
      );
      setSize(selectedDetails);
    } else {
      setSize([]);
    }
  };
  const onDestinationChange = (val, option) => {
    if (val !== null) {
      const selectedDetails = destinations.filter((option) =>
        val.includes(option.destinationId)
      );
      setDestination(selectedDetails);
    } else {
      setSize([]);
    }
  };
  const onColourCange = (val, option) => {
    if (val !== null) {
      const selectedDetails = colours.filter((option) =>
        val.includes(option.colourId)
      );
      setColour(selectedDetails);
    } else {
      setColour([]);
    }
  };

  const columns: ColumnProps<any>[] = [
    {
      title: "Size",
      dataIndex: "size",
    },
    {
      title: "Destination",
      dataIndex: "destination",
    },
    {
      title: "Colour",
      dataIndex: "colour",
    },
  ];
  let map = [];
  let mappingDetails = [];
  const save = () => {
    if (isSizeEnabled) {
      setSizeCheck("Size");
      if (size.length > 0) {
        const mappedSizeData = size.map((item) => ({
          id: item.sizeId,
          name: item.size,
        }));
        sizedata.push(...mappedSizeData);
        map.push(...map, ...sizedata);
        tableData = [...tableData, ...size];
        console.log(...map, "............map");
        mappingDetails.push({ checkBoxName: "Size", map });
      } else {
        message.error("Please select at least one size");
      }
    }
    if (isDestinationEnabled) {
      setDesCheck("Destination");
      if (destination.length > 0) {
        const mappedDesData = destination.map((item) => ({
          id: item.destinationId,
          name: item.destination,
        }));
        Desdata.push(...mappedDesData);
        map.push(...map, ...Desdata);
        tableData = [...tableData, ...destination];
        mappingDetails.push({ checkBoxName: "Destination", map });
      } else {
        message.error("Please select at least one destination");
      }
    }
    if (isColorEnabled) {
      setColorCheck("Color");
      if (colour.length > 0) {
        const mappedColourData = colour.map((item) => ({
          id: item.colourId,
          name: item.colour,
        }));
        colourData.push(...mappedColourData);
        map.push(...map, ...colourData);
        tableData = [...tableData, ...colour];
        mappingDetails.push({ checkBoxName: "Color", map });
      } else {
        message.error("Please select at least one colour");
        setSelectedOptions(tableData);
      }
    }
    if (tableData.length === 0) {
      message.error("Please select at least one option");
    } else {
      console.log(tableData, "==============");
      setSelectedOptions(tableData);
    }
    TotalData = [...sizedata, ...Desdata, ...colourData];
    console.log(TotalData);
  };

  let mappingData: MappedDetails[] = [];

  const onFinish = (values) => {
    if (buyers.length > 0) {
      if (size.length > 0) {
        const mappedSizeData = size.map((item) => ({
          id: item.sizeId,
          name: item.size,
        }));
        sizedata.push(...mappedSizeData);
        mappingData.push({ mappedAgainst: sizeCheck, mappedData: sizedata });
      }
      if (destination.length > 0) {
        const mappedDesData = destination.map((item) => ({
          id: item.destinationId,
          name: item.destination,
        }));
        Desdata.push(...mappedDesData);
        mappingData.push({ mappedAgainst: desCheck, mappedData: Desdata });
      }
      if (colour.length > 0) {
        const mappedColourData = colour.map((item) => ({
          id: item.colourId,
          name: item.colour,
        }));
        colourData.push(...mappedColourData);
        mappingData.push({ mappedAgainst: colorCheck, mappedData: colourData });
      }
      console.log(mappingData, "Mapped Data=========5556320");

      const req = new BuyersDestinationDto(
        0,
        form.getFieldValue("buyer"),
        true,
        "admin",
        "ADMIN",
        1,
        mappingData
      );
      console.log(req, "req-----");

      service.create(req).then((res) => {
        if (res.status) {
          AlertMessages.getSuccessMessage(res.internalMessage);
          onReset();
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      });
    } else {
      AlertMessages.getErrorMessage("Have to map atleast one component");
    }
  };

  return (
    <Card
      title="Buyers Destination"
      extra={
        <span>
          <Button
            onClick={() =>
              navigate("/global/buyers-destination/buyers-destination-grid")
            }
            type={"primary"}
          >
            View
          </Button>
        </span>
      }
    >
      <Form form={form} onFinish={onFinish}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 5 }}
          lg={{ span: 6 }}
          xl={{ span: 12 }}
        >
          {/* <Card> */}
            <Row gutter={24}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 5 }}
                lg={{ span: 6 }}
                xl={{ span: 12 }}
              >
                <Form.Item
                  initialValue={userId.length > 0 ? userId[0].buyerName : ""}
                  label="Buyers"
                  name="buyer"
                  rules={[{ required: true, message: "Buyer is required" }]}
                >
                  <Select
                    defaultValue={userId.length > 0 ? userId[0].buyerName : ""}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Buyer"
                    onChange={handleBuyerSelection}
                  >
                    {buyers.map((option) => (
                      <Option value={option.buyerId} key={option.buyerName}>
                        {option.buyerName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 5 }}
                lg={{ span: 6 }}
                xl={{ span: 12 }}
              >
                <Checkbox
                  checked={isSizeEnabled}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.checked, "Size")
                  }
                >
                  Size
                </Checkbox>
                <Checkbox
                  checked={isDestinationEnabled}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.checked, "Destination")
                  }
                >
                  Destination
                </Checkbox>
                <Checkbox
                  checked={isColorEnabled}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.checked, "Color")
                  }
                >
                  Color
                </Checkbox>
              </Col>
            </Row>
          {/* </Card> */}
        </Col>
        <Form form={mapping}>
          {/* <Row gutter={24}> */}
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 5 }}
            lg={{ span: 6 }}
            xl={{ span: 8 }}
          >
            {isSizeEnabled && (
              <Form.Item
                label="Size"
                name="size"
                rules={[{ required: true, message: "Size is required" }]}
              >
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Select Size"
                  onChange={onSizeChange}
                //   disabled={!isSizeEnabled || !isBuyerSelected}
                  mode="multiple"
                >
                  {sizes.map((e) => {
                    return (
                      <Option key={e.size} value={e.sizeId}>
                        {e.size}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 5 }}
            lg={{ span: 6 }}
            xl={{ span: 8 }}
          >
            {isDestinationEnabled && (
              <Form.Item
                label="Destination"
                name="destination"
                rules={[{ required: true, message: "Destination is required" }]}
              >
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Select Destination"
                  onChange={onDestinationChange}
                  mode="multiple"
                //   disabled={!isDestinationEnabled || !isBuyerSelected}
                >
                  {destinations.map((e) => {
                    return (
                      <Option key={e.destination} value={e.destinationId}>
                        {e.destination}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 5 }}
            lg={{ span: 6 }}
            xl={{ span: 8 }}
          >
            {isColorEnabled && (
              <Form.Item
                label="Color"
                name="color"
                rules={[{ required: true, message: "Colour is required" }]}
              >
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Select Colour"
                  mode="multiple"
                //   disabled={!isColorEnabled || !isBuyerSelected}
                  onChange={onColourCange}
                >
                  {colours.map((e) => {
                    return (
                      <Option key={e.colour} value={e.colourId}>
                        {e.colour}
                      </Option>
                    );
                  })}
                  <Option key={1} value={1}>
                    colour
                  </Option>
                </Select>
              </Form.Item>
            )}
          </Col>
          {isSizeEnabled || isDestinationEnabled || isColorEnabled ? (
            <Row justify={"end"}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 5 }}
                lg={{ span: 6 }}
                xl={{ span: 2 }}
              >
                <Form.Item>
                  <Button type="default" onClick={save}>
                    Add
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          ) : null}
          {/* </Row> */}
        </Form>
        {/* {selectedOptions.length > 0 && (
          // <Card title="Mapped items" bordered={false}>
            <Row gutter={[24, 24]}>
              {size.length > 0 && (
                
                <Card
                size="small"
                  title="Sizes"
                  style={{ marginLeft: 100, alignContent: "center",backgroundColor:'#c9ada7' }}
                  headStyle={{ backgroundColor:'white',color:'black' }}
                >
                  {size.map((item, index) => (
                    <ul>
                      <li>
                        {item.size} <br />
                      </li>
                    </ul>
                  ))}
                </Card>
              )}
              {destination.length > 0 && (
                <Card size="small"
                  title="Destinations"
                  style={{ marginLeft: 100, alignContent: "center",backgroundColor:'#ffc2d1' }}
                  headStyle={{ textAlign: "center",backgroundColor:'white',color:'black' }}
                >
                  {destination.map((item, index) => (
                    <ul style={{listStyle: 'square inside url("sqpurple.gif")',listStylePosition:'initial'}}>
                      <li>
                        {item.destination} <br />
                      </li>
                    </ul>
                  ))}
                </Card>
              )}
              {colour.length > 0 && (
                <Card size="small"
                  title="Colors"
                  style={{ marginLeft: 100, alignContent: "center",backgroundColor:'#c77dff' }}
                  headStyle={{ textAlign: "center",backgroundColor:'white',color:'black' }}
                >
                  {colour.map((item, index) => (
                    <ul>
                      <li>
                        {item.colour} <br />
                      </li>
                    </ul>
                  ))}
                </Card>
              )}
            
            </Row>
        )} */}


{selectedOptions.length > 0 && (
  <Row gutter={[24, 24]}>
    {size.length > 0 && (
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card
          size="small"
          title="Sizes"
          style={{ marginBottom: 24, backgroundColor: '#fadbca' }}
          headStyle={{  backgroundColor: '#fadbca', color: 'black',fontStyle:'oblique',fontWeight:'bolder' }}
        >
          {size.map((item, index) => (
            <ul key={index}>
              <li>{item.size} <br /></li>
            </ul>
          ))}
        </Card>
      </Col>
    )}
    {destination.length > 0 && (
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card
          size="small"
          title="Destinations"
          style={{ marginBottom: 24, backgroundColor: '#f5e6e8' }}
          headStyle={{  backgroundColor: '#f5e6e8', color: 'black',fontStyle:'oblique',fontWeight:'bolder'  }}
        >
          {destination.map((item, index) => (
            <ul key={index} >
              <li>{item.destination} <br /></li>
            </ul>
          ))}
        </Card>
      </Col>
    )}
    {colour.length > 0 && (
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card
          size="small"
          title="Colors"
          style={{ marginBottom: 24, backgroundColor: '#ddedaa' }}
          headStyle={{  backgroundColor: '#ddedaa', color: 'black',fontStyle:'oblique',fontWeight:'bolder'  }}
       >
          {colour.map((item, index) => (
            <ul key={index}>
              <li>{item.colour} <br /></li>
            </ul>
          ))}
        </Card>
      </Col>
    )}
  </Row>
)}
   <Col span={24} style={{ textAlign: "right" }}>
        <Button type="primary"  htmlType="submit" disabled={selectedOptions.length === 0}>
              Submit
            </Button>
          {/* {props.isUpdate === false && ( */}
          <Button
            htmlType="button"
            style={{ margin: "0 14px" }}
            onClick={onReset}
          >
            Reset
          </Button>
          {/* )} */}
        </Col>
        {/* <Row justify={"end"}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 5 }}
            lg={{ span: 6 }}
            xl={{ span: 2 }}
          >
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={selectedOptions.length === 0}
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 5 }}
            lg={{ span: 6 }}
            xl={{ span: 2 }}
          >
            <Form.Item>
              <Button onClick={onReset}>Reset</Button>
            </Form.Item>
          </Col>
        </Row> */}
      </Form>
    </Card>
  );
};
export default BuyersDestinationForm;
