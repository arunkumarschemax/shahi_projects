import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message, Form, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { M3TrimsService, SampleDevelopmentService, UomService } from '@project-management-system/shared-services';

export interface TrimsFormProps {
  data: any;
  buyerId: number;
  sizeDetails: any[]
}

const TrimsForm = (props:TrimsFormProps) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [trimCode, setTrimCode]=useState<any[]>([])
  const [trimType, setTrimtype]= useState<any[]>([])
  const [uom, setUom] = useState([]);
  const service = new M3TrimsService()
  const uomService =  new UomService()
  const [form] = Form.useForm();

 const {Option}=Select

  const handleAddRow = () => {
    if(props.sizeDetails.length > 0){
      props.sizeDetails?.forEach(element => {
        let qtyy = 0;
        element.sizeInfo?.forEach(qty => {
          console.log(qty.quantity);
          qtyy = Number(qtyy)+Number(qty.quantity);
        })
        console.log(qtyy)
        const newRow = {
          key: count,
          colourId:element.colour,
          totalCount: qtyy
        };
        console.log(newRow)
        setData([...data, newRow]);
        setCount(count + 1);
      });
    }
  };

  useEffect(() =>{
    if(props.buyerId != null){
      getTrimTypes(props.buyerId)
    }
  },[props.buyerId])

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
    console.log(data)
    console.log(e)
    console.log(key)
    console.log(field)


    let updatedData
    if(field === 'consumption'){
      let wastg = form.getFieldValue(`wastage${key}`) != undefined ? form.getFieldValue(`wastage${key}`) : 2;
      updatedData = data.map((record) => {
        if (record.key === key) {
          console.log(e);
      console.log(record.totalCount);
          let consumptionCal = Number(record.totalCount) * Number(e);
          let withPer = (Number(consumptionCal) * Number(wastg))/ 100;
          console.log(consumptionCal);
          console.log(withPer);
          form.setFieldValue(`totalRequirement${key}`,(Number(consumptionCal) + Number(withPer)).toFixed(2));
          return { ...record, [field]: e, [`totalRequirement`]:Number(Number(consumptionCal) + Number(withPer)).toFixed(2) };
        }
        return record;
      });
    }
    else if(field === 'wastage'){
      let cons = form.getFieldValue(`consumption${key}`) != undefined ? form.getFieldValue(`consumption${key}`) : 0
      updatedData = data.map((record) => {
        if (record.key === key) {
          console.log(e);
      console.log(record.totalCount);
          let consumptionCal = Number(record.totalCount) * Number(cons);
          let withPer = (Number(consumptionCal) * Number(e))/ 100;
          console.log(consumptionCal);
          console.log(withPer);
          form.setFieldValue(`totalRequirement${key}`,(Number(consumptionCal) + Number(withPer)).toFixed(2));
          return { ...record, [field]: e, [`totalRequirement`]:Number(Number(consumptionCal) + Number(withPer)).toFixed(2) };
        }
        return record;
      });
    }
    else{
      updatedData = data.map((record) => {
        if (record.key === key) {
          return { ...record, [field]: e };
        }
        return record;
      });
    }
    
    setData(updatedData);
    console.log(updatedData)
    props.data(updatedData)
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
      dataIndex: 'trimType',
      width:"20%",
      render: (_, record) => (
        <Form.Item name={`trimType${record.key}`}>
        <Select
          value={record.trimType}
          onChange={(e) => handleInputChange(e, record.key, 'trimType')}
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
      </Form.Item>
      ),
    },
    {
      title: 'Trim',
      dataIndex: 'trimId',
      width:"20%",
      render: (_, record) => (
        <Form.Item name={`trimId${record.key}`}>
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
            return <Option key={item.m3TrimsId} value={item.m3TrimsId}>{item.trimCode}</Option>
          })}
          </Select>
          </Form.Item>
      ),
    },
   
    {
      title: 'Consumption',
      dataIndex: 'consumption',
      render: (_, record) => (
        <Form.Item name={`consumption${record.key}`}>
        <InputNumber
        value={record.consumption}
        onChange={(e) => handleInputChange(e, record.key, 'consumption')}
        />
        </Form.Item>
      ),
    },
    {
      title:"UOM",
      dataIndex: 'Uom',

      render: (_, record) => (
        <Form.Item name={`uomId${record.key}`}>
        <Select
        value={record.uomId}
        style={{width:"100%"}}
        allowClear
        showSearch
        optionFilterProp="children"
        placeholder="Select UOM" 
        // defaultValue={uom.find((e) => e.uom === "PCS")?.uom}
        onChange={(e) => handleInputChange(e, record.key, 'uomId')}
        >
            {uom.map(e => {
              return(
                  <option key={e.uomId} value={e.uomId}>{e.uom}</option>
                  
              )
          })}
        </Select>
        </Form.Item>
      ),
    },
    {
      title: 'Wastage %',
      dataIndex: 'wastage',
      width:"10%",
      render: (_, record) => (
      <Form.Item name={`wastage${record.key}`}>
        <InputNumber
        defaultValue={2}
        onChange={(e) => handleInputChange(e, record.key, 'wastage')}
        />
      </Form.Item>
      ),
    },
    {
      title: 'Total Requirement',
      dataIndex: 'totalRequirement',
      width:"10%",
      render: (_, record) => (
      <Form.Item name={`totalRequirement${record.key}`}>
        <Input disabled style={{fontWeight:'bold', color:"black"}}
        value={record.totalRequirement}
        onChange={(e) => handleInputChange(e.target.value, record.key, 'totalRequirement')}
        />
      </Form.Item>
      ),
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (_, record) => (
        <Form.Item name={`remarks${record.key}`}>
        <TextArea
        value={record.remarks}
        onChange={(e) => handleInputChange(e.target.value, record.key, 'remarks')}
        rows={1}
        />
        </Form.Item>
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
      <Form form={form}>

      <Button onClick={handleAddRow} style={{margin:"10px"}}>Add Row</Button>
      <Table 
      dataSource={data} 
      columns={columns} 
      bordered={true}
      />
      </Form>
    </div>
  );
};

export default TrimsForm;
