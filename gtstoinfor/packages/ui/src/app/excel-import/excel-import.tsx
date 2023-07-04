import React, { useState } from 'react';
import { Upload, Button, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { UploadChangeParam, RcFile } from 'antd/lib/upload/interface';
import { OrdersService } from '@project-management-system/shared-services';
import { SaveOrderDto } from '@project-management-system/shared-models';


interface CustomUploadFile extends RcFile {
    uid: string;
  }
export default function ExcelImport() {
  const [selectedFile, setSelectedFile] = useState<CustomUploadFile | null>(null);
  const [loading, setLoading] = useState(false);
  const ordersService = new OrdersService()

  const handleFileChange = (info: any) => {
    if (info.fileList.length > 0) {
      setSelectedFile(info.fileList[0].originFileObj);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        const reqObj = new SaveOrderDto()
        reqObj.createdUser = 'admin'
        reqObj.file = selectedFile
        ordersService.saveOrder(reqObj).then(() => {

        }).finally(() => {
          setLoading(false);
        })

  
    }
  };

  return (
    <Card title="Excel Import">
      <Upload.Dragger
        accept=".csv"
        fileList={selectedFile ? [selectedFile] : []}
        beforeUpload={() => false}
        onChange={handleFileChange}  
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Upload.Dragger>
      <Button
        type="primary"
        onClick={handleUpload}
        loading={loading}
        disabled={!selectedFile}
      >
        Upload
      </Button>
    </Card>
  );
}
