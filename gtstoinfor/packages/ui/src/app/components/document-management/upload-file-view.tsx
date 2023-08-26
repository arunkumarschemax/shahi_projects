import { useEffect, useRef, useState } from 'react';
import {  Button, Card, Form, Input, Table, Space, InputRef, Modal } from 'antd';
import {  DownloadOutlined, SearchOutlined,  } from '@ant-design/icons';
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


const UploadFileGrid = () =>{

    
    const service = new OrdersService()
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
        saveAs(blob, 'PO-'+poNo+'.pdf');
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

    const pocolumn = [
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
      ];

      const downloadcomun = [
        {
          title:'PO STATUS',
          dataIndex:'status',
          align:'center',
          render:(text: string, rowData: any, index: number) =>{
            const hasNo = Object.values(rowData).some((value: any) => typeof value === 'string' && value === 'No');
            const hasYes = Object.values(rowData).some((value: any) => typeof value === 'string' && value.includes('Yes'));
            if (hasNo) {
              return 'Partially Uploaded';
            } else if (!hasYes) {
              return 'Pending';
            } else {
              return 'Fully Uploaded';
            }
          }
        },
        {
          title: 'DOWNLOAD',
          dataIndex: 'documentName',
          render :(text, rowData, index) =>{
            return (<div style={{alignContent:'center'}}>
               <Form.Item  name={rowData.PO} style={{alignItems: 'center'}}>
                  {rowData.status === "partially uploaded" ? "-" :<Button type="primary" 
                onClick={() => mergeAndDownloadPDFs(rowData.url, rowData.PO)}>
              <DownloadOutlined/>
              </Button>}
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
        service.getDynamicDataForDocList().then((res) => {
            setItemData(res.data);
            const headerColumns = Object.keys(res.data[0])
            .filter(header =>header !== 'docListId' && header !== 'PO' && header !== 'filePath' && header !== 'status' && header !== 'url')
            .map(header => ({           
                title: header.toUpperCase(),
                dataIndex: header,
                key: header,
              ...getColumnSearchProps([header]),
                
                render:(data, record) =>{
                    // console.log(res.data,'header')
                    const backgroundColor = data === 'Yes' ? 'green' : 'red'
                    return    (
                        <div style={{color:backgroundColor ,textAlign:'center'}} >{data}</div>
                    )
              
                }
            }));
            setColumns([...pocolumn,...headerColumns,...downloadcomun]);
          
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

    const modelOpen =(poNumber:string) =>{
      setIsModalOpen(true)
      getTotalDocUploadedAgainstPo(poNumber)
    }

    const handleCancel =()=>{
      setIsModalOpen(false)
    }
    return (<Form form={form}>
        <Card title="Document management" extra={<span>{JSON.parse(localStorage.getItem('currentUser')).user.roles != "Admin" ?<Button onClick={() => navigate('/document-management/document-file-upload')} type={'primary'}>Upload</Button>:""}</span>}>
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
                    pagination={false}
                />
            ) : (
                <p>No Data</p>
            )}
        </Card>
        <Modal
        title='View Documents'
         width={1000}
         centered
         open={isModalOpen}
         onCancel={handleCancel}
         footer={[]}
        >
          <Card>
          <div>
            <h3>Uploaded Files:</h3>
            <ul>
                {documentdat.map(file =>
                 (
                    <li key={file.uid}>
                        <span>{file.fileName}</span>
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