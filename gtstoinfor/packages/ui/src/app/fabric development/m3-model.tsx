// import React, { useState } from 'react';
// import { Modal, Form, Input, Row, Col, Table, Select } from 'antd';


// const M3Items = ({ visible, onClose }) => {
//     const [M3Item] = Form.useForm();

//     const columns:any= [
//         {
//             title:"Map Items",
//             dataIndex:"m3items"
//         },
//         {
//             title:"Descriptions",
//             dataIndex:"description"
//         }
//     ]

  
//     const handleOk = () => {
//       M3Item.validateFields()
//         .then(values => {
//           // Do something with the form values
//           console.log(values);
//           M3Item.resetFields();
//           onClose(); // Close the modal
//         })
//         .catch(error => {
//           console.error("Validation error:", error);
//         });
//     };
  
//     const handleCancel = () => {
//       M3Item.resetFields();
//       // onClose(); // Close the modal
//     };
  
//     return (

//       <Modal
//         // title="Maps Items"
//         visible={visible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       > 
//            <Form form={M3Item}>
//            <Col
//                     xs={{ span: 24 }}
//                     sm={{ span: 24 }}
//                     md={{ span: 8 }}
//                     lg={{ span: 8}}
//                     xl={{ span: 8 }}
//                   >
//             <Form.Item
//               label="Item No"
//               name="ItemNo"
                           
//             >
//               <Select placeholder="Item No" allowClear>
//               </Select>
//             </Form.Item>
//             </Col>
//             </Form>
//         <Table  columns={columns}/>
//       </Modal>
//     );
//   };
  
//   export default M3Items;


import React, { useState } from 'react';
import { Modal, Form, Input, Row, Col, Table, Select } from 'antd';

const M3Items = ({ visible, onClose }) => {
  const [M3Item] = Form.useForm();
  const [selectedItemNo, setSelectedItemNo] = useState(null);

  const hardcodedData = [
    { m3items: 'Item001', description: 'Description for Item001' },
    { m3items: 'Item002', description: 'Description for Item002' },
    { m3items: 'Item003', description: 'Description for Item003' },
    // ... Add more data items as needed
  ];

  const columns = [
    {
      title: 'Map Items',
      dataIndex: 'm3items',
    },
    {
      title: 'Descriptions',
      dataIndex: 'description',
    },
  ];

  const handleOk = () => {
    M3Item.validateFields()
      .then((values) => {
        // Do something with the form values
        console.log(values);
        M3Item.resetFields();
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error('Validation error:', error);
      });
  };

  const handleCancel = () => {
    M3Item.resetFields();
    onClose(); // Close the modal
  };

  const handleItemNoChange = (value) => {
    // Update the selected Item No and reset filtered data
    setSelectedItemNo(value);
  };

  // Filter the hardcoded data based on the selected Item No
  const filteredData = selectedItemNo
    ? hardcodedData.filter((item) => item.m3items === selectedItemNo)
    : [];

  return (
    <Modal visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={M3Item}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 8 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
        >
          <Form.Item label="Item No" name="ItemNo">
            <Select
              placeholder="Item No"
              allowClear
              onChange={handleItemNoChange}
            >
              {hardcodedData.map((item) => (
                <Select.Option key={item.m3items} value={item.m3items}>
                  {item.m3items}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Form>
      
        <Table columns={columns} dataSource={filteredData} />
      
    </Modal>
  );
};

export default M3Items;


  