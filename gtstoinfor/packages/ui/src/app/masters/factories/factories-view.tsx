import { EditOutlined } from '@ant-design/icons'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { FactoryDto } from '@project-management-system/shared-models'
import { FactoryService } from '@project-management-system/shared-services'
import { Button, Popconfirm, Space, Tag } from 'antd'
import { forEachObject } from 'for-each'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TableActions from '../../common/table-actions/table-actions'

export default function FactoriesView() {
  const navigate = useNavigate()
  const [factoriesData, setFactoriesData] = useState<FactoryDto[]>()
  const factoryService = new FactoryService()



  function onEditClick() {

  }

  function onSwitchClick() {

  }
  const getData = async (params = {}, sort, filter) => {
    const res = await factoryService.getFactories()
    if (res.status) {
      return { data: res.data, sucess: true, total: res.data.length }
    } else {
      return { data: [], sucess: false, total: 0 }
    }
  }

  const columns: ProColumns<FactoryDto>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align:'center'
    },
    { title: 'Factory name', dataIndex: 'name', sorter: true },
    { title: 'Address', dataIndex: "address", },
    {
      title: 'Status',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        open: {
          text: 'Active',
          status: 'Error',
        },
        closed: {
          text: 'Inactive',
          status: 'Success',
        },
      },
      render: (dom, entity) => { return <Tag color={entity.isActive ? 'green' : 'red'}>{entity.isActive ? 'Active' : 'Inactive'}</Tag> }
    },
    { title: 'Action', render: (dom, entity) => { return <TableActions isActive={entity.isActive} onEditClick={onEditClick} onSwitchClick={onSwitchClick} /> } }
  ]
  forEachObject
  return (

    <ProTable<FactoryDto, any>
      request={getData}
      bordered size='small'
      cardBordered
      editable={{
        type: 'multiple',
      }}
      cardProps={{
        extra: <span><Button onClick={() => navigate('/masters/factories/factories-form')}
          type={'primary'}>New</Button></span>
      }}
      search={false} headerTitle={'Factories'}
      columns={columns}

    />

  )
}
