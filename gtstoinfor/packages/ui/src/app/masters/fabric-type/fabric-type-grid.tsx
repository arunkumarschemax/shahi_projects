import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Alert } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { FabricTypesDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { FabricTypeService } from '@project-management-system/shared-services';
import {FabricTypeForm} from './fabric-type-form'

export interface FabricTypeGridProps{ }

export const FabricTypeGrid =(Props:FabricTypeGridProps)=>{
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [variantData, setVariantData] = useState<FabricTypesDto[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
    const [selectedPaymentmethodData, setSelectedPaymentmethodData] = useState<any>(undefined);

    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const columns = useState('');
    const navigate = useNavigate()

const service = new FabricTypeService();


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
  const openFormWithData=(viewData: FabricTypesDto)=>{
    setDrawerVisible(true);
    setSelectedVariant(viewData);
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  useEffect(() => {getAllFabricType();}, [])

const getAllFabricType=()=>{
    service.getAllFabricType().then(res=>{
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

  const saveVariant=(variantData:FabricTypesDto)=>{
variantData.fabricTypeId=0;
service.createFabricType(variantData).then(res=>{
    if(res.status){
        AlertMessages.getSuccessMessage('Fabric Type Created Successfully');

    }
}).catch(err => {
    AlertMessages.getErrorMessage(err.message);
  })
  }

  const updateFabricType=(fabricType: FabricTypesDto)=>{
    fabricType.updatedUser=JSON.parse(localStorage.getItem('username'))
    service.updateFabricType(fabricType).then(res=>{
        if(res.status){
            AlertMessages.getSuccessMessage('Updated Successfully');
            setDrawerVisible(false);

        }else{
            AlertMessages.getErrorMessage(res.internalMessage);

        }
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
      })
  }
  const deleteFabricType = (fabricTypeData:FabricTypesDto) => {
    fabricTypeData.isActive=fabricTypeData.isActive?false:true;
    service.activateOrDeactivateFabricType(fabricTypeData).then(res => { console.log(res);
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
            render: (text, object, index) => (page - 1) * 50 + (index + 1)
          },

          {
            title: 'Fabric Type',
            dataIndex: 'fabricTypeName',
            sorter: (a, b) => a.fabricTypeName.localeCompare(b.fabricTypeName),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('fabricTypeName')
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
            onFilter: (value, record) => 
            {
              // === is not work
              return record.isActive === value;
            },
            
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
              <Popconfirm onConfirm={e =>{deleteFabricType(rowData);}}
              title={
                rowData.isActive
                  ? 'Are you sure to Deactivate Fabric Type ?'
                  :  'Are you sure to Activate Fabric Type ?'
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
  <Card title={<span>Fabric Types</span>}
 headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<Link to = "/masters/fabrictype/fabric-type-form"  ><span><Button type={'primary'} >New </Button> </span></Link>} >
 
    <>
    {/* <Row gutter={40}>
    <Col>
          <Card title={'Total Fabric Types: ' + variantData.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + variantData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
        {/* <Col>
        <span><Button onClick={() => navigate('/masters/fabrictype/fabrictype-form')}
              type={'primary'}>New</Button></span>
        </Col> */}
    {/* </Row> */} 
    <Row gutter={24}>
      <Col span={4}></Col>
     <Col span={5}>

           <Alert type='success' message={'Total Fabric Types: ' + variantData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + variantData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
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
          <FabricTypeForm key={Date.now()}
            updateItem={updateFabricType}
            isUpdate={true}
            // saveItem={saveVariant}
            fabricTypeData={selectedVariant}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
    </>
    </Card>
)
}
export default FabricTypeGrid