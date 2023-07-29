import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, Select } from 'antd';
import { ItemSubCategoriesDto, ItemCategoriesDto } from '@project-management-system/shared-models';
import { ItemSubCategoryService, ItemCategoryService } from '@project-management-system/shared-services';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
 

const { TextArea } = Input;
const { Option } = Select;
/* eslint-disable-next-line */
export interface ItemSubCategoriesFormProps {
  subCategoryData: ItemSubCategoriesDto;
  updateData: (subCategory: ItemSubCategoriesDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function ItemSubCategoriesForm(
  props: ItemSubCategoriesFormProps
) {
  const [form] = Form.useForm();
  const service = new ItemSubCategoryService;
  let navigate = useNavigate();

  const [itemCategoryData, setItemCategoryData] = useState<ItemCategoriesDto[]>([]);
  const itemCategoryService = new ItemCategoryService();
  const [selectedItemCategory, setSelectedItemCategory] = useState<number>(null);

  useEffect(() => {
    getAllItemCategories();
  }, []);

  const getAllItemCategories = () => {
    itemCategoryService.getActiveItemCategories().then(res => {
      if (res.status) {
        setItemCategoryData(res.data);
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

  const save = (Data: ItemSubCategoriesDto) => {
    service.create(Data).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage('Created Successfully');
        navigate("/masters/item-sub-categories/item-sub-categories-view")
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

  const saveData = (values: ItemSubCategoriesDto) => {
    if (props.isUpdate) {
      props.updateData(values);
    } else {
      save(values);
    }
  }

  const handleItemCategory = (value, item) => {
    setSelectedItemCategory(value);
  }

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card title={<span >Item Sub Categories</span>} style={{ textAlign: 'center' }} headStyle={{ border: 0 }} extra={props.isUpdate == true ? "" : <Link to='/masters/item-sub-categories/item-sub-categories-view' ><Button type={'primary'} >View </Button></Link>}
    >
      <Form layout="vertical" form={form} initialValues={props.subCategoryData} name="control-hooks" onFinish={saveData}>
        <Form.Item name="itemSubCategoryId" style={{ display: "none" }} >
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: "none" }} name="createdUser" initialValue={props.subCategoryData}>
          <Input hidden />
        </Form.Item>
        <Row gutter={24}>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="itemCategoryId"
              label="Item Category"
              rules={[
                {
                  required: true,
                  message: 'Item Category is required'
                },
              ]}>
              <Select
                placeholder="Select Item Category"
                onSelect={handleItemCategory}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {itemCategoryData?.map(dropData => {
                  return <Option key={dropData.itemCategoryId} value={dropData.itemCategoryId}>{dropData.itemCategory}</Option>
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="itemSubCategory"
              label="Item Sub Category Name"
              rules={[
                {
                  required: true, message: 'Sub Category Name is required'

                },
                {
                  pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                  message: `Should contain only alphabets.`
                }
              ]}>
              <Input placeholder='Enter Item Sub Category'/>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="itemSubCategoryCode"
              label="Item Sub Category Code"
              rules={[
                {
                  required: true, message: 'Sub Category Code is required'

                },
                {
                  pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z\\0-9\[\]()@#$_\-+/`~{}:";'<>,.?|\s-]*$/,
                  message: `Invalid Item Sub Category Code`
                }
              ]}>
              <Input placeholder='Enter Item Sub Category Code'/>
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

export default ItemSubCategoriesForm;
