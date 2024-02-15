import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Row, Input, Col, Form, Button, Checkbox, Modal, Tooltip, message } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { FileExcelFilled, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { Excel } from 'antd-table-saveas-excel';
import { NikeService } from '@project-management-system/shared-services';
import { diffChars } from 'diff';
import DivertDataEntry from './divert-data-entry';


interface ExpandedRows {
    [key: string]: boolean;
}

const DivertReport = () => {

    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<any>(null);
    const [items, setItems] = useState<any[]>([]);
    const service = new NikeService();
    const [trimsChange, setTrimsChange] = useState<{ [key: string]: string }>({});
    const [surcharge, setSurcharge] = useState<{ [key: string]: string }>({});
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [remarkModal, setRemarkModal] = useState<boolean>(false)
    const [itemText, setRemarks] = useState<string>('')

    useEffect(() => {
        getData();
    }, [])

    const handleTrimsChange = (id: string, value: string) => {
        setTrimsChange(prevTextareaValues => ({ ...prevTextareaValues, [id]: value }));
    };

    const handleSurcharge = (id: string, value: string) => {
        setSurcharge(prevTextareaValues => ({ ...prevTextareaValues, [id]: value }));
    };

    const handleSubmit = (id: string) => {
        console.log(`Textarea value for ID ${id}:`, trimsChange[id], surcharge[id]);
        service.updateDivertDataValues({ id: id, trimsChange: trimsChange[id], surcharge: surcharge[id] }).then(res => {
            if (res.status) {
                setTrimsChange(null)
                setSurcharge(null)
                getData();
                message.success(res.internalMessage)
            } else {
                message.error(res.internalMessage)
            }
        })

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

    const handleTextClick = (remarks) => {
        setRemarks(remarks)
        setRemarkModal(true)
    }
    const onRemarksModalOk = () => {
        setRemarkModal(false)
    }

    const getData = () => {
        service.getDivertReportDataFromDivertTable().then(res => {
            if (res.status) {
                setItems(res.data);
            }
        })
    }

    const exportedData = [];
    const execlData = items
    let i = 1;
    const data = [
        { title: 'S No', dataIndex: 'sNo', render: (text, object, index) => { return index + 1 } },
        { title: 'Request Date', dataIndex: 'orequestDate', render: (text, record) => { return record.orequestDate ? moment(record.orequestDate) : '-'; } },
        { title: 'O.From Item', dataIndex: 'oItem', render: (text, record) => { return record.oItem ? record.oItem : '-'; } },
        { title: 'O.Unit', dataIndex: 'oFactory', render: (text, record) => { return record.oFactory ? record.oFactory : '-'; } },
        { title: 'O.Plant', dataIndex: 'oPlant', render: (text, record) => { return record.oPlant ? record.oPlant : '-'; } },
        { title: 'O.Product Code', dataIndex: 'oProductCode', render: (text, record) => { return record.oProductCode ? record.oProductCode : '-'; } },
        { title: 'O.Line Status', dataIndex: 'oLineItemStatus', render: (text, record) => { return record.oLineItemStatus ? record.oLineItemStatus : '-'; } },
        {
            title: 'O.Document Date',
            dataIndex: 'oDocumentDate',
            render: (text, record) => {
                return record.oDocumentDate ? moment(record.oDocumentDate).format('MM/DD/YYYY') : '-';
            }
        },
        { title: 'Old Po', dataIndex: 'oPurchaseOrderNumber' },
        {
            title: 'Old Po Line',
            dataIndex: 'oPoLineItemNumber',
        },
        {
            title: 'Old Qantity', dataIndex: 'oTotalItemQty', render: (text, record) => {
                const oldVal = Number(record.oTotalItemQty)
                return record.oTotalItemQty ? oldVal : '-'
            }
        },
        {
            title: 'Balance Qty', dataIndex: 'oldVal', render: (text, record) => {
                return record.oldVal ? record.oldVal : '-'
            }
        },
        { title: 'Destination', dataIndex: 'oDestination', render: (text, record) => { return record.oDestination ? record.oDestination : '-'; } },
        {
            title: 'Shipment Type', dataIndex: 'oShipmentType', render: (text, record) => {
                // Replace underscores (_) with spaces
                const transformedText = record.oShipmentType ? record.oShipmentType.replace(/_/g, ' ') : '-';
                return transformedText;
            },
        },
        {
            title: 'OLD OGAC', dataIndex: 'oOGAC', render: (text, record) => {
                return record.oOGAC ? moment(record.oOGAC).format('MM/DD/YYYY') : "-";
            }
        },
        {
            title: 'OLD GAC', dataIndex: 'oGAC', render: (text, record) => {
                return record.oGAC ? moment(record.oGAC).format('MM/DD/YYYY') : "-";
            }
        },
        { title: 'Inventory Segment Code', dataIndex: 'oInventorySegmentCode', render: (text, record) => { return record.oInventorySegmentCode ? record.oInventorySegmentCode : '-'; } },
        {
            title: 'GAC Difference', dataIndex: '', render: (text, record) => {
                if (record.oGAC && record.nGAC) {
                    const ogacDate = moment(record.oGAC, 'YYYY-MM-DD');
                    const nogacDate = moment(record.nGAC, 'YYYY-MM-DD');
                    const daysDifference = nogacDate.diff(ogacDate, 'days');
                    return daysDifference + ' days';
                } else {
                    return "-";
                }
            },
        },
        {
            title: 'Item Vas', width: 70,
            dataIndex: 'oItemVasText', render: (text, record) => { return record.oItemVasText ? record.oItemVasText : '-'; }
        },
        {
            title: 'N.OGAC Date', dataIndex: 'nOGAC', render: (text, record) => {
                return record.nOGAC ? moment(record.nOGAC).format('MM/DD/YYYY') : "-";
            }
        },
        {
            title: 'N.GAC Date', dataIndex: 'nGAC', render: (text, record) => {
                return record.nGAC ? moment(record.nGAC).format('MM/DD/YYYY') : "-";
            }
        },
        {
            title: 'No of Days to GAC', dataIndex: 'unit', render: (text, record) => {
                if (record.nOGAC) {
                    const dpomCreatedDate = moment();
                    const nogacDate = moment(record.nOGAC);
                    const daysDifference = nogacDate.diff(dpomCreatedDate, 'days');
                    return (daysDifference + 1) + ' days';
                } else {
                    return "-";
                }
            }

        },
        {
            title: "To item",
            dataIndex: 'nItem', render: (text, record) => { return record.nItem ? record.nItem : '-'; }
        },
        { title: 'N.Unit', dataIndex: 'nFactory', render: (text, record) => { return record.nFactory ? record.nFactory : '-'; } },
        { title: 'N.Plant', dataIndex: 'nPlant', render: (text, record) => { return record.nPlant ? record.nPlant : '-'; } },
        { title: 'N.Product Code', dataIndex: 'nProductCode', render: (text, record) => { return record.nProductCode ? record.nProductCode : '-'; } },
        { title: 'N.Line Status', dataIndex: 'nLineItemStatus', render: (text, record) => { return record.nLineItemStatus ? record.nLineItemStatus : '-'; } },
        {
            title: 'N.Document Date',
            dataIndex: 'nDocumentDate',
            render: (text, record) => {
                return record.nDocumentDate ? moment(record.nDocumentDate).utc().format('MM/DD/YYYY') : '-';
            }
        },
        { title: 'New Po', dataIndex: 'nPurchaseOrderNumber' },
        { title: 'New Po Line', dataIndex: 'nPoLineItemNumber' },
        { title: 'N.Quantity', dataIndex: 'nTotalItemQty', render: (text, record) => { return record.nTotalItemQty ? record.nTotalItemQty : '-'; } },
        { title: 'N.Destination', dataIndex: 'nDestination', render: (text, record) => { return record.nDestination ? record.nDestination : '-'; } },
        { title: 'N.Inventory Segment Code', dataIndex: 'nInventorySegmentCode', render: (text, record) => { return record.nInventorySegmentCode ? record.nInventorySegmentCode : '-'; } },
        { title: 'Item Vas', dataIndex: 'nItemVasText', render: (text, record) => { return record.nItemVasText ? record.nItemVasText : '-'; } },
        { title: 'Shipment Type', dataIndex: 'nShipmentType', render: (text, record) => { return record.nShipmentType ? record.nShipmentType : '-'; } },
        {
            title: 'Item Vas Diff Check', dataIndex: '',
            render: (text, record) => {
                const text1 = record.oItemVasText
                const text2 = record.nItemVasText
                if (text1 == null && text2 == null) {
                    return '-';
                } else if (text1 == null) {
                    return text2
                } else if (text2 == null) {
                    return text1
                } else {
                    const normalizeText = (text) => text.toLowerCase().replace(/\s/g, '');
                    const normalizedText1 = normalizeText(text1);
                    const normalizedText2 = normalizeText(text2);
                    const differences = diffChars(normalizedText1, normalizedText2);
                    // Map the differences to display added and removed parts
                    const result = differences
                        .filter((part) => part.added || part.removed)
                        .map((part, index) => {
                            const style = part.added ? { backgroundColor: 'lightgreen' } : { backgroundColor: 'lightcoral' };
                            return (
                                <span key={index} style={style}>
                                    {part.value}
                                </span>
                            );
                        });
                    return result ? result : '-'
                }
            },
        },
        {
            title: 'Qty Tally-Check',
            dataIndex: '',
            render: (text, record) => {
                if (record.oTotalItemQty !== null) {
                    const oldQuantity = Number(record.oTotalItemQty);
                    const newQuantity = Number(record.nTotalItemQty);
                    const QtyTally = oldQuantity - newQuantity;
                    if (QtyTally === 0) {
                        return <span style={{ color: 'green' }}>Matching</span>;
                    } else {
                        return <span style={{ color: 'red' }}>Deprecation</span>;
                    }
                } else {
                    return '-';
                }
            }
        },
        {
            title: 'Price-Fob Tally-Check',
            dataIndex: '',
            render: (text, record) => {
                const oldprice = Number(record.oFOBPrice);
                const newprice = Number(record.nFOBPrice);
                const priceTally = oldprice - newprice;
                if (priceTally === 0) {
                    return <span style={{ color: 'green' }}>Matching</span>;
                } else {
                    return <span style={{ color: 'red' }}>Deprecation</span>;
                }
            }
        }, { title: 'Price-Net Including Discount Tally-Check', dataIndex: '' },
        {
            title: 'Price-Trading Co Net Including Discount Tally-Check',
            dataIndex: '',
            render: (text, record) => {
                const oldTradingcO = Number(record.oTradingCoNetIncDis);
                const newTradingcO = Number(record.nTradingCoNetIncDis);
                const COTally = oldTradingcO - newTradingcO;
                if (COTally === 0) {
                    return <span style={{ color: 'green' }}>Matching</span>;
                } else {
                    return <span style={{ color: 'red' }}>Deprecation</span>;
                }
            }
        },
        {
            title: 'Trims Change',
            dataIndex: 'trimsChange'
        },
        {
            title: 'Surcharge',
            dataIndex: 'surcharge'
        }
    ];

    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet('Divert-report')
            .addColumns(data)
            .addDataSource(items, { str2num: true })
            .saveAs('Divert report.xlsx');
    }

    const columns: ColumnProps<any>[] = [
        {
            title: (
                <div style={{ background: '#CFCFF4 ', padding: '10px', borderRadius: '5px', display: 'flex', alignItems: 'center', height: 40, justifyContent: 'center' }}>
                    Old
                </div>

            ), width: 570,
            children: [
                {
                    title: 'S.No',
                    key: 'sno',
                    width: 40,
                    render: (text, object, index) => (page - 1) * pageSize + (index + 1),
                },
                {
                    title: "Request Date",
                    dataIndex: 'orequestDate',
                    width: 70,
                    render: (text, record) => {
                        return record.orequestDate ? moment(record.orequestDate).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: "From Item",
                    dataIndex: 'oItem',
                    align: 'center',
                    width: 70,
                },
                {
                    title: "Unit",
                    dataIndex: 'oFactory',
                    width: 70,
                },
                {
                    title: "Plant",
                    dataIndex: 'oPlant',
                    width: 70,
                },
                {
                    title: "Product Code",
                    dataIndex: 'oProductCode',
                    width: 70,
                },
                {
                    title: "Line Status",
                    dataIndex: 'oLineItemStatus',
                    width: 70,
                    // ...getColumnSearchProps("lineStatus"),
                },
                {
                    title: 'Document Date',
                    dataIndex: 'oDocumentDate',
                    width: 70,
                    render: (text, record) => {
                        return record.oDocumentDate ? moment(record.oDocumentDate).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: 'Old Po',
                    dataIndex: 'oPurchaseOrderNumber',
                    width: 70,
                },
                {
                    title: 'Old Po Line',
                    dataIndex: 'oPoLineItemNumber',
                    width: 70,
                },
                {
                    title: 'Old Qantity',
                    dataIndex: 'oTotalItemQty',
                    width: 70, align: 'right',
                    // render: (text, record) => {
                    //     const oldVal = Number(record.oTotalItemQty)
                    //     return record.oLineItemStatus == 'Cancelled' ? record.oTotalItemQty : oldVal
                    // }
                },
                {
                    title: 'Balance Qty',
                    dataIndex: 'oldVal',
                    width: 70, align: 'right',

                },
                {
                    title: 'Destination',
                    dataIndex: 'oDestination',
                    width: 75
                },
                {
                    title: 'Shipment Type',
                    dataIndex: 'oShipmentType',
                    width: 70,
                    render: (text) => {
                        // Replace underscores (_) with spaces
                        const transformedText = text ? text.replace(/_/g, ' ') : '-';
                        return transformedText;
                    },
                },
                {
                    title: 'OLD OGAC',
                    dataIndex: 'oOGAC',
                    width: 70,
                    render: (text, record) => {
                        return record.oOGAC ? moment(record.oOGAC).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: 'OLD GAC',
                    dataIndex: 'oGAC', width: 70,
                    render: (text, record) => {
                        return record.oGAC ? moment(record.oGAC).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: 'Inventory Segment Code',
                    dataIndex: 'oInventorySegmentCode',
                    width: 70
                },
                {
                    title: 'GAC Difference',
                    dataIndex: '', width: 70, align: 'right',
                    render: (text, record) => {
                        if (record.oGAC && record.nGAC) {
                            const ogacDate = moment(record.oGAC, 'YYYY-MM-DD');
                            const nogacDate = moment(record.nGAC, 'YYYY-MM-DD');
                            const daysDifference = nogacDate.diff(ogacDate, 'days');
                            return daysDifference + ' days';
                        } else {
                            return "-";
                        }
                    },
                },
                {
                    title: 'Item Vas', width: 80,
                    dataIndex: 'oItemVasText',
                    render: (_text, record) => {
                        return (
                            <>
                                {record.oItemVasText?.length > 30 ? (<><Tooltip title='Cilck to open full itemText'><p><span onClick={() => handleTextClick(record.oItemVasText)} style={{ cursor: 'pointer' }}>
                                    {record.oItemVasText.length > 30 ? `${record.oItemVasText?.substring(0, 30)}....` : record.oItemVasText}
                                </span></p></Tooltip></>) : (<>{record.oItemVasText}</>)}
                            </>
                        )
                    }
                },
            ] as unknown as null,
        },
        {
            title: (
                <div style={{ background: '#D1D1FF', borderRadius: '5px', display: 'flex', alignItems: 'center', height: 40, justifyContent: 'center', padding: '8px' }}>
                    New
                </div>
            ), width: 570,
            children: [
                {
                    title: 'OGAC Date',
                    dataIndex: 'nOGAC', width: 70,
                    render: (text, record) => {
                        return record.nOGAC ? moment(record.nOGAC).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: 'GAC Date',
                    dataIndex: 'nGAC', width: 70,
                    render: (text, record) => {
                        return record.nGAC ? moment(record.nGAC).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: "No of Days to GAC",
                    align: 'right', width: 70,
                    render: (text, record) => {
                        if (record.nOGAC) {
                            const dpomCreatedDate = moment();
                            const nogacDate = moment(record.nOGAC);
                            const daysDifference = nogacDate.diff(dpomCreatedDate, 'days');
                            return (daysDifference + 1) + ' days';
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    title: "To item",
                    dataIndex: 'nItem',
                    align: 'center', width: 70, render: (text, record) => (record.nItem ? record.nItem : record.oItem)
                },
                {
                    title: "Unit",
                    dataIndex: 'nFactory', width: 70, align: 'center',
                    render: (text, record) => (record.nFactory ? record.nFactory : record.oFactory)
                },
                {
                    title: "Plant",
                    dataIndex: 'nPlant', width: 70, align: 'center'
                },
                {
                    title: "Product Code",
                    dataIndex: 'nProductCode',
                    width: 70,
                },
                {
                    title: "Line Status",
                    dataIndex: 'nLineItemStatus', width: 70
                },
                {
                    title: 'Document Date',
                    dataIndex: 'nDocumentDate', width: 70,
                    render: (text, record) => {
                        return record.nDocumentDate ? moment(record.nDocumentDate).format("MM/DD/YYYY") : "-";
                    }
                },
                {
                    title: 'New Po', width: 70,
                    dataIndex: 'nPurchaseOrderNumber'
                },
                {
                    title: 'New Po Line', width: 70,
                    dataIndex: 'nPoLineItemNumber', align: 'center'
                },
                {
                    title: 'Quantity', width: 70,
                    dataIndex: 'nTotalItemQty', align: 'right'
                },
                {
                    title: 'Destination', width: 70,
                    dataIndex: 'nDestination'
                },
                {
                    title: 'Inventory Segment Code', width: 70,
                    dataIndex: 'nInventorySegmentCode'
                },
                {
                    title: 'Item Vas', width: 80,
                    dataIndex: 'nItemVasText',
                    render: (_text, record) => {
                        return (
                            <>
                                {record.nItemVasText?.length > 30 ? (<><Tooltip title='Cilck to open full itemText'><p><span onClick={() => handleTextClick(record.nItemVasText)} style={{ cursor: 'pointer' }}>
                                    {record.nItemVasText.length > 30 ? `${record.nItemVasText?.substring(0, 30)}....` : record.nItemVasText}
                                </span></p></Tooltip></>) : (<>{record.nItemVasText}</>)}
                            </>
                        )
                    }
                },
                {
                    title: 'Shipment Type', width: 70,
                    dataIndex: 'nShipmentType', render: (text) => {
                        const transformedText = text ? text.replace(/_/g, ' ') : '-';
                        return transformedText;
                    },
                },
                {
                    title: 'Item Vas Diff Check', width: 70,
                    dataIndex: '',
                    render: (text, record) => {
                        const text1 = record.oItemVasText
                        const text2 = record.nItemVasText
                        if (text1 == null && text2 == null) {
                            return '-';
                        } else if (text1 == null) {
                            return (
                                <>
                                    {text2?.length > 30 ? (<><Tooltip title='Cilck to open full Text'><p><span onClick={() => handleTextClick(text2)} style={{ cursor: 'pointer' }}>
                                        {text2.length > 30 ? `${text2?.substring(0, 30)}....` : text2}
                                    </span></p></Tooltip></>) : (<>{text2}</>)}
                                </>
                            )
                        } else if (text2 == null) {
                            return (
                                <>
                                    {text1?.length > 30 ? (<><Tooltip title='Cilck to open full Text'><p><span onClick={() => handleTextClick(text1)} style={{ cursor: 'pointer' }}>
                                        {text1.length > 30 ? `${text1?.substring(0, 30)}....` : text1}
                                    </span></p></Tooltip></>) : (<>{text1}</>)}
                                </>
                            )
                        } else {
                            const normalizeText = (text) => text.toLowerCase().replace(/\s/g, '');
                            const normalizedText1 = normalizeText(text1);
                            const normalizedText2 = normalizeText(text2);
                            const differences = diffChars(normalizedText1, normalizedText2);
                            // Map the differences to display added and removed parts
                            const result = differences
                                .filter((part) => part.added || part.removed)
                                .map((part, index) => {
                                    const style = part.added ? { backgroundColor: 'lightgreen' } : { backgroundColor: 'lightcoral' };
                                    return (
                                        <span key={index} style={style}>
                                            {part.value}
                                        </span>
                                    );
                                });
                            return (
                                <>
                                    {result?.length > 30 ? (<><Tooltip title='Cilck to open full Text'><p><span onClick={() => handleTextClick(result)} style={{ cursor: 'pointer' }}>
                                        {result.length > 30 ? `${result?.substring(0, 30)}....` : result}
                                    </span></p></Tooltip></>) : (<>{result}</>)}
                                </>
                            )
                        }
                    },
                },
                {
                    title: 'Qty Tally-Check',
                    width: 70,
                    dataIndex: '',
                    align: 'right',
                    render: (text, record) => {
                        if (record.oTotalItemQty !== null) {
                            const oldQuantity = Number(record.oTotalItemQty);
                            const newQuantity = Number(record.nTotalItemQty);
                            const QtyTally = oldQuantity - newQuantity;
                            if (QtyTally === 0) {
                                return <span style={{ color: 'green' }}>Matching</span>;
                            } else {
                                return <span style={{ color: 'red' }}>Deprecation</span>;
                            }
                        } else {
                            return '-';
                        }
                    }
                },
                {
                    title: 'Price-Fob Tally-Check',
                    dataIndex: '', width: 70,
                    render: (text, record) => {
                        const oldprice = Number(record.oFOBPrice);
                        const newprice = Number(record.nFOBPrice);
                        const priceTally = oldprice - newprice;
                        if (priceTally === 0) {
                            return <span style={{ color: 'green' }}>Matching</span>;
                        } else {
                            return <span style={{ color: 'red' }}>Deprecation</span>;
                        }
                    }
                },
                {
                    title: 'Price-Net Including Discount Tally-Check',
                    dataIndex: '', width: 100,
                },
                {
                    title: 'Price-Trading Co Net Including Discount Tally-Check',
                    dataIndex: '', width: 100,
                    render: (text, record) => {
                        const oldTradingcO = Number(record.oTradingCoNetIncDis);
                        const newTradingcO = Number(record.nTradingCoNetIncDis);
                        const COTally = oldTradingcO - newTradingcO;
                        if (COTally === 0) {
                            return <span style={{ color: 'green' }}>Matching</span>;
                        } else {
                            return <span style={{ color: 'red' }}>Deprecation</span>;
                        }
                    }
                },
                {
                    title: 'Trims Change',
                    dataIndex: 'trimsChange', width: 120,
                    render: (text, rowData) => (
                        rowData.trimsChange ? rowData.trimsChange :
                            <span>
                                <Form.Item>
                                    <Input
                                        allowClear
                                        style={{ marginRight: '10px' }}
                                        placeholder="Enter text"
                                        onChange={e =>
                                            handleTrimsChange(rowData.id, e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </span>
                    )
                },
                {
                    title: 'Surcharge',
                    dataIndex: 'surcharge', width: 80,
                    render: (text, rowData) => (
                        rowData.surcharge ? rowData.surcharge :
                            <span>
                                <Form.Item>
                                    <Input
                                        allowClear
                                        style={{ marginRight: '10px' }}
                                        placeholder="Enter text"
                                        onChange={e =>
                                            handleSurcharge(rowData.id, e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </span>
                    ),
                },
                {
                    title: 'Insert Row',
                    dataIndex: 'id', width: 70,
                    render: (text, rowData) => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                onClick={() => showModal1()}
                            >
                                Insert Row
                            </Button>
                        </div>
                    ),
                },
                {
                    title: 'Action',
                    dataIndex: 'id', width: 70,
                    render: (text, rowData) => (

                        <span>
                            <Form.Item>
                                <Button
                                    disabled={rowData.trimsChange && rowData.surcharge}
                                    type="primary"
                                    onClick={() => handleSubmit(rowData.id)}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </span>
                    ),
                },
            ] as unknown as null,
        }
    ]

    const showModal1 = () => {
        setIsModalOpen1(true);
    };

    const cancelHandle = () => {
        setIsModalOpen1(false);

    };

    return (
        <>
            <Card title="Divert Report" headStyle={{ fontWeight: 'bold' }}
                extra={<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={exportExcel}
                    icon={<FileExcelFilled />}>Download Excel</Button>}>
                <Row gutter={70}>
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
                        // pagination={false}
                        scroll={{ x: 'max-content', y: 500 }}
                        bordered
                        size='small'
                    // expandedRowRender={(record) => record.additionalData} 
                    />
                </Card>
            </Card>
            <Modal
                className='print-docket-modal'
                key={'modal1' + Date.now()}
                width={'1000px'}
                style={{ top: 30, alignContent: 'center' }}
                open={isModalOpen1}
                title={<React.Fragment>
                </React.Fragment>}
                onCancel={cancelHandle}
                footer={[]}
            >
                {isModalOpen1 ? <DivertDataEntry /> : <></>}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={cancelHandle} style={{ color: 'white', backgroundColor: 'red', flexDirection: 'column-reverse' }}>Close</Button></div>
            </Modal>
            <Modal open={remarkModal} onOk={onRemarksModalOk} onCancel={onRemarksModalOk} footer={[<Button onClick={onRemarksModalOk} type='primary'>Ok</Button>]}>
                <Card>
                    <p>{itemText}</p>
                </Card>
            </Modal>
        </>
    )
}

export default DivertReport





