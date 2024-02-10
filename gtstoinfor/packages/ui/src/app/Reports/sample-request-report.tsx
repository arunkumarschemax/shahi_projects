import { UndoOutlined } from "@ant-design/icons";
import { ItemTypeEnumDisplay, MenusAndScopesEnum,  SamplerawmaterialStausReq } from "@project-management-system/shared-models";
import { BuyersService, SampleDevelopmentService, StyleService } from "@project-management-system/shared-services";
import { Button, Card, Checkbox, Col, Form, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import AlertMessages from "../common/common-functions/alert-messages";
import { useIAMClientState } from "../common/iam-client-react";
import { RolePermission } from "../role-permissions";

const SampleRequestReport = () => {
  const [page, setPage] = useState(1)
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
  const [checked, setChecked] = useState<boolean>(false)


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

  const checkAccess = (buttonParam) => {  
    const accessValue = RolePermission(null,MenusAndScopesEnum.Menus["Sample Development"],MenusAndScopesEnum.SubMenus["Sample Material Status"],buttonParam)
    //  console.log(buttonParam,accessValue,'access');
    
    return accessValue
}
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
    if(checkAccess(MenusAndScopesEnum.Scopes.trimTab)){
      req.tab = "TRIM"
    }
    if(checkAccess(MenusAndScopesEnum.Scopes.fabricTab)){
      req.tab = "FABRIC"
        }
        if(checkAccess(MenusAndScopesEnum.Scopes.fabricTab) && checkAccess(MenusAndScopesEnum.Scopes.trimTab)){
          req.tab = undefined
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
  const Columns:any  = [
    // { title: 'S.no', render: (text: any, object: any, index: any) => (page - 1) * 10 + (index + 1), },

    // {
    //   title: "Request No",
    //   dataIndex: "sampleReqNo",
    //   sorter: (a, b) => a.sampleReqNo.localeCompare(b.sampleReqNo),
    //   sortDirections: ['descend', 'ascend'],
    // },
    {
      title: 'Sample Request No',
      dataIndex: 'sampleReqNo',
      key: 'sampleReqNo',
      render: (text, record, index) => {
        if (index === 0 || record.sampleReqNo !== data[index - 1].sampleReqNo) {
          const rowSpan = data.filter(item => item.sampleReqNo === record.sampleReqNo).length;
          return {
            children: record.sampleReqNo,
            props: {
              rowSpan: rowSpan,
            },
          };
        } else {
          return {
            children: null,
            props: {
              rowSpan: 0,
            },
          };
        }
      },
   
    },
    {
      title: 'Buyer',
      dataIndex: 'buyername',
      key: 'buyername',
      render: (text, record, index) => {
        if (index === 0 || record.sampleReqNo !== data[index - 1].sampleReqNo) {
          const rowSpan = data.filter(item => item.sampleReqNo === record.sampleReqNo).length;
          return {
            children: record.buyername,
            props: {
              rowSpan: rowSpan,
            },
          };
        } else {
          return {
            children: null,
            props: {
              rowSpan: 0,
            },
          };
        }
      },
   
    },
    {
      title: 'Brand',
      dataIndex: 'brandName',
      key: 'brandName',
      render: (text, record, index) => {
        if (index === 0 || record.sampleReqNo !== data[index - 1].sampleReqNo) {
          const rowSpan = data.filter(item => item.sampleReqNo === record.sampleReqNo).length;
          return {
            children: record.brandName,
            props: {
              rowSpan: rowSpan,
            },
          };
        } else {
          return {
            children: null,
            props: {
              rowSpan: 0,
            },
          };
        }
      },
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (text, record, index) => {
        if (index === 0 || record.sampleReqNo !== data[index - 1].sampleReqNo) {
          const rowSpan = data.filter(item => item.sampleReqNo === record.sampleReqNo).length;
          return {
            children: record.location,
            props: {
              rowSpan: rowSpan,
            },
          };
        } else {
          return {
            children: null,
            props: {
              rowSpan: 0,
            },
          };
        }
      },
    },
    {
      title: 'Style',
      dataIndex: 'styleName',
      key: 'styleName',
      render: (text, record, index) => {
        if (index === 0 || record.sampleReqNo !== data[index - 1].sampleReqNo) {
          const rowSpan = data.filter(item => item.sampleReqNo === record.sampleReqNo).length;
          return {
            children: record.styleName,
            props: {
              rowSpan: rowSpan,
            },
          };
        } else {
          return {
            children: null,
            props: {
              rowSpan: 0,
            },
          };
        }
      },
   
    },
    {
      title: "Material Type",
      dataIndex: "itemType",
      // sorter: (a, b) => a.itemType.localeCompare(b.itemType),
      // sortDirections: ['descend', 'ascend'],
      render: (text) => {
        const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
        return EnumObj ? EnumObj.displayVal : text;
      },
    },
    {
      title: "Item",
      dataIndex: "itemCode",
      // sorter: (a, b) => a.itemCode.localeCompare(b.itemCode),
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Color",
      dataIndex: "colourName",
      // sorter: (a, b) => a.colourName.localeCompare(b.colourName),
      // sortDirections: ['descend', 'ascend'],
    },  
    {
      title: "Fabric Color",
      dataIndex: "fabColor",
      // sorter: (a, b) => a.colourName.localeCompare(b.colourName),
      // sortDirections: ['descend', 'ascend'],
    },  
    {
      title: "Required Qty",
      dataIndex: "bomQuantity",
      // sorter: (a, b) => a.bomQuantity.localeCompare(b.bomQuantity),
      // sortDirections: ['descend', 'ascend'],
    },
    
    // {
    //   title: "Style",
    //   dataIndex: "stylename",
    //   sorter: (a, b) => a.stylename.localeCompare(b.stylename),
    //   sortDirections: ['descend', 'ascend'],
    // },

    
   
    // {
    //   title: <div style={{ textAlign: "center" }}>Material Type</div>,
    //   dataIndex: "sm",
    //   key: "sm",
    //   align: "center",
    //   render: (sm, text) => {
    //     renderCellData(text);
    //     return (
    //       <Table
    //         dataSource={sm}
    //         columns={[{
    //           dataIndex: "fabricType",
    //           key: "fabricType",
    //           align: "center",
    //           render: (text) => {
    //             const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
    //             return EnumObj ? EnumObj.displayVal : text;
    //           },
    //         }]}
    //         pagination={false}
    //       />
    //     );
    //   },
    // },
 
    // {
    //   title: <div style={{ textAlign: "center" }}>Item</div>,
    //   dataIndex: "sm",
    //   key: "sm",
    //   align: "center",
    //   render: (sm, text) => {
    //     renderCellData(text);
    //     return (
    //       <Table
    //         dataSource={sm}
    //         columns={[
    //           {
    //             dataIndex: "itemCode",
    //             key: "itemCode",
    //             align: "center",
    //           },
    //         ]}
    //         pagination={false}
    //       />
    //     );
    //   },
    // },
    // {
    //   title: <div style={{ textAlign: "center" }}>Required Qty</div>,
    //   dataIndex: "sm",
    //   key: "sm",
    //   align: "center",
    //   render: (sm) => {
    //     return (
    //       <Table
    //         dataSource={sm}
    //         columns={[
    //           {
    //             dataIndex: "bomQuantity",
    //             key: "bomQuantity",
    //             align: "center",
    //           },
    //         ]}
    //         pagination={false}
    //       />
    //     );
    //   },
    // },
    {
      title: <div style={{ textAlign: "center" }}>{btnEnable  && checkAccess(MenusAndScopesEnum.Scopes.createPo)?<Button  type="primary" onClick={() =>generatePo()} >Generate Po</Button>:'Genereate PO'}</div>,
      dataIndex: "checkStatus",
      key: "checkStatus",
      align: "left",
      render: (text, record, index) => {
        return (

          <Form form={samplingPO} layout="vertical">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
              <Form.Item name={`checkStatus${index}`}  >
              {checkAccess(MenusAndScopesEnum.Scopes.createPo)? <Checkbox name={`checkStatus${index}`} onClick={checkboxonclick} onChange={(e) => onCheck(e, record.sampleRequestid, record.fabricType, text, record, index)}/>:'-'}
              </Form.Item>
            </Col>
          </Form>
                 
        );
      },
    },
  ];

  const checkboxonclick =() =>{
    setChecked(true)
  }

  const generatePo =()=>{
    navigate("/purchase-order", { state: { data: selectedItems, type:'Sampling'  } });
  }
  
  const dataa=[];

  const onCheck = (e, sampleRequestid, fabricType, value, rowData, index) => {
    // console.log(e.target.checked);
    // console.log(sampleRequestid);
    // console.log(fabricType);
    // console.log(rowData);

    // console.log(selectedRowData);

    if(e.target.checked){
      
      // let checkItemType:boolean = true;
      // checkItemType = (selectedRowData.length > 0 ? ((selectedRowData.find((rec) => rec.itemType === rowData.itemType) != undefined) ? true: false) :true);
      // console.log(checkItemType)
      // if(!checkItemType){
      //   samplingPO.setFieldsValue({[`checkStatus${index}`]:false})
      //   AlertMessages.getErrorMessage('Generate PO for single Material Type. ')
      //   setbtnEnable(false)
      // }
      // else{
        let rowsData = [...selectedRowData,rowData];
        setSelectedRowData(rowsData)
        setbtnEnable(true)
      // }
      // console.log(data)
    }
    else{
      // console.log(rowData)
      // console.log(selectedRowData)
      let itemsArray = [...selectedRowData];
      let index = itemsArray.findIndex((e) => e.samplingBomId === rowData.samplingBomId);
      itemsArray.splice(index, 1);
      // console.log(itemsArray)
      // let newArray = [...itemsArray]
      setSelectedRowData(itemsArray);
      // console.log(selectedRowData)
      samplingPO.setFieldsValue({[`checkStatus${index}`]:false})
      // console.log(selectedRowData.length)
      selectedRowData.length - Number(1) > 0 ? setbtnEnable(true) : setbtnEnable(false)
    }
    
    const checkboxValue = e.target.checked;
    // console.log(rowData)


    setType(fabricType)
    const updatedIndentIds = selectedIndentIds.push(sampleRequestid)
    ? selectedIndentIds
    : [...selectedIndentIds, sampleRequestid];
    setSelectedIndentIds(updatedIndentIds);
    // console.log(selectedIndentIds)
    // setbtnEnable(true)

    const updated1 = selectItemIds.push(rowData.sampleItemId)
  ? selectItemIds
  : [...selectItemIds, rowData.sampleItemId];
  // console.log(updated1);
    setSelectItemIds(updated1);

    // console.log(selectedRowData)
    let type
    if(e.target.checked){
      type = selectedRowData[0]?.itemType === undefined ? rowData.itemType:selectedRowData[0]?.itemType;
    }
    else{
      type = selectedRowData.length - Number(1) > 0 ? (selectedRowData[0]?.itemType === undefined ? rowData.itemType:selectedRowData[0]?.itemType) : undefined;
    }
    
    const resultArray = [{materialType:type}, { sampleReqIds: updatedIndentIds },{m3itemid:updated1}, {buyerId: rowData.buyerId}];
    // console.log(resultArray)
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
                  {data.filter( (ele, ind) => ind === data.findIndex( elem => elem.sampleRequestid === ele.sampleRequestid)).map((e) => {
                    return (
                      <Option
                        key={e.sampleRequestid}
                        value={e.sampleRequestid}
                        name={e.sampleReqNo}
                      >
                        {" "}
                        {e.sampleReqNo}
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
                  {data.filter( (ele, ind) => ind === data.findIndex( elem => elem.buyerId === ele.buyerId)).map((qc: any) => (
                    <Select.Option key={qc.buyername} value={qc.buyerId}>
                      {qc.buyername}
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
                  {data.filter( (ele, ind) => ind === data.findIndex( elem => elem.styleId === ele.styleId)).map((qc: any) => (
                    <Select.Option key={qc.styleId} value={qc.styleId}>
                      {qc.styleName}
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
          pagination={false}
          columns={Columns}
          dataSource={data}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default SampleRequestReport;
