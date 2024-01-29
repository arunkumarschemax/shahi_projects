import { EditOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { BuyersService, CategoryService, ColourService, ContentService, FabricRequestCodeService, FabricTypeService, FabricWeaveService, FinishService, GRNService, HoleService, M3ItemsService, M3TrimsService, QualitysService, StockService, StructureService, ThicknessService, TrimParamsMappingService, TrimService, TypeService, UomService, VarietyService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Space, Table, Select, message, Modal, Tag, Tabs, Tooltip } from "antd";
import { ColumnType, ColumnProps } from "antd/es/table";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import { BuyerRefNoRequest, ItemTypeEnum, ItemTypeEnumDisplay, LogoEnum, LogoEnumDisplay, M3ItemsDTO, M3trimsDTO, MaterialFabricEnum, MenusAndScopesEnum, PartEnum, PartEnumDisplay, TrimCodeReq, TrimIdRequestDto, UomCategoryEnum, m3ItemsContentEnum } from "@project-management-system/shared-models";
const { TextArea } = Input;
const { Option } = Select;
import { Link } from 'react-router-dom';
import { useIAMClientState } from "../common/iam-client-react";
import AlertMessages from "../common/common-functions/alert-messages";
import TabPane from "antd/es/tabs/TabPane";
import M3Items from "../masters/m3-items/m3-items-form";
import M3TrimItemsForm from "../trim-master/m3-trim-items/m3-trim-items";
import RolePermission from "../role-permissions";

export const TrimReqCodeView = () => {
  const stockService = new StockService();
  const [data, setData] = useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const paramsService = new TrimParamsMappingService()
  const service = new M3TrimsService()
  const trimReqCodeService = new FabricRequestCodeService()

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
  const [filterData, setFilterData] = useState<any[]>([])
  const [selectedTrimCategory, setSelectedTrimCategory] = useState(null);
  const [activeTab, setActiveTab] = useState<string>()
  const [modalVisible, setModalVisible] = useState(false);
  const [requestData, setRequestData] = useState<any[]>([]);


  const onTabChange = (key) => {
    setActiveTab(key);
    onFinish(key)
  };

  useEffect(() => {
    // const userrefNo = IAMClientAuthContext.user?.externalRefNo
    // if(userrefNo){
    //   setIsBuyer(true)
    // }
    getTrims();
    getBuyers();
    onFinish('Open')
  }, [mapData]);
  const checkAccess = (buttonParam) => {   
    const accessValue = RolePermission(null,MenusAndScopesEnum.Menus["Sample Development"],MenusAndScopesEnum.SubMenus["Trim Request"],buttonParam)
    
    return accessValue
}

  const getStructures = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    trimReqCodeService.getAllStructures(req).then((res) => {
      if (res.status) {
        setStructureData(res.data);
      }
    });
  };

  const getCategories = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    trimReqCodeService.getAllCategories(req).then((res) => {
      if (res.status) {
        setCategoryData(res.data);
      }
    });
  };

  const getContents = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    trimReqCodeService.getAllContents(req).then((res) => {
      if (res.status) {
        setContentData(res.data);
      }
    });
  };

  const getTypes = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    trimReqCodeService.getAllTypes(req).then((res) => {
      if (res.status) {
        setTypeData(res.data);
      }
    });
  };

  const getFinishes = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    trimReqCodeService.getAllFinishes(req).then((res) => {
      if (res.status) {
        setFinishData(res.data);
      }
    });
  };

  const getHoles = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    trimReqCodeService.getAllHoles(req).then((res) => {
      if (res.status) {
        setHoleData(res.data);
      }
    });
  };

  const getQuality = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    trimReqCodeService.getAllQuality(req).then((res) => {
      if (res.status) {
        setQtyData(res.data);
      }
    });
  };

  const getThicks = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    trimReqCodeService.getAllThickness(req).then((res) => {
      if (res.status) {
        setThickData(res.data);
      }
    });
  };

  const getVarieties = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    trimReqCodeService.getAllVariety(req).then((res) => {
      if (res.status) {
        setVarietyData(res.data);
      }
    });
  };

  const getTrims = () => {
    trimReqCodeService.getAllTrimCategories().then((res) => {
      if (res.status) {
        setTrimData(res.data);
      }
    });
  };

  const getUom = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    trimReqCodeService.getAllUom(req).then((res) => {
      if (res.status) {
        setUomData(res.data);
      }
    });
  };

  const getColors = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    trimReqCodeService.getAllColors(req).then((res) => {
      if (res.status) {
        setColorData(res.data);
      }
    });
  };

  const getBuyers = () => {
    const req = new BuyerRefNoRequest()
    const refNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null   
    req.buyerRefNo = refNo
    console.log(refNo,'=========')
    trimReqCodeService.getAllBuyers(req).then((res) => {
      if (res.status) {
        setBuyerData(res.data);
      //   if(refNo){
      //     form.setFieldsValue({buyerId: res.data[0]?.buyerId})
      //     // onBuyerChange(res.data[0]?.buyerId,res.data[0]?.buyerName)
      // }
      }
    });
  };

  const getMappedTrims = (value?) => {
    const req = new TrimIdRequestDto(value)
    paramsService.getMappedParamsByTrim(req).then((res) => {
      if (res.status) {
        setMapData(res.data)
        // setMapDataId(res.data[0]?.trimMappingId)
        form.setFieldsValue({trimMappingId: res.data[0]?.trimMappingId})
        // onFinish()
      }
    });
  }

  const trimOnChange = (value)=>{
    setMapData([]);
    setData([])
  setSelectedTrimCategory(value);
  form.setFieldsValue({
    structureId: undefined,
    categoryId: undefined,
    contentId: undefined,
    typeId: undefined,
    finishId: undefined,
    holeId: undefined,
    qualityId: undefined,
    thicknessId: undefined,
    varietyId: undefined,
    uomId: undefined,
    colorId: undefined,
    logo: undefined,
    part: undefined,
    buyerId: undefined,
    trimType:undefined
  });
  getMappedTrims(value);
  }

  const onFinish = (key) => {
    console.log(activeTab,'------000000000000000')
    const req = new TrimCodeReq(form.getFieldValue('buyerId'),form.getFieldValue('trimType'),key)  
    trimReqCodeService.getAllTrims(req).then((res) => {
      if (res.status) {
        setData(res.data);
        message.success(res.internalMessage,2);
      }else{
        message.warning(res.internalMessage,2);
      }
    }).catch((err) => {
      setData([]);
      AlertMessages.getErrorMessage(err.message);
    });
  };

  const onReset = () => {
    form.resetFields();
    setMapData([])
    setData([])
  };


  
  const setModel = (val) => {
    console.log(val);
    // setVisibleModel(val);
  }
  const handleCancel = () => {
    setModalVisible(false);
  };
  const modalView = (rowData:any) => {
    return  (
  //   <Modal
  //     className='rm-'
  //     // key={'modal' + Date.now()}
  //     width={'70%'}
  //     visible={modalVisible}
  //     style={{ top: 30, alignContent: 'right' }}
  //     title={<React.Fragment>
  //     </React.Fragment>}
  //     onCancel={handleCancel}
  //     footer={[]}
  // >
    <M3TrimItemsForm props={requestData}/>
  // </Modal>
  )
  
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

  const createItem = (rowData: any) => {
    console.log(rowData)
    setModalVisible(true)
    setRequestData(rowData);
  }

  const columns: ColumnProps<any>[] = [
    {
      title: "S No",
      key: "sno",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: <div style={{textAlign:"center"}}>Buyer</div>,
      dataIndex: "buyerName",
      ...getColumnSearchProps("buyerName"),
      sorter: (a, b) => a.buyerName.localeCompare(b.buyerName),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <span>
            {record.buyerName ? record.buyerName : '-'}
        </span>
    ),
    },
    {
      title: <div style={{textAlign:"center"}}>Trim Type</div>,
      dataIndex: "trimType",
      ...getColumnSearchProps("trimType"),
      sorter: (a, b) => a.trimType.localeCompare(b.trimType),
      sortDirections: ["descend", "ascend"],
      render: (text) => {
        const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
        return EnumObj ? EnumObj.displayVal : text;
      },
    },
    {
      title: <div style={{textAlign:"center"}}>Trim Category</div>,
      dataIndex: "trimCategory",
      ...getColumnSearchProps("trimCategory"),
      sorter: (a, b) => a.trimCategory.localeCompare(b.trimCategory),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <span>
            {record.trimCategory ? record.trimCategory : '-'}
        </span>
    ),
    },
    // mapData[0]?.structure === true?{
    //   title: <div style={{textAlign:"center"}}>Structure</div>,
    //   dataIndex: "structure",
    //   ...getColumnSearchProps("structure"),
    //   sorter: (a, b) => a.structure.localeCompare(b.structure),
    //   sortDirections: ["descend", "ascend"],
    // }: {},
    // mapData[0]?.category === true?
    {
      title: <div style={{textAlign:"center"}}>Category</div>,
      dataIndex: "category",
      ...getColumnSearchProps("category"),
      sorter: (a, b) => a.category.localeCompare(b.category),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <span>
            {record.category ? record.category : '-'}
        </span>
    ),
    }
    // :{}
    ,
    // mapData[0]?.content === true?
    {
      title: <div style={{textAlign:"center"}}>Content</div>,
      dataIndex: "content",
      ...getColumnSearchProps("content"),
      sorter: (a, b) => a.content.localeCompare(b.content),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <span>
            {record.content ? record.content : '-'}
        </span>
    ),
    }
    // :{}
    ,
    // mapData[0]?.type === true?
    {
      title: <div style={{textAlign:"center"}}>Type</div>,
      dataIndex: "type",
      ...getColumnSearchProps("type"),
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ["descend", "ascend"],
      render: (text) => {
        const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
        return EnumObj ? EnumObj.displayVal : text;
      },
  }
      // : {}
      ,
    // mapData[0]?.finish === true?
    {
      title: <div style={{textAlign:"center"}}>Finish</div>,
      dataIndex: "finish",
      ...getColumnSearchProps("finish"),
      sorter: (a, b) => a.finish.localeCompare(b.finish),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <span>
            {record.finish ? record.finish : '-'}
        </span>
    ),
    }
    // : {}
    ,
    // mapData[0]?.hole === true?
    {
      title: <div style={{textAlign:"center"}}>Hole</div>,
      dataIndex: "hole",
      ...getColumnSearchProps("hole"),
      sorter: (a, b) => a.hole.localeCompare(b.hole),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <span>
            {record.hole ? record.hole : '-'}
        </span>
    ),
    }
    // : {}
    ,
    // mapData[0]?.quality === true?{
    //   title: <div style={{textAlign:"center"}}>Quality</div>,
    //   dataIndex: "qualityName",
    //   ...getColumnSearchProps("qualityName"),
    //   sorter: (a, b) => a.qualityName.localeCompare(b.qualityName),
    //   sortDirections: ["descend", "ascend"],
    // }: {},
    // mapData[0]?.thickness === true?{
    //   title: <div style={{textAlign:"center"}}>Thickness</div>,
    //   dataIndex: "thickness",
    //   ...getColumnSearchProps("thickness"),
    //   sorter: (a, b) => a.thickness.localeCompare(b.thickness),
    //   sortDirections: ["descend", "ascend"],
    // }: {},
    // mapData[0]?.variety === true?{
    //   title: <div style={{textAlign:"center"}}>Variety</div>,
    //   dataIndex: "variety",
    //   ...getColumnSearchProps("variety"),
    //   sorter: (a, b) => a.variety.localeCompare(b.variety),
    //   sortDirections: ["descend", "ascend"],
    // }: {},
    // mapData[0]?.uom === true?{
    //   title: <div style={{textAlign:"center"}}>UOM</div>,
    //   dataIndex: "uom",
    //   ...getColumnSearchProps("uom"),
    //   sorter: (a, b) => a.uom.localeCompare(b.uom),
    //   sortDirections: ["descend", "ascend"],
    // }: {},
    // mapData[0]?.color === true?{
    //   title: <div style={{textAlign:"center"}}>Color</div>,
    //   dataIndex: "color",
    //   ...getColumnSearchProps("color"),
    //   sorter: (a, b) => a.color.localeCompare(b.color),
    //   sortDirections: ["descend", "ascend"],
    // }: {},
    // mapData[0]?.logo === true?{
    //   title: <div style={{textAlign:"center"}}>Logo</div>,
    //   dataIndex: "logo",
    //   ...getColumnSearchProps("logo"),
    //   sorter: (a, b) => a.logo.localeCompare(b.logo),
    //   sortDirections: ["descend", "ascend"],
    // }: {},
    // mapData[0]?.part === true?{
    //   title: <div style={{textAlign:"center"}}>Part</div>,
    //   dataIndex: "part",
    //   ...getColumnSearchProps("part"),
    //   sorter: (a, b) => a.part.localeCompare(b.part),
    //   sortDirections: ["descend", "ascend"],
    // }:{},
    {
      title: <div style={{textAlign:"center"}}>M3 Code</div>,
      dataIndex: "m3Code",
      ...getColumnSearchProps("m3Code"),
      render: (text, record) => (
        <span>
            {record.m3Code ? record.m3Code : '-'}
        </span>
    ),
    },
    {
      title: <div style={{textAlign:"center"}}>HSN Code</div>,
      dataIndex: "hsnCode",
      ...getColumnSearchProps("hsnCode"),
      render: (text, record) => (
        <span>
            {record.hsnCode ? record.hsnCode : '-'}
        </span>
    ),
    },
    {
      title: <div style={{textAlign:"center"}}>Status</div>,
      dataIndex: "status",
      ...getColumnSearchProps("status"),
      render: (text, record) => (
        <span>
            {record.status ? record.status : '-'}
        </span>
    ),
    },
    {
      title:`Action`,
      dataIndex: 'action',
      render: (text, rowData) => {
        return (<span>
          {checkAccess(MenusAndScopesEnum.Scopes.Update)?(
          <Tooltip placement="top" title='Create Item'>
              <Tag >
                  <EditOutlined type= "edit"
                      onClick={() => {
                          createItem(rowData)
                      }}
                      style={{ color: '#1890ff', fontSize: '14px' }} />
              </Tag>
          </Tooltip>
          ):('-')}
          </span>
        )
      }
    }
  ]

  const filteredColumns = columns.filter((column) => Object.keys(column).length > 0);


  const clearData = () => {
    form.resetFields();
  };


   const onBuyerChange = (value) =>{
    setMapData([])
   }

   const handleChange =(value?,)=>{

   }

 
  return (
    <Card title="Trim Request Code" headStyle={{ backgroundColor: '#69c0ff', border: 0 }} >
      <Form form={form} layout={"vertical"} name="control-hooks" onFinish={onFinish}
      >
        <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="buyerId" label="Buyer" rules={[{ required: false, message: "Buyer is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Buyer"
                    onChange={onBuyerChange}
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
                <Form.Item name="trimType" label="Trim Type" rules={[{ required: false, message: "Trim Type is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select Trim Type"
                    >
                        {Object.values(ItemTypeEnumDisplay).filter((val) => val.displayVal !== ItemTypeEnum.FABRIC).map((val) => (
                            <Option key={val.name} value={val.name}>
                                {val.displayVal}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
            {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="trimCategoryId" label="Trim Category" rules={[{ required: false, message: "Trim Category is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select Trim Category"
                    onChange={trimOnChange}
                    value={selectedTrimCategory}
                    >
                        {trimData.map((e) => {
                            return (
                            <Option key={e.trimCategoryId} value={e.trimCategoryId}>
                                {e.trimCategory}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col> */}
            {/* {mapData[0]?.structure === true ? (
              <>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                  <Form.Item
                    name="structureId"
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
            ) : (<></>)} */}
            {/* {mapData[0]?.category == true ? (
            <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="categoryId" label="Category" rules={[{ required: false, message: "Category is required" }]}>
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
                <Form.Item name="contentId" label="Content" rules={[{ required: false, message: "Content is required" }]}>
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
                <Form.Item name="typeId" label="Type" rules={[{ required: false, message: "Type is required" }]}>
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
                <Form.Item name="finishId" label="Finish" rules={[{ required: false, message: "Finish is required" }]}>
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
                <Form.Item name="holeId" label="Hole" rules={[{ required: false, message: "Hole is required" }]}>
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
            ) : (<></>)} */}
            {/* {mapData[0]?.quality === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="qualityId" label="Quality" rules={[{ required: false, message: "Quality is required" }]}>
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
            ) : (<></>)} */}
            {/* {mapData[0]?.thickness === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="thicknessId" label="Thickness" rules={[{ required: false, message: "Thickness is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Thickness"
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
            ) : (<></>)} */}
            {/* {mapData[0]?.variety === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="varietyId" label="Variety" rules={[{ required: false, message: "Variety is required" }]}>
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
            ) : (<></>)} */}
            {/* {mapData[0]?.uom === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="uomId" label="UOM" rules={[{ required: false, message: "UOM is required" }]}>
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
            ) : (<></>)} */}
            {/* {mapData[0]?.color === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="colorId" label="Color" rules={[{ required: false, message: "Color is required" }]}>
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
            ) : (<></>)} */}
            {/* {mapData[0]?.logo === true ? (
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
            ) : (<></>)} */}
            {/* {mapData[0]?.part === true ? (
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
            ) : (<></>)} */}
            {/* <Col>
                <Form.Item name="trimMappingId" label="Trim Mapping" rules={[{ required: false, message: "Trim Mapping is required" }]} style={{display:'none'}}>
                    <Input hidden/>
                </Form.Item>
            </Col> */}
        {/* </Row>
        <Row gutter={24}> */}
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }} style={{ marginTop: "18px", textAlign: "right" }}>
              <Form.Item>
                <Button 
                icon={<SearchOutlined />} 
                htmlType="submit" 
                type="primary" 
                style={{ marginLeft: 50, marginTop: 5 }}
                >
                  Submit
                </Button>
                <Button danger icon={<UndoOutlined />} onClick={onReset} style={{ marginLeft: 30 }}>
                  Reset
                </Button>
              </Form.Item>
            </Col>
        </Row>
      </Form>
      <Tabs activeKey={activeTab} type="card" onChange={onTabChange} style={{ marginTop: '20px' }}>
        <TabPane tab="Open" key="OPEN">
            <Table
              className="custom-table-wrapper"
              dataSource={data}
              columns={filteredColumns}
              size="small"
            />
        </TabPane>
        <TabPane tab="Completed" key="COMPLETED">
            <Table
              className="custom-table-wrapper"
              dataSource={data}
              columns={filteredColumns}
              size="small"
            />
        </TabPane>
      </Tabs>
      {/* {data.length > 0 && (
        <Table
          className="custom-table-wrapper"
          dataSource={data.length > 0 ? data : []}
          columns={filteredColumns}
          size="small"
        />
      )} */}
      <Modal
            className='rm-'
            // key={'modal' + Date.now()}
            width={'79%'}
            style={{ top: 30, alignContent: 'right' }}
            visible={modalVisible}
            title={<React.Fragment>
            </React.Fragment>}
            onCancel={handleCancel}
            footer={[]}
        >
          {modalView(data)}
        </Modal>
    </Card>
  );
};
