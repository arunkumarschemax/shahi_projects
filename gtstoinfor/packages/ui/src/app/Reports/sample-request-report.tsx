import { UndoOutlined } from "@ant-design/icons";
import { SampleRequestFilter } from "@project-management-system/shared-models";
import { SampleDevelopmentService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Row, Select, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const SampleRequestReport = () => {
  const service = new SampleDevelopmentService();
  const [data, setData] = useState<any>([]);
  const [requestNo, setRequestNo] = useState<any>([]);
  const [buyers, setBuyers] = useState<any>([]);
  const [form] = Form.useForm();
  const [sampleData, setSampleData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const req = new SampleRequestFilter();
    if (form.getFieldValue("requestNo") !== undefined) {
      req.requestNo = form.getFieldValue("requestNo");
    }
    if (form.getFieldValue("buyerName") !== undefined) {
      req.buyers = form.getFieldValue("buyerName");
    }
    service.getSampleRequestReport(req).then((res) => {
      if (res.status) {
        setData(res.data);
        setFilterData(res.data);
      }
    });
  };

  // const getAllRequestNo = () => {
  //   service.getAllRequestNo().then((res) => {
  //     if (res.status) {
  //       setRequestNo(res.data);
  //     }
  //   });
  // };

  // const getAllBuyers = () => {
  //   service.getAllBuyers().then((res) => {
  //     if (res.status) {
  //       setBuyers(res.data);
  //     }
  //   });
  // };

  const onFinish = () => {
    getData();
  };

  const onReset = () => {
    form.resetFields();
    getData();
  };

  const renderCellData = (data) => {
    return data ? data : "-";
  };

  const Columns: any = [
    {
      title: "Unit",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (record) => {
        return record ? moment(record).format("YYYY-MM-DD") : null;
      },
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Buyer",
      dataIndex: "buyer_name",
      sorter: (a, b) => a.buyer_name.localeCompare(b.buyer_name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Request No",
      dataIndex: "request_no",
      sorter: (a, b) => a.request_no.localeCompare(b.request_no),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Style",
      dataIndex: "style",
      sorter: (a, b) => a.style.localeCompare(b.style),
      sortDirections: ['descend', 'ascend'],
    },
    // {
    //   title:<div style={{ textAlign: 'center' }}>Buyer</div> ,
    //   dataIndex: "sm",
    //   key: "sm",
    //   align:'center',
    //   render: (sm,text) => {
    //     renderCellData(text)
    //     return (
    //       <Table
    //         dataSource={sm}
    //         columns={[
    //           {
    //             dataIndex: "buyers",
    //             key: "buyers", align:'center',
    //           },

    //         ]}
    //         pagination={false}
    //       />
    //     );
    //   }
    // },
    {
      title: <div style={{ textAlign: "center" }}>Fabric Name</div>,
      dataIndex: "sm",
      key: "sm",
      align: "center",
      render: (sm, text) => {
        renderCellData(text);
        return (
          <Table
            dataSource={sm}
            columns={[
              {
                dataIndex: "fabricName",
                key: "fabricName",
                align: "center",
              },
            ]}
            pagination={false}
          />
        );
      },
    },
    // {
    //   title:<div style={{ textAlign: 'center' }}>Style</div> ,
    //   dataIndex: "sm",
    //   key: "sm",
    //   align:'center',
    //   render: (sm,text) => {
    //     renderCellData(text)
    //     return (
    //       <Table
    //         dataSource={sm}
    //         columns={[
    //           {
    //             dataIndex: "style",
    //             key: "style", align:'center',
    //           },

    //         ]}
    //         pagination={false}
    //       />
    //     );
    //   }
    // },

    // {
    //   title: <div style={{ textAlign: 'center' }}>Date</div>,
    //   dataIndex: "sm",
    //   key: "sm",
    //   align: 'center',
    //   render: (sm, record) => {
    //     return (
    //       <>
    //         <Table
    //           dataSource={sm}
    //           columns={[
    //             {
    //               dataIndex: "date",
    //               key: "date",
    //               align: 'center',
    //               render:(record)=>{
    //                return record ? moment(record).format("YYYY-MM-DD") : null
    //               }
    //             }
    //           ]}
    //           pagination={false}
    //         />
    //       </>
    //     );
    //   }
    // },
    {
      title: <div style={{ textAlign: "center" }}>Item</div>,
      dataIndex: "sm",
      key: "sm",
      align: "center",
      render: (sm, text) => {
        renderCellData(text);
        return (
          <Table
            dataSource={sm}
            columns={[
              {
                dataIndex: "code",
                key: "code",
                align: "center",
              },
            ]}
            pagination={false}
          />
        );
      },
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
      title: <div style={{ textAlign: "center" }}>Required Qty</div>,
      dataIndex: "sm",
      key: "sm",
      align: "center",
      render: (sm) => {
        return (
          <Table
            dataSource={sm}
            columns={[
              {
                dataIndex: "consumption",
                key: "consumption",
                align: "center",
              },
            ]}
            pagination={false}
          />
        );
      },
    },
    {
      title: <div style={{ textAlign: "center" }}>Available Qty</div>,
      dataIndex: "sm",
      key: "sm",
      align: "center",
      render: (sm) => {
        return (
          <Table
            dataSource={sm}
            columns={[
              {
                dataIndex: "quantity",
                key: "quantity",
                align: "center",
              },
            ]}
            pagination={false}
          />
        );
      },
    },
    {
      title: <div style={{ textAlign: "center" }}>Action</div>,
      dataIndex: "sm",
      key: "sm",
      align: "center",
      render: (sm) => {
        return (
          <Table
            dataSource={sm}
            columns={[
              {
                render:(value,rowdata) =>{
                  return(
                    <Button  type="primary" onClick={() =>generatePo(rowdata)}>Generate Po</Button>
                  )
                }
                // dataIndex: "quantity",
                // key: "quantity",
                // align: "center",
              },
            ]}
            pagination={false}
          />
        );
      },
    },
  ];
    const generatePo = (rowdata:any) =>{
       console.log(rowdata)
       navigate('/purchase-order', { state: { data: rowdata,type:'Sampling' } })
    }

  return (
    <div>
      <Card
        title={<span>Sample Material Status</span>}
        style={{ textAlign: "center" }}
        headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
      >
        <Form form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item name="requestNo" label="Request No">
                <Select
                  showSearch
                  placeholder="Select Request No"
                  optionFilterProp="children"
                  allowClear
                >
                  {data.map((qc: any) => (
                    <Select.Option key={qc.request_no} value={qc.request_no}>
                      {qc.request_no}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item name="buyerName" label="Buyers">
                <Select
                  showSearch
                  placeholder="Select Buyers"
                  optionFilterProp="children"
                  allowClear
                >
                  {data.map((qc: any) => (
                    <Select.Option key={qc.buyer_name} value={qc.buyer_name}>
                      {qc.buyer_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item name="style" label="Style">
                <Select
                  showSearch
                  placeholder="Select Style"
                  optionFilterProp="children"
                  allowClear
                >
                  {data.map((qc: any) => (
                    <Select.Option key={qc.style} value={qc.style}>
                      {qc.style}
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
                  onClick={onReset}
                  style={{ width: "100%" }}
                >
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          columns={Columns}
          dataSource={filterData}
          className="custom-table-wrapper"
        />
      </Card>
    </div>
  );
};

export default SampleRequestReport;
