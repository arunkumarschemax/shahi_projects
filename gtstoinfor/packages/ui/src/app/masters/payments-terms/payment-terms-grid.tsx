import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import { Link, useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import PaymentTermsForm from './payment-terms-form';
import { PaymentTermsCategory, PaymentTermsDto } from '@project-management-system/shared-models';
import { PaymentTermsService, UserRequestDto } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';

/* eslint-disable-next-line */
export interface PaymentTermsGridProps {}

export function PaymentTermsGrid(
  props: PaymentTermsGridProps
) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate()
  const service = new PaymentTermsService();
  const [selectedPaymentTermsData, setSelectedPaymentTermsData] = useState<any>(undefined);
  const [paymentTermsData, setPaymentTermsData] = useState<PaymentTermsDto[]>([]);


  const openFormWithData=(viewData: PaymentTermsDto)=>{
    setDrawerVisible(true);
    setSelectedPaymentTermsData(viewData);
  }
  useEffect(() => {
    getAll();
  }, []);
  const getAll= () => {
  service.getAllPaymentTerms().then(res => {
      if (res.status) {
       setPaymentTermsData(res.data);
      } else {
        if (res.status) {
         setPaymentTermsData([]);
            AlertMessages.getErrorMessage(res.internalMessage);
        } else {
         AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
     setPaymentTermsData([]);
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
 
  const deleteTerm = (Data:PaymentTermsDto) => {
    Data.isActive=Data.isActive?false:true;
    service.activateOrDeactivatePaymentTerms(Data).then(res => { console.log(res);
      if (res.status) {
        getAll();
        AlertMessages.getSuccessMessage('Success'); 
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
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
       render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
      title: 'Category',
      dataIndex:'paymentTermsCategory',
      responsive: ['sm'],
      filters: [
        {
          text: 'Customer',
          value: PaymentTermsCategory.Customer,
        },
        {
          text: 'Vendor',
          value: PaymentTermsCategory.Vendor,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => 
      {
        return record.paymentTermsCategory == value;
      },
    },
    // {
    //   title: 'Category',
    //   dataIndex: 'paymentTermsCategory',
    //   responsive: ['sm'],
    //   filters: [
    //     {
    //       text: 'Customer',
    //       value: PaymentTermsCategory.Customer, // Assuming PaymentTermsCategory.Customer is a string
    //     },
    //     {
    //       text: 'Vendor',
    //       value: PaymentTermsCategory.Vendor , // Assuming PaymentTermsCategory.Vendor is a string
    //     },
    //   ],
    //   filterMultiple: false,
    //   onFilter: (value, record) => {
    //     return record['paymentTermsCategory'] === value; // Use === for strict equality
    //   },
    //       },
    {
      title: 'Payment Term Name',
      dataIndex: 'paymentTermsName',
      //  responsive: ['lg'],
       sorter: (a, b) => a.paymentTermsName.length - b.paymentTermsName.length,
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('paymentTermsName')
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
        rowData.paymentTermsName.trim()=="N/A"?<span></span>:
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


  const updateTerm = (Data: PaymentTermsDto) => {
    Data.updatedUser= JSON.parse(localStorage.getItem('username'))
    service.updatePaymentTerms(Data).then(res => { console.log(res);
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
    <Card>
     <br></br>
      <Row gutter={40}>
         <Col>
         <Card title={'Total Payment Terms: ' + paymentTermsData.length} style={{textAlign: 'left', width: 230, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
          <Card title={'Active: ' + paymentTermsData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
           </Col>
           <Col>
           <Card title={'In-Active: ' + paymentTermsData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
           </Col>
           <Col>
        <span><Button onClick={() => navigate('/masters/payment-terms/payment-terms-form')}
              type={'primary'}>New</Button></span>
        </Col>
          </Row> 
          <br></br>
          <Table
          columns={columnsSkelton}
          dataSource={paymentTermsData}
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
              <PaymentTermsForm key={Date.now()}
                updateDetails={updateTerm}
                isUpdate={true}
                paymentTermsData={selectedPaymentTermsData}
                closeForm={closeDrawer}
                 />
            </Card> 
          </Drawer>
     </Card>
  );
}

export default PaymentTermsGrid;
