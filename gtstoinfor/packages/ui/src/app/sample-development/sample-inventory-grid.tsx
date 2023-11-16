import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Input, Popconfirm, Radio, Switch, Table, Tag, Tooltip } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import AlertMessages from '../common/common-functions/alert-messages';
import FormItem from 'antd/es/form/FormItem';
import Highlighter from 'react-highlight-words';
import { SampleDevelopmentService } from '@project-management-system/shared-services';

const SampleInventory = () => {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filterData, setFilterData] = useState<any[]>([]);
  const [data , setData]=useState([])
  const [searchText, setSearchText] = useState("");
const service=new SampleDevelopmentService

  useEffect(() => {
    getSampleInventoryData();
  }, []);

  const getSampleInventoryData = () => {
    service.getSampleInventory().then((res) => {
      if (res.status) {
        setData(res.data);
        // AlertMessages.getSuccessMessage(res.internalMessage);
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    });
  };


  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
        <Button
          size="small"
          style={{ width: 90 }}
          onClick={() => {
            handleReset(clearFilters);
            setSearchedColumn(dataIndex);
            confirm({ closeDropdown: true });
          }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        type="search"
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : false,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text) =>
      text ? (
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        )
      ) : null,
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
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  //drawer related
 

    

    const Columns :(any)= [
         {
            title: "S No",
            key: "sno",
            width: "70px",
            responsive: ["sm"],
            render: (text, object, index) => (page - 1) * 10 + (index + 1),
          },
          {
            title: 'Sample Request Number',
            dataIndex: 'requestNumber',
            key: 'requestNumber',
            sorter: (a, b) => a.requestNumber.localeCompare(b.requestNumber),
      sortDirections: ["descend", "ascend"],
            ...getColumnSearchProps("requestNumber"),
         },
         {
          title: 'Product Group',
          dataIndex: 'productGroup',
          key: 'productGroup',
          sorter: (a, b) => a.productGroup.localeCompare(b.productGroup),
      sortDirections: ["descend", "ascend"],
          ...getColumnSearchProps("productGroup"),
        },
        {
        title: 'Item',
        dataIndex: 'item',
        key: 'item',
        sorter: (a, b) => a.item.localeCompare(b.item),
      sortDirections: ["descend", "ascend"],
        ...getColumnSearchProps("item"),

        
       },
       {
      title: 'Ordered  Quantity',
      dataIndex: 'orderQuantity',
      key: 'orderquantity',
      sorter: (a, b) => a.orderQuantity.localeCompare(b.orderQuantity),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("orderquantity"),

       },
       {
        title: 'Prepared  Quantity',
        dataIndex: 'preparedQuantity',
        key: 'preparedQuantity',
        sorter: (a, b) => a.preparedQuantity.localeCompare(b.preparedQuantity),
      sortDirections: ["descend", "ascend"],
        ...getColumnSearchProps("preparedQuantity"),

         },
       {
          title: 'Style',
          dataIndex: 'style',
          key: 'style',
          sorter: (a, b) => a.style.localeCompare(b.style),
      sortDirections: ["descend", "ascend"],
          ...getColumnSearchProps("style"),

       },
       {
            title: 'Buyer',
            dataIndex: 'buyer_name',
            key: 'buyer',
            sorter: (a, b) => a.buyer.localeCompare(b.buyer),
      sortDirections: ["descend", "ascend"],
          ...getColumnSearchProps("buyer"),

        },
        {
            title: 'Billing Address',
            dataIndex: 'billingAddress',
            key: 'billingAddress',
            sorter: (a, b) => a.billingAddress.localeCompare(b.billingAddress),
      sortDirections: ["descend", "ascend"],
          ...getColumnSearchProps("billingAddress"),

        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            sorter: (a, b) => a.location.localeCompare(b.location),
      sortDirections: ["descend", "ascend"],
          ...getColumnSearchProps("location"),

        },
        {
            title: 'Status',
            dataIndex: 'status',
            align:'center',
        },
        
    ]
    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      };
    return (
        <Card
        title={<span>Sample Inventory</span>}
        style={{ textAlign: "center" }}
        headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
            <Table columns={Columns} 
             dataSource={data}
            scroll={{ x: true }}
             pagination={{
                onChange(current) {
                  setPage(current);
                },
              }}
              onChange={onChange}
              bordered
            />
        </Card>
    )
}

export default SampleInventory
