import { Button, Card, Col, DatePicker, Form, Row, Select, Table, Tag, message } from 'antd';
import { useEffect, useState, } from 'react';
import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { OrdersService } from '@project-management-system/shared-services';
import moment from 'moment';


const AllOrdersGridView = () => {
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [gridData, setGridData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([])
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
    const service = new OrdersService();
    const [form] = Form.useForm();
    const { Option } = Select;
    const { RangePicker } = DatePicker;


    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        service.getOrdersData().then(res => {
            if (res.status) {
                setGridData(res.data)
                setFilteredData(res.data)
            }
        }).catch(err => {
            console.log(err.message)
        })
    }

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
        let filteredData = gridData;
        if (orderStatus) {
            filteredData = filteredData.filter(record => record.order_status === orderStatus);
            if (filteredData.length === 0) {
                message.error("No Data Found")
            }
            setFilteredData(filteredData);
        }
        if (startDate && endDate) {
            filteredData = filteredData.filter(record => moment(record.last_update_date).format('YYYY-MM-DD') >= startDate && moment(record.last_update_date).format('YYYY-MM-DD') <= endDate);
            if (filteredData.length === 0) {
                message.error("No Data Found")
            }
            setFilteredData(filteredData);
        }
    }

    const onReset = () => {
        form.resetFields();
        setSelectedEstimatedFromDate(undefined);
        setSelectedEstimatedToDate(undefined);
        getData();
    }

    function convertToYYYYMMDD(inputDate) {
        const formatsToTry = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY', 'YYYY-MM-DD'];
        let formattedDate = null;
        for (const format of formatsToTry) {
            const parsedDate = moment(inputDate, format);
            if (parsedDate.isValid()) {
                formattedDate = parsedDate.format('YYYY-MM-DD');
                break;
            }
        }
        return formattedDate;
    }

    const columns: any = [
        {
            title: 'S No',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'Production Plan Id',
            dataIndex: 'production_plan_id'
        },
        {
            title: 'Production Plan Name',
            dataIndex: 'prod_plan_type_name'
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
            dataIndex: 'order_qty_pcs',
            align: 'right',
            render: (text, record) => (
                <>
                    {Number(record.order_qty_pcs).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </>
            )
        },
        {
            title: 'Contracted Date',
            dataIndex: 'contracted_date',
            render: (text, record) => {
                return record.contracted_date ? convertToYYYYMMDD(record.contracted_date) : '-'
            }
        },
        {
            title: 'Requested Warehouse Date',
            dataIndex: 'requested_wh_date',
            render: (text, record) => {
                return record.requested_wh_date ? convertToYYYYMMDD(record.requested_wh_date) : '-'
            }
        },
        {
            title: 'Order Revised Date',
            dataIndex: 'last_update_date',
            render: (text, record) => {
                return record.last_update_date ? convertToYYYYMMDD(record.last_update_date) : '-'
            }
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status',
            render: (value) => <Tag color={value == 'NEW' ? 'green' : 'green-inverse'} >{value}</Tag>
        }
    ];   

    const handleExport = (e: any) => {
        e.preventDefault();

        const currentDate = new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .join("/");

        let exportingColumns: IExcelColumn[] = []
        exportingColumns = [
            { title: 'Production Plan Id', dataIndex: 'production_plan_id' },
            { title: 'Item code', dataIndex: 'item_code' },
            { title: 'Item Name', dataIndex: 'itemName' },
            { title: 'Order Quantity Pieces', dataIndex: 'order_qty_pcs' },
            { title: 'Contracted Date', dataIndex: 'contracted_date' },
            { title: 'Requested Warehouse Date', dataIndex: 'requested_wh_date' },
            { title: 'Order Revised Date', dataIndex: 'last_update_date' },
            { title: 'Order Status', dataIndex: 'order_status' },
            // { title: 'Currency', dataIndex: 'currency' },
            // { title: 'Cost', dataIndex: 'cost' },
        ]
        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`Orders-Report-${currentDate}.xlsx`);
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <Card
                title="Orders Reports"
                extra={filteredData.length > 0 ? (<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={handleExport}
                    icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
                <Form form={form} layout={'vertical'}>
                    <Row gutter={24}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <Form.Item label="Order Revised Date" name="fromDate">
                                <RangePicker onChange={EstimatedETDDate} />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <div>
                                <label>Order Status</label>
                                <Form.Item name="orderStatus">
                                    <Select
                                        showSearch
                                        placeholder="Select Project Status"
                                        optionFilterProp="children"
                                        allowClear>
                                        <Option key='new' value="NEW">NEW</Option>
                                        <Option key='unaccepted' value="UNACCEPTED">UNACCEPTED</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>

                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 6 }} style={{ marginTop: 17 }} >
                            <Button
                                type="primary"
                                icon={<SearchOutlined />}
                                style={{ marginRight: 50, width: 80 }}
                                htmlType="button"
                                onClick={getFilterdData}>Search</Button>
                            <Button
                                type="primary"
                                icon={<UndoOutlined />}
                                htmlType="submit"
                                onClick={onReset}>Reset</Button>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={filteredData} scroll={{ x: 1000 }} pagination={{
                    onChange(current) {
                        setPage(current);
                    }

                }} onChange={onChange} bordered />
            </Card>
        </div>
    )
}

export default AllOrdersGridView;