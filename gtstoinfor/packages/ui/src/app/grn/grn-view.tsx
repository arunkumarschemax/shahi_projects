import {BarcodeOutlined,CaretDownOutlined,CaretRightOutlined,EyeOutlined,InfoCircleOutlined,PrinterOutlined,SearchOutlined,UndoOutlined,} from "@ant-design/icons";
import {Button,Card,Col,Collapse,DatePicker,Divider,Form,Input,Modal,Row,Segmented,Select,Space,Table,Tag,} from "antd";
  import style from "antd/es/alert/style";
  import { ColumnProps } from "antd/es/table";
  import moment from "moment";
  import React, { useEffect, useRef } from "react";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import Highlighter from "react-highlight-words";
import { GRNTypeEnum, GRNTypeEnumDisplay, GrnReq, ItemTypeEnumDisplay, PurchaseOrderStatus } from "@project-management-system/shared-models";
import { GRNService } from "@project-management-system/shared-services";
import Barcode from "react-barcode";
import { useIAMClientState } from "../common/iam-client-react";
  
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  
  export const GRNView = () => {
    const [page, setPage] = React.useState(1);
    const grnService = new GRNService();
    const [grn, setGrn] = useState<any[]>([]);
    const navigate = useNavigate();
    const logInUser = localStorage.getItem("userName");
    const [barcodeModal, setBarcodeModal] = useState<boolean>(false);
    const [barcode, setBarcode] = useState<string>(null);
    const [tableData, setTableData] = useState<any[]>([]);
    const [form] = Form.useForm();
    const [filterData, setFilterData] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [grnNoFilter, setGrnNoFilter] = useState<any[]>([])
    const [poNoFilter, setPONoFilter] = useState<any[]>([])
    const { IAMClientAuthContext, dispatch } = useIAMClientState();

  
    useEffect(() => {
      // getStyle();
      console.log(IAMClientAuthContext.user)
      getAll();
      grnNoData()
      poNoData()
    }, []);
  
    useEffect(() => {
      if (data) {
      // console.log(tableData)
        setTableData(data);
      }
    }, [data]);
  
  
    const getAll = () => {
      const req = new GrnReq()
      if (form.getFieldValue('grnNo') !== undefined) {
        req.grnNo = form.getFieldValue('grnNo')
      }
      if (form.getFieldValue('poNumber') !== undefined) {
        req.poNumber = form.getFieldValue('poNumber')
      }
      if (form.getFieldValue('status') !== undefined) {
        req.status = form.getFieldValue('status')
      }
      if (form.getFieldValue('grnDate') !== undefined) {
        req.fromDate = (form.getFieldValue('grnDate')[0]).format('YYYY-MM-DD')
      }
      if (form.getFieldValue('grnDate') !== undefined) {
      req.toDate = (form.getFieldValue('grnDate')[1]).format('YYYY-MM-DD')
      }
      req.extRefNumber = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
      grnService.getAllGrn(req).then((res) => {
        if (res.status) {
          setData(res.data);
          setFilterData(res.data);
        }
      });
    };

    const grnNoData =()=>{
      grnService.getGRNNoData().then((res)=>{
        if(res.status){
          setGrnNoFilter(res.data)
        }
      })
    }

    const poNoData =()=>{
      grnService.getPONoData().then((res)=>{
        if(res.status){
          setPONoFilter(res.data)
        }
      })
    }

   const details =(rowData) =>{
    const navigateData = filterData.filter(req => req.grnId === rowData)
    return navigate(`/grn-detail-view`, { state: { data: navigateData } });
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
        sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
        sortDirections: ["descend", "ascend"],
        render: (val,data) => {
          return data.poNumber ? data.poNumber : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>GRN Number</div>,
        dataIndex: "grnNo",
        ...getColumnSearchProps("grnNo"),
        sorter: (a, b) => a.grnNo.localeCompare(b.grnNo),
        sortDirections: ["descend", "ascend"],
        render: (val,data) => {
          return data.grnNo ? data.grnNo : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>Vendor</div>,
        dataIndex: "vendor",
        ...getColumnSearchProps("vendor"),
        sorter: (a, b) => a.vendor.localeCompare(b.vendor),
        sortDirections: ["descend", "ascend"],
        render: (val,data) => {
          return data.vendor ? data.vendor : "-";
        }
      }, 
      {
        title: <div style={{textAlign:"center"}}>Invoice No</div>,
        dataIndex: "invoiceNo",
        ...getColumnSearchProps("invoiceNo"),
        sorter: (a, b) => a.invoiceNo.localeCompare(b.invoiceNo),
        sortDirections: ["descend", "ascend"],
        render: (val,data) => {
          return data.invoiceNo ? data.invoiceNo : "-";
        }
      }, 
      {
        title: <div style={{textAlign:"center"}}>Invoice Date</div>,
        align:'center',
        dataIndex: "invoiceDate",
        render: (val,data) => {
          return data.invoiceDate ?moment( data.invoiceDate).format('YYYY-MM-DD') : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>Item Type</div>,
        dataIndex: 'itemType',
        // ...getColumnSearchProps("itemType"),
        render: (text) => {
          const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
          return EnumObj ? EnumObj.displayVal : text;
        },
        // filters: [
        //   {
        //     text: 'FABRIC',
        //     value: 'FABRIC',
        //   },
        //   {
        //     text: 'TRIM',
        //     value: 'TRIM',
        //   }
        // ],
        // onFilter: (value,record) =>{ return record.itemType === value}  
      },
       {
        title: <div style={{textAlign:"center"}}>GRN Type</div>,
        dataIndex: "grnType",
        ...getColumnSearchProps("grnType"),
        render: (text) => {
          const EnumObj = GRNTypeEnumDisplay.find((item) => item.name === text);
          return EnumObj ? EnumObj.displayVal : text;
        },
      },
      {
        title: <div style={{textAlign:"center"}}>GRN Date</div>,
        align:'center',
        dataIndex: "grnDate",
        render: (val,data) => {
          return data.grnDate ?moment( data.grnDate).format('YYYY-MM-DD') : "-";
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
            <Button title={"Detail View"} onClick={() => details(rowData.grnId)}>
              <EyeOutlined />
            </Button>
          </span>
                 </>
          )
        }
      },
    ];

    const onReset = ()=>{
      form.resetFields()
      getAll()
    }
  
    return (
      <Card headStyle={{ backgroundColor: "#69c0ff", border: 0 }} title="GRN List" 
            extra={<span><Button onClick={() => navigate("/grn-form")}>New</Button></span>}
      >
        <Form form={form} layout="vertical" onFinish={getAll}>
          <Row gutter={16}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }}>
              <Form.Item name="poNumber" label="PO Number">
                <Select showSearch allowClear optionFilterProp="children" placeholder="Select PO Number">
                  {poNoFilter.map((e) => (
                    <Option key={e.poNumber} value={e.poNumber}>
                      {e.poNumber}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }}>
              <Form.Item name="grnNo" label="GRN No">
                <Select showSearch allowClear optionFilterProp="children" placeholder="Select GRB No">
                  {grnNoFilter.map((e) => (
                    <Option key={e.grnId} value={e.grnNo}>
                      {e.grnNo}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }}>
              <Form.Item label='GRN Date' name='grnDate'>
                <RangePicker />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }}>
              <Form.Item name="status" label="Status">
                <Select showSearch allowClear placeholder="Select Status" optionFilterProp="children">
                  {Object.values(PurchaseOrderStatus).map(e => (
                    <Option key={e} value={e}>{e}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }} style={{marginTop:"18px"}}>
              <Form.Item>
                <Button icon={<SearchOutlined />} htmlType="submit" type="primary" style={{ marginLeft: 50,marginTop:5 }}>Submit</Button>
                <Button danger icon={<UndoOutlined />} onClick={onReset} style={{ marginLeft: 30 }}>Reset</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table columns={tableColumns} dataSource={filterData} />
      </Card>
    );
    
  };
  
  export default GRNView;
  