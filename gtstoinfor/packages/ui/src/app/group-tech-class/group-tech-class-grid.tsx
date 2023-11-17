import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message, Alert, Checkbox } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import { Link, useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import PaymentTermsForm, { GroupTechClassForm } from './group-tech-class-form';
import { BuyerExtrnalRefIdReq, BuyerIdReq, GroupTechClassDto, MenusAndScopesEnum, PaymentTermsCategory, PaymentTermsDto } from '@project-management-system/shared-models';
import { BuyersService, DivisionService, GroupTechClassService, PaymentTermsService, UserRequestDto } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';
import form from 'antd/es/form';

/* eslint-disable-next-line */
export interface GroupTechClassGridProps {}

export function GroupTechClassGrid(
  props: GroupTechClassGridProps
) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate()
  const service = new GroupTechClassService ();
  const [selectedData, setSelectedData] = useState<any>(undefined);
  const [groupTechClassData, setGroupTechClassData] = useState<GroupTechClassDto[]>([]);
  const [buyerData,setBuyerData] = useState<any>([])
  const [divisionData,setDivisionData] = useState<any>([])
  const [dataFetched, setDataFetched] = useState(false); 
 
  const [userId, setUserId] = useState([]); 
  const [loginBuyer,setLoginBuyer] = useState<number>(0)
  const externalRefNo = JSON.parse(localStorage.getItem('currentUser')).user.externalRefNo
  const role = JSON.parse(localStorage.getItem('currentUser')).user.roles
let userRef 

  const openFormWithData=(viewData: GroupTechClassDto)=>{
    setDrawerVisible(true);
    setSelectedData(viewData);
  }
  useEffect(() => {
   
    if(!dataFetched){
      getAllActiveDivision()
      setDataFetched(true)
      Login()
    }
  }, [dataFetched]);
  const Login = () => {
    const req = new BuyerExtrnalRefIdReq();
    if (role === MenusAndScopesEnum.roles.crmBuyer) {
      req.extrnalRefId = externalRefNo;
    }
    buyerService.getBuyerByRefId(req).then((res) => {
      if (res.status) {
        setUserId(res.data);
        setLoginBuyer(res.data?.buyerId);
        
        // if(req.extrnalRefId){
        //     form.setFieldsValue({'buyerId': res.data.buyerId})
        //     }
                  }
    });
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyerData(res.data);
      }
      else{
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    });
    getAll();

  };
  const getAll= () => {
    const req = new BuyerIdReq(loginBuyer)
    console.log(req,'request');
    
  service.getAllGroupTechClass().then(res => {
      if (res.status) {
       setGroupTechClassData(res.data);
      } else {
        if (res.status) {
         setGroupTechClassData([]);
            AlertMessages.getErrorMessage(res.internalMessage);
        } else {
         AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
     setGroupTechClassData([]);
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const buyerService = new BuyersService();
  const divisionService = new DivisionService();



//   const getAllActiveBuyers=() =>{
//     buyerService.getAllActiveBuyers().then(res =>{
//     if (res.status){
//       setBuyerData(res.data);
       
//     } else{
//       AlertMessages.getErrorMessage(res.internalMessage);
//        }
//   }).catch(err => {
//     setBuyerData([]);
//      AlertMessages.getErrorMessage(err.message);
//    })
  
// }

const getAllActiveDivision=() =>{
  divisionService.getAllActiveDivision().then(res =>{
  if (res.status){
    setDivisionData(res.data);
     
  } else{
    AlertMessages.getErrorMessage(res.internalMessage);
     }
}).catch(err => {
  setDivisionData([]);
   AlertMessages.getErrorMessage(err.message);
 })

}



  const getColumnSearchProps = (dataIndex:string) => ({
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
        .includes(value.toLowerCase())
        : false,
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
 
  const deleteTerm = (Data:GroupTechClassDto) => {
    Data.isActive=Data.isActive?false:true;
    service.activateOrDeactivateGroupTechClass(Data).then(res => { console.log(res);
      if (res.status) {
        getAll();
        // AlertMessages.getSuccessMessage('Success'); 
        message.success(res.internalMessage)

      } else {
        if (res.status) {
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const columnsSkelton: any[] = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
       render: (text, object, index) => (page-1) * 10 +(index+1),
      align:"center",

    },
    {
      title: <div style={{textAlign:"center"}}>GroupTech Code</div>,
      dataIndex: 'groupTechClassCode',
      width:"20",
      //  responsive: ['lg'],
       sorter: (a, b) => a.groupClassTechCode.length - b.groupClassTechCode.length,
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('groupClassTechCode')
    },
    { 
    title: <div style={{textAlign:"center"}}>GroupTech Description</div>,
      
      dataIndex: 'groupTechClassDescription',
      width:"20",
      //  responsive: ['lg'],
       sorter: (a, b) => a.groupClassTechDescription.length - b.groupClassTechDescription.length,
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('groupClassTechDescription')
    },
    {
    title: <div style={{textAlign:"center"}}>Buyer</div>,
    dataIndex: 'buyerId',
    render: (rec, index) => {
      const data = buyerData.find((item) => item.buyerId === rec);
      return data ? data.buyerName : "-";
    },
    sorter: (a, b) => {
      const buyerA = buyerData.find((item) => item.buyerId === a.buyerId)?.buyerName || '';
      const buyerB = buyerData.find((item) => item.buyerId === b.buyerId)?.buyerName || '';
      return buyerA.localeCompare(buyerB);
    },
    sortDirections: ['descend', 'ascend'],
    // responsive: ['lg'],
  },
    {
      title: <div style={{textAlign:"center"}}>Division</div>,
      dataIndex: 'divisionId',
      render: (rec) => {
        const data = divisionData.find((item) => item.divisionId === rec);
        return data ? data.divisionName : "-";
      },
      
       sorter: (a, b) => {
      const divisionA = divisionData.find((item) => item.divisionId === a.divisionId)?.divisionName || '';
      const divisionB = divisionData.find((item) => item.divisionId === b.divisionId)?.divisionName || '';
      return divisionA.localeCompare(divisionB);
    },
       sortDirections: ['descend', 'ascend'],
      //   ...getColumnSearchProps('paymentTermsName')
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
      title:`Action`,
      dataIndex: 'action',
      align:"center",
      render: (text, rowData) => (
        // rowData.groupClassTechCode.trim()=="N/A"?<span></span>:
        <span>
          <Tooltip title="Edit">      
            <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
              onClick={() => {
                if (rowData.isActive) {
                   openFormWithData(rowData);

                   console.log(rowData,"rowData")
                } else {
                   AlertMessages.getErrorMessage('You Cannot Edit Deactivated Group Tech Class');
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
            </Tooltip>
          
          <Divider type="vertical" />
              <Popconfirm onConfirm={e =>{deleteTerm(rowData);}}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate '
                :  'Are you sure to Activate '
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


  const updateTerm = (Data: GroupTechClassDto) => {
    Data.updatedUser= JSON.parse(localStorage.getItem('username'))
    service.updateGroupTechClass(Data).then(res => { console.log(res);
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Successfully');
        getAll();
        setDrawerVisible(false);
      } else {
        if (res.status) {
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
   }

   const closeDrawer=()=>{
    setDrawerVisible(false);
  }
  const onChange=(pagination, filters, sorter, extra)=> {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <Card title ="Group Tech Class"
    extra={
    <Link to = "/masters/groupTechClass/groupTechClass-form"  >
      <span><Button type={'primary'} >New </Button> </span>
     </Link>
      } 

    >
     <br></br>
      <Row gutter={24}>
      <Col span={4}></Col>
    <Col span={5}>
         {/* <Col>
         <Card title={'Total Group Tech Class: ' + groupTechClassData.length} style={{textAlign: 'left', width: 230, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
          <Card title={'Active: ' + groupTechClassData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
           </Col>
           <Col>
           <Card title={'In-Active: ' + groupTechClassData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
           </Col> */}
           <Alert type='success' message={'Total Group Tech Class: ' + groupTechClassData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + groupTechClassData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='info' message={'Inactive: ' + groupTechClassData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        </Col>
          </Row> 
          <br></br>

          <Card>
          <Table
          size='small'
          columns={columnsSkelton}

          dataSource={groupTechClassData}
          scroll={{x:true,y:500}}
           pagination={{
            pageSize:50,
            onChange(current) {
              setPage(current);
            }
          }}
          onChange={onChange}
          bordered />
          </Card>
        <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
            onClose={closeDrawer} visible={drawerVisible} closable={true}>
             <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
              <GroupTechClassForm key={Date.now()}
                updateDetails={updateTerm}
                isUpdate={true}
                data={selectedData}
                closeForm={closeDrawer}
                 />
            </Card> 
          </Drawer>
     </Card>
  );
}

export default GroupTechClassGrid;
