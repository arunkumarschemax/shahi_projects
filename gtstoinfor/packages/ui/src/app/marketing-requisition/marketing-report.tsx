import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { SizeService, ColourService } from "@project-management-system/shared-services";
import { Button, Card, Col, Input, Row, Select, Table,Form } from "antd"
import { Excel } from "antd-table-saveas-excel";
import form from "antd/es/form";
import { ColumnProps, ColumnType } from "antd/es/table"
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import './marketing-requisition.css'
import { table } from "console";

export const MarketingReqReport = () => {
    const [page, setPage] = React.useState(1);
    const [searchText, setSearchText] = useState(''); 
    const [searchedColumn, setSearchedColumn] = useState('');
    const [size, setSize] = useState<any[]>([])
  const [color, setColor] = useState<any[]>([])
    const searchInput = useRef(null);
    const navigate = useNavigate()
    const { Option } = Select;
    const sizeService = new SizeService
  const colorService = new ColourService
  const [form] = Form.useForm()
  const [tableData, setTableData] = useState<any[]>([])

  useEffect(() => {
    setTableData(data1);
    // getReqNo();
  }, []);

  const [data1,setData] = useState<any[]>([
    {
      trimType: "Button",
      trimCode: "BTN001",
      description: "Metallic Gold Button",
      size: "1cm", // Size in centimeters
      color: "Gold",
      quantity: 100,
      remarks: "Shiny finish",
      status: "OPEN",
      isActive: "true"
    },
    {
      trimType: "Zipper",
      trimCode: "ZIP002",
      description: "Nylon Zipper",
      size: "20cm", // Size in centimeters
      color: "Black",
      quantity: 50,
      remarks: "Water-resistant",
      status: "COMPLETED",
      isActive: "false"
    },
    {
      trimType: "Thread",
      trimCode: "THR003",
      description: "Cotton Sewing Thread",
      size: "100m", // Size in meters
      color: "White",
      quantity: 200,
      remarks: "Strong and durable",
      status: "OPEN",
      isActive: "true"
    },
    {
      trimType: "Fabric",
      trimCode: "FAB004",
      description: "Cotton Blend Fabric",
      size: "2.5m", // Size in meters
      color: "Blue",
      quantity: 30,
      remarks: "Soft and breathable",
      status: "INPROGRESS",
      isActive: "true"
    },
])

const OnReset = () => {
    form.resetFields()
    setData([])

}

    const getSize = () =>{
        sizeService.getAllActiveSize().then((res)=>{
            if(res.status){
                setSize(res.data)
            }
        })
      }
    
      const getColor = () =>{
        colorService.getAllActiveColour().then((res)=>{
            if(res.status){
                setColor(res.data)
            }
        })
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

      const onReset = () => {
        form.resetFields()
        setTableData(data1)
    }

    const onSearch = () => {
        let searchData;
        if(form.getFieldValue('status') !== undefined){
            searchData = data1.filter(e => e.status == form.getFieldValue('status'))
            setTableData(searchData)
        } 
        if(form.getFieldValue('trimType') !== undefined){
            searchData = data1.filter(e => e.trimType == form.getFieldValue('trimType'))
            setTableData(searchData)
        }
        if(form.getFieldValue('trimCode') !== undefined){
            searchData = data1.filter(e => e.trimCode == form.getFieldValue('trimCode'))
            setTableData(searchData)
        } 
        if(form.getFieldValue('size') !== undefined){
            searchData = data1.filter(e => e.size == form.getFieldValue('size'))
            setTableData(searchData)
        }
        if(form.getFieldValue('color') !== undefined){
            searchData = data1.filter(e => e.color == form.getFieldValue('color'))
            setTableData(searchData)
        }
    }
    

    const columns : ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
          },
          {
            title: 'Trim Type',
            dataIndex: 'trimType',
            // responsive: ['lg'],
            // sorter: (a, b) => a.trimType.localeCompare(b.trimType),
            // sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('trimType')
          },
          {
            title: 'Trim Code',
            dataIndex: 'trimCode',
            // responsive: ['lg'],
            // sorter: (a, b) => a.trimCode.localeCompare(b.trimCode),
            // sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('trimCode')
          },
          {
            title: 'Description',
            dataIndex: 'description',
            // responsive: ['lg'],
          //   sorter: (a, b) => a.description.localeCompare(b.description),
          //   sortDirections: ['descend', 'ascend'],
          //   ...getColumnSearchProps('description')
          },
          {
            title: 'Size',
            dataIndex: 'size',
            // responsive: ['lg'],
            // sorter: (a, b) => a.size.localeCompare(b.size),
            // sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('size')
          },
          {
            title: 'Color',
            dataIndex: 'color',
            // responsive: ['lg'],
            // sorter: (a, b) => a.color.localeCompare(b.color),
            // sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('color')
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
            // responsive: ['lg'],
            // sorter: (a, b) => a.quantity.localeCompare(b.quantity),
            // sortDirections: ['descend', 'ascend'],
          //   ...getColumnSearchProps('quantity')
          },
          {
            title: 'Remarks',
            dataIndex: 'remarks',
            // responsive: ['lg'],
          //   sorter: (a, b) => a.quantity.localeCompare(b.quantity),
          //   sortDirections: ['descend', 'ascend'],
          //   ...getColumnSearchProps('quantity')
          },
          {
              title: 'Status',
              dataIndex: 'status',
            //   filters: [
            //       {
            //         text: 'Open',
            //         value: "OPEN",
            //       },
            //       {
            //         text: 'In Progress',
            //         value: "INPROGRESS",
            //       },
            //       {
            //         text: 'Completed',
            //         value: "COMPLETED",
            //       },
            //     ],
            },
    ]

    const exportedData = [];
    const excelData = data1
    let i = 1;
    const data = [
      { title: 'S No', dataIndex: 'sNo', render: (text:any, object:any, index:any) => { return i++; } },
      { title: 'Trim Type', dataIndex: 'trimType',render:(text:any,record:any) => {return record.trimType ? record.trimType : '-'} },
      { title: 'Trim Code', dataIndex: 'trimCode',render:(text:any,record:any) => {return record.trimCode ? record.trimCode : '-'} },
      { title: 'Trim Description', dataIndex: 'description',render:(text:any,record:any) => {return record.description ? record.description : '-'} },
      { title: 'Size', dataIndex: 'size',render:(text:any,record:any) => {return record.size ? record.size : '-'} },
      { title: 'Color', dataIndex: 'color',render:(text:any,record:any) => {return record.color ? record.color : '-'} },
      { title: 'Quantity', dataIndex: 'quantity',render:(text:any,record:any) => {return record.quantity ? record.quantity : '-'} },
      { title: 'Status', dataIndex: 'status',render:(text:any,record:any) => {return record.status ? record.status : '-'} },
      { title: 'Remarks', dataIndex: 'remarks',render:(text:any,record:any) => {return record.remarks ? record.remarks : '-'} },

     
    ];

    const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet('Marketing Requisition Report')
          .addColumns(data)
          .addDataSource(data1, { str2num: true })
          .saveAs('Marketing Requisition Report.xlsx');
    }
    return(
        <Card headStyle={{ backgroundColor: '#69c0ff', border: 0 }} title='Marketing Requisition Report' style={{textAlign:"center"}}  extra={data1.length > 0 ? (
            <>
              <Button className='panel_button' style={{backgroundColor:'green',color:'white'}} onClick={() => exportExcel()}>Get Excel</Button>
            </>
          ) : (<></>)}>
            <Form layout="vertical" form={form} >
                <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item label='Trim Type' name='trimType'>
                        <Select
                            showSearch
                            placeholder="Select Trim Type"
                            optionFilterProp="children"
                            allowClear
                        >
                            <Option value="Button">Button</Option>
                        <Option value="Zipper">Zipper</Option>
                        <Option value="Thread">Thread</Option>
                        <Option value="Fabric">Fabric</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item label='Trim Code' name='trimCode'>
                        <Select
                            showSearch
                            placeholder="Select Trim Code"
                            optionFilterProp="children"
                            allowClear
                        >
                        <Option value="BTN001">BTN001</Option>
                        <Option value="ZIP002">ZIP002</Option>
                        <Option value="THR003">THR003</Option>
                        <Option value="FAB004">FAB004</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item label='Size' name='size'>
                        <Select
                            showSearch
                            placeholder="Select Size"
                            optionFilterProp="children"
                            allowClear
                        >
                            <Option value="1cm">1cm</Option>
                        <Option value="20cm">20cm</Option>
                        <Option value="100m">100m</Option>
                        <Option value="2.5m">2.5m</Option>  
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item label='Color' name='colorId'>
                        <Select
                            showSearch
                            placeholder="Select Color"
                            optionFilterProp="children"
                            allowClear
                        >
                            <Option value="Gold">Gold</Option>
                        <Option value="Black">Black</Option>
                        <Option value="White">White</Option>
                        <Option value="Blue">Blue</Option>  
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }}>
                    <Form.Item label='Status' name='status'>
                        <Select
                            showSearch
                            placeholder="Select Status"
                            optionFilterProp="children"
                            allowClear
                            // defaultValue='All'
                        >
                            <Option value="OPEN">Open</Option>
                        <Option value="INPROGRESS">In Progress</Option>
                        <Option value="Completed">Completed</Option>  
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item>
                        <Button icon={<SearchOutlined />} htmlType="submit" type='primary' className='panel_button' onClick={onSearch}>Search</Button>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 1 }} style={{marginTop:'2%'}}>
                    <Form.Item>
                        <Button danger icon={<UndoOutlined />} onClick={onReset}>Reset</Button>
                    </Form.Item>
                    </Col>
                    
                </Row>
            </Form>

            <Table className='custom-table-wrapper' columns={columns} dataSource={tableData} scroll={{ x: 'max-content' }} pagination={{
                    onChange(current) {
                        setPage(current);
                    }

                }}/>
        </Card>
    )
}

export default MarketingReqReport