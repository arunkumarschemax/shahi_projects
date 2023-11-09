import { MaterialFabricDto, MaterialIssueDto, MaterialTrimDto, SettingsIdReq, SettingsModel } from "@project-management-system/shared-models"
import { ColourService, MaterialIssueService, SampleDevelopmentService, SettingsService } from "@project-management-system/shared-services"
import { Button, Card, Col, Descriptions, Input, Row, Table, Tabs, Tooltip } from "antd"
import DescriptionsItem from "antd/es/descriptions/Item"
import TabPane from "antd/es/tabs/TabPane"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import FabricsForm from "./fabrics"
import TrimsForm from "./trims"
import { DeleteOutlined } from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea"
import React from "react"
import AlertMessages from "../common/common-functions/alert-messages"
import { format } from "path"

export const StoreIssueDetailed = () => {

  const navigate = useNavigate()
  const service = new SampleDevelopmentService()
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = React.useState(1);
  const [id, setId] = useState<any[]>([])
  const location = useLocation();
  const rowData = location.state.data
    const materialIssue = new MaterialIssueService()
    const [createData, setCreateData] = useState<any[]>([])
    const [fabricData, setFabricData] = useState<any[]>([])
    const [trimData, setTrimData] = useState<any[]>([])
  const colorService = new ColourService()
  const [colorData, setColorData] = useState<any[]>([])



  useEffect(() => {
    getData()
  }, [])

  // const getSampleDevById = () => {
  //     service.getSampleDevById(req).then(res => {
  //       if(res){
  //         setId(res)
  //       }
  //     })
  //   }

    const customIssueDate = new Date('2023-11-07T07:23:49.140Z');

// Format the date as 'YYYY-MM-DD'
const formattedIssueDate = customIssueDate.toISOString().split('T')[0];

    const saveData = ()=>{
      console.log(rowData,'-------+++++++++++++++')
      const req = new MaterialIssueDto(rowData?.[0]?.requestNo,formattedIssueDate,rowData?.[0]?.locationId,rowData?.[0]?.pchId,rowData?.[0]?.buyerId, rowData?.[0]?.sampleTypeId,rowData?.[0]?.sampleSubTypeId,rowData?.[0]?.styleId,rowData?.[0]?.styleNo,rowData?.[0]?.brandId,rowData?.[0]?.dmmId,rowData?.[0]?.techicianId,rowData?.[0]?.description, rowData?.[0]?.costRef, rowData?.[0]?.m3StyleNo, rowData?.[0]?.contact, rowData?.[0]?.Extn,rowData?.[0]?.samValue,rowData?.[0]?.product,rowData?.[0]?.type, rowData?.[0]?.conversion,rowData?.[0]?.madeIn,rowData?.[0]?.remarks,fabricData, trimData,0,'','',undefined,'')
      console.log(req,'---------------')
      materialIssue.createMaterialIssue(req).then((res)=>{
        if(res.status){
          AlertMessages.getSuccessMessage(res.internalMessage)
      } else{
          AlertMessages.getErrorMessage(res.internalMessage)
      }
      })
    }

  const getData = () => {
    service.getAllSampleDevData().then((res) => {
      setData(res.data)
      console.log(res.data,'^^^^^^^^^^^^^^^^^')
    })

    colorService.getAllColour().then(res => {
      if (res.status) {

        setColorData(res.data)
      }
    })
  }

    const [formData, setFormData] = useState({
      materialIssueId: 0, // Initialize with appropriate values
      issuedQuantity: 0, // Initialize with appropriate values
      // Add other form fields with their initial values
    });

    // const handleInputChange = (e, key, field) => {
    //     const updatedData = data.map((record) => {
    //       if (record.key === key) {
    //         return { ...record, [field]: e.target.value };
    //       }
    //       return record;
    //     });
    //     setData(updatedData);
    //   };


    const handleInputChange = (e, index,rowData) => {
      const req = new MaterialFabricDto(rowData.fabricCode,rowData.description, rowData.colourId, rowData.consumption,rowData.uomId,rowData.issuedQuantity, rowData.issuedUomId, rowData.remarks,undefined,'admin','','',0)
      setFabricData([...fabricData,req])
    };


    const handleTrimInfo = (e, index,rowData) => {
      console.log(rowData,'+++++++++++++++')
      const req = new MaterialTrimDto(rowData.description, rowData.consumption, rowData.uomId,rowData.issuedQuantity, rowData.issuedUomId, rowData.remarks,undefined,'admin','','',0,0)
      console.log(req,'____________')
      setTrimData([...trimData,req])
    };

    

  const onUpdate = () => {
    //  navigate('/sample-development/sample-requests', { state: { id: data[0]?.settingsId } })
    navigate('/sample-development/sample-requests')

  }

    const issuedInfo = (e,index,record) => {
      setCreateData(e.target.value);
  };
    

    const columnsSkelton = [
        {
          title: 'S.No',
          dataIndex: 'sNo',
          render: (_, record, index) => index + 1,
        },
        {
          title: 'Fabric Code',
          dataIndex: 'fabricCode',
          width:"20%",
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
          title: 'Color',
          dataIndex: 'color',
        },
        {
          title: 'Consumption',
          dataIndex: 'consumption',
        },
        {
          title: 'Issued Quantity',
          dataIndex: 'issuingQuantity',
          render: (value, row,index) => {
              return (
                <>
                  <Input
                  key={index}
                  placeholder="Issued Quantity"
                  // value={formData.issuedQuantity}
                  onChange={(e) => handleInputChange(e,index,row)}
                  />
                </>
              );
            },
        },
        {
          title: 'Remarks',
          dataIndex: 'remarks',
        }
      ];

      const columns = [
        {
          title: 'S.No',
          dataIndex: 'sNo',
          render: (_, record, index) => index + 1,
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
          title: 'Consumption',
          dataIndex: 'consumption',
        },
        {
          title: 'Issued Quantity',
          dataIndex: 'issuingQuantity',
          render: (value, row, index) => {
            return (
              <>
                <Input
                key={index}
                placeholder="Issued Quantity"
                // value={formData.issuedQuantity}
                onChange={(e) => handleTrimInfo(e,index,row)}
                />
              </>
            );
          },
        },
        {
          title: 'Remarks',
          dataIndex: 'remarks',
        },
      ];

  return (
    <Card title='Material Issue' className="card-header" extra={<Button onClick={onUpdate} type={'primary'}>View</Button>}>
      <Descriptions size='small'>
        <DescriptionsItem label='Location'>{rowData?.[0]?.locationName}</DescriptionsItem>
        <DescriptionsItem label='Location'>{rowData?.[0]?.locationName}</DescriptionsItem>
        <DescriptionsItem label='PCH'>{rowData?.[0]?.pch}</DescriptionsItem>
        <DescriptionsItem label='User'>{rowData?.[0]?.sr_user}</DescriptionsItem>
        <DescriptionsItem label='Buyer'>{rowData?.[0]?.buyerName}</DescriptionsItem>
        <DescriptionsItem label='Sample Type'>{rowData?.[0]?.sampleType}</DescriptionsItem>
        <DescriptionsItem label='Sample Sub Type'>{rowData?.[0]?.sampleSubType}</DescriptionsItem>
        <DescriptionsItem label='Style'>{rowData?.[0]?.s_style}</DescriptionsItem>
        <DescriptionsItem label='Description'>{rowData?.[0]?.sr_description}</DescriptionsItem>
        <DescriptionsItem label='Brand'>{rowData?.[0]?.brandName}</DescriptionsItem>
        <DescriptionsItem label='Cost Ref'>{rowData?.[0]?.costRef}</DescriptionsItem>
        <DescriptionsItem label='M3 Style No'>{rowData?.[0]?.m3StyleNo}</DescriptionsItem>
        <DescriptionsItem label='Contact No'>{rowData?.[0]?.sr_contact}</DescriptionsItem>
        <DescriptionsItem label='Extn'>{rowData?.[0]?.sr_extension}</DescriptionsItem>
        <DescriptionsItem label='SAM'>{rowData?.[0]?.samValue}</DescriptionsItem>
        <DescriptionsItem label='DMM'>{rowData?.[0]?.dmmName}</DescriptionsItem>
        <DescriptionsItem label='Technician'>{rowData?.[0]?.techName}</DescriptionsItem>
        <DescriptionsItem label='Product'>{rowData?.[0]?.sr_product}</DescriptionsItem>
        <DescriptionsItem label='Type'>{rowData?.[0]?.sr_type}</DescriptionsItem>
        <DescriptionsItem label='Conversion'>{rowData?.[0]?.sr_conversion}</DescriptionsItem>
        <DescriptionsItem label='Made In'>{rowData?.[0]?.madeIn}</DescriptionsItem>
        <DescriptionsItem label='Remarks'>{rowData?.[0]?.sr_remarks}</DescriptionsItem>
      </Descriptions>

      <Tabs type={'card'} tabPosition={'top'}>
        <TabPane key="1" tab={<span style={{ fontSize: '15px' }}><b>{`Fabric`}</b></span>}>
          <Table
            size="small"
            columns={columnsSkelton}
            dataSource={rowData[0]?.fabric}
            scroll={{ x: true }}
            bordered
            pagination={false}
          />
        </TabPane>
        <TabPane key="2" tab={<span style={{ fontSize: '15px' }}><b>{`Trims`}</b></span>}>
          <Table
            size="small"
            columns={columns}
            dataSource={rowData[0]?.trimData}
            scroll={{ x: true }}
            bordered
            pagination={false}
          />
        </TabPane>
      </Tabs>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          
            <Button type="primary" htmlType="submit" onClick={saveData}>
              Submit
            </Button>
            </Col>
          </Row>

    </Card>
  )

}

export default StoreIssueDetailed