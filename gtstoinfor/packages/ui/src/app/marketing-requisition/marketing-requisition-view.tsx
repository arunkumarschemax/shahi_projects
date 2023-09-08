import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { MarketingRequisitionDto } from '@project-management-system/shared-models';
import { MarketingReqService } from '@project-management-system/shared-services';
import MarketingReqForm from './marketing-requisition-form';
import { Overlay } from 'antd/es/popconfirm/PurePanel';
import './marketing-requisition.css'



export interface MarketingReqProps {}

export function MarketingReqGrid(props: MarketingReqProps) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [data1,setData] = useState<any[]>([
    {
      trimType: "Button",
      trimCode: "BTN001",
      description: "Metallic Gold Button",
      size: "1cm", // Size in centimeters
      color: "Gold",
      quantity: 100,
      remarks: "Shiny finish",
      status: "OPEN",
      isActive: "true"
    },
    {
      trimType: "Zipper",
      trimCode: "ZIP002",
      description: "Nylon Zipper",
      size: "20cm", // Size in centimeters
      color: "Black",
      quantity: 50,
      remarks: "Water-resistant",
      status: "COMPLETED",
      isActive: "false"
    },
    {
      trimType: "Thread",
      trimCode: "THR003",
      description: "Cotton Sewing Thread",
      size: "100m", // Size in meters
      color: "White",
      quantity: 200,
      remarks: "Strong and durable",
      status: "OPEN",
      isActive: "true"
    },
    {
      trimType: "Fabric",
      trimCode: "FAB004",
      description: "Cotton Blend Fabric",
      size: "2.5m", // Size in meters
      color: "Blue",
      quantity: 30,
      remarks: "Soft and breathable",
      status: "INPROGRESS",
      isActive: "true"
    },
])
  const [selectedData, setSelectedData] = useState<any>(undefined);
  
  const Service = new MarketingReqService();

  // useEffect(() => {
  //   getAll();
  // }, []);

  /**
   * 
   */
  const getAll = () => {
    Service.getAllMarketingReq().then(res => {
      if (res) {
        setData(res.data);
        console.log(res.data,'lllllllll')
      } else {
        if (res.data) {
          console.log(res.data,'kkkkkkkkk')
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
  const deleteMarketReq = (data:MarketingRequisitionDto) => {
    data.isActive = data.isActive?false:true;
    Service.activateOrDeactivate(data).then(res => {
      if (res.status) {
        message.success('Success',2); 
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
    const update = (data: MarketingRequisitionDto) => {
      data.updatedUser = JSON.parse(localStorage.getItem('username'))
      Service.updateMarketingReq(data).then(res => {
        if (res.status) {
          message.success('Updated Successfully',2);
          getAll();
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
    const openFormWithData=(viewData: MarketingRequisitionDto)=>{
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
      title: 'Trim Type',
      dataIndex: 'trimType',
      // responsive: ['lg'],
      sorter: (a, b) => a.trimType.localeCompare(b.trimType),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('trimType')
    },
    {
      title: 'Trim Code',
      dataIndex: 'trimCode',
      // responsive: ['lg'],
      sorter: (a, b) => a.trimCode.localeCompare(b.trimCode),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('trimCode')
    },
    {
      title: 'Description',
      dataIndex: 'description',
      // responsive: ['lg'],
    //   sorter: (a, b) => a.description.localeCompare(b.description),
    //   sortDirections: ['descend', 'ascend'],
    //   ...getColumnSearchProps('description')
    },
    {
      title: 'Size',
      dataIndex: 'size',
      // responsive: ['lg'],
      sorter: (a, b) => a.size.localeCompare(b.size),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('size')
    },
    {
      title: 'Color',
      dataIndex: 'color',
      // responsive: ['lg'],
      sorter: (a, b) => a.color.localeCompare(b.color),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('color')
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      // responsive: ['lg'],
      sorter: (a, b) => a.quantity.localeCompare(b.quantity),
      sortDirections: ['descend', 'ascend'],
    //   ...getColumnSearchProps('quantity')
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      // responsive: ['lg'],
    //   sorter: (a, b) => a.quantity.localeCompare(b.quantity),
    //   sortDirections: ['descend', 'ascend'],
    //   ...getColumnSearchProps('quantity')
    },
    {
        title: 'Status',
        dataIndex: 'status',
        filters: [
            {
              text: 'Open',
              value: "OPEN",
            },
            {
              text: 'In Progress',
              value: "INPROGRESS",
            },
            {
              text: 'Completed',
              value: "COMPLETED",
            },
          ],
      },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: (isActive, rowData) => (
        <>
          {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
        </>
      ),
      filterMultiple: false,
      onFilter: (value, record) => 
      {
        // === is not work
        return record.isActive === value;
      },
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
                  message.error('You Cannot Edit Deactivated',2);
                }
              }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
          
          <Divider type="vertical" />
            <Popconfirm onConfirm={e =>{deleteMarketReq(rowData);}}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate ?'
                :  'Are you sure to Activate ?'
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
    <Card className='card-header' title={<span >Marketing Requisition</span>}
    style={{textAlign:'center'}}
    extra={<Link to='/marketing-requisition-form' >
      <span style={{color:'white'}} ><Button type={'primary'} >New </Button> </span>
      </Link>} >
     <br></br>
     <Row gutter={40} >
      <Col>
          <Card title={'Total : ' + data1.length} style={{textAlign: 'left', width: 210, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Open: ' + data1.filter(el => el.status === 'OPEN').length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'cyan'}}></Card>
          </Col>
          <Col>
           <Card title={'Inprogress :' + data1.filter(el => el.status == 'INPROGRESS').length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'yellow'}}></Card>
          </Col>
          <Col>
           <Card title={'Completed :' + data1.filter(el => el.status == 'COMPLETED').length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          </Row>
          <br></br>
          <Table
          size='small'
          rowKey={record => record.marketingReqId}
          columns={columnsSkelton}
          dataSource={data1}
          scroll={{x:'max-content'}}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          onChange={onChange}
          bordered />
        <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
            onClose={closeDrawer} visible={drawerVisible} closable={true}>
              <MarketingReqForm key={Date.now()}
                update={update}
                isUpdate={true}
                data={selectedData}
                closeForm={closeDrawer} />
          </Drawer>
     </Card>
  );
}

export default MarketingReqGrid;
