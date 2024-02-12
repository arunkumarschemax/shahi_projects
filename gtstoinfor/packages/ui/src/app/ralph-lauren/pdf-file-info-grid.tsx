import { Button, Card, Col, Form, Input, Modal, Row, Select, Table, Tag, Tooltip, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { NikeService, RLOrdersService } from "@project-management-system/shared-services";
import React from "react";
import { ArrowDownOutlined, FilePdfOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AlertMessages from "../common/common-functions/alert-messages";
import { config } from "packages/libs/shared-services/config";
import { OrderRevertModel, PoOrderFilter, StatusTypeEnum } from "@project-management-system/shared-models";


export function PdFInfoGrid() {
    const service = new RLOrdersService();
    const navigate = useNavigate();
    const searchInput = useRef(null);
    const [pdfData, setPdfData] = useState<any>([]);
    const [poLine, setPoLine] = useState<any>([]);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [poNumber, setPoNumber] = useState('');
    const [form] = Form.useForm();
    const { Option } = Select;
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [buyer, setBuyer] = useState<any>([]);



    useEffect(() => {
        getPdfFileInfo()
        BuyerPo()
    }, [])

    const BuyerPo = () => {
        service.getBuyerPoNumber().then(res => {
            if (res.status) {
                setBuyer(res.data)
            }
        })
    }

    const getPdfFileInfo = () => {
        const req = new PoOrderFilter();
        if (form.getFieldValue("poNumber") !== undefined) {
          req.poNumber = form.getFieldValue("poNumber");
        }
        service.getPdfFileInfo(req).then(res => {
            if(res.status){
            setPdfData(res.data)
               }
        })
    }
    const onReset = () => {
        form.resetFields()
        getPdfFileInfo()
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };


    const showModal1 = (record) => {
        setPoNumber(record)
        setIsModalOpen1(true);
    };


    const cancelHandle = () => {
        setIsModalOpen1(false);

    };
    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
                <Button size="small" style={{ width: 90 }}
                    onClick={() => {
                        handleReset(clearFilters)
                        setSearchedColumn(dataIndex);
                        confirm({ closeDropdown: true });
                    }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : false,
        onFilterDropdownVisibleChange: visible => {
            if (visible) { setTimeout(() => searchInput.current.select()); }
        },
        render: text =>
            text ? (
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                ) : text
            )
                : null
    })

    // const updateDownloadStatus = async (value, record) => {
    //     try {
    //         const res = await service.updateDownloadStatus({ id: record.id, status: value });
    //         if (res.status) {
    //             message.success(res.internalMessage);
    //             return true;
    //         } else {
    //             message.error(res.internalMessage);
    //             return false;
    //         }
    //     } catch (error) {
    //         console.error("Error occurred while Updating Status:", error);
    //         return false;
    //     }
    // };
    
// const isDownloadOnchange = async (value, record) => { 
//     const statusUpdated = await updateDownloadStatus(value, record);
//     if (statusUpdated) {
//         const updatedPdfData = pdfData.filter(item => item.id !== record.id);
//         setPdfData(updatedPdfData); 
//     }
// };


// const handleCancel = async (record) => { 
//     const value = record.status === 'CANCELLED' ? 'NOT CANCELLED' : 'CANCELLED';
//     const statusUpdated = await updateDownloadStatus(value, record);
//     if (statusUpdated) {
//         const updatedPdfData = pdfData.map(item => {
//             if (item.id === record.id) {
//                 return { ...item, status: value };
//             }
//             return item;
//         });
//         setPdfData(updatedPdfData); 
//         getPdfFileInfo();
//     }
// };

    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            width: 50,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            fixed: 'left'
        },
        {
            title: 'PO Number',
            dataIndex: 'poNumber',
            width:70 ,
            sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-",
            // ...getColumnSearchProps('poNumber')
        },
        // {
        //     title: 'File Name',
        //     dataIndex: 'pdfFileName',
        //     width: 300,
        //     sorter: (a, b) => a.pdfFileName.localeCompare(b.pdfFileName),
        //     sortDirections: ["ascend", "descend"],
        //     render: (text) => text ? text : "-",
        //      ...getColumnSearchProps('pdfFileName')
        // },
        {
            title: "File Name",
            dataIndex: "pdfFileName",
            width: 150,
            sorter: (a, b) => a.pdfFileName.localeCompare(b.pdfFileName),
            sortDirections: ["ascend", "descend"],
            ...getColumnSearchProps('pdfFileName'),
            render: (text) => (
              <Tooltip title={text || "-"}>
                {text ? `${text.substring(0, 20)}...` : "-"}
              </Tooltip>
            ),
          },
        {
            title: 'File Type',
            dataIndex: 'fileType',
            width: 30,
            align: 'center',
            // sorter: (a, b) => a.fileType.localeCompare(b.fileType),
            sortDirections: ["ascend", "descend"],
            render: (text) => text ? text : "-"
            // ...getColumnSearchProps('fileType')
        },
        {
            title: 'Uploaded Date',
            dataIndex: 'createdAt',
            align: 'center',
            width: 90,
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
            sortDirections: ["ascend", "descend"],
            render: (text, record) => {
                return record.createdAt ? moment(record.createdAt).format('MM/DD/YYYY') : '-'
            }

            
            
            
        },
        {
            title: "Action",
            dataIndex: "action",
            align: "center",
            width: 150,
            render: (value, record) => (
              <>
              <Row>
                <Button type="primary" onClick={() => setMoreData(record)}>More Info</Button>
                <br></br>&nbsp;&nbsp;
                <Tooltip title="PDF download">
                <Button icon={<FilePdfOutlined  style={{color:"red"}}onClick={()=>download(record.filePath)}/>} >{value}</Button>
                </Tooltip>
                <br></br> &nbsp;&nbsp;

                {/* <Button icon={<UndoOutlined style={{color:"red"}} />}  onClick={()=>revert(record)}>Revert File</Button> */}

                </Row>
      
      
              </>
            ),
          },
        //   {
        //     title: "Status",
        //     dataIndex: "status",
        //     align: "center",
        //     width:120,
        //     render: (value, record) => {
        //             return (
        //                 <Button type="primary" danger onClick={() => handleCancel(record)}>Cancel</Button>
        //             );
        //     },
        // },
        
    ]

    const setMoreData = (record) => {
        navigate("/ralph-lauren/pdf-detail-view", {
          state: { data: record },
        });
      };

      const download = (filePath) => {
        console.log(filePath);
        // : FilenameDto[]
        
        if (filePath) {
          filePath = filePath.split(",");
          for (const res of filePath) {
            if(res){
              console.log(res);
              setTimeout(() => {
                const response = {
                  file: config.file_upload_path+'/'+ `${res}`,
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

      const revert =(record) =>{

        console.log(record,"pppkk")
        const  req = new OrderRevertModel(record.id,record.poNumber)
        service.revertProjectionFileData(req).then(res => {
           if (res.status){
            AlertMessages.getSuccessMessage(res.internalMessage)
           }else {
            AlertMessages.getErrorMessage(res.internalMessage)
           }
        })


      }
      
      
    return (
        <>
            <Card title="PDF History" headStyle={{ fontWeight: 'bold' }}>
                <Form
             onFinish={getPdfFileInfo}
            form={form}
            >
            <Row gutter={24}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 6 }}
            >
              <Form.Item name="poNumber" label="PO Number">
                <Select
                  showSearch
                  placeholder="Select PO Number"
                  optionFilterProp="children"
                  allowClear
                >
                  {buyer.map((inc: any) => {
                    return (
                      <Option key={inc.po_number} value={inc.po_number}>
                        {inc.po_number}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
              xl={{ span: 4 }}
            >
              <Form.Item>
                <Button
                  style={{ marginLeft: 40 }}
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  type="primary"
                >
                  Search
                </Button>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 5 }}
              lg={{ span: 5 }}
              xl={{ span: 4 }}
            >
              <Form.Item>
                <Button
                //   style={{ marginLeft: 0 }}
                  htmlType="submit"
                  type="primary"
                  onClick={onReset}
                  icon={<UndoOutlined />}
                >
                  Reset
                </Button>
              </Form.Item>
            </Col>
            </Row>
        </Form>
                <Table
                    columns={columns}
                    dataSource={pdfData}
                    bordered
                    className="custom-table-wrapper"
                    pagination={{
                        pageSize: 50,
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize);
                        },
                    }}
                    scroll={{ x: 'max-content', y: 450 }}
                >
                </Table>
            </Card>
        </>
    )
}
export default PdFInfoGrid;