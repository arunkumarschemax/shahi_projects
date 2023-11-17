// import React, { useState, useEffect, useRef } from 'react';
// import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Form, Select, DatePicker, Modal } from 'antd';
// import Highlighter from 'react-highlight-words';
// import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
// import { Link, useNavigate } from 'react-router-dom';
// import AlertMessages from '../common/common-functions/alert-messages';
// import moment from 'moment';
// import { SubstitutionService } from '@project-management-system/shared-services';
// import { fgItemIdReq } from '@project-management-system/shared-models';


// const SubstituionView=() =>{
//     const [searchText, setSearchText] = useState('');
//     const [searchedColumn, setSearchedColumn] = useState('');
//     const searchInput = useRef(null);
//     const [page, setPage] = React.useState(1);
//     const navigate = useNavigate();
//     const [form] = Form.useForm();
//     const service = new SubstitutionService
//     const [style, setStyle] = useState([]);
//     const [data, setdata] = useState([]);
//     const [selectedItemNo, setSelectedItemNo] = useState();
//     const { Option } = Select;
//     const [searchClicked, setSearchClicked] = useState(false);
//     const [selectedRow, setSelectedRow] = useState(null);
//     const [Value, setValue] = useState([]);
//     const [itemData, setItemData] = useState([]);

//     useEffect(()=>{
//       // Substituion();
//       Dropdown();
//     },[])

//     const resetHandler = () => {
//         form.resetFields();
//     setItemData([])
    
//     }
//     const handleRowClick = (record) => {
//       // Set the selected row when clicking on a row
//       setSelectedRow(record);
//     };

//     const closeModal = () => {
//       // Close the modal by resetting the selected row
//       setSelectedRow(null);
//     };
//     const Dropdown=()=>{
//       service.getFgSku().then((res)=>{
//         if(res){
//           setdata(res.data);
//         }
//       })
//     }

//     const FgCode = (val,data) => {
//       // console.log(data.code,'fgItemmmmmmmmmmmmmmmmmmm');
      
//       setSelectedItemNo(data.code);
//       // Substituion(data.code)
//     };
  
//     const Substituion=()=>{
//       const req = new fgItemIdReq(selectedItemNo)
//       // console.log(req,"=========")
//       if(form.getFieldValue('rm_sku') !== undefined){
//         req.rmSku=form.getFieldValue('rm_sku')
//       }
//    service.getSubstitution(req).then(res=>{
//     if(res.status){
//       setItemData(res.data)    
//     }
//    })
//     }

//     // const handledSearch=()=>{
//     //   const req = new fgItemIdReq()
//     //   if(form.getFieldValue('fg_sku') != undefined){
//     //     req.fgItemCode=selectedItemNo
//     //     setSearchClicked(true);

//     //   }
//     //   service.getFgSku(req).then((res)=>{
//     //     if(res){
//     //       setItemData(res.data)
//     //     }
//     //   })
//     // }
//     // const DetailView=(record:any)=>{
//     //   const version=itemData.filter(rmSku=>rmSku.rmSku ==record)
//     // }
//     const columnsSkelton:any=[
    
//         {
//             title: 'S No',
//             key: 'sno',
//             responsive: ['sm'],
//             render: (text, object, index) => (page - 1) * 10 + (index + 1)
//           },

//           {
//             title:'Fg SkuCode',
//             dataIndex:'fgSku',
//               key:'fgSku',
//           },
//           {
//             title:'Fg ItemCode',
//             dataIndex:'fgItemCode',
//             key:'fgItemCode',
//           },
//           {
//             title: 'Rm SkuCode',
//             dataIndex: 'rmSku',
//             key: 'rmSku',
//             // render: (text, record) => {
//             //   console.log(record,"0000000000");
              
//             //   const showModal = () => {
                
//             //     Modal.info({
//             //       title: 'RM Details',
//             //       content: (
//             //         <div>
//             //           {/* Your modal content goes here */}
//             //           <p>{record.rmSku}</p>
//             //           <p>{record.featureCode}</p>
//             //           <p>{record.optionGroup}</p>
//             //           <p>{record.optionValue}</p>
//             //           <p>{record.itemType}</p>

//             //         </div>
//             //       ),
//             //     });
//             //   };
          
//             //   return (
//             //     <Tooltip title="Click to view">
//             //       <Button type="link" onClick={showModal}>
//             //         {record.rmSku}
//             //       </Button>
//             //     </Tooltip>
//             //   );
//             // },
//           },
          
//           {

//             title:'Rm ItemCode',
//             dataIndex:'rmItemCode',
//             key:'rmItemCode',

//           },
//           {
//             title:'Item Type',
//             dataIndex:'itemType',
//             key:'itemType',

//           },
//           {
//             title:'Consumption',
//             dataIndex:'consumption',
//             key:'consumption',
//             render: (consumptionArray) => {
//               if (Array.isArray(consumptionArray)) {
//                 return (
//                   <ul>
//                     {consumptionArray.map((item, index) => (
//                       <li key={index}>{item}</li>
//                     ))}
//                   </ul>
//                 );
//               } else {
//                 // Render a fallback if consumptionArray is not an array
//                 return <span>{consumptionArray}</span>;
//               }
//             },
            
//           },
//           {
//             title: 'Feature Code',
//             dataIndex: 'featureCode',
//             key: 'featureCode',
//             render: (featureCodeArray) => {
//               console.log(featureCodeArray); // Log data to console
//               if (Array.isArray(featureCodeArray)) {
//                 // Rendering logic
//               } else {
//                 // Fallback rendering logic
//               }
//             },
//           },
          
//           {
//             title:'Option Group',
//             dataIndex:'optionGroup',

//           },

//         ]

//         return(
//             <>
//             <Card title={<span>Substitution</span>} style={{textAlign:'center'}} headStyle={{border:0}}
//             extra={<Link to='/substitution'>
//       <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>

//       </Link>}>
//             <Card>
//                 <Form form={form} layout='vertical' onFinish={Substituion}>
//              <Row gutter={24}>
//              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
//                 <Form.Item name='fg_sku' label='Fg SkuCode'>
//                <Select showSearch 
//                placeholder="Select Fg SkuCode"
//                 optionFilterProp="children"
//                 allowClear
//                 onChange={(val,data)=>FgCode(val,data)}>
//           {
//             data?.map((e)=>(
//               <Option key={e.fg_sku_id} val={e.fg_sku_id} code={e.fg_sku}>
//                   {e.fg_sku}
//               </Option>
//             ))

//             }
//                </Select>
//                 </Form.Item>
//             </Col>
//             {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
//                 <Form.Item name='rmSku' label='Rm SkuCode'>
//                <Select showSearch placeholder="Select Rm SkuCode" optionFilterProp="children" allowClear>
//           {

//             }
//                </Select>
//                 </Form.Item>
//             </Col> */}

//             <Col >
//                        <Form.Item>
//                        <Button
//   htmlType="submit"
//   icon={<SearchOutlined />}
//   type="primary"
//   style={{ marginBottom: '20px' }}

// >
//  Search
// </Button>
// <Button
//   htmlType="button"
//   icon={<UndoOutlined />}
//   type="primary"
//   style={{
//     marginTop: '20px',margin:20,
//     backgroundColor: '#162A6D',
//     color: 'white',
//     position: 'relative',
//   }}
//   onClick={resetHandler}
// >
//   RESET
// </Button>


// </Form.Item>

//                     </Col>
//              </Row>

            
//                 </Form>
//                 <>
       
//                 <Table size='small'
//                 rowKey={record => record}
//                 className='custom-table-wrapper'
//                   columns={columnsSkelton}
//                   dataSource={itemData}
//                   pagination={{
//                     onChange(current) {
//                       setPage(current);
//                     }
//                   }}
//                    scroll={{x: 'max-content'}}
//                    bordered/>
                
//                 </>
//             </Card>
//             </Card>

//             </>
//         )
// }
// export default SubstituionView


import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Form, Select, DatePicker, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../common/common-functions/alert-messages';
import moment from 'moment';
import { SubstitutionService } from '@project-management-system/shared-services';
import { fgItemIdReq } from '@project-management-system/shared-models';

const SubstituionView=() =>{

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const service = new SubstitutionService
    const [style, setStyle] = useState([]);
    const [data, setdata] = useState([]);
    const [selectedItemNo, setSelectedItemNo] = useState();
    const { Option } = Select;
    const [searchClicked, setSearchClicked] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [Value, setValue] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [pageSize, setPageSize] = useState<number>(1);
 useEffect(()=>
 {
  getSubstitution();
  getfgitem();
  getrmtem();
},[])


    const getSubstitution=()=>{
      const req = new fgItemIdReq()
      if(form.getFieldValue('fg_item_code') !== undefined){
        req.fgItemCode= form.getFieldValue('fg_item_code')
      }
      if(form.getFieldValue('itemCode') !== undefined){
        req.rmItemCode= form.getFieldValue('itemCode')
      }
      service.getSubstitution(req).then(res=>{

      if(res.status){
            setdata(res.data)
            // console.log(res,'dataaaaaaaaaaaaa')
        }else{
            AlertMessages.getErrorMessage(res.internalMessage);
        }
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
        setdata([]);
      })
    }

    const getfgitem=()=>{
      service.getFgSku().then(res=>{
        if(res.status){
          setValue(res.data)
        }else{
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
    }

    const getrmtem=()=>{
      service.getRmSku().then(res=>{
        if(res.status){
          setItemData(res.data)
        }else{
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
    }
    function handleReset(clearFilters) {
      clearFilters();
      setSearchText('');
    };
    function handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const resetHandler = () => {
      form.resetFields();
      getSubstitution();
  
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


    const columnsSkelton:any=[
    
              {
                  title: 'S No',
                  key: 'sno',
                  responsive: ['sm'],
                  render: (text, object, index) => (page - 1) * 10 + (index + 1),
                  width:'50spx'

                },
      
                {
                  title:'Fg ItemCode',
                  dataIndex:'fgItemCode',
                    key:'fgItemCode',
                    sorter: (a, b) => {
                      const valueA = a.fgSku || '';
                      const valueB = b.fgSku || '';
                      return valueA.localeCompare(valueB);
                    },
                    sortDirections: ['descend', 'ascend'],
                    width:'120px',
                    ...getColumnSearchProps('fgItemCode'),

                },
                {
                  title:'Fg Sku',
                  dataIndex:'rmData',
                  key:'rmData',
                  // sorter: (a, b) => {
                  //   const valueA = a.fgItemCode || '';
                  //   const valueB = b.fgItemCode || '';
                  //   return valueA.localeCompare(valueB);
                  // },
                  // sortDirections: ['descend', 'ascend'],
                  // width:'120px'
                  render:(fg)=>{
                    return(
                      <Table
                      dataSource={fg}
                      columns={[
                        {
                        dataIndex:'fgSku',
                        key:'fgSku',
                        align:'center',
                        render:(data)=>{
                          return data? data:'-'
                        }
                        }
                      ]}
                      pagination={false}
                      />
                    )
                  }

                },
                {
                  title:'Rm Sku',
                  dataIndex:'rmDetails',
                  key:'rmDetails',
                  // sorter: (a, b) => {
                  //   const valueA = a.fgItemCode || '';
                  //   const valueB = b.fgItemCode || '';
                  //   return valueA.localeCompare(valueB);
                  // },
                  // sortDirections: ['descend', 'ascend'],
                  // width:'120px'
                  render:(fg)=>{
                    return(
                      <Table
                      dataSource={fg}
                      columns={[
                        {
                        dataIndex:'rmSku',
                        key:'rmSku',
                        align:'center',
                        render:(data)=>{
                          return data? data:'-'
                        }
                        }
                      ]}
                      pagination={false}
                      />
                    )
                  }

                },
                
                {
      
                  title:'Rm ItemCode',
                  dataIndex:'itemCode',
                  key:'itemCode',
                  sorter: (a, b) => {
                    const valueA = a.itemCode || '';
                    const valueB = b.itemCode || '';
                    return valueA.localeCompare(valueB);
                  },
                  sortDirections: ['descend', 'ascend'],
                  width:'120px'

      
                },
                {
                  title:'Item Type',
                  dataIndex:'itemType',
                  key:'itemType',
                  sorter: (a, b) => {
                    const valueA = a.itemType || '';
                    const valueB = b.itemType || '';
                    return valueA.localeCompare(valueB);
                  },
                  sortDirections: ['descend', 'ascend'],
                  ...getColumnSearchProps('itemType'),
                  width:'120px'

                },
                {
                  title:'Consumption',
                  dataIndex:'consumption',
                  key:'consumption',
                  sorter: (a, b) => {
                    const valueA = a.consumption || '';
                    const valueB = b.consumption || '';
                    return valueA.localeCompare(valueB);
                  },
                  sortDirections: ['descend', 'ascend'],
                  ...getColumnSearchProps('consumption'),
                  width:'120px'

                },
                {
                  title: 'Feature Code',
                  dataIndex: 'featureCode',
                  key: 'featureCode',
                  sorter: (a, b) => {
                    const valueA = a.featureCode || '';
                    const valueB = b.featureCode || '';
                    return valueA.localeCompare(valueB);
                  },
                  sortDirections: ['descend', 'ascend'],
                  width:'120px'

                },
                
                {
                  title:'Option Group',
                  dataIndex:'optionGroup',
                  sorter: (a, b) => {
                    const valueA = a.optionGroup || '';
                    const valueB = b.optionGroup || '';
                    return valueA.localeCompare(valueB);
                  },
                  sortDirections: ['descend', 'ascend'],
                  ...getColumnSearchProps('optionGroup'),
                  width:'120px'



                },
      
              ]
      
      return(
        <Card title='Substitution' extra={<span><Button onClick={()=>navigate('/product-structure/substitution' )} type={'primary'}>New</Button></span>}>
<>
<Card><Form onFinish={getSubstitution} form={form} layout='vertical'>
<Row gutter={24}>
<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
  <Form.Item name='fgItemCode' label='Fg ItemCode'>
    <Select showSearch placeholder="Select Fg ItemCode" optionFilterProp="children" allowClear>
{
  Value?.map((e:any)=>{
    return<Option key={e.fg_item_id} value={e.fg_item_code}>{e.fg_item_code}

    </Option>
  })
}
    </Select>

  </Form.Item>
</Col>

<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
  <Form.Item name='itemCode' label='Rm ItemCode'>
    <Select showSearch placeholder="Select Rm ItemCode" optionFilterProp="children" allowClear>
{
  itemData?.map((e:any)=>{
return<Option key={e.item_code} value={e.item_code}>{e.itemCode}

</Option>
  })
}
    </Select>

  </Form.Item>
</Col>
<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '15px' }}>
                        <Form.Item>
                            <Button htmlType="submit"
                                icon={<SearchOutlined />}
                                type="primary">GET DETAILS</Button>
                            <Button
                                htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={resetHandler}
                            >
                                RESET
                            </Button>
                        </Form.Item>
                    </Col>
</Row>
</Form>
<>
<Table  size='small'

rowKey={record => record}
className='custom-table-wrapper'
  columns={columnsSkelton}
  dataSource={data}


  pagination={{
    pageSize: 50,
    onChange(current, pageSize) {
        setPage(current);
        setPageSize(pageSize);
    }
}}
   scroll={{x: 'max-content',y:500}}
  // onChange={}
  bordered />
</>

</Card>

</>
        </Card>
      )
    
}
export default SubstituionView




