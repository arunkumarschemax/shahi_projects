import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import { Link } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import { SKUlistService } from "@project-management-system/shared-services";
import { SKUlistFilterRequest } from "@project-management-system/shared-models";

const { Title, Text } = Typography;

export const SkuList = () => {
  const [form] = Form.useForm();
  const [itemData, setItemData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control the modal visibility
  const [selectedItemNo, setSelectedItemNo] = useState(null);
  const service = new SKUlistService();
  const [sku, setSKU] = useState([]);
  const [data, setData] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    // fetchItemData();
    Dropdown();
    Filters();
  }, []);
  useEffect(() => {
    setSelectedItemNo([]); // Set the default selected item number
    Dropdown(); // Call Dropdown to fetch SKUs for the default item
    Filters(); // Call Filters to fetch other data if needed
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
  const Filters = () => {
    service.getAllitemsCode().then((res) => {
      if (res) {
        setData(res);
        console.log(res, "8888888");
      }
    });
  };

  // const handleCardClick = (item) => {
  //     if (selectedItem === item) {
  //       setSelectedItem(null);
  //     } else {
  //       setSelectedItem(item);

  //       // Fetch SKUs for the selected item
  //       const req = new SKUlistFilterRequest(item.itemsNo); // Assuming item.itemsNo contains the selected item number
  //       service.getAllMapItems(req).then((res) => {
  //         if (res) {
  //           // Update the `sku` state with the response data
  //           setSKU(res.data);
  //         }
  //       });
  //     }
  //   };

  const fetchSkuData = async (selectedItemId) => {
    // Replace with your logic to fetch SKU data based on the selected item
    try {
      const skuData = await service.getAllMapItems(selectedItemId);
      setSKU(skuData);
    } catch (error) {
      // Handle error
      console.error("Error fetching SKU data:", error);
    }
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    fetchSkuData(item.itemNoId); // Fetch SKU data based on selected item
  };

  const handleSearch = () => {
    if (selectedItemNo) {
      const req = new SKUlistFilterRequest(selectedItemNo);
      service.getAllMapItems(req).then((res) => {
        if (res) {
          // Update the `itemData` state with the response data
          setItemData(res);
          console.log(res, "9999999999999");
        }
      });
    } else {
      // Handle the case where no item number is selected
      // You can display an error message or take appropriate action.
      console.log("Please select an item number");
    }
  };

  const Sku = (val, data) => {
    console.log(data, "22222222222");
    setSelectedItemNo(data.code);
    Dropdown();
  };
  
  const Dropdown = () => {
    const req = new SKUlistFilterRequest(selectedItemNo);
    console.log(req, "Im dropdown");

    service.getAllMapItems(req).then((res) => {
      if (res) {
        console.log(res, "lllllllll");
        setSKU(res.data);
      }
    });
  };

  const handleItemSelect = (selectedItemsNo) => {
    // Find the selected item using itemsNo
    const selectedItem = itemData.find(
      (item) => item.itemsNo === selectedItemsNo
    );

    // Set the selected item in the state
    setSelectedItem(selectedItem);
  };

  return (
    <>
      <Card title="SKU List">
        <Form form={form} style={{ fontSize: "10px" }} layout="vertical">
          <Row gutter={16}>
            {/* <FormItem name="itemNoId" style={{display:'none'}}>
    <Input hidden/>
</FormItem> */}
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 5 }}
              xl={{ span: 5 }}
            >
              <Form.Item
                style={{ flexDirection: "row" }}
                label="Item No"
                name="itemsNo"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select Item No"
                  onChange={(val, text) => Sku(val, text)}
                >
                  {data.map((e) => {
                    console.log(e.itemNoId, "itemId");
                    return (
                      <Option
                        key={e.itemNoId}
                        value={e.itemNoId}
                        code={e.itemsNo}
                      >
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
              lg={{ span: 5 }}
              xl={{ span: 5 }}
            >
              <Form.Item
                style={{ flexDirection: "row" }}
                label="Size"
                name="size"
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
              lg={{ span: 5 }}
              xl={{ span: 5 }}
            >
              <Form.Item
                style={{ flexDirection: "row" }}
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
              lg={{ span: 5 }}
              xl={{ span: 5 }}
            >
              <Form.Item
                style={{ flexDirection: "row" }}
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
            <Col>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                style={{ marginLeft: "20%" }}
                onClick={handleSearch} // Call the search function
              >
                Search
              </Button>
            </Col>
            <Col>
              <Button
                type="default"
                icon={<UndoOutlined />}
                style={{ color: "red" }}
              >
                Reset
              </Button>
            </Col>
          </Row>

          <div>
            {itemData.map((item) => (
              <Card
                key={item.itemsNo}
                title={`Item No: ${item.itemsNo}`}
                style={{ marginBottom: 16, cursor: "pointer" }}
                onClick={() => handleCardClick(item)}
              >
                <Row gutter={16}>
                  {sku && sku.length > 0 &&
                    sku.map((response) =>
                      response.level ? (
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={6}
                          xl={6}
                          key={response.sku}
                        >
                          <Card
                            bordered={true}
                            style={{
                              marginBottom: 16,
                              borderRadius: 8,
                              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                              background: "lightgrey",
                              borderTop: "1px solid #e8e8e8",
                            }}
                          >
                            <Text strong>SKU Code: {response.skuId}</Text>
                            <br />
                            <Text strong>Size: {response.sizeId}</Text>
                            <br />
                            <Text strong>Color: {response.colorId}</Text>
                            <br />
                            <Text strong>Destination: {response.destinationId}</Text>
                            <br />
                          </Card>
                        </Col>
                      ) : null
                    )}
                </Row>
              </Card>
            ))}
          </div>
        </Form>
      </Card>
    </>
  );
};
export default SkuList;
