import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Row } from "antd";
import { useLocation } from "react-router-dom";
import { Shahi } from "../SHAHI";
import { HTTP } from "../http";
import React from "react";

export function HangTag() {
let totalqty = 100;
let value =50;
    return(
        <Card>
            {/* <Descriptions>{'NSW FOUNDATIONAL PRIMARY HANGTAG 2 SIDED'}</Descriptions> */}
        <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%'}} border={1} cellSpacing="0" cellPadding='0'>
        <tr>
        <th style={{width:'3%'}}>ITEM#</th>
        <th style={{width:'3%'}}>Season#</th>

        <th style={{width:'3%'}}>STYLE#</th>
        <th style={{width:'3%'}}>Size Group</th>
        <th style={{width:'5%'}}>Region / Destination</th>
        <th style={{width:'3%'}}>IM#</th>
        <th style={{width:'3%'}}>Req Qty in PCS</th>
      
       
        </tr>
        
        

      </table>
     
      </Card>
        
    )


}
export default HangTag