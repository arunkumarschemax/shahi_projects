import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Form, Input, Modal, Table, Tabs, TabsProps, Tooltip } from 'antd';
import { NikeService } from '@project-management-system/shared-services';
import { FileExcelFilled, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Excel } from 'antd-table-saveas-excel';
import Highlighter from 'react-highlight-words';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { TotalQuantityChangeModel, nikeFilterRequest } from '@project-management-system/shared-models';
import { diffChars } from 'diff';

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
        getVasTextChangeData()
        getPoLine()
    }, [])

    const getPoLine = () => {
        service.getPpmPoLineForNikeOrder().then(res => {
            setPoLine(res.data)
        })
    }

    const getVasTextChangeData = () => {
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
        if (filterData.length > 0) {
            excel
                .addSheet('VAS Text Revised PO')
                .addColumns(data1)
                .addDataSource(filterData, { str2num: true })
        }
        excel.saveAs('VasRevised.xlsx');
    }

    let data1: IExcelColumn[] = []
    data1 = [
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
            title: 'Document Date',
            dataIndex: 'documentDate',
            render: (text) => moment(text).format('MM/DD/YYYY')
        },
        {
            title: 'PO Number',
            dataIndex: 'purchaseOrderNumber',
        },
        {
            title: 'PO Line Item No',
            dataIndex: 'poLineItemNumber',
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
            dataIndex: 'OGAC',
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'GAC',
            dataIndex: 'GAC',
            render: (text) => moment(text).format('MM/DD/YYYY'),
        },
        {
            title: 'Change from Direct Ship Sales Order Number',
            dataIndex: '',
        },
        {
            title: 'Change from Direct Ship Sales Order Item',
            dataIndex: '',
        },
        {
            title: 'Change to Direct Ship Sales Order Number',
            dataIndex: '',
        },
        {
            title: 'Change to Direct Ship Sales Order Item',
            dataIndex: '',
        },
        {
            title: 'Change from Item Vas Text',
            dataIndex: 'old_val'
        },
        {
            title: 'Change to Item Vas Text',
            dataIndex: 'new_val'
        },
        {
            title: 'Item VAS -PDF PO',
            dataIndex: 'item_vas_pdf'
        },
        {
            title: 'DIFFERENCE IN ITEM VAS TEXT ( between DPOM to DPOM)',
            dataIndex: '', width: 200,
            render: (text, record) => {
                if (record.old_val == null) {
                    return record.new_val
                } else if (record.new_val == null) {
                    return record.old_val
                } else {
                    const charsDiff = diffChars(record.old_val, record.new_val);
                    // Extract only the added and removed parts
                    const addedText = charsDiff.filter((part) => part.added).map((part) => part.value).join('');
                    const removedText = charsDiff.filter((part) => part.removed).map((part) => part.value).join('');
                    return (
                        <div>
                            <p>{addedText}</p>
                            <p>{removedText}</p>
                        </div>
                    );
                }
            }
        },
        {
            title: 'DIFFERENCE IN ITEM VAS TEXT ( between DPOM to PDF PO) ',
            dataIndex: '', width: 200,
            render: (text, record) => {
                if (record.item_vas_pdf == null) {
                    return record.new_val
                } else if (record.new_val == null) {
                    return record.item_vas_pdf
                } else {
                    const charsDiff = diffChars(record.item_vas_pdf, record.new_val);
                    // Extract only the added and removed parts
                    const addedText = charsDiff.filter((part) => part.added).map((part) => part.value).join('');
                    const removedText = charsDiff.filter((part) => part.removed).map((part) => part.value).join('');
                    return (
                        <div>
                            <p>{addedText}</p>
                            <p>{removedText}</p>
                        </div>
                    );
                }
            }
        }
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
                dataIndex: 'purchaseOrderNumber',
                width: 80,
            },
            {
                title: 'PO Line Item No',
                dataIndex: 'poLineItemNumber',
                width: 80,
            },
            {
                title: 'Total Item Quantity',
                dataIndex: 'totalItemQty', width: 80,
            },
            {
                title: 'Product Code',
                dataIndex: 'productCode', width: 80,
            },
            {
                title: 'OGAC',
                dataIndex: 'OGAC', width: 80,
                render: (text) => moment(text).format('MM/DD/YYYY'),
            },
            {
                title: 'GAC',
                dataIndex: 'GAC', width: 80,
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
                dataIndex: 'old_val', width: 80,
                render: (text, record) => {
                    return (
                        <>
                            {record.old_val?.length > 30 ? (<><Tooltip title='Cilck to open full Item Vas Text'><p><span onClick={() => handleTextClick(record.old_val)} style={{ cursor: 'pointer' }}>
                                {record.old_val.length > 30 ? `${record.old_val?.substring(0, 30)}....` : record.old_val}
                            </span></p></Tooltip></>) : (<>{record.old_val}</>)}
                        </>
                    )
                }
            },
            {
                title: 'Change to Item Vas Text',
                dataIndex: 'new_val', width: 80,
                render: (text, record) => {
                    return (
                        <>
                            {record.new_val?.length > 30 ? (<><Tooltip title='Cilck to open full Item Vas Text'><p><span onClick={() => handleTextClick(record.new_val)} style={{ cursor: 'pointer' }}>
                                {record.new_val.length > 30 ? `${record.new_val?.substring(0, 30)}....` : record.new_val}
                            </span></p></Tooltip></>) : (<>{record.new_val}</>)}
                        </>
                    )
                }
            },
            {
                title: 'Item VAS-PDF PO',
                dataIndex: 'item_vas_pdf', width: 80,
                render: (text, record) => {
                    return (
                        <>
                            {record.item_vas_pdf?.length > 30 ? (<><Tooltip title='Cilck to open full Item Vas Text'><p><span onClick={() => handleTextClick(record.item_vas_pdf)} style={{ cursor: 'pointer' }}>
                                {record.item_vas_pdf.length > 30 ? `${record.item_vas_pdf?.substring(0, 30)}....` : record.item_vas_pdf}
                            </span></p></Tooltip></>) : (<>{record.item_vas_pdf}</>)}
                        </>
                    )
                }
            },
            {
                title: 'DIFFERENCE IN ITEM VAS TEXT ( between DPOM to DPOM)',
                dataIndex: '', width: 200,
                render: (text, record) => {
                    if (record.old_val == null) {
                        return record.new_val
                    } else if (record.new_val == null) {
                        return record.old_val
                    } else {
                        const charsDiff = diffChars(record.old_val, record.new_val);
                        // Extract only the added and removed parts
                        const addedText = charsDiff.filter((part) => part.added).map((part) => part.value).join('');
                        const removedText = charsDiff.filter((part) => part.removed).map((part) => part.value).join('');
                        return (
                            <div>
                                <p>{addedText}</p>
                                <p>{removedText}</p>
                            </div>
                        );
                    }
                }
            },
            {
                title: 'DIFFERENCE IN ITEM VAS TEXT ( between DPOM to PDF PO) ',
                dataIndex: '', width: 200,
                render: (text, record) => {
                    if (record.item_vas_pdf == null) {
                        return record.new_val
                    } else if (record.new_val == null) {
                        return record.item_vas_pdf
                    } else {
                        const charsDiff = diffChars(record.item_vas_pdf, record.new_val);
                        // Extract only the added and removed parts
                        const addedText = charsDiff.filter((part) => part.added).map((part) => part.value).join('');
                        const removedText = charsDiff.filter((part) => part.removed).map((part) => part.value).join('');
                        return (
                            <div>
                                <p>{addedText}</p>
                                <p>{removedText}</p>
                            </div>
                        );
                    }
                }
            },
        ];

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
                ) : (<Table size='large' columns={columns} className="custom-table-wrapper" bordered />
                )}
            </>
        );

    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <b style={{ color: '#25CB2D' }}>VAS Text Revised PO's : {filteredQtyData?.length} </b>,
            children: [renderReport(filterData)],
        }
    ];

    return (
        <Card title='Compare Orders' extra={(<Button
            type="default"
            style={{ color: 'green' }}
            onClick={exportExcel}
            icon={<FileExcelFilled />}>Download Excel</Button>)}>
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

export default VASChangesCompareGrid;