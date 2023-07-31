import { ProColumns, ProTable } from '@ant-design/pro-components'
import { BuyerRequest, BuyersDto, FactoryActivateDeactivateDto, FactoryDto, OperationGroupsDto } from '@project-management-system/shared-models'
import { BuyersService, FactoryService } from '@project-management-system/shared-services'
import { Button, Card, Col, Divider, Drawer, Form, Input, Popconfirm, Row, Switch, Table, Tag, message } from 'antd'
import { forEachObject } from 'for-each'
import { useNavigate } from 'react-router-dom'
import TableActions from '../../common/table-actions/table-actions'
import { ColumnProps, ColumnType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined, SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import BuyersForm from './buyers-form'
import AlertMessages from '../../common/common-functions/alert-messages'

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




  useEffect(() => {
    getBuyersData()
  },[])



  const getBuyersData = () => {
    buyerService.getAllBuyer().then(res => {
      if(res.status){
        setBuyersData(res.data)
      }
    })
  }

  const getColumnSearchProps = (dataIndex:any): ColumnType<string> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={ searchInput }
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
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
        .includes((value as string).toLowerCase()):false,
    onFilterDropdownVisibleChange: visible => {
      if (visible) {    setTimeout(() => searchInput.current.select());   }
    },
    render: text =>
      text ?(
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) :text
      )
      : null
     
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
      console.log(req,'--------req')
      buyerService.activateOrDeactivateBuyer(req).then(res => { console.log(res);
        if (res.status) {
          getBuyersData();
          message.success('Success');
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
        console.log(res);
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


    const columnsSkelton: ColumnProps<any>[] = [
      {
        title: 'S No',
        key: 'sno',
        width: '70px',
        responsive: ['sm'],
        render: (text, object, index) => (page-1) * 10 +(index+1)
      },
      {
        dataIndex:"clientCode",
        title:"Buyer Code",
        // responsive: ['lg'],
        sorter: (a, b) => a.clientCode.localeCompare(b.clientCode),
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('clientCode')
      },
      {
        dataIndex:"clientName",
        title:"Buyer Name",
        // responsive: ['lg'],
        sorter: (a, b) => a.clientName.localeCompare(b.clientName),
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('clientName')
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
        sorter: (a, b) => a.phoneNo.localeCompare(b.phoneNo),
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('phoneNo')
      },
      {
        dataIndex:"address",
        title:"Address",
        render:(text,record) => {
          return(
            <>
            {record.state ? `${record.countryName}-${record.state}-${record.city}` : '-'}
            </>
          )
        }
        // ...getColumnSearchProps('city')
      },
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
               
              <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
                onClick={() => {
                  if (rowData.isActive) {
                    console.log(rowData);
                    openFormWithData(rowData);
                  } else {
                    message.error('You Cannot Edit Deactivated Vendor');
                  }
                }}
                style={{ color: '#1890ff', fontSize: '14px' }}
              />

            <Divider type="vertical" />
              <Popconfirm onConfirm={e =>{deleteBuyer(rowData);}}
              title={
                rowData.isActive
                  ? 'Are you sure to Deactivate vendor ?'
                  :  'Are you sure to Activate vendor ?'
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
      }
    ];
  



  return (
    <Card title='Buyers' extra={<span><Button onClick={() => navigate('/masters/buyers/buyers-form')} type={'primary'}>New</Button></span>}>
  <br></br>
     <Row gutter={40}>
      <Col>
          <Card title={'Total Vendors : ' + buyersData.length} style={{textAlign: 'left', width: 210, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Active: ' + buyersData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active :' + buyersData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
          </Col>
          </Row>
          <br></br>
    <Table columns={columnsSkelton} dataSource={buyersData}/>
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
    </Card>

  )
}

export default BuyersView
