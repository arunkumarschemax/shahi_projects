import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, Select } from 'antd';
import { DivisionDto, ItemTypeDto, ProductGroupDto } from '@project-management-system/shared-models';
import { DivisionService, FabricTypeService, ItemTypeService, ProductGroupService } from '@project-management-system/shared-services';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
 

const { TextArea } = Input;
const { Option } = Select;
/* eslint-disable-next-line */
export interface ItemTypeFormProps {
  itemtypeData: ItemTypeDto;
  updateData: (subType: ItemTypeDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function ItemTypeForm(
  props: ItemTypeFormProps
) {
  const [form] = Form.useForm();
  const service = new DivisionService;
  const services = new ItemTypeService;
  let navigate = useNavigate();
  const[ type, settype] = useState<DivisionDto[]>([]);
  // const FabricSubtypeService = new FabricTypeService();
const [master,setmaster]=useState<ProductGroupDto[]>([])
 const service2 = new ProductGroupService
  useEffect(() => {
    getAllDivision();
    getAllProductGroups();
  }, []);

  const getAllDivision = () => {
    service.getAllActiveDivision().then(res => {
      if (res.status) {
        settype(res.data);
      } 
    })
  }

  const getAllProductGroups=()=>{
    service2.getAllActiveProductGroup().then(res=>{
      if (res.status) {
        setmaster(res.data);
      } 
    })
  }
  const save = (Data: ItemTypeDto) => {
    services.createItemType(Data).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage('Created Successfully');
        navigate("/masters/item-type/item-type-view")
        onReset();
      } else {
        if (res.status) {
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const saveData = (values: ItemTypeDto) => {
    if (props.isUpdate) {
      props.updateData(values);
    } else {
      save(values);
    }
  }

  const handleItemType = (value, item) => {
    // setFabricSubtypeData(value);
  }

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card title={<span >Item Type</span>} style={{ textAlign: 'center' }} headStyle={{ border: 0 }} extra={props.isUpdate == true ? "" : <Link to='/masters/item-Type/item-type-view' ><Button type={'primary'} >View </Button></Link>}
    >
      <Form layout="vertical" form={form} initialValues={props.itemtypeData} name="control-hooks" onFinish={saveData}>
        <Form.Item name="itemTypeId" style={{ display: "none" }} >
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: "none" }} name="createdUser" initialValue={props.itemtypeData}>
          <Input hidden />
        </Form.Item>
        <Row gutter={24}>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="divisionId"
              label="Division"
              rules={[
                {
                  required: true,
                  message: 'Divsion is required'
                },
              ]}>
              <Select
                placeholder="Select Divsion"
                onSelect={handleItemType}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {type?.map(dropData => {
                  return <Option key={dropData.divisionId} value={dropData.divisionId}>{dropData.divisionName}</Option>
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="productGroupId"
              label="Product Group"
              rules={[
                {
                  required: true,
                  message: 'Product Group is required'
                },
              ]}>
              <Select
                placeholder="Select Product Group"
                onSelect={handleItemType}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {master?.map(dropData => {
                  return <Option key={dropData.productGroupId} value={dropData.productGroupId}>{dropData.productGroup}</Option>
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="itemType"
              label=" Item Type"
              rules={[
                {
                  required: true, message: 'Item Type is required'

                },
                {
                  pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                  message: `Should contain only alphabets.`
                }
              ]}>
              <Input placeholder='Enter Item Type'/>
            </Form.Item>
          </Col>
          
        </Row>

        <Col span={24} style={{ textAlign: 'right' }}>

          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
          {(props.isUpdate === false) &&
            <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
              Reset
            </Button>
          }


        </Col>
      </Form>
    </Card>

  );
}

export default ItemTypeForm;
