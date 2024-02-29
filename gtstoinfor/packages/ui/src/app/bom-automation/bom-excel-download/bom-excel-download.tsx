import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { BomCreationFiltersReq, BomExcelreq } from '@project-management-system/shared-models';
import { BomService } from '@project-management-system/shared-services';
import { Alert, Button, Card, Form, Row, Select, Table } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertMessages } from './../../common/common-functions/alert-messages';
import { Col } from 'antd/lib';

export const BomExcelDownload = () => {
    const [form] = Form.useForm()
    const { Option } = Select;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [data, setData] = useState<any[]>([]);
    const [excelData, setExcelData] = useState<any[]>([]);
    const Service = new BomService();
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
    const [style, setStyle] = useState<any[]>([]); 
    const [geoCode, setGeoCode] = useState<any[]>([]); 
    
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };


    useEffect(() => {
        getBomExcel();
        getGeoCode();
        getStyle();
    }, []);

    const getBomExcel = (value?: any) => {
        const req = new BomCreationFiltersReq();
        if (form.getFieldValue('style') != undefined) {
            req.style = form.getFieldValue('style')
        }
        if (form.getFieldValue('geoCode') != undefined) {
            req.geoCode = form.getFieldValue('geoCode')
        }
        Service.getbomExcel(req).then(res => {
            if (res.status) {
                setData(res.data);
             
            } else {
                setData([]);
                

            }
        }).catch(err => console.log(err.message));
    }



    const getStyle = () => {
        Service.getStyle().then(res => {
            if (res.status) {
                setStyle(res.data)
            }
        })
    }

    const getGeoCode = () => {
        Service.getGeoCode().then(res => {
            if (res.status) {
                setGeoCode(res.data)
            }
        })
    }

    
    // const getBom = (selectedRowKeys)=>{
    //     const selectedRecords = data.filter(record => selectedRowKeys.includes(record));
    //         const updateRequests = selectedRecords.map((record) => {
    //             const req = new BomExcelreq();
    //             req.style = record.style[record.key];
    //                         return req;
    //         });

    //     console.log(updateRequests,"updateRequests")

    //     // Service.getbom(req).then(res => {
    //     //     if (res.status) {
    //     //         setExcelData(res.data);
    //     //     }  
    //     // })
    //     exportExcel()

    // }
    const getBoms = (selectedRowKeys) => {
        console.log(selectedRowKeys, 'ttttttttttttttttttttt')
        const updateRequests = selectedRowKeys.map((record) => {
            const req = new BomExcelreq();
            req.style = record.style;
            return req;

        });
        updateRequests.map(req => Service.getbom(req).then(res => {
            console.log(res);
            if (res.status) {

                // const excelData = res.map(res => res.status ? res.data : null);
                setExcelData(res.data);
                exportExcel(res.data);
            } else {
                AlertMessages.getErrorMessage('not data found for excel download')
            }
        }))
        // Promise.all(updateRequests.map(req => Service.getbom(req)))
        //     .then(responses => {
        //         console.log(responses,'uuuuuuuuuu');

        //         const excelData = responses.map(res => res.status ? res.data : null);
        //         setExcelData(excelData);
        //         exportExcel();
        //     })
        //     .catch(error => {
        //         // Handle error
        //         console.error("Error fetching BOM data:", error);
        //     });
    };


    const getBom = () => {
        Service.getbom(selectedRowKeys).then(res => {
            if (res.status) {
                console.log(res.data)
                exportExcel(res.data)
            }
        }).catch(err => console.log(err.message))
    }

    const onReset = () => {
        form.resetFields();
        getBomExcel()
    }

    const columns: any[] = [
        {
            title: 'S No',
            dataIndex: 'sno',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1) + (pageSize * (page - 1))
        },
        {
            title: 'Geo Code',
            dataIndex: 'geo_code',
        },
        {
            title: 'Item',
            dataIndex: 'item',
        },
        {
            title: 'Style',
            dataIndex: 'style',
        },
        {
            title: 'Style Quantity',
            dataIndex: 'style_number_count',
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const excelColumns = [
        { title: 'S No', dataIndex: 'sNo', render: (text: any, object: any, index: any) => index + 1 },
        { title: 'Bom Id', dataIndex: 'bom_id',  },
        { title: 'Bom Qty', dataIndex: 'bom_qty',  },
        { title: 'Item Code', dataIndex: 'im_code',   },
    ];

    const exportExcel = (data: any) => {
        console.log('yyyyyyyyyyyyyy');

        const excel = new Excel();
        excel
            .addSheet('BOM Excel')
            .addColumns(excelColumns)
            .addDataSource(data, { str2num: true })
            .saveAs('Bom.xlsx');
    }



    return (
        <Card title='Style BOM ' extra={
            <span style={{ color: 'white' }} > </span>
        }>
            <Form form={form} layout='vertical'>
                    <Row gutter={24}>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 11 }} lg={{ span: 6 }} xl={{ span: 5 }} >
                            <Form.Item name='style' label='Style'>
                            <Select
                                showSearch
                                placeholder="Select Style"
                            >
                                {
                                    style?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.style}>{inc.style}</Option>
                                    })
                                }
                            </Select>
                            </Form.Item>
                        </Col>
                        &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; 
                        <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 11 }} lg={{ span: 6 }} xl={{ span: 5 }} >
                            <Form.Item name='geo_code' label='Geo Code'>
                            <Select
                                showSearch
                                placeholder="Select Geo Code"
                            >
                                {
                                    geoCode?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.geoCode}>{inc.geoCode}</Option>
                                    })
                                }
                            </Select>
                            </Form.Item>
                        </Col>
                        &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; 
                        <Col>
                            <Button type='primary' onClick={getBomExcel} style={{ marginTop: '22px',backgroundColor:"green" }} icon={<SearchOutlined/>}>Search</Button>
                        </Col>
                        &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; 
                        <Col >
                            <Button onClick={onReset} type='primary' icon={<UndoOutlined />} style={{ marginTop: '22px',backgroundColor:"red" }}>Reset</Button>
                        </Col>
                    </Row>
                </Form>
            
            <Row justify={'end'}>
                <Button type="default"
                    style={{ color: "green" }}
                    onClick={() => getBom()}
                    icon={<FileExcelFilled />}
                >
                    Download Excel
                </Button>
            </Row>
            <Table className="custom-table-wrapper"
                // rowKey={(rowData) => rowData.dpom_id}
                rowSelection={rowSelection}
                rowKey={record => record.dpom_id}
                columns={columns} dataSource={data} size='small'
                pagination={{
                    pageSize: 100,
                    onChange(current, pageSize) {
                        setPage(current);
                        setPageSize(pageSize);
                    }
                }}
            />
        </Card>
    )
}

