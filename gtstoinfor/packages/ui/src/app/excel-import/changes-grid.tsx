import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, Tabs, TabsProps, Tag, Tooltip, Typography } from 'antd';
import { OrdersService } from '@project-management-system/shared-services';
import { ArrowDownOutlined, ArrowUpOutlined, FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Excel } from 'antd-table-saveas-excel';
import Highlighter from 'react-highlight-words';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { CompareOrdersFilterReq } from '@project-management-system/shared-models';

const ChangesGrid = () => {

    const service = new OrdersService()
    const [qtyData, setQtyData] = useState([])
    const [pageSize, setPageSize] = useState<number>(null);
    const [differenceQtyData, setDifferenceQtyData] = useState([])
    const [page, setPage] = React.useState(1);
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();
    const { Text } = Typography;
    const { RangePicker } = DatePicker
    const { Option } = Select
    const [itemCode, setItemCode] = useState([])
    const [filteredItemCode, setFilteredItemCode] = useState([])
    const [quantitydata, setQuantitydata] = useState([])
    const [diffquantitydata, setDiffquantitydata] = useState([])
    const [orderNumbers,setOrderNumbers] = useState<any[]>([])



    useEffect(() => {
        getQtyChangeData()
        getQtyDifChangeData()
        getItemCode()
        getOrderNumber()
    }, [])

    const getOrderNumber = () => {
        service.getOrderNumberDropDownInCompare().then((res) => {
            setOrderNumbers(res.data)
        })
    }

    const getItemCode = () => {
        service.getQtyDifChangeItemCode().then((res) => {
            setItemCode(res.data)
        })
    }

    const getQtyDifChangeData = () => {
        const req = new CompareOrdersFilterReq()
        if(form.getFieldValue('orderNumber') !== undefined){
            req.orderNumber = form.getFieldValue('orderNumber')
        } 
        if(form.getFieldValue('itemCode') !== undefined){
            req.itemCode = form.getFieldValue('itemCode')
        } 
        if(form.getFieldValue('item') !== undefined){
            req.itemName = form.getFieldValue('item')
        } 
        if(form.getFieldValue('warehouse') !== undefined){
            req.warehouseFromDate = (form.getFieldValue('warehouse')[0]).format('MM-DD')
            req.warehouseFromYear = (form.getFieldValue('warehouse')[0]).format('YYYY')
            req.warehouseToDate = (form.getFieldValue('warehouse')[1]).format('MM-DD')
            req.warehouseToYear = (form.getFieldValue('warehouse')[1]).format('YYYY')
        } 
        if(form.getFieldValue('exFactory') !== undefined){
            req.exFactoryFromDate = (form.getFieldValue('exFactory')[0]).format('YYYY-MM-DD')
            req.exFactoryToDate = (form.getFieldValue('exFactory')[1]).format('YYYY-MM-DD')
        } 
        service.getQtyDifChangeData(req).then((res) => {
            if (res.status) {
                setDifferenceQtyData(res.data)
                setDiffquantitydata(res.data)
            }
        }).catch(err => {
            // console.log(err.message)
        })
    }

    const getQtyChangeData = () => {
        const req = new CompareOrdersFilterReq()
        if(form.getFieldValue('orderNumber') !== undefined){
            req.orderNumber = form.getFieldValue('orderNumber')
        } 
        if(form.getFieldValue('itemCode') !== undefined){
            req.itemCode = form.getFieldValue('itemCode')
        } 
        if(form.getFieldValue('item') !== undefined){
            req.itemName = form.getFieldValue('item')
        } 
        if(form.getFieldValue('warehouse') !== undefined){
            req.warehouseFromDate = (form.getFieldValue('warehouse')[0]).format('MM-DD')
            req.warehouseFromYear = (form.getFieldValue('warehouse')[0]).format('YYYY')
            req.warehouseToDate = (form.getFieldValue('warehouse')[1]).format('MM-DD')
            req.warehouseToYear = (form.getFieldValue('warehouse')[1]).format('YYYY')
        } 
        if(form.getFieldValue('exFactory') !== undefined){
            req.exFactoryFromDate = (form.getFieldValue('exFactory')[0]).format('YYYY-MM-DD')
            req.exFactoryToDate = (form.getFieldValue('exFactory')[1]).format('YYYY-MM-DD')
        } 
        service.getQtyChangeData(req).then((res) => {
            if (res.status) {
                setQtyData(res.data)
                setQuantitydata(res.data)
            }
        }).catch(err => {
            // console.log(err.message)
        })
    }


    const exportExcel = () => {
        const excel = new Excel();

        const preOrdQtyTotal = (data) => {
            let old_val = 0;
            let new_val = 0;
            let Diff = 0;
            data.forEach((item) => {
                old_val += Number(item.old_val)
                new_val += Number(item.new_val)
                Diff += Number(item.Diff)
                
            })
            // console.log(old_val,new_val,Diff)
            const orderWiseTotals = {old_val,new_val,Diff,year:'Total'}
            return orderWiseTotals
        }

        const itemOrdQtyTotal = (data) => {
            let old_qty_value = 0;
            let new_qty_value = 0;
            let diff = 0;
            data.forEach((item) => {
                old_qty_value += Number(item.old_qty_value)
                new_qty_value += Number(item.new_qty_value)
                diff += Number(item.diff)
                
            })
            const itemWiseTotals = {old_qty_value,new_qty_value,diff,year:'Total'}
            return itemWiseTotals
        }

        if (qtyData?.length > 0) {
            excel
                .addSheet('order Qty')
                .addColumns(data1)
                .addDataSource(qtyData, { str2num: true })
                const orderWiseTotals = preOrdQtyTotal(qtyData)
                // console.log(orderWiseTotals)
                excel.addDataSource([orderWiseTotals], { str2num: true })
        }
        if (differenceQtyData?.length > 0) {
            excel
                .addSheet('GroupBy ItemCode Qty')
                .addColumns(data4)
                .addDataSource(differenceQtyData, { str2num: true })
                const itemWiseTotals = itemOrdQtyTotal(differenceQtyData)
                excel.addDataSource([itemWiseTotals], { str2num: true })

        }
        
        excel.saveAs('compareOrders.xlsx');
    }

    const data1 = [
        // {
        //     title: 'S No',
        //     render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        // },
        {
            title: 'Order Plan Number',
            dataIndex: 'order_plan_number',
        },
        {
            title: 'Production Plan Type',
            dataIndex: 'prod_plan_type'
        },
        {
            title: 'Item code',
            dataIndex: 'item_cd',
        },
        {
            title: 'Item Name',
            dataIndex: 'item'
        },
        {
            title: 'Year',
            dataIndex: 'year'
        },
        {
            title: 'Warehouse',
            dataIndex: 'wh',
            render: (text, record) => {
                return record.wh ? moment(record.wh).format('MM-DD') : '-'
            }
        },
        {
            title: 'Ex Factory',
            dataIndex: 'planned_exf',
            render: (text, record) => {
                return record.planned_exf ? moment(record.planned_exf).format('YYYY-MM-DD') : '-'
            }
        },
        {
            title: 'Previous Order Quantity',
            dataIndex: 'old_val',
            render: (text, record) => {
                // const oldVal = record.old_val.replace(/,/g,'')
                return(
                    <>
                        {Number(record.old_val).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </>

                )
            }
        },
        {
            title: 'Revised Order Quantity',
            dataIndex: 'new_val',
            render: (text, record) => {
                return(
                    <>
                        {Number(record.new_val).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </>

                )
            }
        },
        {
            title: 'Difference',
            dataIndex: 'Diff',
            render: (text, record) => {
                return(
                    <>
                        {Number(record.Diff).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </>

                )
            }
       
        },
    ]

    const data4 = [
        {
            title: 'Item code',
            dataIndex: 'item_cd'
        },
        {
            title: 'Item Name',
            dataIndex: 'item'
        },
        {
            title: 'Year',
            dataIndex: 'year'
        },
        {
            title: 'Warehouse',
            dataIndex: 'wh',
            render: (text, record) => {
                return record.wh ? moment(record.wh).format('MM-DD') : '-'
            }
        },
        {
            title: 'Ex Factory',
            dataIndex: 'planned_exf',
            render: (text, record) => {
                return record.planned_exf ? moment(record.planned_exf).format('YYYY-MM-DD') : '-'
            }
        },
        {
            title: 'Previous Total Order Quantity',
            dataIndex: 'old_qty_value',
            render: (text, record) => (
                <>
                    {Number(record.old_qty_value).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )
        },
        {
            title: 'Revised Total Order Quantity',
            dataIndex: 'new_qty_value',
            render: (text, record) => (
                <>
                    {Number(record.new_qty_value).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )
           
        },
        {
            title: 'Difference',
            dataIndex: 'diff',
            render: (text, record) => (
                <>
                    {Number(record.diff).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )
           
        }

    ];

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


    const orderWisecolumns: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Order Plan Number',
            dataIndex: 'order_plan_number',
            // ...getColumnSearchProps('order_plan_number')
        },
        {
            title: 'Production Plan Type',
            dataIndex: 'prod_plan_type',
            sorter: (a, b) => a.prod_plan_type?.localeCompare(b.prod_plan_type),
            sortDirections: [ "ascend","descend"],
        },
        {
            title: 'Item code',
            dataIndex: 'item_cd',
            // ...getColumnSearchProps('item_cd')
        },
        {
            title: 'Item Name',
            dataIndex: 'item',
            sorter: (a, b) => a.item?.localeCompare(b.item),
            sortDirections: [ "ascend","descend"],
        },
        {
            title: 'Year',
            dataIndex: 'year',
            sorter: (a, b) => a.year?.localeCompare(b.year),
            sortDirections: [ "ascend","descend"],
        },
        {
            title: 'Warehouse',
            dataIndex: 'wh',
            render: (text, record) => {
                return record.wh ? moment(record.wh).format('MM-DD') : '-'
            }
        },
        {
            title: 'Ex Factory',
            dataIndex: 'planned_exf',
            render: (text, record) => {
                return record.planned_exf ? moment(record.planned_exf).format('YYYY-MM-DD') : '-'
            }
        },
        {
            title: 'Previous Order Quantity',
            dataIndex: 'old_val',
            align: 'right',
            sorter: (a, b) => Number(a.old_val) - Number(b.old_val),
            sortDirections: [ "ascend","descend"],
            render: (text, record) => {
                // const oldVal = record.old_val.replace(/,/g,'')
                return(
                    <>
                        {Number(record.old_val).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </>

                )
            }
        },
        {
            title: 'Revised Order Quantity',
            dataIndex: 'new_val',
            align: 'right',
            sorter: (a, b) => Number(a.new_val) - Number(b.new_val),
            sortDirections: [ "ascend","descend"],
            render: (text, record) => {
                // const newVal = record.new_val.replace(/,/g,'')
                // const oldVal = record.old_val.replace(/,/g,'')
                return(

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
            }
        },
        {
            title: 'Difference',
            dataIndex: 'Diff',
            align: 'right',
            sorter: (a, b) => Number(a.Diff) - Number(b.Diff),
            sortDirections: [ "ascend","descend"],
            render: (text, record) => {
                // const newVal = record.new_val.replace(/,/g,'')
                // const oldVal = record.old_val.replace(/,/g,'')
                // const diff = newVal - oldVal
               return (
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
            }
        },
        
    ];


    const ItemWisecolumns: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Item code',
            dataIndex: 'item_cd'
        },
        {
            title: 'Item Name',
            dataIndex: 'item',
            sorter: (a, b) => a.item?.localeCompare(b.item),
            sortDirections: [ "ascend","descend"],
        },
        // {
        //     title: 'Year',
        //     dataIndex: 'year',
        //     sorter: (a, b) => a.year?.localeCompare(b.year),
        //     sortDirections: [ "ascend","descend"],
        // },
        // {
        //     title: 'Warehouse',
        //     dataIndex: 'wh',
        //     render: (text, record) => {
        //         return record.wh ? moment(record.wh).format('MM-DD') : '-'
        //     }
        // },
        // {
        //     title: 'Ex Factory',
        //     dataIndex: 'planned_exf',
        //     render: (text, record) => {
        //         return record.planned_exf ? moment(record.planned_exf).format('YYYY-MM-DD') : '-'
        //     }
        // },
        {
            title: 'Previous Total Order Quantity',
            dataIndex: 'old_qty_value',
            align: 'right',
            sorter: (a, b) => Number(a.old_qty_value) - Number(b.old_qty_value),
            sortDirections: [ "ascend","descend"],
            render: (text, record) => (
                <>
                    {Number(record.old_qty_value).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )
        },
        {
            title: 'Revised Total Order Quantity',
            dataIndex: 'new_qty_value',
            align: 'right',
            sorter: (a, b) => Number(a.new_qty_value) - Number(b.new_qty_value),
            sortDirections: [ "ascend","descend"],
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
            title: 'Difference',
            dataIndex: 'diff',
            align: 'right',
            sorter: (a, b) => Number(a.diff) - Number(b.diff),
            sortDirections: [ "ascend","descend"],
            render: (text, record) => (
                < >
                    {Number(record.diff) === 0 ? 0 : ''}
                    {Number(record.diff) < 0 ? <span style={{ color: 'red' }} > {Number(record.diff).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                    })} </span> : ''}
                    {Number(record.diff) > 0 ? <span style={{ color: 'green' }} > {Number(record.diff).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                    })} </span> : ''}
                </>
            )
        }
    ];

    const getFilterdData = () => {
        getQtyChangeData()
        getQtyDifChangeData()
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <b>Order Wise Quantity Variance: {qtyData?.length} </b>,
            children: (
                qtyData.length > 0 ?(<Table className="custom-table-wrapper"
            bordered dataSource={qtyData} columns={orderWisecolumns}scroll={{x:1000,y:500}}

            summary={(qtyData) => {
                let totalLastQty = 0;
                let totalRecQty = 0;
                let defData = 0;
                qtyData.forEach(({ old_val}) => {
                    totalLastQty += Number(old_val);

                });
                qtyData.forEach(({ new_val }) => {
                    totalRecQty += Number(new_val);

                });

                defData = totalRecQty - totalLastQty;

                return (
                    <>
                        <Table.Summary.Row className='tableFooter'>
                            <Table.Summary.Cell index={0} ><Text ></Text></Table.Summary.Cell>
                            <Table.Summary.Cell index={1} ><Text ></Text></Table.Summary.Cell>
                            <Table.Summary.Cell index={2} ><Text ></Text></Table.Summary.Cell>
                            <Table.Summary.Cell index={3} ><Text ></Text></Table.Summary.Cell>
                            <Table.Summary.Cell index={4} ><Text ></Text></Table.Summary.Cell>
                            <Table.Summary.Cell index={5} ><Text ></Text></Table.Summary.Cell>
                            <Table.Summary.Cell index={6} ><Text ></Text></Table.Summary.Cell>
                            <Table.Summary.Cell index={7}  ><div style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</div></Table.Summary.Cell>
                            <Table.Summary.Cell index={8} ><div style={{ textAlign: 'right', fontWeight: 'bold' }}>{Number(totalLastQty).toLocaleString('en-IN', {
                                maximumFractionDigits: 0
                            })}</div></Table.Summary.Cell>
                            <Table.Summary.Cell index={8}><div style={{ textAlign: 'right', fontWeight: 'bold' }}>{Number(totalRecQty).toLocaleString('en-IN', {
                                maximumFractionDigits: 0
                            })}</div></Table.Summary.Cell>
                            <Table.Summary.Cell index={9} ><div style={{ textAlign: 'right', fontWeight: 'bold' }}>{Number(defData).toLocaleString('en-IN', {
                                maximumFractionDigits: 0
                            })}</div></Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                );
            }
            }
            
            
            />) : (
                <Alert message="No data available" type="warning" showIcon style={{ width: "140px", margin: "auto" }}/>
              )
            ),
        },
        {
            key: '2',
            label: <b>Item Wise Quantity Variance: {differenceQtyData?.length}</b>,
            children: (
                differenceQtyData.length > 0 ?(<Table className="custom-table-wrapper" bordered
            dataSource={differenceQtyData} columns={ItemWisecolumns} pagination={false}
            scroll={{x:1000,y:500}}
                summary={(differenceQtyData) => {
                    let totalLastQty = 0;
                    let totalRecQty = 0;
                    let defData = 0;
                    differenceQtyData.forEach(({ old_qty_value }) => {
                        totalLastQty += Number(old_qty_value);

                    });
                    differenceQtyData.forEach(({ new_qty_value }) => {
                        totalRecQty += Number(new_qty_value);

                    });

                    defData = totalRecQty - totalLastQty;

                    return (
                        <>
                            <Table.Summary.Row className='tableFooter'>
                                {/* <Table.Summary.Cell index={0} ><Text ></Text></Table.Summary.Cell> */}
                                {/* <Table.Summary.Cell index={1} ><Text ></Text></Table.Summary.Cell> */}
                                {/* <Table.Summary.Cell index={2} ><Text ></Text></Table.Summary.Cell> */}
                                <Table.Summary.Cell index={3} ><Text ></Text></Table.Summary.Cell>
                                <Table.Summary.Cell index={5} ><Text ></Text></Table.Summary.Cell>
                                <Table.Summary.Cell index={6}  ><div style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</div></Table.Summary.Cell>
                                <Table.Summary.Cell index={7} ><div style={{ textAlign: 'right', fontWeight: 'bold' }}>{Number(totalLastQty).toLocaleString('en-IN', {
                                    maximumFractionDigits: 0
                                })}</div></Table.Summary.Cell>
                                <Table.Summary.Cell index={8}><div style={{ textAlign: 'right', fontWeight: 'bold' }}>{Number(totalRecQty).toLocaleString('en-IN', {
                                    maximumFractionDigits: 0
                                })}</div></Table.Summary.Cell>
                                <Table.Summary.Cell index={9} ><div style={{ textAlign: 'right', fontWeight: 'bold' }}>{Number(defData).toLocaleString('en-IN', {
                                    maximumFractionDigits: 0
                                })}</div></Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    );
                }
                }
            />
            ) : (
                <Alert message="No data available" type="warning" showIcon style={{ width: "140px", margin: "auto" }}/>
              )
            ),
        },
    ];

    const onReset = () => {
        form.resetFields();
        getQtyChangeData()
       getQtyDifChangeData();
    }

    return (
        <Card title='Projection Orders Comparision' extra={qtyData || differenceQtyData ? (<Button
            type="default"
            style={{ color: 'green' }}
            onClick={exportExcel}
            icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
            <Form form={form} layout={"vertical"}  onFinish={getFilterdData}>
                <Row gutter={[24, 24]}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 5 }} xl={{ span: 4 }}>
                        <Form.Item name="orderNumber" label="Order Plan Number">
                    <Select placeholder="Select order Number" showSearch allowClear optionFilterProp="children">
                        {orderNumbers.map((e) => {
                        return (
                            <Option key={e.order_plan_number} value={e.order_plan_number}>{e.order_plan_number}
                            </Option>
                        );
                        })}
                    </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 5 }} xl={{ span: 4 }}>
                    <Form.Item name="itemCode" label="Item Code">
              <Select placeholder="Select Item Code" dropdownMatchSelectWidth={false} showSearch allowClear optionFilterProp="children">
                {itemCode.map((e) => {
                  return (
                    <Option key={e.id} value={e.item_cd}>{e.item_cd}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 5 }} xl={{ span: 5 }}>
                    <Form.Item name="item" label="Item Name">
              <Select placeholder="Select Item" dropdownMatchSelectWidth={false} showSearch allowClear optionFilterProp="children">
                {itemCode.map((e) => {
                  return (
                    <Option key={e.id} value={e.item}>{e.item}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 5 }} xl={{ span: 5 }}>
                        <Form.Item name='warehouse' label='Warehouse'>
                            <RangePicker style={{width:'100'}}/>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 5 }} xl={{ span: 5 }}>
                        <Form.Item name='exFactory' label='Ex Factory'>
                            <RangePicker style={{width:'100'}}/>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={8} justify={'end'}>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 5 }} lg={{ span: 4 }} xl={{ span: 4 }}  >
                            <Form.Item>
                                <Button htmlType="submit" icon={<SearchOutlined />}style={{backgroundColor:'green', margin:5}}type="primary">SEARCH</Button>
                                    <Button danger
                                    htmlType='button' icon={<UndoOutlined />}  onClick={onReset}>RESET
                                </Button>
                            </Form.Item>
                        </Col>
                </Row>
            </Form>
            {qtyData || differenceQtyData ? <>
                {/* <Row gutter={24}>
                    <Col>
                        <Button icon={<DownloadOutlined />} style={{ marginTop: '30px', }} onClick={() => { exportExcel(); }}>
                            Get Excel
                        </Button>
                    </Col>
                </Row> */}
                <Tabs type='card' items={items} />
            </> : <></>}

        </Card>
    );
};

export default ChangesGrid;