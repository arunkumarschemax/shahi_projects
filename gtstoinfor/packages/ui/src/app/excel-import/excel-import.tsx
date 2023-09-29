import { useEffect, useState } from 'react';
import { Button, Card, Col, Descriptions, Divider, Form, message, Row, Select, UploadProps } from 'antd';
import { OrdersService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import AlertMessages from '../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UndoOutlined } from '@ant-design/icons';
import { FileStatusReq, FileTypeDto, FileTypesEnum } from '@project-management-system/shared-models';
import * as XLSX from 'xlsx';

export default function ExcelImport() {
  const [loading, setLoading] = useState(false);
  const ordersService = new OrdersService();
  const [selectedFile, setSelectedFile] = useState(null);
  const [filesData, setFilesData] = useState([])
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([])
  const [filelist, setFilelist] = useState([]);
  let navigate = useNavigate();
  const { Option } = Select;
  const [form] = Form.useForm();


  useEffect(() => {
    form.setFieldsValue({fileType:'Projection Order'})
    getUploadFilesData();
  }, [])

  const userData = JSON.parse(localStorage.getItem('currentUser'))
  const loginUser = userData.user.userName

  const getUploadFilesData = () => {
    const req= new FileTypeDto(form.getFieldValue('fileType'))
    ordersService.getUploadFilesData(req).then((res) => {
      if (res.status) {
        setFilesData(res.data)
        // message.success(res.internalMessage)
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
      console.log(file.type)
    if (file && file.type === 'text/csv' || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      console.log(file)
      // let csvData
      // var reader = new FileReader()
      // reader.readAsArrayBuffer(file)
      // reader.onload = async data => {
      //   let csvData1: any = reader.result;
      //   csvData = importExcel(csvData1);
      //   // let headersRow = getHeaderArray(csvData[0][3]);
      //   console.log(csvData)
      //   const obj1 = Object.assign({}, csvData);
      //   console.log(obj1)
      // }
        setSelectedFile(e.target.files[0]);
      Papa.parse(e.target.files[0], {
        header: true,
        complete: function (result) {
          {
            const columnArray = [];
            const valueArray = [];
            console.log(result)
            result.data.map((d) => {
              columnArray.push(Object.keys(d))
              valueArray.push(Object.values(d))
            });
            console.log(result.data)
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

  const getHeaderArray = (csvRecordsArr: any) => {
    let headerArray: string[] = [];
    for (let eachRecord of csvRecordsArr) {
        if (typeof eachRecord === "string") {
            headerArray.push(eachRecord.trim().toLowerCase());
        } else if (typeof eachRecord === "undefined") {

        } else {
            headerArray.push(eachRecord)
        }

    }
    return headerArray;
}

  const importExcel = (file: any[]) => {
    var data = new Uint8Array(file);
    var wb = XLSX.read(data, { type: 'array', cellDates: true });
    let sheet: any[] = [];
    for (const Sheet in wb.Sheets) {
        if (wb.Sheets.hasOwnProperty(Sheet)) {
            sheet.push(XLSX.utils.sheet_to_json(wb.Sheets[Sheet], { raw: true, header: 1 }));
        }
    }
    return sheet;
}

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.type === 'text/csv') {
  //     setSelectedFile(event.target.files[0]);
  //     Papa.parse(event.target.files[0], {
  //       header: true,
  //       complete: function (result) {
  //         {
  //           const columnArray = [];
  //           const valueArray = [];

  //           result.data.map((d) => {
  //             columnArray.push(Object.keys(d))
  //             valueArray.push(Object.values(d))
  //           });
  //           setData(result.data)
  //           setColumns(columnArray[0])
  //           setValues(valueArray)
  //         }
  //       }
  //     });
  //   } else {
  //     // Display an error message or take appropriate action for invalid file type
  //     alert('Please select a valid .csv file.');
  //     setSelectedFile(null);
  //   }
  // };
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
              ordersService.fileUpload(formData, integerPart,form.getFieldsValue().fileType).then((fileRes) => {
                if (fileRes.status) {
                  ordersService.saveOrder(data, fileRes?.data?.id, integerPart).then((res) => {
                    setLoading(true)
                    if (res.status) {
                      const req = new FileStatusReq()
                      req.fileId = fileRes?.data?.id;
                      req.status = 'Success';
                      req.userName = loginUser ? loginUser : null;
                      ordersService.updateFileStatus(req)
                      navigate("/excel-import/grid-view");
                      message.success(res.internalMessage)
                    } else {
                      const req = new FileStatusReq()
                      req.fileId = fileRes?.data?.id;
                      req.status = 'Failed';
                      req.userName = loginUser ? loginUser : null;
                      ordersService.updateFileStatus(req)
                      // message.error('File upload failed')
                      message.error(res.internalMessage)
                      AlertMessages.getErrorMessage(res.internalMessage)
                    }
                  }).finally(() => {
                    setLoading(false);
                  })
                } else {
                  message.error(fileRes.internalMessage)
                  AlertMessages.getErrorMessage(fileRes.internalMessage)
                }
              });
            } else {
              message.info('month not avilable')
            }
          }else{
              ordersService.fileUpload(formData,month,form.getFieldsValue().fileType).then((fileRes) => {
                if (fileRes.status) {
                  ordersService.saveTrimOrder(data, fileRes?.data?.id, month).then((res) => {
                    setLoading(true)
                    if (res.status) {
                      const req = new FileStatusReq()
                      req.fileId = fileRes?.data?.id;
                      req.status = 'Success';
                      req.userName = loginUser ? loginUser : null;
                      ordersService.updateFileStatus(req)
                      navigate("/excel-import/trim-order");
                      message.success(res.internalMessage)
                    } else {
                      const req = new FileStatusReq()
                      req.fileId = fileRes?.data?.id;
                      req.status = 'Failed';
                      req.userName = loginUser ? loginUser : null;
                      ordersService.updateFileStatus(req)
                      // message.error('File upload failed')
                      message.error(res.internalMessage)
                    }
                  }).finally(() => {
                    setLoading(false);
                  })
                } else {
                  message.error(fileRes.internalMessage)
                }
              });
          }
  
        }
      })
      

    } catch (error) {
      message.error(error.message)
    }
  }

  const uploadFieldProps: UploadProps = {
    multiple: false,
    onRemove: file => {
      setFilelist([]);
      // uploadFileList([]);
    },
    beforeUpload: (file: any) => {
      if (!file.name.match(/\.(csv)$/)) {
        AlertMessages.getErrorMessage("Only csv files are allowed!");
        return true;
      }
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = data => {
        if (filelist.length === 1) {
          AlertMessages.getErrorMessage("You Cannot Upload More Than One File At A Time");
          return true;
        } else {
          setFilelist([...filelist, file]);
          // uploadFileList([...filelist, file]);
          return false;
        }
      };

      // Add a default return value for cases where none of the conditions are met
      return false;
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
    fileList: filelist
  };

  const onFileTypeChange = () => {
    getUploadFilesData()
  }

  return (
    <>
      <Card title="Add Orders">
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
            <Descriptions.Item label={<b>No of Records</b>}>
              {form.getFieldValue('fileType') === FileTypesEnum.PROJECTION_ORDERS ?  filesData[0]?.projectionRecords : filesData[0]?.trimRecords}
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
                        <Option key='projectionorder' value="Projection Order">Projection Order</Option>
                        <Option key='trimorder' value="Trim Order">Trim Order</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item label = "">
              <input type="file" accept=".csv, application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileChange} />
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
