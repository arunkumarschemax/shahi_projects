import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Descriptions, Divider, Form, Input, message, Modal, Row, Select, Spin, Table, Tag, Typography, Upload, UploadProps } from 'antd';
import { OrdersService, UploadDocumentService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
// import AlertMessages from '../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ArrowDownOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { AlertMessages, DocumentsListRequest, FileStatusReq, UploadDocumentListDto } from '@project-management-system/shared-models';
import { useForm } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import UploadView from './upload-view';

const { Title, Text } = Typography;

export default function DocumentListupload() {
  const [poNumber,setPoNumber] = useState<any[]>([])
  const [docData,setDocData] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [page, setPage] = React.useState(1);
  const [fileList,setFilelist] = useState<any[]>([]);
  const [btndisable, setBtnDisable] = useState<boolean>(true);

  let navigate = useNavigate();
  const [form] = Form.useForm();
  const { Option } = Select;
  const service = new UploadDocumentService

  const getPoNumber =()=>{
    service.getPoNumberDropdown().then(res=>{
      if(res.status){
        setPoNumber(res.data)
      }else{
        setPoNumber([])
      }
    })
  }
  const getDocData =(value)=>{
    service.getDocumentDetailsByPO({roleId:1,customerPo:value}).then(res=>{
      if(res.status){
        setDocData(res.data)
      }else{
        setDocData([])
      }
    })
  }
  useEffect(() =>{
    getPoNumber();
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
    console.log(filesList,'dataaaa')
    console.log(data.file);
    // console.log(data.file.fileList);

    form.validateFields().then(res => {
      if (data.file.fileList.length > 0) {
        const formData = new FormData();
        formData.append('documentsListId', `${data.documentsListId}`);
        formData.append('documentCategoryId', `${data.documentCategoryId}`);
        formData.append('poNumber', `${data.poNumber}`);
        formData.append('orderId', '1');
        formData.append('fileName', `${data.fileName}`);
        formData.append('filePath', `${data.filePath}`);
        formData.append('uploadStatus', `${data.uploadStatus}`);
        const files = filesList;
        if (files) {
          for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
          }
        }
        console.log(formData)
        service.DocumentFileUpload(formData).then((res) => {
          if(res.status){
            getDocData(form.getFieldValue("customerPo"));
            message.success(res.internalMessage)
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

  return(
    <Card title="Document management" extra={<span><Button onClick={() => navigate('/document-management/upload-file-view')} type={'primary'}>View Document Status</Button></span>}>
      <Form form={form}  layout='vertical' name="control-hooks" >
       <Row gutter={24}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
           <Form.Item name='customerPo' label='Po Number'
             rules={[
               {
                 required: true,
                 message: 'Select Destination',

               }
             ]}
           >
             <Select placeholder='Select PoNumber' onChange={getDocData} showSearch allowClear>
             {poNumber?.map(obj =>{
                       return <Option key={obj.poNumber} value={obj.poNumber}>{obj.poNumber}</Option>
                     })}
             </Select>
           </Form.Item>
         </Col>
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
          }}
        >
          <Row gutter={24}>
            {docData?.length > 0 ? (
              docData?.map((response) => (
                <UploadView form={form} docData={response} formData={onFinish} fileList={setFilelist}/>
              ))
            ) : (
              <Alert
                message="No Data Found"
                type="warning"
                showIcon
                style={{ width: "150px", margin: "auto" }}
              />
            )}
          </Row>
        </Card>
      </div>
    :""}
      </Form>
  </Card>

  )
}