import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout'
import { BomCreationFiltersReq, PpmDateFilterRequest, UpdatedSizes, bomGenerationColumnsMapping } from '@project-management-system/shared-models';
import { BomService, NikeService } from '@project-management-system/shared-services';
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Table } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';

type Props = {
    sendSelectedData: (value: any[]) => void;
    sendUpdatedData: (value: any[]) => void;
    sendSelectedKeys: (values : UpdatedSizes[])  => void
}

export default function BomGeneration(props: Props) {
    const [form] = Form.useForm();
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const service = new NikeService();
    const [filterData, setFilterData] = useState<any>([])
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);
    const { Option } = Select;
    const navigate = useNavigate()
    const [styleNumber, setStyleNumber] = useState<any>([]);
    const [item, setItem] = useState<any>([]);
    const [geoCode, setGeoCode] = useState<any>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [tableLoading, setTableLoading] = useState<boolean>(false)
    const bomservice = new BomService();
    const [changedSizes, setChangedSizes] = useState<any>([])
    const [updatedData, setUpdatedData] = useState<any>([])
    const [selectedData, setSelectedData] = useState<any[]>()
    useEffect(() => {
        // getData();
        // getStyleNumber();
        // getItem();
        // getGeoCode();
    }, [])

    const getData = () => {
        const req = new BomCreationFiltersReq();
        if (form.getFieldValue('item') !== undefined) {
            req.item = form.getFieldValue('item');
        }
        if (form.getFieldValue('styleNumber') !== undefined) {
            req.style = form.getFieldValue('styleNumber');
        }
        if (form.getFieldValue('geoCode') !== undefined) {
            req.geoCode = form.getFieldValue('geoCode');
        }
        setTableLoading(true)
        bomservice.getBomCreationData(req).then(res => {
            if (res.status) {
                setFilterData(prev => [...prev,...res.data]);
            } else {
                setFilterData([]);
            }
        })
            .catch(_err => {
            }).finally(() => {
                setTableLoading(false)
            });
    };

    const getStyleNumber = () => {
        service.getPpmStyleNumberFactory().then(res => {
            setStyleNumber(res.data)
        })
    }

    const getItem = () => {
        service.getPpmItemForFactory().then(res => {
            setItem(res.data)
        })
    }

    const getGeoCode = () => {
        service.getPpmdesGeoCodeFactory().then(res => {
            setGeoCode(res.data)
        })
    }

    function formatInput(value) {
        return value.replace(/\D/g, '');
    }

    function parseInput(value) {
        // Remove non-numeric characters and parse to number
        return parseFloat(value.replace(/\D/g, ''));
    }

    const onSizeChange = useCallback((size, rec, val) => {
        // Your existing logic for onSizeChange function
        const existingIndex = changedSizes.findIndex(item => item.poLine === rec.poLine && item.size === size);
        if (existingIndex !== -1) {
            const changedSizesTemp = [...changedSizes];
            changedSizesTemp[existingIndex] = { ...changedSizesTemp[existingIndex], qty: val, };
            setChangedSizes(changedSizesTemp);
        } else {
            const newSizeObj = { poLine: rec.poLine, qty: val, size, key: rec.poLine + size };
            setChangedSizes(prevState => [...prevState, newSizeObj]);

        }
        props.sendUpdatedData(changedSizes)
    }, [changedSizes, setChangedSizes]);

    function renderColumns(): any {
        const unWantedColumns = ['poNumber', 'poLineItemNumber', 'planningSeasonCode', 'planningSeasonYear', 'destinationCountryCode', 'genderAgeDesc']
        if (filterData.length)
            return Object.keys(filterData[0]).filter((k) => !unWantedColumns.includes(k)).map((key) => {
                return {
                    title: bomGenerationColumnsMapping[key] ? bomGenerationColumnsMapping[key] : key,
                    dataIndex: key,
                    width: '100px',
                    key,
                    fixed: key == 'poLine',
                    ...getColumnSearchProps(key),
                    render: (value, row, index) => {
                         if (bomGenerationColumnsMapping[key]) {
                            return value
                        } else {
                            return <InputNumber type='number' onChange={(v) => onSizeChange(key, row, v)} key={row.poAndLine + key + index} defaultValue={value} formatter={formatInput} parser={parseInput} />
                        }
                    }
                    // bomGenerationColumnsMapping[key] && bomGenerationColumnsMapping[key] !='Item' ?
                    //     value
                    //     :
                    //     <InputNumber onChange={(v) => onSizeChange(key, row, v)}  key={row.poAndLine + key + index} defaultValue={value} formatter={formatInput} parser={parseInput} />
                }
            }
            );

        return undefined
    }

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
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
    });

    function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        // window.location.reload();

    };

    function handleReset(clearFilters) {
        clearFilters();
        setSearchText('');
    };


    const onSelectChange = (newSelectedRowKeys: any, selectedRows: any[]) => {
        console.log(newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedData(selectedRows)
        props.sendSelectedData(selectedRows)
        props.sendSelectedKeys(newSelectedRowKeys)

    };

    const onSelectAllChange = (e) => {
        const checked = e.target.checked;
        const allRowKeys = filterData.map((v) => v.poLine)
        setSelectedRowKeys(checked ? allRowKeys : []);
      };

    const rowSelection = {
        selectedRowKeys,
        selectedData,
        onChange: onSelectChange,
        // onSelectAll: onSelectAllChange,
    };

    const onGenerate = () => {
        navigate('/bom/trim-List', { state: { info: selectedRowKeys } })
    }


    const changedSizesColumns = [
        {
            title: 'Po+Line',
            dataIndex: 'poLine',

        },
        {
            title: 'Size',
            dataIndex: 'size',
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
        }
    ]

    function onReset() {
        console.log('reset called')
        setFilterData([])
        setSelectedData([])
        setChangedSizes([])
        setSelectedRowKeys([])
        form.resetFields()
    }


    return (
        <>
            <Form onFinish={getData}
                form={form}
                layout='vertical'
            >
                <Row gutter={[24, 4]}>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
                        <Form.Item name='item' label='Item' >
                            <Select
                                onDropdownVisibleChange={getItem}
                                showSearch placeholder="Select Item" optionFilterProp="children" allowClear mode='multiple'>
                                {item?.map((inc: any) => {
                                    return <Option key={inc.id} value={inc.item}>{inc.item}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col> */}
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} >
                        <Form.Item name='styleNumber' label='Style Number' >
                            <Select
                                mode='multiple'
                                onDropdownVisibleChange={getStyleNumber}
                                showSearch
                                placeholder="Select Style Number"
                                optionFilterProp="children"
                                allowClear
                            >
                                {styleNumber?.map((inc: any) => {
                                    return <Option key={inc.id} value={inc.style_number}>{inc.style_number}</Option>
                                })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                        <Form.Item name='geoCode' label='Geo Code' >
                            <Select
                                mode='multiple'
                                onDropdownVisibleChange={getGeoCode}
                                showSearch
                                placeholder="Select Geo Code"
                                optionFilterProp="children"
                                allowClear
                            >
                                {geoCode?.map((inc: any) => {
                                    return <Option key={inc.id} value={inc.geo_code}>{inc.geo_code}</Option>
                                })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }} style={{ paddingTop: '23px' }}>
                        <Button htmlType="submit"
                            icon={<SearchOutlined />}
                            type="primary">Submit</Button>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }} style={{ paddingTop: '23px' }}>
                        <Button htmlType='button' icon={<UndoOutlined />} onClick={() => onReset()}>
                            RESET
                        </Button>
                    </Col>
                </Row>

            </Form>
            <Row gutter={[24, 4]}>
                <Table
                    loading={tableLoading}
                    size='small'
                     pagination={false}
                    // pagination={{
                    //     pageSize: 10,
                    //     onChange(current, pageSize) {
                    //         setPage(current);
                    //         setPageSize(pageSize);
                    //     }
                    // }}
                    scroll={{ x: 'max-content', y: 450 }}
                    bordered
                    rowKey={record => record.poLine}
                    columns={renderColumns()}
                    dataSource={filterData}
                    rowSelection={rowSelection}
                />

                {/* <Col span={8}>
                    <Table size='small'
                        //  pagination={false}
                        pagination={false}
                        scroll={{ x: 'max-content', y: 450 }}
                        bordered
                        rowKey={record => record.poLine}
                        columns={changedSizesColumns}
                        dataSource={changedSizes}
                    />
                </Col> */}
            </Row>
            <br />

        </>
    )
}
