import { CloseOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { PurchaseStatusEnum, PurchaseViewDto } from '@project-management-system/shared-models';
import { PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, Tabs, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { log } from 'console';
import Highlighter from 'react-highlight-words';

export const PurchaseOrderView = () => {
  const page = 1;
  const [hideCancelButton, setHideCancelButton] = useState(false);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const { RangePicker } = DatePicker;
  let navigate = useNavigate();
  const Service = new PurchaseOrderservice()
  const [form] = Form.useForm();
  const [count, setCount] = useState<any>(0);
  const k = [];
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  // let Location = useLocation()
  // const stateData = Location.state.data

  useEffect(() => {
    getPo();
  }, [])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
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
  const getPo = (status?: PurchaseStatusEnum) => {
    // if (status === PurchaseStatusEnum.INPROGRESS) {
    //   status === "IN PROGRESS"
    // }
    console.log(status, 'ttttttttttttttttttttttt');

    // const req = new PurchaseViewDto()
    // if (form.getFieldValue('deliveryDate') !== undefined) {
    //   req.confirmStartDate = (form.getFieldValue('deliveryDate')[0]).format('YYYY-MM-DD');
    // }
    // if (form.getFieldValue('deliveryDate') !== undefined) {
    //   req.confirmEndDate = (form.getFieldValue('deliveryDate')[1]).format('YYYY-MM-DD');
    // }
    // if (form.getFieldValue('orderDate') !== undefined) {
    //   req.poconfirmStartDate = (form.getFieldValue('orderDate')[0]).format('YYYY-MM-DD');
    // }
    // if (form.getFieldValue('orderDate') !== undefined) {
    //   req.poconfirmEndDate = (form.getFieldValue('orderDate')[1]).format('YYYY-MM-DD');
    // };
    // req.status = status
    // Service.getAllPurchaseOrderData().then((res) => {
    //   console.log(res,"llllllllllllll");
      
    //   if (res.status) {
    //     console.log(res,":::::::::::::::::");
        
    //     setCount(res?.data[res.data?.length - 1]);
    //     res.data.pop()
    //     setData(res.data);
    //   } else {
    //     setData([])
    //   }
    // })

    Service.getAllPurchaseOrderData().then((res)=>{
      if(res.status){
        setData(res.data)
      }else{
        setData([])
      }
    })
  }
  const onSearch = () => {
    form.validateFields().then((values) => {
      getPo();
    });
  }

  const resetHandler = () => {
    form.resetFields();
    getPo();

  }


  const renderCellData = (data) => {
    return data ? data : "-";
  }


  const columns: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '50px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: 'PO Number',
      dataIndex: 'poNumber',
      width: '150px',
      render: text => (text ? text : "-")
    },
    
    // {
    //   title: 'Material Type',
    //   dataIndex: 'materialType',
    //   width: '80px'
    // },

    {
      title: <div style={{ textAlign: 'center' }}>M3 ItemCode</div>,
      dataIndex: 'fabInfo',
      key:'fabInfo',
      width: '150px',
      align: 'center',

      render:(fabInfo,text)=>{
        renderCellData(text)
        return(
          <Table 
          dataSource={fabInfo}
          columns={[
            {
              dataIndex:"itemCode",
              key:"itemCode",align:'center',
              render: text => (text ? text : "-")
            }
          ]}
          pagination={false}
          />
          
        )
      }
    },
    {
      title: <div style={{ textAlign: 'center' }}>M3 trimCode</div>,
      dataIndex: 'triminfo',
      key:"triminfo",
      width:"150px",

      align: 'center',
      ...getColumnSearchProps("trimcode"),

      render: (triminfo, text) => {
        renderCellData(text)
        return (
          <Table
            dataSource={triminfo}
            columns={[
              {
                dataIndex: "trimcode",
                key: "trimcode", align: 'center',
                render: text => (text ? text : "-")
              },

            ]}
            pagination={false}
          />
        );
      }
    },
    {
      title: <div style={{ textAlign: 'center' }}>M3 TrimType</div>,
      dataIndex: 'triminfo',
      key:"triminfo",
      ...getColumnSearchProps("trimtype"),
      width:"150px",
      align: 'center',
      render: (triminfo, text) => {
        renderCellData(text)
        return (
          <Table
            dataSource={triminfo}
            
            columns={[
              {
                dataIndex: "trimtype",
                
                key: "trimtype", align: 'center',
                render: text => (text ? text : "-")
                
              },

            ]}
            pagination={false}
          />
        );
      }
    },
    {
      title: 'Buyer Name',
      dataIndex: 'buyername',
      ...getColumnSearchProps("buyername"),

      width: '100px',

    },
    {
      title: <div style={{ textAlign: 'center' }}>Po Date</div>,
      dataIndex: 'purchaseOrderDate',
      width: '80px',

      render: (text, record) => {
        return record.purchaseOrderDate
          ? moment(record.purchaseOrderDate).format('YYYY-MM-DD')
          : "";
      },
    },
    // {
    //   title: 'VenderName',
    //   dataIndex: 'vendorName',
      
    //   width: '100px',

    // },
    
    {
      title: 'Expected Date',
      dataIndex: 'expectedDeliverydate',
      width: '90px',
      render: (text, record) => {
        return record.expectedDeliverydate
          ? moment(record.expectedDeliverydate).format('YYYY-MM-DD')
          : "";
      },
    },
    {
      title: 'Aging(EPD)',
      dataIndex: 'expectedDeliverydate',
      width: '20px',
      fixed: 'right',
      align: 'right',
      render: (text, record) => {
        const daysDifference = moment(record.expectedDeliverydate).diff(moment(), 'days');
        const age = {
          children: daysDifference,
          props: {
            style: {
              background: daysDifference > 0 ? '#3BC744' : '',
              color: 'black',
            },
          },
        };
        return age;
      },
    },
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
                console.log(rowData.id);

                navigate('/purchase-detali-view', { state: rowData.id })

                // setHideCancelButton(false);
                // DetailView(rowData.SampleRequestId, false);
              }}
              style={{ color: "blue", fontSize: 20 }}
            />
          </Tooltip>
        </span>
      ),

    },


  ];

  const CustomTitle=()=>{
    return (
      <div>
        <tr>
          <th>
            <td style={{marginLeft:10,width:150}}> Item Code</td>
          </th>
        </tr>
      </div>
    )
  }
  return (
    <div><Card title="Purchase Orders" headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<Link to={'/purchase-order'}><Button className='panel_button'>Create</Button></Link>}>
      <Form form={form}>
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item label="Po Date" name="orderDate">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Expected Date	" name="deliveryDate">
              <RangePicker />
            </Form.Item>
          </Col>

          <Col span={2}>
            <Button htmlType='submit' type="primary" onClick={onSearch}> Get Detail </Button>
          </Col>
          <Col span={2}>
            <Button htmlType='reset' danger onClick={resetHandler}>Reset</Button>
          </Col>
        </Row>
        {/* <Row gutter={24}>
          <Col className="gutter-row" xs={24} sm={24} md={5} lg={5} xl={{ span: 2 }}>
            <Card size="small" title={'OPEN :' + data.filter(r => r.status === 'OPEN').length} style={{ height: '35px', width: 100, backgroundColor: '#FFFFFF', borderRadius: 3 }}></Card>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={5} lg={5} xl={{ span: 3 }}>
            <Card size="small" title={'INPROGRESS  : ' + data.filter(r => r.status === 'INPROGRESS').length} style={{ height: '35px', width: 150, marginBottom: '8', backgroundColor: '#FFFFFF', borderRadius: 3 }}></Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }}>
            <Card size="small" title={'CLOSED : ' + data.filter(r => r.status === 'CLOSED').length} style={{ height: '35px', width: 150, backgroundColor: '#FFFFFF', marginBottom: '2px', borderRadius: 3 }}></Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }}>
            <Card size="small" title={'CANCLED : ' + data.filter(r => r.status === 'CANCLED').length} style={{ height: '35px', backgroundColor: '#FFFFFF', marginBottom: '2px', borderRadius: 3 }}></Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }}>
            <Card size="small" title={'TOTAL : ' + data.length} style={{ height: '35px', backgroundColor: '#FFFFFF', marginBottom: '2px', borderRadius: 3 }}></Card>
          </Col>
        </Row> */}

        <Tabs
          defaultActiveKey="1"
          type="card"
          onChange={getPo}
          // size={size}
          items={Object.keys(PurchaseStatusEnum).map((key, i) => {
            const colours = ['#F5222D', '#52C41A', '#722ED1', '#663300'];
            let counts: number;
            if (count.length) {
              counts = count[i] ? count[i][PurchaseStatusEnum[key]] : 0;
              k.push(counts)
            };
            return {
              label: <span style={{ color: colours[i] }}>{PurchaseStatusEnum[key] + ":" + " " + (counts ? counts : 0)}</span>,
              key: key,
            };
          })}
        />
      </Form>
      <Card>
        {/* <Table columns={columns} dataSource={data} bordered /> */}

        <Table columns={columns} dataSource={data} bordered size='small' />

      </Card>
    </Card>

    </div>
  )
}

export default PurchaseOrderView;

