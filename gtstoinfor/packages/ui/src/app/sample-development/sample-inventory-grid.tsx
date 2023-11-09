// import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined } from '@ant-design/icons';
// import { Button, Card, Divider, Popconfirm, Radio, Switch, Table, Tag, Tooltip } from 'antd'
// import React from 'react'
// import AlertMessages from '../common/common-functions/alert-messages';
// import FormItem from 'antd/es/form/FormItem';

// const SampleInventory = () => {
//   const [page, setPage] = React.useState(1);

    

//     const Columns :(any)= [
//         {
//             title: "S No",
//             key: "sno",
//             width: "70px",
//             responsive: ["sm"],
//             render: (text, object, index) => (page - 1) * 10 + (index + 1),
//           },
//         {
//             title: 'Sample Development Request Number',
//             dataIndex: 'requestNumber',
//             key: 'requestNumber',
//         },
//         {
//             title: 'Buyer',
//             dataIndex: 'buyer',
//             key: 'buyer',
//         },
//         {
//             title: 'Style',
//             dataIndex: 'style',
//             key: 'style',
//         },
//         {
//             title: 'Billing Address',
//             dataIndex: 'billingAddress',
//             key: 'billingAddress',
//         },
//         {
//             title: 'Location',
//             dataIndex: 'location',
//             key: 'location',
//         },
//         {
//             title: 'Status',
//             dataIndex: 'isActive',
//             align:'center',
//             render: (isActive, rowData) => (
//                 // eslint-disable-next-line react/jsx-no-useless-fragment
//                 <>
//                     {isActive ? (
//                         <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>) : (<Tag icon={<CloseCircleOutlined />} color="#f50">InActive</Tag>
//                     )}
//                 </>
//             ),
//             filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//                 <div style={{ padding: 7 }}>
                    
//                     <FormItem >
//                     <Radio.Group 
//                         onChange={(e) => {
//                             setSelectedKeys([e.target.value.toString()]);
//                         }}
//                         // value={selectedKeys[1]}
                        
//                     >
//                         <Radio style={{marginRight:"11px", marginLeft:"20px"}} value={true}>Active</Radio>
//                         <Radio  value={false}>InActive</Radio>
//                     </Radio.Group>
//                     </FormItem>
//                     <Button
//                         type="primary"
//                         onClick={() => {
//                             confirm();
//                             // setSearchText(selectedKeys[0]);
//                             // setSearchedColumn('isActive');
//                         }}
//                         size="small"
//                         style={{ width: 90, marginRight: 2, marginTop: 1 }}
//                     >
//                         OK
//                     </Button>
//                     <Button
//                         onClick={() => {
//                            // handleReset(clearFilters);
//                             confirm();
//                         }}
//                         size="small"
//                         style={{ width: 90 }}
//                     >
//                         Reset
//                     </Button>
//                 </div>
//             ),
//             onFilter: (value, record) => {
//                 return record.isActive.toString() === value;
//             },
//         },
//         {
//             title: "Action",
//             dataIndex: "action",
//             align: 'center',
      
//             render: (text, rowData, index: number) => (
//               <span>
//                 <Tooltip placement="top" title='Edit'>
//                   <EditOutlined className={'editSamplTypeIcon'} type="edit"
//                     onClick={() => {
//                       if (rowData.isActive) {
//                         // onEdit(rowData)
//                       } else {
//                         AlertMessages.getErrorMessage('You Cannot Edit Deactivated Style')
//                       }
      
//                     }}
//                     style={{ color: '#1890ff', fontSize: '14px' }}
//                   />
//                 </Tooltip>
//                 <Divider type="vertical" />
//                 <Popconfirm onConfirm={e => { 
//                     // active(rowData) 
//                 }}
//                   title={
//                     rowData.isActive
//                       ? 'Are you sure to Deactivate ?'
//                       : 'Are you sure to Activate ?'
//                   }
//                 >
//                   <Switch size="default"
//                     className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
//                     checkedChildren={<RightSquareOutlined type="check" />}
//                     unCheckedChildren={<RightSquareOutlined type="close" />}
//                     checked={rowData.isActive}
//                   />
      
//                 </Popconfirm>
//               </span>
//             )
//           }
//     ]
//     const onChange = (pagination, filters, sorter, extra) => {
//         console.log("params", pagination, filters, sorter, extra);
//       };
//     return (
//         <Card
//         title={<span>Sample Inventory</span>}
//         style={{ textAlign: "center" }}
//          headStyle={{ border: 0 }}
//         className="card-header">
//             <Table columns={Columns} 
//             scroll={{ x: true }}
//             size="small"
//              pagination={{
//                 onChange(current) {
//                   setPage(current);
//                 },
//               }}
//               onChange={onChange}
//               bordered
//             />
//         </Card>
//     )
// }

// export default SampleInventory



import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Popconfirm, Radio, Switch, Table, Tag, Tooltip } from 'antd';
import AlertMessages from '../common/common-functions/alert-messages';
import FormItem from 'antd/es/form/FormItem';

const SampleInventory = () => {
  const [page, setPage] = React.useState(1);

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

  const Columns :(any)= [
    {
        title: "S No",
        key: "sno",
        width: "70px",
        responsive: ["sm"],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
      },
    {
        title: 'Sample Development Request Number',
        dataIndex: 'requestNumber',
        key: 'requestNumber',
    },
    {
        title: 'Buyer',
        dataIndex: 'buyer',
        key: 'buyer',
    },
    {
        title: 'Style',
        dataIndex: 'style',
        key: 'style',
    },
    {
        title: 'Billing Address',
        dataIndex: 'billingAddress',
        key: 'billingAddress',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Status',
        dataIndex: 'isActive',
        align:'center',
        render: (isActive, rowData) => (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
                {isActive ? (
                    <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>) : (<Tag icon={<CloseCircleOutlined />} color="#f50">InActive</Tag>
                )}
            </>
        ),
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 7 }}>
                
                <FormItem >
                <Radio.Group 
                    onChange={(e) => {
                        setSelectedKeys([e.target.value.toString()]);
                    }}
                    // value={selectedKeys[1]}
                    
                >
                    <Radio style={{marginRight:"11px", marginLeft:"20px"}} value={true}>Active</Radio>
                    <Radio  value={false}>InActive</Radio>
                </Radio.Group>
                </FormItem>
                <Button
                    type="primary"
                    onClick={() => {
                        confirm();
                        // setSearchText(selectedKeys[0]);
                        // setSearchedColumn('isActive');
                    }}
                    size="small"
                    style={{ width: 90, marginRight: 2, marginTop: 1 }}
                >
                    OK
                </Button>
                <Button
                    onClick={() => {
                       // handleReset(clearFilters);
                        confirm();
                    }}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        onFilter: (value, record) => {
            return record.isActive.toString() === value;
        },
    },
    {
        title: "Action",
        dataIndex: "action",
        align: 'center',
  
        render: (text, rowData, index: number) => (
          <span>
            <Tooltip placement="top" title='Edit'>
              <EditOutlined className={'editSamplTypeIcon'} type="edit"
                onClick={() => {
                  if (rowData.isActive) {
                    // onEdit(rowData)
                  } else {
                    AlertMessages.getErrorMessage('You Cannot Edit Deactivated Style')
                  }
  
                }}
                style={{ color: '#1890ff', fontSize: '14px' }}
              />
            </Tooltip>
            <Divider type="vertical" />
            <Popconfirm onConfirm={e => { 
                // active(rowData) 
            }}
              title={
                rowData.isActive
                  ? 'Are you sure to Deactivate ?'
                  : 'Are you sure to Activate ?'
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
]
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Card title={<span>Sample Inventory</span>} style={{ textAlign: 'center' }} headStyle={{ border: 0 }} className="card-header">
      <Table
        columns={Columns}
        dataSource={dataSource} // Pass the data source here
        scroll={{ x: true }}
        size="small"
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
        onChange={onChange}
        bordered
      />
    </Card>
  );
};

export default SampleInventory;
