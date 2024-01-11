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
  } from "@project-management-system/shared-models";
  import { ColumnsType } from "antd/es/table";
  import { useIAMClientState } from "../nike/iam-client-react";
import moment from "moment";
import { Excel } from "antd-table-saveas-excel";
  
  export function HBOrdersGrid() {
    const service = new HbService();


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
     getHbPoNumber();
    }, []);

  
    const getorderData = () => {
      const req = new HbPoOrderFilter();
  
      if (form.getFieldValue("poNumber") !== undefined) {
        req.custPo = form.getFieldValue("poNumber");
      }
      if (form.getFieldValue('deliveryDate') !== undefined) {
        req.deliveryDateStartDate = (form.getFieldValue('deliveryDate')[0]).format('DD-MM-YYYY');
      }
      if (form.getFieldValue('deliveryDate') !== undefined) {
        req.deliveryDateEndDate = (form.getFieldValue('deliveryDate')[1]).format('DD-MM-YYYY');
      }
      
      if (form.getFieldValue("style") !== undefined) {
        req.style = form.getFieldValue("style");
      }
      if (form.getFieldValue("color") !== undefined) {
        req.color = form.getFieldValue("color");
      }


  
     service.getHborderDataForInfo(req).then((res) => {
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

    const getHbPoNumber = () => {
        service.getHbPoNumber().then((res) => {
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
      navigate("/hb-athletics/hb-order-data-detail-view", {
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
  
    // const renderReport = (data) => {
    //   const sizeHeaders = getSizeWiseHeaders(data);
    
  
    //   const columns: any = [
    //     {
    //       title: "S.No",
    //       key: "sno",
    //       width: 50,
    //       render: (text, object, index) => (page - 1) * pageSize + (index + 1),
    //       fixed: "left",
    //     },
    //     {
    //       title: "PO Number",
    //       dataIndex: "poNumber",
    //       width: 90,
    //       sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
    //       sortDirections: ["ascend", "descend"],
    //       fixed: "left",
    //       render: (text) => text ? text : "-",

    //       // ...getColumnSearchProps('poNumber')
    //     },
    //     {
    //       title: "PO Line",
    //       dataIndex: "poLine",
    //       width: 90,
    //       sorter: (a, b) => a.poLine.localeCompare(b.poLine),
    //       sortDirections: ["ascend", "descend"],
    //       render: (text) => text ? text : "-",
    //       ...getColumnSearchProps('poLine')

    //     },
    //     {
    //       title: "PO Date",
    //       dataIndex: "PODate",
    //       width: 90,
    //       sorter: (a, b) => a.PODate.localeCompare(b.PODate),
    //       sortDirections: ["ascend", "descend"],
    //       render: (text) => text ? text : "-",
    //       ...getColumnSearchProps('PODate')

    //       // ...getColumnSearchProps('purchaseOrderNumber')
    //     },
    //     {
    //       title: "Material",
    //       dataIndex: "material",
    //       width: 130,
    //       sorter: (a, b) => a.material.localeCompare(b.material),
    //       sortDirections: ["ascend", "descend"],
    //       render: (text) => text ? text : "-",
    //      ...getColumnSearchProps('material')
    //     },
    //     {
    //       title: "Season",
    //       dataIndex: "season",
    //       width: 90,
    //       sorter: (a, b) => a.season.localeCompare(b.season),
    //       sortDirections: ["ascend", "descend"],
    //       render: (text) => text ? text : "-",

    //       ...getColumnSearchProps('season')
    //     },
    //     {
    //         title: "Color",
    //         dataIndex: "color",
    //         width: 110,
    //         sorter: (a, b) => a.color.localeCompare(b.color),
    //         sortDirections: ["ascend", "descend"],
    //       render: (text) => text ? text : "-",

    //         ...getColumnSearchProps('color')
    //       },

    //       {
    //         title: "Gender",
    //         dataIndex: "gender",
    //         width: 90,
    //         sorter: (a, b) => a.gender.localeCompare(b.gender),
    //         sortDirections: ["ascend", "descend"],
    //       render: (text) => text ? text : "-",

    //         ...getColumnSearchProps('gender')
    //       },
       
    //     {
    //       title: "Payment Terms Description",
    //       dataIndex: "paymentTermDescription",
    //       align: "center",
    //       width: 200,
    //       sorter: (a, b) => a.paymentTermDescription.localeCompare(b.paymentTermDescription),
    //       sortDirections: ["ascend", "descend"],
    //       render: (text) => text ? text : "-",
    //       ...getColumnSearchProps('paymentTermDescription') 

    //     },
       
       
      
       
    //   ];
  
    //   sizeHeaders?.forEach(version => {
    //       columns.push({
    //           title: version,
    //           dataIndex: version,
    //           key: version,
    //           width: 70,
    //           align: 'center',
    //           children: [
    //             {
    //                 title: 'Ratio',
    //                 dataIndex: '',
    //                 key: '',
    //                 width: 90,
    //                 className: "center",
    //                 render: (text, record) => {
    //                     const sizeData = record.sizeWiseData.find(item => item.size === version);
    //                     console.log()
    //                     if (sizeData) {
    //                         if (sizeData.size !== null) {
    //                           const formattedQty = (sizeData?.ratio) ?  (sizeData?.ratio)  : "-"
                          
    //                             return (
    //                                 formattedQty
    //                             );
    //                         } else {
  
    //                             return (
    //                                 '-'
    //                             );
    //                         }
    //                     } else {
    //                         return '-';
    //                     }
    //                 }
    //             },
    //               {
    //                 title: 'UPC',
    //                 dataIndex: '',
    //                 key: '',
    //                 width: 100,
    //                 className: "center",
    //                 render: (text, record) => {
    //                     const sizeData = record.sizeWiseData.find(item => item.size === version);
    //                     console.log()
    //                     if (sizeData) {
    //                         if (sizeData.size !== null) {
    //                           const formattedQty = (sizeData?.upc) ? (sizeData?.upc):"-"
    //                             // const formattedQty = (sizeData?.amount)
    //                             return (
    //                                 formattedQty
    //                             );
    //                         } else {
  
    //                             return (
    //                                 '-'
    //                             );
    //                         }
    //                     } else {
    //                         return '-';
    //                     }
    //                 }
    //             },
    //             {
    //               title: 'Label',
    //               dataIndex: '',
    //               key: '',
    //               width: 90,
    //               className: "center",
    //               render: (text, record) => {
    //                   const sizeData = record.sizeWiseData.find(item => item.size === version);
    //                   console.log()
    //                   if (sizeData) {
    //                       if (sizeData.size !== null) {
    //                         const formattedQty = (sizeData?.label) ? (sizeData?.label) :"-"
    //                           // const formattedQty = (sizeData?.amount)
    //                           return (
    //                               formattedQty
    //                           );
    //                       } else {
  
    //                           return (
    //                               '-'
    //                           );
    //                       }
    //                   } else {
    //                       return '-';
    //                   }
    //               }
    //           },
              
    //                 {
    //                     title: 'FOB Price',
    //                     dataIndex: '',
    //                     key: '',
    //                     width: 70,
    //                     className: "center",
    //                     render: (text, record) => {
    //                         const sizeData = record.sizeWiseData.find(item => item.size === version);
    //                         console.log()
    //                         if (sizeData) {
    //                             if (sizeData.size !== null) {
    //                                 const formattedQty = (sizeData?.fobPrice) ? (sizeData?.fobPrice):"-"
    //                                 return (
    //                                     formattedQty
    //                                 );
    //                             } else {
    
    //                                 return (
    //                                     '-'
    //                                 );
    //                             }
    //                         } else {
    //                             return '-';
    //                         }
    //                     }
    //                 },
    //                 {
    //                     title: 'Tot PO Qty in PC',
    //                     dataIndex: '',
    //                     key: '',
    //                     width: 70,
    //                     className: "center",
    //                     render: (text, record) => {
    //                         const sizeData = record.sizeWiseData.find(item => item.size === version);
    //                         console.log()
    //                         if (sizeData) {
    //                             if (sizeData.size !== null) {
    //                                 const formattedQty = (sizeData?.totalQuantity) ? (sizeData?.totalQuantity):"-"
    //                                 return (
    //                                     formattedQty
    //                                 );
    //                             } else {
    
    //                                 return (
    //                                     '-'
    //                                 );
    //                             }
    //                         } else {
    //                             return '-';
    //                         }
    //                     }
    //                 },
                    
                  
                
    //                 {
    //                   title: 'Retail Price(USD) ',
    //                   dataIndex: '',
    //                   key: '',
    //                   width: 70,
    //                   className: "center",
    //                   render: (text, record) => {
    //                       const sizeData = record.sizeWiseData.find(item => item.size === version);
    //                       console.log()
    //                       if (sizeData) {
    //                           if (sizeData.size !== null) {
    //                               const formattedQty = (sizeData?.retailPrice) ? (sizeData?.retailPrice) :"-"
    //                               return (
    //                                   formattedQty
    //                               );
    //                           } else {
  
    //                               return (
    //                                   '-'
    //                               );
    //                           }
    //                       } else {
    //                           return '-';
    //                       }
    //                   }
    //               },
    //               {
    //                 title: 'Ex-factory Date ',
    //                 dataIndex: '',
    //                 key: '',
    //                 width: 100,
    //                 className: "center",
    //                 render: (text, record) => {
    //                     const sizeData = record.sizeWiseData.find(item => item.size === version);
    //                     console.log()
    //                     if (sizeData) {
    //                         if (sizeData.size !== null) {
    //                             const formattedQty = (sizeData?.exfactory) ? (sizeData?.exfactory) :'-'
    //                             return (
    //                                 formattedQty
    //                             );
    //                         } else {
  
    //                             return (
    //                                 '-'
    //                             );
    //                         }
    //                     } else {
    //                         return '-';
    //                     }
    //                 }
    //             },
    //             {
    //               title: 'Export Date ',
    //               dataIndex: '',
    //               key: '',
    //               width: 100,
    //               className: "center",
    //               render: (text, record) => {
    //                   const sizeData = record.sizeWiseData.find(item => item.size === version);
    //                   console.log()
    //                   if (sizeData) {
    //                       if (sizeData.size !== null) {
    //                           const formattedQty = (sizeData?.exportDate) ? (sizeData?.exportDate) :"-"
    //                           return (
    //                               formattedQty
    //                           );
    //                       } else {
  
    //                           return (
    //                               '-'
    //                           );
    //                       }
    //                   } else {
    //                       return '-';
    //                   }
    //               }
    //           },
    //           {
    //             title: 'Delivery Date',
    //             dataIndex: '',
    //             key: '',
    //             width: 100,
    //             className: "center",
    //             render: (text, record) => {
    //                 const sizeData = record.sizeWiseData.find(item => item.size === version);
    //                 console.log()
    //                 if (sizeData) {
    //                     if (sizeData.size !== null) {
    //                         const formattedQty = (sizeData?.deliveryDate) ? (sizeData?.deliveryDate) :"-"
    //                         return (
    //                             formattedQty
    //                         );
    //                     } else {
  
    //                         return (
    //                             '-'
    //                         );
    //                     }
    //                 } else {
    //                     return '-';
    //                 }
    //             }
    //         },
                  
    //           ]
    //       });
    //   })
  
    //   columns.push(
    //     {
    //       title: "Total Quantity",
    //       dataIndex: "",
    //       align: "right",
    //       width: 90,
    //       render: (text, record) => {
    //         let sum = 0;
    //         record.sizeWiseData.forEach((r) => {
    //           // Convert to number before summing
    //           sum += parseFloat(r.totalQuantity) || 0;
    //         });
    //         return sum;
    //       },
    //     },
    //     // {
    //     //   title: "Incoterm",
    //     //   dataIndex: "incoterm",
    //     //   align: "center",
    //     //   width: 500,
    //     //   sorter: (a, b) => a.incoterm.localeCompare(b.incoterm),
    //     //   sortDirections: ["ascend", "descend"],
    //     //   render: (text) => text ? text : "-",
    //     //   ...getColumnSearchProps('incoterm') 


    //     // },
    //     {
    //       title: "Incoterm",
    //       dataIndex: "incoterm",
    //       width: 150,
    //       sorter: (a, b) => a.incoterm.localeCompare(b.incoterm),
    //       sortDirections: ["ascend", "descend"],
    //       ...getColumnSearchProps('incoterm'),
    //       render: (text) => (
    //         <Tooltip title={text || "-"}>
    //           {text ? `${text.substring(0, 20)}...` : "-"}
    //         </Tooltip>
    //       ),
    //     },
    //     // {
    //     //     title: "Address",
    //     //     dataIndex: "shipToAddress",
    //     //     width: 600,
    //     //     sorter: (a, b) => a.shipToAddress.localeCompare(b.shipToAddress),
    //     //     sortDirections: ["ascend", "descend"],
    //     //    render: (text) => text ? text : "-",

    //     //     ...getColumnSearchProps('shipToAddress')
    //     //   },
    //     {
    //       title: "Address",
    //       dataIndex: "shipToAddress",
    //       width: 150,
    //       sorter: (a, b) => a.shipToAddress.localeCompare(b.shipToAddress),
    //       sortDirections: ["ascend", "descend"],
    //       ...getColumnSearchProps('shipToAddress'),
    //       render: (text) => (
    //         <Tooltip title={text || "-"}>
    //           {text ? `${text.substring(0, 20)}...` : "-"}
    //         </Tooltip>
    //       ),
    //     },
          
    //       {
    //     title: "Action",
    //     dataIndex: "action",
    //     align: "center",
    //     width: 120,
    //     render: (value, record) => (
    //       <>
    //         <Button onClick={() => setMoreData(record)}>More Info</Button>
    //       </>
    //     ),
    //   }
    //   );
  
    //   const getRowClassName = (record) => {
    //     if (record.displayName) {
    //       return "colored-row";
    //     }
    //     return "";
    //   };
  
    //   return (
    //     <>
    //       {/* {filterData.length > 0 ? ( */}
    //         <Table
    //           // loading={tableLoading}
    //           columns={columns}
    //           dataSource={filterData}
    //           size="small"
    //           // pagination={false}
    //           pagination={{
    //             pageSize: 50,
    //             onChange(current, pageSize) {
    //               setPage(current);
    //               setPageSize(pageSize);
    //             },
    //           }}
    //           className="custom-table-wrapper"
    //           scroll={{ x: "max-content", y: 450 }}
    //           rowClassName={getRowClassName}
    //           bordered
    //         />
    //       {/* ) : ( */}
    //         <Table size="large" />
    //       {/* )} */}
    //     </>
    //   );
    // };
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
          title: "Customer PO",
          dataIndex: "custPo",
          width: 90,
         sorter: (a, b) => a.custPo.localeCompare(b.custPo),
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
          dataIndex: "exitFactoryDate",
          width: 130,
          sorter: (a, b) => a.exitFactoryDate.localeCompare(b.exitFactoryDate),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? moment(text).format("DD-MM-YYYY") : "-",
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
          title: "Address",
          dataIndex: "shipToAdd",
          width: 150,
         sorter: (a, b) => a.shipToAdd.localeCompare(b.shipToAdd),
         sortDirections: ["ascend", "descend"],
         ...getColumnSearchProps('shipToAddress'),
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
              <Button onClick={() => setMoreData(record)}>More Info</Button>
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
                title: "Customer PO",
                dataIndex: "custPo",
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
                width: 90,
                render: (text) => text ? text : "-",
       
        
              },
        
              {
                title: "Delivery Date",
                dataIndex: "exitFactoryDate",
                width: 130,
                render: (text) => text ? moment(text).format("DD-MM-YYYY") : "-",
            
        
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
        excelColumnsWH.push(
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
            title: "Address",
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
                        <Option key={inc.cust_po} value={inc.cust_po}>
                          {inc.cust_po}
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
                    onClick={getorderData}
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
  export default HBOrdersGrid;
  