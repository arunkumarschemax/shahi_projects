import { useState } from 'react';
import { Button, Card, Form, message, UploadProps } from 'antd';
import { OrdersService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import AlertMessages from '../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';


export default function ExcelImport() {
  const [loading, setLoading] = useState(false);
  const ordersService = new OrdersService();
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([])
  const [filelist, setFilelist] = useState([]);
  let navigate = useNavigate();

  const handleFileChange = (event) => {
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
  };
  console.log(selectedFile)

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        ordersService.fileUpload(formData).then((fileRes) => {
          ordersService.saveOrder(data, fileRes?.data?.id).then((res) => {
            console.log(res.status)
            if (res.status) {
              message.success(res.internalMessage)
              navigate("/excel-import/grid-view");
            } else {
              message.error('File upload failed')
            }
          }).finally(() => {
            setLoading(false);
          })
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
        <Form.Item>
          <input type="file" onChange={handleFileChange} />
        </Form.Item>
        <Button
          type="primary"
          onClick={handleUpload}
          loading={loading}
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </Card>
    </>
  );
}
