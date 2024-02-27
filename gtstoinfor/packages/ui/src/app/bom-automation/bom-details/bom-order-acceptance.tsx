import { SearchOutlined, UndoOutlined } from "@ant-design/icons"
import { Button, Card, Col, DatePicker, Descriptions, Divider, Form, Input, Modal, Row, Select, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useEffect, useRef, useState } from "react"
import Highlighter from 'react-highlight-words';

const BomOrderAcceptance = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [page, setPage] = useState<number>(1);
    const [data,setData] = useState<any[]>([])
    const [form] = Form.useForm()


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
      };

      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onReset = () => {
        form.resetFields()
        setData([])
        setSelectedRowKeys([])
    }
    const columns :any = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            key:'Employee Code',
            title: 'Employee Code',
            dataIndex:'employee_code',

        },
        {
            key:'Employee ',
            title: 'Employee Name',
            dataIndex:'employee_name',


        },
        {
            key:'Employee t',
            title: 'Department',
            dataIndex:'dept_name',
      },
        {
            key:'Employee d',
            title: 'Designation',
            dataIndex:'designation',
        }
    ]

  return (
    <Card>
    <Table rowKey={record => record.employee_id} columns={columns}
     rowSelection={rowSelection} pagination={false}/>

    </Card>
    //  dataSource={} 

  )
}
export default BomOrderAcceptance