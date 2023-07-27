import React, { useEffect, useRef, useState } from 'react';
import { OrdersService } from "@project-management-system/shared-services";
import { Form } from "react-router-dom";
import { Button, Card, Input, Table, message } from 'antd';
import { VersionDataModel } from '@project-management-system/shared-models';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { FileExcelFilled, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Excel } from 'antd-table-saveas-excel';

const VersionChanges = () => {

    const service = new OrdersService()
    const [versionData, setVersionData] = useState([])
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1)
    useEffect(() => {
        getVersionWiseData();
    }, [])

    const getVersionWiseData = () => {
        service.getVersionWiseData().then((res) => {
            setVersionData(res.data)
        })
    }

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

    const getVersionHeaders = (data: VersionDataModel[]) => {
        const versionHeaders = new Set<string>();
        data?.forEach(rec => rec.versionWiseData?.forEach(version => {
            versionHeaders.add('Version ' + version.version);
        }))
        return Array.from(versionHeaders);
    };

    const getEmpDayWiseConsumptionMap = (data: VersionDataModel[]) => {
        const versionWiseMap = new Map<number, Map<string, number>>();
        data?.forEach(rec => {
            if (!versionWiseMap.has(rec.productionPlanId)) {
                versionWiseMap.set(rec.productionPlanId, new Map<string, number>());
            }
            rec.versionWiseData?.forEach(version => {
                versionWiseMap.get(rec.productionPlanId).set('Version ' + version.version, version.orderQtyPcs);
            })
        });
        return versionWiseMap;
    }

    const downloadExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("Version Data")
            .addColumns(excelTitles)
            .addDataSource(versionData, {
                str2Percent: true
            })
            .saveAs("VersionData.xlsx");
    }

    let excelTitles: IExcelColumn[] = [];
    const renderReport = (data: VersionDataModel[]) => {
        const versionHeaders = getVersionHeaders(data);
        const versionWiseDataMap = getEmpDayWiseConsumptionMap(data);
        excelTitles = [
            { title: "Production Plan Id", dataIndex: "productionPlanId" },
            { title: "Item Code", dataIndex: "itemCode" },
            { title: "Item Name", dataIndex: "itemName" },
            // { title: "Token Type", dataIndex: "tokenType" }
        ];

        const columns: any = [
            {
                title: 'S No',
                key: 'sno',
                render: (text, object, index) => (page - 1) * pageSize + (index + 1)
            },
            {
                title: 'Production Plan Id',
                dataIndex: 'productionPlanId',
                ...getColumnSearchProps('productionPlanId')
            },
            {
                title: 'Item Code',
                dataIndex: 'itemCode',
                ...getColumnSearchProps('itemCode')
            },
            {
                title: 'Item Name',
                dataIndex: 'itemName'
            }
        ];

        versionHeaders?.forEach(version => {
            columns.push(
                {
                    title: version,
                    key: version,
                    width: 130,
                    render: (value, record: any, index) => {
                        const prodPlanId = record.productionPlanId;
                        const fbConsInfo = versionWiseDataMap.get(prodPlanId);
                        if (fbConsInfo) {
                            return Number(versionWiseDataMap.get(prodPlanId).get(version)).toLocaleString('en-IN', {
                                maximumFractionDigits: 0
                            }) ?? '-';
                        } else {
                            return 0;
                        }
                    }
                }
            );
            excelTitles.push({
                title: version, dataIndex: "", render: (value: any, record: any) => {
                    const prodPlanId = record.productionPlanId;
                    const fbConsInfo = versionWiseDataMap.get(prodPlanId);
                    if (fbConsInfo) {
                        const val = Number(versionWiseDataMap.get(prodPlanId).get(version)).toLocaleString('en-IN', {
                            maximumFractionDigits: 0
                        }) ?? '-';
                        return val;
                    } else {
                        return 0;
                    }
                }
            });
        });

        return <Table columns={columns} dataSource={versionData} pagination={{
            onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize)
            }
        }} />
    }

    return (
        <>
            <Card title="Vesrion Wise Order Quantity Pieces" extra={versionData ? (<Button
                type="default"
                style={{ color: 'green' }}
                onClick={downloadExcel}
                icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
                <div>
                    {renderReport(versionData)}
                </div>
            </Card>
        </>
    )

}
export default VersionChanges;