import {
    FileExcelFilled,
    SearchOutlined,
    UndoOutlined,
  } from "@ant-design/icons";
  import { SeasonWiseRequest } from "@project-management-system/shared-models";
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
    const [storeData, setStoreData] = useState<any>([])
  
    useEffect(() => {
      tabHeaderData();
      getItemCode();
    }, []);
  
    const handleTabChange = (value?: string, itemName?: string) => {
      setTabChange(value);
      reportSS(value, itemName);
      form.resetFields()
  
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
      getItemName(req.year, req.season,req.qtyLocation);
  
      service.seasonWiseReportData(req).then((res) => {
        if (res.data) {
          setData(res.data);
          console.log(data,'data')
          if(!itemName){
            setStoreData(res.data)
            console.log(storeData,'storedata')
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
  
    const getItemName = (year: number, season: string,qtyLocation?:string) => {
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
      setData(storeData)
    };
  
    const columnsWH: ColumnsType<any> = [
      {
        title: "#",
        key: "sno",
        // width:"50px",
        render: (text, object, index) =>
          (page - 1) * pageSize + (index + 1) + pageSize * (page - 1),
      },
    
      {
        title: <div style={{ textAlign: "center" }}>Planning Sum</div>,
        dataIndex: "itemName",
        width: "200px",
        // ellipsis: true,
      },
      {
        title: <div style={{textAlign: "center"}}>Year</div>,
        dataIndex: 'year',
        width:"80px"
      },
      {
        title: <div style={{textAlign: "center"}}>Season</div>,
        dataIndex: 'season',
        width:"80px"
      },
  
    //   {
    //     title: "Month",
    //     children: [
    //       {
    //         title: <div style={{ textAlign: "center" }}>Jan</div>,
    //         dataIndex: "january",
    //         align: "right",
    //         // className:"season-table",
    //         render: (value) => <span>{value?.toLocaleString()}</span>,
    //       },
        
         
    //     ],
    //   },
    //   {
    //     title: "Month",
    //     children: [
    //       {
    //         title: <div style={{ textAlign: "center" }}>Month Name</div>,
    //         dataIndex: "MonthItemData",
    //         key: "MonthItemData",
    //         render: (MonthItemData) => (
    //           <div>
    //             {MonthItemData.map((monthData) => (
    //               <div key={monthData.monthName}>
    //                 {monthData.monthName}
    //               </div>
    //             ))}
    //           </div>
    //         ),
    //       },
    //       {
    //         title: <div style={{ textAlign: "center" }}>Total Quantity</div>,
    //         dataIndex: "MonthItemData",
    //         key: "TotalQuantity",
    //         render: (MonthItemData) => (
    //           <div>
    //             {MonthItemData.map((monthData) => (
    //               <div key={monthData.monthName}>
    //                 {monthData.totalQuantity}
    //               </div>
    //             ))}
    //           </div>
    //         ),
    //       },
    //     ],
    //   },
    
      // {
      //   title: <div style={{ textAlign: "center" }}>Total</div>,
      //   dataIndex: "total",
      //   align: "right",
      //   width: "100px",
      //   render: (text, record) => <strong>{text?.toLocaleString()}</strong>,
      // },
    ];
  
    const columnsEXF: ColumnsType<any> = [
      {
        title: "#",
        key: "sno",
        // width:"50px",
        align: "right",
        render: (text, object, index) =>
          (page - 1) * pageSize + (index + 1) + pageSize * (page - 1),
      },
      // {
      //     title: <div style={{textAlign: "center"}}>Item Code</div>,
      //     align:"right",
      //     dataIndex: 'itemCode',
      //     width:"80px"
      // },
      {
        title: <div style={{ textAlign: "center" }}>Planning Sum</div>,
        dataIndex: "itemName",
      },
      {
        title: "Month",
        // dataIndex: 'new_val',
        children: [
          {
            title: <div style={{ textAlign: "center" }}>Jan</div>,
            dataIndex: "exfJan",
            align: "right",
            render: (value) => <span>{value?.toLocaleString()}</span>,
          },
          {
            title: <div style={{ textAlign: "center" }}>Feb</div>,
            dataIndex: "exfFeb",
            align: "right",
            render: (value) => <span>{value?.toLocaleString()}</span>,
          },
          {
            title: <div style={{ textAlign: "center" }}>Mar</div>,
            dataIndex: "exfMarch",
            align: "right",
            render: (value) => <span>{value?.toLocaleString()}</span>,
          },
          {
            title: <div style={{ textAlign: "center" }}>Apr</div>,
            dataIndex: "exfApril",
            align: "right",
            render: (value) => <span>{value?.toLocaleString()}</span>,
          },
          {
            title: <div style={{ textAlign: "center" }}>May</div>,
            dataIndex: "exfMay",
            align: "right",
            render: (value) => <span>{value?.toLocaleString()}</span>,
          },
          {
            title: <div style={{ textAlign: "center" }}>Jun</div>,
            dataIndex: "exfJune",
            align: "right",
            render: (value) => <span>{value?.toLocaleString()}</span>,
          },
          {
            title: <div style={{ textAlign: "center" }}>Jul</div>,
            dataIndex: "exfJuly",
            align: "right",
            render: (value) => <span>{value?.toLocaleString()}</span>,
          },
          {
            title: <div style={{ textAlign: "center" }}>Aug</div>,
            dataIndex: "exfAug",
            align: "right",
            render: (value) => <span>{value?.toLocaleString()}</span>,
          },
          {
            title: <div style={{ textAlign: "center" }}>Sep</div>,
            dataIndex: "exfSep",
            align: "right",
            render: (value) => <span>{value?.toLocaleString()}</span>,
          },
          {
            title: <div style={{ textAlign: "center" }}>Oct</div>,
            dataIndex: "exfOct",
            align: "right",
            // className:"season-table",
            render: (value) => <span>{value?.toLocaleString()}</span>,
          },
          {
            title: <div style={{ textAlign: "center" }}>Nov</div>,
            dataIndex: "exfNov",
            align: "right",
            render: (value) => <span>{value?.toLocaleString()}</span>,
          },
          {
            title: <div style={{ textAlign: "center" }}>Dec</div>,
            dataIndex: "exfDec",
            align: "right",
            render: (value) => <span>{value?.toLocaleString()}</span>,
          },
        ],
      },
      {
        title: <div style={{ textAlign: "center" }}>Total</div>,
        dataIndex: "exfTotal",
        align: "right",
        width: "100px",
        render: (text, record) => <strong>{text?.toLocaleString()}</strong>,
      },
    ];
  
    const exportExcel = () => {
      console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
      const excel = new Excel();
  
      const whMonthTotals = (data) => {
        const monthTotals = {
          itemName: 0,
          january: 0,
          february: 0,
          march: 0,
          april: 0,
          may: 0,
          june: 0,
          july: 0,
          august: 0,
          september: 0,
          october: 0,
          november: 0,
          december: 0,
          total: 0,
        };
        data.forEach((item) => {
          for (const month in monthTotals) {
            if (item[month]) {
              monthTotals[month] += Number(item[month]);
            }
          }
        });
  
        return {
          ...monthTotals,
          itemName: "Grand Total",
          __style: {
            bold: true,
            fill: {
              type: "pattern",
              patternType: "solid",
              backgroundColor: "d9e1f2",
            },
          },
        };
      };
  
      const exfMonthTotals = (data) => {
        const monthTotals = {
          itemName: 0,
          exfJan: 0,
          exfFeb: 0,
          exfMarch: 0,
          exfApril: 0,
          exfMay: 0,
          exfJune: 0,
          exfJuly: 0,
          exfAug: 0,
          exfSep: 0,
          exfOct: 0,
          exfNov: 0,
          exfDec: 0,
          exfTotal: 0,
        };
        data.forEach((item) => {
          for (const month in monthTotals) {
            if (item[month]) {
              monthTotals[month] += Number(item[month]);
            }
          }
        });
        return { ...monthTotals, itemName: "Grand Total" };
      };
  
      let excelData = [];
      let tabsNames = [];
      let promises = [];
  
      // Create an array of promises
      for (const rec of tabsData) {
        const req = new SeasonWiseRequest();
        req.year = Number(rec.split(",")[1]);
        req.season = rec.split(",")[2];
        req.qtyLocation = rec.split(",")[0].split("-")[1].toLocaleLowerCase();
        const promise = service.seasonWiseReport(req);
        promises.push(promise);
  
        promise.then((res) => {
          if (res.status) {
            console.log(res, "pppppppppppppppppppppppppppp");
            excelData.push(res.data);
            tabsNames.push(rec.split(",")[0]);
  
            console.log(rec.split(",")[0]);
          }
        });
      }
  
      // Wait for all promises to resolve
      Promise.all(promises).then(() => {
        console.log(excelData, tabsNames, "LLLLLLLLLLLLLLLLls");
  
        if (excelData.length) {
          excelData.forEach((seasonData, index) => {
            const whData = seasonData;
            console.log(whData, "------");
  
            if (whData.length > 0) {
              excel
                .addSheet(`${tabsNames[index]}`)
                .addColumns(excelColumnsWH)
                .addDataSource(whData, { str2num: true });
  
              const monthTotals = whMonthTotals(whData);
              excel.addDataSource([monthTotals], { str2num: true });
            }
          });
          excel.saveAs("SeasonWise.xlsx");
        }
      });
  
      // if (excelData.length) {
      //   data.forEach((yearData) => {
      //     yearData.forEach((seasonData) => {
      //       // const lastDigits = yearData.year.slice(-2);
      //       // const sheetName = `${lastDigits}${seasonData.season}`;
      //       const whData = seasonData;
      //       console.log(whData, "------");
  
      //       if (whData.length > 0) {
      //         excel
      //           .addSheet(`${tabsData}`)
      //           .addColumns(excelColumnsWH)
      //           .addDataSource(whData, { str2num: true });
  
      //         const monthTotals = whMonthTotals(whData);
      //         excel.addDataSource([monthTotals], { str2num: true });
      //       }
  
      //       // const exfData = seasonData.data;
  
      //       // if (exfData.length > 0) {
      //       //   excel
      //       //     .addSheet(`${sheetName}-EXF`)
      //       //     .addColumns(excelColumnsEXf)
      //       //     .addDataSource(exfData, { str2num: true });
  
      //       //   const monthTotals = exfMonthTotals(exfData);
      //       //   excel.addDataSource([monthTotals], { str2num: true });
      //       // }
      //     });
      //   });
  
      //   excel.saveAs("SeasonWise.xlsx");
      // }
    };
  
    let excelColumnsWH: IExcelColumn[] = [];
    excelColumnsWH = [
      // { title: 'Item code', dataIndex: 'itemCode' },
      { title: "Planning Sum", dataIndex: "itemName" },
      { title: "January", dataIndex: "january" },
      { title: "February", dataIndex: "february" },
      { title: "March", dataIndex: "march" },
      { title: "April", dataIndex: "april" },
      { title: "May", dataIndex: "may" },
      { title: "June", dataIndex: "june" },
      { title: "July", dataIndex: "july" },
      { title: "August", dataIndex: "august" },
      { title: "September", dataIndex: "september" },
      { title: "October", dataIndex: "october" },
      { title: "November", dataIndex: "november" },
      { title: "December", dataIndex: "december" },
      { title: "Total", dataIndex: "total" },
    ];
  
    let excelColumnsEXf: IExcelColumn[] = [];
    excelColumnsEXf = [
      // { title: 'Item code', dataIndex: 'itemCode' },
      { title: "Planning Sum", dataIndex: "itemName" },
      { title: "January", dataIndex: "exfJan" },
      { title: "February", dataIndex: "exfFeb" },
      { title: "March", dataIndex: "exfMarch" },
      { title: "April", dataIndex: "exfApril" },
      { title: "May", dataIndex: "exfMay" },
      { title: "June", dataIndex: "exfJune" },
      { title: "July", dataIndex: "exfJuly" },
      { title: "August", dataIndex: "exfAug" },
      { title: "September", dataIndex: "exfSep" },
      { title: "October", dataIndex: "exfOct" },
      { title: "November", dataIndex: "exfNov" },
      { title: "December", dataIndex: "exfDec" },
      { title: "Total", dataIndex: "exfTotal" },
    ];
  
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
  
    months.forEach((month) => {
      monthTotals[month] = 0;
      pageData.forEach((item) => {
        const monthValue = Number(item[month]);
        if (!isNaN(monthValue)) {
          monthTotals[month] += monthValue;
        }
      });
      grandTotal += monthTotals[month];
    });
  
    return (
      <Table.Summary.Row className="tableFooter">
        <Table.Summary.Cell index={1}></Table.Summary.Cell>
        <Table.Summary.Cell index={2}>
          <Text type="danger">Grand Total</Text>
        </Table.Summary.Cell>
        {months.map((month, index) => (
          <Table.Summary.Cell key={index} index={index + 3}>
            <div style={{ textAlign: "right", fontWeight: "bold" }}>
              {Number(monthTotals[month])?.toLocaleString("en-IN")}
            </div>
          </Table.Summary.Cell>
        ))}
        <Table.Summary.Cell index={months.length + 3}>
          <div style={{ textAlign: "right", fontWeight: "bold" }}>
            {Number(grandTotal)?.toLocaleString("en-IN")}
          </div>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  };
  
  
    const generateSummaryEXF = (pageData) => {
      let jan = 0;
      let feb = 0;
      let mar = 0;
      let apr = 0;
      let may1 = 0;
      let jun = 0;
      let jul = 0;
      let aug = 0;
      let sep = 0;
      let oct = 0;
      let nov = 0;
      let dec = 0;
      let total = 0;
  
      pageData.forEach(({ exfJan }) => {
        if (Number(exfJan)) {
          jan += Number(exfJan);
        }
      });
      pageData.forEach(({ exfFeb }) => {
        if (Number(exfFeb)) {
          feb += Number(exfFeb);
        }
      });
      pageData.forEach(({ exfMarch }) => {
        if (Number(exfMarch)) {
          mar += Number(exfMarch);
        }
      });
      pageData.forEach(({ exfApril }) => {
        if (Number(exfApril)) {
          apr += Number(exfApril);
        }
      });
      pageData.forEach(({ exfMay }) => {
        if (Number(exfMay)) {
          may1 += Number(exfMay);
        }
      });
      pageData.forEach(({ exfJune }) => {
        if (Number(exfJune)) {
          jun += Number(exfJune);
        }
      });
      pageData.forEach(({ exfJuly }) => {
        if (Number(exfJuly)) {
          jul += Number(exfJuly);
        }
      });
      pageData.forEach(({ exfAug }) => {
        if (Number(exfAug)) {
          aug += Number(exfAug);
        }
      });
      pageData.forEach(({ exfSep }) => {
        if (Number(exfSep)) {
          sep += Number(exfSep);
        }
      });
      pageData.forEach(({ exfOct }) => {
        if (Number(exfOct)) {
          oct += Number(exfOct);
        }
      });
      pageData.forEach(({ exfNov }) => {
        if (Number(exfNov)) {
          nov += Number(exfNov);
        }
      });
      pageData.forEach(({ exfDec }) => {
        if (Number(exfDec)) {
          dec += Number(exfDec);
        }
      });
      pageData.forEach(({ exfTotal }) => {
        if (Number(exfTotal)) {
          total += Number(exfTotal);
        }
      });
  
      return (
        <>
          <Table.Summary.Row className="tableFooter">
            {/* <Table.Summary.Cell index={0}></Table.Summary.Cell> */}
            <Table.Summary.Cell index={0}></Table.Summary.Cell>
            <Table.Summary.Cell index={1}>
              <Text type="danger">Grand Total</Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(jan)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(feb)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={4}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(mar)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={5}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(apr)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={6}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(may1)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={7}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(jun)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={8}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(jul)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={9}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(aug)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={10}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(sep)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={11}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(oct)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={12}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(nov)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={13}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(dec)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={14}>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>
                {Number(total)?.toLocaleString("en-IN")}
              </div>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </>
      );
    };
  
    // const items = [
    //   {
    //     key: "1",
    //     label: <b>23SS-WH </b>,
    //     children: (
    //       data?.[0]?.length > 0 ? (
    //         <div className="specific-screen">
    //         <Table
    //           bordered
    //           dataSource={data?.[0]}
    //           columns={columnsWH}
    //           summary={generateSummaryWH}
    //           className="custom-table-wrapper"
    //           scroll={{x:'max-content',y:500}}
    //           size='small'
    //           pagination={{
    //             pageSize: 100,
    //             onChange(current, pageSize) {
    //                 setPage(current);
    //                 setPageSize(pageSize);
    //             }
    //         }}
    //         />
    //         </div>
    //       ) : (
    //         <Alert message="No data available" type="warning" showIcon style={{ width: "150px", margin: "auto" }}/>
    //       )
    //     )
    //   },
    //   {
    //     key: "2",
    //     label: <b>23SS-EXF </b>,
    //     children: (
    //       data?.[0]?.length > 0 ? (
    //         <div className="specific-screen">
  
    //         <Table
    //           bordered
    //           dataSource={data?.[0]}
    //           // scroll={{x:1500,y:500}}
    //           scroll={{x:'max-content',y:500}}
    //           columns={columnsEXF}
    //           summary={generateSummaryEXF}
    //           className="custom-table-wrapper"
    //           size='small'
    //           pagination={{
    //             pageSize: 100,
    //             onChange(current, pageSize) {
    //                 setPage(current);
    //                 setPageSize(pageSize);
    //             }
    //         }}
    //         />
    //         </div>
    //       ) : (
    //         <Alert message="No data available" type="warning" showIcon style={{ width: "150px", margin: "auto" }}/>
    //       )
    //     )
    //   },
    //   {
    //     key: "3",
    //     label: <b>23FW-WH </b>,
    //     children: (
    //       data?.[1]?.length > 0 ? (
    //         <div className="specific-screen">
  
    //         <Table
    //           bordered
    //           dataSource={data?.[1]}
    //           columns={columnsWH}
    //           // scroll={{x:1500,y:500}}
    //           scroll={{x:'max-content',y:500}}
    //           summary={generateSummaryWH}
    //           className="custom-table-wrapper"
    //           size='small'
    //           pagination={{
    //             pageSize: 100,
    //             onChange(current, pageSize) {
    //                 setPage(current);
    //                 setPageSize(pageSize);
    //             }
    //         }}
    //         />
    //         </div>
    //       ) : (
    //         <Alert message="No data available" type="warning" showIcon style={{ width: "150px", margin: "auto" }}/>
    //       )
    //     )
    //   },
    //   {
    //     key: "4",
    //     label: <b>23FW-EXF </b>,
    //     children: (
    //       data?.[1]?.length > 0 ? (
    //         <div className="specific-screen">
  
    //         <Table
    //           bordered
    //           dataSource={data?.[1]}
    //           columns={columnsEXF}
    //           // scroll={{x:1500,y:500}}
    //           scroll={{x:'max-content',y:500}}
    //           summary={generateSummaryEXF}
    //           className="custom-table-wrapper"
    //           size='small'
    //           pagination={{
    //             pageSize: 100,
    //             onChange(current, pageSize) {
    //                 setPage(current);
    //                 setPageSize(pageSize);
    //             }
    //         }}
    //         />
    //         </div>
    //       ) : (
    //         <Alert message="No data available" type="warning" showIcon style={{ width: "150px", margin: "auto" }}/>
    //       )
    //     )
    //   },
    //   {
    //     key: "5",
    //     label: <b>24SS-WH</b>,
    //     children: (
    //       data?.[2]?.length > 0 ? (
    //         <div className="specific-screen">
  
    //         <Table
    //           bordered
    //           dataSource={data?.[2]}
    //           columns={columnsWH}
    //           scroll={{x:'max-content',y:500}}
    //           // scroll={{x:'max-content'}}
    //           summary={generateSummaryWH}
    //           className="custom-table-wrapper"
    //           size='small'
    //           pagination={{
    //             pageSize: 100,
    //             onChange(current, pageSize) {
    //                 setPage(current);
    //                 setPageSize(pageSize);
    //             }
    //         }}
    //         />
    //         </div>
    //       ) : (
    //         <Alert message="No data available" type="warning" showIcon style={{ width: "150px", margin: "auto" }}/>
    //       )
    //     )
    //   },
    //   {
    //     key: "6",
    //     label: <b>24SS-EXF </b>,
    //     children: (
    //       data?.[2]?.length > 0 ? (
    //         <div className="specific-screen">
  
    //         <Table
    //           bordered
    //           dataSource={data?.[2]}
    //           columns={columnsEXF}
    //           scroll={{x:'max-content',y:500}}
    //           // scroll={{x:'max-content'}}
    //           summary={generateSummaryEXF}
    //           className="custom-table-wrapper"
    //           size='small'
    //           pagination={{
    //             pageSize: 100,
    //             onChange(current, pageSize) {
    //                 setPage(current);
    //                 setPageSize(pageSize);
    //             }
    //         }}
    //         />
    //         </div>
    //       ) : (
    //         <Alert message="No data available" type="warning" showIcon style={{ width: "150px", margin: "auto" }}/>
    //       )
    //     )
    //   }
    // ]
  
    // const items = data?.flatMap((yearData) => {
    //   return yearData.seasons?.flatMap((seasonData) => {
    //     const lastDigits = yearData.year.slice(-2);
    //     const sheetNameWH = `${lastDigits}${seasonData.season}-WH`;
    //     const sheetNameEXF = `${lastDigits}${seasonData.season}-EXF`;
    //     const tableKeyWH = `${sheetNameWH}-${yearData.year}`;
    //     const tableKeyEXF = `${sheetNameEXF}-${yearData.year}`;
  
    //     const tableWH = {
    //       key: tableKeyWH,
    //       label: <b>{`${sheetNameWH} `}</b>,
    //       children:
    //         seasonData.data.length > 0 ? (
    //           <div className="specific-screen">
    //             <Table
    //               bordered
    //               dataSource={seasonData.data}
    //               columns={columnsWH}
    //               summary={generateSummaryWH}
    //               className="custom-table-wrapper"
    //               size="small"
    //               pagination={{
    //                 pageSize: 100,
    //                 onChange(current, pageSize) {
    //                   setPage(current);
    //                   setPageSize(pageSize);
    //                 },
    //               }}
    //             />
    //           </div>
    //         ) : (
    //           <Alert
    //             message="No WH data available"
    //             type="warning"
    //             showIcon
    //             style={{ width: "150px", margin: "auto" }}
    //           />
    //         ),
    //     };
  
    //     const tableEXF = {
    //       key: tableKeyEXF,
    //       label: <b>{`${sheetNameEXF} `}</b>,
    //       children:
    //         seasonData.data.length > 0 ? (
    //           <div className="specific-screen">
    //             <Table
    //               bordered
    //               dataSource={seasonData.data}
    //               columns={columnsEXF}
    //               summary={generateSummaryEXF}
    //               className="custom-table-wrapper"
    //               size="small"
    //               pagination={{
    //                 pageSize: 100,
    //                 onChange(current, pageSize) {
    //                   setPage(current);
    //                   setPageSize(pageSize);
    //                 },
    //               }}
    //             />
    //           </div>
    //         ) : (
    //           <Alert
    //             message="No EXF data available"
    //             type="warning"
    //             showIcon
    //             style={{ width: "150px", margin: "auto" }}
    //           />
    //         ),
    //     };
  
    //     return [tableWH, tableEXF];
    //   });
    // });
  
    return (
      <Card
        title="Season Wise Order Quantity"
        className="custom-table-wrapper"
        extra={
          // data?.[0] || data?.[1] || data?.[2] ? (
          <Button
            type="default"
            style={{ color: "green" }}
            onClick={exportExcel}
            icon={<FileExcelFilled />}
          >
            Download Excel
          </Button>
          // ) : null
        }
      >
        <Form layout="horizontal" form={form}>
          <Row gutter={16}>
            {/* <Col xs={24} sm={24} md={8} lg={6} xl={4}>
                  <Form.Item label='Item Code' name='itemCode'>
                  <Select
                  showSearch
                  placeholder="Select Item Name"
                  optionFilterProp="children"
                  allowClear
                  value={activeTabKey === '1' ? form.getFieldValue('itemCode') : undefined}
                >
                  {itemCode.filter((e) => {
                    if (activeTabKey === '1') {
                      return data?.[0]?.some((item) => item.itemCode === e.itemCode);
                    } else if (activeTabKey === '2') {
                      return data?.[0]?.some((item) => item.itemCode === e.itemCode);
                    } else if (activeTabKey === '3') {
                      return data?.[1]?.some((item) => item.itemCode === e.itemCode);
                    }  else if (activeTabKey === '4') {
                      return data?.[1]?.some((item) => item.itemCode === e.itemCode);
                    } else if (activeTabKey === '5') {
                      return data?.[2]?.some((item) => item.itemCode === e.itemCode);
                    } else if (activeTabKey === '6') {
                      return data?.[2]?.some((item) => item.itemCode === e.itemCode);
                    } return true;
                  }).map((e:any) => {
                    return <Option key={e.itemCode} value={e.itemCode}>{e.itemCode}</Option>
                  })}
                </Select>
                  </Form.Item>
                </Col> */}
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
                  {data.length > 0 ?(
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
                  ):(
                  <Alert message="No data" type="warning" showIcon style={{ width: "150px", margin: "auto" }} />
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
  