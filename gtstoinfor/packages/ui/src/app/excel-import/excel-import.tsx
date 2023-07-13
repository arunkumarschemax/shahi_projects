import { useState } from 'react';
import { Button, Card, Form, message } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';
import { OrdersService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import { useNavigate } from 'react-router-dom';


export default function ExcelImport() {
  const [loading, setLoading] = useState(false);
  const ordersService = new OrdersService();
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([]);
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

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      console.log(selectedFile)
      formData.append('file', selectedFile);
      ordersService.saveOrder(formData, data).then((res) => {
        if (res.status) {
          message.success(res.internalMessage)
          navigate("/excel-import/grid-view");
        } else {
          message.error(res.internalMessage)
        }
      }).finally(() => {
        setLoading(false);
      })
    } catch (error) {
      message.error(error.message)
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
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </Card>
    </>
  );
}
