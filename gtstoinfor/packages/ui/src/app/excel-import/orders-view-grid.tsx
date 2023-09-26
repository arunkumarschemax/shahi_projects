import { Button, Card, Col, DatePicker, Form, Input, InputRef, Row, Select, Space, Table, Tag, message } from 'antd';
import { useEffect, useRef, useState, } from 'react';
import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { OrdersService } from '@project-management-system/shared-services';
import moment from 'moment';
import FormItem from 'antd/es/form/FormItem';
import Highlighter from 'react-highlight-words';
import { ColumnType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';


const AllOrdersGridView = () => {
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [gridData, setGridData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([])
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const service = new OrdersService();
    const [form] = Form.useForm();
    const { Option } = Select;
    const searchInput = useRef<InputRef>(null);
    const [searchedColumn, setSearchedColumn] = useState("");
    const [searchText, setSearchText] = useState("");

    const { RangePicker } = DatePicker;


    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        service.getOrdersData().then(res => {
            if (res.status) {
                setGridData(res.data)
                setFilteredData(res.data)
            }
        }).catch(err => {
            console.log(err.message)
        })
    }

    const EstimatedETDDate = (value) => {
        if (value) {
            console.log(value)
            const fromDate = value[0].format('YYYY-MM-DD');
            const toDate = value[1].format('YYYY-MM-DD');
            
        }
    }

    const getFilterdData = () => {
        let poOrderStatus = form.getFieldValue('poOrderStatus');
        let selectedDate = selectedEstimatedFromDate;
                let filteredData = gridData;
        if (poOrderStatus) {
            filteredData = filteredData.filter(record => record.po_order_status === poOrderStatus);
            if (filteredData.length === 0) {
                message.error("No Data Found")
            }
            setFilteredData(filteredData);
        }
        if (selectedDate) {
            selectedDate = moment(selectedDate).format('YYYY/MM/DD');
            setFilteredData(filteredData);
            filteredData = filteredData.filter(record => {
                const dateInData = moment(record.planned_exf).format('YYYY/MM/DD');
                return dateInData === selectedDate;
            });
    
          }
          setFilteredData(filteredData);
          if (filteredData.length === 0) {
            message.error("No Data Found");
        }
    }
    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
      };
      const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: string
      ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : any) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() =>{
                  handleReset(clearFilters)
                  setSearchedColumn(dataIndex)
                  confirm({closeDropdown:true})
                }
                   }
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
             
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex] ?record[dataIndex]     
             .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()):false,
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    const onReset = () => {
        form.resetFields();
        setSelectedEstimatedFromDate(undefined);
      
        getData();
    }

    function convertToYYYYMMDD(inputDate) {
        const formatsToTry = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY', 'YYYY-MM-DD'];
        let formattedDate = null;
        for (const format of formatsToTry) {
            const parsedDate = moment(inputDate, format);
            if (parsedDate.isValid()) {
                formattedDate = parsedDate.format('YYYY-MM-DD');
                break;
            }
        }
        return formattedDate;
    }

    const columns: any = [
        
        // {
        //     title: 'Production Plan Id',
        //     dataIndex: 'production_plan_id',
        //     render: (text) => (text ? text : '-')

            
        // },
        {
            title: 'S.No',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            width: 150,

        },
        
        {
            title: 'Biz',
            dataIndex: 'biz',
            render: (text) => (text ? text : '-'),
            // width: '9%',
            width: 150,
            sorter: (a, b) => {
                const aValue = a.biz || ''; 
                const bValue = b.biz || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Department',
            dataIndex: 'department',
            render: (text) => (text ? text : '-'),
            // width: '9%',
            width: 200,

      ...getColumnSearchProps("department"),
      sorter: (a, b) => {
        const aValue = a.department || ''; 
        const bValue = b.department || ''; 
        return aValue.localeCompare(bValue);
    },
    sortDirections: ["descend", "ascend"],
        },

        {
        title:'Planning Sum Code',
        dataIndex:'planning_sum_code',
        render: (text) => (text ? text : '-'),
        width: 200,

        ...getColumnSearchProps("planning_sum_code"),
        sorter: (a, b) => {
            const aValue = a.planning_sum_code || ''; 
            const bValue = b.planning_sum_code || ''; 
            return aValue.localeCompare(bValue);
        },
        sortDirections: ["descend", "ascend"],
    },
        
        {
            title: 'Planning Sum',
            dataIndex: 'planning_sum',
            render: (text) => (text ? text : '-'),
            // width: '9%',
            width: 200,

            ...getColumnSearchProps("planning_sum"),
            sorter: (a, b) => {
                const aValue = a.planning_sum || ''; 
                const bValue = b.planning_sum || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Item ',
            dataIndex: 'item',
            render: (text) => (text ? text : '-'),
            // width: '9%',
            width: 250,

            ...getColumnSearchProps("item"),
            sorter: (a, b) => {
                const aValue = a.item || ''; 
                const bValue = b.item || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
        },
        // {
        //     title: 'Vendor ',
        //     dataIndex: 'vendor',
        //     render: (text) => (text ? text : '-')

        // },
        {
            title: 'Fr Fabric',
            dataIndex: 'fr_fabric',
            render: (text) => (text ? text : '-'),
            // width: '9%',
            width: 250,

            ...getColumnSearchProps("fr_fabric"),
            sorter: (a, b) => {
                const aValue = a.fr_fabric || ''; 
                const bValue = b.fr_fabric || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
        },

        // {
        //     title: 'Branch Factory',
        //     dataIndex: 'branchFactory',
        //     render: (text) => (text ? text : '-')

           
        // },
        {
            title: 'Coeff',
            dataIndex: 'coeff',
            render: (text) => (text ? text : '-'),
            // width: '9%',
            width: 100,

            sorter: (a, b) => {
                const aValue = a.coeff || ''; 
                const bValue = b.coeff || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
        },
       
        {
            title: 'Publish Date',
            dataIndex: 'publish_date',
            // width: '9%',
            width: 100,

            render: (text, record) => {
                return record.publish_date ? convertToYYYYMMDD(record.publish_date) : '-'
            }
        },

        {
            title:'Order Plan Number',
            dataIndex:'order_plan_number',
            // width: '9%',
            width: 150,

            render: (text) => (text ? text : '-'),
            ...getColumnSearchProps("order_plan_number"),
            sorter: (a, b) => {
                const aValue = a.order_plan_number || ''; 
                const bValue = b.order_plan_number || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
         },
        {
            title: 'GWH',
            dataIndex: 'gwh',
            // width: '9%',
            width: 100,

            render: (text) => (text ? text : '-'),
            ...getColumnSearchProps("gwh"),

            sorter: (a, b) => {
                const aValue = a.gwh || ''; 
                const bValue = b.gwh || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'WH',
            dataIndex: 'wh',
            // width: '9%',
            width: 100,

            render: (text) => (text ? text : '-'),
            
            sorter: (a, b) => {
                const aValue = a.wh || ''; 
                const bValue = b.wh || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
           
        },
        {
            title: 'Transport Mthd',
            dataIndex: 'trnsp_mthd',
            // width: '9%',
            width: 150,

            render: (text) => (text ? text : '-'),

            ...getColumnSearchProps("trnsp_mthd"),

        },
        {
            title: 'Raw Material Supplier',
            dataIndex: 'raw_material_supplier',
            render: (text) => (text ? text : '-'),
            ...getColumnSearchProps("raw_material_supplier"),

            width: 250,

            sorter: (a, b) => {
                const aValue = a.raw_material_supplier || ''; 
                const bValue = b.raw_material_supplier || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
           
        },
        {
            title: 'Yarn Order Status',
            dataIndex: 'yarn_order_status',
            // width: '9%',
            render: (text) => (text ? text : '-'),
            width: 250,
            ...getColumnSearchProps("yarn_order_status"),
            sorter: (a, b) => {
                const aValue = a.yarn_order_status || ''; 
                const bValue = b.yarn_order_status || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
           
        },
        {
            title: 'Fabric Order Status',
            dataIndex: 'fbrc_order_status',
            // width: '9%',
            render: (text) => (text ? text : '-'),
            width: 250,
            ...getColumnSearchProps("fbrc_order_status"),

        },
        {
            title: 'Color Order Status',
            dataIndex: 'color_order_status',
            // width: '9%',
            render: (text) => (text ? text : '-'),
            width: 250,
            ...getColumnSearchProps("color_order_status"),
            sorter: (a, b) => {
                const aValue = a.color_order_status || ''; 
                const bValue = b.color_order_status || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Trim Order Status',
            dataIndex: 'trim_order_status',
            // width: '9%',
            render: (text) => (text ? text : '-'),
            width: 250,
            ...getColumnSearchProps("trim_order_status"),
            sorter: (a, b) => {
                const aValue = a.trim_order_status || ''; 
                const bValue = b.trim_order_status || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'PO Order Status',
            dataIndex: 'po_order_status',
            // width: '9%',
            render: (text) => (text ? text : '-'),
            width: 150,
            ...getColumnSearchProps("po_order_status"),
            sorter: (a, b) => {
                const aValue = a.po_order_status || ''; 
                const bValue = b.po_order_status || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Prod Plan Type',
            dataIndex: ' prod_plan_type',
            // width: '9%',
            render: (text) => (text ? text : '-'),
            ...getColumnSearchProps("prod_plan_type"),
            width: 150,
            sorter: (a, b) => {
                const aValue = a.prod_plan_type || ''; 
                const bValue = b.prod_plan_type || ''; 
                return aValue.localeCompare(bValue);
            },
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Planned EXF',
            dataIndex: 'planned_exf',
            // width: '9%',
            render: (text) => (text ? text : '-'),
            width: 150,
           
        },
        
      
    ];
    const filteredGridData = gridData.filter(e => e.po_order_status !== null);

    const handleExport = (e: any) => {
        e.preventDefault();

        const currentDate = new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .join("/");

        let exportingColumns: IExcelColumn[] = []
        exportingColumns = [
            // { title: 'Production Plan Id', dataIndex: 'production_plan_id' },
            // { title: ' Planning Ssn Cd', dataIndex: 'planning_ssn_cd' },
            { title: 'Biz', dataIndex: 'biz' },
            { title: 'Department', dataIndex: 'department' },
            { title: 'Planning Sum Code', dataIndex: 'planning_sum_code' },
            { title: 'Item', dataIndex: 'item' },
            // { title: 'Vendor', dataIndex: 'vendor' },
            { title: 'FR Fabric', dataIndex: 'fr_fabric' },
            { title: 'Sewing Factory', dataIndex: 'sewing_factory' },
            // { title: 'Branch Factory', dataIndex: 'branchFactory' },
            { title: 'Coeff', dataIndex: 'coeff' },
            { title: 'Publish Date', dataIndex: 'publish_date' },
            { title: 'Order Plan Number', dataIndex: 'order_plan_number' },
            { title: 'Planning Sum', dataIndex: 'planning_sum' },
            { title: 'GWH', dataIndex: 'gwh' },
            { title: 'WH', dataIndex: 'wh' },
            { title: 'Trnsp Mthd', dataIndex: 'trnsp_mthd' },
            { title: 'Raw Material Supplier', dataIndex: 'raw_material_supplier' },
            { title: 'Yarn Order Status', dataIndex: 'yarn_order_status' },
            { title: 'Fbrc Order Status', dataIndex: 'fbrc_order_status' },
            { title: 'Color Order Status', dataIndex: 'color_order_status' },
            { title: 'Trim Order Status', dataIndex: 'trim_order_status' },
            { title: 'PO Order Status', dataIndex: 'po_order_status' },
            { title: 'Prod Plan Type', dataIndex: 'prod_plan_type' },

            { title: 'Planned EXF', dataIndex: 'planned_exf' },
            // { title: 'Currency', dataIndex: 'currency' },
            // { title: 'Cost', dataIndex: 'cost' },
        ]
        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`Projection-orders-${currentDate}.xlsx`);
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <Card
                title="Projection Orders"
                extra={filteredData.length > 0 ? (<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={handleExport}
                    icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
                <Form form={form} layout={'vertical'}>

                    <Row gutter={24}>
                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <Form.Item label="Planned EXF Date" name="planned_exf">
                                <RangePicker onChange={EstimatedETDDate} />
                            </Form.Item>
                        </Col> */}
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <Form.Item label="PO Order Status" name='poOrderStatus'>
                                <Select 
                                 showSearch
                                 placeholder="Select Po Order Status"
                                 optionFilterProp="children"
                                 allowClear>
                                  {filteredGridData.map(e => (
                   <Option key={e.po_order_status} value={e.po_order_status}>{e.po_order_status}</Option>
                            ))}
                                </Select>
                            </Form.Item>
                       </Col>
                       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                        <Form.Item name='planned_exf' label='Planned EXF'>
                        <DatePicker
                 format="YYYY/MM/DD"
               onChange={(date, dateString) => {
              setSelectedEstimatedFromDate(dateString);
                }}
/>
                        </Form.Item>
</Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <div>
                                {/* <label>Order Status</label>
                                <Form.Item name="orderStatus">
                                    <Select
                                        showSearch
                                        placeholder="Select Project Status"
                                        optionFilterProp="children"
                                        allowClear>
                                        <Option key='new' value="NEW">NEW</Option>
                                        <Option key='unaccepted' value="UNACCEPTED">UNACCEPTED</Option>
                                    </Select>
                                </Form.Item> */}
                            </div>
                        </Col>

                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 6 }} style={{ marginTop: 17 }} >
                            <Button
                                type="primary"
                                icon={<SearchOutlined />}
                                style={{ marginRight: 50, width: 80 }}
                                htmlType="button"
                                onClick={getFilterdData}>Search</Button>
                            <Button
                                type="primary"
                                icon={<UndoOutlined />}
                                htmlType="submit"
                                onClick={onReset}>Reset</Button>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={filteredData} 
                scroll={{ x: 1500,y:500 }}
                 pagination={{
                    onChange(current) {
                        setPage(current);
                    }

                }} onChange={onChange} bordered />
            </Card>
        </div>
    )
}

export default AllOrdersGridView;