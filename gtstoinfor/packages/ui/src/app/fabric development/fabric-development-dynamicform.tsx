import { Button, Card, Col, Divider, Form, FormInstance, Input, Popconfirm, Row, Select, Table, Tooltip, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import M3Items from './m3-model'
import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons'
import { ColourService } from '@project-management-system/shared-services'
import AlertMessages from '../common/common-functions/alert-messages'

export interface FabricDevelopmentDynamicFormProps {
  
  form:FormInstance<any>
  
}

export const FabricDevelopmentDynamicForm = (props:FabricDevelopmentDynamicFormProps) =>{

  // const [form] = Form.useForm();
  const [tblkey, setTblkey] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false); 
  const [formData, setFormData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(1);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [BtnDisable, setBtnDisable] = useState<boolean>(false);
  const [colorData,setColorData] = useState<any>([])

  const colorservice =new ColourService();
   

  useEffect (()=>{
    getAllActiveColour();
   
  },[])


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
          }
          props.form.resetFields();
          setShowTable(true); // Set showTable to true when data is added
          setBtnDisable(false)
      
        });
      };

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
        { title: 'Style No', dataIndex: 'StyleNo', key: 'StyleNo' },
        { title: 'Color', dataIndex: 'color', key: 'color' }, 
        { title: 'Garment Quantity', dataIndex: 'garmentQuantity', key: 'garmentQuantity' },
        { title: 'Consumption', dataIndex: 'consumption', key: 'consumption' },
        { title: 'Wastage', dataIndex: 'wastage', key: 'wastage' },
        { title: 'Fabric Quantity', dataIndex: 'FabricQuantity', key: 'FabricQuantity' },
        { title: 'UOM', dataIndex: 'uom', key: 'uom' },
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
                name ="StyleNo"
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
                name ="color"
              >
                <Select placeholder="color" allowClear>
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
                <Input placeholder="Garment Quantity" allowClear/>
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
                <Input placeholder="Consumption" allowClear/>
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
            <Input placeholder="wastage" allowClear/>

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
                name="FabricQuantity"
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
                name="uom"
              >
            <Select  placeholder="UOM" allowClear>
              <option key="1" value="kg">kg</option>
              <option key="2" value="ton">ton</option>

            </Select>

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
              <Upload>
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
            <Button onClick={onReset} style={{marginTop:100,marginLeft:30}}  >
              Reset
            </Button>
          </Form.Item>
        </Col>

        <Form.Item> 
           <Button type="primary" onClick={showModal} style={{marginTop:100,marginLeft:60}} > Map items</Button> 
           <M3Items visible={modalVisible} onClose={closeModal}/> 
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