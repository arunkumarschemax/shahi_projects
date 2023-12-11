import { PrinterOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { SampleDevelopmentService } from "@project-management-system/shared-services";
import AlertMessages from "../common/common-functions/alert-messages";
import {
    Button,
    Card,
    Col,
    Form,
    Row,
    Select,
    Spin,
    Table,
    notification,
} from "antd";
import { ColumnProps } from "antd/es/table";
import { Tabs } from "antd";
import {
    AllocatedLocationReq,
    AllocationApprovalReq,
    BuyerRefNoRequest,
    RequestNoReq,
    requestNoReq,
} from "@project-management-system/shared-models";
import { useIAMClientState } from "../common/iam-client-react";
import './pick-list-print.css';
import QRCode from "react-qr-code";
import html2pdf from 'html2pdf.js';

export interface PickListPrintProps {
    reqNo: number
    printOrder: () => void
}
export const getCssFromComponent = (fromDoc, toDoc) => {
    Array.from(fromDoc.styleSheets).forEach((styleSheet: any) => {
        if (styleSheet.cssRules) {
            // true for inline styles
            const newStyleElement = toDoc.createElement("style");
            Array.from(styleSheet.cssRules).forEach((cssRule: any) => {
                newStyleElement.appendChild(toDoc.createTextNode(cssRule.cssText));
            });
            toDoc.head.appendChild(newStyleElement);
        }
    });
};
export const PickListPrint = (props: PickListPrintProps) => {
    const Option = Select;
    const [form] = Form.useForm();
    const { TabPane } = Tabs;
    const [fabricStockData, setFabricStockData] = useState<any[]>([]);
    const [trimStockData, setTrimStockData] = useState<any[]>([]);
    const service = new SampleDevelopmentService();
    const [page, setPage] = React.useState(1);
    const [requestNo, setRequestNo] = useState<any>([]);
    const [childData, setChildData] = useState({});
    const [loading, setLoading] = useState(false);
    const { IAMClientAuthContext, dispatch } = useIAMClientState();
    const [showTabe, setShowTabe] = useState(false);



    useEffect(() => {
        getAllocatedBomData()

    }, []);


    const getAllocatedBomData = async () => {
        const req = new requestNoReq();
        req.requestNo = props.reqNo
        await service.getPickListInfo(req).then((res) => {
            if (res.data) {
                // if(res.data.filter((e) => e. itemType==='fabric').length>0){
                setFabricStockData(res.data.filter((e) => e.itemType === 'fabric'));
                // }
                // if(res.data.filter((e) => e. itemType !='fabric').length>0){

                setTrimStockData(res.data.filter((e) => e.itemType != 'fabric'));
                // }
                setShowTabe(true)
            } else {
                setFabricStockData([]);
                setShowTabe(false)
            }
        });


    };


    const downloadAsPDF = () => {
        const element = document.getElementById('printme'); 
        const options = {
            margin: 10, // Adjust the margin as needed
            filename: 'Pick List.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          };
          html2pdf(element, options);
      };

    return (
        <Card
            title="Pick List Print"
            style={{ textAlign: "center" }}
            headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
            extra={
                <span style={{ color: "white" }}>
                    <Button onClick={props.printOrder} className='panel_button'><PrinterOutlined /> Print</Button> <Button className='panel_button' onClick={downloadAsPDF}>Download PDF</Button>
                </span>
            }
        >
            <div id="printme">
                <h1 style={{ textAlign: "center", fontFamily:'initial' ,marginBottom:-35}}>
                Pick List
                </h1>
                <h3 style={{ textAlign: "right",fontFamily:'sans-serif',marginBottom:-5}}>
                SHAHI EXPORTS PVT. LIMITED
                </h3>
                <hr style={{fontWeight:'lighter'}}></hr>
                <div style={{ flexDirection: "row", display: "flex",textAlign:'left' ,marginBottom:-50}}>
                <div style={{flex:1,marginBottom:-20}}>
                <h4 style={{ display:'flex',flexDirection:'column',}}>
                               <a> <QRCode
                                
                                    size={256}
                                    bgColor="lightgrey"
                                    style={{ height: "60px", maxWidth: "60%", width: "50%",textAlign:'center' }}
                                    value={`${fabricStockData?.[0]?.requestNo}`}
                                    viewBox={`0 0 356 356`}
                                    
                                />
                                </a>
                                <b style={{ height: "60px", maxWidth: "60%", width: "50%",textAlign:'center' }}>
                                {`${fabricStockData?.[0]?.requestNo}`}
                                </b>
                                </h4>
                                </div>
                                <div style={{flex:1,marginBottom:-30}}>
                                   
                    <p><a style={{ color: 'green',}}>Buyer: </a><b>{fabricStockData?.[0]?.buyerName}</b></p>
                    <p><a style={{ color: 'green', }}>Style: </a><b>{fabricStockData?.[0]?.style}</b></p>
                    <p><a style={{ color: 'green', }}>Brand: </a><b>{fabricStockData?.[0]?.brandName}</b></p>
                  
                    </div>
                    </div>
                {showTabe ? (
                    <div style={{marginTop:-30}}>
                        {/* <div style={{ flex: 1, padding: 5 }}> */}
                            {fabricStockData && fabricStockData.length > 0 ? (
                                <> 
                                                                   
                                <h3 style={{ fontFamily: 'initial',textAlign:'left',marginBottom:-5 }}> &#128088;Fabric</h3>
                                    <hr ></hr>
                                    <div style={{ flexDirection: "row", display: "flex" }}>
                                    <p style={{ fontSize: 15, flex: 1,fontWeight:'bolder' }}>QR Code</p>

                                                <p style={{ fontSize: 15, flex: 1,fontWeight:'bolder' }}>Fabric Code</p>
                                                <p style={{ fontSize: 15, flex: 1,fontWeight:'bolder' }}>Colour</p>
                                                <p style={{ fontSize: 15, flex: 1,fontWeight:'bolder' }}>Consumption</p>
                                                <p style={{ fontSize: 15, flex: 1,fontWeight:'bolder' }}>Location</p>
                                                <p style={{ fontSize: 15, flex: 1,fontWeight:'bolder' }}>Allocate Quantity</p>
                                            </div>
                                    {fabricStockData.map((e) => (
                                        <div>
                                            <div style={{ flexDirection: "row", display: "flex" }}>
                                            <p style={{ fontSize: 15, flex: 1 }}>
                                            <a> <QRCode
                                
                                size={256}
                                bgColor="lightgrey"
                                style={{ height: "50px", maxWidth: "40%", width: "30%"}}
                                value={`${e.itemCode? e.itemCode :'-'}`}
                                viewBox={`0 0 356 356`}
                                
                            />
                            
                            </a>
                                {/* <b style={{ height: "23px", maxWidth: "50%", width: "30%"}}>
                                {`${e.itemCode? e.itemCode :'-'}`}
                                </b> */}
                                </p>
                                                <p style={{ fontSize: 15, flex: 1 }}> {e.itemCode? e.itemCode :'-'}</p>
                                                <p style={{ fontSize: 15, flex: 1 }}>{e.colour? e.colour :'-'}</p>
                                                <p style={{ fontSize: 15, flex: 1 }}>{e.consumption ? e.consumption :'-'}</p>
                                                <p style={{ fontSize: 15, flex: 1 }}>{e.location? e.location :'-'}</p>
                                                <p style={{ fontSize: 15, flex: 1 }}>{e.allocateQty ? e.allocateQty :'-'}</p>
                                            </div>
                                           
                                        </div>
                                    ))}
                               </>
                            ) : ("")}
                             {trimStockData && trimStockData.length > 0 ? (
                                <>                                    
                                <h3 style={{ fontFamily: 'initial',textAlign:'left' ,marginBottom:-5}}>&#129525;Trim</h3>
                                    <hr></hr>
                                    <div style={{ flexDirection: "row", display: "flex" }}>
                                    <p style={{ fontSize: 15, flex: 1,fontWeight:'bolder' }}>Qr Code</p>
                                                <p style={{ fontSize: 15, flex: 1,fontWeight:'bolder' }}>Trim Code</p>
                                               <p style={{ fontSize: 15, flex: 1,fontWeight:'bolder' }}>Consumption</p>
                                                <p style={{ fontSize: 15, flex: 1,fontWeight:'bolder' }}>Location</p>
                                                <p style={{ fontSize: 15, flex: 1,fontWeight:'bolder' }}>Allocate Quantity</p>
                                            </div>
                                    {trimStockData.map((e) => (
                                        <div>
                                            <div style={{ flexDirection: "row", display: "flex" }}>
                                            <p style={{ fontSize: 15, flex: 1 }}>
                               <a> <QRCode
                                
                                    size={256}
                                    bgColor="lightgrey"
                                    style={{ height: "50px", maxWidth: "40%", width: "30%"}}
                                    value={`${e.itemCode? e.itemCode :'-'}`}
                                    viewBox={`0 0 356 356`}
                                    
                                />
                                
                                </a>
                                {/* <b style={{ height: "10px", maxWidth: "20%", width: "20%"}}>
                                {`${e.itemCode? e.itemCode :'-'}`}
                                </b> */}
                                </p>
                                                <p style={{ fontSize: 15, flex: 1 }}>{e.itemCode? e.itemCode :'-'}</p>
                                                <p style={{ fontSize: 15, flex: 1 }}>{e.consumption ? e.consumption : '-'}</p>
                                                <p style={{ fontSize: 15, flex: 1 }}>{e.location ? e.location :'-'}</p>
                                                <p style={{ fontSize: 15, flex: 1 }}>{e.allocateQty ? e.allocateQty :'-'}</p>

                                            </div>
                                           
                                        </div>
                                    ))}
                               </>
                            ) : ("")}
                           
                        {/* </div> */}

{/* 
                        <div style={{ flex: 1, padding: 5 }}>

                            {trimStockData && trimStockData.length > 0 ? (
                                <div >

                                    <h2 style={{ fontFamily: 'initial' }}>&#129525;Trim</h2>
                                    {trimStockData.map((e) => (
                                        <div>

                        <div style={{ flexDirection: "row", display: "flex" }}>
                                                <p style={{ fontSize: 15, flex: 1 }}><a style={{ color: 'purple', fontWeight: 'bolder'  }}>Trim Code: </a><b> {e.itemCode}</b></p>
                                                <p style={{ fontSize: 15, flex: 1 }}><a style={{ color: 'purple', fontWeight: 'bolder'  }}>Color: </a><b>{e.colour}</b></p>
                                                <p style={{ fontSize: 15, flex: 1 }}><a style={{ color: 'purple', fontWeight: 'bolder'  }}>Consumption: </a><b>{e.consumption}</b></p>


                                            </div>
                                            <div>
                                                <table className={'ta-b'} style={{ width: '100%' }}>
                                                    <tr>
                                                        <th className={'ta-b'}>Location</th>
                                                        <th className={'ta-b'}>Allocated Quantity</th>
                                                    </tr>
                                                    <tr>
                                                        <td className={'ta-b'}>{e.location}</td>
                                                        <td className={'ta-b'}>{e.allocateQty}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : ("")}
                        </div> */}

                    </div>
                ) : ('')}
                </div>
                </Card>
    )
                                    }
               export default PickListPrint;
