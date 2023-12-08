import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message, Form, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { ColourService, M3ItemsService, SampleDevelopmentService, UomService } from '@project-management-system/shared-services';
import { UomCategoryEnum } from '@project-management-system/shared-models';
import { updateLocale } from 'moment';

export interface FabricsFormProps {
  data: any;
  buyerId: number;
  sizeDetails: any[]
}

const FabricsForm = (props:FabricsFormProps) => {
  const [data, setData] = useState([]);
  const [uom, setUom] = useState([]);
  const [count, setCount] = useState(0);
  const [fabricCodeData, setFabricCodeData] = useState<any[]>([])
  const [color, setColor] = useState<any[]>([])
  const {Option}=Select
  const service = new SampleDevelopmentService()
  const m3ItemsService = new M3ItemsService()
  const uomService =  new UomService()

  const colorService = new ColourService()

  const [form] = Form.useForm();

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
      fabricCode(props.buyerId)
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
  // const handleInputChange = (e, key, field,productGroupId) => {
  //   const updatedData = data.map((record) => {
  //     if (record.key === key) {
  //       return { ...record, [field]: e,productGroupId:productGroupId };
  //     }
  //     return record;
  //   });
  //   console.log(updatedData)
  //   setData(updatedData);
  //   props(updatedData);
  // };

  const handleInputChange = (e, key, field, additionalValue) => {
    console.log(data);
    console.log(key);

    let updatedData;
  
    if (field === 'fabricCode') {
      const productGroupId = getSelectedProductGroupId(e);
      updatedData = data.map((record) => {
        if (record.key === key) {
          return { ...record, [field]: e, productGroupId: productGroupId };
        }
        return record;
      });
    } 

    else if(field === 'consumption'){
      updatedData = data.map((record) => {
        if (record.key === key) {
          console.log(e);
      console.log(record.totalCount);
          let consumptionCal = Number(record.totalCount) * Number(e);
          let withPer = (Number(consumptionCal) * Number(2))/ 100;
          console.log(consumptionCal);
          console.log(withPer);
          form.setFieldValue(`totalRequirement${key}`,Number(consumptionCal) + Number(withPer));
          return { ...record, [field]: e, [`totalRequirement`]:Number(consumptionCal) + Number(withPer) };
        }
        return record;
      });
    }
    else {
      updatedData = data.map((record) => {
        if (record.key === key) {
          return { ...record, [field]: e };
        }
        return record;
      });
    }
    setData(updatedData);
    props.data(updatedData);
  };

  useEffect(() =>{
    getColors()
  },[])
  useEffect(() =>{
    console.log(props.sizeDetails[0])
  },[props.sizeDetails])

  const fabricCode = (buyerId) =>{
    console.log(buyerId)
    m3ItemsService.getM3FabricsByBuyer({buyerId:buyerId}).then(res =>{
      console.log(res)
      if(res.status){
        setFabricCodeData(res.data)
      }else{
        setFabricCodeData([])
        message.info("hi"+res.internalMessage)
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
    props.data(updatedData)
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
      width:"45%",
      render: (_, record, index) => (
        <><Form.Item name={`fabricId${record.key}`}>
          <Select
            // onChange={(e) => handleInputChange(e, record.key, 'fabricCode',getSelectedProductGroupId(e))}
            style={{ width: "100%" }}
            allowClear
            showSearch
            optionFilterProp="children"
            placeholder="Select Fabric Code"
            onChange={(e) => handleInputChange(e, record.key, 'fabricCode',0)}
          >
            {fabricCodeData?.map(item => {
              return <Option name={`fabricId${record.key}`} key={item.m3ItemsId} valu={item.m3ItemsId}>{item.itemCode+ "-"+ item.description}</Option>;
            })}
          </Select>

        </Form.Item>
        {/* <Form.Item name={'productGroupId'} hidden>
            <Input hidden></Input>
          </Form.Item> */}
      </>
      ),
    },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   width:"15%",
    //   render: (_, record) => (
    //     <Input
    //     value={record.description}
    //     onChange={(e) => handleInputChange(e.target.value, record.key, 'description',0)}
    //     />
    //   ),
    // },
    {
      title: 'Color',
      dataIndex: 'color',
      width:"15%",
      render: (_, record) => (
        <><Form.Item name={`colorId${record.key}`}>
          <Select
            value={record.colourId}
            onChange={(e) => handleInputChange(e, record.key, 'colourId', 0)}
            style={{ width: "100%" }}
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
        </Form.Item>
        </>
      
      ),
    },
    {
      title: 'Consumption',
      dataIndex: 'consumption',
      width:"10%",
      render: (_, record) => (
        <Form.Item name={`consumption${record.key}`}>
        <InputNumber
        value={record.consumption}
        onChange={(e) => handleInputChange(e, record.key, 'consumption',0)}
        />
        </Form.Item>
      ),
    },
    // {
    //   title: 'Fabric Requirment',
    //   dataIndex: 'fabricRequirment',
    //   width:"10%",
    //   render: (_, record) => (
    //     <Input
    //     value={record.fabricRequirment}
    //     onChange={(e) => handleInputChange(e.target.value, record.key, 'fabricRequirment',0)}
    //     />
    //   ),
    // },
    // {
    //   title: 'Wastage',
    //   dataIndex: 'wastage',
    //   width:"10%",
    //   render: (_, record) => (
    //     <Input
    //     value={record.wastage}
    //     onChange={(e) => handleInputChange(e.target.value, record.key, 'wastage',0)}
    //     />
    //   ),
    // },
    
    {
      title:"UOM",
      dataIndex: 'UomId',
      width:"10%",
      render: (_, record) => (
        <Form.Item name={`uomId${record.key}`}>

        <Select
        value={record.uomId}
        style={{width:"100%"}}
        allowClear
        showSearch
        optionFilterProp="children"
        placeholder="Select UOM"
        defaultValue={uom.find((e) => e.uom === "m")?.uom}
        onChange={(e) => handleInputChange(e, record.key, 'uomId',0)}
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
        onChange={(e) => handleInputChange(e, record.key, 'wastage',0)}
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
        <Input disabled
        value={record.totalRequirement}
        onChange={(e) => handleInputChange(e.target.value, record.key, 'totalRequirement',0)}
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
        onChange={(e) => handleInputChange(e.target.value, record.key, 'remarks',0)}
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

export default FabricsForm;
