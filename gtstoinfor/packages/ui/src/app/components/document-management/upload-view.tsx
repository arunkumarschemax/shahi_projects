import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Descriptions, Divider, Form, Input, message, Modal, Row, Select, Spin, Table, Tag, Typography, Upload, UploadProps,FormInstance, UploadFile, Radio, Tooltip } from 'antd';
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
const { Title, Text } = Typography;
import { saveAs } from 'file-saver';
import axios, { AxiosRequestConfig } from 'axios';
export interface UploadViewProps {
    form: FormInstance<any>
    docData: any;
    formData: (value: any, filesList:any[]) => void;
    fileList: (value: any[]) => void;
    urls: any[];
    setStatus:(status:any) => void;
}

const UploadView = (props: UploadViewProps) => {

  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState<any[]>([]);
  const [btndisable, setBtnDisable] = useState<boolean>(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const defaultValue = "option1";
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [documentName, setDocumentName] = useState<string>(undefined);

  const [form] = Form.useForm()
const handleRemoveFile = (fileToRemove) => {
  const updatedFileList = fileList.filter(file => file.uid !== fileToRemove.uid);
  setFileList(updatedFileList);
};
  
const togglePreview = (index: number) => {
  setActivePreviewIndex((prevIndex) => (prevIndex === index ? null : index));
};
const handleDownload = (url) => {
  // : FilenameDto[]
  let filePath = url;
  console.log(filePath);
  //  filePath ='http://165.22.220.143/document-management/gtstoinfor/upload-files/import%20excel%20format.xlsx'
  if (filePath) {
    filePath = filePath.split(",");
    for (const res of filePath) {
      if(res){
        console.log(res);
        setTimeout(() => {
          const response = {
            file: url,
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
                onClick={() => handleDownload(file.url)}
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
          <h5>Uploaded Files:</h5>
          <ul>
          {fileList?.length > 0 ? (
                   renderFileNames()
                ) : (
                    <h6>No files uploaded yet.</h6>
                )}
          </ul>
      </div>
  );
};




useEffect(() =>{
  props.setStatus('Fully Uploaded')
  setFileList(props.docData.documentsPath);
},[props.docData.documentsPath])

const fetchPdfBytesArrayWithAxios = async (pdfUrls) => {
  try {
    const pdfPromises = pdfUrls.map(async (res, index) => {
      // if(index != 0){
        const response = await axios.get(res.url, {
          responseType: 'arraybuffer',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
        return response.data;
      // }
    });

    const pdfBytesArray = await Promise.all(pdfPromises);
    return pdfBytesArray;
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    throw error; // Rethrow the error to handle it further
  }
};
const mergeAndDownloadPDFs = async (pathsData:any[]) => {
  try {
    // Load the initial PDF file (you need to provide a valid URL)
    const initialPdfUrl = pathsData[0].url;
    // 'http://localhost:8002/PO-468219-5672/Material preparation-51092.pdf';

    const initialPdfResponse = await axios.request({
      url: initialPdfUrl,
      method: 'get',
      responseType: 'arraybuffer',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    const initialPdfBytes = initialPdfResponse.data;
    console.log('*&*&*&', initialPdfBytes)

    // Load additional PDFs from URLs (you need to provide valid PDF URLs)
    const pdfUrls = [
      'http://localhost:8002/PO-468219-5672/Material preparation-51092.pdf',
    ];
    // const pdfBytesArray = await Promise.all(pdfUrls.map(async (url) => {
    //   const response = await fetch(url, { mode: 'no-cors' });
    //   if (!response.ok) {
    //     throw new Error(`Failed to fetch ${url}`);
    //   }
    //   return response.arrayBuffer();
    // }));
    const pdfBytesArray = await fetchPdfBytesArrayWithAxios(pathsData)


    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    // Add the pages from the initial PDF
    const initialPdfDoc = await PDFDocument.load(initialPdfBytes);
    const initialPages = await mergedPdf.copyPages(initialPdfDoc, initialPdfDoc.getPageIndices());
    initialPages.forEach((page) => mergedPdf.addPage(page));

    // Loop through each PDF and add its pages to the merged PDF
    for (const pdfBytes of pdfBytesArray) {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    // Save the merged PDF as a blob
    const mergedPdfBytes = await mergedPdf.save();

    // Create a Blob and trigger a download
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    saveAs(blob, pathsData[0].documentName+'.pdf');
  } catch (error) {
    console.error('Error merging and downloading PDFs:', error);
  }
};


  const download = (data: any) => {
    console.log(data);
    mergeAndDownloadPDFs(data)
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
  const specialCharactersRegex = /[!@#$%^&*+{}\[\]:;<>,?~\\]/;

  const gstUploadFieldProps: UploadProps = {

    multiple: true,
    onRemove: (file: any) => {
        setFileList([]);
        // uploadFileList([]);
    },
    // onDownload: handleFileDownload,
    beforeUpload: (file: any) => {

      console.log(documentName);
      if(documentName != undefined && documentName === "Mass Balance Sheet" && (!file.name.match(/\.(xlsx)$/) && !file.name.match(/\.(pdf)$/)))
        {
            message.error("Only pdf & xlsx files are allowed!");
            return true;
        }
      else if(documentName != "Mass Balance Sheet" && !file.name.match(/\.(pdf)$/))
        {
            message.error("Only pdf files are allowed!");
            return true;
        }
        if (specialCharactersRegex.test(file.name)) {
          message.error("File name contains special characters. Please remove them.");
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


  const handleUpload = (documentsListId, info, docName) => {
    console.log(documentsListId);
    console.log(info);
    console.log(docName);
    setDocumentName(docName);
    // Handle the file upload for the specific documentListId
    // You can use the 'documentListId' to identify which row is being interacted with
  };
  const handleStatusChange =(value) =>{
    console.log(value.target.value)
    props.setStatus(value.target.value)
    setSelectedValue(value.target.value)
  }
console.log(props.docData)
  return (
  <>
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
            <Upload
              key={props.docData.documentsListId}
              name={`uploadFile${props.docData.documentsListId}`}
              accept=".jpeg,.pdf,.png,.jpg,.xlsx"
              onChange={(info) => handleUpload(props.docData.documentsListId, info, props.docData.documentName)}
              {...gstUploadFieldProps}

            >
              <Button
                key={props.docData.documentsListId}
                style={{ color: 'black', backgroundColor: '#7ec1ff' }}
                icon={<UploadOutlined />}
                disabled={props.docData.docStatus == 'Fully Uploaded' && props.docData.isUploaded == true
               ? true:false}
              >
                Choose File
              </Button>
              <br />
              <Typography.Text type="secondary">
                {props.docData?.documentName === "Mass Balance Sheet" ? 
                "(Supports xlsx & Pdf Formats)":"(Supports Only Pdf Format)"
                }
              </Typography.Text>
            </Upload>
          </Form.Item>
        </Text>
        <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
          <Form.Item name={`status${props.docData.documentsListId}`}
          //  initialValue={props.docData.docStatus?props.docData.docStatus:'Fully Uploaded'}
           >
            <Radio.Group buttonStyle="solid" onChange={handleStatusChange} 
            defaultValue={props.docData.docStatus?props.docData.docStatus:'Fully Uploaded'}
            //  value={props.docData.docStatus?props.docData.docStatus:'Fully Uploaded'}
             >
              <Radio.Button value="Partially Uploaded">Partially</Radio.Button>
              <Radio.Button value="Fully Uploaded">Fully</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Text>
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
        <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
          <CustomUploadList fileList={props.docData.documentsPath} handleRemoveFile={handleRemoveFile} />
        </Text>
      
        {/* <br /> */}
        {/* <Text strong style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
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
        <br /> */}
        {/* <><PdfMergeDownload/></> */}
      </Card>
    </Col>
    </>
  );
};


export default UploadView;
