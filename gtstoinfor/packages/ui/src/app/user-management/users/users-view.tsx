import { ProTable } from '@ant-design/pro-components'
import React from 'react'



export default function UsersView() {
    const  columns = [{title:'Username'},{title:'Factory'},{title:'Status'},{title:'Action'}]
  return (
        <ProTable search={false} headerTitle={'Users'} columns={columns} />
  )
}
