import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
// import { useIntl } from 'react-intl';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { DestinationDto } from '@project-management-system/shared-models';
import { DestinationService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import DestinationForm from './destination-form';


export interface DestinationGridProps { }

export const DestinationGrid = (props: DestinationGridProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [variantData, setVariantData] = useState<DestinationDto[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const columns = useState('');
  const navigate = useNavigate()

  // const { formatMessage: fm } = useIntl();
  const service = new DestinationService();

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
  const columnsSkelton: any = [
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
      sorter: (a, b) => a.divisionName.localeCompare(b.divisionName),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('divisionName')
    },
    {
      title: 'Destination Code',
      dataIndex: 'destinationCode',
      sorter: (a, b) => a.destinationCode.localeCompare(b.destinationCode),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('destinationCode')
    },
    {
      title: "Destination Name",
      dataIndex: "destination",
      sorter: (a, b) => a.source.localeCompare(b.source),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("destination"),
    },
    {
      title: 'Option Group',
      dataIndex: 'optionGroup',
      sorter: (a, b) => a.optionGroup.localeCompare(b.optionGroup),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('optionGroup')
    },
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: (a, b) => a.description.localeCompare(b.description),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('description')
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
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
        // === is not work
        return record.isActive === value;
      },

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
                AlertMessages.getErrorMessage('You Cannot Edit Deactivated Destination');
              }
            }}
            style={{ color: '#1890ff', fontSize: '14px' }}
          />

          <Divider type="vertical" />
          <Popconfirm onConfirm={e => { deleteVariant(rowData); }}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate this Destination ?'
                : 'Are you sure to Activate this Destination ?'
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
  useEffect(() => { getAlldestination(); }, [])

  // const getAllCurrencys = async (params = {}, sort, filter) => {
  //   const res = await service.getAllCurrencies()
  //   if (res.status) {
  //     return { data: res.data, sucess: true, total: res.data.length }
  //   } else {
  //     return { data: [], sucess: false, total: 0 }
  //   }
  // }

  const getAlldestination = () => {
    service.getAllDestination().then(res => {
      if (res.status) {
        setVariantData(res.data);
      } else {
        // if (res.intlCode) {
        //   setVariantData([]);
        //   // console.log(res);
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
        AlertMessages.getErrorMessage(res.internalMessage);
        // }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setVariantData([]);
    })
  }


  //drawer related
  const closeDrawer = () => {
    setDrawerVisible(false);
  }

  //TO open the form for updation
  const openFormWithData = (ViewData: DestinationDto) => {
    setDrawerVisible(true);
    setSelectedVariant(ViewData);
  }


  const saveVariant = (variantData: DestinationDto) => {
    variantData.destinationId = 0;
    // variantData.isActive=true;
    service.createDestination(variantData).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage('Destination Created Successfully');
        getAlldestination();
      } else {
        // if (res.intlCode) {
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
        AlertMessages.getErrorMessage(res.internalMessage);
        // }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  /**
   * 
   * @param variantData 
   */
  const updateDestination = (Data: DestinationDto) => {
    Data.updatedUser = JSON.parse(localStorage.getItem('username'))
    service.updateDestination(Data).then(res => {
      console.log(res);
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Successfully');
        getAlldestination();
        setDrawerVisible(false);
      } else {
        // if (res.intlCode) {
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
        AlertMessages.getErrorMessage(res.internalMessage);
        // }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }
  /**
   * 
   * @param ViewData 
   */
  const deleteVariant = (ViewData: DestinationDto) => {
    ViewData.isActive = ViewData.isActive ? false : true;
    service.ActivatedeActivateDestination(ViewData).then(res => {
      console.log(res);
      if (res.status) {
        getAlldestination();
        AlertMessages.getSuccessMessage('Success');
      } else {
        // if (res.intlCode) {
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
        AlertMessages.getErrorMessage(res.internalMessage);
        // }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  return (
    <Card title='Destination' 
    extra={<span><Button onClick={()=>navigate('/global/destination/destination-form')} type={'primary'}>New</Button></span>}>
    <br/>
    <>
      <Row gutter={40}>
        <Col>
          <Card title={'Total Destination: ' + variantData.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + variantData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
        <Col>
          <span><Button onClick={() => navigate('/global/destination/destination-form')}
            type={'primary'}>New</Button></span>
        </Col>
      </Row><br></br>
      <Card >
        <Table
          size='small'

          // rowKey={record => record.variantId}
          columns={columnsSkelton}
          dataSource={variantData}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          scroll={{ x: true }}
          onChange={onChange}
          bordered />
      </Card>
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <DestinationForm key={Date.now()}
            updateItem={updateDestination}
            isUpdate={true}
            // saveItem={saveVariant}
            Data={selectedVariant}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
    </>
    </Card>
  );
}


export default DestinationGrid;