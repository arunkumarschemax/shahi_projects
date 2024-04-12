import { Alert, Button, Card, Col, DatePicker, Form, Input, Row, Select, Space, Table, Tabs, Tooltip, Typography, message } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import { HbService, OrdersService, RLOrdersService, SanmarService } from "@project-management-system/shared-services"
import React, { useEffect, useRef, useState } from "react"
import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons"
import AlertMessages from "../common/common-functions/alert-messages"
import moment from "moment"
import { Excel } from "antd-table-saveas-excel"
import { HbPoOrderFilter, PoOrderFilter, SanmarOrderFilter } from "@project-management-system/shared-models"
import Highlighter from "react-highlight-words"



export const SanmarOrderComparisionReport = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState<number>(1);
 const service = new SanmarService();
  const { Text } = Typography;
  const [pageSize, setPageSize] = useState(10);
  const [filterData, setFilterData] = useState([]);
  const [orderData, setOrderData] = useState<any>([]);
  const [poNumberData, setPoNumberData] = useState<any>([]);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const { RangePicker } = DatePicker;



  const { Option } = Select;

  useEffect(() => {
    getordercomparationData();
    getPoNumber();
  }, []);
  
  const getordercomparationData = () => {
    const req = new SanmarOrderFilter();

    if (form.getFieldValue("poNumber") !== undefined) {
      req.buyerPo = form.getFieldValue("poNumber");
    }
    if (form.getFieldValue('deliveryDate') !== undefined) {
      req.deliveryDateStartDate = (form.getFieldValue('deliveryDate')[0]).format('YYYY-MM-DD');
    }
    if (form.getFieldValue('deliveryDate') !== undefined) {
      req.deliveryDateEndDate = (form.getFieldValue('deliveryDate')[1]).format('YYYY-MM-DD');
    }
    
    if (form.getFieldValue("style") !== undefined) {
      req.style = form.getFieldValue("style");
    }
    if (form.getFieldValue("color") !== undefined) {
      req.color = form.getFieldValue("color");
    }

  

    service.getordercomparationData(req).then((res) => {
      if (res.status) {
        setOrderData(res.data);
        setFilterData(res.data);
      } else {
        setOrderData([]);
        setFilterData([]);
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
       setOrderData([]);
        setFilterData([]);
       AlertMessages.getErrorMessage(err.message);
     })
  };

  const getPoNumber = () => {

    service.getCustomerPoNumber().then((res) => {
      if (res.status) {
        setPoNumberData(res.data);
      
      } else {
        setPoNumberData([]);
        // AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
       setPoNumberData([]);
      //  AlertMessages.getErrorMessage(err.message);
     })
  };

  const onReset = () => {
    form.resetFields();
    getordercomparationData();
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


  
  // const getSizeWiseHeaders = (data) => {
  //   const sizeHeaders = new Set<string>();
  //   data?.forEach((rec) =>
  //     rec.sizeWiseData?.forEach((version) => {
  //       sizeHeaders.add("" + version.size);
  //     })
  //   );
  //   return Array.from(sizeHeaders);
  // };
  // const getMap = (data) => {
  //   const sizeWiseMap = new Map<string, Map<string, number>>();
  //   data?.forEach((rec) => {
  //     if (!sizeWiseMap.has(rec.poNumber)) {
  //       sizeWiseMap.set(rec.poNumber, new Map<string, number>());
  //     }
  //     rec.sizeWiseData?.forEach((version) => {
  //       sizeWiseMap.get(rec.poNumber).set(" " + version.size, version.TotalQty);
  //     });
  //   });
  //   return sizeWiseMap;
  // };

 
  const renderReport = (data) => {
    // const sizeHeaders = getSizeWiseHeaders(data);
    // const sizeWiseMap = getMap(data);

    const columns: any = [
      {
        title: "S.No",
        key: "sno",
        width: 50,
        render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        // fixed: "left",
      },
      {
        title: "Customer PO",
        dataIndex: "custPo",
        width: 90,
        sorter: (a, b) => a.custPo.localeCompare(b.custPo),
        sortDirections: ["ascend", "descend"],
        // fixed: "left",
        // ...getColumnSearchProps('custPo'),
        render: (text) => text ? text : "-"
      },
      {
        title: "Style",
        dataIndex: "style",
        width: 90,
        sorter: (a, b) => a.style.localeCompare(b.style),
        sortDirections: ["ascend", "descend"],
        // fixed: "left",
        // ...getColumnSearchProps('style'),
        render: (text) => text ? text : "-"
      },
      {
        title: "Color",
        dataIndex: "color",
        width: 90,
        sorter: (a, b) => a.color.localeCompare(b.color),
        sortDirections: ["ascend", "descend"],
        // fixed: "left",
        // ...getColumnSearchProps('color'),
        render: (text) => text ? text : "-"
      },
 
      
      {
        title: "Size",
        dataIndex: "size",
        width: 90,
        sorter: (a, b) => a.size.localeCompare(b.size),
        sortDirections: ["ascend", "descend"],
        ...getColumnSearchProps('size'),
        render: (text) => text ? text : "-"
      },
      
      {
        title: "Unit Price",
        dataIndex: "",
        width: 90,
        children: [
                {
                  title: 'Old Value',
                  dataIndex: 'oldPrice',
                  key: '',
                  width: 100,
                  className: "center",
                  render: (text) => text ? text : "-"
                 
                },
                {
                  title: 'New Value',
                  dataIndex: 'newPrice',
                  key: '',
                  width: 100,
                  className: "center",
                  render: (text) => text ? text : "-"
          
                },
        ]
     
      },
      {
        title: "Quantity",
        dataIndex: "",
        width: 90,
        // sorter: (a, b) => a.size.localeCompare(b.size),
        // sortDirections: ["ascend", "descend"],
        children: [
          {
            title: 'Old Value',
            dataIndex: 'oldQuantity',
            key: '',
            width: 100,
            className: "center",
            render: (text) => text ? text : "-"
           
          },
          {
            title: 'New Value',
            dataIndex: 'oldQuantity',
            key: '',
            width: 100,
            className: "center",
            render: (text) => text ? text : "-"
    
          },
  ]
      },
      {
        title: "Delivery Date",
        dataIndex: "",
        width: 90,
        // sorter: (a, b) => a.size.localeCompare(b.size),
        // sortDirections: ["ascend", "descend"],
        children: [
          {
            title: 'Old Value',
            dataIndex: 'oldDeliveryDate',
            key: '',
            width: 100,
            className: "center",
            render: (text) => text ? text : "-"
           
          },
          {
            title: 'New Value ',
            dataIndex: 'newDelieveryDate',
            key: '',
            width: 100,
            className: "center",
            render: (text) => text ? text : "-"
            // (moment(rec.last_modified_date).format('MM/DD/YYYY')
    
          },
  ]
        
      },
     
     

    ];

    
   

    const getRowClassName = (record) => {
      if (record.displayName) {
        return "colored-row";
      }
      return "";
    };

    return (
      <>

          <Table
            // loading={tableLoading}
            columns={columns}
            dataSource={filterData}
            size="small"
            // pagination={false}
            pagination={{
              pageSize: 50,
              onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize);
              },
            }}
            className="custom-table-wrapper"
            scroll={{ x: "max-content", y: 450 }}
            rowClassName={getRowClassName}
            bordered
          />
      
      </>
    );
  };

  const exportExcel = () => {
    const excel = new Excel();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format


    let rowIndex = 1;
    const excelColumnsWH: any[] = [];
    excelColumnsWH.push(
      {
        title: "#",
        // dataIndex: "sno", 
        width: 50,
        render: (text, object, index) => {
          if (index == orderData.length) {
            return null;
          } else {
            return rowIndex++;
          }
        }
      },
      {
        title: "Customer PO Number",
        dataIndex: "custPo",
        width: 90,
        render: (text) => text ? text : "-"
      },
 
      {
        title: "Style",
        dataIndex: "style",
        width: 90,
        render: (text) => text ? text : "-"
      },
      {
        title: "Color",
        dataIndex: "color",
        width: 90,
        render: (text) => text ? text : "-"
      },
      {
        title: "Size",
        dataIndex: "size",
        width: 90,
        render: (text) => text ? text : "-"
      },
      
      {
        title: " Unit Price",
        dataIndex: "",
        width: 90,
        children: [
                {
                  title: 'Old Value',
                  dataIndex: 'oldPrice',
                  key: '',
                  width: 100,
                  render: (text) => text ? text : "-"
                 
                },
                {
                  title: 'New Value',
                  dataIndex: 'newPrice',
                  key: '',
                  width: 100,
                  render: (text) => text ? text : "-"
          
                },
        ]
     
      },
      {
        title: "Quantity",
        dataIndex: "",
        width: 90,
        children: [
          {
            title: 'Old Value',
            dataIndex: 'oldQuantity',
            key: '',
            width: 100,
            render: (text) => text ? text : "-"
           
          },
          {
            title: 'New Value',
            dataIndex: 'oldQuantity',
            key: '',
            width: 100,
            render: (text) => text ? text : "-"
    
          },
  ]
      },
      {
        title: "Delivery Date",
        dataIndex: "",
        width: 90,
        children: [
          {
            title: 'Old Value',
            dataIndex: 'oldDeliveryDate',
            key: '',
            width: 100,
            render: (text) => text ? text : "-"
           
          },
          {
            title: 'New Value ',
            dataIndex: 'newDelieveryDate',
            key: '',
            width: 100,
            render: (text) => text ? text : "-"
    
          },
  ]
        
      },
    

    );
  
    

    excel
    .addSheet(`Order Comparision(${formattedDate})`)
    .addColumns(excelColumnsWH)
    .addDataSource(filterData, { str2num: false });

   excel.saveAs(`Order Comparision(${formattedDate}).xlsx`);;


  }

  

  return (
    <>
      <Card title="Order Comparsion Report" headStyle={{ fontWeight: "bold" }}
        extra={<Button
          type="default"
          style={{ color: 'green' }}
          onClick={exportExcel}
          icon={<FileExcelFilled />}>Download Excel</Button>}>
        <Form
        onFinish={getordercomparationData}
          form={form}
        layout='vertical'
        >
          <Row gutter={24}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4}}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item name="poNumber" label="Customer PO Number">
                <Select
                  showSearch
                  placeholder="Select Customer PO"
                  optionFilterProp="children"
                  allowClear
                >
                  {poNumberData.map((inc: any) => {
                    return (
                      <Option key={inc.buyer_po} value={inc.buyer_po}>
                        {inc.buyer_po}
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
                xl={{ span: 4 }}
              >
               <Form.Item label="Style" name="style"  >
                  <Input placeholder="Enter Style " allowClear />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 4 }}
                lg={{ span: 4 }}
                xl={{ span: 4 }}
              >
               <Form.Item label="Color" name="color"  >
                  <Input placeholder="Enter Color "  allowClear />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 4 }}
                lg={{ span: 4 }}
                xl={{ span: 4 }}
              >
               <Form.Item label="Delivery Date" name="deliveryDate"  >
                  <RangePicker style={{width:180}}   />
                </Form.Item>
              </Col>
            
            {/* <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
              xl={{ span: 4 }}
            >
              <Form.Item>
                <Button
                  style={{ marginLeft: 50 ,marginTop:20}}
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  type="primary"
                  // onClick={getordercomparationData}
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
                  style={{ marginLeft: 100,marginTop:20 }}
                  htmlType="submit"
                  type="primary"
                  onClick={onReset}
                  icon={<UndoOutlined />}
                >
                  Reset
                </Button>
              </Form.Item>
            </Col>
            </Row> */}
             {/* <Row> */}
             <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 5 }}
                lg={{ span: 5 }}
                xl={{ span: 4 }}
                style={{marginTop:23,marginLeft:60}}
              > 
                <Form.Item 
                // style={{marginTop:20,marginLeft:60}}
                >
                  <Button
                    htmlType="submit"
                    icon={<SearchOutlined />}
                    type="primary"
                  >
                    SEARCH
                  </Button>
                
                </Form.Item>
              {/* </Col> */}
              {/* <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 5 }}
                lg={{ span: 5 }}
                xl={{ span: 4 }}
              > */}
                <Form.Item 
                // style={{marginTop:20}}
                 style={{ marginLeft: 120 ,marginTop:-43}}
                >
                  <Button
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
            {/* </Row> */}
          {/* </Row> */}
        </Form>
        {/* <Table
                    columns={columns}
                    dataSource={orderData}
                    bordered
                    className="custom-table-wrapper"
                    pagination={{
                        pageSize: 50,
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize);
                        },
                    }}
                    scroll={{ x: 'max-content', y: 450 }}
                >
                </Table> */}
        {renderReport(filterData)}
      </Card>
    </>
  );

}

export default SanmarOrderComparisionReport