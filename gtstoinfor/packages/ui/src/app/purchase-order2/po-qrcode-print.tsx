import { RackIdReq, VendorIdReq } from "@project-management-system/shared-models";
import { PurchaseOrderservice, RackPositionService, RacksService } from "@project-management-system/shared-services";
import QRCode from "react-qr-code";
import { Alert, Button, Card, Col, Form, Input, Row, Select, message, Modal, } from 'antd'
import React, { useEffect, useState } from 'react'
import html2pdf from 'html2pdf.js';
import { getCssFromComponent } from "../sourcing-requisition/barcode-print";
import { PrinterOutlined } from "@ant-design/icons";
export  const PurchaseOrderQrCodePrint = ()=>{
    const [data, setData] = useState<any[]>([]);
    const [form] = Form.useForm();
    const [data2, setData2] = useState<any[]>([]);
    const service = new PurchaseOrderservice()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [row, setRow] = useState();
    const { Option } = Select;

    useEffect(() => {
      getdropDown()
    }, []);

    const getdropDown =() =>{
        service.getPAllPurchaseOrderData().then((res) =>{
            if(res.status){
                setData2(res.data)
            }
            else{
                setData2([])
            }
        })
    }
    const getData =(val) =>{
      const req = new VendorIdReq()
      req.poId = val
      console.log(val,'ooooooooooooo');
      
        service.QrByPoId (req).then((res) =>
            {
            if(res.status){
                setData(res.data)
            }
            else{
                setData([])
            }
        }
        )
    }
    const downloadAsPDF = () => {
        const element = document.getElementById('printme'); 
        const options = {
            margin: 10, // Adjust the margin as needed
            filename: 'Purchase order Qrs.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          };
          html2pdf(element, options);
      };
      const printOrder = () => {
        const divContents = document.getElementById('printme').innerHTML;
        const element = window.open('', '', 'height=700, width=1024');
        element.document.write(divContents);
        getCssFromComponent(document, element.document);
        element.document.close();
        element.print();
        element.close(); // to close window when click on cancel/Save
        setIsModalOpen(true); // model should be open
      };
    const onFinish = (data) =>{
 setIsModalOpen(true);
getData(data.poNumber)
    }
    const handleCancel = () => {
        setIsModalOpen(false);
      };
    
    const clearData =()=>{
        form.setFieldsValue('')
    }
    return(
        <>
        
         <Card title={<span>Purchase Order</span>} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
      
        <Form form={form} layout={'vertical'} name="control-hooks" onFinish={onFinish}>
          <Row gutter={12}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>
              <Form.Item label="PO Number" name="poNumber"
                rules={[
                  { required: true, message: 'Field is required' },
                  
                ]}
              >
                 <Select placeholder=" Select PO Number" >
                  {data2.map((option) => (
                    <Option key={option.purchaseOrderId} value={option.purchaseOrderId}>
                      {option.poNumber}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
           
            
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Get Report
              </Button>
              <Button htmlType="button" style={{ margin: '0 14px' }}
                onClick={clearData}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
        
      {isModalOpen ?
            <Modal
              className='print-docket-modal'
              width={'50%'}
              key={'modal' + Date.now()}
              style={{ top: 30, alignContent: 'right' }}
              visible={isModalOpen}
              title={<React.Fragment>
              </React.Fragment>}
              onCancel={handleCancel}
              footer={[

              ]}
            >
 <html>
            <body>
             <Card
            title="Purchase Order QR-codes Print"
            style={{ textAlign: "center" }}
            headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
            extra={
                <span style={{ color: "white" }}>
                    <Button onClick={printOrder} className='panel_button'><PrinterOutlined /> Print</Button> <Button className='panel_button' onClick={downloadAsPDF}>Download PDF</Button>
                </span>
            }
        >
            <div id="printme">
                {data && data.length>0 ? (
                    <>
                    {data.map((e)=>(
                <h4 style={{ display:'flex',flexDirection:'column',}}>
                               <a> <QRCode
                                
                                    size={256}
                                    bgColor="lightgrey"
                                    style={{ height: "60px", maxWidth: "60%", width: "50%",textAlign:'center' }}
                                    value={`${e.grn_item_no}`}
                                    viewBox={`0 0 356 356`}
                                    
                                />
                                </a>
                                <b style={{ height: "60px", maxWidth: "60%", width: "50%",textAlign:'center' }}>
                                {`${e.grn_item_no}`}
                                </b>
                                </h4>
                                ))}</>
                                ):('')}
                                </div>
                            </Card>

            </body>
        </html>
{/* <PickListPrint printOrder={printOrder} reqNo={row}/> */}
            </Modal> : ""}
    
       
        </>
    )
}
export default PurchaseOrderQrCodePrint



