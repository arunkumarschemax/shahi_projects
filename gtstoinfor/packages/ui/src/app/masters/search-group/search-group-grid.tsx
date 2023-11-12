import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message, Alert, Checkbox } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import { Link, useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
// import PaymentTermsForm from './payment-terms-form';
import { PaymentTermsCategory, PaymentTermsDto, searchGroupDto } from '@project-management-system/shared-models';
import { PaymentTermsService, SearchGroupService, UserRequestDto } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import SearchGroupForm from './search-group-form';

/* eslint-disable-next-line */
export interface SearchGroupGridProps {}

export function SearchGroupGrid(
  props: SearchGroupGridProps
) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate()
  const service = new SearchGroupService;

  const [selectedData, setSelectedData] = useState<any>(undefined);
  const [groupData, setGroupData] = useState<searchGroupDto[]>([]);


  const openFormWithData=(viewData: searchGroupDto)=>{
    setDrawerVisible(true);
    setSelectedData(viewData);
  }
  useEffect(() => {
    getAll();
  }, []);
  const getAll= () => {
  service.getSearchGroupData().then(res => {
      if (res.status) {
       setGroupData(res.data);
      } else {
        if (res.status) {
         setGroupData([]);
            AlertMessages.getErrorMessage(res.internalMessage);
        } else {
         AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
     setGroupData([]);
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
 
  const deleteTerm = (Data:searchGroupDto) => {
    Data.isActive=Data.isActive?false:true;
    service.ActivateOrDeactivate(Data).then(res => { console.log(res);
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
      title: <div style={{textAlign:"center"}}>S.No</div>,
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
       render: (text, object, index) => (page-1) * 10 +(index+1),
      align:"center"

      
    },
    {
      title: <div style={{textAlign:"center"}}>Search Group Code</div>,
      dataIndex:'searchGrpCode',

     
    },
   
    {
      title: <div style={{textAlign:"center"}}>Search Group Name</div>,
      dataIndex: 'searchGrpName',
       sorter: (a, b) => a.searchGrpName.length - b.searchGrpName.length,
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('searchGrpName'),
       

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
        // rowData.paymentTermsName.trim()=="N/A"?<span></span>:
        <span>
          <Tooltip title="Edit">      
            <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
              onClick={() => {
                if (rowData.isActive) {
                   openFormWithData(rowData);
                   console.log(rowData,"rowData")
                } else {
                   AlertMessages.getErrorMessage('You Cannot Edit Deactivated Payment term');
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


  const updateTerm = (Data: searchGroupDto) => {
    Data.updatedUser= JSON.parse(localStorage.getItem('username'))
    service.UpdateSearchGroup(Data).then(res => { console.log(res);
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
    <Card title ="Search Groups"
    headStyle={{ border: 0 }} 
    extra={
    <Link to = "/masters/searchGroup/searchGroup-form"  >
      <span><Button type={'primary'} >New </Button> </span>
      </Link>
      } 

    >
     <br></br>
      <Row gutter={24}>
      <Col span={4}></Col>
      <Col span={5}>
         {/* <Col>
         <Card title={'Total Search Group: ' + groupData.length} style={{textAlign: 'left', width: 230, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
          <Card title={'Active: ' + groupData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
           </Col>
           <Col>
           <Card title={'In-Active: ' + groupData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
           </Col>
           <Col>
        </Col> */}
        <Alert type='success' message={'Total Search Group: ' + groupData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + groupData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='info' message={'In-Active: ' + groupData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        </Col>
          </Row> 
          <br></br>
          <Card>
          <Table
          size="small"
          columns={columnsSkelton}
          dataSource={groupData}
          scroll={{x:true}}
          pagination={{
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
              <SearchGroupForm key={Date.now()}
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

export default SearchGroupGrid;
