import { ProColumns, ProTable } from '@ant-design/pro-components'
import { BuyerIdReq, BuyerRequest, BuyersDto, FactoryActivateDeactivateDto, FactoryDto, OperationGroupsDto } from '@project-management-system/shared-models'
import { BuyersService, FactoryService } from '@project-management-system/shared-services'
import { Alert, Button, Card, Col, Divider, Drawer, Form, Input, Modal, Popconfirm, Radio, Row, Space, Switch, Table, Tag, Tooltip, message } from 'antd'
import { forEachObject } from 'for-each'
import { useNavigate } from 'react-router-dom'
import TableActions from '../../common/table-actions/table-actions'
import { ColumnProps, ColumnType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, InfoCircleOutlined, RightSquareOutlined, SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import BuyersForm from './buyers-form'
import AlertMessages from '../../common/common-functions/alert-messages'
import AddressInfo from './address-info'

export const  BuyersView = () => {
  const navigate = useNavigate()
  const buyerService = new BuyersService()
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);
  const [buyersData,setBuyersData] = useState<BuyersDto[]>([]);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedBuyersData, setSelectedBuyersData] = useState<any>(undefined);
  const [form] = Form.useForm()
  const [addressModal,setAddressModal] = useState<boolean>(false)
  const [buyerId,setBuyerId] = useState<number>(0)




  useEffect(() => {
    getBuyersData()
  },[])



  const getBuyersData = () => {
    buyerService.getAllBuyersInfo().then(res => {
      if(res.status){
        setBuyersData(res.data)
      }
    })
  }

  const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() =>{
              handleReset(clearFilters)
              setSearchedColumn(dataIndex)
              confirm({closeDropdown:true})
            }
               }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
         
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] ?record[dataIndex]     
         .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()):false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  
  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };

    //drawer related
    const closeDrawer=()=>{
      setDrawerVisible(false);
    }

    const openFormWithData=(viewData: OperationGroupsDto)=>{
      // viewData.createdUser = localStorage.getItem('createdUser');
      viewData.createdUser = 'admin'
      setDrawerVisible(true);
      setSelectedBuyersData(viewData);
    }

    const deleteBuyer = (data:BuyersDto) => {
      data.isActive=data.isActive?false:true;
      const req = new BuyerRequest(data.buyerId,'admin',data.versionFlag,data.isActive)
      buyerService.activateOrDeactivateBuyer(req).then(res => {
        if (res.status) {
          getBuyersData();
          message.success(res.internalMessage);
        } else {
            message.error(res.internalMessage);
        }
      }).catch(err => {
        message.error(err.message);
      })
    }

    const updateBuyer = (buyerData: BuyersDto) => {
      buyerData.updatedUser = JSON.parse(localStorage.getItem('username'))
      buyerService.updateBuyer(buyerData).then(res => {
        if (res.status) {
          AlertMessages.getSuccessMessage('Updated Successfully');
          getBuyersData();
          setDrawerVisible(false);
        } else {
          // if (res.intlCode) {
          //   AlertMessages.getErrorMessage(res.internalMessage);
          // } else {
          AlertMessages.getErrorMessage(res.internalMessage);
          // }
        }
      }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
      })
    }

    const onAddressInfo = (rowData) => {
      setBuyerId(rowData.buyerId)
      setAddressModal(true)
      
    }


    const columnsSkelton: ColumnProps<any>[] = [
      {
        title: 'S No',
        key: 'sno',
        width: '70px',
        responsive: ['sm'],
        render: (text, object, index) => (page-1) * 10 +(index+1)
      },
      {
        dataIndex:"buyerName",
        title:"Buyer Name",
        // responsive: ['lg'],
        sorter: (a, b) => a.buyerName.localeCompare(b.buyerName),
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('buyerName')
      },
      {
        dataIndex:"shortCode",
        title:"Buyer Short Code",
        width:150

        // responsive: ['lg'],
        // sorter: (a, b) => a.shortCode.localeCompare(b.shortCode),
        // sortDirections: ['descend', 'ascend'],
        // ...getColumnSearchProps('shortCode')
      },
      {
        dataIndex:"buyerCode",
        title:"Buyer Code",
        width:150
        // responsive: ['lg'],
        // sorter: (a, b) => a.buyerCode.localeCompare(b.buyerCode),
        // sortDirections: ['descend', 'ascend'],
        // ...getColumnSearchProps('buyerCode')
      },
      
      {
        dataIndex:"contactPerson",
        title:"Contact Person",
        // responsive: ['lg'],
        sorter: (a, b) => a.contactPerson.localeCompare(b.contactPerson),
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('contactPerson')
      },
      {
        dataIndex:"phoneNo",
        title:"Contact Number",
        // responsive: ['lg'],
        // sorter: (a, b) => a.phoneNo.localeCompare(b.phoneNo),
        // sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('phoneNo')
      },
      // {
      //   dataIndex:"address",
      //   title:"Address",
      //   render:(text,record) => {
      //     return(
      //       <>
      //       {record.state ? `${record.countryName}-${record.state}-${record.city}` : '-'}
      //       </>
      //     )
      //   }
      //   // ...getColumnSearchProps('city')
      // },
      {
        title: 'Status',
        dataIndex: 'isActive',
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
        filterMultiple: false,
        onFilter: (value, record) => 
        {
          // === is not work
          return record.isActive === value;
      },
        
      },
      {
        title:`Action`,
        dataIndex: 'action',
        render: (text, rowData) => (
          <span>   
                <Tooltip title='Address Info'>
               <InfoCircleOutlined onClick={() => {onAddressInfo(rowData)}}/>
                </Tooltip>
               <Divider type='vertical'/>
              <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
                onClick={() => {
                  if (rowData.isActive) {
                    openFormWithData(rowData);
                  } else {
                    message.error('You Cannot Edit Deactivated Buyer');
                  }
                }}
                style={{ color: '#1890ff', fontSize: '14px' }}
              />

            <Divider type="vertical" />
              <Popconfirm onConfirm={e =>{deleteBuyer(rowData);}}
              title={
                rowData.isActive
                  ? 'Are you sure to Deactivate Buyer ?'
                  :  'Are you sure to Activate Buyer ?'
              }
            >
              <Switch  size="default"
                  className={ rowData.isActive ? 'toggle-activated' : 'toggle-deactivated' }
                  checkedChildren={<RightSquareOutlined type="check" />}
                  unCheckedChildren={<RightSquareOutlined type="close" />}
                  checked={rowData.isActive}
                />
              
            </Popconfirm>
          </span>
        )
      },
      // {
      //   title:'Attributes',
      //   dataIndex:'attributes',
      //   render:(text,rowData) => (
      //     <span>
      //       <Button onClick={() => navigate('/global/buyers/buyers-general-attributes-form',{state:{id:rowData.buyerId}})}>General</Button>
      //       <Divider type="vertical"/>
      //       <Button onClick={() => navigate('/global/buyers/buyers-order-attributes-form',{state:{id:rowData.buyerId}})}>Order</Button>
      //     </span>
      //   )
      // }
    ];
  



  return (
    <Card title='Buyers'  headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<span><Button onClick={() => navigate('/global/buyers/buyers-form')} type={'primary'}>New</Button></span>} >
     {/* <Row gutter={40} >
      <Col>
          <Card title={'Total Buyers : ' + buyersData.length} style={{textAlign: 'left', width: 210, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Active: ' + buyersData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active :' + buyersData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
          </Col>
          </Row> */}

<Row gutter={24}>
      <Col span={4}></Col>
     <Col span={5}>
    
           <Alert type='success' message={'Total Buyers: ' + buyersData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + buyersData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='info' message={'Inactive: ' + buyersData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        
           
           
        </Col>
          </Row> 
          <br></br>
         
          
     <Card>
    <Table columns={columnsSkelton} 
    dataSource={buyersData} 
    scroll={{x:true,y:500}}
           pagination={{
            pageSize:50,
            onChange(current) {
              setPage(current);
            }
          }}
     size='small' bordered/>
     </Card>

    <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '80%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <BuyersForm key={Date.now()}
            updateDetails={updateBuyer}
            isUpdate={true}
            // saveItem={saveVariant}
            buyersData={selectedBuyersData}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
      <Modal width={'80%'} open={addressModal} onCancel={() => setAddressModal(false)} footer={[<Button onClick={() => setAddressModal(false)} >Ok</Button>]}>
        <AddressInfo buyerId={buyerId}/>
      </Modal>
    </Card>

  )
}

export default BuyersView
