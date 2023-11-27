import { UndoOutlined } from "@ant-design/icons";
import { SampleRequestFilter, SamplerawmaterialStausReq } from "@project-management-system/shared-models";
import { BuyersService, SampleDevelopmentService, StyleService } from "@project-management-system/shared-services";
import { Button, Card, Checkbox, Col, Form, Row, Select, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AlertMessages from "../common/common-functions/alert-messages";

const SampleRequestReport = () => {
  const service = new SampleDevelopmentService();
  const buyerservice= new BuyersService()
  const styleservice = new StyleService();
  const [data, setData] = useState<any>([]);
  const [requestNo, setRequestNo] = useState<any>([]);
  const [buyers, setBuyers] = useState<any>([]);
  const [style, setStyle] = useState<any>([]);

  const [form] = Form.useForm();
  const [sampleData, setSampleData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);
  const navigate = useNavigate();
  const [selectedIndentIds, setSelectedIndentIds] = useState([]);
  const [btnEnable,setbtnEnable]=useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState({});
  const [type, setType] = useState({});

  const {Option} = Select
  useEffect(() => {
    getData();
    getAllRequestNo()
    getAllBuyers()
    getAllStyles()
  }, []);

  const getData = () => {
    const req = new SamplerawmaterialStausReq();
    if (form.getFieldValue("requestNo") !== undefined) {
      req.sampleReqNo = form.getFieldValue("requestNo");
    }
    if (form.getFieldValue("buyerId") !== undefined) {
      req.buyerId = form.getFieldValue("buyerId");
    }
    if (form.getFieldValue("style") !== undefined) {
      req.styleId = form.getFieldValue("style");
    }
    
    service.getSampleRequestReport(req).then((res) => {
      if (res.status) {
        setData(res.data);
      }else
      {
        setData([])
         AlertMessages.getErrorMessage("NO DATA FOUND");
     }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setData([]);
    })
  };

  const getAllRequestNo = () => {
    service.getAllRequestNo().then((res) => {
      if (res.status) {
        setRequestNo(res.data);
      }
    });
  };

  const getAllBuyers = () => {
    buyerservice.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyers(res.data);
      }
    });
  };

  const getAllStyles= () => {
    styleservice.getAllActiveStyle().then(res => {
      if (res.status) {
        setStyle(res.data);
      } else
       {
        setStyle([])
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setStyle([]);
    })
  }

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
      title: "Buyer",
      dataIndex: "buyerName",
      sorter: (a, b) => a.buyerName.localeCompare(b.buyerName),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Brand",
      dataIndex: "brandName",
      sorter: (a, b) => a.brandName.localeCompare(b.brandName),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Location",
      dataIndex: "locationName",
      sorter: (a, b) => a.locationName.localeCompare(b.locationName),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Request No",
      dataIndex: "sampleReqNo",
      sorter: (a, b) => a.sampleReqNo.localeCompare(b.sampleReqNo),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Style",
      dataIndex: "stylename",
      sorter: (a, b) => a.stylename.localeCompare(b.stylename),
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
                  console.log(rowData,"rowdata")
                  return(
                    <Checkbox 
                    onChange={() => onCheck(rowData.indentId,rowData.fabricType)}
                   
                  />
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
    setType(fabricType)
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

  
  console.log(type,"type")
  return (
    <div>
      <Card
        title={<span>Sample Raw Material </span>}
        style={{ textAlign: "center" }}
        headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
      >
        <Form form={form} >
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="requestNo" label="Request Number">
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Select Request Number"
                >
                  {requestNo.map((e) => {
                    return (
                      <Option
                        key={e.SampleRequestId}
                        value={e.SampleRequestId}
                        name={e.requestNo}
                      >
                        {" "}
                        {e.requestNo}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item name="buyerId" label="Buyers">
                <Select
                  showSearch
                  placeholder="Select Buyers"
                  optionFilterProp="children"
                  allowClear
                >
                  {buyers.map((qc: any) => (
                    <Select.Option key={qc.buyerName} value={qc.buyerId}>
                      {qc.buyerName}
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
                  {style.map((qc: any) => (
                    <Select.Option key={qc.style} value={qc.styleId}>
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
                  onClick={getData}
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
          dataSource={data}
          className="custom-table-wrapper"
        />
      </Card>
    </div>
  );
};

export default SampleRequestReport;
