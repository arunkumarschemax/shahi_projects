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
//  import {GRNService} from '../../../../libs/shared-services/src/common/grn-service'
  import Highlighter from "react-highlight-words";
import { GrnReq } from "@project-management-system/shared-models";
import { GRNService } from "@project-management-system/shared-services";
import Barcode from "react-barcode";
  
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
    const [barcode, setBarcode] = useState<string>(null);
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
  
    // const generatePoForFabric = (rowData:any) =>{
    //   // console.log(rowData)
    //   navigate('/purchase-order', { state: { data: rowData, type:'Indent' } })
    // }
  
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

    const tableColumns: any = [
  
      {
        title: "S No",
        key: "sno",
        // width: '70px',
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
      {
        title: <div style={{textAlign:"center"}}>PO Number</div>,
        dataIndex: "poNumber",
        ...getColumnSearchProps("poNumber"),
        render: (val,data) => {
          return data.poNumber ? data.poNumber : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>GRN Number</div>,
        dataIndex: "grnNo",
        ...getColumnSearchProps("grnNo"),
        render: (val,data) => {
          return data.grnNo ? data.grnNo : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>Vendor</div>,
        dataIndex: "vendorName",
        ...getColumnSearchProps("vendorName"),
        render: (val,data) => {
          return data.vendorName ? data.vendorName : "-";
        }
      }, 
      {
        title: <div style={{textAlign:"center"}}>Material Type</div>,
        dataIndex: 'materialType',
        ...getColumnSearchProps("materialType"),
        render: (val,data) => {
          return data.materialType ? data.materialType : "-";
        }
       
      }, {
        title: <div style={{textAlign:"center"}}>Contact Person</div>,
        dataIndex: "contact_person",
        ...getColumnSearchProps("contact_person"),
        render: (val,data) => {
          return data.contact_person ? data.contact_person : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>GRN Date</div>,
        align:'center',
        dataIndex: "grn_date",
        render: (val,data) => {
          return data.grn_date ?moment( data.grn_date).format('YYYY-MM-DD') : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>Status</div>,
        dataIndex: "status",
        render: (val,data) => {
          return data.status ? data.status : "-";
        }
      },
      {
        title: <div style={{textAlign:'center'}}>Action</div>,
        dataIndex: 'action',
        align:"center",
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
  
    const onBarcodeModalCancel = () => {
      setBarcode("");
      setBarcodeModal(false);
    };
  
    const closeWindow = () => {
      setBarcode("");
      window.close();
    };
  
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

        <Modal
          open={barcodeModal}
          footer={[]}
          title={barcodeInfo === "m3ItemCode" ? "M3 Item Code" : "Request Number"}
        >
          <div style={{ textAlign: "center" }}>
            <Barcode value={barcode} height={30} />
          </div>
        </Modal>
        <Table
        columns={tableColumns}
        dataSource={filterData}
        />
      </Card>
    );
  };
  
  export default GRNView;
  