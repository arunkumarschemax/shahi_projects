import { StyleNumberReq } from "@project-management-system/shared-models"
import { BomService } from "@project-management-system/shared-services"
import { Button, Card, Descriptions } from "antd"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export interface JokerTagPrintProps{
    info: any[]
}

export const JokerTagPrint = (props:JokerTagPrintProps) => {

    const bomData = useLocation()
    const bomservice = new BomService()
    const [bomInfo,setBomInfo] = useState<any[]>([])

    // useEffect(() => {
    //     if(bomData.state.info){
    //         const req = new StyleNumberReq(bomData.state.info?.styleNumber)
    //         bomservice.getBomInfoAgainstStyle(req).then(res =>{
    //             if(res.status){
    //                 setBomInfo(res.data)
    //             }
    //         })
    //     }

    // },[bomData.state])

    useEffect(() => {
        if(props.info){
            const req = new StyleNumberReq(props.info[0]?.styleNumber)
            bomservice.getBomInfoAgainstStyle(req).then(res =>{
                if(res.status){
                    setBomInfo(res.data)
                }
            })
        }

    },[props.info])

    let grandTotal = 0

    return(
        <>
        <div id='print'>
            <Card title={'Joker Tag'} extra={<span><Button>Print</Button></span>}>
            <Descriptions >
                <Descriptions.Item>{`Size wise details`}</Descriptions.Item>
            </Descriptions>
            <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%',border:'2px solid black'}} border={1}>
            <tr>
                <th>ITEM#</th>
                <th>STYLE#</th>
                <th>IM#</th>
                <th>REGION</th>
                <th>SEASON</th>
                {
                    bomData?.state.info?.sizeWiseData.map(e => {
                        grandTotal+= e.sizeQty
                        return(
                            <th>{e.sizeDescription}</th>
                        )
                    })
                }
                <th>Grand Total</th>
            </tr>

            </table>
            <br/>
            <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%',border:'2px solid black'}} border={1}>
                <tr>
                    <th>ITEM#</th>
                    <th>STYLE#</th>
                    <th>REGION</th>
                    <th>IM#</th>
                    <th>TRIM</th>
                    <th>DESCRIPTION </th>
                </tr>
            </table>
            </Card>
        </div>
        </>
    )

}

export default JokerTagPrint