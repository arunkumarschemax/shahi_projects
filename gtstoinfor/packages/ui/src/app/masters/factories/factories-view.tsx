import { ProTable } from '@ant-design/pro-components'
import { Button, Space } from 'antd'
import {forEachObject} from 'for-each'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FactoriesView() {
  const navigate = useNavigate()
  const  columns = [{title:'Factory name'},{title:'Address'},{title:'Status'},{title:'Action'}]
  forEachObject
  return (
   
      <ProTable size='small' cardBordered   cardProps={{extra:<span><Button onClick={() => navigate('/masters/factories/factories-form')} type={'primary'}>New</Button></span>}}  search={false} headerTitle={'Factories'} columns={columns} />
   
  )
}
