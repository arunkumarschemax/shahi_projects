import { MaterialIssueService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select, Table } from 'antd';
import moment from 'moment';
import { RequestNoDto } from 'packages/libs/shared-models/src/common/material-issue/requestno.dto';
import { useEffect, useState } from 'react';
import './marerial.css';


const { Option } = Select;
const MaterialIssueReport = () => {
  const [form] = Form.useForm();
  const service = new MaterialIssueService();
  const [data, setData] = useState<any[]>([]);
  const [req, setReq] = useState<RequestNoDto[]>([]);
  const [consmption, setConsmption] = useState<RequestNoDto[]>([]);
  const [formRef] = Form.useForm();
  const page = 1;

  useEffect(() => {
    getAllMaterial();
    getmatirialDropDown();
  }, []);

  const getAllMaterial = (req?:RequestNoDto) => {
    console.log(req,'fe')
    if(form.getFieldValue('requestNo') !== undefined){
      req.requestNo = form.getFieldValue('requestNo')
    }
    if(form.getFieldValue('consumption') !== undefined){
      req.consumption = form.getFieldValue('consumption')
    }
    service.getAllMaterialIssues(req).then((res) => {
      if (res.status) {
        setData(res.data);
      }
    });
  };


  const onRequestChange = (value) => {
    const consumption = req.filter((rec) => rec.requestNo === value);
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

  }


  const columns: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "Consumption Code",
      dataIndex: "consumption_code",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      width: '150px',
      fixed: 'left',
    },
    {
      title: "M3 Style No",
      dataIndex: "m3_style_no",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "Sample Type",
      dataIndex: "sampleType",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "PCH",
      dataIndex: "pch",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    // {
    //   title: "Sample Indent Date",
    //   dataIndex: "issue_date",
    //   onCell: (record: any) => ({
    //     rowSpan: record.rowSpan,
    //   }),
    //   render: (text, record) => {
    //     return record.issue_date
    //       ? moment(record.issue_date).format('YYYY-MM-DD')
    //       : "";
    //   },
    // },
    {
      title: "Location",
      dataIndex: "locationname",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: "Style",
      dataIndex: "styleNo",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: " Buyer",
      dataIndex: "buyername",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: "Issued Date",
      dataIndex: "issue_date",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      render: (text, record) => {
        return record.issue_date
          ? moment(record.issue_date).format('YYYY-MM-DD')
          : "";
      },
    },
    {
      title: " Material Type",
      dataIndex: "materialtype",
      width: colWidth.materialtype,
      render: (text, record) => {
        return record.materialtype ? record.materialtype : '-'

      },

    },
    {
      title: "Material Code",
      dataIndex: "fabricCode",

      width: colWidth.fabricCode,
      render: (text, record) => {
        return record.fabricCode ? record.fabricCode : '-'

      },

    },

    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   width: colWidth.description,
    //   render: (text, record) => {
    //     return record.description ? record.description : '-'

    //   },
    // },

    {
      title: "Color",
      dataIndex: "color",
      width: colWidth.color,
      render: (text, record) => {
        return record.color ? record.color : '-'

      },
    },
    {
      title: "Consumption",
      dataIndex: "consumption",
      width: colWidth.consumption,
      render: (text, record) => {
        return record.consumption ? record.consumption : '-'

      },
    },
    {
      title: "Issued Quantity",
      dataIndex: "issuedQuantity",
      width: colWidth.issuedQuantity,
      render: (text, record) => {
        return record.issuedQuantity ? record.issuedQuantity : '-'

      },
    },
    {
      title: "Operation Status",
      dataIndex: "status",
      width: colWidth.remarks,
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      render: (text, record) => {
        return record.remarks

      },
    },

  ];
  const allMaterialsData = (data: any) => {
    const totalData: any[] = [];
    data?.forEach((main: any, mainIndex: number) => {
      main.mi_items.forEach((child: any, childIndex: number) => {
        let gridObj: any = {};
        gridObj.request_no = main.request_no;
        gridObj.consumption_code = main.consumption_code;
        gridObj.styleNo = main.styleNo;
        gridObj.sampleType = main.sampleType;
        gridObj.pch = main.pch;
        gridObj.issue_date = main.issue_date;
        gridObj.locationname = main.locationname;
        gridObj.buyername = main.buyername;
        gridObj.m3_style_no = main.m3_style_no;
        gridObj.mi_items = main.mi_items;
        gridObj.status = main.status;
        gridObj.rowSpan = 0;
        if (childIndex === 0) {
          gridObj.rowSpan = main.mi_items.length
        }
        gridObj.material_trim_id = child.material_trim_id
        gridObj.fabricCode = child.fabricCode
        gridObj.materialtype = child.materialtype
        gridObj.description = child.description
        gridObj.color = child.color
        gridObj.consumption = child.consumption
        gridObj.issuedQuantity = child.issuedQuantity;
        totalData.push(gridObj)
      })
    });
    return totalData
  };

  console.log(allMaterialsData(data), ":::::::::::::::::::::::::::::::::")

  const reset = () =>{
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
                style={{ width: '80px', marginRight:"10px" }}
                onClick={() => formRef.validateFields().then(value => {
                  getAllMaterial(value)
                })}
              >Submit</Button>
              <Button htmlType='reset' danger style={{ width: '80px' }}onReset={reset}>Reset</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
          <Table
            rowKey={(rec) => rec.request_no}
            size="small"
            columns={columns}
            dataSource={allMaterialsData(data)}
            pagination={{
              total: data.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }} scroll={{ x: 'max-content' }}
            bordered
          />
        </div>
      </Card>
    </>
  );
};

export default MaterialIssueReport;
