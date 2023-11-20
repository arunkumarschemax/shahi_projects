import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Checkbox, message, Alert} from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { PaymentMethodDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
// import {PaymentMethodService} from '@project-management-system/shared-services'
import { PaymentMethodService } from '@project-management-system/shared-services';
import PaymentMethodForm from './payment-method-form';

export interface PaymentMethodGridProps{ }

export const PaymentMethodGrid =(Props:PaymentMethodGridProps)=>{
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [variantData, setVariantData] = useState<PaymentMethodDto[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
    const [selectedPaymentmethodData, setSelectedPaymentmethodData] = useState<any>(undefined);

    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const columns = useState('');
    const navigate = useNavigate()

const service = new PaymentMethodService();


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
  const openFormWithData=(viewData: PaymentMethodDto)=>{
    setDrawerVisible(true);
    setSelectedVariant(viewData);
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  useEffect(() => {getAllPaymentMethods();}, [])

const getAllPaymentMethods=()=>{
    service.getAllPaymentMethods().then(res=>{
        if(res.status){
            setVariantData(res.data)
            console.log(res,'dataaaaaaaaaaaaa')
        }else{
            AlertMessages.getErrorMessage(res.internalMessage);
        }
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
        setVariantData([]);
      })
}
const closeDrawer = () => {
    setDrawerVisible(false);
  }

  const saveVariant=(variantData:PaymentMethodDto)=>{
variantData.paymentMethodId=0;
service.createPaymentMethod(variantData).then(res=>{
    if(res.status){
        AlertMessages.getSuccessMessage('PaymentMethod Created Successfully');

    }
}).catch(err => {
    AlertMessages.getErrorMessage(err.message);
  })
  }

  const updatePaymentMethod=(paymentMethod: PaymentMethodDto)=>{
    paymentMethod.updatedUser=JSON.parse(localStorage.getItem('username'))
    service.updatePaymentMethod(paymentMethod).then(res=>{
        if(res.status){
            AlertMessages.getSuccessMessage('Updated Successfully');
            setDrawerVisible(false);
            getAllPaymentMethods();
        }else{
            AlertMessages.getErrorMessage(res.internalMessage);

        }
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
      })
  }
  const deletePaymentmode = (paymentmethodData:PaymentMethodDto) => {
    paymentmethodData.isActive=paymentmethodData.isActive?false:true;
    service.activateDeActivatePaymentMethod(paymentmethodData).then(res => { console.log(res);
      if (res.status) {
        // getAllPaymentmethod();
        message.success(res.internalMessage, 1);
      } else {
        // if (res.intlCode) {
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
          message.error(res.internalMessage, 1);
        }
      
    }).catch(err => {
      message.error(err.message, 2);
    })
  }
   const columnsSkelton: any =[
    
        {
            title: 'S No',
            key: 'sno',
            align:'center',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1)
          },

          {
            title:<div style={{ textAlign: 'center' }}>Payment Method</div> ,
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('paymentMethod')
          },
          {
            title: 'Status',
            dataIndex: 'isActive',align:'center',
            render: (isActive, rowData) => (
              <>
                {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">Inactive</Tag>}
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
        dataIndex: 'action',
        align:'center',
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
              <Popconfirm onConfirm={e =>{deletePaymentmode(rowData);}}
              title={
                rowData.isActive
                  ? 'Are you sure to Deactivate Payment Method ?'
                  :  'Are you sure to Activate Payment Method ?'
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
  <Card title= 'Payment Methods' extra={<span><Button onClick={()=>navigate('/global/paymentmethod/paymentmethod-form')} type={'primary'}>New</Button></span>}>
    <>
   
    <Row gutter={24}>
  <Col span={4}></Col>
    <Col span={5}>
     
<Alert type='success' message={'Total Payment Methods: ' + variantData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          {/* <Card title={'Active: ' + variantData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card> */}
          <Alert type='warning' message={'Active: ' + variantData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          {/* <Card title={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card> */}
          <Alert type='info' message={'Inactive: ' + variantData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        </Col>
</Row>
<br></br>

    <Card>
  <Table
        size='small'

          // rowKey={record => record.variantId}
          columns={columnsSkelton}
          dataSource={variantData}
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
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <PaymentMethodForm key={Date.now()}
            updateItem={updatePaymentMethod}
            isUpdate={true}
            // saveItem={saveVariant}
            paymentMethodData={selectedVariant}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
    </>
    </Card>
)
}
export default PaymentMethodGrid;