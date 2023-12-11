import React, { useEffect, useRef, useState } from 'react'
import { ColumnProps, ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Form, Input, Row, Select, Table, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GRNLocationPropsRequest, RequestNoReq } from '@project-management-system/shared-models';
import { LocationMappingService, MaterialIssueService, SampleDevelopmentService } from '@project-management-system/shared-services';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export const MaterialIssuedView = () => {
    const [form] = Form.useForm();
    const locationService = new LocationMappingService();
    const service = new SampleDevelopmentService();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState<number>(null);
    const [sampleData, setSampleData] = useState<any[]>([]);
    const [grndata, setGrndata] = React.useState<any[]>([]);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const Option = Select;
    const [requestNo, setRequestNo] = useState<any>([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllData()
        getAllRequestNo()
    }, [])

    const getAllData = () => {
        const req = new RequestNoReq()
        if (form.getFieldValue("requestNo") !== undefined){
            req.requestNo = form.getFieldValue("requestNo");

        }
        service.getAllMaterialIssue().then((res) => {
            if(res.data){

                setSampleData(res.data);
            // console.log(res.data, "?????????????????????????????");
            }
        })
    }
    const getAllRequestNo = () => {
        service.getRequestno().then((res) => {
          if (res.status) {
            setRequestNo(res.data);
          }
        });
      };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
      };
     
  function onReset() {
    form.resetFields();
    setSampleData([]);
    getAllData()
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
    const columnsSkelton: any = [
        {
            title: 'S No',
            key: 'sno',
            // width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: 'RequestNo',
            dataIndex: "requestNo",
                  width:'200px',
            align: 'left',

              sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
              sortDirections: ['descend', 'ascend'],
       },
        {
            title: 'Quantity',
            dataIndex: "allocate_quantity",
            align: 'left',
            sorter: (a, b) => {
              const allocateQtyA = String(a.allocate_quantity);
              const allocateQtyB = String(b.allocate_quantity);
              return allocateQtyA.localeCompare(allocateQtyB);
            },
            sortDirections: ['descend', 'ascend'],
            
              // ...getColumnSearchProps('allocate_quantity')
        },
       
        {
            title: 'Buyer Name',
            dataIndex: "buyerName",
            align: 'left',
              sorter: (a, b) => a.buyerName.localeCompare(b.buyerName),
              sortDirections: ['descend', 'ascend'],
              ...getColumnSearchProps('buyerName')

        },
        {
            title: 'Buyer Code',
            dataIndex: "buyer_code",
            align: 'left',
              sorter: (a, b) => a.buyer_code.localeCompare(b.buyer_code),
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Brand Name ',
            dataIndex: "brandName",
            align: 'left',
              sorter: (a, b) => a.brandName.localeCompare(b.brandName),
              sortDirections: ['descend', 'ascend'],
              ...getColumnSearchProps('brandName')
        },
        // {
        //     title: 'Item Code ',
        //     dataIndex: "itemCode",
        //     align: 'left',
        //     sorter: (a, b) => a.itemCode.localeCompare(b.itemCode),
        //     sortDirections: ['descend', 'ascend'],
            
        //     //   ...getColumnSearchProps('vendorName')
        // },
        // {
        //     title: 'Location',
        //     dataIndex: "location",
        //     align: 'left',
        //       sorter: (a, b) => a.location.trim().localeCompare(b.location.trim()),
        //       sortDirections: ['descend', 'ascend'],
        //       ...getColumnSearchProps('location')
        // },
       
        {
            title: 'Action',
            dataIndex: 'requestNumber',
            align: "center",
            width: '30px',
            render: (text, rowData, index) => (
              <span>
                <Tooltip placement="top" title="Detail View">
                  <EyeOutlined
                    onClick={() => {
                        navigate('/masters/material-issued-detail-view', { state: {requestId:rowData.sample_request_id} })
                     
                    }}
                    style={{ color: "blue", fontSize: 20 }}
                  />
                </Tooltip>
              </span>
            ),
      
          },
      
      
       
        

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }


    return (
        <div>
            <Card title={<span style={{ color: 'white' }}>Material Issued View</span>}
                // style={{ textAlign: 'center' }} 
                headStyle={{ backgroundColor: '#69c0ff', border: 0 }} >
        <Form form={form} layout="vertical">
        <Row gutter={24}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4}}>
                    <Form.Item
                name="requestNo"
                label="Request No"
                rules={[
                  { required: true, message: "Please input your Request No!" },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="Select Request Number"
                >
                  {requestNo?.map((e) => {
                    return (
                      <Option key={e.SampleRequestId} value={e.SampleRequestId}>
                        {e.requestNo}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              </Col>
              <Col>
              <Button
                onClick={getAllData}
                style={{ marginTop: "23px" }}
                type="primary"
              >
                Search
              </Button>
            </Col>
            <Col span={2}>
              <Button style={{ marginTop: "23px" }} onClick={onReset}>
                Reset
              </Button>
              </Col>
              </Row>
                    </Form>
                <Table
                    rowKey={record => record.productId}
                    className="components-table-nested"
                    columns={columnsSkelton}
                    dataSource={sampleData}
                    pagination={{
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize)
                        }
                    }}
                    onChange={onChange}
                    scroll={{ x: 500 }}
                    // size='small'
                    bordered
                />
            </Card>
        </div>
    )
}

export default MaterialIssuedView;