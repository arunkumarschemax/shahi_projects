import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message, Checkbox } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { FabricWeaveDto } from '@project-management-system/shared-models';
import { FabricWeaveService } from '@project-management-system/shared-services';
import { FabricWeaveForm } from './fabric-weave-form';


export interface FabricWeaveFormProps {}

export function FabricWeaveGrid(props: FabricWeaveFormProps) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [data, setData] = useState<FabricWeaveDto[]>([]);
  const [selectedData, setSelectedData] = useState<any>(undefined);
  
  const Service=new FabricWeaveService();

  useEffect(() => {
    getAllFabricWeave();
  }, []);

  /**
   * 
   */
  const getAllFabricWeave = () => {
    Service.getAllFabricWeave().then(res => {
      if (res.status) {
        console.log(res,'llllll')
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
   * @param  
   */
  const deleteFabricWeave = (data:FabricWeaveDto) => {
    data.isActive = data.isActive?false:true;
    Service.activateOrDeactivateFabricWeave(data).then(res => {
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
    const updateFabricWeave = (data: FabricWeaveDto) => {
      data.updatedUser = JSON.parse(localStorage.getItem('username'))
      Service.updateFabricWeave(data).then(res => {
        if (res.status) {
          message.success('Updated Successfully',2);
          getAllFabricWeave();
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

    
    const closeDrawer=()=>{
      setDrawerVisible(false);
    }
  
    
    const openFormWithData=(viewData: FabricWeaveDto)=>{
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
      title: <div style={{textAlign:'center'}}>Fabric Weave</div>,
      dataIndex: 'fabricWeaveName',
      // responsive: ['lg'],
      sorter: (a, b) => a.fabricWeaveName.localeCompare(b.fabricWeaveName),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('fabricWeaveName')
    },
    {
      title: <div style={{textAlign:'center'}}>Fabric Weave Code</div>,
      dataIndex: 'fabricWeaveCode',
      // responsive: ['lg'],
      sorter: (a, b) => a.fabricWeaveCode.localeCompare(b.fabricWeaveCode),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('fabricWeaveCode')
    },
    {
      title: <div style={{textAlign:'center'}}>Fabric Weave Image</div>,
      dataIndex: 'fabricWeaveImageName',
      // responsive: ['lg'],
      sorter: (a, b) => a.fabricWeaveImageName.localeCompare(b.fabricWeaveImageName),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('fabricWeaveImageName'),
      render: (fabricWeaveImageName,rowData) => {
        const updateImage ='http://165.22.220.143/crm/gtstoinfor/dist/packages/services/common/upload-files/'+rowData.fabricWeaveImageName
        return(
        <div>
          <img
          src={updateImage} 
          // alt={fabricWeaveImageName}
          style={{ maxWidth: '100px', maxHeight: '100px' }} 
          />
          <div>{fabricWeaveImageName}</div>
        </div>
        )
      }
    },
    {
      title: 'Status',
      align:'center',
      dataIndex: 'isActive',
      render: (isActive, rowData) => (
        <>
          {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
        </>
      ),
      filterMultiple: false,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : any) => (
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
      )

    },
    {
      title:`Action`,
      align:'center',
      dataIndex: 'action',
      render: (text, rowData) => (
        <span>         
            <EditOutlined  className={'editSampleTypeIcon'}  type="edit" 
              onClick={() => {
                if (rowData.isActive) {
                  openFormWithData(rowData);
                } else {
                  message.error('You Cannot Edit Deactivated Fabric Weave',2);
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
          
          <Divider type="vertical" />
            <Popconfirm onConfirm={e =>{deleteFabricWeave(rowData);}}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate Fabric Weave ?'
                :  'Are you sure to Activate Fabric Weave ?'
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
    <Card title={<span >Fabric Weave</span>}
    style={{textAlign:'center'}} headStyle={{ border: 0 }} 
    extra={<Link to='/masters/fabric-weave/fabric-weave-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New </Button> </span>
      </Link>} >
     <br></br>
     <Row gutter={40}>
      
        <Col>
          <Card title={'Total Fabric Weaves: ' + data.length} style={{ textAlign: 'left', width: 220, height: 41, backgroundColor: '#bfbfbf' }}></Card>
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

          rowKey={record => record.fabricWeaveId}
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
              <FabricWeaveForm key={Date.now()}
                updateFabricWeave={updateFabricWeave}
                isUpdate={true}
                data={selectedData}
                closeForm={closeDrawer} />
          </Drawer>
     </Card>
  );
}

export default FabricWeaveGrid;
