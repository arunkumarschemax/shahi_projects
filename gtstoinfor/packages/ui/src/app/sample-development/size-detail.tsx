import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message, Form, FormInstance, Modal } from 'antd';
import { DeleteOutlined, PlusCircleFilled, PlusOutlined } from '@ant-design/icons';
import { BuyerDestinationService, ColourService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';
import { ColourForm } from '../masters/colours/colour-form';
import SizeForm from '../masters/sizes/size.form';

export interface SizeDetailFormProps {
  data: any;
  buyerId: number;
  form:FormInstance<any>
  fabricDetails: any[]
  updateCal: (sizeDetails: any[]) => void;
}
  const SizeDetail = (props:SizeDetailFormProps) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState<any[]>([])
  const [sizeData, setSizeData]=useState<any[]>([])
  const [modelKey, setModelKey]=useState<string>(undefined)
  const [visibleModel, setVisibleModel] = useState<boolean>(false);
  const userData = JSON.parse(localStorage.getItem('currentUser'))
  const buyerId = userData?.user?.userName
  const colorService = new ColourService()
  const buyerDestinaytionService=new BuyerDestinationService()
  const { Option } = Select;
  const [onchangeData, setOnchangeData] = useState<any[]>([]); 

  useEffect(()=>{
    getColors()
  },[])

  useEffect(() =>{
    if(props.buyerId != null){
      getAllSizesAgainstBuyer(props.buyerId)
    }
  },[props.buyerId])

  const getColors = () => {
    // colorService.getAllActiveColour().then((res) => {
    //   if (res.status) {
    //     // console.log(res,'size data')
    //     setColor(res.data);
    //   }
    // });

    buyerDestinaytionService.getAllColorsAgainstBuyer({buyerId:props.buyerId}).then((res) => {
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
    console.log(name)
    console.log(data)
    console.log(sizeId)

    let isDuplicate = data.find((r) => r.colorId === colourId && r.sizeId === sizeId && r.key != recordKey);
   
    console.log(isDuplicate);

    let updatedData;
   
    if(isDuplicate){
      console.log(updatedData);
      AlertMessages.getErrorMessage("Duplicate Size for same Color is not allowed. ")
      props.form.setFieldValue(`sizeId${recordKey}`,null)
      updatedData = data.map((record) => {
        if (record.key === recordKey) {
          return { ...record, [`sizeId`]:null };
        }
        return record
        
      });
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
        const hasDuplicate = (array, newItem) => {
          return array.some(item => item.sizeId === newItem.sizeId && item.colorId === newItem.colorId);
        };
        
        const duplicateRecord = updatedData.find((item, index, array) => hasDuplicate(array.slice(0, index), item));
        
        if (duplicateRecord) {
          AlertMessages.getErrorMessage("Duplicate Color for same Size is not allowed. ")
          props.form.setFieldValue(`colorId${recordKey}`,null)
          // console.log('Duplicate record found:', duplicateRecord);
        } else {
          console.log('No duplicate records found.');
        }
      }
      else if(name === 'sizeId'){
        updatedData = data.map((record) => {
          console.log(record);
          if (record.key === recordKey) {
            return { ...record, [`sizeId`]:sizeId };
          }
          console.log(record)
          return record
        });
        // console.log(updatedData)
        // console.log(data)
        const hasDuplicate = (array, newItem) => {
          return array.some(item => item.sizeId === newItem.sizeId && item.colorId === newItem.colorId);
        };
        
        const duplicateRecord = updatedData.find((item, index, array) => hasDuplicate(array.slice(0, index), item));
        
        if (duplicateRecord) {
          AlertMessages.getErrorMessage("Duplicate Size for same Color is not allowed. ")
          props.form.setFieldValue(`sizeId${recordKey}`,null)
          // console.log('Duplicate record found:', duplicateRecord);
        } else {
          console.log('No duplicate records found.');
        }
      }
      // else if(name === "quantity"){
      //   updatedData = data.map((record) => {
      //     console.log(record);
      //     if (record.key === recordKey) {
      //       return { ...record, [`quantity`]:quantity };
      //     }
      //     console.log(record)
      //     return record 
      //   });
      // }
      else if(name === "quantity"){
        let fabricData = props.fabricDetails;
        console.log(fabricData);
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
            props.updateCal(sizeData)
            return { ...record, [`sizeInfo`]:sizeData };
          }
          return record
          
        });
      }
     
      console.log(updatedData)
      setOnchangeData(updatedData); 
      setData(updatedData); 
      props.data(updatedData)
    }
    };


  const handleDelete = (key) => {
    console.log("delete")
    const updatedData = data.filter((record) => record.key !== key);
    setOnchangeData(updatedData); 
    setData(updatedData);
    props.data(updatedData)
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
    align:'center',
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
          <Form.Item name={`quantity${size.sizeId}+${record.key}`} rules={[{ required: true, message: 'Missing Size' }]} initialValue={0}>
            <Input
              name={`quantity${size.sizeId}`}
              value={record[size.sizeId]}
              onChange={(e) =>
                handleInputChange(
                  props.form.getFieldValue(`colorId${record.key}`),
                  size.sizeId,
                  e.target.value,
                  record.key,'quantity'
                )
              }
              type='number'
              // min={1}
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
      fixed:'left',
      align:'center',
      width:'10%',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Color',
      dataIndex: 'colourId',
      align:'center',
      width:'30%',
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
    // {
    //   title: 'Quantity by Size',
    //   dataIndex: 'size',

    //   children :sizeColumns,
    // },
    {
      title: 'Size',
      dataIndex: 'size',
      align:'center',
      render:(_,record) =>{
        return(
          <Form.Item name={`sizeId${record.key}`} rules={[{ required: true, message: 'Missing Size',  }]}>
          <Select
            style={{width:"100%"}}
            allowClear
            showSearch
            optionFilterProp="children"
            placeholder="Select Size"
            onChange={(value) => handleInputChange(0, value, 0, record.key,'sizeId')}
          >
            {/* <Option name={`colorId${record.key}`} key={0} value={0}>Please Select Color</Option> */}
            {sizeData.map((e) => {
                    return (
                      <Option name={`sizeId${record.key}`} key={e.sizeId} value={e.sizeId}>
                        {e.size}
                      </Option>
                    );
                  })}
            </Select>
          </Form.Item>
        ) 
         },
        },
       {
      title: 'Quantity',
      dataIndex: 'quantity',
      align:'center',
      width:'20%',
      render:(_,record)=>{
        return(
          <Form.Item name={`quantity+${record.key}`} rules={[{ required: true, message: 'Missing Quantity' }]} >
          <Input
            name={`quantity${record.key}`}
            // value={}
            onChange={(e) =>
              handleInputChange(
                props.form.getFieldValue(`colorId${record.key}`),
                props.form.getFieldValue(`sizeId${record.key}`),
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
        )
      }
    },
    // {
    //   title: 'Quantity by Size',
    //   dataIndex: 'size',

    //   children :sizeColumns,
    // },
    {
      title: 'Action',
      dataIndex: 'action',

      fixed:'right',
      width:'10%',
      render: (_, record) => (
        <Button htmlType='button' onClick={() => handleDelete(record.key)}><Tooltip title="Delete Row"><DeleteOutlined /></Tooltip></Button>
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

  const handleAddColor = (key) => {
    console.log(key);
    setModelKey("color")
    setVisibleModel(true)
  }
  const handleAddSize = (key) => {
    console.log(key);
    setModelKey("size")
    setVisibleModel(true)
  }

  const handleCancel = () => {
    console.log("jjjjjjjjjj")
    setVisibleModel(false);
  };
  const handleColorModel = () =>{
    setVisibleModel(false);
    getColors()
  }
  const handleSizeModel = () =>{
    setVisibleModel(false);
    getAllSizesAgainstBuyer(props.buyerId)
  }
  return (
    <div>
      <Form  form={props.form}>
      <Button onClick={handleAddRow} style={{margin:"10px"}}>Add Row</Button>
      <Button onClick={handleAddColor} style={{margin:"10px"}}><PlusCircleFilled style={{ color: '#1890ff', fontSize: '14px' }} />Add Color</Button>
      <Button onClick={handleAddSize} style={{margin:"10px"}}><PlusCircleFilled style={{ color: '#1890ff', fontSize: '14px' }} />Add Size</Button>
      <Table 
      dataSource={data} 
      scroll = {{x:'max-content',y:'max-content'}}
      columns={columns} 
      // summary={summary}
      bordered={true}
      />
      {/* <Button>Confirm</Button> */}
      </Form>
      <Modal
          className='rm-'
          // key={'modal' + Date.now()}
          width={'70%'}
          style={{ top: 30, alignContent: 'right' }}
          visible={visibleModel}
          title={<React.Fragment>
          </React.Fragment>}
          onCancel={handleCancel}
          footer={[]}
      >
        {
          modelKey === "color"?
          <ColourForm colourData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }}  closeModal={(val) => {handleColorModel()}} mapBuyerDest={true} buyerId={buyerId}/>
          :modelKey === "size"?
          <SizeForm sizeData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} closeModal={(val) => {handleSizeModel()}}  mapBuyerDest={true} />
          :""
        }
      </Modal>
    </div>
  );
};

export default SizeDetail;
