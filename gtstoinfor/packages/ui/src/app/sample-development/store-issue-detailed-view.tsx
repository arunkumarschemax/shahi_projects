import {
  MaterialFabricDto,
  MaterialIssueDto,
  MaterialTrimDto,
} from "@project-management-system/shared-models";
import {
  ColourService,
  MaterialIssueService,
  SampleDevelopmentService,
  UomService,
} from "@project-management-system/shared-services";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Select,
  Table,
  Tabs,
} from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";
import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertMessages from "../common/common-functions/alert-messages";

export const StoreIssueDetailed = () => {
  const navigate = useNavigate();
  const service = new SampleDevelopmentService();
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [id, setId] = useState<any[]>([]);
  const location = useLocation();
  const rowData = location.state.data;
  const materialIssue = new MaterialIssueService();
  const [createData, setCreateData] = useState<any[]>([]);
  const [fabricData, setFabricData] = useState<any[]>([]);
  const [trimData, setTrimData] = useState<any[]>([]);
  const colorService = new ColourService();
  const [colorData, setColorData] = useState<any[]>([]);
  const [formRef] = Form.useForm();
  const [uomData, setUomData] = useState<any[]>([])
  const uomService = new UomService()
  const {Option}  =Select
  const [form] = Form.useForm()
  const [selectedUom, setSelectedUom] = useState(null);




  useEffect(() => {
    getData();
    getUom()
  }, []); 
  
  const getUom = () => {
    uomService.getAllActiveUoms().then(res => {
      setUomData(res.data)
    })
}

  const customIssueDate = new Date("2023-11-07T07:23:49.140Z");

  const formattedIssueDate = customIssueDate.toISOString().split("T")[0];

  const saveData = () => {
    const req = new MaterialIssueDto(rowData?.[0]?.requestNo,formattedIssueDate,rowData?.[0]?.location_id,rowData?.[0]?.profit_control_head_id,rowData?.[0]?.buyer_id,rowData?.[0]?.sample_type_id,rowData?.[0]?.sample_sub_type_id,rowData?.[0]?.style_id,rowData?.[0]?.s_style,rowData?.[0]?.brand_id,rowData?.[0]?.dmm_id,rowData?.[0]?.technician_id,rowData?.[0]?.description,rowData?.[0]?.costRef,rowData?.[0]?.m3StyleNo,rowData?.[0]?.contact,rowData?.[0]?.extension,rowData?.[0]?.samValue,rowData?.[0]?.product,rowData?.[0]?.type,rowData?.[0]?.conversion,rowData?.[0]?.madeIn,rowData?.[0]?.remarks,fabricData,trimData,0,"","",undefined,"");
    if (fabricData.length > 0) {
    materialIssue.createMaterialIssue(req).then((res) => {
      if (res.status) {
        AlertMessages.getSuccessMessage(res.internalMessage);
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    });
  }else{
    AlertMessages.getErrorMessage('Please Issue the Quantity')
  }
  };

  const getData = () => {
    service.getAllSampleDevData().then((res) => {
      setData(res.data);
    });

    colorService.getAllColour().then((res) => {
      if (res.status) {
        setColorData(res.data);
      }
    });
  };

  const trimDataInfo = (e,index,rowData) =>{
    if(e.target.value != ''){
      const iniIndex = trimData.findIndex(e => e.fabricCode === rowData.fabric_code)
      if(iniIndex != -1){
        trimData[index].issuedQuantity = e.target.value
      }else{
        const req = new MaterialTrimDto(rowData.trimCode,rowData.trim_description,rowData.trim_consumption,rowData.uomId,e.target.value,form.getFieldValue('issuedUomId'),rowData.tri_remarks,undefined,'','','',0,0)
        setTrimData([...trimData,req])
      }

  }
}
  const fabricDataInfo = (e,index,rowData) =>{
    console.log(selectedUom,'====')
    if(e.target.value != ''){
      const iniIndex = fabricData.findIndex(e => e.fabricCode === rowData.fabric_code)
      if(iniIndex != -1){
        fabricData[index].issuedQuantity = e.target.value
      } else{
        const req = new MaterialFabricDto(rowData.fabric_code,rowData.fabric_description,rowData.colour_id,rowData.fabric_consumption,rowData.uomId,e.target.value,selectedUom,rowData.fab_remarks,undefined,'','','',0)
        setFabricData([...fabricData,req])
        console.log(req,'_______________________')
      }
    }
  }

  const onUpdate = () => {
    //  navigate('/sample-development/sample-requests', { state: { id: data[0]?.settingsId } })
    navigate("/sample-development/sample-requests");
  };

  const issuedInfo = (e, index, record) => {
    setCreateData(e.target.value);
  };

  const handleUomChange = (value, index, record) => {
    console.log(value,'+)+)_')
    setSelectedUom(value)
  };
  

  const columnsSkelton = [
    {
      title: "S.No",
      dataIndex: "sNo",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Fabric Code",
      dataIndex: "fabric_code",
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "fabric_description",
    },
    {
      title: "color",
      dataIndex: "colour_id",
      render: (data) => {
        const colMethod = colorData.find((res) => res.colourId === data);

        return colMethod ? colMethod.colour : "-";
      },
    },
    {
      title: "Consumption",
      dataIndex: "fabric_consumption",
    },
    {
      title: "Issued Quantity",
      dataIndex: "issuingQuantity",
      render: (text, row, index) => {
        return (
          <>
          {/* <Form.Item name={"issuingQuantity" + index}> */}
            <Input
              key={row.materialFabricId}
              placeholder="Issued Quantity"
              onChange={e=> fabricDataInfo(e,index,row)}
              // value={formData.issuedQuantity}
            />
            {/* </Form.Item> */}
          </>
        );
      },
    },
    {
      title: 'Uom',
      dataIndex: 'issuedUomId',
      render: (text,record,index) => (
        <Form.Item name={`issuedUomId_${index}`}>
        <Select
          onChange={(val) => handleUomChange(val, index, record)}
          allowClear
          style={{ width: "100%" }}
          showSearch
          optionFilterProp="children"
          placeholder="Select UOM"
        >
          {uomData?.map((e) => (
            <Option key={e.uomId} value={e.uomId}>
              {e.uom}
            </Option>
          ))}
        </Select>
      </Form.Item>
      
        ),
    },
    {
      title: "Remarks",
      dataIndex: "fab_remarks",
    },
  ];

  const columns = [
    {
      title: "S.No",
      dataIndex: "sNo",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Description",
      dataIndex: "trim_description",
    },
    {
      title: "Consumption",
      dataIndex: "trim_consumption",
    },
    {
      title: "Issued Quantity",
      dataIndex: "issuingQuantity",
      render: (text, row, index) => {
        return (
          <>
          {/* <Form.Item name={"issuingQuantity" + index}> */}
            <Input
              key={row.materialTrimId}
              placeholder="Issued Quantity"
              onChange={e=> trimDataInfo(e,index,row)}
              // value={formData.issuedQuantity}
            />
            {/* </Form.Item> */}
          </>
        );
      },
    },
    {
      title: 'Uom',
      dataIndex: 'issuedUomId',
      render: (text,record,index) => (
          <Form.Item name={"issuedUomId" + index}>
          <Select
          // value={reportedUom}
          // onChange={(val) => reportedUomId(val, index, record)}
          allowClear
          style={{ width: "100%" }}
          showSearch
          optionFilterProp="children"
          placeholder="Select UOM"
      >
          {uomData?.map((e) => {
              return (
                  <Option key={e.uomId} value={e.uomId}>
                      {e.uom}
                  </Option>
              );
          })}
      </Select>
      </Form.Item>
      ),
    },
    {
      title: "Remarks",
      dataIndex: "tri_remarks",
    },
  ];

  return (
    <Card
      title="Material Issue"
      className="card-header"
      extra={
        <Button onClick={onUpdate} type={"primary"}>
          View
        </Button>
      }
    >
      <Descriptions size="small">
        <DescriptionsItem label="Location">{rowData?.[0]?.locationName}</DescriptionsItem>
        <DescriptionsItem label="PCH">{rowData?.[0]?.pch}</DescriptionsItem>
        <DescriptionsItem label="User">{rowData?.[0]?.user}</DescriptionsItem>
        <DescriptionsItem label="Buyer">{rowData?.[0]?.buyerName}</DescriptionsItem>
        <DescriptionsItem label="Sample Type">{rowData?.[0]?.sampleType}</DescriptionsItem>
        <DescriptionsItem label="Sample Sub Type">{rowData?.[0]?.sampleSubType}</DescriptionsItem>
        <DescriptionsItem label="Style">{rowData?.[0]?.style}</DescriptionsItem>
        <DescriptionsItem label="Description">{rowData?.[0]?.description}</DescriptionsItem>
        <DescriptionsItem label="Brand">{rowData?.[0]?.brandName}</DescriptionsItem>
        <DescriptionsItem label="Cost Ref">{rowData?.[0]?.costRef}</DescriptionsItem>
        <DescriptionsItem label="M3 Style No">{rowData?.[0]?.m3StyleNo}</DescriptionsItem>
        <DescriptionsItem label="Contact No">{rowData?.[0]?.contact}</DescriptionsItem>
        <DescriptionsItem label="Extn">{rowData?.[0]?.extension}</DescriptionsItem>
        <DescriptionsItem label="SAM">{rowData?.[0]?.samValue}</DescriptionsItem>
        <DescriptionsItem label="DMM">{rowData?.[0]?.dmmName}</DescriptionsItem>
        <DescriptionsItem label="Technician">{rowData?.[0]?.techName}</DescriptionsItem>
        <DescriptionsItem label="Product">{rowData?.[0]?.product}</DescriptionsItem>
        <DescriptionsItem label="Type">{rowData?.[0]?.type}</DescriptionsItem>
        <DescriptionsItem label="Conversion">{rowData?.[0]?.conversion}</DescriptionsItem>
        <DescriptionsItem label="Made In">{rowData?.[0]?.madeIn}</DescriptionsItem>
        <DescriptionsItem label="Remarks">{rowData?.[0]?.remarks}</DescriptionsItem>
      </Descriptions>

      <Tabs type={"card"} tabPosition={"top"}>
        <TabPane
          key="1"
          tab={
            <span style={{ fontSize: "15px" }}>
              <b>{`Fabric`}</b>
            </span>
          }
        >
          <Form form={formRef}>
            <Table
              size="small"
              columns={columnsSkelton}
              dataSource={rowData[0]?.fabric}
              scroll={{ x: true }}
              bordered
              pagination={false}
            />
          </Form>
        </TabPane>
        <TabPane
          key="2"
          tab={
            <span style={{ fontSize: "15px" }}>
              <b>{`Trims`}</b>
            </span>
          }
        >
          <Form form={formRef}>
          <Table
            size="small"
            columns={columns}
            dataSource={rowData[0]?.trimData}
            scroll={{ x: true }}
            bordered
            pagination={false}
          />
          </Form>
        </TabPane>
      </Tabs>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" onClick={saveData}>
            Submit
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default StoreIssueDetailed;
