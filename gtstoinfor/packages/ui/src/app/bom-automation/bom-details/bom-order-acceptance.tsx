import { SearchOutlined, UndoOutlined } from "@ant-design/icons"
import { BomItemReq, DpomApproveRequest, PpmDateFilterRequest } from "@project-management-system/shared-models";
import { NikeService } from "@project-management-system/shared-services";
import { Button, Card, Col, DatePicker, Descriptions, Divider, Form, Input, Modal, Row, Select, Table, message } from "antd"
import { ColumnsType } from "antd/es/table"
import { TableRowSelection } from "antd/es/table/interface";
import moment from "moment";
import { useEffect, useRef, useState } from "react"
import Highlighter from 'react-highlight-words';

const BomOrderAcceptance = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); 
       const [page, setPage] = useState<number>(1);
    const [data,setData] = useState<any[]>([])
    const [form] = Form.useForm();
    const nikeService = new NikeService();
    const [styleNumber, setStyleNumber] = useState<any>([]);
    const [planSesCode, setPlanSesCode] = useState<any>([]);
    const [planSesYear, setPlanSesYear] = useState<any>([]);
    const [itemNoValues, setItemNoValues] = useState({});
    const [searchText, setSearchText] = useState('');
    const searchInput = useRef(null);
    const [searchedColumn, setSearchedColumn] = useState('');
    const [pageSize, setPageSize] = useState(1);
    const { Option } = Select;
    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => {
    
        getOrderAcceptanceData()
        getStyleNumber();
        getSesonCode();
        getSesonYear();
    }, []) 
   

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
      };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    

    
    const onReset = () => {
        form.resetFields()
        setData([])
        setSelectedRowKeys([])
    }

    const getSesonYear = () => {
        nikeService.getPpmPlanningSeasonYearFactory().then(res => {
            setPlanSesYear(res.data)
        })
    }

    const getSesonCode = () => {
        nikeService.getPpmPlanningSeasonCodeFactory().then(res => {
            setPlanSesCode(res.data)
        })
    }

    const getStyleNumber = () => {
        nikeService.getStyleNumberForOrderCreation().then(res => {
            setStyleNumber(res.data)
        })
    }
    const getOrderAcceptanceData = () => {
        const req = new PpmDateFilterRequest();
        
        if (form.getFieldValue('styleNumber') !== undefined) {
            req.styleNumber = form.getFieldValue('styleNumber');
        }
        if (form.getFieldValue('planningSeasonCode') !== undefined) {
            req.planningSeasonCode = form.getFieldValue('planningSeasonCode');
        }
        if (form.getFieldValue('planningSeasonYear') !== undefined) {
            req.planningSeasonYear = form.getFieldValue('planningSeasonYear');
        }
        nikeService.getdpomDataForBom(req).then((res) => {
            if (res.data) {
                setData(res.data)
                message.success(res.internalMessage)
            } else (
                setData([]),
                message.error(res.internalMessage)
            )
        })
    }
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

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };


    const isActionButtonEnabled = (record) => {
        return itemNoValues[record.key] && itemNoValues[record.key].trim() !== "";
    };

    const columns: any = [
        {
            title: "S.No",
            key: "sno", width: 50,
            responsive: ["sm"],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            fixed: 'left'
        },
        {
            title: 'PO Number and Line',
            dataIndex: 'po_and_line',
            key: 'po_and_line', 
            fixed: 'left',
            width: 80,
            ...getColumnSearchProps('po_and_line')
        },
        {
            title: 'Item',
            dataIndex: 'item', width: 80,
        },
        // {
        //     title: 'PO Line Item No',
        //     dataIndex: 'po_line_item_number', width: 80,
        //     fixed: 'left', align: 'center'
        // },
        {
            title: 'Document Date',
            dataIndex: 'documentDate', width: 80,
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'Product Code',
            dataIndex: 'product_code', width: 80,
        },
        {
            title: 'Color Description',
            dataIndex: 'color_desc', width: 80,
        },
        {
            title: 'Destination Country Code',
            dataIndex: 'destination_country_code', width: 75,
        },
        {
            title: 'Destination Country',
            dataIndex: 'destination_country', width: 75,
        },
        // {
        //     title: 'MRGAC', dataIndex: 'MRGAC', className: "right-column", width: 70, render: (text, record) => {
        //         return record.MRGAC ? moment(record.MRGAC).format('MM/DD/YYYY') : '-';
        //     },
        // },
        // {
        //     title: 'OGAC', dataIndex: 'OGAC', className: "right-column", width: 70, render: (text, record) => {
        //         return record.OGAC ? moment(record.OGAC).format('MM/DD/YYYY') : '-';
        //     },
        // },
        // {
        //     title: 'GAC', dataIndex: 'GAC', className: "right-column", width: 70, render: (text, record) => {
        //         return record.GAC ? moment(record.GAC).format('MM/DD/YYYY') : '-';
        //     },
        // },
        {
            title: 'Planning Season Code',
            dataIndex: 'planning_season_code',
            align: 'center', width: 70,
        },
        {
            title: 'Planning Season Year',
            dataIndex: 'planning_season_year', width: 70,
            align: 'center',
        },
        {
            title: 'Category',
            dataIndex: 'category_desc',
            width: 80,
        },
        {
            title: 'Total Item Qty',
            dataIndex: 'total_item_qty', width: 70,
            align: 'right',
            render: (text) => <strong>{text}</strong>
        },
        // {
        //     title: "Item No",
        //     dataIndex: "itemNo", width: 100,
        //     render: (text, record) => {
        //         return (
        //             <Form>
        //                 <Form.Item>
        //                     <Input
        //                         placeholder="Enter Item No"
        //                         onChange={(e) => handleItemNoChange(e.target.value, record)}
        //                     />
        //                 </Form.Item>
        //             </Form>
        //         );
        //     },
        // },
        
    ];
    const handleItemNoChange = (value, record) => {
        setItemNoValues((prevValues) => ({
            ...prevValues,
            [record.key]: value,
        }));
    };

    const openModeal =( )=>{
        setShowModal(true)

    }
  
   
    const handleBatchUpdate = () => {
        const selectedRecords = data.filter(record => selectedRowKeys.includes(record));
    
        const idsToUpdate = selectedRecords.map(record => record.dpom_id);
        const itemNoValue = form.getFieldValue('itemNo');
    
        const payload: BomItemReq = {
            id: idsToUpdate,
            itemNo: itemNoValue,
        };
    
        nikeService.updateBomItems(payload).then((res) => {
            if (res.status) {
                getOrderAcceptanceData();
                message.success(res.internalMessage);
                setShowModal(false);
            } else {
                message.error(res.internalMessage);
            }
        });
    };
    
  return (
    <Card title="Bom Item Register - Unaccepted Orders" headStyle={{ fontWeight: 'bold' }}>
          <Form
                    onFinish={getOrderAcceptanceData}
                    form={form}
                    layout='vertical'>
                    <Row gutter={24}>
                     
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                            <Form.Item name='styleNumber' label='Style Number' >
                                <Select
                                    showSearch
                                    placeholder="Select Style Number"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {styleNumber?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.style_number}>{inc.style_number}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                            <Form.Item name='planningSeasonCode' label='Planning Season Code' >
                                <Select
                                    showSearch
                                    placeholder="Select Planning Season Code"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {planSesCode?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.planning_season_code}>{inc.planning_season_code}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                            <Form.Item name='planningSeasonYear' label='Planning Season Year' >
                                <Select
                                    showSearch
                                    placeholder="Select Planning Season Year"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {planSesYear?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.planning_season_year}>{inc.planning_season_year}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ marginTop: 20 }} >
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>SEARCH</Button>
                                <Button style={{ marginLeft: 8 }} htmlType="submit" type="primary" onClick={onReset} icon={<UndoOutlined />}>RESET</Button>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ marginTop: 20 }} >
                            <Button onClick={openModeal} style={{
                         backgroundColor: selectedRowKeys.length > 0 ? "aqua" : "white",
                         color: selectedRowKeys.length > 0 ? "black" : "black", }}
                            disabled={selectedRowKeys.length === 0}>Update Bom Items</Button>
                            </Col>
                        
                    </Row>
                </Form>
               
{data.length > 0 ? (
  <Table
    columns={columns}
    rowKey={record => record}
    dataSource={data}
    rowSelection={rowSelection}
    pagination={{
      pageSize: 50,
      onChange(current, pageSize) {
        setPage(current);
        setPageSize(pageSize);
      },
    }}
    className="custom-table-wrapper"
    scroll={{ x: 'max-content', y: 450 }}
    bordered
  />
) : (
  <Table size='large' />
)}

<Modal open={showModal} closable footer={false} onCancel={() => setShowModal(false)} >
<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 12 }} style={{alignContent:'center'}} >
            <Form  onFinish={handleBatchUpdate}
                    form={form}
                    layout='vertical'>
                         <Form.Item  name='itemNo' label='Item No'>
                             <Input
                                 placeholder="Enter Item No"
                                // onChange={(e) => handleItemNoChange(e.target.value, record)}
                             /> 
                         </Form.Item>
                     </Form>
                     </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }}
                 xl={{ span: 4 }} style={{ marginTop: 20 }} >
                            <Button onClick={handleBatchUpdate} style={{
                         backgroundColor:  "aqua" 
                          }}
                            disabled={selectedRowKeys.length === 0}>Update</Button>
                            </Col>
            </Modal>
    </Card>

  )
}
export default BomOrderAcceptance