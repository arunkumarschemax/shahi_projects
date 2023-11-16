import { MaterialIssueService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select, Table } from 'antd';
import { RequestNoDto } from 'packages/libs/shared-models/src/common/material-issue/requestno.dto';
import { useEffect, useState } from 'react';
import './marerial.css';
import moment from 'moment';


const { Option } = Select;
const MaterialIssueReport = () => {
  const [form] = Form.useForm();
  const service = new MaterialIssueService();
  const [data, setData] = useState<[]>([]);
  const [req, setReq] = useState<[]>([]);
  const [consmption, setConsmption] = useState<RequestNoDto[]>([]);
  const [formRef] = Form.useForm();
  const page = 1;


  useEffect(() => {
    getAllMaterial();
    getmatirialDropDown();
  }, []);

  const getAllMaterial = (req?: RequestNoDto) => {
    if (formRef.getFieldValue('consumption') !== undefined) {
      req.consumption = formRef.getFieldValue('consumption')
    }

    service.getAllMaterialIssues(req).then((res) => {
      if (res.status) {
        setData(res.data);
      }
    });
  };
//   const onSearch = () => {
//     let filterData = []
//     if(materialForm.getFieldValue('style') !== undefined){
//         const styleId = materialForm.getFieldValue('consumption')
//         filterData = data.filter((e) => e.styleId === consumption)
//     } 
//     setReq(filterData)
// }
  // const getAllMaterial = () => {
  //   service.getAllMaterialIssues().then(res => {
  //     if (res.status) {
  //       setData(res.data);

  //     }
  //   })
  // };
  const resetHandler = () => {
    formRef.resetFields();
    getAllMaterial();

}

  const onSearch = () => {
    formRef.validateFields().then((values) => {
      getAllMaterial(values);
    });
  };

  const renderCellData = (data) => {
    return data ? data : "-";
  }



  // const onRequestChange = (value) => {
  //   const consumption = req.filter((rec) => rec.consumption === value);
  //   setConsmption(consumption);
  // }

  const getmatirialDropDown = () => {
    service.getMaterialIssue().then(res => {
      if (res.status) {
        setConsmption(res.data);
        console.log(res.data ,'rrrrrrrrrrrrrrr')
      }
    }).catch(err => console.log(err))
  }


  
  const Columns: any = [
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
      dataIndex: "consumptionCode",
      width: '150px'

    },
    {
      title: "M3 Style No ",
      dataIndex: "m3StyleNo"

    },
    {
      title: "Sample Type ",
      dataIndex: "sampleType"

    },
    {
      title: "Pch",
      dataIndex: "pch"

    },
    {
      title: "Location ",
      dataIndex: "location"

    },
    {
      title: " Style  ",
      dataIndex: "style"

    },
    {
      title: "Buyer ",
      dataIndex: "buyername"

    },
    {
      title: "IssuedDate ",
      dataIndex: "issue_date",
      render: (text, record) => {
        return record.deliveryDate !== null ?
          moment(record.deliveryDate).format('YYYY-MM-DD') : ""
      },

    },


    {
      title: <div style={{ textAlign: 'center' }}>Material Type</div>,
      dataIndex: "mi_items",
      key: "mi_items",
      align: 'center',
      width: '250',
      render: (mi_items, text) => {
        renderCellData(text)
        return (
          <Table
            dataSource={mi_items}
            columns={[
              {
                dataIndex: "productName",
                key: "productName", align: 'center',

              },

            ]}
            pagination={false}
          />
        );
      }
    },
    {
      title: <div style={{ textAlign: 'center' }}>Material Code</div>,
      dataIndex: "mi_items",
      key: "mi_items",
      align: 'center',
      render: (mi_items, text) => {
        renderCellData(text)
        return (
          <Table
            dataSource={mi_items}
            columns={[
              {
                dataIndex: "materialcode",
                key: "materialcode", align: 'center',
              },
            ]}
            pagination={false}
          />
        );
      }
    },
    {
      title: <div style={{ textAlign: 'center' }}>Colour</div>,
      dataIndex: "mi_items",
      key: "mi_items",
      align: 'center',
      render: (mi_items, text) => {
        renderCellData(text)
        return (
          <Table
            dataSource={mi_items}
            columns={[
              {
                dataIndex: "color",
                key: "color", align: 'center',
              },
            ]}
            pagination={false}
          />
        );
      }
    },
    {
      title: <div style={{ textAlign: 'center' }}>Consumption</div>,
      dataIndex: "mi_items",
      key: "mi_items",
      align: 'center',
      render: (mi_items, text) => {
        renderCellData(text)
        return (
          <Table
            dataSource={mi_items}
            columns={[
              {
                dataIndex: "consumption",
                key: "consumption", align: 'center',
              },
            ]}
            pagination={false}
          />
        );
      }
    },
    {
      title: <div style={{ textAlign: 'center' }}>Issued Quantity</div>,
      dataIndex: "mi_items",
      key: "mi_items",
      align: 'center',
      render: (mi_items, text) => {
        renderCellData(text)
        return (
          <Table
            dataSource={mi_items}
            columns={[
              {
                dataIndex: "issuedQuantity",
                key: "issuedQuantity", align: 'center',
              },
            ]}
            pagination={false}
          />
        );
      }
    },
    {
      title: <div style={{ textAlign: 'center' }}>Status</div>,
      dataIndex: "mi_items",
      key: "mi_items",
      align: 'center',
      render: (mi_items, text) => {
        renderCellData(text)
        return (
          <Table
            dataSource={mi_items}
            columns={[
              {
                dataIndex: "status",
                key: "status", align: 'center',
              },
            ]}
            pagination={false}
          />
        );
      }
    },
    {
      title: "Status ",
      dataIndex: "status"

    },
  ]


  return (
    <>



      <Card title="Material Issue Report"  headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
        <div>
          <Form form={formRef}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item name='consumption' label='Consumption Code'
                  style={{ marginBottom: '10px' }}>
                  <Select placeholder='Select Consumption Code' 
                   optionFilterProp="children"
                   allowClear
                   showSearch >
                  {consmption?.map((inc: any) => {
                      return <Option key={inc.id} value={inc.consumptionCode}>{inc.consumptionCode}</Option>
                                    })
                                }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item style={{ marginBottom: '10px' }}>
                  <Button
                    htmlType='submit'
                    type="primary"
                    style={{ width: '80px', marginRight: "10px" }}
                    onClick={onSearch}
                    
                  >Submit</Button>
                  <Button htmlType='reset' danger style={{ width: '80px' }} onClick={resetHandler}>Reset</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Table columns={Columns} dataSource={data} scroll={{ x: 1500 }} />
        </div>
      </Card>
    </>
  );
};

export default MaterialIssueReport;
