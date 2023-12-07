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
    LifeCycleStatusEnum,
    buyerandM3ItemIdReq,
    lifeCycleStatusReq,
  } from "@project-management-system/shared-models";
  import Highlighter from "react-highlight-words";
import { faL } from "@fortawesome/free-solid-svg-icons";
import AlertMessages from "../common/common-functions/alert-messages";
import { useIAMClientState } from "../common/iam-client-react";
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
   const [expandedRowKeys, setExpandedRowKeys] = useState([])
    const searchInput = useRef(null);
    const [avilableQuantity, setAvailableQuantity] = useState<any[]>([])
    const [checked, setChecked] = useState<boolean>(false)
    const [keyUpdate, setKeyUpdate] = useState<number>(1);
   const { IAMClientAuthContext } = useIAMClientState();

 

  
    useEffect(() => {
      getAll();
    }, []);
  
    useEffect(() => {
      if (data) {
      console.log(tableData)
        setTableData(data);
      }
    }, [data]);
  
  
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
    req.extRefNumber = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null

      service.getAllSampleDevData(req).then((res) => {
        if (res.status) {
          setData(res.data);
          console.log(res.data,"rrrrr")
          setFilterData(res.data);
        }
      });
    };
   
  
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
    let materailData :Allocatematerial[]=[]
      for(const data of dto){
        const req = new Allocatematerial(data.itemType,data.sampleRequestid,data.sampleItemId,data.m3ItemId,data.quantity,data.stockId,data.locationId,data.buyerId,data.allocatedQuantity, data.checkedStatus, data.issuedQty)
        materailData.push(req)
      }
      service.creatematerialAlloction(materailData).then(res =>{
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
        title: "To Be Procured",
        dataIndex: "tobeProcured",
        render: (text, record) => {
          return (
            <>
              {Number(record.totalRequirement) - Number(record.availableQuantity) > 0
                ? Number(record.totalRequirement) - Number(record.availableQuantity)
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
      },
      {
        title: "Required Quantity",
        dataIndex: "trim_consumption",
        sorter: (a, b) => a.trim_consumption.localeCompare(b.trim_consumption),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Available Quantity",
        dataIndex: "resltantavaliblequantity",
        sorter: (a, b) => a.resltantavaliblequantity.localeCompare(b.resltantavaliblequantity),
        sortDirections: ["descend", "ascend"],
        render: (text, record) => {
          let consumedQty = 0
          // if(record.trim_consumption > 0){
          //   consumedQty = record.trim_consumption
          // }
            return (
              <>
                {record.resltantavaliblequantity ? (record.resltantavaliblequantity) : "Not Available"
                  }
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
            
            <Form.Item name='allocatedQuantity'>
                  <InputNumber
                      onChange={(e) => setAllocatedQty(index,rowData, e)} 
                   />
            </Form.Item>
           
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
            <Checkbox 
            onClick={checkboxonclick}
            onChange={(e) => onCheck(rowData, index, e.target.checked)}
            // onClick={(e) =>onCheck(rowData,undefined)}
            />
          );
        },
      },
     
    ]

    const allocateQuantity = () =>{
      // console.log(avilableQuantity)
      createAllocation(avilableQuantity)

    }
    const checkboxonclick =() =>{
      setChecked(true)
    }

    // const onCheck = (rowData,allocatedQuantity,isChecked) =>{
    //   console.log(rowData)
    // if (isChecked) {
    //   setSelectedRowsData( [
    //     {
    //       buyerId:rowData.buyerId,
    //       grnItemId:rowData.grnItemId,
    //       locationId:rowData.locationId,
    //       m3ItemId:rowData.m3ItemId,
    //       stockId: rowData.stockId,
    //       allocatedQuantity: allocatedQuantity !== undefined ? allocatedQuantity : '',
    //       sampleRequestId:rowData.sampleRequestid,
    //       sampleItemId:rowData.sampleItemId,
    //       itemType:rowData.itemType
    //     },
    //   ]);
    //   setbtnEnable(true)
    // } else {
    //   setSelectedRowsData(prevData =>
    //     prevData.filter(item => item.stockId !== rowData.stockId)
    //   );
    // }
    // console.log(selectedRowsData)
      
    // }

    const [allocatedQuantities, setAllocatedQuantities] = useState<any[]>([]);


    
    const setAllocatedQty = (index, rowData, value) => {
     

      rowData.issuedQty = value
      const newData = [...avilableQuantity];
      newData[index].issuedQty = value;
      console.log(newData)
      setAvailableQuantity(newData);
      if (value === 0 || value === null || value < 0 || value === undefined) {
        AlertMessages.getErrorMessage('Issued Quantity should be greater than zero')
        sourcingForm.setFieldsValue({["allocatedQuantity"]:(rowData.requiredQty>rowData.quantity?rowData.requiredQty:rowData.quantity)});
      }
      if (Number(value) > Number(rowData.quantity)) {
        sourcingForm.setFieldsValue({["allocatedQuantity"]:(rowData.requiredQty>rowData.quantity?rowData.requiredQty:rowData.availableQty)});
        AlertMessages.getErrorMessage('Issued Quantity should be less than Avaialble Quantity--')
      }
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
    const onCheck = (rowData, index, isChecked) => {




      
      if(isChecked){
        if(Number(rowData.issuedQty) > 0){

          rowData.issuedQty = rowData.issuedQty
          rowData.checkedStatus = 1;
          const newData = [...avilableQuantity];

          setAvailableQuantity(newData);

          // const updatedAllocatedQuantities = [...allocatedQuantities];
          // updatedAllocatedQuantities[index] = {
          //   buyerId:rowData.buyerId,
          //   grnItemId:rowData.grnItemId,
          //   grnNumber:rowData.grnNumber,
          //   itemType:rowData.itemType,
          //   locationId:rowData.locationId,
          //   m3ItemId:rowData.m3ItemId,
          //   quantity:rowData.quantity,
          //   sampleItemId:rowData.sampleItemId,
          //   stockBarCode:rowData.stockBarCode,
          //   sampleRequestid:rowData.sampleRequestid,
          //   stockId:rowData.stockId,
          //   allocatedQuantity: rowData.issuedQty,
          //   checkedStatus: 1,
          // };
          // setAllocatedQuantities(updatedAllocatedQuantities);
          // setAllocatedQuantities(updatedAllocatedQuantities);

          setbtnEnable(true)
        }
        else{
          AlertMessages.getErrorMessage('Issued Quantity should be greater than zero')
        }
      }
      else{
        console.log("")
      }
      // if (isChecked) {
      //   const updatedAllocatedQuantities = [...allocatedQuantities];
      //   const index = updatedAllocatedQuantities.findIndex(
      //     (item) => item.rowData === rowData
      //   );
      //     console.log(index)
      //   if (index !== -1) {
      //     updatedAllocatedQuantities[index] = {
      //       buyerId:rowData.buyerId,
      //       grnItemId:rowData.grnItemId,
      //       grnNumber:rowData.grnNumber,
      //       itemType:rowData.itemType,
      //       locationId:rowData.locationId,
      //       m3ItemId:rowData.m3ItemId,
      //       quantity:rowData.quantity,
      //       sampleItemId:rowData.sampleItemId,
      //       stockBarCode:rowData.stockBarCode,
      //       sampleRequestid:rowData.sampleRequestid,
      //       stockId:rowData.stockId,
      //       allocatedQuantity: quantityValue,
      //     };
      //   } 
      //   else {
      //     updatedAllocatedQuantities.push({
      //       buyerId:rowData.buyerId,
      //       grnItemId:rowData.grnItemId,
      //       grnNumber:rowData.grnNumber,
      //       itemType:rowData.itemType,
      //       locationId:rowData.locationId,
      //       m3ItemId:rowData.m3ItemId,
      //       quantity:rowData.quantity,
      //       sampleItemId:rowData.sampleItemId,
      //       stockBarCode:rowData.stockBarCode,
      //       sampleRequestid:rowData.sampleRequestid,
      //       stockId:rowData.stockId,
      //       allocatedQuantity: quantityValue,
      //     });
      //   }
        
      //   setAllocatedQuantities(updatedAllocatedQuantities);
      // } else {
      //   const updated = allocatedQuantities.filter(
      //     (item) => item.rowData !== rowData
      //   );
      //   setAllocatedQuantities(updated);
      // }
      // setbtnEnable(true)
      // console.log(allocatedQuantities)
    };
    
    const onSegmentChange = (val) => {
      setTabName(val);
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
          {/* <span style={{ width: "10px" }}></span>
          <span>Status : {<b>{status}</b>}</span> */}
          <span style={{ width: "10px" }}></span>
          <span> Status : {<b>{lifeCycleStatus}</b>}</span>
          {/* <span style={{width:'10px'}}></span>
                <span>{<Tag onClick={() => generateBarcode(requestNo)} style={{cursor:'pointer'}}>
                           <BarcodeOutlined />
                       </Tag>}</span> */}
               {lifeCycleStatus === LifeCycleStatusEnum.READY_TO_DISPATCH ? (
        <>
          <span style={{ width: "10px" }}></span>
          {/* <span>Dispatch Status: <b>{dispatch}</b></span> */}
          <span style={{ marginLeft: 'auto' }}>

          <span><b>{dispatch}</b></span>
            <Button type="primary" onClick={()=>handleDispatchClick(index)}>
              Dispatch 
            </Button>
          </span>
        </>
      ):(<></>)}
        </div>
      );
    };

    
  
    const onReset = () => {
      sourcingForm.resetFields();
      setTableData(data);
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

      const renderItems = (record:any) => {
        return  <Table
         dataSource={avilableQuantity}
          columns={renderColumnForFabric} 
          pagination={false}
           rowKey={record.stockId}/>;
      };


      const handleExpandFabric = (expanded, record) => {
        let req = new  buyerandM3ItemIdReq(record.buyerId,record.m3ItemFabricId,record.itemType)
        console.log(record);
       getAllAvailbaleQuantity(req,record)
      };
      const handleExpandTrim = (expanded, record) => {
        let req = new buyerandM3ItemIdReq(record.buyerId,record.trimCode,record.itemType)
        console.log(record);
       getAllAvailbaleQuantity(req,record)
      };

      const getAllAvailbaleQuantity =(req,rowData) =>{
        service.getAvailbelQuantityAginstBuyerAnditem(req).then(res =>{
          if(res.status){
            // const dataWithRow = { rowData: rowData, responseData: res.data };
            const updatedData = res.data.map(item => ({
              ...item,
              sampleRequestid:rowData.sampleRequestid,
              sampleItemId:rowData.sampleRequestid,
              itemType:rowData.itemType,
              issuedQty:0
              }))
              setAvailableQuantity(updatedData)           
          }
        })
      }

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
        <Form form={sourcingForm}>
          <Row gutter={8}>
          {/* <Form.Item name="dispatched date" style={{display:'none'}}>
    <DatePicker value={moment}/>
    </Form.Item> */}
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
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="pch" label="PCH">
              <Select
                showSearch
                placeholder="Select PCH"
                optionFilterProp="children"
                allowClear
              >
                {/* {pch.map((qc: any) => (
                  <Select.Option key={qc.pch} value={qc.pch}>
                    {qc.pch}
                  </Select.Option>
                ))} */}
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
                    expandedRowRender={renderItems}
                    expandable = {{
                      defaultExpandAllRows : false, rowExpandable:(record)=>{console.log(record) ; return (record.status != BomStatusEnum.ALLOCATED && record.resltantavaliblequantity > 0 && IAMClientAuthContext.user?.roles === "sourcingUser")}
                      }}
                    // expandedRowRender={renderItems}
                    // expandedRowKeys={expandedIndex}
                    onExpand={handleExpandFabric}
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
                          defaultExpandAllRows : false, rowExpandable:(record)=>{console.log(record) ; return (record.status != BomStatusEnum.ALLOCATED && record.resltantavaliblequantity > 0 && IAMClientAuthContext.user?.roles === "sourcingUser")}
                          }}
                        // expandable = {{
                        //   defaultExpandAllRows : false
                        //   }}
                        onExpand={handleExpandTrim}
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
      </Card>
    );
  };
  
  export default SampleDevNewView;

  