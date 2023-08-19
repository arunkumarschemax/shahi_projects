import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Descriptions, Divider, Form, Input, message, Modal, Row, Select, Spin, Table, Tag, Typography, Upload, UploadProps,FormInstance, UploadFile } from 'antd';
import { PDFDocument } from 'pdf-lib';
import Papa from 'papaparse'
import { OrdersService, UploadDocumentService } from '@project-management-system/shared-services';
import { ArrowDownOutlined, DeleteOutlined, DownloadOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ColumnProps } from 'antd/lib/table';
import { ColumnsType } from 'antd/es/table';
import { useForm } from 'antd/es/form/Form';
import { AlertMessages, DocumentsListRequest, FileStatusReq, UploadDocumentListDto } from '@project-management-system/shared-models';


const { Title, Text } = Typography;

export interface UploadViewProps {
    form: FormInstance<any>
    docData: any;
    formData: (value: any, filesList:any[]) => void;
    fileList: (value: any[]) => void;
}

const UploadView = (props: UploadViewProps) => {
  console.log(props.docData,'props.doctdataaaaaaaaaaaaaaaaaaaaa')

    
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState<any[]>([]);
  const [btndisable, setBtnDisable] = useState<boolean>(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
 
const handleRemoveFile = (fileToRemove) => {
  const updatedFileList = fileList.filter(file => file.uid !== fileToRemove.uid);
  setFileList(updatedFileList);
};
  
const renderFilePreviews = () => {
  return fileList.map(file => (
      <div key={file.uid}>
          <p>{file.name}</p>
          <Button onClick={() => handleRemoveFile(file)}><DeleteOutlined /></Button>
          <Button onClick={() => handleFileDownload(file)} icon={<DownloadOutlined />}></Button>
      </div>
  ));
};
const CustomUploadList = ({ fileList, handleRemoveFile }) => {
  console.log(fileList)
  return (
      <div>
          <h3>Uploaded Files:</h3>
          
          <ul>
          {fileList.length > 0 ? (
                   renderFilePreviews()
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

  useEffect(() => {
    setBtnDisable(selectedFiles.length === 0);
  }, [selectedFiles]);

  const download = (data: any) => {
    mergeAndDownloadPDF(selectedFiles);

    console.log('data');
    console.log(data);
  };

  const mergeAndDownloadPDF = async (files: File[]) => {
    if (files.length === 0) {
      alert('Please select at least one file.');
      return;
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
      const fileData = await file.arrayBuffer();
      // const pdfBytes = new Uint8Array(fileData);
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension === 'pdf') {
        const pdfBytes = new Uint8Array(fileData);
        const externalPdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await pdfDoc.copyPages(externalPdf, externalPdf.getPageIndices());
  
        copiedPages.forEach((page) => {
          pdfDoc.addPage(page);
        });
      } else if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
        const image = await pdfDoc.embedJpg(fileData);
        const page = pdfDoc.addPage();
        page.drawImage(image, {
          x: 50,
          y: 450,
          width: 500,
          height: 400,
        });
      }
    }


    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'MERGED.pdf';
    link.click();
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
    const downloadUrl = `http://165.22.220.143/document-management/gtstoinfor/dist/packages/services/document-management/upload-files/PO-${props.docData.customerPo}/${file.name}`;

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
    let file = props.form.getFieldValue(`${data.documentsListId}`);
    data.file = file;
    console.log(file);
    console.log(fileList);
    props.formData(data, fileList);
    props.fileList(fileList);
  };


  const handleUpload = (documentsListId, info) => {
    // Handle the file upload for the specific documentListId
    // You can use the 'documentListId' to identify which row is being interacted with
  };
  return (

    <Col xs={24} sm={12} md={8} lg={6} xl={6} key={props.docData.documentsListId}>
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
          <CustomUploadList fileList={fileList} handleRemoveFile={handleRemoveFile} />
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


        <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
          {
            props.docData.isUploaded === 1 ?  
          <Button
           onClick={() => download(props.docData)}
            disabled={props.docData.isUploaded === 1 ? false : true}
            style={{
              color: 'white',
              backgroundColor: props.docData.isUploaded === 1 ? 'green' : '#806767',
              width: '100%',
            }}
            icon={<DownloadOutlined />}
          >
            Download Document
          </Button> :"" }
        </Text>


        <br />
      </Card>  
    </Col>

    
   
  );
};


export default UploadView;


