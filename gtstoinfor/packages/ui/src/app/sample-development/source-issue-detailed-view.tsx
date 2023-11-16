import { SettingsIdReq, SettingsModel } from "@project-management-system/shared-models"
import { SampleDevelopmentService, SettingsService } from "@project-management-system/shared-services"
import { Button, Card, Col, Descriptions, Input, Row, Table, Tabs, Tooltip } from "antd"
import DescriptionsItem from "antd/es/descriptions/Item"
import TabPane from "antd/es/tabs/TabPane"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import FabricsForm from "./fabrics"
import TrimsForm from "./trims"
import { DeleteOutlined } from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea"
import React from "react"

export const StoreIssueDetailed = () => {

    const navigate = useNavigate()
    const service = new SampleDevelopmentService()
    const [data,setData] = useState<any[]>([])
    const [page, setPage] = React.useState(1);
    const [id, setId] = useState<any[]>([])


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

    const getData = ()=>{
        service.getAllSampleData().then((res)=>{
            setData(res.data)
            console.log(res)
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
        navigate('/sample-development/sample-requests',{state:{id:data[0]?.settingsId}})
    }

    const handleFormSubmit = () => {
        // Capture and log the issuing quality for both trims and fabric
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
          render: (_, record) => (
            <Input
            value={record.issuingQuantity}
            onChange={(e) => handleInputChange(e, record.key, 'issuingQuantity')}
            />
          ),
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
          render: (_, record) => (
            <Input
            value={record.issuingQuantity}
            onChange={(e) => handleInputChange(e, record.key, 'issuingQuantity')}
            />
          ),
        },
        {
          title: 'Remarks',
          dataIndex: 'remarks',
        },
      ];

    return(
        <Card title='Store Issue' headStyle={{ backgroundColor: '#69c0ff', border: 0 }} onClick={onUpdate} extra={<Button type={'primary'}>View</Button>}>
             <Descriptions size='small'>
                <DescriptionsItem label='Location'>{data[0]?.location}</DescriptionsItem>
                <DescriptionsItem label='PCH'>{data[0]?.pch}</DescriptionsItem>
                <DescriptionsItem label='User'>{data[0]?.user}</DescriptionsItem>
                <DescriptionsItem label='Buyer'>{data[0]?.buyer}</DescriptionsItem>
                <DescriptionsItem label='Sample Type'>{data[0]?.sampleType}</DescriptionsItem>
                <DescriptionsItem label='Sample Sub Type'>{data[0]?.sampleSubType}</DescriptionsItem>
                <DescriptionsItem label='Style'>{data[0]?.style}</DescriptionsItem>
                <DescriptionsItem label='Description'>{data[0]?.description}</DescriptionsItem>
                <DescriptionsItem label='Brand'>{data[0]?.brand}</DescriptionsItem>
                <DescriptionsItem label='Cost Ref'>{data[0]?.costRef}</DescriptionsItem>
                <DescriptionsItem label='M3 Style No'>{data[0]?.m3StyleNo}</DescriptionsItem>
                <DescriptionsItem label='Contact No'>{data[0]?.contactNo}</DescriptionsItem>
                <DescriptionsItem label='Extn'>{data[0]?.extn}</DescriptionsItem>
                <DescriptionsItem label='SAM'>{data[0]?.sam}</DescriptionsItem>
                <DescriptionsItem label='DMM'>{data[0]?.dmm}</DescriptionsItem>
                <DescriptionsItem label='Technician'>{data[0]?.technician}</DescriptionsItem>
                <DescriptionsItem label='Product'>{data[0]?.product}</DescriptionsItem>
                <DescriptionsItem label='Type'>{data[0]?.productType}</DescriptionsItem>
                <DescriptionsItem label='Conversion'>{data[0]?.Conversion}</DescriptionsItem>
                <DescriptionsItem label='Made In'>{data[0]?.madeIn}</DescriptionsItem>
                <DescriptionsItem label='Remarks'>{data[0]?.remarks}</DescriptionsItem>
            </Descriptions>

            <Tabs type={'card'} tabPosition={'top'}>
                <TabPane key="1" tab={<span><b>{`Fabric`}</b></span>}>
                <Table
                size="small"
                columns={columnsSkelton}
                dataSource={data[0]?.fabricInfo}
                scroll={{ x: true }}
                bordered
                pagination ={false}
            />
                </TabPane>
                <TabPane key="2" tab={<span><b>{`Trims`}</b></span>}>
                <Table
                size="small"
                columns={columns}
                dataSource={data[0]?.trimInfo}
                scroll={{ x: true }}
                bordered
                pagination ={false}
            />
                </TabPane>
            </Tabs>
        <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          
            <Button type="primary" htmlType="submit" onClick={handleFormSubmit}>
              Submit
            </Button>
            </Col>
          </Row>

        </Card>
    )

}

export default StoreIssueDetailed