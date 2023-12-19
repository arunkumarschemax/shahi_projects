import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Alert } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined,EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import {ContentDtos, TrimDtos } from '@project-management-system/shared-models';
import { ContentService, TrimService } from '@project-management-system/shared-services';
import { ContentForm } from './content-form';
export interface ContentGridProps{}

export const ContentGrid =(Props:ContentGridProps)=>{
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [data, setData] = useState<TrimDtos[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<any>(undefined);

    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const navigate = useNavigate()

    const service = new ContentService();

    
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
  const openFormWithData=(viewData: TrimDtos)=>{
    setDrawerVisible(true);
    setSelectedVariant(viewData);
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  useEffect(() => {getAllContent();}, [])

  const getAllContent=()=>{
    service.getAllContent().then(res=>{
        if(res.status){
            setData(res.data)
            console.log(res,'dataaaaaaaaaaaaa')
        }else{
            AlertMessages.getErrorMessage(res.internalMessage);
        }
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
        setData([]);
      })
  }
  const closeDrawer = () => {
    setDrawerVisible(false);
  }


      const updateContent=(dto: ContentDtos)=>{
        dto.updatedUser=JSON.parse(localStorage.getItem('username'))
        service.updateContent(dto).then(res=>{
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage);
                getAllContent();
                setDrawerVisible(false);
    
            }else{
                AlertMessages.getErrorMessage(res.internalMessage);
    
            }
        }).catch(err => {
            AlertMessages.getErrorMessage(err.message);
          })
      }

      const deleteContent = (DTO:ContentDtos) => {
        DTO.isActive=DTO.isActive?false:true;
        service.activateOrDeactivateContent(DTO).then(res => { console.log(res);
          if (res.status) {
            getAllContent();
            AlertMessages.getSuccessMessage(res.internalMessage); 
          } else {
        
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
            title: "Item Type",
            dataIndex: "itemType",
            width:300,
            sorter: (a, b) => a.itemType.localeCompare(b.itemType),
            sortDirections: ["ascend", "descend"],
            ...getColumnSearchProps("itemType"),
          },
          {
            title: "Content",
            dataIndex: "content",
            width:300,
            sorter: (a, b) => a.content.localeCompare(b.content),
            sortDirections: ["ascend", "descend"],
            ...getColumnSearchProps("content"),
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
                        AlertMessages.getErrorMessage('You Cannot Edit Deactivated content');
                      }
                    }}
                    style={{ color: '#1890ff', fontSize: '14px' }}
                  />      
                  
                
                <Divider type="vertical" />
                  <Popconfirm onConfirm={e =>{deleteContent(rowData);}}
                  title={
                    rowData.isActive
                      ? 'Are you sure to Deactivate this content?'
                      :  'Are you sure to Activate  this content?'
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
        <Card title={<span>Content</span>}
      headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<Link to = "/trim-master/content/content-form"  ><span><Button type={'primary'} >New </Button> </span></Link>}>

<>
      <Row gutter={24}>
      <Col span={4}></Col>
     <Col span={5}>
           <Alert type='success' message={'Total Content: ' + data.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + data.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='info' message={'Inactive: ' + data.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        
           
           
        </Col>
          </Row> 
          <br></br>
       
        <Card>
        <Table
              size='small'
                columns={columnsSkelton}
                dataSource={data}
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
                <ContentForm key={Date.now()}
                  updateItem={updateContent}
                  isUpdate={true}
                  Data={selectedVariant}
                  closeForm={closeDrawer} />
              </Card>
            </Drawer>
          </>
          </Card>
      )
}
export default ContentGrid;