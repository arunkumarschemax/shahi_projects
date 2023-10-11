import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, Tabs, TabsProps, Tag, Typography } from 'antd';
import { NikeService } from '@project-management-system/shared-services';
import { ArrowDownOutlined, ArrowUpOutlined, FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Excel } from 'antd-table-saveas-excel';
import Highlighter from 'react-highlight-words';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { nikeFilterRequest } from '@project-management-system/shared-models';

const VASChangesCompareGrid = () => {

    const service = new NikeService()
    const [poStatusData, setPOStatusData] = useState([])
    const [qtyData, setQtyData] = useState([])
    const [itemChangeData, setItemChangeData] = useState([])
    const [filteredPOStatusData, setFilteredPOStatusData] = useState([])
    const [filteredQtyData, setFilteredQtyData] = useState([])
    const [filteredItemChangeData, setFilteredItemChangeData] = useState([])
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
    const [phaseData, setPhaseWiseData] = useState<any[]>([]);
    const [phaseExcelData, setPhaseWiseExcelData] = useState<any[]>([]);
    const [pageSize, setPageSize] = useState<number>(null);
    const [unitChangeData, setUnitChangeData] = useState([])
    const [page, setPage] = React.useState(1);
    const [form] = Form.useForm();
    const { Text } = Typography;
    const { RangePicker } = DatePicker
    const { Option } = Select
    const [productCodeChaneData, setProductCodeChangeData] = useState([])
    const [poNumber, setPoNumber] = useState<any>([]);




    useEffect(() => {
       // poLineItemStatusChange()
        getQtyChangeData()
        PlantCodeChange()
        //getUnitChangeData()
        //getItemChangeData()
        getPoNum()
        
    }, [])

    const getPoNum = () => {
        service.getPpmAllPoForVas().then(res => {
            setPoNumber(res.data)
        })
    }
    const getQtyChangeData = () => {
        const req = new nikeFilterRequest();
        if (form.getFieldValue('poNumber') !== undefined) {
            req.poNumber = form.getFieldValue('poNumber');
        }
        service.getTotalItemQtyChangeData(req).then((res) => {
            setQtyData(res.data)
            setFilteredQtyData(res.data)
        })
    }

    const getUnitChangeData = () => {
        service.getUnitChangeData().then((res) => {
            setUnitChangeData(res.data)
        })
    }

    const getItemChangeData = () => {
        service.getItemChangeData().then((res) => {
            setItemChangeData(res.data)
            setFilteredItemChangeData(res.data)
        })
    }

    const poLineItemStatusChange = () => {
        const req = new nikeFilterRequest();
        if (form.getFieldValue('poNumber') !== undefined) {
            req.poNumber = form.getFieldValue('poNumber');
        }
        service.poLineItemStatusChange(req).then((res) => {
            setPOStatusData(res.data)
            setFilteredPOStatusData(res.data)
        })
    }
    const PlantCodeChange = () => {
        service.getPlantCodeChangeData().then((res) => {
            setProductCodeChangeData(res.data)
            setFilteredPOStatusData(res.data)
        })
    }
    function convertToYYYYMMDD(inputDate) {
        const formatsToTry = ['DD-MM-YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
        let formattedDate = null;

        for (const format of formatsToTry) {
            const parsedDate = moment(inputDate, format);
            if (parsedDate.isValid()) {
                formattedDate = parsedDate.format('MM/DD/YYYY');
                break;
            }
        }
        return formattedDate;
    }

    const exportExcel = () => {
        const excel = new Excel();
        if (filteredQtyData.length > 0) {
            excel
                .addSheet('VAS Text Revised PO')
                .addColumns(data1)
                .addDataSource(filteredQtyData, { str2num: true })
        }
        if (unitChangeData.length > 0) {
            excel
                .addSheet('Unit changes')
                .addColumns(data4)
                .addDataSource(unitChangeData, { str2num: true })
        }
        if (itemChangeData.length > 0) {
            excel
                .addSheet('Item changes')
                .addColumns(data2)
                .addDataSource(itemChangeData, { str2num: true })
        }
        if (productCodeChaneData.length > 0) {
            excel
                .addSheet('Product Code Revised')
                .addColumns(data3)
                .addDataSource(productCodeChaneData, { str2num: true })
        }
        excel.saveAs('revisedProductCode.xlsx');
    }

    const data1 = [
       
        {
            title: 'Report Generate Date',
            dataIndex: 'document_date',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item',
            dataIndex: 'item',
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
        },
        // {
        //     title: 'Document Date',
        //     dataIndex: 'document_date'
        // },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number',
        },
        {
            title: 'Total Item Quantity',
            dataIndex: 'totalQuantity',
        },
        {
            title: 'Product Code',
            dataIndex: 'productCode',
        },
        {
            title: 'OGAC',
            dataIndex: 'OGAC', render: (text) => moment(text).format('MM/DD/YYYY')

        },
        {
            title: 'GAC',
            dataIndex: 'GAC', render: (text) => moment(text).format('MM/DD/YYYY')

        },
        {
            title: 'Change from Direct Ship Sales Order Number',
            dataIndex: 'change_from_direct_ship_sales_order_number'
        },
        {
            title: 'Change from Direct Ship Sales Order Item',
            dataIndex: 'change_from_direct_ship_sales_order_item'
        },
        {
            title: 'Change to Direct Ship Sales Order Number',
            dataIndex: 'change_to_direct_ship_sales_order_number'
        },
        {
            title: 'Change to Direct Ship Sales Order Item',
            dataIndex: 'change_to_direct_ship_sales_order_item'
        },
        {
            title: 'Change from Item Vas Text',
            dataIndex: 'change_from_item_vas_text'
        },
        {
            title: 'Change to Item Vas Text',
            dataIndex: 'change_to_item_vas_text'
        },
        {
            title: 'Item VAS PDF PO',
            dataIndex: 'item_vas_pdf_po'
        },
        {
            title: 'DIFFERENCE IN ITEM VAS TEXT ',
            dataIndex: 'item_vas_pdf_po',

        },
       
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number',
        },
        {
            title: 'Previous Order Quantity Pieces',width:80,
            dataIndex: 'old_val',
        },
        {
            title: 'Revised Order Quantity Pieces',
            dataIndex: 'new_val',
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
            title: 'Order Status',width:80,
            dataIndex: 'dpom_item_line_status',
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
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item',
            dataIndex: 'item',
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
        },
        {
            title: 'Document Date',
            dataIndex: 'document_date',
            render: (text) => moment(text).format('MM/DD/YYYY')

        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number'
        },
        {
            title: 'Product Code',
            dataIndex: 'product_code'
        },
        {
            title: 'OGAC',
            dataIndex: 'ogac',
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
        },
        {
            title: 'Change from Inventory Segment Code',
            dataIndex: '',
        },
        {
            title: 'Change To Inventory Segment Code',
            dataIndex: '',
        },
        {
            title: 'Change from Destination Country Name',
            dataIndex: '',
        },
        {
            title: 'Change To Destination Country Name',
            dataIndex: '',
        },
        {
            title: 'Change from Ship To Customer Number',
            dataIndex: '',
        },
        {
            title: 'Change to Ship To Customer Number',
            dataIndex: '',
        },
        {
            title: 'Ship To Customer Number in DIA',
            dataIndex: '',
        },
        {
            title: 'Change from Plant Code',
            dataIndex: '',
        },
        {
            title: 'Change to Plant Code',
            dataIndex: '',
        },
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
            dataIndex: 'old_qty_value',
        },
        {
            title: 'Sum Of Qrd Qty this Week',
            dataIndex: 'new_qty_value',
        },
        {
            title: 'Difference Ord Qty Revised',
            dataIndex: 'diff'
        },

    ];

    let exportingColumns: IExcelColumn[] = []
    exportingColumns = [
        { title: 'Item code', dataIndex: 'itemCode' },
        { title: 'Item Name', dataIndex: 'itemName' },
        { title: 'Production Plan Type Name', dataIndex: 'prodPlanTypeName' },
        { title: 'Sum of Ord Qty last week', dataIndex: 'oldOrderQtyPcs' },
        { title: 'Sum of Ord Qty this week', dataIndex: 'newOrderQtyPcs' },
        { title: 'Difference Qty', dataIndex: 'difference' }
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
            width: 60,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),fixed:'left'
        },
        {
            title: 'PO Number',
            dataIndex: 'purchaseOrderNumber',width:70,
            ...getColumnSearchProps('purchaseOrderNumber'),fixed:'left'
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'poLineItemNumber',width:70,fixed:'left'
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'document_date',width:70,
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item',
            dataIndex: 'item',width:70,
        },
        {
            title: 'Factory',
            dataIndex: 'factory',width:70,
        },
        // {
        //     title: 'Document Date',
        //     dataIndex: 'document_date'
        // },
        
        {
            title: 'Total Item Quantity',
            dataIndex: 'totalQuantity',width:70,align:'right',render: (text, record) => {
                if (!text || text.trim() === '') {
                  return '-';
                } else {
                  return <strong>{Number(text).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</strong>;
                }
              },
        },
        {
            title: 'Product Code',
            dataIndex: 'productCode',width:70,
        },
        {
            title: 'OGAC',width:70,
            dataIndex: 'OGAC', render: (text) => moment(text).format('MM/DD/YYYY')

        },
        {
            title: 'GAC',width:70,
            dataIndex: 'GAC', render: (text) => moment(text).format('MM/DD/YYYY')

        },
        {
            title: 'Change from Direct Ship Sales Order Number',width:80,
            dataIndex: 'change_from_direct_ship_sales_order_number'
        },
        {
            title: 'Change from Direct Ship Sales Order Item',width:80,
            dataIndex: 'change_from_direct_ship_sales_order_item'
        },
        {
            title: 'Change to Direct Ship Sales Order Number',width:80,
            dataIndex: 'change_to_direct_ship_sales_order_number'
        },
        {
            title: 'Change to Direct Ship Sales Order Item',width:80,
            dataIndex: 'change_to_direct_ship_sales_order_item'
        },
        {
            title: 'Change from Item Vas Text',width:80,
            dataIndex: 'change_from_item_vas_text'
        },
        {
            title: 'Change to Item Vas Text',width:80,
            dataIndex: 'change_to_item_vas_text'
        },
        {
            title: 'Item VAS PDF PO',width:80,
            dataIndex: 'item_vas_pdf_po'
        },
        {
            title: 'DIFFERENCE IN ITEM VAS TEXT ',
            // ( between DPOM to DPOM)( Highlight Color: If any wording Newly Added should be highlighted Green Color/ If removed Red Color)',
            dataIndex: 'item_vas_pdf_po',
            width: 140,
        },
        // {
        //     title: 'DIFFERENCE IN ITEM VAS TEXT ',
        //     // ( between DPOM to PDF PO)( Highlight Color: If any wording Newly Added should be highlighted Green Color/ If removed Red Color)',
        //     dataIndex: 'item_vas_pdf_po',
        //     width: '300px',
        // },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'scheduleLineItemNumber',width:80,
            ...getColumnSearchProps('scheduleLineItemNumber')
        },
        // {
        //     title: 'Previous Order Quantity Pieces',width:80,
        //     dataIndex: 'old_val',
        //     align: 'right',
        // },
        // {
        //     title: 'Revised Order Quantity Pieces',
        //     dataIndex: 'new_val',width:80,
        //     align: 'right',
        //     // render: (text, record) => (
        //     //     <span  {...record.new_val}>
        //     //         <>
        //     //             {Number(record.old_val) === Number(record.new_val) ? <span style={{ color: '' }}>{Number(record.new_val).toLocaleString('en-IN', {
        //     //                 maximumFractionDigits: 0
        //     //             })}</span> : ''}
        //     //             {Number(record.old_val) < Number(record.new_val) ? <span style={{ color: 'green' }}>{Number(record.new_val).toLocaleString('en-IN', {
        //     //                 maximumFractionDigits: 0
        //     //             })}</span> : ''}
        //     //             {Number(record.old_val) > Number(record.new_val) ? <span style={{ color: 'red' }}>{Number(record.new_val).toLocaleString('en-IN', {
        //     //                 maximumFractionDigits: 0
        //     //             })}</span> : ''}
        //     //         </>
        //     //     </span>
        //     // )
        // },
        // {
        //     title: 'Difference',
        //     dataIndex: 'Diff',
        //     align: 'right',width:80,
        //     render: (text, record) => (
        //         < >
        //             {Number(record.Diff) === 0 ? '-' : ''}
        //             {Number(record.Diff) < 0 ? <span style={{ color: 'red' }} > {Number(record.Diff).toLocaleString('en-IN', {
        //                 maximumFractionDigits: 0
        //             })} </span> : ''}
        //             {Number(record.Diff) > 0 ? <span style={{ color: 'green' }} > {Number(record.Diff).toLocaleString('en-IN', {
        //                 maximumFractionDigits: 0
        //             })} </span> : ''}
        //         </>
        //     )
        // },
        // {
        //     title: 'Version',
        //     dataIndex: 'version',
        //     sorter: (a, b) => a.version - b.version,
        //     sortDirections: ['descend', 'ascend'],
        // },
        // {
        //     title: 'Order Status',width:80,
        //     dataIndex: 'dpom_item_line_status',
        //     // render: (value) => <Tag color={value == 'ACCEPTED' ? 'green' : 'green-inverse'} >{value}</Tag>
        // }
    ];

    const columns1: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            ...getColumnSearchProps('po_number')
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number'
        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number',
            ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Previous Item',
            dataIndex: 'old_val',
        },
        {
            title: 'Revised Item',
            dataIndex: 'new_val',
            // width :'190px',
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'total_item_qty',
            align: 'right',
            render: (text, record) => (
                <>
                    {Number(record.total_item_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )
        },
        {
            title: 'Order Revised Date',
            dataIndex: 'last_update_date',
            render: (text, record) => {
                return record.last_update_date ? convertToYYYYMMDD(record.last_update_date) : '-'
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
        // {
        //     title: 'PO Number',
        //     dataIndex: 'po_number',
        //     ...getColumnSearchProps('po_number')
        // },
        {
            title: 'PO Line ',
            dataIndex: 'po_and_line',
            ...getColumnSearchProps('po_and_line')

        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number',
            ...getColumnSearchProps('schedule_line_item_number'),
            align: 'center'
        },
        {
            title: 'Previous Line Item Status',
            dataIndex: 'old_val',
            align: 'center'
        },
        {
            title: 'Revised Line Item Status',
            dataIndex: 'new_val',
            align: 'center'
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'total_item_qty',
            align: 'right',
            render: (text, record) => (
                <>
                    {Number(record.total_item_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )

        },

    ];

    const columns3: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            ...getColumnSearchProps('po_number')
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number'
        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number',
            ...getColumnSearchProps('schedule_line_item_number')
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

    const columns4: any = [
        {
            title: 'S No',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            ...getColumnSearchProps('po_number')
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number'
        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number',
            ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Previous Unit',
            dataIndex: 'old_val',
        },
        {
            title: 'Revised Unit',
            dataIndex: 'new_val',
            // width :'190px',
        },
    ];
    const columns6: any = [
        {
            title: 'S No',
            key: 'sno',
            width: 60,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),fixed:'left'
        },{
            title: 'PO Number',
            dataIndex: 'po_number',
            ...getColumnSearchProps('po_number'),fixed:'left'
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number',fixed:'left'
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item',
            dataIndex: 'item',
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
            ...getColumnSearchProps('factory')
        },
        {
            title: 'Document Date',
            dataIndex: 'document_date',
            render: (text) => moment(text).format('MM/DD/YYYY')

        },
        
        {
            title: 'Product Code',
            dataIndex: 'product_code'
        },
        {
            title: 'OGAC',
            dataIndex: 'ogac',
            ...getColumnSearchProps('ogac')
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
            ...getColumnSearchProps('gac')
        },
        {
            title: 'Change from Inventory Segment Code',
            dataIndex: '',
            width:120,  
                      // ...getColumnSearchProps('')
        },
        {
            title: 'Change To Inventory Segment Code',
            dataIndex: '',
            width:90,  

            // ...getColumnSearchProps('')
        },
        {
            title: 'Change from Destination Country Name',
            dataIndex: '',
            width:90,  
            // ...getColumnSearchProps('')
        },
        {
            title: 'Change To Destination Country Name',
            dataIndex: '',
            // ...getColumnSearchProps('')
        },
        {
            title: 'Change from Ship To Customer Number',
            dataIndex: '',
            // ...getColumnSearchProps('')
        },
        {
            title: 'Change to Ship To Customer Number',
            dataIndex: '',
            // ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Ship To Customer Number in DIA',
            dataIndex: '',
            // ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Change from Plant Code',
            dataIndex: '',
            // ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Change to Plant Code',
            dataIndex: '',
            // ...getColumnSearchProps('schedule_line_item_number')
        },
        // {
        //     title: ' Sum Of Qrd Qty last Week',
        //     dataIndex: 'old_qty_value',
        //     align: 'right',
        //     render: (text, record) => (
        //         <>
        //             {Number(record.old_qty_value).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
        //         </>
        //     )

        // },
        // {
        //     title: 'Sum Of Qrd Qty this Week',
        //     dataIndex: 'new_qty_value',
        //     align: 'right',
        //     render: (text, record) => (
        //         <span  {...record.new_qty_value}>
        //             <>
        //                 {Number(record.old_qty_value) === Number(record.new_qty_value) ? <span style={{ color: '' }}>{Number(record.new_qty_value).toLocaleString('en-IN', {
        //                     maximumFractionDigits: 0
        //                 })}</span> : ''}
        //                 {Number(record.old_qty_value) < Number(record.new_qty_value) ? <span style={{ color: 'green' }}>{Number(record.new_qty_value).toLocaleString('en-IN', {
        //                     maximumFractionDigits: 0
        //                 })}</span> : ''}
        //                 {Number(record.old_qty_value) > Number(record.new_qty_value) ? <span style={{ color: 'red' }}>{Number(record.new_qty_value).toLocaleString('en-IN', {
        //                     maximumFractionDigits: 0
        //                 })}</span> : ''}
        //             </>
        //         </span>
        //     )
        // },
        // {
        //     title: 'Difference Ord Qty Revised',
        //     dataIndex: 'diff',
        //     align: 'right',
        //     render: (text, record) => (
        //         < >

        //             {Number(record.diff) === 0 ? '-' : ''}
        //             {Number(record.diff) < 0 ? <span style={{ color: 'red' }} > {Number(record.diff).toLocaleString('en-IN', {
        //                 maximumFractionDigits: 0
        //             })} </span> : ''}
        //             {Number(record.diff) > 0 ? <span style={{ color: 'green' }} > {Number(record.diff).toLocaleString('en-IN', {
        //                 maximumFractionDigits: 0
        //             })} </span> : ''}

        //         </>
        //     )
        // },

    ];

    const EstimatedETDDate = (value) => {
        if (value) {
            const fromDate = value[0];
            const toDate = value[1];
            setSelectedEstimatedFromDate(fromDate)
            setSelectedEstimatedToDate(toDate)
        }
    }

    // const getFilterdData = () => {
    //     let orderStatus = form.getFieldValue('orderStatus');
    //     let startDate = selectedEstimatedFromDate;
    //     let endDate = selectedEstimatedToDate;
    //     let filteredItemChangeData = itemChangeData;
    //     let filteredQtyData = qtyData
    //     let filteredPOStatusData = poStatusData
    //     if (orderStatus) {
    //         filteredItemChangeData = itemChangeData.filter(record => record.order_status === orderStatus);
    //         filteredQtyData = filteredQtyData.filter(record => record.order_status === orderStatus)
    //         filteredPOStatusData = poStatusData.filter(record => record.order_status === orderStatus)
    //         setItemChangeData(filteredItemChangeData);
    //         setFilteredQtyData(filteredQtyData)
    //         setFilteredPOStatusData(filteredPOStatusData)
    //     }
    //     if (startDate && endDate) {
    //         console.log(filteredQtyData)
    //         filteredItemChangeData = itemChangeData.filter(record => convertToYYYYMMDD(record.last_update_date) >= startDate && convertToYYYYMMDD(record.last_update_date) <= endDate);
    //         filteredQtyData = filteredQtyData.filter(record => convertToYYYYMMDD(record.last_update_date) >= startDate && convertToYYYYMMDD(record.last_update_date) <= endDate)
    //         filteredPOStatusData = poStatusData.filter(record => convertToYYYYMMDD(record.last_update_date) >= startDate && convertToYYYYMMDD(record.last_update_date) <= endDate)
    //         setItemChangeData(filteredItemChangeData);
    //         setFilteredQtyData(filteredQtyData)
    //         setFilteredPOStatusData(filteredPOStatusData)
    //     }
    // }

    const getFilterdData = () =>{
        getQtyChangeData()
        PlantCodeChange()
    }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <b style={{ color: '#25CB2D' }}>VAS Text Revised PO's : {filteredQtyData?.length} </b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={filteredQtyData} columns={columns} pagination={false} scroll={{ x: 'max-content', y: 450}} />,
        },
        // {
        //     key: '2',
        //     label: <b>Ship to customer Revised PO's : {unitChangeData?.length}</b>,
        //     children: <Table className="custom-table-wrapper" bordered dataSource={unitChangeData} columns={columns4} />,
        // },
        // {
        //     key: '3',
        //     label: <b style={{ color: '#65A1FD' }}>Inventory Segment Code Revised PO's : {itemChangeData?.length}</b>,
        //     children: <Table className="custom-table-wrapper" bordered dataSource={itemChangeData} columns={columns1} />,
        // },
        // {
        //     key: '4',
        //     label: <b>Direct Ship SO No Revised PO's : {poStatusData?.length}</b>,
        //     children: <Table className="custom-table-wrapper" bordered dataSource={poStatusData} columns={columns2} />,
        // },
        // {
        //     key: '5',
        //     label: <b style={{ color: '#F39292' }}>Destination Country Revised PO's : {poStatusData?.length}</b>,
        //     children: <Table className="custom-table-wrapper" bordered dataSource={poStatusData} columns={columns2} />,
        // }
        {
            key: '2',
            label: <b>Product Code Revised : {productCodeChaneData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={productCodeChaneData} columns={columns6} pagination={false} scroll={{ x: 1800, y: 450}} />,
        },
    ];

    const onReset = () => {
        form.resetFields();
        setSelectedEstimatedFromDate(undefined);
        setSelectedEstimatedToDate(undefined);
        // getContractDateChangeData()
        getQtyChangeData()
        // getWharehouseDateChangeData()
    }

    return (
        <Card title='Compare Orders' extra={(<Button
            type="default"
            style={{ color: 'green' }}
            onClick={exportExcel}
            icon={<FileExcelFilled />}>Download Excel</Button>)}>
            <Form form={form} layout={"vertical"} >
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 4 }} >
                        <Form.Item name='poNumber' label='Po Number' >
                            <Select
                                showSearch
                                placeholder="Select PoNumber"
                                optionFilterProp="children"
                                allowClear
                            >
                                {poNumber.map((inc: any) => {
                                    return <Option key={inc.id} value={inc.po_number}>{inc.po_number}</Option>
                                })
                                }
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} style={{ marginTop: 20 }}>

                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            style={{ marginRight: 50, width: 100 }}
                            htmlType="button"
                            onClick={getFilterdData}>Search</Button>  </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} style={{ marginTop: 20 }}>
                        <Button
                            type="primary"

                            icon={<UndoOutlined />}
                            htmlType="submit"
                            onClick={onReset}>Reset</Button>

                    </Col>

                </Row>
            </Form>
            {filteredQtyData || unitChangeData || itemChangeData || poStatusData ? <>
                <Tabs type='card' items={items} />
            </> : <></>}

        </Card>
    );
};

export default VASChangesCompareGrid;