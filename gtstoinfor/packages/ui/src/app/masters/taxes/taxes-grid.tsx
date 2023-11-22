

import React, { useState, useEffect, useRef } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button, Row, Col, Drawer, Tag, Alert, Checkbox, } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/lib/table';
import {RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined,CheckCircleOutlined,CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { TaxesService } from '@project-management-system/shared-services';
import { TaxesDto, TaxtypeEnum } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import TaxesForm from './taxes-form';
export interface TaxesGridProps {
  // StatesData: StatesDto[];
  //  viewState: (State: StatesDto, viewOnly: boolean) => void;
  // deleteState: (State: StatesDto) => void;
}

export const TaxesGrid = (props:  TaxesGridProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const columns = useState('');
  const [taxesData, setTaxesData] = useState<TaxesDto[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTaxesData, setSelectedTaxesData] = useState<any>(undefined);

  const service = new TaxesService;

  const getColumnSearchProps = (dataIndex: string) => ({
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

  useEffect(() => {
    getAllTaxes();
  }, []);


  const getAllTaxes= () => {
    // const user = new UserRequestDto(JSON.parse(localStorage.getItem('username')))
    // console.log(user)
  service.getAllTaxes().then(res => {
      if (res.status) {
        setTaxesData(res.data);
      } else {   
          setTaxesData([]);
            AlertMessages.getErrorMessage(res.internalMessage); 
      }
    }).catch(err => {
      setTaxesData([]);
     AlertMessages.getErrorMessage(err.message);
    })
  }
/**
   * 
   * @param TaxesData 
   */
  const deleteTax = (taxesDto:TaxesDto) => {
    taxesDto.isActive=taxesDto.isActive?false:true;
    service.ActivateOrDeactivateTax(taxesDto).then(res => { console.log(res);
      if (res.status) {
        getAllTaxes();
        AlertMessages.getSuccessMessage(res.internalMessage);
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
  };
      /**
     * 
     * @param variantData 
     */
    const updateTax = (taxesData: TaxesDto) => {
      taxesData.updatedUser= JSON.parse(localStorage.getItem('username'))
      service.updateTax(taxesData).then(res => {
        if (res.status) {
          AlertMessages.getSuccessMessage('Updated Successfully');
          getAllTaxes();
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

    

    

// Example data
    const data =[{
      taxId:'1',
      taxName:'tax',
      taxPercentage:'0',
      status:'true'
    }]
  const sampleTypeColumns:any= [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      align:"center",
      render: (text, object, index) => (page-1) * 10 +(index+1)
    
    },
    {
      title:<div style={{ textAlign: 'center' }}>Tax</div> ,
      dataIndex: 'taxName', 
      sorter: (a, b) => {
        const valueA = a.taxName || '';
        const valueB = b.taxName || '';
        return valueA.localeCompare(valueB);
        
      },
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('taxName')

      
    },
    {
      title:<div style={{ textAlign: 'center' }}>Tax Percentage(%)</div> ,

      dataIndex: 'taxPercentage', 
      sorter: (a, b) => {
        const valueA = a.taxPercentage || '';
        const valueB = b.taxPercentage || '';
        return valueA.localeCompare(valueB);
      },
      ...getColumnSearchProps('taxPercentage')

    },
    {
      title:<div style={{ textAlign: 'center' }}>Tax Category</div> ,

      dataIndex:'taxCategory',
      responsive: ['sm'],
      filters: [
        {
          text: 'GST',
          value: TaxtypeEnum.GST,
        },
        {
          text: 'TDS',
          value: TaxtypeEnum.TDS,
        },
        {
          text: 'VAT',
          value: TaxtypeEnum.VAT,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.taxCategory === value,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown" style={{ flexDirection: 'row', marginLeft: 10 }}>
          <Checkbox
            checked={selectedKeys.includes(TaxtypeEnum.GST)}
            onChange={() => setSelectedKeys(selectedKeys.includes(TaxtypeEnum.GST) ? [] : [TaxtypeEnum.GST])}
          >
            <span>GST</span>
          </Checkbox>
          <Checkbox
            checked={selectedKeys.includes(TaxtypeEnum.TDS)}
            onChange={() => setSelectedKeys(selectedKeys.includes(TaxtypeEnum.TDS) ? [] : [TaxtypeEnum.TDS])}
          >
            <span >TDS</span>
          </Checkbox>
          <Checkbox
            checked={selectedKeys.includes(TaxtypeEnum.VAT)}
            onChange={() => setSelectedKeys(selectedKeys.includes(TaxtypeEnum.VAT) ? [] : [TaxtypeEnum.VAT])}
          >
            <span >VAT</span>
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
      // sorter: (a,b) => a.taxCategory - b.taxCategory,
      // sortDirections: ['descend', 'ascend'],
      // ...getColumnSearchProps('taxCategory')
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
      title:`Action     `,
      dataIndex: 'action',
      align:"center",
      render: (text, rowData) => (
        <span>
          
            {/* <EyeOutlined   className={'viewSamplTypeIcon'} type="eye" 
              onClick={() => { props.viewState(rowData, true); }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            /> */}
         
          {/* <Divider type="vertical" /> */}
          
          <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
              onClick={() => {
                if (rowData.isActive) {
                   openFormWithData(rowData);
                } else {
                   AlertMessages.getErrorMessage('You Cannot Edit Deactivated Taxes');
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />

          
          <Divider type="vertical" />
            <Popconfirm 
            onConfirm={e => { deleteTax(rowData);  }}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate Tax ?'
                :  'Are you sure to Activate Tax ?'
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
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
     //drawer related
     const closeDrawer=()=>{
      setDrawerVisible(false);
    }

    const openFormWithData=(viewData: TaxesDto)=>{
      setDrawerVisible(true);
      setSelectedTaxesData(viewData);
    };

  return (
    <>
    <Card title={'Taxes'}
   extra={<Link to='/global/taxes/taxes-form' ><span style={{color:'white'}} >{<Button className='panel_button' type={'primary'}>New </Button>}</span></Link>} >
  
    {/* <Row gutter={40}>
     
         <Card title={'Total Taxes: ' + taxesData.length} style={{textAlign: 'left', width: 150, height: 41,backgroundColor:'#bfbfbf',marginLeft:'20px'}}></Card>
         
          <Card title={'Active: ' + taxesData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 150, height: 41,backgroundColor:'#52c41a'}}></Card>
         
          <Card title={'In-Active: ' + taxesData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 150, height: 41,backgroundColor:'#f5222d'}}></Card>
         
         </Row><br></br> */}

<Row gutter={24}>
  <Col span={4}></Col>
    <Col span={5}>
     
<Alert type='success' message={'Total Taxes: ' + taxesData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + taxesData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='info' message={'Inactive: ' + taxesData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        </Col>
</Row>
<br></br>
     <Card>
     <Table
            // rowKey={record => record.stateId}

            columns={sampleTypeColumns}
            dataSource={taxesData}
            scroll={{x:true,y:500}}
            pagination={{
             pageSize:50,
             onChange(current) {
               setPage(current);
             }
           }}
          size='small'
          onChange={onChange} 
            bordered
          />
     </Card>
       
          <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
            onClose={closeDrawer} visible={drawerVisible} closable={true}>
            <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
              <TaxesForm key={Date.now()}
                updateTax={updateTax}
                isUpdate={true}
                taxesData={selectedTaxesData}
                closeForm={closeDrawer} />
            </Card>
          </Drawer>
      </Card>
        </>
  );

};


export default TaxesGrid;

