import { Button, Card, Descriptions, Tabs } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DescriptionsItem from "antd/es/descriptions/Item"
import TabPane from "antd/es/tabs/TabPane"
import SourceFabrics from "./source-fabrics"
import SourceTrims from "./source-trims"
import { SourceFabricsTrimsService, SourceIssuesService } from "@project-management-system/shared-services"
import AlertMessages from "../common/common-functions/alert-messages"
import { MaterialIssueIdreq } from "@project-management-system/shared-models"

export interface SourceIssuesDetailViewProps {
  MaterialIssueID: number;
}
export const SourceIssuesDetailView = (props: SourceIssuesDetailViewProps) => {


  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const service = new SourceFabricsTrimsService

  useEffect(() => {
    if(props.MaterialIssueID != undefined) {
      const id = props.MaterialIssueID;
      getSource(id);
    }else {
      AlertMessages.getInfoMessage("Material Issue Id not found");
    }
    console.log(props.MaterialIssueID, "MaterialIssueID");    
  }, [])

  const getSource = (id) => {
    const req = new MaterialIssueIdreq(id)
    service.getMaterialIssueDetailsById(req).then((res) => {
      setData(res);
    })
  }
  return (
    <Card className="card-header">
      <Descriptions size='small'>
        <DescriptionsItem label='RequestNo'>{data[0]?.request_no}</DescriptionsItem>
        <DescriptionsItem label='Location'>{data[0]?.location_name}</DescriptionsItem>
        <DescriptionsItem label='Consumption Code'>{data[0]?.consumption_code}</DescriptionsItem>
        <DescriptionsItem label='Issued Date'>{data[0]?.issue_date}</DescriptionsItem>
        <DescriptionsItem label='Sample Indent Date'>{data[0]?.sampleIndentDate ? data[0]?.sampleIndentDate : "--"}</DescriptionsItem>
        <DescriptionsItem label='Po Number'>{data[0]?.po_number}</DescriptionsItem>
        <DescriptionsItem label='PCH'>{data[0]?.pch_id}</DescriptionsItem>
        <DescriptionsItem label='Buyer'>{data[0]?.buyer_name}</DescriptionsItem>
        <DescriptionsItem label='Sample Type'>{data[0]?.sample_type}</DescriptionsItem>
        <DescriptionsItem label='Sample Sub Type'>{data[0]?.sampleSubType ? data[0]?.sampleSubType : "--"}</DescriptionsItem>
        <DescriptionsItem label='Style'>{data[0]?.style_no}</DescriptionsItem>
        <DescriptionsItem label='Description'>{data[0]?.description}</DescriptionsItem>
        <DescriptionsItem label='Brand'>{data[0]?.brand_name}</DescriptionsItem>
        <DescriptionsItem label='Cost Ref'>{data[0]?.cost_ref}</DescriptionsItem>
        <DescriptionsItem label='M3 Style No'>{data[0]?.m3_style_no}</DescriptionsItem>
        <DescriptionsItem label='Contact No'>{data[0]?.contact}</DescriptionsItem>
        <DescriptionsItem label='Extn'>{data[0]?.extn}</DescriptionsItem>
        <DescriptionsItem label='SAM'>{data[0]?.SAM}</DescriptionsItem>
        <DescriptionsItem label='DMM'>{data[0]?.dmm_id}</DescriptionsItem>
        <DescriptionsItem label='Technician'>{data[0]?.technician_id}</DescriptionsItem>
        <DescriptionsItem label='Product'>{data[0]?.product}</DescriptionsItem>
        <DescriptionsItem label='Type'>{data[0]?.type}</DescriptionsItem>
        <DescriptionsItem label='Conversion'>{data[0]?.conversion}</DescriptionsItem>
        <DescriptionsItem label='Made In'>{data[0]?.made_in}</DescriptionsItem>
        <DescriptionsItem label='Remarks'>{data[0]?.remarks}</DescriptionsItem>
      </Descriptions>
      <Card size='small'>
        <Tabs type={'card'} tabPosition={'top'}>
          <TabPane key="1" tab={<span style={{ fontSize: '15px' }}><b>{`Fabric`}</b></span>}>
            <SourceFabrics MaterialIssueID={props.MaterialIssueID} />
          </TabPane>
          <TabPane key="3" tab={<span style={{ fontSize: '15px' }}><b>{`Trims`}</b></span>}>
            <SourceTrims MaterialIssueID={props.MaterialIssueID} />
          </TabPane>
        </Tabs>
      </Card>
    </Card>



  )


}
export default SourceIssuesDetailView