import React, { useEffect, useRef, useState } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Alert, Space, message, Checkbox } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps, ColumnType } from 'antd/lib/table';
import { TimeoutError } from 'rxjs';
import { OperationsService } from '@project-management-system/shared-services';
import { OperationsDTO } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import OperationsForm from './operations-form';
import { Link, useNavigate } from 'react-router-dom';
/* eslint-disable-next-line */
export interface OperationsGridProps { }

export function OperationsGrid(
  props: OperationsGridProps
) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [operationsData, setOperationsData] = useState<OperationsDTO[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<OperationsDTO>();

  const operationsService = new OperationsService();

  useEffect(() => {
    getAllOperationsData();
  }, []);
  const navigate = useNavigate()
  /**
   * 
   */
  const getAllOperationsData = () => {

    operationsService.getAllOperations().then(res => {
      if (res.status) {
        setOperationsData(res.data);
      } else {
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    }).catch(err => {
      // setOperationsData([]);
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const updateOperation = (operationData: OperationsDTO) => {
    operationsService.updateOperations(operationData).then(res => {
      console.log(res);
      if (res.status) {
        getAllOperationsData();
        setDrawerVisible(false);
        AlertMessages.getSuccessMessage('Updated Successfully');
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);

      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const deleteOperation = (operationData: OperationsDTO) => {
    operationData.isActive = operationData.isActive ? false : true;
    operationsService.ActivateDeActivateOperation(operationData).then(res => {

      if (res.status) {
        getAllOperationsData();
        message.success(res.internalMessage, 2);
      } else {
        message.error(res.internalMessage, 2);

      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  /**
   * used for column filter
   * @param dataIndex column data index
   */
  const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters)
              setSearchedColumn(dataIndex)
              confirm({ closeDropdown: true })
            }
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) : false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
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
  const closeDrawer = () => {
    setDrawerVisible(false);
  }

  //TO open the form for updation
  const openFormWithData = (viewData: OperationsDTO) => {
    setDrawerVisible(true);
    setSelectedOperation(viewData);
    console.log(selectedOperation)
    console.log('selectedOperation')
  }

  const columnsSkelton: ColumnProps<any>[] = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
      title: <div style={{textAlign:'center'}}>Group Name</div>,
      dataIndex: "operationGroupName",
      sorter: (a, b) => a.operationCode.localeCompare(b.operationCode),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("operationCode"),
    },
    {
      title: <div style={{textAlign:'center'}}>Operation Name</div>,
      dataIndex: "operationName",
      sorter: (a, b) => a.operationName.localeCompare(b.operationName),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("operationName"),
    },
    {
      title: <div style={{textAlign:'center'}}>Operation Code</div>,
      dataIndex: "operationCode",
      sorter: (a, b) => a.operationCode.localeCompare(b.operationCode),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("operationCode"),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      // ...getColumnSearchProps('isActive'),
      // sorter: (a, b) => a.operationCode.localeCompare(b.operationCode),
      sortDirections: ["ascend", "descend"],
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}

        </>
      ),
      // filters: [
      //   {
      //     text: 'Active',
      //     value: true,
      //   },
      //   {
      //     text: 'InActive',
      //     value: false,
      //   },
      // ],
      filterMultiple: false,
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
      title: `Action`,
      dataIndex: 'action',
      render: (text, rowData) => (
        <span>
          <EditOutlined className={'editSamplTypeIcon'} type="edit"
            onClick={() => {
              if (rowData.isActive) {
                openFormWithData(rowData);
              } else {
                AlertMessages.getErrorMessage('You Cannot Edit Deactivated Operation');
              }
            }}
            style={{ color: '#1890ff', fontSize: '14px' }}
          />

          <Divider type="vertical" />
          <Popconfirm onConfirm={e => { deleteOperation(rowData); }}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate Operation ?'
                : 'Are you sure to Activate Operation ?'
            }
          >
            <Switch size="default"
              className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
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
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <Card title='Operations'
    // extra={<span><Button onClick={() => navigate('/masters/operations/operation-form')} type={'primary'}>New</Button></span>}
    >

      <br></br>
      <Row gutter={24} >
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }}>
        <Alert type='success' message={'Total Operations: ' + operationsData.length} style={{fontSize:'15px'}} />
          {/* <Card title={'Total Operations: ' + operationsData.length} style={{ textAlign: 'left', height: 41, backgroundColor: '#bfbfbf' }}></Card> */}
        </Col>

        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }}>
        <span><Button onClick={() => navigate('/masters/operations/operation-form')}
              type={'primary'}>New</Button></span>
        </Col> */}
          <Col>
          <Alert type='warning' message={'Active: ' + operationsData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
           {/* <Card title={'Active: ' + operationsData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card> */}
          </Col>
          <Col>
          <Alert type='info' message={'In-Active: ' + operationsData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
           {/* <Card title={'In-Active :' + operationsData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card> */}
          </Col>
          </Row>
          <br></br>
          <Table

        rowKey={record => record.operationId}
        columns={columnsSkelton}
        dataSource={operationsData}
        pagination={{
          onChange(current) {
            setPage(current);
          }
        }}
        scroll={{ x: true }}
        onChange={onChange}
        bordered />
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <OperationsForm key={Date.now()}
            operationData={selectedOperation}
            updateOperation={updateOperation}
            isUpdate={true}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
    </Card>
  );
}

export default OperationsGrid;
