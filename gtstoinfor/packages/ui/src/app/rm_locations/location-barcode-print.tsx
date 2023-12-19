import { RackIdReq } from "@project-management-system/shared-models";
import { RackPositionService, RacksService } from "@project-management-system/shared-services";
import QRCode from "react-qr-code";
import { Alert, Button, Card, Col, Form, Input, Row, Select, message, Modal, } from 'antd'
import React, { useEffect, useState } from 'react'
import html2pdf from 'html2pdf.js';
import { getCssFromComponent } from "../sourcing-requisition/barcode-print";
import { PrinterOutlined } from "@ant-design/icons";
export  const LocationQrCodePrint = ()=>{
    const [data, setData] = useState<any[]>([]);
    const service = new RackPositionService ()
    const [form] = Form.useForm();
    const [data2, setData2] = useState<any[]>([]);
    const racksService = new RacksService()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [row, setRow] = useState();
    const { Option } = Select;

    useEffect(() => {
        getRacks()
    }, []);

    const getRacks =() =>{
        racksService.getRacks().then((res) =>{
            console.log(res.data,'pppppp');
            if(res.status){
                setData2(res.data)
            }
            else{
                setData2([])
            }
        })
    }
    const getData =(val) =>{
        
        const req = new RackIdReq()
        req.rackId = val
        racksService.getRackPositionQrs (req).then((res) =>
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
            filename: 'locations-QrCodes.pdf',
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
    
    getData(data.rackCode)
    }
    const handleCancel = () => {
        setIsModalOpen(false);
      };
    
    const clearData =()=>{
        form.setFieldsValue('')
    }
    return(
        <>
        
         <Card title={<span>Locations QR Codes Print</span>} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
      
        <Form form={form} layout={'vertical'} name="control-hooks" onFinish={onFinish}>
          <Row gutter={12}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 3 }} xl={{ span: 2}}>
              <Form.Item label="Rack Code" name="rackCode"
                rules={[
                  { required: true, message: 'Field is required' },
                  
                ]}
              >
                 <Select placeholder=" Select Rack Code" >
                  {data2.map((option) => (
                    <Option key={option.rackId} value={option.rackId}>
                      {option.rackCode}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}  style={{paddingTop:'20px',paddingLeft:'20px'}}>

            <Button type="primary" htmlType="submit">
                Generate QR codes
              </Button>
            </Col>

          </Row>
          {/* <Row>
              <Button type="primary" htmlType="submit">
                Get Report
              </Button>
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
            title="Locations QR Codes Print"
            style={{ textAlign: "center" }}
            headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
            extra={
                <span style={{ color: "white" }}>
                    <Button onClick={printOrder} className='panel_button'><PrinterOutlined /> Print</Button> 
                </span>
            }
        >
            <div id="printme">
                {data && data.length>0 ? (
                    <>
                    {data.map((e)=>(
                <h4 style={{ display:'flex',flexDirection:'column',textAlign:'center'}}>
                               <a> 
                               <QRCode
                                    bgColor="lightgrey"
                                    style={{width:'4in',height:'1.5in',marginTop:"10px",pageBreakAfter:'always', textAlign:'center',alignItems:'center', }}
                                    value={`${e.position_code}`}
                                    viewBox={`0 0 356 356`}
                                    
                                />
                              <style>{`
        @page {
          size: 4in 2in; /* Set page size to 4x2 inches */
          margin: 0; /* Reset default margin */
        }

        body {
          margin: 0; /* Reset default margin */
        }`}</style>
                                </a>
                                <b style={{textAlign:'center',fontSize:"30px" }}>
                                {`${e.position_code}`}
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
export default LocationQrCodePrint



