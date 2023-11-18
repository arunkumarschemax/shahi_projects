import { ProColumns, ProTable } from '@ant-design/pro-components'
import { FactoryActivateDeactivateDto, FactoryDto } from '@project-management-system/shared-models'
import { FactoryService } from '@project-management-system/shared-services'
import { Alert, Button, Card, Checkbox, Col, Divider, Drawer, Input, Popconfirm, Row, Switch, Table, Tag, message } from 'antd'
import { forEachObject } from 'for-each'
import { Link, useNavigate } from 'react-router-dom'
import TableActions from '../../common/table-actions/table-actions'
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined, SearchOutlined } from '@ant-design/icons'
import FactoriesForm from './factories-form'
import { useEffect, useRef, useState } from 'react'
import React from 'react'
import AlertMessages from '../../common/common-functions/alert-messages'
import Highlighter from 'react-highlight-words'

export default function FactoriesView() {
  const navigate = useNavigate()
  const factoryService = new FactoryService()
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(undefined);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [data,setData] =  useState<any[]>([]);





  useEffect(() => {
    getAllData();
  }, [])

  function onEditClick(data:any) {
    if(data.isActive){
      // navigate('/global/factories/factories-form')
      openFormWithData(data)
    } else{
      message.error('You can not edit deactivated record')
    }

  }
    const getAllData= () => {
      factoryService.getFactories().then(res => {
      if (res.status) {
        setData(res.data);
        message.success(res.internalMessage)

      } else
       {
        message.error(res.internalMessage)

        setData([])
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setData([]);
    })
  }

  // async function onSwitchClick(item: any) { 
  //   const dto = new FactoryActivateDeactivateDto(item.id, !item.isActive, item.versionFlag, 'admin')
  //   await factoryService.activateOrDeactivateFactory(dto);
  //   window.location.reload();
  // }





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
        getAllData()
       // window.location.reload();

      } else{
        message.error('Something went wrong')
      }
    })
  }
//   const deleteFactory = (Data:FactoryDto) => {
//     Data.isActive=Data.isActive?false:true;
//     factoryService.activateOrDeactivate(Data).then(res => { console.log(res);
//       if (res.status) {
//         // AlertMessages.getSuccessMessage('Success'); 
//         message.success(res.internalMessage)
// console.log(res.internalMessage,"res.internalMessage")
//       } else {
//         message.error(res.internalMessage)

//           // AlertMessages.getErrorMessage(res.internalMessage);
//       }
//     })
//   }

const deleteFactory = (Data: FactoryDto) => {
  Data.isActive = !Data.isActive;


  factoryService.activateOrDeactivateFactory(Data).then(res => {
    console.log('Response:', res);

    if (res) {
      message.success(res.internalMessage);
      // console.log(res.internalMessage, "res.internalMessage");
    } else {
      message.error('Unexpected response format');
    }
  }).catch(error => {
    console.error('Error:', error);
  });
};



  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
            <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90, marginRight: 8 }}
            >
                Search
            </Button>
            <Button size="small" style={{ width: 90 }}
                onClick={() => {
                    handleReset(clearFilters)
                    setSearchedColumn(dataIndex);
                    confirm({ closeDropdown: true });
                }}>
                Reset
            </Button>
        </div>
    ),
    filterIcon: filtered => (
        <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
        record[dataIndex]
            ? record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
            : false,
    onFilterDropdownVisibleChange: visible => {
        if (visible) { setTimeout(() => searchInput.current.select()); }
    },
    render: text =>
        text ? (
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : text
        )
            : null
})

  const columns: any = [
    {
      title: 'S No',
      key: 'sno',
      // width: '70px',
      align:'center',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    { title: <div style={{ textAlign: 'center' }}>Factory Name</div>, dataIndex: 'name', align: 'left',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'], 
    ...getColumnSearchProps("name"),
  },
      { title:  <div style={{ textAlign: 'center' }}>Address</div>, dataIndex: "address", align: 'left' ,
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortDirections: ['descend', 'ascend'],
    },
    
    {
      title: 'Status',
      dataIndex: 'isActive',
      align:'center',
       // width:'80px',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">Inactive</Tag>}
        </>
      ),
      filters: [
        {
          text: 'Active',
          value: true,
        },
        {
          text: 'Inactive',
          value: false,
        },
      ],
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
    {
      title: `Action`,
      dataIndex: 'action',align:'center',
      render: (text, rowData) => (
        <span>
          <EditOutlined className={'editSamplTypeIcon'} type="edit"
            onClick={() => {
              if (rowData.isActive) {
                openFormWithData(rowData);
              } else {
                AlertMessages.getErrorMessage('You Cannot Edit Composition');
              }
            }}
            style={{ color: '#1890ff', fontSize: '14px' }}
          />

          <Divider type="vertical" />
          <Popconfirm onConfirm={e => { deleteFactory(rowData); }}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate this Factory ?'
                : 'Are you sure to Activate this Factory ?'
            }
          >
            <Switch size="default"
              className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
              checkedChildren={<RightSquareOutlined type="check" />}
              unCheckedChildren={<RightSquareOutlined type="close" />}
              checked={rowData.isActive}
            />

          </Popconfirm>
        </span>
      )
    }
  ];
 
  return (
<>
    {/* <ProTable<FactoryDto, any>
      request={getData}
      bordered size='small'
      cardBordered
      editable={{
        type: 'multiple',
      }}
      cardProps={{
        extra: <span><Button onClick={() => navigate('/global/factories/factories-form')}
          type={'primary'}>New</Button></span>
      }}
      search={false} headerTitle={'Factories'}
      columns={columns}

      
    /> */}

<Card title={<span >Factories</span>}
    style={{textAlign:'left'}} headStyle={{ border: 0 }} 
    extra={<Link to='/masters/factories/factories-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      <Row gutter={24}>
      <Col span={4}></Col>
        <Col span={5}>
          {/* <Card title={'Total Ranges: ' + lTData.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card> */}
          <Alert type='success' message={'Total Factories: ' + data.length} style={{fontSize:'15px'}} />

        </Col>
        <Col span={5}>
          {/* <Card title={'Active: ' + lTData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card> */}
          <Alert type='warning' message={'Active: ' + data.filter(el => el.isActive).length} style={{fontSize:'15px'}} />

        </Col>
        <Col span={5}>
          {/* <Card title={'In-Active: ' + data.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card> */}
          <Alert type='info' message={'Inactive: ' + data.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />

        </Col>
      </Row><br></br>
   <Table
        size='small'

           columns={columns}
           dataSource={data}
          pagination={{
            pageSize:50,
            onChange(current) {
              setPage(current);
            }
          }}
          scroll={{x:true,y:550}}
         // onChange={onChange}
          bordered />

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
