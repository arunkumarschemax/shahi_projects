import { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Divider, Form, message, UploadProps } from 'antd';
import { OrdersService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import AlertMessages from '../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UndoOutlined } from '@ant-design/icons';
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
      // Display an error message or take appropriate action for invalid file type
      alert('Please select a valid .csv file.');
      setSelectedFile(null);
    }
  };
  const handleUpload = async () => {
    try {

      if (selectedFile) {
        let integerPart
        //  console.log(selectedFile.name,'selectedFile') 
        const inputString = selectedFile.name
        const match = inputString.match(/(\d+)\.\d+/);
        if (match) {
          integerPart = parseInt(match[1]);
        } else {
          console.log("No integer part found in the input string.");
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        if (integerPart) {
          ordersService.fileUpload(formData, integerPart).then((fileRes) => {
            if (fileRes.status) {
              ordersService.saveOrder(data, fileRes?.data?.id, integerPart).then((res) => {
                setLoading(true)
                if (res.status) {
                  const req = new FileStatusReq()
                  req.fileId = fileRes?.data?.id;
                  req.status = 'Success'
                  ordersService.updateFileStatus(req)
                  message.success(res.internalMessage)
                  navigate("/excel-import/grid-view");
                } else {
                  const req = new FileStatusReq()
                  req.fileId = fileRes?.data?.id;
                  req.status = 'Failed'
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
        } else {
          message.info('month not avilable')
        }

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
              {filesData[0]?.uploadedDate ? moment(filesData[0]?.uploadedDate).utc().format('YYYY-MM-DD HH:mm:ss') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Uploaded User</b>}>
              {filesData[0]?.createdUser}
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
