import { Button, Card, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, Space } from "antd";
import { HomeOutlined, PlusCircleOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import { Link } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import { SKUlistService } from "@project-management-system/shared-services";


export const SkuList=()=>{
   const  [form] = Form.useForm();
   const [itemData, setItemData] = useState([]);
   const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item
   const [isModalVisible, setIsModalVisible] = useState(false); // State to control the modal visibility
   const [selectedItemCode, setSelectedItemCode] = useState(null); // State to track the selected item code
    const service = new SKUlistService
    const [sku,setSKU]=useState([]);
    const [data,setData]=useState([]);
    const { Option } = Select;

   useEffect(() => {
    // fetchItemData();
    Dropdown();
    Filters();
  }, []);

//   const fetchItemData = () => {
//   const mockItemData = [
//     {
//       itemCode: 'I001',
//       skus: [
//         {
//           skuId: 'SKU001',
//           sizes: ['S'],
//           destinations: ['Domestic'],
//           colour: ['Red'],
//         },
//         {
//           skuId: 'SKU002',
//           sizes: ['L'],
//           destinations: ['Domestic'],
//           colour: ['Green'],
//         },
//       ],
//     },
//     {
//         itemCode: 'I002', // Add another item code
//         skus: [
//           {
//             skuId: 'SKU003',
//             sizes: ['M'],
//             destinations: ['Domestic'],
//             colour: 'Blue',
//           },
//           {
//             skuId: 'SKU004',
//             sizes: ['XL'],
//             destinations: ['International'],
//             colour: 'Yellow',
//           },
//           {
//             skuId: 'SKU005',
//             sizes: ['XXL'],
//             destinations: ['canada'],
//             colour: 'Yellow',
//           },
//         ],
//       },
//     // Add more item data here
//   ];

//   setItemData(mockItemData);
// };


const Dropdown=()=>{
service.getAllMapItems().then(res=>{
    if(res){
        console.log(res,'lllllllll')
        setSKU(res.data);
    }
})
}
 
// const handleSearch = () => {
//     // Check if an item number is selected
//     if (selectedItemNo) {
//       // Call the SKUlistService to fetch SKUs based on the selected item number
//       service.getAllitemsCode(selectedItemNo).then((res) => {
//         if (res) {
//           // Update the `itemData` state with the response data
//           setItemData(res);
//         }
//       });
//     } else {
//       // Handle the case where no item number is selected
//       // You can display an error message or take appropriate action.
//       console.log("Please select an item number");
//     }
//   };
const Filters =()=>{
    service.getAllitemsCode().then(res=>{
        if(res){
            setData(res);
            console.log(res,"8888888")
        }
    })
}

const handleCardClick = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  

     return(
        <>
        <Card title="SKU List">
            <Form form={form}
          style={{ fontSize: "10px" }}
          layout="vertical"
          
          >
            <Row gutter={16}>
            {/* <FormItem name="itemNoId" style={{display:'none'}}>
    <Input hidden/>
</FormItem> */}
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
                      rules={[{ required: true, message: "Enter Item No" }]}
                    >
                        <Select
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        placeholder="Select Item No"
                    >
                        {data.map((e) => {
                        return (
                            <Option key={e.itemNoId} value={e.itemNoId}>
                            {e.itemsNo}
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
                      label="Size"
                      name="size"
                      rules={[{ required: true, message: "Enter Size" }]}
                    >
                      <Select
                      placeholder="Select Size"
                      allowClear
                      showSearch
                        optionFilterProp="children"
                      >
                      {data.map((e) => {
                        return (
                            <Option key={e.sizeId} value={e.sizeId}>
                            {e.size}
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
                      rules={[{ required: true, message: "Enter Colour" }]}
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
                      rules={[{ required: true, message: "Enter Destination" }]}
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
                  <Col  >
          <Button type="primary" icon={<SearchOutlined />} style={{marginLeft:'20%'}} >
            Search
          </Button>
        </Col>      
        <Col
        >
          <Button type="default"icon={<UndoOutlined />} style={{ color: 'red' }} >
            Reset
          </Button>
        </Col>            
            </Row>


         
    <div>
      {itemData.map((item) => (
        <Card
          key={item.itemCode}
          title={`Item Code: ${item.itemCode}`}
          style={{ marginBottom: 16, cursor: 'pointer' }}
          onClick={() => handleCardClick(item)}
        >
          {/* Display the item code here */}
        </Card>
      ))}

      {/* Display SKUs for the selected item */}
      {selectedItem && (
        <div>
          <h2>Selected Item: {selectedItem.itemCode}</h2>
          {selectedItem.skus.map((sku) => (
            <Card
              key={sku.skuId}
              style={{
                marginBottom: 16,
                backgroundColor: '#E7F8EB',
                width: '30%',
                marginRight: '16px',
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <strong>SKU ID:</strong> {sku.skuId}
                </Col>
                <Col span={12}>
                  <strong>Size:</strong> {sku.sizes}
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <strong>Destinations:</strong> {sku.destinations}
                </Col>
                <Col span={12}>
                  <strong>Colour:</strong> {sku.colour}
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      )}
    </div>

          </Form>
          </Card>
        </>
    )
}
export  default SkuList