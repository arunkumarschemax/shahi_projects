import { SettingsIdReq, SettingsModel } from "@project-management-system/shared-models"
import { ColourService, LocationsService, SampleDevelopmentService, SettingsService } from "@project-management-system/shared-services"
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

export const MarketIssueDetail = () => {

  const navigate = useNavigate()
  const service = new SampleDevelopmentService()
  const [data,setData] = useState<any[]>([])
  const [page, setPage] = React.useState(1);
  const [id, setId] = useState<any[]>([])
  const location = useLocation();
  const rowData = location.state.data


  const colorService = new ColourService()
  const [colorData, setColorData] = useState<any[]>([])

  useEffect(() => {
    getData()
  },[])



  // const getSampleDevById = () => {
  //     service.getSampleDevById(req).then(res => {
  //       if(res){
  //         setId(res)
  //       }
  //     })
  //   }

  const getData = () => {
    service.getAllSampleDevData().then((res) => {
      if(res.status){
        setData(res.data);
      }  
    })

    colorService.getAllColour().then(res => {
      if (res.status) {
        setColorData(res.data)
      }
    })
  }


  const handleInputChange = (e, key, field) => {
    const updatedData = data.map((record) => {
      if (record.key === key) {
        return { ...record, [field]: e.target.value };
      }
      return record;
    });
    setData(updatedData);
  };


  const onUpdate = () => {

    // navigate('/sample-development/sample-requests', { state: { id: data[0]?.settingsId } })
    navigate('/sample-development/sample-requests')


  }

  const handleFormSubmit = () => {
    const issuingQualityForFabric = data[0]?.fabricInfo.map((record) => ({
      key: record.key,
      issuingQuantity: record.issuingQuantity,
    }));

    const issuingQualityForTrims = data[0]?.trimInfo.map((record) => ({
      key: record.key,
      issuingQuantity: record.issuingQuantity,
    }));

    console.log("Issuing Quality for Fabric:", issuingQualityForFabric);
    console.log("Issuing Quality for Trims:", issuingQualityForTrims);

    // Log the entire data object with updated issuingQuantity
    console.log("Updated Data:", data);
  };

console.log(rowData?.[0].trimData,"rowData?.trimData")

  const columnsSkelton = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Fabric Code',
      dataIndex: 'fabric_item_code',
      width: "20%",
    },
    {
      title: 'Description',
      dataIndex: 'fabric_description',
    },
    // {
    //   title: 'Color',
    //   dataIndex: 'color',
    // },

    {
      title: 'color',
      dataIndex: 'colour_id',
      render: (data) => {

        const colMethod = colorData.find(res => res.colourId === data);

        return colMethod ? colMethod.colour : "-";
      }
    },



    {
      title: 'Consumption',
      dataIndex: 'fabric_consumption',
    },
    // {
    //   title: 'Issued Quantity',
    //   dataIndex: 'issuingQuantity',
    //   render: (_, record) => (
    //     <Input
    //     value={record.issuingQuantity}
    //     onChange={(e) => handleInputChange(e, record.key, 'issuingQuantity')}
    //     />
    //   ),
    // },
    {
      title: 'Remarks',
      dataIndex: 'fab_remarks',
    }
  ];

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Trim Code',
      dataIndex: 'trim_item_code',
      width: "20%",
    },
    {
      title: 'Description',
      dataIndex: 'trim_description',
    },
    {
      title: 'Consumption',
      dataIndex: 'trim_consumption',
    },
    // {
    //   title: 'Issued Quantity',
    //   dataIndex: 'issuingQuantity',
    //   render: (_, record) => (
    //     <Input
    //     value={record.issuingQuantity}
    //     onChange={(e) => handleInputChange(e, record.key, 'issuingQuantity')}
    //     />
    //   ),
    // },
    {
      title: 'Remarks',
      dataIndex: 'tri_remarks',
    },
  ];

  return (
    <Card title='Sample Request' headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<Button onClick={onUpdate} type={'primary'}>View</Button>} >
      <Descriptions size='small'>
        <DescriptionsItem label='Location'>{rowData?.[0]?.locationName}</DescriptionsItem>
        <DescriptionsItem label='PCH'>{rowData?.[0]?.pch}</DescriptionsItem>
        <DescriptionsItem label='User'>{rowData?.[0]?.user}</DescriptionsItem>
        <DescriptionsItem label='Buyer'>{rowData?.[0]?.buyerName}</DescriptionsItem>
        <DescriptionsItem label='Sample Type'>{rowData?.[0]?.sampleType}</DescriptionsItem>
        <DescriptionsItem label='Sample Sub Type'>{rowData?.[0]?.sampleSubType}</DescriptionsItem>
        <DescriptionsItem label='Style'>{rowData?.[0]?.style}</DescriptionsItem>
        <DescriptionsItem label='Description'>{rowData?.[0]?.description}</DescriptionsItem>
        <DescriptionsItem label='Brand'>{rowData?.[0]?.brandName}</DescriptionsItem>
        <DescriptionsItem label='Cost Ref'>{rowData?.[0]?.costRef}</DescriptionsItem>
        <DescriptionsItem label='M3 Style No'>{rowData?.[0]?.m3StyleCode}</DescriptionsItem>
        <DescriptionsItem label='Contact No'>{rowData?.[0]?.contact}</DescriptionsItem>
        <DescriptionsItem label='Extn'>{rowData?.[0]?.extension}</DescriptionsItem>
        <DescriptionsItem label='SAM'>{rowData?.[0]?.samValue}</DescriptionsItem>
        <DescriptionsItem label='DMM'>{rowData?.[0]?.dmmName}</DescriptionsItem>
        <DescriptionsItem label='Technician'>{rowData?.[0]?.techName}</DescriptionsItem>
        <DescriptionsItem label='Product'>{rowData?.[0]?.product}</DescriptionsItem>
        <DescriptionsItem label='Type'>{rowData?.[0]?.type}</DescriptionsItem>
        <DescriptionsItem label='Conversion'>{rowData?.[0]?.conversion}</DescriptionsItem>
        <DescriptionsItem label='Made In'>{rowData?.[0]?.country_name}</DescriptionsItem>
        <DescriptionsItem label='Remarks'>{rowData?.[0]?.remarks}</DescriptionsItem>
      </Descriptions>

      <Tabs type={'card'} tabPosition={'top'}>
        <TabPane key="1" tab={<span style={{ fontSize: '15px' }}><b>{`Fabric`}</b></span>}>
          <Table
            size="small"
            columns={columnsSkelton}
            dataSource={rowData?.[0]?.fabric}
            scroll={{ x: true }}
            bordered
            pagination={false}
          />
        </TabPane>
        <TabPane key="2" tab={<span style={{ fontSize: '15px' }}><b>{`Trims`}</b></span>}>
          <Table
            size="small"
            columns={columns}
            dataSource={rowData?.[0]?.trimData}
            scroll={{ x: true }}
            bordered
            pagination={false}
          />
        </TabPane>
      </Tabs>
      {/* <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          
            <Button type="primary" htmlType="submit" onClick={handleFormSubmit}>
              Submit
            </Button>
            </Col>
          </Row> */}

    </Card>
  )

}

export default MarketIssueDetail
