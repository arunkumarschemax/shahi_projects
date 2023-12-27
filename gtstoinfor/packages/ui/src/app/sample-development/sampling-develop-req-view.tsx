import {
    BarcodeOutlined,
    CaretDownOutlined,
    CaretRightOutlined,
    InfoCircleOutlined,
    PrinterOutlined,
    SearchOutlined,
    UndoOutlined,
  } from "@ant-design/icons";
  import {
    IndentService,
    RequisitionService,
    SampleDevelopmentService,
    StyleService,
  } from "@project-management-system/shared-services";
  import {
    Button,
    Card,
    Checkbox,
    Col,
    Collapse,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Segmented,
    Select,
    Space,
    Table,
    Tag,
    Tooltip,
    message,
  } from "antd";
  import style from "antd/es/alert/style";
  import { ColumnProps } from "antd/es/table";
  import moment from "moment";
  import React, { useEffect, useRef } from "react";
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import Barcode from "react-barcode";
//   import BarcodePrint from "./barcode-print";
  import {
    Allocatematerial,
    BomStatusEnum,
    CustomerOrderStatusEnum,
    IndentRequestFilter,
    ItemTypeEnumDisplay,
    LifeCycleStatusDisplay,
    LifeCycleStatusEnum,
    MenusAndScopesEnum,
    SampleDevelopmentStatusDisplay,
    SampleDevelopmentStatusEnum,
    SampleFilterRequest,
    allocateMaterialItems,
    buyerandM3ItemIdReq,
    lifeCycleStatusReq,
  } from "@project-management-system/shared-models";
  import Highlighter from "react-highlight-words";
import { faL } from "@fortawesome/free-solid-svg-icons";
import AlertMessages from "../common/common-functions/alert-messages";
import { useIAMClientState } from "../common/iam-client-react";
import PickListPrint, { getCssFromComponent } from "./pick-list-print";
import PoPrint from "../purchase-order2/po-print";
import RolePermission from "../role-permissions";
// const { IAMClientAuthContext, dispatch } = useIAMClientState();

  
  const { Option } = Select;
  
  export const SampleDevNewView = () => {
    const [lifeCycleStatus, setLifeCycleStatus] = useState(LifeCycleStatusEnum.READY_TO_DISPATCH);
    const [status, setStatus] = useState('Dispatch');
    const [dispatch, setDispatch] = useState('');
    const [tabName, setTabName] = useState<string>("Fabric");
    const [page, setPage] = React.useState(1);
    const [sourcingForm] = Form.useForm();
    const styleService = new StyleService();
    const [style, setStyle] = useState<any[]>([]);
    const navigate = useNavigate();
    const service = new SampleDevelopmentService();
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
   const [btnEnable,setbtnEnable]=useState<boolean>(false)
   const [allocatedStock, setAllocatedStock]=useState<any>(undefined)
   const [expandedRowKeys, setExpandedRowKeys] = useState([])
    const searchInput = useRef(null);
    const [avilableQuantity, setAvailableQuantity] = useState<any[]>([])
    const [checked, setChecked] = useState<boolean>(false)
    const [keyUpdate, setKeyUpdate] = useState<number>(1);
   const { IAMClientAuthContext } = useIAMClientState();
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [row, setRow] = useState();
   const [stockForm] = Form.useForm();
   const [pch, setPch] = useState<any>([]);
   const [styled, setStyled] = useState<any>([]);
   const [expandedIndex, setExpandedIndex] = useState([]);
  
    useEffect(() => {
      getAll();
      getAllStyle();
      getAllPch();
    }, []);
  
    useEffect(() => {
      if (data) {
      console.log(tableData)
        setTableData(data);
      }
    }, [data]);
  
  
    const checkAccess = (buttonParam) => {   
      const accessValue = RolePermission(null,MenusAndScopesEnum.Menus["Sample Development"],MenusAndScopesEnum.SubMenus["Sample Development View"],buttonParam)
      
      return accessValue
  }
    const getAll = () => {
      const req = new SampleFilterRequest();
      if (sourcingForm.getFieldValue("requestNo") !== undefined) {
        req.reqNo = sourcingForm.getFieldValue("requestNo");
      }
      if (sourcingForm.getFieldValue("style") !== undefined) {
        req.styleNo = sourcingForm.getFieldValue("style");
      }
      if (sourcingForm.getFieldValue("status") !== undefined) {
        req.status = sourcingForm.getFieldValue("status");
      }
      if (sourcingForm.getFieldValue("pch") !== undefined) {
        req.pch = sourcingForm.getFieldValue("pch");
      }
    req.extRefNumber = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null

      service.getAllSampleDevData(req).then((res) => {
        if (res.status) {
          setData(res.data);
          console.log(res.data,"rrrrr")
          setFilterData(res.data);
        } else {
            AlertMessages.getErrorMessage(res.internalMessage);
        }
      }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
        setData([]);
      })
    }
    const getAllPch=()=>{
      service .getPch().then((res)=>{
        if (res.status) {
          setPch(res.data);
        }
      })
    }
  
    const getAllStyle=()=>{
      service.getStyle().then((res)=>{
        if (res.status) {
          setStyled(res.data);
        }
      })
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
  

    const createAllocation = (dto:any) =>{
      console.log(dto)
      let materailDataItems :allocateMaterialItems[]=[]
      let totalQty = 0;
      for(const data of dto.allocatedStock){
        totalQty = Number(totalQty) + Number(data.issuedQty);
        let item = new allocateMaterialItems(0,data.quantity,data.stockId,data.locationId,data.issuedQty,0,"","","");
        materailDataItems.push(item);
      }
      const req = new Allocatematerial(dto.itemType,dto.sampleRequestid,(dto.itemType === "FABRIC"?dto.fabric_info_id:dto.trim_info_id),(dto.itemType === "FABRIC"?dto.m3ItemFabricId:dto.trimCode),0,0,0,dto.buyerId,totalQty,materailDataItems,dto.tobeProcured,dto.samplingBomId);
      console.log(req);
      service.creatematerialAlloction(req).then(res =>{
        if(res.status){
          message.success(res.internalMessage)
          navigate('/sample-development/material-allocation')
        }
      })
    }

    const Columns: any = [
  
      {
        title: "S No",
        key: "sno",
        // width: '70px',buyerId:rowData.buyerId
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
      {
        title: "M3 Fabric Code",
        dataIndex: "item_code",
        ...getColumnSearchProps("item_code"),
      },
      {
        title: "Color",
        dataIndex: "colour",
        ...getColumnSearchProps("colour"),
      },
      {
        title: "Required Quantity",
        dataIndex: "totalRequirement",
        sorter: (a, b) => a.totalRequirement.localeCompare(b.totalRequirement),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Available Quantity",
        dataIndex: "resltantavaliblequantity",
        sorter: (a, b) => a.resltantavaliblequantity.localeCompare(b.resltantavaliblequantity),
        sortDirections: ["descend", "ascend"],
        render: (text, record) => {
          // let consumedQty = 0
          // if(record.fabric_consumption > 0){
          //   consumedQty = record.fabric_consumption
          // }
            return (
              <>
               {record.resltantavaliblequantity ? (record.resltantavaliblequantity) : "Not Available"
                  }
                {/* {record.availableQuantity ? (record.availableQuantity-consumedQty) : "Not Available"
                  } */}
              </>
            );
          },
      },
      {
        title: "Allocated Quantity",
        dataIndex: "receivedQty",
        sorter: (a, b) => a.receivedQty.localeCompare(b.receivedQty),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "To Be Procured",
        dataIndex: "tobeProcured",
        sorter: (a, b) => a.tobeProcured.localeCompare(b.tobeProcured),
        render: (text, record) => {
          return (
            <>
              {Number(record.tobeProcured) > 0
                ? Number(record.tobeProcured).toFixed(2)
                : 0}
            </>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (text, record) => {
          return (
            <>
              {(Number(record.resltantavaliblequantity) <= 0) ? <Tag style={{backgroundColor:'#41f4036b',color:"black"}}><b>Need to Procure</b></Tag>:Number(record.resltantavaliblequantity) > 0 && record.status != BomStatusEnum.ALLOCATED ? <Tag style={{backgroundColor:'#03a9f46b' ,color:"black"}}><b>Need to allocate</b></Tag>:record.status === BomStatusEnum.ALLOCATED ? <Tag>Allocated</Tag>:""}
            </>
          );
        },
      },
    ];
  
    const columnsSkelton: any = [
      {
        title: "S No",
        key: "sno",
        width: "70px",
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
      {
        title: "M3 Trim Code",
        dataIndex: "trim_code",
        ...getColumnSearchProps("trim_code"),
      },
      {
        title: "Trim Type",
        dataIndex: "trimType",
        ...getColumnSearchProps("trimType"),
        render: (text) => {
          const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
          return EnumObj ? EnumObj.displayVal : text;
        },
      },
      {
        title: "Required Quantity",
        dataIndex: "totalRequirement",
        sorter: (a, b) => a.totalRequirement.localeCompare(b.totalRequirement),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Available Quantity",
        dataIndex: "availabeQuantity",
        sorter: (a, b) => a.availabeQuantity.localeCompare(b.availabeQuantity),
        sortDirections: ["descend", "ascend"],
        render: (text, record) => {
          let consumedQty = 0
          // if(record.trim_consumption > 0){
          //   consumedQty = record.trim_consumption
          // }
            return (
              <>
                {record.availabeQuantity ? (record.availabeQuantity) : "Not Available"
                  }
              </>
            );
          },
      },
      {
        title: "Allocated Quantity",
        dataIndex: "receivedQty",
        sorter: (a, b) => a.receivedQty.localeCompare(b.receivedQty),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "To Be Procured",
        dataIndex: "tobeProcured",
        sorter: (a, b) => a.tobeProcured.localeCompare(b.tobeProcured),
        render: (text, record) => {
          return (
            <>
              {Number(record.tobeProcured) > 0
                ? Number(record.tobeProcured).toFixed(2)
                : 0}
            </>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (text, record) => {
          return (
            <>
              {(Number(record.resltantavaliblequantity) <= 0) ? <Tag style={{backgroundColor:'#41f4036b',color:"black"}}><b>Need to Procure</b></Tag>:Number(record.resltantavaliblequantity) > 0 && record.status != BomStatusEnum.ALLOCATED ? <Tag style={{backgroundColor:'#03a9f46b' ,color:"black"}}><b>Need to allocate</b></Tag>:record.status === BomStatusEnum.ALLOCATED ? <Tag>Allocated</Tag>:""}
            </>
          );
        },
      },
    ];
    const tableColumns = (val,fabindex,sampleReqId,itemId,colorId) => {
      if(val === undefined){
        AlertMessages.getWarningMessage("Please give required consumption. ");
      }
      console.log(val);
      const renderColumnForFabric: any =[
        {
          title: "S No",
          key: "sno",
          width: "100px",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "Grn Number",
          key:'grnNumber',
          dataIndex: "grnNumber",
          width: "150px",

        },
        {
          title: "Grn Date",
          key:'grnDate',
          dataIndex:"grnDate",
          render:(grnDate)=>moment(grnDate).format("YYYY-MM-DD"),
          width: "150px",

        },
        {
          title: "Location",
          key:'location',

          dataIndex: "location",
          width:'80px',
        },
      
        {
          title: "Available Quantity",
          width: "150px",
          dataIndex: "quantity",
        },
      
        {
          title: "Allocated Quantity",
          width:'200px',
          render: (text, rowData, index) => { 
            return(
            <Form form={stockForm}>
              <Form.Item name={`allocatedQuantity${fabindex}-${index}`}>
                    <InputNumber name={`allocatedQuantity${fabindex}-${index}`} min={0}
                        onChange={(e) => setAllocatedQty(index,rowData, e, fabindex, sampleReqId,itemId,colorId)} 
                    />
              </Form.Item>
            </Form>
            )
          }
        },
        {
          title: <div style={{ textAlign: "center" }}>{btnEnable ?<Button  type="primary" 
          onClick={() =>allocateQuantity()} 
          >Allocate</Button>:'Allocate'}</div>,
          dataIndex: "sm",
          key: "sm",
          align: "center",
          render: (text, rowData, index) => { 
            return (
              <Form.Item name={`checkStatus${fabindex}-${index}`}>

              <Checkbox  name = {`checkStatus${fabindex}-${index}`}
              onClick={checkboxonclick}
              onChange={(e) => onCheck(rowData, index, e.target.checked,sampleReqId,itemId,fabindex,colorId)}
              // onClick={(e) =>onCheck(rowData,undefined)}
              />
              </Form.Item>
            );
          },
        },
      
      ]
      return [...renderColumnForFabric]
    }
    const allocateQuantity = () =>{
      console.log(allocatedStock)
      createAllocation(allocatedStock)

    }
    const checkboxonclick =() =>{
      setChecked(true)
    }
    const setAllocatedQty = (index, rowData, value, fabindex, sampleReqId, itemId, colorId) => {
      console.log(tableData);
      console.log(index);
      console.log(rowData);
      console.log(value);
      console.log(fabindex);
      console.log(sampleReqId);
      console.log(itemId);
      console.log(colorId);

      if (value === 0 || value === null || value < 0 || value === undefined) {
        AlertMessages.getErrorMessage('Issued Quantity should be greater than zero')
      }
      if (Number(value) > Number(rowData.quantity)) {
        AlertMessages.getErrorMessage('Issued Quantity should be less than Avaialble Quantity--')
      }
      let itemData;
      let stockData;
      let stockListData;
      if(rowData.itemType === "FABRIC"){
        itemData = tableData?.find((t) => t.sample_request_id === sampleReqId)?.fabric
        stockData = itemData?.find((f) => f.fabric_info_id === itemId && f.colour_id === colorId);
        stockListData = stockData?.allocatedStock;
      }
      else{
        itemData = tableData?.find((t) => t.sample_request_id === sampleReqId)?.trimData
        stockData = itemData?.find((f) => f.trim_info_id === itemId);
        stockListData = stockData?.allocatedStock;
      }
      console.log(itemData);
      console.log(stockData);
      console.log(stockListData);
      let stockRecord = stockListData?.find((s)=> s.stockId === rowData.stockId);
      console.log(stockRecord);
      stockRecord.issuedQty = value;
      // stockRecord.checkedStatus = 1;
      console.log(tableData);
      const sum = stockListData.reduce((accumulator, object) => {
        console.log(accumulator);
        console.log(object.issuedQty);
        return accumulator + (object.issuedQty != undefined ? Number(object.issuedQty) : 0);
      }, 0);
      console.log(sum);
      console.log(stockData?.tobeProcured)
      if(Number(sum) > Number(stockData?.tobeProcured)){
        AlertMessages.getErrorMessage('Issued Quantity should not exceed total required. ')
        stockForm.setFieldValue(`allocatedQuantity${fabindex}-${index}`,0)
      }
      else{
        stockForm.setFieldValue(`allocatedQuantity${fabindex}-${index}`,value)
      }
      
      // rowData.issuedQty = value
      // const newData = [...avilableQuantity];
      // newData[index].issuedQty = value;
      // console.log(newData)
      // setAvailableQuantity(newData);
      
    }

    const handleDispatchClick=(index)=>{
      // console.log(index,"rrr")
      const date = new Date()
      console.log(date,'oooooooooooo');
      const record = moment(date).format('YYYY-MM-DD') 
      console.log(moment(date).format('YYYY-MM-DD'),'hello');

      const req = new lifeCycleStatusReq(index,LifeCycleStatusEnum.CLOSED,record)
      service.updatedispatch(req).then(res =>{
        if(res.status){
        AlertMessages.getSuccessMessage('Status Updated Successfully')
        getAll()
        }
        else{
          AlertMessages.getErrorMessage(res.internalMessage)
        }
      })
    

      setStatus('Closed');

      setLifeCycleStatus(LifeCycleStatusEnum.CLOSED);
    }
    const onCheck = (rowData, index, isChecked,sampleReqId,itemId,fabindex,colorId) => {
      if(isChecked){
          let itemData;
          let stockData;
          let stockListData;
          if(rowData.itemType === "FABRIC"){
            itemData = tableData?.find((t) => t.sample_request_id === sampleReqId)?.fabric
            stockData = itemData?.find((f) => f.fabric_info_id === itemId && f.colour_id === colorId);
            stockListData = stockData?.allocatedStock;
          }
          else{
            itemData = tableData?.find((t) => t.sample_request_id === sampleReqId)?.trimData
            stockData = itemData?.find((f) => f.trim_info_id === itemId);
            stockListData = stockData?.allocatedStock;
          }
        if(Number(rowData.issuedQty) > 0)
        {  
          rowData.checkedStatus = 1;
          if(stockListData.find((e)=> e.checkedStatus === 1)){
            setAllocatedStock(stockData);
            setbtnEnable(true);
          }
        }
        else{
          rowData.checkedStatus = 0;
          AlertMessages.getErrorMessage("Allocated Quantity should be greater than 0")
        }
      }
      else{
          let itemData;
          let stockData;
          let stockListData;
          if(rowData.itemType === "FABRIC"){
            itemData = tableData?.find((t) => t.sample_request_id === sampleReqId)?.fabric
            stockData = itemData?.find((f) => f.fabric_info_id === itemId && f.colour_id === colorId);
            stockListData = stockData?.allocatedStock;
          }
          else{
            itemData = tableData?.find((t) => t.sample_request_id === sampleReqId)?.trimData
            stockData = itemData?.find((f) => f.trim_info_id === itemId);
            stockListData = stockData?.allocatedStock;
          }
          console.log(itemData);
          console.log(stockData);
          console.log(stockListData);

        // let stock = allocatedStock?.allocatedStock;
        // let stockRecord = stock?.find((e)=> e.stockId === rowData.stockId)
        stockListData.checkedStatus = 0;
        if(stockListData?.find((e)=> e.checkedStatus === 1)?.length - 1 > 0){
          setbtnEnable(true);
        }
        else{
          setbtnEnable(false);
        }
        console.log("")
      }
    };
    const setIndex = (expanded, record) => {
      console.log(expanded);
      console.log(record);

      const expandedRows = []
      if (expanded) {
        expandedRows.push(record.fabric_info_id);
        setExpandedIndex(expandedRows);
      } else {
        setExpandedIndex(expandedRows);
      }
    }
    
    const onSegmentChange = (val) => {
      setTabName(val);
    };
    const printOrder = () => {
      const divContents = document.getElementById('printme').innerHTML;
      const element = window.open('', '', 'height=700, width=1024');
      element.document.write(divContents);
      getCssFromComponent(document, element.document);
      element.document.close();
      element.print();
      element.close(); // to close window when click on cancel/Save
      setIsModalOpen(true); // model should be open
    };
   
  const handleCancel = () => {
    setIsModalOpen(false);
  };

    const showModal = (rowData) => {
      setIsModalOpen(true);
      setRow(rowData)
    };

    const HeaderRow = (props: any) => {

      
      const { requestNo, style, buyerName, expectedDate, indentDate, status, lifeCycleStatus, location, brandName,pch,dispatch ,index} =
        props;
      const formattedIndentDate = moment(indentDate).format("YYYY-MM-DD");
      const formattedExpectedDate = moment(expectedDate).format("YYYY-MM-DD");
  
      return (
        <div style={{ display: "flex" }}>
          <span>Request Number : {<b>{requestNo}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Style : {<b>{style}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Brand : {<b>{brandName}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>PCH : {<b>{pch}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Buyer : {<b>{buyerName}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Location : {<b>{location}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span style={{ width: "10px" }}></span>
          <span style={{ width: "10px" }}></span>
          <span> Status : {<b>{LifeCycleStatusDisplay.find((e)=>e.name === lifeCycleStatus)?.displayVal}</b>}</span>
          <span style={{marginLeft:'auto'}}>
               {lifeCycleStatus === LifeCycleStatusEnum.READY_TO_DISPATCH ? (
        <>
          <span style={{paddingRight:20}}  >
            <Button type="primary"  size="small" onClick={()=>handleDispatchClick(index)}>
              Dispatch 
            </Button>
          </span>
        
        </>
      ):(<></>)}
        {lifeCycleStatus === LifeCycleStatusEnum.READY_FOR_PRODUCTION ? (
             <>
              <span >
            <Tooltip  title='Pick List Print'>
            <Button type="primary" size="small" onClick={()=>showModal(index)}>
            <PrinterOutlined style={{ fontSize: '20px' }}  />
            </Button>
            </Tooltip>
          </span>
          </>
           ):(<></>)}
          </span>
        </div>
      );
    };

    
  
    const onReset = () => {
      sourcingForm.resetFields();
      setTableData(data);
      getAll()
    };
  
    const onBarcodeModalCancel = () => {
      setBarcode("");
      setBarcodeModal(false);
    };
  
    const MarketIssueDetailView = (rowData,cancel?) => {
        const navigateData = filterData.filter(req => req.sample_request_id === rowData)
        console.log("MarketIssueDetailView",rowData)
        return navigate(`/sample-development/store-issue-detail`, { state: { data: navigateData, cancelVisible : cancel } });
        // return navigate(`/sample-development/store-issue-detail`, { state: { data: [rowData], cancelVisible : cancel } });
    
      };

      const renderItems = (record:any, index:any) => {
        console.log(record);
        return  <Table
         dataSource={record.allocatedStock}
          columns={tableColumns(record.totalRequirement,index,record.sampleRequestid,(record.itemType).toUpperCase() === "FABRIC"?record.fabric_info_id:record.trim_info_id,record.colour_id)} 
          pagination={false}
           rowKey={record.stockId}/>;
      };


      // const handleExpandFabric = (expanded,sampleReqId, record) => {
      //   let req = new  buyerandM3ItemIdReq(record.buyerId,record.m3ItemFabricId,record.itemType)
      //   console.log(record);
      //  getAllAvailbaleQuantity(req,record,sampleReqId,"fabric")
      // };
      // const handleExpandTrim = (expanded,sampleReqId,record) => {
      //   let req = new buyerandM3ItemIdReq(record.buyerId,record.trimCode,record.itemType)
      //   console.log(record);
      //  getAllAvailbaleQuantity(req,record,sampleReqId,"trim")
      // };

      // const getAllAvailbaleQuantity =(req,rowData,sampleReqId,type) =>{
      //   console.log(type);
      //   console.log(sampleReqId);
      //   console.log(rowData);


      //   console.log(tableData);
      //   service.getAvailbelQuantityAginstBuyerAnditem(req).then(res =>{
      //     if(res.status){
            
      //       // const dataWithRow = { rowData: rowData, responseData: res.data };
      //       const updatedData = res.data.map(item => ({
      //         ...item,
      //         sampleRequestid:rowData.sampleRequestid,
      //         sampleItemId:rowData.sampleRequestid,
      //         itemType:rowData.itemType,
      //         issuedQty:0
      //         }))
             

      //         if(type === "fabric"){
      //           (tableData.find((e) => e.sample_request_id === sampleReqId).fabric).find((f) => f.fabric_info_id === rowData.fabric_info_id).allocatedStock = updatedData
      //         }
      //         else{
      //           (tableData.find((e) => e.sample_request_id === sampleReqId).trimData).find((f) => f.trim_info_id === rowData.trim_info_id).allocatedStock = updatedData
      //         }
              
      //         setAvailableQuantity(updatedData)           
      //     }
      //   })
      // }

    return (
      <Card
        headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
        title="Sample Requests"
        // extra={
        //   <Link to="/sample-development/sample-development-form">
        //     <span style={{ color: "white" }}>
        //       <Button type={"primary"}>New </Button>{" "}
        //     </span>
        //   </Link>
        // }
      >
        <Form form={sourcingForm} onFinish={getAll} layout="vertical">
          <Row gutter={8}>
          {/* <Form.Item name="dispatched date" style={{display:'none'}}>
    <DatePicker value={moment}/>
    </Form.Item> */}
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
              xl={{ span: 4 }}
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
                        key={e.sample_request_id}
                        value={e.sample_request_id}
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
              md={{ span: 8 }}
              lg={{ span: 8 }}
              xl={{ span: 4 }}
            >
              <Form.Item name="style" label="Style">
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Select Style"
                >
                  {styled.map((e) => {
                    return (
                      <Option key={e.style_id} value={e.style_id} name={e.style}>
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
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 4 }}
            >
              <Form.Item name="status" label="Status">
                <Select
                  optionFilterProp="children"
                  placeholder="Select Status"
                  allowClear
                >
                  {Object.values(LifeCycleStatusDisplay).map((val) => (
            <Select.Option key={val.name} value={val.name}>
              {val.displayVal}
            </Select.Option>
          ))}
                  {/* {Object.keys(SampleDevelopmentStatusDisplay)
                    .sort()
                    .map((status) => (
                      <Select.Option
                        key={SampleDevelopmentStatusEnum[status]}
                        value={SampleDevelopmentStatusEnum[status]}
                      >
                        {SampleDevelopmentStatusEnum[status]}
                      </Select.Option>
                    ))} */}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Form.Item name="pch" label="PCH">
              <Select
                showSearch
                placeholder="Select PCH"
                optionFilterProp="children"
                allowClear
              >
                {pch.map((qc: any) => (
                  <Select.Option key={qc.profit_control_head_id} value={qc.profit_control_head_id
                  }>
                    {qc.profit_control_head}
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
                  style={{marginTop:20,marginLeft:30}}
                  // onClick={onSearch}
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
                <Button danger icon={<UndoOutlined />} onClick={onReset}
                 style={{marginTop:20,marginLeft:30}}
                >
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <br></br>
  
        <Collapse
          collapsible="icon"
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          accordion
        >
         
          {tableData.map((item: any, index: any) => (
            <Collapse.Panel
              header={
                <HeaderRow
                  index={item.sample_request_id}
                  requestNo={item.requestNo}
                  style={item.style}
                  buyerName={item.buyerName}
                  lifeCycleStatus={item.lifeCycleStatus}
                  location={item.location}
                  brandName={item.brandName}
                  pch={item.pch}
                  status={item.status}
                />
              }
              key={index}
            >
              <Space
                direction="vertical"
                style={{ fontSize: "16px", width: "100%" }}
              >
                <Segmented
                defaultValue={tabName}
                  onChange={onSegmentChange}
                  style={{ backgroundColor: "#68cc6b" }}
                  options={[
                    {
                      label: (
                        <>
                          <b style={{ fontSize: "12px" }}>Fabric Details</b>
                        </>
                      ),
                      value: "Fabric",
                    },
                    {
                      label: (
                        <>
                          <b style={{ fontSize: "12px" }}>Trim Details</b>
                        </>
                      ),
                      value: "Trim",
                    },
                  ]}
                />
                <div>
                  {tabName === "Fabric" ? (

                    <Table
                    key={keyUpdate}
                    rowKey={record => record.fabric_info_id}
                    columns={Columns}
                    dataSource={item.fabric}
                    className="custom-table-wrapper"

                    expandedRowRender={renderItems}
                    expandedRowKeys={expandedIndex}
                    onExpand={setIndex}
                    expandable = {{
                      defaultExpandAllRows : false, 
                      rowExpandable:(record)=>{console.log(record) ; return (record.status != BomStatusEnum.ALLOCATED && record.resltantavaliblequantity > 0 && checkAccess(MenusAndScopesEnum.Scopes.allocation))}
                      }}
                    // expandedRowRender={renderItems}
                    // expandedRowKeys={expandedIndex}
                    // onExpand={(record) =>{ console.log(record); handleExpandFabric(undefined,item.sample_request_id,record)}}
                    // expandIconColumnIndex={7}
                    // bordered
                    pagination={false}
                    style={{ width: '100%' }} />
                    
                    // <>
                    //   <Table
                    //     columns={Columns}
                    //     dataSource={item.fabric}
                    //     rowKey={record =>record.sample_request_id}
                    //     pagination={false}
                    //     expandedRowRender={renderItems}
                    //     expandIconColumnIndex={6}
                    //     scroll={{ x: "max-content" }}
                    //     className="custom-table-wrapper"
                    //     // expandedRowKeys={expandedRowKeys}
                    //    onExpand={handleExpand}


                    //   />
                    // </>
                  )
                  
                  : (
                    <></>
                  )}
                </div>
                <div>
                  {tabName === "Trim" ? (
                    <>
                      <Table
                        rowKey={record => record.trim_info_id}
                        columns={columnsSkelton}
                        dataSource={item.trimData}
                        expandedRowRender={renderItems}
                        expandable = {{
                          defaultExpandAllRows : false, rowExpandable:(record)=>{console.log(record) ; return (
                          record.status != BomStatusEnum.ALLOCATED && record.resltantavaliblequantity > 0 && 
                            checkAccess(MenusAndScopesEnum.Scopes.allocation))}
                          }}
                        // onExpand={(record) => handleExpandTrim(undefined,item.sample_request_id,record)}
                        pagination={false}
                        scroll={{ x: "max-content" }}
                        className="custom-table-wrapper"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </Space>
            </Collapse.Panel>
          ))}
        </Collapse>
        <Modal
          open={barcodeModal}
          onCancel={onBarcodeModalCancel}
          footer={[]}
          title={barcodeInfo === "m3ItemCode" ? "M3 Item Code" : "Request Number"}
        >
          <div style={{ textAlign: "center" }}>
            <Barcode value={barcode} height={30} />
          </div>
        </Modal>
        {isModalOpen ?
            <Modal
              className='print-docket-modal'
              width={'50%'}
              key={'modal' + Date.now()}
              style={{ top: 30, alignContent: 'right' }}
              visible={isModalOpen}
              title={<React.Fragment>
              </React.Fragment>}
              onCancel={handleCancel}
              footer={[

              ]}
            >

<PickListPrint printOrder={printOrder} reqNo={row}/>
            </Modal> : ""}
    
      </Card>
    );
  };
  
  export default SampleDevNewView;

  