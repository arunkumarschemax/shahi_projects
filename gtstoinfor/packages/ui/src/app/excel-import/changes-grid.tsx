import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, Tabs, TabsProps, Tag, Tooltip, Typography } from 'antd';
import { OrdersService } from '@project-management-system/shared-services';
import { ArrowDownOutlined, ArrowUpOutlined, FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Excel } from 'antd-table-saveas-excel';
import Highlighter from 'react-highlight-words';
import { IExcelColumn } from 'antd-table-saveas-excel/app';

const ChangesGrid = () => {

    const service = new OrdersService()
    const [contractDateData, setContractDateData] = useState([])
    const [qtyData, setQtyData] = useState([])
    const [warehouseDateData, setWarehouseDateDate] = useState([])
    const [filteredContractDateData, setFilteredContractDateData] = useState([])
    const [filteredQtyData, setFilteredQtyData] = useState([])
    const [filteredWarehouseDateData, setFilteredWarehouseDateDate] = useState([])
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
    const [phaseData, setPhaseWiseData] = useState<any[]>([]);
    const [pageSize, setPageSize] = useState<number>(null);
    const [differenceQtyData, setDifferenceQtyData] = useState([])
    const [page, setPage] = React.useState(1);
    const [form] = Form.useForm();
    const { Text } = Typography;
    const { RangePicker } = DatePicker
    const { Option } = Select

    useEffect(() => {
        getContractDateChangeData()
        getQtyChangeData()
        getWharehouseDateChangeData()
        getQtyDifChangeData()
        getPhaseWiseData()
    }, [])

    const getContractDateChangeData = () => {
        service.getContractDateChangeData().then((res) => {
            setContractDateData(res.data)
            setFilteredContractDateData(res.data)
        })
    }

    const getQtyDifChangeData = () => {
        service.getQtyDifChangeData().then((res) => {
            setDifferenceQtyData(res.data)
            // setFilteredContractDateData(res.data)
        })
    }

    const getQtyChangeData = () => {
        service.getQtyChangeData().then((res) => {
            setQtyData(res.data)
            setFilteredQtyData(res.data)
        })
    }

    const getWharehouseDateChangeData = () => {
        service.getWharehouseDateChangeData().then((res) => {
            setWarehouseDateDate(res.data)
            setFilteredWarehouseDateDate(res.data)
        })
    }
    const getPhaseWiseData = () => {
        service.getPhaseWiseData().then(res => {
            if (res.status) {
                setPhaseWiseData(res.data)
            }
        }).catch(err => {
            console.log(err.message)
        })
    }
    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet('order Qty')
            .addColumns(data1)
            .addDataSource(filteredQtyData, { str2num: true })
            .addSheet('GroupBy ItemCode Qty')
            .addColumns(data4)
            .addDataSource(differenceQtyData, { str2num: true })
            .addSheet('Requested Warehouse Date')
            .addColumns(data2)
            .addDataSource(filteredWarehouseDateData, { str2num: true })
            .addSheet('Contracted date')
            .addColumns(data3)
            .addDataSource(contractDateData, { str2num: true })
            .addSheet('Phase Wise data')
            .addColumns(exportingColumns)
            .addDataSource(phaseData, { str2num: true })
            .saveAs('revisedOrders.xlsx');
    }
    const data1 = [

        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'new_val',

        },
        {
            title: 'Contracted Date',
            dataIndex: 'contracted_date',

        },
        {
            title: 'Order Revised Date',
            dataIndex: 'last_update_date',

        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date',

        },
        {
            title: 'Order Status',
            dataIndex: 'order_status'
        }
    ]
    const data2 = [
        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'new_val',

        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'order_qty_pcs'
        },
        {
            title: 'Contracted Date',
            dataIndex: 'contracted_date'
        },
        {
            title: 'Order Revised Date',
            dataIndex: 'last_update_date',

        },
        {
            title: 'Order Status',
            dataIndex: 'order_status'
        }
    ];
    const data3 = [

        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: 'Contracted Date',
            dataIndex: 'new_val',

        },
        {
            title: 'Order Revised Date',
            dataIndex: 'last_update_date',

        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'order_qty_pcs',

        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date'
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status'
        }
    ];

    const data4 = [


        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: ' sum Of Qrd Qty last Week',
            dataIndex: 'sumOfOldVal',

        },
        {
            title: 'Sum Of Qrd Qty this Week',
            dataIndex: 'sumOfNewVal',

        },
        {
            title: 'Difference Ord Qty Revised',
            dataIndex: 'diffVal'
        },

    ];
    let exportingColumns: IExcelColumn[] = []
        exportingColumns = [
            { title: 'Item code', dataIndex: 'item_code' },
            { title: 'Item Name', dataIndex: 'itemName' },
            { title: 'Production Plan Type Name', dataIndex: 'prod_plan_type_name' },
            { title: 'Sum of Ord Qty last week', dataIndex: 'old_qty_value' },
            { title: 'Sum of Ord Qty this week', dataIndex: 'new_qty_value' },
        ]
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
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


    const columns: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id',
            ...getColumnSearchProps('production_plan_id')
        },

        {
            title: 'Production Plan Name',
            dataIndex: 'prod_plan_type_name'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code',
            ...getColumnSearchProps('item_code')
        },

        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: 'Previous Order Quantity Pieces',
            dataIndex: 'old_val',
            align:'right',
            
        },
        {
            title: 'Revised Order Quantity Pieces',
            dataIndex: 'new_val',
            align: 'right',
            render: (text, record) => (
                <span  {...record.new_val}>
                    <>
                        {Number(record.old_val) === Number(record.new_val) ? <span style={{ color: '' }}>{Number(record.new_val).toLocaleString('en-IN', {
                            maximumFractionDigits: 0
                        })}</span> : ''}
                        {Number(record.old_val) < Number(record.new_val) ? <span style={{ color: 'green' }}>{Number(record.new_val).toLocaleString('en-IN', {
                            maximumFractionDigits: 0
                        })}</span> : ''}
                        {Number(record.old_val) > Number(record.new_val) ? <span style={{ color: 'red' }}>{Number(record.new_val).toLocaleString('en-IN', {
                            maximumFractionDigits: 0
                        })}</span> : ''}
                    </>
                </span>

            )
            
        },
        {
            title: 'Difference',
            dataIndex: 'Diff',
            align:'right',
            render: (text, record) => (
                < >
                    
                    {Number(record.Diff) === 0 ? '-' : ''}
                    {Number(record.Diff) < 0 ? <span style={{ color: 'red' }} > {Number(record.Diff).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                    })} </span> : ''}
                    {Number(record.Diff) > 0 ? <span style={{ color: 'green' }} > {Number(record.Diff).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                    })} </span> : ''}

                </>
            )
             
        },
        {
            title: 'Version',
            dataIndex: 'version',

            sorter: (a, b) => a.version - b.version,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Contracted Date',
            dataIndex: 'contracted_date',
            render: (text, record) => {
                return record.contracted_date ? moment(record.contracted_date).format('YYYY-MM-DD') : '-'
            }
        },
        {
            title: 'Order Revised Date',
            dataIndex: 'last_update_date',
            render: (text, record) => {
                return record.last_update_date ? moment(record.last_update_date).format('YYYY-MM-DD') : '-'
            }
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date',
            // width :'190px',
            render: (text, record) => {
                return record.requested_wh_date ? moment(record.requested_wh_date).format('YYYY-MM-DD') : '-'
            }
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status',
            render: (value) => <Tag color={value == 'NEW' ? 'green' : 'green-inverse'} >{value}</Tag>
        }
    ];

    const columns1: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: 'Previous Requested Warehouse Date',
            dataIndex: 'old_val',
            // width :'190px',
            render: (text, record) => (
                <span>{moment(record.old_val).format('DD-MM-YYYY')}</span>
            )
        },
        {
            title: 'Revised Requested Warehouse Date',
            dataIndex: 'new_val',
            // width :'190px',
            render: (text, record) => (

                <span>
                    <>
                        {moment(record.old_val).format('YYYY-MM-DD') < moment(record.new_val).format('YYYY-MM-DD') ? <span style={{ color: 'green' }}>{record.new_val}</span> : ''}

                        {moment(record.old_val).format('YYYY-MM-DD') > moment(record.new_val).format('YYYY-MM-DD') ? <span style={{ color: 'red' }}>{record.new_val}</span> : ''}
                        &nbsp;&nbsp;
                        <span>
                            {moment(record.old_val).format('YYYY-MM-DD') < moment(record.new_val).format('YYYY-MM-DD') ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />}
                        </span>
                    </>
                </span>

            )
        },
        {
            title: 'Days Difference',
            dataIndex: 'diff',
            // width :'190px',
            render: (text, record) => {
                const obj: any = {
                    children: (<div style={{ textAlign: 'left' }}>{Math.floor((new Date(moment(record.old_val).format('YYYY/MM/DD')).getTime() - new Date(moment(record.new_val).format('YYYY/MM/DD')).getTime()) / (1000 * 60 * 60 * 24)) + 1}</div> )
                };
                return obj;
            }
        },

     
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'order_qty_pcs',
            align: 'right',
            render: (text, record) => (
                <>
                    {Number(record.order_qty_pcs).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )
        },
        {
            title: 'Contracted Date',
            dataIndex: 'contracted_date',
            render: (text, record) => {
                return record.contracted_date ? moment(record.contracted_date).format('YYYY-MM-DD') : '-'
            }
        },
        {
            title: 'Order Revised Date',
            dataIndex: 'last_update_date',
            render: (text, record) => {
                return record.last_update_date ? moment(record.last_update_date).format('YYYY-MM-DD') : '-'
            }
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status',
            render: (value) => <Tag color={value == 'NEW' ? 'green' : 'green-inverse'} >{value}</Tag>
        }
    ];

    const columns2: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },

        {
            title: 'Previous Contracted Date',
            dataIndex: 'old_val',
            render: (text, record) => {
                return record.old_val ? moment(record.old_val).format('YYYY-MM-DD') : '-'
            }
        },

        {
            title: 'Revised Contracted Date',
            dataIndex: 'new_val',
            render: (text, record) => (
                <Tooltip overlayStyle={{ font: 'bold', maxWidth: '160px' }} title={`Previous Date:  ${moment(record.old_val).format('YYYY-MM-DD')} Revised Date:  ${moment(record.new_val).format('YYYY-MM-DD')}Difference : ${Math.floor((new Date(moment(record.new_val).format('YYYY/MM/DD')).getTime() - new Date(moment(record.old_val).format('YYYY/MM/DD')).getTime()) / (1000 * 60 * 60 * 24)) + 1}  Days  `}>
                    {moment(record.old_val).format('YYYY-MM-DD') < moment(record.new_val).format('YYYY-MM-DD') ? <span style={{ color: 'green' }}>{moment(record.new_val).format('YYYY-MM-DD')}</span> : ''}
                    {moment(record.old_val).format('YYYY-MM-DD') > moment(record.new_val).format('YYYY-MM-DD') ? <span style={{ color: 'red' }}>{moment(record.new_val).format('YYYY-MM-DD')}</span> : ''}
                    &nbsp;&nbsp;
                    <span>
                        {moment(record.old_val).format('YYYY-MM-DD') < moment(record.new_val).format('YYYY-MM-DD') ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />}
                    </span>
                </Tooltip>
            )
        },
        {
            title: 'Days Difference',
            dataIndex: 'diff',
            // width :'190px',
            render: (text, record) => {
                const obj: any = {
                    children: (<div style={{ textAlign: 'left' }}>{Math.floor((new Date(moment(record.old_val).format('YYYY/MM/DD')).getTime() - new Date(moment(record.new_val).format('YYYY/MM/DD')).getTime()) / (1000 * 60 * 60 * 24)) + 1}</div> )
                };
                return obj;
            }
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'order_qty_pcs',
            align: 'right',
            render: (text, record) => (
                <>
                    {Number(record.order_qty_pcs).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )

        },
        {
            title: 'Order Revised Date',
            dataIndex: 'last_update_date',
            render: (text, record) => {
                return record.last_update_date ? moment(record.last_update_date).format('YYYY-MM-DD') : '-'
            }

        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date',
            // width :'190px'
            render: (text, record) => {
                return record.requested_wh_date ? moment(record.requested_wh_date).format('YYYY-MM-DD') : '-'
            }
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status',
            render: (value) => <Tag color={value == 'NEW' ? 'green' : 'green-inverse'} >{value}</Tag>
        }
    ];

    const columns3: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: ' Sum Of Qrd Qty last Week',
            dataIndex: 'old_qty_value',
            align: 'right',
            render: (text, record) => (
                <>
                    {Number(record.old_qty_value).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )

        },
        {
            title: 'Sum Of Qrd Qty this Week',
            dataIndex: 'new_qty_value',
            align: 'right',
            render: (text, record) => (
                <span  {...record.new_qty_value}>
                    <>
                        {Number(record.old_qty_value) === Number(record.new_qty_value) ? <span style={{ color: '' }}>{Number(record.new_qty_value).toLocaleString('en-IN', {
                            maximumFractionDigits: 0
                        })}</span> : ''}
                        {Number(record.old_qty_value) < Number(record.new_qty_value) ? <span style={{ color: 'green' }}>{Number(record.new_qty_value).toLocaleString('en-IN', {
                            maximumFractionDigits: 0
                        })}</span> : ''}
                        {Number(record.old_qty_value) > Number(record.new_qty_value) ? <span style={{ color: 'red' }}>{Number(record.new_qty_value).toLocaleString('en-IN', {
                            maximumFractionDigits: 0
                        })}</span> : ''}
                    </>
                </span>
            )
        },
        {
            title: 'Difference Ord Qty Revised',
            dataIndex: 'diff',
            align: 'right',
            render: (text, record) => (
                < >

                    {Number(record.diff) === 0 ? '-' : ''}
                    {Number(record.diff) < 0 ? <span style={{ color: 'red' }} > {Number(record.diff).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                    })} </span> : ''}
                    {Number(record.diff) > 0 ? <span style={{ color: 'green' }} > {Number(record.diff).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                    })} </span> : ''}

                </>
            )
        },

    ];
    const childColumns: any = [
        {
            title: 'Production Plan Type Name',
            dataIndex: 'prodPlanTypeName',
            key: 'prodPlanTypeName',
        },
        {
            title: 'Sum of Ord Qty last week',
            dataIndex: 'oldOrderQtyPcs',
            key: 'oldOrderQtyPcs',
            render: (text: any, record: any) => {
                return Number(record.oldOrderQtyPcs).toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                })
            }
        },
        {
            title: 'Sum of Ord Qty this week',
            dataIndex: 'newOrderQtyPcs',
            key: 'newOrderQtyPcs',
            render: (text: any, record: any) => {
                return Number(record.newOrderQtyPcs).toLocaleString('en-IN', {
                    maximumFractionDigits: 0
                })
            }
        },
        {
            title: 'Difference',
            dataIndex: 'diff',
            render: (text: any, record: any) => (
                < >

                    {Number(record.newOrderQtyPcs - record.oldOrderQtyPcs) === 0 ? '-' : ''}
                    {Number(record.newOrderQtyPcs - record.oldOrderQtyPcs) < 0 ? <span style={{ color: 'red' }} > {Number(record.newOrderQtyPcs - record.oldOrderQtyPcs).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                    })} </span> : ''}
                    {Number(record.newOrderQtyPcs - record.oldOrderQtyPcs) > 0 ? <span style={{ color: 'green' }} > {Number(record.newOrderQtyPcs - record.oldOrderQtyPcs).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                    })} </span> : ''}

                </>
            )
        }
    ]
    const columns4: any = [
        {
            title: 'S No',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: 'Item code',
            dataIndex: 'itemCode',
            ...getColumnSearchProps('itemCode')
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName',
            ...getColumnSearchProps('itemName')
        },
        {
            title: 'Phase Wise Data',
            dataIndex: 'prod_plan_type_name',
            align: 'center',
            render: (text: any, record: any) => (
                <Table
                    dataSource={record.phaseWiseData}
                    columns={childColumns}
                    pagination={false} // Hide pagination for child table
                    rowKey={record => record.itemCode}
                />
            ),
        }
    ];

    const EstimatedETDDate = (value) => {
        if (value) {
            console.log(value)
            const fromDate = value[0].format('YYYY-MM-DD');
            const toDate = value[1].format('YYYY-MM-DD');
            setSelectedEstimatedFromDate(fromDate)
            setSelectedEstimatedToDate(toDate)
        }
    }

    const getFilterdData = () => {
        let orderStatus = form.getFieldValue('orderStatus');
        let startDate = selectedEstimatedFromDate;
        let endDate = selectedEstimatedToDate;
        let filteredContractData = contractDateData;
        let filteredQtyData = qtyData
        let filteredReqWhData = warehouseDateData
        if (orderStatus) {
            filteredContractData = filteredContractData.filter(record => record.order_status === orderStatus);
            filteredQtyData = filteredQtyData.filter(record => record.order_status === orderStatus)
            filteredReqWhData = filteredReqWhData.filter(record => record.order_status === orderStatus)
            setFilteredContractDateData(filteredContractData);
            setFilteredQtyData(filteredQtyData)
            setFilteredWarehouseDateDate(filteredReqWhData)
        }
        if (startDate && endDate) {
            console.log(filteredQtyData)
            filteredContractData = filteredContractData.filter(record => moment(record.last_update_date).format('YYYY-MM-DD') >= startDate && moment(record.last_update_date).format('YYYY-MM-DD') <= endDate);
            filteredQtyData = filteredQtyData.filter(record => moment(record.last_update_date).format('YYYY-MM-DD') >= startDate && moment(record.last_update_date).format('YYYY-MM-DD') <= endDate)
            filteredReqWhData = filteredReqWhData.filter(record => moment(record.last_update_date).format('YYYY-MM-DD') >= startDate && moment(record.last_update_date).format('YYYY-MM-DD') <= endDate)
            setFilteredContractDateData(filteredContractData);
            setFilteredQtyData(filteredQtyData)
            setFilteredWarehouseDateDate(filteredReqWhData)
        }
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <b>Order Qty Revised Orders : {filteredQtyData?.length} </b>,
            children: <Table bordered dataSource={filteredQtyData} columns={columns} />,
        },
        {
            key: '2',
            label: <b>Group Of ItemCode  : {differenceQtyData?.length}</b>,
            children: <Table dataSource={differenceQtyData} columns={columns3} pagination={false}
                summary={(differenceQtyData) => {
                    let totalLastQty = 0;
                    let totalRecQty = 0;
                    let defData = 0;
                    differenceQtyData.forEach(({ old_qty_value }) => {
                        totalLastQty += Number(old_qty_value);

                    });
                    differenceQtyData.forEach(({ new_qty_value }) => {
                        totalRecQty += Number(new_qty_value);

                    });

                    defData = totalRecQty - totalLastQty;

                    return (
                        <>
                            <Table.Summary.Row className='tableFooter'>
                                {/* <Table.Summary.Cell index={0} ><Text ></Text></Table.Summary.Cell> */}
                                <Table.Summary.Cell index={1} ><Text ></Text></Table.Summary.Cell>
                                <Table.Summary.Cell index={3} ><Text ></Text></Table.Summary.Cell>
                                <Table.Summary.Cell index={4}  ><div style={{ textAlign: 'right', fontWeight: 'bold' }}>Summary</div></Table.Summary.Cell>
                                <Table.Summary.Cell index={5} ><div style={{ textAlign: 'right', fontWeight: 'bold' }}>{Number(totalLastQty).toLocaleString('en-IN', {
                                    maximumFractionDigits: 0
                                })}</div></Table.Summary.Cell>
                                <Table.Summary.Cell index={6}><div style={{ textAlign: 'right', fontWeight: 'bold' }}>{Number(totalRecQty).toLocaleString('en-IN', {
                                    maximumFractionDigits: 0
                                })}</div></Table.Summary.Cell>
                                <Table.Summary.Cell index={7} ><div style={{ textAlign: 'right', fontWeight: 'bold' }}>{Number(defData).toLocaleString('en-IN', {
                                    maximumFractionDigits: 0
                                })}</div></Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    );
                }
                }
            />,
        },
        {
            key: '3',
            label: <b >Requested Warehouse Date Revised Orders: {filteredWarehouseDateData?.length}</b>,
            children: <Table bordered dataSource={filteredWarehouseDateData} columns={columns1} />,
        },
        {
            key: '4',
            label: <b>Contracted Date Revised Orders : {filteredContractDateData?.length}</b>,
            children: <Table bordered dataSource={filteredContractDateData} columns={columns2} />,
        },
        {
            key: '5',
            label: <b>Phase Wise Sum of Order Quantity : {phaseData?.length}</b>,
            children: <Table bordered dataSource={phaseData} columns={columns4} />,
        },

    ];

    const onReset = () => {
        form.resetFields();
        setSelectedEstimatedFromDate(undefined);
        setSelectedEstimatedToDate(undefined);
        getContractDateChangeData()
        getQtyChangeData()
        getWharehouseDateChangeData()
    }

    return (
        <Card title='Compare Orders' extra={filteredQtyData || filteredContractDateData || filteredWarehouseDateData || differenceQtyData || phaseData? (<Button
            type="default"
            style={{ color: 'green' }}
            onClick={exportExcel}
            icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
            <Form form={form} layout={"vertical"} >
                <Row gutter={[24, 24]}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 5 }} xl={{ span: 5 }}>
                        <Form.Item name="contractDate"
                            label="Order Revised Date"
                        >
                            <RangePicker onChange={EstimatedETDDate} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name="orderStatus"
                            label="Order Status"
                        >
                            <Select
                                allowClear
                                placeholder='select order status'
                            >
                                <Option key='new' value="NEW">NEW</Option>
                                <Option key='unaccepted' value="UNACCEPTED">UNACCEPTED</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 3 }} style={{ marginTop: 22 }}>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            style={{ marginRight: 50, width: 100 }}
                            htmlType="button"
                            onClick={getFilterdData}>Search</Button>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 3 }} xl={{ span: 3 }} style={{ marginTop: 22 }}>
                        <Button
                            type="primary"
                            icon={<UndoOutlined />}
                            htmlType="submit"
                            onClick={onReset}>Reset</Button>
                    </Col>
                </Row>
            </Form>
            {filteredQtyData || filteredContractDateData || filteredWarehouseDateData || differenceQtyData ? <>
                {/* <Row gutter={24}>
                    <Col>
                        <Button icon={<DownloadOutlined />} style={{ marginTop: '30px', }} onClick={() => { exportExcel(); }}>
                            Get Excel
                        </Button>
                    </Col>
                </Row> */}
                <Tabs type='card' items={items} />
            </> : <></>}

        </Card>
    );
};

export default ChangesGrid;