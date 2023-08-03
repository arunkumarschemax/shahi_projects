import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DeliveryMethodDto } from '@project-management-system/shared-models';
import { DeliveryMethodService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import DeliveryMethodForm from './delivery-method-form';
// import './payment-modes.css';

/* eslint-disable-next-line */
export interface DeliveryMethodProps {}

export function DeliveryMethodGrid(props: DeliveryMethodProps) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [deliveryMethodData, setDeliveryMethodData] = useState<DeliveryMethodDto[]>([]);
  const [selectedDeliveryMethodData, setSelectedDeliveryMethodData] = useState<any>(undefined);
  
  const deliveryMethodDataService=new DeliveryMethodService();

  useEffect(() => {
    getAllDeliveryMethods();
  }, []);

  /**
   * 
   */
  const getAllDeliveryMethods= () => {
    deliveryMethodDataService.getAllDeliveryMethods().then(res => {
      if (res.status) {
        setDeliveryMethodData(res.data);
      } else {
        if (res.data) {
          setDeliveryMethodData([]);
            AlertMessages.getErrorMessage(res.internalMessage);
        } else {
         AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      setDeliveryMethodData([]);
      AlertMessages.getErrorMessage(err.message);
    })
  }
  /**
   * 
   * @param deliveryMethodData 
   */
  const deleteDeliveryMethod = (deliveryMethodData:DeliveryMethodDto) => {
    console.log(deliveryMethodData,'hiiiiiiiiii')
    deliveryMethodData.isActive=deliveryMethodData.isActive?false:true;
    deliveryMethodDataService.activateOrDeactivateDeliveryMethod(deliveryMethodData).then(res => { console.log(res);
      if (res.status) {
        // getAllDeliveryMethods();
        AlertMessages.getSuccessMessage('Success'); 
      } else {
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }
   
    /**
     * 
     * @param deliveryMethodData 
     */
    const updateDeliveryMethod = (deliveryMethodData: DeliveryMethodDto) => {
      deliveryMethodData.updatedUser = JSON.parse(localStorage.getItem('username'))
      deliveryMethodDataService.updateDeliveryMethod(deliveryMethodData).then(res => { console.log(res);
        if (res.status) {
          AlertMessages.getSuccessMessage('Updated Successfully');
          getAllDeliveryMethods();
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
    const openFormWithData=(viewData: DeliveryMethodDto)=>{
      setDrawerVisible(true);
      setSelectedDeliveryMethodData(viewData);
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
      title: 'Delivery Method',
      dataIndex: 'deliveryMethod',
      // responsive: ['lg'],
      sorter: (a, b) => a.deliveryMethod.localeCompare(b.deliveryMethod),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('deliveryMethod')
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
                  openFormWithData(rowData);
                } else {
                  AlertMessages.getErrorMessage('You Cannot Edit Deactivated Delivery Method');
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
          
          <Divider type="vertical" />
            <Popconfirm onConfirm={e =>{deleteDeliveryMethod(rowData);}}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate Delivery Method ?'
                :  'Are you sure to Activate Delivery Method ?'
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
    <Card title={<span >Delivery Method</span>}
    style={{textAlign:'center'}} headStyle={{ border: 0 }} 
    extra={<Link to='/masters/delivery-methods/delivery-method-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New </Button> </span>
      </Link>} >
     <br></br>
     <Row gutter={40}>
      
        <Col>
          <Card title={'Total Delivery Methods: ' + deliveryMethodData.length} style={{ textAlign: 'left', width: 220, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + deliveryMethodData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + deliveryMethodData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
          </Row>
          <br></br>
          <Table
          rowKey={record => record.deliveryMethodId}
          columns={columnsSkelton}
          dataSource={deliveryMethodData}
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
            {/* <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'> */}
              <DeliveryMethodForm key={Date.now()}
                updateDeliveryMethod={updateDeliveryMethod}
                isUpdate={true}
                deliveryMethodData={selectedDeliveryMethodData}
                closeForm={closeDrawer} />
            {/* </Card> */}
          </Drawer>
     </Card>
  );
}

export default DeliveryMethodGrid;
