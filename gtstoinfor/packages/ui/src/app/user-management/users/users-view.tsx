import { ProTable } from "@ant-design/pro-components";
import { UsersService } from "@project-management-system/shared-services";
import { Tag, message } from "antd";
import React, { useEffect, useState } from "react";

export default function UsersView() {
  const [usersData, setUsersData] = useState<any>();

  const services = new UsersService();

  const getAllUsers = async () => {
    services
      .getAllUsers()
      .then((res) => {
        if (res.data) {
          setUsersData(res.data);
          console.log(res.data);
        } else {
          setUsersData([]);
          message.error(res.internalMessage);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    { title: "Username", dataIndex: "username" },
    { title: "Factory", dataIndex: "factory" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Status",
      render: (val) => {
        console.log(val.isActive);
        return (
          <Tag color={val.isActive ? "green" : "red"}>
            {val.isActive ? "Active" : "Inactive"}
          </Tag>
        );
      },
    },
    { title: "Action" },
  ];
  return (
    <ProTable
      search={false}
      headerTitle={"Users"}
      columns={columns}
      dataSource={usersData}
      rowKey={"id"}
    />
  );
}
