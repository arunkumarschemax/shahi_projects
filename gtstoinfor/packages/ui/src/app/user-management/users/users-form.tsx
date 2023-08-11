import {
  FooterToolbar,
  PageContainer,
  ProForm,
} from "@ant-design/pro-components";
import { Button, Card, Form, Input, Select, message } from "antd";

import { FactoryService, UsersService } from '@project-management-system/shared-services'
import { AllFactoriesResponseModel, FactoryDto, UsersDto } from "@project-management-system/shared-models";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



const roleOptions = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "sourcing",
    label: "Sourcing",
  },
  {
    value: "logistics",
    label: "Logistics",
  },
  {
    value: "factory",
    label: "Factory",
  },
  {
    value: "accounts",
    label: "Accounts",
  }
];



export default function UserCreationForm() {

  const [activeFactoryData, setActiveFactoryData] = useState<FactoryDto[]>()

  const userServices = new UsersService
  const factoryServices = new FactoryService
  const pathToreDirect = '/user-management/users-view'
  const [formRef] = Form.useForm()
  const navigate = useNavigate();

  const getActiveFactories = async () => {
    try {
      await factoryServices.getActiveFactories().then(res => {
        if (res.status) {
          setActiveFactoryData(res.data)
        } else {
          message.error(res.internalMessage)
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }


  const handleFinish = async (values: any) => {
    const userDto = new UsersDto(null, values.username, values.password, values.factory, values.role, 'admin')
    userServices.createUser(userDto).then(res => {
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

  const factoryOptions = [

    // activeFactoryData.map((item:any) => {

    // })

    // {
    //   value: "unit-1",
    //   label: "Unit-1",
    // },
  ]

  useEffect(() => {
    getActiveFactories()
  }, [])

  return (
    <div>
      <PageContainer title="Add User" extra={<Button onClick={() => navigate('/user-management/users-view')} type={'primary'}>View</Button>} >
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
              <Select>
                {activeFactoryData?.map((item: any) => (
                  <Select.Option key={item.id}> {item.name},   {item.address} </Select.Option>
                ))}
              </Select>
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
