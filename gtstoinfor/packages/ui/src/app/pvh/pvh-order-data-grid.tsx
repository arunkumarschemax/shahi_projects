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
  import { PvhService } from "@project-management-system/shared-services";
  import React from "react";
  import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
  import Highlighter from "react-highlight-words";
  import { useNavigate } from "react-router-dom";
  import {
    AlertMessages, PvhOrderFilter,
   
  } from "@project-management-system/shared-models";
  import { ColumnsType } from "antd/es/table";
  import { useIAMClientState } from "../nike/iam-client-react";
  import moment from "moment";
  import { Excel } from "antd-table-saveas-excel";
  
  export function PvhOrdersGrid() {
    const service = new PvhService();


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
    const [colorData, setColorData] = useState([]);
  
    useEffect(() => {
      getorderData();
      //  getPoNumber()
    }, []);

  
    const getorderData = () => {
      const req = new PvhOrderFilter();
  
      if (form.getFieldValue("poNumber") !== undefined) {
        req.poNumber = form.getFieldValue("poNumber");
      }
      if (form.getFieldValue('deliveryDate') !== undefined) {
        req.deliveryDateStartDate = (form.getFieldValue('deliveryDate')[0]).format('YYYY-MM-DD');
      }
      if (form.getFieldValue('deliveryDate') !== undefined) {
        req.deliveryDateEndDate = (form.getFieldValue('deliveryDate')[1]).format('YYYY-MM-DD');
      }
      
      // if (form.getFieldValue("style") !== undefined) {
      //   req.style = form.getFieldValue("style");
      // }
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

    // const getPoNumber = () => {
    //     service.getPoNumber().then((res) => {
    //       if (res.status) {
    //         setPoNumber(res.data);
          
    //       }
    //     });
    //   };

      // const getColorInfo = () => {
    //   services.getColorInfo().then((res) => {
    //     if (res.status) {
    //       setColorData(res.data);
    //     }
    //   });
    // };
    
    // const getColorName = (material) => {
    //   const matchedColor = colorData.find((color) => color.colorCode === material);
    //   return matchedColor ? matchedColor.colorName : '-';
    // };
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
      
      navigate("/levis/levis-order-data-detail-view", {
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
          title: "PO Number",
          dataIndex: "poNumber",
          width: 90,
         sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
         sortDirections: ["ascend", "descend"],
         render: (text) => text ? text : "-",

        },
        // {
        //   title: "PO Date",
        //   dataIndex: "poDate",
        //   width: 90,
        //  sorter: (a, b) => a.poDate.localeCompare(b.poDate),
        //  sortDirections: ["ascend", "descend"],
        //  render: (text) => text ? text : "-",
  
        //   // fixed: "left",
        //   //C
        // },
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
          title: "Transport Mode",
          dataIndex: "transMode",
          width: 90,
           sorter: (a, b) => a.transMode.localeCompare(b.transMode),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          ...getColumnSearchProps('transMode')
         
  
        },
    
        {
          title: "Currency",
          dataIndex: "currency",
          width: 110,
          sorter: (a, b) => a.currency.localeCompare(b.currency),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          // ...getColumnSearchProps('material')
  
        },
        {
          title: "Material",
          dataIndex: "material",
          width: 110,
          sorter: (a, b) => a.material.localeCompare(b.material),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          ...getColumnSearchProps('material')
        },
        {
          title: "Delivery Date",
          dataIndex: "deliverDate",
          width: 120,
          // sorter: (a, b) => a.material.localeCompare(b.material),
          // sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
         
  
        },
          // {
        //   title: 'Color',
        //   dataIndex: 'colorCode', // Assuming colorCode is available in your data
        //   width: 90,
        //   render: (text, record) => getColorName(record.material),
        // },
        // {
        //   title: "Total Unit Price",
        //   dataIndex: "totalUnitPrice",
        //   width: 90,
        //   sorter: (a, b) => a.totalUnitPrice.localeCompare(b.totalUnitPrice),
        //   sortDirections: ["ascend", "descend"],
        //   render: (text) => text ? text : "-",
         
  
        // },

        // {
        //   title: "Original Date",
        //   dataIndex: "originalDate",
        //   width: 90,
        //   sorter: (a, b) => a.originalDate.localeCompare(b.originalDate),
        //   sortDirections: ["ascend", "descend"],
        //   render: (text) => text ? text : "-",
         
  
        // },
       
  
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
            //   title: 'Product',
            //   dataIndex: '',
            //   key: '',
            //   width: 70,
            //   className: "center",
            //   render: (text, record) => {
            //     const sizeData = record.sizeWiseData.find(item => item.size === version);
            //     console.log()
            //     if (sizeData) {
            //       if (sizeData.size !== null) {
            //         const formattedQty = (sizeData?.product) ? (sizeData?.product) : "-"
  
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
            // {
            //   title: 'UPC',
            //   dataIndex: '',
            //   key: '',
            //   width: 130,
            //   className: "center",
            //   render: (text, record) => {
            //     const sizeData = record.sizeWiseData.find(item => item.size === version);
            //     console.log()
            //     if (sizeData) {
            //       if (sizeData.size !== null) {
            //         const formattedQty = (sizeData?.upc) ? (sizeData?.upc) : "-"
  
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
            // {
            //   title: 'Planned Ex Factory Date',
            //   dataIndex: '',
            //   key: '',
            //   width: 130,
            //   className: "center",
            //   render: (text, record) => {
            //     const sizeData = record.sizeWiseData.find(item => item.size === version);
            //     console.log()
            //     if (sizeData) {
            //       if (sizeData.size !== null) {
            //         const formattedQty = (sizeData?.plannedExFactoryDate) ? (sizeData?.plannedExFactoryDate) : "-"
  
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
            // {
            //   title: 'Ex Factory Date',
            //   dataIndex: '',
            //   key: '',
            //   width: 70,
            //   className: "center",
            //   render: (text, record) => {
            //     const sizeData = record.sizeWiseData.find(item => item.size === version);
            //     console.log()
            //     if (sizeData) {
            //       if (sizeData.size !== null) {
            //         const formattedQty = (sizeData?.exFactoryDate) ? (sizeData?.exFactoryDate) : "-"
  
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
            // {
            //   title: 'Unit Cost',
            //   dataIndex: '',
            //   key: '',
            //   width: 70,
            //   className: "center",
            //   render: (text, record) => {
            //     const sizeData = record.sizeWiseData.find(item => item.size === version);
            //     console.log()
            //     if (sizeData) {
            //       if (sizeData.size !== null) {
            //         const formattedQty = (sizeData?.unitCost) ? (sizeData?.unitCost) : "-"
            //         // const formattedQty = (sizeData?.amount)
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
            // {
            //   title: 'Cost',
            //   dataIndex: '',
            //   key: '',
            //   width: 70,
            //   className: "center",
            //   render: (text, record) => {
            //     const sizeData = record.sizeWiseData.find(item => item.size === version);
            //     console.log()
            //     if (sizeData) {
            //       if (sizeData.size !== null) {
            //         const formattedQty = (sizeData?.cost) ? (sizeData?.cost) : "-"
            //         // const formattedQty = (sizeData?.amount)
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
          ]
        });
      })
  
      columns.push(
  
        {
          title: "Total Quantity",
          dataIndex: "",
          // align: "right",
          width: 90,
          render: (text, record) => {
            let sum = 0;
            // const unit = record.sizeWiseData[0].unit
            record.sizeWiseData.forEach((r) => {
              // Convert to number before summing
              sum += parseFloat(r.quantity) || 0;
            });
            return `${sum}`;
          },
        },
  
       
      //  {
      //   title: <div style={{textAlign:"center"}}>Buyer Address</div>,
      //     dataIndex: "buyerAddress",
      //     width: 150,
      //     sorter: (a, b) => a.poLine.localeCompare(b.poLine),
      //     sortDirections: ["ascend", "descend"],
      //     render: (text) => (
      //       <Tooltip title={text || "-"}>
      //         {text ? `${text.substring(0, 20)}...` : "-"}
      //       </Tooltip>
      //     ),
         
  
      //   },
        {
          title: <div style={{textAlign:"center"}}>Delivery Address</div>,
  
          dataIndex: "deliveryAddress",
          width: 150,
         sorter: (a, b) => a.deliveryAddress.localeCompare(b.deliveryAddress),
         sortDirections: ["ascend", "descend"],
        //  ...getColumnSearchProps('deliveryAddress'),
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
                title: "PO Number",
                dataIndex: "poNumber",
                width: 130,
               sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
               sortDirections: ["ascend", "descend"],
               render: (text) => text ? text : "-",
      
              },
             
              {
                title: "PO Line",
                dataIndex: "poLine",
                width: 90,
                sorter: (a, b) => a.poLine.localeCompare(b.poLine),
                sortDirections: ["ascend", "descend"],
                render: (text) => text ? text : "-",
               
        
              },
              {
                title: "Transport Mode",
                dataIndex: "transMode",
                width: 90,
                 sorter: (a, b) => a.transMode.localeCompare(b.transMode),
                sortDirections: ["ascend", "descend"],
                render: (text) => text ? text : "-",
               
        
              },
          
              {
                title: "Currency",
                dataIndex: "currency",
                width: 110,
                sorter: (a, b) => a.currency.localeCompare(b.currency),
                sortDirections: ["ascend", "descend"],
                render: (text) => text ? text : "-",
        
              },
              {
                title: "Material",
                dataIndex: "material",
                width: 110,
                render: (text) => text ? text : "-",
               
        
              },
              {
                title: "Delivery Date",
                dataIndex: "deliverDate",
                width: 110,
                render: (text) => text ? text : "-",
               
        
              },
              // {
              //   title: "Color",
              //   dataIndex: "colorCode",
              //   width: 110,
              //   render: (text, record) => getColorName(record.material),
        
              // },
              // {
              //   title: "Total Unit Price",
              //   dataIndex: "totalUnitPrice",
              //   width: 90,
              //   render: (text) => text ? text : "-",
               
        
              // },
              // {
              //   title: "Original Date",
              //   dataIndex: "originalDate",
              //   width: 90,
              //   render: (text) => text ? text : "-",
               
        
              // },
              
              
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
    
                // {
                //   title: 'Product',
                //   dataIndex: '',
                //   key: '',
                //   width: 70,
                //   className: "center",
                //   render: (text, record) => {
                //     const sizeData = record.sizeWiseData.find(item => item.size === version);
                //     console.log()
                //     if (sizeData) {
                //       if (sizeData.size !== null) {
                //         const formattedQty = (sizeData?.product) ? (sizeData?.product) : "-"
      
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
                // {
                //   title: 'UPC',
                //   dataIndex: '',
                //   key: '',
                //   width: 130,
                //   className: "center",
                //   render: (text, record) => {
                //     const sizeData = record.sizeWiseData.find(item => item.size === version);
                //     console.log()
                //     if (sizeData) {
                //       if (sizeData.size !== null) {
                //         const formattedQty = (sizeData?.upc) ? (sizeData?.upc) : "-"
      
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
                // {
                //   title: '	Planned Ex Factory Date',
                //   dataIndex: '',
                //   key: '',
                //   width: 130,
                //   className: "center",
                //   render: (text, record) => {
                //     const sizeData = record.sizeWiseData.find(item => item.size === version);
                //     console.log()
                //     if (sizeData) {
                //       if (sizeData.size !== null) {
                //         const formattedQty = (sizeData?.plannedExFactoryDate) ? (sizeData?.plannedExFactoryDate) : "-"
      
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
                // {
                //   title: 'Ex Factory Date',
                //   dataIndex: '',
                //   key: '',
                //   width: 70,
                //   className: "center",
                //   render: (text, record) => {
                //     const sizeData = record.sizeWiseData.find(item => item.size === version);
                //     console.log()
                //     if (sizeData) {
                //       if (sizeData.size !== null) {
                //         const formattedQty = (sizeData?.exFactoryDate) ? (sizeData?.exFactoryDate) : "-"
      
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
                // {
                //   title: 'Unit Cost',
                //   dataIndex: '',
                //   key: '',
                //   width: 70,
                //   className: "center",
                //   render: (text, record) => {
                //     const sizeData = record.sizeWiseData.find(item => item.size === version);
                //     console.log()
                //     if (sizeData) {
                //       if (sizeData.size !== null) {
                //         const formattedQty = (sizeData?.unitCost) ? (sizeData?.unitCost) : "-"
                //         // const formattedQty = (sizeData?.amount)
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
                // {
                //   title: 'Cost',
                //   dataIndex: '',
                //   key: '',
                //   width: 70,
                //   className: "center",
                //   render: (text, record) => {
                //     const sizeData = record.sizeWiseData.find(item => item.size === version);
                //     console.log()
                //     if (sizeData) {
                //       if (sizeData.size !== null) {
                //         const formattedQty = (sizeData?.cost) ? (sizeData?.cost) : "-"
                //         // const formattedQty = (sizeData?.amount)
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
              ]
            });
        })
        excelColumnsWH.push(
          {
            title: "Total Quantity",
            dataIndex: "",
            // align: "right",
            width: 90,
            render: (text, record) => {
              let sum = 0;
             // const unit = record.sizeWiseData[0].unit
              record.sizeWiseData.forEach((r) => {
                // Convert to number before summing
                sum += parseFloat(r.quantity) || 0;
              });
              return `${sum}`;
            },
          },
    
         
        //  {
        //   title:"Buyer Address",
        //     dataIndex: "buyerAddress",
        //     width: 300,
        //     render: (text) => text ? text : "-",

           
    
        //   },
          {
            title:"Delivery Address",
    
            dataIndex: "deliveryAddress",
            width: 300,
           sorter: (a, b) => a.deliveryAddress.localeCompare(b.deliveryAddress),
           sortDirections: ["ascend", "descend"],
           ...getColumnSearchProps('deliveryAddress'),
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
                <Form.Item name="poNumber" label="PO Number">
                  <Select
                    showSearch
                    placeholder="Select PO Number "
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
              {/* <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 4 }}
                lg={{ span: 4 }}
                xl={{ span: 4 }}
              >
               <Form.Item label="Style" name="style"  >
                  <Input placeholder="Enter Style " allowClear />
                </Form.Item>
              </Col> */}
              {/* <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 4 }}
                lg={{ span: 4 }}
                xl={{ span: 4 }}
              >
               <Form.Item label="Color" name="color"  >
                  <Input placeholder="Enter Color "  allowClear />
                </Form.Item>
              </Col> */}
              {/* <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 4 }}
                lg={{ span: 4 }}
                xl={{ span: 4 }}
              >
               <Form.Item label="Delivery Date" name="deliveryDate"  >
                  <RangePicker style={{width:180}}   />
                </Form.Item>
              </Col> */}
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
                    Search
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
  export default PvhOrdersGrid;
  