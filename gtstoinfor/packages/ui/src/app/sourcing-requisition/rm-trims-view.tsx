import { SearchOutlined } from "@ant-design/icons";
import { BuyersService, CategoryService, ColourService, ContentService, FabricTypeService, FabricWeaveService, FinishService, GRNService, HoleService, M3ItemsService, QualitysService, StockService, StructureService, ThicknessService, TrimParamsMappingService, TrimService, TypeService, UomService, VarietyService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Space, Table, Select, message, Modal, Tag } from "antd";
import { ColumnType, ColumnProps } from "antd/es/table";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import AlertMessages from "../common/common-functions/alert-messages";
import { useNavigate } from "react-router-dom";
import { BuyerRefNoRequest, ItemTypeEnumDisplay, LogoEnum, LogoEnumDisplay, M3ItemsDTO, M3trimsDTO, MenusAndScopesEnum, PartEnum, PartEnumDisplay, TrimIdRequestDto, UomCategoryEnum, m3ItemsContentEnum } from "@project-management-system/shared-models";
import { Reclassification } from "./reclassification";
import { useIAMClientState } from "../common/iam-client-react";
import { RolePermission } from "../role-permissions";
const { TextArea } = Input;
const { Option } = Select;

export const RmTrimsView = () => {
  const stockService = new StockService();
  const [data, setData] = useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
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
  const { IAMClientAuthContext, dispatch } = useIAMClientState();
  const [isBuyer, setIsBuyer] = useState(false);
  const [rowData, setRowData] = useState<any>(undefined);
  const [visibleModel, setVisibleModel] = useState<boolean>(false);

  const userrefNo = IAMClientAuthContext.user?.externalRefNo;
  const roles = IAMClientAuthContext.user?.roles;
  const [button,setButton] = useState<boolean>(true)


  useEffect(() => {
    if(userrefNo){
      setIsBuyer(true)
    }
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
    getBuyerByRefNo()
  }, [mapData]);
  
  const checkAccess = (buttonParam) => {   
    const accessValue = RolePermission(null,MenusAndScopesEnum.Menus.Procurment,MenusAndScopesEnum.SubMenus["RM Trim Inventory"],buttonParam)
    return accessValue
}
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
    const req = new BuyerRefNoRequest()
    req.buyerRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyerData(res.data);
      }
    });
  };

  const getBuyerByRefNo = () => {
    const req = new BuyerRefNoRequest()
    req.buyerRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
    buyerService.getAllActiveBuyers(req).then((res) => {
      if (res.status && req.buyerRefNo) {
        form.setFieldsValue({buyerId: res.data[0]?.buyerId})
        onFinish()
      }
    });
  };

  const getMappedTrims = (value) => {
    const req = new TrimIdRequestDto(value)
    paramsService.getMappedParamsByTrim(req).then((res) => {
      if (res.status) {
        setMapData(res.data)
      }
    });
  }

  const onReset = () => {
    form.resetFields();
  };

  const getItemsForOtherBuyers = () => {
    if(userrefNo === undefined){
      setButton(false)
    }
    let req = new M3trimsDTO(0,undefined,undefined,form.getFieldValue("category"),form.getFieldValue("color"),form.getFieldValue("content"),form.getFieldValue("finish"),form.getFieldValue("hole"),form.getFieldValue("logo"),form.getFieldValue("part"),form.getFieldValue("quality"),form.getFieldValue("structure"),form.getFieldValue("thickness"),form.getFieldValue("type"),form.getFieldValue("uom"),form.getFieldValue("variety"),form.getFieldValue("trimCategory"),0)
    console.log(req);
    req.extRefNumber = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
    stockService.getAllTrimStocks(req).then((res) => {
      if (res.status) {
        setData(res.data);
        AlertMessages.getSuccessMessage(res.internalMessage);
        // window.location.reload();
      }
      else{
        setData([]);
        AlertMessages.getWarningMessage(res.internalMessage);
      }
    })
    .catch((err) => {
      setData([]);
      AlertMessages.getErrorMessage(err.message);
    });

  }
  
  const setModel = (val) => {
    console.log(val);
    setVisibleModel(val);
    onFinish()
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

  const getRowData = async (m3StyleDto: any) => {
    setRowData(m3StyleDto);
    console.log(m3StyleDto,"kk")
    setVisibleModel(true);
  }

  const columns: ColumnProps<any>[] = [
    {
      title: "S No",
      key: "sno",
      width:50,
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
      title: "GRN Number",
      dataIndex: "grnNumber",
      width:150,
      ...getColumnSearchProps("grnNumber"),
      sorter: (a, b) => a.grnNumber.localeCompare(b.stockType),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      width:100,
      ...getColumnSearchProps("buyer"),
      sorter: (a, b) => a.buyer.localeCompare(b.buyer),
      sortDirections: ["descend", "ascend"],
      
    },
    // {
    //   title: "Stock Type",
    //   dataIndex: "stockType",
    //   ...getColumnSearchProps("stockType"),
    //   sorter: (a, b) => a.stockType.localeCompare(b.stockType),
    //   sortDirections: ["descend", "ascend"],
    // },
    // {
    //   title: "Sample Order",
    //   dataIndex: "sampleOrder",
    //   ...getColumnSearchProps("sampleOrder"),
    //   sorter: (a, b) => a.sampleOrder.localeCompare(b.sampleOrder),
    //   sortDirections: ["descend", "ascend"],
    // },
    // {
    //   title: "Indent",
    //   dataIndex: "Indent",
    //   ...getColumnSearchProps("Indent"),
    //   sorter: (a, b) => a.Indent.localeCompare(b.Indent),
    //   sortDirections: ["descend", "ascend"],
    // },
    {
      title: "Material Type",
      dataIndex: "itemType",
      width:150,
      ...getColumnSearchProps("itemType"),
      sorter: (a, b) => a.itemType.localeCompare(b.itemType),
      sortDirections: ["descend", "ascend"],
      render: (text) => {
        const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
        return EnumObj ? EnumObj.displayVal : text;
      },
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
      title: <div style={{textAlign:"center"}}>Trim Params</div>,
      dataIndex: "trimParams",
      width:250,

    },
    {
      title: "M3 Item",
      dataIndex: "m3Item",
      width:250,
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
      width:100,
      ...getColumnSearchProps("location"),

    },

    {
      title: "Quantity",
      dataIndex: "qty",
      width:50,
      render: (record) => (
        <span>
          {record.qty} + " " + {record.uom} 
        </span>
      ),
      ...getColumnSearchProps("qty"),
      // sorter: (a, b) => a.itemQuantity - b.itemQuantity,
      // sortDirections: ['descend', 'ascend'],
    },
    // {
    //   title:`Action`,
    //   dataIndex: 'action',
    //   render: (text, rowData) => (
        
    //     <span>  
    //      <Button style={{backgroundColor:'#69c0ff'}} onClick={ (e) => getRowData(rowData) }
    //       disabled={rowData.buyer_id === buyervalue ? true : false}
    //       ><b>Assign Reclassification</b></Button>
    //     </span>
    //   )
    // }
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, rowData) => {
        // if (rowData.buyer_id === buyervalue) {
        //   return "-";
        // }
    
        return (
          <span>
             {
              (userrefNo && rowData.refNo === userrefNo) ? "-" : 
              checkAccess(MenusAndScopesEnum.Scopes.reclassification) ? userrefNo === '' && !button || form.getFieldValue('buyerId') !=  rowData.buyer_id ?
            <Button
              style={{ backgroundColor: '#69c0ff' }}
              onClick={(e) => getRowData(rowData)}
            >
              <b>Request Reclassification</b>
            </Button>:"-":''
          }
          </span>
        );
      }
    }
  ];
  const clearData = () => {
    form.resetFields();
    

  };

  const handleCancel = () => {
    // setVisibleModel(false);
  };

  // const getItemsForOtherBuyers = () => {
  //   console.log(form.getFieldsValue())
  //   // console.log()
  //   const data = new M3ItemsDTO(null,'',form.getFieldValue("content"),form.getFieldValue("fabricType"),form.getFieldValue("weave"),weightValue,weightUnitValue,form.getFieldValue("construction"),countValue,countUnitValue,widthValue,widthUnitValue,form.getFieldValue("finish"),form.getFieldValue("shrinkage"),form.getFieldValue("buyerId"),"",form.getFieldValue("buyerCode"))

  //   let formData: M3ItemsDTO = data;
  //   console.log(formData)
  //   console.log(formData.buyerId)
  //   formData.buyerId = undefined;
  //   console.log(formData)
  //   // getData(formData);
  // }

  // const onChange =(value) =>{
  //   if(value === null || undefined) {
  //     setButtonEnable(true)
  //    }else {
  //     setButtonEnable(false)
  //    }
  // }

  const onFinish = () => {
    console.log(form.getFieldValue("buyerId"))
    let req = new M3trimsDTO(0,form.getFieldValue("buyerId"),undefined,form.getFieldValue("category"),form.getFieldValue("color"),form.getFieldValue("content"),form.getFieldValue("finish"),form.getFieldValue("hole"),form.getFieldValue("logo"),form.getFieldValue("part"),form.getFieldValue("quality"),form.getFieldValue("structure"),form.getFieldValue("thickness"),form.getFieldValue("type"),form.getFieldValue("uom"),form.getFieldValue("variety"),form.getFieldValue("trimCategory"),0)
    console.log(req);
    req.extRefNumber = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
    stockService.getAllTrimStocks(req).then((res) => {
      if (res.status) {
        setData(res.data);
        AlertMessages.getSuccessMessage(res.internalMessage);
        // window.location.reload();
      }
      else{
        setData([]);
        AlertMessages.getWarningMessage(res.internalMessage);
      }
    })
    .catch((err) => {
      setData([]);
      AlertMessages.getErrorMessage(err.message);
    });
    // if(form.getFieldValue("content")) {
    //   setButtonEnable(false)
    //  }
    // console.log(form.getFieldsValue())
    // const data = new M3ItemsDTO(null,'',form.getFieldValue("content"),form.getFieldValue("fabricType"),form.getFieldValue("weave"),weightValue,weightUnitValue,form.getFieldValue("construction"),countValue,countUnitValue,widthValue,widthUnitValue,form.getFieldValue("finish"),form.getFieldValue("shrinkage"),form.getFieldValue("buyerId"),"",form.getFieldValue("buyerCode"))
    // console.log(data)
    // getData(data);
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
    if(userrefNo === ''){
      setButton(true)
    }
    // setBuyervalue(value)
   }

 

  return (
    <Card title="RM Trims Inventory" headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
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
                    >
                        {buyerData.map((e) => {
                            return (
                            <Option key={e.buyerId} value={e.buyerId}>
                                {e.buyerName}-{e.buyerCode}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="trimCategory" label="Trim Category" rules={[{ required: false, message: "Trim Category is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select Trim Category"
                    onChange={getMappedTrims}
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
                    name="structure"
                    label="Structure"
                    rules={[{ required: false, message: "Structure is required" }]}
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
                <Form.Item name="category" label="Category" rules={[{ required: false, message: "Category is required" }]}>
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
                <Form.Item name="content" label="Content" rules={[{ required: false, message: "Content is required" }]}>
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
                <Form.Item name="type" label="Type" rules={[{ required: false, message: "Type is required" }]}>
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
            {mapData[0]?.finish === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="finish" label="Finish" rules={[{ required: false, message: "Finish is required" }]}>
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
                <Form.Item name="hole" label="Hole" rules={[{ required: false, message: "Hole is required" }]}>
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
                <Form.Item name="qualityName" label="Quality" rules={[{ required: false, message: "Quality is required" }]}>
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
                <Form.Item name="warehouse" label="Thickness" rules={[{ required: false, message: "Warehouse is required" }]}>
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
            </>
            ) : (<></>)}
            {mapData[0]?.variety === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="variety" label="Variety" rules={[{ required: false, message: "Variety is required" }]}>
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
                <Form.Item name="uom" label="UOM" rules={[{ required: false, message: "UOM is required" }]}>
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
                <Form.Item name="color" label="Color" rules={[{ required: false, message: "Color is required" }]}>
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
        {/* </Row>
        <Row> */}
            <Col span={6} style={{paddingTop:'23px'}}>
                <Button type="primary" htmlType="submit">Get Stock</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button htmlType="button" onClick={onReset}>Reset</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={(e) => getItemsForOtherBuyers()}  >Check Other Buyers </Button>
            </Col>
        </Row>
      </Form>
        
      <Table
        className="custom-table-wrapper"
        dataSource={data.length > 0 ? data : []}
        columns={columns}
        size="small"
        scroll={{x:1200,y:500}}
        pagination={{
          onChange(current) {
            setPage(current);
          }
        }}
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
            <Reclassification data = {rowData} buyer= {form.getFieldValue("buyerId")} type="stock" status={setModel}/>
            </Modal>
    </Card>
  );
};
