import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Table,
    Tooltip,
    message,
  } from "antd";
  import { useEffect, useRef, useState } from "react";
  import {
    HbService, SanmarService,
  } from "@project-management-system/shared-services";
  import React from "react";
  import {SearchOutlined, UndoOutlined } from "@ant-design/icons";
  import Highlighter from "react-highlight-words";
  import { useNavigate } from "react-router-dom";
  import {
    
    AlertMessages,
    SanmarOrderAcceptanceRequest,
    HbPoOrderFilter,
    SanmarOrderFilter,
  } from "@project-management-system/shared-models";
  import { useIAMClientState } from "../nike/iam-client-react";
  
  export function SanmarOrderAcceptanceGrid() {
    const service = new SanmarService();
    const navigate = useNavigate();
    const searchInput = useRef(null);
    const [orderData, setOrderData] = useState<any>([]);
    const [poLine, setPoLine] = useState<any>([]);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [custPo, setcustPo] = useState([]);
    const [form] = Form.useForm();
    const { Option } = Select;
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const { IAMClientAuthContext, dispatch } = useIAMClientState();
    const [itemNoValues, setItemNoValues] = useState({});
    const { RangePicker } = DatePicker;
    const [poNumber, setPoNumber] = useState([]);
  
    useEffect(() => {
      getorderacceptanceData();
      getCustomerPoNumber()
    }, []);
  
  
    const getorderacceptanceData = () => {
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
  
  
  
      service.getorderacceptanceData(req).then((res) => {
        if (res.status) {
          setOrderData(res.data);
          setFilterData(res.data);
        }
        else {
          setOrderData([]);
          setFilterData([])
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }).catch((err) => {
        console.log(err.message);
      });
    };
  
    console.log(form.getFieldValue("custPo"), "uuuuu")
    const getCustomerPoNumber = () => {
      service.getCustomerPoNumber().then((res) => {
        if (res.status) {
          setPoNumber(res.data);
        
        }
      });
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
  
  
    // const createCOLine = (record, index) => {
    //   const formValues = form.getFieldsValue();
    //   const itemNoValue = formValues[index]?.itemNo;
    //   console.log(record);
    //   const req = new SanmarOrderAcceptanceRequest();
    //   req.custPo = record.custPo;
    //   req.style = record.style;
    //   req.itemNo = itemNoValue;
    //   req.buyer = 'HB ATHLETIC';
    //   req.exitFactoryDate = record.exitFactoryDate;
     
  
  
    //   console.log("Request Payload:", req);
  
    //   service.hbCoLineCreationReq(req).then((res) => {
    //     if (res.status) {
    //       getHborderData();
    //       setItemNoValues({});
    //       form.setFieldsValue({ [index]: { itemNo: undefined } });
    //       message.success(res.internalMessage);
    //     } else {
    //       message.error(res.internalMessage);
    //     }
    //   });
    // };
  
    const createCOLine = (record, index) => {
      const formValues = form.getFieldsValue();
      const itemNoValue = formValues[index]?.itemNo;
      console.log(record,'hhhhhhhhhhhhhhhh');
      const req = new SanmarOrderAcceptanceRequest();
      req.buyerPo = record.buyerPo;
      req.style = record.style;
      req.itemNo = itemNoValue;
      req.buyer = 'SanMar Corporation';
      req.deliveryDate = record.deliveryDate;
    
      console.log("Request Payload:", req);
    
      service.sanmarCoLineCreationReq(req).then((res) => {
        if (res.status) {
            getorderacceptanceData();
          setItemNoValues({});
          form.setFieldsValue({ [index]: { itemNo: undefined } });
          message.success(res.internalMessage);
        } else {
          message.error(res.internalMessage);
        }
      });
    };
    
    const processData = (tableData: SanmarOrderAcceptanceRequest[]) => {
      const dataTobeReturned = [];
      const roleWiseMapData = new Map<string, SanmarOrderAcceptanceRequest[]>();
  
      tableData.forEach(rec => {
        const key = `${rec.buyerPo}_${rec.itemNo}_${rec.deliveryDate}`;
  
        if (!roleWiseMapData.has(key)) {
          roleWiseMapData.set(key, [rec]);
        } else {
          roleWiseMapData.get(key).push(rec);
        }
      });
  
      for (const [, roleData] of roleWiseMapData) {
        roleData.forEach((element, index) => {
          dataTobeReturned.push({
            ...element,
            rowSpan: index === 0 ? roleData.length : 0,
            groupedIds: roleData.map(rec => rec.id)
          });
        });
      }
  
      return dataTobeReturned;
    };
  
  
  
  
  
    const isActionButtonEnabled = (index) => {
      return (
        itemNoValues[index] &&
        itemNoValues[index].trim() !== ""
      );
    };
    const onReset = () => {
      form.resetFields();
      getorderacceptanceData();
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
  
    // const showModal1 = (record) => {
    //   setPoNumber(record);
    //   setIsModalOpen1(true);
    // };
  
    // const cancelHandle = () => {
    //   setIsModalOpen1(false);
    // };
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
            style={{ marginRight: 8 }}
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
  
    const setMoreData = (record) => {
      navigate("/ralph-lauren/order-data-detail-view", {
        state: { data: record },
      });
    };
    const getSizeWiseHeaders = (data) => {
      const sizeHeaders = new Set<string>();
      data?.forEach((rec) =>
        rec.sizeWiseData?.forEach((version) => {
          sizeHeaders.add("" + version.size);
        })
      );
      return Array.from(sizeHeaders);
    };
  
  
    const renderReport = (data) => {
      const sizeHeaders = getSizeWiseHeaders(data);
  
  
      const columns: any = [
        {
          title: "S.No",
          key: "sno",
          width: 50,
          render: (text, object, index) => (page - 1) * pageSize + (index + 1),
          fixed: "left",
        },
        {
          title: "BUYER PO",
          dataIndex: "buyerPo",
          width: 90,
         // sorter: (a, b) => a.custPo.localeCompare(b.custPo),
       //   sortDirections: ["ascend", "descend"],
         // render: (text) => text ? text : "-",
          render: (text, record, index) => {
            return {
              children: text,
              props: {
                rowSpan: record.rowSpan,
              },
            };
          },
  
          fixed: "left",
          // ...getColumnSearchProps('poNumber')
        },
        {
          title: "Style",
          dataIndex: "style",
          width: 90,
          // sorter: (a, b) => a.poLine.localeCompare(b.poLine),
          // sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          fixed: "left",
  
        },
        {
          title: "Color",
          dataIndex: "color",
          width: 90,
          // sorter: (a, b) => a.poLine.localeCompare(b.poLine),
          // sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          fixed: "left",
  
        },
  
        {
          title: "Delivery Date",
          dataIndex: "deliveryDate",
          width:90,
          fixed: "left",
  
          // sorter: (a, b) => a.material.localeCompare(b.material),
          // sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          // ...getColumnSearchProps('material')
  
        },
       
  
      ];
  
      sizeHeaders?.forEach(version => {
        columns.push({
          title: version,
          dataIndex: version,
          key: version,
          width: 70,
          align: 'center',
          children: [
            // {
            //   title: 'COLOR',
            //   dataIndex: '',
            //   key: '',
            //   width: 70,
            //   className: "center",
            //   render: (text, record) => {
            //     const sizeData = record.sizeWiseData.find(item => item.size === version);
            //     console.log()
            //     if (sizeData) {
            //       if (sizeData.size !== null) {
            //         const formattedQty = (sizeData?.color) ? (sizeData?.color) : "-"
  
            //         return (
            //           formattedQty
            //         );
            //       } else {
  
            //         return (
            //           '-'
            //         );
            //       }
            //     } else {
            //       return '-';
            //     }
            //   }
            // },
            {
              title: 'QUANTITY',
              dataIndex: '',
              key: '',
              width: 70,
              className: "center",
              render: (text, record) => {
                const sizeData = record.sizeWiseData.find(item => item.size === version);
                console.log()
                if (sizeData) {
                  if (sizeData.size !== null) {
                    const formattedQty = (sizeData?.quantity) ? (sizeData?.quantity) : "-"
  
                    return (
                      formattedQty
                    );
                  } else {
  
                    return (
                      '-'
                    );
                  }
                } else {
                  return '-';
                }
              }
            },
            {
              title: 'UNIT PRICE',
              dataIndex: '',
              key: '',
              width: 70,
              className: "center",
              render: (text, record) => {
                const sizeData = record.sizeWiseData.find(item => item.size === version);
                console.log()
                if (sizeData) {
                  if (sizeData.size !== null) {
                    const formattedQty = (sizeData?.unitPrice) ? (sizeData?.unitPrice) : "-"
                    // const formattedQty = (sizeData?.amount)
                    return (
                      formattedQty
                    );
                  } else {
  
                    return (
                      '-'
                    );
                  }
                } else {
                  return '-';
                }
              }
            },
          ]
        });
      })
  
      columns.push(
  
        
        
  
  
  
       
        {
          title: "Total Quantity",
          dataIndex: "",
          align: "right",
          width: 90,
          render: (text, record) => {
            let sum = 0;
            record.sizeWiseData.forEach((r) => {
              // Convert to number before summing
              sum += parseFloat(r.quantity) || 0;
            });
            return sum;
          },
        },
       
        {
          // title: "Address",
          title: <div style={{textAlign:"center"}}>Buyer Address</div>,
  
          dataIndex: "buyerAddress",
          width: 150,
         sorter: (a, b) => a.buyerAddress.localeCompare(b.buyerAddress),
         sortDirections: ["ascend", "descend"],
         ...getColumnSearchProps('buyerAddress'),
          render: (text) => (
            <Tooltip title={text || "-"}>
              {text ? `${text.substring(0, 20)}... `: "-"}
            </Tooltip>
          ),
        },
        {
          // title: "Address",
          title: <div style={{textAlign:"center"}}>Delivery Address</div>,
  
          dataIndex: "shipToAdd",
          width: 150,
         sorter: (a, b) => a.shipToAdd.localeCompare(b.shipToAdd),
         sortDirections: ["ascend", "descend"],
         ...getColumnSearchProps('shipToAdd'),
          render: (text) => (
            <Tooltip title={text || "-"}>
              {text ? `${text.substring(0, 20)}...` : "-"}
            </Tooltip>
          ),
        },
  
        {
          title: "Item status",
          dataIndex: "status",
          align: "center",
          width: 90,
          fixed:"right",
          render: (text, record) => {
            return {
              children: <div style={{ position: "relative", top: "-7px" }}>{text}</div>,
              props: {
                rowSpan: record.rowSpan,
              },
            };
          },
          filters: [
            {
              text: 'OPEN',
              value: 'OPEN',
            },
            {
              text: 'INPROGRESS',
              value: 'INPROGRESS',
            },
            {
              text: 'FAILED',
              value: 'FAILED',
            },
            {
              text: 'SUCCESS',
              value: 'SUCCESS',
            },
          
          ],
          onFilter: (value, record) => record.status.toLowerCase() === value.toLowerCase(),
        },
  
        {
          title: "Item No",
          dataIndex: "itemNo",
          width: 100,
          align: "center",
          fixed: 'right',
          render: (text, record, index) => {
            return {
              children: (
  
                <Form.Item name={[index, 'itemNo']}>
                  <Input
                    style={{ width: '95px' }}
                    placeholder="Enter Item No"
                    onChange={(e) => handleItemNoChange(e.target.value, record, index)}
                    // disabled={record.status == 'INPROGRESS' ? true : false}
                    disabled={record.status == 'OPEN' ? false : true}
                  />
                </Form.Item>
  
              ),
              props: {
                rowSpan: record.rowSpan,
              },
            };
          },
        },
  
        {
          title: "Action",
          dataIndex: "action",
          width: 80,
          align: "center",
          fixed: 'right',
          render: (text, record, index) => {
            const isEnabled = isActionButtonEnabled(index);
            return {
              children: (
                <Button
                  style={{ position: "relative", top: "-7.5px" }}
                  onClick={() => createCOLine(record, index)}
                //   disabled={record.status === 'INPROGRESS' ? true : !isEnabled}
                // >
                //   {record.status === 'INPROGRESS' ? "Accepted" : "Accept"}
                disabled={record.status === 'OPEN'  ? !isEnabled : true}
                >
                  {record.status === 'OPEN' ? "Accept" : "Accepted"}
                </Button>
              ),
              props: {
                rowSpan: record.rowSpan,
              },
            };
          },
        },
  
  
      );
  
      const getRowClassName = (record) => {
        if (record.displayName) {
          return "colored-row";
        }
        return "";
      };
  
      return (
        <>
          {/* {filterData.length > 0 ? ( */}
          <Form form={form}>
            <Table
              // loading={tableLoading}
              columns={columns}
              dataSource={processData(filterData)}
              size="small"
              pagination={false}
              // pagination={{
              //   pageSize: 50,
              //   onChange(current, pageSize) {
              //     setPage(current);
              //     setPageSize(pageSize);
              //   },
              // }}
              className="custom-table-wrapper"
              scroll={{ x: "max-content", y: 450 }}
              rowClassName={getRowClassName}
              bordered
            />
          </Form>
          {/* ) : (
            <Table size="large" />
          )} */}
        </>
      );
    };
  
    return (
      <>
        <Card title="Order Acceptance" headStyle={{ fontWeight: "bold" }}>
          <Form
            onFinish={getorderacceptanceData}
            form={form}
          layout='vertical'
          >
            <Row gutter={24}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 4 }}
                lg={{ span: 4 }}
                xl={{ span: 4 }}
              >
                <Form.Item name="poNumber" label="Buyer Po number">
                  <Select
                    showSearch
                    placeholder="Select Buyer Po "
                    optionFilterProp="children"
                    allowClear
                  >
                    {poNumber.map((inc: any) => {
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
                <Row>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 5 }}
                  lg={{ span: 5 }}
                  xl={{ span: 4 }}
                >
                  <Form.Item style={{marginTop:20,marginLeft:60}}>
                    <Button
                      htmlType="submit"
                      icon={<SearchOutlined />}
                      type="primary"
                      onClick={getorderacceptanceData}
                    >
                      Search
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
                  <Form.Item style={{marginTop:20}}>
                    <Button
                      style={{ marginLeft: 120 }}
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
  export default SanmarOrderAcceptanceGrid;