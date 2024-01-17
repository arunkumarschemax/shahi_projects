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
  import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
  import Highlighter from "react-highlight-words";
  import { useNavigate } from "react-router-dom";
  import {
    AlertMessages,
    OrderDataModel,
    PoOrderFilter,
  } from "@project-management-system/shared-models";
  import { ColumnsType } from "antd/es/table";
  import { useIAMClientState } from "../nike/iam-client-react";
import { Excel } from "antd-table-saveas-excel";
  
  export function PPKPOReport() {
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
    const [seasonData, setSeasonData] = useState([]);
    const [form] = Form.useForm();
    const { Option } = Select;
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const { IAMClientAuthContext, dispatch } = useIAMClientState();
    const { RangePicker } = DatePicker;
    const [poDateDis, setPoDateDis] = useState<boolean>(true);
    // const [delverDateDis, setDelverDateDis] = useState<boolean>(true);
    const [onChangeData, setonChangeData] = useState({});
  
    useEffect(() => {
      getorderData();
      getPoNumber();
      getseasonData()
    }, []);

  
  //   const getorderData = () => {
  //     const req = new PoOrderFilter();
  
  //     if (form.getFieldValue("poNumber") !== undefined) {
  //       req.poNumber = form.getFieldValue("poNumber");
  //     } 
  //     if (form.getFieldValue('poDate') !== undefined) {
  //       req.poDateStartDate = (form.getFieldValue('poDate')[0]).format('YYYY-MM-DD');
  //     }
  //     if (form.getFieldValue('poDate') !== undefined) {
  //       req.poDateEndDate = (form.getFieldValue('poDate')[1]).format('YYYY-MM-DD');
  //     }
  //     if (form.getFieldValue('deliveryDate') !== undefined) {
  //       req.deliveryDateStartDate = (form.getFieldValue('deliveryDate')[0]).format('YYYY-MM-DD');
  //     }
  //     if (form.getFieldValue('deliveryDate') !== undefined) {
  //       req.deliveryDateEndDate = (form.getFieldValue('deliveryDate')[1]).format('YYYY-MM-DD');
  //     }
  //     if (form.getFieldValue("season") !== undefined) {
  //       req.season = form.getFieldValue("season");
  //     }
  //    req.externalRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
  
  //     service.getorderData(req).then((res) => {
  //       if (res.status) {
  //         setOrderData(res.data);
  //         setFilterData(res.data);
  //       } else {
  //         setOrderData([]);
  //         setFilterData([])
  //         AlertMessages.getErrorMessage(res.internalMessage);
  //       }
  //     }).catch((err) => {
  //       console.log(err.message);
  //     });
  // };
    
  const getorderData = () => {
    const req = new PoOrderFilter();

    if (form.getFieldValue("poNumber") !== undefined) {
      req.poNumber = form.getFieldValue("poNumber");
    } 
    
    if(onChangeData === "po_date"){
       
      if (form.getFieldValue('range_date') !== undefined) {
        req.poDateStartDate = (form.getFieldValue('range_date')[0]).format('YYYY-MM-DD');
      }
      if (form.getFieldValue('range_date') !== undefined) {
        req.poDateEndDate = (form.getFieldValue('range_date')[1]).format('YYYY-MM-DD');
      }
    } else if (onChangeData === "delivery_date"){
        
      if (form.getFieldValue('range_date') !== undefined) {
        req.deliveryDateStartDate = (form.getFieldValue('range_date')[0]).format('YYYY-MM-DD');
      }
      if (form.getFieldValue('range_date') !== undefined) {
        req.deliveryDateEndDate = (form.getFieldValue('range_date')[1]).format('YYYY-MM-DD');
      }
    } else if (onChangeData === "export"){

      if (form.getFieldValue('range_date') !== undefined) {
        req.exportDateStartDate = (form.getFieldValue('range_date')[0]).format('YYYY-MM-DD');
      }
      if (form.getFieldValue('range_date') !== undefined) {
        req.exportDateEndDate = (form.getFieldValue('range_date')[1]).format('YYYY-MM-DD');
      }

    } else if(onChangeData === "exfactory"){

      if (form.getFieldValue('range_date') !== undefined) {
        req.exfactoryDateStartDate = (form.getFieldValue('range_date')[0]).format('YYYY-MM-DD');
      }
      if (form.getFieldValue('range_date') !== undefined) {
        req.exfactoryDateEndDate = (form.getFieldValue('range_date')[1]).format('YYYY-MM-DD');
      }

    }

  

   
    if (form.getFieldValue("season") !== undefined) {
      req.season = form.getFieldValue("season");
    }
   req.externalRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null

    service.getCentricorderDataForPPK(req).then((res) => {
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
      service.getPoNumberforPPKReport().then((res) => {
        if (res.status) {
          setPoNumber(res.data);
        
        }
      });
    };
    
    const getseasonData = () => {
      service.getseasonData().then((res) => {
        if (res.status) {
          setSeasonData(res.data);
        
        }
      });
    }
    
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
              title: "Season",
              dataIndex: "season",
              width: 90,
              render: (text) => text ? text : "-"
            },
            {
              title: "Shipment Method",
              dataIndex: "shipmentMethod",
              width: 90,
              render: (text) => text ? text : "-",
              
    
            },
            {
              title: "Division",
              dataIndex: "division",
              width: 150,
              render: (text) => text ? text : "-",
              
              
            },
            {
              title: "Manufacture",
              dataIndex: "manufacture",
              width: 500,
              render: (text) => (
                
                  text ? text : "-"
                
              ),
            },
            {
              title: "PO Number",
              dataIndex: "poNumber",
              width: 90,
    
              render: (text) => text ? text : "-",
    
          
            },
           
            {
                title: "PO Line Number",
                dataIndex: "poLine",
                width: 90,
                render: (text) => text ? text : "-",
      

              },
              {
                title: "Material",
                dataIndex: "material",
                width: 200,
                render: (text) => text ? text : "-",
          
              },
              {
                title: "Compt.Material",
                dataIndex: "comptMaterial",
                width: 150,
                render: (text) => text ? text : "-",
              
      
              },
              {
                title: "Gender",
                dataIndex: "gender",
                width: 90,
                render: (text) => text ? text : "-",
              
    
              },
              {
                title: "Short Description",
                dataIndex: "shortDescription",
                width:300,
                render: (text) => text ? text : "-",
              },
              {
                title: "Color",
                dataIndex: "color",
                width: 200,
                render: (text) => text ? text : "-",
                
              },
              {
                title: "Label",
                dataIndex: "label",
                width: 90,
                render: (text) => text ? text : "-",
            
                
              },
              {
                title: "Reference",
                dataIndex: "reference",
                width: 90,
                render: (text) => text ? text : "-",
            
    
              },
              {
                title: "Pack Method",
                dataIndex: "packMethod",
                width: 300,
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
                  title: 'Ratio',
                  dataIndex: '',
                  key: '',
                  width: 70,
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
                  width: 150,
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
            //   {
            //     title: 'label',
            //     dataIndex: '',
            //     key: '',
            //     width: 70,
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
                      title: 'Tot PO Qty in PC',
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
              sum += parseFloat(r.totalQuantity) || 0;
            });
            return sum;
          },
        },
        {
          title: "Special Instructions",
          dataIndex: "specialInstructions",
          width: 400,
          render: (text) => (  text ? text: "-"),

        },
        {
          title: "PPK UPC",
          dataIndex: "ppkUpc",
          width: 110,
          render: (text) => text ? text : "-",
         
        },
        {
          title: "PO Date",
          dataIndex: "PODate",
          align: "center",
          width: 90,
          render: (text) => text ? text : "-"
        },
           
        {
            title: "Ex-factory Date",
            dataIndex: "exFactoryDate",
            align: "center",
            width: 90,
            render: (text) => (  text ? text: "-"),

          },
        {
            title: "Export Date",
            dataIndex: "exPortDate",
            align: "center",
            width: 90,
            render: (text) => (  text ? text: "-"),

          },
        {
            title: "Delivery Date",
            dataIndex: "deliveryDate",
            align: "center",
            width: 90,
            render: (text) => (  text ? text: "-"),
            
          },
        
       
        {
          title: "Incoterm",
          dataIndex: "incoterm",
          width: 400,
          sorter: (a, b) => a.incoterm.localeCompare(b.incoterm),
          sortDirections: ["ascend", "descend"],
          ...getColumnSearchProps('incoterm'),
          render: (text) => (  text ? text: "-"),
        },

        {
          title: "Port Of Export",
          dataIndex: "portOfExport",
          align: "center",
          width: 90,
          render: (text) => text ? text : "-",

        },
        {
          title: "Port of Entry Name",
          dataIndex: "portOfEntry",
          align: "center",
          width: 200,
          render: (text) => text ? text : "-",

        },
       
       
        {
          title: "Payment Terms Description",
          dataIndex: "paymentTermDescription",
          align: "center",
          width: 150,
          render: (text) => text ? text : "-",
          

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
        {
          title: "Ship to Address",
          dataIndex: "shipToAddress",
          width: 400,
          render: (text) => (  text ? text: "-"),

        },
      
      );

       
    
            excel
              .addSheet(`PPK PO Report (${formattedDate})`)
              .addColumns(excelColumnsWH)
              .addDataSource(filterData, { str2num: false });

     
        excel.saveAs(`PPK PO Report ${formattedDate}.xlsx`);
      
    



    // const obj = {};

    // const monthTotals = {};
    // sizeHeaders.forEach((mon) => {
    //   let monthValue = 0;
    //   monthTotals[mon] = 0;
    //   data.forEach((r) => {
    //     const sizeData = r?.MonthItemData?.find((item) => item.monthName == mon);
    //     // console.log(sizeData);
    //     monthValue = sizeData ? Number(sizeData?.totalQuantity) : 0;
    //     monthTotals[mon] += monthValue;
    //     // grandTotal += monthValue;
    //   });
    // });
    // console.log(monthTotals);
    // console.log(data[0]);
    // obj['MonthItemData'] = [];
    // obj['itemName'] = "Grand Total";
    // Object.keys(monthTotals).forEach(k => {
    //   obj['MonthItemData'].push({ monthName : k, totalQuantity : monthTotals[k]});
    // });
    // const dataDuplicate = JSON.parse(JSON.stringify(data));
    // dataDuplicate.push(obj);
    // console.log(dataDuplicate[dataDuplicate.length]);


 
  }


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
  
    // const setMoreData = (record) => {
    //   navigate("/ralph-lauren/order-data-detail-view", {
    //     state: { data: record },
    //   });
    // };
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
          title: "Season",
          dataIndex: "season",
          width: 90,
          sorter: (a, b) => a.season.localeCompare(b.season),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-"
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
          render: (text) => text ? text : "-",

          // fixed: "left",
          // ...getColumnSearchProps('poNumber')
        },
       
        {
            title: "PO Line Number",
            dataIndex: "poLine",
            width: 90,
            sorter: (a, b) => a.poLine.localeCompare(b.poLine),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-",
            ...getColumnSearchProps('poLine')
            // fixed: "left",
          },
          {
            title: "Material",
            dataIndex: "material",
            width: 150,
            sorter: (a, b) => a.material.localeCompare(b.material),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-",
            ...getColumnSearchProps('material')
          },
          {
            title: "Compt.Material",
            dataIndex: "comptMaterial",
            width: 150,
            // sorter: (a, b) => a.comptMaterial.localeCompare(b.comptMaterial),
            // sortDirections: ["ascend", "descend"],
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
            title: "Reference",
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
                  width: 70,
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
                  width: 70,
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
            //   {
            //     title: 'label',
            //     dataIndex: '',
            //     key: '',
            //     width: 70,
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
                      title: 'Tot PO Qty in PC',
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
              sum += parseFloat(r.totalQuantity) || 0;
            });
            return sum;
          },
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
          title: "PPK UPC",
          dataIndex: "ppkUpc",
          width: 110,
          sorter: (a, b) => a.ppkUpc.localeCompare(b.ppkUpc),
          sortDirections: ["ascend", "descend"],
          render: (text) => text ? text : "-",
          ...getColumnSearchProps('ppkUpc')
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
          width: 150,
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
        {
          title: "Ship to Address",
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
            <Table size="large" />
          )} */}
        </>
      );
    };

    const onDateChange = (value:any) =>{
      console.log(value)
      setonChangeData(value)
      if(value){
        setPoDateDis(false)
        form
      } else {
        setPoDateDis(true)
      }

    }
  
    return (
      <>
        <Card title="PPK PO Report" headStyle={{ fontWeight: "bold" }} 
        
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
                    placeholder="Select PO Number"
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
               <Form.Item label="Season" name="season">
                  <Input placeholder="Enter Season" allowClear={true} />
                </Form.Item>
              </Col>
              
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 4 }}
                lg={{ span: 4 }}
                xl={{ span: 4 }}
              >
               <Form.Item label="Date" name="test">
               <Select
                    showSearch
                    placeholder="Select Date"
                    optionFilterProp="children"
                    allowClear
                    onChange={onDateChange}
                  >
                <Option value ="po_date">PO Date</Option>
                <Option value ="delivery_date">Delivery Date</Option>
                <Option value ="export">Export Date</Option>
                <Option value ="exfactory">Ex Factory Date</Option>
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
               <Form.Item label="Range" name="range_date" hidden={poDateDis}  >
                  <RangePicker  style={{width:180}}/>
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
                <Form.Item>
                  <Button
                   style={{marginTop:20,marginLeft:40}}

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
                    style={{marginTop:20,marginLeft:100}}
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
  export default PPKPOReport;
  