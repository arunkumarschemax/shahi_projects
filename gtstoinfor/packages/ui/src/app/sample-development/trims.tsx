import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { M3TrimsService, SampleDevelopmentService, UomService } from '@project-management-system/shared-services';

const TrimsForm = ({props, buyerId}) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [trimCode, setTrimCode]=useState<any[]>([])
  const [trimType, setTrimtype]= useState<any[]>([])
  const [uom, setUom] = useState([]);
  const service = new M3TrimsService()
  const uomService =  new UomService()

 const {Option}=Select

  const handleAddRow = () => {
    const newRow = {
      key: count
    };
    setData([...data, newRow]);
    setCount(count + 1);
  };

  useEffect(() =>{
    if(buyerId != null){
      getTrimTypes(buyerId)
    }
  },[buyerId])

  useEffect(() =>{
    getUom()
  },[])
  const getUom = () => {
    uomService.getAllUoms().then(res => {
        if(res.status) {
            setUom(res.data)
        }
    })
  }
  const getTrimTypes = (buyerId) =>{
    service.getM3TrimsByBuyer({buyerId:buyerId}).then(res =>{
      if(res.status){
        setTrimtype(res.data)
      }else{
        setTrimtype([])
        message.info(res.internalMessage)
      }
    })
  }

  const getTrimCodes = (value) =>{
    service.getM3TrimsByTrimCode({trimType:value}).then(res =>{
      if(res.status){
        setTrimCode(res.data)
      }else{
        setTrimCode([])
        message.info(res.internalMessage)
      }
    })
  }

  const handleInputChange = (e, key, field) => {
    const updatedData = data.map((record) => {
      if (record.key === key) {
        return { ...record, [field]: e };
      }
      return record;
    });
    setData(updatedData);
    console.log(updatedData)
    props(updatedData)
  };

  const handleDelete = (key) => {
    const updatedData = data.filter((record) => record.key !== key);
    setData(updatedData);
  };

  const trimTypeOnchange = (value) =>{
    console.log(value)
    getTrimCodes(value)
  }
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Trim Type',
      dataIndex: 'productGroupId',
      width:"20%",
      render: (_, record) => (
        <Select
          value={record.productGroupId}
          onChange={(e) => handleInputChange(e, record.key, 'productGroupId')}
          style={{width:"100%"}}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Select Trim"
          onSelect={trimTypeOnchange}
         >
          {trimType.map(item =>{
            return <Option key={item.trimType} valu={item.trimType}>{item.trimType}</Option>
          })}
          </Select>
      ),
    },
    {
      title: 'Trim',
      dataIndex: 'trimId',
      width:"20%",
      render: (_, record) => (
        <Select
          value={record.trimId}
          onChange={(e) => handleInputChange(e, record.key, 'trimCode')}
          style={{width:"100%"}}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Select Trim"
         >
          {trimCode.map(item =>{
            return <Option key={item.trimId} value={item.trimId}>{item.trimCode}</Option>
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
        onChange={(e) => handleInputChange(e.target.value, record.key, 'consumption')}
        />
      ),
    },
    {
      title:"UOM",
      dataIndex: 'Uom',

      render: (_, record) => (
        <Select
        value={record.uomId}
        style={{width:"100%"}}
        allowClear
        showSearch
        optionFilterProp="children"
        placeholder="Select UOM" >
            {uom.map(e => {
              return(
                  <option key={e.uomId} value={e.uomId}>{e.uom}</option>
                  
              )
          })}
        </Select>
      ),
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (_, record) => (
        <TextArea
        value={record.remarks}
        onChange={(e) => handleInputChange(e.target.value, record.key, 'remarks')}
        rows={1}
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

export default TrimsForm;
