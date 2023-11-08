import { useEffect, useState } from 'react';
import { Button, Card, Col, Descriptions, Divider, Form, message, Row, Select, UploadProps } from 'antd';
import { PriceListService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import correctFormat from './Correct Format.jpg'
import wrongFormat from './Wrong Format.jpg'
import { FileStatusReq } from '@project-management-system/shared-models'; 
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { FileExcelFilled } from '@ant-design/icons';
import * as XLSX from 'xlsx';

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

      const importExcel = (file: any[]) => {
        var data = new Uint8Array(file);
        var wb = XLSX.read(data, { type: 'array', cellDates: true });
        let sheet: any[] = [];
        for (const Sheet in wb.Sheets) {
          if(Sheet){
            if (wb.Sheets.hasOwnProperty(Sheet)) {
                sheet.push(XLSX.utils.sheet_to_json(wb.Sheets[Sheet], { raw: true, header: 1 }));
            }
          }
        }
        return sheet;
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
        },
        skipEmptyLines: true,
      });
    } else if(file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      setSelectedFile(event.target.files[0]);
      let csvData
      var reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = async data => {
        let csvData1: any = reader.result;
        csvData = importExcel(csvData1);
        // let headersRow = getHeaderArray(csvData[0][3]);
        // csvData[0].shift()
        // csvData[0].shift()
        // csvData[0].shift()
        // console.log(csvData[0],'????????')
        const filteredNestedData = csvData.filter(innerData => innerData.some(row => row.length > 0));

        const output = filteredNestedData.map(innerData => {
          const header = innerData[0];
          return innerData.slice(1).map(row => {
            if (row.every(value => value === '')) {
              return null; // Skip rows with all empty values
            }
            return row.reduce((acc, value, index) => {
              acc[header[index]] = value;
              return acc;
            }, {});
          }).filter(row => row !== null); // Remove rows with all empty values
        });  
           setData(output[0])   
      }
    }else {
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
            const req = new FileStatusReq()
            req.fileId = fileRes?.data?.id;
            req.status = 'Success';
            req.userName = loginUser ? loginUser : null;
  
            const res = await service.savePriceListData(data, fileRes?.data?.id).then((res) => {
              setLoading(true);
              if (res.status) {
                service.updateFileStatus(req);
                message.success(res.internalMessage);
                navigate("/masters/pricelist/price-list-view");
              } else {
                req.status = 'Failed';
                service.updateFileStatus(req);
                message.error(res.internalMessage)
              }
            }).finally(() => {
              setLoading(false);
            })
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

  let template: IExcelColumn[] = []
  template = [
        { title: 'Year', dataIndex: '' },
        { title: 'Season', dataIndex: '' },
        { title: 'Item', dataIndex: ''},
        { title: 'Sample Code', dataIndex: ""},
        { title: 'Business', dataIndex: ""},
        { title: 'FOB(Local Currency)', dataIndex: ""},
        { title: 'Currency', dataIndex: ""},
    ]

    const exportExcel = () => {
      const excel = new Excel();
      excel
        .addSheet('Price List')
        .addColumns(template)
        .addDataSource([])
        .saveAs('Price List Template.xlsx');
    }
  
    return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      {filesData && filesData[0] ? (
        <Descriptions style={{ alignItems: 'right' }}>
          <Descriptions.Item>{<b>Last Uploaded File Details</b>}</Descriptions.Item>
          <br/>
          <br/>
          <Descriptions.Item label={<b>File Name</b>}>{filesData[0]?.fileName}</Descriptions.Item>
          <Descriptions.Item label={<b>No of Records</b>}>{filesData[0]?.records}</Descriptions.Item>
          <Descriptions.Item label={<b>Uploaded Date</b>}>{filesData[0]?.uploadedDate}</Descriptions.Item>
          <Descriptions.Item label={<b>Uploaded User</b>}>{filesData[0]?.createdUser}</Descriptions.Item>
        </Descriptions>
        ) : ([])}
        <Divider></Divider>
        <Form form = {form}>
          <Row gutter = {24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
              <Form.Item label = "">
                <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileChange} />
                <label style={{color:'blue',whiteSpace: 'nowrap'}} >Only csv & excel files are allowed</label>
              </Form.Item>
            </Col>
          </Row>
          <Button
          type="primary"
          onClick={handleUpload}
          loading={loading}
          disabled={!selectedFile}>
            Upload
          </Button>
        </Form>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right', marginTop:"-45px" }}>
        <Button className='panel_button' icon={<FileExcelFilled />} style={{ color: 'green' }} onClick={() => exportExcel()}>Sample Format</Button>
      </div>
  </div>
  );
}

export default PriceListUpload