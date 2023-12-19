import {BarcodeOutlined,CaretDownOutlined,CaretRightOutlined,EyeOutlined,InfoCircleOutlined,PrinterOutlined,QrcodeOutlined,SearchOutlined,UndoOutlined,} from "@ant-design/icons";
import {Button,Card,Col,Collapse,Descriptions,Divider,Form,Input,Modal,Row,Segmented,Select,Space,Table,Tag,} from "antd";
  import style from "antd/es/alert/style";
  import { ColumnProps } from "antd/es/table";
  import moment from "moment";
  import React, { useEffect, useRef } from "react";
  import { useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
import { GRNTypeEnumDisplay, GrnReq, ItemTypeEnumDisplay, LocationMappedEnumDisplay } from "@project-management-system/shared-models";
import { GRNService } from "@project-management-system/shared-services";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";

  
  const { Option } = Select;
  
  export const GRNDetailView = () => {
    const [page, setPage] = React.useState(1);
    const grnService = new GRNService();
    const [grn, setGrn] = useState<any[]>([]);
    const navigate = useNavigate();
    const logInUser = localStorage.getItem("userName");
  const location = useLocation()
  const stateData = location.state
  const [barcode, setBarcode] = useState<string>(null);
  const [barcodeModal, setBarcodeModal] = useState<boolean>(false);
  const [barcodeInfo, setBarcodeInfo] = useState<string>("");


  useEffect(() => {
    getAllData();
  }, []); 

    const getAllData = () => {
      const grnId = stateData?.data?.[0]?.grnId;
      const itemType = stateData?.data?.[0]?.itemType;
    
      if (grnId && itemType) {
        const req = new GrnReq(grnId,itemType);
    
        grnService.getGRNItemsData(req).then((res) => {
          if (res.status) {
            setGrn(res.data);
          }
        });
      } else {
        console.error('grnId or itemType is not available');
      }
    };

    const generateBarcode = (m3Code, info) => {
      setBarcode(m3Code);
      setBarcodeInfo(info);
      setBarcodeModal(true);
    };

    const onBarcodeModalCancel = () => {
      setBarcode("");
      setBarcodeModal(false);
    };
  
    const handlePrint = () => {
      const invoiceContent = document.getElementById("print");
      if (invoiceContent) {
        const devContent = invoiceContent.innerHTML;
        const printWindow = window.open("", "PRINT", "height=900,width=1600");
        printWindow.document.write(devContent);
        // getCssFromComponent(document, printWindow.document);
  
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
    };
    
    
  
    const Columns: any = [
      {
        title: <div style={{textAlign:"center"}}>Buyer</div>,
        dataIndex: "buyerName",
        align:"center",
        render: (val,data) => {
          return data.buyerName ? data.buyerName : "-";
        }
      },
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
        render: (text, record) => {
          const uom = record.uom || '';
      
          return text !== 0 && text !== null ? `${text} ${uom}` : '-';
        },      },
      {
        title: <div style={{textAlign:"center"}}>Accepted Qty</div>,
        dataIndex: "acceptedQty",
        align:"right",
        render: (text, record) => (text !== 0 ? `${text} ${record.uom || ''}` : '-')
      },
      {
        title: <div style={{textAlign:"center"}}>Rejected Qty</div>,
        dataIndex: "rejectedQty",
        align:"right",
        render: (text, record) => (text > 0 ? `${text} ${record.uom || ''}` : '0')
      },
      {
        title: <div style={{textAlign:"center"}}>Conversion Qty</div>,
        dataIndex: "conversionQty",
        align:"right",
        render: (text, record) => {
          const uom = record.uom || '';
      
          return text !== 0 && text !== null ? `${text} ${uom}` : '-';
        },
      },
      {
        title: <div style={{textAlign:"center"}}>Location Mapped</div>,
        dataIndex: "locMapStatus",
        align:"center",
        render: (text) => {
          const EnumObj = LocationMappedEnumDisplay.find((item) => item.name === text);
          return EnumObj ? EnumObj.displayVal : text;
        },
      },
      {
        title: <div style={{textAlign:"center"}}>QRCode</div>,
        dataIndex: "action",
        align:"center",
        render: (text, record) => {
          const value = `${record.grnNumber}/${record.itemCode}/${record.receivedQty}${record.uom}`;
          return (
            <Tag onClick={() => generateBarcode(value, "GRN")} style={{ cursor: "pointer" }}>
              <QrcodeOutlined />
            </Tag>
          );
        },
      },
    ];
  
    return (
      <Card
        headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
        title={
          <div style={{textAlign:"center"}}>
            <span style={{marginRight:"20px"}}>GRN Number: {stateData?.data[0]?.grnNo}</span>
            <span style={{ marginLeft: '20px'}}>PO Number: {stateData?.data[0]?.poNumber}</span>
          </div>
        }
        extra={
          <span>
            <Button onClick={() => navigate("/grn-view")}>Back</Button>
          </span>
        }
      >
        <Descriptions>
          {/* <Descriptions.Item label='GRN Number' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData.data[0]?.grnNo?stateData.data?.[0]?.grnNo:'-'}</Descriptions.Item> */}
          <Descriptions.Item label='GRN Date' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData?.data?.[0]?.grnDate? moment(stateData?.data?.[0]?.grnDate).format('DD-MM-YYYY'):'-'}</Descriptions.Item>
          <Descriptions.Item label='Vendor' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData?.data?.[0]?.vendor?stateData?.data?.[0]?.vendor:'-'}</Descriptions.Item>
          {/* <Descriptions.Item label='PO Number' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData?.data?.[0]?.poNumber?stateData?.data?.[0]?.poNumber:'-'}</Descriptions.Item> */}
          {/* <Descriptions.Item label='Contact Person' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData?.data?.[0]?.contactPerson?stateData?.data?.[0]?.contactPerson:'-'}</Descriptions.Item> */}
          <Descriptions.Item label='Invoice No' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData?.data?.[0]?.invoiceNo?stateData?.data?.[0]?.invoiceNo:'-'}</Descriptions.Item>
          <Descriptions.Item label='Invoice Date' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData?.data?.[0]?.invoiceDate? moment(stateData?.data?.[0]?.invoiceDate).format('DD-MM-YYYY'):'-'}</Descriptions.Item>
          <Descriptions.Item label='Item Type' labelStyle={{color:'black',fontWeight:'bolder'}}>{ItemTypeEnumDisplay.find((e) => e.name === stateData?.data?.[0]?.itemType)?.displayVal ?? '-'}</Descriptions.Item>
          {/* <Descriptions.Item label='Item Type' labelStyle={{color:'black',fontWeight:'bolder'}}>{ItemTypeEnumDisplay.find((e)=> e.name === stateData?.data?.[0]?.itemType)?.displayVal}</Descriptions.Item> */}
          <Descriptions.Item label='GRN Type' labelStyle={{color:'black',fontWeight:'bolder'}}>{GRNTypeEnumDisplay.find((e) => e.name === stateData?.data?.[0]?.grnType)?.displayVal ?? '-'}</Descriptions.Item>
          {/* <Descriptions.Item label='GRN Type' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData?.data?.[0]?.grnType?stateData?.data?.[0]?.grnType:'-'}</Descriptions.Item> */}
          <Descriptions.Item label='Status' labelStyle={{color:'black',fontWeight:'bolder'}}>{stateData?.data?.[0]?.status?stateData?.data?.[0]?.status:'-'}</Descriptions.Item>
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
        <Modal
        open={barcodeModal}
        onCancel={onBarcodeModalCancel}
        footer={[]}
        // title="GRN"
        style={{ maxWidth: "100%" }}
      >
        <div style={{ textAlign: "center" }}>
          <QRCode value={barcode} height={30} width={0.8}/>
          {/* <PrinterOutlined onClick={handlePrint}/> */}
        </div>
      </Modal>
      </Card>
    );
  };
  
  export default GRNDetailView;
  