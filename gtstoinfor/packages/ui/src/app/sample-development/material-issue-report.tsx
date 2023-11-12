import { MaterialIssueService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select, Table } from 'antd';
import moment from 'moment';
import { RequestNoDto } from 'packages/libs/shared-models/src/common/material-issue/requestno.dto';
import { useEffect, useState } from 'react';
import './marerial.css';
import { FabricDataDto, MaterialIssueReportsDto, TrimDataDto } from '@project-management-system/shared-models';
import MaterialReportstable from './material-reports-table';
import { ColumnsType } from 'antd/es/table';


const { Option } = Select;
const MaterialIssueReport = () => {
  const [form] = Form.useForm();
  const service = new MaterialIssueService();
  const [data, setData] = useState<MaterialIssueReportsDto[]>([]);
  const [req, setReq] = useState<RequestNoDto[]>([]);
  const [consmption, setConsmption] = useState<RequestNoDto[]>([]);
  const [formRef] = Form.useForm();
  const page = 1;

  useEffect(() => {
    getAllMaterial();
    getmatirialDropDown();
  }, []);

  const getAllMaterial = (req?: RequestNoDto) => {
    if (form.getFieldValue('consumption') !== undefined) {
      req.consumption = form.getFieldValue('consumption')
    }
    service.getAllMaterialIssues(req).then((res) => {
      if (res.status) {
        setData(res.data);
      }
    });
  };


  const onRequestChange = (value) => {
    const consumption = req.filter((rec) => rec.consumption === value);
    setConsmption(consumption);
  }

  const getmatirialDropDown = () => {
    service.getMaterialIssue().then(res => {
      if (res.status) {
        setReq(res.data);
      }
    }).catch(err => console.log(err))
  }

  const colWidth = {
    materialtype: 120,
    fabricCode: 100,
    description: 100,
    color: 50,
    consumption: 80,
    issuedQuantity: 130,
    remarks: 130,
    status: 120,

  }


  // const columns: any[] = [
  //   {
  //     title: 'S No',
  //     key: 'sno',
  //     width: '70px',
  //     responsive: ['sm'],
  //     render: (text, object, index) => (page - 1) * 10 + (index + 1),
  //     fixed: 'left',
  //   },
  //   {
  //     title: "Consumption Code",
  //     dataIndex: "consumption_code",
  //     width: '150px',
  //     fixed: 'left',
  //     // onCell: (record: any) => ({
  //     //   rowSpan: record.rowSpan,
  //     // }),
  //   },
  //   {
  //     title: "M3 Style No",
  //     dataIndex: "m3_style_no",
  //     fixed: 'left',
  //     onCell: (record: any) => ({
  //       rowSpan: record.rowSpan,
  //     }),
  //   },
  //   {
  //     title: "Sample Type",
  //     dataIndex: "sampleType",
  //     fixed: 'left',
  //     onCell: (record: any) => ({
  //       rowSpan: record.rowSpan,
  //     }),
  //   },

  //   {
  //     title: "PCH",
  //     dataIndex: "pch",
  //     fixed: 'left',
  //     onCell: (record: any) => ({
  //       rowSpan: record.rowSpan,
  //     }),
  //   },
  //   {
  //     title: "Location",
  //     dataIndex: "locationname",
  //     onCell: (record: any) => ({
  //       rowSpan: record.rowSpan,
  //     }),
  //   },
  //   {
  //     title: "Style",
  //     dataIndex: "style",
  //     onCell: (record: any) => ({
  //       rowSpan: record.rowSpan,
  //     }),
  //   },
  //   {
  //     title: " Buyer",
  //     dataIndex: "buyername",
  //     onCell: (record: any) => ({
  //       rowSpan: record.rowSpan,
  //     }),
  //   },
  //   {
  //     title: "Issued Date",
  //     dataIndex: "issue_date",
  //     onCell: (record: any) => ({
  //       rowSpan: record.rowSpan,
  //     }),
  //     render: (text, record) => {
  //       return record.issue_date
  //         ? moment(record.issue_date).format('YYYY-MM-DD')
  //         : "";
  //     },
  //   },
  //   {
  //     title: " Material Type",
  //     dataIndex: "materialtype",
  //     width: colWidth.materialtype,
  //     render: (text, record) => {
  //       return record.materialtype ? record.materialtype : '-'

  //     },

  //   },
  //   {
  //     title: "Material Code",
  //     dataIndex: "fabricCode",
  //     width: colWidth.fabricCode,
  //     render: (text, record) => {
  //       return record.fabricCode ? record.fabricCode : '-'

  //     },

  //   },

  //   {
  //     title: "Color",
  //     dataIndex: "color",
  //     width: colWidth.color,
  //     // onCell: (record: any) => ({
  //     //   rowSpan: record.rowSpan,
  //     // }),
  //     render: (text, record) => {
  //       return record.color ? record.color : '-'

  //     },
  //   },
  //   {
  //     title: "Consumption",
  //     dataIndex: "consumption",
  //     width: colWidth.consumption,
  //     // onCell: (record: any) => ({
  //     //   rowSpan: record.rowSpan,
  //     // }),
  //     render: (text, record) => {
  //       return record.consumption ? record.consumption : '-'

  //     },
  //   },
  //   {
  //     title: "Issued Quantity",
  //     dataIndex: "issuedQuantity",
  //     width: colWidth.issuedQuantity,
  //     render: (text, record) => {
  //       return record.issuedQuantity ? record.issuedQuantity : '-'

  //     },


  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     width: colWidth.status,
  //     render: (text, record) => {
  //       return record.status ? record.status : '-'

  //     },
  //   },
  //   {
  //     title: "Operation Status",
  //     dataIndex: "status",
  //     width: colWidth.remarks,
  //     onCell: (record: any) => ({
  //       rowSpan: record.rowSpan,
  //     }),
  //     render: (text, record) => {
  //       return record.remarks

  //     },
  //   },

  // ];
  // const allMaterialsData = (data: MaterialIssueReportsDto[]) => {
  //   const totalData: any[] = [];
  //   data.forEach((main ,index)=>{
  //     if(main.fabricData.length){
  //       for (let i = 0; i < main.fabricData.length; i++) {
  //         let gridObj: any = {};
  //         gridObj.consumption_code = main.consumptionCode;
  //         gridObj.sampleType = main.sampleType;
  //         gridObj.pch = main.pch;
  //         gridObj.issue_date = main.issuedDate;
  //         gridObj.locationname = main.location;
  //         gridObj.style = main.style;
  //         gridObj.buyername = main.buyer;
  //         gridObj.m3_style_no = main.m3StyleNo;
  //         gridObj.rowSpan = 0;
  //         if (i === 0) {
  //           gridObj.rowSpan = main.fabricData?.length
  //         }
  //         gridObj.fabricCode = main.fabricData[i].itemCode;
  //         gridObj.materialtype = main.fabricData[i].productName;
  //         gridObj.color = main.fabricData[i].color;
  //         totalData.push(gridObj);
  //       };
  //     }else{
  //       let gridObj: any = {};
  //       console.log(main.consumptionCode,"///////////////////")
  //       gridObj.consumption_code = main.consumptionCode;
  //       gridObj.sampleType = main.sampleType;
  //       gridObj.pch = main.pch;
  //       gridObj.issue_date = main.issuedDate;
  //       gridObj.locationname = main.location;
  //       gridObj.style = main.style;
  //       gridObj.buyername = main.buyer;
  //       gridObj.m3_style_no = main.m3StyleNo;
  //       gridObj.rowSpan = 0;
  //       // if (i === 0) {
  //       //   gridObj.rowSpan = main.fabricData?.length
  //       // }
  //       gridObj.fabricCode = null;
  //       gridObj.materialtype = null;
  //       gridObj.color = null;
  //       totalData.push(gridObj);
  //     };
  //     if(main.trimData.length){
  //       for (let i = 0; i < main.fabricData.length; i++) {
  //         let gridObj: any = {};
  //         gridObj.consumption_code = main.consumptionCode;
  //         gridObj.sampleType = main.sampleType;
  //         gridObj.pch = main.pch;
  //         gridObj.issue_date = main.issuedDate;
  //         gridObj.locationname = main.location;
  //         gridObj.style = main.style;
  //         gridObj.buyername = main.buyer;
  //         gridObj.m3_style_no = main.m3StyleNo;
  //         gridObj.rowSpan = 0;
  //         if (i === 0) {
  //           gridObj.rowSpan = main.fabricData?.length
  //         };
  //         gridObj.fabricCode = main.fabricData[i].itemCode;
  //         gridObj.materialtype = main.fabricData[i].productName;
  //         gridObj.color = main.fabricData[i].color;
  //         totalData.push(gridObj);
  //       };
  //     }else{
  //       let gridObj: any = {};
  //       console.log(main.consumptionCode,"///////////////////")
  //       gridObj.consumption_code = main.consumptionCode;
  //       gridObj.sampleType = main.sampleType;
  //       gridObj.pch = main.pch;
  //       gridObj.issue_date = main.issuedDate;
  //       gridObj.locationname = main.location;
  //       gridObj.style = main.style;
  //       gridObj.buyername = main.buyer;
  //       gridObj.m3_style_no = main.m3StyleNo;
  //       gridObj.rowSpan = 0;
  //       // if (i === 0) {
  //       //   gridObj.rowSpan = main.fabricData?.length
  //       // }
  //       gridObj.fabricCode = null;
  //       gridObj.materialtype = null;
  //       gridObj.color = null;
  //       totalData.push(gridObj);
  //     };

  //   })

   
   

    


  //   return totalData

  // };

    // data?.forEach((main: MaterialIssueReportsDto, mainIndex: number) => {
    //   main?.fabricData.forEach((child: TrimDataDto, childIndex: number) => {
    //     // let gridObj: any = {};
    //     // gridObj.consumption_code = main.consumptionCode;
    //     // gridObj.sampleType = main.sampleType;
    //     // gridObj.pch = main.pch;
    //     // gridObj.issue_date = main.issuedDate;
    //     // gridObj.locationname = main.location;
    //     // gridObj.style = main.style;
    //     // gridObj.buyername = main.buyer;
    //     // gridObj.m3_style_no = main.m3StyleNo;
    //     // // gridObj.status = main.status;
    //     // gridObj.rowSpan = 0;
    //     // if (childIndex === 0) {
    //     //   gridObj.rowSpan = main.fabricData?.length
    //     // }
    //     // gridObj.fabricCode = child.itemCode;
    //     // gridObj.materialtype = child.productName;
    //     // // gridObj.description = child.description;
    //     // gridObj.color = child.color;
    //     // gridObj.consumption = child.consumption;
    //     // gridObj.issuedQuantity = child.issuedQuantity;
    //     // // gridObj.materialtype = child.productName;
    //     // // gridObj.color = child.color;
    //     // // gridObj.consumption = child.consumption;
    //     // // gridObj.issuedQuantity = child.issuedQuantity;
    //     // totalData.push(gridObj);
    //     // console.log(childIndex, mainIndex, "PPPPPPPPPPPPPPPPPPPPPPP")
    //   });
    //   // console.log(mainIndex, "main")
    // });
    // return totalData
 

  // console.log(allMaterialsData(data), ":::::::::::::::::::::::::::::::::")

  const reset = () => {
    form.resetFields()
    getAllMaterial()
  }

  return (
    <>



      <Card title="Material Issue Report" className='card-header'>
        <div>
          <Form form={formRef}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item name={'consumption'} label='Consumption Code'
                  style={{ marginBottom: '10px' }}>
                  <Select placeholder='Select Consumption Code' >

                    {consmption.map((rec) => {
                      return <Option value={rec.consumption}>
                        {rec.consumption}
                      </Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item style={{ marginBottom: '10px' }}>
                  <Button
                    htmlType='submit'
                    type="primary"
                    style={{ width: '80px', marginRight: "10px" }}
                    onClick={() => formRef.validateFields().then(value => {
                      getAllMaterial(value)
                    })}
                  >Submit</Button>
                  <Button htmlType='reset' danger style={{ width: '80px' }} onReset={reset}>Reset</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {/* <Table
            rowKey={(rec) => rec.consumption_code}
            size="small"
            columns={columns}
            dataSource={allMaterialsData(data)}
            pagination={false}
            // pagination={{
            //   total: data.length,
            //   showTotal: (total, range) =>
            //     `${range[0]}-${range[1]} of ${total} items`,
            // }}
             scroll={{ x: 'max-content' }}
            bordered
          /> */}
          <MaterialReportstable data={data}/>
        </div>
      </Card>
    </>
  );
};

export default MaterialIssueReport;
