import { Button, Card, Col, DatePicker, Form, Input, Popconfirm, Row, Select, Table, Tag, message } from 'antd';
import { useEffect, useState, } from 'react';
import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { OrdersService } from '@project-management-system/shared-services';
import moment from 'moment';
import { COLineRequest } from '@project-management-system/shared-models';


const TrimOrder= () => {
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
        service.getTrimOrdersData().then(res => {
            if (res.status) {
                setGridData(res.data)
                setFilteredData(res.data)
            }
        }).catch(err => {
            console.log(err.message)
        })
    }
    const approveOrderStatus = (record) => {
        console.log(record)
    const req = new COLineRequest();
    req.itemNumber = record.itemNumber
    req.orderNumber = record.order_no
    service.createCOline(req).then((res) => {
        if (res.status) {
            getData()
            message.success(res.internalMessage)
        } else (
            message.error(res.internalMessage)
        )
    })
    }
    const getFilterdData = () => {
        let orderNo = form.getFieldValue('orderNo');
        let startDate = selectedEstimatedFromDate;
        let endDate = selectedEstimatedToDate;
        let filteredData = gridData;
        if (orderNo) {
            filteredData = filteredData.filter(record => record.order_no === orderNo);
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

    const handleItemNoChange = (value, record) => {
        console.log(value)
        record.itemNumber = value
        console.log(record)
        // setItemNoValues((prevValues) => ({
        //     ...prevValues,
        //     [record.key]: value,
        // }));
    };


    const columns: any = [
        {
            title: 'S No',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
      
        {
            title: 'Order No',
            dataIndex: 'order_no'
        },
        {
            title: 'Item Code',
            dataIndex: 'item_code',
            
        },
        {
            title: 'Item',
            dataIndex: 'item',
            
        },
        {
            title: 'Item Brand',
            dataIndex: 'item_brand'
        },
        {
            title: 'Vendor Code ',
            dataIndex: 'vendor_code',
            
        },
        {
            title: 'Vendor',
            dataIndex: 'vendor',
            
        },
        {
            title: 'Order Plan Number ',
            dataIndex: 'order_plan_number',
            
        },
        {
            title: 'Color Code',
            dataIndex: 'color_code',
            
        },
        {
            title: 'Color',
            dataIndex: 'color',
            
        },
        {
            title: 'Size Code',
            dataIndex: 'size_code',
            
        },
        {
            title: 'Size',
            dataIndex: 'size',
            
        },
        {
            title: 'Trim Item No',
            dataIndex: 'trim_item_no',
            
        },
           
        {
            title: 'Order Quantity Pcs',
            dataIndex: 'order_qty_pcs',
            
        },
        {
            title: 'Status',
            dataIndex: 'answered_status',
        },
        {
            title: "Item No",
            dataIndex: "itemNo",
            render: (text, record) => {
                return (
                    <Form>
                        <Form.Item>
                            <Input
                                placeholder="Enter Item No"
                                onChange={(e) => handleItemNoChange(e.target.value, record)}
                            />
                        </Form.Item>
                    </Form>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (value, record) => {
                // const isEnabled = isActionButtonEnabled(record);
        
                return (
                    <Popconfirm
                        title="Are you sure to approve"
                        onConfirm={() => approveOrderStatus(record)}
                        // disabled={record.answered_status == 'Accepted'}
                    >
                        <Button 
                        // disabled={!isEnabled}
                        >Accept</Button>
                    </Popconfirm>
                );
            },
            
            
        },
        
        // {
        //     title: 'Trim Order Id',
        //     dataIndex: 'trim_order_id'
        // },
        // {
        //     title: 'Year',
        //     dataIndex: 'year'
        // },
        // {
        //     title: 'Revision No',
        //     dataIndex: 'revision_no'
        // },
        // {
        //     title: 'Planning ssn',
        //     dataIndex: 'planning_ssn'
        // },
        // {
        //     title: 'Global Business Unit',
        //     dataIndex: 'global_business_unit'
        // },
        // {
        //     title: 'Business Unit',
        //     dataIndex: 'business_unit'
        // },
      
        // {
        //     title: 'Department',
        //     dataIndex: 'department'
        // },
        // {
        //     title: 'Revised Date',
        //     dataIndex: 'revised_date',
            // render: (text, record) => {
            //     return record.revisedDate ? convertToYYYYMMDD(record.revisedDate) : '-'
            // }
        // },
        // {
        //     title: 'Document Status',
        //     dataIndex: 'document_status',
        //     // render: (value) => <Tag color={value == 'NEW' ? 'green' : 'green-inverse'} >{value}</Tag>
        // },
        // {
        //     title: 'Answered Status',
        //     dataIndex: 'answered_status'
        // },
        // {
        //     title: 'Vendor Person InCharge',
        //     dataIndex: 'vendor_person_incharge'
        // },
        // {
        //     title: 'Decision Date',
        //     dataIndex: 'decision_date',
            // render: (text, record) => {
            //     return record.decisionDate ? convertToYYYYMMDD(record.decisionDate) : '-'
            // }
        // },
        // {
        //     title: 'Payment Terms',
        //     dataIndex: 'payment_terms'
        // },
        // {
        //     title: 'Contracted Etd',
        //     dataIndex: 'contracted_etd'
        // },
        // {
        //     title: 'Eta Wh',
        //     dataIndex: 'eta_wh'
        // },
        // {
        //     title: 'Approver',
        //     dataIndex: 'approver'
        // },
        // {
        //     title: 'Approval Date',
        //     dataIndex: 'approval_date',
        //     // render: (text, record) => {
        //     //     return record.approvalDate ? convertToYYYYMMDD(record.approvalDate) : '-'
        //     // }
        // },
        // {
        //     title: 'Order Conditions',
        //     dataIndex: 'order_conditions',
            
        // },
        // {
        //     title: 'Remarks',
        //     dataIndex: 'remark',
            
        // },
        // {
        //     title: 'Raw Material Code',
        //     dataIndex: 'raw_material_code',
            
        // },
        // {
        //     title: 'Supplier Raw Material Code',
        //     dataIndex: 'supplier_raw_material_code',
            
        // },
        // {
        //     title: 'Supplier Raw Material ',
        //     dataIndex: 'supplier_raw_material',
            
        // },
        
        // {
        //     title: 'Management Factory Code ',
        //     dataIndex: 'management_factory_code',
            
        // },
        // {
        //     title: 'Management Factory',
        //     dataIndex: 'management_factory',
            
        // },
        // {
        //     title: 'Branch Factory Code ',
        //     dataIndex: 'branch_factory_code',
            
        // },
        // {
        //     title: 'Branch Factory',
        //     dataIndex: 'branch_factory',
            
        // },
      
        // {
        //     title: 'Representative Sample Code',
        //     dataIndex: 'representative_sample_code',
            
        // },
        // {
        //     title: 'Representative Sample',
        //     dataIndex: 'representative_Sample',
            
        // },
        
        // {
        //     title: 'Pattern Dimension Code',
        //     dataIndex: 'pattern_dimension_code',
            
        // },
     
        // {
        //     title: 'Arrangement By',
        //     dataIndex: 'arrangement_by',
            
        // },
        // {
        //     title: 'Trim Description',
        //     dataIndex: 'trim_description',
            
        // },
        
        // {
        //     title: 'Trim Supplier',
        //     dataIndex: 'trim_supplier',
            
        // },
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
            { title: 'S No', dataIndex: 'sno' },
            { title: 'Trim Order Id', dataIndex: 'trim_order_id' },
            { title: 'Order No', dataIndex: 'order_no' },
            { title: 'Year', dataIndex: 'year' },
            { title: 'Revision No', dataIndex: 'revision_no' },
            { title: 'Planning ssn', dataIndex: 'planning_ssn' },
            { title: 'Global Business Unit', dataIndex: 'global_business_unit' },
            { title: 'Business Unit', dataIndex: 'business_unit' },
            { title: 'Item Brand', dataIndex: 'item_brand' },
            { title: 'Department', dataIndex: 'department' },
            { title: 'Revised Date', dataIndex: 'revised_date' },
            { title: 'Document Status', dataIndex: 'document_status' },
            { title: 'Answered Status', dataIndex: 'answered_status' },
            { title: 'Vendor Person InCharge', dataIndex: 'vendor_person_incharge' },
            { title: 'Decision Date', dataIndex: 'decision_date' },
            { title: 'Payment Terms', dataIndex: 'payment_terms' },
            { title: 'Eta Wh', dataIndex: 'eta_wh' },
            { title: 'Approver', dataIndex: 'approver' },
            { title: 'Approval Date', dataIndex: 'approval_date' },
            { title: 'Order Conditions', dataIndex: 'order_conditions' },
            { title: 'Remarks', dataIndex: 'remark' },
            { title: 'Raw Material Code', dataIndex: 'raw_material_code' },
            { title: 'Supplier Raw Material Code', dataIndex: 'supplier_raw_material_code' },
            { title: 'Supplier Raw Material', dataIndex: 'supplier_raw_material' },
            { title: 'Vendor Code', dataIndex: 'vendor_code' },
            { title: 'Vendor ', dataIndex: 'vendor' },
            { title: 'Management Factory Code  ', dataIndex: 'management_factory_code' },
            { title: 'Management Factory ', dataIndex: 'management_factory' },
            { title: 'Branch Factory Code ', dataIndex: 'branch_factory_code' },
            { title: 'Branch Factory ', dataIndex: 'branch_factory' },
            { title: 'Order Plan Number ', dataIndex: 'order_plan_number' },
            { title: 'Item Code ', dataIndex: 'item_code' },
            { title: 'Item  ', dataIndex: 'item' },
            { title: 'Representative Sample Code ', dataIndex: 'representative_sample_code' },
            { title: 'Representative Sample', dataIndex: 'representative_Sample' },
            { title: 'Color Code', dataIndex: 'color_code' },
            { title: 'Color', dataIndex: 'color' },
            { title: 'Pattern Dimension Code', dataIndex: 'pattern_dimension_code' },
            { title: 'Size Code', dataIndex: 'size_code' },
            { title: 'Size ', dataIndex: 'size' },
            { title: 'Order Quantity Pcs', dataIndex: 'order_qty_pcs' },
            { title: 'Arrangement By', dataIndex: 'arrangement_by' },
            { title: 'Trim Description', dataIndex: 'trim_description' },
            { title: 'Trim Item No', dataIndex: 'trim_item_no' },
            { title: 'Trim Supplier', dataIndex: 'trim_supplier' },
            { title: 'Status', dataIndex: 'answered_status' },


            // { title: 'Currency', dataIndex: 'currency' },
            // { title: 'Cost', dataIndex: 'cost' },
        ]
        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`Trim-Orders-Report-${currentDate}.xlsx`);
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <Card
                title="Trim Orders"
                extra={filteredData.length > 0 ? (<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={handleExport}
                    icon={<FileExcelFilled />}>Download Excel</Button>) : null}>

                
                 <Form form={form} layout={'vertical'}>
                    <Row gutter={24}>
                       
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <div>
                                <label>Order Number</label>
                                <Form.Item name="orderNo">
                                    <Select
                                        showSearch
                                        placeholder="Select Order Number"
                                        optionFilterProp="children"
                                        allowClear>
                                            {gridData.map(e=>(
                                                <Option key={e.order_no} value={e.order_no}>{e.order_no}</Option>
                                            ))}
                                        {/* <Option key='new' value="NEW">NEW</Option>
                                        <Option key='unaccepted' value="UNACCEPTED">UNACCEPTED</Option> */}
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

export default TrimOrder;