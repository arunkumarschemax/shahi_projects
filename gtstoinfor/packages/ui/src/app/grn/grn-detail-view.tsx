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
    Descriptions,
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
  import { useLocation, useNavigate } from "react-router-dom";
//  import {GRNService} from '../../../../libs/shared-services/src/common/grn-service'
  import Highlighter from "react-highlight-words";
import { GrnReq } from "@project-management-system/shared-models";
import { GRNService } from "@project-management-system/shared-services";
  
  const { Option } = Select;
  
  export const GRNDetailView = () => {
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
  const location = useLocation()
  const value = location.state.id
  const type = location.state.type
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
      
      const req = new GrnReq(value)
      grnService.getGrnItemById(req).then((res) => {
        if (res.status) {
          setGrn(res.data);
        }
      });
      grnService.getAllGrn(req).then((res) => {
        if (res.status) {
          setData(res.data);
          setFilterData(res.data);
        }
      });
    };
  
   const details =(id:number) =>{
    navigate('./grn-detailView',{state:{id}})
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
    
      {
        title: "Received Quantity",
        dataIndex: "received_quantity",
        ...getColumnSearchProps("received_quantity"),
        
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
     
      },
      {
        title: "Rejected Uom",
        dataIndex: "uom",
      },
      {
        title: "Conversion Quantity",
        dataIndex: "conversion_quantity",
        ...getColumnSearchProps("conversion_quantity"),
       
      },
      {
        title: "Conversion Uom",
        dataIndex: "uom",
      },
    
    ];
    // const tableColumns: any = [
  
    //   {
    //     title: "S No",
    //     key: "sno",
    //     // width: '70px',
    //     responsive: ["sm"],
    //     render: (text, object, index) => (page - 1) * 10 + (index + 1),
    //   },
    //   {
    //     title: "Po Number",
    //     dataIndex: "po_number",
    //     ...getColumnSearchProps("po_number"),
    //     render: (val,data) => {
    //       return data.po_number ? data.po_number : "-";
    //     }
    //   },
    //   {
    //     title: "GRN Number",
    //     dataIndex: "grn_number",
    //     ...getColumnSearchProps("grn_number"),
    //     render: (val,data) => {
    //       return data.grn_number ? data.grn_number : "-";
    //     }
    //   },
   
    //   {
    //     title: "Vendor",
    //     dataIndex: "vendor_name",
    //     ...getColumnSearchProps("vendor_name"),
    //     render: (val,data) => {
    //       return data.vendor_name ? data.vendor_name : "-";
    //     }
       
    //   }, {
    //     title: "Buyer",
    //     dataIndex: "buyer_name",
    //     ...getColumnSearchProps("buyer_name"),
    //     render: (val,data) => {
    //       return data.buyer_name ? data.buyer_name : "-";
    //     }
       
    //   },
    //   {
    //     title: "Material Type",
    //     dataIndex: "po_material_type",
    //     ...getColumnSearchProps("po_material_type"),
    //     render: (val,data) => {
    //       return data.po_material_type ? data.po_material_type : "-";
    //     }
       
    //   }, {
    //     title: "Contact Person",
    //     dataIndex: "contact_person",
    //     ...getColumnSearchProps("contact_person"),
    //     render: (val,data) => {
    //       return data.contact_person ? data.contact_person : "-";
    //     }
    //   },
    
    //   {
    //     title: "Grn Date",
    //     align:'center',
    //     dataIndex: "grn_date",
    //     render: (val,data) => {
    //       return data.grn_date ?moment( data.grn_date).format('YYYY-MM-DD') : "-";
    //     }
    //   },
    //   {
    //     title: "Status",
    //     dataIndex: "status",
    //     render: (val,data) => {
    //       return data.status ? data.status : "-";
    //     }
    //   },
    //   {
    //     title: <div style={{textAlign:'center'}}>Action</div>,
    //     dataIndex: 'action',
    //     render: (text, rowData) => {
          
    //       return(
    //       <><span>
    //        <Button title={"Detail View"} onClick={() => details(rowData.grn_id)}>
    //           <EyeOutlined />
    //         </Button>
    //       </span>
    //              </>
    //       )
    //     }
    //   },
    // ];
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

    const onReset = () => {
      sourcingForm.resetFields();
      setTableData(data);
    };
  
   
  
    return (
      <Card
        headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
        title="GRN Details"
        extra={
          <span>
            <Button onClick={() => navigate("/grn-view")}>Back</Button>
          </span>
        }
      >
        <Descriptions>
        <Descriptions.Item label='GRN Number' labelStyle={{color:'black',fontWeight:'bolder'}}>{data?.[0]?.grn_number?data?.[0]?.grn_number:'-'}</Descriptions.Item>
        <Descriptions.Item label='GRN Date' labelStyle={{color:'black',fontWeight:'bolder'}}>{data?.[0]?.grn_date? moment(data?.[0]?.grn_date).format('DD-MM-YYYY'):'-'}</Descriptions.Item>
        <Descriptions.Item label='PO Number' labelStyle={{color:'black',fontWeight:'bolder'}}>{data?.[0]?.po_number?data?.[0]?.po_number:'-'}</Descriptions.Item>
        {/* <Descriptions.Item label='Buyer' labelStyle={{color:'black',fontWeight:'bolder'}}>{data?.[0]?.buyer_name?data?.[0]?.buyer_name:'-'}</Descriptions.Item> */}
          <Descriptions.Item label='Contact Person' labelStyle={{color:'black',fontWeight:'bolder'}}>{data?.[0]?.contact_person?data?.[0]?.contact_person:'-'}</Descriptions.Item>
        </Descriptions>
        <>
        {type === "Fabric" ? (
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
                
                
                  {type === "Trim" ? (
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
                  </>
                 
      </Card>
    );
  };
  
  export default GRNDetailView;
  