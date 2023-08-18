import { useEffect, useRef, useState } from 'react';
import {  Button, Card, Form, Input, Table, Space, InputRef } from 'antd';
import {  SearchOutlined,  } from '@ant-design/icons';
import { AlertMessages, } from '@project-management-system/shared-models';
import { ColumnType } from 'antd/lib/table';
import { OrdersService } from '@project-management-system/shared-services';
import { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import Link from 'antd/lib/typography/Link';
import { redirect, useNavigate } from 'react-router-dom';


const UploadFileGrid = () =>{

    
    const service = new OrdersService()
    const [itemData, setItemData] = useState([])
    const [columns, setColumns] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filters, setFilters] = useState({});
    const [po, setPo]=useState('')
    const searchInput = useRef<InputRef>(null);
  let navigate = useNavigate();

    
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
            align:'center',

              ...getColumnSearchProps('PO'),

              render: (text, record) => {
                return <>
                  <Link onClick={e => goToFileUpload(record.PO)}>{record.PO}</Link>
                </>
              },

              // render: (text) => (
              //   <a href={`#/document-management/document-file-upload?text=${encodeURIComponent(text)}`}>{text}</a>
              // ),
        },
      ];

      const downloadcomun = [
        {
          title:'STATUS',
          dataIndex:'status'
        },
        {
          title: 'DOWNLOAD',
          dataIndex: 'documentName',
          render :(text, rowData, index) =>{
            return (<div style={{alignContent:'center'}}>
               <Form.Item  name={rowData.PO} style={{alignItems: 'center'}}>
                  <Button style={{ marginRight: '10px' }}onClick={()=>download(rowData.filePath)}  >
                     Download
                   </Button>
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
            .filter(header =>header !== 'docListId' && header !== 'PO' && header !== 'filePath' && header !== 'status')
            .map(header => ({           
                title: header.toUpperCase(),
                dataIndex: header,
                key: header,
              ...getColumnSearchProps([header]),
                
                render:(data, record) =>{
                    console.log(res.data,'header')
                    const backgroundColor = data === 'Yes' ? 'green' : 'red'
                    return    (
                        <div style={{color:backgroundColor ,textAlign:'center'}} >{data}</div>
                    )
              
                }
            }));
            setColumns([...pocolumn,...headerColumns,...downloadcomun]);
          
        });
    }



    return (

        <Card title="Document Status">
            <div style={{ marginBottom: 16 }}>
            {/* <button onClick={handleResetFilters}>Reset Filters</button> */}
            </div>
            {columns.length > 0 && itemData.length > 0 ? (
                <Table
                    columns={columns.map((column) => ({
                        ...column,
                        title: (
                            <div
                                style={{
                                    // fontWeight: 'bold',
                                    // backgroundColor: '#3582c4', // Highlight color
                                    // padding: '8px',
                                    textAlign:'center'
                                }}
                            >
                                {column.title}
                            </div>
                        ),
                    }))}
                    // dataSource={itemData.filter((item) =>
                    //     // Filter data based on search text
                    //     Object.values(item).some((value) =>
                    //         value.toString().toLowerCase().includes(searchText.toLowerCase())
                    //     )
                    // )}
                    // pagination={false}

                      //  columns={columns}
                    dataSource={itemData}
                    pagination={false}
                />
            ) : (
                <p>No Data</p>
            )}
        </Card>
    )

}
export default UploadFileGrid