import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/lib/table';
import { FabricRequestCodeDto } from '@project-management-system/shared-models';
import { FabricRequestCodeService } from '@project-management-system/shared-services';

export function FabricRequestCodeView() {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [reqCodeData, setReqCodeData] = useState<any>([]);
  const [selectedDeliveryMethodData, setSelectedDeliveryMethodData] = useState<any>(undefined);
  
  const requestCodeService = new FabricRequestCodeService();

  useEffect(() => {
    getAllFabrics();
  }, []);

  const getAllFabrics= () => {
    requestCodeService.getAllFabrics().then(res => {
      if (res.status) {
        setReqCodeData(res.data);
      } else {
        if (res.data) {
          setReqCodeData([]);
            message.error(res.internalMessage,2);
        } else {
         message.error(res.internalMessage,2);
        }
      }
    }).catch(err => {
      setReqCodeData([]);
      message.error(err.message,2);
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

    //drawer related
    const closeDrawer=()=>{
      setDrawerVisible(false);
    }


  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
      title: 'Delivery Method',
      dataIndex: 'deliveryMethod',
      // responsive: ['lg'],
      sorter: (a, b) => a.deliveryMethod.localeCompare(b.deliveryMethod),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('deliveryMethod')
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: (isActive, rowData) => (
        <>
          {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
        </>
      ),
      filterMultiple: false,
      onFilter: (value, record) => 
      {
        // === is not work
        return record.isActive === value;
      },
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

    },
    {
      title:`Action`,
      dataIndex: 'action',
    //   render: (text, rowData) => ()
    }
  ];

  /**
   * 
   * @param pagination 
   * @param filters 
   * @param sorter 
   * @param extra 
   */
  const onChange=(pagination, filters, sorter, extra)=> {
    console.log('params', pagination, filters, sorter, extra);
  }
//   return (
//     <Card title={<span >Delivery Method</span>}
//     style={{textAlign:'center'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} >
//      <Row gutter={40}>
      
//         <Col>
//           <Card title={'Total Delivery Methods: ' + deliveryMethodData.length} style={{ textAlign: 'left', width: 220, height: 41, backgroundColor: '#bfbfbf' }}></Card>
//         </Col>
//         <Col>
//           <Card title={'Active: ' + deliveryMethodData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
//         </Col>
//         <Col>
//           <Card title={'In-Active: ' + deliveryMethodData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
//         </Col>
//           </Row>
//           <br></br>
//           <Table
//           size='small'
//           rowKey={record => record.deliveryMethodId}
//           columns={columnsSkelton}
//           dataSource={deliveryMethodData}
//           scroll={{x:true}}
//           pagination={{
//             onChange(current) {
//               setPage(current);
//             }
//           }}
//           onChange={onChange}
//           bordered />
//         <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
//             onClose={closeDrawer} visible={drawerVisible} closable={true}>
//             {/* <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'> */}
//               <DeliveryMethodForm key={Date.now()}
//                 updateDeliveryMethod={updateDeliveryMethod}
//                 isUpdate={true}
//                 deliveryMethodData={selectedDeliveryMethodData}
//                 closeForm={closeDrawer} />
//             {/* </Card> */}
//           </Drawer>
//      </Card>
//   );
}

export default FabricRequestCodeView
