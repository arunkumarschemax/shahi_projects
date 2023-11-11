import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { ROSLGroupsDto } from '@project-management-system/shared-models';
import { ROSLGroupsService } from '@project-management-system/shared-services';
import { ROSLGroupsForm } from './rosl-groups-form';


export interface ROSLGroupProps {}

export function ROSLGroupsGrid(props: ROSLGroupProps) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [roslGroupsData, setROSLGroupsData] = useState<ROSLGroupsDto[]>([]);
  const [selectedROSLGroupsData, setSelectedROSLGroupsData] = useState<any>(undefined);
  
  const Service=new ROSLGroupsService();

  useEffect(() => {
    getAllROSLGroups();
  }, []);

  /**
   * 
   */
  const getAllROSLGroups= () => {
    Service.getAllROSLGroups().then(res => {
      if (res.status) {
        setROSLGroupsData(res.data);
      } else {
        if (res.data) {
          setROSLGroupsData([]);
            message.error(res.internalMessage,2);
        } else {
         message.error(res.internalMessage,2);
        }
      }
    }).catch(err => {
      setROSLGroupsData([]);
      message.error(err.message,2);
    })
  }
  /**
   * 
   * @param deliveryMethodData 
   */
  const deleteROSLGroup = (data:ROSLGroupsDto) => {
    data.isActive = data.isActive?false:true;
    Service.activateOrDeactivateROSLGroup(data).then(res => {
      if (res.status) {
        message.success('Success',2); 
      } else {
          message.error(res.internalMessage,2);
      }
    }).catch(err => {
      message.error(err.message,2);
    })
  }
   
    /**
     * 
     * @param deliveryMethodData 
     */
    const updateROSLGroups = (data: ROSLGroupsDto) => {
      data.updatedUser = JSON.parse(localStorage.getItem('username'))
      Service.updateROSLGroup(data).then(res => {
        if (res.status) {
          message.success('Updated Successfully',2);
          getAllROSLGroups();
          setDrawerVisible(false);
        } else {
            message.error(res.internalMessage,2);
        }
      }).catch(err => {
        message.error(err.message,2);
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
    const openFormWithData=(viewData: ROSLGroupsDto)=>{
      setDrawerVisible(true);
      setSelectedROSLGroupsData(viewData);
    }


  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
      title: <div style={{textAlign:"center"}}>ROSL Group</div> ,
      dataIndex: 'roslGroup',
      // responsive: ['lg'],
      sorter: (a, b) => a.roslGroup.localeCompare(b.roslGroup),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('roslGroup')
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
      filterMultiple: false,
      onFilter: (value, record) => 
      {
        // === is not work
        return record.isActive === value;
      },
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

    },
    {
      title: <div style={{textAlign:"center"}}>Action</div> ,
      dataIndex: 'action',
      align:'center',
      render: (text, rowData) => (
        <span>         
            <EditOutlined  className={'editSampleTypeIcon'}  type="edit" 
              onClick={() => {
                if (rowData.isActive) {
                  openFormWithData(rowData);
                } else {
                  message.error('You Cannot Edit Deactivated ROSL Group',2);
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
          
          <Divider type="vertical" />
            <Popconfirm onConfirm={e =>{deleteROSLGroup(rowData);}}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate ROSL Group ?'
                :  'Are you sure to Activate ROSL Group ?'
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
    <Card title={<span >ROSL Groups</span>}
    // style={{textAlign:'center'}} headStyle={{ border: 0 }} 
    extra={<Link to='/masters/ROSL-groups/ROSL-groups-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New </Button> </span>
      </Link>} >
     <br></br>
     <Row gutter={40}>
      
        <Col>
          <Card title={'Total ROSL Groups: ' + roslGroupsData.length} style={{ textAlign: 'left', width: 220, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + roslGroupsData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + roslGroupsData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
          </Row>
          <br></br>
          <Table
          size='small'

          rowKey={record => record.roslGroupId}
          columns={columnsSkelton}
          dataSource={roslGroupsData}
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
              <ROSLGroupsForm key={Date.now()}
                updateROSLGroups={updateROSLGroups}
                isUpdate={true}
                data={selectedROSLGroupsData}
                closeForm={closeDrawer} />
          </Drawer>
     </Card>
  );
}

export default ROSLGroupsGrid;
