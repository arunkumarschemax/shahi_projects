import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Select, Form, Tabs } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import AlertMessages from '../../common/common-functions/alert-messages';
import { StyleOrderService } from '@project-management-system/shared-services';
import FormItem from 'antd/es/form/FormItem';
import form from 'antd/es/form';
import { CoRequest, CoUpdateReq, StyleOrderIdReq } from '@project-management-system/shared-models';
import TabPane from 'antd/es/tabs/TabPane';
export interface COAmendmentViewProps{
  // poData:any
  // activeTab:any

}

export const COAmendmentView=(props:COAmendmentViewProps)=>{
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [variantData, setVariantData] = useState<[]>([]);
    const [cono, setCono] = useState(null);
    const [form] = Form.useForm();
    const [selectedItemNo, setSelectedItemNo] = useState();
    const [searchClicked, setSearchClicked] = useState(false);
    const [ChangeQuantity, setChangeQuantity] = useState<any[]>([]);
    const [co, setco] = useState<any[]>([]);
    const [ChangeDeliveryDate, setChangeDeliveryDate] = useState<any[]>([]);
    const [hangeOrderLine, setChangeOrderLine] = useState([]);
   const [ChangeFOB, setChangeFOB] = useState([]);
   const [Number, setNumber] = useState<any[]>([]);
   const [ChangeDestinationAddress, setChangeDestinationAddress] = useState([]);
   const [coLineInfodata, setCoLineInfoData] = useState<any[]>([]);
    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const columns = useState('');
    const navigate = useNavigate()
    const { Option } = Select;

    useEffect(()=>{
        getCoamendment();
        getCoNum();
        getParameter();
          },[])


const service = new StyleOrderService();

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

function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');

  };

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  // const getCoLineData = () =>{
  //   const req = new StyleOrderIdReq(props?.poData[0]?.coId)
  //   service.getCoamendment(req).then((res) => {
  //     if (res.status) {
  //       setCoLineInfoData(res.data);
  //      }
  //   });

  // }

  // const getData=(rowData)=>{
  //   if(!changeOrderLine ){
  //     AlertMessages.getErrorMessage("Please Enter the CO Line");
  //       return
 
  //    }
  //    const req = new CoUpdateReq(rowData.coId,rowData.coLineId,rowData.orderNumber,rowData.coLineNumber,coLineData,"orderline",JSON.parse(localStorage.getItem('currentUser')).user.userName)

  // }

  const getCoNum=()=>{
    service.getconumbered().then(res=>{
      console.log(res,"::::::::::::::");
      if(res){
        setCono(res.data)
      }
     
    })
  }

  const getParameter=()=>{
    service.getcoparameter().then(res=>{    
      console.log(res,"[[[[[[[[[[");
        
    if(res){
      setNumber(res.data)
    }
    })
  }
  // const getParameter=()=>{
  //   service.getcoparameter().then(res=>{
  //     console.log(res,"::::::::::::::");
  //     if(res){
  //       setNumber(res.data)
  //     }
     
  //   })
  // }
  const getCoamendment=()=>{

    const req= new CoRequest()
    if(form.getFieldValue('co_number') !== undefined){
        req.coNumber=form.getFieldValue('co_number')
      }
      if(form.getFieldValue('parameter') !== undefined){
        req.parameter=form.getFieldValue('parameter')
      }
    service.getCoamendment().then(res=>{
      // console.log(res,"&&&&&");
      
        if(res.status){
            setVariantData(res.data)
        }else{
            AlertMessages.getErrorMessage(res.internalMessage);

        }
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
        setVariantData([]);
      })
  }

 
  const resetHandler = () => {
    form.resetFields();
    getCoamendment();

}
// const search=()=>{
//   const req = new CoRequest()
//   if(form.getFieldValue('coNumber') != undefined) {
//     req.coNumber=selectedItemNo
//     setSearchClicked(true);
//   }
//   service.getCoamendment().then((res)=>{
//     console.log(res,"..........");
    
//     if(res.status){
//       setco(res.data)
//         const ChangeOrderLine =res.data.filter((co)=> co.parameter === 'Change Order Line')
//         const ChangeFOB =res.data.filter((co)=> co.parameter === 'Change FOB')
//         const ChangeDeliveryDate =res.data.filter((co)=> co.parameter === 'Change Delivery Date')
//         const ChangeQuantity =res.data.filter((co)=> co.parameter === 'Change Quantity')
//         const ChangeVPONumber =res.data.filter((co)=> co.parameter === 'Change VPO Number')
//         const ChangeDestinationAddress =res.data.filter((co)=> co.parameter === 'Change Destination Address')
//         setChangeOrderLine(ChangeOrderLine)
//         setChangeFOB(ChangeFOB)
//         setChangeDeliveryDate(ChangeDeliveryDate)
//         setChangeQuantity(ChangeQuantity)
//         setChangeVPONumber(ChangeVPONumber)
//         setChangeDestinationAddress(ChangeDestinationAddress)
//     }else{
//         setco([])
//         setChangeOrderLine([])
//         setChangeFOB([])
//         setChangeQuantity([])
//         setChangeVPONumber([])
//         setChangeDeliveryDate([])
//         setChangeDestinationAddress([])
//     } 
//     if(res){
//         setCono(res.data)
//     }
//   })
// }
const columnsSkelton:any=[
    {
        title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1) 
    },

    {
        title:'Co Number',
        dataIndex: 'coNumber',
        sortDirections: ['descend', 'ascend'],
    },
    {
        title:'Co LineNumber',
        dataIndex: 'coLineNumber',
        ...getColumnSearchProps('coLineNumber')
      },
      {
        title:'Old Value',
        dataIndex: 'oldValue',
        ...getColumnSearchProps('oldValue'),
        sorter: (a, b) => a.oldValue.localeCompare(b.oldValue),
        sortDirections: ['descend', 'ascend'],     },
    {
        title:'Updated Value',
        dataIndex: 'updatedValue',
        ...getColumnSearchProps('updatedValue'),
        sorter: (a, b) => a.updatedValue.localeCompare(b.updatedValue),
        sortDirections: ['descend', 'ascend'],     },
    {
        title:'Co Parameter',
        dataIndex: 'parameter',
        // ...getColumnSearchProps('parameter'),
        sorter: (a, b) => a.parameter.localeCompare(b.parameter),
        sortDirections: ['descend', 'ascend'],    },
    {
        title:'Status',
        dataIndex: 'status',
        filters: [
            {
              text: 'CLOSED',
              value: 'CLOSED',
            },
            {
              text: 'COMPLETED',
              value: 'COMPLETED',
            },
            {
                text: 'CONFIRMED',
                value: 'CONFIRMED',
              },
              {
                text: 'IN_PROGRESS',
                value: 'IN_PROGRESS',
              },
          ],
          filterMultiple: false,
          onFilter: (value, record) => 
          {
            // === is not work
            return record.isActive === value;
          },
    },
]




return (
    <Card title='CoAmendment' extra={<span><Button onClick={()=>('/materialCreation/co-amendment')} type={'primary'}>New</Button></span>}>
<br/>
<Card>
<Form onFinish={getCoamendment} form={form} layout='vertical'>

    <Row gutter={16}>
    <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 5 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                style={{ flexDirection: "row" }}
                label="Co Number"
                name="co_number"
              >
                <Select
                  placeholder="Select Co Number"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                //   onChange={(val, text) => (val, text)}
                >
                  {cono?.map((e) => {
                    return (
                      <Option key={e.co_number} value={e.co_number} >
                        {e.coNumber}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              </Col>
              <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 5 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                style={{ flexDirection: "row" }}
                label="Co Parameter"
                name="parameter"
              >
                <Select
                  placeholder="Select Co Number"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                //   onChange={(val, text) => (val, text)}
                >
                  {Number?.map((e) => {
                    return (
                      <Option key={e.parameter
                      } value={e.parameter
                      } >
                        {e.parameter
}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              </Col>
              <Row>
              <Col>
                <FormItem style={{ flexDirection: "row" }} label=" ">
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    // onClick={search}
                  >
                    Search
                  </Button>
                  {/* </Col>      
               <Col
               > */}
                  <Button
                    type="default"
                    icon={<UndoOutlined />}
                    style={{ color: "red", marginLeft: "10px" }}
                    onClick={resetHandler}
                  >
                    Reset
                  </Button>
                </FormItem>
              </Col>
              </Row>
    </Row>
    {/* <Tabs type={'card'} tabPosition={'top'}> */}
     {/* <TabPane key="orderline" tab={<span style={{fontSize:'15px'}}><b>{`Change Order Line`}</b></span>}> */}
     </Form>
        <Table size='small'
             columns={columnsSkelton}
             dataSource={variantData}
             pagination={{
                onChange(current) {
                  setPage(current);
                }
              }}
              scroll={{x:true}}
            //   onChange={onChange}
              bordered 
                       />
                        {/* </TabPane> */}

                        {/* <TabPane key="fob" tab={<span style={{fontSize:'15px'}}><b>{`Change FOB`}</b></span>}>
        <Table size='small'
             columns={columnsSkelton}
             dataSource={ChangeFOB}
             pagination={{
                onChange(current) {
                  setPage(current);
                }
              }}
              scroll={{x:true}}
            //   onChange={onChange}
              bordered 
                       />
                        </TabPane> */}

                        {/* <TabPane key="deliverydate" tab={<span style={{fontSize:'15px'}}><b>{`Change Delivery Date`}</b></span>}>
        <Table size='small'
             columns={columnsSkelton}
             dataSource={ChangeDeliveryDate}
             pagination={{
                onChange(current) {
                  setPage(current);
                }
              }}
              scroll={{x:true}}
            //   onChange={onChange}
              bordered 
                       />
                          </TabPane> */}

                        {/* <TabPane key="quantity" tab={<span style={{fontSize:'15px'}}><b>{`Change Quantity`}</b></span>}>
        <Table size='small'
             columns={columnsSkelton}
             dataSource={ChangeQuantity}
             pagination={{
                onChange(current) {
                  setPage(current);
                }
              }}
              scroll={{x:true}}
            //   onChange={onChange}
              bordered 
                       />
                          </TabPane> */}
{/* 
                <TabPane key="destination" tab={<span style={{fontSize:'15px'}}><b>{`Change Destination Address`}</b></span>}>
        <Table size='small'
             columns={columnsSkelton}
             dataSource={ChangeDestinationAddress}
             pagination={{
                onChange(current) {
                  setPage(current);
                }
              }}
              scroll={{x:true}}
            //   onChange={onChange}
              bordered 
                       />
                 </TabPane> */}

        {/* </Tabs> */}

    </Card>
</Card>
)
}

export default COAmendmentView;