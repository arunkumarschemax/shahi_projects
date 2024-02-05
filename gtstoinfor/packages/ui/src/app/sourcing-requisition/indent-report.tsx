import { IndentRequestDto, ItemTypeEnumDisplay, MenusAndScopesEnum } from '@project-management-system/shared-models';
import { IndentService } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useIAMClientState } from '../common/iam-client-react';
import RolePermission from '../role-permissions';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import React from 'react';
import { Excel } from 'antd-table-saveas-excel';
import AlertMessages from '../common/common-functions/alert-messages';
const { Option } = Select;

export const IndentReport = () => {
  const service = new IndentService();
  const [data, setData] = useState<any[]>([]);
  const [drop, dropDown] = useState<any[]>([]);
  const [date, setDate] = useState<any[]>([]);
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const { IAMClientAuthContext } = useIAMClientState();
  const [isBuyer, setIsBuyer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    getIndentData();
    getAll();
    const userrefNo = IAMClientAuthContext.user?.externalRefNo
    if(userrefNo){
      setIsBuyer(true)
      // form.setFieldsValue()
    }
  }, []);
  const checkAccess = (buttonParam) => {  
    const accessValue = RolePermission(null,MenusAndScopesEnum.Menus.Reports,MenusAndScopesEnum.SubMenus['Indent Report'],buttonParam)
    
    return accessValue
  }
  const getIndentData = () => {
    const req =  new IndentRequestDto()

    //  const req =  new IndentRequestDto(form.getFieldValue('requestNo'),form.getFieldValue('indentDate'),form.getFieldValue('indentDate'),IAMClientAuthContext.user?.externalRefNo)
     req.extRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
    if (form.getFieldValue('requestNo') !== undefined) {
      req.requestNo = form.getFieldValue('requestNo')
    } 
    if (form.getFieldValue('indentDate') !== undefined) {
      req.confirmStartDate = (form.getFieldValue('indentDate')[0]).format('YYYY-MM-DD');
    }
    if (form.getFieldValue('indentDate') !== undefined) {
      req.confirmEndDate = (form.getFieldValue('indentDate')[1]).format('YYYY-MM-DD');
    }
        if(checkAccess(MenusAndScopesEnum.Scopes.fabricTab)){
      req.tab= 'FABRIC'
    }
    if(checkAccess(MenusAndScopesEnum.Scopes.trimTab)){
      req.tab= 'TRIM'
    }
    if(checkAccess(MenusAndScopesEnum.Scopes.trimTab) && checkAccess(MenusAndScopesEnum.Scopes.fabricTab)){
      req.tab= 'both'
    }
    if (form.getFieldValue('expectedDate') !== undefined) {
      req.expectedStartDate = (form.getFieldValue('expectedDate')[0]).format('YYYY-MM-DD');
    }
    if (form.getFieldValue('expectedDate') !== undefined) {
      req.expectedEndDate = (form.getFieldValue('expectedDate')[1]).format('YYYY-MM-DD');
    }
    service.getIndentData(req).then((res) => {
      if (res.status) {
        setData(res.data);
      }
      else{
                            AlertMessages.getErrorMessage(res.internalMessage);

      }
    });
  }
  console.log(IAMClientAuthContext.user?.externalRefNo,"jjj")
  // const getAllDate = (req?: IndentRequestDto) => {
  //   service.getIndentDate().then(res => {
  //     if (form.getFieldValue('indentDate') !== undefined) {
  //       req.confirmStartDate = (form.getFieldValue('indentDate')[0]).format('YYYY-MM-DD');
  //     }
  //     if (form.getFieldValue('indentDate') !== undefined) {
  //       req.confirmEndDate = (form.getFieldValue('indentDate')[1]).format('YYYY-MM-DD');
  //     }
  //     if (res.status) {
  //       setDate(res.data)
  //     }
  //   })
  // }
  const resetHandler = () => {
    form.resetFields();
    getIndentData();

  }
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
  const getAll = () => {
    service.getIndentDropDown().then(res => {
      if (res.status) {
        dropDown(res.data)
      }
    })
  }
  const renderCellData = (data) => {
    return data ? data : "-";
  }

  // const onSearch = () => {
  //   form.validateFields().then((values) => {
  //     getIndentData(values);
  //   });
  // }

  const columns: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      style: { background: 'red' },
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    // {
    //     title: "Indent Code",
    //     dataIndex: "requestNo",
    //     width: "110px",
    //     onCell: (record: any) => ({
    //         rowSpan: record.rowSpan,
    //     }),
    //     fixed: 'left',
    // },
    {
      title: "Indent Code",
      dataIndex: "requestNo",
      fixed: 'left',
      width: '150px',
      sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
      sortDirections: ["descend", "ascend"],

    },

    {
      title: "Style",
      dataIndex: "style",
      width: '150px',
      sorter: (a, b) => a.style.localeCompare(b.style),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("style"),
    },
    {
      title: "Indent Date",
      dataIndex: "indentDate",
      sorter: (a, b) => a.indentDate.localeCompare(b.indentDate),
      sortDirections: ["descend", "ascend"],
      width: '150px', render: (text, record) => { return record.indentDate !== null ? moment(record.indentDate).format('YYYY-MM-DD') : "" },

    },
    {
      title: "Expected Date",
      dataIndex: "expectedDate",
      sorter: (a, b) => a.expectedDate.localeCompare(b.expectedDate),
      sortDirections: ["descend", "ascend"],
      width: '150px',
      render: (text, record) => { return record.expectedDate !== null ? moment(record.expectedDate).format('YYYY-MM-DD') : "" },

    },
    {
      title: <div style={{ textAlign: 'center' }}>Material Type</div>,
      dataIndex: "i_items",
      key: "i_items",
      align: 'center',
      render: (i_items, text) => {
        renderCellData(text)
        return (
          <Table
          size='small'
          bordered={false}
            showHeader={false}
            dataSource={i_items}
            columns={[
              {
                dataIndex: "materialtype",
                key: "materialtype", 
                align: 'center',
                render: (text) => {
                  const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
                  return EnumObj ? EnumObj.displayVal : text?text:'-';
                },
    
              },

            ]}
            pagination={false}
          />
        );
      }
    },
    // {
    //   title: <div style={{ textAlign: 'center' }}>Material Code</div>,
    //   dataIndex: "mi_items",
    //   key: "mi_items",
    //   align: 'center',
    //   render: (mi_items, text) => {
    //     renderCellData(text)
    //     return (
    //       <Table
    //         dataSource={mi_items}
    //         columns={[
    //           {
    //             dataIndex: "trimCode/m3FabricCode",
    //             key: "trimCode/m3FabricCode", align: 'center',
    //           },

    //         ]}
    //         pagination={false}
    //       />
    //     );
    //   }
    // },
    // {
    //   title: <div style={{ textAlign: 'center' }}>Colour</div>,
    //   dataIndex: "i_items",
    //   key: "i_items",
    //   align: 'center',
    //   render: (i_items, text) => {
    //     renderCellData(text)
    //     return (
    //       <Table
    //         dataSource={i_items}
    //         columns={[
    //           {
    //             dataIndex: "color",
    //             key: "color", align: 'center',
    //           },

    //         ]}
    //         pagination={false}
    //       />
    //     );
    //   }
    // },
    {
      title: <div style={{ textAlign: 'center' }}>Quantity</div>,
      dataIndex: "i_items",
      key: "i_items",
      align: 'center',
      render: (i_items, text) => {
        renderCellData(text)
        return (
          <Table  size='small'
          bordered={false}
            showHeader={false}
            dataSource={i_items}
            columns={[
              {
                dataIndex: "quantity",
                key: "quantity", align: 'center',
                render:(_,record) =>{
                  return (`${record.quantity}-${record.uom}`)
                 },
              },

            ]}
            pagination={false}
          />
        );
      }
    },
    {
      title: <div style={{ textAlign: 'center' }}>M3 Code</div>,
      dataIndex: "i_items",
      key: "i_items",
      align: 'center',
      render: (i_items, text) => {
        renderCellData(text)
        return (
          <Table  size='small'
          bordered={false}
            showHeader={false}
            dataSource={i_items}
            columns={[
              {
                dataIndex: "m3Code",
                key: "m3Code", align: 'center',
              },

            ]}
            pagination={false}
          />
        );
      }
    },
    {
      title: 'Aging',
      dataIndex: 'expectedDate',
      width: '50px',
      fixed: 'right',
      align: 'right',
      render: (text, record) => {
        const daysDifference = moment(record.expectedDate).diff(moment(), 'days');
        
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
      title: "Status",
      dataIndex: "i_items",
      key: "i_items",
      align: 'center',
      fixed:'right',
      render: (i_items, text) => {
        renderCellData(text)
        return (
          <Table size='small'
          bordered={false}
            showHeader={false}
            dataSource={i_items}
            columns={[
              {
                dataIndex: "status",
                key: "status", 
                align: 'left',
              },

            ]}
            pagination={false}
          />
        );
      }

    },

  ]
  const excelColumns: any = [
    {
      title: 'S No',
      key: 'sno',
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
    },
    
    {
      title: "Indent Code",
      dataIndex: "requestNo",
      
    },

    {
      title: "Style",
      dataIndex: "style",
      },
    {
      title: "Indent Date",
      dataIndex: "indentDate",
       render: (text, record) => { return record.indentDate !== null ? moment(record.indentDate).format('YYYY-MM-DD') : "" },

    },
    {
      title: "Expected Date",
      dataIndex: "expectedDate",
      render: (text, record) => { return record.expectedDate !== null ? moment(record.expectedDate).format('YYYY-MM-DD') : "" },

    },
    {
      title: 'Material Type',
      dataIndex: "materialtype",
      // render: (i_items, text) => {
      //   console.log(i_items,'000');
      //   console.log(text,'111111111111');
      //   const val = text.i_items.map ((e)=>e.materialtype)
      //   console.log(val[0]);
      //   const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === val[0]);
      //   console.log(EnumObj);
        
      //   return val?.[0]? ItemTypeEnumDisplay?.find((item) => item.name === val[0]).displayVal:'-'
      // }
    },
    
    {
      title: 'Quantity',
      dataIndex: "i_items",
      },
    {
      title: 'M3 Code',
      dataIndex: "i_items",
     
    },
    
    {
      title: "Status",
      dataIndex: "i_items", 

    },

  ]
  const exportExcel = () => {
      
    const currentDate = new Date()
    .toISOString()
    .slice(0, 10)
    .split("-")
    .join("/");

  const excel = new Excel();
  
excel
  .addSheet('Indent-report')
  .addColumns(excelColumns)
  excel
  .addDataSource(data, { str2num: true })
  .saveAs(`Indent-report-${currentDate}.xlsx`);
  console.log(excel,'[[[[[[[[');
  

}
  return (
    <div>
      <Card title="Indent Report"     headStyle={{ backgroundColor: '#69c0ff', border: 0 }}  extra={
          <div>
            <Button icon={<DownloadOutlined />} onClick={() => { exportExcel(); }} style={{marginRight:30}}>
              GET EXCEL
            </Button>
            {/* <Button icon={<FilePdfOutlined  />} onClick={() => { handleExportPDF(); }}>
              Download PDF
            </Button> */}
          </div>}>
        <Form form={form}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label='Indent Code' style={{ marginBottom: '10px' }} name={'requestNo'}>
                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Indent Code' >

                  {drop.map(e => {
                    return (
                      <Option key={e.requestNo} value={e.requestNo} name={e.requestNo}> {e.requestNo}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
             
                <Form.Item label="Indent Date" name="indentDate">
              <RangePicker />
            </Form.Item>
            </Col>
            <Col span={5}>
             
                <Form.Item label="Expected Date" name="expectedDate">
              <RangePicker />
            </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item style={{ marginBottom: '10px' }}>
                <Button
                  htmlType='submit'
                  type="primary"
                  style={{ width: '80px', marginRight: "10px" }}

                  onClick={getIndentData}
                >Submit</Button>
                <Button htmlType='reset' danger style={{ width: '80px' }} onClick={resetHandler}>Reset</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table size='small' scroll={{x:'max-content',y:500}}
            columns={columns} dataSource={data} bordered  pagination={{
              pageSize:50,
             onChange(current) {
                setPage(current);
              }
            }} />
      </Card>
    </div>

  )


}

export default IndentReport;

