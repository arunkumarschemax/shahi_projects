import {
    Alert,
    Button,
    Card,
    Col,
    Form,
    Row,
    Select,
    Space,
    Table,
    Tabs,
    Typography,
    message,
  } from "antd";
  import TabPane from "antd/es/tabs/TabPane";
  import ExFactoryReport from "./ex-factory-report";
  import WarehouseReport from "./ware-house-report";
  import {
    FileExcelFilled,
    SearchOutlined,
    UndoOutlined,
  } from "@ant-design/icons";
  import form from "antd/es/form";
  import { useEffect, useState } from "react";
  import { OrdersService } from "@project-management-system/shared-services";
  import React from "react";
  import { NewMonthWiseDto, NewitemDataDto, YearReq, orders } from "@project-management-system/shared-models";
  import { Excel } from "antd-table-saveas-excel";
  import { IExcelColumn } from "antd-table-saveas-excel/app";
  import "./comparision-report.css";
import { ColumnsType } from "antd/es/table";
  
  export const MonthWiseReportNew = () => {
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const { Option } = Select;
    const [selected, setSelected] = useState("ExFactory");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [phase, setPhase] = useState<any[]>([]);
    const [phaseExcel, setPhaseExcel] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [year, setYear] = useState<any[]>([]);
    const [tab, setTab] = useState<number | null>(null);
    const service = new OrdersService();
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [excelsData, setExcelData] = useState<any[]>([]);
    const { Text } = Typography;
    const [comuns, setColumns] =useState([])
    const [tableData, setTableData] = useState<any[]>([])
    useEffect(() => {
        console.log(selected, tab)
      getData(selected, tab);
      getTabs();
      getSizeWiseHeaders(data)
    }, []);
   
   
    const handleTabChange = (selectedYear: any) => {
      setTab(Number(selectedYear));
      // console.log(selectedYear,'year');
  
      getData(selected, selectedYear);
    };
    const getTabs = () => {
      service.getExfactoryYearData().then((res) => {
        if (res.status) {
          setYear(res.data);
          // handleChange(res.data[0])
          if (res.data.length > 0) {
            console.log('HIIII')
            setTab(res.data[0])
            handleTabChange(res.data[0].year)
            
          }
        }
      });
    };
  
    const getData = (val, tabName) => {
      const req = new YearReq( tabName,val);
     service.getMonthWiseReportDataNew(req).then((res) => {
        if (res.status) {
          console.log(res.data)
          setData(res.data);
          setFilteredData(res.data);
        } else {
          setData([]);
        }
      });
    //   service.getExfactoryMonthExcel(req).then((res) => {
    //     // console.log(res, "res==========");
    //     if (res.status) {
    //       setExcelData(res.data);
    //     } else {
    //       setData([]);
    //     }
    //   });
      service.getPhaseMonthExcelDataNew(req).then((res) => {
        // console.log(res,"*********")
        if (res.status) {
          setPhase(res.data);
        } else {
          setPhase([]);
        }
      });
    //   service.getPhaseMonthExcelData(req).then((res) => {
    //     // console.log(res, "res==========");
    //     if (res.status) {
    //       setPhaseExcel(res.data);
    //     } else {
    //       setPhaseExcel([]);
    //     }
    //   });
    };
    const getFilterdData = () => {
      let ItemName = form.getFieldValue("ItemName");
  
      let filteredData = data;
  
      if (ItemName) {
        filteredData = filteredData.filter(
          (record) => record.itemName === ItemName
        );
        if (filteredData.length === 0) {
          message.error("No Data Found");
        }
        setFilteredData(filteredData);
      }
    };
    const onReset = () => {
      form.resetFields();
      getData(selected, tab);
    };

    const renderCellData = (data) => {
      return data ? data : "-";
    };



    const columns: ColumnsType<any> = [
      {
        title: "#",
        key: "sno",
        width:"30px",
        render: (text, object, index) =>
          (page - 1) * pageSize + (index + 1) + pageSize * (page - 1),
      },
  
      {
        title: 'Planning Sum',
        dataIndex: "itemName",
        width: "100px",
        // ellipsis: true,
      },
    
      {
        title: <div style={{ textAlign: "center" }}>Production Plan Type</div>,
        dataIndex: "monthWiseData",
        key: "monthWiseData",
        align: "center",
        width:'10px',
        render: (monthWiseData, text) => {
          renderCellData(text);
          return (
            <Table
              dataSource={monthWiseData}
              // columns={productionPlanColumn}
              children
              columns={[
                {
                  dataIndex: "phaseType",
                  key: "phaseType",
                  align: "center",
                },
              ]}
              pagination={false}
            />
          );
        },
      },
    ];


    const getSizeWiseHeaders = (data: NewitemDataDto[]) => {
      const sizeHeaders = new Set<string>();
      data?.forEach((rec) =>
        rec.monthWiseData?.forEach((version) => {
          version.pcsData?.forEach((pc =>{
          sizeHeaders.add("" + pc.monthName);
          }))
          
        })
      );
      return Array.from(sizeHeaders);
    };

    const sizeHeaders = getSizeWiseHeaders(data);
   


    const generateSizeColumns = (): ColumnsType<any> => {
      const sizeColumns: ColumnsType<any> = sizeHeaders.map((header) => ({
        title: header,
        dataIndex: header,
        key: header,
        align: 'center',
        children:[
          {
          title:'in Pcs',
          dataIndex:'inPcs',
          key:'inpcs'
        },
        {
          title:'Coeff Pcs',
          dataIndex:'exfpcs'
        }
      ]
        // You can add additional configurations or rendering logic as needed
      }));
      return sizeColumns;
    };
    const sizeColumns = generateSizeColumns();
   columns.push(...sizeColumns);

      sizeHeaders.forEach((header) => {
        sizeColumns.push({
          title: header,
          dataIndex: header,
          key: header,
          width:'150px',
          align: 'center',
        });
      });


    return (
      <>
        <Card>
          <Form form={form1} layout={"vertical"}>
            <Row gutter={24}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 6 }}
                lg={{ span: 6 }}
                xl={{ span: 6 }}
              >
                <div>
                  <label>Month Wise Parameters</label>
                  <Form.Item name="Label" initialValue={"ExFactory"}>
                    <Select
                      showSearch
                      placeholder="Select "
                      optionFilterProp="children"
                      allowClear
                      // onChange={handleChange}
                      defaultValue={"ExFactory"}
                    >
                      <Option key={"ExFactory"} value={"ExFactory"}>
                        Ex-Factory
                      </Option>
                      <Option key={"WareHouse"} value={"WareHouse"}>
                        WareHouse
                      </Option>
                    </Select>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
            <Tabs type="card" onChange={handleTabChange}>
              {year.map((item) => (
                <Tabs.TabPane key={item.year} tab={item.year}>
                          {selected && data.length > 0 ? (
                            <>
  
                  <Form form={form} layout={"vertical"}>
                    <Row gutter={24}>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 6 }}
                        lg={{ span: 6 }}
                        xl={{ span: 6 }}
                      >
                        <div>
                          <label>Planning Sum</label>
                          <Form.Item name="ItemName">
                            <Select
                              showSearch
                              placeholder="Select Planning Sum"
                              optionFilterProp="children"
                              allowClear
                            >
                              {data.map((e) => (
                                <Option key={e.itemName} value={e.itemName}>
                                  {e.itemName}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
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
                          type="primary"
                          icon={<SearchOutlined />}
                          style={{ marginRight: 50, width: 80 }}
                          htmlType="button"
                          onClick={getFilterdData}
                        >
                          Search
                        </Button>
                        <Button
                          type="primary"
                          icon={<UndoOutlined />}
                          htmlType="submit"
                          onClick={onReset}
                        >
                          Reset
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
                        <Button
                          type="default"
                          style={{ color: "green" }}
                          // onClick={handleExport}
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
                    bordered={false}
                    dataSource={data}
                    columns={columns}
                    size="small"
                    scroll={{ x: "max-content",y:500 }}
                    // summary={getTableSummary}
                    pagination={false}
                  />
                  {/* <Table
                    columns={columns}
                    dataSource={phaseExcel}
                    size="small"
                    scroll={{ x: "max-content" }}
                    pagination={false}
                  /> */}
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
            </>
          )}
                </Tabs.TabPane>
              ))}
            </Tabs>
         
        </Card>
      </>
    );
  };
  export default MonthWiseReportNew;
  