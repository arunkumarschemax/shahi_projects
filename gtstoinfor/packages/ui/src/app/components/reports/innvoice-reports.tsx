import { EditOutlined } from '@ant-design/icons';
import { VendorFilterModel } from '@xpparel/shared-models';
import { SharedService } from '@xpparel/shared-services';
import { Card, Table, DatePicker, message, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';

const InvoiceReport = () => {
    const [formData, setFormData] = useState<any>([]);

    const { RangePicker } = DatePicker;
    const services = new SharedService();

    const getdata = () => {
        const req = new VendorFilterModel();
        // Modify req as needed before making the API call

        console.log(req, "reqqqqqqqqqqqq");
        services
            .getdata(req)
            .then((res) => {
                if (res.status) {
                    setFormData(res.data);
                    message.success("Data Retrieved Successfully");
                } else {
                    setFormData([]);
                    message.error("NO DATA FOUND");
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        getdata();
    }, []); // Empty dependency array ensures that the effect runs only once

    const columns: ColumnsType<any> = [
        {
            title: "Vendor Name",
            dataIndex: "venName",
            key: "venName",
            align: "center" as const, // Make sure to set align to a valid value from the AlignType enum
            sorter: (a, b) => a.venName.localeCompare(b.venName),
            render: (text: any, record: { venName: any }) => {
                return <>{record.venName ? record.venName : "-"}</>;
            },
        },
        {
            title: "Invoice Number",
            dataIndex: "invoiceNumber",
            key: "invoiceNumber",

            sorter: (a, b) => a.invoiceNumber.localeCompare(b.invoiceNumber),
            align: "center",
            render: (text: any, record: { invoiceNumber: any }) => {
                return <> {record.invoiceNumber ? record.invoiceNumber : "-"} </>;
            },
        }
    ];

    const handleDateChange = (dates, dateStrings) => {
        // Handle the date range change here
        console.log('Selected Dates: ', dateStrings);
        // You can fetch the data according to the selected date range and update the 'formData' state accordingly
    };

    return (
        <div style={{ padding: '16px' }}>

            <Card title={<span><EditOutlined style={{ marginRight: '8px' }} />Invoice Reports</span>}>
                <Row gutter={24}>
                    <RangePicker onChange={handleDateChange} />
                </Row>
                <br />
                {/* <Row gutter={24}>

                    <Col span={3}>
                        <Card title={'DHL Count : ' + formData.filter(el => el.venName === "DHL Logistics Pvt. Ltd.").length} style={{ backgroundColor: '#A5F5D7', height: 50, alignItems: 'center' }}></Card>
                    </Col>
                </Row> */}

<Row>  <Col ><Card title={'DHL Count : ' + formData.filter(el => el.venName === "DHL Logistics Pvt. Ltd.").length} style={{ textAlign: 'center', marginBottom: 10, marginRight: 60, width: 180, height: 35, backgroundColor: 'lightgreen', borderRadius: 3 }} size="small" bodyStyle={{ display: 'none' }}></Card>
      </Col>
      </Row>



                <Table size="small" columns={columns} dataSource={formData} pagination={false} />

            </Card>
        </div>
    );
};

export default InvoiceReport;
