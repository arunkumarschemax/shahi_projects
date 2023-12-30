import {
  BarcodeOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  InfoCircleOutlined,
  PrinterOutlined,
  QrcodeOutlined,
  SearchOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import {
  IndentService,
  RequisitionService,
  StyleService,
} from "@project-management-system/shared-services";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  Modal,
  QRCode,
  Row,
  Segmented,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import style from "antd/es/alert/style";
import './sourcing-view.css';
import { ColumnProps } from "antd/es/table";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import BarcodePrint from "./barcode-print";
import {
  BuyerRefNoRequest,
  CustomerOrderStatusEnum,
  IndentRequestFilter,
  ItemTypeEnumDisplay,
  MenusAndScopesEnum,
} from "@project-management-system/shared-models";
import Highlighter from "react-highlight-words";
import { useIAMClientState } from "../common/iam-client-react";
import RolePermission from "../role-permissions";

const { Option } = Select;

export const SourcingRequisitionDynamicView = () => {
  const [tabName, setTabName] = useState<string>("Fabric");
  const [page, setPage] = React.useState(1);
  const [sourcingForm] = Form.useForm();
  const styleService = new StyleService();
  const [style, setStyle] = useState<any[]>([]);
  const navigate = useNavigate();
  // const service = new RequisitionService()
  const service = new IndentService();
  const logInUser = localStorage.getItem("userName");
  const [barcode, setBarcode] = useState<string>(null);
  const [barcodeModal, setBarcodeModal] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [barcodeInfo, setBarcodeInfo] = useState<string>("");
  const [form] = Form.useForm();
  const [filterData, setFilterData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { IAMClientAuthContext, dispatch } = useIAMClientState();
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [btnEnable,setbtnEnable]=useState<boolean>(false)
  const [remarkModal,setRemarkModal] = useState<boolean>(false)
  const [remarks,setRemarks] = useState<string>('')
  // const [segmentOptions, setSegmentOptions] = useState<any[]>(
  //   [
  //     { key: 'Fabric', label: 'Fabric' },
  //     { key: 'Trim', label: 'Trim' }
  //   ]
  // );
 const [details, setDetails] = useState('')
 const checkAccess = (buttonParam) => {  
  const accessValue = RolePermission(null,MenusAndScopesEnum.Menus.Procurment,MenusAndScopesEnum.SubMenus.Indent,buttonParam)
   console.log(buttonParam,accessValue,'access');
  
  return accessValue
}
  useEffect(() => {
    if(checkAccess(MenusAndScopesEnum.Scopes.trimTab) && !checkAccess(MenusAndScopesEnum.Scopes.fabricTab)){
      setTabName('Trim')
    }
    if(checkAccess(MenusAndScopesEnum.Scopes.fabricTab) && !checkAccess(MenusAndScopesEnum.Scopes.trimTab)){
      setTabName('Fabric')
    }
    if(checkAccess(MenusAndScopesEnum.Scopes.trimTab) && checkAccess(MenusAndScopesEnum.Scopes.fabricTab)){
      setTabName('Fabric')
    }

    // getStyle();
    getAll();
  }, []);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  // const getAll = () => {
  //   service.getAllIndentData().then((res) => {
  //     if (res.status) {
  //       setData(res.data);
  //     }
  //   });
  // };

 

const options = () => {
  let segmentOptions = [
  { key: 'Fabric', label: 'Fabric' },
  { key: 'Trim', label: 'Trim' }
];
if (checkAccess(MenusAndScopesEnum.Scopes.trimTab && checkAccess(MenusAndScopesEnum.Scopes.fabricTab))) {
  console.log(segmentOptions);
  segmentOptions = segmentOptions
}
// if(tableData?.indentFabricDetails)
  if (checkAccess(MenusAndScopesEnum.Scopes.fabricTab) && !checkAccess(MenusAndScopesEnum.Scopes.trimTab) ) {
    segmentOptions = segmentOptions.filter((e) => e.label === 'Fabric');
    console.log(segmentOptions);
  }
  if (checkAccess(MenusAndScopesEnum.Scopes.trimTab) && !checkAccess(MenusAndScopesEnum.Scopes.fabricTab)) {
    console.log(segmentOptions);
    segmentOptions = segmentOptions.filter((e) => e.label === 'Trim');
  }
  console.log(segmentOptions);
  
  return segmentOptions.map((operation, index) => ({
    label: <b>{operation.label}</b>,
    value: operation.label,
    key: index.toString(),

  }));
};

const segmentedOptions = options();

  const getAll = () => {
    const req = new IndentRequestFilter();
    if (form.getFieldValue("requestNo") !== undefined) {
      req.requestNo = form.getFieldValue("requestNo");
    }
    if (form.getFieldValue("style") !== undefined) {
      req.style = form.getFieldValue("style");
    }
    if (form.getFieldValue("status") !== undefined) {
      req.status = form.getFieldValue("status");
    }
    if(checkAccess(MenusAndScopesEnum.Scopes.fabricTab)){
      req.tab= 'FABRIC'
    }
    if(checkAccess(MenusAndScopesEnum.Scopes.trimTab)){
      req.tab= 'Trim'
    }
    if(checkAccess(MenusAndScopesEnum.Scopes.trimTab) && checkAccess(MenusAndScopesEnum.Scopes.fabricTab)){
      req.tab= 'both'
    }
    req.extRefNumber = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
    service.getAllIndentData(req).then((res) => {
      if (res.status) {
      //  if( res.data.indentFabricDetails?.length>0){
      //   // segmentOptions.filter((e) => e.label === 'Fabric');
      //   setSegmentOptions(segmentOptions.filter((e) => e.label === 'Fabric'))
      // }else {
      //   // segmentOptions.filter((e) => e.label === 'Trim');
      //   setSegmentOptions(segmentOptions.filter((e) => e.label === 'Trim'))

      // }
        setData(res.data);
        setFilterData(res.data);
      }
    });
    
  };
  // console.log(data)
  // console.log(tableData)

  const getStyle = () => {
    styleService.getAllActiveStyle().then((res) => {
      if (res.status) {
        setStyle(res.data);
      }
    });
  };

  const generateBarcode = (m3Code, info) => {
    setBarcode(m3Code);
    setBarcodeInfo(info);
    setBarcodeModal(true);
  };

  const generatePoForFabric = (indentId:number) =>{
    let indentDetails = tableData.find((e)=>e.indentId === indentId);
    // console.log(indentDetails)
    navigate('/purchase-order', { state: { data: indentDetails, type:'Indent', materialType:'Fabric' } })
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
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
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
  

  const dataSource = tableData[0]?.indentFabricDetails?.map((fabricDetail) => ({
    ...fabricDetail,
    buyer: tableData[0].buyer,
  }));

  const onCheck = (e, sampleRequestid, fabricType, value, rowData) => {
    // console.log(e.target.checked);
    // console.log(sampleRequestid);
    // console.log(fabricType);
    // console.log(rowData);
    if(fabricType === "Fabric"){
      if(!e.target.checked){
        (tableData.find((e)=>e.indentId === rowData.indentId)?.indentFabricDetails).find((i)=>i.ifabricId === rowData.ifabricId).checkStatus = false;
        setTableData(tableData)
        sourcingForm.setFieldValue([`fabric${rowData.indentFabricId}`],false)
      }
      else{
        (tableData.find((e)=>e.indentId === rowData.indentId)?.indentFabricDetails).find((i)=>i.ifabricId === rowData.ifabricId).checkStatus = true;
        setTableData(tableData)
        sourcingForm.setFieldValue([`fabric${rowData.indentFabricId}`],true)
      }
      if((tableData.find((e)=>e.indentId === rowData.indentId)?.indentFabricDetails).filter((i)=>i.checkStatus === true).length > 0){
        setbtnEnable(true);
      }
      else{
        setbtnEnable(false);
      }
    }
    else{
      if(!e.target.checked){
        (tableData.find((e)=>e.indentId === rowData.indentId)?.indentTrimDetails).find((i)=>i.itrimsId === rowData.itrimsId).checkStatus = false;
        setTableData(tableData)
        sourcingForm.setFieldValue([`trim${rowData.indentTrimId}`],"false")
      }
      else{
        (tableData.find((e)=>e.indentId === rowData.indentId)?.indentTrimDetails).find((i)=>i.itrimsId === rowData.itrimsId).checkStatus = true;
        setTableData(tableData)
        sourcingForm.setFieldValue([`trim${rowData.indentTrimId}`],"true")
      }
      if((tableData.find((e)=>e.indentId === rowData.indentId)?.indentTrimDetails).filter((i)=>i.checkStatus === true).length > 0){
        setbtnEnable(true);
      }
      else{
        setbtnEnable(false);
      }
    }
  }
  const tableColumns = (key,val) => {
    // console.log(key);
    const Columns: any = [

      {
        title: "S No",
        key: "sno",
        // width: '70px',
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
      // {
      //   title: "Buyer",
      //   dataIndex: "buyer",
      //   ...getColumnSearchProps("buyer"),
      //   render: (text, record) => {
      //     return <>{record.buyer ? record.buyer : "-"}</>;
      //   },
      // },
      {
        title: <div style={{textAlign:"center"}}>M3 Fabric Code</div>,
        dataIndex: "m3FabricCode",
        ...getColumnSearchProps("m3FabricCode"),
        render: (m3FabricCode, row) => (
          <Tooltip title={row.description} placement="top" arrowPointAtCenter>
            <span className="fabCode">
              {`${row.fabricCode} - ${row.description}`}
            </span>
          </Tooltip>
        ),
      },
      {
        title: "Color",
        dataIndex: "color",
        ...getColumnSearchProps("color"),
      },
      {
        title: "Season",
        dataIndex: "season",
      },
      // {
      //   title: "Supplier",
      //   dataIndex: "supplierId",
      //   ...getColumnSearchProps("supplierId"),
      //   render: (text, record) => {
      //     return <>{record.supplierId ? record.supplierId : "-"}</>;
      //   },
      // },
      // {
      //   title: "GRN Date",
      //   dataIndex: "grnDate",
      //   render: (text, record) => {
      //     const date = new Date(record.grnDate);
      //     return <>{record.grnDate ? moment(date).format("YYYY-MM-DD") : "-"}</>;
      //   },
      // },
      {
        title: "XL No",
        dataIndex: "xlNo",
      },
      // {
      //   title: "Indent Raised",
      //   dataIndex: "quantity",
      // },
      {
        title: "Indent Raised",
        dataIndex: "quantity",
        sorter: (a, b) => a.quantity.localeCompare(b.quantity),
        sortDirections: ["descend", "ascend"],
        render: (text, record) => {
          return (
            <>
              {record.quantity
                ? `${record.quantity} ${record.quantityUnit}`
                : "-"}
            </>
          );
        },
      },
      {
        title: "PO Raised",
        dataIndex: "poQty",
      },
      {
        title: "To Be Procured Quantity",
        dataIndex: "toBeProcured",
        sorter: (a, b) => a.toBeProcured.localeCompare(b.toBeProcured),
        sortDirections: ["descend", "ascend"],
      },
      // {
      //   title: "Available Quantity",
      //   dataIndex: "quantity",
      //   sorter: (a, b) => a.quantity.localeCompare(b.quantity),
      //   sortDirections: ["descend", "ascend"],
      //   // render: (text,record) => {
      //   //     return(
      //   //         <>
      //   //         {record.quantity ? `${record.availableQuantity} ${record.quantityUnit}` : '-'}
      //   //         </>
      //   //     )
      //   // }
      // },
      // {
      //   title: "To Be Procured",
      //   dataIndex: "tobeProcured",
      //   render: (text, record) => {
      //     return (
      //       <>
      //         {record.quantity - record.availableQuantity > 0
      //           ? record.quantity - record.availableQuantity
      //           : 0}
      //       </>
      //     );
      //   },
      // },
      
      {
        title: <div style={{ textAlign: "center" }}>{checkAccess(MenusAndScopesEnum.Scopes.createPo) && val > 0 ?<Button  type="primary" onClick={() =>generatePoForFabric(key)} >Generate Po</Button>:<></>}</div>,
        dataIndex: "sm",
        key: "sm",
        align: "center",
        render: (text, rowData, index) => { 
          // {console.log(rowData)}
          return(
            (Number(rowData.poQty) < Number(rowData.quantity)) ?
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
              <Form.Item name={`fabric${rowData.indentFabricId}`} >
              {checkAccess(MenusAndScopesEnum.Scopes.createPo) && val > 0 ?<Checkbox name={`fabric${rowData.indentFabricId}`} checked={rowData.checkStatus} onChange={(e) => onCheck(e, rowData.sampleRequestid, rowData.materialType, text, rowData)}/>:<></>}
            </Form.Item>
            </Col> : <Tag></Tag>
          )
        }
      },
      // {
      //   title: "Action",
      // dataIndex: "action",
      // render: (text, rowData) => {
      // return (
      // <span>
      // {/* <Button onClick={() => generateBarcode(record.m3FabricCode)}>
      // <BarcodeOutlined/>
      // </Button>
      // <Divider type='vertical'/> */}
      // <Button
      // type="primary"
      // disabled={logInUser == "marketUser" ? true : false}
      // onClick={() =>generatePoForFabric(rowData)}
      // >
      //           Generate PO
      // </Button>
      // </span>
      // );
      // },
      // },
    ];
    return [...Columns];   
 
  }
  const handleTextClick = (remarks) => {
    setRemarks(remarks)
    setRemarkModal(true)
}
const onRemarksModalOk = () => {
  setRemarkModal(false)
}
  const tableTrimColumns = (key, val) => {
    // console.log(val);
    const columnsSkelton: any = [
      {
        title: "S No",
        key: "sno",
        width: "70px",
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
      {
        title: "Trim Type",
        dataIndex: "materialType",
        ...getColumnSearchProps("materialType"),
        render: (text) => {
          const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
          return EnumObj ? EnumObj.displayVal : text;
        },
      },
      {
        title: "M3 Trim Code",
        dataIndex: "m3TrimCodeName",
        ...getColumnSearchProps("m3TrimCodeName"),
      },
      {
        title: "Indent Raised",
        dataIndex: "quantity",
        render: (text, record) => {
          return (
            <>
              {record.quantity
                ? `${record.quantity} ${record.quantityUnit}`
                : "-"}
            </>
          );
        },
      },
      {
        title: "PO Raised",
        dataIndex: "poQty",
        ...getColumnSearchProps("poQty"),
      },
      {
        title: "To Be Procured Quantity",
        dataIndex: "toBeProcured",
        sorter: (a, b) => a.toBeProcured.localeCompare(b.toBeProcured),
        sortDirections: ["descend", "ascend"],
        // render: (text, record) => {
        //   return (
        //     <>
        //       {record.quantity
        //         ? `${record.quantity}`
        //         : "-"}
        //     </>
        //   );
        // },
      },
      {
        title: "Remarks",
        dataIndex: "remarks",
        render:(text,record) => {
          return(
              <>
              {record.remarks?.length > 30 ? (<><Tooltip title='Cilck to open full remarks'><p><span onClick={() => handleTextClick(record.remarks)} style={{ cursor: 'pointer' }}>
                          {record.remarks.length > 30 ? `${record.remarks?.substring(0, 30)}....` : record.remarks}
                      </span></p></Tooltip></>) : (<>{record.remarks}</>)}
              </>
          )
      }
      },
      {
        title: <div style={{ textAlign: "center" }}>
          
        {val > 0 && checkAccess(MenusAndScopesEnum.Scopes.createPo)?<Button  type="primary" onClick={() =>genereatePoForTrim(key)} >Generate Po</Button>:<></>}
          </div>,
        dataIndex: "sm",
        key: "sm",
        align: "center",
        render: (text, rowData, index) => { 
          // console.log(rowData)
          // if(Number(rowData.poQty) < Number(rowData.quantity)){
          //   console.log("iii")
          //   // nwArray.push(true)
          //   setPoQtyFlag([...poQtyFlag,true])
          //   console.log(poQtyFlag)
          // }
          // else{
          //   console.log("else")
          //   // nwArray.push(false)
          //   setPoQtyFlag([...poQtyFlag,false])
          //   console.log(poQtyFlag)

          // }
          return(
          //   {
              (Number(rowData.poQty) < Number(rowData.quantity)) ?
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                <Form.Item name={`trim${rowData.indentTrimId}`} >
                { checkAccess(MenusAndScopesEnum.Scopes.createPo) ?<Checkbox name={`trim${rowData.indentTrimId}`} checked={rowData.checkStatus} onChange={(e) => onCheck(e, rowData.sampleRequestid, rowData.materialType, text, rowData)}/>:"-"}
              </Form.Item>
              </Col>: <Tag></Tag> 
          // }
          )
        }
      },
      // {
      //   title: "Action",
      // dataIndex: "action",
      // render: (text, rowData) => {
      // return (
      // <span>
      // <Button
      // type="primary"
      // disabled={logInUser == "marketUser" ? true : false}
      // onClick={() => genereatePoForTrim(rowData)}
      // >
      //           Generate PO
      // </Button>
      // </span>
      // );
      // },
      // },
    ];
    return [...columnsSkelton];   
  }
  const genereatePoForTrim = (indentId: number) => {
    let indentDetails = tableData.find((e)=>e.indentId === indentId);
    // console.log(indentDetails)
    navigate('/purchase-order', { state: { data: indentDetails, type:'Indent', materialType:'Trim' } })
  };

  const onSegmentChange = (val) => {
    // console.log(val);
    setTabName(val);
  };

  const HeaderRow = (props: any) => {
    const { requestNo, style, description, expectedDate, indentDate, status, buyerName } =
      props;
    const formattedIndentDate = moment(indentDate).format("YYYY-MM-DD");
    const formattedExpectedDate = moment(expectedDate).format("YYYY-MM-DD");

    return (
      <div style={{ display: "flex" }}>
        <span>Request Number : {<b>{requestNo}</b>}</span>
        <span style={{ width: "10px" }}></span>
        <span>Buyer : {<b>{buyerName}</b>}</span>
        <span style={{ width: "10px" }}></span>
        <span>Style : {<b>{style}</b>}</span>
        <span style={{ width: "10px" }}></span>
        <span>Description : {<b>{description}</b>}</span>
        <span style={{ width: "10px" }}></span>
        <span>
          Indent Date: <b>{formattedIndentDate}</b>
        </span>
        <span style={{ width: "10px" }}></span>
        <span>
          Expected Date: <b>{formattedExpectedDate}</b>
        </span>
        <span style={{ width: "10px" }}></span>
        <span>Status : {<b>{status}</b>}</span>
        {/* <span style={{width:'10px'}}></span>
              <span>{<Tag onClick={() => generateBarcode(requestNo)} style={{cursor:'pointer'}}>
                         <BarcodeOutlined />
                     </Tag>}</span> */}
      </div>
    );
  };

  const onReset = () => {
    sourcingForm.resetFields();
    setTableData(data);
  };

  const onSearch = () => {
    let filterData = [];
    // console.log(data)
    // filterData = data.filter
    if (sourcingForm.getFieldValue("style") !== undefined) {
      const style = sourcingForm.getFieldValue("style");
      filterData = data.filter((e) => e.style === style);
    } else if (sourcingForm.getFieldValue("requestNo") !== undefined) {
      const reqno = sourcingForm.getFieldValue("requestNo");
      filterData = data.filter((e) => e.requestNo === reqno);
    } else if (sourcingForm.getFieldValue("status") !== undefined) {
      const status = sourcingForm.getFieldValue("status");
      filterData = data.filter((e) => e.status === status);
    }
    setTableData(filterData);
  };

  const onBarcodeModalCancel = () => {
    setBarcode("");
    setBarcodeModal(false);
  };

  const closeWindow = () => {
    setBarcode("");
    window.close();
  };
const test = (val, row) =>{
  console.log(val,row);
  // setDetails(val)
  // setTabName(val)
  return val
}
  return (
    <Card
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      title="Indent Requisition"
      extra={
               <span>
                        {checkAccess(MenusAndScopesEnum.Scopes.Create)?(

          <Button onClick={() => navigate("/indent-form")}>New</Button>
          ):(<></>)}

        </span>
      }
    >
      {/* {barcode.length > 0 ? <BarcodePrint key={Date.now() + barcode} printBarcodes={closeWindow} closeBarcodePopUp={closeWindow}
          columns={barcodeWithColumns} newWindow={false} barcodeInfo={barcode} /> : ''} */}
      <Form form={sourcingForm}>
        <Row gutter={8}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 6 }}
          >
            <Form.Item name="requestNo" label="Request Number">
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                placeholder="Select Request Number"
              >
                {data.map((e) => {
                  return (
                    <Option
                      key={e.requestNo}
                      value={e.requestNo}
                      name={e.requestNo}
                    >
                      {" "}
                      {e.requestNo}
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
            lg={{ span: 4 }}
            xl={{ span: 6 }}
          >
            <Form.Item name="style" label="Style">
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                placeholder="Select Style"
              >
                {data.map((e) => {
                  return (
                    <Option key={e.style} value={e.style} name={e.style}>
                      {" "}
                      {e.style}
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
            lg={{ span: 4 }}
            xl={{ span: 6 }}
          >
            <Form.Item name="status" label="Status">
              <Select
                // showSearch
                // placeholder="Vendors"
                optionFilterProp="children"
                placeholder="Select Status"
              >
                {Object.keys(CustomerOrderStatusEnum)
                  .sort()
                  .map((status) => (
                    <Select.Option
                      key={CustomerOrderStatusEnum[status]}
                      value={CustomerOrderStatusEnum[status]}
                    >
                      {CustomerOrderStatusEnum[status]}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 2 }}
          >
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
                onClick={onSearch}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 2 }}
          >
            <Form.Item>
              <Button danger icon={<UndoOutlined />} onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Collapse 
        collapsible="icon"
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        accordion
        onChange={()=>setTabName('Fabric')}
        
      >
        {tableData.map((item: any, index: any) => (
          <Collapse.Panel 
            header={
              <HeaderRow
                requestNo={item.requestNo}
                buyerName={item.buyerName}
                style={item.style}
                description={item.description}
                expectedDate={item.expectedDate}
                indentDate={item.indentDate}
                status={item.status}
              />
            }
            key={index}
            extra={
             
              <QrcodeOutlined   onClick={() => generateBarcode(item.requestNo, "requestNo")}
                style={{ cursor: "pointer",color:'blue',height:'5px',width:'40px' }}/>
             
            }
          >
            <Space
              direction="vertical"
              style={{ fontSize: "16px", width: "100%" }}
            >
              <Segmented
                onChange={onSegmentChange}
                style={{ backgroundColor: "#68cc6b" }}
                  options= {segmentedOptions}
                  //   item.indentFabricDetails.length > 0?[
                  //     {
                  //       label: (
                  //               <>
                  //                 <b 
                  //                 // style={{ fontSize: "12px", display:checkAccess(MenusAndScopesEnum.Scopes.fabricTab)? 'block' : 'none'}}
                  //                  >Fabric Details</b>
                  //               </>
                  //             ),
                  //             value: "Fabric",
                  //     }
                  //   ]:
                  //   [
                  //       {
                  //   label: (
                  //     <>
                  //       <b 
                  //       // style={{ fontSize: "12px", display:checkAccess(MenusAndScopesEnum.Scopes.trimTab)? 'block' : 'none'}}

                  //       >Trim Details</b>
                  //     </>
                  //   ),
                  //   value: "Trim",

                  // },
                  //   ]
                  // }
                 defaultValue={(checkAccess(MenusAndScopesEnum.Scopes.fabricTab) && !checkAccess(MenusAndScopesEnum.Scopes.trimTab))?"Fabric":(checkAccess(MenusAndScopesEnum.Scopes.trimTab) && !checkAccess(MenusAndScopesEnum.Scopes.fabricTab)) ? "Trim":item.indentFabricDetails.length> 0? 'Fabric': "Trim"}
                //  {item.indentFabricDetails.length> 0?"Fabric": "Trim"}
                // options={
                //   [
                //   {
                //     label: (
                //       <>
                //         <b style={{ fontSize: "12px", display:checkAccess(MenusAndScopesEnum.Scopes.fabricTab)? 'block' : 'none'}} >Fabric Details</b>
                //       </>
                //     ),
                //     value: "Fabric",
                //   },
                //   {
                //     label: (
                //       <>
                //         <b style={{ fontSize: "12px", display:checkAccess(MenusAndScopesEnum.Scopes.trimTab)? 'block' : 'none'}}>Trim Details</b>
                //       </>
                //     ),
                //     value: "Trim",

                //   },
                // ]
              // }
              />
              <div>
              <>
                { tabName === 'Fabric' ? item.indentFabricDetails.length > 0 ?   (
                  <>
                    <Table
                      columns={tableColumns(item.indentId, (item.indentFabricDetails).filter((e) => Number(e.poQty) < Number(e.quantity) && e.checkStatus === true).length)}
                      dataSource={item.indentFabricDetails}
                      pagination={false}
                      scroll={{ x: "max-content" }}
                      className="custom-table-wrapper"
                    />
                  </>
                ) :(
                  <> No Data</>
                ):''}
                </>
              </div>
              <div>
                { tabName === 'Trim' ? item.indentTrimDetails.length > 0 ?  (
                  <>
                    <Table
                      columns={tableTrimColumns(item.indentId, (item.indentTrimDetails).filter((e) => Number(e.poQty) < Number(e.quantity) && e.checkStatus === true).length)}
                      dataSource={item.indentTrimDetails}
                      pagination={false}
                      scroll={{ x: "max-content" }}
                      className="custom-table-wrapper"
                    />
                  </>
                ) : (
                  <> No Data</>
                ):''}
              </div>
            </Space>
          </Collapse.Panel>
        ))}
      </Collapse>
      <Modal open={remarkModal} onOk={onRemarksModalOk} onCancel={onRemarksModalOk} footer={[<Button onClick={onRemarksModalOk} type='primary'>Ok</Button>]}>
                <Card>
                    <p>{remarks}</p>
                </Card>
            </Modal>
      <Modal
      width='15%'
              open={barcodeModal}
        onCancel={onBarcodeModalCancel}
        footer={[]}
        title={barcodeInfo === "m3ItemCode" ? "M3 Item Code" : "Request Number"}
      >
        <div style={{alignContent:'center'}}>
          <QRCode value={barcode}  />
          {barcode}
        </div>
      </Modal>
    </Card>
  );
};

export default SourcingRequisitionDynamicView;
