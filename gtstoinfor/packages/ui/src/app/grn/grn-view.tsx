import {
    BarcodeOutlined,
    CaretDownOutlined,
    CaretRightOutlined,
    EyeOutlined,
    InfoCircleOutlined,
    PrinterOutlined,
    SearchOutlined,
    UndoOutlined,
  } from "@ant-design/icons";
   import {
    Button,
    Card,
    Col,
    Collapse,
    Divider,
    Form,
    Input,
    Modal,
    Row,
    Segmented,
    Select,
    Space,
    Table,
    Tag,
  } from "antd";
  import style from "antd/es/alert/style";
  import { ColumnProps } from "antd/es/table";
  import moment from "moment";
  import React, { useEffect, useRef } from "react";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
 import {GRNService} from '../../../../libs/shared-services/src/common/grn-service'
  import Highlighter from "react-highlight-words";
import { GrnReq } from "@project-management-system/shared-models";
  
  const { Option } = Select;
  
  export const GRNView = () => {
    const [tabName, setTabName] = useState<string>("Fabric");
    const [page, setPage] = React.useState(1);
    const [sourcingForm] = Form.useForm();
    const grnService = new GRNService();
    const [grn, setGrn] = useState<any[]>([]);
    const navigate = useNavigate();
    // const service = new RequisitionService()
    const logInUser = localStorage.getItem("userName");
    const [barcodeModal, setBarcodeModal] = useState<boolean>(false);
    const [tableData, setTableData] = useState<any[]>([]);
    const [barcodeInfo, setBarcodeInfo] = useState<string>("");
    const [form] = Form.useForm();
    const [filterData, setFilterData] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
  
    useEffect(() => {
      // getStyle();
      getAll();
    }, []);
  
    useEffect(() => {
      if (data) {
      console.log(tableData)
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
  
  
    const getAll = () => {
     
      grnService.getAllGrn().then((res) => {
        if (res.status) {
          setData(res.data);
          setFilterData(res.data);
        }
      });
    };
  
    const getStyle = (val:number) => {
      console.log(val,'valllllll');
      
      const req = new GrnReq(val)
      grnService.getGrnItemById(req).then((res) => {
        if (res.status) {
          setGrn(res.data);
        }
      });
    };
  
   const details =(id:number,type:string) =>{
    navigate('/grn-detail-view',{state:{id:id,type:type}})
   }
  
    const generatePoForFabric = (rowData:any) =>{
      // console.log(rowData)
      navigate('/purchase-order', { state: { data: rowData, type:'Indent' } })
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
  
    const Columns: any = [
  
      {
        title: "S No",
        key: "sno",
        // width: '70px',
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
      {
        title: "M3 Fabric Code",
        dataIndex: "fabricCode",
        ...getColumnSearchProps("fabricCode"),
      },
    //   {
    //     title: "Shahi Fabric Code",
    //     dataIndex: "shahiFabricCode",
    //     // ...getColumnSearchProps('shahiFabricCode'),
    //     render: (text, record) => {
    //       return (
    //         <span>
    //           {record.shahiFabricCode}
    //           <Divider type="vertical" />
    //           <Tag
    //             onClick={() =>
    //               generateBarcode(record.shahiFabricCode, "m3ItemCode")
    //             }
    //             style={{ cursor: "pointer" }}
    //           >
    //             <BarcodeOutlined />
    //           </Tag>
    //         </span>
    //       );
    //     },
    //   }, 
      {
        title: "Received Quantity",
        dataIndex: "received_quantity",
        ...getColumnSearchProps("received_quantity"),
        // render: (text,record) => {
        //     return(
        //         <>
        //         {record.color ? record.colorName : '-'}
        //         </>
        //     )
        // }
      },
      {
        title: "Received Uom",
        dataIndex: "uom",
      },
      {
        title: "Accepted Quantity",
        dataIndex: "accepted_quantity",
        ...getColumnSearchProps("accepted_quantity"),
        // render: (text,record) => {
        //     return(
        //         <>
        //         {record.color ? record.colorName : '-'}
        //         </>
        //     )
        // }
      },
      {
        title: "Accepted Uom",
        dataIndex: "uom",
      },
      {
        title: "Rejected Quantity",
        dataIndex: "rejected_quantity",
        ...getColumnSearchProps("rejected_quantity"),
        // render: (text,record) => {
        //     return(
        //         <>
        //         {record.color ? record.colorName : '-'}
        //         </>
        //     )
        // }
      },
      {
        title: "Rejected Uom",
        dataIndex: "uom",
      },
      {
        title: "Conversion Quantity",
        dataIndex: "conversion_quantity",
        ...getColumnSearchProps("conversion_quantity"),
        // render: (text,record) => {
        //     return(
        //         <>
        //         {record.color ? record.colorName : '-'}
        //         </>
        //     )
        // }
      },
      {
        title: "Conversion Uom",
        dataIndex: "uom",
      },
    
    ];
    const tableColumns: any = [
  
      {
        title: "S No",
        key: "sno",
        // width: '70px',
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
      {
        title: "Po Number",
        dataIndex: "po_number",
        ...getColumnSearchProps("po_number"),
        render: (val,data) => {
          return data.po_number ? data.po_number : "-";
        }
      },
      {
        title: "GRN Number",
        dataIndex: "grn_number",
        ...getColumnSearchProps("grn_number"),
        render: (val,data) => {
          return data.grn_number ? data.grn_number : "-";
        }
      },
   
      {
        title: "Vendor",
        dataIndex: "vendor_name",
        ...getColumnSearchProps("vendor_name"),
        render: (val,data) => {
          return data.vendor_name ? data.vendor_name : "-";
        }
       
      }, {
        title: "Buyer",
        dataIndex: "buyer_name",
        ...getColumnSearchProps("buyer_name"),
        render: (val,data) => {
          return data.buyer_name ? data.buyer_name : "-";
        }
       
      },
      {
        title: "Material Type",
        dataIndex: "po_material_type",
        ...getColumnSearchProps("po_material_type"),
        render: (val,data) => {
          return data.po_material_type ? data.po_material_type : "-";
        }
       
      }, {
        title: "Contact Person",
        dataIndex: "contact_person",
        ...getColumnSearchProps("contact_person"),
        render: (val,data) => {
          return data.contact_person ? data.contact_person : "-";
        }
      },
      // {
      //   title: "Grn Date",
      //   dataIndex: "grn_date",
      //   // render(data,val):{
      //   //   return 
      //   // }
      // },
      {
        title: "Grn Date",
        align:'center',
        dataIndex: "grn_date",
        render: (val,data) => {
          return data.grn_date ?moment( data.grn_date).format('YYYY-MM-DD') : "-";
        }
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (val,data) => {
          return data.status ? data.status : "-";
        }
      },
      {
        title: <div style={{textAlign:'center'}}>Action</div>,
        dataIndex: 'action',
        render: (text, rowData) => {
          
          return(
          <><span>
           <Button title={"Detail View"} onClick={() => details(rowData.grn_id,rowData.po_material_type)}>
              <EyeOutlined />
            </Button>
          </span>
                 </>
          )
        }
      },
    ];
    const columnsSkelton: any = [
  
      {
        title: "S No",
        key: "sno",
        // width: '70px',
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
      {
        title: "M3 Trim Code",
        dataIndex: "trim_code",
        ...getColumnSearchProps("trim_code"),
      },
    //   {
    //     title: "Shahi Fabric Code",
    //     dataIndex: "shahiFabricCode",
    //     // ...getColumnSearchProps('shahiFabricCode'),
    //     render: (text, record) => {
    //       return (
    //         <span>
    //           {record.shahiFabricCode}
    //           <Divider type="vertical" />
    //           <Tag
    //             onClick={() =>
    //               generateBarcode(record.shahiFabricCode, "m3ItemCode")
    //             }
    //             style={{ cursor: "pointer" }}
    //           >
    //             <BarcodeOutlined />
    //           </Tag>
    //         </span>
    //       );
    //     },
    //   }, 
      {
        title: "Received Quantity",
        dataIndex: "received_quantity",
        ...getColumnSearchProps("received_quantity"),
        // render: (text,record) => {
        //     return(
        //         <>
        //         {record.color ? record.colorName : '-'}
        //         </>
        //     )
        // }
      },
      {
        title: "Received Uom",
        dataIndex: "uom",
      },
      {
        title: "Accepted Quantity",
        dataIndex: "accepted_quantity",
        ...getColumnSearchProps("accepted_quantity"),
        // render: (text,record) => {
        //     return(
        //         <>
        //         {record.color ? record.colorName : '-'}
        //         </>
        //     )
        // }
      },
      {
        title: "Accepted Uom",
        dataIndex: "uom",
      },
      {
        title: "Rejected Quantity",
        dataIndex: "rejected_quantity",
        ...getColumnSearchProps("rejected_quantity"),
        // render: (text,record) => {
        //     return(
        //         <>
        //         {record.color ? record.colorName : '-'}
        //         </>
        //     )
        // }
      },
      {
        title: "Rejected Uom",
        dataIndex: "uom",
      },
      {
        title: "Conversion Quantity",
        dataIndex: "conversion_quantity",
        ...getColumnSearchProps("conversion_quantity"),
        // render: (text,record) => {
        //     return(
        //         <>
        //         {record.color ? record.colorName : '-'}
        //         </>
        //     )
        // }
      },
      {
        title: "Conversion Uom",
        dataIndex: "uom",
      },
    
    ];
  
    const genereatePoForTrim = (rowData: any) => {
      navigate("/purchase-order", { state: { data: rowData, type:'Indent'  } });
    };
  
    const onSegmentChange = (val) => {
      setTabName(val);
    };
  
    const HeaderRow = (props: any) => {
      const { PoNo, vendor, ContactPerson, GrnDate, materialType, status,buyer,grnNum } =
        props;
      const formattedExpectedDate = moment(GrnDate).format("YYYY-MM-DD");
  
      return (
        <div style={{ display: "flex" }}>
          <span>PO Number : {<b>{PoNo}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>GRN Number : {<b>{grnNum}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Vendor : {<b>{vendor}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Buyer : {<b>{buyer}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Material Type : {<b>{materialType}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>Contact Person : {<b>{ContactPerson}</b>}</span>
          <span style={{ width: "10px" }}></span>
          <span>
            Grn Date: <b>{GrnDate}</b>
          </span>
          <span style={{ width: "10px" }}></span>
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
      let filterData:any = [];
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
  
    // const onBarcodeModalCancel = () => {
    //   setBarcode("");
    //   setBarcodeModal(false);
    // };
  
    // const closeWindow = () => {
    //   setBarcode("");
    //   window.close();
    // };
  
    return (
      <Card
        headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
        title="GRN List"
        extra={
          <span>
            <Button onClick={() => navigate("/grn-form")}>New</Button>
          </span>
        }
      >
        {/* {barcode.length > 0 ? <BarcodePrint key={Date.now() + barcode} printBarcodes={closeWindow} closeBarcodePopUp={closeWindow}
            columns={barcodeWithColumns} newWindow={false} barcodeInfo={barcode} /> : ''} */}
        {/* <Form form={sourcingForm}>
          <Row gutter={8}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 6 }}
            >
              <Form.Item name="poNo" label="Po Number">
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Select Po Number"
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
        </Form> */}
  
        {/* <Collapse
          collapsible="icon"
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          accordion
        >
          {tableData.map((item: any, index: any) => (
            
            <Collapse.Panel
            
            // onClick={(rowData)=>getStyle(rowData.id)}
              header={
                <HeaderRow
                  PoNo={item.po_number}
                  grnNum = {item.grn_number}
                  vendor={item.vendor_name}
                  ContactPerson={item.contact_person}
                  grnDate={item.grn_date}
                  indentDate={item.indentDate}
                  status={item.status}
                  materialType={item.po_material_type}
                  buyer={item.buyer_name}
                />
              }
                            // onChange={()=}
              key={index}
            //   extra={
            //     <Tag
            //       onClick={() => generateBarcode(item.requestNo, "requestNo")}
            //       style={{ cursor: "pointer" }}
            //     >
            //       <BarcodeOutlined />
            //     </Tag>
            //   }
            >
              <Space
                direction="vertical"
                style={{ fontSize: "16px", width: "100%" }}
              >
                {/* <Segmented
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
                /> */}
                {/* <div> */}
                  {/* {item.po_material_type === "Fabric" ? (
                    <>
                      <Table
                        columns={Columns}
                        dataSource={grn}
                        pagination={false}
                        scroll={{ x: "max-content" }}
                        className="custom-table-wrapper"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  {item.po_material_type === "Trim" ? (
                    <>
                      <Table
                        columns={columnsSkelton}
                        dataSource={grn}
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
            </Collapse.Panel> */}
          {/* ))} */}
        {/* </Collapse> */} 
        {/* <Modal
          open={barcodeModal}
          footer={[]}
          title={barcodeInfo === "m3ItemCode" ? "M3 Item Code" : "Request Number"}
        >
          <div style={{ textAlign: "center" }}>
            <Barcode value={barcode} height={30} />
          </div>
        </Modal> */}
        <Table
        columns={tableColumns}
        dataSource={filterData}
        />
      </Card>
    );
  };
  
  export default GRNView;
  