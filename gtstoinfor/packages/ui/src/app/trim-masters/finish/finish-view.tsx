import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import FinishForm from './finish';
import { FinishService } from '@project-management-system/shared-services';
import { FinishDTO } from '@project-management-system/shared-models';


export interface FinishProps {}

export function FinishGrid(props: FinishProps) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [data, setData] = useState<FinishDTO[]>([]);
  const [selectedData, setSelectedData] = useState<any>(undefined);
  
  const Service=new FinishService();

  useEffect(() => {
    getAllFinish();
  }, []);

  /**
   * 
   */
  const getAllFinish= () => {
    Service.getAllFinish().then(res => {
      if (res.status) {
        setData(res.data);
      } else {
        if (res.data) {
          setData([]);
            message.error(res.internalMessage,2);
        } else {
         message.error(res.internalMessage,2);
        }
      }
    }).catch(err => {
      setData([]);
      message.error(err.message,2);
    })
  }
  /**
   * 
   * @param deliveryMethodData 
   */
  const saveFinishes = (data:FinishDTO) => {
    data.isActive = data.isActive?false:true;
    Service.activateOrDeactivateFinish(data).then(res => {
      if (res.status) {
        message.success(res.internalMessage,2); 
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
    const updateData = (data: FinishDTO) => {
      data.updatedUser = JSON.parse(localStorage.getItem('username'))
      Service.updateFinish(data).then(res => {
        if (res.status) {
          message.success('Updated Successfully',2);
          getAllFinish();
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
    const openFormWithData=(viewData: FinishDTO)=>{
      setDrawerVisible(true);
      setSelectedData(viewData);
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
      title: 'Finish',
      dataIndex: 'finish',
      // responsive: ['lg'],
      sorter: (a, b) => a.finish.localeCompare(b.finish),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('finish')
    },
    {
      title: 'Finish Code',
      dataIndex: 'finishCode',
      // responsive: ['lg'],
      sorter: (a, b) => a.finishCode.localeCompare(b.finishCode),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('finishCode')
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
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
      title:`Action`,
      dataIndex: 'action',
      render: (text, rowData) => (
        <span>         
            <EditOutlined  className={'editSampleTypeIcon'}  type="edit" 
              onClick={() => {
                if (rowData.isActive) {
                  openFormWithData(rowData);
                } else {
                  message.error('You Cannot Edit Deactivated Finish',2);
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
          
          <Divider type="vertical" />
            <Popconfirm onConfirm={e =>{saveFinishes(rowData);}}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate Finish ?'
                :  'Are you sure to Activate Finish ?'
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
    <Card title={<span >Finish</span>}
    style={{textAlign:'center'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
    extra={<Link to='/masters/finish/finish-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New </Button> </span>
      </Link>} >
     <br></br>
     <Row gutter={40}>
      
        <Col>
          <Card title={'Total Finishes: ' + data.length} style={{ textAlign: 'left', width: 220, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + data.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + data.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
          </Row>
          <br></br>
          <Table
          size='small'
          rowKey={record => record.finishId}
          columns={columnsSkelton}
          dataSource={data}
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
              <FinishForm key={Date.now()}
                updateFinish={updateData}
                isUpdate={true}
                data={selectedData}
                closeForm={closeDrawer} />
          </Drawer>
     </Card>
  );
}

export default FinishGrid;
