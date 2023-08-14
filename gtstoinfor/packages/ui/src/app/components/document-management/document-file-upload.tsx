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
    {
      title: 'Upload DOcument',
      width:'80px',
      render:(text, rowData) =>{
      return <>
      <Form.Item name={`button${rowData.documentsListId}`}  style={{alignItems: 'center'}}>
          <Button name={`upload${rowData.documentsListId}`} style={{ marginRight: '10px' }} onClick={() =>{onFinish(rowData)}} disabled={btndisable}>
            Upload
          </Button>
        </Form.Item></>

      }
    },
    
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


  const onFinish = (data: any) => {
    console.log(data,'dataaaa')
    form.validateFields().then(res => {
      // console.log(res,'res')
    
    // data.file.forEach((file: any) => {
    //   req.file = ('file', file);
    // });
          if (data.file.fileList) {
            const formData = new FormData();
            formData.append('documentCategoryId', `${data.documentCategoryId}`);
            formData.append('roleId', `${data.roleId}`);
            formData.append('customerPo', `${data.poNumber}`);
            formData.append('orderId', `${data.orderId}`);
            console.log(fileList,'fileList')
             fileList.forEach((file: any) => {
              formData.append('file', file);
            });
              console.log(formData);
              const req = new DocumentsListRequest(data.documentsListId,data.documentCategoryId,1,data.poNumber,data.orderId,data.file.fileList)
              console.log(req,'req')
              service.DocumentFileUpload(req).then((res) => {
                if(res.status){
                  console.log(res);
                  getDocData(form.getFieldValue("customerPo"));
                  message.success(res.internalMessage)
                }
                else{
                  AlertMessages.getSuccessMessage("Something went wrong");
                }
              })
          }
          AlertMessages.getSuccessMessage(res.internalMessage);
    })

  }

  return(
    <div >
      <Form form={form}  layout='vertical' name="control-hooks" onFinish={onFinish}>
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
        <UploadView form={form} docData={docData} formData={onFinish} fileList={setFilelist}/>
      </Form>
    </div>
  // <Card title='Document Upload'>
    
  //   <Form form={form}  layout='vertical' name="control-hooks" onFinish={onFinish}>
  //     <Row gutter={24}>
  //     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
  //         <Form.Item name='customerPo' label='Po Number'
  //           rules={[
  //             {
  //               required: true,
  //               message: 'Select Destination',

  //             }
  //           ]}
  //         >
  //           <Select placeholder='Select PoNumber' onChange={getDocData} showSearch allowClear>
  //           {poNumber?.map(obj =>{
  //                     return <Option key={obj.poNumber} value={obj.poNumber}>{obj.poNumber}</Option>
  //                   })}
  //           </Select>
  //         </Form.Item>
  //       </Col>
  //     </Row>
  //     <Row>
  //     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 24 }}>
  //        <Card>
  //        <Table 
  //         rowKey={record => record.documentListId}
  //         columns={columns}
  //         dataSource={docData} 
  //         size='small'
  //         pagination={{
  //           onChange(current) {
  //           }
  //         }}
  //         bordered
  //         />
  //         </Card>
  //       </Col>
        
  //     </Row>
  //     {/* <Modal width={1000}  centered  open={isModalOpen} onCancel={handleCancel} footer={[]} >
  //       <Card title='Upload Document against Customer'>
  //         <Row gutter={24}>
  //         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span:6}}>
  //         <Form.Item name='file'>
  //         <Upload {...gstUploadFieldProps} 
  //             accept='.jpeg,.pdf,.png,.jpg'>
  //             <Button style={{ color: "black", backgroundColor: "#7ec1ff" }} icon={<UploadOutlined />}>Upload File</Button>
  //             <br/><Typography.Text type="secondary">
  //                 (Supported formats pdf,jpeg,jpg,png)
  //             </Typography.Text>
  //             </Upload>
  //           </Form.Item>
  //           </Col>
  //           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span:2 }}>
  //             <Form.Item>
  //             <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
  //                                   Submit
  //                               </Button>
  //               <Button type='primary' htmlType="submit">Upload</Button>
  //             </Form.Item>
  //           </Col>
  //           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span:2 }}>
  //           <Form.Item>
  //               <Button type='default' onClick={handleCancel}>Cancel</Button>
  //             </Form.Item>
  //             </Col>
             
  //         </Row>
          
  //       </Card>
          
  //       </Modal> */}
  //   </Form> 

     
  // </Card>

  )
}