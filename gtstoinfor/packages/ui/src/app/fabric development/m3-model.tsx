import React, { useState } from 'react';
import { Modal, Form, Input, Row, Col, Table } from 'antd';


const MyModal = ({ visible, onClose }) => {
    const [form] = Form.useForm();

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
      form.validateFields()
        .then(values => {
          // Do something with the form values
          console.log(values);
          form.resetFields();
          onClose(); // Close the modal
        })
        .catch(error => {
          console.error("Validation error:", error);
        });
    };
  
    const handleCancel = () => {
      form.resetFields();
      onClose(); // Close the modal
    };
  
    return (

      <Modal
        title="Shahi Export Pvt Ltd"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      > 
           {/* <Form>
            <Form.Item
              label="Additional"
              name="additional"
              
            >
              <Input placeholder="Additional Input" />
            </Form.Item>
            </Form> */}
        <Table  columns={columns}/>
      </Modal>
    );
  };
  
  export default MyModal;
  