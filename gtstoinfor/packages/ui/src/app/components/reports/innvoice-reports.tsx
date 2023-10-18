import { EditOutlined, DownloadOutlined } from '@ant-design/icons';
import { VendorFilterModel, VendorNameEnum } from '@xpparel/shared-models';
import { SharedService } from '@xpparel/shared-services';
import { Card, Table, DatePicker, message, Col, Row, Select, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import * as XLSX from 'xlsx';

const { RangePicker } = DatePicker;
const { Option } = Select;

const InvoiceReport = () => {
    const [formData, setFormData] = useState<any>([]);
    const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
    const [filteredData, setFilteredData] = useState<any>([]);
    const [tableDisabled, setTableDisabled] = useState<boolean>(true);

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
            align: 'center' as const,
            render: (text: any, record: any, index: number) => {
                return <span>{index + 1}</span>;
            },
        },
        {
            title: 'Vendor Name',
            dataIndex: 'venName',
            key: 'venName',
            align: 'center' as const,
            sorter: (a, b) => a.venName.localeCompare(b.venName),
            render: (text: any, record: { venName: any }) => {
                return <>{record.venName ? record.venName : '-'}</>;
            },
        },
        {
            title: 'Invoice Number',
            dataIndex: 'invoiceNumber',
            key: 'invoiceNumber',
            sorter: (a, b) => a.invoiceNumber.localeCompare(b.invoiceNumber),
            align: 'center',
            render: (text: any, record: { invoiceNumber: any }) => {
                return <>{record.invoiceNumber ? record.invoiceNumber : '-'}</>;
            },
        },
    ];


    const handleDateChange = (dates, dateStrings) => {
        console.log('Selected Dates: ', dateStrings);
        const startDate = dateStrings[0];
        const endDate = dateStrings[1];

        const filteredByDate = formData.filter(item => {
            if (item.createdAt) {
                return item.createdAt >= startDate && item.createdAt <= endDate;
            }
            return false;
        });

        setFilteredData(filteredByDate);
    };
    const handleVendorFilterChange = (value: string | string[]) => {
        if (Array.isArray(value)) {
            setSelectedVendors(value);
        } else if (value) {
            setSelectedVendors([value]);
        } else {
            setSelectedVendors([]);
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

        setFilteredData(dataToSet);
        setTableDisabled(false);
    };


    const handleExportToExcel = () => {
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const filename = 'invoice_report.xlsx';
        const formattedData = filteredData.map((item, index) => {
            return {
                'S.No': index + 1,
                'Vendor Name': item.venName,
                'Invoice Number': item.invoiceNumber,
            };
        });
        const ws = XLSX.utils.json_to_sheet(formattedData);

        ws['!cols'] = [{ width: 20 }, { width: 20 }];

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
                        style={{ marginLeft: 10, marginTop: 10 }}
                        onClick={handleExportToExcel}
                        icon={<DownloadOutlined />}
                    >
                        Export to Excel
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
                    <Col>
                        <RangePicker onChange={handleDateChange} />
                    </Col>

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
                </Row>
                <Row>
                    <Col>
                        <Button type="primary" style={{ marginTop: 10 }} onClick={handleGetReport}>
                            Get Report
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
                    />
                )}
            </Card>
        </div>
    );
};

export default InvoiceReport;
