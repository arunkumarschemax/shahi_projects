import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Input, Popconfirm, Radio, Switch, Table, Tag, Tooltip } from 'antd'
import React, { useRef, useState } from 'react'
import AlertMessages from '../common/common-functions/alert-messages';
import FormItem from 'antd/es/form/FormItem';
import Highlighter from 'react-highlight-words';

const SampleInventory = () => {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filterData, setFilterData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  const dataSource = [
        {
          key: '1',
          requestNumber: 'SDR1',
          buyer: 'John Doe',
          style: 'Sample Style 1',
          billingAddress: '1234 Street, City',
          location: 'Warehouse A',
          isActive: true,
        },
        {
            key: '2',
            requestNumber: 'SDR2',
            buyer: 'John Doe',
            style: 'Sample Style 1',
            billingAddress: '1234 Street, City',
            location: 'Warehouse A',
            isActive: true,
          }, {
            key: '3',
            requestNumber: 'SDR3',
            buyer: 'John Doe',
            style: 'Sample Style 1',
            billingAddress: '1234 Street, City',
            location: 'Warehouse A',
            isActive: true,
          }, {
            key: '4',
            requestNumber: 'SDR4',
            buyer: 'John Doe',
            style: 'Sample Style 1',
            billingAddress: '1234 Street, City',
            location: 'Warehouse A',
            isActive: true,
          }, {
            key: '5',
            requestNumber: 'SDR5',
            buyer: 'John Doe',
            style: 'Sample Style 1',
            billingAddress: '1234 Street, City',
            location: 'Warehouse A',
            isActive: true,
          },
      ];



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
      title: 'Ordered  Qantity',
      dataIndex: 'orderQuantity',
      key: 'orderquantity',
      sorter: (a, b) => a.orderQuantity.localeCompare(b.orderQuantity),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("orderquantity"),

       },
       {
        title: 'Prepared  Qantity',
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
            dataIndex: 'buyer',
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
         headStyle={{ border: 0 }}
        className="card-header">
            <Table columns={Columns} 
             dataSource={dataSource}
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



// import React from 'react';
// import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined } from '@ant-design/icons';
// import { Button, Card, Divider, Popconfirm, Radio, Switch, Table, Tag, Tooltip } from 'antd';
// import AlertMessages from '../common/common-functions/alert-messages';
// import FormItem from 'antd/es/form/FormItem';

// const SampleInventory = () => {
//   const [page, setPage] = React.useState(1);

//   const dataSource = [
//     {
//       key: '1',
//       requestNumber: 'SDR1',
//       buyer: 'John Doe',
//       style: 'Sample Style 1',
//       billingAddress: '1234 Street, City',
//       location: 'Warehouse A',
//       isActive: true,
//     },
//     {
//         key: '2',
//         requestNumber: 'SDR2',
//         buyer: 'John Doe',
//         style: 'Sample Style 1',
//         billingAddress: '1234 Street, City',
//         location: 'Warehouse A',
//         isActive: true,
//       }, {
//         key: '3',
//         requestNumber: 'SDR3',
//         buyer: 'John Doe',
//         style: 'Sample Style 1',
//         billingAddress: '1234 Street, City',
//         location: 'Warehouse A',
//         isActive: true,
//       }, {
//         key: '4',
//         requestNumber: 'SDR4',
//         buyer: 'John Doe',
//         style: 'Sample Style 1',
//         billingAddress: '1234 Street, City',
//         location: 'Warehouse A',
//         isActive: true,
//       }, {
//         key: '5',
//         requestNumber: 'SDR5',
//         buyer: 'John Doe',
//         style: 'Sample Style 1',
//         billingAddress: '1234 Street, City',
//         location: 'Warehouse A',
//         isActive: true,
//       },
//   ];

//   const Columns :(any)= [
//     {
//         title: "S No",
//         key: "sno",
//         width: "70px",
//         responsive: ["sm"],
//         render: (text, object, index) => (page - 1) * 10 + (index + 1),
//       },
//     {
//         title: 'Sample Request Number',
//         dataIndex: 'requestNumber',
//         key: 'requestNumber',
//     },
//     {
//         title: 'Buyer',
//         dataIndex: 'buyer',
//         key: 'buyer',
//     },
//     {
//         title: 'Style',
//         dataIndex: 'style',
//         key: 'style',
//     },
//     {
//         title: 'Billing Address',
//         dataIndex: 'billingAddress',
//         key: 'billingAddress',
//     },
//     {
//         title: 'Location',
//         dataIndex: 'location',
//         key: 'location',
//     },
//     {
//         title: 'Status',
//         dataIndex: 'isActive',
//         align:'center',
//         render: (isActive, rowData) => (
//             // eslint-disable-next-line react/jsx-no-useless-fragment
//             <>
//                 {isActive ? (
//                     <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>) : (<Tag icon={<CloseCircleOutlined />} color="#f50">InActive</Tag>
//                 )}
//             </>
//         ),
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//             <div style={{ padding: 7 }}>
                
//                 <FormItem >
//                 <Radio.Group 
//                     onChange={(e) => {
//                         setSelectedKeys([e.target.value.toString()]);
//                     }}
//                     // value={selectedKeys[1]}
                    
//                 >
//                     <Radio style={{marginRight:"11px", marginLeft:"20px"}} value={true}>Active</Radio>
//                     <Radio  value={false}>InActive</Radio>
//                 </Radio.Group>
//                 </FormItem>
//                 <Button
//                     type="primary"
//                     onClick={() => {
//                         confirm();
//                         // setSearchText(selectedKeys[0]);
//                         // setSearchedColumn('isActive');
//                     }}
//                     size="small"
//                     style={{ width: 90, marginRight: 2, marginTop: 1 }}
//                 >
//                     OK
//                 </Button>
//                 <Button
//                     onClick={() => {
//                        // handleReset(clearFilters);
//                         confirm();
//                     }}
//                     size="small"
//                     style={{ width: 90 }}
//                 >
//                     Reset
//                 </Button>
//             </div>
//         ),
//         onFilter: (value, record) => {
//             return record.isActive.toString() === value;
//         },
//     },
//     {
//         title: "Action",
//         dataIndex: "action",
//         align: 'center',
  
//         render: (text, rowData, index: number) => (
//           <span>
//             <Tooltip placement="top" title='Edit'>
//               <EditOutlined className={'editSamplTypeIcon'} type="edit"
//                 onClick={() => {
//                   if (rowData.isActive) {
//                     // onEdit(rowData)
//                   } else {
//                     AlertMessages.getErrorMessage('You Cannot Edit Deactivated Style')
//                   }
  
//                 }}
//                 style={{ color: '#1890ff', fontSize: '14px' }}
//               />
//             </Tooltip>
//             <Divider type="vertical" />
//             <Popconfirm onConfirm={e => { 
//                 // active(rowData) 
//             }}
//               title={
//                 rowData.isActive
//                   ? 'Are you sure to Deactivate ?'
//                   : 'Are you sure to Activate ?'
//               }
//             >
//               <Switch size="default"
//                 className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
//                 checkedChildren={<RightSquareOutlined type="check" />}
//                 unCheckedChildren={<RightSquareOutlined type="close" />}
//                 checked={rowData.isActive}
//               />
  
//             </Popconfirm>
//           </span>
//         )
//       }
// ]
//   const onChange = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
//   };

//   return (
//     <Card title={<span>Sample Inventory</span>} style={{ textAlign: 'center' }} headStyle={{ border: 0 }} className="card-header">
//       <Table
//         columns={Columns}
//         dataSource={dataSource} // Pass the data source here
//         scroll={{ x: true }}
//         size="small"
//         pagination={{
//           onChange(current) {
//             setPage(current);
//           },
//         }}
//         onChange={onChange}
//         bordered
//       />
//     </Card>
//   );
// };

// export default SampleInventory;
