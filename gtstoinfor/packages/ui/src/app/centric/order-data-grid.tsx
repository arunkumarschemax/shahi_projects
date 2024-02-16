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
    NikeService,
    RLOrdersService,
  } from "@project-management-system/shared-services";
  import React from "react";
  import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
  import Highlighter from "react-highlight-words";
  import { useNavigate } from "react-router-dom";
  import {
    AlertMessages,
    OrderDataModel,
    PoOrderFilter,
  } from "@project-management-system/shared-models";
  import { ColumnsType } from "antd/es/table";
  import { useIAMClientState } from "../nike/iam-client-react";
  
  export function CentricOrdersGrid() {
    const service = new CentricService();
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
      getPoNumber();
    }, []);

  
    const getorderData = () => {
      const req = new PoOrderFilter();
  
      if (form.getFieldValue("poNumber") !== undefined) {
        req.poNumber = form.getFieldValue("poNumber");
      } 

      if (form.getFieldValue('podate') !== undefined) {
        req.poDateStartDate = (form.getFieldValue('podate')[0]).format('YYYY-MM-DD');
      }
      if (form.getFieldValue('podate') !== undefined) {
        req.poDateEndDate = (form.getFieldValue('podate')[1]).format('YYYY-MM-DD');
      }
     req.externalRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
  
     service.getorderData(req).then((res) => {
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

    const getPoNumber = () => {
        service.getPoNumber().then((res) => {
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
      navigate("/centric/order-data-detail-view", {
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

    // console.log(form.getFieldValue('podate'))
  
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
          title: "Season",
          dataIndex: "season",
          width: 90,
          sorter: (a, b) => a.season.localeCompare(b.season),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",

          ...getColumnSearchProps('season')
        },
        {
          title: "Shipment Method",
          dataIndex: "shipmentMethod",
          width: 90,
          sorter: (a, b) => a.shipmentMethod.localeCompare(b.shipmentMethod),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          ...getColumnSearchProps('shipmentMethod')

        },
        {
          title: "Division",
          dataIndex: "division",
          width: 150,
          sorter: (a, b) => a.division.localeCompare(b.division),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          ...getColumnSearchProps('division')
          
        },
        {
          title: "Manufacture",
          dataIndex: "manufacture",
          width: 150,
          sorter: (a, b) => a.manufacture.localeCompare(b.manufacture),
          sortDirections: ["ascend", "descend"],
          ...getColumnSearchProps('manufacture'),
          render: (text) => (
            <Tooltip title={text || "-"}>
              {text ? `${text.substring(0, 20)}...` : "-"}
            </Tooltip>
          ),
        },
        {
          title: "PO Number",
          dataIndex: "poNumber",
          width: 90,
          sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
          sortDirections: ["ascend", "descend"],
          // fixed: "left",
          render: (text) => text ? text : "-",

          // ...getColumnSearchProps('poNumber')
        },
        {
          title: "PO Line",
          dataIndex: "poLine",
          width: 90,
          sorter: (a, b) => a.poLine.localeCompare(b.poLine),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          ...getColumnSearchProps('poLine')

        },
        {
          title: "Material",
          dataIndex: "material",
          width: 130,
          sorter: (a, b) => a.material.localeCompare(b.material),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
         ...getColumnSearchProps('material')
        },
        {
          title: "Compt.Material",
          dataIndex: "comptMaterial",
          width: 130,
          sorter: (a, b) => a.comptMaterial.localeCompare(b.comptMaterial),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
         ...getColumnSearchProps('comptMaterial')
        },
        {
          title: "Gender",
          dataIndex: "gender",
          width: 90,
          sorter: (a, b) => a.gender.localeCompare(b.gender),
          sortDirections: ["ascend", "descend"],
        render: (text) => text ? text : "-",

          ...getColumnSearchProps('gender')
        },
        {
          title: "Short Description",
          dataIndex: "shortDescription",
          width:130,
          sorter: (a, b) => a.shortDescription.localeCompare(b.shortDescription),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          ...getColumnSearchProps('shortDescription')
        },
     
        {
            title: "Color",
            dataIndex: "color",
            width: 110,
            sorter: (a, b) => a.color.localeCompare(b.color),
            sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",

            ...getColumnSearchProps('color')
          },
          {
            title: "Label",
            dataIndex: "label",
            width: 90,
            sorter: (a, b) => a.label.localeCompare(b.label),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-",
            ...getColumnSearchProps('label')
            
          },
          {
            title: "Reference #/POW #",
            dataIndex: "reference",
            width: 90,
            sorter: (a, b) => a.reference.localeCompare(b.reference),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-",
            ...getColumnSearchProps('reference')

          },
          {
            title: "Pack Method",
            dataIndex: "packMethod",
            width: 130,
            sorter: (a, b) => a.packMethod.localeCompare(b.packMethod),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-",
            ...getColumnSearchProps('packMethod')
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
                    title: 'Ratio',
                    dataIndex: '',
                    key: '',
                    width: 90,
                    className: "center",
                    render: (text, record) => {
                        const sizeData = record.sizeWiseData.find(item => item.size === version);
                        console.log()
                        if (sizeData) {
                            if (sizeData.size !== null) {
                              const formattedQty = (sizeData?.ratio) ?  (sizeData?.ratio)  : "-"
                          
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
                    title: 'UPC',
                    dataIndex: '',
                    key: '',
                    width: 100,
                    className: "center",
                    render: (text, record) => {
                        const sizeData = record.sizeWiseData.find(item => item.size === version);
                        console.log()
                        if (sizeData) {
                            if (sizeData.size !== null) {
                              const formattedQty = (sizeData?.upc) ? (sizeData?.upc):"-"
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
                {
                  title: 'PPK UPC',
                  dataIndex: '',
                  key: '',
                  width: 100,
                  className: "center",
                  render: (text, record) => {
                      const sizeData = record.sizeWiseData.find(item => item.size === version);
                      console.log()
                      if (sizeData) {
                          if (sizeData.size !== null) {
                            const formattedQty = (sizeData?.ppkUpc) ? (sizeData?.ppkUpc):"-"
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
              //   {
              //     title: 'Label',
              //     dataIndex: '',
              //     key: '',
              //     width: 90,
              //     className: "center",
              //     render: (text, record) => {
              //         const sizeData = record.sizeWiseData.find(item => item.size === version);
              //         console.log()
              //         if (sizeData) {
              //             if (sizeData.size !== null) {
              //               const formattedQty = (sizeData?.label) ? (sizeData?.label) :"-"
              //                 // const formattedQty = (sizeData?.amount)
              //                 return (
              //                     formattedQty
              //                 );
              //             } else {
  
              //                 return (
              //                     '-'
              //                 );
              //             }
              //         } else {
              //             return '-';
              //         }
              //     }
              // },
              
                    {
                        title: 'FOB Price',
                        dataIndex: '',
                        key: '',
                        width: 70,
                        className: "center",
                        render: (text, record) => {
                            const sizeData = record.sizeWiseData.find(item => item.size === version);
                            console.log()
                            if (sizeData) {
                                if (sizeData.size !== null) {
                                    const formattedQty = (sizeData?.fobPrice) ? (sizeData?.fobPrice):"-"
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
                        title: 'PO Qty in PC',
                        dataIndex: '',
                        key: '',
                        width: 70,
                        className: "center",
                        render: (text, record) => {
                            const sizeData = record.sizeWiseData.find(item => item.size === version);
                            console.log()
                            if (sizeData) {
                                if (sizeData.size !== null) {
                                    const formattedQty = (sizeData?.totalQuantity) ? (sizeData?.totalQuantity):"-"
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
                      title: 'Retail Price(USD) ',
                      dataIndex: '',
                      key: '',
                      width: 70,
                      className: "center",
                      render: (text, record) => {
                          const sizeData = record.sizeWiseData.find(item => item.size === version);
                          console.log()
                          if (sizeData) {
                              if (sizeData.size !== null) {
                                  const formattedQty = (sizeData?.retailPrice) ? (sizeData?.retailPrice) :"-"
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
            //       {
            //         title: 'Ex-factory Date ',
            //         dataIndex: '',
            //         key: '',
            //         width: 100,
            //         className: "center",
            //         render: (text, record) => {
            //             const sizeData = record.sizeWiseData.find(item => item.size === version);
            //             console.log()
            //             if (sizeData) {
            //                 if (sizeData.size !== null) {
            //                     const formattedQty = (sizeData?.exfactory) ? (sizeData?.exfactory) :'-'
            //                     return (
            //                         formattedQty
            //                     );
            //                 } else {
  
            //                     return (
            //                         '-'
            //                     );
            //                 }
            //             } else {
            //                 return '-';
            //             }
            //         }
            //     },
            //     {
            //       title: 'Export Date ',
            //       dataIndex: '',
            //       key: '',
            //       width: 100,
            //       className: "center",
            //       render: (text, record) => {
            //           const sizeData = record.sizeWiseData.find(item => item.size === version);
            //           console.log()
            //           if (sizeData) {
            //               if (sizeData.size !== null) {
            //                   const formattedQty = (sizeData?.exportDate) ? (sizeData?.exportDate) :"-"
            //                   return (
            //                       formattedQty
            //                   );
            //               } else {
  
            //                   return (
            //                       '-'
            //                   );
            //               }
            //           } else {
            //               return '-';
            //           }
            //       }
            //   },
            //   {
            //     title: 'Delivery Date',
            //     dataIndex: '',
            //     key: '',
            //     width: 100,
            //     className: "center",
            //     render: (text, record) => {
            //         const sizeData = record.sizeWiseData.find(item => item.size === version);
            //         console.log()
            //         if (sizeData) {
            //             if (sizeData.size !== null) {
            //                 const formattedQty = (sizeData?.deliveryDate) ? (sizeData?.deliveryDate) :"-"
            //                 return (
            //                     formattedQty
            //                 );
            //             } else {
  
            //                 return (
            //                     '-'
            //                 );
            //             }
            //         } else {
            //             return '-';
            //         }
            //     }
            // },
                  
              ]
          });
      })
  
      columns.push(
        {
          title: "Total Quantity",
          dataIndex: "totalQuantity",
          align: "right",
          width: 90,
          // render: (text, record) => {
          //   let sum = 0;
          //   record.sizeWiseData.forEach((r) => {
          //     // Convert to number before summing
          //     sum += parseFloat(r.totalQuantity) || 0;
          //   });
          //   return sum;
          // },
          render: (text) => text ? text : "-",
        },
        {
          title: "Special Instructions",
          dataIndex: "specialInstructions",
          width: 150,
          sorter: (a, b) => a.specialInstructions.localeCompare(b.specialInstructions),
          sortDirections: ["ascend", "descend"],
          ...getColumnSearchProps('specialInstructions'),
          render: (text) => (
            <Tooltip title={text || "-"}>
              {text ? `${text.substring(0, 20)}...` : "-"}
            </Tooltip>
          ),
        },
        {
          title: "PO Date",
          dataIndex: "PODate",
          align: "center",
          width: 90,
          sorter: (a, b) => a.PODate.localeCompare(b.PODate),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-"
        },
           
        {
            title: "Ex-factory Date",
            dataIndex: "exFactoryDate",
            align: "center",
            width: 90,
            sorter: (a, b) => a.exFactoryDate.localeCompare(b.exFactoryDate),
            sortDirections: ["ascend", "descend"],
          },
        {
            title: "Export Date",
            dataIndex: "exPortDate",
            align: "center",
            width: 90,
            sorter: (a, b) => a.exPortDate.localeCompare(b.exPortDate),
            sortDirections: ["ascend", "descend"],
          },
        {
            title: "Delivery Date",
            dataIndex: "deliveryDate",
            align: "center",
            width: 90,
            sorter: (a, b) => a.deliveryDate.localeCompare(b.deliveryDate),
            sortDirections: ["ascend", "descend"],
          },
      
        {
          title: "Incoterm",
          dataIndex: "incoterm",
          width: 150,
          sorter: (a, b) => a.incoterm.localeCompare(b.incoterm),
          sortDirections: ["ascend", "descend"],
          ...getColumnSearchProps('incoterm'),
          render: (text) => (
            <Tooltip title={text || "-"}>
              {text ? `${text.substring(0, 20)}...` : "-"}
            </Tooltip>
          ),
        },
        {
          title: "Port Of Export",
          dataIndex: "portOfExport",
          align: "center",
          width: 90,
          sorter: (a, b) => a.portOfExport.localeCompare(b.portOfExport),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          ...getColumnSearchProps('portOfExport')

        },
        {
          title: "Port of Entry Name",
          dataIndex: "portOfEntry",
          align: "center",
          width: 200,
          sorter: (a, b) => a.portOfEntry.localeCompare(b.portOfEntry),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          ...getColumnSearchProps('portOfEntry')

        },
        {
          title: "Payment Terms Description",
          dataIndex: "paymentTermDescription",
          align: "center",
          width: 200,
          sorter: (a, b) => a.paymentTermDescription.localeCompare(b.paymentTermDescription),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          ...getColumnSearchProps('paymentTermDescription') 

        },
        {
          title: "Vendor Booking Flag",
          dataIndex: "vendorFlag",
          align: "center",
          width: 90,
          sorter: (a, b) => a.vendorFlag.localeCompare(b.vendorFlag),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-"
        },
        // {
        //     title: "Address",
        //     dataIndex: "shipToAddress",
        //     width: 600,
        //     sorter: (a, b) => a.shipToAddress.localeCompare(b.shipToAddress),
        //     sortDirections: ["ascend", "descend"],
        //    render: (text) => text ? text : "-",

        //     ...getColumnSearchProps('shipToAddress')
        //   },
        {
          title: "Ship To Address",
          dataIndex: "shipToAddress",
          width: 150,
          sorter: (a, b) => a.shipToAddress.localeCompare(b.shipToAddress),
          sortDirections: ["ascend", "descend"],
          ...getColumnSearchProps('shipToAddress'),
          render: (text) => (
            <Tooltip title={text || "-"}>
              {text ? `${text.substring(0, 20)}...` : "-"}
            </Tooltip>
          ),
        },
        {
          title: "Consignee",
          dataIndex: "consignee",
          width: 150,
          sorter: (a, b) => a.consignee.localeCompare(b.consignee),
          sortDirections: ["ascend", "descend"],
          ...getColumnSearchProps('consignee'),
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
            <Button  type = "primary" onClick={() => setMoreData(record)}>More Info</Button>
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
          {/* {filterData.length > 0 ? (  */}
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
          {/* ) : ( 
            "NO DATA"
         )} */}
        </>
      );
    };
  
    return (
      <>
        <Card title="Order Info " headStyle={{ fontWeight: "bold" }}>
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
                <Form.Item name="poNumber" label="PO Number">
                  <Select
                    showSearch
                    placeholder="Select PO number"
                    optionFilterProp="children"
                    allowClear
                  >
                     {poNumber.map((inc: any) => {
                      return (
                        <Option key={inc.po_number} value={inc.po_number}>
                          {inc.po_number}
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
               <Form.Item label="PO Date" name="podate"  >
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
                style={{marginTop:20,marginLeft:60}}
              >
                <Form.Item >
                  <Button
                    htmlType="submit"
                    icon={<SearchOutlined />}
                    type="primary"
                  >
                    Search
                  </Button>
                
                </Form.Item>
              {/* </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 5 }}
                lg={{ span: 5 }}
                xl={{ span: 4 }}
              > */}
                <Form.Item style={{marginTop:-44 ,marginLeft: 120}} >
                  <Button
                    // style={{ marginLeft: 170 }}
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
          {renderReport(filterData)}
        </Card>
      </>
    );
  }
  export default CentricOrdersGrid;
  