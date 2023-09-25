import { useEffect, useState } from 'react';
import { Button, Card, Col, Descriptions, Divider, Form, message, Row, Select, UploadProps } from 'antd';
import { PriceListService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UndoOutlined } from '@ant-design/icons';
import { FileStatusReq, FileTypeDto, FileTypesEnum } from '@project-management-system/shared-models';

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

    const getUploadFilesData = () => {
        service.getUploadFilesData().then((res) => {
          if (res.status) {
            setFilesData(res.data)
          } else{
            setFilesData([])
          }
        })
      }
  
    const handleFileChange = (e) => {
    if(form.getFieldsValue().fileType == FileTypesEnum.TRIM_ORDERS){

    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (event) => {
        const csv = event.target.result as string;
        
        // Split CSV data into lines
        const lines = csv.split('\n');

        // Extract the second row as headers
        const headers = Papa.parse(lines[1], {
          header: true,
        }).data[0];

        // Remove the first and second row from the lines array
        lines.shift(); // Remove the first row
        // lines.splice(1, 1); // Remove the second row

        // Join the remaining lines back into CSV format
        const modifiedCsv = lines.join('\n');
        console.log(modifiedCsv)

        // Now parse the modified CSV data using PapaParse with custom headers
        Papa.parse(modifiedCsv, {
          header: true, // Use custom headers
          dynamicTyping: true, // Optional: Convert numeric values to numbers
          complete: (result) => {
            const columnArray = [];
            const valueArray = [];
            console.log(result.data)

            result.data.map((d) => {
              columnArray.push(Object.keys(d))
              valueArray.push(Object.values(d))
            });
            setData(result.data)
            setColumns(columnArray[0])
            setValues(valueArray)
          },
          // error: (err) => {
          //   setError(err.message);
          // },
          skipEmptyLines: true, // Optional: Skip empty lines
        });
      };
      reader.readAsText(file);
    }else{
      alert('Please select a valid .csv file.');
      setSelectedFile(null);
    }
  }
  if(form.getFieldsValue().fileType == FileTypesEnum.PROJECTION_ORDERS){
      const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(e.target.files[0]);
      Papa.parse(e.target.files[0], {
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
      // Display an error message or take appropriate action for invalid file type
      alert('Please select a valid .csv file.');
      setSelectedFile(null);
    }
  };

  };

  const handleUpload = async () => {
    try {
      form.validateFields().then(values => {
        if (selectedFile) {
          let integerPart
          //  console.log(selectedFile.name,'selectedFile') 
          const inputString = selectedFile.name
          console.log(inputString)
          // const match = inputString.match(/(\d+)\.\d+/);
          const match = inputString.match(/_(\d{2})/)
          console.log(match)
          if (match && match[1]) {
            integerPart = parseInt(match[1]);
            console.log(integerPart)
          } else {
            console.log("No integer part found in the input string.");
          }
          const formData = new FormData();
          formData.append('file', selectedFile);
          console.log(form.getFieldsValue().fileType)
          const d = new Date();
          // let month = d.getMonth();
          let month = 9;
          if(form.getFieldsValue().fileType == FileTypesEnum.PROJECTION_ORDERS){

            if (month) {
              service.fileUpload(formData, integerPart,form.getFieldsValue().fileType).then((fileRes) => {
                if (fileRes.status) {
                  service.saveOrder(data, fileRes?.data?.id, integerPart).then((res) => {
                    setLoading(true)
                    if (res.status) {
                      const req = new FileStatusReq()
                      req.fileId = fileRes?.data?.id;
                      req.status = 'Success';
                      req.userName = loginUser ? loginUser : null;
                      service.updateFileStatus(req)
                      message.success(res.internalMessage)
                      navigate("/excel-import/grid-view");
                    } else {
                      const req = new FileStatusReq()
                      req.fileId = fileRes?.data?.id;
                      req.status = 'Failed';
                      req.userName = loginUser ? loginUser : null;
                      service.updateFileStatus(req)
                      message.error('File upload failed')
                    }
                  }).finally(() => {
                    setLoading(false);
                  })
                } else {
                  message.error(fileRes.internalMessage)
                }
              });
            } else {
              message.info('month not avilable')
            }
          }
        }
      })
      

    } catch (error) {
      message.error(error.message)
    }
  }

  const onFileTypeChange = () => {
    getUploadFilesData()
  }
  
    return (
        <>
          <Card title="Excel Import">
            <span>
              <Descriptions style={{ alignItems: 'right' }}>
                <Descriptions.Item>{<b>Last Uploaded File Details</b>}</Descriptions.Item>
                <Descriptions.Item label={<b>File Name</b>}>
                  {filesData[0]?.fileName}
                </Descriptions.Item>
                <Descriptions.Item label={<b>Uploaded Date</b>}>
                  {filesData[0]?.uploadedDate ? moment(filesData[0]?.uploadedDate).format('YYYY-MM-DD HH:mm:ss') : '-'}
                </Descriptions.Item>
                <Descriptions.Item label={<b>Uploaded User</b>}>
                  {filesData[0]?.createdUser}
                </Descriptions.Item>
              </Descriptions>
            </span>
            <Divider></Divider>
            <>
            <Form form = {form}>
            <Row gutter = {24}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                    <Form.Item name="fileType" label="File Type" >
                        <Select
                            showSearch
                            placeholder="Select File Type"
                            optionFilterProp="children"
                            allowClear
                            onChange={onFileTypeChange}
                            >
                            <Option key='trimorder' value="Trim Order">Trim Order</Option>
                            <Option key='projectionorder' value="Projection Order">Projection Order</Option>
                        </Select>
                    </Form.Item>
                </Col>
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
          </Card>
        </>
      );
}

export default PriceListUpload