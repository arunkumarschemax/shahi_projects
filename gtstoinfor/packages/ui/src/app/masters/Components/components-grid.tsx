import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, Checkbox, Alert } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/lib/table';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import { ComponentsDto } from '@project-management-system/shared-models';
import { ComponentService } from '@project-management-system/shared-services';
import ComponentsForm from './components-form';
// import './payment-modes.css';

/* eslint-disable-next-line */
export interface ComponentsProps {}

export function ComponentsGrid(props: ComponentsProps) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');
  const navigate = useNavigate()
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [componentsData, setComponentsData] = useState<ComponentsDto[]>([]);
  const [selectedComponentsData, setSelectedComponentsData] = useState<any>(undefined);
  
  const componentsService=new ComponentService();

  useEffect(() => {
    getAllComponents();
  }, []);

  /**
   * 
   */
  const getAllComponents= () => {
    componentsService.getAllComponents().then(res => {
      if (res.status) {
        setComponentsData(res.data);
      } else {
        if (res.data) {
          setComponentsData([]);
            AlertMessages.getErrorMessage(res.internalMessage);
        } else {
         AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      setComponentsData([]);
      AlertMessages.getErrorMessage(err.message);
    })
  }
  /**
   * 
   * @param componentsData 
   */
  const deleteComponent = (componentsData:ComponentsDto) => {
    componentsData.isActive= componentsData.isActive?false:true;
    componentsService.activateOrDeactivateComponent(componentsData).then(res => {
      if (res.status) {
        getAllComponents()
        AlertMessages.getSuccessMessage(res.internalMessage); 
      } else {
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }
   
    /**
     * 
     * @param componentsData 
     */
    const updateComponents = (componentsData: ComponentsDto) => {
      componentsData.updatedUser = JSON.parse(localStorage.getItem('username'))
      componentsService.updateComponents(componentsData).then(res => { 
        if (res.status) {
          AlertMessages.getSuccessMessage('Updated Successfully');
          getAllComponents();
          setDrawerVisible(false);
        } else {
            AlertMessages.getErrorMessage(res.internalMessage);
        }
      }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
      })
    }
   /**
   * used for column filter
   * @param dataIndex column data index
   */
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

  /**
   * 
   * @param selectedKeys 
   * @param confirm 
   * @param dataIndex 
   */
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
  
    //TO open the form for updation
    const openFormWithData=(viewData: ComponentsDto)=>{
      setDrawerVisible(true);
      setSelectedComponentsData(viewData);
    }


  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      align:"center",
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
      title: <div style={{textAlign:"center"}}>Component</div> ,
      dataIndex: 'componentName',
      // responsive: ['lg'],
      sorter: (a, b) => a.componentName.localeCompare(b.componentName),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('componentName')
    },
    {
      title: <div style={{textAlign:"center"}}>Status</div> ,
      dataIndex: 'isActive',
      align:"center",
      render: (isActive, rowData) => (
        <>
          {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
        </>
      ),
      // filters: [
      //   {
      //     text: 'Active',
      //     value: true,
      //   },
      //   {
      //     text: 'InActive',
      //     value: false,
      //   },
      // ],
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
    {
      title: <div style={{textAlign:"center"}}>Action</div> ,
      dataIndex: 'action',
      align:"center",
      render: (text, rowData) => (
        <span>         
            <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
              onClick={() => {
                if (rowData.isActive) {
                  openFormWithData(rowData);
                } else {
                  AlertMessages.getErrorMessage('You Cannot Edit Deactivated Component');
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
          
          <Divider type="vertical" />
            <Popconfirm onConfirm={e =>{deleteComponent(rowData);}}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate Component?'
                :  'Are you sure to Activate Component?'
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

  /**
   * 
   * @param pagination 
   * @param filters 
   * @param sorter 
   * @param extra 
   */
  const onChange=(pagination, filters, sorter, extra)=> {
    console.log('params', pagination, filters, sorter, extra);
  }
  return (
    <Card title='Components' extra={<span><Button onClick={()=> navigate('/masters/components/components-form')} type={'primary'}>New</Button></span>}>
   {/* <br></br>
     <Row gutter={40}>
      
        <Col>
          <Card title={'Total Components: ' + componentsData.length} style={{ textAlign: 'left', width: 220, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + componentsData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + componentsData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
          </Row>
          <br></br> */}
          <br></br>
      <Row gutter={24}>
      <Col span={4}></Col>
     <Col span={5}>
       
           <Alert type='success' message={'Total Components: ' + componentsData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + componentsData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='info' message={'Inactive: ' + componentsData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        
           
           
        </Col>
          </Row> 
          <br></br>
          <Card>
          <Table
          size='small'
          rowKey={record => record.componentId}

          columns={columnsSkelton}
          dataSource={componentsData}
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
            {/* <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'> */}
              <ComponentsForm key={Date.now()}
                updateComponent={updateComponents}
                isUpdate={true}
                componentsData={selectedComponentsData}
                closeForm={closeDrawer} />
            {/* </Card> */}
          </Drawer>
     </Card>
  );
}

export default ComponentsGrid;
