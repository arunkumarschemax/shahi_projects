import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Descriptions, Divider, Form, Input, message, Modal, Row, Select, Spin, Table, Tag, Typography, Upload, UploadProps,FormInstance, UploadFile, Radio } from 'antd';
import { PDFDocument } from 'pdf-lib';
import Papa from 'papaparse'
import { OrdersService, UploadDocumentService } from '@project-management-system/shared-services';
import { ArrowDownOutlined, DeleteOutlined, DownloadOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ColumnProps } from 'antd/lib/table';
import { ColumnsType } from 'antd/es/table';
import { useForm } from 'antd/es/form/Form';
import { AlertMessages, DocumentsListRequest, FileStatusReq, UploadDocumentListDto } from '@project-management-system/shared-models';
import FormList from 'antd/es/form/FormList';
import InputNumber from 'rc-input-number';
import { number } from 'prop-types';
import PDFMerger from 'pdf-merger-js/browser';
import PdfMergeDownload from './merge-pdf';
const { Title, Text } = Typography;

export interface UploadViewProps {
    form: FormInstance<any>
    docData: any;
    formData: (value: any, filesList:any[]) => void;
    fileList: (value: any[]) => void;
}

const UploadView = (props: UploadViewProps) => {

  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState<any[]>([]);
  const [btndisable, setBtnDisable] = useState<boolean>(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
 
const handleRemoveFile = (fileToRemove) => {
  const updatedFileList = fileList.filter(file => file.uid !== fileToRemove.uid);
  setFileList(updatedFileList);
};
  
const togglePreview = (index: number) => {
  setActivePreviewIndex((prevIndex) => (prevIndex === index ? null : index));
};

const renderFileNames = () => {
  if (Array.isArray(fileList) && fileList.length > 0) {
    console.log(fileList)
    return (
      <div>
        <ul>
          {fileList.map((file, index) => (
            <li key={index}>
              
              <a
                href={URL.createObjectURL(new Blob([file.originFileObj]))}
                onClick={() => togglePreview(index)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                {file.name}
              </a>
              {/* {activePreviewIndex === index && (
                <div>
                  <h3>File {index + 1} Preview</h3>
                  {file.type?.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(new Blob([file.originFileObj]))}
                      alt={`Preview ${index + 1}`}
                      style={{ maxWidth: '40%' }}
                    />
                  ) : file.type === 'application/pdf' ? (
                    <div style={{ maxWidth: '500px' }}>
                      <iframe
                        src={URL.createObjectURL(new Blob([file.originFileObj]))}
                        title={`PDF Preview ${index + 1}`}
                        width="100%"
                        height="500px"
                      />
                    </div>
                  ) : (
                    <p>Preview not available for this file type.</p>
                  )}
                </div>
              )} */}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <p>No files selected.</p>;
  }
};
const CustomUploadList = ({ fileList, handleRemoveFile }) => {
  console.log(fileList)
  return (
      <div>
          <h3>Uploaded Files:</h3>
          
          <ul>
          {fileList?.length > 0 ? (
                   renderFileNames()
                ) : (
                    <p>No files uploaded yet.</p>
                )}
          </ul>
      </div>
  );
};



useEffect(() =>{
  setFileList(props.docData.documentsPath);
},[props.docData.documentsPath])





  const download = (data: any) => {
    console.log(data);
//     try {
//       const merger = new PDFMerger();
  
//       fetch('http://165.22.220.143/document-management/gtstoinfor/dist/packages/services/document-management/upload-files/PO-388157-6565/Nike%20Automation-%20Requirements%20(1)%20(1)%20(1)-6921.pdf', {
//   mode: 'no-cors',
// })
//   .then(async response => {
//     console.log(response)
//     console.log(await merger.add('http://165.22.220.143/document-management/gtstoinfor/dist/packages/services/document-management/upload-files/PO-388157-6565/Nike%20Automation-%20Requirements%20(1)%20(1)%20(1)-6921.pdf'));
  
//     // await merger.save('merged.pdf');

//     // console.log('PDFs merged successfully.');
//   });
      
//     } catch (error) {
//       console.error('Error merging PDFs:', error);
//     }
const fileUrl = 'http://206.189.138.212/erpx_dev/dist/apps/services/upload-files/brand-files';

// Use the Fetch API to fetch the file
fetch(fileUrl,{mode:'no-cors'})
  .then(response => {
    console.log(response)
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Use the response.text() method to get the file content as text
    return response.text();
  })
  .then(fileContent => {
    // Do something with the file content
    console.log(fileContent);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
  };


  const handleFileUpload = (file: File) => {
    setFileList([...fileList, file]);
    setSelectedFiles([...selectedFiles, file]);
  };

  const handleFileRemove = (file: UploadFile<any>) => {
    const updatedFileList = fileList.filter((f) => f !== file);
    const updatedSelectedFiles = selectedFiles.filter((f) => f !== file.originFileObj);
    setFileList(updatedFileList);
    setSelectedFiles(updatedSelectedFiles);
  };

  const handleFileDownload = (file) => {
    // Replace 'your-download-endpoint' with the actual URL or API endpoint to download the file.
    const downloadUrl = `/document-management/gtstoinfor/dist/packages/services/document-management/upload-files/PO-${props.docData.customerPo}/${file.name}`;

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank'; // Open the download link in a new tab/window
    link.download = file.name; // Specify the file name

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up the link element
    document.body.removeChild(link);

    // Display a success message
    message.success(`Downloading ${file.name}`);
};
  const gstUploadFieldProps: UploadProps = {
    multiple: true,
    onRemove: (file: any) => {
        setFileList([]);
        // uploadFileList([]);
    },
    onDownload: handleFileDownload,
    beforeUpload: (file: any) => {
        if (!file.name.match(/\.(pdf|jpg|jpeg|png)$/)) {
            message.error("Only pdf and image files are allowed!");
            return true;
        }
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = data => {  
                setFileList([...fileList, file]);
                console.log("*****************************")
                console.log(fileList)
                console.log([...fileList, file])


                setBtnDisable(false)
                // uploadFileList([...filelist, file]);
                return false;
        };
        return false;
    },
    progress: {
        strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
        },
        strokeWidth: 3,
        format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
    },
    
    // fileList: fileList

};

  const upload = (data: any) => {
    console.log(data)
    let file = props.form.getFieldValue(`${data.documentsListId}`);
    let status = props.form.getFieldValue(`status`);

    data.file = file;
    data.status = status;
    data.documentsListId = props.docData.documentsListId;
    data.documentCategoryId = props.docData.documentCategoryId;
    console.log(file);
    console.log(fileList);
    props.formData(data, fileList);
    props.fileList(fileList);
  };


  const handleUpload = (documentsListId, info) => {
    // Handle the file upload for the specific documentListId
    // You can use the 'documentListId' to identify which row is being interacted with
  };

  const handleStatusChange =() =>{
    
  }
  return (

    <><Col xs={24} sm={12} md={8} lg={6} xl={6} key={props.docData.documentsListId}>
      <Card
        bordered={true}
        style={{
          marginBottom: 16,
          borderRadius: 8,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          background: '#fff',
          borderTop: '1px solid #e8e8e8',
        }}
      >

        <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
          <Tag color="royalblue" style={{ fontSize: '15px', marginBottom: '5px' }}>
            {props.docData.documentName}
          </Tag>
        </Text>
        <br />
        <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
          <Form.Item name={props.docData.documentsListId}>
            <CustomUploadList fileList={props.docData.documentsPath} handleRemoveFile={handleRemoveFile} />
            <Upload
              key={props.docData.documentsListId}
              name={`uploadFile${props.docData.documentsListId}`}
              {...gstUploadFieldProps}
              accept=".jpeg,.pdf,.png,.jpg"
              onChange={(info) => handleUpload(props.docData.documentsListId, info)}

            >
              <Button
                key={props.docData.documentsListId}
                style={{ color: 'black', backgroundColor: '#7ec1ff' }}
                icon={<UploadOutlined />}
              >
                Choose File
              </Button>
              <br />
              <Typography.Text type="secondary">
                (Supported formats pdf, jpeg, jpg, png)
              </Typography.Text>
            </Upload>
          </Form.Item>
        </Text>
        <br />



        <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={() => upload(props.docData)}
            disabled={btndisable}
          >
            Upload
          </Button>
        </Text>
        <br />
        <br />
        <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
          <Form.Item name={"status"} initialValue={props.docData.docStatus}>
            <Radio.Group buttonStyle="solid" onChange={handleStatusChange}>
              <Radio.Button value="partially uploaded">parially</Radio.Button>
              <Radio.Button value="fully uploaded">fully</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Text>
        <br />
        <br />
        <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
          {props.docData.isUploaded === 1 ?
            <Button
              onClick={() => download(props.docData.documentsPath)}
              disabled={props.docData.isUploaded === 1 ? false : true}
              style={{
                color: 'white',
                backgroundColor: props.docData.isUploaded === 1 ? 'green' : '#806767',
                width: '100%',
              }}
              icon={<DownloadOutlined />}
            >
              Download Document
            </Button> : ""}
        </Text>
        <br />
        <><PdfMergeDownload/></>
      </Card>
    </Col></>
    
   
  );
};


export default UploadView;