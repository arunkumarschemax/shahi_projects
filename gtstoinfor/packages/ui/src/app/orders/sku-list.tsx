import { Button, Card, Checkbox, Col, DatePicker, Descriptions, Form, Input, Modal, Row, Segmented, Select, Space, Table, Tabs } from "antd";
import { CreditCardOutlined, HomeOutlined, PlusCircleOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { AppstoreOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import { Link } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import { SKUlistService } from "@project-management-system/shared-services";
import { SKUlistFilterRequest } from "@project-management-system/shared-models";


   export const SkuList=()=>{
   const  [form] = Form.useForm();
   const [itemData, setItemData] = useState([]);
   const [selectedItemNo, setSelectedItemNo] = useState(null);
   const service = new SKUlistService
   const [data,setData]=useState([]);
   const { Option } = Select;
   const { TabPane } = Tabs;
   const [selectView, setSelectedView]= useState<any>('cards');
   const [options, setOptions] = useState(['Cards','View']);
    useEffect(() => {
    Dropdown(); 
    }, []);

               const handleSearch = () => {
               if (selectedItemNo) {
               const req = new SKUlistFilterRequest(selectedItemNo)
               service.getAllMapItems(req).then((res) => {
               if (res) {
               setItemData(res);
              }
              });
              } else {
                      }
             };
  
              
              const Sku = (val,data) => {
              setSelectedItemNo(val);
              };

              const Dropdown = () => {
                service.getAllitemsCode().then((res) => {
                  if (res) {
                    setData(res);
                    // console.log(res,'[[[[[[[[[res')
                  }
                });
              };
              
              const resetForm = () => {
                form.resetFields();
                setItemData([]);
              };
              const handleViewChange =(view)=>{
                setSelectedView(view)
              }
              const columnsSkelton:any=[
              
                  {
                    title: 'SKU Code',
                    dataIndex: 'skuId',
                    key: 'skuId',
                    width:'300px'

                    // render: (skus) => skus.map((sku) => sku.skuId),
                  },
                  {
                    title: 'Sizes',
                    dataIndex: 'sizes',
                    key: 'sizes',
                    width:'300px'

                    // render: (skus) => skus.map((sku) => sku.sizes),
                  },
                  {
                    title: 'Destinations',
                    dataIndex: 'destinations',
                    key: 'destinations',
                    width:'300px'

                    // render: (skus) => skus.map((sku) => sku.destinations),
                  },
                  {
                    title: 'Colours',
                    dataIndex: 'colour',
                    key: 'colours',
                    width:'300px'

                    // render: (skus) => skus.map((sku) => sku.colour),
                  },
               
        
            ]
               return(
               <>
               <Card title="SKU List">
               <Form form={form}
               style={{ fontSize: "10px" }}
               layout="vertical"   
              >
              <Row gutter={16}>
               <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 5}}
                    xl={{ span: 5 }}
                  >
                    <Form.Item
                    style={{flexDirection:'row'}}
                    label="Item No"
                     name="itemsNo"
                    >
                     <Select
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        placeholder="Select Item No"
                        onChange={(val,text)=>Sku(val,text)}
                    >
                       {data.map(e=>
                        <Option key={e.itemNoId} val={e.itemNoId} code={e.itemsNo}>{e.itemsNo}</Option>)}
                    </Select>
                    </Form.Item>
                  </Col>
                <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 5}}
                    xl={{ span: 5 }}
                >
                    <Form.Item
                    style={{flexDirection:'row'}}
                      label="Size"
                      name="size"
                     
                    >
                      <Select
                      placeholder="Select Size"
                      allowClear
                      showSearch
                        optionFilterProp="children"
                        onChange={(val,text)=>Sku(val,text)}
                      >
                      {data.map((e) => {
                        return (
                            <Option key={e.sizeId} value={e.sizeId} code={e.sizes}>
                            {e.sizes}
                            </Option>
                        );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 5}}
                    xl={{ span: 5 }}
                    
                  >
                    <Form.Item
                    style={{flexDirection:'row'}}
                      label="Colour"
                      name="colour"
                     
                    >
                     <Select
                      placeholder="Select Colour"
                      allowClear
                      showSearch
                        optionFilterProp="children"
                      >
                      {data.map((e) => {
                        return (
                            <Option key={e.colourId} value={e.colourId}>
                            {e.colour}
                            </Option>
                        );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 5}}
                    xl={{ span: 5 }}
                    
                  >
                    <Form.Item
                    style={{flexDirection:'row'}}
                      label="Destination"
                      name="destination"
                     
                    >
                      <Select
                      placeholder="Select Destination"
                      allowClear
                      showSearch
                        optionFilterProp="children"
                      >
                      {data.map((e) => {
                        return (
                        <Option key={e.destinationId} value={e.destinationId}>
                        {e.destinations}
                        </Option>
                        );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Row gutter={6}>   
                  <Col  >
                  <FormItem
                  
                 style={{flexDirection:'row'}}
                  label=" ">
                <Button
                type="primary"
                icon={<SearchOutlined />}
                // style={{ marginTop: "50"}}
                onClick={handleSearch} 
                 >
                Search
               </Button>
               {/* </Col>      
               <Col
               > */}
               <Button
                type="default"
                icon={<UndoOutlined />}
                style={{ color: "red",marginLeft: "1",}}
                onClick={resetForm}
              >
                Reset
              </Button>
              </FormItem>
              </Col> 
              </Row>           
              </Row>

     

          </Form>
          </Card>     

<div>
<Space direction="vertical" style={{fontSize:"16px"}}>
      <Segmented options={[
        {
          label: (
            <>
              <CreditCardOutlined  style={{ marginRight: "8px" }} />
              <span style={{ fontSize: "16px" }}>Cards</span>
            </>
          ),
          value: "cards",
        },
        {
          label: (
            <>
              <AppstoreOutlined style={{ marginRight: "8px" }} />
              <span style={{ fontSize: "16px" }}>Grid</span>
            </>
          ),
          value: "grid",
        },
    ]}  
      onChange={handleViewChange} 
      defaultValue={'cards'}  />
      {/* {selectView === 'grid'?(
        <SKUGrid/>
      ):(<div> */}
      {selectView === 'cards'?(
        <div>
      {itemData.map((item) => (
             <Card
             key={item.itemsNo}
             title={`Item No: ${item.itemsNo}`}
             style={{ cursor: 'pointer' }}
             >
             <Row gutter={[-1, -1]}>
             {item.skus.map((e) => (
               <Col
               xs={{ span: 24 }}
               sm={{ span: 24 }}
               md={{ span: 3 }}
               lg={{ span: 6 }}
               xl={{ span: 5 }}
               key={e.skuId}
             >
            <div>
           <Card style={{ width: '70%', height: '100%' , backgroundColor: '#E3F1E1 '}}>
          <Descriptions column={1} style={{ fontSize: '2px' }} title={`SKU Code: ${e.skuId}`}>
            <Descriptions.Item label='Size'>{e.sizes}</Descriptions.Item>
            <Descriptions.Item label='Colour'>{e.colour}</Descriptions.Item>
            <Descriptions.Item label='Destination'>{e.destinations}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </Col>
  ))}
</Row>
    </Card>
     
  
  ))}
  </div>
  ):(<div>
    {itemData.map(e =>(
      <Card 
      style={{width:"1240px"}}
      key={e.itemsNo}
      title={`Item No: ${e.itemsNo}`}
      >
        <Table dataSource={e.skus} columns={columnsSkelton} size="small"/>
      </Card>
    ))}
  </div>)}
    </Space>
         
</div>
        
        </>
        
    );
};
export  default SkuList