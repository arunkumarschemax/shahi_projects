import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { PoOrderFilter } from "@project-management-system/shared-models";
import { ColorService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select, Table } from "antd"
import { Excel } from "antd-table-saveas-excel";
import { ColumnProps } from "antd/es/table"
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";

export const ColorView = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const service = new ColorService()
    const [data,setData] = useState<any[]>([])
    const [poNumber,setPoNumber] = useState<any[]>([])

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [form] = Form.useForm();
    const { Option } = Select;



    useEffect(() => {
        getInfo()
        getDistinctPoNumber()
    },[])

    const getInfo = () => {

      const req = new PoOrderFilter();
      if (form.getFieldValue("poNumber") !== undefined) {
        req.poNumber = form.getFieldValue("poNumber");
      }
     
        service.getColorInfo(req).then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }

    const getDistinctPoNumber = () => {
      service.getDistinctPoNumber().then(res => {
          if(res.status){
            setPoNumber(res.data)
          }
      })
  }


    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: "block" }}
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
            <Button
              size="small"
              style={{ width: 90 }}
              onClick={() => {
                handleReset(clearFilters);
                setSearchedColumn(dataIndex);
                confirm({ closeDropdown: true });
              }}
            >
              Reset
            </Button>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            type="search"
            style={{ color: filtered ? "#1890ff" : undefined }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
            : false,
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current.select());
          }
        },
        render: (text) =>
          text ? (
            searchedColumn === dataIndex ? (
              <Highlighter
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text.toString()}
              />
            ) : (
              text
            )
          ) : null,
      });

      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
      };

      const onReset = () => {
        form.resetFields();
        getInfo();
      }
    
  

    const columns : any[] = [
        {
            title: 'S No',
            key: 'sno',
            align:"center",
            width:"60px",
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1) + (pageSize * (page - 1))
        },
        {
           
            title:<div style={{textAlign:"center"}}>PO Number</div>,
            width:150,
            dataIndex:'poNumber',
            sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('poNumber')


        },
        {
          title:<div style={{textAlign:"center"}}>Style</div>,
            dataIndex:'style',
            // align:"center",
            width:150,
            sorter: (a, b) => a.style.localeCompare(b.style),
            sortDirections: ["ascend", "descend"],
            ...getColumnSearchProps('style')
        },
        {
          
            title:<div style={{textAlign:"center"}}>RL Field</div>,
            dataIndex:'rlField',
            width:200,
            sorter: (a, b) => a.rlField.localeCompare(b.rlField),
            sortDirections: ["ascend", "descend"],
            ...getColumnSearchProps('rlField')
          
        },
       
        {
           
            title:<div style={{textAlign:"center"}}>CRM Field</div>,
            dataIndex:'crmField',
            width:200,
            sorter: (a, b) => a.crmField.localeCompare(b.crmField),
            sortDirections: ["ascend", "descend"],
            
            ...getColumnSearchProps('crmField')
            
          
        },
      
    ]

    let i = 1;
    const exceldata = [
        // { title: 'S No', dataIndex: 'sNo', render: (text:any, object:any, index:any) => { return i++; } },
        
        { title: 'PO Number', dataIndex: 'poNumber',width:120,render:(text:any,record:any) => {return record.poNumber ? record.poNumber : '-'} },
        { title: 'Style', dataIndex: 'style',width:120,render:(text:any,record:any) => {return record.style ? record.style : '-'} },
        { title: 'RL Field', dataIndex: 'rlField',width:200,render:(text:any,record:any) => {return record.rlField ? record.rlField : '-'} },
        { title: 'CRM Field', dataIndex: 'crmField',width:200,render:(text:any,record:any) => {return record.crmField ? record.crmField : '-'} },
      

    ]

    const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet('Color Excel')
          .addColumns(exceldata)
          .addDataSource(data, { str2num: false })
          .saveAs('Color.xlsx');
      }
    return(
        <Card title='Color' extra={<Link to='/ralph-lauren/masters/color/color-excel-upload' >
        <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
        </Link>}>
            <Row justify={'end'}>
            <Button
                type="default"
                style={{ color: "green" }}
                onClick={exportExcel}
                icon={<FileExcelFilled />}
            >
                Download Excel
            </Button>
            </Row>
            <Form
           onFinish={getInfo}
          form={form}
        // layout='vertical'
        >
          <Row gutter={24}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 6 }}
            >
              <Form.Item name="poNumber" label="PO Number">
                <Select
                  showSearch
                  placeholder="Select PO number"
                  optionFilterProp="children"
                  allowClear
                >
                  {poNumber.map((inc: any) => {
                    return (
                      <Option key={inc.po_number} value={inc.po_number}>
                        {inc.po_number}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 8 }}
              xl={{ span: 4 }}
              style={{ marginLeft: 20 }}

            >
              <Form.Item>
                <Button
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  type="primary"
                  // onClick={getorderData}
                >
                  Search
                </Button>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 5 }}
              lg={{ span: 5 }}
              xl={{ span: 4 }}
              style={{ marginLeft: 70 }}

            >
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  onClick={onReset}
                  icon={<UndoOutlined />}
                >
                  Reset
                </Button>
              </Form.Item>
            </Col>
            </Row>
          </Row>
        </Form>
            <Table className="custom-table-wrapper" columns={columns} dataSource={data} size='small'
              scroll={{x:true}}
            //   pagination={{
            //    pageSize:50,
            //    onChange(current) {
            //      setPage(current);
            //    }
            //  }}
            pagination={false}
        
            />
        </Card>
    )

}

export default ColorView