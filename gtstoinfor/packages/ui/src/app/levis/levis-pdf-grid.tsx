import { Button, Card, Col, Form, Input, Modal, Row, Select, Table, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { CentricService, HbService, LevisService, NikeService, RLOrdersService } from "@project-management-system/shared-services";
import React from "react";
import { FilePdfOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AlertMessages } from "packages/libs/shared-models/src/common/supplier/alert-messages";
import { config } from "packages/libs/shared-services/config";
import { LevisOrderFilter } from "@project-management-system/shared-models";


export function LevisPdFInfoGrid() {
    const service = new LevisService();
    const navigate = useNavigate();
    const searchInput = useRef(null);
    const [pdfData, setPdfData] = useState<any>([]);
    const [poLine, setPoLine] = useState<any>([]);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [poNumber, setPoNumber] = useState([]);
    const [form] = Form.useForm();
    const { Option } = Select;
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [orderData, setOrderData] = useState<any>([]);
    const [filterData, setFilterData] = useState([]);
    let location = useLocation();
    

    console.log(location?.state,"ddddddddddd")



    useEffect(() => {
        if (location?.state === "rec") {
            getPdfFileInfo();
        }
    }, []);

    useEffect(() => {
        getPdfFileInfo();
        getHistoryPoNumber()
    }, []);
    
    
    const getPdfFileInfo = () => {
        const req = new LevisOrderFilter();
  
        if (form.getFieldValue("poNumber") !== undefined) {
          req.poNumber = form.getFieldValue("poNumber");
        }
        service.getPdfFileInfo(req).then(res => {
            if (res.status) {
                setOrderData(res.data);
                setFilterData(res.data);
              } else {
                setOrderData([]);
                setFilterData([])
                AlertMessages.getErrorMessage(res.internalMessage);
              }
            }).catch((err) => {
              console.log(err.message);
            });
        
    }

    
    const getHistoryPoNumber = () => {
        service.getHistoryPoNumber().then((res) => {
          if (res.status) {
            setPoNumber(res.data);
          
          }
        });
      };
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

    const setMoreData = (record) => {
        navigate("/levis/pdf-info-detail-view", {
            state: { data: record },
        });
    };


    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            width: 50,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            fixed: 'left'
        },
        {
            title: 'Customer PO',
            dataIndex: 'po_number',
            width:70 ,
            sorter: (a, b) => a.po_number.localeCompare(b.po_number),
            sortDirections: ["ascend", "descend"],
            ...getColumnSearchProps('po_number')
        },
        {
            title: 'File Name',
            dataIndex: 'pdf_file_name',
            width: 90,
            sorter: (a, b) => a.pdf_file_name.localeCompare(b.pdf_file_name),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'File Type',
            dataIndex: 'file_type',
            width: 90,
            sorter: (a, b) => a.file_type.localeCompare(b.file_type),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'Uploaded Date',
            dataIndex: 'upload_date',
            align: 'center',
            width: 90,
            sorter: (a, b) => a.upload_date.localeCompare(b.upload_date),
            sortDirections: ["ascend", "descend"],
            render: (text, record) => {
                return record.upload_date ? record.upload_date : '-'
            }


        },
        {
            title: 'Status',
            dataIndex: 'upload_status',
            align: 'center',
            width: 80,
            filters: [
                {
                    text: 'SUCCESS',
                    value: 'SUCCESS',
                },
                {
                    text: 'FAILED',
                    value: 'FAILED',
                },

            ],
            onFilter: (value, record) => { return record.upload_status.toLowerCase() === value.toLowerCase(); }



        },

        {
            title: "Action",
            dataIndex: "action",
            align: "center",
            width: 120,
            render: (value, record) => (
                <>
                    <Button
                        type="primary"
                onClick={() => setMoreData(record)}
                    >More Info</Button>
                    <Tooltip title="PDF download">
                        <Button icon={<FilePdfOutlined onClick={() => download(record.pdf_file_name)}  style={{color:"red"}}/>} >{value}</Button>
                    </Tooltip>
                </>
            ),
        }


    ]

    const download = (filePath) => {
        console.log(filePath);
        // : FilenameDto[]

        if (filePath) {
            filePath = filePath.split(",");
            for (const res of filePath) {
                if (res) {
                    console.log(res);
                    setTimeout(() => {
                        const response = {
                            file: config.file_upload_path + '/' + `${res}`,
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

    return (
        <>
            <Card title="Orders History" headStyle={{ fontWeight: 'bold' }}>
            <Form
            onFinish={getPdfFileInfo}
            form={form}
          layout='vertical'
          >
            <Row gutter={24}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 4 }}
                lg={{ span: 4 }}
                xl={{ span: 4 }}
              >
                <Form.Item name="poNumber" label="PO Number">
                  <Select
                    showSearch
                    placeholder="Select PO Number"
                    optionFilterProp="children"
                    allowClear
                  >
                    {poNumber.map((inc: any) => {
                      return (
                        <Option key={inc.po_number} value={inc.po_number}>
                          {inc.po_number}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
                {/* <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                 <Form.Item label="Style" name="style"  >
                    <Input placeholder="Enter Style " allowClear />
                  </Form.Item>
                </Col> */}
                {/* <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                 <Form.Item label="Color" name="color"  >
                    <Input placeholder="Enter Color "  allowClear />
                  </Form.Item>
                </Col> */}
                {/* <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 4 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                 <Form.Item label="Delivery Date" name="deliveryDate"  >
                    <RangePicker style={{width:180}}   />
                  </Form.Item>
                </Col> */}
                <Row>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 5 }}
                  lg={{ span: 5 }}
                  xl={{ span: 4 }}
                  style={{marginTop:20,marginLeft:60}}
                >
                  <Form.Item >
                    <Button
                      htmlType="submit"
                      icon={<SearchOutlined />}
                      type="primary"
                      onClick={getPdfFileInfo}
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
                  style={{ marginLeft: 80 }}

                >
                  <Form.Item style={{marginTop:20}}>
                    <Button
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
            </Row>
          </Form>
                <Table
                    columns={columns}
                    dataSource={filterData}
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
export default LevisPdFInfoGrid;