import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, Row, Col, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductDto } from "@project-management-system/shared-models";
import { ProductService } from "@project-management-system/shared-services";
import AlertMessages from "../../common/common-functions/alert-messages";

export interface ProductFormProps {
  data: ProductDto;
  updateProduct: (dto: ProductDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function ProductForm(props: ProductFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Service = new ProductService();

  const createProduct = (dto: ProductDto) => {
    dto.createdUser = "admin";
    Service.createProduct(dto)
      .then((res) => {
        if (res.status) {
          message.success("Product created Successfully", 2);
          navigate("/masters/product/product-view");
          onReset();
        } else {
          if (res.status) {
            message.error(res.internalMessage, 2);
          } else {
            message.error(res.internalMessage, 2);
          }
        }
      })
      .catch((err) => {
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const saveData = (values: ProductDto) => {
    if (props.isUpdate) {
      props.updateProduct(values);
    } else {
      createProduct(values);
    }
  };

  return (
    <Card
      title={<span>Product</span>}
      style={{ textAlign: "left" }}
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      extra={
        props.isUpdate == true ? (
          ""
        ) : (
          <Link to="/masters/product/product-view">
            <span style={{ color: "white" }}>
              <Button type={"primary"}>View </Button>{" "}
            </span>
          </Link>
        )
      }
    >
      <Form
        form={form}
        layout={"vertical"}
        initialValues={props.data}
        name="control-hooks"
        onFinish={saveData}
      >
        <Form.Item name="productId" style={{ display: "none" }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: "none" }} name="createdUser">
          <Input hidden />
        </Form.Item>
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <Form.Item
              name="product"
              label="Product"
              rules={[
                {
                  required: true,
                  message: "Product Is Required",
                },
                {
                  pattern:
                    /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                  message: `Should contain only alphabets and numbers.`,
                },
              ]}
            >
              <Input placeholder="Enter Product" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            {props.isUpdate === false && (
              <Button
                htmlType="button"
                style={{ margin: "0 14px" }}
                onClick={onReset}
              >
                Reset
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default ProductForm;
