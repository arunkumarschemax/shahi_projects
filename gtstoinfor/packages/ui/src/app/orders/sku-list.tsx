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
import { DivisionService, SKUGenerationService, SKUlistService, StyleOrderService, StyleService } from "@project-management-system/shared-services";
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
  const service1 = new StyleService();
  const service2 = new DivisionService();
  const [data, setData] = useState([]);
  const { Option } = Select;
  const { TabPane } = Tabs;
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [style, setStyle] = useState([]);
  const [divsion, setDivsion] = useState([]);

  const [selectView, setSelectedView] = useState<any>("cards");
  const [options, setOptions] = useState(["Cards", "View"]);
  const [searchClicked, setSearchClicked] = useState(false);
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
    setSelectedItemNo(data.code);
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
      req.itemsCode=form.getFieldValue('item_code')
    }
    services.getSkuList(req).then(res=>{
      if(res.status){

        setValue(res.data)
        
      }
    })
    service1.getAllStyle().then(res=>{
      if(res.status){
        console.log(res.data,'[[[[[[[[[');
        
        setStyle(res.data)
      }
    })
    service2.getAllDivision().then(res=>{
      if(res.status){
        console.log(res.data,'[[[[[[[[[');
        
        setDivsion(res.data)
      }
    })
  }

  const handleSearch = () => {
    // console.log('eeeeeeeeee',selectedItemNo);
    const req = new SKUlistFilterRequest()
    if (form.getFieldValue('item_code') != undefined) {
      req.itemsCode = selectedItemNo
      setSearchClicked(true);
      // console.log(req,'777777');
    }
      services.getSkuList(req).then((res) => {
        console.log(req,'okkkkk');

        if (res) {
          setItemData(res.data);
          // console.log(res.data,'data');
          
        }
      });
   
  };

  function handledSearch(selectedKeys, confirm, dataIndex) {
    // console.log("777777777777777777777777")
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setSearchClicked(true);
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
  const getStyleName = (styleId) => {
    const styleData = style.find((style) => style.styleId === styleId);
    return styleData ? styleData.style : "N/A";
  };

  const getDivisionName = (divisionId) => {
    const styleData = divsion.find((div) => div.divisionId === divisionId);
    return styleData ? styleData.divisionName : "N/A";
  };

  
  const columnsSkelton: any = [
    {
      title: "SKU Code",
      dataIndex: "sku_code",
      key: "sku_code",
      width: "300px",

      // render: (skus) => skus.map((sku) => sku.skuId),
    },
    {
      title: "Sizes",
      dataIndex: "size",
      key: "size",
      width: "300px",
      sorter: (a, b) => a.size.localeCompare(b.size),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("size"),
      // render: (skus) => skus.map((sku) => sku.sizes),
    },
    {
      title: "Destinations",
      dataIndex: "destination",
      key: "destination",
      width: "300px",
      sorter: (a, b) => a.destination.localeCompare(b.destination),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("destination"),

      // render: (skus) => skus.map((sku) => sku.destination),
    },
    {
      title: "Colours",
      dataIndex: "color",
      key: "color",
      width: "300px",

      sorter: (a, b) => a.color.localeCompare(b.color),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("color"),
      render: (color, rowData) => (
        <Tag
          color={color}
          style={{
            color: rowData.colour === "White" ? "black" : rowData.colour === "Black" ? "white" : "inherit"
          }}
        >
          {color}
        </Tag>
      ),
    
    },
    {
      title: "Style",
      dataIndex: "style_id",
      key: "style_id",
      width: "300px",
      sorter: (a, b) => a.style_id.localeCompare(b.style_id),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("destination"),
      render:(data)=>{
  console.log(data,'id');
  
  const syle= style.find((style)=>style.styleId === data);
  console.log(syle,"ppppp")

  return syle ? syle.style:"N/A"
}
      // render: (skus) => skus.map((sku) => sku.destination),
    },
    {
      title: "Division",
      dataIndex: "division_id",
                width: "300px",
      sorter: (a, b) => a.division_id.localeCompare(b.division_id),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("destination"),
      render:(data)=>{
  const syle= divsion.find((div)=>div.divisionId === data);
  return syle ? syle.divisionName:"N/A"
}
      // render: (skus) => skus.map((sku) => sku.destination),
    },
    {
      title: "RM Mapping",
      dataIndex: "rm_mapping_status",
      key: "rm_mapping_status",
      width: "300px",
      // sorter: (a, b) => a.rm_mapping_status.localeCompare(b.rm_mapping_status),
      // sortDirections: ["descend", "ascend"],
      // ...getColumnSearchProps("rm_mapping_status"),
filters:[
  {
    text:'Yes',
    value:'Yes',
  },
  {
    text:'No',
    value:'No',
  }
],
onFilter:(value,record)=>{return record.rm_mapping_status === value}
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (text, rowData, index) => (
        <span>
          {rowData.status !== "CANCELLED" ? (
            <Tooltip placement="top" title="Close SKU">
              <Popconfirm
                onConfirm={(value) => {
                  closeSKU(rowData.id);
                }}
                title={"Are you sure to Close ?"}
              >
                <Button type="primary" shape="circle">Close</Button>
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
                  {data?.map((e) => (
                    <Option key={e.fg_item_id} val={e.fg_item_id} code={e.item_code}>
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
                  {data?.map((e) => {
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
                  {data?.map((e) => {
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
                name="destination"
              >
                <Select
                  placeholder="Select Destination"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  onChange={(val, text) => destination(val, text)}
                >
                  {data?.map((e) => {
                    return (
                      <Option key={e.destinationsId} value={e.destinationsId}>
                        {e.destination}
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
              
              {selectedItemNo !== undefined && searchClicked ? (
                   selectView === "cards" ? (
                    <div>
                   <Card
                      title={`Item No: ${selectedItemNo}`}
                      style={{ cursor: "pointer" }}
                    >
                            <Row gutter={[20, 16]}>

                  {itemData.map((item) => {
                      let co;
                      if (item.color == "white") {
                        co = "balck";
                      } else {
                        co = "white";
                      }
                 
                     return(
                       
                      <Col
                         xs={{ span: 24 }}
                         sm={{ span: 12 }}
                         md={{ span: 8 }}
                         lg={{ span: 6 }}
                         xl={{ span: 6 }}
                         key={item.sku_code} 
                         >

                        {/* {item.sku?.map((e) => { */}
                        
                          
                          
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
                                    title={`SKU Code: ${item.sku_code}`}
                                  >
                                    <Descriptions.Item label="Size">
                                      {item.size}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Color">
                                      {/* <Tag
                                        color={item.colour}
                                        // style={{
                                        //   color: item.colour === 'white' ? 'black' : 'inherit',
                                        //   borderColor: item.colour === 'white' ? 'black' : 'inherit'
                                        // }}
                                        style={{
                                          color:
                                            item.colour == "White"
                                              ? "black"
                                              : "white",
                                        }}
                                      >
                                        {item.colour}
                                      </Tag> */}
                                      <Tag
                                     color={item.color}
                                            style={{
                                            color: item.color === "White" ? "black" : item.color === "Black" ? "white" : "inherit"
                                             }}
                                                   >
                                                     {item.color}
                                            </Tag>


                                    </Descriptions.Item>
                                    <Descriptions.Item label="Destination">
                                      {item.destination}
                                    </Descriptions.Item>
                                    
                                    <Descriptions.Item label="Style">
                             {getStyleName(item.style_id)}
                                </Descriptions.Item>
                                <Descriptions.Item label="Division">
                                      {getDivisionName(item.division_id)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="RM Mapping">
                                      {item.rm_mapping_status}
                                    </Descriptions.Item>
                                  </Descriptions>
                                </Card>
                              
                        </Col>
                   );
                                            })}
                      </Row>
                  
                   </Card>
                </div>
              ) : (
                <div>
                  <Card
                   title={`item code:${selectedItemNo}`} 
                     >
                    <Table
                    size="small"
                    dataSource={itemData}
                    columns={columnsSkelton}
                    />
                  </Card>
                  {/* {itemData.map((e) => (
                    <Card
                      style={{ width: "1240px" }}
key={e.item_code}
                      title={`Item Code: ${e.item_code}`}
                    >
                      <Table
                      key={e.item_code}
                        dataSource={itemData}
                        columns={columnsSkelton}
                        size="small"
                      />
                    </Card>
                   ))} */}
                </div>
              )
              ):null}
            </Space>
          </div>
              
        </Col>
      </Row>
    </>
  );
};
export default SkuList;