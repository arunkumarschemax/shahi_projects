import { Button, Card, Col, DatePicker, Form, Row, Select, Table, Tag, message } from 'antd';
import { useEffect, useState, } from 'react';
import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { OrdersService } from '@project-management-system/shared-services';
import moment from 'moment';
import FormItem from 'antd/es/form/FormItem';


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
        let poOrderStatus = form.getFieldValue('poOrderStatus');
        let startDate = selectedEstimatedFromDate;
        let endDate = selectedEstimatedToDate;
        let filteredData = gridData;
        if (poOrderStatus) {
            filteredData = filteredData.filter(record => record.po_order_status === poOrderStatus);
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
            dataIndex: 'production_plan_id',
            render: (text) => (text ? text : '-')

            
        },
       
        {
            title: ' Planning Ssn Cd',
            dataIndex: 'planning_ssn_cd',
            render: (text) => (text ? text : '-')

        },
        {
            title: 'Biz',
            dataIndex: 'biz',
            render: (text) => (text ? text : '-')

        },
        {
            title: 'Department',
            dataIndex: 'department',
            render: (text) => (text ? text : '-')

        },

        {
        title:'Planning Sum Code',
        dataIndex:'planning_sum_code',
        render: (text) => (text ? text : '-')

        },
        
        {
            title: 'Planning Sum',
            dataIndex: 'planning_sum',
            render: (text) => (text ? text : '-')

        },
        {
            title: 'Item ',
            dataIndex: 'item',
            render: (text) => (text ? text : '-')

        },
        {
            title: 'Vendor ',
            dataIndex: 'vendor',
            render: (text) => (text ? text : '-')

        },
        {
            title: 'FR Fabric',
            dataIndex: 'fr_fabric',
            render: (text) => (text ? text : '-')
           
        },

        {
            title: 'Branch Factory',
            dataIndex: 'branchFactory',
            render: (text) => (text ? text : '-')

           
        },
        {
            title: 'Coeff',
            dataIndex: 'coeff',
            render: (text) => (text ? text : '-')

           
        },
       
        {
            title: 'Publish Date',
            dataIndex: 'publish_date',
            render: (text, record) => {
                return record.publish_date ? convertToYYYYMMDD(record.publish_date) : '-'
            }
        },

        {
            title:'Order Plan Number',
            dataIndex:'order_plan_number',
            render: (text) => (text ? text : '-')

         },
        {
            title: 'GWH',
            dataIndex: 'gwh',
            render: (text) => (text ? text : '-')

           
        },
        {
            title: 'WH',
            dataIndex: 'wh',
            render: (text) => (text ? text : '-')

           
        },
        {
            title: 'Trnsp Mthd',
            dataIndex: 'trnsp_mthd',
            render: (text) => (text ? text : '-')

           
        },
        {
            title: 'Raw Material Supplier',
            dataIndex: 'raw_material_supplier',
            render: (text) => (text ? text : '-')

           
        },
        {
            title: 'Yarn Order Status',
            dataIndex: 'yarn_order_status',
            render: (text) => (text ? text : '-')

           
        },
        {
            title: 'Fbrc Order Status',
            dataIndex: 'fbrc_order_status',
            render: (text) => (text ? text : '-')

           
        },
        {
            title: 'Color Order Status',
            dataIndex: 'color_order_status',
            render: (text) => (text ? text : '-')

           
        },
        {
            title: 'Trim Order Status',
            dataIndex: 'trim_order_status',
            render: (text) => (text ? text : '-')

        },
        {
            title: 'PO Order Status',
            dataIndex: 'po_order_status',
            render: (text) => (text ? text : '-')

           
        },
        {
            title: 'Planned EXF',
            dataIndex: 'planned_exf',
            render: (text) => (text ? text : '-')

           
        },
        
      
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
            { title: ' Planning Ssn Cd', dataIndex: 'planning_ssn_cd' },
            { title: 'Biz', dataIndex: 'biz' },
            { title: 'Department', dataIndex: 'department' },
            { title: 'Planning Sum Code', dataIndex: 'planning_sum_code' },
            { title: 'Item', dataIndex: 'item' },
            { title: 'Vendor', dataIndex: 'vendor' },
            { title: 'FR Fabric', dataIndex: 'fr_fabric' },
            { title: 'Sewing Factory', dataIndex: 'sewing_factory' },
            { title: 'Branch Factory', dataIndex: 'branchFactory' },
            { title: 'Coeff', dataIndex: 'coeff' },
            { title: 'Publish Date', dataIndex: 'publish_date' },
            { title: 'Order Plan Number', dataIndex: 'order_plan_number' },
            { title: 'Planning Sum', dataIndex: 'planning_sum' },
            { title: 'GWH', dataIndex: 'gwh' },
            { title: 'WH', dataIndex: 'wh' },
            { title: 'Trnsp Mthd', dataIndex: 'trnsp_mthd' },
            { title: 'Raw Material Supplier', dataIndex: 'raw_material_supplier' },
            { title: 'Yarn Order Status', dataIndex: 'yarn_order_status' },
            { title: 'Fbrc Order Status', dataIndex: 'fbrc_order_status' },
            { title: 'Color Order Status', dataIndex: 'color_order_status' },
            { title: 'Trim Order Status', dataIndex: 'trim_order_status' },
            { title: 'PO Order Status', dataIndex: 'po_order_status' },
            { title: 'Planned EXF', dataIndex: 'planned_exf' },
            // { title: 'Currency', dataIndex: 'currency' },
            // { title: 'Cost', dataIndex: 'cost' },
        ]
        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`Projection-orders-${currentDate}.xlsx`);
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <Card
                title="Projection Orders"
                extra={filteredData.length > 0 ? (<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={handleExport}
                    icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
                <Form form={form} layout={'vertical'}>

                    <Row gutter={24}>
                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <Form.Item label="Planned EXF Date" name="planned_exf">
                                <RangePicker onChange={EstimatedETDDate} />
                            </Form.Item>
                        </Col> */}
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <Form.Item label="PO Order Status" name='poOrderStatus'>
                                <Select 
                                 showSearch
                                 placeholder="Select Po Order Status"
                                 optionFilterProp="children"
                                 allowClear>
                                 {gridData.map(e=>(
                                    <Option key={e.po_order_status} value={e.po_order_status}>{e.po_order_status}</Option>
                                 ))}
                                </Select>
                            </Form.Item>
                       </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <div>
                                {/* <label>Order Status</label>
                                <Form.Item name="orderStatus">
                                    <Select
                                        showSearch
                                        placeholder="Select Project Status"
                                        optionFilterProp="children"
                                        allowClear>
                                        <Option key='new' value="NEW">NEW</Option>
                                        <Option key='unaccepted' value="UNACCEPTED">UNACCEPTED</Option>
                                    </Select>
                                </Form.Item> */}
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