import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Row, Col, Table, Select } from 'antd';
import { FabricDevelopmentService } from '@project-management-system/shared-services';
import { FabricFilterRequest } from '@project-management-system/shared-models';

export interface M3ItemsProps {
  
  itemList: (ItemsDataData: any[]) => void;
  visible:boolean
  onClose :() => void
}

const M3Items = (props:M3ItemsProps) => {
  const [M3Item] = Form.useForm();
  const [selectedItemNo, setSelectedItemNo] = useState(null);
  const [data, setData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);


  const service = new FabricDevelopmentService();

  useEffect(() => {
    getAllitemsCode();
  }, []);

  const getAllitemsCode = () => {
    service.getAllitemsCode().then((res) => {
        setData(res);
        console.log(res,'itemscode')
    });
  };

  const columns = [
    {
      title: 'Map ItemsCode',
      dataIndex: 'itemsCode',
    },
    {
      title: 'Descriptions',
      dataIndex: 'description',
    },
  ];


  const handleOk = (value) =>{
    props.onClose(); // Close the modal
    M3Item.resetFields();
    props.itemList(filterData)

    
  }

  const handleCancel = () => {
    M3Item.resetFields();
    props.onClose(); // Close the modal
  };

  const handleItemNoChange = (value) => {
    console.log(value,"hhh")
    const req = new FabricFilterRequest(value);
    console.log(req,"4544")
    service.getAllMapItems(req).then((res) => {
      setFilterData(res);
      props.itemList(res)
  });
  
  };

  console.log(filterData,'filterdata')

  
  return (
    <Modal visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={M3Item} >
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 8 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
        >
          <Form.Item label="Item No" name="itemsId">
            <Select
              placeholder="Item No"
              allowClear
              mode="multiple"
              onChange={handleItemNoChange}
            >
              {data.map((item) => (
                <Select.Option key={item.itemsId} value={item.itemsId}>
                  {item.itemsCode}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
        </Col>
      </Form>
      
        <Table columns={columns} dataSource = {filterData} pagination={false}/>
      
    </Modal>
  );
};

export default M3Items;


  