import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Checkbox, Alert } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import AlertMessages from '../../common/common-functions/alert-messages';
import { ProfitControlHeadDto } from '@project-management-system/shared-models';
import { ProfitControlHeadService } from '@project-management-system/shared-services';
import { ProfitControlHeadForm } from './profit-control-head-form';

export interface ProfitControlHeadGridProps{}

export const ProfitControlHeadGrid =(Props:ProfitControlHeadGridProps)=>{
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [variantData, setVariantData] = useState<ProfitControlHeadDto[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
    const [selectedPaymentmethodData, setSelectedPaymentmethodData] = useState<any>(undefined);

    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const columns = useState('');
    const navigate = useNavigate()

    const service =new ProfitControlHeadService();

    
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
  const openFormWithData=(viewData: ProfitControlHeadDto)=>{
    setDrawerVisible(true);
    setSelectedVariant(viewData);
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  useEffect(() => {getAllProfitControlHead();}, [])

  const getAllProfitControlHead=()=>{
    service.getAllProfitControlHead().then(res=>{
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

  const saveVariant=(variantData:ProfitControlHeadDto)=>{
    variantData.profitControlHeadId=0;
    service.createProfitControlHead(variantData).then(res=>{
        if(res.status){
            AlertMessages.getSuccessMessage('Profit Control Head Created Successfully');
    
        }
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
      })
      }  

      const updateProfitControlHead=(profitControlHead: ProfitControlHeadDto)=>{
        profitControlHead.updatedUser=JSON.parse(localStorage.getItem('username'))
        service.updateProfitContralHead(profitControlHead).then(res=>{
            if(res.status){
                AlertMessages.getSuccessMessage('Updated Successfully');
                setDrawerVisible(false);
                getAllProfitControlHead();
            }else{
                AlertMessages.getErrorMessage(res.internalMessage);
    
            }
        }).catch(err => {
            AlertMessages.getErrorMessage(err.message);
          })
      }

      const deleteProfitControlHead = (profitControlHead:ProfitControlHeadDto) => {
        profitControlHead.isActive=profitControlHead.isActive?false:true;
        service.activeteOrDeactivateProfitControlHead(profitControlHead).then(res => { console.log(res);
          if (res.status) {
            // getAllPaymentmethod();
            AlertMessages.getSuccessMessage('Success'); 
          } else {
            // if (res.intlCode) {
            //   AlertMessages.getErrorMessage(res.internalMessage);
            // } else {
              AlertMessages.getErrorMessage(res.internalMessage);
            }
          
        }).catch(err => {
          AlertMessages.getErrorMessage(err.message);
        })
      }

      const columnsSkelton: any =[
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
           align:"center",
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1) 
        },
        {
          title:<div style={{ textAlign: 'center' }}>Profit Control Head</div> ,
          dataIndex: 'profitControlHead',
            sorter: (a, b) => a.profitControlHead.localeCompare(b.profitControlHead),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('profitControlHead')
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
             align:"center",
 
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
                  <Popconfirm onConfirm={e =>{deleteProfitControlHead(rowData);}}
                  title={
                    rowData.isActive
                      ? 'Are you sure to Deactivate Paymentmethod ?'
                      :  'Are you sure to Activate Paymentmethod ?'
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
        <Card title="Profit Control Head" extra={<span><Button onClick={()=>navigate('/masters/profit-control-head/profit-control-head-form')} type={'primary'}>New</Button></span>}>
<br></br>
<>
<Row gutter={24}>
  <Col span={4}></Col>
    <Col span={5}>
     
<Alert type='success' message={'Total PCH: ' + variantData.length} style={{fontSize:'15px'}} />
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
                <ProfitControlHeadForm key={Date.now()}
                  updateItem={updateProfitControlHead}
                  isUpdate={true}
                  // saveItem={saveVariant}
                  profitCenterData={selectedVariant}
                  closeForm={closeDrawer} />
              </Card>
            </Drawer>
          </>
          </Card>
      )
}
export default ProfitControlHeadGrid;