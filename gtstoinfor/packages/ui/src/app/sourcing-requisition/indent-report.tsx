import { IndentService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { DataSource } from 'typeorm';
import { useForm } from 'antd/lib/form/Form';
const { Option } = Select;

export const IndentReport = () => {
    const service = new IndentService();
    const [data, setData] = useState<any[]>([]);
    const [drop, dropDown] = useState<any[]>([]);
    const [table, setTable] = useState<any[]>([]);

    const [form] = Form.useForm();

    const page = 1;
    useEffect(() => {
        getIndentData();
        getAll();
    }, []);

    const getIndentData = () => {
        service.getIndentData().then((res) => {
            if (res.status) {
                setData(res.data);
            }
        });
    }
    
    const getAll = () => {
        service.getIndentDropDown().then(res => {
            if (res.status) {
                dropDown(res.data)
            }
        })
    }
    const renderCellData = (data) => {
        return data ? data : "-";
      }
      
    const onSearch = () => {
        let filterData = []
        if (form.getFieldValue('requestNo') !== undefined) {
            const requestNo = form.getFieldValue('requestNo')
            filterData = data.filter((e) => e.indentDate === requestNo)
        } else if (form.getFieldValue('indentDate') !== undefined) {
            const indentDate = form.getFieldValue('indentDate')
            filterData = data.filter((e) => e.requestNo === indentDate)
        }
        dropDown(filterData)
    }

    const columns: any = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1),
            onCell: (record: any) => ({
                rowSpan: record.rowSpan,
            }),
            fixed: 'left',
        },
        // {
        //     title: "Indent Code",
        //     dataIndex: "requestNo",
        //     width: "110px",
        //     onCell: (record: any) => ({
        //         rowSpan: record.rowSpan,
        //     }),
        //     fixed: 'left',
        // },
        {
            title: "Indent Code",
            dataIndex: "requestNo",
            width:'150px'
      
          },
       
        {
            title: "Style",
            dataIndex: "style",
            width:'150px'
      
          },
          {
            title: "Indent Date",
            dataIndex: "indentDate",
            width:'150px', render: (text, record) => { return record.deliveryDate !== null ? moment(record.deliveryDate).format('YYYY-MM-DD') : "" },
      
          },
          {
            title: "Expected Date",
            dataIndex: "expectedDate",
            width:'150px',
            render: (text, record) => { return record.deliveryDate !== null ? moment(record.deliveryDate).format('YYYY-MM-DD') : "" },
      
          }, 
          {
            title: <div style={{ textAlign: 'center' }}>Material Type</div>,
            dataIndex: "i_items",
            key: "i_items",
            align: 'center',
            render: (i_items, text) => {
              renderCellData(text)
              return (
                <Table
                  dataSource={i_items}
                  columns={[
                    {
                      dataIndex: "materialtype",
                      key: "materialtype", align: 'center',
                    },
      
                  ]}
                  pagination={false}
                />
              );
            }
          },
          {
            title: <div style={{ textAlign: 'center' }}>Material Code</div>,
            dataIndex: "mi_items",
            key: "mi_items",
            align: 'center',
            render: (mi_items, text) => {
              renderCellData(text)
              return (
                <Table
                  dataSource={mi_items}
                  columns={[
                    {
                      dataIndex: "trimCode/m3FabricCode",
                      key: "trimCode/m3FabricCode", align: 'center',
                    },
      
                  ]}
                  pagination={false}
                />
              );
            }
          },
          {
            title: <div style={{ textAlign: 'center' }}>Colour</div>,
            dataIndex: "i_items",
            key: "i_items",
            align: 'center',
            render: (i_items, text) => {
              renderCellData(text)
              return (
                <Table
                  dataSource={i_items}
                  columns={[
                    {
                      dataIndex: "color",
                      key: "color", align: 'center',
                    },
      
                  ]}
                  pagination={false}
                />
              );
            }
          },
          {
            title: <div style={{ textAlign: 'center' }}>Quantity</div>,
            dataIndex: "i_items",
            key: "i_items",
            align: 'center',
            render: (i_items, text) => {
              renderCellData(text)
              return (
                <Table
                  dataSource={i_items}
                  columns={[
                    {
                      dataIndex: "quantity",
                      key: "quantity", align: 'center',
                    },
      
                  ]}
                  pagination={false}
                />
              );
            }
          },
          {
            title: <div style={{ textAlign: 'center' }}>M3 Code</div>,
            dataIndex: "i_items",
            key: "i_items",
            align: 'center',
            render: (i_items, text) => {
              renderCellData(text)
              return (
                <Table
                  dataSource={i_items}
                  columns={[
                    {
                      dataIndex: "m3Code",
                      key: "m3Code", align: 'center',
                    },
      
                  ]}
                  pagination={false}
                />
              );
            }
          },
          {
            title: "Status",
            dataIndex: "status",
            width:'150px'
      
          },
        
    ]
  return (
        <div>
            <Card title="Indent Report" className='card-header'>
                <Form form={form}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label='Indent Code' style={{ marginBottom: '10px' }} name={'requestNo'}>
                                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Indent Code' >

                                    {drop.map(e => {
                                        return (
                                            <Option key={e.requestNo} value={e.requestNo} name={e.requestNo}> {e.requestNo}</Option>
                                        )
                                    })}   </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name={'indentDate'} label='Indent Date' style={{ marginBottom: '10px' }}>
                                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Indent Date' >

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item style={{ marginBottom: '10px' }}>
                                <Button
                                    htmlType='submit'
                                    type="primary"
                                    style={{ width: '80px', marginRight: "10px" }}

                                    onClick={onSearch}
                                >Submit</Button>
                                <Button htmlType='reset' danger style={{ width: '80px' }}>Reset</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={data} bordered />
            </Card>
        </div>

    )


}

export default IndentReport;