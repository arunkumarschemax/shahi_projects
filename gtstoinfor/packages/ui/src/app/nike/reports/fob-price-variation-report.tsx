import { DownOutlined, SearchOutlined, UndoOutlined, UpOutlined } from "@ant-design/icons";
import { FobPriceDiffRequest } from "@project-management-system/shared-models";
import { NikeService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Row, Select, Table, Typography } from "antd"
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { receiveMessageOnPort } from "worker_threads";
const { Text } = Typography

export const FOBPriceVariationReport = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const service = new NikeService()
    const [data, setData] = useState<any[]>([]);
    const [poAndLine,setPoAndLine] = useState<any>([]); 
    const [poNumber, setPoNumber] = useState<any>([]);
    const [styleNumber, setStyleNumber] = useState<any>([]);
    const [size, setSize] = useState<any>([]);

    const [form] = Form.useForm();
    const { Option } = Select;



    useEffect(() => {
        getData()
        PoandLine()
        getSize()
        StyleNumber ()
        getSize()
    }, [])

    



    
    const getSize = ()=>{
        service.getPriceDiffSizeDescription().then(res => {
            if(res.status){
                setSize(res.data)
            }
        })
    }
    
    const PoandLine = () => {
        service.getPriceDiffPoLinedd().then(res => {
            if (res.status) {
                setPoNumber(res.data)
            }
        })
    }
    
    const StyleNumber = () => {
        service.getPriceDiffStyleNumber().then(res => {
            if (res.status) {
                setStyleNumber(res.data)
            }
        })
    }
    const getData = () => {
        const req = new FobPriceDiffRequest();

        if (form.getFieldValue('poandLine') !== undefined) {
            req.poAndLine = form.getFieldValue('poandLine');
          }
          if (form.getFieldValue('styleNumber') !== undefined) {
            req.styleNumber = form.getFieldValue('styleNumber');
          }
          if (form.getFieldValue('sizeDescription') !== undefined) {
            req.sizeDescription = form.getFieldValue('sizeDescription');
          } 
        if (form.getFieldValue('poNumber') !== undefined) {
            req.poNumber = form.getFieldValue('poNumber');
        }
         
        service.getPriceDifferenceReport(req).then(res => {
            if (res.status) {
                setData(res.data)
            }
            else{
                setData([])
            }
            
        })
    }
    const resetHandler = () => {
        form.resetFields();
        getData();

    }

    const columns: ColumnProps<any>[] = [
        {
            title: 'S.No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        {
            title: 'PO And Line',
            dataIndex: 'poAndLine',            align:'center'

        },

        {
            title: 'Style Number',
            dataIndex: 'styleNumber',
            align:'center'
        },
        {
            title: 'Size Description',
            dataIndex: 'sizeDescription',            align:'center'

        },
        {
            title: 'Gross Price',
            dataIndex: 'grossPriceFob',
            align: 'center',
            render: (text, record) => {
                return (
                    <>
                        {record.grossPriceFob ? ` ${record.fobCurrencyCode}${' --- '}${record.grossPriceFob}` : '-'}
                    </>
                )
            }
        },
        {
            title: 'Shahi Confirmed Gross Price',
            dataIndex: 'shahiConfirmedgrossPrice',
            align: 'center',
            render: (text, record) => {
                return (
                    <>
                        {record.shahiConfirmedgrossPrice ? `${record.shahiCurrencyCode}${' --- '} ${record.shahiConfirmedgrossPrice} ` : '-'}
                    </>
                )
            }
        },
        {
            title: 'Difference',
            dataIndex: 'difference',
            align: 'right',
            render: (text, record) => {
                
                let diff;
                let convertedPrice;
                if (record.fobCurrencyCode === 'PHP') {
                    convertedPrice = record.grossPriceFob * 0.01765;
                } else if (record.fobCurrencyCode === 'TWD') {
                    convertedPrice = record.grossPriceFob * 0.0314;
                } else if (record.fobCurrencyCode === 'THB') {
                    convertedPrice = record.grossPriceFob * 0.0284;
                } else if (record.fobCurrencyCode === 'CNY') {
                    convertedPrice = record.grossPriceFob * 0.1377;
                } else if (record.fobCurrencyCode === 'NZD') {
                    convertedPrice = record.grossPriceFob * 0.5944;
                } else if (record.fobCurrencyCode === 'AUD') {
                    convertedPrice = record.grossPriceFob * 0.6450;
                } else if (record.fobCurrencyCode === 'EUR') {
                    convertedPrice = record.grossPriceFob * 1.0776;
                } else if (record.fobCurrencyCode === 'USD') {
                    convertedPrice = record.grossPriceFob * 1;
                } else if (record.fobCurrencyCode === 'HKD') {
                    convertedPrice = record.grossPriceFob * 0.13;
                }
                diff = record.shahiConfirmedgrossPrice - convertedPrice
                const color = diff < 0 ? 'red' : diff > 0 ? 'green' : 'black';
                const arrowIcon = diff < 0 ? <DownOutlined /> : diff > 0 ? <UpOutlined /> : null;
                return (
                    
                    <>
                    <span style={{ color }}>
                    {arrowIcon} {record.grossPriceFob ? Number(diff).toLocaleString('en-IN') : '-'}
                        </span>
                        {/* return diff !== 0 ? Number(diff).toLocaleString('en-IN') : ''; */}
                    {/* return diff !== 0 ? Number(diff).toLocaleString('en-IN') : ''; */}
                    </>
                )
            }
        },
        

    ]


    return (
        <Card title='FOB Price Variation'  >
            <Form onFinish={getData} form={form} layout='vertical'>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='poNumber' label='Po Number' >
                            <Select
                                showSearch
                                placeholder="Select Po Number"
                                optionFilterProp="children"
                                allowClear
                            >
                                {
                                    poNumber?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.poNumber}>{inc.poNumber}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='styleNumber' label='Style Number' >
                            <Select
                                showSearch
                                placeholder="Select Style Number"
                                optionFilterProp="children"
                                allowClear
                            >
                                {
                                    styleNumber?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.styleNumber}>{inc.styleNumber}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='sizeDescription' label='Size Description' >
                            <Select
                                showSearch
                                placeholder="Select Size Description"
                                optionFilterProp="children"
                                allowClear
                            >
                                {
                                    size?.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.sizeDescription}>{inc.sizeDescription}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '15px' }}>
                        <Form.Item>
                            <Button htmlType="submit"
                                icon={<SearchOutlined />}
                                type="primary">Get Report</Button>
                            <Button
                                htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={resetHandler}
                            >
                                RESET
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <>
                {data.length > 0 ? (
                    <Table columns={columns} dataSource={data}
                    
                        className="custom-table-wrapper" 
                        
                        scroll={{ x: 'max-content', y: 500}}
                        pagination={{
                            pageSize:50,
                            onChange(current, pageSize) {
                                setPage(current);
                                setPageSize(pageSize);
                            }}}
                        // summary={(pageData) => {
                        //     let totalDifference = 0;

                        //     pageData.forEach(({ difference }) => {
                        //         if (Number(difference)) {
                        //             totalDifference += Number(difference)
                        //         }
                        //     })

                        //     return (
                        //         <>
                        //             <Table.Summary.Row className="tableFooter">
                        //                 <Table.Summary.Cell index={14} colSpan={6}><Text>Total</Text></Table.Summary.Cell>
                        //                 <Table.Summary.Cell index={15} colSpan={1}></Table.Summary.Cell>
                        //                 <Table.Summary.Cell index={15} colSpan={1}>{totalDifference}</Table.Summary.Cell>
                        //             </Table.Summary.Row>
                        //         </>
                        //     )
                        // }}
                    />)
                    : (<Table size='large' />)}
            </>
        </Card>
    )
}

export default FOBPriceVariationReport
