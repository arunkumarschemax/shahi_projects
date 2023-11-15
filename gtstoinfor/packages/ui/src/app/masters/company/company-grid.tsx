import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Form, Switch, Input, Button, Tag, Row, Col, Drawer, Modal, message, Alert, Checkbox } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
// import { useIntl } from 'react-intl';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { CompanyDto, DivisionDto } from '@project-management-system/shared-models';
import { CompanyService, DivisionService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import CompanyForm from './company-form';
import DivisionForm from './division-form';

export interface CompanyGridProps { }

export const CompanyGrid = (props: CompanyGridProps) => {
  const [searchText, setSearchText] = useState('');
  const [selectedData, setSelectedData] = useState<any>([]);
  const [disable, setDisable] = useState<boolean>(false)
  const [searchedColumn, setSearchedColumn] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [variantData, setVariantData] = useState<CompanyDto[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const columns = useState('');
  const navigate = useNavigate()
  const [form] = Form.useForm();

  // const { formatMessage: fm } = useIntl();
  const service = new CompanyService();
  const Dservice = new DivisionService();


  /**
   * used for column filter
   * @param dataIndex column data index
   */

  const showModal = (id: number) => {
    setIsModalVisible(true);

  };
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

  /**
   * 
   * @param selectedKeys 
   * @param confirm 
   * @param dataIndex 
   */
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
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
      title:<div style={{ textAlign: 'center' }}>Company Name</div> ,
      dataIndex: "companyName",
      sorter: (a, b) => a.source.localeCompare(b.source),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("companyName"),
    },
    ,
    {
      title: <div style={{ textAlign: 'center' }}>Company Code</div>,
      dataIndex: "companyCode",
      sorter: (a, b) => a.source.localeCompare(b.source),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("companyCode"),
    }, ,
    {
      title: <div style={{ textAlign: 'center' }}>Organisation Name</div>,
      dataIndex: "organizationCode",
      sorter: (a, b) => a.source.localeCompare(b.source),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("organizationCode"),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',      align:'center',
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
      onFilter: (value, record) => record.isActive === value,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown" style={{flexDirection:'row',marginLeft:10}}>
          <Checkbox
            checked={selectedKeys.includes(true)}
            onChange={() => setSelectedKeys(selectedKeys.includes(true) ? [] : [true])}
          >
            <span style={{color:'green'}}>Active</span>
          </Checkbox>
          <Checkbox
            checked={selectedKeys.includes(false)}
            onChange={() => setSelectedKeys(selectedKeys.includes(false) ? [] : [false])}
          >
            <span style={{color:'red'}}>Inactive</span>
          </Checkbox>
          <div className="custom-filter-dropdown-btns" >
          <Button  onClick={() => clearFilters()} className="custom-reset-button">
              Reset
            </Button>
            <Button type="primary" style={{margin:10}} onClick={() => confirm()} className="custom-ok-button">
              OK
            </Button>
          
          </div>
        </div>
      ),

    },
    {
      title: `Action`,
      dataIndex: 'action',
      align:'center',
      render: (record, rowData) => (
        <span>
          <EditOutlined className={'editSamplTypeIcon'} type="edit"
            onClick={() => {
              if (rowData.isActive) {
                openFormWithData(rowData);
              } else {
                AlertMessages.getErrorMessage('You Cannot Edit Deactivated Company');
              }
            }}
            style={{ color: '#1890ff', fontSize: '14px' }}
          />

          <Divider type="vertical" />
          <Popconfirm onConfirm={e => { deleteVariant(rowData); }}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate this Company ?'
                : 'Are you sure to Activate this Company ?'
            }
          >
            <Switch size="default"
              className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
              checkedChildren={<RightSquareOutlined type="check" />}
              unCheckedChildren={<RightSquareOutlined type="close" />}
              checked={rowData.isActive}
            />

          </Popconfirm>
          <Divider type='vertical' />
          <Button
            type="primary"
            shape="round"
            size="small"
            onClick={() => openPrint(rowData)}
          >
            Add Division
          </Button>

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
  useEffect(() => { getAllCompany(); }, [])

  const getAllCompany = () => {
    service.getAllCompany().then(res => {
      if (res.status) {
        setVariantData(res.data);
      } else {
        // if (res.intlCode) {
        //   setVariantData([]);
        //   // console.log(res);
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
        AlertMessages.getErrorMessage(res.internalMessage);
        // }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setVariantData([]);
    })
  }


  //drawer related
  const closeDrawer = () => {
    setDrawerVisible(false);
  }

  //TO open the form for updation
  const openFormWithData = (ViewData: CompanyDto) => {
    setDrawerVisible(true);
    setSelectedVariant(ViewData);
  }


  const saveVariant = (variantData: CompanyDto) => {
    variantData.companyId = 0;
    // variantData.isActive=true;
    service.createCompany(variantData).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage('Company Created Successfully');
        // getAllCurrencys();
      } else {
        // if (res.intlCode) {
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
        AlertMessages.getErrorMessage(res.internalMessage);
        // }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  /**
   * 
   * @param variantData 
   */
  const updateCompany = (Data: CompanyDto) => {
    Data.updatedUser = JSON.parse(localStorage.getItem('username'))
    service.updateCompany(Data).then(res => {
      console.log(res);
      if (res.status) {
        AlertMessages.getSuccessMessage('Company Details are Updated Successfully');
        getAllCompany();
        setDrawerVisible(false);
      } else {
        // if (res.intlCode) {
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
        AlertMessages.getErrorMessage(res.internalMessage);
        // }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }
  /**
   * 
   * @param ViewData 
   */
  const deleteVariant = (ViewData: CompanyDto) => {
    ViewData.isActive = ViewData.isActive ? false : true;
    service.ActivatedeActivateCompany(ViewData).then(res => {
      console.log(res);
      if (res.status) {
        message.success(res.internalMessage)
      } else {
        // if (res.intlCode) {
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
        AlertMessages.getErrorMessage(res.internalMessage);
        // }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }


  const openPrint = (rowData: any) => {
    setSelectedData(rowData)
    setIsModalVisible(true);

  }
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onReset = () => {
    form.resetFields();
  };


  const saveDivision = (Data: DivisionDto) => {
    setDisable(true)
    Data.divisionId = 0;
    Dservice.createDivision(Data).then((res) => {
      setDisable(false)
      if (res.status) {
        AlertMessages.getSuccessMessage('Division Created Successfully');
        //   location.push("/Currencies-view");
        onReset();
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    })
      .catch((err) => {
        setDisable(false)
        AlertMessages.getErrorMessage(err.message);
      });
  };
  /**
   *
   * @param values //Dto values
   */
  const saveData = (values: DivisionDto) => {
    setDisable(false)
    // console.log(values);

    // if(values.currencyName.startsWith(" "))
    //   AlertMessages.getErrorMessage("Invalid Input");

    saveDivision(values);
  }




  interface DivisionFormProps {
    // updateItem: (Data: DivisionDto) => void;
    // isUpdate: boolean;
    // Data: any;
    // closeForm: () => void;
  }
  const DivisionForm = (props: DivisionFormProps) => {


    return (
      <Card title="Division" >
        <Form form={form} layout="vertical" onFinish={saveData}>
          <Row gutter={24}>
            <Col>
              <Form.Item style={{ display: 'none' }} label="Company Id" name="companyId" initialValue={selectedData.companyId}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Division Name" name="divisionName"  rules={[ {
                  required: true,
                  message: " Division Name Is Required",
                },]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Division Code" name="divisionCode"  rules={[ {
                  required: true,
                  message: " Division Code Is Required",
                },]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" disabled={disable} htmlType="submit">
                Submit
              </Button>
              {/* {(props.isUpdate===false) && */}
              <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
                Reset
              </Button>
              {/* } */}
            </Col>
          </Row>
        </Form>
      </Card>
    );
  };
  return (

    <>
    <Card title='Company' extra={<span><Button onClick={() => navigate('/global/company/company-form')} type={'primary'}>New</Button></span>}>
   <Row gutter={24}>
        <Col span={4}></Col>
          <Col span={5}>
          {/* <Card title={'Total Company: ' + variantData.length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#bfbfbf' }}></Card> */}
          <Alert type='success' message={'Total Companies: ' + variantData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          {/* <Card title={'Active: ' + variantData.filter(el => el.isActive).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#52c41a' }}></Card> */}
          <Alert type='warning' message={'Active: ' + variantData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />

        </Col>
        <Col span={5}>
        <Alert type='info' message={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
          {/* <Card title={'In-Active: ' + variantData.filter(el => el.isActive == false).length} style={{ textAlign: 'left', width: 200, height: 41, backgroundColor: '#f5222d' }}></Card> */}
        </Col>
        {/* <Col>
          <span><Button onClick={() => navigate('/global/company/company-form')}
            type={'primary'}>New</Button></span>
        </Col> */}
      </Row><br></br>
      <Card >
        <Table
          size='small'

          // rowKey={record => record.variantId}
          columns={columnsSkelton}
          dataSource={variantData}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          scroll={{ x: true }}
          onChange={onChange}
          bordered />
      </Card>
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <CompanyForm key={Date.now()}
            updateItem={updateCompany}
            isUpdate={true}
            // saveItem={saveVariant}
            Data={selectedVariant}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
       </Card> 
      <Modal
        className='print-docket-modal'
        // key={'modal' + Date.now()}
        width={'90%'}
        style={{ top: 30, alignContent: 'right' }}
        visible={isModalVisible}
        title={<React.Fragment>
        </React.Fragment>}
        onCancel={handleCancel}
        footer={[

        ]}
      >
        {<DivisionForm />}
      </Modal>
    </>
  );
}

export default CompanyGrid;