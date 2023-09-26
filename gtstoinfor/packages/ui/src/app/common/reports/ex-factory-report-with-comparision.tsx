import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { YearReq } from "@project-management-system/shared-models";
import { OrdersService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, List, Row, Select, Table, Tabs, TabsProps, Typography, message } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import form from "antd/es/form";
import { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { useState } from "react";

export const ExFactoryReportWithComparision = () => {
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [data, setData] = useState<any[]>([]);
  const [year, setYear] = useState<any[]>([]);
  const [tab, setTab] = useState<number>(2023);
  const [excelData, setExcelData] = useState<any[]>([]);
  const service = new OrdersService()
  const {Text} = Typography
  const [form] = Form.useForm();
    const { Option } = Select;

  useEffect(()=>{
    getData();
  },[])

  const getData =()=>{
    const req = new YearReq(tab)    
    service.getExfactoryWithComparision(req).then(res =>{

      if(res.status){
        setYear(res.data)
      }
    })
    service.getAll(req).then(res =>{
      console.log(res,'res==========');
      if(res.status){
        setData(res.data)
        setFilteredData(res.data)
      }
      else{
        setData([])
      }
    })
    service.getExfactoryWithComparisionExcel(req).then((res) => {
      console.log(res, "res==========");
      if (res.status) {
        setExcelData(res.data);
      } else {
        setData([]);
      }
    })
  }
 
  const childColumns1: any = [
    {
      // title: "Production Plan Type Name",
      dataIndex: "phasetype",
      // key: "phasetype",
    },
    // {
    //   title: "January",
    //         children: [
        {
          title: `Previous`,
          dataIndex: "janPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.janPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "janCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.janCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
   
    },
    // {
    //   title: "February",
    //   dataIndex: "oldOrderQtyPcs2",
    //         children: [
        {
          title: `Previous`,
          dataIndex: "febPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.febPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "febCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.febCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
 
    },
    // {
    //   title: "March",
    //   dataIndex: "oldOrderQtyPcs3",
    //   key: "oldOrderQtyPcs3",
    //         children: [
        {
          title: `Previous`,
          dataIndex: "marPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.marPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "marCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.marCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
      
    },
    // {
    //   title: "April",
    //   dataIndex: "oldOrderQtyPcs4",
    //   key: "oldOrderQtyPcs4",
    //         children: [
        {
          title: `Previous`,
          dataIndex: "aprPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.aprPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "aprCoeff",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.janPcs}</span>  || '-'))
          
          }
      //   },
      // ],
  
    },
    // {
    //   title: "May",
    //   dataIndex: "oldOrderQtyPcs5",
    //   key: "oldOrderQtyPcs5",
    //         children: [
        {
          title: `Previous`,
          dataIndex: "mayPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.janPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "mayCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.mayCoeff}</span>  || '-'))
          
          }
        },
    //   ],
    
      
    // },
    // {
    //   title: "June",
    //   dataIndex: "oldOrderQtyPcs6",
    //   key: "oldOrderQtyPcs6",
    //         children: [
        {
          title: `Previous`,
          dataIndex: "junPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.junPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "junCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.junCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
   
      
    },
    // {
    //   title: "July",
    //   dataIndex: "oldOrderQtyPcs7",
    //   key: "oldOrderQtyPcs7",
    //         children: [
        {
          title: `Previous`,
          dataIndex: "julPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.julPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "julCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.julCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
  
      
    },
    // {
    //   title: "August",
    //   dataIndex: "oldOrderQtyPcs8",
    //   key: "oldOrderQtyPcs8",
    //         children: [
        {
          title: `Previous`,
          dataIndex: "augPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.augPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "augCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.augCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
   
    },
    // {
    //   title: "September",
    //   dataIndex: "oldOrderQtyPcs9",
    //   key: "oldOrderQtyPcs9",
    //         children: [
        {
          title: `Previous`,
          dataIndex: "sepPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.sepPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "sepCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.sepCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
    
    },
    // {
    //   title: "October",
    //   dataIndex: "oldOrderQtyPcs10",
    //   key: "oldOrderQtyPcs10",
    //         children: [
        {
          title: `Previous`,
          dataIndex: "octPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.octPcs}</span>  || '-'))
          
          },
        },
        {
          title: `Latest`,
          dataIndex: "octCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.octCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
    
    },
    // {
    //   title: "November",
    //   dataIndex: "oldOrderQtyPcs11",
    //   key: "oldOrderQtyPcs11",
    //         children: [
        {
          title: `Previous`,
          dataIndex: "novPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.novPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "novCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.novCoeff}</span>  || '-'))
          
          },
      //   },
      // ],
     
    },
    // {
    //   title: "December",
    //   dataIndex: "oldOrderQtyPcs12",
    //   key: "oldOrderQtyPcs12",
    //         children: [
        {
          title: `Previous`,
          dataIndex: "decPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.decPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "decCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.decCoeff}</span>  || '-'))
          
          }
      //   },
      // ],

      
    },
    {
      // title: "Total Previous",
      dataIndex: "totalPcs",
     
    },
    {
      // title: "Total Latest",
      dataIndex: "totalCoeff",
     
    },
  ]
  const columns5: any = [
    {
      title: "S No",
      key: "sno",
      render: (text, object, index) => (page - 1) * pageSize + (index + 1),
    },
    // {
    //   title: "Item code",
    //   dataIndex: "itemCode",
    //   // ...getColumnSearchProps('itemCode')
    // },
    {
      title: "Item Name",
      dataIndex: "itemName",
      render: (text: any, record: any) => (
      <span>{record.itemName}</span>
      ),
      // ...getColumnSearchProps('itemName')
    },
    {
      title: "Month Wise Data",
      dataIndex: "monthWiseData",
      align:'center',
      render: (text: any, record: any) => (
        <Table
          dataSource={record.monthWiseData}
          columns={childColumns1}
          pagination={false}
          rowKey={(record) => record.itemName}
         
        />
      ),
    },
        
  ];
  const handleExport = (e: any) => {
    e.preventDefault();

    const currentDate = new Date()
        .toISOString()
        .slice(0, 10)
        .split("-")
        .join("/");

   
    const excel = new Excel();
    // year.forEach((yearItem) => {
      excel.addSheet(tab.toString()); // Create a sheet for the year
  
      let exportingColumns: IExcelColumn[] = []
      exportingColumns = [
        {
          title: "Item Name",
          dataIndex: "item",
        },
        {
          title: "Production Plan Type Name",
          dataIndex: "prod_plan_type",
          
        },   
        {
          title: `Jan Previous`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
            record.ExfMonth == 1 && record.status == 'previous'? record.order_plan_qty : "-",
        },
        {
          title: `Jan Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 1 && record.status == 'latest'? record.order_plan_qty : "-",
      },
        {
          title: `Feb Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 2 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Feb Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 2 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Mar Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 3 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Mar Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 3 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Apr Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 4 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Apr Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 4 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `May Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 5 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `May Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 5 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Jun Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 6 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Jun Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 6 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Jul Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 7 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Jul Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 7 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Aug Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 8 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Aug Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 8 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Sep Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 9 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Sep Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 9 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Oct Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 10 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Oct Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 10 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Nov Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 11 && record.status == 'previous'? record.order_plan_qty : "-"

        },
        {
          title: `Nov Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 11 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Dec Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 12 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Dec Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 12 && record.status == 'latest'? record.order_plan_qty : "-",
        },
        // {
        //   title: "Total In PCs",
        //   dataIndex: "totalPcs",
          
        // },
        // {
        //   title: "Total In Coeff",
        //   dataIndex: "totalCoeff",
          
        // },
      ];
    
   
      excel.addRow();
  
      excel.addColumns(exportingColumns);
      excel.addDataSource(excelData);
    // });
    excel.saveAs(`Ex-Factory-report-${currentDate}.xlsx`);

};
const handleTabChange = (selectedYear: string) => {
  setTab(Number(selectedYear)); 
  getData()
  console.log(Number(selectedYear),'///////////');
  
};
const getFilterdData = () => {
  let ItemName = form.getFieldValue('ItemName');

  let filteredData = data;
  console.log(filteredData,'--------');
  
  if (ItemName) {
      filteredData = filteredData.filter(record => record.itemName === ItemName);
      if (filteredData.length === 0) {
          message.error("No Data Found")
      }
      setFilteredData(filteredData);
  }
 
}
const onReset = () => {
  form.resetFields();
  getData();
}
  return (
    <Card
    title="Comparision Ex-Factory Report"
    extra={data.length > 0 ? (<Button
        type="default"
        style={{ color: 'green' }}
        onClick={handleExport}
        icon={<FileExcelFilled />}>Download Excel</Button>) : null}>

    
<Tabs type="card" onChange={handleTabChange} aria-disabled>
        {year.map((item) => (
          
          
          <Tabs.TabPane key={item.year} tab={item.year}>
           <Form form={form} layout={'vertical'}>
                    <Row gutter={24}>
                       
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <div>
                                <label>Item Name</label>
                                <Form.Item name="ItemName">
                                    <Select
                                        showSearch
                                        placeholder="Select Item Name"
                                        optionFilterProp="children"
                                        allowClear>
                                            {data.map(e=>(
                                                <Option key={e.itemName} value={e.itemName}>{e.itemName}</Option>
                                            ))}
                                        {/* <Option key='new' value="NEW">NEW</Option>
                                        <Option key='unaccepted' value="UNACCEPTED">UNACCEPTED</Option> */}
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>

                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 6 }} style={{ marginTop: 17 }} >
                            <Button
                                type="primary"
                                icon={<SearchOutlined />}
                                style={{ marginRight: 50, width: 80 }}
                                htmlType="button"
                                onClick={getFilterdData}>Search</Button>
                            <Button
                                type="primary"
                                icon={<UndoOutlined />}
                                htmlType="submit"
                                onClick={onReset}>Reset</Button>
                        </Col>
                    </Row>
                </Form>
        <Table
          dataSource={data} // Assuming 'data' contains data for each year
          columns={columns5} // Assuming 'columns5' is defined elsewhere
          size="small"
          scroll={{ x: "max-content" }}
         
        />
        
      </Tabs.TabPane>
    ))}
  </Tabs>
  </Card>
  );
};
export default ExFactoryReportWithComparision