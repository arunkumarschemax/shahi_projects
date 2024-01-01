import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message, Form } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { BuyerDestinationService, ColourService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';

const SizeDetail = ({props,buyerId,form}) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState<any[]>([])
  const [sizeData, setSizeData]=useState<any[]>([])
  const colorService = new ColourService()
  const buyerDestinaytionService=new BuyerDestinationService()
  const { Option } = Select;
  const [onchangeData, setOnchangeData] = useState<any[]>([]); 

  useEffect(()=>{
    getColors()
  },[])

  useEffect(() =>{
    if(buyerId != null){
      getAllSizesAgainstBuyer(buyerId)
    }
  },[buyerId])

  const getColors = () => {
    // colorService.getAllActiveColour().then((res) => {
    //   if (res.status) {
    //     // console.log(res,'size data')
    //     setColor(res.data);
    //   }
    // });

    buyerDestinaytionService.getAllColorsAgainstBuyer({buyerId:buyerId}).then((res) => {
      if (res.status) {
        // console.log(res,'size data')
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
      sizeInfo: []
    };
    setData([...data, newRow]);
    setCount(count + 1);
  };

   const handleInputChange = (colourId, sizeId, quantity,recordKey,name) => {
    console.log(recordKey)
    console.log(onchangeData)
    console.log(data)
    console.log(colourId)
    console.log(form.getFieldsValue())
    let isDuplicate = data.find((r) => r.colorId === colourId && r.key != recordKey);
    console.log(isDuplicate);
    console.log(isDuplicate?.colour);
    let updatedData;

    if(isDuplicate?.colorId > 0 && name === "colorId")
    {
      console.log(updatedData);
      AlertMessages.getErrorMessage("Duplicate Colors not allowed. ")
      form.setFieldValue(`colorId${recordKey}`,null)
      updatedData = data.map((record) => {
        console.log(record);
        if (record.key === recordKey) {
          return { ...record, [`colorId`]:null };
        }
        return record
        
      });
      // form.validateFields().then(size => {
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
      
    }
    else{
      if(name === "colorId"){

        updatedData = data.map((record) => {
          console.log(record);
          if (record.key === recordKey) {
            return { ...record, [`colorId`]:colourId };
          }
          return record
          
        });
      }
      else if(name === "quantity" && quantity > 0){
        updatedData = data.map((record) => {
          console.log(record);
          if (record.key === recordKey) {
            let sizeData = record.sizeInfo;
            let sizeInfoEntry = record.sizeInfo.find((info) => info.sizeId === sizeId);
            if (!sizeInfoEntry) {
              sizeInfoEntry = {
                sizeId: sizeId,
                quantity: quantity,
              };
              sizeData.push(sizeInfoEntry)
            } else {
              sizeInfoEntry.quantity = quantity;
            }
            return { ...record, [`sizeInfo`]:sizeData };
          }
          return record
          
        });
      }
      setOnchangeData(updatedData); 
      setData(updatedData); 
      props(updatedData)
    }
    };


  const handleDelete = (key) => {
    const updatedData = data.filter((record) => record.key !== key);
    setOnchangeData(updatedData); 
    setData(updatedData);
    props(updatedData)
  };
  // const add =()=>{
  //   form.validateFields().then((val) =>{
  //     // console.log(val)
  //   })
  // }

  // const calculateTotal = (size) => {
  //   return data.reduce((total, record) => total + parseInt(record[size] || 0), 0);
  // };

  const sizeColumns = sizeData.map(size => ({
    title: size.size,
    dataIndex: size.size,
    align:'right',
    render:(_, record) =>{
      // console.log(record)
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
          <Form.Item name={`quantity${size.sizeId}+${record.key}`} rules={[{ required: true, message: 'Missing Size' }]}>
            <Input
              name={`quantity${size.sizeId}`}
              value={record[size.sizeId]}
              onChange={(e) =>
                handleInputChange(
                  form.getFieldValue(`colorId${record.key}`),
                  size.sizeId,
                  e.target.value,
                  record.key,'quantity'
                )
              }
              type='number'
              min={1}
              placeholder='quantity'
            >
            </Input>
          </Form.Item>
          </>
      )
    }
  }));


  const columns:any = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      width:"20px",
      fixed:'left',
      align:'center',

      render: (_, record, index) => index + 1,
    },
    {
      title: 'Color',
      dataIndex: 'colourId',
      align:'center',
      width:"20px",
      render: (_, record) => (
        <Form.Item name={`colorId${record.key}`} rules={[{ required: true, message: 'Missing Color',  }]}>
        <Select
          style={{width:"100%"}}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Select Color"
          onChange={(value) => handleInputChange(value, 0, 0, record.key,'colorId')}
        >
          {/* <Option name={`colorId${record.key}`} key={0} value={0}>Please Select Color</Option> */}
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
      align:'center',

      width:"20px",
      children :sizeColumns,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align:'center',

      fixed:'right',
      width:'10%',
      render: (_, record) => (
        <Button htmlType='submit' onClick={() => handleDelete(record.key)}><Tooltip title="Delete Row"><DeleteOutlined /></Tooltip></Button>
      ),
    },
  ];


  // const shouldShowSummary = data.length > 0;

  // const summary = () => shouldShowSummary ? (
  //   <Table.Summary.Row>
  //     <Table.Summary.Cell index={0}></Table.Summary.Cell>
  //     <Table.Summary.Cell index={1}>Total</Table.Summary.Cell>
  //     <Table.Summary.Cell index={2}>{calculateTotal('xs')}</Table.Summary.Cell>
  //     <Table.Summary.Cell index={3}>{calculateTotal('s')}</Table.Summary.Cell>
  //     <Table.Summary.Cell index={4}>{calculateTotal('m')}</Table.Summary.Cell>
  //     <Table.Summary.Cell index={5}>{calculateTotal('l')}</Table.Summary.Cell>
  //     <Table.Summary.Cell index={6}>{calculateTotal('xl')}</Table.Summary.Cell>
  //     <Table.Summary.Cell index={7}>{calculateTotal('xxl')}</Table.Summary.Cell>
  //     <Table.Summary.Cell index={8}></Table.Summary.Cell>
  //   </Table.Summary.Row>
  // ) : null;

  return (
    <div>
      <Form  form={form}>
      <Button onClick={handleAddRow} style={{margin:"10px"}}>Add Row</Button>
      <Table 
      dataSource={data} 
      scroll = {{x:'max-content',y:'max-content'}}
      columns={columns} 
      // summary={summary}
      bordered={true}
      />
      {/* <Button>Confirm</Button> */}
      </Form>
    </div>
  );
};

export default SizeDetail;
