import { ItemInfoFilterReq, updateItemId } from "@project-management-system/shared-models";
import { BomService, NikeService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Row, Select } from "antd";
import { useEffect, useState } from "react"


const ItemMappingGrid = () => {
const [form] = Form.useForm();
const [data ,setData] = useState<any[]>([]);
const [item ,setItem] = useState<any[]>([]);

const Service = new BomService();

const {Option} = Select

useEffect(() => {
        getImcodes();
        getItemname();
    },[])

    
    const getImcodes = () => {
        Service
          .getImcodes().then((res) => {
            if (res.status) {
              setData(res.data);
            } else {
              setData([]);
            }
          })
        
      };
      const getItemname = () => {
        Service.getItemname().then((res) => {
            if (res.status) {
              setItem(res.data);
            } else {
                setItem([]);
            }
          })
        
      };

      const handleUpdateButtonClick = async () => {
        try {
            const req =new updateItemId
            req.imCode=form.getFieldValue('imCode')
            req.itemId=form.getFieldValue('itemId')
          const result = await Service.updateItemid(req); 
          console.log(result,"resulllllttt");
        } catch (error) {
          console.error("Error occurred during update:", error);
        }
      };

      const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

      const imCodeHandler = (val) => {
        const itemIdValue = form.getFieldValue("itemId");
        if (val && itemIdValue) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
      };
    
      const itemIdHandler = (val) => {
        const imCodeValue = form.getFieldValue("imCode");
        if (val && imCodeValue) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
      };
      return (
        <div>
          <Card title={<span style={{fontWeight: "bold"}}>Item Mapping</span>}>
            <Form form={form} layout='vertical' onFinish={handleUpdateButtonClick}>
              <Row gutter={24}>
                <Col    xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                  <Form.Item name={'imCode'} label='Im Code'>
                    <Select  placeholder='Select Im Code' style={{textAlign:"center"}} onChange={imCodeHandler}
                     dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    >
                      {data.map((item) => (
                        <Option key={item.id} value={item.imCode}>{item.imCode}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5 }} >
                  <Form.Item name={'itemId'} label='Item Name'>
                    <Select  placeholder='Select Item Name' style={{textAlign:"center"}} onChange={itemIdHandler}
                    showSearch
                    dropdownStyle={{ textAlign: "center" }}
                     >
                      {item.map((item) => (
                        <Option key={item.itemId} value={item.itemId}>{item.itemName}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
             <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5 }} style={{paddingTop:"20px"}}>
                <Button type="primary" onClick={handleUpdateButtonClick} disabled={isButtonDisabled}>
                    Update Item
                </Button>
             </Col>
              </Row>
            </Form>
          </Card>
        </div>
      );
  }      

export default ItemMappingGrid;