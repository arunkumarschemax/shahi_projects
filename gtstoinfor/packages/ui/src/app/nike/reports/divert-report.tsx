import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Row, Input, Col, Form, DatePicker, Select, Button, message, Checkbox } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import Item from 'antd/es/descriptions/Item';
import { Excel } from 'antd-table-saveas-excel';
import { Tooltip, numberFormat } from 'highcharts';
import { NikeService } from '@project-management-system/shared-services';

  
interface IExcelColumn {
    title: string;
    dataIndex: string;
    color?:string;
    children?: IExcelColumn[];
  }
  interface ExpandedRows {
    [key: string]: boolean;
}
const DivertReport = () => {

    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<any>(null);
    const [dataLength, setDataLength] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const service = new NikeService();
    const [expandedRows, setExpandedRows] = useState<ExpandedRows>({});
    const [textareaValues, setTextareaValues] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        getData();
        getCount();
    }, [])

    const handleCheckboxChange = (id: string) => {
        if (expandedRows[id]) {
            setExpandedRows(prevExpandedRows => ({ ...prevExpandedRows, [id]: false }));
        } else {
            setExpandedRows(prevExpandedRows => ({ ...prevExpandedRows, [id]: true }));
        }
    };
    const handleTextareaChange = (id: string, value: string) => {
        setTextareaValues(prevTextareaValues => ({ ...prevTextareaValues, [id]: value }));
    };

    const handleSubmit = (id: string) => {
        console.log(`Textarea value for ID ${id}:`, textareaValues[id]);
    }

    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: string) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: any) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearch = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    size="small"
                    style={{ width: 90 }}
                    onClick={() => {
                        handleReset(clearFilters);
                        setSearchedColumn(dataIndex);
                        confirm({ closeDropdown: true });
                    }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered: any) => (
            <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : false,
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select());
            }
        },
        render: (text: any) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });
// let oldSno = 0;
// let newSno = 0;


    const getCount= () =>{
        service.getCountForDivertReport().then(res => {

            if (res.status) {
                setDataLength(res.data)
            }
        })
    
    
}
    const getData = () =>{
     service.getDivertReportData().then(res=>{
        if (res.status) {
            setItems(res.data);
         
        }
     }) 
    }

   

    const handleExport = (e: any) => {
        e.preventDefault();
    
        const currentDate = new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .join("/");
    
       
            // const exportingColumns: IExcelColumn[] = [
            //     { title: 'old', 
   
            //     children: [
                    
            //         {
            //             title: "Request Date",
            //             dataIndex: "",
            //         },
            //         {
            //             title: "From Item",
            //             dataIndex: "",
            //         },
            //         {
            //             title: "Unit",
            //             dataIndex: "",
            //         },
            //         {
            //             title: "Plant",
            //             dataIndex: "oplant",
            //         },
            //         {
            //             title: "Product Code",
            //             dataIndex: "oproductCode",
        
            //         },
            //            {
            //             title: "Line Status",
            //             dataIndex: "onLineStatus",
            //             // ...getColumnSearchProps("lineStatus"),
        
            //         },
            //         {
            //             title: 'Document Date',
            //             dataIndex: 'oDocumentDate', 
            //             // render: (text, record) => {
            //             //    (record.documentDate
            //             //             ? moment(record.documentDate).format("YYYY-MM-DD")
            //             //             : "-")
                              
            //             // }
            //         },
            //         {
            //             title: 'Old Po',
            //             dataIndex: 'opoNumber',
        
                        
            //         }, 
            //         {
            //             title: 'Old Po Line',
            //             dataIndex: 'opoLine',
        
                        
            //         },
            //         {
            //             title: 'Old Qantity',
            //             //from yesterdays ppm
            //             dataIndex: 'oquantity', 
        
            //         },
            //         {
            //             title: 'Balance Qty',
            //             // from dpom
            //             dataIndex: 'nQuantity', 
        
            //         },
            //         {
            //             title: 'Destination',
            //             dataIndex: 'odestination',
         
            //         },
            //         {
            //             title: 'Shipment Type',
            //             dataIndex: 'oshipmentType', 
        
            //         },
            //         {
            //             title: 'OLD OGAC',
            //             dataIndex: 'oogac', 
            //         },
            //         {
            //             title: 'OLD GAC',
            //             dataIndex: 'ogac', 
            //         },
            //         {   
            //             title: 'Inventory Segment Code',
            //             dataIndex: 'oinventorySegmentCode',
         
            //         },
            //         {
            //             title: 'GAC Difference',
            //             dataIndex: 'ogac',
            //             render: (text, record) => {
            //               if (record.ogac && record.gac) {
            //                 const ogacDate = moment(record.ogac);
            //                 const gacDate = moment(record.gac);
            //                 const daysDifference = gacDate.diff(ogacDate, 'days');
            //                 return daysDifference + ' days';
            //               } else {
            //                 return '-';
            //               }
            //             },
            //           },
            //         {
            //             title: 'Item Vas',
            //             dataIndex: 'oitem_vas_text',
            //         },
                    
                
            //     ]  
            //     },
                
            //     { 
            //         title: 'New',
                
            //     children:[
            //         {  title: 'OGAC Date',
            //             dataIndex: 'nogac', 
            //             // render: (text, record) => {
            //             //  (record.ogac
            //             //             ? moment(record.ogac).format("YYYY-MM-DD")
            //             //             : "-")
                              
            //             // }
            //         },
            //         {
            //             title: 'GAC Date',
            //             dataIndex: 'ngac', 
            //             // render: (text, record) => {
            //             //     (record.gac
            //             //             ? moment(record.gac).format("YYYY-MM-DD")
            //             //             : "-")
            //             // }
            //         },{
            //         title:"No of Days to GAC",dataIndex:'dpomCreatedDates'
            //         // render: (text, record) => {
            //         //     if (record.dpomCreatedDates && record.nogac) {
            //         //       const dpomCreatedDate = moment(record.dpomCreatedDates);
            //         //       const nogacDate = moment(record.nogac);
            //         //       const daysDifference = nogacDate.diff(dpomCreatedDate, 'days');
            //         //       return daysDifference + ' days';
            //         //     } else {
            //         //       return "-";
            //         //     }
            //         //   }
            //         }, 
            //         {
            //             title:"To item",
            //             dataIndex:"",
            //             }, 
            //         {
            //            title:"Unit",
            //            dataIndex:"",
            //            },
        
            //         {
            //             title: "Plant",
            //             dataIndex: "nPlant",
            //         },
            //         {
            //             title: "Product Code",
            //             dataIndex: "nproductCode",
                      
        
            //         },
            //         {
            //             title: "Line Status",
            //             dataIndex:'nLineStatus'
            //         },
            //         {
            //             title: 'Document Date',
            //             dataIndex: 'nDocumentDate', 
            //             // render: (text, record) => {
            //             //  (record.nDocumentDate
            //             //             ? moment(record.nDocumentDate).format("YYYY-MM-DD")
            //             //             : "-")
            //             // }
            //         },
            //         {
            //             title: 'New Po',
            //             dataIndex: 'npoNumber',
            //         },
            //         {
            //             title: 'New Po Line',
            //             dataIndex: 'npoLine',
            //         },
            //         {
            //             title: 'Quantity',
            //             dataIndex: 'nQuantity', 
            //         },
            //         {
            //             title: 'Destination',
            //             dataIndex: 'ndestination', 
            //         },
                    
            //         {
            //             title: 'Inventory Segment Code',
            //             dataIndex: 'ninventorySegmentCode', 
            //         },
            //         {
            //             title: 'Item Vas',
            //             dataIndex: 'nitemVasText',
            //         },
                               
            //         {
            //             title: 'Shipment Type',
            //             dataIndex: 'nshipmentType',
            //         },
            //         {
            //             title: 'Item Vas Diff Check',
            //             dataIndex: '', 
            //         },
            //         {
            //             title: 'Qty Tally-Check',
            //             dataIndex: '', 
            //         },
            //         {
            //             title: 'Price-Fob Tally-Check',
            //             dataIndex: '', 
            //         },
            //         {
            //             title: 'Price-Net Includding Discount Tally-Check',
            //             dataIndex: '', 
            //         },
            //         {
            //             title: 'Price-Trading Co Net Includding Discount Tally-Check',
            //             dataIndex: '', 
            //         },
                
            //     ]}
                
            //   ];
        
    
        const excel = new Excel();
excel.addSheet("Sheet1");

// const formattedDataForExcel = modifiedCombinedData.map(item => ({
//     ...item,
//     sno: item.section === 'old' ? item.sno : newSno++,
// }));

// let newSno = 1;
// const newSectionStart = formattedDataForExcel.findIndex(item => item.section === 'new');
// if (newSectionStart >= 0) {
//     formattedDataForExcel.slice(newSectionStart).forEach((item, index) => {
//         if (item.section === 'new') {
//             item.sno = newSno++; 
//         }
//     });
// }

excel.addRow();
//excel.addColumns(exportingColumns);
// excel.addDataSource(formattedDataForExcel);
excel.saveAs(`Divert-report-${currentDate}.xlsx`);
}

    const columns: ColumnProps<any>[] = [

     
    { title: 'old', 
   
    children: [
        {
            title: 'S.No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: "Request Date",
            dataIndex: "",
        },
        {
            title: "From Item",
            dataIndex: "",
        },
        {
            title: "Unit",
            dataIndex: "",
        },
        {
            title: "Plant",
            dataIndex: "oplant",
        },
        {
            title: "Product Code",
            dataIndex: "oproductCode",
            sorter: (a, b) => a.productCode.localeCompare(b.productCode),
            sortDirections: ["descend", "ascend"],

        },
           {
            title: "Line Status",
            dataIndex: "onLineStatus",
            // ...getColumnSearchProps("lineStatus"),

        },
        {
            title: 'Document Date',
            dataIndex: 'oDocumentDate', 
            render: (text, record) => {
               (record.documentDate
                        ? moment(record.documentDate).format("YYYY-MM-DD")
                        : "-")
                  
            }
        },
        {
            title: 'Old Po',
            dataIndex: 'opoNumber',

            
        }, 
        {
            title: 'Old Po Line',
            dataIndex: 'opoLine',

            
        },
        {
            title: 'Old Qantity',
            //from yesterdays ppm
            dataIndex: 'oquantity', 

        },
        {
            title: 'Balance Qty',
            // from dpom
            dataIndex: 'nQuantity', 

        },
        {
            title: 'Destination',
            dataIndex: 'odestination',

        },
        {
            title: 'Shipment Type',
            dataIndex: 'oshipmentType', 

        },
        {
            title: 'OLD OGAC',
            dataIndex: 'oogac', 
        },
        {
            title: 'OLD GAC',
            dataIndex: 'ogac', 
        },
        {   
            title: 'Inventory Segment Code',
            dataIndex: 'oinventorySegmentCode',

        },
        {
            title: 'GAC Difference',
            dataIndex: 'ogac', 
            render: (text, record) => {
              if (record.ogac && record.gac) {
                const ogacDate = moment(record.ogac);
                const gacDate = moment(record.gac);
                const daysDifference = gacDate.diff(ogacDate, 'days');
                return daysDifference + ' days';
              } else {
                return "-";
              }
            }
          },
        {
            title: 'Item Vas',
            dataIndex: 'oitem_vas_text',
        },
        
    
    ]  as unknown as null, 
    },
    
    { title: 'New',
    
    children:[
       {
            title: 'S.No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: 'OGAC Date',
            dataIndex: 'nogac', 
            render: (text, record) => {
             (record.ogac
                        ? moment(record.ogac).format("YYYY-MM-DD")
                        : "-")
                  
            }
        },
        {
            title: 'GAC Date',
            dataIndex: 'ngac', 
            render: (text, record) => {
                (record.gac
                        ? moment(record.gac).format("YYYY-MM-DD")
                        : "-")
            }
        },{
        title:"No of Days to GAC",
        render: (text, record) => {
            if (record.dpomCreatedDates && record.nogac) {
              const dpomCreatedDate = moment(record.dpomCreatedDates);
              const nogacDate = moment(record.nogac);
              const daysDifference = nogacDate.diff(dpomCreatedDate, 'days');
              return daysDifference + ' days';
            } else {
              return "-";
            }
          }
        }, 
        {
            title:"To item",
            dataIndex:"",
            }, 
        {
           title:"Unit",
           dataIndex:"",
           },

        {
            title: "Plant",
            dataIndex: "nPlant",
        },
        {
            title: "Product Code",
            dataIndex: "nproductCode",
            sorter: (a, b) => a.nproductCode.localeCompare(b.nproductCode),
            sortDirections: ["descend", "ascend"],
            //...getColumnSearchProps("owner"),

        },
        {
            title: "Line Status",
            dataIndex:'nLineStatus'
        },
        {
            title: 'Document Date',
            dataIndex: 'nDocumentDate', 
            render: (text, record) => {
             (record.nDocumentDate
                        ? moment(record.nDocumentDate).format("YYYY-MM-DD")
                        : "-")
            }
        },
        {
            title: 'New Po',
            dataIndex: 'npoNumber',
        },
        {
            title: 'New Po Line',
            dataIndex: 'npoLine',
        },
        {
            title: 'Quantity',
            dataIndex: 'nQuantity', 
        },
        {
            title: 'Destination',
            dataIndex: 'ndestination', 
        },
        
        {
            title: 'Inventory Segment Code',
            dataIndex: 'ninventorySegmentCode', 
        },
        {
            title: 'Item Vas',
            dataIndex: 'nitemVasText',
        },

        {
            title: 'Shipment Type',
            dataIndex: 'nshipmentType',
        },
        {
            title: 'Item Vas Diff Check',
            dataIndex: '', 
        },
        {
            title: 'Qty Tally-Check',
            dataIndex: '', 
        },
        {
            title: 'Price-Fob Tally-Check',
            dataIndex: '', 
        },
        {
            title: 'Price-Net Includding Discount Tally-Check',
            dataIndex: '', 
        },
        {
            title: 'Price-Trading Co Net Includding Discount Tally-Check',
            dataIndex: '', 
        },
        {
            title:'CO-update',
            children:[
         {
            title:'Approve',
            dataIndex:'',
            render: (text, rowData) => (
                <span>
                    
                    <Form.Item>
                        <Checkbox value={'yes'}
                           // checked={rowData.selectedLevel === 'L1'}
                            //onChange={() => handleCheckboxChange('L1', rowData.qResponseId)}
                        ></Checkbox>
                    </Form.Item>
                </span>
            )


            },
            {
                title: 'Edit',
                dataIndex: 'id',
                render: (text, rowData) => (
                    <span>
                        <Form.Item>
                            <Checkbox
                                onChange={() => handleCheckboxChange(rowData.id)}
                                checked={expandedRows[rowData.id] || false}
                            ></Checkbox>
                        </Form.Item>
                    </span>
                ),
            },
            {
                title: 'Manual Type Item',
                dataIndex: 'id',
                render: (text, rowData) => (
                    <div>
                        {expandedRows[rowData.id] ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input
                                    style={{ marginRight: '10px' }}
                                    placeholder="Enter text"
                                    value={textareaValues[rowData.id] || ''}
                                    onChange={e =>
                                        handleTextareaChange(rowData.id, e.target.value)
                                    }
                                />
                                <Button
                                    type="primary"
                                    onClick={() => handleSubmit(rowData.id)}
                                >
                                    Submit
                                </Button>
                            </div>
                        ) : (
                            <Button
                                type="link"
                                onClick={() =>
                                    setExpandedRows(prevExpandedRows => ({
                                        ...prevExpandedRows,
                                        [rowData.id]: true,
                                    }))
                                }
                            >
                                Manual Edit
                            </Button>
                        )}
                    </div>
                ),
            },
    
        ]
        }
    
    ]as unknown as null,}

    ]
   



    return (
        <>
            <Card title="Divert Report" headStyle={{ fontWeight: 'bold' }}
                extra={ <Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={handleExport}
                    icon={<FileExcelFilled />}>Download Excel</Button>}>
                        <Row gutter={70}>
                 {/* <Col >
                    <Card title={'Total Line Status Count  : ' + Number(dataLength[0]?.totalCount)} style={{ textAlign: 'left', width: 280, height: 38, backgroundColor: ' lightblue' }}></Card>
                </Col>
                <Col>
                    <Card title={'Accepted  : ' + Number(dataLength[0]?.acceptedCount)} style={{ textAlign: 'left', width: 200, height: 38, backgroundColor: 'lightblue' }}></Card>
                </Col>
                <Col>
                    <Card title={'Unaccepted : ' +Number(dataLength[0]?.unacceptedCount)} style={{ textAlign: 'left', width: 180, height: 38, backgroundColor: 'lightblue' }}></Card>
                </Col>  */}
               
                
            </Row><br></br>
                            <Card >
                    <Table
                        columns={columns}
                        className="custom-table-wrapper"
                        dataSource={items}
                        pagination={{
                            onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize)
                            },   
                        }}
                        scroll={{ x: 'max-content' }}
                        bordered 
                       // expandedRowRender={(record) => record.additionalData} 
                        />
                    
        
                </Card>
            </Card>
        </>
    )
}

export default DivertReport





