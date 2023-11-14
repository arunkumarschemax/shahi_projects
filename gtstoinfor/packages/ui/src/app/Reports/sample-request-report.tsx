import { UndoOutlined } from '@ant-design/icons';
import { SampleRequestFilter } from '@project-management-system/shared-models';
import { SampleDevelopmentService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select, Table } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'

const SampleRequestReport = () => {

    const service = new SampleDevelopmentService();
    const [data, setData] = useState<any>([]);
    const [requestNo, setRequestNo] = useState<any>([]);
    const [buyers, setBuyers] = useState<any>([]);
    const [form] = Form.useForm();
    const [sampleData, setSampleData] = useState<any[]>([]);
    const [filterData, setFilterData] = useState<any[]>([]);

    const getData = () => {
        service.getSampleRequestReport().then(res => {
            if(res.status){
                setData(res.data);
        
            }
        })
      };

      useEffect(() => {
        getData();
        getAllRequestNo();
        getAllBuyers();
        // getAllSampleReportData();
      }, []);

      const getAllRequestNo= () => {
        service.getAllRequestNo().then((res) => {
          if (res.status) {
            setRequestNo(res.data)
          }
        });
      };

      const getAllBuyers= () => {
        service.getAllBuyers().then((res) => {
          if (res.status) {
            setBuyers(res.data)
          }
        });
      };

      // const getAllSampleReportData = () => {
      //   const req = new SampleRequestFilter()
      //   if (form.getFieldValue('requestNo') !== undefined) {
      //     req.requestNo = form.getFieldValue('requestNo')
      //   }
      //   if (form.getFieldValue('buyers') !== undefined) {
      //     req.buyers = form.getFieldValue('buyers')
      //   }
      //   service.getAllSampleReportData(req).then((res) => {
      //     console.log(req,'77777777777777')
      //     if (res.data) {
      //       setSampleData(res.data);
      //       setFilterData(res.data)
      //     }
      //   });
      // };

      // const onFinish = () => {
      //   getAllSampleReportData();
      // };

      // const onReset = () => {
      //   form.resetFields();
      //   getAllSampleReportData();
      // };

      const  renderCellData=(data)=>{
        return  data?data:"-";
      }

    const Columns:any=[
        {
            title:"Request No",
            dataIndex:"request_no"
            
        },
        {
          title:<div style={{ textAlign: 'center' }}>Buyer</div> ,
          dataIndex: "sm",
          key: "sm",
          align:'center',
          render: (sm,text) => {
            renderCellData(text)
            return (
              <Table
                dataSource={sm}
                columns={[
                  {
                    dataIndex: "buyers",
                    key: "buyers", align:'center',
                  },
                 
                ]}
                pagination={false}
              />
            );
          }
        },
        {
          title:<div style={{ textAlign: 'center' }}>Fabric Name</div> ,
          dataIndex: "sm",
          key: "sm",
          align:'center',
          render: (sm,text) => {
            renderCellData(text)
            return (
              <Table
                dataSource={sm}
                columns={[
                  {
                    dataIndex: "fabricName",
                    key: "fabricName", align:'center',
                  },
                 
                ]}
                pagination={false}
              />
            );
          }
        },
        {
          title:<div style={{ textAlign: 'center' }}>Style</div> ,
          dataIndex: "sm",
          key: "sm",
          align:'center',
          render: (sm,text) => {
            renderCellData(text)
            return (
              <Table
                dataSource={sm}
                columns={[
                  {
                    dataIndex: "style",
                    key: "style", align:'center',
                  },
                 
                ]}
                pagination={false}
              />
            );
          }
        },

        {
          title: <div style={{ textAlign: 'center' }}>Date</div>,
          dataIndex: "sm",
          key: "sm",
          align: 'center',
          render: (sm, record) => {
            return (
              <>
                <Table
                  dataSource={sm}
                  columns={[
                    {
                      dataIndex: "date",
                      key: "date",
                      align: 'center',
                      render:(record)=>{
                       return record ? moment(record).format("YYYY-MM-DD") : null
                      }
                    }
                  ]}
                  pagination={false}
                />
              </>
            );
          }
        },
        {
                title:<div style={{ textAlign: 'center' }}>Item</div> ,
                dataIndex: "sm",
                key: "sm",
                align:'center',
                render: (sm,text) => {
                  renderCellData(text)
                  return (
                    <Table
                      dataSource={sm}
                      columns={[
                        {
                          dataIndex: "code",
                          key: "code", align:'center',
                        },
                       
                      ]}
                      pagination={false}
                    />
                  );
                }
              },
              // {
              //   title:<div style={{ textAlign: 'center' }}>Color</div> ,
              //   dataIndex: "sm",
              //   key: "sm",
              //   align:'center',
              //   render: (sm) => {
              //     return (
              //       <Table
              //         dataSource={sm}
              //         columns={[
              //           {
              //             dataIndex: "color",
              //             key: "color", align:'center',
              //           },
              //         ]}
              //         pagination={false}
              //       />
              //     );
              //   }
              // },
              {
                title:<div style={{ textAlign: 'center' }}>Required Qty</div> ,
                dataIndex: "sm",
                key: "sm",
                align:'center',
                render: (sm) => {
                  return (
                    <Table
                      dataSource={sm}
                      columns={[
                        {
                          dataIndex: "consumption",
                          key: "consumption", align:'center',
                        },
                      ]}
                      pagination={false}
                    />
                  );
                }
              },
              {
                title:<div style={{ textAlign: 'center' }}>Available Qty</div> ,
                dataIndex: "sm",
                key: "sm",
                align:'center',
                render: (sm) => {
                  return (
                    <Table
                      dataSource={sm}
                      columns={[
                        {
                          dataIndex: "quantity",
                          key: "quantity", align:'center',
                        },
                      ]}
                      pagination={false}
                    />
                  );
                }
              },
         


       
    ]

  return (
    <div>
        <Card title={<span>Sample Material Status</span>} style={{textAlign:'center'}} headStyle={{ border: 0 }}
        className="card-header">
          <Form form={form} 
        // onFinish={onFinish}
        >
           <Row gutter={24}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="requestNo" label="Request No">
              <Select
                showSearch
                placeholder="Select Request No"
                optionFilterProp="children"
                allowClear
              >
                {requestNo.map((qc: any) => (
                  <Select.Option key={qc.requestNo} value={qc.requestNo}>
                    {qc.requestNo}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "green", width: "100%" }}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                danger
                icon={<UndoOutlined />}
                // onClick={onReset}
                style={{ width: "100%" }}
              >
                Reset
              </Button>
            </Form.Item>
          </Col>
          </Row>
          </Form>
        <Table columns={Columns}  
        dataSource={data}
        className="custom-table-wrapper"
            /> 
        </Card>
    </div>
  )
}

export default SampleRequestReport
