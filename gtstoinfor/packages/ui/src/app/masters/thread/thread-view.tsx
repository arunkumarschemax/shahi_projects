import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { SupplierActivateDeactivateDto, SupplierCreateDto } from '@project-management-system/shared-models';
import { Button, Card, Col, Divider, Drawer, Input, message, Popconfirm, Row, Switch, Table, Tag } from 'antd';
import SupplierService from 'packages/libs/shared-services/src/supplier/supplier-service';
import React, { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import TableActions from '../../common/table-actions/table-actions';
import ThreadForm from './thread-form';

const ThreadView = () => {
  const [supplier, setSupllier] = useState([]);
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState(''); 
  const service = new SupplierService();
  const [data, setData] = useState<any>(undefined);
  const [drawerVisible, setDrawerVisible] = useState(false);


  useEffect(() => {
    getSupplierData()
  }, []);

  const getSupplierData = () => {
    service.getAllSuppliers().then((res) => {
      if (res.status) {
        setSupllier(res.data);
      } else {

        setSupllier([])
      }
    })
      .catch((error) => {
        console.log(error.response)
      })
  };
  const closeDrawer = () => {
    setDrawerVisible(false);
  }
  const openFormwithData = (ViewData: SupplierCreateDto) => {
    setDrawerVisible(true);
    setData(ViewData);
    console.log(ViewData, "viewData")
  }


  const updateSupplier = (Data: SupplierCreateDto) => {
    service.updateSuppliers(Data).then(res => {
      console.log(res, "ressssssssssss");
      if (res.status) {
        AlertMessages.getSuccessMessage('Upadted Succesfully');
        getSupplierData()
        setDrawerVisible(false);

      }
      else {
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message)
    }) 
  } 
  const activateOrDeactivate = (values: SupplierActivateDeactivateDto) => {
    values.isActive = values.isActive ? false : true
    const req = new SupplierActivateDeactivateDto(values.id, values.isActive, values.versionFlag,)
    service.ActivateOrDeactivate(req).then(res => {
      if (res.status) {
        message.success(res.internalMessage)
        getSupplierData();
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
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
      title: "SNo",
      render: (_text: any, record: any, index: number) => <span>{index + 1}</span>

    },

    {

      title: "Style",
      dataIndex: 'style',
      align: 'center'

    },
    {
      title: "Tex",
      dataIndex: 'tex', 
      align: 'center'
    },
    {
      title: "Quality",
      dataIndex: 'quality',
      sorter: (a, b) => a.quality.length - b.quality.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('quality'),
      align: 'center'
    },
    {
      title: "Color Combo",
      dataIndex: 'colorCombo',
      align: 'center'
    },
    {
      title: "Color Code",
      dataIndex: 'colorCode',
      align: 'center'
    },
    {
      title: "Shade Number",
      dataIndex: 'shadeNumber',
      align: 'center'
    },
    {
      title: "Supplier",
      dataIndex: 'supplier',
      align: 'center'
    },
   
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">InActive</Tag>}
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
      onFilter: (value, recod) => {
        return recod.isActive === value;
      }


    },
    {
      title: "Actions",
      width: 50,
      render: (text, rowData, index: number) => {
        return <>
          <EditOutlined style={{ color: 'blue' }} onClick={() => { openFormwithData(rowData) }} type="edit" />

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
          extra={<span><Button onClick={() => navigate('/masters/thread-form')} type={'primary'}>New</Button></span>}
          headStyle={{ height: '50px' }}
          bodyStyle={{ height: '300px', paddingTop: '2px', paddingBottom: '5px' }}
          title={<h4 style={{ textAlign: 'left' }}>Threads</h4>}

        >

          <Table columns={Columns} dataSource={supplier}
            scroll={{ x: 1500 }} />
        </Card>
        <Drawer bodyStyle={{ paddingBottom: 80 }} title='update' width={window.innerWidth > 768 ? '75%' : '85%'}
          onClose={closeDrawer} visible={drawerVisible} closable={true}>
          <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small' >
            <ThreadForm
              updateItem={updateSupplier} Data={data} isUpdate={true} closeForm={closeDrawer} />
          </Card>
        </Drawer>
      </div>
    </>
  )
}

export default ThreadView;



