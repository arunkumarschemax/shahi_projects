import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Checkbox } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { SizeDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
// import {PaymentMethodService} from '@project-management-system/shared-services'
import { SizeService } from '@project-management-system/shared-services';
import {SizeForm} from './size.form'

export interface SizeProps{ }

export const SizeGrid =(Props:SizeProps)=>{
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [variantData, setVariantData] = useState<SizeDto[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
    const [selectedPaymentmethodData, setSelectedPaymentmethodData] = useState<any>(undefined);

    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const columns = useState('');
    const navigate = useNavigate()

const service = new SizeService();


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

function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };
  const openFormWithData=(viewData: SizeDto)=>{
    setDrawerVisible(true);
    setSelectedVariant(viewData);
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  useEffect(() => {getAllSize();}, [])

const getAllSize=()=>{
    service.getAllSize().then(res=>{
        if(res.status){
            setVariantData(res.data)
        }else{
          if(res.status) {
            setVariantData([])
            AlertMessages.getErrorMessage(res.internalMessage);
        }else{
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      setVariantData([]);
        AlertMessages.getErrorMessage(err.message);
      })
}

const closeDrawer = () => {
    setDrawerVisible(false);
  }

  const saveVariant=(variantData:SizeDto)=>{
variantData.sizeId=0;
service.createsize(variantData).then(res=>{
    if(res.status){
        AlertMessages.getSuccessMessage('Size Created Successfully');

    }
}).catch(err => {
    AlertMessages.getErrorMessage(err.message);
  })
  }

  const updateSize=(size: SizeDto)=>{
    size.updatedUser=JSON.parse(localStorage.getItem('username'))
    service.updateSize(size).then(res=>{
        if(res.status){
          message.success('Updated Successfully');
            setDrawerVisible(false);

        }else{
          message.error(res.internalMessage, 2);

        }
    }).catch(err => {
      message.error(err.message, 2);
    })
  }
  const deleteSize = (size:SizeDto) => {
    size.isActive=size.isActive?false:true;
    service.activeteOrDeactivateSize(size).then(res => { console.log(res);
      if (res.status) {
        // getAllPaymentmethod();
        message.success(res.internalMessage, 2);
      } else {
        // if (res.intlCode) {
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
          message.error(res.internalMessage, 2);
        }
      
    }).catch(err => {
      message.error(err.message, 2);
    })
  }
   const columnsSkelton: any =[
    
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1)
          },
          {
            title: 'Division',
            dataIndex: 'divisionName',
            sorter: (a, b) => a.divisionName.localeCompare(b.divisionName),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('divisionName')
          },
          {
            title: 'Option Group',
            dataIndex: 'optionGroup',
            sorter: (a, b) => a.optionGroup.localeCompare(b.optionGroup),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('optionGroup')
          },
          {
            title: 'Size Code',
            dataIndex: 'sizeCode',
            sorter: (a, b) => a.sizeCode.localeCompare(b.sizeCode),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('sizeCode')
          },
          {
            title: 'Size',
            dataIndex: 'size',
            sorter: (a, b) => a.size.localeCompare(b.size),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('size')
          },
          {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a, b) => a.description.localeCompare(b.description),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('description')
          },
          {
            title: 'Status',
            dataIndex: 'isActive',
            render: (isActive, rowData) => (
              <>
                {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
              </>
            ),
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
            filterMultiple: false,
            
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
                    AlertMessages.getErrorMessage('You Cannot Edit Deactivated Payment mode');
                  }
                }}
                style={{ color: '#1890ff', fontSize: '14px' }}
              />      
              
            
            <Divider type="vertical" />
              <Popconfirm onConfirm={e =>{deleteSize(rowData);}}
              title={
                rowData.isActive
                  ? 'Are you sure to Deactivate Size ?'
                  :  'Are you sure to Activate Size ?'
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

return (
  <Card title='Size' 
  extra={<span><Button onClick={()=>navigate('/masters/size/size-form')} type={'primary'}>New</Button></span>}>
  <br/>
    <>
    <Row gutter={40}>
    <Col>
          <Card title={'Total Sizes: ' + variantData.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + variantData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
        {/* <Col>
        <span><Button onClick={() => navigate('/masters/paymentmethod/paymentmethod-form')}
              type={'primary'}>New</Button></span>
        </Col> */}
    </Row>
    <Card>
  <Table
        size='small'

          // rowKey={record => record.variantId}
          columns={columnsSkelton}
          dataSource={variantData}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          scroll={{x:true}}
          onChange={onChange}
          bordered />
    </Card>
    <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <SizeForm key={Date.now()}
            updateItem={updateSize}
            isUpdate={true}
            // saveItem={saveVariant}
            sizeData={selectedVariant}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
    </>
    </Card>
)
}
export default SizeGrid;