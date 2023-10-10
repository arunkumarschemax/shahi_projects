import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Descriptions, Divider, Form, Input, message, Modal, Row, Select, Spin, Table, Tag, Typography, Upload, UploadProps } from 'antd';
import { OrdersService, UploadDocumentService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
// import AlertMessages from '../common/common-functions/alert-messages';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ArrowDownOutlined, DownloadOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { AlertMessages, DocumentsListRequest, FileStatusReq, UploadDocumentListDto } from '@project-management-system/shared-models';
import { useForm } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import UploadView from './upload-view';
import { saveAs } from 'file-saver';
import axios, { AxiosRequestConfig } from 'axios';
import { PDFDocument } from 'pdf-lib';
import PdfMergeDownload from './merge-pdf';
const { Title, Text } = Typography;

export default function DocumentListupload() {
  const [poNumber,setPoNumber] = useState<any[]>([])
  const [destinations,setDestinations] = useState<any[]>([])
  const [invoiceNumber,setInvoiceNumber] = useState<any[]>([])
  const [challanNumber,setChallanNumber] = useState<any[]>([])
  const [orderId,setOrderId] = useState<number>(0)
  const [docData,setDocData] = useState<any[]>([])
  const [urls,setUrls] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [page, setPage] = React.useState(1);
  const [fileList,setFilelist] = useState<any[]>([]);
  const [btndisable, setBtnDisable] = useState<boolean>(true);
  const [hide,setHide] = useState<boolean>(false)
  const [statusval, setStatusVal]=useState('')
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const { Option } = Select;
  let location = useLocation();
  const statePoNumber: any = location.state;
  const service = new UploadDocumentService

// console.log(statePoNumber.data,'statePoNumber')
  const getPoNumber =()=>{
    service.getPoNumberDropdown().then(res=>{
      if(res.status){
        setPoNumber(res.data)
      }else{
        setPoNumber([])
      }
    })
  }

  const getInvoiceNumber =(value)=>{
    // setBtnDisable(false)

    // let po
    // form.resetFields(['invoice','challan'])
    // // if(statePoNumber){
    // //   po =statePoNumber.data
    // // }else{
    // //   po = form.getFieldValue("customerPo")
    // // }
    // service.getInvoiceByPo({role:JSON.parse(localStorage.getItem('currentUser')).user.roles,customerPo:value}).then(res=>{
    //   if(res.status){
    //     setInvoiceNumber(res.data)
    //   }else{
    //     setInvoiceNumber([])
    //   }
    // })
  }

  const getChallanNo =()=>{
    form.resetFields(['challan'])
    let invoiceNo = form.getFieldValue("invoice")
    let po = form.getFieldValue("customerPo")
    service.getChallanByPOandInvoice({role:JSON.parse(localStorage.getItem('currentUser')).user.roles,customerPo:po,invoice:invoiceNo}).then(res=>{
      if(res.status){
        setOrderId(res.data[0].orderId)
        setChallanNumber(res.data)
      }else{
        setChallanNumber([])
      }
    })
  }
  const destinationChange = () => {
    let dest = form.getFieldValue("destination");
    console.log(destinations.find((rec) => rec.destination === dest).orderId);
    form.setFieldValue("orderId", destinations.find((rec) => rec.destination === dest).orderId)
  }
  const getDestinations =(value)=>{
    console.log("IIIIIIIIIIIIIIIIIIIIIIII")
    // setBtnDisable(false)
    form.resetFields(['challan'])
    let po = form.getFieldValue("customerPo")
    service.getDestinationsByPO({role:JSON.parse(localStorage.getItem('currentUser')).user.roles,customerPo:po}).then(res=>{
      console.log(res);
      if(res.status){
        console.log(res.data)
        setDestinations(res.data)
        // setBtnDisable(true)
      }else{
        setDestinations([])
      }
    })
  }
  const getDocData =()=>{
    console.log("hhhhhhh")
    let invoiceNo = form.getFieldValue("invoice")
    let challan = form.getFieldValue("challan")
    let po = form.getFieldValue("customerPo")
    let oderId = form.getFieldValue("orderId")

    // console.log(invoiceNo)
    // console.log(challan)
    // console.log(po)
    console.log(oderId)


    service.getDocumentDetailsByPO({role:JSON.parse(localStorage.getItem('currentUser')).user.roles,customerPo:po,challan:"",invoice:"",orderId:oderId}).then(res=>{
      if(res.status){
        setDocData(res.data)
        setUrls(res.dataa);
        setHide(true)
      }else{
        setDocData([])
        setUrls([]);
      }
    })
  }
  useEffect(() =>{
    getPoNumber();
  },[])

 useEffect(() =>{
  if(statePoNumber){
    console.log(statePoNumber)
    form.setFieldsValue({customerPo:statePoNumber.data})
    getDestinations(statePoNumber.data)
    form.setFieldsValue({destination:statePoNumber.dest})
    form.setFieldsValue({orderId:statePoNumber.orderId})

    // getInvoiceNumber(statePoNumber.data)
    // if(invoiceNumber.length == 1){
    //   form.setFieldsValue({invoice:})
    // }
    getDocData()
  }

 },[])
  const columns: ColumnProps<any>[] = [
    {
      title: "S.No",
      key: "sno",
      responsive: ["sm"],
      width:30,
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
      title: 'Document',
      dataIndex: 'documentName',
      width:120,
    },
    // {
    //   title: 'Upload',
    //   key: 'upload',
    //   render: (text, record) => (
    //     <Form.Item name={record.documentsListId}>
    //       <Upload
    //         name={`uploadFile${record.documentsListId}`}
    //         {...gstUploadFieldProps}
    //         accept=".jpeg,.pdf,.png,.jpg"
    //         onChange={(info) => handleUpload(record.documentsListId, info)}
    //       >
    //         <Button style={{ color: "black", backgroundColor: "#7ec1ff" }} icon={<UploadOutlined />}>Choose File</Button>
    //         <br />
    //         <Typography.Text type="secondary">
    //           (Supported formats pdf, jpeg, jpg, png)
    //         </Typography.Text>
    //       </Upload>
    //     </Form.Item>
    //   ),
    // },
    // {
    //   title: 'Upload DOcument',
    //   width:'80px',
    //   render:(text, rowData) =>{
    //   return <>
    //   <Form.Item name={`button${rowData.documentsListId}`}  style={{alignItems: 'center'}}>
    //       <Button name={`upload${rowData.documentsListId}`} style={{ marginRight: '10px' }} onClick={() =>{onFinish(rowData)}} disabled={btndisable}>
    //         Upload
    //       </Button>
    //     </Form.Item></>

    //   }
    // },
    
    {
        title: 'View/Download Document',
        dataIndex: 'fileName',
        width:150,
        render: (value,rowData) => (
          rowData.fileName!=null?
          <>
         <Tag icon={<ArrowDownOutlined 
        //  onClick={()=>download(rowData.filePath)}
         />} >{value}</Tag>
          </>:''
        ),
      },

];

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const onFinish = (data: any, filesList:any[]) => {
    // console.log(statusval,'statusval')
    console.log(data,'dataaaa')
    console.log(data.file,'fileeeeeeeeeeeeeeeee')

    console.log(filesList);

    form.validateFields().then(res => {
      if (filesList.length > 0) {
        const formData = new FormData();
        formData.append('documentsListId', `${data.documentsListId}`);
        formData.append('documentCategoryId', `${data.documentCategoryId}`);
        formData.append('poNumber', `${data.customerPo}`);
        formData.append('orderId', '1');
        formData.append('fileName', `${data.fileName}`);
        formData.append('filePath', `${data.filePath}`);
        formData.append('uploadStatus', `${data.uploadStatus}`);
        formData.append('status', `${statusval}`);
        formData.append('createdUser',`${JSON.parse(localStorage.getItem('currentUser')).user.roles}`)
        console.log(formData)
        // formData.append('uid',''\)
        const files = filesList;
        console.log(files);
        if (files) {
          for (let i = 0; i < files.length; i++) {
          console.log(files[i])
            formData.append('file', files[i]);
            formData.append('uid',files[i].uid)
          }
        }
        console.log(formData)
        service.DocumentFileUpload(formData).then((res) => {
          if(res.status){
            getDocData();
            message.success(res.internalMessage)
            setFilelist([])
          }
          else{
            AlertMessages.getSuccessMessage("Something went wrong");
          }
        })
      }

    // data.file.forEach((file: any) => {
    //   req.file = ('file', file);
    // });
          // if (data.file.fileList) {
          //   const formData = new FormData();
          //   formData.append('documentCategoryId', `${data.documentCategoryId}`);
          //   formData.append('roleId', `1`);
          //   formData.append('customerPo', `${data.poNumber}`);
          //   formData.append('orderId', `1`);
          //   console.log(fileList,'fileList')
          //    data.file.fileList.forEach((file: any) => {
          //     formData.append('file', file);
          //   });
          //     console.log(formData);
          //     const req = new DocumentsListRequest(data.documentsListId,data.documentCategoryId,1,data.poNumber,data.orderId,data.file)
          //     console.log(req,'req')
          //     service.DocumentFileUpload(req).then((res) => {
          //       if(res.status){
          //         console.log(res);
          //         getDocData(form.getFieldValue("customerPo"));
          //         message.success(res.internalMessage)
          //       }
          //       else{
          //         AlertMessages.getSuccessMessage("Something went wrong");
          //       }
          //     })
          // }
          // AlertMessages.getSuccessMessage(res.internalMessage);
    })

  }

  const fetchPdfBytesArrayWithAxios = async (pdfUrls) => {
    try {
      const pdfPromises = pdfUrls.map(async (res, index) => {
        console.log(res);
        // if(index != 0){
          const response = await axios.get(res, {
            responseType: 'arraybuffer',
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          });
          return response.data;
        // }
      });
  
      const pdfBytesArray = await Promise.all(pdfPromises);
      return pdfBytesArray;
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      throw error; // Rethrow the error to handle it further
    }
  };
  const mergeAndDownloadPDFs = async (pathsData:any[]) => {
    try {
      console.log(pathsData.length)
      if(Number(pathsData.length) > 0){

        console.log(pathsData);
        // Load the initial PDF file (you need to provide a valid URL)
        const initialPdfUrl = pathsData[0];
        // 'http://localhost:8002/PO-468219-5672/Material preparation-51092.pdf';
    
        const initialPdfResponse = await axios.request({
          url: initialPdfUrl,
          method: 'get',
          responseType: 'arraybuffer',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
        const initialPdfBytes = initialPdfResponse.data;
        console.log('*&*&*&', initialPdfBytes)
    
        // Load additional PDFs from URLs (you need to provide valid PDF URLs)
        const pdfUrls = [
          'http://localhost:8002/PO-468219-5672/Material preparation-51092.pdf',
        ];
        // const pdfBytesArray = await Promise.all(pdfUrls.map(async (url) => {
        //   const response = await fetch(url, { mode: 'no-cors' });
        //   if (!response.ok) {
        //     throw new Error(`Failed to fetch ${url}`);
        //   }
        //   return response.arrayBuffer();
        // }));
        const pdfBytesArray = await fetchPdfBytesArrayWithAxios(pathsData)
    
    
        // Create a new PDF document
        const mergedPdf = await PDFDocument.create();
    
        // Add the pages from the initial PDF
        // const initialPdfDoc = await PDFDocument.load(initialPdfBytes);
        // const initialPages = await mergedPdf.copyPages(initialPdfDoc, initialPdfDoc.getPageIndices());
        // initialPages.forEach((page) => mergedPdf.addPage(page));
    
        // Loop through each PDF and add its pages to the merged PDF
          for (const pdfBytes of pdfBytesArray) {
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            pages.forEach((page) => mergedPdf.addPage(page));
          }
      
          // Save the merged PDF as a blob
          const mergedPdfBytes = await mergedPdf.save();
      
          // Create a Blob and trigger a download
          const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
          saveAs(blob, 'PO-'+docData[0].customerPo+'.pdf');
      }
      else{
        // AlertMessages.getInfoMessage("Download access disabled. ");
        alert("Download access disabled. ")
        // console.log('test');
      }
    } catch (error) {
      AlertMessages.getInfoMessage("No Document found. ");
      alert("No Document found. ")
      // console.error('Error merging and downloading PDFs:', error);
    }
  };
  const download = (data: any) => {
    console.log(data);
    mergeAndDownloadPDFs(data)
  };


  const setStatus =(value) =>{
    console.log(value)
    setStatusVal(value)
  }
  const challanaOnchange=() =>{
    // setBtnDisable(false)
  }
  return(
    <Card title="Document management" headStyle={{ backgroundColor: '#77dfec', border: 0 }} extra={<span><Button onClick={() => navigate('/document-management/upload-file-view')} type={'primary'}>View Documents Status</Button></span>}>
      <Form form={form}  layout='vertical' name="control-hooks" >
       <Row gutter={24}>
       <Form.Item name='orderId' style={{display:'none'}}>
             <Input name='orderId' />
           </Form.Item>
       
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
           <Form.Item name='customerPo' label='Po Number'
             rules={[
               {
                 required: true,
                 message: 'Select PO Number',

               }
             ]}
           >
             <Select placeholder='Select PoNumber' onChange={getDestinations} showSearch allowClear>
             {poNumber?.map(obj =>{
                       return <Option key={obj.poNumber} value={obj.poNumber}>{obj.poNumber}</Option>
                     })}
             </Select>
           </Form.Item>
         </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
           <Form.Item name='destination' label='Destination'
             rules={[
               {
                 required: true,
                 message: 'Select Destination',

               }
             ]}
           >
             <Select placeholder='Select Destination' onChange={destinationChange} showSearch allowClear>
             {destinations?.map(obj =>{
                       return <Option key={obj.destination} value={obj.destination}>{obj.destination}</Option>
                     })}
             </Select>
           </Form.Item>
         </Col>
         {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
           <Form.Item name='invoice' label='Invoice Number'
             rules={[
               {
                 required: true,
                 message: 'Select Invoice Number',

               }
             ]}
           >
             <Select placeholder='Select InvoiceNumber' onChange={getChallanNo} showSearch allowClear>
             {invoiceNumber?.map(obj =>{
                       return <Option key={obj.invoice} value={obj.invoice}>{obj.invoice}</Option>
                     })}
             </Select>
           </Form.Item>
         </Col> */}
         {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
           <Form.Item name='challan' label='Challan Number'
             rules={[
               {
                 required: true,
                 message: 'Select Challan Number',

               }
             ]}
           >
             <Select placeholder='Select ChallanNumber' showSearch allowClear onChange={challanaOnchange}>
             {challanNumber?.map(obj =>{
                       return <Option key={obj.challan} value={obj.challan}>{obj.challan}</Option>
                     })}
             </Select>
           </Form.Item>
         </Col> */}
         <Col span={5} style={{paddingTop:'30px', marginRight:'10px'}}>
              <Button onClick={getDocData}
                  style={{
                    color: 'white',
                    backgroundColor: 'green',
                    width: '110%',
                  }}
                  // disabled={btndisable}
                  icon={<DownloadOutlined />}
                >
                  Get Documents
                </Button>
            </Col> 
         {
          !hide ? "" :
            <Col span={5} style={{paddingTop:'30px'}}>
              <Button onClick={() => download(urls)}
                  style={{
                    color: 'white',
                    backgroundColor: 'green',
                    width: '109%',
                  }}
                  icon={<DownloadOutlined />}
                >
                  Merge & Download Documents
                </Button>
            </Col> 
          }     
      </Row>
      {docData?.length > 0 ? 
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Card
          size="small"
          title="Document Upload"
          bordered={true}
          style={{
            width: '100%',
            marginBottom: 16,
            borderRadius: 8,
            borderTop: '1px solid #e8e8e8',
            backgroundColor:'#77dfec'
          }}
        >
          <Row gutter={24}>
            {docData?.length > 0 ? (
              docData?.map((response) => (
                <UploadView form={form} docData={response} formData={onFinish} fileList={setFilelist} urls ={urls} 
                setStatus={setStatus} getDocuments={getDocData}
                />
              ))
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>No Data Found</div>

              // <>No Data Found<Alert
              //         message="No Data Found"
              //         type="warning"
              //         showIcon
              //         style={{ width: "150px", margin: "auto" }} /></>
            )}
          </Row>
        </Card>
      </div>
    :""}
      </Form>
  </Card>

  )
}