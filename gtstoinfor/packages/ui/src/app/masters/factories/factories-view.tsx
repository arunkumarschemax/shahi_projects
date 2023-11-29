import { ProColumns, ProTable } from '@ant-design/pro-components'
import { FactoryActivateDeactivateDto, FactoryDto } from '@project-management-system/shared-models'
import { FactoryService } from '@project-management-system/shared-services'
import { Alert, Button, Card, Checkbox, Col, Drawer, Row, Table, Tag, message } from 'antd'
import { forEachObject } from 'for-each'
import { useNavigate } from 'react-router-dom'
import TableActions from '../../common/table-actions/table-actions'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import FactoriesForm from './factories-form'
import { useEffect, useState } from 'react'

export default function FactoriesView() {
  const navigate = useNavigate()
  const factoryService = new FactoryService()
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(undefined);
  const [data, setData] = useState<any>([]);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);


  useEffect(() => {
    getData();
  }, []);


  function onEditClick(data:any) {
    if(data.isActive){
      // navigate('/global/factories/factories-form')
      openFormWithData(data)
    } else{
      message.error('You can not edit deactivated record')
    }

  }

  async function onSwitchClick(item: any) { 
    const dto = new FactoryActivateDeactivateDto(item.id, !item.isActive, item.versionFlag, 'admin')
    await factoryService.activateOrDeactivate(dto);
    window.location.reload();
  }


  // const getData = async (params = {}, sort, filter) => {
  //   const res = await factoryService.getFactories()
  //   if (res.status) {
  //     console.log(res.data,"dd")
  //     setData(res.data)
  //     return { data: res.data, sucess: true, total: res.data.length }
  //   } else {
  //     return { data: [], sucess: false, total: 0 }
  //   }
  // }

  const getData = () => {
    factoryService.getFactories().then((res) => {
      if (res.status) {
        setData(res.data);
      }
     
    });
  };
  
  console.log(data,"kkkk")


  const closeDrawer = () => {
    setDrawerVisible(false);
  }

  const openFormWithData=(viewData: FactoryDto)=>{
    setDrawerVisible(true);
    setSelectedData(viewData);
  }

  const updateFactory = (data:FactoryDto) => {
    factoryService.createFactory(data).then(res => {
      if(res.status){
        message.success('Updated successfully')
        setDrawerVisible(false)
        window.location.reload();

      } else{
        message.error('Something went wrong')
      }
    })
  }

  const columns: any = [
   {
      title: "S.No",
      key: "sno",
      align:"center",
      width:50,
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    { title: 'Factory Name',
     dataIndex: 'name',
      align: 'center',
     sorter: (a, b) => a.name.localeCompare(b.name),
     sortDirections: ['descend', 'ascend'], 
   },
    { title: 'Address', 
     dataIndex: "address",
    //  align: 'center',
     sorter: (a, b) => a.address.localeCompare(b.address),
     sortDirections: ['descend', 'ascend'], 
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      align:"center",
       render: (isActive, rowData) => (
        <>
          {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
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
      // filterMultiple: false,
      // onFilter: (value, record) => 
      // {
      //   // === is not work
      //   return record.isActive === value;
      // },
      filterMultiple: false,
      onFilter: (value, record) => record.isActive === value,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown" style={{flexDirection:'row',marginLeft:10}}>
          <Checkbox
            checked={selectedKeys.includes(true)}
            onChange={() => setSelectedKeys(selectedKeys.includes(true) ? [] : [true])}
          >
            <span style={{color:'green'}}>Active</span>
          </Checkbox>
          <Checkbox
            checked={selectedKeys.includes(false)}
            onChange={() => setSelectedKeys(selectedKeys.includes(false) ? [] : [false])}
          >
            <span style={{color:'red'}}>Inactive</span>
          </Checkbox>
          <div className="custom-filter-dropdown-btns" >
          <Button  onClick={() => clearFilters()} className="custom-reset-button">
              Reset
            </Button>
            <Button type="primary" style={{margin:10}} onClick={() => confirm()} className="custom-ok-button">
              OK
            </Button>
          
          </div>
        </div>
      ),

      
    },
    { title: 'Action',
     align: 'center', 
     render: (dom, entity) => { return <TableActions isActive={entity.isActive} onEditClick={() => onEditClick(entity)} onSwitchClick={() => onSwitchClick(entity)} /> } }
  ]
  forEachObject
  return (
<>
<Card title='Sample Locations'  headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<span><Button onClick={() => navigate('/global/factories/factories-form')} type={'primary'}>New</Button></span>} >
<Row gutter={24}>
      <Col span={4}></Col>
     <Col span={5}>
        
           <Alert type='success' message={'Total Sample Locations: ' + data.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + data.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='info' message={'Inactive: ' + data.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        
           
           
        </Col>
          </Row> 
          <br></br>
          <Card>
    <Table
    
       size='small'
       dataSource={data}
      columns={columns}
      scroll={{x:true,y:500}}
      pagination={{
       pageSize:50,
       onChange(current) {
         setPage(current);
       }
     }}
    
    />
    </Card>

<Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
              onClose={closeDrawer} visible={drawerVisible} closable={true}>
              <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
                <FactoriesForm key={Date.now()}
                  updateFactory={updateFactory}
                  isUpdate={true}
                  // saveItem={saveVariant}
                  factoryData={selectedData}
                  closeForm={closeDrawer} />
              </Card>
            </Drawer>
            </Card>
    </>

    

  )
}
