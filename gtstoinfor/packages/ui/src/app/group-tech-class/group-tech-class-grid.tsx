import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import { Link, useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import PaymentTermsForm, { GroupTechClassForm } from './group-tech-class-form';
import { GroupTechClassDto, PaymentTermsCategory, PaymentTermsDto } from '@project-management-system/shared-models';
import { BuyersService, DivisionService, GroupTechClassService, PaymentTermsService, UserRequestDto } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';

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



  const openFormWithData=(viewData: GroupTechClassDto)=>{
    setDrawerVisible(true);
    setSelectedData(viewData);
  }
  useEffect(() => {
    getAll();
    getAllActiveBuyers();
   getAllActiveDivision()



  }, []);

  const getAll= () => {
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



  const getAllActiveBuyers=() =>{
    buyerService.getAllActiveBuyers().then(res =>{
    if (res.status){
      setBuyerData(res.data);
       
    } else{
      AlertMessages.getErrorMessage(res.internalMessage);
       }
  }).catch(err => {
    setBuyerData([]);
     AlertMessages.getErrorMessage(err.message);
   })
  
}

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
       render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
      title: 'GroupTech Code',
      dataIndex: 'groupTechClassCode',
      width:"20",
      //  responsive: ['lg'],
       sorter: (a, b) => a.groupClassTechCode.length - b.groupClassTechCode.length,
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('groupClassTechCode')
    },
    {
      title: 'GroupTech Description',
      dataIndex: 'groupTechClassDescription',
      width:"20",
      //  responsive: ['lg'],
       sorter: (a, b) => a.groupClassTechDescription.length - b.groupClassTechDescription.length,
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('groupClassTechDescription')
    },
    {
    title: 'Buyer',
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
      title: 'Division',
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
    style={{textAlign:'center'}} headStyle={{ border: 0 }} 
    extra={
    <Link to = "/masters/groupTechClass/groupTechClass-form"  >
      <span><Button type={'primary'} >New </Button> </span>
     </Link>
      } 

    >
     <br></br>
      <Row gutter={40}>
         <Col>
         <Card title={'Total Group Tech Class: ' + groupTechClassData.length} style={{textAlign: 'left', width: 230, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
          <Card title={'Active: ' + groupTechClassData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
           </Col>
           <Col>
           <Card title={'In-Active: ' + groupTechClassData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
           </Col>
           <Col>
        </Col>
          </Row> 
          <br></br>
          <Table
          columns={columnsSkelton}
          dataSource={groupTechClassData}
          scroll={{x:true}}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          onChange={onChange}
          bordered />
        <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
            onClose={closeDrawer} visible={drawerVisible} closable={true}>
             <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
              <GroupTechClassForm key={Date.now()}
                updateDetails={updateTerm}
                isUpdate={true}
                Data={selectedData}
                closeForm={closeDrawer}
                 />
            </Card> 
          </Drawer>
     </Card>
  );
}

export default GroupTechClassGrid;
