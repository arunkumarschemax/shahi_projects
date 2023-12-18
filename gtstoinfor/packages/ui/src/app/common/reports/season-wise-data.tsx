import {
  FileExcelFilled,
  SearchOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import {
  SeasonWiseRequest,
  sesaonWisereportModel,
} from "@project-management-system/shared-models";
import { OrdersService } from "@project-management-system/shared-services";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
  Select,
  Table,
  Tabs,
  Typography,
} from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import "./seasonwise.css";

const SeasonWiseReportData = () => {
  const { Text } = Typography;
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);
  const service = new OrdersService();
  const [data, setData] = useState<any>([]);
  const [itemCode, setItemCode] = useState<any>([]);
  const [itemName, setItemName] = useState<any>([]);
  const [tabsData, setTabsData] = useState<any[]>([]);
  const [form] = Form.useForm();
  const { Option } = Select;
  const [tabChange, setTabChange] = useState<string>();
  const [storeData, setStoreData] = useState<any>([]);

  useEffect(() => {
    tabHeaderData();
    getItemCode();
  }, []);

  const handleTabChange = (value?: string, itemName?: string) => {
    setTabChange(value);
    reportSS(value, itemName);
    form.resetFields();
  };

  const reportSS = (value?: string, itemName?: string) => {
    const req = new SeasonWiseRequest();
    if (form.getFieldValue("itemCode") !== undefined) {
      req.itemCode = form.getFieldValue("itemCode");
    }
    if (itemName) {
      req.itemName = itemName;
    }
    if (value) {
      req.year = Number(value.split(",")[1]);
      req.season = value.split(",")[2];
    }
    req.qtyLocation = value.split(",")[0].split("-")[1].toLocaleLowerCase();
    getItemName(req.year, req.season, req.qtyLocation);

    service.seasonWiseReportData(req).then((res) => {
      if (res.data) {
        setData(res.data);
        console.log(data, "data");
        if (!itemName) {
          setStoreData(res.data);
          console.log(storeData, "storedata");
        }
        // handleTabChange(tabsData[0])
      }
    });
  };
  const tabHeaderData = () => {
    service.seasonWiseTabs().then((res) => {
      if (res.status) {
        setTabsData(res.data);
        handleTabChange(res.data[0]);
      }
    });
  };

  const getItemCode = () => {
    service.getSeasonWiseItemCode().then((res) => {
      setItemCode(res.data);
    });
  };

  const getItemName = (year: number, season: string, qtyLocation?: string) => {
    const req = new SeasonWiseRequest();
    req.year = year;
    req.season = season;
    req.qtyLocation = qtyLocation;
    service.getSeasonWiseItemName(req).then((res) => {
      setItemName(res.data);
    });
  };

  const OnReset = () => {
    form.resetFields();
    // setItemName([]);
    setData(storeData);
  };

  const getSizeWiseHeaders = (data: sesaonWisereportModel[]) => {
    const sizeHeaders = new Set<string>();
    data?.forEach((rec) =>
      rec.MonthItemData?.forEach((version) => {
        sizeHeaders.add("" + version.monthName);
      })
    );
    return Array.from(sizeHeaders);
  };


  const sizeHeaders = getSizeWiseHeaders(data);
  const columnsWH: ColumnsType<any> = [
    {
      title: "#",
      key: "sno",
      width:"30px",
      render: (text, object, index) =>
        (page - 1) * pageSize + (index + 1) + pageSize * (page - 1),
    },

    {
      title: <div style={{ textAlign: "center" }}>Planning Sum</div>,
      dataIndex: "itemName",
      width: "200px",
      // ellipsis: true,
    },
    // {
    //   title: <div style={{textAlign: "center"}}>Year</div>,
    //   dataIndex: 'year',
    //   width:"80px"
    // },
    // {
    //   title: <div style={{textAlign: "center"}}>Season</div>,
    //   dataIndex: 'season',
    //   width:"80px"
    // },
  ];
  sizeHeaders?.forEach((version) => {
    columnsWH.push({
      title: version,
      dataIndex: version,
      key: version,
      width: "110px",
      align: "right",
      render: (text, record) => {
          const sizeData = record.MonthItemData.find(
            (item) => item.monthName === version
          );
          if (sizeData) {
            if (sizeData.monthName ) {
              const formattedQty = sizeData?.totalQuantity;
              return formattedQty;
            } else {
              return "-";
            }
          } else {
            return "-";
          }
        }
    });
  });
  columnsWH.push({
    title: <div style={{ textAlign: "center" }}>Total</div>,
    dataIndex: "total",
    align: "right",
    width: "30px",
    render: (text, record) => {
      let sum = 0;
      record.MonthItemData.forEach(r => {
        sum += r.totalQuantity;
      });
      return sum;
    }
  });




  // const exportExcel = () => {
  //   // const whMonthTotals = (data) => {

  //   //   const monthTotals = {
  //   //     itemName: 0,
  //   //     january: 0,
  //   //     february: 0,
  //   //     march: 0,
  //   //     april: 0,
  //   //     may: 0,
  //   //     june: 0,
  //   //     july: 0,
  //   //     august: 0,
  //   //     september: 0,
  //   //     october: 0,
  //   //     november: 0,
  //   //     december: 0,
  //   //     total: 0,
  //   //   };

    

    

  //   //   return {
  //   //     ...monthTotals,
  //   //     itemName: "Grand Total",
  //   //     __style: {
  //   //       bold: true,
  //   //       fill: {
  //   //         type: "pattern",
  //   //         patternType: "solid",
  //   //         backgroundColor: "d9e1f2",
  //   //       },
  //   //     },
  //   //   };
  //   // };
  //   // console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
  //   const excel = new Excel();

  //   // let excelData = [];
  //   // let tabsNames = [];
  //   // let promises = [];

  //   // // Create an array of promises
  //   // for (const rec of tabsData) {
  //   //   const req = new SeasonWiseRequest();
  //   //   req.year = Number(rec.split(",")[1]);
  //   //   req.season = rec.split(",")[2];
  //   //   req.qtyLocation = rec.split(",")[0].split("-")[1].toLocaleLowerCase();
  //   //   const promise = service.seasonWiseReport(req);
  //   //   promises.push(promise);

  //   //   promise.then((res) => {
  //   //     if (res.status) {
  //   //       console.log(res, "pppppppppppppppppppppppppppp");
  //   //       excelData.push(res.data);
  //   //       tabsNames.push(rec.split(",")[0]);

  //   //       console.log(rec.split(",")[0]);
  //   //     }
  //   //   });
  //   // }
  //      excel
  //     .addSheet('attendance-report')
  //     .addColumns(excelColumnsWH)
  //     .addDataSource(data, { str2num: true })
  //     .saveAs("SeasonWise.xlsx");




   
  

  
  //   // Promise.all(promises).then(() => {
  //   //   console.log(excelData, tabsNames, "LLLLLLLLLLLLLLLLls");

  //   //   if (excelData.length) {
  //   //     excelData.forEach((seasonData, index) => {
  //   //       const whData = seasonData;
  //   //       console.log(whData, "------");

  //   //       if (whData.length > 0) {
  //   //         excel
  //   //           .addSheet(`${tabsNames[index]}`)
  //   //           .addColumns(excelColumnsWH)
  //   //           .addDataSource(whData, { str2num: true });

  //   //         const monthTotals = whMonthTotals(whData);
  //   //         excel.addDataSource([monthTotals], { str2num: true });
  //   //       }
  //   //     });
  //   //     excel.saveAs("SeasonWise.xlsx");
  //   //   }
  //   // });
  // };

  const exportExcel = () => {
    const excel = new Excel();

    excel
      .addSheet('attendance-report')
      .addColumns(excelColumnsWH)
      .addDataSource(data)
      .saveAs('SeasonWise.xlsx');
  }




  let i = 1;
const excelColumnsWH:any = [
   
  { title: "#", dataIndex: "sno", render: (text, object, index) => { return i++; } },

  {
    title:"Planning Sum",
    dataIndex: "itemName",
    // ellipsis: true,
  },

];

sizeHeaders?.forEach((version) => {
  excelColumnsWH.push({
    title: version,
    dataIndex: version,
    key: version,
    width: "110px",
    align: "right",
    render: (text, record) => {
      const sizeData = record.MonthItemData.find(
        (item) => item.monthName === version
      );
      if (sizeData) {
        if (sizeData.monthName) {
          const formattedQty = sizeData?.totalQuantity;
          return formattedQty;
        } else {
          return "-";
        }
      } else {
        return "-";
      }
    },
  });
});

excelColumnsWH.push({
  title: "Total",
  dataIndex: "total",
  align: "right",
  width: "30px",
  render: (text, record) => {
    let sum = 0;
    record.MonthItemData.forEach((r: any) => {
      sum += r.totalQuantity;
    });
    return sum;
  },
});



  const generateSummaryWH = (pageData) => {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    let grandTotal = 0;
    const monthTotals = {};

  


    sizeHeaders.forEach((mon) => {
      let monthValue = 0;
      monthTotals[mon] = 0;
      data.forEach((r) => {
        const sizeData = r.MonthItemData.find((item) => item.monthName == mon);
        console.log(sizeData);
        monthValue = sizeData ? Number(sizeData?.totalQuantity) : 0;
        monthTotals[mon] += monthValue;

        
        grandTotal += monthValue;
      });
     
    });
 

    return (
      <Table.Summary.Row className="tableFooter">
        <Table.Summary.Cell index={1}></Table.Summary.Cell>
        <Table.Summary.Cell index={2}>
          <Text type="danger">Grand Total</Text>
        </Table.Summary.Cell>
        {sizeHeaders.map((month, index) => (
          <Table.Summary.Cell key={index} index={index}>
            <div style={{ textAlign: "right", fontWeight: "bold" }}>
              {Number(monthTotals[month])?.toLocaleString("en-IN")}
              {/* {"0"} */}
            </div>
          </Table.Summary.Cell>
        ))}
        <Table.Summary.Cell index={months.length + 3}>
          <div style={{ textAlign: "right", fontWeight: "bold" }}>
            {Number(grandTotal)?.toLocaleString("en-IN")}
            {/* {"0"} */}
          </div>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  };



  return (
    <Card
      title="Season Wise Order Quantity"
      className="custom-table-wrapper"
      extra={
        <Button
          type="default"
          style={{ color: "green" }}
          onClick={exportExcel}
          icon={<FileExcelFilled />}
        >
          Download Excel
        </Button>
      }
    >
      <Form layout="horizontal" form={form}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8} xl={7}>
            <Form.Item label="Item Name" name="itemName">
              <Select
                showSearch
                placeholder="Select Item Name"
                optionFilterProp="children"
                allowClear
              >
                {itemName?.map((e: any) => {
                  return (
                    <Option key={e.itemName} value={e.itemName}>
                      {e.itemName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={4}
            lg={4}
            xl={3}
            style={{ marginRight: "-50px", marginLeft: "40px" }}
          >
            <Form.Item>
              <Button
                icon={<SearchOutlined />}
                onClick={(v) =>
                  handleTabChange(tabChange, form.getFieldValue("itemName"))
                }
                type="primary"
              >
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={4} lg={4} xl={2}>
            <Form.Item>
              <Button danger icon={<UndoOutlined />} onClick={OnReset}>
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {tabsData.length > 0 ? (
        <Tabs
          type="card"
          onChange={(v) => handleTabChange(v, form.getFieldValue("itemName"))}
        >
          {tabsData.map((e: string, index) => {
            return (
              <Tabs.TabPane key={e} tab={<b>{e.split(",")[0]}</b>}>
                {data.length > 0 ? (
                  <div className="specific-screen">
                    <Table
                      bordered
                      columns={columnsWH}
                      dataSource={data}
                      className="custom-table-wrapper"
                      summary={generateSummaryWH}
                      size="small"
                      pagination={{
                        pageSize: 100,
                        onChange(current, pageSize) {
                          setPage(current);
                          setPageSize(pageSize);
                        },
                      }}
                    />
                  </div>
                ) : (
                  <Alert
                    message="No data"
                    type="warning"
                    showIcon
                    style={{ width: "150px", margin: "auto" }}
                  />
                )}
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default SeasonWiseReportData;
