
import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Alert, Checkbox, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
// import { useIntl } from 'react-intl';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { ItemsDto } from '@project-management-system/shared-models';
import { ItemsService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';
import ItemsForm from './items-form';
import axios from 'axios';


export interface ItemsGridProps {

}

export const ItemsGrid = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [variantData, setVariantData] = useState<ItemsDto[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
  const searchInput = useRef(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState(1);

  const columns = useState('');
  const navigate = useNavigate();
  const [currencySymbols, setCurrencySymbols] = useState({});

  // const { formatMessage: fm } = useIntl();
  const service = new ItemsService();

  /**
   * used for column filter
   * @param dataIndex column data index
   */
  useEffect(() => { getAllItems(); }, [])


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
      key: 'sno', align: 'center',
      width: '50px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * pageSize + (index + 1) + (pageSize * (page - 1))
    },


    {
      title: 'Item',
      dataIndex: 'item',
      width: '90px',
      align: 'left',
      sorter: (a, b) => a.item.localeCompare(b.item),
      sortDirections: ['ascend', 'descend'],
      ...getColumnSearchProps('item'),

    },

    {
      title: 'Consumption Required',
      dataIndex: 'consumptionrequired',
      width: '90px',
      align: 'left',
      // ...getColumnSearchProps('consumptionrequired'),

      // sorter: (a, b) => a.consumptionrequired.localeCompare(b.consumptionrequired),
      // sortDirections: ['ascend', 'descend'],
      render: (v) => <Tag>{v ? 'YES' : 'NO'}</Tag>

    },

    // {
    //   title: 'Consumption ',
    //   dataIndex: 'consumption',
    //   width: '90px',
    //   align: 'left',
    //   sorter: (a, b) => a.consumption.localeCompare(b.consumption),
    //   sortDirections: ['ascend', 'descend'],
    //   // ...getColumnSearchProps('consumption'),

    // },

    // {
    //   title: 'Wastage',
    //   dataIndex: 'wastage',
    //   width: '90px',
    //   align: 'left',
    //   sorter: (a, b) => a.wastage.localeCompare(b.wastage),
    //   sortDirections: ['ascend', 'descend'],
    //   // ...getColumnSearchProps('wastage'),

    // },

    // {
    //   title: 'MOQ',
    //   dataIndex: 'moq',
    //   width: '90px',
    //   align: 'left',
    //   sorter: (a, b) => a.moq.localeCompare(b.moq),
    //   sortDirections: ['ascend', 'descend'],
    //   // ...getColumnSearchProps('moq'),

    // },


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


  const getAllItems = () => {
    service.getAllItems().then(res => {
      if (res.status) {
        setVariantData(res.data)
      }
    })
  }



  const closeDrawer = () => {
    setDrawerVisible(false);
  }


  const openFormWithData = (itemData: ItemsDto) => {
    setDrawerVisible(true);
    setSelectedVariant(itemData);
  }


  const saveVariant = (variantData: ItemsDto) => {
    variantData.itemId = 0;
    // variantData.isActive=true;
    service.createItems(variantData).then(res => {
      if (res.status) {
        // AlertMessages.getSuccessMessage('Currency Created Successfully');
        message.success(res.internalMessage)

        // getAllCurrencys();
      } else {
        message.error(res.internalMessage)

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
    <Card title='Items' extra={<span><Button onClick={() => navigate('/bom/items-form')} type={'primary'}>New</Button></span>}>
      <>

        <br></br>
        <Card >

          <Table className="custom-table-wrapper"
            columns={columnsSkelton} dataSource={variantData} size='small'
            pagination={{
              pageSize: 100,
              onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize);
              }
            }}
          />
        </Card>
      </>
    </Card>
  );
}


export default ItemsGrid;