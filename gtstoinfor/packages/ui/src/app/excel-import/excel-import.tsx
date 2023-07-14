import { useState } from 'react';
import { Upload, Button, Card, Form, message, UploadProps, Typography, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { RcFile } from 'antd/lib/upload/interface';
import { OrdersService } from '@project-management-system/shared-services';
import { SaveOrderDto } from '@project-management-system/shared-models';
import Papa from 'papaparse'
import AlertMessages from '../common/common-functions/alert-messages';


interface CustomUploadFile extends RcFile {
  uid: string;
}
export default function ExcelImport() {
  const [loading, setLoading] = useState(false);
  const ordersService = new OrdersService();
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([])
  const [filelist, setFilelist] = useState([]);

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
        console.log(selectedFile)
        formData.append('file', selectedFile);
        console.log(formData)
        ordersService.fileUpload(formData).then((fileRes) => {
          console.log(fileRes?.data?.id)
          ordersService.saveOrder(data, fileRes?.data?.id).then((res) => {
            console.log(res.status)
            if (res.status) {
              console.log('11111111111111')
              message.success(res.internalMessage)
            } else {
              message.error(res.internalMessage)
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
        >
          Upload
        </Button>
        {/* <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="fileUpload"
            >
              <Upload {...uploadFieldProps} onChange={handleFileChange}>
                <br /><Button style={{ color: "black", backgroundColor: "#7ec1ff" }} icon={<UploadOutlined />}  >Upload File</Button>
                <br /><Typography.Text type="secondary">
                  (Supported formats csv)
                </Typography.Text>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={3} style={{marginTop:'14px'}}>
            <Button
              type="primary"
              onClick={handleUpload}
              loading={loading}
            >
              Upload
            </Button>
          </Col>
        </Row> */}
      </Card>
    </>
  );
}
