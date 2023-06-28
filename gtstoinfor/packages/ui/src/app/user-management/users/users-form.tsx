import {
  FooterToolbar,
  PageContainer,
  ProForm,
} from "@ant-design/pro-components";
import { Card, Form, Input, Select, message } from "antd";

import { UsersService } from '@project-management-system/shared-services'
import { UsersDto } from "@project-management-system/shared-models";
import { useNavigate } from "react-router-dom";

const factoryOptions = [
  {
    value: "unit-1",
    label: "Unit-1",
  },
  {
    value: "unit-2",
    label: "Unit-2",
  },
  {
    value: "unit-3",
    label: "Unit-3",
  },
  {
    value: "unit-4",
    label: "Unit-4",
  },
  {
    value: "unit-5",
    label: "Unit-5",
  },
  {
    value: "unit-6",
    label: "Unit-6",
  },
  {
    value: "unit-7",
    label: "Unit-7",
  },
  {
    value: "unit-8",
    label: "Unit-8",
  },
  {
    value: "unit-9",
    label: "Unit-9",
  },
  {
    value: "unit-10",
    label: "Unit-10",
  },
];

const roleOptions = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "generaluser",
    label: "General User",
  },
];



export default function UserCreationForm() {

  const services = new UsersService
  const pathToreDirect = '/user-management/users-view'
  const [formRef] = Form.useForm()
  const navigate = useNavigate();


  const handleFinish = async (values: any) => {
    const userDto = new UsersDto(null, values.username, values.password, values.factory, values.role, 'admin')
    services.createUser(userDto).then(res => {
      if (res.status) {
        message.success(res.internalMessage)
        formRef.resetFields()
        setTimeout(() => {
          navigate(pathToreDirect);
      }, 500);
      } else {
        message.error(res.internalMessage)
      }
    }).catch(err => {
      console.log(err.message);
    })
  }

  return (
    <div>
      <PageContainer title="Add User">
        <Card>
          <ProForm
            form={formRef}
            submitter={{
              render: (_, dom) => (
                <FooterToolbar style={{ height: "10%" }}>{dom}</FooterToolbar>
              ),
            }}
            onFinish={handleFinish}
          >
            <Form.Item
              name="username"
              label="User Name"
              style={{ color: "#ffff" }}
              rules={[
                {
                  required: true,
                  message: "please enter username",
                },
              ]}
            >
              <Input placeholder="enter username" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              style={{ color: "#ffff" }}
              rules={[
                {
                  required: true,
                  message: "please enter username",
                },
              ]}
            >
              <Input.Password
                //  style={{ width: "46.5%", paddingLeft:'20px' }}
                placeholder="enter password"
              />
            </Form.Item>
            <Form.Item
              name="factory"
              label="Factory"
              style={{ color: "#ffff" }}
              rules={[
                {
                  required: true,
                  message: "please select factory",
                },
              ]}
            >
              <Select options={factoryOptions} />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              style={{ color: "#ffff" }}
              rules={[
                {
                  required: true,
                  message: "please select role",
                },
              ]}
            >
              <Select options={roleOptions} />
            </Form.Item>
          </ProForm>
        </Card>
      </PageContainer>
    </div>
  );
}
