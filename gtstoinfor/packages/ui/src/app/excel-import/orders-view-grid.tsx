import { Button, Card, Col, DatePicker, Form, Row, Select, Table, Tag, Tooltip, message } from 'antd';
import { useEffect, useState, } from 'react';
import { ArrowDownOutlined, FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { OrdersService } from '@project-management-system/shared-services';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../common/common-functions/alert-messages';
import { OrdersReq } from '@project-management-system/shared-models';
import { config } from 'packages/libs/shared-services/config';


const AllOrdersGridView = () => {
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [gridData, setGridData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([])
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
    const [uploadedData,setuploadedData]=useState<any[]>([])
    const [date,setdate]=useState<any>('')
    const service = new OrdersService();
    const [form] = Form.useForm();
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const navigate = useNavigate();


    useEffect(() => {
        getData();
        getOrdersData()
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

    const getOrdersData = () =>{
        const req= new OrdersReq()
        req.status=form.getFieldValue('orderStatus')
        if(form.getFieldValue('fromDate') != undefined){
            console.log(form.getFieldValue('fromDate'))
         req.fromDate=form.getFieldValue('fromDate').format("YYYY-MM-DD")
        // req.fromDate=date
        console.log(req.fromDate)
        }
        console.log(req)
        service.getuploadeOrdersdata(req).then(res =>{
            if(res.status){
                setuploadedData(res.data)

            }else{
                setuploadedData([])
            }
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
        // getData();
        getOrdersData()
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
    const download = (filePath) => {
        console.log(filePath);
        // : FilenameDto[]
        
        if (filePath) {
          filePath = filePath.split(",");
          for (const res of filePath) {
            if(res){
              console.log(res);
              setTimeout(() => {
                const response = {
                // file:'https://edoc7api.shahi.co.in/api/document-management/gtstoinfor/dist/packages/services/document-management/upload-files/'+`${res}`,
                file:config.download_path+'/dist/packages/services/document-management/upload_files/'+`${res}`
                };
                window.open(response.file);
      
              }, 100);
            }
          }
        }
        else {
          AlertMessages.getErrorMessage("Please upload file. ");
    
        }
      }
    

    const columns: any = [
        {
            title: 'S No',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'FileName',
            dataIndex: 'fileName'
        },
        {
            title: 'uploaded At',
            // dataIndex: 'createdAt',
            render: (_, record) => {
                return record.DateAndHours
                  ? moment(record.DateAndHours).format("YYYY-MM-DD")
                  : "-";
              },
        },
        {
            title: 'Uploaded By',
            dataIndex: 'uploadedUser'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Download',
            dataIndex: 'poNo',
            render: (value,rowData) => (
                rowData.fileName!=null?
                <>
                <Tooltip title='Download'>
                <Tag icon={<ArrowDownOutlined onClick={()=>download(rowData.filePath)}/>} >{value}</Tag>
                </Tooltip>
                </>:''
              ),
        },
        // {
        //     title: 'Style',
        //     dataIndex: 'style',
        //     align: 'right',
        //     // render: (text, record) => (
        //     //     <>
        //     //         {Number(record.order_qty_pcs).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
        //     //     </>
        //     // )
        // },
        // {
        //     title: 'Dest',
        //     dataIndex: 'dest',
        //     // render: (text, record) => {
        //     //     return record.contracted_date ? convertToYYYYMMDD(record.contracted_date) : '-'
        //     // }
        // },
        // {
        //     title: 'TC Status',
        //     dataIndex: 'tcStatus',
        //     // render: (text, record) => {
        //     //     return record.requested_wh_date ? convertToYYYYMMDD(record.requested_wh_date) : '-'
        //     // }
        // },
        // {
        //     title: 'Ship Quantity',
        //     dataIndex: 'shipQty',
        //     // render: (text, record) => {
        //     //     return record.last_update_date ? convertToYYYYMMDD(record.last_update_date) : '-'
        //     // }
        // },
        // {
        //     title: 'Cottons',
        //     dataIndex: 'ctns',
        //     // render: (value) => <Tag color={value == 'NEW' ? 'green' : 'green-inverse'} >{value}</Tag>
        // }
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
            { title: 'Buyer', dataIndex: 'buyer' },
            { title: 'Challan No', dataIndex: 'challanNo' },
            { title: 'Invoice No', dataIndex: 'invoiceNo' },
            { title: 'Po No', dataIndex: 'poNo' },
            { title: 'Style', dataIndex: 'style' },
            { title: 'Dest', dataIndex: 'dest' },
            { title: 'TC Status', dataIndex: 'tcStatus' },
            { title: 'Ship Qty', dataIndex: 'shipQty' },
            { title: 'Cottons', dataIndex: 'ctns' },
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


    const onChangeDate = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setdate(dateString)
      };

    return (
        <div>
            <Card size='small' title="Orders" headStyle={{ backgroundColor: '#77dfec', border: 0 }}  extra={<span><Button onClick={() => navigate('/excel-import/excel-import')} type={'primary'}>Import Orders</Button></span>}>
                <Form form={form} layout={'vertical'}>
                    <Row gutter={24}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <Form.Item label="Uploaded At" name="fromDate">
                                {/* <RangePicker onChange={EstimatedETDDate} /> */}
                                 <DatePicker style={{ width: '95%', }}  
                                 onChange={onChangeDate} 
                                 showToday 
                                 format="YYYY-MM-DD" 
                                 />
                                 {/* <DatePicker showTime onChange={onChange} onOk={onOk} /> */}
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{marginTop:'6px'}}>
                            <div>
                                <label>Upload Status</label>
                                <Form.Item name="orderStatus">
                                    <Select
                                        showSearch
                                        placeholder="Select Project Status"
                                        optionFilterProp="children"
                                        allowClear>
                                        <Option key='Failed' value="Failed">Failed</Option>
                                        <Option key='Sucess' value="Sucess">Sucess</Option>
                                        <Option key='Uploading' value="Uploading">Uploading</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>

                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ marginTop: 23 }} >
                            <Button
                                type="primary"
                                icon={<SearchOutlined />}
                                // style={{ marginRight: 50, width: 80 }}
                                htmlType="button"
                                onClick={getOrdersData}>get Data</Button>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ marginTop: 23 }} >
                            <Button
                                type="primary"
                                icon={<UndoOutlined />}
                                htmlType="submit"
                                onClick={onReset}>Reset</Button>
                        </Col>


                    </Row>
                </Form>
                <Table size='small' columns={columns} dataSource={uploadedData} scroll={{ x: 1000 }} pagination={{
                    onChange(current) {
                        setPage(current);
                    }
                
                }} onChange={onChange} bordered />
            </Card>
        </div>
    )
}

export default AllOrdersGridView;