import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, DatePicker, Empty, Form, Input, Modal, Row, Select, Table, Tabs, TabsProps, Tag, Tooltip, Typography } from 'antd';
import { NikeService } from '@project-management-system/shared-services';
import { DownOutlined, FileExcelFilled, SearchOutlined, UpOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Excel } from 'antd-table-saveas-excel';
import Highlighter from 'react-highlight-words';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { TotalQuantityChangeModel, nikeFilterRequest } from '@project-management-system/shared-models';

const OrdersCompareGrid = () => {

    const service = new NikeService()
    // const [poStatusData, setPOStatusData] = useState([])
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
    const [remarkModal, setRemarkModal] = useState<boolean>(false)
    const [itemText, setRemarks] = useState<string>('')
    const [modeOTransportChaneData, setmodeOfTransportChangeData] = useState([])
    const [poLine, setPoLine] = useState<any>([]);


    useEffect(() => {
        // poLineItemStatusChange()
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

    // const poLineItemStatusChange = () => {
    //     service.poLineItemStatusChange().then((res) => {
    //         setPOStatusData(res.data)
    //         setFilteredPOStatusData(res.data)
    //     })
    // }

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
                .addColumns(exportingColumns)
                .addDataSource(filterData, { str2num: true });
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

        // if (poStatusData && poStatusData.length > 0) {
        //     excel
        //         .addSheet('PO Line Item Status Change')
        //         .addColumns(data3)
        //         .addDataSource(poStatusData, { str2num: true });
        // }

        if (priceChaneData && priceChaneData.length > 0) {
            excel
                .addSheet('Price & currency change in FOB')
                .addColumns(data5)
                .addDataSource(priceChaneData, { str2num: true });
        }

        excel.saveAs('revisedPOs.xlsx');
    };

    let exportingColumns: IExcelColumn[] = []

    const data2 = [
        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code',
            render: (text, record) => {
                if (!text || text.trim() === '') {
                    return '-';
                } else {
                    const firstFourDigits = text.substring(0, 4);
                    return firstFourDigits;
                }
            },
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
            render: (text, record) => {
                if (!text || text.trim() === '') {
                    return '-';
                } else {
                    const firstFourDigits = text.substring(0, 4);
                    return firstFourDigits;
                }
            },
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
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
            title: 'GAC',
            dataIndex: 'gac',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'CO Number',
            dataIndex: 'customer_order',
        },
        {
            title: 'Size Description',
            dataIndex: 'size_description',
        },

        {
            title: 'Change from Gross Price currency',
            dataIndex: '',
        },
        {
            title: 'Change to Gross Price currency',
            dataIndex: '',
        },
        {
            title: 'Shahi Offered Price from Master File  ',
            dataIndex: '',
        },
        {
            title: 'Shahi Offered Price currency from Master File ',
            dataIndex: ''
        },
        {
            title: 'Change from Trading Co Net including discounts',
            dataIndex: '',
        },
        {
            title: 'Change from Trading Co Net including discounts currency',
            dataIndex: '',
        },
        {
            title: 'Change to Trading Co Net including discounts',
            dataIndex: '',
        },
        {
            title: 'Change to Trading Co Net including discounts currency',
            dataIndex: '',
        },
        {
            title: 'Change from Net including discounts',
            dataIndex: '',
        },
        {
            title: 'Change From Net including discounts currency',
            dataIndex: ''
        },
        {
            title: 'Change to Net including discounts',
            dataIndex: '',
        },
        {
            title: 'Change to Net including discounts Currency',
            dataIndex: '',
        },
        {
            title: 'Legal PDF PO Price',
            dataIndex: ''
        },
        {
            title: 'Legal PDF PO Price Currency',
            dataIndex: ''
        },
        // {
        //     title: 'CRM CO Price',
        //     dataIndex: '',
        // },
        // {
        //     title: 'CRM CO Price Currency',
        //     dataIndex: '',
        // },
        {
            title: 'comparission of CRM CO Price to Legal PDF PO Price',
            dataIndex: '',
        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number',
        },
        {
            title: 'Previous Line Item Status',
            dataIndex: 'old_val'
        },
        {
            title: 'Revised Line Item Status',
            dataIndex: 'new_val'
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'total_item_qty',
            render: (text, record) => (
                <>
                    {Number(record.total_item_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )
        },
    ];

    const data4: any = [
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
            dataIndex: 'item',
            render: (text, record) => {
                if (!text || text.trim() === '') {
                    return '-';
                } else {
                    const firstFourDigits = text.substring(0, 4);
                    return firstFourDigits;
                }
            },
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
            dataIndex: 'ogac',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Total Item Quantity',
            dataIndex: 'total_item_qty'
        },
        {
            title: 'From Factory',
            dataIndex: 'from_factory'
        },
        {
            title: 'Change to Factory',
            dataIndex: 'change_to_factory'
        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number',
        },
        {
            title: 'Previous Unit',
            dataIndex: 'old_val',
        },
        {
            title: 'Revised Unit',
            dataIndex: 'new_val',
        },

    ];

    const data5 = [
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item',
            dataIndex: 'item',
            render: (text, record) => {
                if (!text || text.trim() === '') {
                    return '-';
                } else {
                    const firstFourDigits = text.substring(0, 4);
                    return firstFourDigits;
                }
            },
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
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
            dataIndex: 'product_code',
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'CO Number',
            dataIndex: 'customer_order',
        },
        {
            title: 'Size Description',
            dataIndex: 'size_description',
        },
        {
            title: 'Change From Gross Price',
            dataIndex: 'grossPriceFobOld',
        },
        {
            title: 'Change from Gross Price currency',
            dataIndex: '',
        },
        {
            title: 'Change to Gross Price',
            dataIndex: 'grossPriceFobNew',
            render: (text, record) => {
                const formattedAmount = record.grossPriceFobNew ? parseFloat(record.grossPriceFobNew).toFixed(2) : "-";
                return <>{formattedAmount}</>;
            }
        },
        {
            title: 'Change to Gross Price currency',
            dataIndex: '',
        },
        {
            title: 'Shahi Offered Price from Master File  ',
            dataIndex: 'shahiOfferedPrice',
            render: (text, record) => (record.shahiOfferedPrice ? record.shahiOfferedPrice : '-'),
        },
        {
            title: 'Shahi Offered Price currency from Master File ',
            dataIndex: 'shahiOfferedPricecurrency', width: 90,
            render: (text, record) => (record.shahiOfferedPricecurrency ? record.shahiOfferedPricecurrency : '-'),
        },
        {
            title: 'Change from Trading Co Net including discounts',
            dataIndex: 'trCoNetIncludingDiscFrom',
            render: (text, record) =>
                (record.trCoNetIncludingDiscFrom ? record.trCoNetIncludingDiscFrom : '-')
        },
        {
            title: 'Change from Trading Co Net including discounts currency',
            dataIndex: 'trCoNetIncludingDiscCurrencyCodeFrom',
            render: (text, record) =>
                (record.trCoNetIncludingDiscCurrencyCodeFrom ? record.trCoNetIncludingDiscCurrencyCodeFrom : '-')
        },
        {
            title: 'Change to Trading Co Net including discounts',
            dataIndex: 'trCoNetIncludingDiscNew',
            render: (text, record) =>
                (record.trCoNetIncludingDiscNew ? record.trCoNetIncludingDiscNew : '-')
        },
        {
            title: 'Change to Trading Co Net including discounts currency',
            dataIndex: '',
        },
        {
            title: 'Change from Net including discounts',
            dataIndex: 'trCoNetIncludingDiscFrom',
            render: (text, record) =>
                (record.trCoNetIncludingDiscFrom ? record.trCoNetIncludingDiscFrom : '-')
        },
        {
            title: 'Change from Net including discounts currency',
            dataIndex: 'trCoNetIncludingDiscCurrencyCodeFrom',
            render: (text, record) =>
                (record.trCoNetIncludingDiscCurrencyCodeFrom ? record.trCoNetIncludingDiscCurrencyCodeFrom : '-')
        },
        {
            title: 'Change to Net including discounts',
            dataIndex: 'trCoNetIncludingDiscNew',
            render: (text, record) =>
                (record.trCoNetIncludingDiscNew ? record.trCoNetIncludingDiscNew : '-')
        },
        {
            title: 'Change to Net including discounts Currency',
            dataIndex: 'trCoNetIncludingDiscCurrencyCodeTo',
            render: (text, record) =>
                (record.trCoNetIncludingDiscCurrencyCodeTo ? record.trCoNetIncludingDiscCurrencyCodeTo : '-')
        },
        {
            title: 'Legal PDF PO Price',
            dataIndex: 'legalPoPrice',
            render: (text, record) => (record.legalPoPrice ? record.legalPoPrice : '-'),
        },
        {
            title: 'Legal PDF PO Price Currency',
            dataIndex: 'legalPoCurrency',
            render: (text, record) => (record.legalPoCurrency ? record.legalPoCurrency : '-'),
        },
        {
            title: 'CRM CO Price',
            dataIndex: 'crmCoPrice',
            render: (text, record) => (record.crmCoPrice ? record.crmCoPrice : '-'),
        },
        {
            title: 'CRM CO Price Currency',
            dataIndex: 'coPriceCurrency',
            render: (text, record) => (record.coPriceCurrency ? record.coPriceCurrency : '-'),
        },
        {
            title: 'Comparison of CRM CO Price to Legal PDF PO Price',
            dataIndex: '',
            render: (text, record) => {
                const diff = Number(record.crmCoPrice) - Number(record.legalPoPrice);
                return (Number(diff).toFixed(2));
            }
        }
    ];

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
            width: 60,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            fixed: 'left'
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY'),
            width: 70,
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
            width: 70,
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            width: 70,
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number',
            width: 70,
        },
        {
            title: 'Document Date',
            dataIndex: 'document_date',
            render: (text) => moment(text).format('MM/DD/YYYY'),
            width: 75,
        },
        {
            title: 'Style Number',
            dataIndex: 'style_number',
            width: 70,
        },
        {
            title: 'Product Code',
            dataIndex: 'product_code',
            width: 70,
        },
        {
            title: 'Color Description',
            dataIndex: 'color_desc',
            width: 70,
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
            render: (text) => moment(text).format('MM/DD/YYYY'),
            width: 70,
        },
        {
            title: 'Change from Total Item Quantity',
            dataIndex: 'change_from_total_item_quantity',
            width: 70,
        },
        {
            title: 'Change to Total Item Quantity',
            dataIndex: 'change_to_total_item_quantity',
            width: 70,
        },
        {
            title: 'From Item Number',
            dataIndex: 'from_item_number',
            width: 70,
        },
        {
            title: 'Change to Item Number',
            dataIndex: 'change_to_item_number',
            width: 70,
        },
        // {
        //     title: 'Schedule Line Item No',
        //     dataIndex: 'schedule_line_item_number',
        // },
        // {
        //     title: 'Previous Item',
        //     dataIndex: 'old_val',
        // },
        // {
        //     title: 'Revised Item',
        //     dataIndex: 'new_val',
        //     // width :'190px',
        // },
        // {
        //     title: 'Order Quantity Pieces',
        //     dataIndex: 'total_item_qty',
        //     align: 'right',
        //     render: (text, record) => (
        //         <>
        //             {Number(record.total_item_qty).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
        //         </>
        //     )
        // },
        // {
        //     title: 'Order Revised Date',
        //     dataIndex: 'last_update_date',
        //     render: (text, record) => {
        //         return record.last_update_date ? convertToYYYYMMDD(record.last_update_date) : '-'
        //     }
        // },
        // {
        //     title: 'Order Status',
        //     dataIndex: 'order_status',
        //     render: (value) => <Tag color={value == 'NEW' ? 'green' : 'green-inverse'} >{value}</Tag>
        // }
    ];

    const columns2: any = [
        {
            title: 'S No',
            key: 'sno',
            width: 60,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1), fixed: 'left'
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at', width: 80,
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item',
            dataIndex: 'item', width: 70,
            render: (text, record) => {
                if (!text || text.trim() === '') {
                    return '-';
                } else {
                    const firstFourDigits = text.substring(0, 4);
                    return firstFourDigits;
                }
            },
        },
        {
            title: 'Factory',
            dataIndex: 'factory', width: 70,
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number', width: 90,
        },
        {
            title: 'PO Line Item No', width: 70,
            dataIndex: 'po_line_item_number',
        },
        {
            title: 'Document Date',
            dataIndex: 'document_date',
            width: 80,
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Product Code',
            dataIndex: 'product_code', width: 90,
        },
        {
            title: 'GAC',
            dataIndex: 'gac', width: 80,
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'CO Number',
            dataIndex: 'customer_order', width: 90,
        },
        {
            title: 'Size Description',
            dataIndex: 'size_description', width: 80,
        },
        {
            title: 'Change From Gross Price',
            dataIndex: 'grossPriceFobOld', width: 70,
            align: 'right',
            render: (text, record) => (record.grossPriceFobOld ? record.grossPriceFobOld : '-'),
        },
        {
            title: 'Change from Gross Price currency',
            dataIndex: '',
            align: 'center', width: 70,
        },
        {
            title: 'Change to Gross Price',
            dataIndex: 'grossPriceFobNew', width: 70,
            align: 'right',
            render: (text, record) => {
                const formattedAmount = record.grossPriceFobNew ? parseFloat(record.grossPriceFobNew).toFixed(2) : "-";
                return <>{formattedAmount}</>;
            }
        },
        {
            title: 'Change to Gross Price currency',
            dataIndex: '',
            align: 'right', width: 70,
        },
        {
            title: 'Shahi Offered Price from Master File  ',
            dataIndex: 'shahiOfferedPrice',
            align: 'center', width: 70,
            render: (text, record) => (record.shahiOfferedPrice ? record.shahiOfferedPrice : '-'),
        },
        {
            title: 'Shahi Offered Price currency from Master File ',
            dataIndex: 'shahiOfferedPricecurrency', width: 90,
            render: (text, record) => (record.shahiOfferedPricecurrency ? record.shahiOfferedPricecurrency : '-'),
        },
        {
            title: 'Change from Trading Co Net including discounts',
            dataIndex: 'trCoNetIncludingDiscFrom', width: 90,
            align: 'right',
            render: (text, record) =>
                (record.trCoNetIncludingDiscFrom ? record.trCoNetIncludingDiscFrom : '-')
        },
        {
            title: 'Change from Trading Co Net including discounts currency',
            dataIndex: 'trCoNetIncludingDiscCurrencyCodeFrom', width: 100,
            render: (text, record) =>
                (record.trCoNetIncludingDiscCurrencyCodeFrom ? record.trCoNetIncludingDiscCurrencyCodeFrom : '-')
        },
        {
            title: 'Change to Trading Co Net including discounts',
            dataIndex: 'trCoNetIncludingDiscNew', width: 90,
            render: (text, record) =>
                (record.trCoNetIncludingDiscNew ? record.trCoNetIncludingDiscNew : '-')
        },
        {
            title: 'Change to Trading Co Net including discounts currency',
            dataIndex: '', width: 90,
        },
        {
            title: 'Change from Net including discounts',
            dataIndex: 'trCoNetIncludingDiscFrom', width: 70,
            render: (text, record) =>
                (record.trCoNetIncludingDiscFrom ? record.trCoNetIncludingDiscFrom : '-')
        },
        {
            title: 'Change from Net including discounts currency',
            dataIndex: 'trCoNetIncludingDiscCurrencyCodeFrom', width: 70,
            render: (text, record) =>
                (record.trCoNetIncludingDiscCurrencyCodeFrom ? record.trCoNetIncludingDiscCurrencyCodeFrom : '-')
        },
        {
            title: 'Change to Net including discounts',
            dataIndex: 'trCoNetIncludingDiscNew', width: 70,
            render: (text, record) =>
                (record.trCoNetIncludingDiscNew ? record.trCoNetIncludingDiscNew : '-')
        },
        {
            title: 'Change to Net including discounts currency',
            dataIndex: 'trCoNetIncludingDiscCurrencyCodeTo', width: 70,
            render: (text, record) =>
                (record.trCoNetIncludingDiscCurrencyCodeTo ? record.trCoNetIncludingDiscCurrencyCodeTo : '-')
        },
        {
            title: 'Legal PDF PO Price',
            dataIndex: 'legalPoPrice', width: 70,
            render: (text, record) => (record.legalPoPrice ? record.legalPoPrice : '-'),
            align: 'right'
        },
        {
            title: 'Legal PDF PO Price Currency',
            dataIndex: 'legalPoCurrency', width: 70,
            render: (text, record) => (record.legalPoCurrency ? record.legalPoCurrency : '-'),
        },
        {
            title: 'CRM CO Price',
            dataIndex: 'crmCoPrice', width: 70,
            align: 'right',
            render: (text, record) => (record.crmCoPrice ? record.crmCoPrice : '-'),
        },
        {
            title: 'CRM CO Price Currency',
            dataIndex: 'coPriceCurrency', width: 70,
            render: (text, record) => (record.coPriceCurrency ? record.coPriceCurrency : '-'),
        },
        {
            title: 'Comparison of CRM CO Price to Legal PDF PO Price',
            dataIndex: '',
            align: 'right', width: 90,
            render: (text, record) => {
                const diff = Number(record.crmCoPrice) - Number(record.legalPoPrice);
                const color = diff < 0 ? 'red' : diff > 0 ? 'green' : 'black';
                const arrowIcon = diff < 0 ? <DownOutlined /> : diff > 0 ? <UpOutlined /> : null;
                return (
                    <span style={{ color }}>
                        {arrowIcon} {Number(diff).toFixed(2)}
                    </span>
                );
            }
        }
    ];

    const columns3: any = [
        {
            title: 'S No',
            key: 'sno',
            width: 60,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1), fixed: 'left'
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item',
            dataIndex: 'item',
            render: (text, record) => {
                if (!text || text.trim() === '') {
                    return '-';
                } else {
                    const firstFourDigits = text.substring(0, 4);
                    return firstFourDigits;
                }
            },
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number',
            // fixed: 'left'
        },
        {
            title: 'Unit',
            dataIndex: 'factory',
        },
        {
            title: 'CO Number',
            dataIndex: '',
        },
        {
            title: 'Document Date',
            dataIndex: 'documentDate',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'OGAC',
            dataIndex: 'ogac',
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'GAC',
            dataIndex: 'gac',
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'Mode of Transportation Code in DPOM',
            dataIndex: '',
        },
        {
            title: 'Mode of Transportation Code in CRM CO',
            dataIndex: '',
        },
    ];

    const columns4: any = [
        {
            title: 'S No',
            key: 'sno', width: 40,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            fixed: 'left'
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at', width: 70,
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Item No',
            dataIndex: 'item', width: 70,
            render: (text, record) => {
                if (!text || text.trim() === '') {
                    return '-';
                } else {
                    const firstFourDigits = text.substring(0, 4);
                    return firstFourDigits;
                }
            },
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number', width: 70,
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number', width: 70,
        },
        {
            title: 'Document Date',
            dataIndex: 'document_date', width: 70,
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Style Number',
            dataIndex: 'style_number', width: 70,
        },
        {
            title: 'Product Code',
            dataIndex: 'product_code', width: 70,
        },
        {
            title: 'Color Description',
            dataIndex: 'color_desc', width: 70,
        },
        {
            title: 'OGAC',
            dataIndex: 'ogac', width: 70,
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'GAC',
            dataIndex: 'gac', width: 70,
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'Total Item Quantity',
            dataIndex: 'total_item_qty', width: 70,
        },
        {
            title: 'From Factory',
            dataIndex: 'from_factory', width: 70,
        },
        {
            title: 'Change to Factory',
            dataIndex: 'change_to_factory', width: 70,
        }
    ];

    const columns5: any = [
        {
            title: 'S No',
            key: 'sno',
            width: 60,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY'),
            width: 80,
        },
        {
            title: 'Item',
            dataIndex: 'item', width: 80,
            render: (text, record) => {
                if (!text || text.trim() === '') {
                    return '-';
                } else {
                    const firstFourDigits = text.substring(0, 4);
                    return firstFourDigits;
                }
            },
        },
        {
            title: 'Factory',
            dataIndex: 'factory', width: 80,
        },
        {
            title: 'Document Date',
            dataIndex: 'documentDate',
            width: 80,
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            width: 80,
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number',
            width: 80,
        },
        {
            title: 'Total Iten Quantity',
            dataIndex: '', width: 80,
        },
        {
            title: 'Product Code',
            dataIndex: '', width: 80,
        },
        {
            title: 'OGAC',
            dataIndex: 'ogac', width: 80,
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'GAC',
            dataIndex: 'gac', width: 80,
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'Change from Direct Ship Sales Order Number',
            dataIndex: '', width: 120,
        },
        {
            title: 'Change from Direct Ship Sales Order Item',
            dataIndex: '', width: 100,
        },
        {
            title: 'Change to Direct Ship Sales Order Number',
            dataIndex: '', width: 100,
        },
        {
            title: 'Change to Direct Ship Sales Order Item',
            dataIndex: '', width: 100,
        },
        {
            title: 'Change from Item Vas Text',
            dataIndex: '', width: 80,
        },
        {
            title: 'Change to Item Vas Text',
            dataIndex: '', width: 80,
            ...getColumnSearchProps('')
        },
        {
            title: 'Item VAS -PDF PO',
            dataIndex: '', width: 80,
        },
        {
            title: 'DIFFERENCE IN ITEM VAS TEXT ( between DPOM to DPOM)',
            dataIndex: '', width: 200,
        },
        {
            title: 'DIFFERENCE IN ITEM VAS TEXT ( between DPOM to PDF PO) ',
            dataIndex: '', width: 200,
        },
    ];

    const columns6: any = [
        {
            title: 'S No',
            key: 'sno',
            width: 60,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1), fixed: 'left'
        },

        {
            title: 'Report Generate Date',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('MM/DD/YYYY'), width: 80
        },
        {
            title: 'Item',
            dataIndex: 'item', width: 80,
            render: (text, record) => {
                if (!text || text.trim() === '') {
                    return '-';
                } else {
                    const firstFourDigits = text.substring(0, 4);
                    return firstFourDigits;
                }
            },
        },
        {
            title: 'Factory',
            dataIndex: 'factory',
            width: 80
        },
        {
            title: 'Document Date',
            dataIndex: 'document_date',
            render: (text) => moment(text).format('MM/DD/YYYY'), width: 80
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            width: 80
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'po_line_item_number', width: 80
        },
        {
            title: 'Product Code',
            dataIndex: 'product_code', width: 80
        },
        {
            title: 'OGAC',
            dataIndex: 'ogac', width: 80,
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'GAC',
            dataIndex: 'gac', width: 80,
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'Change from Inventory Segment Code',
            dataIndex: '', width: 100,
        },
        {
            title: 'Change To Inventory Segment Code',
            dataIndex: '', width: 100,
        },
        {
            title: 'Change from Destination Country Name',
            dataIndex: '', width: 105,
        },
        {
            title: 'Change To Destination Country Name',
            dataIndex: '', width: 100,
        },
        {
            title: 'Change from Ship To Customer Number',
            dataIndex: '', width: 90,
        },
        {
            title: 'Change to Ship To Customer Number',
            dataIndex: '', width: 90,
        },
        {
            title: 'Ship To Customer Number in DIA',
            dataIndex: '', width: 90,
        },
        {
            title: 'Change from Plant Code',
            dataIndex: 'old_val', width: 90,
        },
        {
            title: 'Change to Plant Code',
            dataIndex: 'new_val', width: 90,
        },
    ];

    const columns7: any = [
        {
            title: 'S No',
            key: 'sno',
            width: 60,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1), fixed: 'left'
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number', width: 70,
        },
        {
            title: 'PO Line Item No', width: 70,
            dataIndex: 'po_line_item_number', fixed: 'left'
        },
        {
            title: 'Report Generate Date',
            dataIndex: 'created_at', width: 70,
            render: (text) => moment(text).format('MM/DD/YYYY'), fixed: 'left'
        },
        {
            title: 'Item',
            dataIndex: 'item', width: 70, align: 'center',
            render: (text, record) => {
                if (!text || text.trim() === '') {
                    return '-';
                } else {
                    const firstFourDigits = text.substring(0, 4);
                    return firstFourDigits;
                }
            },
        },
        {
            title: 'Factory',
            dataIndex: 'factory', width: 70,
            render: (text, record) => {
                if (!text || text.trim() === '') {
                    return '-';
                } else {
                    const firstFourDigits = text.substring(0, 4);
                    return firstFourDigits;
                }
            },
        },
        {
            title: 'Product Code',
            dataIndex: 'product_code', width: 70,
        },
        {
            title: 'GAC',
            dataIndex: 'gac', width: 70,
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'CO Number',
            dataIndex: 'customer_order', width: 70,
        },
        {
            title: 'Size Description',
            dataIndex: 'size_description', width: 80, align: 'center'
        },
        {
            title: 'Schedule Line Item No',
            dataIndex: 'schedule_line_item_number', width: 80, align: 'center'
        },
        {
            title: 'Previous Line Item Status',
            dataIndex: 'old_val',
            align: 'center', width: 70,
        },
        {
            title: 'Revised Line Item Status',
            dataIndex: 'new_val', align: 'center', width: 70,
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'total_item_qty',
            align: 'right', width: 80,
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

    const handleTextClick = (remarks) => {
        setRemarks(remarks)
        setRemarkModal(true)
    }
    const onRemarksModalOk = () => {
        setRemarkModal(false)
    }
    const renderReport = (data: TotalQuantityChangeModel[]) => {
        const sizeHeaders = getSizeWiseHeaders(data);
        const sizeWiseMap = getMap(data);
        exportingColumns = [
            {
                title: 'PO Number',
                dataIndex: 'purchaseOrderNumber',
            },
            {
                title: 'PO Line Item No',
                dataIndex: 'poLineItemNumber',
            },
            {
                title: 'Schedule Line Item No',
                dataIndex: 'scheduleLineItemNumber',
            },
            {
                title: 'Report Generate Date',
                dataIndex: 'createdAt',
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
                dataIndex: 'styleNumber',
            },
            {
                title: 'Product Code',
                dataIndex: 'productCode',
            },
            {
                title: 'Color Description',
                dataIndex: 'colorDesc',
            },
            {
                title: 'OGAC',
                dataIndex: 'OGAC',
                render: (text) => moment(text).format('MM/DD/YYYY')
            },
            {
                title: 'GAC',
                dataIndex: 'GAC',
                render: (text) => moment(text).format('MM/DD/YYYY')
            },
            {
                title: 'Destination Country',
                dataIndex: 'destinationCountry',
            },
            {
                title: 'Total Quantity',
                align: 'right',
                dataIndex: 'totalQuantity',
                render: (text) => (
                    <span>{Number(text).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                ),
            },
            {
                title: 'Item Text',
                dataIndex: 'itemText',
                // render:(text,record) => {
                //     return(
                //         <>
                //         {record.itemText?.length > 30 ? (<><Tooltip title='Cilck to open full itemText'><p><span onClick={() => handleTextClick(record.itemText)} style={{ cursor: 'pointer' }}>
                //                     {record.itemText.length > 30 ? `${record.itemText?.substring(0, 30)}....` : record.itemText}
                //                 </span></p></Tooltip></>) : (<>{record.itemText}</>)}
                //         </>
                //     )
                // }
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
        ]

        const columns: any = [
            {
                title: 'S No',
                key: 'sno',
                width: '60px',
                render: (text, object, index) => (page - 1) * pageSize + (index + 1),
                fixed: 'left'
            },
            {
                title: 'Report Generate Date',
                dataIndex: 'createdAt', width: 70,
                render: (text) => moment(text).format('MM/DD/YYYY'),
            },
            {
                title: 'Item',
                dataIndex: 'item',
                width: 70,
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        const firstFourDigits = text.substring(0, 4);
                        return firstFourDigits;
                    }
                },
            },
            {
                title: 'Factory',
                dataIndex: 'factory', width: 70,
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'PO Number',
                dataIndex: 'purchaseOrderNumber',
                width: 70,
            },
            {
                title: 'PO Line Item No', width: 70,
                dataIndex: 'poLineItemNumber', align: 'center'
            },
            {
                title: 'Document Date',
                dataIndex: 'documentDate', width: 75,
                align: 'center',
                render: (text) => moment(text).format('MM/DD/YYYY'),
            },
            {
                title: 'Style Number',
                dataIndex: 'styleNumber', width: 70,
            },
            {
                title: 'Product Code',
                dataIndex: 'productCode', width: 70,
            },
            {
                title: 'Color Description',
                dataIndex: 'colorDesc', width: 70,
            },
            {
                title: 'OGAC',
                dataIndex: 'OGAC', width: 70,
                render: (text) => moment(text).format('MM/DD/YYYY')
            },
            {
                title: 'GAC',
                dataIndex: 'GAC', width: 70,
                render: (text) => moment(text).format('MM/DD/YYYY')
            },
            {
                title: 'Destination Country',
                dataIndex: 'destinationCountry', width: 90,
                align: 'center',
            }
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
                        key: '', width: 70,
                        align: 'right',
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
                        align: 'right', width: 70,

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
                        align: 'right', width: 75,

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
            exportingColumns.push({
                title: version,
                dataIndex: '',
                children: [
                    {
                        title: 'Old Quantity',
                        dataIndex: '',
                        align: 'right',
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

        columns.push(
            {
                title: 'Total Quantity',
                align: 'right',
                dataIndex: 'totalQuantity',
                width: 100,
                render: (text) => (
                    <span>{Number(text).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                ),
            },
            {
                title: 'Item Text',
                dataIndex: 'itemText',
                width: 220,
                align: 'center',
                render: (text, record) => {
                    return (
                        <>
                            {record.itemText?.length > 30 ? (<><Tooltip title='Cilck to open full itemText'><p><span onClick={() => handleTextClick(record.itemText)} style={{ cursor: 'pointer' }}>
                                {record.itemText.length > 30 ? `${record.itemText?.substring(0, 30)}....` : record.itemText}
                            </span></p></Tooltip></>) : (<>{record.itemText}</>)}
                        </>
                    )
                }
            }
        )
        return (
            <>
                {filterData?.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={filterData}
                        size='large'
                        // pagination={false}
                        pagination={{
                            pageSize: 50,
                            onChange(current, pageSize) {
                                setPage(current);
                                setPageSize(pageSize);
                            }
                        }}
                        scroll={{ x: 'max-content', y: 450 }}
                        className="custom-table-wrapper"
                        bordered
                    />
                ) : (<Table size='large' columns={columns} className="custom-table-wrapper"
                    bordered />
                )}
            </>
        );

    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <b style={{ color: '#25CB2D' }}>Order Qty Revised PO's : {filteredQtyData?.length} </b>,
            children: [renderReport(filterData)],
        },
        {
            key: '2',
            label: <b>Unit changed PO's : {unitChangeData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={unitChangeData} columns={columns4} pagination={false} scroll={{ x: 'max-content', y: 450 }} />,
        },
        {
            key: '3',
            label: <b style={{ color: '#29D6DE' }}>Item Changed PO's : {itemChangeData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={itemChangeData} columns={columns1} pagination={false} scroll={{ x: 'max-content', y: 450 }} />,
        },
        // {
        //     key: '4',
        //     label: <b>PO Line Item Status Revised PO's : {poStatusData?.length}</b>,
        //     children: <Table className="custom-table-wrapper" bordered dataSource={poStatusData} columns={columns7} pagination={false} scroll={{ x: 'max-content', y: 450 }} />,
        // },
        {
            key: '4',
            label: <b style={{ color: '#B229DE' }}>Price & currency change in FOB : {priceChaneData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={priceChaneData} pagination={{
                pageSize: 50,
                onChange(current, pageSize) {
                    setPage(current);
                    setPageSize(pageSize);
                }
            }} columns={columns2} scroll={{ x: 2000, y: 500 }} />,
        },
        {
            key: '5',
            label: <b>Country & Coustomer & Plant Revised : {productCodeChaneData?.length}</b>,
            children: <Table className="custom-table-wrapper" bordered dataSource={productCodeChaneData} columns={columns6} pagination={false} scroll={{ x: 2000, y: 450 }} />,
        },
        // {
        //     key: '7',
        //     label: <b style={{ color: '#DEAD29' }}>Mode of transportation: {modeOTransportChaneData?.length}</b>,
        //     children: <Table className="custom-table-wrapper" bordered dataSource={modeOTransportChaneData} columns={columns3} pagination={false} scroll={{ x: 'max-content', y: 500 }} />,
        // },
        // {
        //     key: '6',
        //     label: <b style={{ color: '#DEAD29' }}>Item Text changed PO's : {itemTextChaneData?.length}</b>,
        //     children: <Table className="custom-table-wrapper" bordered dataSource={itemTextChaneData} columns={columns5} pagination={false} scroll={{ x: 'max-content', y: 500 }} />,
        // }
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
            <>
                <Tabs type='card' items={items} />
            </>
            <Modal open={remarkModal} onOk={onRemarksModalOk} onCancel={onRemarksModalOk} footer={[<Button onClick={onRemarksModalOk} type='primary'>Ok</Button>]}>
                <Card>
                    <p>{itemText}</p>
                </Card>
            </Modal>
        </Card>
    );
};

export default OrdersCompareGrid;