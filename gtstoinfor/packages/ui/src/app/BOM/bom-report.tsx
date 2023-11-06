// import React, { useState, useEffect, useRef } from 'react';
// import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Form, Select, DatePicker } from 'antd';
// import Highlighter from 'react-highlight-words';
// import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
// import { Link, useNavigate } from 'react-router-dom';
// import AlertMessages from '../common/common-functions/alert-messages';
// import moment from 'moment';


// const BomReport=() =>{
//     const [searchText, setSearchText] = useState('');
//     const [searchedColumn, setSearchedColumn] = useState('');
//     const searchInput = useRef(null);
//     const [page, setPage] = React.useState(1);
//     const navigate = useNavigate();
//     const [form] = Form.useForm();


//     useEffect(()=>{

//     },[])

//     const resetHandler = () => {
//         form.resetFields();
    
    
//     }
//     const columnsSkelton:any=[
    
//         {
//             title: 'S No',
//             key: 'sno',
//             responsive: ['sm'],
//             render: (text, object, index) => (page - 1) * 10 + (index + 1)
//           },

//           {
//             title:'Fg ItemCode',
//             dataIndex:'fgItemCode',

//           },
//           {
//             title:'Fg Sku',
//             dataIndex:'fgSku',

//           },
//           {

//             title:'Rm ItemCode',
//             dataIndex:'rmItemCode',

//           },
//           {
//             title:'Rm Sku',
//             dataIndex:'rmSku',
//           }

//         ]

//         return(
//             <>
//             <Card title={<span>Substitution</span>} style={{textAlign:'center'}} headStyle={{border:0}}
//             extra={<Link to='/'>
//       <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>

//       </Link>}>
//             <Card>
//                 <Form form={form} layout='vertical'>
//              <Row gutter={24}>
//              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
//                 <Form.Item name='' label='Fg ItemCode'>
//                <Select showSearch placeholder="Select Fg ItemCode" optionFilterProp="children" allowClear>
//           {

//             }
//                </Select>
//                 </Form.Item>
//             </Col>
//             <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
//                 <Form.Item name='' label='Rm ItemCode'>
//                <Select showSearch placeholder="Select Rm ItemCode" optionFilterProp="children" allowClear>
//           {

//             }
//                </Select>
//                 </Form.Item>
//             </Col>

//             <Col >
//                        <Form.Item>
//                        <Button
//   htmlType="submit"
//   icon={<SearchOutlined />}
//   type="primary"
//   style={{ marginBottom: '20px' }}
// >
//   GET DETAILS
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
