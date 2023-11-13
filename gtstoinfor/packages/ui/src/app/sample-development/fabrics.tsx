import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { ColourService, SampleDevelopmentService } from '@project-management-system/shared-services';

const FabricsForm = ({props}) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [fabricCodeData, setFabricCodeData] = useState<any[]>([])
  const [color, setColor] = useState<any[]>([])
  const {Option}=Select
  const [productGroupId, setProductGroupId]=useState<any>(null)
  const service = new SampleDevelopmentService()
  const colorService = new ColourService()

  const [form] = Form.useForm();

  const handleAddRow = () => {
    const newRow = {
      key: count
    };
    setData([...data, newRow]);
    setCount(count + 1);
  };

  const handleInputChange = (e, key, field,productGroupId) => {
    const updatedData = data.map((record) => {
      if (record.key === key) {
        return { ...record, [field]: e,productGroupId:productGroupId };
      }
      return record;
    });
    console.log(updatedData)
    setData(updatedData);
    props(updatedData);
  };

  useEffect(() =>{
    fabricCode()
    getColors()
  },[])

  const fabricCode = () =>{
    service.getFabricCodes().then(res =>{
      if(res.status){
        setFabricCodeData(res.data)
      }else{
        setFabricCodeData([])
        message.info(res.internalMessage)
      }
    })
  }
  const getColors = () => {
    colorService.getAllActiveColour().then((res) => {
      if (res.status) {
        console.log(res,'size data')
        setColor(res.data);
      }
    });
  };

  const handleDelete = (key) => {
    const updatedData = data.filter((record) => record.key !== key);
    setData(updatedData);
  };

  const getSelectedProductGroupId = (selectedFabricId) => {
    const selectedFabric = fabricCodeData.find(item =>item.fabricId == selectedFabricId)
    return selectedFabric ? selectedFabric.productGroupId : null;
  };
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Fabric Code',
      dataIndex: 'fabricCode',
      width:"20%",
      render: (_, record) => (
        <><Form.Item>
          <Select
            value={record.fabricCode}
            onChange={(e) => handleInputChange(e, record.key, 'fabricCode',getSelectedProductGroupId(e))}
            style={{ width: "100%" }}
            allowClear
            showSearch
            optionFilterProp="children"
            placeholder="Select Fabric Code"
          >
            {fabricCodeData.map(item => {
              return <Option type={item.productGroupId} key={item.fabricId} valu={item.fabricId}>{item.fabricCode}</Option>;
            })}
          </Select>

        </Form.Item>
        <Form.Item name={'productGroupId'} hidden>
            <Input hidden></Input>
          </Form.Item></>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width:"15%",
      render: (_, record) => (
        <Input
        value={record.description}
        onChange={(e) => handleInputChange(e.target.value, record.key, 'description',0)}
        />
      ),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      width:"20%",
      render: (_, record) => (
        // <Input
        // value={record.color}
        // onChange={(e) => handleInputChange(e, record.key, 'color')}
        // />
        <Select
        value={record.colourId}
        onChange={(e) => handleInputChange(e, record.key, 'colourId',0)}
        style={{width:"100%"}}
        allowClear
        showSearch
        optionFilterProp="children"
        placeholder="Select Fabric Code"
       >
            {color.map((e) => {
                  return (
                    <Option name={`colorId${record.key}`} key={e.colourId} value={e.colourId}>
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
        onChange={(e) => handleInputChange(e.target.value, record.key, 'consumption',0)}
        />
      ),
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (_, record) => (
        <TextArea
        value={record.remarks}
        onChange={(e) => handleInputChange(e.target.value, record.key, 'remarks',0)}
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

export default FabricsForm;