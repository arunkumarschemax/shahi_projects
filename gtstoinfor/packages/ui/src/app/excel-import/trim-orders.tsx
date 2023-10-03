import { Button, Card, Col, DatePicker, Form, Input, InputRef, Popconfirm, Row, Select, Space, Table, Tag, Typography, message } from 'antd';
import { useEffect, useRef, useState, } from 'react';
import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { Excel } from 'antd-table-saveas-excel';
import { OrdersService } from '@project-management-system/shared-services';
import moment from 'moment';
import { COLineRequest, CoLineStatusReq, TrimOrdersReq } from '@project-management-system/shared-models';
import Highlighter from 'react-highlight-words';
import { ColumnType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';


const TrimOrder= () => {
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [gridData, setGridData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([])
    const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
    const [selectedEstimatedStartDate, setSelectedEstimatedDate] = useState(undefined);

    const service = new OrdersService();
    const [form] = Form.useForm();
    const { Option } = Select;
    const [grandTotal, setGrandTotal] = useState<number>(0);
    const { RangePicker } = DatePicker;
    const [searchText, setSearchText] = useState("");
    const searchInput = useRef<InputRef>(null);
    const [searchedColumn, setSearchedColumn] = useState("");
    const [item, setItem] = useState<any[]>([]);

const {Text}=Typography

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        const req = new TrimOrdersReq()
        if (form.getFieldValue('approvalDate') !== undefined) {
            req.approvalFromDate = (form.getFieldValue('approvalDate')[0]).format('YYYY-MM-DD')
        }
        if (form.getFieldValue('approvalDate') !== undefined) {
        req.approvalToDate = (form.getFieldValue('approvalDate')[1]).format('YYYY-MM-DD')
        }
        service.getTrimOrdersData(req).then(res => {
            console.log(req,'req');
            
            if (res.status) {
                setGridData(res.data)
                setFilteredData(res.data)
            }
        }).catch(err => {
            console.log(err.message)
        })
        service.getTrimOrdersNo().then(res => {
            if (res.status) {
                setItem(res.data)
            }
        }).catch(err => {
            console.log(err.message)
        })
        
    }
    const approveOrderStatus = (record) => {
        console.log(record)
    const req = new COLineRequest(record.itemNumber,record.order_no,record.color_code,record.color,record.size_code,record.size,record.item_code,record.item,null,null,record.order_no,record.itemNumber,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,record.trim_order_id);
    // req.itemNumber = record.itemNumber
    // req.orderNumber = record.order_no
    service.createCOLineInternal(req).then(coLineRes => {
        if(coLineRes.status){
            service.createCOline(req).then((res) => {
                if (res.status) {
                    const statusReq = new CoLineStatusReq()
                    statusReq.coLineId = coLineRes?.data?.coLineId
                    statusReq.status = 'Success'
                    service.updateStatusAfterCoLineCreationInM3(statusReq)
                    getData()
                    message.success(res.internalMessage)
                } else {
                    const statusReq = new CoLineStatusReq()
                    statusReq.coLineId = coLineRes?.data?.coLineId
                    statusReq.status = 'Failed'
                    service.updateStatusAfterCoLineCreationInM3(statusReq)
                    message.error(res.internalMessage)
                }
            })
        } else{
            message.error(coLineRes.internalMessage)
        }
    })
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
    // const getFilterdData = () => {
    //     let orderNo = form.getFieldValue('orderNo');
    //     let startDate = selectedEstimatedFromDate;
    //     let endDate = selectedEstimatedStartDate;
    //     let selectedDate = selectedEstimatedFromDate;

    //     let filteredData = gridData;
    //     if (orderNo) {
    //         filteredData = filteredData.filter(record => record.order_no === orderNo);
    //         if (filteredData.length === 0) {
    //             message.error("No Data Found")
    //         }
    //         setFilteredData(filteredData);
    //     }
    //     if (selectedDate) {
    //         selectedDate = moment(selectedDate).format('YYYY/MM/DD');

    //         filteredData = filteredData.filter(record => {
    //             const dateInData = moment(record.approval_date).format('YYYY/MM/DD');
    //             return dateInData === selectedDate;
    //         });
    
    //       }
    //       setFilteredData(filteredData);
    //       if (filteredData.length === 0) {
    //         message.error("No Data Found");
    //       }
    // }

    const onReset = () => {
        form.resetFields();
        setSelectedEstimatedFromDate(undefined);
        getData();
    }

    const handleItemNoChange = (value, record) => {
        console.log(value)
        record.itemNumber = value
        console.log(record)
        // setItemNoValues((prevValues) => ({
        //     ...prevValues,
        //     [record.key]: value,
        // }));
    };
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

    const columns: any = [
        {
            title: 'S No',
            // fixed:'left',
            key: 'sno',
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
      
        {
            title: 'Order No',
            // fixed:'left',
          dataIndex: 'order_no',         
          sorter: (a, b) => {
            const aKey = a.order_no || "";
            const bKey = b.order_no || "";
            return aKey.localeCompare(bKey);
          },
        },
          
        {
            title: 'Item Code',
            dataIndex: 'item_code',
           
            align:'right',
            ...getColumnSearchProps("item_code"),
            sorter: (a, b) => a.item_code.localeCompare(b.item_code),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Item',
            dataIndex: 'item',
           
            ...getColumnSearchProps("item"),
            // sorter: (a, b) => a.item.localeCompare(b.item),
            // sortDirections: ["descend", "ascend"],
        },
        // {
        //     title: 'Item Brand',
        //     dataIndex: 'item_brand',
        //     ...getColumnSearchProps("item_brand"),
        //     sorter: (a, b) => a.item_brand.localeCompare(b.item_brand),
        //     sortDirections: ["descend", "ascend"],
        // },
        // {
        //     title: 'Vendor Code ',
        //     dataIndex: 'vendor_code',
            
        // },
        
        {
            title: 'Order Plan Number ',
            dataIndex: 'order_plan_number',
            align:'right',
           
            ...getColumnSearchProps("order_plan_number"),
            sorter: (a, b) => a.item_code.localeCompare(b.order_plan_number),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Color Code',
            dataIndex: 'color_code',
            align:'right',
           
            // ...getColumnSearchProps("color_code"),
            sorter: (a, b) => a.color_code.localeCompare(b.color_code),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Color',
            dataIndex: 'color',
           
            align:'left',
            ...getColumnSearchProps("color"),
            // sorter: (a, b) => a.color.localeCompare(b.color),
            // sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Size Code',
            dataIndex: 'size_code',
           
            align:'right',
            // ...getColumnSearchProps("size_code"),
            sorter: (a, b) => a.size_code.localeCompare(b.size_code),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Size',
            dataIndex: 'size',
       
            align:'left',
            ...getColumnSearchProps("size"),
            // sorter: (a, b) => a.size.localeCompare(b.size),
            // sortDirections: ["descend", "ascend"],
        },
        {
            title: 'Trim Item No',
            dataIndex: 'trim_item_no',
            align:'right',

            ...getColumnSearchProps("trim_item_no"),
            // sorter: (a, b) => a.trim_item_no.localeCompare(b.trim_item_no),
            // sortDirections: ["descend", "ascend"],
            render:(val,rec)=>{
                return rec.trim_item_no? rec.trim_item_no:'-'
            }
        },
           
        {
            title: 'Order Quantity Pcs',
            dataIndex: 'order_qty_pcs',
            align:'right',
            // ...getColumnSearchProps("order_qty_pcs"),
            // sorter: (a, b) => a.order_qty_pcs.localeCompare(b.order_qty_pcs),
            // sortDirections: ["descend", "ascend"],
            render: (text, record) => {
                return record.order_qty_pcs;
            },
            summary: (pageData) => {
                let total = 0;
                pageData.forEach((record) => {
                    total += parseFloat(record.order_qty_pcs);
                });
                return (
                    <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={8} index={0}>Grand Total</Table.Summary.Cell>
                        <Table.Summary.Cell index={9}>{total}</Table.Summary.Cell>
                    </Table.Summary.Row>
                );
            },
        },
        {
            title: 'Approval Date',
            dataIndex: 'approval_date',
            sorter: (a, b) => a.approval_date.localeCompare(b.approval_date),
            sortDirections: ["descend", "ascend"],
            render: (text, record) => {
                return record.approval_date? moment(record.approval_date).format("YYYY/MM/DD"): "-"
              },
            },
            {
                title: 'Revised Date',
                dataIndex: 'revised_date',
                align:'right',
                sorter: (a, b) => a.revised_date.localeCompare(b.revised_date),
                sortDirections: ["descend", "ascend"],
                render: (text, record) => {
                    return record.revised_date? moment(record.revised_date).format("YYYY/MM/DD"): "-"
                  },
                },
                {
                    title: "Aging",
                    dataIndex: "approval_date",
                    align:'right',
                    // fixed:'right',
                    sorter: (a, b) => (Math.floor((new Date(a.approval_date).getTime() - new Date(b.approval_date).getTime()) / (1000 * 60 * 60 * 24)) - Math.floor((new Date(b.approval_date).getTime() - new Date(b.approval_date).getTime()) / (1000 * 60 * 60 * 24)) + 0),
                    sortDirections: ['descend', 'ascend'],
                    // ...getColumnSearchProps('aging'),
                    render(text, record) {
                      const obj: any = {
                        children: (<div style={{ textAlign: 'center' }}>{Math.floor((new Date(record.approval_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) + 1)}</div>),
                        props: {
                          style: {
                            color: Math.floor((new Date(record.approval_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) + 1) >= 0 ?  '#00ff99' : "#ff4d4d" ,
                            // color: Math.floor((new Date(record.approval_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) + 1) >= 0 ? "Black" : 'white'
                          }
                        },
                      };
                      return obj;
                    }
                  },
            {
            title: 'Status',
            dataIndex: 'answered_status',
           align:'left',
            sorter: (a, b) => a.answered_status.localeCompare(b.answered_status),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Item No",
            dataIndex: "itemNo",
            align:'left',
            fixed:'right',
            width:150,
            render: (text, record) => {
                if(record.answered_status != 'Accepted'){

                return (
                    <Form>
                        <Form.Item>
                            <Input
                                placeholder="Enter Item No"
                                onChange={(e) => handleItemNoChange(e.target.value, record)}
                            />
                        </Form.Item>
                    </Form>
                );
                }else{
                    return <>{record.buyer_item_number?record.buyer_item_number:'-'}</>
                }
            },
        },
        
        {
            title: "Action",
            dataIndex: "action",
            width:100,
            fixed:'right',
            render: (value, record) => {
                // const isEnabled = isActionButtonEnabled(record);
                // if(record.answered_status != 'Accepted'){

                    return (
                        <Popconfirm
                            title="Are you sure to approve"
                            onConfirm={() => approveOrderStatus(record)}
                            // disabled={record.answered_status == 'Accepted'}
                            disabled= {record.answered_status !== 'Accepted' ? false : true}

                        >
                            <Button 
                            // disabled={!isEnabled}
                            disabled= {record.answered_status !== 'Accepted' ? false : true}
                            >Accept</Button>
                        </Popconfirm>
                    );
                // }else{
                //     return <></>
                // }
            },
            
            
        },
        
       
    ];



    const handleExport = (e: any) => {
        e.preventDefault();

        const currentDate = new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .join("/");

        let exportingColumns: IExcelColumn[] = []
        exportingColumns = [
            { title: 'S No', dataIndex: 'sno' },
            // { title: 'Trim Order Id', dataIndex: 'trim_order_id' },
            { title: 'Order No', dataIndex: 'order_no' },
            { title: 'Year', dataIndex: 'year' },
            { title: 'Revision No', dataIndex: 'revision_no' },
            { title: 'Planning ssn', dataIndex: 'planning_ssn' },
            { title: 'Global Business Unit', dataIndex: 'global_business_unit' },
            { title: 'Business Unit', dataIndex: 'business_unit' },
            // { title: 'Item Brand', dataIndex: 'item_brand' },
            { title: 'Department', dataIndex: 'department' },
            { title: 'Revised Date', dataIndex: 'revised_date' },
            { title: 'Document Status', dataIndex: 'document_status' },
            { title: 'Status', dataIndex: 'answered_status' },
            { title: 'Vendor Person InCharge', dataIndex: 'vendor_person_incharge' },
            { title: 'Decision Date', dataIndex: 'decision_date' },
            { title: 'Payment Terms', dataIndex: 'payment_terms' },
            { title: 'Eta Wh', dataIndex: 'eta_wh' },
            { title: 'Approver', dataIndex: 'approver' },
            { title: 'Approval Date', dataIndex: 'approval_date' },
            { title: 'Order Conditions', dataIndex: 'order_conditions' },
            { title: 'Remarks', dataIndex: 'remark' },
            { title: 'Raw Material Code', dataIndex: 'raw_material_code' },
            { title: 'Supplier Raw Material Code', dataIndex: 'supplier_raw_material_code' },
            { title: 'Supplier Raw Material', dataIndex: 'supplier_raw_material' },
            // { title: 'Vendor Code', dataIndex: 'vendor_code' },
            // { title: 'Vendor ', dataIndex: 'vendor' },
            { title: 'Management Factory Code  ', dataIndex: 'management_factory_code' },
            { title: 'Management Factory ', dataIndex: 'management_factory' },
            { title: 'Branch Factory Code ', dataIndex: 'branch_factory_code' },
            { title: 'Branch Factory ', dataIndex: 'branch_factory' },
            { title: 'Order Plan Number ', dataIndex: 'order_plan_number' },
            { title: 'Item Code ', dataIndex: 'item_code' },
            { title: 'Item  ', dataIndex: 'item' },
            { title: 'Representative Sample Code ', dataIndex: 'representative_sample_code' },
            { title: 'Representative Sample', dataIndex: 'representative_Sample' },
            { title: 'Color Code', dataIndex: 'color_code' },
            { title: 'Color', dataIndex: 'color' },
            { title: 'Pattern Dimension Code', dataIndex: 'pattern_dimension_code' },
            { title: 'Size Code', dataIndex: 'size_code' },
            { title: 'Size ', dataIndex: 'size' },
            { title: 'Order Quantity Pcs', dataIndex: 'order_qty_pcs' },
            { title: 'Arrangement By', dataIndex: 'arrangement_by' },
            { title: 'Trim Description', dataIndex: 'trim_description' },
            { title: 'Trim Item No', dataIndex: 'trim_item_no' },
            { title: 'Trim Supplier', dataIndex: 'trim_supplier' },
            { title: 'Status', dataIndex: 'answered_status' },


            // { title: 'Currency', dataIndex: 'currency' },
            // { title: 'Cost', dataIndex: 'cost' },
        ]
        const excel = new Excel();
        excel.addSheet("Sheet1");
        excel.addRow();
        excel.addColumns(exportingColumns);
        excel.addDataSource(gridData);
        excel.saveAs(`Trim-Orders-Report-${currentDate}.xlsx`);
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <Card
                title="Trim Orders"
                extra={filteredData.length > 0 ? (<Button
                    type="default"
                    style={{ color: 'green' }}
                    onClick={handleExport}
                    icon={<FileExcelFilled />}>Download Excel</Button>) : null}>

                
                 <Form form={form} layout={'vertical'}onFinish={getData}>
                    <Row gutter={24}>
                       
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <div>
                                <label>Order Number</label>
                                <Form.Item name="orderNo">
                                    <Select
                                        showSearch
                                        placeholder="Select Order Number"
                                        optionFilterProp="children"
                                        allowClear>
                                            {item.map(e=>(
                                                <Option key={e.order_no} value={e.order_no}>{e.order_no}</Option>
                                            ))}
                                        {/* <Option key='new' value="NEW">NEW</Option>
                                        <Option key='unaccepted' value="UNACCEPTED">UNACCEPTED</Option> */}
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                        <Form.Item name='approvalDate' label=' Approval Date'>
                        {/* <DatePicker
  format="YYYY/MM/DD"
  onChange={(date, dateString) => {
    setSelectedEstimatedFromDate(dateString);
  }}
/> */}
                        <RangePicker/>

                        </Form.Item>
</Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 6 }} style={{ marginTop: 17 }} >
                        <Button
                                type="primary"
                                icon={<SearchOutlined />}
                                style={{ marginRight: 50, width: 80 }}
                                htmlType="submit"
                                >Search</Button>
                            <Button
                                type="primary"
                                icon={<UndoOutlined />}
                                htmlType="submit"
                                onClick={onReset}>Reset</Button>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={filteredData} scroll={{ x: 1500 }} bordered
                size='small'
                summary={(pageData) => {
                    // Calculate the grand total on each page change
                    let total = 0;
                    pageData.forEach((record) => {
                        total += parseFloat(record.order_qty_pcs);
                    });
                    setGrandTotal(total); // Update the grand total in state
            
                    return (
                        <Table.Summary.Row>
<Table.Summary.Cell colSpan={10} index={8} >
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
<span style={{ color: 'Red' }}>Grand Total:</span>
</div>
</Table.Summary.Cell>
<Table.Summary.Cell index={9} align='right'>{grandTotal}</Table.Summary.Cell>     
                        </Table.Summary.Row>
                    );
                }}
                />
            </Card>
        </div>
    )
}


export default TrimOrder;