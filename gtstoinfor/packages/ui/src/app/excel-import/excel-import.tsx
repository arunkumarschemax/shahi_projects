import React, { useState } from 'react';
import { Upload, Button, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { UploadChangeParam, RcFile } from 'antd/lib/upload/interface';


interface CustomUploadFile extends RcFile {
    uid: string;
  }
export default function ExcelImport() {
  const [selectedFile, setSelectedFile] = useState<CustomUploadFile | null>(null);
  const [loading, setLoading] = useState(false);

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

      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        await axios.post("http://your-backend-url/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // File uploaded successfully
        console.log("File uploaded successfully");
      } catch (error) {
        // Error uploading file
        console.error("Error uploading file:", error);
      }

      setLoading(false);
    }
  };

  return (
    <Card title="Excel Import">
      <Upload.Dragger
        accept=".xlsx"
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
