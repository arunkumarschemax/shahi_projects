import {
    Button,
    Card,
    Col,
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
    const [form] = Form.useForm();
    const { Option } = Select;
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const { IAMClientAuthContext, dispatch } = useIAMClientState();
  
    useEffect(() => {
      getorderData();
      getPoNumber()
    }, []);

  
    const getorderData = () => {
      const req = new PoOrderFilter();
  
      if (form.getFieldValue("poNumber") !== undefined) {
        req.poNumber = form.getFieldValue("poNumber");
      } 
     req.externalRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
  
      service.getorderData(req).then((res) => {
        if (res.status) {
          setOrderData(res.data);
          setFilterData(res.data);
        }
      });
    };

    const getPoNumber = () => {
      service.getPoNumber().then((res) => {
        if (res.status) {
          setPoNumber(res.data);
        
        }
      });
    };
    
  const exportExcel = () => {
    const excel = new Excel();

          let rowIndex = 1;
          const excelColumnsWH: any[] = [];
          excelColumnsWH.push(
            { 
              title: "#", 
              // dataIndex: "sno", 
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
              width: 90,
              sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
              sortDirections: ["ascend", "descend"],
              fixed: "left",
              // ...getColumnSearchProps('poNumber')
            },
            {
                title: "Line Number",
                dataIndex: "poLine",
                width: 90,
                sorter: (a, b) => a.lineNumber.localeCompare(b.lineNumber),
                sortDirections: ["ascend", "descend"],
                fixed: "left",
              },
            {
              title: "Division",
              dataIndex: "division",
              width: 90,
              sorter: (a, b) => a.division.localeCompare(b.division),
              sortDirections: ["ascend", "descend"],
            },
            {
              title: "Manufacture",
              dataIndex: "manufacture",
              width: 90,
              sorter: (a, b) => a.manufacture.localeCompare(b.manufacture),
              sortDirections: ["ascend", "descend"],
            },
            {
                title: "Material",
                dataIndex: "material",
                width: 90,
                sorter: (a, b) => a.material.localeCompare(b.material),
                sortDirections: ["ascend", "descend"],
              },
            {
              title: "Compt.Material",
              dataIndex: "comptMaterial",
              width: 110,
              sorter: (a, b) => a.comptMaterial.localeCompare(b.comptMaterial),
              sortDirections: ["ascend", "descend"],
            },
            {
                title: "Gender",
                dataIndex: "gender",
                width: 90,
                sorter: (a, b) => a.gender.localeCompare(b.gender),
                sortDirections: ["ascend", "descend"],
              },
              {
                title: "Short Description",
                dataIndex: "shortDescription",
                width: 90,
                sorter: (a, b) => a.shortDescription.localeCompare(b.shortDescription),
                sortDirections: ["ascend", "descend"],
              },
              {
                title: "Color",
                dataIndex: "color",
                width: 90,
                sorter: (a, b) => a.color.localeCompare(b.color),
                sortDirections: ["ascend", "descend"],
              },
              {
                title: "Reference",
                dataIndex: "reference",
                width: 90,
                sorter: (a, b) => a.reference.localeCompare(b.reference),
                sortDirections: ["ascend", "descend"],
              },
              {
                title: "Pack Method",
                dataIndex: "packMethod",
                width: 90,
                sorter: (a, b) => a.packMethod.localeCompare(b.packMethod),
                sortDirections: ["ascend", "descend"],
              },
              {
                title: "Season",
                dataIndex: "season",
                width: 90,
                sorter: (a, b) => a.season.localeCompare(b.season),
                sortDirections: ["ascend", "descend"],
              },
              {
                title: "Shipment Method",
                dataIndex: "shipmentMethod",
                width: 90,
                sorter: (a, b) => a.shipmentMethod.localeCompare(b.shipmentMethod),
                sortDirections: ["ascend", "descend"],
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
                                  const formattedQty = (sizeData?.fobPrice)
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
                                  const formattedQty = (sizeData?.totalQuantity)
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
                      title: 'Special Instructions',
                      dataIndex: '',
                      key: '',
                      width: 100,
                      className: "center",
                      render: (text, record) => {
                          const sizeData = record.sizeWiseData.find(item => item.size === version);
                          console.log()
                          if (sizeData) {
                              if (sizeData.size !== null) {
                                  const formattedQty = (sizeData?.specialInstruction)
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
                                const formattedQty = (sizeData?.upc)
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
                                const formattedQty = (sizeData?.retailPrice)
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
            title: "PO Date",
            dataIndex: "PODate",
            align: "center",
            width: 90,
            sorter: (a, b) => a.PODate.localeCompare(b.PODate),
            sortDirections: ["ascend", "descend"],
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
            title: "X-Port Date",
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
            align: "center",
            width: 90,
            sorter: (a, b) => a.incoterm.localeCompare(b.incoterm),
            sortDirections: ["ascend", "descend"],
          },

        {
            title: "Port Of Export",
            dataIndex: "portOfExport",
            align: "center",
            width: 90,
            sorter: (a, b) => a.portOfExport.localeCompare(b.portOfExport),
            sortDirections: ["ascend", "descend"],
          },

        {
            title: "Port of Entry Name",
            dataIndex: "portOfEntry",
            align: "center",
            width: 90,
            sorter: (a, b) => a.portOfEntry.localeCompare(b.portOfEntry),
            sortDirections: ["ascend", "descend"],
          },

        {
            title: "Payment Terms Description",
            dataIndex: "paymentTermDescription",
            align: "center",
            width: 90,
            sorter: (a, b) => a.paymentTermDescription.localeCompare(b.paymentTermDescription),
            sortDirections: ["ascend", "descend"],
          },

        {
            title: "Vendor Booking Flag",
            dataIndex: "vendorFlag",
            align: "center",
            width: 90,
            sorter: (a, b) => a.vendorFlag.localeCompare(b.vendorFlag),
            sortDirections: ["ascend", "descend"],
          },

          {
              title: "Ship to Address",
              dataIndex: "shipToAddress",
              align: "center",
              width: 90,
              sorter: (a, b) => a.shipToAddress.localeCompare(b.shipToAddress),
              sortDirections: ["ascend", "descend"],
            },
 
      
      );

       
    
            excel
              .addSheet(`solid pack PO report`)
              .addColumns(excelColumnsWH)
              .addDataSource(filterData, { str2num: true });

     
        excel.saveAs("solid pack PO Report.xlsx");
      
    



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
  
    const setMoreData = (record) => {
      navigate("/ralph-lauren/order-data-detail-view", {
        state: { data: record },
      });
    };
    const getSizeWiseHeaders = (data: OrderDataModel[]) => {
      const sizeHeaders = new Set<string>();
      data?.forEach((rec) =>
        rec.sizeWiseData?.forEach((version) => {
          sizeHeaders.add("" + version.size);
        })
      );
      return Array.from(sizeHeaders);
    };
  
  
    const renderReport = (data: OrderDataModel[]) => {
      const sizeHeaders = getSizeWiseHeaders(data);

  
      const columns: ColumnsType<any> = [
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
          fixed: "left",
          // ...getColumnSearchProps('poNumber')
        },
        {
            title: "Line Number",
            dataIndex: "poLine",
            width: 90,
            sorter: (a, b) => a.lineNumber.localeCompare(b.lineNumber),
            sortDirections: ["ascend", "descend"],
            fixed: "left",
          },
        {
          title: "Division",
          dataIndex: "division",
          width: 90,
          sorter: (a, b) => a.division.localeCompare(b.division),
          sortDirections: ["ascend", "descend"],
        },
        {
          title: "Manufacture",
          dataIndex: "manufacture",
          width: 90,
          sorter: (a, b) => a.manufacture.localeCompare(b.manufacture),
          sortDirections: ["ascend", "descend"],
        },
        {
            title: "Material",
            dataIndex: "material",
            width: 90,
            sorter: (a, b) => a.material.localeCompare(b.material),
            sortDirections: ["ascend", "descend"],
          },
        {
          title: "Compt.Material",
          dataIndex: "comptMaterial",
          width: 110,
          sorter: (a, b) => a.comptMaterial.localeCompare(b.comptMaterial),
          sortDirections: ["ascend", "descend"],
        },
        {
            title: "Gender",
            dataIndex: "gender",
            width: 90,
            sorter: (a, b) => a.gender.localeCompare(b.gender),
            sortDirections: ["ascend", "descend"],
          },
          {
            title: "Short Description",
            dataIndex: "shortDescription",
            width: 90,
            sorter: (a, b) => a.shortDescription.localeCompare(b.shortDescription),
            sortDirections: ["ascend", "descend"],
          },
          {
            title: "Color",
            dataIndex: "color",
            width: 90,
            sorter: (a, b) => a.color.localeCompare(b.color),
            sortDirections: ["ascend", "descend"],
          },
          {
            title: "Reference",
            dataIndex: "reference",
            width: 90,
            sorter: (a, b) => a.reference.localeCompare(b.reference),
            sortDirections: ["ascend", "descend"],
          },
          {
            title: "Pack Method",
            dataIndex: "packMethod",
            width: 90,
            sorter: (a, b) => a.packMethod.localeCompare(b.packMethod),
            sortDirections: ["ascend", "descend"],
          },
          {
            title: "Season",
            dataIndex: "season",
            width: 90,
            sorter: (a, b) => a.season.localeCompare(b.season),
            sortDirections: ["ascend", "descend"],
          },
          {
            title: "Shipment Method",
            dataIndex: "shipmentMethod",
            width: 90,
            sorter: (a, b) => a.shipmentMethod.localeCompare(b.shipmentMethod),
            sortDirections: ["ascend", "descend"],
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
                                  const formattedQty = (sizeData?.fobPrice)
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
                                  const formattedQty = (sizeData?.totalQuantity)
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
                      title: 'Special Instructions',
                      dataIndex: '',
                      key: '',
                      width: 100,
                      className: "center",
                      render: (text, record) => {
                          const sizeData = record.sizeWiseData.find(item => item.size === version);
                          console.log()
                          if (sizeData) {
                              if (sizeData.size !== null) {
                                  const formattedQty = (sizeData?.specialInstruction)
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
                                const formattedQty = (sizeData?.upc)
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
                                const formattedQty = (sizeData?.retailPrice)
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
            title: "PO Date",
            dataIndex: "PODate",
            align: "center",
            width: 90,
            sorter: (a, b) => a.PODate.localeCompare(b.PODate),
            sortDirections: ["ascend", "descend"],
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
            title: "X-Port Date",
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
            align: "center",
            width: 90,
            sorter: (a, b) => a.incoterm.localeCompare(b.incoterm),
            sortDirections: ["ascend", "descend"],
          },

        {
            title: "Port Of Export",
            dataIndex: "portOfExport",
            align: "center",
            width: 90,
            sorter: (a, b) => a.portOfExport.localeCompare(b.portOfExport),
            sortDirections: ["ascend", "descend"],
          },

        {
            title: "Port of Entry Name",
            dataIndex: "portOfEntry",
            align: "center",
            width: 90,
            sorter: (a, b) => a.portOfEntry.localeCompare(b.portOfEntry),
            sortDirections: ["ascend", "descend"],
          },

        {
            title: "Payment Terms Description",
            dataIndex: "paymentTermDescription",
            align: "center",
            width: 90,
            sorter: (a, b) => a.paymentTermDescription.localeCompare(b.paymentTermDescription),
            sortDirections: ["ascend", "descend"],
          },

        {
            title: "Vendor Booking Flag",
            dataIndex: "vendorFlag",
            align: "center",
            width: 90,
            sorter: (a, b) => a.vendorFlag.localeCompare(b.vendorFlag),
            sortDirections: ["ascend", "descend"],
          },

          {
              title: "Ship to Address",
              dataIndex: "shipToAddress",
              align: "center",
              width: 90,
              sorter: (a, b) => a.shipToAddress.localeCompare(b.shipToAddress),
              sortDirections: ["ascend", "descend"],
            },
 
        //   {
        //       title: "Status",
        //       dataIndex: "status",
        //       align: "center",
        //       width: 90,
        //       sorter: (a, b) => a.status.localeCompare(b.status),
        //       sortDirections: ["ascend", "descend"],
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
  
    return (
      <>
        <Card title="Order " headStyle={{ fontWeight: "bold" }} 
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
                xl={{ span: 6 }}
              >
                <Form.Item name="poLine" label="PO Line">
                  <Select
                    showSearch
                    placeholder="Select PO Line"
                    optionFilterProp="children"
                    allowClear
                  >
                    {orderData.map((inc: any) => {
                      return (
                        <Option key={inc.poLine} value={inc.poLine}>
                          {inc.poLine}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col> */}
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 5 }}
                lg={{ span: 5 }}
                xl={{ span: 4 }}
              >
                <Form.Item>
                  <Button
                    htmlType="submit"
                    icon={<SearchOutlined />}
                    type="primary"
                  >
                    SEARCH
                  </Button>
                  <Button
                    style={{ marginLeft: 8 }}
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
  