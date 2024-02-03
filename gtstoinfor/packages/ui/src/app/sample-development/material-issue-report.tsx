import { MaterialIssueService } from '@project-management-system/shared-services';
import { Button, Card, Checkbox, Col, Form, Input, Radio, Row, Select, Space, Table } from 'antd';
// import { RequestNoDto } from 'packages/libs/shared-models/src/common/material-issue/requestno.dto';
import { useEffect, useRef, useState } from 'react';
import './marerial.css';
import moment from 'moment';
import { AllocationReportReq, ItemTypeEnumDisplay, RequestNoDto } from '@project-management-system/shared-models';
import { SearchOutlined } from '@ant-design/icons';
import { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { ColumnType } from 'typeorm';
import FormItem from 'antd/es/form/FormItem';


const { Option } = Select;
const MaterialIssueReport = () => {
  const [form] = Form.useForm();
  const service = new MaterialIssueService();
  const [data, setData] = useState<[]>([]);
  const [req, setReq] = useState<[]>([]);
  const [racks, setRacks] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);
  const [page,setPage] = useState<number>(1);

  useEffect(() => {
    getAllMaterial();
    getRacks()
    getReqNo()
  }, []);

  const getAllMaterial = () => {
    const req = new AllocationReportReq()
    if (form.getFieldValue('requestNo') !== undefined) {
      req.requestNo = form.getFieldValue('requestNo')
    }
    if (form.getFieldValue('rackPosition') !== undefined) {
      req.rackPosition = form.getFieldValue('rackPosition')
    }
    service.getMaterialAllocationReport(req).then((res) => {
      if (res.status) {
        setData(res.data);
      }
    });
  };

  const resetHandler = () => {
    form.resetFields();
    getAllMaterial();

}

  const getRacks = () => {
    service.getRackPositions().then(res => {
      if (res.status) {
        setRacks(res.data)
      }
    }).catch(err => console.log(err))
  }

  const getReqNo = () => {
    service.getSampleReq().then(res => {
      if (res.status) {
        setReq(res.data)
      }
    }).catch(err => console.log(err))
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
        const getColumnSearchProps = (dataIndex: any)=> ({
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
  
  const Columns: any = [
    {
      title: 'S No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      // onCell: (record: any) => ({
      //   rowSpan: record.rowSpan,
      // }),
    },
    {
      title: "Buyer",
      dataIndex: "buyerName",
      width: '150px',
      sorter: (a, b) => a.buyerName.localeCompare(b.buyerName),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("buyerName"),
    },
    {
      title: "Request No",
      dataIndex: "requestNo",
      sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
          sortDirections: ["descend", "ascend"],
      width: '150px',
      // ...getColumnSearchProps("buyerName"),

    },
    {
      title: "Material Type",
      dataIndex: "itemType",
      sorter: (a, b) => a.itemType.localeCompare(b.itemType),
      sortDirections: ["descend", "ascend"],
      render: (text) => {
        const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
        return EnumObj ? EnumObj.displayVal : text;
      },

    },
    {
      title: "Rack Position",
      dataIndex: "rackPosition",
      sorter: (a, b) => a.rackPosition.localeCompare(b.rackPosition),
          sortDirections: ["descend", "ascend"],
    },
    {
      title: "Allocated Qty",
      dataIndex: "allocateQty",
      sorter: (a, b) => a.allocateQty.localeCompare(b.allocateQty),
          sortDirections: ["descend", "ascend"],
    },
    {
      title: "Consumption",
      dataIndex: "combinedConsumption",
      sorter: (a, b) => a.combinedConsumption.localeCompare(b.combinedConsumption),
          sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status ",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["descend", "ascend"],
      onFilter: (value, record) => {
        // Check if the record's item_type includes the selected material type
        return record.status.includes(value);
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown" style={{ flexDirection: 'row', marginLeft: 10 }}>
          <Checkbox
            checked={selectedKeys.includes('MATERIAL ALLOCATED')}
            onChange={() => setSelectedKeys(selectedKeys.includes('MATERIAL ALLOCATED') ? [] : ['MATERIAL ALLOCATED'])}
          >
            <span style={{ color: 'green' }}>MATERIAL ALLOCATED</span>
          </Checkbox><br/>
          <Checkbox
            checked={selectedKeys.includes('MATERIAL ISSUED')}
            onChange={() => setSelectedKeys(selectedKeys.includes('MATERIAL ISSUED') ? [] : ['MATERIAL ISSUED'])}
          >
            <span style={{ color: 'red' }}>MATERIAL ISSUED</span>
          </Checkbox><br/>
          <Checkbox
            checked={selectedKeys.includes('READY FOR PRODUCTION')}
            onChange={() => setSelectedKeys(selectedKeys.includes('READY FOR PRODUCTION') ? [] : ['READY FOR PRODUCTION'])}
          >
            <span style={{ color: 'green' }}>READY FOR PRODUCTION</span>
          </Checkbox>
          <div className="custom-filter-dropdown-btns">
            <Button onClick={() => clearFilters()} className="custom-reset-button">
              Reset
            </Button>
            <Button type="primary" style={{ margin: 10 }} onClick={() => confirm()} className="custom-ok-button">
              OK
            </Button>
          </div>
        </div>
      ),
      filterMultiple: false,
    },
  ]


  return (
    <>
      <Card title="Material Issue Report"  headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
        <div>
          <Form form={form} layout='vertical' onFinish={getAllMaterial}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item name='requestNo' label='Request No'
                  style={{ marginBottom: '10px' }}>
                  <Select 
                  placeholder='Select Request No' 
                   optionFilterProp="children"
                   allowClear
                   showSearch >
                  {req?.map((inc: any) => {
                    return <Option key={inc.requestId} value={inc.requestNo}>{inc.requestNo}</Option>
                  })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name='rackPosition' label='Rack Position'
                  style={{ marginBottom: '10px' }}>
                  <Select 
                  placeholder='Select Rack Position' 
                   optionFilterProp="children"
                   allowClear
                   showSearch >
                  {racks?.map((inc: any) => {
                    return <Option key={inc.positionId} value={inc.rackPosition}>{inc.rackPosition}</Option>
                  })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item style={{ marginTop: '22px' }}>
                  <Button
                    htmlType='submit'
                    type="primary"
                    style={{ width: '80px', marginRight: "10px" }}
                  >Submit</Button>
                  <Button htmlType='reset' danger style={{ width: '80px' }} onClick={resetHandler}>Reset</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Table columns={Columns} dataSource={data} />
        </div>
      </Card>
    </>
  );
};

export default MaterialIssueReport;
