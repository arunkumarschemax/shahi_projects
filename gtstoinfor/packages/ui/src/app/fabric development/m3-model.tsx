import React, { useState } from 'react';
import { Modal, Form, Input, Row, Col, Table, Select } from 'antd';


const M3Items = ({ visible, onClose }) => {
    const [M3Item] = Form.useForm();

    const columns:any= [
        {
            title:"Map Items",
            dataIndex:"m3items"
        },
        {
            title:"Descriptions",
            dataIndex:"description"
        }
    ]

  
    const handleOk = () => {
      M3Item.validateFields()
        .then(values => {
          // Do something with the form values
          console.log(values);
          M3Item.resetFields();
          onClose(); // Close the modal
        })
        .catch(error => {
          console.error("Validation error:", error);
        });
    };
  
    const handleCancel = () => {
      M3Item.resetFields();
      onClose(); // Close the modal
    };
  
    return (

      <Modal
        // title="Maps Items"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      > 
           <Form form={M3Item}>
           <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 8 }}
                    lg={{ span: 8}}
                    xl={{ span: 8 }}
                  >
            <Form.Item
              label="Item No"
              name="ItemNo"
                           
            >
              <Select placeholder="Item No" allowClear>
                <option key="1" value="Items1">Items1</option>
                <option key="2" value="Items2">Items2</option>

              </Select>
            </Form.Item>
            </Col>
            </Form>
        <Table  columns={columns}/>
      </Modal>
    );
  };
  
  export default M3Items;
  