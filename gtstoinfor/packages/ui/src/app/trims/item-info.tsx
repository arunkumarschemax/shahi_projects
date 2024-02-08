import { SearchOutlined, UndoOutlined } from "@ant-design/icons"
import { ItemInfoFilterReq } from "@project-management-system/shared-models"
import { BomService } from "@project-management-system/shared-services"
import { Button, Card, Col, DatePicker, Form, Row, Select, Table } from "antd"
import FormItem from "antd/es/form/FormItem"
import dayjs from "dayjs"
import moment from "moment"
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const {RangePicker} = DatePicker
const {Option} = Select

export const ItemInfo = () => {
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);
    const [form] = Form.useForm()
    const service = new BomService()
    const [itemInfo,setItemInfo] = useState<any[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [itemDropdownData,setItemDropdownData] = useState<any[]>([])
    const [regionDropdownData,setRegionDropdownData] = useState<any[]>([])
    const navigate = useNavigate()
    const [styleNumberArray,setStyleNumberArray] = useState<any[]>([])
    const [itemArray,setItemArray] = useState<any[]>([])


    const columns:any[] = [
        {
            title: "S.No",
            width: 120,
            render: (_text: any, record: any, index: number) => {
              const continuousIndex = (page - 1) * pageSize + index + 1;
              return <span>{continuousIndex}</span>;
            },
        },
        {
            title:'Item',
            dataIndex:'item'
        },
        {
            title:'Style',
            dataIndex:'styleNumber'
        },
        {
            title:'Region',
            dataIndex:'regionInfo',
            render : (text,record) => {
                const info = []
                {record.regionInfo.map(e => {
                    info.push(e.geoCode)
                })}
                return(
                    <>
                    {info.join(' / ')}
                    </>
                )
            }
        },
        // {
        //     title:'Destination',
        //     dataIndex:'destination_country'
        // },
        {
            title:'Quantity',
            dataIndex:'totalItemQty'
        }
    ]

    const onSearch = (val) => {
        const req = new ItemInfoFilterReq()
        req.fromDate = dayjs(val.createdAt[0]).format('YYYY-MM-DD')
        req.toDate = dayjs(val.createdAt[1]).format('YYYY-MM-DD')
        if(val.item != undefined){
            req.item = val.item
        }
        if(val.region != undefined){
            req.region = val.region
        }
        service.getItemInfo(req).then(res => {
            if(res.status){
                setItemInfo(res.data)
            }else{
                setItemInfo([])
            }
        })
    }

    const onSelectChange = (newSelectedRowKeys: any) => {
        const len = newSelectedRowKeys.length
        setSelectedRowKeys(newSelectedRowKeys);
          if(!(styleNumberArray.includes(newSelectedRowKeys[len-1]?.styleNumber))){
              setStyleNumberArray([...styleNumberArray,newSelectedRowKeys[len-1]?.styleNumber])
          }
          if(!(itemArray.includes(newSelectedRowKeys[len-1]?.item))){
              setItemArray([...itemArray,newSelectedRowKeys[len-1]?.item])
          }
      };

      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onReset = () => {
        form.resetFields()
        setItemInfo([])
        setSelectedRowKeys([])
    } 

    const createdDateHandler = (val) => {
        const req = new ItemInfoFilterReq()
        req.fromDate = dayjs(val[0]).format('YYYY-MM-DD')
        req.toDate = dayjs(val[1]).format('YYYY-MM-DD')
        service.getItemDropdownByCreatedAt(req).then(res => {
            if(res.status){
                setItemDropdownData(res.data)
            }else{
                setItemDropdownData([])
            }
        })
        service.getRegionDropdownByCreatedAt(req).then(res => {
            if(res.status){
                setRegionDropdownData(res.data)
            }else{
                setRegionDropdownData([])
            }
        })
    }

    const onGenerate = () => {
        navigate('/bom/trim-List',{state:{info:selectedRowKeys,styleNumbers:styleNumberArray,items:itemArray,createdDate:form.getFieldValue('createdAt')}})
    }


    return(
        <Card>
            <Form layout="vertical" form={form} onFinish={onSearch}>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}  >
                    <Form.Item name='createdAt' label='Created Date' rules={[{required:true,message:'Created Date is required'}]}>
                        <RangePicker style={{width:'100%'}} onChange={createdDateHandler}/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                    <Form.Item name='item' label='Item' >
                        <Select placeholder='Select Item' showSearch >
                            {
                                itemDropdownData.map(e => {
                                    return(
                                        <Option key={e.item} value={e.item}>{e.item}</Option>
                                    )
                                })
                            }

                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                    <Form.Item name='region' label='Region'>
                        <Select placeholder='Select Region'>
                            {
                                regionDropdownData.map(e => {
                                    return(
                                        <Option key={e.geoCode} value={e.geoCode}>{e.geoCode} </Option>
                                    )
                                })
                            }

                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 2 }}>
                        <Form.Item style={{marginTop:'23%'}}>
                            <Button icon={<SearchOutlined/>} type="primary" htmlType="submit">Search</Button>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 2 }}>
                        <Form.Item style={{marginTop:'23%'}}>
                            <Button icon={<UndoOutlined/>} danger onClick={onReset}>Reset</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
      
            {itemInfo.length > 0 ? (<>
                <Row justify={'end'}>
                    <Button onClick={onGenerate} disabled={selectedRowKeys.length > 0 ? false : true} type='primary'>Generate</Button>
                </Row>
                <br/>
                <Table rowKey={record => record} columns={columns} dataSource={itemInfo} 
            rowSelection={rowSelection}
            size='small' bordered
            pagination={{
              pageSize: 50,
              onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize);
              }
            }}
            scroll={{  y: 450 }}
            />
            </>) : (<></>) }

        </Card>
    )

}

export default ItemInfo