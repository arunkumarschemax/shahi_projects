import { useState } from 'react';
import { Upload, Button, Card, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { RcFile } from 'antd/lib/upload/interface';
import { OrdersService } from '@project-management-system/shared-services';
import { SaveOrderDto } from '@project-management-system/shared-models';
import Papa from 'papaparse'


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

  const handleFileChange = (event) => {
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

  const handleUpload = async () => {
    try {
      // const formData = new FormData();
      // console.log(selectedFile)
      // formData.append('file', selectedFile);
      ordersService.saveOrder(data).then((res) => {
        if (res.status) {
          message.success(res.internalMessage)
        }
      }).finally(() => {
        setLoading(false);
      })
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

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
      </Card>
    </>
  );
}
