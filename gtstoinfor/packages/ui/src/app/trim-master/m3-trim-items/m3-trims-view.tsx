import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { BuyersService, CategoryService, ColourService, ContentService, FabricTypeService, FabricWeaveService, FinishService, GRNService, HoleService, M3ItemsService, M3TrimsService, QualitysService, StockService, StructureService, ThicknessService, TrimParamsMappingService, TrimService, TypeService, UomService, VarietyService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Space, Table, Select, message, Modal, Tag } from "antd";
import { ColumnType, ColumnProps } from "antd/es/table";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import { BuyerRefNoRequest, ItemTypeEnum, ItemTypeEnumDisplay, LogoEnum, LogoEnumDisplay, M3ItemsDTO, M3trimsDTO, PartEnum, PartEnumDisplay, TrimIdRequestDto, UomCategoryEnum, m3ItemsContentEnum } from "@project-management-system/shared-models";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useIAMClientState } from "../../common/iam-client-react";
const { TextArea } = Input;
const { Option } = Select;
import { Link } from 'react-router-dom';

export const M3TrimsView = () => {
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
  const service = new M3TrimsService()

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
  


  useEffect(() => {
    const userrefNo = IAMClientAuthContext.user?.externalRefNo
    if(userrefNo){
      setIsBuyer(true)
    }
    getTrims();
    getBuyers();
  }, [mapData]);

  const getStructures = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    service.getAllStructures(req).then((res) => {
      if (res.status) {
        setStructureData(res.data);
      }
    });
  };

  const getCategories = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    service.getAllCategories(req).then((res) => {
      if (res.status) {
        setCategoryData(res.data);
      }
    });
  };

  const getContents = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    service.getAllContents(req).then((res) => {
      if (res.status) {
        setContentData(res.data);
      }
    });
  };

  const getTypes = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    service.getAllTypes(req).then((res) => {
      if (res.status) {
        setTypeData(res.data);
      }
    });
  };

  const getFinishes = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    service.getAllFinishes(req).then((res) => {
      if (res.status) {
        setFinishData(res.data);
      }
    });
  };

  const getHoles = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    service.getAllHoles(req).then((res) => {
      if (res.status) {
        setHoleData(res.data);
      }
    });
  };

  const getQuality = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    service.getAllQuality(req).then((res) => {
      if (res.status) {
        setQtyData(res.data);
      }
    });
  };

  const getThicks = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    service.getAllThickness(req).then((res) => {
      if (res.status) {
        setThickData(res.data);
      }
    });
  };

  const getVarieties = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    service.getAllVariety(req).then((res) => {
      if (res.status) {
        setVarietyData(res.data);
      }
    });
  };

  const getTrims = () => {
    service.getAllTrimCategories().then((res) => {
      if (res.status) {
        setTrimData(res.data);
      }
    });
  };

  const getUom = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    service.getAllUom(req).then((res) => {
      if (res.status) {
        setUomData(res.data);
      }
    });
  };

  const getColors = (req?: M3trimsDTO) => {
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    service.getAllColors(req).then((res) => {
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
    service.getAllBuyers(req).then((res) => {
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

  const onFinish = (req?: M3trimsDTO) => {
    if (mapData[0]?.structure === true) {
      getStructures(req);
    }
    if (mapData[0]?.category === true) {
      getCategories(req);
    }
    if (mapData[0]?.content === true) {
      getContents(req);
    }
    if (mapData[0]?.type === true) {
      getTypes(req);
    }
    if (mapData[0]?.finish === true) {
      getFinishes(req);
    }
    if (mapData[0]?.hole === true) {
      getHoles(req);
    }
    if (mapData[0]?.quality === true) {
      getQuality(req);
    }
    if (mapData[0]?.thickness === true) {
      getThicks(req);
    }
    if (mapData[0]?.variety === true) {
      getVarieties(req);
    }
    if (mapData[0]?.uom === true) {
      getUom(req);
    }
    if (mapData[0]?.color === true) {
      getColors(req);
    }
    if (form.getFieldValue('buyerId') !== undefined) {
      req.buyerId = form.getFieldValue('buyerId')
    }
    if (form.getFieldValue('categoryId') !== undefined) {
      req.categoryId = form.getFieldValue('categoryId')
    }
    if (form.getFieldValue('colorId') !== undefined) {
      req.colorId = form.getFieldValue('colorId')
    }
    if (form.getFieldValue('contentId') !== undefined) {
      req.contentId = form.getFieldValue('contentId')
    }
    if (form.getFieldValue('finishId') !== undefined) {
      req.finishId = form.getFieldValue('finishId')
    }
    if (form.getFieldValue('holeId') !== undefined) {
      req.holeId = form.getFieldValue('holeId')
    }
    if (form.getFieldValue('logo') !== undefined) {
      req.logo = form.getFieldValue('logo')
    }
    if (form.getFieldValue('part') !== undefined) {
      req.part = form.getFieldValue('part')
    }
    if (form.getFieldValue('qualityId') !== undefined) {
      req.qualityId = form.getFieldValue('qualityId')
    }
    if (form.getFieldValue('structureId') !== undefined) {
      req.structureId = form.getFieldValue('structureId')
    }
    if (form.getFieldValue('thicknessId') !== undefined) {
      req.thicknessId = form.getFieldValue('thicknessId')
    }
    if (form.getFieldValue('typeId') !== undefined) {
      req.typeId = form.getFieldValue('typeId')
    }
    if (form.getFieldValue('uomId') !== undefined) {
      req.uomId = form.getFieldValue('uomId')
    }
    if (form.getFieldValue('varietyId') !== undefined) {
      req.varietyId = form.getFieldValue('varietyId')
    }
    req.extRefNumber = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
    service.getAllM3Data(req).then((res) => {
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
    {
      title: <div style={{textAlign:"center"}}>Buyer</div>,
      dataIndex: "buyerName",
      ...getColumnSearchProps("buyerName"),
      sorter: (a, b) => a.buyerName.localeCompare(b.buyerName),
      sortDirections: ["descend", "ascend"],
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
    },
    mapData[0]?.structure === true?{
      title: <div style={{textAlign:"center"}}>Structure</div>,
      dataIndex: "structure",
      ...getColumnSearchProps("structure"),
      sorter: (a, b) => a.structure.localeCompare(b.structure),
      sortDirections: ["descend", "ascend"],
    }: {},
    mapData[0]?.category === true?{
      title: <div style={{textAlign:"center"}}>Category</div>,
      dataIndex: "category",
      ...getColumnSearchProps("category"),
      sorter: (a, b) => a.category.localeCompare(b.category),
      sortDirections: ["descend", "ascend"],
    }:{},
    mapData[0]?.content === true?{
      title: <div style={{textAlign:"center"}}>Content</div>,
      dataIndex: "content",
      ...getColumnSearchProps("content"),
      sorter: (a, b) => a.content.localeCompare(b.content),
      sortDirections: ["descend", "ascend"],
    }:{},
    mapData[0]?.type === true?{
      title: <div style={{textAlign:"center"}}>Type</div>,
      dataIndex: "type",
      ...getColumnSearchProps("type"),
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ["descend", "ascend"],
      render: (text) => {
        const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
        return EnumObj ? EnumObj.displayVal : text;
      },    }: {},
    mapData[0]?.finish === true?{
      title: <div style={{textAlign:"center"}}>Finish</div>,
      dataIndex: "finish",
      ...getColumnSearchProps("finish"),
      sorter: (a, b) => a.finish.localeCompare(b.finish),
      sortDirections: ["descend", "ascend"],
    }: {},
    mapData[0]?.hole === true?{
      title: <div style={{textAlign:"center"}}>Hole</div>,
      dataIndex: "hole",
      ...getColumnSearchProps("hole"),
      sorter: (a, b) => a.hole.localeCompare(b.hole),
      sortDirections: ["descend", "ascend"],
    }: {},
    mapData[0]?.quality === true?{
      title: <div style={{textAlign:"center"}}>Quality</div>,
      dataIndex: "qualityName",
      ...getColumnSearchProps("qualityName"),
      sorter: (a, b) => a.qualityName.localeCompare(b.qualityName),
      sortDirections: ["descend", "ascend"],
    }: {},
    mapData[0]?.thickness === true?{
      title: <div style={{textAlign:"center"}}>Thickness</div>,
      dataIndex: "thickness",
      ...getColumnSearchProps("thickness"),
      sorter: (a, b) => a.thickness.localeCompare(b.thickness),
      sortDirections: ["descend", "ascend"],
    }: {},
    mapData[0]?.variety === true?{
      title: <div style={{textAlign:"center"}}>Variety</div>,
      dataIndex: "variety",
      ...getColumnSearchProps("variety"),
      sorter: (a, b) => a.variety.localeCompare(b.variety),
      sortDirections: ["descend", "ascend"],
    }: {},
    mapData[0]?.uom === true?{
      title: <div style={{textAlign:"center"}}>UOM</div>,
      dataIndex: "uom",
      ...getColumnSearchProps("uom"),
      sorter: (a, b) => a.uom.localeCompare(b.uom),
      sortDirections: ["descend", "ascend"],
    }: {},
    mapData[0]?.color === true?{
      title: <div style={{textAlign:"center"}}>Color</div>,
      dataIndex: "color",
      ...getColumnSearchProps("color"),
      sorter: (a, b) => a.color.localeCompare(b.color),
      sortDirections: ["descend", "ascend"],
    }: {},
    mapData[0]?.logo === true?{
      title: <div style={{textAlign:"center"}}>Logo</div>,
      dataIndex: "logo",
      ...getColumnSearchProps("logo"),
      sorter: (a, b) => a.logo.localeCompare(b.logo),
      sortDirections: ["descend", "ascend"],
    }: {},
    mapData[0]?.part === true?{
      title: <div style={{textAlign:"center"}}>Part</div>,
      dataIndex: "part",
      ...getColumnSearchProps("part"),
      sorter: (a, b) => a.part.localeCompare(b.part),
      sortDirections: ["descend", "ascend"],
    }:{},
    {
      title: <div style={{textAlign:"center"}}>Description</div>,
      dataIndex: "trimCode",
      ...getColumnSearchProps("description"),
      sorter: (a, b) => a.description.localeCompare(b.description),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: <div style={{textAlign:"center"}}>M3 Code</div>,
      dataIndex: "m3Code",
      ...getColumnSearchProps("m3Code"),
    },
    {
      title: <div style={{textAlign:"center"}}>HSN Code</div>,
      dataIndex: "hsnCode",
      ...getColumnSearchProps("hsnCode"),
    },
  ]

  const filteredColumns = columns.filter((column) => Object.keys(column).length > 0);


  const clearData = () => {
    form.resetFields();
  };


   const onBuyerChange = (value) =>{
    setMapData([])
   }

  //  const getAllM3DataFilters = (req?:M3trimsDTO) =>{
  //   if (form.getFieldValue('categoryId') !== undefined) {
  //     req.categoryId = form.getFieldValue('categoryId')
  //   }
  //   service.getAllM3DataFilters(req).then((res)=>{
  //     if(res.status){
  //       setFilterData(res.data)
  //     }
  //   })
  //  }

 

  return (
    <Card title="M3 Trims" headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<Link to='/trim-master/m3-trim-items/m3-trim-items-form' >
    <span style={{color:'white'}} ><Button type={'primary'} >New </Button> </span>
    </Link>}>
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
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
            </Col>
            {mapData[0]?.structure === true ? (
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
            ) : (<></>)}
            {mapData[0]?.category == true ? (
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
            ) : (<></>)}
            {mapData[0]?.quality === true ? (
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
            ) : (<></>)}
            {mapData[0]?.thickness === true ? (
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
            ) : (<></>)}
            {mapData[0]?.variety === true ? (
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
            ) : (<></>)}
            {mapData[0]?.uom === true ? (
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
            ) : (<></>)}
            {mapData[0]?.color === true ? (
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
            <Col>
                <Form.Item name="trimMappingId" label="Trim Mapping" rules={[{ required: false, message: "Trim Mapping is required" }]} style={{display:'none'}}>
                    <Input hidden/>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24} justify={'end'}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }} style={{ marginTop: "18px", textAlign: "right" }}>
              <Form.Item>
                <Button icon={<SearchOutlined />} htmlType="submit" type="primary" style={{ marginLeft: 50, marginTop: 5 }}>
                  Submit
                </Button>
                <Button danger icon={<UndoOutlined />} onClick={onReset} style={{ marginLeft: 30 }}>
                  Reset
                </Button>
              </Form.Item>
            </Col>
        </Row>
      </Form>
      {data.length > 0 && (
        <Table
          className="custom-table-wrapper"
          dataSource={data.length > 0 ? data : []}
          columns={filteredColumns}
          size="small"
        />
      )}
    </Card>
  );
};
