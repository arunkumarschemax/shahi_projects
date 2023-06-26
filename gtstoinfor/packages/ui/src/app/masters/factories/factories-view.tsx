import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import {forEachObject} from 'for-each'
import React from 'react'

export default function FactoriesView() {
  const  columns = [{title:'Factory Name'},{title:'Address'},{title:'Status'},{title:'Action'}]
  forEachObject
  return (
        <ProTable cardBordered   cardProps={{extra:<span><Button type={'primary'}>New</Button></span>}}  search={false} headerTitle={'Factories'} columns={columns} />
  )
}
