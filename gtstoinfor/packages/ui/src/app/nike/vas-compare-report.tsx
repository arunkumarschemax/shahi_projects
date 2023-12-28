import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Form, Input, Modal, Table, Tabs, TabsProps, Tooltip } from 'antd';
import { NikeService } from '@project-management-system/shared-services';
import { FileExcelFilled, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Excel } from 'antd-table-saveas-excel';
import Highlighter from 'react-highlight-words';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { TotalQuantityChangeModel, nikeFilterRequest } from '@project-management-system/shared-models';

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
    const [pageSize, setPageSize] = useState<number>(null);
    const [unitChangeData, setUnitChangeData] = useState([])
    const [page, setPage] = React.useState(1);
    const [form] = Form.useForm();
    const [poLine, setPoLine] = useState<any>([]);
    const [productCodeChaneData, setProductCodeChangeData] = useState([])
    const [filterData, setFilterData] = useState<any>([])
    const [remarkModal, setRemarkModal] = useState<boolean>(false)
    const [itemText, setRemarks] = useState<string>('')


    useEffect(() => {
        getQtyChangeData()
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
        service.getVasTextChangeData(req).then((res) => {
            setQtyData(res.data)
            setFilteredQtyData(res.data)
            setFilterData(res.data)
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
        excel.saveAs('VasRevised.xlsx');
    }

    const data1 = [

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
            dataIndex: 'totalItemQty',
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
            title: 'Previous Order Quantity Pieces', width: 80,
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
            title: 'Order Status', width: 80,
            dataIndex: 'dpom_item_line_status',
        }
    ]

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
                title: 'Item Vas Text',
                dataIndex: 'itemVasText',
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
            // }
        ]
        const handleTextClick = (remarks) => {
            setRemarks(remarks)
            setRemarkModal(true)
        }
        const onRemarksModalOk = () => {
            setRemarkModal(false)
        }
        const columns: any = [
            {
                title: 'S No',
                key: 'sno',
                width: '60px',
                render: (text, object, index) => (page - 1) * pageSize + (index + 1),
                // fixed: 'left'
            },
            {
                title: 'Report Generate Date',
                dataIndex: 'created_at', width: 70,
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
                dataIndex: 'destinationCountry', width: 80,
                align: 'center',
            }
        ];

        // sizeHeaders?.forEach(version => {
        //     columns.push({
        //         title: version,
        //         dataIndex: version,
        //         key: version,
        //         width: 130,
        //         align: 'center',
        //         children: [
        //             {
        //                 title: 'Old Quantity',
        //                 dataIndex: '',
        //                 key: '', width: 70,
        //                 align: 'right',
        //                 render: (text, record) => {
        //                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
        //                     if (sizeData) {
        //                         if (sizeData.oldQuantity !== null) {
        //                             const formattedQty = Number(sizeData.oldQuantity).toLocaleString('en-IN', { maximumFractionDigits: 0 });

        //                             return (
        //                                 formattedQty
        //                             );
        //                         } else {
        //                             return (
        //                                 '-'
        //                             );
        //                         }
        //                     } else {
        //                         return '-';
        //                     }
        //                 }
        //             },
        //             {
        //                 title: 'New Quantity',
        //                 dataIndex: 'newQuantity',
        //                 align: 'right', width: 70,

        //                 render: (text, record) => {
        //                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
        //                     if (sizeData) {
        //                         if (sizeData.newQuantity !== null) {
        //                             const formattedQty = Number(sizeData.newQuantity).toLocaleString('en-IN', { maximumFractionDigits: 0 });

        //                             return (
        //                                 formattedQty
        //                             );
        //                         } else {
        //                             return (
        //                                 '-'
        //                             );
        //                         }
        //                     } else {
        //                         return '-';
        //                     }
        //                 }
        //             },
        //             {
        //                 title: 'Difference',
        //                 dataIndex: 'difference',
        //                 align: 'right', width: 75,

        //                 render: (text, record) => {
        //                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
        //                     if (sizeData) {
        //                         if (sizeData.difference !== null) {
        //                             const difference = Number(sizeData.difference);
        //                             const formattedQty = difference.toLocaleString('en-IN', { maximumFractionDigits: 0 });

        //                             if (difference < 0) {
        //                                 return <span style={{ color: 'red' }}>{formattedQty}</span>;
        //                             } else {
        //                                 return <span style={{ color: 'green' }}>{formattedQty}</span>;
        //                             }
        //                         } else {
        //                             return '-';
        //                         }
        //                     } else {
        //                         return '-';
        //                     }
        //                 }
        //             }
        //         ],
        //         render: (text, record) => {
        //             return record.sizeWiseData.find(item => item.sizeDescription === version);
        //         }
        //     });
        //     exportingColumns.push({
        //         title: version,
        //         dataIndex: '',
        //         children: [
        //             {
        //                 title: 'Old Quantity',
        //                 dataIndex: '',
        //                 align: 'right',
        //                 render: (text, record) => {
        //                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
        //                     if (sizeData) {
        //                         if (sizeData.oldQuantity !== null) {
        //                             const formattedQty = Number(sizeData.oldQuantity).toLocaleString('en-IN', { maximumFractionDigits: 0 });

        //                             return (
        //                                 formattedQty
        //                             );
        //                         } else {
        //                             return (
        //                                 '-'
        //                             );
        //                         }
        //                     } else {
        //                         return '-';
        //                     }
        //                 }
        //             },
        //             {
        //                 title: 'New Quantity',
        //                 dataIndex: 'newQuantity',
        //                 render: (text, record) => {
        //                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
        //                     if (sizeData) {
        //                         if (sizeData.newQuantity !== null) {
        //                             const formattedQty = Number(sizeData.newQuantity).toLocaleString('en-IN', { maximumFractionDigits: 0 });

        //                             return (
        //                                 formattedQty
        //                             );
        //                         } else {
        //                             return (
        //                                 '-'
        //                             );
        //                         }
        //                     } else {
        //                         return '-';
        //                     }
        //                 }
        //             },
        //             {
        //                 title: 'Difference',
        //                 dataIndex: 'difference',
        //                 render: (text, record) => {
        //                     const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
        //                     if (sizeData) {
        //                         if (sizeData.difference !== null) {
        //                             const difference = Number(sizeData.difference);
        //                             const formattedQty = difference.toLocaleString('en-IN', { maximumFractionDigits: 0 });

        //                             if (difference < 0) {
        //                                 return <span style={{ color: 'red' }}>{formattedQty}</span>;
        //                             } else {
        //                                 return <span style={{ color: 'green' }}>{formattedQty}</span>;
        //                             }
        //                         } else {
        //                             return '-';
        //                         }
        //                     } else {
        //                         return '-';
        //                     }
        //                 }
        //             }
        //         ],
        //         render: (text, record) => {
        //             return record.sizeWiseData.find(item => item.sizeDescription === version);
        //         }
        //     });
        // });

        columns.push(
            {
                title: 'Item Text',
                dataIndex: 'itemVasText',
                width: 220,
                align: 'center',
                render: (text, record) => {
                    return (
                        <>
                            {record.itemVasText?.length > 30 ? (<><Tooltip title='Cilck to open full itemVasText'><p><span onClick={() => handleTextClick(record.itemVasText)} style={{ cursor: 'pointer' }}>
                                {record.itemVasText.length > 30 ? `${record.itemVasText?.substring(0, 30)}....` : record.itemVasText}
                            </span></p></Tooltip></>) : (<>{record.itemVasText}</>)}
                        </>
                    )
                }
            }
        )
        return (
            <>
                {filterData.length > 0 ? (
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
                ) : (<Table size='large' />
                )}
            </>
        );

    }
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

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <b style={{ color: '#25CB2D' }}>VAS Text Revised PO's : {filteredQtyData?.length} </b>,
            children: [renderReport(filterData)],
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
        // {
        //     key: '2',
        //     label: <b>Product Code Revised : {productCodeChaneData?.length}</b>,
        //     children: <Table className="custom-table-wrapper" bordered dataSource={productCodeChaneData} columns={columns6} pagination={false} scroll={{ x: 1800, y: 450}} />,
        // },
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
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 3 }} lg={{ span: 3 }} xl={{ span: 4 }} >
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
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4  }} xl={{ span: 4 }} style={{ marginTop: 20 }}>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            style={{ marginRight: 50, width: 100 }}
                            htmlType="button"
                            onClick={getFilterdData}>Search</Button>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 3 }} lg={{ span: 3 }} xl={{ span: 4 }} style={{ marginTop: 20 }}>
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
            <Modal open={remarkModal} onOk={onRemarksModalOk} onCancel={onRemarksModalOk} footer={[<Button onClick={onRemarksModalOk} type='primary'>Ok</Button>]}>
                <Card>
                    <p>{itemText}</p>
                </Card>
            </Modal>

        </Card>
    );
};

export default VASChangesCompareGrid;