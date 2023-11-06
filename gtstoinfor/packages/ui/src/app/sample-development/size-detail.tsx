import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { BuyerDestinationService, ColourService } from '@project-management-system/shared-services';

const SizeDetail = ({props,buyerId}) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState<any[]>([])
  const [sizeData, setSizeData]=useState<any[]>([])
  const colorService = new ColourService()
  const buyerDestinaytionService=new BuyerDestinationService()
  const { Option } = Select;

  useEffect(()=>{
    getColors()
  },[])
console.log(props.buyerId)
  useEffect(() =>{
    if(props.buyerId != null){
      getAllSizesAgainstBuyer(props.buyerId)
    }
  },[props])

  const getColors = () => {
    colorService.getAllActiveColour().then((res) => {
      if (res.status) {
        console.log(res,'size data')
        setColor(res.data);
      }
    });
  };

  const getAllSizesAgainstBuyer =(buyerId) =>{
    buyerDestinaytionService.getAllSizesAgainstBuyer({buyerId:buyerId}).then(res=>{
      if(res.status){
        setSizeData(res.data)
      }else{
        setSizeData([])
        message.info(res.internalMessage)
      }
    })
  }

  const handleAddRow = () => {
    const newRow = {
      key: count,
    };
    setData([...data, newRow]);
    setCount(count + 1);
  };

  const handleInputChange = (value, key, field) => {
    const updatedData = data.map((record) => {
      if (record.key === key) {
        return { ...record, [field]: value };
      }
      return record;
    });
    setData(updatedData);
    props(updatedData)
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
      // dataIndex: 'colourId',
      width:"25%",
      render: (_, record) => (
        <Select
          value={record.colourId}
          onChange={(value) => handleInputChange(value, record.key, 'colourId')}
          style={{width:"100%"}}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Select Color"
        >
          {color.map((e) => {
                  return (
                    <Option key={e.colourId} value={e.colourId}>
                      {e.colour}
                    </Option>
                  );
                })}
          </Select>
      ),
    },
    {
      title: 'Quantity by Size',
      dataIndex: 'size',
      width:"10%",
      children :[
        {
          title: 'XS',
          dataIndex: 'quantity',
          render: (_, record) => (
            <Input
              value={record.xs}
              onChange={(e) => handleInputChange(e.target.value, record.key, 'quantity')}
              type='number'
              min={0}
              placeholder='Quantity'
            />
          ),
        },
        {
          title: 'S',
          dataIndex: 'quantity',
          render: (_, record) => (
            <Input
              value={record.s}
              onChange={(e) => handleInputChange(e.target.value, record.key, 'quantity')}
              type='number'
              min={0}
              placeholder='Quantity'
            />
          ),
        },
        {
          title: 'M',
          dataIndex: 'quantity',
          render: (_, record) => (
            <Input
              value={record.m}
              onChange={(e) => handleInputChange(e.target.value, record.key, 'quantity')}
              type='number'
              min={0}
              placeholder='Quantity'
            />
          ),
        },
        {
          title: 'L',
          dataIndex: 'quantity',
          render: (_, record) => (
            <Input
              value={record.l}
              onChange={(e) => handleInputChange(e.target.value, record.key, 'quantity')}
              type='number'
              min={0}
              placeholder='Quantity'
            />
          ),
        },
        {
          title: 'XL',
          dataIndex: 'quantity',
          render: (_, record) => (
            <Input
              value={record.xl}
              onChange={(e) => handleInputChange(e.target.value, record.key, 'quantity')}
              type='number'
              min={0}
              placeholder='Quantity'
            />
          ),
        },
        {
          title: 'XXL',
          dataIndex: 'quantity',
          render: (_, record) => (
            <Input
              value={record.xxl}
              onChange={(e) => handleInputChange(e.target.value, record.key, 'quantity')}
              type='number'
              min={0}
              placeholder='Quantity'
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
