import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { NikeService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Row, Select, Table } from "antd"
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { receiveMessageOnPort } from "worker_threads";

export const FOBPriceVariationReport = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const service = new NikeService()
    const [data,setData] = useState<any[]>([]);
    const [poAndLine,setPoAndLine] = useState<any>([]);
    const [form] = Form.useForm();
    const { Option } = Select;



    useEffect(() => {
        getData()
        PoandLine()
    },[])

    

    const PoandLine = ()=>{
        service.getPriceDiffPoLinedd().then(res => {
            if(res.status){
                setPoAndLine(res.data)
            }
        })
    }
    const getData = () => {

        service.getPriceDifferenceReport().then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }
    const resetHandler = () => {
        form.resetFields();
        getData();

    }

    const columns:  ColumnProps<any>[] = [
        {
            title: 'S.No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            
        },
        {
            title:'PO And Line',
            dataIndex :'poAndLine'
        },
       
        {
            title:'Style Number',
            dataIndex :'styleNumber'
        },
        {
            title:'Size Description',
            dataIndex :'sizeDescription'
        },
        {
            title:'Gross Price',
            dataIndex :'grossPriceFob',
            align:'right',
            render:(text,record) => {
                return(
                    <>
                    {record.grossPriceFob ? `${record.grossPriceFob} ${record.fobCurrencyCode}` : '-'}
                    </>
                )
            }
        },
        {
            title:'Shahi Confirmed Gross Price',
            dataIndex :'shahiConfirmedgrossPrice',
            align:'right',
            render:(text,record) => {
                return(
                    <>
                    {record.shahiConfirmedgrossPrice ? `${record.shahiConfirmedgrossPrice} ${record.shahiCurrencyCode}` : '-'}
                    </>
                )
            }
        },
        {
            title:'Difference',
            dataIndex :'difference',
            align:'right',
            render:(text,record) => {
                let diff;
                let convertedPrice;
                console.log(record.fobCurrencyCode)
                if(record.fobCurrencyCode === 'PHP'){
                    convertedPrice = record.grossPriceFob*0.01765;
                } else if(record.fobCurrencyCode === 'TWD'){
                    convertedPrice = record.grossPriceFob*0.0314;
                }else if(record.fobCurrencyCode === 'THB'){
                    convertedPrice = record.grossPriceFob*0.0284;
                }else if(record.fobCurrencyCode === 'CNY'){
                    convertedPrice = record.grossPriceFob*0.1377;
                }else if(record.fobCurrencyCode === 'NZD'){
                    convertedPrice = record.grossPriceFob*0.5944;
                }else if(record.fobCurrencyCode === 'AUD'){
                    convertedPrice = record.grossPriceFob*0.6450;
                } else if(record.fobCurrencyCode === 'EUR'){
                    convertedPrice = record.grossPriceFob*1.0776;
                } else if(record.fobCurrencyCode === 'USD'){
                    convertedPrice = record.grossPriceFob*1;
                } 
                console.log(convertedPrice)
                diff = record.shahiConfirmedgrossPrice - convertedPrice
                console.log(diff)
                return(
                    <>
                    {record.grossPriceFob ? Number(diff).toLocaleString('en-IN'): '-'}
                    </>
                )
            }
        },

    ]

    return(
        <Card title='FOB Price Variation' >
            <Form onFinish={getData} form={form} layout='vertical'>
                <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                            <Form.Item name='poandLine' label='Po+Line' >
                                <Select
                                    showSearch
                                    placeholder="Select Po+Line"
                                    optionFilterProp="children"
                                    allowClear

                                >
                                    {poAndLine.map((inc: any) => {
                                        return <Option key={inc.id} value={inc.poAndLine}>{inc.poAndLine}</Option>
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
            <Table  columns={columns} dataSource={data} 
            className="custom-table-wrapper" pagination={{
            onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize)
            }
            
        }}/>
        
            
        </Card>
    )

}

export default FOBPriceVariationReport