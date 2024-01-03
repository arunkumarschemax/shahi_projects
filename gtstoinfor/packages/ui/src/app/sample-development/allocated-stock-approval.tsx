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
  BuyerRefNoRequest,
  ItemTypeEnumDisplay,
  RequestNoReq,
} from "@project-management-system/shared-models";
import { useIAMClientState } from "../common/iam-client-react";

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
  const { IAMClientAuthContext, dispatch } = useIAMClientState();
  const [showTabe, setShowTabe] = useState(false);



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


  const allocatedLocationInfo = (value,type) => {
    const req = new AllocatedLocationReq();
    req.sampleRequestItemId = value;
    if(props?.screen === 'Issued'){
      req.action = 'Issued'
    }else{
      req.action = 'Approval'
    }
    req.type = type
    service.allocatedLocationInfo(req).then((res) => {
      if (res.status) {
        // setChildData(res.data)
        setChildData((prev) => {
          return { ...prev, [value]: res.data };
        });
      }
    });
  };

  const getAllocatedBomData = () => {
    form.validateFields().then(()=>{
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
            setShowTabe(true)
            // setTrimStockData(res.data.trimInfo);
            AlertMessages.getSuccessMessage(res.internalMessage);
          } else {
            setFabricStockData([]);
            setShowTabe(false)
            // setTrimStockData([]);
            AlertMessages.getErrorMessage(res.internalMessage);
          }
        });

    })
  };

  const getAllRequestNo = () => {
    setRequestNo([])
    const req = new BuyerRefNoRequest()
    req.buyerRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
    service.getAllAllocatedRequestNo(req).then((res) => {
      if (res.status) {
        setRequestNo(res.data);
      }
    });
  };

  const getAllApprovedRequestNo = () =>{
    setRequestNo([])
    const req = new BuyerRefNoRequest()
    req.buyerRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
    service.getAllApprovedRequestNo(req).then((res)=>{
      if (res.status) {
        setRequestNo(res.data);
      }
    })
  }

  const approvaAllocatedStock = (val) => {
    setLoading(true);
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
          window.location.reload()
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
      render:(value,record) => {
        return(<>{value ? value : 'NA'}</>)
      }
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
      title: "Qunatity",
      dataIndex: "BOM",
      render:(value,record) => {
        return(<>{value > 0 ? value : 0}</>)
      }
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
      render: (text) => {
        const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
        return EnumObj ? EnumObj.displayVal : text;
      },
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
    console.log(record)
    return (
      <Table
        rowKey={(rec) => rec.materialAllocationId}
        columns={childColumns}
        dataSource={record.type == 'Fabric' ? childData[record.sampleFabricId] : childData[record.sampleTrimInfoId]}
      ></Table>
    );
  };

  const expandTrimTabel = (record) => {
    return (
      <Table
        // rowKey={(record) => record.sampleTrimInfoId}
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
                  {requestNo?.map((e) => {
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
          {fabricStockData?.length > 0 ? (
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
                          <>Issue Material </>
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
        {showTabe ? <><Table
          rowKey={(record) => record.itemCode}
          columns={fabColumns}
          dataSource={fabricStockData}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          expandable={{
            expandedRowRender: (record) => expandFabricTabel(record),
            onExpand(expanded, record) {
              if(record.type == 'Fabric'){
                console.log(record)
                allocatedLocationInfo(record.sampleFabricId,record.type);
              }else{
                allocatedLocationInfo(record.sampleTrimInfoId,record.type);
              }
            },
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          //   className="custom-table-wrapper"
        /></>:<></>
        }
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
