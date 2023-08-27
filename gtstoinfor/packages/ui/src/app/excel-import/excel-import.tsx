import { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Divider, Form, message, UploadProps } from 'antd';
import { OrdersService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import AlertMessages from '../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { DownloadOutlined, UndoOutlined } from '@ant-design/icons';
import { FileStatusReq } from '@project-management-system/shared-models';


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

  useEffect(() => {
    getUploadFilesData();
  }, [])

  const getUploadFilesData = () => {
    ordersService.getUploadFilesData().then((res) => {
      if (res.status) {
        setFilesData(res.data)
        // message.success(res.internalMessage)
      }
    })
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // if (file && file.type === 'text/csv/xlsx') {
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
    // } else {
    //   // Display an error message or take appropriate action for invalid file type
    //   alert('Please select a valid .csv file.');
    //   setSelectedFile(null);
    // }
  };
  
  const handleImport = () => {
    // : FilenameDto[]
    let filePath;
     filePath ='http://165.22.220.143/document-management/gtstoinfor/upload-files/import%20excel%20format.xlsx'
    if (filePath) {
      filePath = filePath.split(",");
      for (const res of filePath) {
        if(res){
          console.log(res);
          setTimeout(() => {
            const response = {
              file: 'http://165.22.220.143/document-management/gtstoinfor/upload-files/import%20excel%20format.xlsx',
            };
  
            window.open(response.file);
  
          }, 100);
        }
      }
    }
    else {
      AlertMessages.getErrorMessage("Please upload file. ");

    }
  }
  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        ordersService.fileUpload(formData).then((fileRes) => {
          if (fileRes.status) {
            ordersService.saveOrder(data, fileRes?.data?.id).then((res) => {
              setLoading(true)
              console.log(res);
              if (res.status) {
                const req = new FileStatusReq()
                req.fileId = fileRes?.data?.id;
                req.status = 'Success'
                req.updatedUser = JSON.parse(localStorage.getItem("currentUser")).user.userName;
                ordersService.updateFileStatus(req)
                message.success(res.internalMessage)
                navigate("/excel-import/grid-view");
              } else {
                const req = new FileStatusReq()
                req.fileId = fileRes?.data?.id;
                req.status = 'Failed'
                req.updatedUser = JSON.parse(localStorage.getItem("currentUser")).user.userName;
                console.log(req);
                ordersService.updateFileStatus(req)
                message.error('File upload failed')
              }
            }).finally(() => {
              setLoading(false);
            })
          } else {
            message.error(fileRes.internalMessage)
          }
        });
      }
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
      if (!file.name.match(/\.(csv|xlsx|xls|pdf)$/)) {
        AlertMessages.getErrorMessage("Only csv & xlsx files are allowed!");
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

  return (
    <>
      <Card title="Import Orders" extra={<><Button type="default" style={{ color: 'green' }} onClick={handleImport} icon={<DownloadOutlined />}>Download Excel Format</Button>  <Button onClick={() => navigate('/excel-import/grid-view')} type={'primary'}>View Orders</Button></>}>
        <span>
          <Descriptions style={{ alignItems: 'right' }}>
            <Descriptions.Item>{<b>Last Uploaded File Details</b>}</Descriptions.Item>
            <Descriptions.Item label={<b>File Name</b>}>
              {filesData[0]?.fileName}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Uploaded Date</b>}>
              {filesData[0]?.uploadedDate ? moment(filesData[0]?.uploadedDate).utc().format('YYYY-MM-DD HH:mm:ss') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Uploaded User</b>}>
              {filesData[0]?.updatedUser}
            </Descriptions.Item>
          </Descriptions>
        </span>
        <Divider></Divider>
        <>
          <Form.Item>
            <input type="file" accept=".csv" onChange={handleFileChange} />
          </Form.Item>
          <Button
            type="primary"
            onClick={handleUpload}
            loading={loading}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </>
      </Card>
    </>
  );
}
