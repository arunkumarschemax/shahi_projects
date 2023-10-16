import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { ColourService, FabricsService } from '@project-management-system/shared-services';

const FabricsForm = ({props}) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [fabrics, setFabrics] = useState<any[]>([])
  const service = new FabricsService()
  const { Option } = Select;
  const [color, setColor] = useState<any[]>([])
  const colorService = new ColourService()

  useEffect(()=>{
    getFabrics()
    getColors()
  },[])

  const handleAddRow = () => {
    const newRow = {
      key: count
    };
    setData([...data, newRow]);
    setCount(count + 1);
  };

  const getColors = () => {
    colorService.getAllActiveColour().then((res) => {
      if (res.status) {
        setColor(res.data);
      }
    });
  };

  const handleInputChange = (e, key, field) => {
    const updatedData = data.map((record) => {
      if (record.key === key) {
        return { ...record, [field]: e.target.value };
      }
      return record;
    });
    setData(updatedData);
    props(updatedData);
  };
  

  const handleDelete = (key) => {
    const updatedData = data.filter((record) => record.key !== key);
    setData(updatedData);
  };

  const getFabrics = () => {
    service.getAllActiveFabrics().then((res) => {
      if (res.status) {
        setFabrics(res.data);
      }
    });
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Fabric Code',
      dataIndex: 'fabricsCode',
      width:"20%",
      render: (_, record) => (
        <Select
          value={record.fabricCode}
          onChange={(e) => handleInputChange(e, record.key, 'fabricCode')}
          style={{width:"100%"}}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Select Fabric Code"
        >
          {fabrics.map((e) => {
                  return (
                    <Option key={e.fabricsCode} value={e.fabricsCode}>
                      {e.fabricsCode}
                    </Option>
                  );
                })}
          </Select>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (_, record) => (
        <Input
        value={record.description}
        onChange={(e) => handleInputChange(e, record.key, 'description')}
        disabled
        />
      ),
    },
    {
      title: 'Color',
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
      title: 'Consumption',
      dataIndex: 'consumption',
      render: (_, record) => (
        <Input
        value={record.consumption}
        onChange={(e) => handleInputChange(e, record.key, 'consumption')}
        placeholder='Enter Consumption'
        />
      ),
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (_, record) => (
        <TextArea
        value={record.remarks}
        onChange={(e) => handleInputChange(e, record.key, 'remarks')}
        rows={1}
        placeholder='Enter Remarks'
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Button onClick={() => handleDelete(record.key)}><Tooltip title="Delete Row"><DeleteOutlined /></Tooltip></Button>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={handleAddRow} style={{margin:"10px"}}>Add Row</Button>
      <Table 
      dataSource={data} 
      columns={columns} 
      bordered={true}
      />
    </div>
  );
};

export default FabricsForm;
