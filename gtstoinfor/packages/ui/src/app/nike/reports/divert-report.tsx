import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Row, Input, Col, Form, Button, Checkbox } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { FileExcelFilled, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { Excel } from 'antd-table-saveas-excel';
import { NikeService } from '@project-management-system/shared-services';
import { diffChars } from 'diff';



interface IExcelColumn {
    title: string;
    dataIndex: string;
    //    children?: CustomExcelColumn[];
}

interface ExpandedRows {
    [key: string]: boolean;
}

const DivertReport = () => {

    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<any>(null);
    const [dataLength, setDataLength] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const service = new NikeService();
    const [expandedRows, setExpandedRows] = useState<ExpandedRows>({});
    const [textareaValues, setTextareaValues] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        getData();
        // getCount();
    }, [])

    const handleCheckboxChange = (id: string) => {
        if (expandedRows[id]) {
            setExpandedRows(prevExpandedRows => ({ ...prevExpandedRows, [id]: false }));
        } else {
            setExpandedRows(prevExpandedRows => ({ ...prevExpandedRows, [id]: true }));
        }
    };

    const handleTextareaChange = (id: string, value: string) => {
        setTextareaValues(prevTextareaValues => ({ ...prevTextareaValues, [id]: value }));
    };

    const handleSubmit = (id: string) => {
        console.log(`Textarea value for ID ${id}:`, textareaValues[id]);
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

    const getCount = () => {
        service.getCountForDivertReport().then(res => {

            if (res.status) {
                setDataLength(res.data)
            }
        })
    }

    const getData = () => {
        service.getDivertReportData().then(res => {
            if (res.status) {
                const sortedData = res.data.sort((a, b) => {
                    const dateA = new Date(a.newpo[0].orequestDate);
                    const dateB = new Date(b.newpo[0].orequestDate);
                    return dateA.getTime() - dateB.getTime();
                })
                setItems(sortedData);
            }
        })
    }

    const exportedData = [];
    const execlData = items
    let i = 1;
    const data = [
        { title: 'S No', dataIndex: 'sNo', render: (text, object, index) => { return index + 1 } },
        { title: 'Request Date', dataIndex: ['newpo', 'orequestDate'], render: (text, record) => { return record.newpo[0].orequestDate; } },
        { title: 'O.From Item', dataIndex: ['oldPo', 'item'], render: (text, record) => { return record.oldPo[0].item ? record.oldPo[0].item : '-'; } },
        { title: 'O.Unit', dataIndex: ['oldPo', 'factory'], render: (text, record) => { return record.oldPo[0].factory ? record.oldPo[0].factory : '-'; } },
        { title: 'O.Plant', dataIndex: ['oldPo', 'Plant'], render: (text, record) => { return record.oldPo[0].Plant ? record.oldPo[0].Plant : '-'; } },
        { title: 'O.Product Code', dataIndex: ['oldPo', 'productCode'], render: (text, record) => { return record.oldPo[0].productCode ? record.oldPo[0].productCode : '-'; } },
        { title: 'O.Line Status', dataIndex: ['oldPo', 'LineStatus'], render: (text, record) => { return record.oldPo[0].LineStatus ? record.oldPo[0].LineStatus : '-'; } },
        {
            title: 'O.Document Date',
            dataIndex: ['oldPo', 'DocumentDate'],
            render: (text, record) => {
                return record.oldPo[0].DocumentDate ? moment(record.oldPo[0].DocumentDate).utc().format('MM/DD/YYYY') : '-';
            }
        },
        { title: 'Old Po', dataIndex: ['oldPo', 'poNumber'], render: (text, record) => { return record.oldPo[0].poNumber ? record.oldPo[0].poNumber : '-'; } },
        {
            title: 'Old Po Line',
            dataIndex: ['oldPo', 'poLine'],
            render: (text, record) => { return record.oldPo[0].poLine ? record.oldPo[0].poLine : '-'; }
        },
        {
            title: 'Old Qantity', dataIndex: ['oldPo', 'oldVal'], render: (text, record) => {
                const oldVal = Number(record.oldPo[0].oldVal)
                return record.oldPo[0].LineStatus == 'Cancelled' ? record.oldPo[0].Quantity : oldVal
            }
        },
        {
            title: 'Balance Qty', dataIndex: ['oldPo', 'Quantity'], render: (text, record) => {
                return record.oldPo[0].LineStatus == 'Cancelled' ? 0 : record.oldPo[0].Quantity ? record.oldPo[0].Quantity : '-'
            }
        },
        { title: 'Destination', dataIndex: ['oldPo', 'destination'], render: (text, record) => { return record.oldPo[0].destination ? record.oldPo[0].destination : '-'; } },
        {
            title: 'Shipment Type', dataIndex: ['oldPo', 'shipmentType'], render: (text, record) => {
                // Replace underscores (_) with spaces
                const transformedText = record.oldPo[0].shipmentType ? record.oldPo[0].shipmentType.replace(/_/g, ' ') : '-';
                return transformedText;
            },
        },
        {
            title: 'OLD OGAC', dataIndex: ['oldPo', 'ogac'], render: (text, record) => {
                return record.oldPo[0].ogac ? moment(record.oldPo[0].ogac).format('MM/DD/YYYY') : "-";
            }
        },
        {
            title: 'OLD GAC', dataIndex: ['oldPo', 'gac'], render: (text, record) => {
                return record.oldPo[0].gac ? moment(record.oldPo[0].gac).format('MM/DD/YYYY') : "-";
            }
        },
        { title: 'Inventory Segment Code', dataIndex: ['oldPo', 'inventorySegmentCode'], render: (text, record) => { return record.oldPo[0].inventorySegmentCode ? record.oldPo[0].inventorySegmentCode : '-'; } },
        {
            title: 'GAC Difference', dataIndex: '', render: (text, record) => {
                if (record.oldPo[0].ogac && record.newpo[0].nogac) {
                    const ogacDate = moment(record.oldPo[0].ogac, 'YYYY-MM-DD');
                    const nogacDate = moment(record.newpo[0].nogac, 'YYYY-MM-DD');
                    const daysDifference = nogacDate.diff(ogacDate, 'days');
                    return daysDifference + ' days';
                } else {
                    return "-";
                }
            },
        },
        {
            title: 'Item Vas', width: 70,
            dataIndex: ['oldPo', 'itemVasText'], render: (text, record) => { return record.oldPo[0].itemVasText ? record.oldPo[0].itemVasText : '-'; }
        },
        {
            title: 'N.OGAC Date', dataIndex: ['newpo', 'nogac'], render: (text, record) => {
                return record.newpo[0].nogac ? moment(record.newpo[0].nogac).format('MM/DD/YYYY') : "-";
            }
        },
        {
            title: 'N.GAC Date', dataIndex: ['newpo', 'ngac'], render: (text, record) => {
                return record.newpo[0].ngac ? moment(record.newpo[0].ngac).format('MM/DD/YYYY') : "-";
            }
        },
        {
            title: 'No of Days to GAC', dataIndex: 'unit', render: (text, record) => {
                if (record.oldPo[0].dpomCreatedDates && record.newpo[0].nogac) {
                    const dpomCreatedDate = moment(record.oldPo[0].dpomCreatedDates);
                    const nogacDate = moment(record.newpo[0].nogac);
                    const daysDifference = nogacDate.diff(dpomCreatedDate, 'days');
                    return daysDifference + ' days';
                } else {
                    return "-";
                }
            }
        },
        {
            title: "To item",
            dataIndex: ['newpo', 'item'], render: (text, record) => { return record.newpo[0].item ? record.newpo[0].item : '-'; }
        },

        { title: 'N.Unit', dataIndex: 'unit', render: (text, record) => { return record.newpo[0].factory ? record.newpo[0].factory : '-'; } },
        { title: 'N.Plant', dataIndex: ['newpo', 'nPlant'], render: (text, record) => { return record.newpo[0].nPlant ? record.newpo[0].nPlant : '-'; } },
        { title: 'N.Product Code', dataIndex: ['newpo', 'nproductCode'], render: (text, record) => { return record.newpo[0].nproductCode ? record.newpo[0].nproductCode : '-'; } },
        { title: 'N.Line Status', dataIndex: ['newpo', 'nLineStatus'], render: (text, record) => { return record.newpo[0].nLineStatus ? record.newpo[0].nLineStatus : '-'; } },
        {
            title: 'N.Document Date',
            dataIndex: ['newpo', 'nDocumentDate'],
            render: (text, record) => {
                return record.newpo[0].nDocumentDate ? moment(record.newpo[0].nDocumentDate).utc().format('MM/DD/YYYY') : '-';
            }
        }, { title: 'New Po', dataIndex: ['newpo', 'npoNumber'], render: (text, record) => { return record.newpo[0].npoNumber ? record.newpo[0].npoNumber : '-'; } },
        { title: 'New Po Line', dataIndex: ['newpo', 'npoLine'], render: (text, record) => { return record.newpo[0].npoLine ? record.newpo[0].npoLine : '-'; } },
        { title: 'N.Quantity', dataIndex: ['newpo', 'nQuantity'], render: (text, record) => { return record.newpo[0].nQuantity ? record.newpo[0].nQuantity : '-'; } },
        { title: 'N.Destination', dataIndex: ['newpo', 'ndestination'], render: (text, record) => { return record.newpo[0].ndestination ? record.newpo[0].ndestination : '-'; } },
        { title: 'N.Inventory Segment Code', dataIndex: ['newpo', 'ninventorySegmentCode'], render: (text, record) => { return record.newpo[0].ninventorySegmentCode ? record.newpo[0].ninventorySegmentCode : '-'; } },
        { title: 'Item Vas', dataIndex: ['newpo', 'nitemVasText'], render: (text, record) => { return record.newpo[0].nitemVasText ? record.nitemVasText : '-'; } },
        { title: 'Shipment Type', dataIndex: 'nshipmentType', render: (text, record) => { return record.nshipmentType ? record.newpo[0].nshipmentType : '-'; } },
        {
            title: 'Item Vas Diff Check', dataIndex: '',
            render: (text, record) => {
                const text1 = record.oldPo[0].itemVasText
                const text2 = record.newpo[0].nitemVasText
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
                if (record.oldPo[0].Quantity !== null) {
                    const oldQuantity = Number(record.oldPo[0].Quantity);
                    const newQuantity = Number(record.newpo[0].nQuantity);
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
                const oldprice = Number(record.oldPo[0].gross_price_fob);
                const newprice = Number(record.newpo[0].gross_price_fob);
                const priceTally = oldprice - newprice;
                if (priceTally === 0) {
                    return <span style={{ color: 'green' }}>Matching</span>;
                } else {
                    return <span style={{ color: 'red' }}>Deprecation</span>;
                }
            }
        }, { title: 'Price-Net Including Discount Tally-Check', dataIndex: ['oldPo', 'DocumentDate'], render: (text, record) => { return record.oldPo[0].Plant ? record.oldPo[0].Pant : '-'; } },
        {
            title: 'Price-Trading Co Net Including Discount Tally-Check',
            dataIndex: '',
            render: (text, record) => {
                const oldTradingcO = Number(record.oldPo[0].trading_net_inc_disc);
                const newTradingcO = Number(record.newpo[0].trading_net_inc_disc);
                const COTally = oldTradingcO - newTradingcO;
                if (COTally === 0) {
                    return <span style={{ color: 'green' }}>Matching</span>;
                } else {
                    return <span style={{ color: 'red' }}>Deprecation</span>;
                }
            }
        },];

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
                    dataIndex: ['newpo', 0, 'orequestDate'],
                    width: 70
                },
                {
                    title: "From Item",
                    dataIndex: ['oldPo', 0, 'item'], align: 'center',
                    width: 70, render: (text) => (text !== null ? text : '-')
                },
                {
                    title: "Unit",
                    dataIndex: ['oldPo', 0, 'factory'], width: 70, render: (text) => (text !== null ? text : '-')
                },
                {
                    title: "Plant",
                    dataIndex: ['oldPo', 0, 'Plant'], width: 70, render: (text) => (text !== null ? text : '-')
                },
                {
                    title: "Product Code",
                    dataIndex: ['oldPo', 0, 'productCode'],
                    // sorter: (a, b) => a.oldPo.productCode?.localeCompare(b.oldPo.productCode),
                    // sortDirections: ["descend", "ascend"],
                    width: 70, render: (text) => (text !== null ? text : '-')
                    //  fixed:'left'
                },
                {
                    title: "Line Status",
                    dataIndex: ['oldPo', 0, 'LineStatus'], width: 70, render: (text) => (text !== null ? text : '-')
                    // ...getColumnSearchProps("lineStatus"),
                },
                {
                    title: 'Document Date',
                    dataIndex: ['oldPo', 0, 'DocumentDate'], width: 70,
                    render: (text, record) => {
                        return record.oldPo[0].DocumentDate ? moment(record.oldPo[0].DocumentDate).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: 'Old Po',
                    dataIndex: ['oldPo', 0, 'poNumber'], render: (text) => (text !== null ? text : '-')
                    // sorter: (a, b) => a.oldPo.poNumber?.localeCompare(b.oldPo.poNumber),
                    // sortDirections: ["descend", "ascend"]
                    , width: 70,
                },
                {
                    title: 'Old Po Line',
                    dataIndex: ['oldPo', 0, 'poLine'], render: (text) => (text !== null ? text : '-')
                    // sorter: (a, b) => a.oldPo.poLine - b.oldPo.poLine,
                    // sortDirections: ["descend", "ascend"],
                    , width: 70,
                },
                {
                    title: 'Old Qantity',
                    dataIndex: ['oldPo', 0, 'oldVal'],
                    width: 70, align: 'right', render: (text, record) => {
                        const oldVal = Number(record.oldPo[0].oldVal)
                        return record.oldPo[0].LineStatus == 'Cancelled' ? record.oldPo[0].Quantity : oldVal
                    }
                },
                {
                    title: 'Balance Qty',
                    // from dpom
                    dataIndex: ['oldPo', 0, 'Quantity'],
                    // sorter: (a, b) => a.oquantity.localeCompare(b.oquantity),
                    // sortDirections: ["descend", "ascend"],
                    width: 70, align: 'right',
                    render: (text, record) => {
                        return record.oldPo[0].LineStatus == 'Cancelled' ? 0 : text ? text : '-'
                    }
                },
                {
                    title: 'Destination',
                    dataIndex: ['oldPo', 0, 'destination'],
                    // sorter: (a, b) => a.oldPo.destination.localeCompare(b.oldPo.destination),
                    // sortDirections: ["descend", "ascend"],
                    width: 75, render: (text) => (text !== null ? text : '-')
                },
                {
                    title: 'Shipment Type',
                    dataIndex: ['oldPo', 0, 'shipmentType'],
                    // sorter: (a, b) => a.oldPo.shipmentType.localeCompare(b.oldPo.shipmentType),
                    // sortDirections: ["descend", "ascend"],
                    width: 70, render: (text) => {
                        // Replace underscores (_) with spaces
                        const transformedText = text ? text.replace(/_/g, ' ') : '-';
                        return transformedText;
                    },
                },
                {
                    title: 'OLD OGAC',
                    dataIndex: ['oldPo', 0, 'ogac'], width: 70,
                    render: (text, record) => {
                        return record.oldPo[0].ogac ? moment(record.oldPo[0].ogac).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: 'OLD GAC',
                    dataIndex: ['oldPo', 0, 'gac'], width: 70,
                    render: (text, record) => {
                        return record.oldPo[0].gac ? moment(record.oldPo[0].gac).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: 'Inventory Segment Code',
                    dataIndex: ['oldPo', 0, 'inventorySegmentCode'], width: 70, render: (text) => (text !== null ? text : '-')
                    // sorter: (a, b) => a.oldPo.inventorySegmentCode.localeCompare(b.oldPo.inventorySegmentCode),
                    // sortDirections: ["descend", "ascend"],

                },
                {
                    title: 'GAC Difference',
                    dataIndex: '', width: 70, align: 'right',
                    render: (text, record) => {
                        if (record.oldPo[0].ogac && record.newpo[0].nogac) {
                            const ogacDate = moment(record.oldPo[0].ogac, 'YYYY-MM-DD');
                            const nogacDate = moment(record.newpo[0].nogac, 'YYYY-MM-DD');
                            const daysDifference = nogacDate.diff(ogacDate, 'days');
                            return daysDifference + ' days';
                        } else {
                            return "-";
                        }
                    },
                    // sorter: (a, b) => a.daysDifference.localeCompare(b.daysDifference),
                    // sortDirections: ["descend", "ascend"],
                },
                {
                    title: 'Item Vas', width: 70,
                    dataIndex: ['oldPo', 0, 'itemVasText'], render: (text) => (text !== null ? text : '-')

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
                    dataIndex: ['newpo', 0, 'nogac'], width: 70,
                    render: (text, record) => {
                        return record.newpo[0].nogac ? moment(record.newpo[0].nogac).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: 'GAC Date',
                    dataIndex: ['newpo', 0, 'ngac'], width: 70,
                    render: (text, record) => {
                        return record.newpo[0].ngac ? moment(record.newpo[0].ngac).format('MM/DD/YYYY') : "-";
                    }
                },
                {
                    title: "No of Days to GAC",
                    align: 'right', width: 70,
                    render: (text, record) => {
                        if (record.newpo[0].nogac) {
                            const dpomCreatedDate = moment();
                            const nogacDate = moment(record.newpo[0].nogac);
                            const daysDifference = nogacDate.diff(dpomCreatedDate, 'days');
                            return (daysDifference + 1) + ' days';
                        } else {
                            return "-";
                        }
                    }
                },
                {
                    title: "To item",
                    dataIndex: ['newpo', 0, 'item'], align: 'center', width: 70, render: (text, record) => (record.newpo[0].item ? record.newpo[0].item : record.oldPo[0].item)

                },
                {
                    title: "Unit",
                    dataIndex: ['newpo', 'factory'], width: 70, align: 'center', render: (text, record) => (record.newpo[0].factory ? record.newpo[0].factory : record.oldPo[0].factory)

                },

                {
                    title: "Plant",
                    dataIndex: ['newpo', 0, 'nPlant'], width: 70, align: 'center', render: (text) => (text !== null ? text : '-')
                },
                {
                    title: "Product Code",
                    dataIndex: ['newpo', 0, 'nproductCode'], render: (text) => (text !== null ? text : '-'),
                    // sorter: (a, b) => a.newpo.nproductCode.localeCompare(b.newpo.nproductCode),
                    // sortDirections: ["descend", "ascend"],
                    width: 70,

                },
                {
                    title: "Line Status",
                    dataIndex: ['newpo', 0, 'nLineStatus'], width: 70, render: (text) => (text !== null ? text : '-')

                },
                {
                    title: 'Document Date',
                    dataIndex: ['newpo', 0, 'nDocumentDate'], width: 70,
                    render: (text, record) => {
                        return record.newpo[0].nDocumentDate ? moment(record.newpo[0].nDocumentDate).format("MM/DD/YYYY") : "-";
                    }
                },
                {
                    title: 'New Po', width: 70,
                    dataIndex: ['newpo', 0, 'npoNumber'], render: (text) => (text !== null ? text : '-')
                },
                {
                    title: 'New Po Line', width: 70,
                    dataIndex: ['newpo', 0, 'npoLine'], align: 'center', render: (text) => (text !== null ? text : '-')
                },
                {
                    title: 'Quantity', width: 70,
                    dataIndex: ['newpo', 0, 'nQuantity'], align: 'right', render: (text) => (text !== null ? text : '-')
                },
                {
                    title: 'Destination', width: 70,
                    dataIndex: ['newpo', 0, 'ndestination'], render: (text) => (text !== null ? text : '-')
                },
                {
                    title: 'Inventory Segment Code', width: 70,
                    dataIndex: ['newpo', 0, 'ninventorySegmentCode'], render: (text) => (text !== null ? text : '-')
                },
                {
                    title: 'Item Vas', width: 70,
                    dataIndex: ['newpo', 0, 'nitemVasText'], render: (text) => (text !== null ? text : '-')
                },

                {
                    title: 'Shipment Type', width: 70,
                    dataIndex: ['newpo', 0, 'nshipmentType'], render: (text) => {
                        const transformedText = text ? text.replace(/_/g, ' ') : '-';
                        return transformedText;
                    },
                },
                {
                    title: 'Item Vas Diff Check', width: 70,
                    dataIndex: '',
                    render: (text, record) => {
                        const text1 = record.oldPo[0].itemVasText
                        const text2 = record.newpo[0].nitemVasText
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
                    width: 70,
                    dataIndex: '',
                    align: 'right',
                    render: (text, record) => {
                        if (record.oldPo[0].Quantity !== null) {
                            const oldQuantity = Number(record.oldPo[0].Quantity);
                            const newQuantity = Number(record.newpo[0].nQuantity);
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
                        const oldprice = Number(record.oldPo[0].gross_price_fob);
                        const newprice = Number(record.newpo[0].gross_price_fob);
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
                        const oldTradingcO = Number(record.oldPo[0].trading_net_inc_disc);
                        const newTradingcO = Number(record.newpo[0].trading_net_inc_disc);
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
                    dataIndex: '', width: 70,
                    render: (text, rowData) => (
                        <span>
                            <Form.Item>
                                <Input
                                    allowClear
                                    style={{ marginRight: '10px' }}
                                    placeholder="Enter text"
                                    value={textareaValues[rowData.id] || ''}
                                    onChange={e =>
                                        handleTextareaChange(rowData.id, e.target.value)
                                    }
                                />
                            </Form.Item>
                        </span>
                    )
                },
                {
                    title: 'Surcharge',
                    dataIndex: 'id', width: 70,
                    render: (text, rowData) => (
                        <span>
                            <Form.Item>
                                <Input
                                    allowClear
                                    style={{ marginRight: '10px' }}
                                    placeholder="Enter text"
                                    value={textareaValues[rowData.id] || ''}
                                    onChange={e =>
                                        handleTextareaChange(rowData.id, e.target.value)
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
                                type="link"
                                onClick={() =>
                                    setExpandedRows(prevExpandedRows => ({
                                        ...prevExpandedRows,
                                        [rowData.id]: true,
                                    }))
                                }
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

    return (
        <>
            <Card title="Divert Report" headStyle={{ fontWeight: 'bold' }}
                extra={<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={exportExcel}
                    icon={<FileExcelFilled />}>Download Excel</Button>}>
                <Row gutter={70}>
                    {/* <Col >
                    <Card title={'Total Line Status Count  : ' + Number(dataLength[0]?.totalCount)} style={{ textAlign: 'left', width: 280, height: 38, backgroundColor: ' lightblue' }}></Card>
                </Col>
                <Col>
                    <Card title={'Accepted  : ' + Number(dataLength[0]?.acceptedCount)} style={{ textAlign: 'left', width: 200, height: 38, backgroundColor: 'lightblue' }}></Card>
                </Col>
                <Col>
                    <Card title={'Unaccepted : ' +Number(dataLength[0]?.unacceptedCount)} style={{ textAlign: 'left', width: 180, height: 38, backgroundColor: 'lightblue' }}></Card>
                </Col>  */}

                </Row><br></br>
                <Card >
                    <Table
                        columns={columns}
                        className="custom-table-wrapper"
                        dataSource={items}
                        // pagination={{
                        //     onChange(current, pageSize) {
                        //         setPage(current);
                        //         setPageSize(pageSize)
                        //     },
                        // }}
                        pagination={false}
                        scroll={{ x: 'max-content', y: 500 }}
                        bordered
                        size='small'
                    // expandedRowRender={(record) => record.additionalData} 
                    />
                </Card>
            </Card>
        </>
    )
}

export default DivertReport





