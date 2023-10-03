import { Button, Card, Col, Divider, Form, FormInstance, Input, Popconfirm, Row, Select, Table, Tooltip, Upload, UploadProps, message } from 'antd'
import React, { useEffect, useState } from 'react'
import M3Items from './m3-model'
import { DeleteOutlined, EditOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons'
import { ColourService, UomService } from '@project-management-system/shared-services'
import AlertMessages from '../common/common-functions/alert-messages'

export interface FabricDevelopmentDynamicFormProps {
  
  form:FormInstance<any>
  itemsData:(itemsInfo:any[])=>void
  dynamicformData: (dynamicInfo: any[]) => void;

  
}

export const FabricDevelopmentDynamicForm = (props:FabricDevelopmentDynamicFormProps) =>{

  // const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false); 
  const [formData, setFormData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(1);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [BtnDisable, setBtnDisable] = useState<boolean>(false);
  const [colorData,setColorData] = useState<any>([])
  const [uomData,setUomData] = useState([])
  const [itemsData,setItemsData] = useState<any>([])
  const [garmentQuantity,setGarmentQuantity] = useState<any>()
  const [consumptionData,setConsumptionData] = useState<any>()
  const [wastageData,setWastageData] = useState<any>()
  const [pollutionFilelist,setPollutionFilelist] = useState<any[]>([]);



  const fileuploadFieldProps: UploadProps = {
    multiple: false,
    onRemove: (file:any) => {
        setPollutionFilelist([]);
      // uploadFileList([]);
    },
    beforeUpload: (file: any) => {
      if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
        message.error("Only pdf and image files are allowed!");
        return true;
      }
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = data => {
        if (pollutionFilelist.length === 1) {
          message.error("You Cannot Upload More Than One File At A Time");
          return true;
        } else {
            setPollutionFilelist([...pollutionFilelist, file]);
          // uploadFileList([...filelist, file]);

          return false;
        }
      };

      // Add a default return value for cases where none of the conditions are met
      return false;
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent:any) => `${parseFloat(percent.toFixed(2))}%`,
    },
    fileList: pollutionFilelist
  };
  console.log(pollutionFilelist,'-----------AAAAAA')



  const colorservice = new ColourService();
  const uomservice = new UomService();
  
  console.log(itemsData,"hygreev")

  //  const req = new FabricInfo()
  
  
 
   const onChangeGarment = (e) =>{
    // console.log( props.form.getFieldValue("garmentQuantity"),"khyg")
      e.target.value
     setGarmentQuantity(e.target.value)
   }

   const onChangeConsumption = (e) =>{
    // console.log(props.form.getFieldValue("consumption"),"7777")
    setConsumptionData(e.target.value)
   }

   const onChangeWastage = (e) =>{
    // console.log(props.form.getFieldValue("wastage"),"8888")
    setWastageData(e.target.value)

   }

  //  useEffect(()=>{
  //   if(wastageData){
  //     const cal = ((garmentQuantity*consumptionData)+( (garmentQuantity*consumptionData/100)))
  //     props.form.setFieldsValue({FabricQuantity:cal})

  //   }
  //  },[onChangeWastage])

  useEffect(() => {
    if (garmentQuantity && consumptionData && wastageData) {
      const cal:any = ((garmentQuantity*consumptionData)+( (garmentQuantity*consumptionData/100)))
      props.form.setFieldsValue({fabricQuantity:cal})
     
    }
  }, [garmentQuantity, consumptionData, wastageData]);


   console.log(garmentQuantity,"0000")
   console.log(consumptionData,"9898897")
   console.log(wastageData,"121212")




  useEffect (()=>{
    getAllActiveColour();
    getAllUoms();

   
  },[])

  const itemList = (data) =>{
    console.log(data,"itemdata")
    setItemsData(data)
    props.itemsData(data)
  
  }


  const getAllActiveColour=() =>{
    colorservice.getAllActiveColour().then(res =>{
    if (res.status){
      setColorData(res.data);
       
    } else{
      AlertMessages.getErrorMessage(res.internalMessage);
       }
  }).catch(err => {
    setColorData([]);
     AlertMessages.getErrorMessage(err.message);
   })
  
}

const getAllUoms = () => {
  uomservice.getAllUoms().then((res) => {
    if (res.status) {
      setUomData(res.data);
    }else{
      AlertMessages.getErrorMessage(res.internalMessage);
       }
  }).catch(err => {
    setUomData([]);
     AlertMessages.getErrorMessage(err.message);
   })
};


    const showModal = () => {
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };


      const onReset = () =>{
        props.form.resetFields()
       }
    
       const addData = () => {
        props.form.validateFields().then((values) => {
          console.log(values, '555');
      

          if (editingIndex !== 1) {
            const updatedFormData = [...formData];
            updatedFormData[editingIndex] = values;
            setFormData(updatedFormData);
            setEditingIndex(1);
          } else {
            setFormData([...formData, values]);
            props.dynamicformData([...formData, values])

          }
          props.form.resetFields();
          setShowTable(true); // Set showTable to true when data is added
          setBtnDisable(false)
          

      
        });
      };

      console.log(formData,"dynamicformdata")

      const setEditForm = (rowData: any, index: number) => {
        setEditingIndex(index); // Set the index of the row being edited
        props.form.setFieldsValue(rowData); // Populate the form fields with the row data
        setBtnDisable(true)
      };
      
      
      const deleteData = (index) => {
        const updatedFormData = formData.filter((item, i) => i !== index);
        setFormData(updatedFormData);
      };

      const col:any = [
        { title: 'Style No', dataIndex: 'styleId', key: 'StyleNo' },
        { title: 'Color', dataIndex: 'colorId', key: 'color' }, 
        { title: 'Garment Quantity', dataIndex: 'garmentQuantity', key: 'garmentQuantity' },
        { title: 'Consumption', dataIndex: 'consumption', key: 'consumption' },
        { title: 'Wastage', dataIndex: 'wastage', key: 'wastage' },
        { title: 'Fabric Quantity', dataIndex: 'fabricQuantity', key: 'FabricQuantity' },
        { title: 'UOM', dataIndex: 'uomId', key: 'uom' },
        { title: 'Remarks', dataIndex: 'remarks', key: 'remarks' },
        { title: 'File', dataIndex: 'file', key: 'file' },
        {
          title: 'Action',
          dataIndex: 'action',
          // width: '20%',
          render: (text, rowData: any, index) => (
            <span>
              <Tooltip placement="top" title='edit'>
                <EditOutlined className={'editSamplTypeIcon'} type="edit"
                  onClick={() => {
                    console.log(rowData,"rowdata")
                    console.log(index,"index")
    
                    if (rowData) {
                    setEditForm(rowData, index);
                    }
                  }}
                  style={{ color: '#1890ff', fontSize: '14px' }}
                />
              </Tooltip>
    
              <Divider type="vertical" />
              <Tooltip placement="top" title='delete'>
                <Popconfirm title='Sure to delete?'
                 onConfirm={e =>{deleteData(index);}}
                 >
                <DeleteOutlined 
    
                  style={{ color: '#1890ff', fontSize: '14px' }} />
                </Popconfirm>
              </Tooltip>
    
            </span>)
        }
        
      ];
    
   return (
    
   
  <Form form ={props.form}>
    <Row gutter={12}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Style No"
                name ="styleId"
                rules={[{ required: true, message: "Style No" }]}
              >
                <Input placeholder="Style No" allowClear/>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Color"
                name ="colorId"
              >
                <Select placeholder="Color" allowClear>
                {colorData.map((rec) => (
                  <option key={rec.colourId} value={rec.colourId}>
                    {rec.colour}
                   </option>
                       ))} 
                </Select>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Garment Quantity"
                name="garmentQuantity"
              >
                <Input placeholder="Garment Quantity"  onChange={onChangeGarment}allowClear/>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Consumption(YY)"
                name = "consumption"
              >
                <Input placeholder="Consumption"  onChange={onChangeConsumption} allowClear/>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Wastage(X%)"
                name="wastage"
              >
            <Input placeholder="wastage" onChange={onChangeWastage} allowClear/>

              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Fabric Quantity"
                name="fabricQuantity"
                
                
              >
            <Input placeholder="Fabric Quantity" allowClear />

              </Form.Item>
            </Col>
            
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
              style={{marginTop:30}}

            >
              <Form.Item
                label="UOM"
                name="uomId"
              >
            <Select  placeholder="UOM" allowClear>
            {uomData.map((rec) => (
                    <option key={rec.uomId} value={rec.uomId}>
                      {rec.uom}
                      </option>
                       )) }
              

            </Select>

              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
              style={{marginTop:30}}

            >
              <Form.Item
                label="Remarks"
                name="remarks"
              >
           <Input placeholder='remarks' />

              </Form.Item>
            </Col>

            
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
              style={{marginTop:30}}
            >
              <Form.Item
                label="File"
                name="file"
              >
                
              <Upload {...fileuploadFieldProps}  accept='.jpeg,.png,.jpg'>
             <Button icon={<UploadOutlined />}>
              Choose File
             </Button>
             </Upload>
              </Form.Item>
            </Col>
            
            
           <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
          <Form.Item  style={{marginTop:50}} >
              <Button  type='primary'  
               onClick={addData } 
            >
              {BtnDisable ? 'UPDATE' : 'ADD'}
            </Button>
            
          </Form.Item>
           </Col>
          <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
          <Form.Item >
            {/* <Button onClick={onReset} style={{marginTop:100,marginLeft:30}}  >
              Reset
            </Button> */}
            <Button
                  type="default"
                  danger
                  icon={<UndoOutlined />}
                  onClick={onReset}
                  style={{marginTop:100,marginLeft:20}}
                >
                  Reset
                </Button>
          </Form.Item>
        </Col>

        <Form.Item> 
           <Button type="primary" onClick={showModal} style={{marginTop:100,marginLeft:60}} > Map items</Button> 
           <M3Items visible={modalVisible} onClose={closeModal} itemList = {itemList}/> 
           </Form.Item>
        </Row>
        
            


   </Row>
   <br></br>
   <br></br>
    {showTable && ( // Only show the table if showTable is true
        <div>
          <Table columns={col} dataSource={formData} pagination={false} />
        </div>
      )}
      
</Form>
  
  )
}

export default FabricDevelopmentDynamicForm