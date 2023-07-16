import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, Tabs, TabsProps, Tooltip, Typography } from 'antd';
import { OrdersService } from '@project-management-system/shared-services';
import { ArrowDownOutlined, ArrowUpOutlined, DownloadOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
import { color } from 'highcharts';
import { Excel } from 'antd-table-saveas-excel';
import Highlighter from 'react-highlight-words';

const ChangesGrid = () => {

    const service = new OrdersService()
    const [contractDateData, setContractDateData] = useState([])
    const [qtyData, setQtyData] = useState([])
    const [warehouseDateData, setWarehouseDateDate] = useState([])
    const [filteredContractDateData, setFilteredContractDateData] = useState([])
    const [filteredQtyData, setFilteredQtyData] = useState([])
    const [filteredWarehouseDateData, setFilteredWarehouseDateDate] = useState([])
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
    const [pageSize, setPageSize] = useState<number>(null);
    const [differenceQtyData, setDifferenceQtyData] = useState([])
    const [page, setPage] = React.useState(1);
    const [form] = Form.useForm();
    const { Text } = Typography;
    const { RangePicker } = DatePicker
    const { Option } = Select

    useEffect(() => {
        getContractDateChangeData()
        getQtyChangeData()
        getWharehouseDateChangeData()
        getQtyDifChangeData()
    }, [])

    const getContractDateChangeData = () => {
        service.getContractDateChangeData().then((res) => {
            setContractDateData(res.data)
            setFilteredContractDateData(res.data)
        })
    }

    const getQtyDifChangeData = () => {
        service.getQtyDifChangeData().then((res) => {
            setDifferenceQtyData(res.data)
            // setFilteredContractDateData(res.data)
        })
    }

    const getQtyChangeData = () => {
        service.getQtyChangeData().then((res) => {
            setQtyData(res.data)
            setFilteredQtyData(res.data)
        })
    }

    const getWharehouseDateChangeData = () => {
        service.getWharehouseDateChangeData().then((res) => {
            setWarehouseDateDate(res.data)
            setFilteredWarehouseDateDate(res.data)
        })
    }
    const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet('order Qty')
          .addColumns(data1)
          .addDataSource(filteredQtyData, { str2num: true })
          .addSheet('GroupBy ItemCode Qty')
          .addColumns(data4)
          .addDataSource(differenceQtyData, { str2num: true })
          .addSheet('Requested Warehouse Date')
          .addColumns(data2)
          .addDataSource(filteredWarehouseDateData, { str2num: true })
          .addSheet('Contracted date')
          .addColumns(data3)
          .addDataSource(contractDateData, { str2num: true })
          .saveAs('revisedOrders.xlsx');
      }
      const data1 =[
        
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
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date',
           
        },
        {
            title: 'Color Code',
            dataIndex: 'color_code'
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
            title: 'Color Code',
            dataIndex: 'color_code'
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
            title: 'Order Quantity Pieces',
            dataIndex: 'order_qty_pcs',

        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date'
        },
        {
            title: 'Color Code',
            dataIndex: 'color_code'
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
            dataIndex: 'sumOfOldVal',
            
        },
        {
            title: 'Sum Of Qrd Qty this Week',
            dataIndex: 'sumOfNewVal',
            
        },
        {
            title: 'Difference Ord Qty Revised',
            dataIndex: 'diffVal'
        },
        
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


    const columns:any = [
        {
            title: 'S No',
            key: 'sno',
            width:'60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id',
            ...getColumnSearchProps('production_plan_id')
        },
        
        {
            title: 'Production Plan Name',
            dataIndex: 'prod_plan_type_name'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code',
            ...getColumnSearchProps('item_code')
        },
        
        {
            title: 'Item Name',
            dataIndex: 'itemName'
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'new_val',
            render: (text, record) => (
                
                <Tooltip overlayStyle={{ font: 'bold', maxWidth: '150px' }} title={`Previous Value:  ${record.old_val} Revised Value:  ${record.new_val}`}>
                    <>
                     {Number(record.old_val) < Number(record.new_val) ? <span style={{ color: 'green' }}>{record.new_val}</span> : ''}
                     {Number(record.old_val) > Number(record.new_val) ? <span style={{ color: 'red' }}>{record.new_val}</span> : ''}
                 </>
                    
                    &nbsp;&nbsp;
                    <span>
                        {Number(record.old_val) < Number(record.new_val) ? <ArrowUpOutlined  style={{ color: 'green' }} /> : <ArrowDownOutlined  style={{ color: 'red' }} />}
                    </span>
                </Tooltip>
            )
        },
        {
            title: 'Contracted Date',
            dataIndex: 'contracted_date',
            render: (text, record) => {
                return record.contracted_date ? moment(record.contracted_date).format('YYYY-MM-DD') : '-'
            }
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date',
            width :'190px',
            render: (text, record) => {
                return record.requested_wh_date ? moment(record.requested_wh_date).format('YYYY-MM-DD') : '-'
            }
        },
        {
            title: 'Color Code',
            dataIndex: 'color_code'
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status'
        }
    ];

    const columns1:any = [
        {
            title: 'S No',
            key: 'sno',
            width:'60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
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
            width :'190px',
            render: (text, record) => (
                <Tooltip overlayStyle={{ font: 'bold', maxWidth: '160px' }} title={`Previous Date:  ${moment(record.old_val).format('YYYY-MM-DD')} Revised Date:  ${moment(record.new_val).format('YYYY-MM-DD')}`}>
                    {moment(record.old_val).format('YYYY-MM-DD')  < moment(record.new_val).format('YYYY-MM-DD') ? <span style={{ color: 'green' }}>{record.new_val}</span> : ''}
                     {moment(record.old_val).format('YYYY-MM-DD') > moment(record.new_val).format('YYYY-MM-DD') ? <span style={{ color: 'red' }}>{record.new_val}</span> : ''}
                    &nbsp;&nbsp;
                    <span>
                        {moment(record.old_val).format('YYYY-MM-DD') < moment(record.new_val).format('YYYY-MM-DD') ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />}
                    </span>
                </Tooltip>
            )
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
            title: 'Color Code',
            dataIndex: 'color_code'
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status'
        }
    ];

    const columns2:any = [
        {
            title: 'S No',
            key: 'sno',
            width:'60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
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
            render: (text, record) => (
                <Tooltip overlayStyle={{ font: 'bold', maxWidth: '160px' }} title={`Previous Date:  ${moment(record.old_val).format('YYYY-MM-DD')} Revised Date:  ${moment(record.new_val).format('YYYY-MM-DD')}`}>
                    {moment(record.old_val).format('YYYY-MM-DD')  < moment(record.new_val).format('YYYY-MM-DD') ? <span style={{ color: 'green' }}>{record.new_val}</span> : ''}
                     {moment(record.old_val).format('YYYY-MM-DD') > moment(record.new_val).format('YYYY-MM-DD') ? <span style={{ color: 'red' }}>{record.new_val}</span> : ''}
                    &nbsp;&nbsp;
                    <span>
                        {moment(record.old_val).format('YYYY-MM-DD') < moment(record.new_val).format('YYYY-MM-DD') ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />}
                    </span>
                </Tooltip>
            )
        },
        {
            title: 'Order Quantity Pieces',
            dataIndex: 'order_qty_pcs',

        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date',
            width :'190px'
        },
        {
            title: 'Color Code',
            dataIndex: 'color_code'
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status'
        }
    ];
    const columns3:any = [
        {
            title: 'S No',
            key: 'sno',
            width:'60px',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
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
            title: ' Sum Of Qrd Qty last Week',
            dataIndex: 'sumOfOldVal',
            align:'right'
        },
        {
            title: 'Sum Of Qrd Qty this Week',
            dataIndex: 'sumOfNewVal',
            align:'right'
        },
        {
            title: 'Difference Ord Qty Revised',
            dataIndex: 'diffVal',
            align:'right'
        },
        
    ];

    const EstimatedETDDate = (value) => {
        if (value) {
            console.log(value)
            const fromDate = value[0].format('YYYY-MM-DD');
            const toDate = value[1].format('YYYY-MM-DD');
            setSelectedEstimatedFromDate(fromDate)
            setSelectedEstimatedToDate(toDate)
        }
    }

    const getFilterdData = () => {
        let orderStatus = form.getFieldValue('orderStatus');
        let startDate = selectedEstimatedFromDate;
        let endDate = selectedEstimatedToDate;
        let filteredContractData = contractDateData;
        let filteredQtyData = qtyData
        let filteredReqWhData = warehouseDateData
        if (orderStatus) {
            filteredContractData = filteredContractData.filter(record => record.order_status === orderStatus);
            filteredQtyData = filteredQtyData.filter(record => record.order_status === orderStatus)
            filteredReqWhData = filteredReqWhData.filter(record => record.order_status === orderStatus)
            setFilteredContractDateData(filteredContractData);
            setFilteredQtyData(filteredQtyData)
            setFilteredWarehouseDateDate(filteredReqWhData)
        }
        if (startDate && endDate) {
            filteredContractData = filteredContractData.filter(record => record.new_val >= startDate && record.new_val <= endDate);
            filteredQtyData = filteredQtyData.filter(record => record.contracted_date >= startDate && record.contracted_date <= endDate)
            filteredReqWhData = filteredReqWhData.filter(record => record.contracted_date >= startDate && record.contracted_date <= endDate)
            setFilteredContractDateData(filteredContractData);
            setFilteredQtyData(filteredQtyData)
            setFilteredWarehouseDateDate(filteredReqWhData)
        }
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <b>Order Qty : {filteredQtyData?.length} </b>,
            children: <Table scroll={{ y: 400 }} dataSource={filteredQtyData} columns={columns} />,
        },
        {
            key: '2',
            label: <b>Group Of ItemCode  : {differenceQtyData?.length}</b>,
            children: <Table scroll={{ y: 400 }} dataSource={differenceQtyData} columns={columns3} pagination={false}
            summary={(differenceQtyData) => {
                let totalLastQty = 0;
                let totalRecQty = 0;
                let defData = 0;
                differenceQtyData.forEach(({ sumOfOldVal }) => {
                    totalLastQty += Number(sumOfOldVal);
    
                });
                differenceQtyData.forEach(({ sumOfNewVal }) => {
                    totalRecQty += Number(sumOfNewVal);
    
                });
                differenceQtyData.forEach(({ diffVal }) => {
                    defData += Number(diffVal);
    
                });
    
                return (
                  <>
                    <Table.Summary.Row className='tableFooter'>
                    {/* <Table.Summary.Cell index={0} ><Text ></Text></Table.Summary.Cell> */}
                    <Table.Summary.Cell index={1} ><Text ></Text></Table.Summary.Cell>
                    <Table.Summary.Cell index={3} ><Text ></Text></Table.Summary.Cell>
                      <Table.Summary.Cell index={4}  ><div style={{ textAlign: 'right', fontWeight:'bold'}}>Summary</div></Table.Summary.Cell>
                      <Table.Summary.Cell index={5} ><div style={{ textAlign: 'right', fontWeight:'bold' }}>{totalLastQty}</div></Table.Summary.Cell>
                      <Table.Summary.Cell index={6}><div style={{ textAlign: 'right', fontWeight:'bold' }}>{totalRecQty}</div></Table.Summary.Cell>
                      <Table.Summary.Cell index={7} ><div style={{ textAlign: 'right' , fontWeight:'bold'}}>{defData}</div></Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }
              }
            />,
        },
        {
            key: '3',
            label: <b >Requested Warehouse Date : {filteredWarehouseDateData?.length}</b>,
            children: <Table scroll={{ y: 400 }} dataSource={filteredWarehouseDateData} columns={columns1} />,
        },
        {
            key: '4',
            label: <b>Contracted date : {filteredContractDateData?.length}</b>,
            children: <Table scroll={{ y: 400 }} dataSource={filteredContractDateData} columns={columns2} />,
        },
       
    ];

    const onReset = () => {
        form.resetFields();
        setSelectedEstimatedFromDate(undefined);
        setSelectedEstimatedToDate(undefined);
        getContractDateChangeData()
        getQtyChangeData()
        getWharehouseDateChangeData()
    }

    return (
        <Card title='Compare Orders'>
            <Form form={form} layout={"vertical"} >
                <Row gutter={[24, 24]}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name="contractDate"
                            label="Contracted Date"
                        >
                            <RangePicker onChange={EstimatedETDDate} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                        <Form.Item name="orderStatus"
                            label="Order Status"
                        >
                            <Select
                                allowClear
                                placeholder='select order status'
                            >
                                <Option key='new' value="NEW">NEW</Option>
                                <Option key='unaccepted' value="UNACCEPTED">UNACCEPTED</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }} style={{ marginTop: 22 }}>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            style={{ marginRight: 50, width: 100 }}
                            htmlType="button"
                            onClick={getFilterdData}>Search</Button>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }} style={{ marginTop: 22 }}>
                        <Button
                            type="primary"
                            icon={<UndoOutlined />}
                            htmlType="submit"
                            onClick={onReset}>Reset</Button>
                    </Col>
                </Row>
            </Form>
            {filteredQtyData || filteredContractDateData || filteredWarehouseDateData ? <>
                <Row gutter={24}>
                    <Col>
                        <Button icon={<DownloadOutlined />} style={{ marginTop: '30px', }} onClick={() => { exportExcel(); }}>
                            Get Excel
                        </Button>
                    </Col>
                </Row>
                <Tabs items={items} />
            </> : <></>}

        </Card>
    );
};

export default ChangesGrid;