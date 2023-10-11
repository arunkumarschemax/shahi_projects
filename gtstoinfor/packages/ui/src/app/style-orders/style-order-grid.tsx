import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, Input, Popconfirm, Row, Select, Switch, Table, Tag } from "antd"
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import AlertMessages from "../common/common-functions/alert-messages";
import { useNavigate } from "react-router-dom";
import { StyleOrderService } from "@project-management-system/shared-services";

export const StyleOrderGrid = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const navigate = useNavigate()
    const {Option} = Select;
    const service = new StyleOrderService()
    const [data,setData] =  useState<any[]>([])


    useEffect(() => {
      getData()
  },[])

  const getData = () => {
      // service.getAllStyleOrders().then(res => {
      //     if(res.status){
      //         setData(res.data)
      //     }
      // })
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
            title: "CO Type",
            dataIndex: "coType",
            width:'100px',
            sorter: (a, b) => a.coType.localeCompare(b.style),
          ...getColumnSearchProps("coType"),
          },
        
        {
          title: "Buyer",
          dataIndex: "buyer",
          width:'150px',
        },
        {
            title: "Buyer style",
            dataIndex: "buyerStyle",
          width:'100px',
            // sorter: (a, b) => a.buyerStyle.localeCompare(b.buyerStyle),
        //   ...getColumnSearchProps("buyerStyle"),
          },
          {
            title: "Buyer PO",
            dataIndex: "buyerPo",
          width:'100px',
            // sorter: (a, b) => a.buyerPo.localeCompare(b.buyerPo),
        //   ...getColumnSearchProps("buyerPo"),
          },
        {
          title: 'CO Num',
          dataIndex: 'coNum',
          width:'100px',
        //   sorter: (a, b) => a.coNum.localeCompare(b.coNum),
        // ...getColumnSearchProps("coNum"),    
     },
     {
        title: "CO Date",
        dataIndex: "coDate",
        width:'150px',
        // sorter: (a, b) => a.coDate.localeCompare(b.coDate),
    //   ...getColumnSearchProps("coDate"),
      },
       {
          title: 'PI PO Qty',
          dataIndex: 'PiPoQty',
          width:'100px',
        //   sorter: (a, b) => a.PiPoQty.localeCompare(b.PiPoQty),
        // ...getColumnSearchProps("PiPoQty"),    
     },
     {
        title: 'Shipped Qty',
        dataIndex: 'shippedQty',
        width:'100px',
        // sorter: (a, b) => a.shippedQty.localeCompare(b.shippedQty),
    //   ...getColumnSearchProps("shippedQty"),    
   },
    {
    title: 'PI Ex-Factory',
    dataIndex: 'PiEx_Factory',
    width:'100px',
    // sorter: (a, b) => a.PiEx_Factory.localeCompare(b.PiEx_Factory),
//   ...getColumnSearchProps("PiEx_Factory"),    
},
{
    title: 'Ac Ex-Factory',
    dataIndex: 'AcEx_Factory',
    width:'100px',
    // sorter: (a, b) => a.AcEx_Factory.localeCompare(b.AcEx_Factory),
//   ...getColumnSearchProps("AcEx_Factory"),    
},
{
    title: 'PI Del Mode',
    dataIndex: 'PiDelMode',
    width:'100px',
    // sorter: (a, b) => a.PiDelMode.localeCompare(b.PiDelMode),
//   ...getColumnSearchProps("PiDelMode"),    
},
{
    title: 'Ac Del Mode',
    dataIndex: 'AcDelMode',
    width:'100px',
    // sorter: (a, b) => a.AcDelMode.localeCompare(b.AcDelMode),
//   ...getColumnSearchProps("AcDelMode"),    
},
{
    title: 'Del Terms',
    dataIndex: 'delTerms',
    width:'100px',
    // sorter: (a, b) => a.delTerms.localeCompare(b.delTerms),
//   ...getColumnSearchProps("delTerms"),    
},
{
    title: 'Remarks',
    dataIndex: 'remarks',
    width:'100px',
    // sorter: (a, b) => a.remarks.localeCompare(b.remarks),
//   ...getColumnSearchProps("remarks"),    
},
      ];

      
    return(
        <Card title='Style Orders' extra={<span><Button onClick={() =>  navigate('/materialCreation/style-order-creation')}
              type={'primary'}>View</Button></span>} >
<Card size='small'>
    <Form>
    <Row gutter={[8,8]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                <Form.Item name='itemNo' label='Item'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Item' >
                        <Option>item1</Option>
                        <Option>item2</Option>

                    </Select>
                </Form.Item>
                </Col>
                </Row>
    </Form>
        <Table
        size='small'
          columns={columnsSkelton}
          dataSource={data}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          scroll={{x:true}}
          bordered />
      </Card>   
      </Card> )
}
export default StyleOrderGrid