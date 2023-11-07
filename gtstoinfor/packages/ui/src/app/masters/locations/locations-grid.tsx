import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, Space } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import { ColumnProps, ColumnType } from 'antd/lib/table';
import Highlighter from 'react-highlight-words';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';

import { LocationDto } from '@project-management-system/shared-models';
import LocationsForm from './locations-form';
import { LocationsService } from '@project-management-system/shared-services';

/* eslint-disable-next-line */
export interface LocationsGridProps {}

export function LocationsGrid(props: LocationsGridProps) {
  
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedlocationData, setDeliveryShippingTermsData] = useState<any>(undefined);
  const [locationData, setlocationData] = useState<LocationDto[]>([]);
  const service = new LocationsService()
  let navigate = useNavigate()
  const openFormWithData=(viewData: LocationDto)=>{
    setDrawerVisible(true);
    setDeliveryShippingTermsData(viewData);
  }
  useEffect(() => {
    getAll();
  }, []);

  const getAll= () => {
  // service.getAll(new UserRequestDto(JSON.parse(localStorage.getItem('username')))).then(res => {
    service.getAll().then(res => {

      if (res.status) {
       setlocationData(res.data);
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);


      }
    }).catch(err => {
     setlocationData([]);
      // AlertMessages.getErrorMessage(err.message);
    })
  }


 
  const deleteUser = (Data:LocationDto) => {
    Data.isActive=Data.isActive?false:true;
    service.activatedeActivate(Data).then(res => { console.log(res);
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
    //   dataIndex:'deliverytermId',
    // },
    {
      title: 'Location Name',
      dataIndex: 'locationName',
      //  responsive: ['lg'],
       sorter: (a, b) => a.locationName.localeCompare(b.locationName),
       sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('locationName')
    },
    {
      title: 'Location Code',
      dataIndex: 'locationCode',
      //  responsive: ['lg'],
       sorter: (a, b) => a.locationCode.localeCompare(b.locationCode),
       sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('locationCode')
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      // sorter: (a, b) => a.locationName.localeCompare(b.locationName),
      //  sortDirections: ['descend', 'ascend'],
      //  ...getColumnSearchProps('locationName'),
      
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
      
    },
    {
      title:`Action`,
      dataIndex: 'action',
      render: (text, rowData) => (
        <span>         
            <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
              onClick={() => {
                if (rowData.isActive) {
                  openFormWithData(rowData);
                } else {
                  AlertMessages.getErrorMessage('You Cannot Edit Deactivated Operation');
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
          
          <Divider type="vertical" />
            <Popconfirm onConfirm={e =>{deleteUser(rowData);}}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate Operation ?'
                :  'Are you sure to Activate Operation ?'
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

  const updateUser = (Data: LocationDto) => {
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
<Card title='Locations' extra={<span><Button onClick={() => navigate('/global/locations/locations-form')} type={'primary'}>New</Button></span>}>
 <br></br>
      <Row gutter={40}>
      <Col>
          <Card title={'Total Locations: ' + locationData.length} style={{textAlign: 'left', width: 250, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Active: ' + locationData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active: ' + locationData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
          </Col>
          </Row> 
          <br></br>
          <Table
          rowKey={record => record.Id}

          columns={columnsSkelton}
          dataSource={locationData}
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
              <LocationsForm key={Date.now()}
                updateDetails={updateUser}
                isUpdate={true}
                locationsData={selectedlocationData}
                closeForm={closeDrawer} />
            </Card> 
          </Drawer>
     </Card>
   </>
  );
}
   
export default LocationsGrid;
