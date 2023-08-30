import React, { useState } from 'react';
import { Table, Button, Input, Select, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const SizeDetail = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const handleAddRow = () => {
    const newRow = {
      key: count,
    };
    setData([...data, newRow]);
    setCount(count + 1);
  };

  const handleInputChange = (e, key, field) => {
    const updatedData = data.map((record) => {
      if (record.key === key) {
        return { ...record, [field]: e.target.value };
      }
      return record;
    });
    setData(updatedData);
  };

  const handleDelete = (key) => {
    const updatedData = data.filter((record) => record.key !== key);
    setData(updatedData);
  };

  const calculateTotal = (size) => {
    return data.reduce((total, record) => total + parseInt(record[size] || 0), 0);
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Color',
      dataIndex: 'color',
      width:"25%",
      render: (_, record) => (
        <Select
          value={record.color}
          onChange={(e) => handleInputChange(e, record.key, 'color')}
          style={{width:"100%"}}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Select Color"
        >
          </Select>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      width:"10%",
      children :[
        {
          title: 'XS',
          dataIndex: 'xs',
          render: (_, record) => (
            <Input
              value={record.xs}
              onChange={(e) => handleInputChange(e, record.key, 'xs')}
              type='number'
              min={0}
            />
          ),
        },
        {
          title: 'S',
          dataIndex: 'small',
          render: (_, record) => (
            <Input
              value={record.s}
              onChange={(e) => handleInputChange(e, record.key, 's')}
              type='number'
              min={0}
            />
          ),
        },
        {
          title: 'M',
          dataIndex: 'medium',
          render: (_, record) => (
            <Input
              value={record.m}
              onChange={(e) => handleInputChange(e, record.key, 'm')}
              type='number'
              min={0}
            />
          ),
        },
        {
          title: 'L',
          dataIndex: 'large',
          render: (_, record) => (
            <Input
              value={record.l}
              onChange={(e) => handleInputChange(e, record.key, 'l')}
              type='number'
              min={0}
            />
          ),
        },
        {
          title: 'XL',
          dataIndex: 'xl',
          render: (_, record) => (
            <Input
              value={record.xl}
              onChange={(e) => handleInputChange(e, record.key, 'xl')}
              type='number'
              min={0}
            />
          ),
        },
        {
          title: 'XXL',
          dataIndex: 'xxl',
          render: (_, record) => (
            <Input
              value={record.xxl}
              onChange={(e) => handleInputChange(e, record.key, 'xxl')}
              type='number'
              min={0}
            />
          ),
        },
      ],
    },
    
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Button onClick={() => handleDelete(record.key)}><Tooltip title="Delete Row"><DeleteOutlined /></Tooltip></Button>
      ),
    },
  ];

  const shouldShowSummary = data.length > 0;

  const summary = () => shouldShowSummary ? (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}></Table.Summary.Cell>
      <Table.Summary.Cell index={1}>Total</Table.Summary.Cell>
      <Table.Summary.Cell index={2}>{calculateTotal('xs')}</Table.Summary.Cell>
      <Table.Summary.Cell index={3}>{calculateTotal('s')}</Table.Summary.Cell>
      <Table.Summary.Cell index={4}>{calculateTotal('m')}</Table.Summary.Cell>
      <Table.Summary.Cell index={5}>{calculateTotal('l')}</Table.Summary.Cell>
      <Table.Summary.Cell index={6}>{calculateTotal('xl')}</Table.Summary.Cell>
      <Table.Summary.Cell index={7}>{calculateTotal('xxl')}</Table.Summary.Cell>
      <Table.Summary.Cell index={8}></Table.Summary.Cell>
    </Table.Summary.Row>
  ) : null;

  return (
    <div>
      <Button onClick={handleAddRow} style={{margin:"10px"}}>Add Row</Button>
      <Table 
      dataSource={data} 
      columns={columns} 
      summary={summary}
      bordered={true}
      />
    </div>
  );
};

export default SizeDetail;
