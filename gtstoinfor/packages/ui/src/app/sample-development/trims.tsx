import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { M3TrimsService, SampleDevelopmentService, TrimParamsMappingService, UomService } from '@project-management-system/shared-services';
import { ItemTypeEnumDisplay, ItemTypeEnum, M3TrimType, BuyerIdReq, TrimIdRequestDto } from '@project-management-system/shared-models';

const TrimsForm = ({props, buyerId}) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [trimCode, setTrimCode]=useState<any[]>([])
  const [trimType, setTrimtype]= useState<any[]>([])
  const [uom, setUom] = useState([]);
  const service = new M3TrimsService()
  const uomService =  new UomService()
  const [trimData, setTrimData] = useState<any[]>([])
  const[itemType, setItemType] = useState<string>('')
  const paramsService = new TrimParamsMappingService()
  const [mapData, setMapData] = useState<any[]>([])
  const [m3Trims, setM3Trims] = useState<any[]>([])

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

  const getTrimCategory = (value)=>{
    setItemType(value)
    const req = new M3TrimType(value,buyerId)
    service.getAllTrimCategories(req).then((res)=>{
        if(res.status){
            setTrimData(res.data)
        }
    })
}

const getM3TrimsTypes = (value: number) => {
  const req = new BuyerIdReq(buyerId,itemType,value)
  service.getM3TrimsByBuyer(req).then(res => {
      if(res.status) {
          setM3Trims(res.data)
      }
  })
}

const getMappedTrims = (value, option) => {
  getM3TrimsTypes(value)
  const req = new TrimIdRequestDto(undefined,option?.name)
  paramsService.getMappedParamsByTrim(req).then((res) => {
    if (res.status) {
      setMapData(res.data)
    }
  });
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

  const renderTrimCodeOptions = () => {
    const trimOptions = [];
  
    mapData.forEach((item, index) => {
      let optionLabel = "Format - Buyer/TrimType/TrimCategory";
      Object.entries(item).forEach(([key, value]) => {
        if (value === true && key !== 'isActive') {
          optionLabel += `/${key.toUpperCase()}`;
        }
      });
  
      trimOptions.push(
        <Option key={`${index}`} value={null}>
          {optionLabel}
        </Option>
      );
    });
  
    return trimOptions;
  };

  const handleInputChange = (e, key, field) => {
    console.log(data)
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
      dataIndex: 'trimType',
      width:"20%",
      render: (_, record) => (
        <Select
          value={record.trimType}
          onChange={(e) => handleInputChange(e, record.key, 'trimType')}
          style={{width:"100%"}}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Select Trim"
          onSelect={getTrimCategory}
         >
          {Object.values(ItemTypeEnumDisplay).filter((val) => val.displayVal !== ItemTypeEnum.FABRIC).map((val) => (
            <Option key={val.name} value={val.name}>
              {val.displayVal}
            </Option>
          ))}
          </Select>
      ),
    },
    {
      title: 'Trim Category',
      dataIndex: 'trimCategory',
      width:"20%",
      render: (_, record) => (
        <Select
          value={record.trimCategory}
          onChange={(e) => handleInputChange(e, record.key, 'trimCategory')}
          style={{width:"100%"}}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Select Trim"
          onSelect={getMappedTrims}
         >
          {trimData?.map((e) => {
            return (
            <Option key={e.trimCategory} value={e.trimCategoryId} name={e.trimMappingId}>
              {e.trimCategory}
            </Option>
          )})}
          </Select>
      ),
    },
    {
      title: 'Trim Code',
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
          placeholder={renderTrimCodeOptions()[0]?.props.children}
          // onSelect={onTrimChange}
         >
          {renderTrimCodeOptions()}
          {m3Trims.map(item =>{
            return <Option key={item.m3TrimsId} value={item.m3TrimsId}>{item.trimCode}</Option>
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
