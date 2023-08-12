import { useEffect, useState } from 'react';
import { Button, Card, Col, Descriptions, Divider, Form, Input, message, Modal, Row, Select, Table, Tag, Typography, Upload, UploadProps } from 'antd';
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


export default function DocumentListupload() {
  const [poNumber,setPoNumber] = useState<any[]>([])
  const [docData,setDocData] = useState<any[]>([])
  const [fileList,setFilelist] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [btndisable, setBtnDisable] = useState<boolean>(true);
  const [page, setPage] = React.useState(1);

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
  const DocumentData =()=>{
    service.getAllDocumentDetails().then(res=>{
      if(res.status){
        setDocData(res.data)
      }else{
        setDocData([])
      }
    })
  }
  useEffect(() =>{
    getPoNumber();
    DocumentData();
  },[])

  const gstUploadFieldProps: UploadProps = {
    multiple: false,
    onRemove: (file: any) => {
        setFilelist([]);
        // uploadFileList([]);
    },
    beforeUpload: (file: any) => {
        if (!file.name.match(/\.(pdf|jpg|jpeg|png)$/)) {
            message.error("Only pdf and image files are allowed!");
            return true;
        }
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = data => {  
                setFilelist([...fileList, file]);
                setBtnDisable(false)
                // uploadFileList([...filelist, file]);
                return false;
        };
        return false;
    },
    progress: {
        strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
        },
        strokeWidth: 3,
        format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
    },
    fileList: fileList

};
  const columns: ColumnsType<any> = [
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
    {
      title: 'Choose Document',
      width:'220',
      render:(text, data,) =>{
      return <><Form.Item name={'file'} > 
        <Upload {...gstUploadFieldProps} 
          accept='.jpeg,.pdf,.png,.jpg'>
          <Button style={{ color: "black", backgroundColor: "#7ec1ff" }} icon={<UploadOutlined />}>Choose File</Button>
          <br /><Typography.Text type="secondary">
            (Supported formats pdf,jpeg,jpg,png)
          </Typography.Text>
        </Upload>
      </Form.Item>
      </>

      }
    },
    {
      title: 'Upload DOcument',
      width:'80px',
      render:(text, rowData) =>{
      return <>
      <Form.Item style={{alignItems: 'center'}}>

          <Button style={{ marginRight: '10px' }} onClick={() =>{onFinish(rowData)}} disabled={btndisable}>
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
      console.log(res)
    const req = new DocumentsListRequest( data.documentCategoryId,data.roleId,res.customerPo?res.customerPo:'',data.orderId,res.file.fileList)
console.log(req,'req')
      service.createDocumentsList(req).then((res) => {
        if(res.status){
          console.log(res);
          console.log(fileList);
          if (fileList.length > 0) {
            setBtnDisable(false)
            const formData = new FormData();
            formData.append('documentCategoryId', `${res.data[0].documentCategoryId}`);
            formData.append('roleId', `${res.data[0].roleId}`);
            formData.append('customerPo', `${res.data[0].customerPo}`);
            formData.append('orderId', `${res.data[0].orderId}`);
            res.data.forEach((value) => {
              formData.append('documentsListId', `${value.documentsListId}`);
            })

             fileList.forEach((file: any) => {
              formData.append('file', file);
            });
              console.log(formData);
              service.DocumentFileUpload(formData).then((res) => {
                console.log(res);
                setFilelist([])
                form.resetFields(['poNumber'])
                DocumentData();
                
              })
          }
          AlertMessages.getSuccessMessage(res.internalMessage);
        } else {
          
            AlertMessages.getErrorMessage(res.internalMessage);
        }
      }).catch((err) => {
        AlertMessages.getErrorMessage(err.message);
      });
    })

  }

  return(
  <Card title='Document Upload'>
    <Form form={form} layout='vertical' onFinish={onFinish}>
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
            <Select placeholder='Select PoNumber' showSearch allowClear>
            {poNumber?.map(obj =>{
                      return <Option key={obj.poNumber} value={obj.poNumber}>{obj.poNumber}</Option>
                    })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 24 }}>
         <Card>
         <Table columns={columns}
          dataSource={docData} 
         rowKey={record => record.id}
          size='small'
          pagination={{
            onChange(current) {
            }
          }}
          bordered
          />
          </Card>
        </Col>
        
      </Row>
      <Modal width={1000}  centered  open={isModalOpen} onCancel={handleCancel} footer={[]} >
        <Card title='Upload Document against Customer'>
          <Row gutter={24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span:6}}>
          {/* <Form.Item name='file'>
          <Upload {...gstUploadFieldProps} 
              accept='.jpeg,.pdf,.png,.jpg'>
              <Button style={{ color: "black", backgroundColor: "#7ec1ff" }} icon={<UploadOutlined />}>Upload File</Button>
              <br/><Typography.Text type="secondary">
                  (Supported formats pdf,jpeg,jpg,png)
              </Typography.Text>
              </Upload>
            </Form.Item> */}
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span:2 }}>
              <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                    Submit
                                </Button>
                {/* <Button type='primary' htmlType="submit">Upload</Button> */}
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span:2 }}>
            <Form.Item>
                <Button type='default' onClick={handleCancel}>Cancel</Button>
              </Form.Item>
              </Col>
             
          </Row>
          
        </Card>
          
        </Modal>
    </Form> 

     
  </Card>

  )
}