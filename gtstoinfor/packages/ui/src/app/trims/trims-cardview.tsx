import { Button, Card, Checkbox, Col, DatePicker, Descriptions, Divider, Form, Input, Modal, Popconfirm, Row, Segmented, Select, Space, Table, Tabs, Tag, Tooltip, message} from "antd";
import {CloseOutlined,CreditCardOutlined,EditOutlined,EyeOutlined,HomeOutlined,PlusCircleOutlined,SearchOutlined,UndoOutlined,  } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { BomService, trimService } from "@project-management-system/shared-services";


export const TrimList=({})=>{
const service = new BomService();
const [trim,setTrim]=useState<any>([]);

useEffect(()=>{
    getAllTrims();
},[])

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
        <Card key={index} style={{
            width: "20%",
            height: "100%",
            backgroundColor: "#9ec1a3",
            marginRight: "20px",
            marginBottom: "20px",        }}>
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
