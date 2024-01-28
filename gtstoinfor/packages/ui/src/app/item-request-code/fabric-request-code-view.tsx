import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message, Modal, Tabs, Form, Select } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined, UndoOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/lib/table';
import { FabricCodeReq, FabricRequestCodeDto } from '@project-management-system/shared-models';
import { FabricRequestCodeService, M3ItemsService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';
import M3Items from '../masters/m3-items/m3-items-form';
import TabPane from 'antd/es/tabs/TabPane';

const { Option } = Select;

const FabricRequestCodeView = ()=>{
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');
  const [form] = Form.useForm();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState<any>(undefined);
  const [reqCodeData, setReqCodeData] = useState<any>([]);
  const [buyerData, setBuyerData] = useState<any>([])
  const [fabricType, setFabricType] = useState<any>([])
  const [finishData, setFinishData] = useState<any>([])
  const [hsnCode, setHsnCode] = useState<any>([])
  const [weaveData, setWeaveData] = useState<any>([])
  const [content, setContent] = useState<any>([])

  const [selectedDeliveryMethodData, setSelectedDeliveryMethodData] = useState<any>(undefined);
  
  const requestCodeService = new FabricRequestCodeService();
  const m3ItemsService = new M3ItemsService();

  const [activeTab, setActiveTab] = useState<string>()

  const onTabChange = (key) => {
    console.log(key,'-------------------')
    setActiveTab(key);
    getAllFabrics(key)
  };

  useEffect(() => {
    getAllFabrics('Open');
    getAllBuyers()
    getAllFabricTypes()
    getAllFinish()
    getAllHSNCodes()
    getAllWeaves()
    getAllContents()
  }, []);

  const getAllFabrics= (key) => {
    const req = new FabricCodeReq(form.getFieldValue('hsnCode'),form.getFieldValue('hsnCode'),form.getFieldValue('fabricTypeId'),form.getFieldValue('weaveId'),form.getFieldValue('finishTypeId'),form.getFieldValue('contentId'),key)
    requestCodeService.getAllFabrics(req).then(res => {
      if (res.status) {
        setReqCodeData(res.data);
      } else {
        if (res.data) {
          setReqCodeData([]);
            message.error(res.internalMessage,2);
        } else {
         message.error(res.internalMessage,2);
        }
      }
    }).catch(err => {
      setReqCodeData([]);
      message.error(err.message,2);
    })
  }


  const getAllBuyers=()=>{
    requestCodeService.getAllFabricBuyers().then((res)=>{
      if(res.status){
        setBuyerData(res.data)
      }
    })
  }

  const getAllFabricTypes=()=>{
    requestCodeService.getAllFabricTypes().then((res)=>{
      if(res.status){
        setFabricType(res.data)
      }
    })
  }

  const getAllFinish=()=>{
    requestCodeService.getAllFinish().then((res)=>{
      if(res.status){
        setFinishData(res.data)
      }
    })
  }

  const getAllHSNCodes=()=>{
    requestCodeService.getAllHSNCodes().then((res)=>{
      if(res.status){
        setHsnCode(res.data)
      }
    })
  }

  const getAllWeaves=()=>{
    requestCodeService.getAllWeaves().then((res)=>{
      if(res.status){
        setWeaveData(res.data)
      }
    })
  }

  const getAllContents=()=>{
    requestCodeService.getContents().then((res)=>{
      if(res.status){
        setWeaveData(res.data)
      }
    })
  }

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


  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
      title: 'Buyer',
      dataIndex: 'buyerCode',
      sorter: (a, b) => a.buyerCode.localeCompare(b.buyerCode),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('buyerCode'),
      render: (text, record) => (
        <span>
            {record.buyerCode ? record.buyerCode : '-'}
        </span>
    ),
    },
    {
      title: 'HSN Code',
      dataIndex: 'hsnCode',
      sorter: (a, b) => a.hsnCode.localeCompare(b.hsnCode),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('hsnCode'),
      render: (text, record) => (
        <span>
            {record.hsnCode ? record.hsnCode : '-'}
        </span>
    ),
    },
    {
      title: 'M3Code',
      dataIndex: 'm3Code',
      sorter: (a, b) => a.m3Code.localeCompare(b.m3Code),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('m3Code'),
      render: (text, record) => (
        <span>
            {record.m3Code ? record.m3Code : '-'}
        </span>
    ),
    },
    {
      title: 'Fabric Type',
      dataIndex: 'fabricType',
      sorter: (a, b) => a.fabricType.localeCompare(b.fabricType),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('fabricType'),
      render: (text, record) => (
        <span>
            {record.fabricType != null ? record.fabricType : '-'}
        </span>
    ),
    },
    {
      title: 'Weave',
      dataIndex: 'fabricWeave',
      sorter: (a, b) => a.fabricWeave.localeCompare(b.fabricWeave),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('fabricWeave'),
      render: (text, record) => (
        <span>
            {record.fabricWeave ? record.fabricWeave : '-'}
        </span>
    ),
    },
    {
        title: "Weight",
        dataIndex: "weight",
        render : (text,record) => {
            return (
                <span>
                    {record.weight ? `${record.weight}-${record.weightUom}`: '-'}
                </span>
            )
        },
    },
    {
        title: "Construction",
        dataIndex: "construction",
        children:[
          {
            title:'EPI',
            dataIndex:'epi',
            render: (text, record) => (
                <span>
                    {record.epi ? record.epi : '-'}
                </span>
            ),
          },
          {
            title:'PPI',
            dataIndex:'ppi',
            render: (text, record) => (
                <span>
                    {record.ppi ? record.ppi : '-'}
                </span>
            ),
          }
        ]
    },
    {
      title: 'Yarn Type',
      dataIndex: 'yarnType',
      sorter: (a, b) => a.yarnType.localeCompare(b.yarnType),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('yarnType'),
      render: (text, record) => (
        <span>
            {record.yarnType ? record.yarnType : '-'}
        </span>
    ),
    },
    {
        title: "Width",
        dataIndex: "width",
        render : (text,record) => {
            return (
                <span>
                    {record.width ? `${record.width}-${record.widthUom}`: '-'}
                </span>
            )
        },
    },
    {
        title: 'Finish Type',
        dataIndex: 'finishType',
        sorter: (a, b) => a.finishType.localeCompare(b.finishType),
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('finishType'),
        render: (text, record) => (
            <span>
                {record.finishType ? record.finishType : '-'}
            </span>
        ),
    },
    {
        title: 'Content',
        dataIndex: 'content',
        sorter: (a, b) => a.content.localeCompare(b.content),
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('content'),
        render: (text, record) => (
            <span>
                {record.content ? record.content : '-'}
            </span>
        ),
    },
    {
        title: 'Shrinkage',
        dataIndex: 'shrinkage',
        sorter: (a, b) => a.shrinkage.localeCompare(b.shrinkage),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => (
            <span>
                {record.shrinkage ? record.shrinkage : '-'}
            </span>
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title:`Action`,
      dataIndex: 'action',
      render: (text, rowData) => {
        return (<span>
          <Tooltip placement="top" title='Create Item'>
              <Tag >
                  <EditOutlined type= "edit"
                      onClick={() => {
                          createItem(rowData)
                      }}
                      style={{ color: '#1890ff', fontSize: '14px' }} />
              </Tag>
          </Tooltip>
          </span>
        )
      }
    }
  ];

  const createItem = (rowData: any) => {
    console.log(rowData)
    setModalVisible(true)
    setData(rowData);
  }
  const modalView = (rowData:any) => {
    return  (
  //   <Modal
  //     className='rm-'
  //     // key={'modal' + Date.now()}
  //     width={'70%'}
  //     visible={modalVisible}
  //     style={{ top: 30, alignContent: 'right' }}
  //     title={<React.Fragment>
  //     </React.Fragment>}
  //     onCancel={handleCancel}
  //     footer={[]}
  // >
    <M3Items props={data}/>
  // </Modal>
  )
  
  }
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

  
  const onReset = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
   return (
    <Card title={<span >Fabric Request Code</span>}
    headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
            <Form form={form} layout={"vertical"} name="control-hooks" onFinish={getAllFabrics}>
     {/* <Row gutter={40}>
      
        <Col>
          <Card title={'Total Delivery Methods: ' + deliveryMethodData.length} style={{ textAlign: 'left', width: 220, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + deliveryMethodData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + deliveryMethodData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
          </Row> */}
          <br></br>
          {/* <Table
          size='small'
          rowKey={record => record.deliveryMethodId}
          columns={columnsSkelton}
          dataSource={reqCodeData}
          scroll={{x:'max-content'}}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          onChange={onChange}
          bordered /> */}
          <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="buyerId" label="Buyer" rules={[{ required: false, message: "Buyer is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Buyer"
                    >
                        {buyerData.map((e) => {
                            return (
                            <Option key={e.buyerId} value={e.buyerId}>
                                {e.buyerName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="hsnCode" label="HSN Code" rules={[{ required: false, message: "HSN Code is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select HSN Code"
                    >
                      {hsnCode.map((e) => {
                            return (
                            <Option key={e.hsnCode} value={e.hsnCode}>
                                {e.hsnCode}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="fabricType" label="Fabric Type" rules={[{ required: false, message: "Fabric Type is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select Fabric Type"
                    >
                      {fabricType.map((e) => {
                            return (
                            <Option key={e.fabric_type_id} value={e.fabric_type_id}>
                                {e.fabricType}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="weaveId" label="Weave" rules={[{ required: false, message: "Weave is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select Weave"
                    >
                      {weaveData.map((e) => {
                            return (
                            <Option key={e.weaveId} value={e.weaveId}>
                                {e.fabricWeaveName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="finish_id" label="Finish" rules={[{ required: false, message: "Finish is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select Finish"
                    >
                      {finishData.map((e) => {
                            return (
                            <Option key={e.finish_id} value={e.finish_id}>
                                {e.finishType}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="content_id" label="Content" rules={[{ required: false, message: "Content is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select Content"
                    >
                      {content.map((e) => {
                            return (
                            <Option key={e.content_id} value={e.content_id}>
                                {e.finishType}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }} style={{ marginTop: "18px", textAlign: "right" }}>
              <Form.Item>
                <Button 
                icon={<SearchOutlined />} 
                htmlType="submit" 
                type="primary" 
                style={{ marginLeft: 50, marginTop: 5 }}
                >
                  Submit
                </Button>
                <Button danger icon={<UndoOutlined />} onClick={onReset} style={{ marginLeft: 30 }}>
                  Reset
                </Button>
              </Form.Item>
            </Col>
            </Row>
</Form>
          <Tabs activeKey={activeTab} type="card" onChange={onTabChange} style={{ marginTop: '20px' }}>
                  <TabPane tab="Open" key="OPEN">
                      <Table
                        className="custom-table-wrapper"
                        dataSource={reqCodeData}
                        columns={columnsSkelton}
                        size="small"
                        scroll={{x:'max-content'}}
                      />
                  </TabPane>
                  <TabPane tab="Completed" key="COMPLETED">
                      <Table
                        className="custom-table-wrapper"
                        dataSource={reqCodeData}
                        columns={columnsSkelton}
                        size="small"
                        scroll={{x:'max-content'}}
                      />
                  </TabPane>
                </Tabs>
        
        <Modal
            className='rm-'
            // key={'modal' + Date.now()}
            width={'79%'}
            style={{ top: 30, alignContent: 'right' }}
            visible={modalVisible}
            title={<React.Fragment>
            </React.Fragment>}
            onCancel={handleCancel}
            footer={[]}
        >
          {modalView(data)}
        </Modal>
     </Card>
   );
}

export default FabricRequestCodeView
