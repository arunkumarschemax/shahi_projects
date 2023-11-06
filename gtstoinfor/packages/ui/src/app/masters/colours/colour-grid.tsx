import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import AlertMessages from '../../common/common-functions/alert-messages';
import { ColourDto } from '@project-management-system/shared-models';
import { ColourService } from '@project-management-system/shared-services';
import { ColourForm } from './colour-form';
export interface ColourGridProps{}

export const ColourGrid =(Props:ColourGridProps)=>{
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [variantData, setVariantData] = useState<ColourDto[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
    const [selectedColourData, setSelecteColourmethodData] = useState<any>(undefined);

    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const columns = useState('');
    const navigate = useNavigate()

    const service =new ColourService();

    
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
  const openFormWithData=(viewData: ColourDto)=>{
    setDrawerVisible(true);
    setSelectedVariant(viewData);
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  useEffect(() => {getAllColour();}, [])

  const getAllColour=()=>{
    service.getAllColour().then(res=>{
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

  const saveVariant=(variantData:ColourDto)=>{
    variantData.colourId=0;
    service.createColour(variantData).then(res=>{
        if(res.status){
            AlertMessages.getSuccessMessage('Colour Created Successfully');
    
        }
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
      })
      }  

      const updateColour=(colour: ColourDto)=>{
        colour.updatedUser=JSON.parse(localStorage.getItem('username'))
        service.updateColour(colour).then(res=>{
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

      const deleteColour = (profitControlHead:ColourDto) => {
        profitControlHead.isActive=profitControlHead.isActive?false:true;
        service.activeteOrDeactivateColour(profitControlHead).then(res => { console.log(res);
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
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1) 
        },
        {
          title: 'Division',
          dataIndex: 'divisionName',
          sorter: (a, b) => {
            const valueA = a.divisionName || '';
            const valueB = b.divisionName || '';
            return valueA.localeCompare(valueB);
          },
          sortDirections: ['descend', 'ascend'],
          ...getColumnSearchProps('divisionName')
        },
       
        
        {
          title: 'Option Group',
          dataIndex: 'optionGroup',
          sorter: (a, b) => {
            const valueA = a.optionGroup || '';
            const valueB = b.optionGroup || '';
            return valueA.localeCompare(valueB);
          },
          sortDirections: ['descend', 'ascend'],
          ...getColumnSearchProps('optionGroup')
        },
        
        {
          title:'Colour Code',
          dataIndex: 'colourCode',
          ...getColumnSearchProps('optionGroup')
        },
        {
            title: 'Colour',
            dataIndex: 'colour',
            sorter: (a, b) => {
              const valueA = a.colour || '';
              const valueB = b.colour || '';
              return valueA.localeCompare(valueB);
            },
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('colour')
        },
        {
          title: 'Description',
          dataIndex: 'description',
          // ...getColumnSearchProps('description')
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
                        AlertMessages.getErrorMessage('You Cannot Edit Deactivated Payment mode');
                      }
                    }}
                    style={{ color: '#1890ff', fontSize: '14px' }}
                  />      
                  
                
                <Divider type="vertical" />
                  <Popconfirm onConfirm={e =>{deleteColour(rowData);}}
                  title={
                    rowData.isActive
                      ? 'Are you sure to Deactivate colour ?'
                      :  'Are you sure to Activate colour ?'
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
        <Card title='Colours' extra={<span><Button onClick={()=>navigate('/masters/colour/colour-form')} type={'primary'}>New</Button></span>}>
<br/>
<>
<Row gutter={40}>
    <Col>
<Card title={'Total Colours: ' + variantData.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + variantData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
</Row>
       
        <Card>
        <Table
              size='small'
              rowClassName={(record,index)=>index % 2 === 0? 'table-row-light':'table-row-dark'}

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
                <ColourForm key={Date.now()}
                  updateItem={updateColour}
                  isUpdate={true}
                  // saveItem={saveVariant}
                  colourData={selectedVariant}
                  closeForm={closeDrawer} />
              </Card>
            </Drawer>
          </>
          </Card>
      )
}
export default ColourGrid;