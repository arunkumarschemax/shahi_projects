import { useEffect, useState } from 'react';
import { Button, Card, Col, Descriptions, Divider, Form, message, Row, Select, UploadProps } from 'antd';
import { PriceListService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import correctFormat from './Correct Format.jpg'
import wrongFormat from './Wrong Format.jpg'
import { FileStatusReq } from '@project-management-system/shared-models';

const PriceListUpload = () => {

    const { Option } = Select;
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [filesData, setFilesData] = useState([])
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([]);
    const [values, setValues] = useState([])
    const [filelist, setFilelist] = useState([]);
    let navigate = useNavigate();
  
    const userData = JSON.parse(localStorage.getItem('currentUser'))
    const loginUser = userData.user.userName
    const service = new PriceListService

    useEffect(()=>{
      getUploadFilesData()
    },[])

    const getUploadFilesData = () => {
        service.getUploadFilesData().then((res) => {
          if (res.status) {
            setFilesData(res.data)
          } else{
            setFilesData([])
          }
        })
      }

      const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(event.target.files[0]);
      Papa.parse(event.target.files[0], {
        header: true,
        complete: function (result) {
          {
            const columnArray = [];
            const valueArray = [];

            result.data.map((d) => {
              columnArray.push(Object.keys(d))
              valueArray.push(Object.values(d))
            });
            setData(result.data)
            setColumns(columnArray[0])
            setValues(valueArray)
          }
        }
      });
    } else {
      alert('Please select a valid .csv file.');
      setSelectedFile(null);
    }
  };
      

  const handleUpload = async () => {
    try {
      form.validateFields().then(async () => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
  
          const fileRes = await service.fileUpload(formData);
  
          if (fileRes.status) {
            const req = new FileStatusReq();
            req.fileId = fileRes?.data?.id;
            req.status = 'Success';
            req.userName = loginUser ? loginUser : null;
  
            const res = await service.savePriceListData(data, fileRes?.data?.id);
            
  
            setLoading(true);
  
            if (res.status) {
              service.updateFileStatus(req);
              message.success(res.internalMessage);
              navigate("/masters/pricelist/price-list-view");
            } else {
              req.status = 'Failed';
              service.updateFileStatus(req);
              message.error('File upload failed');
            }
          } else {
            message.error(fileRes.internalMessage);
          }
        }
      });
    } catch (error) {
      message.error(error.message);
    }
  };
  

  const onFileTypeChange = () => {
    getUploadFilesData()
  }
  
    return (
        <>
              <Descriptions style={{ alignItems: 'right' }}>
                <Descriptions.Item>{<b>Last Uploaded File Details</b>}</Descriptions.Item>
                <br/>
                <br/>
                <Descriptions.Item label={<b>File Name</b>}>
                  {filesData[0]?.fileName}
                </Descriptions.Item>
                <Descriptions.Item label={<b>Uploaded Date</b>}>
                  {filesData[0]?.uploadedDate}
                </Descriptions.Item>
                <Descriptions.Item label={<b>Uploaded User</b>}>
                  {filesData[0]?.createdUser}
                </Descriptions.Item>
              </Descriptions>
            {/* </span> */}
            <Divider></Divider>
            <>
            <Form form = {form}>
            <Row gutter = {24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item label = "">
                  <input type="file" accept=".csv" onChange={handleFileChange} />
                </Form.Item>
                </Col>
              </Row>
              <Button
                type="primary"
                onClick={handleUpload}
                loading={loading}
                disabled={!selectedFile}
              >
                Upload
              </Button>
              </Form>
            </>
            <Divider></Divider>
            <div style={{ display: 'flex', alignItems: 'center'}}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={correctFormat} alt="Do's" style={{ width: '500px', height: '250px', border: '2px solid green',margin:"10px 75px" }} />
                <span style={{ marginTop: '5px', fontWeight: 'bold' }}>
                  ✅
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={wrongFormat} alt="Don'ts" style={{ width: '500px', height: '250px', border: '2px solid red',margin:"10px" }} />
                <span style={{ marginTop: '5px', fontWeight: 'bold' }}>
                  ❌
                </span>
              </div>
            </div>
            <Divider></Divider>
        </>
      );
}

export default PriceListUpload