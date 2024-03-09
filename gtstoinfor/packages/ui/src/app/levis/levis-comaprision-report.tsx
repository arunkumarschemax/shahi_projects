import { Alert, Button, Card, Col, Form, Input, Row, Select, Space, Spin, Table, Tabs, Tooltip, Typography, message } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import { CentricService, EddieService, LevisService, OrdersService, RLOrdersService } from "@project-management-system/shared-services"
import React, { useEffect, useRef, useState } from "react"
import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons"
import AlertMessages from "../common/common-functions/alert-messages"
import moment from "moment"
import { Excel } from "antd-table-saveas-excel"
import { EditLevisOrderAcceptanceRequest, LevisOrderAcceptanceRequest, LevisOrderFilter, PoOrderFilter } from "@project-management-system/shared-models"
import Highlighter from "react-highlight-words"



export const LevisComaparisionReport = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState<number>(1);
 const service = new LevisService();
  const { Text } = Typography;
  const [pageSize, setPageSize] = useState(10);
  const [filterData, setFilterData] = useState([]);
  const [orderData, setOrderData] = useState<any>([]);
  const [poNumberData, setPoNumberData] = useState<any>([]);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [itemNoValues, setItemNoValues] = useState({});
  const [loading, setLoading] = useState(false);

  const { Option } = Select;

  useEffect(() => {
    getordercomparationData();
    getPoNumber();
  }, []);
  
  const getordercomparationData = () => {
    setLoading(true);
    const req = new LevisOrderFilter();

    if (form.getFieldValue("poNumber") !== undefined) {
      req.poNumber = form.getFieldValue("poNumber");
    }
  

    service.getordercomparationData(req).then((res) => {
      setLoading(false);
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

    service.getPoNumber().then((res) => {
      if (res.status) {
        setPoNumberData(res.data);
      
      } else {
        setPoNumberData([]);
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
       setPoNumberData([]);
       AlertMessages.getErrorMessage(err.message);
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

  const handleItemNoChange = (value, record, index) => {
    const formValues = form.getFieldsValue();
    const itemNoValue = formValues[index]?.itemNo;

    console.log("Item No from form:", itemNoValue);

    setItemNoValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };


  const editCOLineReq = (record, index) => {
    //const formValues = form.getFieldsValue();
    // const itemNoValue = formValues[index]?.itemNo;
    // console.log(record,'hhhhhhhhhhhhhhhh');
    const req = new EditLevisOrderAcceptanceRequest();
    req.poNumber = record.poNumber;
    req.material=record.material
    req.poLine=record.poLine
    req.itemNo=record.itemNo
    req.coNumber=record.coNumber
    req.coDate=record.coDate
    req.material=record.material
    // req.itemNo = itemNoValue;
    req.buyer = 'LEVIS';
    // req.deliveryDate = record.deliveryDate;
  
    console.log("Request Payload:", req);
  
    service.editCoLineCreationReq(req).then((res) => {
      if (res.status) {
        getordercomparationData();
        setItemNoValues({});
        form.setFieldsValue({ [index]: { itemNo: undefined } });
        message.success(res.internalMessage);
      } else {
        message.error(res.internalMessage);
      }
    });
  };

  

  const processData = (tableData: EditLevisOrderAcceptanceRequest[]) => {
    const dataTobeReturned = [];
    const roleWiseMapData = new Map<string, EditLevisOrderAcceptanceRequest[]>();

    tableData.forEach(rec => {
      const key = `${rec.poNumber}_${rec.itemNo} `;

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





  // const isActionButtonEnabled = (index) => {
  //   return (
  //     itemNoValues[index] &&
  //     itemNoValues[index].trim() !== ""
  //   );
  // };
  
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
        fixed: "left",
      },
      {
        title: "PO Number",
        dataIndex: "poNumber",
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
        title: "PO Line",
        dataIndex: "po_line",
        width: 90,
        sorter: (a, b) => {
          const codeA = (a.po_line || "").toString();
          const codeB = (b.po_line || "").toString();
          return codeA.localeCompare(codeB);
      },
      sortDirections: ["ascend", "descend"],
        ...getColumnSearchProps('po_line'),
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
        title: "Price",
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
            dataIndex: 'newQuantity',
            key: '',
            width: 100,
            className: "center",
            render: (text) => text ? text : "-"
    
          },
  ]
      },
      {
        title: "Ex-Factory Date",
        dataIndex: "",
        width: 90,
        // sorter: (a, b) => a.size.localeCompare(b.size),
        // sortDirections: ["ascend", "descend"],
        children: [
          {
            title: 'Old Value',
            dataIndex: 'oldexFactoryDate',
            key: '',
            width: 100,
            className: "center",
            render: (text) => {
              try {
                return text ? moment(text, 'DD.MM.YYYY').format('DD/MM/YYYY') : "-";
              } catch (error) {
                console.error("Error converting date:", text, error);
                return "-";
              }
            }
           
          },
          {
            title: 'New Value ',
            dataIndex: 'newexFactoryDate',
            key: '',
            width: 100,
            className: "center",
            render: (text) => {
              try {
                return text ? moment(text, 'DD.MM.YYYY').format('DD/MM/YYYY') : "-";
              } catch (error) {
                console.error("Error converting date:", text, error);
                return "-";
              }
            }
            // (moment(rec.last_modified_date).format('MM/DD/YYYY')
    
          },
  ]
        
      },
      {
        title: "Trans Mode",
        dataIndex: "",
        width: 90,
        // sorter: (a, b) => a.size.localeCompare(b.size),
        // sortDirections: ["ascend", "descend"],
        children: [
          {
            title: 'Old Value',
            dataIndex: 'oldtransMode',
            key: '',
            width: 100,
            className: "center",
            render: (text) => text ? text : "-"
           
          },
          {
            title: 'New Value',
            dataIndex: 'newtransMode',
            key: '',
            width: 100,
            className: "center",
            render: (text) => text ? text : "-"
    
          },
  ]
      },
     
      {
        title: "Destination",
        dataIndex: "",
        width: 90,
        // sorter: (a, b) => a.size.localeCompare(b.size),
        // sortDirections: ["ascend", "descend"],
        children: [
          {
            title: 'Old Value',
            dataIndex: 'olddeliveryAddress',
            key: '',
            width: 130,
            className: "center",
            render: (text) => (
              <Tooltip title={text || "-"}>
                {text ? `${text.substring(0, 25)}...` : "-"}
              </Tooltip>
            ),
           
          },
          {
            title: 'New Value',
            dataIndex: 'newdeliveryAddress',
            key: '',
            width: 130,
            className: "center",
            render: (text) => (
              <Tooltip title={text || "-"}>
                {text ? `${text.substring(0, 25)}...` : "-"}
              </Tooltip>
            ),
          },
  ]
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

      // {
      //   title: "Item No",
      //   dataIndex: "itemNo",
      //   width: 100,
      //   align: "center",
      //   fixed: 'right',
      //   render: (text, record, index) => {
      //     console.log(record,"ppp")
      //     return {
      //       children: (

      //         <Form.Item name={[index, 'itemNo']}>
      //           <Input
      //             style={{ width: '95px' }}
      //             placeholder="Enter Item No"
      //             onChange={(e) => handleItemNoChange(e.target.value, record, index)}
      //            // disabled={record.status == 'OPEN' ? false : true}
      //           />
      //         </Form.Item>

      //       ),
      //       props: {
      //         rowSpan: record.rowSpan,
      //       },
      //     };
      //   },
      // },
    //   {
    //     title: "Item No",
    //     dataIndex: "itemNo",
    //     width: 90,
    //    // sorter: (a, b) => a.custPo.localeCompare(b.custPo),
    //  //   sortDirections: ["ascend", "descend"],
    //    // render: (text) => text ? text : "-",
    //     render: (text, record, index) => {
    //       return {
    //         children: text,
    //         props: {
    //           rowSpan: record.rowSpan,
    //         },
    //       };
    //     },

    //     fixed:"right",
    //     // ...getColumnSearchProps('poNumber')
    //   },
      {
        title: "Action",
        dataIndex: "action",
        width: 80,
        align: "center",
        fixed: 'right',
        render: (text, record, index) => {
         // const isEnabled = isActionButtonEnabled(index);
          return {
            children: (
              <Button
                  style={{ position: "relative", top: "-7.5px" }}
                  onClick={() => editCOLineReq(record, index)}
                  disabled={record.status !== 'OPEN'}
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

    ];

    // sizeHeaders?.forEach(version => {
    //   columns.push({
    //     title: version,
    //     dataIndex: version,
    //     key: version,
    //     width: 70,
    //     align: 'center',
    //     children: [
    //       {
    //         title: 'UPC/EAN',
    //         dataIndex: '',
    //         key: '',
    //         width: 100,
    //         className: "center",
    //         render: (text, record) => {
    //           const sizeData = record.sizeWiseData.find(item => item.size === version);
    //           console.log()
    //           if (sizeData) {
    //             if (sizeData.size !== null) {
    //               const formattedQty = (sizeData?.upcEan)
    //               return (
    //                 formattedQty
    //               );
    //             } else {

    //               return (
    //                 '-'
    //               );
    //             }
    //           } else {
    //             return '-';
    //           }
    //         }
    //       },

    //       {
    //         title: 'MSRP',
    //         dataIndex: '',
    //         key: '',
    //         width: 70,
    //         className: "center",
    //         render: (text, record) => {
    //           const sizeData = record.sizeWiseData.find(item => item.size === version);
    //           console.log()
    //           if (sizeData) {
    //             if (sizeData.size !== null) {
    //               const formattedQty = (sizeData?.msrpPrice)
    //               return (
    //                 formattedQty
    //               );
    //             } else {

    //               return (
    //                 '-'
    //               );
    //             }
    //           } else {
    //             return '-';
    //           }
    //         }
    //       },
    //       {
    //         title: 'Customer Selling Price',
    //         dataIndex: '',
    //         key: '',
    //         width: 100,
    //         className: "center",
    //         render: (text, record) => {
    //           const sizeData = record.sizeWiseData.find(item => item.size === version);
    //           console.log()
    //           if (sizeData) {
    //             if (sizeData.size !== null) {
    //               const formattedQty = (sizeData?.csprice)
    //               return (
    //                 formattedQty
    //               );
    //             } else {

    //               return (
    //                 '-'
    //               );
    //             }
    //           } else {
    //             return '-';
    //           }
    //         }
    //       },
    //       {
    //         title: 'Price',
    //         dataIndex: '',
    //         key: '',
    //         width: 100,
    //         className: "center",
    //         render: (text, record) => {
    //           const sizeData = record.sizeWiseData.find(item => item.size === version);

    //           if (sizeData) {
    //             if (sizeData.size !== null) {
    //               const formattedQty = ${sizeData.price} ${sizeData.currency};
    //               return formattedQty;
    //             } else {
    //               return '-';
    //             }
    //           } else {
    //             return '-';
    //           }
    //         }
    //       },

    //       {
    //         title: 'Quantity',
    //         dataIndex: '',
    //         key: '',
    //         width: 100,
    //         className: "center",
    //         render: (text, record) => {
    //           const sizeData = record.sizeWiseData.find(item => item.size === version);
    //           console.log()
    //           if (sizeData) {
    //             if (sizeData.size !== null) {
    //               const formattedQty = (sizeData?.quantity)
    //               return (
    //                 formattedQty
    //               );
    //             } else {

    //               return (
    //                 '-'
    //               );
    //             }
    //           } else {
    //             return '-';
    //           }
    //         }
    //       },
    //       {
    //         title: 'Amount',
    //         dataIndex: '',
    //         key: '',
    //         width: 100,
    //         className: "center",
    //         render: (text, record) => {
    //           const sizeData = record.sizeWiseData.find(item => item.size === version);
    //           console.log()
    //           if (sizeData) {
    //             if (sizeData.size !== null) {
    //               const formattedQty = ${sizeData.amount} ${sizeData.currency};
    //               // const formattedQty = (sizeData?.amount)
    //               return (
    //                 formattedQty
    //               );
    //             } else {

    //               return (
    //                 '-'
    //               );
    //             }
    //           } else {
    //             return '-';
    //           }
    //         }
    //       },
         
    //     ]
    //   });
    // })

   

    const getRowClassName = (record) => {
      if (record.displayName) {
        return "colored-row";
      }
      return "";
    };

    return (
      <>
{loading ? (
  <Spin spinning={loading}>
    {/* Content to show while loading */}
    <div>Loading...</div>
  </Spin>
) : (

          <Table
            // loading={tableLoading}
            columns={columns}
            dataSource={processData(filterData)}
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
)}
      
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
        title: "PO Number",
        dataIndex: "poNumber",
        width: 90,
        render: (text) => text ? text : "-"
      },
 
      {
        title: "PO Line",
        dataIndex: "po_line",
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
        title: "Price",
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
            dataIndex: 'newQuantity',
            key: '',
            width: 100,
            render: (text) => text ? text : "-"
    
          },
  ]
      },
      {
        title: "Ex-Factory Date",
        dataIndex: "",
        width: 90,
        children: [
          {
            title: 'Old Value',
            dataIndex: 'oldexFactoryDate',
            key: '',
            width: 100,
            render: (text) => {
              try {
                return text ? moment(text, 'DD.MM.YYYY').format('DD/MM/YYYY') : "-";
              } catch (error) {
                console.error("Error converting date:", text, error);
                return "-";
              }
            }
           
          },
          {
            title: 'New Value ',
            dataIndex: 'newexFactoryDate',
            key: '',
            width: 100,
            render: (text) => {
              try {
                return text ? moment(text, 'DD.MM.YYYY').format('DD/MM/YYYY') : "-";
              } catch (error) {
                console.error("Error converting date:", text, error);
                return "-";
              }
            }
    
          },
  ]
        
      },

      {
        title: "Trans Mode",
        dataIndex: "",
        width: 90,
        children: [
          {
            title: 'Old Value',
            dataIndex: 'oldtransMode',
            key: '',
            width: 100,
            render: (text) => text ? text : "-"
           
          },
          {
            title: 'New Value',
            dataIndex: 'newtransMode',
            key: '',
            width: 100,
            render: (text) => text ? text : "-"
    
          },
  ]
      },

      {
        title: "Destination",
        dataIndex: "",
        width: 90,
        children: [
          {
            title: 'Old Value',
            dataIndex: 'olddeliveryAddress',
            key: '',
            width: 100,
            render: (text) => text ? text : "-"
           
          },
          {
            title: 'New Value',
            dataIndex: 'newdeliveryAddress',
            key: '',
            width: 100,
            render: (text) => text ? text : "-"
    
          },
  ]
      },
    

    );
  

   
   
    

    excel
      .addSheet(`Order Comparsion Report (${formattedDate})`)
      .addColumns(excelColumnsWH)
      .addDataSource(filterData, { str2num: false },);
      


    excel.saveAs(`Order Comparsion Report (${formattedDate}).xlsx`);


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
                  {poNumberData.map((inc: any) => {
                    return (
                      <Option key={inc.po_number} value={inc.po_number}>
                        {inc.po_number}
                      </Option>
                    );
                  })}
                </Select>
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

export default LevisComaparisionReport