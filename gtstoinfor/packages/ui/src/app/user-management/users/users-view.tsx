import { ProColumns, ProTable } from "@ant-design/pro-components";
import { UsersService } from "@project-management-system/shared-services";
import { Button, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import TableActions from "../../common/table-actions/table-actions";
import { UsersActivateDeactivateDto, UsersDto } from "@project-management-system/shared-models";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

export default function UsersView() {
  const services = new UsersService();
  const navigate = useNavigate();

  const getAllUsersData = async (params = {}, sort, filter) => {
    const res = await services.getAllUsers();
    if (res.status) {
      return { data: res.data, sucess: true, total: res.data.length };
    } else {
      return { data: [], sucess: false, total: 0 };
    }
  };

  function onEditClick() { }

  async function onSwitchClick(item: any) {
    const dto = new UsersActivateDeactivateDto(item.id, item.versionFlag, 'admin', !item.isActive)
    await services.activateOrDeactivate(dto);
    window.location.reload()
  }

  const columns: ProColumns<UsersDto>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
      align: "center",
    },
    { title: "Username", dataIndex: "username", align: "center" },
    {
      title: "Factory",
      dataIndex: "factory",
      align: "center",
      filters: true,
      onFilter: true,
      valueType: "select",
      valueEnum: {},
    },
    { title: "Role", dataIndex: "role", align: "center" },
    {
      title: "Status",
      align: "center",
      filters: true,
      onFilter: true,
      valueType: "select",
      valueEnum: {
        open: {
          text: "Active",

        },
        closed: {
          text: "Inactive",

        },
      },
      render: (dom, entity) => {
        return (
          <Tag color={entity.isActive ? "green" : "red"}>
            {entity.isActive ? "Active" : "Inactive"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      align: "center",
      render: (dom, entity) => {
        return (
          <TableActions
            isActive={entity.isActive}
            onClick={onEditClick}
            onSwitchClick={() => { onSwitchClick(entity) }}
          />
        );
      },
    },
  ];

  return (
    <ProTable<UsersDto, any>
      request={getAllUsersData}
      bordered
      size="small"
      cardBordered
      editable={{
        type: "multiple",
      }}
      cardProps={{
        extra: (
          <span>
            <Button
              onClick={() => navigate("/user-management/users-from")}
              type={"primary"}
            >
              New
            </Button>
          </span>
        ),
      }}
      search={false}
      headerTitle={"Users"}
      columns={columns}
    />
  );
}
