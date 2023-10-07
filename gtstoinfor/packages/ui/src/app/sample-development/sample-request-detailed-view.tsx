import { SampleFilterRequest } from "@project-management-system/shared-models"
import { SampleDevelopmentService } from "@project-management-system/shared-services"
import { Button, Card, Col, Descriptions, message } from "antd"
import DescriptionsItem from "antd/es/descriptions/Item"
import Form from "antd/lib/form"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const SampleDevDetail = () => {

    const navigate = useNavigate()
    const [data,setData] = useState<any[]>([])
    let location = useLocation();
    const service = new SampleDevelopmentService()

    const stateData = location.state;
    const cancelVisible = location.state.cancelVisible

    const cancelSampleReq = (id: number) => {
        const req = new SampleFilterRequest(null,null,null,null,id);
        service.cancelSampleReqById(req).then((res: any) => {
            if (res.status) {
                navigate("/sample-development/sample-development-view");
                message.success(res.internalMessage)
            } else {
                message.error(res.internalMessage);
            }
        });
    };
    

    const onUpdate = () => {
        navigate('/sample-development/sample-development-form',{state:{id:data[0]?.settingsId}})
    }

    return(
        <Card title={<span style={{ color: 'black' }}>Request No : <span style={{color:'black'}}>{stateData?.data[0]?.requestNo?stateData?.data[0]?.requestNo:''
    }</span></span>} size='small'   extra={<Button onClick={onUpdate} type={'primary'}>Change</Button>}>
             <Descriptions size='small'>
                <DescriptionsItem label='Location'>{stateData?.data[0]?.locationName}</DescriptionsItem>
                <DescriptionsItem label='PCH'>{stateData?.data[0]?.profitControlHead}</DescriptionsItem>
                <DescriptionsItem label='User'>{stateData?.data[0]?.companyName}</DescriptionsItem>
                <DescriptionsItem label='Buyer'>{stateData?.data[0]?.buyerName}</DescriptionsItem>
                <DescriptionsItem label='Sample Type'>{stateData?.data[0]?.sampleType}</DescriptionsItem>
                <DescriptionsItem label='Sample Sub Type'>{stateData?.data[0]?.sampleSubType}</DescriptionsItem>
                <DescriptionsItem label='Style'>{stateData?.data[0]?.style}</DescriptionsItem>
                <DescriptionsItem label='Description'>{stateData?.data[0]?.salesPerson}</DescriptionsItem>
                <DescriptionsItem label='Brand'>{stateData?.data[0]?.brandName}</DescriptionsItem>
                <DescriptionsItem label='Cost Ref'>{stateData?.data[0]?.costRef}</DescriptionsItem>
                <DescriptionsItem label='M3 Style No'>{stateData?.data[0]?.m3StyleNo}</DescriptionsItem>
                <DescriptionsItem label='Contact No'>{stateData?.data[0]?.contact}</DescriptionsItem>
                <DescriptionsItem label='Extn'>{stateData?.data[0]?.extension}</DescriptionsItem>
                <DescriptionsItem label='SAM'>{stateData?.data[0]?.samValue}</DescriptionsItem>
                <DescriptionsItem label='DMM'>{stateData?.data[0]?.dmmEmployee}</DescriptionsItem>
                <DescriptionsItem label='Technician'>{stateData?.data[0]?.techEmployee}</DescriptionsItem>
                <DescriptionsItem label='Product'>{stateData?.data[0]?.product}</DescriptionsItem>
                <DescriptionsItem label='Type'>{stateData?.data[0]?.type}</DescriptionsItem>
                <DescriptionsItem label='Conversion'>{stateData?.data[0]?.conversion}</DescriptionsItem>
                <DescriptionsItem label='Made In'>{stateData?.data[0]?.madeIn}</DescriptionsItem>
                <DescriptionsItem label='Remarks'>{stateData?.data[0]?.deliveryMethod}</DescriptionsItem>
            </Descriptions>
            {cancelVisible && (
            <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                type="primary"
                style={{ background: "green", width: "100%" }}
                onClick={value => { cancelSampleReq(stateData?.data[0]?.SampleRequestId) }}
                // disabled={cancelVisible}
              >
                Cancel Request
              </Button>
            </Form.Item>
          </Col>
    )}
        </Card>
    )

}

export default SampleDevDetail