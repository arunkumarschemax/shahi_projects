import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { AlertMessages, FactoryActivateDeactivateDto, FactoryDto } from '@project-management-system/shared-models';
import { FactoryService } from '@project-management-system/shared-services';
import { Button, Card, Col, Divider, Drawer, Input, message, Popconfirm, Row, Switch, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import FactoriesForm from './factories-form';

const FactoriesView = () => {
  const navigate = useNavigate();
  const service = new FactoryService();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [factories, setFactories] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [factoryData, setFactoryData] = useState<any>(undefined);


  useEffect(() => {
    getFactoryData()
  }, []);

  const getFactoryData = () => {
    service.getFactories().then((res) => {
      if (res.status) {
        setFactories(res.data);
      } else {

        setFactories([])
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
    console.log(ViewData, "viewData")
  }
  const updateFactories = (Data: FactoryDto) => {

    // const req = new FactoryDto (data.id,Data.name,Data.address) 
    console.log(Data, 'vidya')
    service.updateFactories(Data).then(res => {
      console.log(res, "ressssssssssss");
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Succesfully');
        getFactoryData()
        setDrawerVisible(false);

      }
      else {
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message)
    })
  }

  console.log(factoryData, 'mmmmmmmmmmmm')
  const activateOrDeactivate = (values: FactoryActivateDeactivateDto) => {
    values.isActive = values.isActive ? false : true
    const req = new FactoryActivateDeactivateDto(values.id, values.isActive, values.versionFlag,)
    service.activateOrDeactivate(req).then(res => {
      if (res.status) {
        message.success(res.internalMessage)
        getFactoryData();
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
      title: "SL",
      render: (_text: any, record: any, index: number) => <span>{index + 1}</span>

    },
    {
      title: 'Factory name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('name'),
      align: 'center'

    },

    {
      title: 'Address',
      dataIndex: "address",
      align: 'center'

    },
    {
      title: "Status",
      dataIndex: "isActive",

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
      title: "Actions",
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
                ? 'Are you sure to deactivated ?'
                : 'Are you sure to activated ?'
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
      <Row gutter={40}>
        <Col>
          <Card title={'Total Factories: ' + factories.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + factories.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + factories.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>


      </Row><br></br>
      <div>

        <Card
          extra={<span><Button onClick={() => navigate('/masters/factories/factories-form')} type={'primary'}>New</Button></span>}
          headStyle={{ height: '50px' }}
          bodyStyle={{ height: '300px', paddingTop: '2px', paddingBottom: '5px' }}
          title={<h4 style={{ textAlign: 'left' }}>FactoryView</h4>}
        >

          <Table columns={Columns}
            dataSource={factories}

          />
        </Card>
        <Drawer bodyStyle={{ paddingBottom: 80 }} title='update' width={window.innerWidth > 768 ? '75%' : '85%'}
          onClose={closeDrawer} visible={drawerVisible} closable={true}>
          <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small' >
            <FactoriesForm
              updateItem={updateFactories} Data={factoryData} isUpdate={true} closeForm={closeDrawer} />
          </Card>
        </Drawer>
      </div>
    </>

  )
}

export default FactoriesView;

