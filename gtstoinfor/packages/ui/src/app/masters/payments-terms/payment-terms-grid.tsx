import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message, Alert, Checkbox } from 'antd';
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
        // AlertMessages.getSuccessMessage('Success'); 
        message.success(res.internalMessage)

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
      align:"center",
      responsive: ['sm'],
       render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
      title: <div style={{ textAlign: "center" }}>Category</div>,
      dataIndex: 'paymentTermsCategory',
      responsive: ['sm'],
      filters: [
        {
          text: 'Customer',
          value: PaymentTermsCategory.Buyer,
        },
        {
          text: 'Vendor',
          value: PaymentTermsCategory.Vendor,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.paymentTermsCategory === value,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown" style={{ flexDirection: 'row', marginLeft: 10 }}>
          <Checkbox
            checked={selectedKeys.includes(PaymentTermsCategory.Vendor)}
            onChange={() => setSelectedKeys(selectedKeys.includes(PaymentTermsCategory.Vendor) ? [] : [PaymentTermsCategory.Vendor])}
          >
            <span>Vendor</span>
          </Checkbox>
          <Checkbox
            checked={selectedKeys.includes(PaymentTermsCategory.Buyer)}
            onChange={() => setSelectedKeys(selectedKeys.includes(PaymentTermsCategory.Buyer) ? [] : [PaymentTermsCategory.Buyer])}
          >
            <span >Buyer</span>
          </Checkbox>
          <div className="custom-filter-dropdown-btns">
            <Button onClick={() => clearFilters()} className="custom-reset-button">
              Reset
            </Button>
            <Button type="primary" style={{ margin: 10 }} onClick={() => confirm()} className="custom-ok-button">
              OK
            </Button>
          </div>
        </div>
      ),
    },
    
    {
      title: <div style={{textAlign:"center"}}>Payment Term </div>,
      dataIndex: 'paymentTermsName',
      //  responsive: ['lg'],
       sorter: (a, b) => a.paymentTermsName.length - b.paymentTermsName.length,
       sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('paymentTermsName')
    },
       {
      title: 'Status',
      dataIndex: 'isActive',
      align:"center",
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
      title:`Action`,
      dataIndex: 'action',
      align:"center",
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
    <Card title ="Payment Terms"
     headStyle={{ border: 0 }} extra={<Link to = "/global/payment-terms/payment-terms-form"  ><span><Button type={'primary'} >New </Button> </span></Link>} 

    >
     <br></br>
      <Row gutter={24}>
      <Col span={4}></Col>
     <Col span={5}>
         {/* <Col>
         <Card title={'Total Payment Terms: ' + paymentTermsData.length} style={{textAlign: 'left', width: 230, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
          <Card title={'Active: ' + paymentTermsData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
           </Col>
           <Col>
           <Card title={'In-Active: ' + paymentTermsData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
           </Col>
           <Col> */}
           <Alert type='success' message={'Total Payment Terms: ' + paymentTermsData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + paymentTermsData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='info' message={'Inactive: ' + paymentTermsData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        
           
           
        </Col>
          </Row> 
          <br></br>
          <Card>
          <Table
          size="small"
          columns={columnsSkelton}
          dataSource={paymentTermsData}

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
