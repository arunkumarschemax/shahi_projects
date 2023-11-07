import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message, Form } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { BuyerDestinationService, ColourService } from '@project-management-system/shared-services';

const SizeDetail = ({props,buyerId}) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState<any[]>([])
  const [sizeData, setSizeData]=useState<any[]>([])
  const colorService = new ColourService()
  const buyerDestinaytionService=new BuyerDestinationService()
  const { Option } = Select;
  const [form] = Form.useForm();
  const [onchangeData, setOnchangeData] = useState([]); 

  useEffect(()=>{
    getColors()
  },[])

  useEffect(() =>{
    if(buyerId != null){
      getAllSizesAgainstBuyer(buyerId)
    }
  },[buyerId])

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

    // const onchangeData = []; 
    // const handleInputChange = (colourId, sizeId, quantity, recordKey) => {
    //   let existingEntry = onchangeData.find((entry) => entry.colour === colourId);
    //   if (!existingEntry) {
    //     existingEntry = {
    //       colour: colourId,
    //       sizeInfo: [],
    //     };
    //     onchangeData.push(existingEntry);
    //   }
    //   if (quantity !== 0) {
    //     let sizeInfoEntry = existingEntry.sizeInfo.find((info) => info.sizeId === sizeId);
    //     if (!sizeInfoEntry) {
    //       sizeInfoEntry = {
    //         sizeId: sizeId,
    //         quantity: quantity,
    //       };
    //       existingEntry.sizeInfo.push(sizeInfoEntry);
    //     } else {
    //       sizeInfoEntry.quantity = quantity;
    //     }
    //   }
    //   console.log(onchangeData);
    //   // props(onchangeData)
    // };
    // console.log(inpuData)

   const handleInputChange = (colourId, sizeId, quantity,recordKey) => {
      const newData = [...onchangeData];
      let existingEntry = newData.find((entry) => entry.colour === colourId);
      if (!existingEntry) {
        existingEntry = {
          colour: colourId,
          sizeInfo: [],
        };
        newData.push(existingEntry);
      }
      if (quantity !== 0) {
        let sizeInfoEntry = existingEntry.sizeInfo.find((info) => info.sizeId === sizeId);
        if (!sizeInfoEntry) {
          sizeInfoEntry = {
            sizeId: sizeId,
            quantity: quantity,
          };
          existingEntry.sizeInfo.push(sizeInfoEntry);
        } else {
          sizeInfoEntry.quantity = quantity;
        }
      }
      setOnchangeData(newData); 
      props(newData)
    };


  const handleDelete = (key) => {
    const updatedData = data.filter((record) => record.key !== key);
    setData(updatedData);
  };
  const add =()=>{
    form.validateFields().then((val) =>{
      console.log(val)
    })
  }

  const calculateTotal = (size) => {
    return data.reduce((total, record) => total + parseInt(record[size] || 0), 0);
  };

  const sizeColumns = sizeData.map(size => ({
    title: size.size,
    dataIndex: size.size,
    render:(_, record) =>{
      console.log(record)
      return (
        <><Form.Item name={`sizeId${size.sizeId}+${record.key}`} initialValue={size.sizeId} hidden>
          <Input
            name={`size`}
            defaultValue={size.sizeId}
            type='number'
            min={0}
            placeholder='size'
            hidden
          >
          </Input>
        </Form.Item>
          <Form.Item name={`quantity${size.sizeId}+${record.key}`}>
            <Input
              name={`quantity${size.sizeId}`}
              value={record[size.sizeId]}
              onChange={(e) =>
                handleInputChange(
                  form.getFieldValue(`colorId${record.key}`),
                  size.sizeId,
                  e.target.value,
                  record.key
                )
              }
              type='number'
              min={0}
              placeholder='quantity'
            >
            </Input>
          </Form.Item>
          </>
      )
    }
  }));

  
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Color',
      dataIndex: 'colourId',
      width:"25%",
      render: (_, record) => (
        <Form.Item name={`colorId${record.key}`}>
        <Select
          style={{width:"100%"}}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Select Color"
          onChange={(value) => handleInputChange(value, 0, 0, record.key)}
        >
          {color.map((e) => {
                  return (
                    <Option name={`colorId${record.key}`} key={e.colourId} value={e.colourId}>
                      {e.colour}
                    </Option>
                  );
                })}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: 'Quantity by Size',
      dataIndex: 'size',
      width:"10%",
      children :sizeColumns,
    },
    {
      title: 'Confirm',
      dataIndex: 'action',
      render: (_, record) => (
        <Button onClick={() => add()}><Tooltip title="Add"><PlusOutlined /></Tooltip></Button>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Button htmlType='submit' onClick={() => handleDelete(record.key)}><Tooltip title="Delete Row"><DeleteOutlined /></Tooltip></Button>
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
      <Form  form={form}>
      <Button onClick={handleAddRow} style={{margin:"10px"}}>Add Row</Button>
      <Table 
      dataSource={data} 
      columns={columns} 
      summary={summary}
      bordered={true}
      />
      {/* <Button>Confirm</Button> */}
      </Form>
    </div>
  );
};

export default SizeDetail;
