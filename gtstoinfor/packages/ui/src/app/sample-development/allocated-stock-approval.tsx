import React, { useEffect, useState } from "react";
import { SampleDevelopmentService } from "@project-management-system/shared-services";
import AlertMessages from "../common/common-functions/alert-messages";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Select,
  Spin,
  Table,
  notification,
} from "antd";
import { ColumnProps } from "antd/es/table";
import { Tabs } from "antd";
import {
  AllocatedLocationReq,
  AllocationApprovalReq,
  RequestNoReq,
} from "@project-management-system/shared-models";

export interface AllocatedStockApprovalProps {
  screen: any;
}

export const AllocatedStockApproval = (props: AllocatedStockApprovalProps) => {
  const Option = Select;
  const [form] = Form.useForm();
  const { TabPane } = Tabs;
  const [fabricStockData, setFabricStockData] = useState<any[]>([]);
  const [trimStockData, setTrimStockData] = useState<any[]>([]);
  const service = new SampleDevelopmentService();
  const [page, setPage] = React.useState(1);
  const [requestNo, setRequestNo] = useState<any>([]);
  const [childData, setChildData] = useState({});
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    if(props.screen === 'Allocated') {
      onReset()
      getAllRequestNo();
    }
    if(props.screen === 'Issued'){
      onReset()
      getAllApprovedRequestNo();
    }
  }, [props.screen]);

  const allocatedLocationInfo = (value) => {
    const req = new AllocatedLocationReq();
    req.sampleRequestItemId = value;
    if(props?.screen === 'Issued'){
      req.action = 'Issued'
    }else{
      req.action = 'Approval'
    }
    service.allocatedLocationInfo(req).then((res) => {
      if (res.status) {
        setChildData((prev) => {
          return { ...prev, [value]: res.data };
        });
      }
    });
  };

  const getAllocatedBomData = () => {
    const req = new RequestNoReq();
    req.requestNo = form.getFieldValue("requestNo");
    if(props?.screen === 'Issued'){
      req.action = 'Issued'
    }else{
      req.action = 'Approval'
    }
    service.getAllocatedBomInfo(req).then((res) => {
      if (res.data) {
        setFabricStockData(res.data);
        // setTrimStockData(res.data.trimInfo);
        AlertMessages.getSuccessMessage(res.internalMessage);
      } else {
        setFabricStockData([]);
        // setTrimStockData([]);
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    });
  };

  const getAllRequestNo = () => {
    setRequestNo([])
    service.getAllAllocatedRequestNo().then((res) => {
      if (res.status) {
        setRequestNo(res.data);
      }
    });
  };

  const getAllApprovedRequestNo = () =>{
    setRequestNo([])
    service.getAllApprovedRequestNo().then((res)=>{
      if (res.status) {
        setRequestNo(res.data);
      }
    })
  }

  const approvaAllocatedStock = (val) => {
    // setLoading(true);
    const req = new AllocationApprovalReq();
    req.sampleRequestId = val;
    if(props?.screen === 'Issued'){
      req.action = 'Issued'
    }else{
      req.action = 'Approval'
    }
    service
      .approvaAllocatedStock(req)
      .then((res) => {
        if (res.status) {
          notification.success({ message: res.internalMessage });
        } else {
          notification.error({ message: res.internalMessage });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function onReset() {
    form.resetFields();
    setFabricStockData([]);
  }

  const renderCellData = (data) => {
    return data ? data : "-";
  };

  const fabColumns: ColumnProps<any>[] = [
    {
      title: "S No",
      key: "sno",
      width: "70px",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: "Request No",
      dataIndex: "requestNo",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    // {
    //   title: <div style={{ textAlign: "center" }}>Brand Name</div>,
    //   dataIndex: "sm",
    //   key: "sm",
    //   align: "center",
    //   render :(sm,text) => {
    //     renderCellData(text);
    //     return (
    //         <Table
    //         dataSource={sm}
    //         columns={[
    //             {
    //                 dataIndex: "brandName",
    //                 key: "brandName",
    //                 align: "center",
    //               },
    //         ]}
    //         pagination={false}
    //         />
    //     )
    //   }
    // },
    {
      title: "Brand Name",
      dataIndex: "brandName",
    },
    {
      title: "Style",
      dataIndex: "style",
    },
    {
      title: "Colour",
      dataIndex: "colour",
    },
    {
      title: "Item Code",
      dataIndex: "itemCode",
    },
    {
      title: "Consumption",
      dataIndex: "consumption",
    },
    {
      title: "BOM",
      dataIndex: "BOM",
    },
    // {
    //   title: "Action",
    //   render: (value, record) => {
    //     return (
    //       <>
    //         <Button
    //           disabled={loading}
    //           onClick={(e) =>
    //             approvaAllocatedStock(record.sampleRequestFabricId)
    //           }
    //         >
    //           {loading ? (
    //             <Spin size="small" style={{ marginRight: "8px" }} />
    //           ) : (
    //             <>Approve </>
    //           )}
    //         </Button>
    //       </>
    //     );
    //   },
    // },
  ];

  const trimColumns: ColumnProps<any>[] = [
    {
      title: "S No",
      key: "sno",
      width: "70px",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: "Request No",
      dataIndex: "requestNo",
    },
    {
      title: "Brand",
      dataIndex: "brandName",
    },
    {
      title: "Style",
      dataIndex: "style",
    },

    {
      title: "Consumption",
      dataIndex: "consumption",
    },
    {
      title: "Action",
      render: (value, record) => {
        return (
          <>
            <Button
              disabled={loading}
              onClick={(e) => approvaAllocatedStock(record.sampleReqTrimId)}
            >
              {loading ? (
                <Spin size="small" style={{ marginRight: "8px" }} />
              ) : (
                <>Approve </>
              )}
            </Button>
          </>
        );
      },
    },
  ];

  const childColumns: ColumnProps<any>[] = [
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Item Type",
      dataIndex: "itemType",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Allocated Quantity",
      dataIndex: "allocatedQty",
    },
  ];

  const expandFabricTabel = (record) => {
    return (
      <Table
        rowKey={(record) => record.sampleFabricId}
        columns={childColumns}
        dataSource={childData[record.sampleRequestFabricId]}
      ></Table>
    );
  };

  const expandTrimTabel = (record) => {
    return (
      <Table
        rowKey={(record) => record.sampleTrimInfoId}
        columns={childColumns}
        dataSource={childData[record.sampleReqTrimId]}
      ></Table>
    );
  };

  return (
    <>
      <Card title= {props?.screen === "Issued" ? (
                          <>Material Issues </>
                        ) : (
                          <>Allocation Approval</>
                        )}>
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item
                name="requestNo"
                label="Request No"
                rules={[
                  { required: true, message: "Please input your Request No!" },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Select Request Number"
                >
                  {requestNo.map((e) => {
                    return (
                      <Option key={e.SampleRequestId} value={e.SampleRequestId}>
                        {e.requestNo}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Button
                onClick={getAllocatedBomData}
                style={{ marginTop: "23px" }}
                type="primary"
              >
                Get
              </Button>
            </Col>
            <Col span={2}>
              <Button style={{ marginTop: "23px" }} onClick={onReset}>
                Reset
              </Button>
            </Col>
          </Row>
          {fabricStockData.length > 0 ? (
            <>
              <Row gutter={24} justify={"end"}>
                <Col>
                  <Button
                  type="primary"
                    disabled={loading}
                    onClick={(e) =>
                      approvaAllocatedStock(
                        fabricStockData[0]?.sampleRequestFabricId
                      )
                    }
                  >
                    {loading ? (
                      <Spin size="small" style={{ marginRight: "8px" }} />
                    ) : (
                      <>
                        {props?.screen === "Issued" ? (
                          <>Issued </>
                        ) : (
                          <> Approve</>
                        )}
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
        </Form>
        <br></br>
        {/* <Tabs defaultActiveKey="1">
          <TabPane tab="Fabric Details" key="1"> */}
        <Table
          rowKey={(record) => record.sampleFabricId}
          columns={fabColumns}
          dataSource={fabricStockData}
          expandable={{
            expandedRowRender: (record) => expandFabricTabel(record),
            onExpand(expanded, record) {
              allocatedLocationInfo(record.sampleRequestFabricId);
            },
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          //   className="custom-table-wrapper"
        />
        {/* </TabPane> */}
        {/* <TabPane tab="Trim Details" key="2">
            <Table
              rowKey={(record) => record.sampleTrimInfoId}
              columns={trimColumns}
              dataSource={trimStockData}
              expandable={{
                expandedRowRender: (record) => expandTrimTabel(record),
                onExpand(expanded, record) {
                  allocatedLocationInfo(record.sampleReqTrimId);
                },
                rowExpandable: (record) => record.name !== "Not Expandable",
              }}
            />
          </TabPane> */}
        {/* </Tabs> */}
      </Card>
    </>
  );
};
export default AllocatedStockApproval;
