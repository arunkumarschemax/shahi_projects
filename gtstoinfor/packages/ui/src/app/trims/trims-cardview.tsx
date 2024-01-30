import { Button, Card, Checkbox, Col, DatePicker, Descriptions, Divider, Form, Input, Modal, Popconfirm, Row, Segmented, Select, Space, Table, Tabs, Tag, Tooltip, message} from "antd";
import {CloseOutlined,CreditCardOutlined,EditOutlined,EyeOutlined,HomeOutlined,PlusCircleOutlined,SearchOutlined,UndoOutlined,  } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";


export const TrimList=()=>{

    return(
   <>
<Card style={{
    width: "20%",
    height: "100%",
    backgroundColor: "#b5838d ",
    marginRight: "-50px",
    }} >
<Descriptions 
 column={1}
 style={{ fontSize: "2px", }} 
 title={`TRIM: $`}
 >

</Descriptions >
</Card>
   </> 
    )
   
}
export default TrimList;
