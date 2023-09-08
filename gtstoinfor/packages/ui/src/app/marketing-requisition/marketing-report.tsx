import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { SizeService, ColourService } from "@project-management-system/shared-services";
import { Button, Card, Col, Input, Row, Select, Table,Form } from "antd"
import { Excel } from "antd-table-saveas-excel";
import form from "antd/es/form";
import { ColumnProps, ColumnType } from "antd/es/table"
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";

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

    const [data1,setData] = useState<any[]>([
        {
            trimType: "Button",
            trimCode: "BTN001",
            description: "Metallic Gold Button",
            size: 12,
            color: "Gold",
            quantity: 100,
            remarks: "Shiny finish",
            status: "OPEN"
          },
          {
            trimType: "Zipper",
            trimCode: "ZIP002",
            description: "Nylon Zipper",
            size: 8,
            color: "Black",
            quantity: 50,
            remarks: "Water-resistant",
            status: "CLOSED"
          },
          {
            trimType: "Thread",
            trimCode: "THR003",
            description: "Cotton Sewing Thread",
            size: 40,
            color: "White",
            quantity: 200,
            remarks: "Strong and durable",
            status: "OPEN"
          },
          {
            trimType: "Fabric",
            trimCode: "FAB004",
            description: "Cotton Blend Fabric",
            size: 2.5, // Measured in meters
            color: "Blue",
            quantity: 30,
            remarks: "Soft and breathable",
            status: "INPROGRESS"
          },
    ])

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
            sorter: (a, b) => a.trimType.localeCompare(b.trimType),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('trimType')
          },
          {
            title: 'Trim Code',
            dataIndex: 'trimCode',
            // responsive: ['lg'],
            sorter: (a, b) => a.trimCode.localeCompare(b.trimCode),
            sortDirections: ['descend', 'ascend'],
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
            sorter: (a, b) => a.size.localeCompare(b.size),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('size')
          },
          {
            title: 'Color',
            dataIndex: 'color',
            // responsive: ['lg'],
            sorter: (a, b) => a.color.localeCompare(b.color),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('color')
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
            // responsive: ['lg'],
            sorter: (a, b) => a.quantity.localeCompare(b.quantity),
            sortDirections: ['descend', 'ascend'],
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
              filters: [
                  {
                    text: 'Open',
                    value: "OPEN",
                  },
                  {
                    text: 'In Progress',
                    value: "INPROGRESS",
                  },
                  {
                    text: 'Completed',
                    value: "COMPLETED",
                  },
                ],
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
        <Card title='Marketing Requisition Report' size='small'  extra={data1.length > 0 ? (
            <>
              <Button className='panel_button' type='primary' onClick={() => exportExcel()}>Get Excel</Button>
            </>
          ) : (<></>)}>
            <Form layout="vertical" form={form} >
                <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }}>
                    <Form.Item label='Trim Type' name='trimType'>
                        <Select
                            showSearch
                            placeholder="Select Trim Type"
                            optionFilterProp="children"
                            allowClear
                        >
                            {/* {indentCodes.map((inc: any) => {
                                return <Option key={inc.indent_code} value={inc.indent_code}>{inc.indent_code}</Option>
                            })
                            } */}
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }}>
                    <Form.Item label='Trim Code' name='trimCode'>
                        <Select
                            showSearch
                            placeholder="Select Trim Code"
                            optionFilterProp="children"
                            allowClear
                        >
                            {/* {routes.map((e) => {
                                return <Option key={e.routeId} value={e.routeId}>{e.route}</Option>
                            })
                            }                         */}
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }}>
                    <Form.Item label='Size' name='size'>
                        <Select
                            showSearch
                            placeholder="Select Size"
                            optionFilterProp="children"
                            allowClear
                        >
                            {size.map((e) => {
                                return <Option key={e.sizeId} value={e.sizeId}>{e.size}</Option>
                            })
                            }    
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }}>
                    <Form.Item label='Color' name='colorId'>
                        <Select
                            showSearch
                            placeholder="Select Color"
                            optionFilterProp="children"
                            allowClear
                        >
                            {color.map((e) => {
                                return <Option key={e.colourId} value={e.colourId}>{e.colour}</Option>
                            })
                            } 
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }}>
                    <Form.Item label='Status' name='status'>
                        <Select
                            showSearch
                            placeholder="Select Status"
                            optionFilterProp="children"
                            allowClear
                            defaultValue='All'
                        >
                            {data1.map((e) => {
                                return <Option key={e.status} value={e.status}>{e.colour}</Option>
                            })
                            } 
                        </Select>
                    </Form.Item>
                    </Col>
                    
                </Row>
            </Form>

            <Table columns={columns} dataSource={data1} scroll={{ x: 'max-content' }} pagination={{
                    onChange(current) {
                        setPage(current);
                    }

                }}/>
        </Card>
    )
}

export default MarketingReqReport