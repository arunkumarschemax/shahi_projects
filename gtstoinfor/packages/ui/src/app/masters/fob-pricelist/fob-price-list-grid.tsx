import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { AlertMessages, FactoryActivateDeactivateDto, FactoryDto, FobActivateDeactivateDto, Fobdto } from '@project-management-system/shared-models';
import { FactoryService, FobService } from '@project-management-system/shared-services';
import { Button, Card, Col, Divider, Drawer, Input, message, Popconfirm, Row, Switch, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import FobPriceListForm from './fob-price-list-form';

const FobPriceListGrid = () => {
  const navigate = useNavigate();
  const service = new FobService();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [fob, setFob] = useState<any>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [factoryData, setFactoryData] = useState<any>(undefined);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    getFobData()
  }, []);

  const getFobData = () => {
    service.getFobPrice().then((res) => {
        console.log(res,"res")
      if (res.status) {
        setFob(res.data);
      } else {

        setFob([])
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
  const updateFob = (Data: Fobdto) => {

    console.log(Data, 'vidya')
    service.updateFobplist(Data).then(res => {
      console.log(res, "ressssssssssss");
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Succesfully');
        getFobData()
        setDrawerVisible(false);

      }
      else {
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message)
    })
  }

  const activateOrDeactivate = (values: FobActivateDeactivateDto) => {
    values.isActive = values.isActive ? false : true
    const req = new FobActivateDeactivateDto(values.id, values.isActive, values.versionFlag,)
    service.activateOrDeactivate(req).then(res => {
      if (res.status) {
        message.success(res.internalMessage)
        getFobData();
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
    // {
    //   title: "SL",
    //   render: (_text: any, record: any, index: number) => <span>{index + 1}</span>

    // },
    {
      title: "S.No",
      key: "sno",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * pageSize + (index + 1),
    },
    {
        title: 'Planning Season Code',
        dataIndex: 'planningSeasonCode',
        width:100,
        // sorter: (a, b) => a.planningSeasonCode.length - b.planningSeasonCode.length,
        // sortDirections: ['descend', 'ascend'],
        // ...getColumnSearchProps('planningSeasonCode'),
        align: 'center'
  
      },
      {
        title: 'Planning SeasonYear',
        dataIndex: 'planningSeasonYear',
        // sorter: (a, b) => a.planningSeasonYear.length - b.planningSeasonYear.length,
        // sortDirections: ['descend', 'ascend'],
        // ...getColumnSearchProps('planningSeasonYear'),
        align: 'center'
  
      },
      {
        title: 'Style Number',
        dataIndex: 'styleNumber',
        align: 'center'
  
      },
      {
        title: 'Color Code',
        dataIndex: 'colorCode',
        align: 'center'
  
      },
      {
        title: 'Size Description',
        dataIndex: 'sizeDescription',
        align: 'center',
        
  
      },

    {
      title: 'Shahi Confirmed Gross Price',
      dataIndex: "shahiConfirmedGrossPrice",
      align: 'center'

    },
    {
        title: 'Currency Code',
        dataIndex: "shahiConfirmedGrossPriceCurrencyCode",
        align: 'center'
  
      },
    {
      title: "Status",
      dataIndex: "isActive",width:80,

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
      title: "Actions",width:80,
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
  
      <div>

        <Card
          extra={<span><Button onClick={() => navigate('/masters/fob-price-list-form/',{state:{name:'new'}})} type={'primary'}>New</Button></span>}
          headStyle={{ height: '50px' }}
         // bodyStyle={{ height: '300px', paddingTop: '2px', paddingBottom: '5px' }}
          // title={<h4 style={{ textAlign: 'left' }}>Fob Price List </h4>}
          title={<><span>Fob Price List</span><span><Button onClick={() => navigate('/masters/fob-price-list-form',{state:{name:'excel'}})} style={{float:'right',marginRight:'2px'}} type='primary'>Excel Upload</Button></span></>}
        >

          <Table columns={Columns}
            dataSource={fob}
            className="custom-table-wrapper"
            bordered
            pagination={{
              pageSize:50,
              onChange(current, pageSize) {
                  setPage(current);
                  setPageSize(pageSize);
              },
          }}
          // pagination={false}
         scroll={{ x: 'max-content', y: 500}}

          />
        </Card>
        <Drawer bodyStyle={{ paddingBottom: 80 }} title='update' width={window.innerWidth > 768 ? '75%' : '85%'}
          onClose={closeDrawer} visible={drawerVisible} closable={true}>
          <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small' >
            <FobPriceListForm
              updateItem={updateFob} Data={factoryData} isUpdate={true} closeForm={closeDrawer} />
          </Card>
        </Drawer>
      </div>
    </>

  )
}

export default FobPriceListGrid;

