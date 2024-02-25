import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    CaretRightOutlined,
    DownloadOutlined,
    EyeOutlined,
    PrinterOutlined,
    SearchOutlined,
    UndoOutlined
  } from "@ant-design/icons";
  import {
    Allocatematerial,
    BomStatusEnum,
    ItemTypeEnumDisplay,
    LifeCycleStatusDisplay,
    LifeCycleStatusEnum,
    MenusAndScopesEnum,
    SampleFilterRequest,
    SampleIdRequest,
    SampleItemIdRequest,
    allocateMaterialItems,
    lifeCycleStatusReq
  } from "@project-management-system/shared-models";
  import {
    SampleDevelopmentService,
    StyleService
  } from "@project-management-system/shared-services";
  import {
    Button,
    Card,
    Checkbox,
    Col,
    Collapse,
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
    message
  } from "antd";
  import moment from "moment";
  import React, { useEffect, useRef, useState } from "react";
  import Barcode from "react-barcode";
  import Highlighter from "react-highlight-words";
  import { Link, useNavigate } from "react-router-dom";
  import AlertMessages from "../common/common-functions/alert-messages";
  import { useIAMClientState } from "../common/iam-client-react";
  import RolePermission from "../role-permissions";
  import PickListPrint, { getCssFromComponent } from "./pick-list-print";
  // import axios from "axios";
  import { config } from "packages/libs/shared-services/config";
  import JSZip from 'jszip';
  import { saveAs } from 'file-saver';
  import axios from "axios";
  
  const { Option } = Select;
  
  export const ReceiveSampleOrders = () => {
    const [keyUpdate, setKeyUpdate] = useState<number>(1);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [data, setData] = useState<any[]>([]);
    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const service = new SampleDevelopmentService();

    useEffect(() => {
        getData();
      }, []);

    const getData = () => {
        service.getAllActiveSampleOrders().then((res)=>{
            if(res.status){
                setData(res.data);
            }
            else{
                setData([]);
                AlertMessages.getWarningMessage("No data found")
            }
        }).catch(err => {
            AlertMessages.getErrorMessage(err.message);
            setData([]);
          })
    }
    const handleAcceptOrder = (record) =>{
        console.log(record);
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
          // width: '70px',buyerId:rowData.buyerId
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
          align: 'center',
        },
        {
          title: "Request No",
          dataIndex: "requestNo",
          ...getColumnSearchProps("requestNo"),
          align: 'center',
    
        },
        {
          title: "Buyer",
          dataIndex: "buyer",
          ...getColumnSearchProps("buyer"),
          align: 'center',
    
        },
    
        {
          title: "Style",
          dataIndex: "style",
          ...getColumnSearchProps("style"),
          align: 'center',
    
        },
        {
          title: "PCH",
          dataIndex: "pch",
          ...getColumnSearchProps("pch"),
          align: 'center',
        },
        {
          title: "Brand",
          dataIndex: "brand",
          ...getColumnSearchProps("brand"),
          fixed: 'center',
        },
        {
          title: "Location",
          dataIndex: "location",
          ...getColumnSearchProps("style"),
          fixed: 'center',
        },
        {
            title: "Status",
            dataIndex: "status",
          ...getColumnSearchProps("status"),
        },
        {
          title: "Action",
          dataIndex: "action",
          align: 'center',
          fixed: 'center',
          render: (text, record) => {
            return (
              <>
              <span style={{ paddingRight: 20 }}  >
                {
                  <Tooltip title='Accept Order'>""
                  <ArrowRightOutlined onClick={() => handleAcceptOrder(record)} style={{ fontSize: '15px', marginLeft: '-5px', color: 'blue' }} />
                </Tooltip>
                }
              </span>
                {Number(record.tobeProcured) > 0 && record.status != BomStatusEnum.ALLOCATED && Number(record.resltantavaliblequantity) > 0 ? <Tag style={{ backgroundColor: '#03a9f46b', color: "black" }}><b>Need to allocate</b></Tag> : (Number(record.resltantavaliblequantity) <= 0 && record.status != BomStatusEnum.ALLOCATED) ? <Tag style={{ backgroundColor: '#41f4036b', color: "black" }}><b>Need to Procure</b></Tag> : record.status === BomStatusEnum.ALLOCATED ? <Tag>Allocated</Tag> : ""}
              </>
            );
          },
        },
      ];
    return (
        <Card headStyle={{ backgroundColor: "#69c0ff", border: 0 }} title="Receive Sample Requests" >
            <Table
            scroll={{ x: "max-content" }}
            key={keyUpdate}
            rowKey={record => record.sampleReqId}
            columns={Columns}
            dataSource={data}
            className="custom-table-wrapper"
            pagination={false}
            style={{ width: '100%' }}
            />
        </Card>
    )
  }
export default ReceiveSampleOrders;
