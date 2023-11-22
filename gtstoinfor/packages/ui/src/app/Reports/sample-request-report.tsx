import { UndoOutlined } from "@ant-design/icons";
import { SampleRequestFilter } from "@project-management-system/shared-models";
import { SampleDevelopmentService } from "@project-management-system/shared-services";
import { Button, Card, Checkbox, Col, Form, Row, Select, Table } from "antd";
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
  const [selectedIndentIds, setSelectedIndentIds] = useState([]);
  const [btnEnable,setbtnEnable]=useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState({});

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
      dataIndex: "buyerName",
      sorter: (a, b) => a.buyerName.localeCompare(b.buyerName),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Request No",
      dataIndex: "sampleReqNo",
      sorter: (a, b) => a.sampleReqNo.localeCompare(b.sampleReqNo),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Indent Code",
      dataIndex: "indentCode",
      sorter: (a, b) => a.indentCode.localeCompare(b.indentCode),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Style",
      dataIndex: "styleName",
      sorter: (a, b) => a.styleName.localeCompare(b.styleName),
      sortDirections: ['descend', 'ascend'],
    },
   
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
                dataIndex: "fabricType",
                key: "fabricType",
                align: "center",
              },
            ]}
            pagination={false}
          />
        );
      },
    },
 
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
                dataIndex: "itemCode",
                key: "itemCode",
                align: "center",
              },
            ]}
            pagination={false}
          />
        );
      },
    },
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
    // {
    //   title: <div style={{ textAlign: "center" }}>Available Qty</div>,
    //   dataIndex: "sm",
    //   key: "sm",
    //   align: "center",
    //   render: (sm) => {
    //     return (
    //       <Table
    //         dataSource={sm}
    //         columns={[
    //           {
    //             dataIndex: "",
    //             key: "quantity",
    //             align: "center",
    //           },
    //         ]}
    //         pagination={false}
    //       />
    //     );
    //   },
    // },
    {
      title: <div style={{ textAlign: "center" }}>{btnEnable ?<Button  type="primary" onClick={() =>generatePo()} >Generate Po</Button>:'Genereate PO'}</div>,
      dataIndex: "sm",
      key: "sm",
      align: "center",
      render: (sm) => {
        return (
          <Table
            dataSource={sm}
            columns={[
              {
                render:(value,rowData) =>{
                  return(
                    <Checkbox 
                    onChange={() => onCheck(rowData.indentId,rowData.fabricType)}
                    // checked={selectedIndentIds.includes(rowData.indentId)}
                  />
                    // <Button  type="primary" onClick={() =>generatePo(rowdata)}>Generate Po</Button>
                  )
                }
              },
            ]}
            pagination={false}
          />
        );
      },
    },
  ];

  const generatePo =()=>{
    navigate("/purchase-order", { state: { data: selectedItems, type:'Sampling'  } });
  }
  const dataa=[];
   const onCheck = (indentId,fabricType) => {
    console.log(fabricType)
    const updatedIndentIds = selectedIndentIds.includes(indentId)
      ? selectedIndentIds.filter(id => id !== indentId)
      : [...selectedIndentIds, indentId];
    setSelectedIndentIds(updatedIndentIds);
    setbtnEnable(true)
    const resultArray = [{materialType:fabricType}, { indentIds: updatedIndentIds }];
    console.log(resultArray)
    setSelectedItems(resultArray)
  };
  console.log(selectedIndentIds)
  console.log(selectedItems)

  
  // console.log(selectedIndentIds)
  return (
    <div>
      <Card
        title={<span>Sample Raw Material </span>}
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
