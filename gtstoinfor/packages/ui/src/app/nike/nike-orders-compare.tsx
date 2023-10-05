import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, Tabs, TabsProps, Tag, Typography } from 'antd';
import { NikeService } from '@project-management-system/shared-services';
import { ArrowDownOutlined, ArrowUpOutlined, FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Excel } from 'antd-table-saveas-excel';
import Highlighter from 'react-highlight-words';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { TotalQuantityChangeModel, nikeFilterRequest } from '@project-management-system/shared-models';

const OrdersCompareGrid = () => {

    const service = new NikeService()
    const [poStatusData, setPOStatusData] = useState([])
    const [qtyData, setQtyData] = useState([])
    const [itemChangeData, setItemChangeData] = useState([])
    const [filteredPOStatusData, setFilteredPOStatusData] = useState([])
    const [filteredQtyData, setFilteredQtyData] = useState([])
    const [filteredItemChangeData, setFilteredItemChangeData] = useState([])
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
    const [pageSize, setPageSize] = useState<number>(null);
    const [unitChangeData, setUnitChangeData] = useState([])
    const [page, setPage] = React.useState(1);
    const [form] = Form.useForm();
    const { Text } = Typography;
    const { RangePicker } = DatePicker
    const { Option } = Select
    const [priceChaneData, setPriseChangeData] = useState([])
    const [productCodeChaneData, setProductCodeChangeData] = useState([])
    const [itemTextChaneData, setItemTextChangeData] = useState([])
    const [filterData, setFilterData] = useState<any>([])


    const [modeOTransportChaneData, setmodeOfTransportChangeData] = useState([])
    const [poLine, setPoLine] = useState<any>([]);


    useEffect(() => {
        poLineItemStatusChange()
        getQtyChangeData()
        getUnitChangeData()
        getItemChangeData()
        PriceAndCurrencyChangeFob()
        PlantCodeChange()
        ModeOfTransportChange()
        ItemTextChangeData()
        getPoLine()
    }, [])

    const getPoLine = () => {
        service.getPpmPoLineForNikeOrder().then(res => {
            setPoLine(res.data)
        })
    }
    const getQtyChangeData = () => {
        const req = new nikeFilterRequest();
        if (form.getFieldValue('poandLine') !== undefined) {
            req.poandLine = form.getFieldValue('poandLine');
        }
        service.getTotalItemQtyChangeData(req).then((res) => {
            setQtyData(res.data)
            setFilteredQtyData(res.data)
            setFilterData(res.data)
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
        service.poLineItemStatusChange().then((res) => {
            setPOStatusData(res.data)
            setFilteredPOStatusData(res.data)
        })
    }

    const PriceAndCurrencyChangeFob = () => {
        const req = new nikeFilterRequest();
        // if (form.getFieldValue('poandLine') !== undefined) {
        //     req.poandLine = form.getFieldValue('poandLine');
        //   }
        service.getFOBPriceChangeData().then((res) => {
            setPriseChangeData(res.data)
            setFilteredPOStatusData(res.data)
        })
    }

    const PlantCodeChange = () => {
        service.getPlantCodeChangeData().then((res) => {
            setProductCodeChangeData(res.data)
            setFilteredPOStatusData(res.data)
        })
    }

    const ModeOfTransportChange = () => {
        service.getModeOfTransportChangeData().then((res) => {
            setmodeOfTransportChangeData(res.data)
            setFilteredPOStatusData(res.data)
        })
    }
    const ItemTextChangeData = () => {
        service.getItemChangeData().then((res) => {
            setItemTextChangeData(res.data)
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

        if (filteredQtyData && filteredQtyData.length > 0) {
            excel
                .addSheet('Quantity changes')
                .addColumns(data1)
                .addDataSource(filteredQtyData, { str2num: true });
        }

        if (unitChangeData && unitChangeData.length > 0) {
            excel
                .addSheet('Unit changes')
                .addColumns(data4)
                .addDataSource(unitChangeData, { str2num: true });
        }

        if (itemChangeData && itemChangeData.length > 0) {
            excel
                .addSheet('Item changes')
                .addColumns(data2)
                .addDataSource(itemChangeData, { str2num: true });
        }

        if (poStatusData && poStatusData.length > 0) {
            excel
                .addSheet('PO Line Item Status Change')
                .addColumns(data3)
                .addDataSource(poStatusData, { str2num: true });
        }

        excel.saveAs('revisedPOs.xlsx');
    };



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


  

    const columns1: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Factory',
            dataIndex: 'factory'
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
            title: 'Document Date',
            dataIndex: 'document_date',
            render: (text) => moment(text).format('MM/DD/YYYY')

        },
        {
            title: 'Style Number',
            dataIndex: 'style_number'
        },
        {
            title: 'Product Code',
            dataIndex: 'product_code'
        },
        {
            title: 'Color Description',
            dataIndex: 'color_desc'
        },
        {
            title: 'GAC',
            dataIndex: 'gac'
        },
        {
            title: 'Change from Total Item Quantity',
            dataIndex: 'change_from_total_item_quantity'
        },
        {
            title: 'Change to Total Item Quantity',
            dataIndex: 'change_to_total_item_quantity'
        },
        {
            title: 'From Item Number',
            dataIndex: 'from_item_number'
        },
        {
            title: 'Change to Item Number',
            dataIndex: 'change_to_item_number'
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
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item',
            dataIndex: 'item',
            // ...getColumnSearchProps('item')
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
            ...getColumnSearchProps('factory')
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
            title: 'Product Code',
            dataIndex: 'product_code',
            //...getColumnSearchProps('')
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
            ...getColumnSearchProps('gac')
        },
        {
            title: 'CO Number',
            dataIndex: 'customer_order',
            //...getColumnSearchProps('po_number')
        },
        {
            title: 'Size Description',
            dataIndex: 'size_description',
            // ...getColumnSearchProps('size_description')
        },
        {
            title: 'Change From Gross Price',
            dataIndex: 'grossPriceFobOld',
            align:'right',
            render: (text, record) => (record.grossPriceFobOld ? record.grossPriceFobOld : '-'),


            // ...getColumnSearchProps('po_number')
        },
        {
            title: 'Change from Gross Price currency code',
            dataIndex: '',
            align:'center',

            //...getColumnSearchProps('po_number')
            render: (text, record) => ('USD')
        },
        {
            title: 'Change to Gross Price',
            dataIndex: 'grossPriceFobNew',
            align:'right',
            render: (text, record) => {
                const formattedAmount = record.grossPriceFobNew ? parseFloat(record.grossPriceFobNew).toFixed(2) : "-";
                return <>{formattedAmount}</>;
              }

            //...getColumnSearchProps('po_number')
        },
        {
            title: 'Change to Gross Price currency code',
            dataIndex: '',
            align:'right',

            //...getColumnSearchProps('po_number')
            render: (text, record) => ('USD')
        },
        {
            title: 'Shahi Offered Price from Master File  ',
            dataIndex: 'shahiOfferedPrice',
            align:'center',
            render: (text, record) => (record.shahiOfferedPrice ? record.shahiOfferedPrice : '-'),


            //...getColumnSearchProps('po_number')
        },
        {
            title: 'Shahi Offered Price currency from Master File ',
            dataIndex: 'shahiOfferedPricecurrency',
            render: (text, record) => (record.shahiOfferedPricecurrency ? record.shahiOfferedPricecurrency : '-'),
            //...getColumnSearchProps('po_number')
        },
        {
            title: 'Change from Trading Co Net including discounts',
            dataIndex: 'trCoNetIncludingDiscFrom',
            align:'right',
            render:(text,record)=>
             (record.trCoNetIncludingDiscFrom ? record.trCoNetIncludingDiscFrom: '-')
            //...getColumnSearchProps('po_number')
        },
        {
            title: 'Change from Trading Co Net including discounts currency code',
            dataIndex: 'trCoNetIncludingDiscCurrencyCodeFrom',
            render:(text,record)=>
             (record.trCoNetIncludingDiscCurrencyCodeFrom ? record.trCoNetIncludingDiscCurrencyCodeFrom: '-' )
            //...getColumnSearchProps('po_number')
        },
        {
            title: 'Change to Trading Co Net including discounts',
            dataIndex: 'trCoNetIncludingDiscNew',
            render:(text,record)=>
             (record.trCoNetIncludingDiscNew ? record.trCoNetIncludingDiscNew: '-' )
            //...getColumnSearchProps('po_number')
        },
        {
            title: 'Change to Trading Co Net including discounts currency code',
            dataIndex: '',

            //...getColumnSearchProps('po_number')
        },
        {
            title: 'Change from Net including discounts',
            dataIndex: 'trCoNetIncludingDiscFrom',
            render:(text,record)=>
             (record.trCoNetIncludingDiscFrom ? record.trCoNetIncludingDiscFrom: '-' )
            // ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Change from Net including discounts currency code',
            dataIndex: 'trCoNetIncludingDiscCurrencyCodeFrom',
            render:(text,record)=>
             (record.trCoNetIncludingDiscCurrencyCodeFrom ? record.trCoNetIncludingDiscCurrencyCodeFrom: '-' )
            // ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Change to Net including discounts',
            dataIndex: 'trCoNetIncludingDiscNew',
            render:(text,record)=>
             (record.trCoNetIncludingDiscNew ? record.trCoNetIncludingDiscNew :'-') 
            // ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'change to Net including discounts currency code',
            dataIndex: 'trCoNetIncludingDiscCurrencyCodeTo',
            render:(text,record)=>
             (record.trCoNetIncludingDiscCurrencyCodeTo ? record.trCoNetIncludingDiscCurrencyCodeTo: '-' )
            //...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Legal PDF PO Price',
            dataIndex: 'legalPoPrice',
            render: (text, record) => (record.legalPoPrice ? record.legalPoPrice : '-'),
            align: 'right'
          }
          ,
        {
            title: 'Legal PDF PO Price Currency',
            dataIndex: 'legalPoCurrency',
            render: (text, record) => (record.legalPoCurrency ? record.legalPoCurrency : '-'),

            // ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'CRM CO Price',
            dataIndex: 'crmCoPrice',
            align:'right',
            render: (text, record) => (record.crmCoPrice ? record.crmCoPrice : '-'),


        },
        {
            title: 'CRM CO Price Currency',
            dataIndex: 'coPriceCurrency',
            render: (text, record) => (record.coPriceCurrency ? record.coPriceCurrency : '-'),

            // ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'comparission of CRM CO Price to Legal PDF PO Price',
            dataIndex: '',
            align:'right',
            render:(text,record)=>{
                const diff = Number(record.crmCoPrice) - Number(record.legalPoPrice)
                return (
                    Number(diff).toFixed(2)
                )
            }
            // ...getColumnSearchProps('schedule_line_item_number')
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
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item',
            dataIndex: 'item',
            // ...getColumnSearchProps('item')
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
            ...getColumnSearchProps('factory')
        },
        {
            title: 'Document Date',
            dataIndex: 'documentDate',
            //...getColumnSearchProps('factory')
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
            title: 'CO Number',
            dataIndex: '',
            ...getColumnSearchProps('')
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
            title: 'Mode of Transportation Code in DPOM',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'Mode of Transportation Code in CRM CO',
            dataIndex: '',
            ...getColumnSearchProps('')
        },

    ];
    const columns4: any = [
        {
            title: 'S No',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item No',
            dataIndex: 'item'
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
            title: 'Document Date',
            dataIndex: 'document_date',
            render: (text) => moment(text).format('MM/DD/YYYY')

        },
        {
            title: 'Style Number',
            dataIndex: 'style_number'
        },
        {
            title: 'Product Code',
            dataIndex: 'product_code'
        },
        {
            title: 'Color Description',
            dataIndex: 'color_desc'
        },
        {
            title: 'OGAC',
            dataIndex: 'ogac'
        },
        {
            title: 'GAC',
            dataIndex: 'gac'
        },
        {
            title: 'Total Item Quantity',
            dataIndex: 'total_item_qty'
        },
        {
            title: 'From Factory',
            dataIndex: 'old_val'
        },
        {
            title: 'Change to Factory',
            dataIndex: 'new_val'
        }
    ];

    const columns5: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item',
            dataIndex: 'item',
            // ...getColumnSearchProps('item')
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
            ...getColumnSearchProps('factory')
        },
        {
            title: 'Document Date',
            dataIndex: 'documentDate',
            //...getColumnSearchProps('factory')
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
            title: 'Total Iten Quantity',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'Product Code',
            dataIndex: '',
            ...getColumnSearchProps('')
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
            title: 'Change from Direct Ship Sales Order Number',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'Change from Direct Ship Sales Order Item',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'Change to Direct Ship Sales Order Number',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'Change to Direct Ship Sales Order Item',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'Change from Item Vas Text',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'Change from Item Vas Text',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'Change to Item Vas Text',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'Item VAS -PDF PO',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'DIFFERENCE IN ITEM VAS TEXT ( between DPOM to DPOM)',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
        {
            title: 'DIFFERENCE IN ITEM VAS TEXT ( between DPOM to PDF PO) ',
            dataIndex: '',
            ...getColumnSearchProps('')
        },
    ];
    const columns6: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
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
            title: 'PO Number',
            dataIndex: 'po_number',
            ...getColumnSearchProps('po_number')
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
            // ...getColumnSearchProps('')
        },
        {
            title: 'Change To Inventory Segment Code',
            dataIndex: '',
            // ...getColumnSearchProps('')
        },
        {
            title: 'Change from Destination Country Name',
            dataIndex: '',
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
    const columns7: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item',
            dataIndex: 'item',
            // ...getColumnSearchProps('item')
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
            ...getColumnSearchProps('factory')
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
            title: 'Product Code',
            dataIndex: 'product_code',
            //...getColumnSearchProps('')
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
            ...getColumnSearchProps('gac')
        },
        {
            title: 'CO Number',
            dataIndex: 'customer_order',
            //...getColumnSearchProps('po_number')
        },
        {
            title: 'Size Description',
            dataIndex: 'size_description',
            // ...getColumnSearchProps('size_description')
        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number',
            // ...getColumnSearchProps('schedule_line_item_number')
        },
        {
            title: 'Previous Line Item Status',
            dataIndex: 'old_val',
            align: 'center',
        },
        {
            title: 'Revised Line Item Status',
            dataIndex: 'new_val', align: 'center',
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


   
    const EstimatedETDDate = (value) => {
        if (value) {
            const fromDate = value[0];
            const toDate = value[1];
            setSelectedEstimatedFromDate(fromDate)
            setSelectedEstimatedToDate(toDate)
        }
    }

    const getFilterdData = () => {
        let orderStatus = form.getFieldValue('orderStatus');
        let startDate = selectedEstimatedFromDate;
        let endDate = selectedEstimatedToDate;
        let filteredItemChangeData = itemChangeData;
        let filteredQtyData = qtyData
        let filteredPOStatusData = poStatusData
        if (orderStatus) {
            filteredItemChangeData = itemChangeData.filter(record => record.order_status === orderStatus);
            filteredQtyData = filteredQtyData.filter(record => record.order_status === orderStatus)
            filteredPOStatusData = poStatusData.filter(record => record.order_status === orderStatus)
            setItemChangeData(filteredItemChangeData);
            setFilteredQtyData(filteredQtyData)
            setFilteredPOStatusData(filteredPOStatusData)
        }
        if (startDate && endDate) {
            console.log(filteredQtyData)
            filteredItemChangeData = itemChangeData.filter(record => convertToYYYYMMDD(record.last_update_date) >= startDate && convertToYYYYMMDD(record.last_update_date) <= endDate);
            filteredQtyData = filteredQtyData.filter(record => convertToYYYYMMDD(record.last_update_date) >= startDate && convertToYYYYMMDD(record.last_update_date) <= endDate)
            filteredPOStatusData = poStatusData.filter(record => convertToYYYYMMDD(record.last_update_date) >= startDate && convertToYYYYMMDD(record.last_update_date) <= endDate)
            setItemChangeData(filteredItemChangeData);
            setFilteredQtyData(filteredQtyData)
            setFilteredPOStatusData(filteredPOStatusData)
        }
    }

    const getSizeWiseHeaders = (data: TotalQuantityChangeModel[]) => {
        const sizeHeaders = new Set<string>();
        data?.forEach(rec => rec.sizeWiseData?.forEach(version => {
          sizeHeaders.add('' + version.sizeDescription);
        }))
        return Array.from(sizeHeaders);
      };
      const getMap = (data: TotalQuantityChangeModel[]) => {
        const sizeWiseMap = new Map<string, Map<string, number>>();
        data?.forEach(rec => {
          if (!sizeWiseMap.has(rec.purchaseOrderNumber)) {
            sizeWiseMap.set(rec.purchaseOrderNumber, new Map<string, number>());
          }
          rec.sizeWiseData?.forEach(version => {
            sizeWiseMap.get(rec.purchaseOrderNumber).set(' ' + version.sizeDescription, version.oldQuantity);
          })
        });
        return sizeWiseMap;
      }


  const renderReport = (data: TotalQuantityChangeModel[]) => {
    const sizeHeaders = getSizeWiseHeaders(data);
    const sizeWiseMap = getMap(data);
      const columns: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'PO Number',
            dataIndex: 'purchaseOrderNumber',
            ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'poLineItemNumber'
        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'scheduleLineItemNumber',
            align: 'center',
            ...getColumnSearchProps('scheduleLineItemNumber')
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'Item',
            dataIndex: 'item',
            render: (text, record) => {
                if (!text || text.trim() === '') {
                  return '-';
                } else {
                  return text;
                }
              },
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
            render: (text, record) => {
                if (!text || text.trim() === '') {
                  return '-';
                } else {
                  return text;
                }
              },
        },
     
        {
            title: 'Style Number',
            dataIndex: 'styleNumber'
        },
        {
            title: 'Product Code',
            dataIndex: 'productCode'
        },
        {
            title: 'Color Description',
            dataIndex: 'colorDesc'
        },
        {
            title: 'OGAC',
            dataIndex: 'OGAC'
        },
        {
            title: 'GAC',
            dataIndex: 'GAC'
        },
        {
            title: 'Destination Country',
            dataIndex: 'destinationCountry',
            align: 'center',
        },
        {
            title: 'Item Text',
            dataIndex: 'itemText',
            width:220,
            align:'center',
            render: (text, record) => {
                if (!text || text.trim() === '') {
                  return '-';
                } else {
                  return text;
                }
              },
        },
     
        // {
        //     title: 'Difference',
        //     dataIndex: 'Diff',
        //     align: 'right',
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
        //     title: 'Total Quantity',
        //     align: 'right',
        //     dataIndex: 'totalQuantity',
        //     render: (text) => (
        //         <span>{Number(text).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
        //     ),
        // },
    ];

    sizeHeaders?.forEach(version => {
        columns.push({
          title: version,
          dataIndex: version,
          key: version,
          width: 130,
          align: 'center',
          
          children: [
            {
              title: 'Old Quantity',
              dataIndex: '',
              key: '',
              align:'right',
              render: (text, record) => {
                const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
                if (sizeData) {
                  if (sizeData.oldQuantity !== null) {
                    const formattedQty = Number(sizeData.oldQuantity).toLocaleString('en-IN', { maximumFractionDigits: 0 });

                    return (
                      formattedQty
                    );
                  } else {
                    return (
                      '-'
                    );
                  }
                } else {
                  return '-';
                }
              }
            },
          
            {
                title: 'New Quantity',
                dataIndex: 'newQuantity',
                align:'right',

                render: (text, record) => {
                    const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
                    if (sizeData) {
                      if (sizeData.newQuantity !== null) {
                        const formattedQty = Number(sizeData.newQuantity).toLocaleString('en-IN', { maximumFractionDigits: 0 });
    
                        return (
                          formattedQty
                        );
                      } else {
                        return (
                          '-'
                        );
                      }
                    } else {
                      return '-';
                    }
                  }
              },
              
              {
                title: 'Difference',
                dataIndex: 'difference',
                align:'right',

                render: (text, record) => {
                  const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
                  if (sizeData) {
                    if (sizeData.difference !== null) {
                      const difference = Number(sizeData.difference);
                      const formattedQty = difference.toLocaleString('en-IN', { maximumFractionDigits: 0 });
              
                      if (difference < 0) {
                        return <span style={{ color: 'red' }}>{formattedQty}</span>;
                      } else {
                        return <span style={{ color: 'green' }}>{formattedQty}</span>;
                      }
                    } else {
                      return '-';
                    }
                  } else {
                    return '-';
                  }
                }
              }
              
              
 
  
          ],
          render: (text, record) => {
            return record.sizeWiseData.find(item => item.sizeDescription === version);
          }
        });
  
      
      });
      return (
        <>
  
          {filterData.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filterData}
              size='large'
              pagination={{
                onChange(current, pageSize) {
                  setPage(current);
                  setPageSize(pageSize);
                }
              }}
              scroll={{ x: 'max-content' }}
              className="custom-table-wrapper"
              bordered
            />
          ) : (<Table size='large' />
          )}
        </>
      );

}

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <b style={{ color: '#25CB2D' }}>Order Qty Revised PO's : {filteredQtyData?.length} </b>,
            children:   [renderReport(filterData)] ,
        },
        {
            key: '2',
            label: <b>Unit changed PO's : {unitChangeData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={unitChangeData} columns={columns4} scroll={{ x: 'max-content' }} />,
        },
        {
            key: '3',
            label: <b style={{ color: '#29D6DE' }}>Item Changed PO's : {itemChangeData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={itemChangeData} columns={columns1} scroll={{ x: 'max-content' }} />,
        },
        {
            key: '4',
            label: <b>PO Line Item Status Revised PO's : {poStatusData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={poStatusData} columns={columns7} scroll={{ x: 'max-content' }} />,
        },
        {
            key: '5',
            label: <b style={{ color: '#B229DE' }}>Price & currency change in FOB : {priceChaneData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={priceChaneData} columns={columns2} scroll={{ x: 'max-content' }} />,
        },
        {
            key: '6',
            label: <b>Product Code Revised : {productCodeChaneData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={productCodeChaneData} columns={columns6} scroll={{ x: 'max-content' }} />,
        },
        {
            key: '7',
            label: <b style={{ color: '#DEAD29' }}>Mode of transportation: {modeOTransportChaneData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={modeOTransportChaneData} columns={columns3} scroll={{ x: 'max-content' }} />,
        },
        {
            key: '8',
            label: <b>Item Text changed PO's : {itemTextChaneData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={itemTextChaneData} columns={columns5} scroll={{ x: 'max-content' }} />,
        }
    ];

    const onReset = () => {
        form.resetFields();
        setSelectedEstimatedFromDate(undefined);
        setSelectedEstimatedToDate(undefined);
        getQtyChangeData()
    }

    return (
        <Card title='Compare Orders' extra={(<Button
            type="default"
            style={{ color: 'green' }}
            onClick={exportExcel}
            icon={<FileExcelFilled />}>Download Excel</Button>)}>
            {/* <Form form={form} layout={"vertical"} >
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 4 }} >
                        <Form.Item name='poandLine' label='Po+Line' >
                            <Select
                                showSearch
                                placeholder="Select Po+Line"
                                optionFilterProp="children"
                                allowClear
                            >
                                {poLine.map((inc: any) => {
                                    return <Option key={inc.id} value={inc.po_and_line}>{inc.po_and_line}</Option>
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
            </Form> */}
            {filteredQtyData || unitChangeData || itemChangeData || poStatusData ? <>
                <Tabs type='card' items={items} />
            </> : <></>}

        </Card>
    );
};

export default OrdersCompareGrid;