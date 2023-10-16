import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { BuyerDestinationService, ColourService } from '@project-management-system/shared-services';
import { BuyersDestinationRequest } from '@project-management-system/shared-models';

const SizeDetail = ({props, buyerId }) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState<any[]>([])
  const colorService = new ColourService()
  const { Option } = Select;
  const [form] = Form.useForm();
  const [buyerDes, setBuyerDes] = useState<any[]>([]);
  const buyersDestination = new BuyerDestinationService()
  const [selectedColors, setSelectedColors] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(false)



  useEffect(()=>{
    getColors()
    // getBuyersByDestination()
  },[])

  useEffect(() => {
    if (buyerId !== undefined) {
      getBuyersByDestination();
    }
  }, [buyerId]);
  

  const getColors = () => {
    colorService.getAllActiveColour().then((res) => {
      if (res.status) {
        setColor(res.data);
      }
      const colorLimit = res.data.length
      if (selectedColors.length >= colorLimit) {
        console.log(selectedColors.length,'not right')
        setButtonDisable(true);
      }
    });
  };

  const getBuyersByDestination = () => {
    const request = new BuyersDestinationRequest(buyerId)
    if(form.getFieldValue('buyer') != undefined){
      request.buyerId = form.getFieldValue('buyer')
    }
    buyersDestination.getAll(request).then((res) => {
      if (res.status) {
        setBuyerDes(res.data);
        handleAddRow()
      }
    });
  };

  const handleAddRow = () => {
    const newRow = {
      key: count,
    };
    setData([...data, newRow]);
    setCount(count + 1);
  };

  const handleInputChange = (value, key, field,size?) => {
    const updatedData = data.map((record) => {
      if (record.key === key) {
        return { ...record, [field]: value };
      }
      return record;
    })
    if (field === 'colourId') {
      const selectedColorId = parseInt(value);
      setSelectedColors([...selectedColors, selectedColorId]);
    }
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
  

  const sizeColumns = buyerDes[0]?.size.map((sizeData) => {
    return {
      title: sizeData.size,
      dataIndex: sizeData.size, 
      align:"center",
      render: (_, record) => (
        <Input
          value={record[sizeData.size]}
          onChange={(e) => handleInputChange(e, record.key, 'quantity', sizeData.size)}
          type="number"
          min={0}
          placeholder="Quantity"
        />
      ),
    };
  });
  

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Color',
      width:"25%",
      render: (_, record) => (
        <Select
          value={record.colourId}
          onChange={(value) => handleInputChange(value, record.colourId, 'colourId')}
          style={{width:"100%"}}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Select Color"
        >
          {color
            .filter((e) => !selectedColors.includes(e.colourId))
            .map((e) => {
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
      children :sizeColumns
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

  const summary = () =>
  shouldShowSummary ? (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}></Table.Summary.Cell>
      <Table.Summary.Cell index={1}>Total</Table.Summary.Cell>
      {buyerDes[0]?.size.map((sizeData, index) => (
        <Table.Summary.Cell index={index + 2} align='right'>
          {calculateTotal(sizeData.size)}
        </Table.Summary.Cell>
      ))}
    </Table.Summary.Row>
  ) : null;


  return (
    <div>
      <Button onClick={handleAddRow} style={{margin:"10px"}} disabled={buttonDisable}>Add Row</Button>
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
