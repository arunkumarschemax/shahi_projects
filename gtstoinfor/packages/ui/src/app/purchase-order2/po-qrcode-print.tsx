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
        service.getAllPos().then((res) =>{
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
        
         <Card title={<span>Role QR-codes Print</span>} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
      
        <Form form={form} layout={'vertical'} name="control-hooks" onFinish={onFinish}>
          <Row gutter={12}>
            <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }}>
              <Form.Item label="PO Number" name="poNumber"
                rules={[
                  { required: true, message: 'Field is required' },
                  
                ]}
              >
                 <Select placeholder=" Select PO Number" >
                  {data2.map((option) => (
                    <Option key={option.purchase_order_id} value={option.purchase_order_id}>
                      {option.po_number}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 8 }} xl={{ span: 6 }}  style={{paddingTop:'18px'}}>
              <Button type="primary" htmlType="submit">
                Generate QR codes
              </Button>
              </Col>
          </Row>
          {/* <Row>
            
              <Button htmlType="button" style={{ margin: '0 14px' }}
                onClick={clearData}
              >
                Reset
              </Button>
            
          </Row> */}
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
            title="Role QR-codes Print"
            style={{ textAlign: "center" }}
            headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
            extra={
                <span style={{ color: "white" }}>
                    <Button onClick={printOrder} className='panel_button'><PrinterOutlined /> Print</Button> 
                </span>
            }
        >
            <div id="printme" style={{marginTop:30}} >
                {data && data.length>0 ? (
                    <>
                    {data?.map((e)=>(
                        <>
                                   
                  <h4 style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <div style={{ flexDirection: "row", display: "flex",textAlign:'left'}}>
                <div style={{flex:1,padding:8}}>
                        <div style={{ marginLeft: -100 }}>
                          <QRCode
                            bgColor="lightgrey"
                            style={{ width: '4in', height: '1.4in', marginTop: "8px", pageBreakAfter: 'always', textAlign: 'left' }}
                            value={`${e?.grn_item_no}`}
                            viewBox={`356 356 0 0`} />
                          <style>{`
 @page {
   size: 4in 2in; /* Set page size to 4x2 inches */
   margin: 0; /* Reset default margin */
 }

 body {
   margin: 0; /* Reset default margin */
 }`}</style>
                        </div>
                        <div style={{ textAlign: 'left', fontSize: "20px", marginLeft: 10,}}>
                          {`${e?.grn_item_no}`}
                        </div>
                        </div>
                      <div style={{flex:1,margin:5}}>
                    <p style={{ color: 'green',textAlign: 'left',marginLeft:-100,padding:1}}>Invoice No : </p>
                    <p style={{textAlign: 'left',marginLeft:-100,fontSize:'10px',padding:1}}>{e.invoice_no}</p>
                    <p style={{ color: 'green',textAlign: 'left',marginLeft:-100,padding:1}}>Type : </p>
                    <p style={{ textAlign: 'left',marginLeft:-100,fontSize:'10px',padding:1}}>{e.item_type}</p>
                    <p style={{ color: 'green',textAlign: 'left',marginLeft:-100,padding:1}}>Item : </p>
                    <p style={{textAlign: 'left',marginLeft:-100,fontSize:'10px',padding:1}}>{e.itemCode}</p>

                    </div>
                      </div>
                      </h4>
                    
                      </>
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



