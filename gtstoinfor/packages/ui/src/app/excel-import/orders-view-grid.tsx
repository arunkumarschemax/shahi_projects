import { Button, Card, Col, DatePicker, Form, Input, InputRef, Row, Select, Space, Table, Tag, Tooltip, message } from 'antd';
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
import { orders } from '@project-management-system/shared-models';
import { useNavigate } from 'react-router-dom';


const AllOrdersGridView = () => {
    const [page, setPage] = useState<number>(1)
    const [datas, setDatas] = useState<any>([]);
    const [ordersStatus, setOrdersStatus] = useState<any[]>([])
    const [ordersNo, setOrdersNo] = useState<any[]>([])

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
    const [dateRange, setDateRange] = useState([null, null]);
    const [selectedFromDate, setSelectedFromDate] =useState<null | moment.Moment>(null);
    const [selectedToDate, setSelectedToDate] = useState<null | moment.Moment>(null);
    const { RangePicker } = DatePicker;
    let navigate = useNavigate()


    useEffect(() => {
        getData();
        orderStatus();
        Number();
        orderPlannedNumber();
    }, [])

    const getData = () => {
        const req = new orders()
        if (form.getFieldValue('planned_exf') !== undefined) {
            req.plannedFromDate = (form.getFieldValue('planned_exf')[0]).format('YYYY-MM-DD')
        }
        if (form.getFieldValue('planned_exf') !== undefined) {
        req.plannedToDate = (form.getFieldValue('planned_exf')[1]).format('YYYY-MM-DD')
        }
        if(form.getFieldValue('PoOrderStatus') !== undefined){
        req.PoOrderStatus=form.getFieldValue('PoOrderStatus')
        }
    if(form.getFieldValue('OrderPlanNumber') !== undefined){
        req.OrderPlanNum=form.getFieldValue('OrderPlanNumber')
    }
        service.getOrdersData(req).then(res => {
            
            console.log( req.OrderPlanNum,'oooooooooooooooooo')
            if (res.status) {
                setGridData(res.data)
                setFilteredData(res.data)
            }
        }).catch(err => {
            console.log(err.message)
        })
        // service.getOrdersStatus().then(res=>{
        //     if(res.status){
        //         setOrdersStatus(res.data)
        //         setFilteredData(res.data)

        //     }else{
        //         setFilteredData([])
        //         setOrdersStatus([])
        //     }
        // }).catch(err => {
        //     console.log(err.message)
        // })
        // service.getOrderPlanNo(req).then(res=>{
        //     if(res.status){
        //         setOrdersNo(res.data)
        //         setFilteredData(res.data)

        //     }else{
        //         setFilteredData([])
        //         setOrdersNo([])
        //     }
        // })
    }

 const DetailView =(record:any)=>{
    const VersionData=filteredData.filter(order_plan_number=>order_plan_number.order_plan_number == record)
    navigate('/order-history-report',{state:{VersionData}})
 }
const orderStatus=()=>{
    // service.getOrdersStatus().then((res)=>{
    //     if(res.status){
    //         setOrdersStatus(res?.data);
    //         console.log()
    //     }
    // })
}


const orderPlannedNumber=()=>{
     service.getOrderPlanNo().then(res=>{
            if(res.status){
                setOrdersNo(res.data)
                setFilteredData(res.data)

            }else{
                setFilteredData([])
                setOrdersNo([])
            }
        })
}
const Number=()=>{
    service.getOrderPlanNo().then((res)=>{
        if(res.status){
            setDatas(res?.data === undefined? []:res.data);

        }else{
            setDatas([]);
            message.info(res.internalMessage)
        }
    })
}
    const EstimatedETDDate = (value) => {
        if (value) {
            console.log(value)
            const fromDate = value[0].format('YYYY-MM-DD');
            const toDate = value[1].format('YYYY-MM-DD');
            
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
    const getStartIndex = () => (page - 1) * pageSize + 1;

    const columns: any = [
    
        {
            title: "S.No",
            key: "sno",
            // fixed:'left',
            responsive: ["sm"],
            render: (text, record, index) => getStartIndex() + index,
          },
        // {
        //     title: ' Planning Ssn Cd',
        //     dataIndex: 'planning_ssn_cd',
        //     render: (text) => (text ? text : '-'),
            // width: '9%',
        // },
        {
            title:'Order Plan Number',
            dataIndex:'order_plan_number',
            // width: 90,
            align:'right',
            // fixed:'left',
            ...getColumnSearchProps("order_plan_number"),
            sorter: (a, b) => {
                const aKey = a.order_plan_number || "";
                const bKey = b.order_plan_number || "";
                return aKey.localeCompare(bKey);
              },
              render: (text,record) =>{
            return(
               <Tooltip title="Click for Order History">
                <Button type='link' onClick={() => DetailView(record.order_plan_number)}>
                  {record.order_plan_number}
                </Button>
              </Tooltip>
                  )
              },

         },
         {
            title:'Year',
            dataIndex:'year',
            ...getColumnSearchProps("year"),
            sorter: (a, b) => {
                const aKey = a.year || "";
                const bKey = b.year || "";
                return aKey.localeCompare(bKey);
              },

         },
         {
            title:'Planning Ssn',
            dataIndex:'planning_ssn',
            ...getColumnSearchProps("planning_ssn"),
            sorter: (a, b) => {
                const aKey = a.planning_ssn || "";
                const bKey = b.planning_ssn || "";
                return aKey.localeCompare(bKey);
              },

         },
        {
            title: 'Biz',
            dataIndex: 'biz',
         ...getColumnSearchProps("biz"),

            render: (text) => (text ? text : '-'),
            // width: '9%',
            // width: 80,
            sorter: (a, b) => {
                const aKey = a.biz || "";
                const bKey = b.biz || "";
                return aKey.localeCompare(bKey);
              },
        },
        {
            title: 'Core Category',
            dataIndex: 'core_category',
         ...getColumnSearchProps("core_category"),

            render: (text) => (text ? text : '-'),
            // width: '9%',
            // width: 80,
            sorter: (a, b) => {
                const aKey = a.core_category || "";
                const bKey = b.core_category || "";
                return aKey.localeCompare(bKey);
              },
        },
    //     {
    //         title: 'Department',
    //         dataIndex: 'department',
    // filters:[
    //     {text:"34. Men cut & sewn",
    //     value:'34. Men cut & sewn'},
    //     {
    //         text:"24. Women cut & sewn",
    //         value:"24. Women cut & sewn"
    //     },
    //     {
    //         text:"82. Others Others",
    //         value:"82. Others Others"
    //     },
    // ],
    // onFilter:(value,record)=>{return record.department === value},
    // render:(text,record)=>{return record.department ? record.department:"-"}
    //     },

    //     {
    //     title:'Planning Sum Code',
    //     dataIndex:'planning_sum_code',
    //     render: (text) => (text ? text : '-'),
    //     // width: 100,

    //     ...getColumnSearchProps("planning_sum_code"),
    //     sorter: (a, b) => {
    //         const aKey = a.planning_sum_code || "";
    //         const bKey = b.planning_sum_code || "";
    //         return aKey.localeCompare(bKey);
    //       },
    //     },
        
        {
            title: 'Planning Sum',
            dataIndex: 'planning_sum',
            render: (text) => (text ? text : '-'),
            // width: '9%',
            // width: 100,

            ...getColumnSearchProps("planning_sum"),
            sorter: (a, b) => {
            const aKey = a.planning_sum || "";
            const bKey = b.planning_sum || "";
            return aKey.localeCompare(bKey);
          },
        },
        // {
        //     title: 'Item ',
        //     dataIndex: 'item',
        //     render: (text) => (text ? text : '-'),
        //     // width: '9%',
        //     // width: 100,

        //     ...getColumnSearchProps("item"),
        //     sorter: (a, b) => {
        //         const aKey = a.item || "";
        //         const bKey = b.item || "";
        //         return aKey.localeCompare(bKey);
        //       },
        // },
        // {
        //     title: 'Vendor ',
        //     dataIndex: 'vendor',
        //     render: (text) => (text ? text : '-')

        // },
        // {
        //     title: 'FR Fabric',
        //     dataIndex: 'fr_fabric',
        //     render: (text) => (text ? text : '-'),
        //     // width: '9%',
        //     // width: 100,
        //      align:"right",
        //     ...getColumnSearchProps("fr_fabric"),
        //     sorter: (a, b) => {
        //         const aKey = a.fr_fabric || "";
        //         const bKey = b.fr_fabric || "";
        //         return aKey.localeCompare(bKey);
        //       },
        // },
        {
            title: 'Coeff',
            dataIndex: 'coeff',
            render: (text) => (text ? text : '-'),
            // width: '9%',
            // width: 60,
            align:'right',
            sorter: (a, b) => {
                const aKey = a.coeff || "";
                const bKey = b.coeff || "";
                return aKey.localeCompare(bKey);
              },
        },
        {
            title: 'Order Plan Qty',
            dataIndex: 'order_plan_qty',
            align: 'right',
            render: (text: any) => {
              const orderQty = parseFloat(text);
              return !isNaN(orderQty) ? orderQty.toLocaleString('en-IN', {
                maximumFractionDigits: 0
              }) : '0';
            },
            sorter: (a, b) => {
                const aKey = a.order_plan_qty || "";
                const bKey = b.order_plan_qty || "";
                return aKey.localeCompare(bKey);
              },
        },
        {
            title: 'Order Plan Qty(Coeff)',
            dataIndex: 'order_plan_qty_coeff',
            align: 'right',
            render: (text: any) => {
              const orderPlanQtyCoeff = parseFloat(text);
              return !isNaN(orderPlanQtyCoeff) ? orderPlanQtyCoeff.toLocaleString('en-IN', {
                maximumFractionDigits: 0
              }) : '0';
            },
            sorter: (a, b) => {
                const aKey = a.order_plan_qty_coeff || "";
                const bKey = b.order_plan_qty_coeff || "";
                return aKey.localeCompare(bKey);
              },
        },
        {
            title: 'Prod Plan Type',
            dataIndex: 'prod_plan_type',
            // width: '9%',
            render: (text) => (text ? text : '-'),
            ...getColumnSearchProps("prod_plan_type"),
            // width: 90,
            sorter: (a, b) => {
                const aKey = a.prod_plan_type || "";
                const bKey = b.prod_plan_type || "";
                return aKey.localeCompare(bKey);
              },
        },
          

        // {
        //     title: 'Branch Factory',
        //     dataIndex: 'branchFactory',
        //     render: (text) => (text ? text : '-')

           
        // },
      
       
        // {
        //     title: 'Publish Date',
        //     dataIndex: 'publish_date',
        //     // width: '9%',
        //     // width: 90,

        //     render: (text, record) => {
        //         return record.publish_date ? convertToYYYYMMDD(record.publish_date) : '-'
        //     }
        // },

       
        // {
        //     title: 'GWH()',
        //     dataIndex: 'gwh',
        //     // width: '9%',
        //     width: 80,
        //     align:'right',

        //     render: (text) => (text ? text : '-'),
        //     ...getColumnSearchProps("gwh"),

           
        // },
        {
            title: 'WH(mm-dd)',
            dataIndex: 'wh',
            // width: '9%',
            // width: 90,

            render: (text) => (text ? text : '-'),
            sorter: (a, b) => {
                const aKey = a.wh || "";
                const bKey = b.wh || "";
                return aKey.localeCompare(bKey);
              },
        },
        {
            title: 'EXF ETD',
            dataIndex: 'exf_etd',
            // width: '9%',
            // width: 90,

            render: (text) => (text ? text : '-'),
            sorter: (a, b) => {
                const aKey = a.exf_etd || "";
                const bKey = b.exf_etd || "";
                return aKey.localeCompare(bKey);
              },
        },
        {
            title: 'ETD WH',
            dataIndex: 'etd_wh',
            // width: '9%',
            // width: 90,

            render: (text) => (text ? text : '-'),
            sorter: (a, b) => {
                const aKey = a.etd_wh || "";
                const bKey = b.etd_wh || "";
                return aKey.localeCompare(bKey);
              },
        },
        {
            title: 'Sample',
            dataIndex: 'sample',
            // width: '9%',
            // width: 90,

            render: (text) => (text ? text : '-'),
            sorter: (a, b) => {
                const aKey = a.sample || "";
                const bKey = b.sample || "";
                return aKey.localeCompare(bKey);
              },
        },
        {
            title: 'EXF(mm-dd)',
            dataIndex: 'exf',
            // width: '9%',
            // width: 90,

            render: (text) => (text ? text : '-'),
            sorter: (a, b) => {
                const aKey = a.exf || "";
                const bKey = b.exf || "";
                return aKey.localeCompare(bKey);
              },
        },


        // {
        //     title: 'Transport Method',
        //     dataIndex: 'trnsp_mthd',
        //     // width: '9%',
        //     // width: 100,
        //     // ...getColumnSearchProps("trnsp_mthd"),
        //     filters:[
        //     {text:'Ship',
        //     value:'Ship'
        //        },
        // {
        //     text:'Air',
        //     value:'Air',
        // },
        //     ],
        //     onFilter:(value,record) =>{return record.trnsp_mthd === value},
        //     render:(text,record)=>{ return record.trnsp_mthd ? record.trnsp_mthd:"-"}

        // },
        // {
        //     title: 'Raw Material Supplier',
        //     dataIndex: 'raw_material_supplier',
        //     render: (text) => (text ? text : '-'),
        //     ...getColumnSearchProps("raw_material_supplier"),

        //     // width: 100,

        //     sorter: (a, b) => {
        //         const aKey = a.raw_material_supplier || "";
        //         const bKey = b.raw_material_supplier || "";
        //         return aKey.localeCompare(bKey);
        //       },
        // },
        // {
        //     title: 'Yarn Order Status',
        //     dataIndex: 'yarn_order_status',
        //     // width: 100,
        //     render: (text) => {
        //         return text !== undefined && text !== "" ? text : "-";
        //       },           
        //     ...getColumnSearchProps("yarn_order_status"),
        //     // sorter: (a, b) => {
        //     //     const aKey = a.yarn_order_status || "";
        //     //     const bKey = b.yarn_order_status || "";
        //     //     return aKey.localeCompare(bKey);
        //     //   },
           
           
        // },
        // {
        //     title: 'Fbrc Order Status',
        //     dataIndex: 'fbrc_order_status',
        //     // width: '9%',
        //     render: (text) => (text ? text : '-'),
        //     // width: 100,
        //     ...getColumnSearchProps("fbrc_order_status"),

        // },
        // {
        //     title: 'Color Order Status',
        //     dataIndex: 'color_order_status',
        //     // width: '9%',
        //     render: (text) => (text ? text : '-'),
        //     // width: 100,
        //     ...getColumnSearchProps("color_order_status"),
        //     // sorter: (a, b) => {
        //     //     const aKey = a.color_order_status || "";
        //     //     const bKey = b.color_order_status || "";
        //     //     return aKey.localeCompare(bKey);
        //     //   },
        // },
        // {
        //     title: 'Trim Order Status',
        //     dataIndex: 'trim_order_status',
        //     // width: '9%',
        //     render: (text) => (text ? text : '-'),
        //     // width: 100,
        //     ...getColumnSearchProps("trim_order_status"),
        //     // sorter: (a, b) => {
        //     //     const aKey = a.trim_order_status || "";
        //     //     const bKey = b.trim_order_status || "";
        //     //     return aKey.localeCompare(bKey);
        //     //   },
        // },
        // {
        //     title: 'PO Order Status',
        //     dataIndex: 'po_order_status',
        //     // width: '9%',
        //     render: (text) => (text ? text : '-'),
        //     // width: 100,
        //     ...getColumnSearchProps("po_order_status"),
        //     // sorter: (a, b) => {
        //     //     const aKey = a.color_order_status || "";
        //     //     const bKey = b.color_order_status || "";
        //     //     return aKey.localeCompare(bKey);
        //     //   },
        // },
      
        // {
        //     title: 'Planned EXF(yy-mm-dd)',
        //     dataIndex: 'planned_exf',
        //     // width: '9%',
        //     render: (text) => (text ? text : '-'),
        //     // width: 90,
        //     sorter: (a, b) => {
        //         const aKey = a.planned_exf || "";
        //         const bKey = b.planned_exf || "";
        //         return aKey.localeCompare(bKey);
        //       },
           
        // },
        
      
    ];
    const filteredGridData = gridData.filter(e => e.po_order_status !== null);
    const data= gridData.filter(e => e.order_plan_number !== null)
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
           
            { title: '#', dataIndex: 'sno' },
            { title: 'Order Plan Number', dataIndex: 'order_plan_number' },
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
                <Form form={form} layout={'vertical'} onFinish={getData}>

                    <Row gutter={24}>
                       
                       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <Form.Item label="Plan Order Number" name='OrderPlanNumber'>
                                <Select 
                                 showSearch
                                 placeholder="Select Plan Order Number"
                                 optionFilterProp="children"
                                 allowClear>
                                {ordersNo.map(i=>(
                                    <Option key={i.order_plan_number} value={i.order_plan_number}>{i.order_plan_number}

                                    </Option>
                                ))}
                                </Select>
                            </Form.Item>
                       </Col>
                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <Form.Item label="PO Order Status" name="PoOrderStatus">
                                <Select
                                 showSearch
                                 placeholder="Select Po Order Status"
                                 optionFilterProp="children"
                                 allowClear>          
                         {ordersStatus.map((res:any)=>{
                          return(
                        <Option key={res.po_order_status} value={res.po_order_status}>
                                {res.PoOrderStatus}
                            </Option>
                          )
                         })}
                                </Select>

                            </Form.Item>
                       </Col>
                       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                        <Form.Item name='planned_exf' label='Planned EXF'>
                        <RangePicker/>
                        </Form.Item>
                        </Col> */}
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
                <Table columns={columns} 
                dataSource={filteredData}
                    className="custom-table-wrapper"
                  size='small'
                scroll={{x:'max-content',y:500}}
                pagination={{
                    pageSize: 100, 
                    onChange(current, pageSize) {
                        setPage(current);
                        setPageSize(pageSize);
                    }
                }}
                  onChange={onChange} bordered />
            </Card>
        </div>
    )
}

export default AllOrdersGridView;