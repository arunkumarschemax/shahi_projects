import { ProColumns, ProTable } from '@ant-design/pro-components'
import { BuyerRequest, BuyersDto, FactoryActivateDeactivateDto, FactoryDto } from '@project-management-system/shared-models'
import { BuyersService, FactoryService } from '@project-management-system/shared-services'
import { Button, Table, Tag } from 'antd'
import { forEachObject } from 'for-each'
import { useNavigate } from 'react-router-dom'
import TableActions from '../../common/table-actions/table-actions'
import { ColumnProps } from 'antd/es/table'
import { useState } from 'react'

export const  BuyersView = () => {
  const navigate = useNavigate()
  const buyerService = new BuyersService()
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);



  function onEditClick() {

  }

  async function onSwitchClick(val: any) { 
    const dto = new BuyerRequest(val.id, 'admin',val.versionFlag, !val.isActive, )
    await buyerService.activateOrDeactivateBuyer(dto);
    window.location.reload();
  }


  const getData = async (params = {}, sort, filter) => {
    const res = await buyerService.getAllActiveBuyers()
    if (res.status) {
      return { data: res.data, sucess: true, total: 0 }
    } else {
      return { data: [], sucess: false, total: 0 }
    }
  }

  const columns: ColumnProps<any>[] = [
    {
        title: "S.No",
        key: "sno",
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
    { title: 'Buyer Code', dataIndex: 'clientCode', sorter: true, align: 'center' },
    { title: 'Buyer Name', dataIndex: 'clientName', sorter: true, align: 'center' },
    { title: 'Account Type', dataIndex: 'accountType', sorter: true, align: 'center' },
    { title: 'GST Number', dataIndex: 'gstNumber', sorter: true, align: 'center' },
    { title: 'Contact Person', dataIndex: 'contactPerson', sorter: true, align: 'center' },
    { title: 'Mobile Number', dataIndex: 'phoneNo', sorter: true, align: 'center' },
    { title: 'Email', dataIndex: 'email', sorter: true, align: 'center' },
    { title: 'Currency', dataIndex: 'currency', sorter: true, align: 'center' },
    // {
    //   title: 'Status',
    // //   filters: true,
    // //   onFilter: true,
    //   ellipsis: true,
    // //   valueType: 'select',
    //   valueEnum: {
    //     open: {
    //       text: 'Active',
    //       status: 'Error',
    //     },
    //     closed: {
    //       text: 'Inactive',
    //       status: 'Success',
    //     },
    //   },
    //   align: 'center',
    //   render: (dom, entity) => { return <Tag color={entity.isActive ? 'green' : 'red'}>{entity.isActive ? 'Active' : 'Inactive'}</Tag> }
    // },
    { title: 'Action', align: 'center', render: (dom, entity) => { return <TableActions isActive={entity.isActive} onEditClick={onEditClick} onSwitchClick={() => onSwitchClick(entity)} /> } }
  ]
  forEachObject
  return (

    // <ProTable<BuyersDto, any>
    //   request={getData}
    //   bordered size='small'
    //   cardBordered
    //   editable={{
    //     type: 'multiple',
    //   }}
    //   cardProps={{
    //     extra: <span><Button onClick={() => navigate('/masters/buyers/buyers-form')}
    //       type={'primary'}>New</Button></span>
    //   }}
    //   search={false} headerTitle={'Buyers'}
    //   columns={columns}

    // />
    <Table columns={columns} dataSource={[]}/>

  )
}

export default BuyersView
