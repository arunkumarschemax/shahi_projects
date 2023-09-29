import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Row, Input, Col, Form, DatePicker, Select, Button, Checkbox, message, Statistic } from 'antd';
import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
import { NikeService } from '@project-management-system/shared-services';
import Highlighter from 'react-highlight-words';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { ColumnsType } from 'antd/es/table';
import { FactoryReportModel, PpmDateFilterRequest } from '@project-management-system/shared-models';
const { diff_match_patch: DiffMatchPatch } = require('diff-match-patch');
import CountUp from 'react-countup';

interface ExpandedRows {
    [key: string]: boolean;
}
interface FactoryUpdateRequest {
    poAndLine: string;
    actualUnit?: string;
    allocatedQuantity?: string;
}

const FactoryPPMReport = () => {

    const { RangePicker } = DatePicker;
    const [gridData, setGridData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([])
    const { Option } = Select;
    const service = new NikeService();
    const [form] = Form.useForm();
    const searchInput = useRef<any>(null);
    const [searchText, setSearchText] = useState<any>([]);
    const [searchedColumn, setSearchedColumn] = useState<any>([]);
    const [filterData, setFilterData] = useState([]);
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);
    const [expandedActualUnit, setExpandedActualUnit] = useState({});
    const [expandedQuantityAllocation, setExpandedQuantityAllocation] = useState({});
    const [textareaValuesActualUnit, setTextareaValuesActualUnit] = useState({});
    const [textareaValuesQuantityAllocation, setTextareaValuesQuantityAllocation] = useState({});
    const [factory, setFactory] = useState<any>([]);
    const [poLine, setPoLine] = useState<any>([]);
    const [colorDesc, setColorDesc] = useState<any>([]);
    const [categoryDesc, setCategoryDesc] = useState<any>([]);
    const [countryDestination, setCountryDestination] = useState<any>([]);
    const [plantCode, setPlantCode] = useState<any>([]);
    const [item, setItem] = useState<any>([]);
    const [productCode, setProductCode] = useState<any>([]);
    const [poNumber, setPoNumber] = useState<any>([]);
    const formatter = (value: number) => <CountUp end={value} separator="," />;
    const [tableLoading,setTableLoading] = useState<boolean>(false)


    useEffect(() => {
        getData();
        getProductCode();
        getPoLine();
        getColorDesc();
        getcategoryDesc();
        getcountrydestination();
        getplantCode();
        getItem();
        getFactory();
        getPonumber();
    }, [])



    const updateColumns = (poAndLine, actualUnit, allocatedQuantity) => {
        const req: FactoryUpdateRequest = {
            poAndLine: poAndLine,
        };

        if (actualUnit !== null && actualUnit !== undefined && actualUnit !== '') {
            req.actualUnit = actualUnit;
        }

        if (
            allocatedQuantity !== null &&
            allocatedQuantity !== undefined &&
            allocatedQuantity !== ''
        ) {
            req.allocatedQuantity = allocatedQuantity;
        }

        service.updateFactoryStatusColumns(req).then((res) => {
            if (res.status) {
                getData();
                message.success(res.internalMessage);

                // window.location.reload();

            } else {
                message.error(res.internalMessage);
            }
        });
    };


    const handleCheckboxChange = (column, poAndLine) => {
        if (column === 'ActualUnit') {
            setExpandedActualUnit((prevRows) => ({
                ...prevRows,
                [poAndLine]: !prevRows[poAndLine],
            }));
        } else if (column === 'QuantityAllocation') {
            setExpandedQuantityAllocation((prevRows) => ({
                ...prevRows,
                [poAndLine]: !prevRows[poAndLine],
            }));
        }
    };

    const handleTextareaChange = (column, poAndLine, value) => {
        if (column === 'ActualUnit') {
            setTextareaValuesActualUnit((prevValues) => ({
                ...prevValues,
                [poAndLine]: value,
            }));
        } else if (column === 'QuantityAllocation') {
            setTextareaValuesQuantityAllocation((prevValues) => ({
                ...prevValues,
                [poAndLine]: value,
            }));
        }
    };


    // const getFactoryStatus = (values: any) => {
    //     service.getByFactoryStatus().then(res => {
    //         if (res.status) {
    //             setGridData(res.data)
    //         } else {
    //             setGridData([])
    //         }
    //     })
    // }

    const resetHandler = () => {
        form.resetFields();
        getData();

    }
    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: string) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        window.location.reload();
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

    const ClearData = () => {
        form.resetFields();
    }


    const getProductCode = () => {
        service.getPpmProductCodeForFactory().then(res => {
            setProductCode(res.data)
        })

    }
    const getPoLine = () => {
        service.getPpmPoLineForFactory().then(res => {
            setPoLine(res.data)
        })
    }
    const getColorDesc = () => {
        service.getPpmColorDescForFactory().then(res => {
            setColorDesc(res.data)
        })
    }
    const getcategoryDesc = () => {
        service.getPpmCategoryDescForFactory().then(res => {
            setCategoryDesc(res.data)

        })
    }
    const getcountrydestination = () => {
        service.getPpmDestinationCountryForFactory().then(res => {
            setCountryDestination(res.data)
        })
    }
    const getplantCode = () => {
        service.getPpmPlantForFactory().then(res => {
            setPlantCode(res.data)
        })

    }
    const getItem = () => {
        service.getPpmItemForFactory().then(res => {
            setItem(res.data)
        })
    }
    const getFactory = () => {
        service.getPpmFactoryForFactory().then(res => {
            setFactory(res.data)
        })
    }
    const getPonumber = () => {
        service.getPpmPoNumberForFactory().then(res => {
            setPoNumber(res.data)
        })
    }

    const getData = () => {
        const req = new PpmDateFilterRequest();
        const selectedLineItemStatus = form.getFieldValue('DPOMLineItemStatus');

        if (form.getFieldValue('lastModifiedDate') !== undefined) {
            req.lastModifedStartDate = (form.getFieldValue('lastModifiedDate')[0]).format('YYYY-MM-DD');
        }
        if (form.getFieldValue('lastModifiedDate') !== undefined) {
            req.lastModifedEndtDate = (form.getFieldValue('lastModifiedDate')[1]).format('YYYY-MM-DD');
        }
        if (form.getFieldValue('documentDate') !== undefined) {
            req.documentStartDate = (form.getFieldValue('documentDate')[0]).format('YYYY-MM-DD');
        }
        if (form.getFieldValue('documentDate') !== undefined) {
            req.documentEndtDate = (form.getFieldValue('documentDate')[1]).format('YYYY-MM-DD');
        }
        if (form.getFieldValue('productCode') !== undefined) {
            req.productCode = form.getFieldValue('productCode');
        }
        if (form.getFieldValue('poNumber') !== undefined) {
            req.poNumber = form.getFieldValue('poNumber');
        }
        if (form.getFieldValue('colorDesc') !== undefined) {
            req.colorDesc = form.getFieldValue('colorDesc');
        }
        if (form.getFieldValue('categoryDesc') !== undefined) {
            req.categoryDesc = form.getFieldValue('categoryDesc');
        }
        if (form.getFieldValue('destinationCountry') !== undefined) {
            req.destinationCountry = form.getFieldValue('destinationCountry');
        }
        if (form.getFieldValue('plant') !== undefined) {
            req.plant = form.getFieldValue('plant');
        }
        if (form.getFieldValue('item') !== undefined) {
            req.item = form.getFieldValue('item');
        }
        if (form.getFieldValue('factory') !== undefined) {
            req.factory = form.getFieldValue('factory');
        }
        if (form.getFieldValue('DPOMLineItemStatus') !== undefined) {
            req.DPOMLineItemStatus = form.getFieldValue('DPOMLineItemStatus');
        }
        if (selectedLineItemStatus && selectedLineItemStatus.length > 0) {
            req.DPOMLineItemStatus = selectedLineItemStatus;
        }
        setTableLoading(true)
        service.getFactoryReportData(req)
           
            .then(res => {
                if (res.status) {
                    setGridData(res.data);
                    setFilterData(res.data);
                    setFilteredData(res.data);
                    Finish(res.data);
                } else {
                    setGridData([]);
                    setFilterData([]);
                    setFilteredData([]);
                }
            })
            .catch(err => {
            }).finally(() => {
                setTableLoading(false)
            });
    };

    const Finish = (data: any) => {

    }

    let exportingColumns: IExcelColumn[] = []


    const handleExport = (e: any) => {
        e.preventDefault();
        const currentDate = new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .join("/");

        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`factory-report-${currentDate}.xlsx`);
    }

    const getSizeWiseHeaders = (data: FactoryReportModel[]) => {
        const sizeHeaders = new Set<string>();
        data?.forEach(rec => rec.sizeWiseData?.forEach(version => {
            sizeHeaders.add('' + version.sizeDescription);
        }))
        return Array.from(sizeHeaders);
    };

    const getMap = (data: FactoryReportModel[]) => {
        const sizeWiseMap = new Map<string, Map<string, number>>();
        data?.forEach(rec => {
            if (!sizeWiseMap.has(rec.purchaseOrderNumber)) {
                sizeWiseMap.set(rec.purchaseOrderNumber, new Map<string, number>());
            }
            rec.sizeWiseData?.forEach(version => {
                sizeWiseMap.get(rec.purchaseOrderNumber).set(' ' + version.sizeDescription, version.sizeQty);
            })
        });
        return sizeWiseMap;
    }

    const totalItemQty = gridData?.map(i => i.totalItemQty)
    const count = totalItemQty.reduce((acc, val) => acc + Number(val), 0);

    const renderReport = (data: FactoryReportModel[]) => {
        const sizeHeaders = getSizeWiseHeaders(data);
        const sizeWiseMap = getMap(data);

        exportingColumns = [
            { title: 'Po+Line ', dataIndex: 'purchaseOrderNumber-poLineItemNumber', render: (text, record) => `${record.purchaseOrderNumber}-${record.poLineItemNumber}` },
            {
                title: 'Last Modified Date', dataIndex: 'lastModifiedDate', render: (text, record) => {
                    return record.lastModifiedDate ? moment(record.lastModifiedDate).format('MM/DD/YYYY') : '-'
                }
            },
            { title: 'Item', dataIndex: 'item' },
            { title: 'Factory', dataIndex: 'factory' },
            {
                title: 'Document Date', dataIndex: 'documentDate', render: (text, record) => {
                    return record.documentDate ? moment(record.documentDate).format('MM/DD/YYYY') : '-'
                }
            },
            {
                title: 'Actual Unit',
                dataIndex: 'actualUnit',
                align: 'center',
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                }
            },
            { title: 'Purchase Order Number', dataIndex: 'purchaseOrderNumber', align: 'center' },
            { title: 'PO Line Item Number', dataIndex: 'poLineItemNumber' },
            { title: 'DPOM Line Item Status', dataIndex: 'DPOMLineItemStatus' },
            { title: 'Style Number', dataIndex: 'styleNumber' },
            { title: 'Product Code', dataIndex: 'productCode' },
            { title: 'Colour Description', dataIndex: 'colorDesc' },
            {
                title: 'CO', dataIndex: 'customerOrder', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                }
            },
            {
                title: 'CO Final Approval Date', dataIndex: 'coFinalApprovalDate', render: (text, record) => {
                    return record.coFinalApprovalDate ? moment(record.coFinalApprovalDate).format('MM/DD/YYYY') : '-'
                }
            },
            { title: 'Plan No', dataIndex: 'planNo' },
            { title: 'Lead Time', dataIndex: 'leadTime' },
            { title: 'Category', dataIndex: 'categoryCode' },
            { title: 'Category Description', dataIndex: 'categoryDesc' },
            { title: 'Vendor Code', dataIndex: 'vendorCode' },
            { title: 'Global Category Core Focus', dataIndex: 'gccFocusCode' },
            { title: 'Global Category Core Focus Description', dataIndex: 'gccFocusDesc' },
            { title: 'Gender Age', dataIndex: 'genderAgeCode' },
            { title: 'Gender Age Description', dataIndex: ' ' },
            { title: 'Destination Country Code ', dataIndex: 'destinationCountryCode' },
            { title: 'Destination Country Name', dataIndex: 'destinationCountry' },
            { title: 'Geo Code', dataIndex: '' },
            { title: 'Plant Code', dataIndex: 'plant', align: 'center' },
            { title: 'Plant Name', dataIndex: 'plantName' },

            { title: 'Trading Co PO Number', dataIndex: 'tradingCoPoNumber' },
            { title: 'UPC', dataIndex: 'UPC' },
            { title: 'Sales Order Number', dataIndex: ' ' },
            { title: 'Sales Order Item Number', dataIndex: ' ' },
            { title: 'Customer PO', dataIndex: 'customerPO' },
            { title: 'Ship To Customer Number', dataIndex: 'shipToCustomerNumber' },
            { title: 'Ship To Customer Name', dataIndex: 'shipToCustomerName' },
            { title: 'Planning Season Code', dataIndex: 'planningSeasonCode' },
            { title: 'Planning Season Year', dataIndex: 'planningSeasonYear' },
            { title: 'Doc Type', dataIndex: 'docTypeCode' },
            { title: 'Doc Type Description ', dataIndex: 'docTypeDesc' },
            { title: 'MRGAC', dataIndex: 'MRGAC' },
            { title: 'OGAC', dataIndex: 'OGAC' },
            { title: 'GAC', dataIndex: 'GAC' },
            {
                title: 'Truck Out Date', dataIndex: 'truckOutDate', render: (text, record) => {
                    return record.truckOutDate ? moment(record.truckOutDate).format('MM/DD/YYYY') : '-'
                }
            },
            {
                title: 'Origin Receipt Date', dataIndex: 'originReceiptDate', render: (text, record) => {
                    return record.originReceiptDate ? moment(record.originReceiptDate).format('MM/DD/YYYY') : '-'
                }
            },
            {
                title: 'Factory Delivery Actual Date', dataIndex: 'factoryDeliveryActDate', render: (text, record) => {
                    return record.factoryDeliveryActDate ? moment(record.factoryDeliveryActDate).format('MM/DD/YYYY') : '-'
                }
            },
            { title: 'GAC Reason Code', dataIndex: 'GACReasonCode' },
            { title: 'GAC Reason Description', dataIndex: 'GACReasonDesc' },
            { title: 'Shipping Type', dataIndex: 'shippingType' },
            { title: 'Planning Priority Number', dataIndex: 'planningPriorityCode', },
            { title: 'Planning Priority Description', dataIndex: 'planningPriorityDesc' },
            { title: 'Launch Code', dataIndex: 'launchCode' },
            { title: 'Mode Of Transportation', dataIndex: 'modeOfTransportationCode' },
            { title: 'In Co Terms', dataIndex: 'inCoTerms' },
            { title: 'Inventory Segment Code', dataIndex: 'inventorySegmentCode' },
            { title: 'Purchase Group', dataIndex: 'purchaseGroupCode' },
            { title: 'Purchase Group Name', dataIndex: 'purchaseGroupName' },
            { title: 'Actual Unit', dataIndex: 'actualUnit', align: 'center' },
            { title: 'Reallocated Quantity', dataIndex: 'allocatedQuantity', align: 'center' },
            { title: 'Total Item Quantity', dataIndex: 'totalItemQty' },
            { title: 'Change Register', dataIndex: 'displayName' },
            { title: 'Allowed Excess Ship Qty', dataIndex: '' },
            { title: 'Actual Shipped Qty', dataIndex: 'actualShippedQty' },
            { title: 'Actual Ship %', dataIndex: '' },
            { title: 'VAS-Size', dataIndex: 'VASSize' },
            { title: 'Item Vas Text', dataIndex: 'itemVasText' },
            { title: 'Item Text', dataIndex: 'itemText' },
            { title: 'Hanger Po', dataIndex: 'allocatedQuantity', align: 'center' },

        ]

        const columns: ColumnsType<any> = [
            {
                title: 'Po+Line',
                dataIndex: 'purchaseOrderNumber-poLineItemNumber',
                fixed: 'left',
                render: (text, record) => `${record.purchaseOrderNumber}-${record.poLineItemNumber}`,
            },
            {
                title: 'Last Modified Date',
                dataIndex: 'lastModifiedDate',
                className: "right-column",
                render: (text, record) => {
                    return record.lastModifiedDate ? moment(record.lastModifiedDate).format('MM/DD/YYYY') : '-';
                },
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
                }
                // ...getColumnSearch('item'),
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
                }
                // ...getColumnSearch('factory'),
            },
            {
                title: 'Edit Unit Allocation',
                dataIndex: '',
                align: "center",
                render: (text, rowData) => (
                    <span>
                        <Form.Item>
                            <Checkbox
                                onChange={() => handleCheckboxChange('ActualUnit', rowData.poAndLine)}
                                checked={expandedActualUnit[rowData.poAndLine] || false}
                            />
                        </Form.Item>
                    </span>
                ),
            },
            {
                title: '',
                align: 'center',
                render: (text, rowData) => (
                    <div>
                        {expandedActualUnit[rowData.poAndLine] && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input
                                    name='actualUnit'
                                    allowClear
                                    style={{ marginRight: '10px' }}
                                    placeholder="Enter text"
                                    value={textareaValuesActualUnit[rowData.poAndLine] || ''}
                                    onChange={(e) =>
                                        handleTextareaChange('ActualUnit', rowData.poAndLine, e.target.value)
                                    }
                                />
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        updateColumns(rowData.poAndLine, textareaValuesActualUnit[rowData.poAndLine], '');
                                        handleCheckboxChange('ActualUnit', rowData.poAndLine);
                                        handleTextareaChange('ActualUnit', rowData.poAndLine, '');
                                    }}
                                >
                                    Submit
                                </Button>
                            </div>
                        )}
                    </div>
                ),

            },
            {
                title: 'Actual Unit',
                dataIndex: 'actualUnit',
                align: 'center',
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                }
            },

            {
                title: 'Document Date',
                dataIndex: 'documentDate',
                className: "right-column",
                render: (text, record) => {
                    return record.documentDate ? moment(record.documentDate).format('MM/DD/YYYY') : '-';
                },
            },
            {
                title: 'Purchase Order Number',
                dataIndex: 'purchaseOrderNumber', align: 'center'
            },
            {
                title: 'PO Line Item Number',
                dataIndex: 'poLineItemNumber',
                className: 'centered-column', align: 'center'
            },
            // {
            //     title: 'Trading Co PO Number',
            //     dataIndex: 'tradingCoPoNumber',
            //     render: (text, record) => {
            //         if (!text || text.trim() === '') {
            //             return '-';
            //         } else {
            //             return text;
            //         }}

            // },
            {
                title: 'DPOM Line Item Status',
                dataIndex: 'DPOMLineItemStatus',
            },

            {
                title: 'Style Number',
                dataIndex: 'styleNumber',
                // ...getColumnSearch('styleNumber'),
            },
            {
                title: 'Product Code',
                dataIndex: 'productCode',
                // ...getColumnSearch('productCode'),
            },
            {
                title: 'Colour Description',
                dataIndex: 'colorDesc',
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                }
            },


            {
                title: 'CO',
                dataIndex: 'customerOrder',
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                }
            },
            {
                title: 'CO Final Approval Date',
                dataIndex: 'coFinalApprovalDate',
                className: "right-column",
                render: (text, record) => {
                    return record.documentDate ? moment(record.documentDate).format('MM/DD/YYYY') : '-'
                }
            },
            {
                title: 'Plan No',
                dataIndex: 'planNo',
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                }
            },
            {
                title: 'Lead Time',
                dataIndex: 'leadTime',
                render: (text) => {
                    if (!isNaN(parseFloat(text))) {
                        // If it's a valid number, render it
                        return parseFloat(text).toFixed(2); // You can format it as needed
                    } else {
                        // If it's not a valid number, render a placeholder or an empty string
                        return 'N/A'; // Or any other desired text
                    }
                }
            },
            {
                title: 'Category',
                dataIndex: 'categoryCode',
            },
            {
                title: 'Category Description',
                dataIndex: 'categoryDesc',
            },
            {
                title: 'Vendor Code',
                dataIndex: 'vendorCode',
            },
            {
                title: 'Global Category Core Focus',
                dataIndex: 'gccFocusCode',
            },
            {
                title: 'Global Category Core Focus Description',
                dataIndex: 'gccFocusDesc',
            },
            {
                title: 'Gender Age',
                dataIndex: 'genderAgeCode',
                className: 'centered-column',
            },
            {
                title: 'Gender Age Description',
                dataIndex: 'genderAgeDesc',
            },
            {
                title: 'Destination Country Code',
                dataIndex: 'destinationCountryCode',
            },
            {
                title: 'Destination country Name',
                dataIndex: 'destinationCountry',
            },
            {
                title: 'Geo Code',
                dataIndex: '',
            },
            {
                title: 'Plant Code',
                dataIndex: 'plant',
                align: 'center'
            },
            {
                title: 'Plant Name',
                dataIndex: 'plantName',
            },
            {
                title: 'Trading Co PO Number',
                dataIndex: 'tradingCoPoNumber',
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'UPC',
                dataIndex: 'UPC',
            },
            {
                title: 'Sales Order Number',
                dataIndex: '',
            },
            {
                title: 'Sales Order Item Number',
                dataIndex: '',
            },
            {
                title: 'Customer PO',
                dataIndex: 'customerPO',
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Ship To Customer Number',
                dataIndex: 'shipToCustomerNumber',
                align: 'center',
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Ship To Customer Name',
                dataIndex: 'shipToCustomerName',
                align: 'center',
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            // {
            //     title: 'Ship to Address Legal PO',
            //     dataIndex: 'shipToAddressLegalPO',
            //     align: 'center',
            //     render: (text, record) => {
            //         if (!text || text.trim() === '') {
            //             return '-';
            //         } else {
            //             return text;
            //         }
            //     },
            // },
            // {
            //     title: 'Ship to Address DIA',
            //     dataIndex: 'shipToAddressDIA',
            //     align: 'center',
            //     render: (text, record) => {
            //         if (!text || text.trim() === '') {
            //             return '-';
            //         } else {
            //             return text;
            //         }
            //     },
            // },

            // {
            //     title: 'Diff of Ship to Address',
            //     dataIndex: '',
            //     align: 'center',
            //     render: (text, record) => {
            //         const lines1 = (record.shipToAddressLegalPO).trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
            //         const text1 = lines1.join('');

            //         const lines2 = (record.shipToAddressDIA).trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
            //         const text2 = lines2.join('');

            //         const dmp = new DiffMatchPatch();
            //         const diff = dmp.diff_main(text1, text2);
            //         dmp.diff_cleanupSemantic(diff);

            //         let output = '';
            //         for (const [op, text] of diff) {
            //             if (op === DiffMatchPatch.DIFF_INSERT) {
            //                 if (text.trim() !== '') {
            //                     output += `${text} `;
            //                 }
            //             } else if (op === DiffMatchPatch.DIFF_DELETE) {
            //                 if (text.trim() !== '') {
            //                     output += `${text} `;
            //                 }
            //             }
            //         }
            //         return output.trim()
            //     },
            // },
            {
                title: 'Planning Season Code',
                dataIndex: 'planningSeasonCode',
                align: 'center',
                className: 'centered-column',
            },
            {
                title: 'Planning Season Year',
                dataIndex: 'planningSeasonYear',
                align: 'center',
            },
            {
                title: 'Doc Type',
                dataIndex: 'docTypeCode',
                align: 'center',
            },
            { title: 'Doc Type Description', dataIndex: 'docTypeDesc', align: 'center' },
            {
                title: 'MRGAC', dataIndex: 'MRGAC', className: "right-column", render: (text, record) => {
                    return record.MRGAC ? moment(record.MRGAC).format('MM/DD/YYYY') : '-';
                },
            },
            {
                title: 'OGAC', dataIndex: 'OGAC', className: "right-column", render: (text, record) => {
                    return record.OGAC ? moment(record.OGAC).format('MM/DD/YYYY') : '-';
                },
            },
            {
                title: 'GAC', dataIndex: 'GAC', className: "right-column", render: (text, record) => {
                    return record.GAC ? moment(record.GAC).format('MM/DD/YYYY') : '-';
                },
            },

            {
                title: 'Truck Out Date', dataIndex: 'truckOutDate', className: "right-column", render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Origin Receipt Date', dataIndex: 'originReceiptDate', className: "right-column", render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Factory Delivery Actual Date', dataIndex: 'factoryDeliveryActDate', className: "right-column", render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'GAC Reason Code', dataIndex: 'GACReasonCode', align: 'right', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'GAC Reason Description', dataIndex: 'GACReasonDesc', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Shipping Type',
                dataIndex: 'shippingType',
                render: (text) => {
                  // Replace underscores (_) with spaces
                  const transformedText = text ? text.replace(/_/g, ' ') : '-';
                  
                  return transformedText;
                },
              },
                   
              { title: 'Planning Priority Number', dataIndex: 'planningPriorityCode', className: 'centered-column', },
            { title: 'Planning Priority Description', dataIndex: 'planningPriorityDesc' },
            {
                title: 'Launch Code', dataIndex: 'launchCode', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            { title: 'Mode Of Transportation', dataIndex: 'modeOfTransportationCode' },
            { title: 'In Co Terms', dataIndex: 'inCoTerms' },
            { title: 'Inventory Segment Code', dataIndex: 'inventorySegmentCode' },
            {
                title: 'Purchase Group',
                dataIndex: 'purchaseGroupCode',
                className: 'centered-column',
            },
            { title: 'Purchase Group Name', dataIndex: 'purchaseGroupName' },

            {
                title: 'Quantity Allocation',
                align: 'center',
                render: (text, rowData) => (
                    <span>
                        <Form.Item>
                            <Checkbox
                                onChange={() => handleCheckboxChange('QuantityAllocation', rowData.poAndLine)}
                                checked={expandedQuantityAllocation[rowData.poAndLine] || false}
                            />
                        </Form.Item>
                    </span>
                ),
            },
            {

                dataIndex: 'id',
                align: 'center',
                render: (text, rowData) => (
                    <div>
                        {expandedQuantityAllocation[rowData.poAndLine] && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input
                                    name='allocatedQuantity'
                                    allowClear
                                    style={{ marginRight: '10px' }}
                                    placeholder="Enter text"
                                    value={textareaValuesQuantityAllocation[rowData.poAndLine] || ''}
                                    onChange={(e) =>
                                        handleTextareaChange('QuantityAllocation', rowData.poAndLine, e.target.value)
                                    }
                                />
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        updateColumns(rowData.poAndLine, '', textareaValuesQuantityAllocation[rowData.poAndLine]);
                                        handleCheckboxChange('QuantityAllocation', rowData.poAndLine);
                                        handleTextareaChange('QuantityAllocation', rowData.poAndLine, '');
                                    }}
                                >
                                    Submit
                                </Button>
                            </div>
                        )}
                    </div>
                ),

            },
            {
                title: 'Reallocated Quantity',
                dataIndex: 'allocatedQuantity',
                align: 'center',
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                }
            },
            {
                title: 'Total Item Qty',
                dataIndex: 'totalItemQty',
                align: 'center',
                className: 'centered-column',
                render: (text) => <strong>{text}</strong>
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
                        title: 'Quantity',
                        dataIndex: '',
                        key: '',
                        className: 'centered-column',
                        render: (text, record) => {
                            const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
                            if (sizeData) {
                                if (sizeData.sizeQty !== null) {
                                    const formattedQty = Number(sizeData.sizeQty).toLocaleString('en-IN', { maximumFractionDigits: 0 });
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
                    }
                ],
                render: (text, record) => {
                    return record.sizeWiseData.find(item => item.sizeDescription === version);
                }
            });

            exportingColumns.push({
                title: version,
                dataIndex: '',
                width: 130,
                align: 'center',
                children: [
                    {
                        title: 'Quantity',
                        dataIndex: '',
                        render: (text, record) => {
                            const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
                            if (sizeData) {
                                if (sizeData.sizeQty !== null) {
                                    const formattedQty = Number(sizeData.sizeQty).toLocaleString('en-IN', { maximumFractionDigits: 0 });
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
                    }
                ],
                render: (text, record) => {
                    return record.sizeWiseData.find(item => item.sizeDescription === version);
                }
            });
        });
        columns.push(

            {
                title: 'Change Register',
                dataIndex: 'displayName',
                align: 'center',
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Allowed Excess Ship Qty',
                dataIndex: '',
                align: 'center',

            },
            {
                title: 'Actual Shipped Qty', dataIndex: 'actualShippedQty', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Actual Ship %',
                dataIndex: '',
                align: 'center',

            },
            {
                title: 'VAS-Size', dataIndex: 'VASSize', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Item Vas Text', dataIndex: 'itemVasText', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Item Text', dataIndex: 'itemText', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Hanger Po',
                dataIndex: 'hanger', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            }

        )
        exportingColumns.push(

            {
                title: 'Change Register',
                dataIndex: 'displayName',
                align: 'center',
                render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Allowed Excess Ship Qty',
                dataIndex: '',
                align: 'center',

            },
            {
                title: 'Actual Shipped Qty', dataIndex: 'actualShippedQty', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Actual Ship %',
                dataIndex: '',
                align: 'center',

            },
            {
                title: 'VAS-Size', dataIndex: 'VASSize', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Item Vas Text', dataIndex: 'itemVasText', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Item Text', dataIndex: 'itemText', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            },
            {
                title: 'Hanger Po',
                dataIndex: 'hanger', render: (text, record) => {
                    if (!text || text.trim() === '') {
                        return '-';
                    } else {
                        return text;
                    }
                },
            }

        )
        const getRowClassName = (record) => {
            if (record.displayName) {
                return 'colored-row';
            }
            return '';
        };

        return (
            <>

                {filterData.length > 0 ? (
                    <Table
                        loading={tableLoading}
                        columns={columns}
                        dataSource={filterData}
                        size='small'
                        pagination={{
                            onChange(current, pageSize) {
                                setPage(current);
                                setPageSize(pageSize);
                            }
                        }}
                        className="custom-table-wrapper"
                        scroll={{ x: 'max-content' }}
                        rowClassName={getRowClassName}
                        bordered
                    />
                ) : (<Table size='large' />
                )}
            </>
        );

    }

    return (
        <>
            <Card title="Factory PPM" headStyle={{ fontWeight: 'bold' }}

                extra={filteredData.length > 0 ? (<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={handleExport}
                    icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
                <Form
                    onFinish={getData}
                    form={form}
                    layout='vertical'>
                    <Row gutter={24}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }} >
                            <Form.Item label="Last Modified Date" name="lastModifiedDate">
                                <RangePicker />

                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }} >
                            <Form.Item label="Document Date" name="documentDate">
                                <RangePicker />

                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
                            <Form.Item name='productCode' label='Product Code' >
                                <Select
                                    showSearch
                                    placeholder="Select Product Code"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {productCode.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.product_code}>{inc.product_code}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
                            <Form.Item name='poNumber' label='Po Number' >
                                <Select
                                    showSearch
                                    placeholder="Select Po Number"
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
                            <Form.Item name='colorDesc' label='Color Description' >
                                <Select
                                    showSearch
                                    placeholder="Select Color Description"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {colorDesc.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.color_desc}>{inc.color_desc}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                            <Form.Item name='categoryDesc' label='Category Description' >
                                <Select
                                    showSearch
                                    placeholder="Select Category Description"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {categoryDesc.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.category_desc}>{inc.category_desc}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                            <Form.Item name='destinationCountry' label='Destination Country' >
                                <Select
                                    showSearch
                                    placeholder="Select Destination Country"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {countryDestination.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.destination_country}>{inc.destination_country}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                            <Form.Item name='plant' label='Plant Code' >
                                <Select
                                    showSearch
                                    placeholder="Select Plant Code"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {plantCode.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.plant}>{inc.plant}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                            <Form.Item name='item' label='Item' >
                                <Select
                                    showSearch
                                    placeholder="Select Item"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {item.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.item}>{inc.item}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                            <Form.Item name='factory' label='Factory' >
                                <Select
                                    showSearch
                                    placeholder="Select Factory"
                                    optionFilterProp="children"
                                    allowClear
                                >
                                    {factory.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.factory}>{inc.factory}</Option>
                                    })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }} >
                            <Form.Item name="DPOMLineItemStatus" label="DPOM Line Item Status">
                                <Select
                                    showSearch
                                    placeholder="Select Factory Status"
                                    optionFilterProp="children"
                                    allowClear mode='multiple'>
                                    <Option value="Accepted">ACCEPTED</Option>
                                    <Option value="Unaccepted">UNACCEPTED</Option>
                                    {/* <Option value="Cancelled">CANCELLED</Option> */}
                                    <Option value="Closed">CLOSED</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '15px' }}>
                            <Form.Item>
                                <Button htmlType="submit"
                                    icon={<SearchOutlined />}
                                    type="primary">Get Report</Button>
                                <Button
                                    htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={resetHandler}
                                >
                                    RESET
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Row gutter={24} justify={'space-evenly'}>
                    <Col >
                        <Statistic  loading={tableLoading} title="Total Order Qty:" value={count} formatter={formatter} />
                    </Col>
                    <Col>
                        <Statistic loading={tableLoading} title="Total Shipped:" value={0} formatter={formatter} />
                    </Col>
                    <Col>
                        <Statistic loading={tableLoading} title="Balance to ship:" value={0} formatter={formatter} />
                    </Col>
                    <Col >
                        <Statistic loading={tableLoading} title="Total PO's:" value={gridData.length} formatter={formatter} />
                    </Col>
                    <Col>
                        <Statistic loading={tableLoading} title="Accepted PO's:" value={gridData.filter(el => el.DPOMLineItemStatus === "Accepted").length} formatter={formatter} />
                    </Col>
                    <Col>
                        <Statistic loading={tableLoading} title="Unaccepted PO's:" value={gridData.filter(el => el.DPOMLineItemStatus === "Unaccepted").length} formatter={formatter} />
                    </Col>
                    <Col>
                        <Statistic loading={tableLoading} title="Closed PO's:" value={gridData.filter(el => el.DPOMLineItemStatus === "Closed").length} formatter={formatter} />
                    </Col>
                    {/* <Col>
                        <Card title={'Cancelled PO : ' + gridData.filter(el => el.DPOMLineItemStatus === "Cancelled").length} style={{ textAlign: 'left', width: 180, height: 38 }}></Card>
                    </Col> */}
                </Row><br></br>
                <Card >
                    {/* <Table
                        columns={columns}
                        // dataSource={gridData}
                        dataSource={filterData}
                        scroll={{ x: 1000 }}
                        bordered /> */}
                    {renderReport(filterData)}
                </Card>
            </Card>
        </>
    )
}

export default FactoryPPMReport;