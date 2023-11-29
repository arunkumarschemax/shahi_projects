import { EditOutlined, DownloadOutlined, UndoOutlined, FileExcelFilled } from '@ant-design/icons';
import { VendorFilterModel, VendorNameEnum } from '@xpparel/shared-models';
import { SharedService } from '@xpparel/shared-services';
import { Card, Table, DatePicker, message, Col, Row, Select, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import * as XLSX from 'xlsx';

const { RangePicker } = DatePicker;
const { Option } = Select;

export const InvoiceReport = () => {
    const [formData, setFormData] = useState<any>([]);
    const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
    const [filteredData, setFilteredData] = useState<any>([]);
    const [tableDisabled, setTableDisabled] = useState<boolean>(true);
    const [buttonClicked, setButtonClicked] = useState(false)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const handleVendorFilterChange = (value) => {
        // Placeholder function, customize as per your requirement
        console.log("Selected vendors:", value);
        setSelectedVendors(value);
    };


    const services = new SharedService();

    const getdata = () => {
        const req = new VendorFilterModel();
        // Modify req as needed before making the API call

        console.log(req, 'reqqqqqqqqqqqq');
        services
            .getdata(req)
            .then((res) => {
                if (res.status) {
                    setFormData(res.data);
                    message.success('Data Retrieved Successfully');
                } else {
                    setFormData([]);
                    message.error('NO DATA FOUND');
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        getdata();
    }, []);

    const columns: ColumnsType<any> = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            key: 'sno',
            align: 'left',
            render: (text: any, record: any, index: number) => {
                return <span>{index + 1}</span>;
            },
        },
        {
            title: 'Vendor Name',
            dataIndex: 'venName',
            key: 'venName',
            align: 'left' ,
            width:"400px",
            sorter: (a, b) => a.venName.localeCompare(b.venName),
            render: (text: any, record: { venName: any }) => {
                return <>{record.venName ? record.venName : '-'}</>;
            },
        },
        {
            title: 'GST Number',
            dataIndex: 'gstNumber',
            key: 'gstNumber',
            sorter: (a, b) => a.gstNumber.localeCompare(b.gstNumber),
            align: 'left',
            width:"400px",
            render: (text: any, record: { gstNumber: any }) => {
                return <>{record.gstNumber ? record.gstNumber : '-'}</>;
            },
        },
        {
            title: 'Invoice Number',
            dataIndex: 'invoiceNumber',
            key: 'invoiceNumber',
            width:"400px",
            sorter: (a, b) => a.invoiceNumber.localeCompare(b.invoiceNumber),
            align: 'left',
            render: (text: any, record: { invoiceNumber: any }) => {
                return <>{record.invoiceNumber ? record.invoiceNumber : '-'}</>;
            },
        },
    ];

    const handleDateChange = (dates, dateStrings) => {
        if (dates && dates.length === 2) {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
        } else {
            message.error('Please select both start and end dates.');
        }
    };

    const handleGetReport = () => {
        let dataToSet = formData;

        if (selectedVendors.length > 0) {
            dataToSet = dataToSet.filter(item => selectedVendors.includes(item.venName));
        }

        if (filteredData.length > 0) {
            if (selectedVendors.length === 0) {
                dataToSet = filteredData;
            } else {
                const filtered = filteredData.filter(item => selectedVendors.includes(item.venName));
                dataToSet = filtered;
            }
        }

        if (startDate && endDate) {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);

            dataToSet = dataToSet.filter(item => {
                const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
                return itemDate >= startDateObj.toISOString().split('T')[0] && itemDate <= endDateObj.toISOString().split('T')[0];
            });
        }

        setFilteredData(dataToSet);
        setTableDisabled(false);
    };


    const handleCancel = () => {
        setButtonClicked(true);
        window.location.reload();
    };

    const handleExportToExcel = () => {
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const filename = 'invoice_report.xlsx';
        const formattedData = filteredData.map((item, index) => {
            return {
                'S.No': index + 1,
                'Vendor Name': item.venName,
                'GST Number':item.gstNumber,
                'Invoice Number': item.invoiceNumber,
                'Created at': item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
            };
        });
        const ws = XLSX.utils.json_to_sheet(formattedData);

        const columnWidths = Array(Object.keys(formattedData[0]).length).fill({ width: 20 });
        ws['!cols'] = columnWidths;
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        const url = URL.createObjectURL(data);


        const existingLink = document.getElementById('downloadLink');
        if (existingLink) {
            document.body.removeChild(existingLink);
        }

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        link.setAttribute('id', 'downloadLink');
        document.body.appendChild(link);
        link.click();
    };




    const uniqueVendors = [...new Set(formData.map((item) => item.venName))];

    return (
        <div style={{ padding: '16px' }}>
            <Card title={<span><EditOutlined style={{ marginRight: '8px' }} />Invoice Reports</span>}

                extra={
                    <Button
                        type="default"
                        style={{ marginLeft: 10, marginTop: 10, color: "green" }}
                        onClick={handleExportToExcel}
                        icon={<FileExcelFilled />}
                    >
                        Download Excel
                    </Button>
                }>
                <Row>
                    <Card

                        title={"Total Vendors: " + formData.filter((el) => el.venName).length}
                        style={{ textAlign: 'center', marginBottom: 10, marginRight: 60, width: 180, height: 35, backgroundColor: 'lightgreen', borderRadius: 3 }}
                        size="small"
                        bodyStyle={{ display: 'none' }}
                    ></Card><Card
                        title={"DHL Count: " + formData.filter((el) => el.venName == "DHL Logistics Pvt. Ltd.").length}
                        style={{ textAlign: 'center', marginBottom: 10, marginRight: 60, width: 180, height: 35, backgroundColor: 'powderblue', borderRadius: 3 }}
                        size="small"
                        bodyStyle={{ display: 'none' }}
                    ></Card>
                    
                </Row>

                <Row gutter={24}>


                    <br />

                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%', marginBottom: 10 }}
                            placeholder="Select Vendor"
                            onChange={handleVendorFilterChange}
                            value={selectedVendors}
                        >
                            {uniqueVendors.map((vendor, index) => (
                                <Option key={index} value={vendor as string}>
                                    {vendor as string}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <br />
                    <Col>
                        <RangePicker onChange={handleDateChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button type="primary" onClick={handleGetReport}>
                            Get Report
                        </Button>

                    </Col>

                    <Col>
                        <Button type="primary" danger icon={<UndoOutlined />}
                            style={{ marginLeft: "5px" }}
                            onClick={handleCancel}>
                            Reset
                        </Button>

                    </Col>
                </Row>

                {tableDisabled ? null : (
                    <Table
                        size="small"
                        columns={columns}
                        dataSource={filteredData}
                        pagination={false}
                        bordered
                        style={{ marginTop: 20 }}
                        className='custom-table'
                    />
                )}
            </Card>
        </div>
    );
};

export default InvoiceReport;


