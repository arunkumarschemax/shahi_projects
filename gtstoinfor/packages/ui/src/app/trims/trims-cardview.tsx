import { Button, Card, Checkbox, Col, DatePicker, Descriptions, Divider, Form, Input, Modal, Popconfirm, Row, Segmented, Select, Space, Table, Tabs, Tag, Tooltip, message} from "antd";
import {CloseOutlined,CreditCardOutlined,EditOutlined,EyeOutlined,HomeOutlined,PlusCircleOutlined,SearchOutlined,UndoOutlined,  } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { BomService, trimService } from "@project-management-system/shared-services";
import { useLocale } from "antd/es/locale";
import { useLocation } from "react-router-dom";
import { StyleNumberReq } from "@project-management-system/shared-models";
import AlertMessages from "../common/common-functions/alert-messages";


export const TrimList=({})=>{
const service = new BomService();
const [trim,setTrim]=useState<any>([]);
const state = useLocation()
const [bomInfo,setBomInfo] = useState<any[]>([])

useEffect(()=>{
    getAllTrims();
},[])

// useEffect(() => {
//     if(state.state.info){
//         const req = new StyleNumberReq(state.state.info[0].styleNumber)
//          service.getBomInfoAgainstStyle(req).then(res =>{
//             if(res.status){
//                 setBomInfo(res.data)
//             }
//         })
//     }

// },[state.state])

    const getAllTrims=()=>{
        service.getAllTrimInfo().then(res=>{
            if(res.status){
                setTrim(res.data);
            }
        })
    }
    // const getAllTrims = () => {
    //     service.getAllTrimInfo().then(res => {
    //         if (Array.isArray(res)) { // Check if response is an array
    //             setTrim(res);
    //         }
    //         // Handle non-array responses if needed
    //     }).catch(error => {
    //         console.error("Error fetching trims:", error);
    //         // Handle error appropriately
    //     }); 
    // }
    return(
   <>
   <Card title="TRIMS" headStyle={{ color: 'black', fontWeight: 'bold',fontSize:'20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
           {trim.length > 0 && trim.map((e, index) => (
        <Card key={index} hoverable style={{
            width: "20%",
            height: "100%",
            backgroundColor: "#8ab0ab",
            marginRight: "20px",
            marginBottom: "20px",}}
            onClick={() => {AlertMessages.getSuccessMessage('success')}}
            >
            <div>
                <Descriptions
                    key={index}
                    style={{ fontSize:'10px !important', textAlign: "center" }}
                    title={<span style={{ fontSize: '20px', textAlign: "center" ,fontFamily:'revert-layer'}}>{e.item}</span>}                     
                >
                 </Descriptions>
            </div>
        </Card>
    ))}
</div>
</Card>
   </> 
    )
   
}
export default TrimList;
