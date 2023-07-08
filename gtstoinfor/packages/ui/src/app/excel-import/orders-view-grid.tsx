import { Button, Card, Col, DatePicker, Form, Row, Select, Table, message } from 'antd';
import { useEffect, useState, } from 'react';
import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { OrdersService } from '@project-management-system/shared-services';


const AllOrdersGridView = () => {
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(1)
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

    console.log(gridData)

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
            filteredData = filteredData.filter(record => record.contracted_date >= startDate && record.contracted_date <= endDate);
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

    const columns = [
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
        },
        {
            title: 'Contracted Date',
            dataIndex: 'contracted_date'
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

    const handleExport = (e: any) => {
        e.preventDefault();

        const currentDate = new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .join("/");

        let exportingColumns: IExcelColumn[] = []
        exportingColumns = [
            { title: 'Unit', dataIndex: 'company' },
            { title: 'Project Type', dataIndex: 'projectType' },
            { title: 'Project Name', dataIndex: 'projectName' },
            { title: 'Department Name', dataIndex: 'departmentName' },
            { title: 'Project Description', dataIndex: 'projectDesc' },
            { title: 'Project Status', dataIndex: 'projectStatus' },
            { title: 'Start Date', dataIndex: 'startDate' },
            { title: 'End Date', dataIndex: 'endDate' },
            { title: 'Currency', dataIndex: 'currency' },
            { title: 'Cost', dataIndex: 'cost' },
        ]
        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`Orders-Report-${currentDate}.xlsx`);
    };

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
                            <Form.Item label="Contract Date" name="fromDate">
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
                                        {/* {Object.values(ProjectStatusEnum).map((val) => {
                                            return <Option key={val} value={val}>{val}</Option>
                                        })} */}
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
                <Table columns={columns} dataSource={filteredData} scroll={{ x: 1000 }} bordered />
            </Card>
        </div>
    )
}

export default AllOrdersGridView;