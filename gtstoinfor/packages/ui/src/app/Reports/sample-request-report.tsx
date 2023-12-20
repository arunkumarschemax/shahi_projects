import { UndoOutlined } from "@ant-design/icons";
import { ItemTypeEnumDisplay, SampleRequestFilter, SamplerawmaterialStausReq } from "@project-management-system/shared-models";
import { BuyersService, SampleDevelopmentService, StyleService } from "@project-management-system/shared-services";
import { Button, Card, Checkbox, Col, Form, Row, Select, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AlertMessages from "../common/common-functions/alert-messages";
import { useIAMClientState } from "../common/iam-client-react";

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
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [selectItemIds, setSelectItemIds] = useState([]);

  const [btnEnable,setbtnEnable]=useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState({});
  const [type, setType] = useState({});
  const { IAMClientAuthContext, dispatch } = useIAMClientState();
  const [samplingPO] = Form.useForm()
  const [isBuyer, setIsBuyer] = useState(false);


  const {Option} = Select
  useEffect(() => {
    const userrefNo = IAMClientAuthContext.user?.externalRefNo
  if(userrefNo){
    setIsBuyer(true)
    // form.setFieldsValue()
  }
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
    req.extRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
    
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

  // const ItemColumns: any = [
  //   {
  //     title: "Material Type",
  //     dataIndex: "fabricType",
  //     key: "fabricType",
  //     align: "center",
  //   },
  //   {
  //     title: "Item Name",
  //     dataIndex: "itemCode",
  //     key: "itemCode",
  //     align: "center",
  //   },
  //   {
  //     title: "Quantity",
  //     dataIndex: "quantity",
  //     key: "quantity",
  //     align: "center",
  //   },
  //   {
  //     title: <div style={{ textAlign: "center" }}>{btnEnable ?<Button  type="primary" onClick={() =>generatePo()} >Generate Po</Button>:'Genereate PO'}</div>,
  //     dataIndex: "sm",
  //     key: "sm",
  //     align: "center",
  //     render: (text, rowData, index) => { 
  //       return(
  //         <Checkbox  name={rowData.samplingBomId}
  //         onChange={(e) => onCheck(e, rowData.sampleRequestid, rowData.fabricType, text, rowData)}
         
  //       />
  //       )
  //     }
  //   }
  // ]
  const Columns: any = [
    {
      title: "Request No",
      dataIndex: "sampleReqNo",
      sorter: (a, b) => a.sampleReqNo.localeCompare(b.sampleReqNo),
      sortDirections: ['descend', 'ascend'],
    },
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
      title: "Style",
      dataIndex: "stylename",
      sorter: (a, b) => a.stylename.localeCompare(b.stylename),
      sortDirections: ['descend', 'ascend'],
    },

    
   
    {
      title: <div style={{ textAlign: "center" }}>Material Type</div>,
      dataIndex: "sm",
      key: "sm",
      align: "center",
      render: (sm, text) => {
        renderCellData(text);
        return (
          <Table
            dataSource={sm}
            columns={[{
              dataIndex: "fabricType",
              key: "fabricType",
              align: "center",
              render: (text) => {
                const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
                return EnumObj ? EnumObj.displayVal : text;
              },
            }]}
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
                dataIndex: "bomQuantity",
                key: "bomQuantity",
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
                render: (text, rowData, index) => { 
                  return(
                    <Form form={samplingPO} layout="vertical">
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                        <Form.Item name={rowData.samplingBomId} >
                            <Checkbox  name={rowData.samplingBomId} onChange={(e) => onCheck(e, rowData.sampleRequestid, rowData.fabricType, text, rowData)}/>
                        </Form.Item>
                      </Col>
                    </Form>
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
    // navigate("/purchase-order", { state: { data: selectedItems, type:'Sampling'  } });
  }
  
  const dataa=[];

  const onCheck = (e, sampleRequestid, fabricType, value, rowData) => {
    console.log(e.target.checked);
    console.log(sampleRequestid);
    console.log(fabricType);
    console.log(rowData);

    console.log(selectedRowData);
    console.log(selectedRowData.find((rec) => rec.fabricType != fabricType));

    if(e.target.checked){
      
      let checkItemType:boolean = true;
      checkItemType = (selectedRowData.find((rec) => rec.fabricType != fabricType) != undefined) ? false: true;
      console.log(checkItemType)
      if(!checkItemType){
        samplingPO.setFieldValue([rowData.samplingBomId],"false")
        AlertMessages.getErrorMessage('Generate PO for single Material Type. ')
        setbtnEnable(false)
      }
      else{
        let rowsData = [...selectedRowData,rowData];
        setSelectedRowData(rowsData)
        setbtnEnable(true)
      }
      console.log(data)
    }
    else{
      console.log(rowData)
      console.log(selectedRowData)
      let itemsArray = [...selectedRowData];
      console.log(itemsArray.findIndex((e) => e.samplingBomId === rowData.samplingBomId));
      let index = itemsArray.findIndex((e) => e.samplingBomId === rowData.samplingBomId);
      itemsArray.splice(index, 1);
      let newArray = [...itemsArray]
      setSelectedRowData(newArray);
      console.log(selectedRowData)
      samplingPO.setFieldValue([rowData.samplingBomId],"false")
      console.log(selectedRowData.length)
      selectedRowData.length - Number(1) > 0 ? setbtnEnable(true) : setbtnEnable(false)
    }
    
    const checkboxValue = e.target.checked;
    console.log(rowData)


    setType(fabricType)
    const updatedIndentIds = selectedIndentIds.includes(sampleRequestid)
      ? selectedIndentIds.filter(id => id !== sampleRequestid)
      : [...selectedIndentIds, sampleRequestid];
    setSelectedIndentIds(updatedIndentIds);
    console.log(selectedIndentIds)
    // setbtnEnable(true)

    const updated1 = selectItemIds.push(rowData.m3ItemId)
  ? selectItemIds
  : [...selectItemIds, rowData.m3ItemId];
  // console.log(updated1);
    setSelectItemIds(updated1);

    
    const resultArray = [{materialType:fabricType}, { sampleReqIds: updatedIndentIds },{m3itemid:updated1}, {buyerId: rowData.buyerId}];
    console.log(resultArray)
    setSelectedItems(resultArray)

  };

  
  return (
    <div>
      <Card
        title={<span>Sample Material Status</span>}
        // style={{ textAlign: "center" }}
        headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
      >
        <Form form={form} layout="vertical" >
          <Row gutter={24}>
            <Col xs={24} sm={12} md={9} lg={9} xl={5}>
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
            {!isBuyer?<>
              <Col xs={24} sm={12} md={9} lg={9} xl={5}>
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
            </>:<></>}
            
            <Col xs={24} sm={12} md={9} lg={9} xl={5}>
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
                  style={{ background: "green", width: "100%",marginTop:20,marginLeft:20 }}
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
                  style={{ width: "100%" ,marginTop:20, marginLeft:20 }}
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
