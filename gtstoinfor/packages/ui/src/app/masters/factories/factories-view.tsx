import { EditOutlined } from '@ant-design/icons'
import { ProTable } from '@ant-design/pro-components'
import { FactoryDto } from '@project-management-system/shared-models'
import { FactoryService } from '@project-management-system/shared-services'
import { Button, Space, Tag } from 'antd'
import {forEachObject} from 'for-each'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FactoriesView() {
  const navigate = useNavigate()
  const [factoriesData,setFactoriesData] = useState<FactoryDto[]>()
  const factoryService = new FactoryService()

  useEffect(() => {
    getData()
  },[])

  function renderActions(){
    <span>
      
    </span>
  }
  const getData = () => {
      factoryService.getFactories().then((res) => {
        if(res.status){
          setFactoriesData(res.data)
        }
      })
  }
  const  columns = [
    {title:'Factory name',dataIndex:'name'},
    {title:'Address',dataIndex:"address"},
    {title:'Status',render:(val) => {return <Tag color={val ? 'green' : 'red'}>{val ? 'Active' : 'Inactive'}</Tag>}},
    {title:'Action',render:(val) => {return <span></span>}}
  ]
  forEachObject
  return (
   
      <ProTable<FactoryDto> dataSource={factoriesData} size='small' cardBordered   cardProps={{extra:<span><Button onClick={() => navigate('/masters/factories/factories-form')} type={'primary'}>New</Button></span>}}  search={false} headerTitle={'Factories'} columns={columns} />
   
  )
}
