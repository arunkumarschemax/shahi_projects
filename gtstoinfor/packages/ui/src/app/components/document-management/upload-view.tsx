import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Descriptions, Divider, Form, Input, message, Modal, Row, Select, Spin, Table, Tag, Typography, Upload, UploadProps,FormInstance, Radio } from 'antd';
import { OrdersService, UploadDocumentService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
// import AlertMessages from '../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ArrowDownOutlined, DownloadOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { AlertMessages, DocumentsListRequest, FileStatusReq, UploadDocumentListDto } from '@project-management-system/shared-models';
import { useForm } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';

const { Title, Text } = Typography;

export interface UploadViewProps {
    form: FormInstance<any>
    docData: any;
    formData: (value: any, filesList:any[]) => void;
    fileList: (value: any[]) => void;
    setStatusVal:any ///////////renu
}


const UploadView = (props: UploadViewProps) => {
  console.log(props.fileList,'props.doctdataaaaaaaaaaaaaaaaaaaaa')

  const initialFileList = [
    {
        uid: 'file-1',
        name: 'example.pdf',
        status: 'done', // 'done', 'uploading', 'error'
    },
    {
        uid: 'file-2',
        name: 'image.jpg',
        status: 'done',
    },
    // ... other files
];
  const [loading, setLoading] = useState(true);
  const [fileList,setFilelist] = useState<any[]>([]);
  const [btndisable, setBtnDisable] = useState<boolean>(true);
  const [statusval,setStatusVal] = useState(String)



    useEffect(() =>{
        setLoading(false);
        console.log(props.docData.status)
        // setFilelist([])
    },[props.docData])

// props.statusvalue(statusval)
    // console.log( props.statusvalue)
  const download = (data: any) => {
    console.log("data");
    console.log(data);  

  }
  console.log(props.docData)

  const upload = (data: any) => {
    console.log(data);
// console.log(data.documentsListId);
    // console.log(props.form.getFieldsValue())
    let file = props.form.getFieldValue(`${data.documentsListId}`);
// console.log(props.form.getFieldValue(`${data.documentsListId}`));
    data.file = file;
    console.log(file);
    console.log(fileList);
    props.formData(data,fileList);
    props.fileList(fileList);
  }
  const handleRemoveFile = (fileToRemove) => {
    const updatedFileList = fileList.filter(file => file.uid !== fileToRemove.uid);
    setFilelist(updatedFileList);
};
    
  const CustomUploadList = ({ fileList, handleRemoveFile }) => {
    console.log(fileList)
    return (
        <div>
            <h3>Uploaded Files:</h3>
            <ul>
                {initialFileList.map(file => (
                    <li key={file.uid}>
                        <span>{file.name}</span>
                        {/* <Button onClick={() => handleRemoveFile(file)}>Remove</Button> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};
    const gstUploadFieldProps: UploadProps = {
        multiple: true,
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
                    console.log("*****************************")
                    console.log(fileList)
                    console.log([...fileList, file])
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
  //   const handleRemoveFile = (fileToRemove) => {
  //     const updatedFileList = fileList.filter(file => file.uid !== fileToRemove.uid);
  //     setFilelist(updatedFileList);
  // };
    const handleUpload = (documentsListId, info) => {
      // console.log(info);
      // {...gstUploadFieldProps}
      // Handle the file upload for the specific documentListId
      // You can use the 'documentListId' to identify which row is being interacted with
    };

    const handleStatusChange = (value) => {
      console.log(value)
      // console.log(value.target.value); 
      setStatusVal(value.target.value)
    };
    return(
         <Col xs={24} sm={12} md={8} lg={6} xl={6} key={props.docData.documentsListId}>
      <Card
          bordered={true}
          style={{
          marginBottom: 16,
          borderRadius: 8,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          background: '#fff',
          borderTop: '1px solid #e8e8e8',
          }}
      >
          <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}> 
              <Tag color="royalblue" style={{ fontSize: '15px', marginBottom: '5px' }}>{props.docData.fileName}</Tag>
          </Text>
          <br />
          <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}> 
              <Form.Item name={props.docData.documentsListId} initialValue={props.docData.documentsPath}>
              <CustomUploadList fileList={fileList} handleRemoveFile={handleRemoveFile} />
                  <Upload 
                      key={props.docData.documentsListId}
                      name={`uploadFile${props.docData.documentsListId}`}
                      {...gstUploadFieldProps}
                      accept=".jpeg,.pdf,.png,.jpg"
                      onChange={(info) => handleUpload(props.docData.documentsListId, info)}
                  >
                      <Button
                      key={props.docData.documentsListId}
                      style={{ color: 'black', backgroundColor: '#7ec1ff' }}
                      icon={<UploadOutlined />}
                      >
                      Choose File
                      </Button>
                      <br />
                      <Typography.Text type="secondary">
                      (Supported formats pdf, jpeg, jpg, png)
                      </Typography.Text>
                  </Upload>
              </Form.Item>
          </Text>
          <Radio.Group defaultValue={props.docData.docStatus} buttonStyle="solid" onChange={handleStatusChange}>
          <Radio.Button value="partially uploaded">parially</Radio.Button>
          <Radio.Button value="fully uploaded">fully</Radio.Button>
        </Radio.Group>
  
        <br />
          <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
            <Button type='primary' icon={<UploadOutlined/>} onClick={() => upload(props.docData)} disabled={btndisable}>Upload</Button>
          </Text>
          <br />
          <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
          {props.docData.uploadStatus === 1 ?
            <Button onClick={() => download(props.docData)} disabled={props.docData.uploadStatus === 1 ? false : true } style={{ color: "white", backgroundColor: props.docData.uploadStatus === 1 ? 'green' : "#806767", width:'100%' }} icon={<DownloadOutlined />} >Download Document</Button>
            :""}
          </Text>
          <br />
          
      </Card>
      </Col>
     
    )
}

export default UploadView;