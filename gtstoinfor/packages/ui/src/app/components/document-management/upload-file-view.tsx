import { useEffect, useRef, useState } from 'react';
import {  Button, Card, Form, Input, Table, Space, InputRef, Modal, Tooltip, Popconfirm, message } from 'antd';
import {  DeleteOutlined, DownloadOutlined, SearchOutlined,  } from '@ant-design/icons';
import { AlertMessages, } from '@project-management-system/shared-models';
import { ColumnType } from 'antd/lib/table';
import { OrdersService, UploadDocumentService } from '@project-management-system/shared-services';
import { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import Link from 'antd/lib/typography/Link';
import { redirect, useNavigate } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Header } from '@nestjs/common';
import { config } from 'packages/libs/shared-services/config';


const UploadFileGrid = () =>{

    
    const service = new OrdersService()
    const [page,setPage] = useState<number>(1);
    const [itemData, setItemData] = useState([])
    const [columns, setColumns] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filters, setFilters] = useState({});
    const [po, setPo]=useState('')
    const searchInput = useRef<InputRef>(null);
    const [documentdat,setDocumentsData]=useState<any[]>([])
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageSize, setPageSize] = useState<number>(1);
    const [filesData, setFilesData] = useState<any[]>([])

    const uploadDcoService = new UploadDocumentService()
    let navigate = useNavigate();

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
    const mergeAndDownloadPDFs = async (pathsData:any[], poNo:string) => {
      console.log(pathsData);
      console.log(pathsData.filter((rec) => rec.downloadStatus === "Yes"));
      let filePaths:any[] = pathsData.filter((rec) => rec.downloadStatus === "Yes");
      try {
        if(filePaths.length > 0){

          console.log(pathsData)
          // Load the initial PDF file (you need to provide a valid URL)
          // const initialPdfUrl = pathsData[0].url;
          // 'http://localhost:8002/PO-468219-5672/Material preparation-51092.pdf';
          // console.log(initialPdfUrl)
          // const initialPdfResponse = await axios.request({
          //   url: initialPdfUrl,
          //   method: 'get',
          //   responseType: 'arraybuffer',
          //   headers: {
          //     'X-Requested-With': 'XMLHttpRequest',
          //   },
          // });
          // const initialPdfBytes = initialPdfResponse.data;
          // console.log('*&*&*&', initialPdfBytes)
      
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
          const pdfBytesArray = await fetchPdfBytesArrayWithAxios(filePaths)
      
      
          // Create a new PDF document
          const mergedPdf = await PDFDocument.create();
      
          // Add the pages from the initial PDF
          // const initialPdfDoc = await PDFDocument.load(initialPdfBytes);
          // const initialPages = await mergedPdf.copyPages(initialPdfDoc, initialPdfDoc.getPageIndices());
          // initialPages.forEach((page) => mergedPdf.addPage(page));
      
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
          saveAs(blob, 'PO-'+poNo+'.pdf');
        }
        else{
          console.error('Access restricted for download.');
          AlertMessages.getErrorMessage("Access restricted for download, please enable in documents. ");
        }
      } catch (error) {
        console.error('Error merging and downloading PDFs:', error);
      }
    };
    
    useEffect(() => {
        getDocumentData();
    }, [])

    
    const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : any) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() =>{
                  handleReset(clearFilters)
                  setSearchedColumn(dataIndex)
                  confirm({closeDropdown:true})
                }
                   }
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
             
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex] ?record[dataIndex]     
             .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()):false,
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });

    const download = (filePath) => {
        console.log(filePath,'filePath')
        console.log(filePath);   
        if (filePath) {
          filePath = filePath.split(",");
          for (const res of filePath) {
            if(res){
              console.log(res);
              setTimeout(() => {
                const response = {
                //   file: appSettings.file_upload_path+'masters' +'/'+ `${res}`,
                  file: './upload-files/PO-${req.body.poNumber}',

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
      
      const goToFileUpload=(PO:string)=>{
        setPo(PO)
        navigate('/document-management/document-file-upload', { state: { data: PO } })
      }

      const deletePo = (po) =>{
        console.log(po)
      uploadDcoService.deleteDocsAgainstPo({customerPo:po}).then(res =>{
        if(res.status){
          message.success(res.internalMessage)
        }else{
          message.error(res.internalMessage)
        }
      }) 
      }

    const pocolumn = [
      {
        title: "S.No",
        key: "sno",
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * pageSize + (index + 1),
      },
        {
            title: 'PO NUMBER',
            dataIndex: 'PO',
            fixed: 'left',
            align:'center',
              ...getColumnSearchProps('PO'),

              render: (text, record) => {
                return <>
                  {JSON.parse(localStorage.getItem('currentUser')).user.roles != "Admin" ?
                  <Link onClick={e => goToFileUpload(record.PO)}>{record.PO}</Link> : <span>{record.PO}</span>}
                </>
              },

              // render: (text) => (
              //   <a href={`#/document-management/document-file-upload?text=${encodeURIComponent(text)}`}>{text}</a>
              // ),
        },
        
        {   
          title: 'Destination',
          dataIndex: 'destination',
          width:'180px',
          align:'center',
            ...getColumnSearchProps('destination'),

        },
        {   
          title: 'STATUS',
          dataIndex: 'orderPoStatus',
          width:'180px',
          // fixed: 'left',
          align:'center',
            ...getColumnSearchProps('orderPoStatus'),

        }
      ];

      const downloadcomun = [
        {
          title: 'DOWNLOAD',
          dataIndex: 'documentName',
          render :(text, rowData, index) =>{
            console.log(rowData)
            return (<div style={{alignContent:'center'}}>
               <Form.Item  name={rowData.PO} style={{alignItems: 'center'}}>
                 <Button type="primary" 
                disabled ={rowData.orderPoStatus == 'In Progress' || rowData.orderPoStatus == 'Closed' ? false:true}
                onClick={() => mergeAndDownloadPDFs(rowData.url, rowData.PO)}>
              <DownloadOutlined/>
              </Button>
               </Form.Item>   
               </div>     
                )
          }
        },
        {
          title: 'Delete Po',
          render :(text, rowData, index) =>{
            console.log(rowData)
            return (<div style={{alignContent:'center'}}>
               <Form.Item  name={rowData.PO+1} style={{alignItems: 'center'}}>
                <Popconfirm title={'Are you sure want to delete'} onConfirm={e =>deletePo(rowData.PO)}>
                <Button 
                disabled ={rowData.orderPoStatus == 'In Progress' || rowData.orderPoStatus == 'Closed' ? false:true}
               >
              <DeleteOutlined style={{color:'red'}}/>
              </Button>
                </Popconfirm>
               </Form.Item>   
               </div>     
                )
          }
        },
      ];
      
      const handleReset = (clearFilters:any) => {
        clearFilters();
        setSearchText('');
      };
      
      
      const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: string,
      ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };

    const getDocumentData = () => {  
      console.log(JSON.parse(localStorage.getItem('currentUser')).user.roles)
        service.getDynamicDataForDocList({role:JSON.parse(localStorage.getItem('currentUser')).user.roles}).then((res) => {
          if(res.status){
            setItemData(res.data);
            const headerColumns = Object?.keys(res?.data[0])
            .filter(header => header !== 'challanNo' && header !== 'invoiceNo' && header !== 'docListId' && header !== 'PO' && header !== 'filePath' && header !== 'status' && header !== 'url' && header !== 'poStatus' && header !== 'orderPoStatus' && header != 'destination')
            .map(header => ({           
                title: header.toUpperCase(),
                dataIndex: header,
                key: header,
              ...getColumnSearchProps([header]),       

                render:(data, record) =>{
                    // console.log(res.data,'header')
                    const backgroundColor = data === 'Yes' ? 'green' : 'red'
                  const datalink =  data === 'Yes' ? <Tooltip title={'Click here to download files'}><Link onClick={() => modelOpen(header, record)}>{data}</Link></Tooltip>:data
                    return    (
                     
                        <div style={{color:backgroundColor ,textAlign:'center'}} ><b>{datalink}</b></div>
                    )

                }
            }));
            if(JSON.parse(localStorage.getItem('currentUser')).user.roles === 'Admin' || JSON.parse(localStorage.getItem('currentUser')).user.roles === 'consolidator'){
              setColumns([...pocolumn,...headerColumns,...downloadcomun]);
            }else{
              setColumns([...pocolumn,...headerColumns]);
            }
            }
           
        else{
        }
        });
    }

    const getTotalDocUploadedAgainstPo =(poNumber:string)=>{    
      console.log(poNumber)
      uploadDcoService.totalFileUploadAgainstPo({customerPo:poNumber}).then(res =>{
        if(res.status){
          setDocumentsData(res.data)
        }else{
          setDocumentsData([])
        }
      })

    }

    const getFilepathsAginstpo =(header,record) =>{
      console.log(record.PO)
      console.log(header)
      uploadDcoService.getFilesAgainstPoandDocument({poNo:record.PO,document:header}).then(res =>{
        if(res.status){
          setFilesData(res.data)
        }else{
          setFilesData([])
        }
      })
    }

    const modelOpen =(header, record) =>{
      console.log(header)
      console.log(record)
      setIsModalOpen(true)
      getFilepathsAginstpo(header,record)
      // getTotalDocUploadedAgainstPo(poNumber)
    }

    const handleCancel =()=>{
      setIsModalOpen(false)
    }
    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    }



    const downloadpath = (file) => {
      console.log(file,'filepath');      
      if (file) {
          if(file.fileName){
            setTimeout(() => {
              const response = {
               file: config.importdownloadPath+'upload_files/'+'PO-'+`${file.poNo}/`+`${file.fileName}`
              };
              window.open(response.file);
            }, 100);
          }
      }
      else {
        AlertMessages.getErrorMessage("Please upload file. ");
  
      }
    }
    // const downloadpath = (file) => {
    //   if (file) {
    //     if (file.fileName) {
    //       setTimeout(() => {
    //         const filePath = config.importdownloadPath + 'upload_files/' + 'PO-' + `${file.poNo}/` + `${file.fileName}`;
            
    //         const a = document.createElement('a');
    //         a.href = filePath;
    //         a.download = file.fileName;
    //         a.style.display = 'none';
    //         document.body.appendChild(a);
    //         a.click();
    //         document.body.removeChild(a);
    //       }, 100);
    //     }
    //   } else {
    //     AlertMessages.getErrorMessage("Please upload a file.");
    //   }
    // }

    return (<Form form={form}>
        <Card title="Document management" headStyle={{ backgroundColor: '#77dfec', border: 0 }} extra={<span>{JSON.parse(localStorage.getItem('currentUser')).user.roles != "Admin" || JSON.parse(localStorage.getItem('currentUser')).user.roles != "consolidator" ?<Button onClick={() => navigate('/document-management/document-file-upload')} type={'primary'}>Upload</Button>:""}</span>}>
            {columns.length > 0 && itemData.length > 0 ? (
                <Table
                    columns={columns.map((column) => ({
                        ...column,
                        title: (
                            <div
                                style={{
                                    textAlign:'center'
                                }}
                            >
                                {column.title}
                            </div>
                        ),
                    }))}
                    dataSource={itemData}
                    scroll={{ x: true }}
                    bordered
                    pagination={{
                      onChange(current, pageSize) {
                        setPage(current);
                        setPageSize(pageSize);
                      },
                    }}
                />
            ) : (
                <p>No Data</p>
            )}
        </Card>
        <Modal
        title='DownLoad Documents'
         width={1000}
         centered
         open={isModalOpen}
         onCancel={handleCancel}
         footer={[]}
        >
          <Card>
          <div>
            <h3>Uploaded Documents:</h3>
            <ul>
                {filesData.map(file =>
                 (
                    <li key={file.uid}>
                      <Link onClick={()=>downloadpath(file)}>{file.fileName}</Link>
                        {/* <span>{file.fileName}</span> */}
                    </li>
                ))}
            </ul>
        </div>

          </Card>

        </Modal>
        </Form>
    )

}
export default UploadFileGrid