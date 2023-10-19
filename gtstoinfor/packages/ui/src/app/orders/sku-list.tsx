import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Descriptions,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Segmented,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
  message,
} from "antd";
import {
  CloseOutlined,
  CreditCardOutlined,
  EditOutlined,
  EyeOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { AppstoreOutlined } from "@ant-design/icons";

import { useEffect, useRef, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import { Link } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import { SKUGenerationService, SKUlistService } from "@project-management-system/shared-services";
import {
  ItemSKusReq,
  SKUlistFilterRequest,
} from "@project-management-system/shared-models";
import Highlighter from "react-highlight-words";

export const SkuList = () => {
  const [form] = Form.useForm();
  const [itemData, setItemData] = useState([]);
  const [selectedItemNo, setSelectedItemNo] = useState();
  const [selectedSIze, setSelectedSizeId] = useState(null);
  const [selectedcolour, setSelectedColourId] = useState(null);
  const [selecteddestination, setSelecteddestinationId] = useState(null);
  const [Value, setValue] = useState("cards");
  const service = new SKUlistService();
  const services = new SKUGenerationService();
  const [data, setData] = useState([]);
  const { Option } = Select;
  const { TabPane } = Tabs;
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectView, setSelectedView] = useState<any>("cards");
  const [options, setOptions] = useState(["Cards", "View"]);
  useEffect(() => {
    Dropdown();
    getAllData();

  }, []);



  const closeSKU = (id: number) => {
    const req = new ItemSKusReq(id, "", null, null, null, null, "", 0);
    services.closeSKUById(req).then((res: any) => {
      if (res.status) {
        message.success(res.internalMessage);
      } else {
        message.error(res.internalMessage);
      }
    });
  };

  const Sku = (val,data) => {
    setSelectedItemNo(val);
  };

  const Size = (val, data) => {
    setSelectedSizeId(val);
  };

  const colour = (val, data) => {
    setSelectedColourId(val);
  };

  const destination = (val, data) => {
    setSelecteddestinationId(val);
  };

  const Dropdown = () => {
    services.getAllitemsCode().then((res) => {
      if (res) {
        setData(res.data);
        // console.log(res,'[[[[[[[[[res')
      }
    });
  };

  const getAllData=()=>{
    const req = new SKUlistFilterRequest()
    if(form.getFieldValue('item_code') !== undefined){
      req.itemsNo=form.getFieldValue('item_code')
    }
    services.getSkuList(req).then(res=>{
      if(res.data){
        setValue(res.data)
      }
    })
  }
  const handleSearch = () => {
    console.log('eeeeeeeeee',selectedItemNo);
    
    if (selectedItemNo) {
      const req = new SKUlistFilterRequest(Number(selectedItemNo))
      console.log(req,'777777');
      
      services.getSkuList(req).then((res) => {
        if (res) {
          setItemData(res.data);
          console.log(res.data,'data');
          
        }
      });
    } else {
    }
  };

  function handledSearch(selectedKeys, confirm, dataIndex) {
    // console.log("777777777777777777777777")
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  const resetForm = () => {
    form.resetFields();
    setItemData([]);
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
  };
  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handledSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handledSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          size="small"
          style={{ width: 90 }}
          onClick={() => {
            handleReset(clearFilters);
            setSearchedColumn(dataIndex);
            confirm({ closeDropdown: true });
          }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        type="search"
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : false,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text) =>
      text ? (
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        )
      ) : null,
  });
  const columnsSkelton: any = [
    {
      title: "SKU Code",
      dataIndex: "skuId",
      key: "skuId",
      width: "300px",

      // render: (skus) => skus.map((sku) => sku.skuId),
    },
    {
      title: "Sizes",
      dataIndex: "sizes",
      key: "sizes",
      width: "300px",
      sorter: (a, b) => a.sizes.localeCompare(b.sizes),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("sizes"),
      // render: (skus) => skus.map((sku) => sku.sizes),
    },
    {
      title: "Destinations",
      dataIndex: "destinations",
      key: "destinations",
      width: "300px",
      sorter: (a, b) => a.destinations.localeCompare(b.destinations),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("destinations"),

      // render: (skus) => skus.map((sku) => sku.destinations),
    },
    {
      title: "Colours",
      dataIndex: "colour",
      key: "colours",
      width: "300px",

      sorter: (a, b) => a.colours.localeCompare(b.colours),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("colours"),
      // render: (colours,rowData) => {
      //   console.log(rowData)
      //   let co;
      //   if(rowData.colour == 'White'){
      //     co = 'black'
      //   } else{
      //     co = 'white'
      //   }
      //   return(
      //     <Tag color={colours} style={{color:co}}>{colours}</Tag>
      //   )
      // }
      render: (colours, rowData) => (
        <Tag
          color={colours}
          style={{ color: rowData.colour == "White" ? "black" : "white" }}
        >
          {colours}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (text, rowData, index) => (
        <span>
          {rowData.status !== "CANCELLED" ? (
            <Tooltip placement="top" title="Cancel SKU">
              <Popconfirm
                onConfirm={(value) => {
                  closeSKU(rowData.id);
                }}
                title={"Are you sure to Close ?"}
              >
                <Button style={{ color: "red", fontSize: "20" }} />
              </Popconfirm>
            </Tooltip>
          ) : null}
        </span>
      ),
    },
  ];
  return (
    <>
      <Card title="SKU List">
        <Form form={form} style={{ fontSize: "10px" }} layout="vertical">
          <Row gutter={16}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 5 }}
              xl={{ span: 5 }}
            >
              <Form.Item
                style={{ flexDirection: "row" }}
                label="Item No"
                name="item_code"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select Item No"
                  onChange={(val,data)=>Sku(val,data)}
                >
                  {data.map((e) => (
                    <Option key={e.item_id} val={e.item_id} code={e.item_code}>
                      {e.item_code}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 5 }}
              xl={{ span: 5 }}
            >
              <Form.Item
                style={{ flexDirection: "row" }}
                label="Size"
                name="size"
              >
                <Select
                  placeholder="Select Size"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  onChange={(val, text) => Size(val, text)}
                >
                  {data.map((e) => {
                    return (
                      <Option key={e.sizeId} value={e.sizeId} code={e.sizes}>
                        {e.sizes}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 5 }}
              xl={{ span: 5 }}
            >
              <Form.Item
                style={{ flexDirection: "row" }}
                label="Colour"
                name="colour"
              >
                <Select
                  placeholder="Select Colour"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  onChange={(val, text) => colour(val, text)}
                >
                  {data.map((e) => {
                    return (
                      <Option key={e.colourId} value={e.colourId}>
                        {e.colour}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 5 }}
              xl={{ span: 5 }}
            >
              <Form.Item
                style={{ flexDirection: "row" }}
                label="Destination"
                name="destinations"
              >
                <Select
                  placeholder="Select Destination"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  onChange={(val, text) => destination(val, text)}
                >
                  {data.map((e) => {
                    return (
                      <Option key={e.destinationsId} value={e.destinationsId}>
                        {e.destinations}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Row gutter={6}>
              <Col>
                <FormItem style={{ flexDirection: "row" }} label=" ">
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    // style={{ marginTop: "50"}}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                  {/* </Col>      
               <Col
               > */}
                  <Button
                    type="default"
                    icon={<UndoOutlined />}
                    style={{ color: "red", marginLeft: "1" }}
                    onClick={resetForm}
                  >
                    Reset
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Row>
        </Form>
      </Card>
      <Row>
        <Col>
          <div>
            <Space direction="vertical" style={{ fontSize: "16px" }}>
              <Segmented
                style={{ background: "#cce3de" }}
                options={[
                  {
                    label: (
                      <>
                        <CreditCardOutlined
                          style={{ marginRight: "8px", color: "red" }}
                        />
                        <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                          Cards
                        </span>
                      </>
                    ),
                    value: "cards",
                  },
                  {
                    label: (
                      <>
                        <AppstoreOutlined
                          style={{ marginRight: "8px", color: "blue" }}
                        />
                        <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                          Grid
                        </span>
                      </>
                    ),
                    value: "grid",
                  },
                ]}
                onChange={handleViewChange}
                defaultValue={"cards"}
              />
              {/* {selectView === 'grid'?(
        <SKUGrid/>
      ):(<div> */}
              {selectView === "cards" ? (
                <div>
                  {itemData.map((item) => (
                    <Card
                      key={item.itemsNo}
                      title={`Item No: ${item.itemsNo}`}
                      style={{ cursor: "pointer" }}
                    >
                      <Row gutter={[20, 16]}>
                        {item.skus.map((e) => {
                          let co;
                          if (e.color == "white") {
                            co = "balck";
                          } else {
                            co = "white";
                          }
                          return (
                            <Col
                              xs={{ span: 24 }}
                              sm={{ span: 24 }}
                              md={{ span: 3 }}
                              lg={{ span: 6 }}
                              xl={{ span: 5 }}
                              key={e.skuId}
                            >
                              <div>
                                <Card
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "#E3F1E1 ",
                                    marginRight: "-50px",
                                  }}
                                >
                                  <Descriptions
                                    column={1}
                                    style={{ fontSize: "2px" }}
                                    title={`SKU Code: ${e.skuId}`}
                                  >
                                    <Descriptions.Item label="Size">
                                      {e.sizes}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Colour">
                                      <Tag
                                        color={e.colour}
                                        // style={{
                                        //   color: item.colour === 'white' ? 'black' : 'inherit',
                                        //   borderColor: item.colour === 'white' ? 'black' : 'inherit'
                                        // }}
                                        style={{
                                          color:
                                            e.colour == "White"
                                              ? "black"
                                              : "white",
                                        }}
                                      >
                                        {e.colour}
                                      </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Destination">
                                      {e.destinations}
                                    </Descriptions.Item>
                                  </Descriptions>
                                </Card>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </Card>
                  ))}
                </div>
              ) : (
                <div>
                  {itemData.map((e) => (
                    <Card
                      style={{ width: "1240px" }}
                      key={e.itemsNo}
                      title={`Item No: ${e.itemsNo}`}
                    >
                      <Table
                        dataSource={e.skus}
                        columns={columnsSkelton}
                        size="small"
                      />
                    </Card>
                  ))}
                </div>
              )}
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default SkuList;
