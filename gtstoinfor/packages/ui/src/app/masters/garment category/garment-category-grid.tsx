import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, Checkbox, Alert } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import { GarmentCategoryService } from '@project-management-system/shared-services';
import { GarmentCategoryDto } from '@project-management-system/shared-models';
import Highlighter from 'react-highlight-words';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import { GarmentCategoryForm } from './garment-category-form';


export interface GarmentCategoryProps{}

export function GarmentCategoryGrid(
    Props:GarmentCategoryProps
)
{
    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
const service = new GarmentCategoryService();

const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
const [variantData, setVariantData] = useState<GarmentCategoryDto[]>([]);
const navigate = useNavigate()

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
  const openFormWithData=(viewData: GarmentCategoryDto)=>{
    setDrawerVisible(true);
    setSelectedVariant(viewData);
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  
  useEffect(() => {
    getAllGarmentCategory()
  }, [])

  const getAllGarmentCategory=()=>{
    service.getAllGarmentCategories().then(res=>{
      // console.log(res,'11000000000000')
        if(res.status){
          setVariantData(res.data)
        }else{
            AlertMessages.getErrorMessage(res.internalMessage);

        } 
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
        setSelectedVariant([]);
      })
  }
  const closeDrawer = () => {
    setDrawerVisible(false);
  }

  const saveVariant =(variantData:GarmentCategoryDto)=>{
    variantData.garmentCategoryId=0;
    service.createGarmentCategories(variantData).then(res=>{
        if(res.status){
            AlertMessages.getSuccessMessage('GarmentCategory Created Successfully');

        }
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
      })
  }
const deleteGarmentCategory=(garment:GarmentCategoryDto)=>{
    garment.isActive=garment.isActive?false:true;
    service.activateDeActivateGarmentCategory(garment).then(res=>{console.log(res)
    if(res.status){
        AlertMessages.getSuccessMessage('Success'); 

}else{
    AlertMessages.getErrorMessage(res.internalMessage);
}
}).catch(err => {
    AlertMessages.getErrorMessage(err.message);
  })
}
const updateGarmentCategory =(garment:GarmentCategoryDto)=>{
    garment.updatedUser=JSON.parse(localStorage.getItem('username'))
    service.updateGarmentCaregories(garment).then(res=>{
        if(res.status){
          getAllGarmentCategory()
          setDrawerVisible(false)
            AlertMessages.getSuccessMessage('Updated Successfully'); 

        }else{
            AlertMessages.getErrorMessage(res.internalMessage);

        }
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
      })
}

const onAddOperation = (rowData) => {
  navigate('/masters/garments/garments-form',{state:{id:rowData.garmentCategoryId}})
}

const columnsSkelton:any=[

    {
        title: 'S No',
        key: 'sno',
        width: '70px',
        responsive: ['sm'],
        render: (text, object, index) => (page - 1) * 10 + (index + 1)
      },

      {
        title: <div style={{textAlign:"center"}}>Garment Category</div> ,
        dataIndex: 'garmentCategory',
        sorter: (a, b) => a.garmentCategory.localeCompare(b.garmentCategory),
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('garmentCategory')
      },
    
    {
      title: <div style={{textAlign:"center"}}>Remarks</div> ,
      dataIndex: 'remarks',
      responsive: ['sm'],
      sorter: (a, b) => String(a.remarks).localeCompare(String(b.remarks)),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('remarks')
    },
    {
      title: <div style={{textAlign:"center"}}>Status</div> ,
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
        title: <div style={{textAlign:"center"}}>Action</div> ,
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
              <Popconfirm onConfirm={e =>{deleteGarmentCategory(rowData);}}
              title={
                rowData.isActive
                  ? 'Are you sure to Deactivate Garment Category ?'
                  :  'Are you sure to Activate  Garment Category  ?'
              }
            >
              <Switch  size="default"
                  className={ rowData.isActive ? 'toggle-activated' : 'toggle-deactivated' }
                  checkedChildren={<RightSquareOutlined type="check" />}
                  unCheckedChildren={<RightSquareOutlined type="close" />}
                  checked={rowData.isActive}
                />
              
            </Popconfirm>
            <Divider type='vertical'/>
            <Tooltip title={'Add Operation'}>
              <Button onClick={() => onAddOperation(rowData)}>Add</Button>
            </Tooltip>
          </span>
        )
      }

]
return(
  <Card title={<span>Garment Category</span>}
        extra={<Link to = "/masters/garmentcategory/garmentcategory-form"  ><span><Button type={'primary'} >New </Button> </span></Link>} >
        <br></br>

    <>
    <Row gutter={24}>
  <Col span={4}></Col>
    <Col span={5}>
     
<Alert type='success' message={'Total Garment Categories: ' + variantData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          {/* <Card title={'Active: ' + variantData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card> */}
          <Alert type='warning' message={'Active: ' + variantData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          {/* <Card title={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card> */}
          <Alert type='info' message={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        </Col>
</Row>
<br></br>

    <Card>
    <Table
        size='small'

          // rowKey={record => record.variantId}
          columns={columnsSkelton}
          dataSource={variantData}
          pagination={{
            pageSize:50,
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
          <GarmentCategoryForm key={Date.now()}
            updateItem={updateGarmentCategory}
            isUpdate={true}
            // saveItem={saveVariant}
            GarmentCategoryData={selectedVariant}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
    </>
    </Card>
)
}