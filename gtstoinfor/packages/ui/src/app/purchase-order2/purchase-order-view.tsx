import { CloseOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { ItemTypeEnumDisplay, MenusAndScopesEnum, PurchaseOrderStatus, PurchaseOrderStatusEnumDisplay, PurchaseStatusEnum, PurchaseViewDto, StatusEnum } from '@project-management-system/shared-models';
import { PurchaseOrderservice } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, Tabs, Tooltip,Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { log } from 'console';
import Highlighter from 'react-highlight-words';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import RolePermission from '../role-permissions';
export const PurchaseOrderView = () => {
  const [page, setPage] = React.useState(1);

  const [hideCancelButton, setHideCancelButton] = useState(false);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const { RangePicker } = DatePicker;
  let navigate = useNavigate();
  const Service = new PurchaseOrderservice()
  const [form] = Form.useForm();
  const [count, setCount] = useState<any>(0);
  const k = [];
  const [poCount, setpoCount] = useState<number>(0);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const options = [{ value: 'OPEN' }, { value: 'IN PROGRESS' }, { value: 'CLOSED' }, { value: 'CANCELED' }];
  const externalRefNo = JSON.parse(localStorage.getItem('currentUser')).user.externalRefNo
  const { Option } = Select
  
 
  const checkAccess = (buttonParam) => {   
    const accessValue = RolePermission(null,MenusAndScopesEnum.Menus.Procurment,MenusAndScopesEnum.SubMenus['Purchase Order'],buttonParam)
    // console.log(accessValue,'access');
    
    return accessValue
}
useEffect(() => {
  // if (data) {

// }
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
     const req = new PurchaseViewDto(null,null,null,null,null,form.getFieldValue('poStatus'),null,externalRefNo)
     if (form.getFieldValue('orderDate') !== undefined) {
      req.poconfirmStartDate = (form.getFieldValue('orderDate')[0]).format('YYYY-MM-DD')
    }
    if (form.getFieldValue('orderDate') !== undefined) {
    req.poconfirmEndDate = (form.getFieldValue('orderDate')[1]).format('YYYY-MM-DD')
    }
     if (form.getFieldValue('deliveryDate') !== undefined) {
      req.confirmStartDate = (form.getFieldValue('deliveryDate')[0]).format('YYYY-MM-DD')
    }
    if (form.getFieldValue('deliveryDate') !== undefined) {
    req.confirmEndDate = (form.getFieldValue('deliveryDate')[1]).format('YYYY-MM-DD')
    }
    if(checkAccess(MenusAndScopesEnum.Scopes.trimTab)){
      req.tab = "TRIM"
    }
    if(checkAccess(MenusAndScopesEnum.Scopes.fabricTab)){
      req.tab = "FABRIC"
        }
        if(checkAccess(MenusAndScopesEnum.Scopes.fabricTab) && checkAccess(MenusAndScopesEnum.Scopes.trimTab)){
          req.tab = undefined
            }
    Service.getAllPurchaseOrderData(req).then((res)=>{
      if(res.status){
        setData(res.data)
        const count =res.data.reduce((total,record:any)=>{
if(record.count >0){
  return total + 1;

}else{
  return total;

} 
        },0)
        setpoCount(count);
      }
    
  if(req){
Service.getAllPurchaseOrderData(req).then(res=>{
  if (res.status) {
    setData(res.data);
    const count = res.data.reduce((total, record:any) => {
      if (record.count > 0) {
        return total + 1;
      } else {
        return total;
      }
    }, 0);
    setpoCount(count);
  } else{
    setData([])
  }
})
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
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  // const onSearch = (value: string) => {
  //   console.log('search:', value);
  // };
  
  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const columns: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '50px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 20 + (index + 1),
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: 'PO Number',
      dataIndex: 'poNumber',
      width: '100px',
      ...getColumnSearchProps("poNumber"),

      render: text => (text ? text : "-")
    },
    {
      title: 'PO Against',
      dataIndex: 'poAgainst',
      width: '100px',
      render: text => (text ? text : "-"),
    },
    {
      title: 'Material Type',
      dataIndex: 'poMaterialtype',
      width: '80px',
      sorter: (a, b) => a.poMaterialtype.localeCompare(b.poMaterialtype),
      sortDirections: ["descend", "ascend"],
          ...getColumnSearchProps("poMaterialtype"),
          render: (text) => {
            const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
            return EnumObj ? EnumObj.displayVal : text;
          },
    },
   

    
    // {
    //   title: <div style={{ textAlign: 'center' }}>M3 ItemCode</div>,
    //   dataIndex: 'fabInfo',
    //   key:'fabInfo',
    //   width: '150px',
    //   align: 'center',

    //   render:(fabInfo,text)=>{
    //     renderCellData(text)
    //     return(
    //       <Table 
    //       dataSource={fabInfo}
    //       columns={[
    //         {
    //           dataIndex:"itemCode",
    //           key:"itemCode",align:'center',
    //         }
    //       ]}
    //       pagination={false}
    //       />
          
    //     )
    //   }
    // },
    // {
    //   title: <div style={{ textAlign: 'center' }}>M3 trimCode</div>,
    //   dataIndex: 'triminfo',
    //   key:"triminfo",
    //   width: '150px',
    //   align: 'center',
    //   render: (triminfo, text) => {
    //     renderCellData(text)
    //     return (
    //       <Table
    //         dataSource={triminfo}
    //         columns={[
    //           {
    //             dataIndex: "trimcode",
    //             key: "trimcode", align: 'center',
    //           },

    //         ]}
    //         pagination={false}
    //       />
    //     );
    //   }
    // },
    // {
    //   title: <div style={{ textAlign: 'center' }}>M3 TrimType</div>,
    //   dataIndex: 'triminfo',
    //   key:"triminfo",
    //   width: '150px',
    //   align: 'center',
    //   render: (triminfo, text) => {
    //     renderCellData(text)
    //     return (
    //       <Table
    //         dataSource={triminfo}
    //         columns={[
    //           {
    //             dataIndex: "trimtype",
    //             key: "trimtype", align: 'center',
                
    //           },

    //         ]}
    //         pagination={false}
    //       />
    //     );
    //   }
    // },
    {
      title: 'Vender Name',
      dataIndex: 'vendorName',
      sorter: (a, b) => a.vendorName.localeCompare(b.vendorName),
      sortDirections: ["descend", "ascend"],
          ...getColumnSearchProps("vendorName"),
      width: '100px',

    },
    // {
    //   title: 'BuyerName',
    //   dataIndex: 'buyername',
    //   sorter: (a, b) => a.buyername.localeCompare(b.buyername),
    //   sortDirections: ["descend", "ascend"],
    //       ...getColumnSearchProps("buyername"),
    //   width: '100px',

    // },
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
      title: 'Po Status',
      dataIndex: 'poStatus',
      width: '80px',
      sorter: (a, b) => a.poStatus.localeCompare(b.poStatus),
      sortDirections: ["descend", "ascend"],
          // ...getColumnSearchProps("poStatus"),
    },
    {
      title: 'Aging(EDD)',
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
              background: daysDifference > 0 ? '#3BC744' : '#FF0000',
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
      fixed:'right',
      width: '30px',
      render: (text, rowData, index) => (
        <span>
          <Tooltip placement="top" title="Detail View">
            <EyeOutlined
              onClick={() => {
                console.log(rowData.purchaseOrderId);

                navigate('/purchase-detali-view', { state: rowData.purchaseOrderId })

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
  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };
  console.log(StatusEnum.OPEN,"pppppppppppp");
  
  return (
    <div><Card title="Purchase Orders" 
    headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
    // extra={<Link to={'/purchase-order'}><Button className='panel_button'>Create</Button></Link>}
    >
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
          
          <Col span={6}>
            <Form.Item label="PO Status	" name="poStatus" initialValue={[PurchaseOrderStatus.OPEN, PurchaseOrderStatus.IN_PROGRESS]}>
            <Select showSearch allowClear optionFilterProp="children" placeholder='Select status' mode="multiple" 
            defaultValue ={[PurchaseOrderStatus.OPEN, PurchaseOrderStatus.IN_PROGRESS]}
           >   {PurchaseOrderStatusEnumDisplay.map(e => {
            return (
                <Option key={e.name} value={e.displayVal} > {e.displayVal}</Option>
            )
        })}</Select>
            {/* <Select
                mode="multiple"
                tagRender={tagRender}
                defaultValue={['OPEN', 'IN PROGRESS']}
                style={{ width: '100%' }}
                options={options}
                
              /> */} 
             </Form.Item>
          </Col>
          <Col span={2}>
            <Button htmlType='submit' type="primary" onClick={onSearch}> Get Detail </Button>
          </Col>
          <Col span={2}>
            <Button htmlType='reset' danger onClick={resetHandler}>Reset</Button>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} sm={24} md={5} lg={5} xl={{ span: 2 }}>
            <Card  size="small" title={'OPEN :' + data.filter(r => r.poStatus == PurchaseStatusEnum.OPEN).length} style={{ height: '35px', width: 100, backgroundColor: '#d4e09b', borderRadius: 3 }}></Card>
            
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={5} lg={5} xl={{ span: 3 }}>
            <Card size="small" title={'INPROGRESS  : ' + data.filter(r => r.poStatus === PurchaseStatusEnum.INPROGRESS).length} style={{ height: '35px', width: 150, marginBottom: '8', backgroundColor: '#f6f4d2', borderRadius: 3 }}></Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }}>
            <Card size="small" title={'CLOSED : ' + data.filter(r => r.poStatus === PurchaseStatusEnum.CLOSED).length} style={{ height: '35px', width: 150, backgroundColor: '#cbdfbd', marginBottom: '2px', borderRadius: 3 }}></Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }}>
            <Card size="small" title={'CANCLED : ' + data.filter(r => r.poStatus === PurchaseStatusEnum.CANCELLED).length} style={{ height: '35px', backgroundColor: '#ffd6ba', marginBottom: '2px', borderRadius: 3 }}></Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }}>
            <Card size="small" title={'TOTAL : ' + data.length} style={{ height: '35px', backgroundColor: '#ece4db ', marginBottom: '2px', borderRadius: 3 }}></Card>
          </Col>
          
        </Row> 


        {/* <Tabs
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

{/* <Tabs
  defaultActiveKey="1"
  type="card"
  onChange={getPo}
  items={Object.keys(PurchaseStatusEnum).map((key, i) => {
    const colours = ['#F5222D', '#52C41A', '#722ED1', '#663300'];
    let counts: number;
    if (count.length) {
      counts = count[i] ? count[i][PurchaseStatusEnum[key]] : 0;
      k.push(counts);
    }

    return {
      label: <span style={{ color: colours[i] }}>{PurchaseStatusEnum[key] + ":" + " " + (counts ? counts : 0)}</span>,
      key: key,
    };
  })}
/> */}


      </Form>
      <Card>
        {/* <Table columns={columns} dataSource={data} bordered /> */}

        <Table columns={columns} dataSource={data} bordered size='small' pagination={{
          pageSize:20,
          onChange(current) {
            setPage(current);
          }
        }} />

      </Card>
    </Card>

    </div>
  )
}

export default PurchaseOrderView;

