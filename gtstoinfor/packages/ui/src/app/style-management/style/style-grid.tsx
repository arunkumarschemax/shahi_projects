
import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Form, Select, Alert } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { EmployeeDetailsResponse, StyleDto, StyleIdReq, employeeIdReq } from '@project-management-system/shared-models';
import {  BuyersService, StyleService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import moment from 'moment';
import dayjs from 'dayjs';
import StyleForm from './style-form';

export interface EmployeeDetailsGridProps { }

export const StyleGrid = (props: EmployeeDetailsGridProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [variantData, setVariantData] = useState<any[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const columns = useState('');
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const { Option } = Select;
  const service = new StyleService();
  const [buyer, setBuyer] = useState<any[]>([]);
  const buyerService = new BuyersService();

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
const getBuyers = () => {
  buyerService.getAllActiveBuyers().then((res) => {
    if (res.status) {
      setBuyer(res.data);
    }
  });
};
  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };
  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      align:"center",
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      width:'100px',
      sorter: (a, b) => a.buyer.localeCompare(b.buyer),
    ...getColumnSearchProps("buyer"),
    },
    {
        title: "Style",
        dataIndex: "style",
        width:'100px',
        sorter: (a, b) => a.style.localeCompare(b.style),
      ...getColumnSearchProps("style"),
      },
      
      {
        title: "File Name",
        dataIndex: "styleFileName",
        width:'150px',
        sorter: (a, b) => a.styleFileName.localeCompare(b.styleFileName),
      ...getColumnSearchProps("styleFileName"),
      },
    {
      title: "Location",
      dataIndex: "locationId",
      width:'150px',
    },
    {
        title: "PCH",
        dataIndex: "pch",
      width:'100px',
        sorter: (a, b) => a.pch.localeCompare(b.pch),
      ...getColumnSearchProps("pch"),
      },
    
    {
      title: 'Status',
      dataIndex: 'isActive',
      align:"center",
    //   width:'80px',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
        </>
      ),
      filters: [
        {
          text: 'Active',
          value: true,
        },
        {
          text: 'InActive',
          value: false,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        // === is not work
        return record.isActive === value;
      },

    },
    {
      title: `Action`,
      dataIndex: 'action',
      align:"center",
      render: (text, rowData) => (
        <span>
          <EditOutlined className={'editSamplTypeIcon'} type="edit"
            onClick={() => {
              if (rowData.isActive) {
                openFormWithData(rowData);
              } else {
                AlertMessages.getErrorMessage('You Cannot Edit Deactivated employeee');
              }
            }}
            style={{ color: '#1890ff', fontSize: '14px' }}
          />

          <Divider type="vertical" />
          <Popconfirm onConfirm={e => { deleteStyle(rowData); }}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate this Style ?'
                : 'Are you sure to Activate this Style ?'
            }
          >
            <Switch size="default"
              className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
              checkedChildren={<RightSquareOutlined type="check" />}
              unCheckedChildren={<RightSquareOutlined type="close" />}
              checked={rowData.isActive}
            />

          </Popconfirm>
        </span>
      )
    }
  ];

  /**
   * 
   * @param pagination 
   * @param filters 
   * @param sorter 
   * @param extra 
   */
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  useEffect(() => {getAllStyles(undefined);getBuyers()}, [])


  const onFinish= () => {
    getAllStyles(form.getFieldValue("buyerId"))
  }
  const getAllStyles= (buyerId) => {

    service.getAllStyle({buyerId:buyerId}).then(res => {
      if (res.status) {
        setVariantData(res.data);
      } else
       {
        setVariantData([])
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setVariantData([]);
    })
  }
  const onReset = () => {
    form.resetFields();
    getAllStyles(undefined);
  };

  //drawer related
  const closeDrawer = () => {
    setDrawerVisible(false);
  }

  const openFormWithData = (viewdata: StyleDto) => {
    console.log(viewdata)
    setDrawerVisible(true);
    setSelectedVariant(viewdata);
  }


  const updateStyle = (data: StyleDto,filelist:any) => {
    // data.updateUser = JSON.parse(localStorage.getItem('username'))
    service.updateStyle(data).then(res => {
      console.log(res);
      if (res.status) {
        console.log(res.data[0].styleId,'updatee')
        if (filelist.length > 0) {
          const formData = new FormData();
          filelist.forEach((file: any) => {
            formData.append('file', file);
          });
          formData.append('styleId', `${res.data[0].styleId}`)
          console.log(formData)
          service.fileUpload(formData).then(fileres => {
            res.data[0].styleFilePath = fileres.data;
            getAllStyles(undefined);

          })
        }
        AlertMessages.getSuccessMessage('Updated Successfully');
        setDrawerVisible(false);
      } else {     
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const deleteStyle = (data:StyleIdReq ) => {
    data.isActive = data.isActive ? false : true;
    service.ActivateOrDeactivateStyle(data).then(res => {
      console.log(res);
      if (res.status) {
        getAllStyles(undefined);
        AlertMessages.getSuccessMessage(res.internalMessage);
      } else {
        
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  // const updateStyle = () =>{

  // }

  return (
      <>
            <Card title='Styles' extra={<span><Button onClick={() =>  navigate('/style-management/style/style-form')}
              type={'primary'}>New</Button></span>} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>

<Form form={form} layout={"vertical"} onFinish={onFinish}>

<Row gutter={24}>
      <Col span={4}></Col>
     <Col span={5}>

           <Alert type='success' message={'Total Styles: ' + variantData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + variantData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='info' message={'Inactive: ' + variantData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        
           
           
        </Col>
          </Row> 
          <br></br>
        <Row gutter={24}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
            <Form.Item
              name="buyerId"
              label="Buyer"
              rules={[{ required: true, message: "Buyer is required" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Buyer"
              >
                {buyer.map((e) => {
                  return (
                    <Option key={e.buyerId} value={e.buyerId}>
                      {`${e.buyerCode} - ${e.buyerName}`}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} style={{paddingTop:'24px'}}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "green", width: "100%" }}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} style={{paddingTop:'24px'}}>
            <Form.Item>
              <Button
                danger
                icon={<UndoOutlined />}
                onClick={onReset}
                style={{ width: "100%" }}
              >
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <br></br>
   {/* <Row gutter={40}>
        <Col>
          <Card title={'Total Styles: ' + variantData.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card>
        </Col>
        <Col>
          <Card title={'Active: ' + variantData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card>
        </Col>
        <Col>
          <Card title={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card>
        </Col>
      </Row><br></br> */}
     
      <Card>
        <Table
        size='small'
          columns={columnsSkelton}
          dataSource={variantData}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          scroll={{x:true,y:500}}
          onChange={onChange}
          bordered />
      </Card>
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '80%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <StyleForm key={Date.now()}
            updateDetails={updateStyle}
            isUpdate={true}
            // saveItem={saveVariant}
            styleData={selectedVariant}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
              </Card>
   
      </>
  );
}


export default StyleGrid;