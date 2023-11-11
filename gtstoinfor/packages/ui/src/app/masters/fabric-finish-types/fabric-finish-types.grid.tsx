import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, Space, Checkbox } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import { ColumnProps, ColumnType } from 'antd/lib/table';
import Highlighter from 'react-highlight-words';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import { FabricFinishTypesDTO } from '@project-management-system/shared-models';
import { FabricFinishTypeService } from '@project-management-system/shared-services';
import FabricFinishTypesForm from './fabric-finish-types.form';

/* eslint-disable-next-line */
export interface FabricFinishTypesGridProps {}

export function FabricFinishTypesGrid(props: FabricFinishTypesGridProps) {
  
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedFabricStructuresData, setData] = useState<any>(undefined);
  const [FabricStructuresData, setFabricStructuresData] = useState<FabricFinishTypesDTO[]>([]);
  const service = new FabricFinishTypeService()
  let navigate = useNavigate()
  const openFormWithData=(viewData: FabricFinishTypesDTO)=>{
    setDrawerVisible(true);
    setData(viewData);
  }
  useEffect(() => {
    getAll();
  }, []);

  const getAll= () => {
  // service.getAll(new UserRequestDto(JSON.parse(localStorage.getItem('username')))).then(res => {
    service.getAll().then(res => {

      if (res.status) {
       setFabricStructuresData(res.data);
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);


      }
    }).catch(err => {
     setFabricStructuresData([]);
      // AlertMessages.getErrorMessage(err.message);
    })
  }


 
  const deleteUser = (Data:FabricFinishTypesDTO) => {
    Data.isActive=Data.isActive?false:true;
    service.activateOrDeactivateFabricFinishTypes(Data).then(res => { console.log(res);
      if (res.status) {
        getAll();
        AlertMessages.getSuccessMessage('Success'); 
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);

      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
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

  const columnsSkelton: ColumnProps<any>[] = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
       render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    // {
    //   title: 'Delivery Term ID',
    //   dataIndex:'FabricStructureId',
    // },
    {
      title: <div style={{textAlign:'center'}}>Fabric Finish Type</div>,
      dataIndex: 'fabricFinishType',
      //  responsive: ['lg'],
       sorter: (a, b) => a.fabricFinishType.localeCompare(b.fabricFinishType),
       sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('fabricFinishType')
    },
    {
      title: 'Status',
      align:'center',
      dataIndex: 'isActive',
       sortDirections: ['descend', 'ascend'],
    //    ...getColumnSearchProps('FabricStructuresName'),
      
       render: (isActive, rowData) => (
        <>
          {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
        </>
      ),
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
        rowData=='N/A'?<span></span>:
        <span>         
            <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
              onClick={() => {
                if (rowData.isActive) {
                   openFormWithData(rowData);
                } else {
                   AlertMessages.getErrorMessage('You Cannot Edit Deactivated fabric Structure');
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
          
          <Divider type="vertical" />
              <Popconfirm onConfirm={e =>{deleteUser(rowData);}}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate  ?'
                :  'Are you sure to Activate  ?'
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

  const updateUser = (Data: FabricFinishTypesDTO) => {
    Data.updatedUser= JSON.parse(localStorage.getItem('username'))
      service.update(Data).then(res => { console.log(res);
        if (res.status) {
          AlertMessages.getSuccessMessage('Updated Successfully');
          getAll();
          setDrawerVisible(false);
        } else {
          
            AlertMessages.getErrorMessage(res.internalMessage);
          
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
<>
<Card title='Fabric Structure' extra={<span><Button onClick={() => navigate('/masters/fabric-finish-type/fabric-finish-type-form')} type={'primary'}>New</Button></span>}>
 <br></br>
      <Row gutter={40}>
      <Col>
          <Card title={'Total Delivery Terms: ' + FabricStructuresData.length} style={{textAlign: 'left', width: 250, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Active: ' + FabricStructuresData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active: ' + FabricStructuresData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
          </Col>
          </Row> 
          <br></br>
          <Table
          rowKey={record => record.Id}
          columns={columnsSkelton}
          dataSource={FabricStructuresData}
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
              <FabricFinishTypesForm key={Date.now()}
                updateDetails={updateUser}
                isUpdate={true}
                FabriFinishTypesData={selectedFabricStructuresData}
                closeForm={closeDrawer} />
            </Card> 
          </Drawer>
     </Card>
   </>
  );
}
   
export default FabricFinishTypesGrid;
