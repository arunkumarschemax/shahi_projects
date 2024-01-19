import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Table,
    Tooltip,
  } from "antd";
  import { useEffect, useRef, useState } from "react";
  import {
      CentricService,
    HbService,
    NikeService,
    RLOrdersService,
    SanmarService,
  } from "@project-management-system/shared-services";
  import React from "react";
  import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
  import Highlighter from "react-highlight-words";
  import { useNavigate } from "react-router-dom";
  import {
    AlertMessages,
    HbPoOrderFilter,
    OrderDataModel,
    PoOrderFilter,
    SanmarOrderFilter,
  } from "@project-management-system/shared-models";
  import { ColumnsType } from "antd/es/table";
  import { useIAMClientState } from "../nike/iam-client-react";
  import moment from "moment";
  import { Excel } from "antd-table-saveas-excel";
  
  export function SanmarOrdersGrid() {
    const service = new SanmarService();


    const navigate = useNavigate();
    const searchInput = useRef(null);
    const [orderData, setOrderData] = useState<any>([]);
    const [poLine, setPoLine] = useState<any>([]);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [poNumber, setPoNumber] = useState([]);
    const [form] = Form.useForm();
    const { Option } = Select;
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const { IAMClientAuthContext, dispatch } = useIAMClientState();
    const { RangePicker } = DatePicker;
  
    useEffect(() => {
      getorderData();
      getCustomerPoNumber()
    }, []);

  
    const getorderData = () => {
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


  
     service.getorderDataForInfo(req).then((res) => {
      if (res.status) {
        setOrderData(res.data);
        setFilterData(res.data);
      } else {
        setOrderData([]);
        setFilterData([])
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch((err) => {
      console.log(err.message);
    });
    };

    const getCustomerPoNumber = () => {
        service.getCustomerPoNumber().then((res) => {
          if (res.status) {
            setPoNumber(res.data);
          
          }
        });
      };
    const onReset = () => {
      form.resetFields();
      getorderData();
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
  
    const setMoreData = (record) => {
      navigate("/sanmar/sanmar-order-data-detail-view", {
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
          title: "Buyer PO",
          dataIndex: "buyerPo",
          width: 90,
         sorter: (a, b) => a.buyerPo.localeCompare(b.buyerPo),
         sortDirections: ["ascend", "descend"],
         render: (text) => text ? text : "-",
  
          fixed: "left",
          // ...getColumnSearchProps('poNumber')
        },
        {
          title: "PO Date",
          dataIndex: "poDate",
          width: 90,
         sorter: (a, b) => a.poDate.localeCompare(b.poDate),
         sortDirections: ["ascend", "descend"],
         render: (text) => text ? text : "-",
  
          fixed: "left",
          // ...getColumnSearchProps('poNumber')
        },
        
        {
          title: "Style",
          dataIndex: "style",
          width: 90,
          sorter: (a, b) => a.style.localeCompare(b.style),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          
  
        },
        {
          title: "Color",
          dataIndex: "color",
          width: 90,
          sorter: (a, b) => a.color.localeCompare(b.color),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
 
  
        },
  
        {
          title: "Delivery Date",
          dataIndex: "deliveryDate",
          width: 130,
          sorter: (a, b) => a.deliveryDate.localeCompare(b.deliveryDate),
          sortDirections: ["ascend", "descend"],
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

            {
              title: 'Quantity',
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
                    // const formattedQty = (sizeData?.quantity) ? String(sizeData?.quantity).replace(/,/g, '') : "-";

  
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
              title: 'Unit Price',
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
  
        // {
        //   title: "Total Quantity",
        //   dataIndex: "",
        //   align: "right",
        //   width: 90,
        //   render: (text, record) => {
        //     let sum = 0;
        //     record.sizeWiseData.forEach((r) => {
        //       // Convert to number before summing
        //       sum += parseFloat(r.quantity) || 0;
        //     });
        //     return sum;
        //   },
        // },
       
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
              {text ? `${text.substring(0, 20)}...` : "-"}
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
          title: "Action",
          dataIndex: "action",
          align: "center",
          width: 120,
          render: (value, record) => (
            <>
              <Button type="primary" onClick={() => setMoreData(record)}>More Info</Button>
            </>
          ),
        }
  
  
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
          </Form>
          {/* ) : (
            <Table size="large" />
          )} */}
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
                width:50,
                render: (text, object, index) => { 
                  if(index == orderData.length) { 
                    return null;
                  } else { 
                    return rowIndex++; 
                  } 
                }
              },
              {
                title: "Buyer PO",
                dataIndex: "buyerPo",
                width: 150,
                render: (text) => text ? text : "-",

             
              },
              {
                title: "PO Date",
                dataIndex: "poDate",
                width: 90,
               render: (text) => text ? text : "-",
        
             
              },
              {
                title: "Style",
                dataIndex: "style",
                width: 90,
                render: (text) => text ? text : "-",

              
                
        
              },
              {
                title: "Color",
                dataIndex: "color",
                width: 150,
                render: (text) => text ? text : "-",
       
        
              },
        
              {
                title: "Delivery Date",
                dataIndex: "deliveryDate",
                width: 130,
                render: (text) => text ? text : "-",
            
        
              },
              
            );
            const sizeHeaders = new Set<string>();
            orderData?.forEach((rec) =>
            rec.sizeWiseData?.forEach((version) => {
              sizeHeaders.add("" + version.size);
            })
          );
           
  
          sizeHeaders?.forEach(version => {
            excelColumnsWH.push({
              title: version,
              dataIndex: version,
              key: version,
              width: 70,
              align: 'center',
              children: [
    
                {
                  title: 'Quantity',
                  dataIndex: '',
                  key: '',
                  width: 130,
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
                  title: 'Unit Price',
                  dataIndex: '',
                  key: '',
                  width: 130,
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
        excelColumnsWH.push(
          // {
          //   title: "Total Quantity",
          //   dataIndex: "",
          //   align: "right",
          //   width: 90,
          //   render: (text, record) => {
          //     let sum = 0;
          //     record.sizeWiseData.forEach((r) => {
          //       // Convert to number before summing
          //       sum += parseFloat(r.quantity) || 0;
          //     });
          //     return sum;
          //   },
          // },
        
          {
            title: "Buyer Address",
            dataIndex: "buyerAddress",
            width: 400,
            render: (text) => text ? text : "-",
          },
          {
            title: "Delivery Address",
            dataIndex: "shipToAdd",
            width: 400,
            render: (text) => text ? text : "-",
          },
        
        );
  
         
      
              excel
                .addSheet(`Order Info (${formattedDate})`)
                .addColumns(excelColumnsWH)
                .addDataSource(filterData, { str2num: false });
  
       
          excel.saveAs(`Order Info ${formattedDate}.xlsx`);
  
  
   
    }
  
  
    return (
      <>
        <Card title="Order Info " headStyle={{ fontWeight: "bold" }}
        extra={
          <Button
            type="default"
            style={{ color: "green" }}
            onClick={exportExcel}
            icon={<FileExcelFilled />}
          >
            Download Excel
          </Button>
        }>
          <Form
            onFinish={getorderData}
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
                <Form.Item name="poNumber" label="Buyer PO Number">
                  <Select
                    showSearch
                    placeholder="Select Buyer PO "
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
                    onClick={getorderData}
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
                 style={{ marginLeft: 120 ,marginTop:-44}}
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
  export default SanmarOrdersGrid;
  