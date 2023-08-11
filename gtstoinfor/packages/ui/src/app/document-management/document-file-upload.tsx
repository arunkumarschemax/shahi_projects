import { useEffect, useState } from 'react';
import { Button, Card, Col, Descriptions, Divider, Form, Input, message, Modal, Row, Select, Table, Typography, Upload, UploadProps } from 'antd';
import { OrdersService, UploadDocumentService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import AlertMessages from '../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { DocumentsListRequest, FileStatusReq, UploadDocumentListDto } from '@project-management-system/shared-models';
import { useForm } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table';


export default function DocumentListupload() {
  const [poNumber,setPoNumber] = useState<any[]>([])
  const [docData,setDocData] = useState<any[]>([])
  const [fileList,setFilelist] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
const onClick =()=>{
  setIsModalOpen(true)
}

  const columns: ColumnsType<any> = [
    {
      title: "S.No",
      key: "sno",
      responsive: ["sm"],
      width:30,
    },
    {
      title: 'Document',
      dataIndex: 'documentName',
      width:120,
    },
    {
      title: 'UpLoad Document',
      render:() =>{
      return <><Form.Item name='file'>
        <Upload {...gstUploadFieldProps}
          accept='.jpeg,.pdf,.png,.jpg'>
          <Button style={{ color: "black", backgroundColor: "#7ec1ff" }} icon={<UploadOutlined />}>Upload File</Button>
          <br /><Typography.Text type="secondary">
            (Supported formats pdf,jpeg,jpg,png)
          </Typography.Text>
        </Upload>
      </Form.Item>
      <Divider/>
      <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
            Upload
          </Button>
        </Form.Item></>

      }
    },
    
    {
        title: 'View/Download Document',
        dataIndex: 'sourceName',
        width:250,
      },

];

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const onFinish = (data: DocumentsListRequest) => {
    console.log('dataaaa')
    // setFieldsData(values);
    form.validateFields().then(res => {
      data.documentCategoryId=1
      data.roleId=1
      data.customerPo=form.getFieldValue('poNumber')
      data.orderId=1
      data.file= res.file.fileList;
      service.createDocumentsList(data).then((res) => {
        if(res.status){
          console.log(res.data);
          console.log(fileList);
          if (fileList.length > 0) {
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
                // if(res.status){
                //   saleOrderService.updateDocumentStatus({saleOrderId:fieldsData.saleOrderId,plantId:plantId,documentName:fieldsData.documentCategory}).then((res) => {
                //     if(res.status){
                //       AlertMessages.getSuccessMessage(res.internalMessage);
                //     }
                //   })
                // }
                // else{
                //   AlertMessages.getErrorMessage(res.internalMessage);
                // }
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
          <Form.Item name='poNumber' label='Po Number'>
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