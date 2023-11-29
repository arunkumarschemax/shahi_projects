import {BarcodeOutlined,CaretDownOutlined,CaretRightOutlined,EyeOutlined,InfoCircleOutlined,PrinterOutlined,SearchOutlined,UndoOutlined,} from "@ant-design/icons";
import {Button,Card,Col,Collapse,Descriptions,Divider,Form,Input,Modal,Row,Segmented,Select,Space,Table,Tag,} from "antd";
  import style from "antd/es/alert/style";
  import { ColumnProps } from "antd/es/table";
  import moment from "moment";
  import React, { useEffect, useRef } from "react";
  import { useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
import { GrnReq } from "@project-management-system/shared-models";
import { GRNService } from "@project-management-system/shared-services";
  
  const { Option } = Select;
  
  export const GRNDetailView = () => {
    const [page, setPage] = React.useState(1);
    const grnService = new GRNService();
    const [grn, setGrn] = useState<any[]>([]);
    const navigate = useNavigate();
    const logInUser = localStorage.getItem("userName");
  const location = useLocation()
  const stateData = location.state
  console.log(stateData,'================') 

  useEffect(() => {
    getAllData();
  }, []); 

    const getAllData = () => {
      const grnId = stateData?.data?.[0]?.grnId;
      const itemType = stateData?.data?.[0]?.itemType;
    
      if (grnId && itemType) {
        const req = new GrnReq(grnId, itemType);
    
        grnService.getGRNItemsData(req).then((res) => {
          if (res.status) {
            setGrn(res.data);
            console.log(res.data,'0000000000000000')
          }
        });
      } else {
        console.error('grnId or itemType is not available');
      }
    };
    
  
    const Columns: any = [
      {
        title: <div style={{textAlign:"center"}}>Item Code</div>,
        dataIndex: "itemCode",
        align:"center",
        render: (val,data) => {
          return data.itemCode ? data.itemCode : "-";
        }
      },
    
      {
        title: <div style={{textAlign:"center"}}>Received Qty</div>,
        dataIndex: "receivedQty",
        align:"right",
      },
      {
        title: <div style={{textAlign:"center"}}>Accepted Qty</div>,
        dataIndex: "acceptedQty",
        align:"right",
      },
      {
        title: <div style={{textAlign:"center"}}>Rejected Qty</div>,
        dataIndex: "rejectedQty",
        align:"right",
        render: (val, data) => {
          return data.rejectedQty !== undefined && data.rejectedQty !== null && data.rejectedQty !== 0
            ? data.rejectedQty
            : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>Conversion Qty</div>,
        dataIndex: "conversionQty",
        align:"right",
        render: (val,data) => {
          return data.conversionQty ? data.conversionQty : "-";
        }
      },
      {
        title: <div style={{textAlign:"center"}}>Location Mapped</div>,
        dataIndex: "locMapStatus",
        align:"center"
      },
    ];
  
    return (
      <Card
        headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
        title="GRN Details"
        extra={
          <span>
            <Button onClick={() => navigate("/grn-view")}>Back</Button>
          </span>
        }
      >
        <Descriptions>
          <Descriptions.Item label='GRN Number' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData.data[0]?.grnNo?stateData.data?.[0]?.grnNo:'-'}</Descriptions.Item>
          <Descriptions.Item label='GRN Date' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData.data?.[0]?.grnDate? moment(stateData.data?.[0]?.grnDate).format('DD-MM-YYYY'):'-'}</Descriptions.Item>
          <Descriptions.Item label='Vendor' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData.data?.[0]?.vendor?stateData.data?.[0]?.vendor:'-'}</Descriptions.Item>
          <Descriptions.Item label='PO Number' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData.data?.[0]?.poNumber?stateData.data?.[0]?.poNumber:'-'}</Descriptions.Item>
          <Descriptions.Item label='Contact Person' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData.data?.[0]?.contactPerson?stateData.data?.[0]?.contactPerson:'-'}</Descriptions.Item>
          <Descriptions.Item label='Invoice No' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData.data?.[0]?.invoiceNo?stateData.data?.[0]?.invoiceNo:'-'}</Descriptions.Item>
          <Descriptions.Item label='Item Type' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData.data?.[0]?.itemType?stateData.data?.[0]?.itemType:'-'}</Descriptions.Item>
          <Descriptions.Item label='GRN Type' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData.data?.[0]?.grnType?stateData.data?.[0]?.grnType:'-'}</Descriptions.Item>
          <Descriptions.Item label='Status' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData.data?.[0]?.status?stateData.data?.[0]?.status:'-'}</Descriptions.Item>
        </Descriptions>
        <br/>
        <br/>
        <Table
        columns={Columns}
        dataSource={grn}
        pagination={false}
        bordered
        size="small"
        scroll={{ x: "max-content" }}
        className="custom-table-wrapper"
        />
                 
      </Card>
    );
  };
  
  export default GRNDetailView;
  