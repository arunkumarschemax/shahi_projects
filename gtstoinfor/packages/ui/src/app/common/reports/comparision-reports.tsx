import { Alert, Button, Card, Col, Form, Row, Select, Space, Table, Tabs, Tooltip, Typography, message } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import ExFactoryReportWithComparision from "./ex-factory-report-with-comparision"
import WareHouseComparision from "./warehouse-comparision"
import { OrdersService } from "@project-management-system/shared-services"
import React, { useEffect, useState } from "react"
import { YearReq } from "@project-management-system/shared-models"
import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons"
import { Excel } from "antd-table-saveas-excel"
import { IExcelColumn } from "antd-table-saveas-excel/app"
import moment from "moment"
import { Pagination } from 'antd';
import './comparision-report.css';

export const MonthWiseComparisionReport = () => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const { Option } = Select;
  const [page, setPage] = useState<number>(1);

  const [selected, setSelected] = useState('ExFactory')
  const [data, setData] = useState<any[]>([]);
  const [phase, setPhase] = useState<any[]>([]);
  const [phaseExcel, setPhaseExcel] = useState<any[]>([]);
  const [year, setYear] = useState<any[]>([]);
  const [tab, setTab] = useState<number | null>(null);
  const service = new OrdersService();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [excelsData, setExcelData] = useState<any[]>([]);
  const [dates, setDates] = useState<any[]>([]);
  const [file1, setfile1] = useState<number>();
  const [file2, setfile2] = useState<number>();
  const { Text } = Typography;
  const [pageSize, setPageSize] = useState(10);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);
  const [items, setItems] = useState<any[]>([]);
  const [excelsData1, setExcelData1] = useState<any[]>([]);
  const [excelsData2, setExcelData2] = useState<any[]>([]);
  const handlePageChange = (newPage, newPageSize) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

 
  useEffect(() => {
    getTabs();
    getPhase()
    // getData(tab,selected,file1,file2);

  }, []);
  const getFiles =(year:any) =>{
    service.getLatestPreviousFilesData().then(res => {
      if(res.status){
          setDates(res.data)
          setfile1(res.data[0]?.fileId)
          setfile2(res.data[1]?.fileId)

      }
       getData(year,selected,res?.data?.[0]?.fileId,res?.data?.[1]?.fileId);

  })
  }
  // console.log(file1,'--------',file2,'========')
  
  const getPhase = () => {
    
    service.getPhaseItems().then(res => {
      if (res.status) {
        setItems(res.data)
      }
    })
    
  
  
  }
  const handleTabChange = (selectedYear:any) => {
    getFiles(Number(selectedYear))
    setTab(Number(selectedYear));
    // console.log(selected,'----------')
    // console.log(file1,'-----file 1-----')
    // console.log(file2,'-----file2-----')
    // getData(Number(selectedYear) ,selected,file1,file2);
  };
 
  const getTabs = () => {
    service.getExfactoryYearData().then((res) => {
      if (res.status) {
        setYear(res.data);
        if (res.data.length > 0) {
          // setTab(res.data[0]);
          handleTabChange(res.data[0].year)

        }
      }
    });
    
  };
 
  const handleChange = (val) => {
    setSelected(val)
     getData(tab,val,file1,file2)
    // getPhase()

  }
  const getData = (val, tabName,file1,file2) => {
    // getFiles()
    const req = new YearReq(val,tabName,file1,file2);
  
  // console.log(req,'reqqqqq');

    if (form.getFieldValue('ItemName') !== undefined) {
      req.itemName = form.getFieldValue('ItemName')
    }
    service.getMonthlyComparisionData(req).then((res) => {
      if (res.status) {
        setData(res.data);
        setFilteredData(res.data);
      } else {
        setData([]);
        setFilteredData([]);

      }
    });
    service.getComparisionPhaseExcelData(req).then((res) => {
      if (res.status) {
        setPhaseExcel(res.data)
      } else {
        setPhaseExcel([]);
      }
    })
    service.getExfactoryWithComparisionExcel(req).then((res) => {

      if (res.status) {
        setExcelData(res.data);
        
      } else {
        setExcelData([]);
      }
    });
  };


 

  const colWidth = {
    proPlanType: 80,
    latest: 60,
    pre: 60,
    totalLatest: 80,
    totalPre: 80,
  }
  const chCol = (noOfTh) => {
    const ths = [];
    for (let i = 0; i < noOfTh; i++) {
      const exCls= i%2 ?'even-color' : 'odd-color';
      ths.push(<th className={`ant-table-cell ${exCls}`} scope="col" style={{ width: `${colWidth.latest}px` }}>Latest</th>)
      ths.push(<th className={`ant-table-cell ${exCls}`} scope="col" style={{ width: `${colWidth.pre}px` }}>Previous</th>)

    }
    return ths;
  }
  const CustomTitle = () => {
    return (      
        <table className="custom-tbl">
          <thead className="ant-table-thead">
            <tr>
              <th rowSpan={2} className="ant-table-cell" scope="col"  style={{ width: `${colWidth.proPlanType}px` }}>Product plan type</th>
              <th colSpan={2} className="ant-table-cell odd-color" scope="col" >January</th>
              <th colSpan={2} className="ant-table-cell even-color" scope="col" >February</th>
              <th colSpan={2} className="ant-table-cell odd-color" scope="col" >March</th>
              <th colSpan={2} className="ant-table-cell even-color" scope="col" >April</th>
              <th colSpan={2} className="ant-table-cell odd-color" scope="col" >May</th>
              <th colSpan={2} className="ant-table-cell even-color" scope="col" >June</th>
              <th colSpan={2} className="ant-table-cell odd-color" scope="col" >July</th>
              <th colSpan={2} className="ant-table-cell even-color" scope="col" >August</th>
              <th colSpan={2} className="ant-table-cell odd-color" scope="col" >September</th>
              <th colSpan={2} className="ant-table-cell even-color" scope="col" >October</th>
              <th colSpan={2} className="ant-table-cell odd-color" scope="col" >November</th>
              <th colSpan={2} className="ant-table-cell even-color" scope="col" >December</th>
              <th rowSpan={2} className="ant-table-cell" scope="col"  style={{ width: `${colWidth.totalLatest}px` }}>Total(Latest)</th>
              <th rowSpan={2} className="ant-table-cell" scope="col"  style={{ width: `${colWidth.totalPre}px` }}>Total(Previous)</th>
            </tr>
            <tr>
              {chCol(12)}
            </tr>
          </thead>
        </table>
       
      
    );
  };
  
  


  const childColumns1: any = [
    {
      // title: "Production Plan Type Name",
      dataIndex: "phasetype",
      width: colWidth.proPlanType,
    },
    
    {

      // title: `In Coeff`,
      dataIndex: "janCoeff",
      width: colWidth.latest,
      align: "right",
      render: (text: any, record: any) => {
        return record.coeffData.map((item: any) => {
          const janCoeff = parseFloat(item.janCoeff);
          if (!isNaN(janCoeff)) {
            return (
              <span>
                {janCoeff.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
    {
      // title: `In PCs`,
      dataIndex: "janPcs",
      width: colWidth.pre,
      align: "right",
      render: (text: any, record: any) => {
        return record.pcsData.map((item: any) => {
          const janPcs = parseFloat(item.janPcs);
          if (!isNaN(janPcs)) {
            return (
              <span>
                {janPcs.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
    {
      // title: `In Coeff`,
      dataIndex: "febCoeff",
      width: colWidth.latest,
      align: "right",
      render: (text: any, record: any) => {
        return record.coeffData.map((item: any) => {
          const febCoeff = parseFloat(item.febCoeff);
          if (!isNaN(febCoeff)) {
            return (
              <span>
                {febCoeff.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },

    {
      // title: `In PCs`,
      dataIndex: "febPcs",
      width: colWidth.pre,
      align: "right",
      // render: (text: any, record: any) => {
      //   return record.pcsData.map(
      //     (item: any) => <span>{item.febPcs.toLocaleString('en-IN', {
      //       maximumFractionDigits: 0
      //   })}</span> || "-"
      //   );
      // },
      render: (text: any, record: any) => {
        return record.pcsData.map((item: any) => {
          const febPcs = parseFloat(item.febPcs);
          if (!isNaN(febPcs)) {
            return (
              <span>
                {febPcs.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },


    },

    {
      // title: `In Coeff`,
      dataIndex: "marCoeff",
      width: colWidth.latest,
      align: "right",
      render: (text: any, record: any) => {
        return record.coeffData.map((item: any) => {
          const marCoeff = parseFloat(item.marCoeff);
          if (!isNaN(marCoeff)) {
            return (
              <span>
                {marCoeff.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    }, 

    {
      // title: `In PCs`,
      dataIndex: "marPcs",
      width: colWidth.pre,

      align: "right",
      render: (text: any, record: any) => {
        return record.pcsData.map((item: any) => {
          const marPcs = parseFloat(item.marPcs);
          if (!isNaN(marPcs)) {
            return (
              <span>
                {marPcs.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
    
    {
      // title: `In Coeff`,
      dataIndex: "aprCoeff",
      width: colWidth.latest,
      align: "right",
      render: (text: any, record: any) => {
        return record.coeffData.map((item: any) => {
          const aprCoeff = parseFloat(item.aprCoeff);
          if (!isNaN(aprCoeff)) {
            return (
              <span>
                {aprCoeff.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
    {
      // title: `In PCs`,
      dataIndex: "aprPcs",
      width: colWidth.pre,
      align: "right",
      render: (text: any, record: any) => {
        return record.pcsData.map((item: any) => {
          const aprPcs = parseFloat(item.aprPcs);
          if (!isNaN(aprPcs)) {
            return (
              <span>
                {aprPcs.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
    {
      // title: `In Coeff`,
      dataIndex: "mayCoeff",
      width: colWidth.latest,
      align: "right",
      render: (text: any, record: any) => {
        return record.coeffData.map((item: any) => {
          const mayCoeff = parseFloat(item.mayCoeff);
          if (!isNaN(mayCoeff)) {
            return (
              <span>
                {mayCoeff.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
    //   ],
    // },
    // {
    // title: "May",
    //   dataIndex: "oldOrderQtyPcs5",
    //   key: "oldOrderQtyPcs5",
    //   children: [
    {
      // title: `In PCs`,
      dataIndex: "mayPcs",
      width: colWidth.pre,
      align: "right",
      render: (text: any, record: any) => {
        return record.pcsData.map((item: any) => {
          const mayPcs = parseFloat(item.mayPcs);
          if (!isNaN(mayPcs)) {
            return (
              <span>
                {mayPcs.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
  
    //   ],
    // },
    // {
    // title: "June",
    //   dataIndex: "oldOrderQtyPcs6",
    //   key: "oldOrderQtyPcs6",
    //   children: [
      {
        // title: `In Coeff`,
        dataIndex: "junCoeff",
        width: colWidth.latest,
        align: "right",
        render: (text: any, record: any) => {
          return record.coeffData.map((item: any) => {
            const junCoeff = parseFloat(item.junCoeff);
            if (!isNaN(junCoeff)) {
              return (
                <span>
                  {junCoeff.toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                  })}
                </span>
              );
            } else {
              return "-";
            }
          });
        },
      },
    {
      // title: `In PCs`,
      dataIndex: "junPcs",
      width: colWidth.pre,
      align: "right",
      render: (text: any, record: any) => {
        return record.pcsData.map((item: any) => {
          const junPcs = parseFloat(item.junPcs);
          if (!isNaN(junPcs)) {
            return (
              <span>
                {junPcs.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
   
    //   ],
    // },
    // {
    // title: "July",
    //   dataIndex: "oldOrderQtyPcs7",
    //   key: "oldOrderQtyPcs7",
    //   children: [
      {
        // title: `In Coeff`,
        dataIndex: "julCoeff",
        width: colWidth.latest,
        align: "right",
        render: (text: any, record: any) => {
          return record.coeffData.map((item: any) => {
            const julCoeff = parseFloat(item.julCoeff);
            if (!isNaN(julCoeff)) {
              return (
                <span>
                  {julCoeff.toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                  })}
                </span>
              );
            } else {
              return "-";
            }
          });
        },
      },
    {
      // title: `In PCs`,
      dataIndex: "julPcs",
      width: colWidth.pre,
      
      align: "right",
      render: (text: any, record: any) => {
        return record.pcsData.map((item: any) => {
          const julPcs = parseFloat(item.julPcs);
          if (!isNaN(julPcs)) {
            return (
              <span>
                {julPcs.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
    
    //   ],
    // },
    // {
    // title: "August",
    //   dataIndex: "oldOrderQtyPcs8",
    //   key: "oldOrderQtyPcs8",
    //   children: [
      {
        // title: `In Coeff`,
        dataIndex: "augCoeff",
        width: colWidth.latest,
        align: "right",
        render: (text: any, record: any) => {
          return record.coeffData.map((item: any) => {
            const augCoeff = parseFloat(item.augCoeff);
            if (!isNaN(augCoeff)) {
              return (
                <span>
                  {augCoeff.toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                  })}
                </span>
              );
            } else {
              return "-";
            }
          });
        },
      },
    {
      // title: `In PCs`,
      dataIndex: "augPcs",
      width: colWidth.pre,
      align: "right",
      render: (text: any, record: any) => {
        return record.pcsData.map((item: any) => {
          const augPcs = parseFloat(item.augPcs);
          if (!isNaN(augPcs)) {
            return (
              <span>
                {augPcs.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
   
    //   ],
    // },
    // {
    // title: "September",
    //   dataIndex: "oldOrderQtyPcs9",
    //   key: "oldOrderQtyPcs9",
    //   children: [
      {
        // title: `In Coeff`,
        dataIndex: "sepCoeff",
        width: colWidth.latest,
        align: "right",
        render: (text: any, record: any) => {
          return record.coeffData.map((item: any) => {
            const sepCoeff = parseFloat(item.sepCoeff);
            if (!isNaN(sepCoeff)) {
              return (
                <span>
                  {sepCoeff.toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                  })}
                </span>
              );
            } else {
              return "-";
            }
          });
        },
      },
    {
      // title: `In PCs`,
      dataIndex: "sepPcs",
      width: colWidth.pre,
      align: "right",
      render: (text: any, record: any) => {
        return record.pcsData.map((item: any) => {
          const sepPcs = parseFloat(item.sepPcs);
          if (!isNaN(sepPcs)) {
            return (
              <span>
                {sepPcs.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
 
    //   ],
    // },
    // {
    // title: "October",
    //   dataIndex: "oldOrderQtyPcs10",
    //   key: "oldOrderQtyPcs10",
    //   children: [
      {
        // title: `In Coeff`,
        dataIndex: "octCoeff",
        width: colWidth.latest,
        align: "right",
        render: (text: any, record: any) => {
          return record.coeffData.map((item: any) => {
            const octCoeff = parseFloat(item.octCoeff);
            if (!isNaN(octCoeff)) {
              return (
                <span>
                  {octCoeff.toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                  })}
                </span>
              );
            } else {
              return "-";
            }
          });
        },
      },
    {
      // title: `In PCs`,
      dataIndex: "octPcs",
      width: colWidth.pre,
      align: "right",
      render: (text: any, record: any) => {
        return record.pcsData.map((item: any) => {
          const octPcs = parseFloat(item.octPcs);
          if (!isNaN(octPcs)) {
            return (
              <span>
                {octPcs.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
   
    //   ],
    // },
    // {
    // title: "November",
    //   dataIndex: "oldOrderQtyPcs11",
    //   key: "oldOrderQtyPcs11",
    //   children: [
      {
        // title: `In Coeff`,
        dataIndex: "novCoeff",
        width: colWidth.latest,
  
        align: "right",
        render: (text: any, record: any) => {
          return record.coeffData.map((item: any) => {
            const novCoeff = parseFloat(item.novCoeff);
            if (!isNaN(novCoeff)) {
              return (
                <span>
                  {novCoeff.toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                  })}
                </span>
              );
            } else {
              return "-";
            }
          });
        },
      },
    {
      // title: `In PCs`,
      dataIndex: "novPcs",
      width: colWidth.pre,
      align: "right",
      render: (text: any, record: any) => {
        return record.pcsData.map((item: any) => {
          const novPcs = parseFloat(item.novPcs);
          if (!isNaN(novPcs)) {
            return (
              <span>
                {novPcs.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
 
    //   ],
    // },
    // {
    // title: "December",
    //   dataIndex: "oldOrderQtyPcs12",
    //   key: "oldOrderQtyPcs12",
    //   children: [
      {
        // title: `In Coeff`,
        dataIndex: "decCoeff",
        width: colWidth.latest,
  
        align: "right",
        render: (text: any, record: any) => {
          return record.coeffData.map((item: any) => {
            const decCoeff = parseFloat(item.decCoeff);
            if (!isNaN(decCoeff)) {
              return (
                <span>
                  {decCoeff.toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                  })}
                </span>
              );
            } else {
              return "-";
            }
          });
        },
      },
    {
      // title: `In PCs`,
      dataIndex: "decPcs",
      width: colWidth.pre,
      
      align: "right",
      render: (text: any, record: any) => {
        return record.pcsData.map((item: any) => {
          const decPcs = parseFloat(item.decPcs);
          if (!isNaN(decPcs)) {
            return (
              <span>
                {decPcs.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                })}
              </span>
            );
          } else {
            return "-";
          }
        });
      },
    },
   
    //   ],
    // },
    

    {
      // title: "Total In Coeff",
      dataIndex: "totalCoeff",
      align: "right",
      width: colWidth.totalLatest ,

      render: (text: any, record: any) => {
        const totalCoeff = parseFloat(record.totalCoeff);
        return !isNaN(totalCoeff) ? totalCoeff.toLocaleString() : '0';
      },
    },
    {
      dataIndex: "totalPcs",
      align: "right",
      width: colWidth.totalPre,
      render: (text: any, record: any) => {
        const totalPcs = parseFloat(record.totalPcs);
        return !isNaN(totalPcs) ? totalPcs.toLocaleString() : '0';
      },
    },
  ];
  const columns5: any = [
    {
      title: 'S.No',
      key: 'sno',
      responsive: ['sm'],
      width: 50,
      render: (text, object, index) => (page - 1) * 10 + (index + 1)

    },
    // {
    //   title: "Item code",
    //   dataIndex: "itemCode",
    //   // ...getColumnSearchProps('itemCode')
    // },
    {
      title: "Item Name",
      dataIndex: "itemName",
      width: 160,
      render: (text: any, record: any) => <span>{record.itemName}</span>,
      // ...getColumnSearchProps('itemName')
    },
    {
      title: <CustomTitle />,
      dataIndex: "monthWiseData",
      align: "center",
      padding:0,
      // style: { padding: '0px',textAlign:'center' },
      onHeaderCell: (column: any) => {
        return {
          style: {
            padding: 0,
          },
        };
      },
      render: (text: any, record: any) => (

        <Table
          showHeader={false}
          bordered={true}
          className="report-child-tbl"
          dataSource={record.monthWiseData}
          columns={childColumns1}
          pagination={false}
          rowKey={(record) => record.itemName}
        />
      ),
    },
  ];

  let columnsphase: any[] = [];
  if (selected == 'ExFactory') {
    columnsphase.push(
      {

        title: "S No",
        key: "sno",
        width: 50,

        render: (text, object, index) => (page - 1) * pageSize + (index + 1),

      },
      {
        title: "Production Plan Type",
        dataIndex: "prod_plan_type",
        render: (text, record, index) => (
          <th style={{ width: "100px" }}>
            <span style={{ fontWeight: "normal" }}>{text}</span>
          </th>
        )
      },
      
      
            { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      {
        title: <span className="ant-table-cell odd-color">Jan In Lat</span>,
        dataIndex: "janExfLat",
        align: "right",
        render: (val) => {
          const numericValue = Number(val);
      
          if (!isNaN(numericValue)) {
            return numericValue.toLocaleString();
          } else {
            return val;
          }
        },
      },
      
      
           { title: <span className="ant-table-cell odd-color">Jan In Pre</span>, dataIndex: "janExfPre",align:"right" ,render: (val) => {
            const numericValue = Number(val);
        
            if (!isNaN(numericValue)) {
              return numericValue.toLocaleString();
            } else {
              return val;
            }
          },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title:   <span className="ant-table-cell even-color">Feb In Lat </span>, dataIndex: "febExfLat", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title:  <span className="ant-table-cell even-color">Feb In Pre</span>, dataIndex: "febExfPre",align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell odd-color">Mar In Lat </span>, dataIndex: "marExfLat", align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell odd-color">Mar In Pre</span>, dataIndex: "marExfPre",align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell even-color">Apr In Lat </span>, dataIndex: "aprExfLat",align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: <span className="ant-table-cell even-color">Apr In Pre</span>, dataIndex: "aprExfPre",align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell odd-color">May In Lat </span>, dataIndex: "mayExfLat", align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell odd-color">May In Pre</span>, dataIndex: "mayExfPre",align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell even-color">Jun In Lat </span>, dataIndex: "junExfLat",align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: <span className="ant-table-cell even-color">Jun In Pre</span>, dataIndex: "junExfPre",align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell odd-color">Jul In Lat </span>, dataIndex: "julExfLat", align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell odd-color">Jul In Pre</span>, dataIndex: "julExfPre", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell even-color">Aug In Lat </span>, dataIndex: "augExfLat",align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell even-color">Aug In Pre</span>, dataIndex: "augExfPre",align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell odd-color">Sep In Lat </span>, dataIndex: "sepExfLat", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: <span className="ant-table-cell odd-color">Sep In Pre</span>, dataIndex: "sepExfPre", align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell even-color">Oct In Lat </span>, dataIndex: "octExfLat", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell even-color">Oct In Pre</span>, dataIndex: "octExfPre", align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell odd-color">Nov In Lat </span>, dataIndex: "novExfLat", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell odd-color">Nov In Pre</span>, dataIndex: "novExfPre", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell even-color">Dec In Lat </span>, dataIndex: "decExfLat",align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: <span className="ant-table-cell even-color">Dec In Pre</span>, dataIndex: "decExfPre", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},

      { title: <span > Total In Lat </span>, dataIndex: "totalExfLat", align: "right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: <span > Total In Pre</span>, dataIndex: "totalExfPre", align: "right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
    )
  }
  if (selected === 'WareHouse') {
    
    columnsphase.push(
      {

        title: "S No",
        key: "sno",
        width: 50,

        render: (text, object, index) => (page - 1) * pageSize + (index + 1),

      },
      {
        title: "Production Plan Type",
        dataIndex: "prod_plan_type",
        render: (text, record, index) => (
          <th style={{ width: "100px" }}>
            <span style={{ fontWeight: "normal" }}>{text}</span>
          </th>
        )
      },
           { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell even-color">Jan In Lat </span>, dataIndex: "janWhLat",align:"right" ,
      render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell even-color">Jan In Pre </span>, dataIndex: "janWhPre", align:"right" , render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell odd-color">Feb In Lat </span>, dataIndex: "febWhLat",align:"right"  ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell odd-color">Feb In Pre</span>, dataIndex: "febWhPre",align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell even-color">Mar In Lat </span>, dataIndex: "marWhLat", align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell even-color">Mar In Pre</span>, dataIndex: "marWhPre", align:"right",render:(text,record,index)=>(
        <span style={{fontWeight:"normal"}}>{text.toLocaleString()}</span>
            ) },
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell odd-color">APr In Lat </span>, dataIndex: "aprWhLat", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: <span className="ant-table-cell odd-color">APr In Pre</span>, dataIndex: "aprWhPre", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell even-color">May In Lat </span>, dataIndex: "mayWhLat",align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: <span className="ant-table-cell even-color">May In Pre</span>, dataIndex: "mayWhPre", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell odd-color">Jun In Lat </span>, dataIndex: "junWhLat", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: <span className="ant-table-cell odd-color">Jun In Pre</span>, dataIndex: "junWhPre", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell even-color">Jul In Lat </span>, dataIndex: "julWhLat",align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: <span className="ant-table-cell even-color">Jul In Pre</span>, dataIndex: "julWhPre", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell odd-color">Aug In Lat </span>, dataIndex: "augWhLat", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: <span className="ant-table-cell odd-color">Aug In Pre</span>, dataIndex: "augWhPre", align:"right",render: (val) => {
              const numericValue = Number(val);
          
              if (!isNaN(numericValue)) {
                return numericValue.toLocaleString();
              } else {
                return val;
              }
            },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell even-color">Sep In Lat </span>, dataIndex: "sepWhLat", align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell even-color">Sep In Pre</span>, dataIndex: "sepWhPre", align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell odd-color">Oct In Lat </span>, dataIndex: "octWhLat",align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      }, },
      { title: <span className="ant-table-cell odd-color">Oct In Pre</span>, dataIndex: "octWhPre", align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell even-color">Nov In Lat </span>, dataIndex: "novWhLat",align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell even-color">Nov In Pre</span>, dataIndex: "novWhPre",align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell odd-color">Dec In Lat </span>, dataIndex: "decWhLat", align:"right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell odd-color">Dec In Pre</span>, dataIndex: "decWhPre", align:"right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },
      { title: <span className="ant-table-cell even-color"> Total In Lat </span>, dataIndex: "totalWhLat", align: "right",render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: <span className="ant-table-cell even-color"> Total In Pre</span>, dataIndex: "totalWhPre", align: "right" ,render: (val) => {
        const numericValue = Number(val);
    
        if (!isNaN(numericValue)) {
          return numericValue.toLocaleString();
        } else {
          return val;
        }
      },},
      { title: ``, dataIndex: "", },
      { title: ``, dataIndex: "", },

    )
  }

  const handleExport = async (e: any) => {
    e.preventDefault();
    const currentDate = new Date()
      .toISOString()
      .slice(0, 10)
      .split("-")
      .join("/");

    const excel = new Excel();

 
  // excel.saveAs('revisedPOs.xlsx');
    // excel.addSheet(tab.toString());
    let exportingColumns: IExcelColumn[] = [];

    if (selected == 'ExFactory') {
      exportingColumns.push(
        { title: "Item Name", dataIndex: "planning_sum" },
        { title: "Production Plan Type ", dataIndex: "prod_plan_type", },
        { title: `Jan Pre`, dataIndex: "janExfPre", },
        { title: `Jan Lat`, dataIndex: "janExfLat", },

        { title: `Feb Pre`, dataIndex: "febExfPre", },
        { title: `Feb Lat`, dataIndex: "febExfLat", },

        { title: `Mar Pre`, dataIndex: "marExfPre", },
        { title: `Mar Lat`, dataIndex: "marExfLat", },

        { title: `Apr Pre`, dataIndex: "aprExfPre", },
        { title: `Apr Lat`, dataIndex: "aprExfLat", },

        { title: `May Pre`, dataIndex: "mayExfPre", },
        { title: `May Lat`, dataIndex: "mayExfLat", },

        { title: `Jul Pre`, dataIndex: "julExfPre", },
        { title: `Jul Lat`, dataIndex: "julExfLat", },

        { title: `Aug Pre`, dataIndex: "augExfPre", },
        { title: `Aug Lat`, dataIndex: "augExfLat", },

        { title: `Sep Pre`, dataIndex: "sepExfPre", },
        { title: `Sep Lat`, dataIndex: "sepExfLat", },

        { title: `Oct Pre`, dataIndex: "octExfPre", },
        { title: `Oct Lat`, dataIndex: "octExfLat", },

        { title: `Nov Pre`, dataIndex: "novExfPre", },
        { title: `Nov Lat`, dataIndex: "novExfLat", },

        { title: `Dec Pre`, dataIndex: "decExfPre", },
        { title: `Dec Lat`, dataIndex: "decExfLat", },

        { title: `Total Pre`, dataIndex: "totalExfPre", },
        { title: `Total Lat`, dataIndex: "totalExfLat", },


      )
    }
    if (selected === 'WareHouse') {
      exportingColumns.push(
        { title: "Item Name", dataIndex: "planning_sum" },
        { title: "Production Plan Type", dataIndex: "prod_plan_type", },
        { title: `Jan Pre`, dataIndex: "janWhPre", },
        { title: `Jan Lat`, dataIndex: "janWhLat", },
        { title: `Feb Pre`, dataIndex: "febWhPre", },
        { title: `Feb Lat`, dataIndex: "febWhLat", },
        { title: `Mar Pre`, dataIndex: "marWhPre", },
        { title: `Mar Lat`, dataIndex: "marWhLat", },
        { title: `Apr Pre`, dataIndex: "aprWhPre", },
        { title: `Apr Lat`, dataIndex: "aprWhLat", },
        { title: `May Pre`, dataIndex: "mayWhPre", },
        { title: `May Lat`, dataIndex: "mayWhLat", },
        { title: `Jun Pre`, dataIndex: "junWhPre", },
        { title: `Jun Lat`, dataIndex: "junWhLat", },
        { title: `Jul Pre`, dataIndex: "julWhPre", },
        { title: `Jul Lat`, dataIndex: "julWhLat", },
        { title: `Aug Pre`, dataIndex: "augWhPre", },
        { title: `Aug Lat`, dataIndex: "augWhLat", },
        { title: `Sep Pre`, dataIndex: "sepWhPre", },
        { title: `Sep Lat`, dataIndex: "sepWhLat", },
        { title: `Oct Pre`, dataIndex: "octWhPre", },
        { title: `Oct Lat`, dataIndex: "octWhLat", },
        { title: `Nov Pre`, dataIndex: "novWhPre", },
        { title: `Nov Lat`, dataIndex: "novWhLat", },
        { title: `Dec Pre`, dataIndex: "decWhPre", },
        { title: `Dec Lat`, dataIndex: "decWhLat", },
        { title: `Total Pre`, dataIndex: "totalWhpre", },
        { title: `Total Lat`, dataIndex: "totalWhLat", }

      )
    }
    

    // excel.addColumns(exportingColumns);
    // excel.addDataSource(excelsData);
    let secondTableColumns: IExcelColumn[] = [];
    if (selected == 'ExFactory') {
      // console.log('exfactory');

      secondTableColumns.push(
        { title: "Production Plan Type ", dataIndex: "prod_plan_type", },
        { title: `Jan Lat`, dataIndex: "janExfLat", },
        { title: `Jan Pre`, dataIndex: "janExfPre", },

        { title: `Feb Lat`, dataIndex: "febExfLat", },
        { title: `Feb Pre`, dataIndex: "febExfPre", },

        { title: `Mar Lat`, dataIndex: "marExfLat", },
        { title: `Mar Pre`, dataIndex: "marExfPre", },

        { title: `Apr Lat`, dataIndex: "aprExfLat", },
        { title: `Apr Pre`, dataIndex: "aprExfPre", },

        { title: `May Lat`, dataIndex: "mayExfLat", },
        { title: `May Pre`, dataIndex: "mayExfPre", },

        { title: `Jun Lat`, dataIndex: "junExfLat", },
        { title: `Jun Pre`, dataIndex: "junExfPre", },

        { title: `Jul Lat`, dataIndex: "julExfLat", },
        { title: `Jul Pre`, dataIndex: "julExfPre", },

        { title: `Aug Lat`, dataIndex: "augExfLat", },
        { title: `Aug Pre`, dataIndex: "augExfPre", },

        { title: `Sep Lat`, dataIndex: "sepExfLat", },
        { title: `Sep Pre`, dataIndex: "sepExfPre", },

        { title: `Oct Lat`, dataIndex: "octExfLat", },
        { title: `Oct Pre`, dataIndex: "octExfPre", },

        { title: `Nov Lat`, dataIndex: "novExfLat", },
        { title: `Nov Pre`, dataIndex: "novExfPre", },

        { title: `Dec Lat`, dataIndex: "decExfLat", },
        { title: `Dec Pre`, dataIndex: "decExfPre", },

        { title: `Total Lat`, dataIndex: "totalExfLat", },
        { title: `Total Pre`, dataIndex: "totalExfPre", },

      )
    }
    if (selected === 'WareHouse') {
      secondTableColumns.push(
        { title: "Production Plan Type ", dataIndex: "prod_plan_type", },
        { title: `Jan Pre`, dataIndex: "janWhPre", },
        { title: `Jan Lat`, dataIndex: "janWhLat", },
        { title: `Feb Pre`, dataIndex: "febWhPre", },
        { title: `Feb Lat`, dataIndex: "febWhLat", },
        { title: `Mar Pre`, dataIndex: "marWhPre", },
        { title: `Mar Lat`, dataIndex: "marWhLat", },
        { title: `Apr Pre`, dataIndex: "aprWhPre", },
        { title: `Apr Lat`, dataIndex: "aprWhLat", },
        { title: `May Pre`, dataIndex: "mayWhPre", },
        { title: `May Lat`, dataIndex: "mayWhLat", },
        { title: `Jun Pre`, dataIndex: "junWhPre", },
        { title: `Jun Lat`, dataIndex: "junWhLat", },
        { title: `Jul Pre`, dataIndex: "julWhPre", },
        { title: `Jul Lat`, dataIndex: "julWhLat", },
        { title: `Aug Pre`, dataIndex: "augWhPre", },
        { title: `Aug Lat`, dataIndex: "augWhLat", },
        { title: `Sep Pre`, dataIndex: "sepWhPre", },
        { title: `Sep Lat`, dataIndex: "sepWhLat", },
        { title: `Oct Pre`, dataIndex: "octWhPre", },
        { title: `Oct Lat`, dataIndex: "octWhLat", },
        { title: `Nov Pre`, dataIndex: "novWhPre", },
        { title: `Nov Lat`, dataIndex: "novWhLat", },
        { title: `Dec Pre`, dataIndex: "decWhPre", },
        { title: `Dec Lat`, dataIndex: "decWhLat", },
        { title: `Total In Pcs`, dataIndex: "totalWhPre" },
        { title: `Total In Coeff`, dataIndex: "totalWhLat" },
      )
    }

    // excel.addColumns(secondTableColumns);
    // excel.addDataSource(phaseExcel)
    // excel.addRow();
    let data1;
    let data2;
    for (const res of year) {
      const req = new YearReq(res.year, selected, file1, file2);
      await service.getComparisionPhaseExcelData(req).then((res) => {
        if (res.status) {
          data1 = res.data
        } else {
          data1 = null
        }
      })

      await service.getExfactoryWithComparisionExcel(req).then((res) => {
        if (res.status) {
          data2 = res.data
          
        } else {
          data2 = null
        }
      });
      let totalJanExfPre = 0;
        let totalJanExfLat = 0;
        let totalFebExfPre = 0;
        let totalFebExfLat = 0; 
        let totalMarExfPre = 0;
        let totalMarExfLat = 0; 
        let totalAprExfPre = 0;   
        let totalAprExfLat = 0; 
        let totalMayExfPre = 0;   
        let totalMayExfLat = 0; 
        let totalJunExfPre = 0;   
        let totalJunExfLat = 0; 
        let totalJulExfPre = 0;   
        let totalJulExfLat = 0; 
        let totalAugExfPre = 0;   
        let totalAugExfLat = 0; 
        let totalSepExfPre = 0;   
        let totalSepExfLat = 0; 
        let totalOctExfPre = 0;   
        let totalOctExfLat = 0; 
        let totalNovExfPre = 0;   
        let totalNovExfLat = 0; 
        let totalDecExfPre = 0;   
        let totalDecExfLat = 0;
        let totalPreExf = 0;
        let totalLatExf = 0;

        let totalJanWhPre = 0;
        let totalJanWhLat = 0;
        let totalFebWhPre = 0;
        let totalFebWhLat = 0; 
        let totalMarWhPre = 0;
        let totalMarWhLat = 0; 
        let totalAprWhPre = 0;   
        let totalAprWhLat = 0; 
        let totalMayWhPre = 0;   
        let totalMayWhLat = 0; 
        let totalJunWhPre = 0;   
        let totalJunWhLat = 0; 
        let totalJulWhPre = 0;   
        let totalJulWhLat = 0; 
        let totalAugWhPre = 0;   
        let totalAugWhLat = 0; 
        let totalSepWhPre = 0;   
        let totalSepWhLat = 0; 
        let totalOctWhPre = 0;   
        let totalOctWhLat = 0; 
        let totalNovWhPre = 0;   
        let totalNovWhLat = 0; 
        let totalDecWhPre = 0;   
        let totalDecWhLat = 0;
        let totalPreWh = 0;
        let totalLatWh = 0;
     
      
      if (Array.isArray(data2) && data2.length > 0) {
        data2.forEach((row) => {
          // Log each row to inspect its structure and values
          // console.log('Row:', row.totalWhpre);
      
          // Accumulate totals for the current row
          totalJanExfPre += Number(row.janExfPre) || 0;
          totalJanExfLat += Number(row.janExfLat) || 0;
          totalFebExfPre += Number(row.febExfPre) || 0;
          totalFebExfLat += Number(row.febExfLat) || 0;
          totalMarExfPre += Number(row.marExfPre) || 0;
          totalMarExfLat += Number(row.marExfLat) || 0;
          totalAprExfPre += Number(row.aprExfPre) || 0;
          totalAprExfLat += Number(row.aprExfLat) || 0;
          totalMayExfPre += Number(row.mayExfPre) || 0;
          totalMayExfLat += Number(row.mayExfLat) || 0;
          totalJunExfPre += Number(row.junExfPre) || 0;
          totalJunExfLat += Number(row.junExfLat) || 0;
          totalJulExfPre += Number(row.julExfPre) || 0;
          totalJulExfLat += Number(row.julExfLat) || 0;
          totalAugExfPre += Number(row.augExfPre) || 0;
          totalAugExfLat += Number(row.augExfLat) || 0;
          totalSepExfPre += Number(row.sepExfPre) || 0;
          totalSepExfLat += Number(row.sepExfLat) || 0;
          totalOctExfPre += Number(row.octExfPre) || 0;
          totalOctExfLat += Number(row.octExfLat) || 0;
          totalNovExfPre += Number(row.novExfPre) || 0;
          totalNovExfLat += Number(row.novExfLat) || 0;
          totalDecExfPre += Number(row.decExfPre) || 0;
          totalDecExfLat += Number(row.decExfLat) || 0;
           totalPreExf += Number(row.totalExfPre) || 0;
           totalLatExf += Number(row.totalExfLat) || 0;
          totalJanWhPre += Number(row.janWhPre) || 0;
          totalJanWhLat += Number(row.janWhLat) || 0;
          totalFebWhPre += Number(row.febWhPre) || 0;
          totalFebWhLat += Number(row.febWhLat) || 0;
          totalMarWhPre += Number(row.marWhPre) || 0;
          totalMarWhLat += Number(row.marWhLat) || 0;
          totalAprWhPre += Number(row.aprWhPre) || 0;
          totalAprWhLat += Number(row.aprWhLat) || 0;
          totalMayWhPre += Number(row.mayWhPre) || 0;
          totalMayWhLat += Number(row.mayWhLat) || 0;
          totalJunWhPre += Number(row.junWhPre) || 0;
          totalJunWhLat += Number(row.junWhLat) || 0;
          totalJulWhPre += Number(row.julWhPre) || 0;
          totalJulWhLat += Number(row.julWhLat) || 0;
          totalAugWhPre += Number(row.augWhPre) || 0;
          totalAugWhLat += Number(row.augWhLat) || 0;
          totalSepWhPre += Number(row.sepWhPre) || 0;
          totalSepWhLat += Number(row.sepWhLat) || 0;
          totalOctWhPre += Number(row.octWhPre) || 0;
          totalOctWhLat += Number(row.octWhLat) || 0;
          totalNovWhPre += Number(row.novWhPre) || 0;
          totalNovWhLat += Number(row.novWhLat) || 0;
          totalDecWhPre += Number(row.decWhPre) || 0;
          totalDecWhLat += Number(row.decWhLat) || 0;
          totalPreWh += Number(row.totalWhpre) || 0;
          totalLatWh += Number(row.totalWhLat) || 0;
          // ... Repeat for other months and types
        });
      } else {
      }      
    
      const totalsPcsRow = {
        planning_sum: "Total",
        prod_plan_type: "",
        janExfPre: totalJanExfPre,
        janExfLat: totalJanExfLat,
        febExfPre: totalFebExfPre,
        febExfLat: totalFebExfLat,
        marExfPre: totalMarExfPre,
        marExfLat: totalMarExfLat,
        aprExfPre: totalAprExfPre,
        aprExfLat: totalAprExfLat,
        mayExfPre: totalMayExfPre,
        mayExfLat: totalMayExfLat,
        junExfPre: totalJunExfPre,
        junExfLat: totalJunExfLat,
        julExfPre: totalJulExfPre,
        julExfLat: totalJulExfLat,
        augExfPre: totalAugExfPre,
        augExfLat: totalAugExfLat,
        sepExfPre: totalSepExfPre,
        sepExfLat: totalSepExfLat,
        octExfPre: totalOctExfPre,
        octExfLat: totalOctExfLat,
        novExfPre: totalNovExfPre,
        novExfLat: totalNovExfLat,
        decExfPre: totalDecExfPre,
        decExfLat: totalDecExfLat,
        totalExfPre: totalPreExf,
        totalExfLat: totalLatExf,
      }
      const totalsCoeffRow = {
        planning_sum: "Total",
        prod_plan_type: "",
        janWhPre: totalJanWhPre,
        janWhLat: totalJanWhLat,
        febWhPre: totalFebWhPre,
        febWhLat: totalFebWhLat,
        marWhPre: totalMarWhPre,
        marWhLat: totalMarWhLat,
        aprWhPre: totalAprWhPre,
        aprWhLat: totalAprWhLat,
        mayWhPre: totalMayWhPre,
        mayWhLat: totalMayWhLat,
        junWhPre: totalJunWhPre,
        junWhLat: totalJunWhLat,
        julWhPre: totalJulWhPre,
        julWhLat: totalJulWhLat,
        augWhPre: totalAugWhPre,
        augWhLat: totalAugWhLat,
        sepWhPre: totalSepWhPre,
        sepWhLat: totalSepWhLat,
        octWhPre: totalOctWhPre,
        octWhLat: totalOctWhLat,
        novWhPre: totalNovWhPre,
        novWhLat: totalNovWhLat,
        decWhPre: totalDecWhPre,
        decWhLat: totalDecWhLat,
        totalWhpre: totalPreWh,
        totalWhLat: totalLatWh,
      }
      if (selected == 'ExFactory') {
        data2?.push(totalsPcsRow);
      }
      if (selected == 'WareHouse') {
        data2?.push(totalsCoeffRow)
      }
      if (data1 != undefined && data2 != undefined) {
        const sheetName = res.year.toString(); // Convert res to a string
        excel
          .addSheet(sheetName)
          .addColumns(exportingColumns)
          .addDataSource(data2, { str2num: true });
          excel.addRow();
        excel.addColumns(secondTableColumns);
        excel.addDataSource(data1);
      }
    }
    if (selected == 'ExFactory') {
      excel.saveAs(`Ex-Factory-comparision-report-${currentDate}.xlsx`);
    }
    if (selected == 'WareHouse') {
      excel.saveAs(`Ware-House-comparision-report-${currentDate}.xlsx`);
    }
  };
  
  const onReset = () => {
    form.resetFields();
    getData(tab,selected,file1,file2);
  };

  const getTableSummary = (pageData) => {

    let janPre = 0;
    let janLat = 0;
    let febPre = 0;
    let febLat = 0;
    let marPre = 0;
    let marLat = 0;
    let aprPre = 0;
    let aprLat = 0;
    let mayPre = 0;
    let mayLat = 0;
    let junPre = 0;
    let junLat = 0;
    let julPre = 0;
    let julLat = 0;
    let augPre = 0;
    let augLat = 0;
    let sepPre = 0;
    let sepLat = 0;
    let octPre = 0;
    let octLat = 0;
    let novPre = 0;
    let novLat = 0;
    let decPre = 0;
    let decLat = 0;
    let totalPre = 0;
    let totalLat = 0;

    pageData.forEach((e) => {
      e.monthWiseData.forEach((rec) => {

        if (rec.pcsData[0].janPcs) {

          const jan = [rec.pcsData[0].janPcs];
          janPre += Number(jan);

        }
        if (rec.pcsData[0].febPcs) {
          const feb = [rec.pcsData[0].febPcs];
          febPre += Number(feb);
        }
        if (rec.pcsData[0].marPcs) {
          const mar = [rec.pcsData[0].marPcs];
          marPre += Number(mar);
        }
        if (rec.pcsData[0].aprPcs) {
          const apr = [rec.pcsData[0].aprPcs];
          aprPre += Number(apr);
        }
        if (rec.pcsData[0].mayPcs) {
          const may = [rec.pcsData[0].mayPcs];
          mayPre += Number(may);
        }
        if (rec.pcsData[0].junPcs) {
          const jun = [rec.pcsData[0].junPcs];
          junPre += Number(jun);
        }
        if (rec.pcsData[0].julPcs) {
          const jul = [rec.pcsData[0].julPcs];
          julPre += Number(jul);
        }
        if (rec.pcsData[0].augPcs) {
          const aug = [rec.pcsData[0].augPcs];
          augPre += Number(aug);
        }
        if (rec.pcsData[0].sepPcs) {
          const sep = [rec.pcsData[0].sepPcs];
          sepPre += Number(sep);
        }
        if (rec.pcsData[0].octPcs) {
          const oct = [rec.pcsData[0].octPcs];
          octPre += Number(oct);
        }
        if (rec.pcsData[0].novPcs) {
          const nov = [rec.pcsData[0].novPcs];
          novPre += Number(nov);
        }
        if (rec.pcsData[0].decPcs) {
          const dec = [rec.pcsData[0].decPcs];
          decPre += Number(dec);
        }
        if (rec.coeffData[0].janCoeff) {
          const jan = [rec.coeffData[0].janCoeff];
          janLat += Number(jan);
        }
        // console.log(rec.coeffData[0].janCoeff,'jannnnnnn');
        
        if (rec.coeffData[0].febCoeff) {
          const feb = [rec.coeffData[0].febCoeff];
          febLat += Number(feb);
        }
        if (rec.coeffData[0].marCoeff) {
          const mar = [rec.coeffData[0].marCoeff];
          marLat += Number(mar);
        }
        if (rec.coeffData[0].aprCoeff) {
          const apr = [rec.coeffData[0].aprCoeff];
          aprLat += Number(apr);
        }
        if (rec.coeffData[0].mayCoeff) {
          const may = [rec.coeffData[0].mayCoeff];
          mayLat += Number(may);
        }
        if (rec.coeffData[0].junCoeff) {
          const jun = [rec.coeffData[0].junCoeff];
          junLat += Number(jun);
        }
        if (rec.coeffData[0].julCoeff) {
          const jul = [rec.coeffData[0].julCoeff];
          julLat += Number(jul);
        }
        if (rec.coeffData[0].augCoeff) {
          const aug = [rec.coeffData[0].augCoeff];
          augLat += Number(aug);
        }
        if (rec.coeffData[0].sepCoeff) {
          const sep = [rec.coeffData[0].sepCoeff];
          sepLat += Number(sep);
        }
        if (rec.coeffData[0].octCoeff) {
          const oct = [rec.coeffData[0].octCoeff];
          octLat += Number(oct);
        }
        if (rec.coeffData[0].novCoeff) {
          const nov = [rec.coeffData[0].novCoeff];
          novLat += Number(nov);
        }
        if (rec.coeffData[0].decCoeff) {
          const dec = [rec.coeffData[0].decCoeff];
          decLat += Number(dec);
        }
        if (rec.totalPcs) {
          const pcs = [rec.totalPcs];
          totalPre += Number(pcs);
        }
        if (rec.totalCoeff) {
          const coeff = [rec.totalCoeff];
          totalLat += Number(coeff);
        }
      });
    });
    const totalValues = [janLat.toLocaleString(), janPre.toLocaleString(), febLat.toLocaleString(), febPre.toLocaleString(), marLat.toLocaleString(), marPre.toLocaleString(), aprLat.toLocaleString(), aprPre.toLocaleString(), mayLat.toLocaleString(), mayPre.toLocaleString(), junLat.toLocaleString(), junPre.toLocaleString(), julLat.toLocaleString(), julPre.toLocaleString(), augLat.toLocaleString(), augPre.toLocaleString(), sepLat.toLocaleString(), sepPre.toLocaleString(), octLat.toLocaleString(), octPre.toLocaleString(), novLat.toLocaleString(), novPre.toLocaleString(), decLat.toLocaleString(), decPre.toLocaleString()];
    // const totalValuesWithCommas = totalValues.map((val) => val.toLocaleString());

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}></Table.Summary.Cell>
          <Table.Summary.Cell index={1}>Total</Table.Summary.Cell>
          <Table.Summary.Cell index={2} className="pad-0" >
            <div>
              <table className="custom-tbl">
                <thead>
                  <tr>
                  <th className="ant-table-cell" scope="col" style={{ width: `${colWidth.proPlanType}px` }}></th>
                  {totalValues.map((val, index) => {
                    return <th className="ant-table-cell" scope="col" style={{ width: `${(index % 2) ? colWidth.pre : colWidth.latest}px`, textAlign:'right' }}>{val}</th>
                  })}
                  <th className="ant-table-cell" scope="col" style={{ width: `${colWidth.totalLatest}px`, textAlign:'right' }}>
  {totalPre}
</th>
<th className="ant-table-cell" scope="col" style={{ width: `${colWidth.totalPre}px`, textAlign:'right' }}>
  {totalLat}
</th>


                  </tr>
                </thead>
              </table>
            </div>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };
  return (

    <Card>
      <Form form={form1} layout={"vertical"}>
        <Row gutter={24}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 4 }}
          >
            <div>
              <label>
                Comparision Parameters
              </label>
              <Form.Item name="Label" initialValue={'ExFactory'}>
                <Select
                  showSearch
                  placeholder="Select "
                  optionFilterProp="children"
                  allowClear
                  onChange={(val) => handleChange(val)}
                  defaultValue={'ExFactory'}
                >
                  <Option key={'ExFactory'} value={'ExFactory'}>Ex-Factory</Option>
                  <Option key={'WareHouse'} value={'WareHouse'}>WareHouse</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>
          {/* <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 5 }}
            lg={{ span: 5 }}
            xl={{ span: 7 }}
            style={{ marginTop: 17 }}
          >
            <Card

              style={{
                textAlign: "center",
                //   width: 150,
                //   height: 35,
                borderRadius: 8,
                backgroundColor: "#EBEBF1",
              }}
              size="small"
            >
              <span>Latest File Name: {dates ?   dates[0]?.fileName : '-'}</span><br/>
              <span>Latest File uploaded Date: {dates ?   dates[0]?.uploadedDate : '-'}</span>
            
            </Card>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 5 }}
            lg={{ span: 5 }}
            xl={{ span: 7 }}
            style={{ marginTop: 17 }}
          >
            <Card

              style={{
                textAlign: "center",
                //   width: 150,
                //   height: 35,
                borderRadius: 8,
                backgroundColor: "#EBEBF1",
              }}
              size="small"
            >
               <span>Previous File Name: {dates ?   dates[1]?.fileName : '-'}</span><br/>
              <span>Previous File uploaded Date: {dates ?   dates[1]?.uploadedDate : '-'}</span></Card>
          </Col> */}
           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }} style={{ marginTop: 17 }}>
          <Tooltip title={dates ? dates[1]?.fileName : '-'} arrow={false}>
            <Card size='small' 
              // title={'Previous File Name: ' +`${dates ?  dates[1]?.fileName : '-'}`}
              
              style={{ textAlign: 'left', backgroundColor: '#B1F8E2' }}
            >{'Previous File Name: ' +`${dates ?  dates[1]?.fileName : '-'}`}</Card>
          </Tooltip>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }} style={{ marginTop: 17 }}>
          <Card size='small' style={{ textAlign: 'left', backgroundColor: '#CBB1F8' }}>
          {'Previous File Date:' +`${dates ?  dates[1]?.uploadedDate : '-'}` }
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }} style={{ marginTop: 17 }}>
        <Tooltip title={dates ? dates[0]?.fileName :''} arrow={false}>
          <Card size='small' style={{ textAlign: 'left', backgroundColor: '#B1F8E2' }}>
          {'Latest File Name: ' +`${dates ?  dates[0]?.fileName : '-'}` }
          </Card>
        </Tooltip>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }} style={{ marginTop: 17 }}>
          <Card size='small' style={{ textAlign: 'left', backgroundColor: '#CBB1F8' }}>
          {'Latest File Date: ' +`${dates ?   dates[0]?.uploadedDate : '-'}`}
          </Card>
        </Col>
        </Row>
      </Form>
        <Tabs type="card" onChange={handleTabChange} aria-disabled>
          {year.map((e) => (
            <Tabs.TabPane tab={`${e.year}`} key={e.year}>
                    {selected && data.length > 0 ? (
<>
              <Form form={form} layout={"vertical"} onFinish={() => getData(tab, selected,file1,file2)}>
                <Row gutter={24}>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 6 }}
                    lg={{ span: 6 }}
                    xl={{ span: 6 }}
                  >
                    <div>
                      <label>Item Name</label>
                      <Form.Item name="ItemName">
                        <Select
                          showSearch
                          placeholder="Select Item Name"
                          optionFilterProp="children"
                          allowClear
                        >
                          {items.map((e) => (
                            <Option key={e.item} value={e.item}>
                              {e.item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 6 }} style={{ marginTop: 17 }} >
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      style={{ marginRight: 50, width: 80 }}
                      htmlType="submit"
                    >Search</Button>
                    <Button
                      type="primary"
                      icon={<UndoOutlined />}
                      htmlType="submit"
                      onClick={onReset}>Reset</Button>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 5 }}
                    lg={{ span: 5 }}
                    xl={{ span: 6 }}
                    style={{ marginTop: 17 }}
                  >
                    <Button
                      type="default"
                      style={{ color: "green" }}
                      onClick={handleExport}
                      icon={<FileExcelFilled />}
                    >
                      Download Excel
                    </Button>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 5 }}
                    lg={{ span: 5 }}
                    xl={{ span: 6 }}
                    style={{ marginTop: 17 }}
                  >
                    <Card
                      title={"Total Items : " + data.length}
                      style={{
                        textAlign: "center",
                        width: 150,
                        height: 35,
                        borderRadius: 8,
                        backgroundColor: "#EBEBF1",
                      }}
                      size="small"
                    ></Card>
                  </Col>

                </Row>
              </Form>
              <Table
                bordered={true}
                // showHeader={false}
                dataSource={filteredData}
                columns={columns5}
                size="small"
                scroll={{ x: "max-content", y: 500 }}
                summary={getTableSummary}
                // pagination={{
                //   onChange(current) {
                //     setPage(current);
                //   },
                //   // pageSize: 1,
                // }}
                pagination={false}

              />
              <Table
                columns={columnsphase}
                dataSource={phaseExcel}
                size="small"
                scroll={{ x: "max-content" }} />
                </>
                ) : (
                  <>
                    <Row>
                      <Alert
                        message="No data"
                        type="info"
                        style={{ margin: "auto", width: 500 }}
                        showIcon
                      />
                    </Row>
                  </>)}
            </Tabs.TabPane>
          ))}
        </Tabs>
      
    </Card>
  )
}
export default MonthWiseComparisionReport