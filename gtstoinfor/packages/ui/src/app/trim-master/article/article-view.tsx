import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message, Alert, Checkbox } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { ArticleDto } from '@project-management-system/shared-models';
import { ArticleService } from '@project-management-system/shared-services';
import ArticleForm from './article-form';


export interface ArticleProps {}

export function ArticleGrid(props: ArticleProps) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [data, setData] = useState<ArticleDto[]>([]);
  const [selectedData, setSelectedData] = useState<any>(undefined);
  
  const Service=new ArticleService();

  useEffect(() => {
    getAllArticles();
  }, []);

  /**
   * 
   */
  const getAllArticles= () => {
    Service.getAllArticles().then(res => {
      if (res.status) {
        setData(res.data);
      } else {
        if (res.data) {
          setData([]);
            message.error(res.internalMessage,2);
        } else {
         message.error(res.internalMessage,2);
        }
      }
    }).catch(err => {
      setData([]);
      message.error(err.message,2);
    })
  }
  /**
   * 
   * @param deliveryMethodData 
   */
  const saveData = (data:ArticleDto) => {
    data.isActive = data.isActive?false:true;
    Service.activateOrDeactivateArticle(data).then(res => {
      if (res.status) {
        message.success(res.internalMessage,2); 
      } else {
          message.error(res.internalMessage,2);
      }
    }).catch(err => {
      message.error(err.message,2);
    })
  }
   
    /**
     * 
     * @param deliveryMethodData 
     */
    const updateData = (data: ArticleDto) => {
      data.updatedUser = JSON.parse(localStorage.getItem('username'))
      Service.updateArticles(data).then(res => {
        if (res.status) {
          message.success(res.internalMessage,2);
          getAllArticles();
          setDrawerVisible(false);
        } else {
            message.error(res.internalMessage,2);
        }
      }).catch(err => {
        message.error(err.message,2);
      })
    }
   /**
   * used for column filter
   * @param dataIndex column data index
   */
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

  /**
   * 
   * @param selectedKeys 
   * @param confirm 
   * @param dataIndex 
   */
  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };

    //drawer related
    const closeDrawer=()=>{
      setDrawerVisible(false);
    }
  
    //TO open the form for updation
    const openFormWithData=(viewData: ArticleDto)=>{
      setDrawerVisible(true);
      setSelectedData(viewData);
    }


  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
      title: 'Article',
      dataIndex: 'articleName',
      // responsive: ['lg'],
      sorter: (a, b) => a.articleName.localeCompare(b.articleName),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('articleName')
    },
    {
      title: 'Text',
      dataIndex: 'text',
      // responsive: ['lg'],
      sorter: (a, b) => a.text.localeCompare(b.text),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('text')
    },
    {
      title: 'Supplier',
      dataIndex: ['VendorInfo','vendorName'],
      // responsive: ['lg'],
      sorter: (a, b) => a.VendorInfo?.vendorName?.localeCompare(b.VendorInfo?.vendorName),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('vendorName')
    },
    {
      title: 'Length',
      dataIndex: ['lengthInfo','length'],
      // responsive: ['lg'],
      sorter: (a, b) => a.lengthInfo?.length?.localeCompare(b.lengthInfo?.length),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('length')
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
       ),
      
    },
    {
      title:`Action`,
      dataIndex: 'action',
      render: (text, rowData) => (
        <span>         
            <EditOutlined  className={'editSampleTypeIcon'}  type="edit" 
              onClick={() => {
                if (rowData.isActive) {
                  openFormWithData(rowData);
                } else {
                  message.error('You Cannot Edit Deactivated Article',2);
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
          
          <Divider type="vertical" />
            <Popconfirm onConfirm={e =>{saveData(rowData);}}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate Article ?'
                :  'Are you sure to Activate Article ?'
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

  /**
   * 
   * @param pagination 
   * @param filters 
   * @param sorter 
   * @param extra 
   */
  const onChange=(pagination, filters, sorter, extra)=> {
    console.log('params', pagination, filters, sorter, extra);
  }
  return (
    <Card title={<span >Article</span>}
    style={{textAlign:'left'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
    extra={<Link to='/trim-master/article/article-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New </Button> </span>
      </Link>} >
        <br></br>
        <Row gutter={24}>
          <Col span={4}></Col>
          <Col span={5}>
            <Alert type='success' message={'Total Articles: ' + data.length} style={{fontSize:'15px'}} />
          </Col>
          <Col span={5}>
            <Alert type='warning' message={'Active: ' + data.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
          </Col>
          <Col span={5}>
            <Alert type='info' message={'Inactive: ' + data.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
          </Col>
        </Row> 
        <br></br>
          <Table
          size='small'
          rowKey={record => record.articleId}
          columns={columnsSkelton}
          dataSource={data}
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
              <ArticleForm key={Date.now()}
                updateData={updateData}
                isUpdate={true}
                data={selectedData}
                closeForm={closeDrawer} />
          </Drawer>
     </Card>
  );
}

export default ArticleGrid;
