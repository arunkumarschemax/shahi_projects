import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined } from '@ant-design/icons';
import { AlertMessages, FactoryActivateDeactivateDto, FactoryDto } from '@project-management-system/shared-models';
import { FactoryService } from '@project-management-system/shared-services';
import { Button, Card, Divider, Drawer, message, Popconfirm, Switch, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FactoriesForm from './factories-form';
  
  const FactoriesView = () => {
    const navigate = useNavigate();
    const service = new FactoryService();
    const [factories, setFactories] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [factoryData , setFactoryData] = useState<any>(undefined);

    useEffect(() => {
      getFactoryData()
    }, []);
  
    const getFactoryData = () => {
      service.getFactories().then((res) => {
        if (res.status) {
          setFactories(res.data);
        } else {
  
          setFactories([])
        }
      })
        .catch((error) => {
          console.log(error.response)
        })
    };
    const closeDrawer = () => {
      setDrawerVisible(false);
    }

    const openFormwithData = (ViewData: FactoryDto) => {
      setDrawerVisible(true);
      setFactoryData(ViewData);
      console.log(ViewData, "viewData")
    }
    const updateFactories = (Data: FactoryDto) => {

      // const req = new FactoryDto (data.id,Data.name,Data.address) 
      console.log(Data, 'vidya')
      service.updateFactories(Data).then(res => {
        console.log(res, "ressssssssssss");
        if (res.status) {
          AlertMessages.getSuccessMessage('Updated Succesfully');
          getFactoryData()
          setDrawerVisible(false);
  
        }
        else {
          AlertMessages.getErrorMessage(res.internalMessage)
        }
      }).catch(err => {
        AlertMessages.getErrorMessage(err.message)
      })
    }

    console.log(factoryData, 'mmmmmmmmmmmm')
    const activateOrDeactivate = (values: FactoryActivateDeactivateDto) => {
      values.isActive = values.isActive ? false : true
      const req = new FactoryActivateDeactivateDto(values.id, values.isActive, values.versionFlag, )
      service.activateOrDeactivate(req).then(res => {
          if (res.status) {
            message.success(res.internalMessage)
            getFactoryData();
          }
      })
    }
const Columns: any =[
  {
    title: 'Factory name',
    dataIndex: 'name',
    sorter: true, 
    align: 'center'
  },

  {
     title: 'Address',
      dataIndex: "address",
       align: 'center' 
  },
  {
    title: "Status",
    dataIndex: "isActive",
     
    render: (isActive, rowData) => (
      <>
        {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
      </>
    ),
    filters: [
      {
        text: 'Active',
        value: true,
      },
      {
        text: 'InActive',
        value: false,
      },
    ],
    filterMultiple:false,
    onFilter:(value, record)=>{
      return record.isActive === value;
    }


  },
  {
    title: "Actions", 
    render: (text,rowData,index:number) => {
      return <>
      <Tooltip title="Edit">
        <EditOutlined style={{ color: 'blue' }} onClick={() => { openFormwithData(rowData) }} type="edit" />
      </Tooltip>
      <span></span>
        <Divider type="vertical" />
        <Popconfirm onConfirm={e => { activateOrDeactivate(rowData) }}
          title={
            rowData.isActive
              ? 'Are you sure to deactivated ?'
              : 'Are you sure to activated ?'
          }
        >
          <Switch size="default"
            className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            checked={rowData.isActive}
          />
        </Popconfirm>
      </>

    }
  },
  
]
    return (
      <div>
         <Card
        extra={<span><Button onClick={() => navigate('/masters/factories/factories-form')} type={'primary'}>New</Button></span>}
        headStyle={{ height: '50px' }}
        bodyStyle={{ height: '300px', paddingTop: '2px', paddingBottom: '5px' }}
        title={<h4 style={{ textAlign: 'left' }}>FactoryView</h4>}

      >

        <Table columns={Columns} dataSource={factories}
         />
      </Card>
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='update' width={window.innerWidth > 768 ? '75%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small' >
          <FactoriesForm
            updateItem={updateFactories} Data={factoryData} isUpdate={true} closeForm={closeDrawer} />
        </Card>
      </Drawer>
      </div>
    )
  }
  
  export default FactoriesView;
  





































































































































































// import { ProColumns, ProTable } from '@ant-design/pro-components'
// import { FactoryActivateDeactivateDto, FactoryDto } from '@project-management-system/shared-models'
// import { FactoryService } from '@project-management-system/shared-services'
// import { Button, Tag } from 'antd'
// import { forEachObject } from 'for-each'
// import { useNavigate } from 'react-router-dom'
// import TableActions from '../../common/table-actions/table-actions'

// export default function FactoriesView() {
//   const navigate = useNavigate()
//   const factoryService = new FactoryService()


//   const openFormwithData = (ViewData: FactoryDto) => {

//   }




  
    
//   async function onSwitchClick(item: any) { 
//     const dto = new FactoryActivateDeactivateDto(item.id, !item.isActive, item.versionFlag, 'admin')
//     await factoryService.activateOrDeactivate(dto);
//     window.location.reload();
//   }


//   const getData = async (params = {}, sort, filter) => {
//     const res = await factoryService.getFactories()
//     if (res.status) {
//       return { data: res.data, sucess: true, total: res.data.length }
//     } else {
//       return { data: [], sucess: false, total: 0 }
//     }
//   }

//   const columns: ProColumns<FactoryDto>[] = [
//     {
//       dataIndex: 'index',
//       valueType: 'indexBorder',
//       width: 48,
//       align: 'center'
//     },
//     { title: 'Factory name', dataIndex: 'name', sorter: true, align: 'center' },
//     { title: 'Address', dataIndex: "address", align: 'center' },
//     {
//       title: 'Status',
//       filters: true,
//       onFilter: true,
//       ellipsis: true,
//       valueType: 'select',
//       valueEnum: {
//         open: {
//           text: 'Active',
//           status: 'Error',
//         },
//         closed: {
//           text: 'Inactive',
//           status: 'Success',
//         },
//       },
//       align: 'center',
//       render: (dom, entity) => { return <Tag color={entity.isActive ? 'green' : 'red'}>{entity.isActive ? 'Active' : 'Inactive'}</Tag> }
//     },
//     { title: 'Action', align: 'center', render: (dom, entity) => { return <TableActions isActive={entity.isActive} onClick={openFormwithData} onSwitchClick={() => onSwitchClick(entity)} /> } }
//   ]
//   forEachObject
//   return (

//     <ProTable<FactoryDto, any>
//       request={getData}
//       bordered size='small'
//       cardBordered
//       editable={{
//         type: 'multiple',
//       }}
//       cardProps={{
//         extra: <span><Button onClick={() => navigate('/masters/factories/factories-form')}
//           type={'primary'}>New</Button></span>
//       }}
//       search={false} headerTitle={'Factories'}
//       columns={columns}

//     />

//   )
// }
