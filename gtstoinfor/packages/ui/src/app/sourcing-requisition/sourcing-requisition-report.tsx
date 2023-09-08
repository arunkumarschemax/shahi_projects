import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Table, Form, Select, DatePicker } from "antd"
import { Excel } from "antd-table-saveas-excel";
import { ColumnProps, ColumnType } from "antd/es/table"
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import {  useNavigate } from "react-router-dom";
import './sourcing-requisition.css'

const {Option} = Select
const { RangePicker } = DatePicker;


export const SorcingRequisitionReport = () => {
    const [page, setPage] = React.useState(1);
    const [searchText, setSearchText] = useState(''); 
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const [data,setData] = useState<any[]>([
        {
            content:'Natural Fabrics',
            fabricType:'Cotton',
            weave:'Plain Weave',
            weigth:'100kg',
            width:'100',
            construction:'Cotton',
            yarnCount:'100',
            finish:'shrink resistance treatment',
            shrinkage:'2-3 %',
            color:'Blue',
            pch:'Srinivas',
            moq:'100 Pieces',
            season:'Summer',
            moqPrice:'100 INR',
            supplier:'Rajesh',
            grnDate:'09-08-2023',
            buyer:'Naidu',
            xlNo:'24',
            status:'OPEN'
        },
        {
            content:'Natural Fabrics',
            fabricType:'Slik',
            weave:'Plain Weave',
            weigth:'200kg',
            width:'100',
            construction:'Cotton',
            yarnCount:'100',
            finish:'embossed treatment',
            shrinkage:'2-3 %',
            color:'Green',
            pch:'Srinivas',
            moq:'250 Pieces',
            season:'Spring',
            moqPrice:'100 INR',
            supplier:'Rajesh',
            grnDate:'09-08-2023',
            buyer:'Naidu',
            xlNo:'24',
            status:'OPEN'
  
        },
        {
            content:'Natural Fabrics',
            fabricType:'Wool',
            weave:'Basket Weave',
            weigth:'100kg',
            width:'100',
            construction:'Cotton',
            yarnCount:'100',
            finish:'bulletproofing',
            shrinkage:'2-3 %',
            color:'Yellow',
            pch:'Srinivas',
            moq:'200 Pieces',
            season:'Winter',
            moqPrice:'100 INR',
            supplier:'Rajesh',
            grnDate:'09-08-2023',
            buyer:'Naidu',
            xlNo:'24',
            status:'COMPLETED'
  
        },
        {
            content:'Natural Fabrics',
            fabricType:'Cotton',
            weave:'Checked Weave',
            weigth:'250kg',
            width:'100',
            construction:'Cotton',
            yarnCount:'100',
            finish:'shrink resistance treatment',
            shrinkage:'2-3 %',
            color:'White',
            pch:'Srinivas',
            moq:'100 Pieces',
            season:'Summer',
            moqPrice:'100 INR',
            supplier:'Rajesh',
            grnDate:'09-08-2023',
            buyer:'Naidu',
            xlNo:'24',
            status:'INPROGRESS'
  
        }
    ])

    const onReset = () => {
        form.resetFields()
    }

    const onSearch = () => {
        // let tableData;
        // console.log(form.getFieldValue('status'))
        // if(form.getFieldValue('status') !== undefined){
        //     tableData = data.filter(e => e.status == form.getFieldValue('status'))
        //     setData(tableData)
        // }
    }


    const getColumnSearchProps = (dataIndex:any): ColumnType<string> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={ searchInput }
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
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
            .includes((value as string).toLowerCase()):false,
        onFilterDropdownVisibleChange: visible => {
          if (visible) {    setTimeout(() => searchInput.current.select());   }
        },
        render: text =>
          text ?(
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) :text
          )
          : null
         
      });

      function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      function handleReset(clearFilters) {
        clearFilters();
        setSearchText('');
      };
    

    const columns : ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            // width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:'Content',
            dataIndex:'content'
        },
        {
            title:'Fabric Type',
            dataIndex:'fabricType',
            // ...getColumnSearchProps('fabricType')
        },
        {
            title:'Weave',
            dataIndex:'weave',
            // ...getColumnSearchProps('weave')

        },
        {
            title:'Weight',
            dataIndex:'weigth'
        },
        {
            title:'Width',
            dataIndex:'width'
        },
        {
            title:'Construction',
            dataIndex:'construction'
        },
        {
            title:'Yarn Count',
            dataIndex:'yarnCount'
        },
        {
            title:'Finish',
            dataIndex:'finish'
        },
        {
            title:'Shrinkage',
            dataIndex:'shrinkage'
        },
        {
            title:'Color',
            dataIndex:'color',
            // ...getColumnSearchProps('color')

        },
        {
            title:'PCH',
            dataIndex:'pch',
            // ...getColumnSearchProps('pch')

        },
        {
            title:'MOQ',
            dataIndex:'moq'
        },
        {
            title:'Season',
            dataIndex:'season',
            // ...getColumnSearchProps('season')

        },
        {
            title:'MOQ Price',
            dataIndex:'moqPrice'
        },
        {
            title:'Supplier',
            dataIndex:'supplier',
            // ...getColumnSearchProps('supplier')

        },
        {
            title:'GRN Date',
            dataIndex:'grnDate'
        },
        {
            title:'Buyer',
            dataIndex:'buyer',
            // ...getColumnSearchProps('buyer')
        },
        {
            title:'XL No',
            dataIndex:'xlNo'
        },
        {
          title:'Status',
          dataIndex:'status'
        }
    ]

    const exportedData = [];
    const excelData = data
    let i = 1;
    const reportData = [
      { title: 'S No', dataIndex: 'sNo', render: (text:any, object:any, index:any) => { return i++; } },
      { title: 'Content', dataIndex: 'content',render:(text:any,record:any) => {return record.content ? record.content : '-'} },
      { title: 'Fabric Type', dataIndex: 'fabricType',render:(text:any,record:any) => {return record.fabricType ? record.fabricType : '-'} },
      { title: 'Weave', dataIndex: 'weave',render:(text:any,record:any) => {return record.weave ? record.weave : '-'} },
      { title: 'Weigth', dataIndex: 'weigth',render:(text:any,record:any) => {return record.weigth ? record.weigth : '-'} },
      { title: 'Width', dataIndex: 'width',render:(text:any,record:any) => {return record.width ? record.width : '-'} },
      { title: 'Construction', dataIndex: 'construction',render:(text:any,record:any) => {return record.construction ? record.construction : '-'} },
      { title: 'Yarn Count', dataIndex: 'yarnCount',render:(text:any,record:any) => {return record.yarnCount ? record.yarnCount : '-'} },
      { title: 'Finish', dataIndex: 'finish',render:(text:any,record:any) => {return record.finish ? record.finish : '-'} },
      { title: 'Shrinkage', dataIndex: 'shrinkage',render:(text:any,record:any) => {return record.shrinkage ? record.shrinkage : '-'} },
      { title: 'Color', dataIndex: 'color',render:(text:any,record:any) => {return record.color ? record.color : '-'} },
      { title: 'PCH', dataIndex: 'pch',render:(text:any,record:any) => {return record.pch ? record.pch : '-'} },
      { title: 'MOQ', dataIndex: 'moq',render:(text:any,record:any) => {return record.moq ? record.moq : '-'} },
      { title: 'Season', dataIndex: 'season',render:(text:any,record:any) => {return record.season ? record.season : '-'} },
      { title: 'MOQ Price', dataIndex: 'moqPrice',render:(text:any,record:any) => {return record.moqPrice ? record.moqPrice : '-'} },
      { title: 'Supplier', dataIndex: 'supplier',render:(text:any,record:any) => {return record.supplier ? record.supplier : '-'} },
    { title: 'GRN Date', dataIndex: 'grnDate',render: (text:any, record:any) => {
        return (
            <>
                {record.grnDate ? record.grnDate : '-'}
            </>
        )
    } },
    { title: 'Buyer', dataIndex: 'buyer',render:(text:any,record:any) => {return record.buyer ? record.buyer : '-'} },
    { title: 'XL No', dataIndex: 'xlNo',render:(text:any,record:any) => {return record.xlNo ? record.xlNo : '-'} },
    { title: 'Status', dataIndex: 'status',render:(text:any,record:any) => {return record.status ? record.status : '-'} },

     
    ];


    const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet('Sourcing Requisition Report')
          .addColumns(reportData)
          .addDataSource(data, { str2num: true })
          .saveAs('Sourcing Requisition Report.xlsx');
    }
    return(
        <Card title='Sourcing Requistion Report' className="card-header" style={{textAlign:'center',color:'#00ffff'}}  extra={data.length > 0 ? (
            <>
              <Button className='panel_button' style={{backgroundColor:"green",color:'white'}}onClick={() => exportExcel()}>Get Excel</Button>
            </>
          ) : (<></>)}>
            <Form layout="vertical" form={form}>
              <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                    <Form.Item name='fabricType' label='Fabric Type'>
                        {/* <Input placeholder="Enter Fabric Type"/> */}
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Fabric Type'>
                            <Option key='cotton' value='cotton'>Cotton</Option>
                            <Option key='wool' value='wool'>Wool</Option>
                            <Option key='silk' value='silk'>Silk</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                    <Form.Item name='pch' label='PCH'>
                        {/* <Input placeholder="Enter Fabric Type"/> */}
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select PCH'>
                            <Option key='srinivas' value='srinivas'>Srinivas</Option>
                            {/* <Option key='wool' value='wool'>Wool</Option>
                            <Option key='silk' value='silk'>Silk</Option> */}

                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                    <Form.Item name='supplier' label='Supplier'>
                        {/* <Input placeholder="Enter Fabric Type"/> */}
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Supplier'>
                            <Option key='rajesh' value='rajesh'>Rajesh</Option>
                            {/* <Option key='wool' value='wool'>Wool</Option>
                            <Option key='silk' value='silk'>Silk</Option> */}

                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                    <Form.Item name='buyer' label='Buyer'>
                        {/* <Input placeholder="Enter Fabric Type"/> */}
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Buyer'>
                            <Option key='naidu' value='naidu'>Naidu</Option>
                            {/* <Option key='wool' value='wool'>Wool</Option>
                            <Option key='silk' value='silk'>Silk</Option> */}

                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                    <Form.Item name='grnDate' label='GRN Date'>
                        {/* <Input placeholder="Enter Fabric Type"/> */}
                       <RangePicker/>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                    <Form.Item name='status' label='Status'>
                        {/* <Input placeholder="Enter Fabric Type"/> */}
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select status'>
                            <Option key='open' value='OPEN'>OPEN</Option>
                            <Option key='inprogress' value='INPROGRESS'>INPROGRESS</Option>
                            <Option key='completed' value='COMPLETED'>COMPLETED</Option>

                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item>
                        <Button onClick={onSearch} type='primary' icon={<SearchOutlined/>}>Search</Button>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 1 }}  style={{marginTop:'2%'}}>
                    <Form.Item>
                        <Button onClick={onReset} danger icon={<UndoOutlined />}>Reset</Button>
                    </Form.Item>
                </Col>
              </Row>
            </Form>
            <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }} pagination={{
                    onChange(current) {
                        setPage(current);
                    }

                }}/>
        </Card>
    )
}

export default SorcingRequisitionReport