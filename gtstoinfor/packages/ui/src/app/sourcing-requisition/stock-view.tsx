import { SearchOutlined } from "@ant-design/icons";
import { BuyersService, FabricTypeService, FabricWeaveService, M3ItemsService, StockService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Space, Table, Select, message, Modal } from "antd";
import { ColumnType, ColumnProps } from "antd/es/table";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import AlertMessages from "../common/common-functions/alert-messages";
import { useNavigate } from "react-router-dom";
import { M3ItemsDTO, UomCategoryEnum, m3ItemsContentEnum } from "@project-management-system/shared-models";
import { Reclassification } from "./reclassification";
const { TextArea } = Input;

export const StockView = () => {
  const stockService = new StockService();
  const [data, setData] = useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const service = new M3ItemsService();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [uom, setUom] = useState<any[]>([]);
  const [weightData, setWeightData] = useState<any[]>([]);
  const [rowData, setRowData] = useState<any>(undefined);
  const [visibleModel, setVisibleModel] = useState<boolean>(false);
  const [yarnData, setYarnData] = useState<any[]>([]);
  const [widthData, setWidthData] = useState<any[]>([]);
  const [buyer, setBuyer] = useState<any[]>([]);
  const uomService = new UomService();
  const fabricService = new FabricTypeService();
  const weaveService = new FabricWeaveService();
  const [weave, setWeave] = useState<any[]>([]);
  const buyerService = new BuyersService();
  const [fabricType, setFabricType] = useState<any[]>([]);
  const [weightValue, setWeightValue] = useState<any>();
  const [weightUnitValue, setWeightUnitValue] = useState<any>();
  const [widthValue, setWidthValue] = useState<any>();
  const [widthUnitValue, setWidthUnitValue] = useState<any>();
  const [countValue, setCountValue] = useState<any>();
  const [countUnitValue, setCountUnitValue] = useState<any>();
  const [buttonEnable,setButtonEnable] = useState<boolean>(true)
  const [buyervalue,setBuyervalue] = useState<any>()




  useEffect(() => {
    getUom();
    getFabricTypedata();
    getWeaveData();
    getBuyers();
  }, []);

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

  const getData = async (m3StyleDto: M3ItemsDTO) => {
    stockService.getAllStocks(m3StyleDto).then(res => {
      // console.log(res, "???????????????????????????????????");
      if (res) {
        setData(res);
        AlertMessages.getSuccessMessage("Stock retrived successfully")
      } else {
        setData([]);
        AlertMessages.getErrorMessage("Something went wrong. ")
      }
    }).catch(err => {
      console.log(err);
      setData([]);
      AlertMessages.getInfoMessage("Something went wrong. ")
    })
  }

  const getRowData = async (m3StyleDto: any) => {
    setRowData(m3StyleDto);
    console.log(m3StyleDto,"kk")
    setVisibleModel(true);
  }

  const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters);
              setSearchedColumn(dataIndex);
              confirm({ closeDropdown: true });
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase())
        : false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
  const customFilter = (value, record) => {
    if (value === null) return true; // If filter is not active, show all rows
    return record.itemType === value;
  };
  const columns: ColumnProps<any>[] = [
    {
      title: "S No",
      key: "sno",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    // {
    //   title: "M3 Style",
    //   dataIndex: "m3_style_code",
    //   ...getColumnSearchProps("m3_style_code"),
    //   // sorter: (a, b) => a.plant - b.plant,
    //   // sortDirections: ['descend', 'ascend'],
    // },
    

    {
      title: "Buyer",
      dataIndex: "buyer",
      ...getColumnSearchProps("buyer"),
      sorter: (a, b) => a.buyer.localeCompare(b.buyer),
      sortDirections: ["descend", "ascend"],
      
    },
    {
      title: "Material Type",
      dataIndex: "itemType",
      ...getColumnSearchProps("itemType"),
      sorter: (a, b) => a.itemType.localeCompare(b.itemType),
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "Item Code",
    //   dataIndex: "code",
    //   render: (text) => (
    //     <span>
    //       {text ? text : "Fab001"} {/* Display data if available, otherwise show "No Data" */}
    //     </span>
    //   ),
    //   ...getColumnSearchProps("item_code"),
    // },
    {
      title: "M3 Item",
      dataIndex: "m3Item",
      ...getColumnSearchProps("m3Item"),
      sorter: (a, b) => a.m3Item.localeCompare(b.m3Item),
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "Style",
    //   dataIndex: "style",
    //   ...getColumnSearchProps("style"),
    // },
    {
      title: "Location",
      dataIndex: "location",
      ...getColumnSearchProps("location"),

    },

    {
      title: "Quantity",
      dataIndex: "qty",
      render: (record) => (
        <span>
          {record.qty} + " " + {record.uom} 
        </span>
      ),
      ...getColumnSearchProps("qty"),
      // sorter: (a, b) => a.itemQuantity - b.itemQuantity,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title:`Action`,
      dataIndex: 'action',
      render: (text, rowData) => (
        <span>  
         <Button style={{backgroundColor:'#69c0ff'}} onClick={ (e) => getRowData(rowData) }
          // disabled={rowData.buyer_id === buyervalue ? true : false}
          ><b>Assign Reclassification</b></Button>
        </span>
      )
    }
  ];
  const clearData = () => {
    form.resetFields();
    

  };

  const handleCancel = () => {
    setVisibleModel(false);
  };

  const getItemsForOtherBuyers = () => {
    console.log(form.getFieldsValue())
    // console.log()
    const data = new M3ItemsDTO(null,'',form.getFieldValue("content"),form.getFieldValue("fabricType"),form.getFieldValue("weave"),weightValue,weightUnitValue,form.getFieldValue("construction"),countValue,countUnitValue,widthValue,widthUnitValue,form.getFieldValue("finish"),form.getFieldValue("shrinkage"),form.getFieldValue("buyerId"),"",form.getFieldValue("buyerCode"))

    let formData: M3ItemsDTO = data;
    console.log(formData)
    console.log(formData.buyerId)
    formData.buyerId = undefined;
    console.log(formData)
    getData(formData);
  }

  const onChange =(value) =>{
    if(value === null || undefined) {
      setButtonEnable(true)
     }else {
      setButtonEnable(false)
     }
  }
  const onFinish = () => {
    if(form.getFieldValue("content")) {
      setButtonEnable(false)
     }
    console.log(form.getFieldsValue())
    const data = new M3ItemsDTO(null,'',form.getFieldValue("content"),form.getFieldValue("fabricType"),form.getFieldValue("weave"),weightValue,weightUnitValue,form.getFieldValue("construction"),countValue,countUnitValue,widthValue,widthUnitValue,form.getFieldValue("finish"),form.getFieldValue("shrinkage"),form.getFieldValue("buyerId"),"",form.getFieldValue("buyerCode"))
    console.log(data)
    getData(data);
    // service
    //   .createM3Items(m3StyleDto)f
    //   .then((res) => {
    //     if (res.status) {
    //       AlertMessages.getSuccessMessage(res.internalMessage);
    //       setTimeout(() => {
    //         message.success("Submitted successfully");
    //         window.location.reload();
    //       }, 500);
    //     }
    //     else{
    //       AlertMessages.getWarningMessage(res.internalMessage);
    //     }
    //   })
    //   .catch((err) => {
    //     AlertMessages.getErrorMessage(err.message);
    //   });
  };
   const onBuyerChange = (value) =>{
    console.log(value)
    setBuyervalue(value)
   }

 

  return (
    <Card title="RM Inventory" headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
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
                onChange={onBuyerChange}
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
          <Col style={{display:"none"}}>
          <Form.Item
              name="buyerCode"
              rules={[{ required: false, message: "BuyerCode is required" }]}
            >
                <Input />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
              <Form.Item
                label="Content"
                name="content"
                rules={[{ required: false, message: "Field is required" }]}
              >
                <Select
                  optionFilterProp="children"
                  placeholder=" Select Content"
                  allowClear
                  onChange={onChange}
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
                <Select placeholder=" Select Fabric Type" >
                  {fabricType.map((option) => (
                    <option
                      key={option.fabricTypeId}
                      value={option.fabricTypeId}
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
                rules={[{ required: false, message: "Field is required" }]}
                
              >
                <Select placeholder=" Select Weave"  allowClear
                >
                  {weave.map((option) => (
                    <option
                      key={option.fabricWeaveId}
                      value={option.fabricWeaveId}
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
                rules={[{ required: false, message: "Field is required" }]}
                // style={{marginTop:25}}
              >
                <Space.Compact>
             <Input placeholder="Enter Weight" allowClear onChange={(e) => setWeightValue(e.target.value)}/>

              <Select style={{width:80}} allowClear placeholder="Unit" onChange={(value) => setWeightUnitValue(value)}>
              {weightData.map((e) => {
                          return (
                            <option key={e.uomId} value={e.uomId}>
                              {e.uom}
                            </option>
                          );
                        })}
         </Select>
          </Space.Compact>
               </Form.Item> 

         
            </Col>
            {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 2 }} style={{ marginTop: "2%" }}>

              <Form.Item name="weightUnit" 
                rules={[{ required: false, message: "Field is required" }]}
              >
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Unit"
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
            </Col> */}
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>

              <Form.Item
                label="Width"
                rules={[{ required: false, message: "Field is required" }]}
              >
              <Space.Compact>
             <Input placeholder="Enter Width" allowClear onChange={(e) => setWidthValue(e.target.value)}/>

              <Select style={{width:80}} allowClear placeholder="Unit" onChange={(value) => setWidthUnitValue(value)}>
              {widthData.map((e) => {
                    return (
                      <option key={e.uomId} value={e.uomId}>
                        {e.uom}
                      </option>
                    );
                  })}
         </Select>
          </Space.Compact>

              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>

              <Form.Item
                label=" Construction"
                name="construction"
                 rules={[
                  { required: false, message: 'Field is required' },
                ]}
              >
                <Input placeholder=" Enter  Construction" allowClear/>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 4 }}
              lg={{ span: 8 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label=" Yarn Count"
                name="yarnCount"
                 rules={[
                  { required: false, message: 'Field is required' },
                ]}
              >
                <Space.Compact>
             <Input placeholder="EnterYarn Count" allowClear onChange={(e) => setCountValue(e.target.value)}/>

              <Select style={{width:80}} allowClear placeholder="Unit" onChange={(value) => setCountUnitValue(value)}>
              {yarnData.map((e) => {
                    return (
                      <option key={e.uomId} value={e.uomId}>
                        {e.uom}
                      </option>
                    );
                  })}
         </Select>
          </Space.Compact>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 4 }}
              lg={{ span: 8 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label=" Finish"
                name="finish"
                 rules={[
                  { required: false, message: 'Field is required' },
                ]}
              >
                <Input placeholder=" Enter  Finish"  allowClear/>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 4 }}
              lg={{ span: 8 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label=" Shrinkage"
                name="shrinkage"
                 rules={[
                  { required: false, message: 'Field is required' },
                ]}
              >
                <Input placeholder=" Enter  Shrinkage" allowClear />
              </Form.Item>
            </Col>
            <Row gutter={8}>
            <Col span={24} >
              <Button type="primary" htmlType="submit"
              style={{marginTop:20,marginLeft:40}}
              >
                Get Items
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                htmlType="button"
                onClick={clearData}
                
              >
                Reset
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="primary" onClick={(e) => getItemsForOtherBuyers()} disabled={buttonEnable}
            //  style={{marginRight:300}}

              >Check Other Buyers
              </Button>
              </Col>
              </Row>
             
          </Row>
    </Form>
        
      <Table
        className="custom-table-wrapper"
        dataSource={data.length > 0 ? data : []}
        columns={columns}
        size="small"
      />
      <Modal
            className='rm-'
            key={'modal' + Date.now()}
            width={'80%'}
            style={{ top: 30, alignContent: 'right' }}
            visible={visibleModel}
            title={<React.Fragment>
            </React.Fragment>}
            onCancel={handleCancel}
            footer={[]}
        >
            <Reclassification data = {rowData} buyer= {form.getFieldValue("buyerId")} type="stock" />

            </Modal>
    </Card>
  );
};
