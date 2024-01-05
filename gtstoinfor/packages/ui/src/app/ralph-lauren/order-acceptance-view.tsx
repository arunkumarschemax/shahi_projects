import { Button, Card, Col, DatePicker, Form, Input, InputRef, Modal, Popconfirm, Row, Select, Space, Table, Tag, Tooltip, Typography, message } from 'antd';
import { useEffect, useRef, useState, } from 'react';
import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { RLOrdersService } from '@project-management-system/shared-services';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { ColumnType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { OrderAcceptanceRequest, PoOrderFilter } from '@project-management-system/shared-models';
import { useIAMClientState } from '../nike/iam-client-react';


const OrderAcceptanceGrid = () => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [gridData, setGridData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [item, setItem] = useState<any[]>([]);
  let navigate = useNavigate()
  const service = new RLOrdersService();
  const [orderData, setOrderData] = useState<any>([]);
  const { IAMClientAuthContext, dispatch } = useIAMClientState();
  const [itemNoValues, setItemNoValues] = useState({});


  const { Text } = Typography

  useEffect(() => {
    getorderData();
  }, []);

  const getorderData = () => {
    const req = new PoOrderFilter();
    if (form.getFieldValue("poNumber") !== undefined) {
      req.poNumber = form.getFieldValue("poNumber");
    }
    if (form.getFieldValue("season") !== undefined) {
      req.season = form.getFieldValue("season");
    }
    if (form.getFieldValue("material") !== undefined) {
      req.material = form.getFieldValue("material");
    }
    req.externalRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo : null

    service.getorderDataforAcceptance(req).then((res) => {
      if (res.status) {
        setOrderData(res.data);
      }
    });
  };


  const onReset = () => {
    form.resetFields();
    setSelectedEstimatedFromDate(undefined);
    // getData();
  }

  const isActionButtonEnabled = (index) => {
    return (
      itemNoValues[index] &&
      itemNoValues[index].trim() !== ""
    );
  };
  const handleItemNoChange = (value, record, index) => {
    const formValues = form.getFieldsValue();
    const itemNoValue = formValues[index]?.itemNo;
  
    console.log("Item No from form:", itemNoValue);
  
    setItemNoValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };
 

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters)
              setSearchedColumn(dataIndex)
              confirm({ closeDropdown: true })
            }
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) : false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  // const createCOLine = (record,index) => {
  //   const formValues = form.getFieldsValue();
  //   const itemNoValue = formValues[index]?.itemNo;
  //   console.log(record)
  //   const req = new OrderAcceptanceRequest();
  //   req.purchaseOrderNumber = record.poNumber
  //   req.poLineItemNumber = record.poItem
  //   req.itemNo = itemNoValue
  //   req.buyer = 'RL-U12'
  //   service.coLineCreationReq(req).then((res) => {
  //     if (res.status) {
  //       getorderData();
  //       setItemNoValues(''); // Set itemNoValues to an empty object
  //       message.success(res.internalMessage);
  //     } else {
  //       message.error(res.internalMessage);
  //     }
  //   });
  // }
  const user = JSON.parse(localStorage.getItem("currentUser")).user.userName
  const createCOLine = (record, index) => {
    const formValues = form.getFieldsValue();
    const itemNoValue = formValues[index]?.itemNo;
    console.log(record);
    
    const req = new OrderAcceptanceRequest();
    req.purchaseOrderNumber = record.poNumber;
    req.poLineItemNumber = record.poItem;
    req.itemNo = itemNoValue;
    req.buyer = 'RL-U12';
    req.createdUser = user
    
    service.coLineCreationReq(req).then((res) => {
      if (res.status) {
        getorderData();
        // Reset the form field related to the "Item No" input
        form.setFieldsValue({ [index]: { itemNo: undefined } });
        message.success(res.internalMessage);
      } else {
        message.error(res.internalMessage);
      }
    });
  };

  const columns: any = [
    {
      title: "S.No",
      key: "sno",
      width: 50,
      render: (text, object, index) => (page - 1) * pageSize + (index + 1),
      fixed: "left",
    },
    {
      title: "PO Number",
      dataIndex: "poNumber",
      width: 130,
      sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
      sortDirections: ["ascend", "descend"],
      fixed: "left",
      // ...getColumnSearchProps('poNumber'),
      render: (text) => text ? text : "-"
    },
    {
      title: "PO Item",
      dataIndex: "poItem",
      width: 90,
      // sorter: (a, b) => a.poItem.localeCompare(b.poItem),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps('poItem'),
      render: (text) => text ? text : "-"

    },
    {
      title: "Material Number",
      dataIndex: "materialNo",
      width: 150,
      sorter: (a, b) => a.materialNo.localeCompare(b.materialNo),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps('materialNo'),
      render: (text) => text ? text : "-"
    },
    {
      title: "Season Code",
      dataIndex: "seasonCode",
      width: 130,
      sorter: (a, b) => a.materialNo.localeCompare(b.materialNo),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps('seasonCode'),
      render: (text) => text ? text : "-",
      
    },
    // {
    //   title: "Address",
    //   dataIndex: "shipToAddress",
    //   width: 600,
    //   sorter: (a, b) => a.shipToAddress.localeCompare(b.shipToAddress),
    //   sortDirections: ["ascend", "descend"],
    //   ...getColumnSearchProps('shipToAddress'),
    //   render: (text) => text ? text : "-"
    // },
    {
      title: "Address",
      dataIndex: "shipToAddress",
      width: 200,
      sorter: (a, b) => a.shipToAddress.localeCompare(b.shipToAddress),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps('shipToAddress'),
      render: (text) => (
        <Tooltip title={text || "-"}>
          {text ? `${text.substring(0, 20)}...` : "-"}
        </Tooltip>
      ),
    },
    // {
    //   title: "Agent",
    //   dataIndex: "agent",
    //   align: "center",
    //   width: 400,
    //   sorter: (a, b) => a.agent.localeCompare(b.agent),
    //   sortDirections: ["ascend", "descend"],
    //   ...getColumnSearchProps('agent'),
    //   render: (text) => text ? text : "-"

    // },
    {
      title: "Agent",
      dataIndex: "agent",
      width: 200,
      sorter: (a, b) => a.agent.localeCompare(b.agent),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps('agent'),
      render: (text) => (
        <Tooltip title={text || "-"}>
          {text ? `${text.substring(0, 20)}...` : "-"}
        </Tooltip>
      ),
    },
    {
      title: "Purchase Group",
      dataIndex: "purchaseGroup",
      align: "center",
      width: 200,
      sorter: (a, b) => a.purchaseGroup.localeCompare(b.purchaseGroup),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps('purchaseGroup'),
      render: (text) => text ? text : "-"

    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      align: "center",
      width: 90,
      // sorter: (a, b) => a.supplier.localeCompare(b.supplier),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps('supplier'),
      render: (text) => text ? text : "-"

    },
    {
      title: "Revision No",
      dataIndex: "revisionNo",
      align: "center",
      width: 90,
      // sorter: (a, b) => a.revisionNo.localeCompare(b.revisionNo),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps('revisionNo'),
      render: (text) => text ? text : "-"

    },
    //   {
    //     title: "Color",
    //     dataIndex: "color",
    //     align: "center",
    //     width: 90,
    //     sorter: (a, b) => a.color.localeCompare(b.color),
    //     sortDirections: ["ascend", "descend"],
    //   },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      width: 90,
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["ascend", "descend"],
      render: (text) => text ? text : "-"
    },
  
    {
      title: "Item No",
      dataIndex: "itemNo",
      width: 150,
      render: (text, record, index) => {
        return (
          <Form.Item name={[index, 'itemNo']}>
            
            <Input
              placeholder="Enter Item No"
              onChange={(e) => handleItemNoChange(e.target.value, record, index)}
              disabled={record.itemStatus == 'ACCEPTED' ? true : false}
            />
          </Form.Item>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 100,
      fixed: 'right',
      render: (value, record, index) => {
        const isEnabled = isActionButtonEnabled(index);
        return (
          <Button
            style={{ position: "relative", top: "-7.5px" }}
            onClick={() => createCOLine(record, index)}
            disabled={record.itemStatus === 'ACCEPTED' ? true : !isEnabled}
          >
            {record.itemStatus === 'ACCEPTED' ? 'Accepted' : 'Accept'}
          </Button>
        );
      },
    },
  ];

  //   const handleExport = (e: any) => {
  //     e.preventDefault();

  //     const currentDate = new Date()
  //       .toISOString()
  //       .slice(0, 10)
  //       .split("-")
  //       .join("/");

  //     let exportingColumns: IExcelColumn[] = []
  //     let i = 1;

  //     exportingColumns = [
  //       // { title: '#', dataIndex: 'id' ,render: (value, record, index) => {
  //       //     return index + 1; 
  //       //   }},
  //       // { title: 'Trim Order Id', dataIndex: 'trim_order_id' },
  //       { title: 'Order No', dataIndex: 'order_no' },
  //       { title: 'Year', dataIndex: 'year' },
  //       { title: 'Revision No', dataIndex: 'revision_no' },
  //       { title: 'Planning ssn', dataIndex: 'planning_ssn' },
  //       { title: 'Global Business Unit', dataIndex: 'global_business_unit' },
  //       { title: 'Business Unit', dataIndex: 'business_unit' },
  //       // { title: 'Item Brand', dataIndex: 'item_brand' },
  //       { title: 'Department', dataIndex: 'department' },
  //       { title: 'Revised Date', dataIndex: 'revised_date' },
  //       { title: 'Document Status', dataIndex: 'document_status' },
  //       { title: 'Status', dataIndex: 'answered_status' },
  //       { title: 'Vendor Person InCharge', dataIndex: 'vendor_person_incharge' },
  //       { title: 'Decision Date', dataIndex: 'decision_date' },
  //       { title: 'Payment Terms', dataIndex: 'payment_terms' },
  //       { title: 'Eta Wh', dataIndex: 'eta_wh' },
  //       { title: 'Approver', dataIndex: 'approver' },
  //       { title: 'Approval Date', dataIndex: 'approval_date' },
  //       { title: 'Order Conditions', dataIndex: 'order_conditions' },
  //       { title: 'Remarks', dataIndex: 'remark' },
  //       { title: 'Raw Material Code', dataIndex: 'raw_material_code' },
  //       { title: 'Supplier Raw Material Code', dataIndex: 'supplier_raw_material_code' },
  //       { title: 'Supplier Raw Material', dataIndex: 'supplier_raw_material' },
  //       // { title: 'Vendor Code', dataIndex: 'vendor_code' },
  //       // { title: 'Vendor ', dataIndex: 'vendor' },
  //       { title: 'Management Factory Code  ', dataIndex: 'management_factory_code' },
  //       { title: 'Management Factory ', dataIndex: 'management_factory' },
  //       { title: 'Branch Factory Code ', dataIndex: 'branch_factory_code' },
  //       { title: 'Branch Factory ', dataIndex: 'branch_factory' },
  //       { title: 'Order Plan Number ', dataIndex: 'order_plan_number' },
  //       { title: 'Item Code ', dataIndex: 'item_code' },
  //       { title: 'Item  ', dataIndex: 'item' },
  //       { title: 'Representative Sample Code ', dataIndex: 'representative_sample_code' },
  //       { title: 'Representative Sample', dataIndex: 'representative_Sample' },
  //       { title: 'Color Code', dataIndex: 'color_code' },
  //       { title: 'Color', dataIndex: 'color' },
  //       { title: 'Pattern Dimension Code', dataIndex: 'pattern_dimension_code' },
  //       { title: 'Size Code', dataIndex: 'size_code' },
  //       { title: 'Size ', dataIndex: 'size' },
  //       { title: 'Order Quantity Pcs', dataIndex: 'order_qty_pcs' },
  //       { title: 'Arrangement By', dataIndex: 'arrangement_by' },
  //       { title: 'Trim Description', dataIndex: 'trim_description' },
  //       { title: 'Trim Item No', dataIndex: 'trim_item_no' },
  //       { title: 'Trim Supplier', dataIndex: 'trim_supplier' },
  //       { title: 'Status', dataIndex: 'answered_status' },


  //       // { title: 'Currency', dataIndex: 'currency' },
  //       // { title: 'Cost', dataIndex: 'cost' },
  //     ]
  //     const excel = new Excel();
  //     excel.addSheet("Sheet1");
  //     excel.addRow();
  //     excel.addColumns(exportingColumns);
  //     excel.addDataSource(gridData);
  //     excel.saveAs(`Order Acceptance-Report-${currentDate}.xlsx`);
  //   };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <div>
      <Card
        title="Order Acceptance"
        extra={filteredData.length > 0 ? (<Button
          type="default"
          style={{ color: 'green' }}
          //   onClick={handleExport}
          icon={<FileExcelFilled />}>Download Excel</Button>) : null}>


        <Form
          onFinish={getorderData}
          form={form}
        // layout='vertical'
        >
          <Row gutter={24}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 6 }}
            >
              <Form.Item name="poNumber" label="PO Number">
                <Select
                  showSearch
                  placeholder="Select PO number"
                  optionFilterProp="children"
                  allowClear
                >
                  {orderData.map((inc: any) => {
                    return (
                      <Option key={inc.poNumber} value={inc.poNumber}>
                        {inc.poNumber}
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
              <Form.Item name="material" label="Material Number">
               <Input  placeholder="Material Number"/>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 6 }}
            >
              <Form.Item name="season" label="Season Code">
               <Input  placeholder="Enter Season"/>
              </Form.Item>
            </Col>
            <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
              xl={{ span: 4 }}
            >
              <Form.Item>
                <Button
                  style={{ marginLeft: 20 }}
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  type="primary"
                >
                  SEARCH
                </Button>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 5 }}
              lg={{ span: 5 }}
              xl={{ span: 4 }}
            >
              <Form.Item>
                <Button
                  style={{ marginLeft: 70 }}
                  htmlType="submit"
                  type="primary"
                  onClick={onReset}
                  icon={<UndoOutlined />}
                >
                  Reset
                </Button>
              </Form.Item>
            </Col>
            </Row>
          </Row>
        </Form>
        <Form form={form}>
        <Table columns={columns} dataSource={orderData} scroll={{ x: 1500, y: 500 }} className="custom-table-wrapper"
        
          bordered
          size='small'
          pagination={{
            pageSize: 50,
            onChange(current, pageSize) {
              setPage(current);
              setPageSize(pageSize);
            },
          }}
        />
         </Form>
      </Card>
    </div>
  )
}


export default OrderAcceptanceGrid;