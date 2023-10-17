 

import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { AlertMessages, FabricContentActivateDeactivateDto, FabricContentdto, FactoryActivateDeactivateDto, FactoryDto, FobActivateDeactivateDto, Fobdto } from '@project-management-system/shared-models';
import { FabricContentService, FactoryService, FobService } from '@project-management-system/shared-services';
import { Button, Card, Col, Divider, Drawer, Input, message, Popconfirm, Row, Switch, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import FabricContentForm from './fabric-content-form';

const FabricContentGrid = () => {
    const navigate = useNavigate();
  const service = new FabricContentService();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [fabric, setFabric] = useState<any>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [factoryData, setFactoryData] = useState<any>(undefined);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    getFabricData()
  }, []);

  const getFabricData = () => {
    service.getFabricContent().then((res) => {
      // console.log(res, "res")
      if (res.status) {
        setFabric(res.data);
      } else {

        setFabric([])
      }
    })
      .catch((error) => {
        console.log(error.response)
      })
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  }

  const openFormwithData = (ViewData: FactoryDto) => {
    setDrawerVisible(true);
    setFactoryData(ViewData);
  }

  const updateFob = (Data: FabricContentdto) => {
    service.updateFabricContent(Data).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Succesfully');
        getFabricData()
        setDrawerVisible(false);
      }
      else {
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message)
    })
  }

  const activateOrDeactivate = (values: FabricContentActivateDeactivateDto) => {
    values.isActive = values.isActive ? false : true
    const req = new FabricContentActivateDeactivateDto(values.id, values.isActive, values.versionFlag,)
    service.activateOrDeactivate(req).then(res => {
      if (res.status) {
        message.success(res.internalMessage)
        getFabricData();
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
  const Columns: any = [
    {
      title: "S.No",
      key: "sno",
      responsive: ["sm"],
      width:50,align:'center',
      render: (text, object, index) => (page - 1) * pageSize + (index + 1),
    },
    {
      title: 'Style',
      dataIndex: 'style',
      width: 100,
      align: 'center'

    },
    {
      title: 'Component ',
      dataIndex: 'component',
      align: 'center'

    },
    {
      title: 'Fabric Content',
      dataIndex: 'fabricContent',
      align: 'center'

    },
    {
      title: "Status",
      dataIndex: "isActive", width: 80,
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
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
      onFilter: (value, record) => {
        return record.isActive === value;
      }
    },
    {
      title: "Actions", width: 80,
      render: (text, rowData, index: number) => {
        return <>
          <Tooltip title="Edit">
            <EditOutlined style={{ color: 'blue' }} onClick={() => { openFormwithData(rowData) }} type="edit" />
          </Tooltip>
          <span></span>
          <Divider type="vertical" />
          <Popconfirm onConfirm={e => { activateOrDeactivate(rowData) }}
            title={
              rowData.isActive
                ? 'Deactivated Fabric Content?'
                : 'Activated Fabric Content ?'
            }
          >
            <Switch size="default"
              className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
              checkedChildren={<RightSquareOutlined type="check" />}
              unCheckedChildren={<RightSquareOutlined type="close" />}
              checked={rowData.isActive}
            />
          </Popconfirm>
        </>
      }
    },
  ]

  return (
    <>
      <div>
        <Card
          extra={<span><Button onClick={() => navigate('/masters/fabric-content-form/', { state: { name: 'new' } })} style={{height:32}} type={'primary'}>New</Button></span>}
          headStyle={{ height: '53px' }}
          title={<><span>Fabric Content</span><span>
            {/* <Button onClick={() => navigate('/masters/fabric-content-form', { state: { name: 'excel'} })} style={{ float: 'right',height:33, marginRight: '2px' }}  type='primary'>CSV Upload</Button> */}
            </span></>}>
          <Table columns={Columns}
            dataSource={fabric}
            className="custom-table-wrapper"
            bordered
            pagination={{
              pageSize: 50,
              onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize);
              },
            }}
            // pagination={false}
            scroll={{ x: 1000, y: 450 }}
          />
        </Card>
        <Drawer bodyStyle={{ paddingBottom: 80 }}  width={window.innerWidth > 768 ? '75%' : '85%'}
          onClose={closeDrawer} visible={drawerVisible} closable={true}>
          <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small' >
            <FabricContentForm
              updateItem={updateFob} Data={factoryData} isUpdate={true} closeForm={closeDrawer} />
               <div style={{ display: 'flex', justifyContent: 'right' }}>
              <Button onClick={closeDrawer} style={{color:'red',marginTop:10}}>Cancel</Button></div>
          </Card>
        </Drawer>
      </div>
    </>
  )
}

export default FabricContentGrid

