import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message, Form, Select, Space, Alert, Checkbox } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined, CheckOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps, ColumnType } from 'antd/lib/table';
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import { VendorFilterRequest, VendorRequest, VendorsDto } from '@project-management-system/shared-models';
import { VendorsService } from '@project-management-system/shared-services';
import VendorsForm from './vendors-form';


const {Option} = Select;


/* eslint-disable-next-line */
export interface VendorsGridProps {}

export function VendorsView(
  props: VendorsGridProps
) {
  
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [vendorsData, setVendorsData] = useState<VendorsDto[]>([]);
  const [selectedVendorsData, setSelectedVendorsData] = useState<any>(undefined);
  const [vendorview, setVendorView]=useState(false);
  const [vendorIds, setVendorIds]=useState();
  const vendorsService=new VendorsService();
  const [vendorCodeData, setVendorCodeData] = useState<VendorsDto[]>([]);
  const [vendorContactData, setVendorContactData] = useState<VendorsDto[]>([]);
  const [vendorCityData, setVendorCityData] = useState<VendorsDto[]>([]);
  const [form] = Form.useForm()
  let navigate = useNavigate()

  useEffect(() => {
    getAllVendors();
    getVendorCodeDropdown()
    getVendorContactDropdown()
    getVendroCityDropdown() 

  }, []);

  /**
   * 
   */

  const getVendorCodeDropdown = () => {
    vendorsService.getVendorCodeDropdown().then(res => {
      if(res.status){
        setVendorCodeData(res.data)
      } else{
        // message.error(res.internalMessage)
      }
    })
  }

  const getVendorContactDropdown = () => {
    vendorsService.getVendorContactDropdown().then(res => {
      if(res.status){
        setVendorContactData(res.data)
      } else{
        // message.error(res.internalMessage)
      }
    })
  }

  const getVendroCityDropdown = () => {
    vendorsService.getVendorCityDropdown().then(res => {
      if(res.status){
        setVendorCityData(res.data)
      } else{
        // message.error(res.internalMessage)
      }
    })
  }

  const getAllVendors= () => {
    const req = new VendorFilterRequest()
    if(form.getFieldValue('vendorCode') != undefined){
      req.vendorCode = form.getFieldValue('vendorCode')
    }
    if(form.getFieldValue('contactNumber') != undefined){
      req.contactNumber = form.getFieldValue('contactNumber')
    }
    if(form.getFieldValue('city') != undefined){
      req.city = form.getFieldValue('city')
    }
    if(form.getFieldValue('gstNumber') != undefined){
      req.gstNumber = form.getFieldValue('gstNumber')
    }
    vendorsService.getAllVendors(req).then(res => {
      if (res.status) {
        setVendorsData(res.data);
      } else {
         message.error(res.internalMessage);
      }
    }).catch(err => {
      setVendorsData([]);
      message.error(err.message);
    })
  }

  const onReset = () => {
    form.resetFields()
    getAllVendors()
  }
  /**
   * 
   * @param unitcodeData 
   */
  const deleteVendor = (vendorsData:VendorsDto) => {
    vendorsData.isActive=vendorsData.isActive?false:true;
    const req = new VendorRequest(vendorsData.vendorId,'admin',vendorsData.versionFlag,vendorsData.isActive)
    vendorsService.activateOrDeactivateVendor(req).then(res => { 
      if (res.status) {
        getAllVendors();
        message.success(res.internalMessage);
      } else {
          message.error(res.internalMessage);
      }
    }).catch(err => {
      message.error(err.message);
    })
  }
   

    const updateVendor = (vendorData: VendorsDto) => {
      vendorsService.update(vendorData).then(res => {
        if (res.status) {
          getAllVendors();
          setDrawerVisible(false);
          message.success('Updated Successfully');
          
        } else {
            message.error(res.internalMessage);
        }
      }).catch(err => {
        message.error(err.message);
      })
    }
  
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
  
      //drawer related
      const closeDrawer=()=>{
        setDrawerVisible(false);
      }
    
      //TO open the form for updation
      const openFormWithData=(viewData: VendorsDto)=>{
        viewData.createdUser = localStorage.getItem('createdUser');
        setDrawerVisible(true);
        setSelectedVendorsData(viewData);
      }
  
  

      const columnsSkelton: ColumnProps<any>[] = [
        {
          title: 'S No',
          key: 'sno',
          width: '70px',
          responsive: ['sm'],
          render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
          dataIndex:"vendorCode",
          title:<div style={{textAlign:'center'}}>Vendor Code</div>,
          // responsive: ['lg'],
          sorter: (a, b) => a.vendorCode?.localeCompare(b.vendorCode),
          sortDirections: ['descend', 'ascend'],
          ...getColumnSearchProps('vendorCode')
        },
        {
          dataIndex:"vendorName",
          title:<div style={{textAlign:'center'}}>Vendor Name</div>,
          // responsive: ['lg'],
          sorter: (a, b) => a.vendorName.localeCompare(b.vendorName),
          sortDirections: ['descend', 'ascend'],
          ...getColumnSearchProps('vendorName')
        },
        // {
        //   dataIndex:"priceNeeded",
        //   title:<div style={{textAlign:'center'}}>Price Needed</div>,
        //   // responsive: ['lg'],
        //   filters: [
        //     {
        //       text: 'YES',
        //       value: GlobalStatus.YES,
        //     },
        //     {
        //       text: 'NO',
        //       value: GlobalStatus.NO,
        //     },
        //   ],
        //   filterMultiple: false,
        //   onFilter: (value, record) => 
        //   {
        //     // === is not work
        //     return record.priceNeeded === value;
        //   },
          
        // },
        
        // {
        //   dataIndex:"website",
        //   title:<div style={{textAlign:'center'}}>Website</div>,
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('website')
        // },
        {
          dataIndex:"contactPerson",
          title:<div style={{textAlign:'center'}}>Contact Person</div>,
          // responsive: ['lg'],
          sorter: (a, b) => a.contactPerson.localeCompare(b.contactPerson),
          sortDirections: ['descend', 'ascend'],
          ...getColumnSearchProps('contactPerson')
        },
        {
          dataIndex:"contactNumber",
          title:<div style={{textAlign:'center'}}>Contact Number</div>,
          // responsive: ['lg'],
          sorter: (a, b) => a.contactNumber.localeCompare(b.contactNumber),
          sortDirections: ['descend', 'ascend'],
          ...getColumnSearchProps('contactNumber')
        },
        {
          dataIndex:"gstNumber",
          title:<div style={{textAlign:'center'}}>GST Number</div>,
          // responsive: ['lg'],
          sorter: (a, b) => a.gstNumber.localeCompare(b.gstNumber),
          sortDirections: ['descend', 'ascend'],
          ...getColumnSearchProps('gstNumber')
        },
        // {
        //   dataIndex:"apartment",
        //   title:<div style={{textAlign:'center'}}>Apartment</div>,
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('apartment')
        // },
        {
          dataIndex:"city",
          title:<div style={{textAlign:'center'}}>City</div>,
          // responsive: ['lg'],
          sorter: (a, b) => a.city?.localeCompare(b.city),
          sortDirections: ['descend', 'ascend'],
          ...getColumnSearchProps('city')
        },
        // {
        //   dataIndex:"postalCode",
        //   title:<div style={{textAlign:'center'}}>PostalCode</div>,
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('postalCode')
        // },
        // {
        //   dataIndex:"countryName",
        //   title:<div style={{textAlign:'center'}}>Country</div>,
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.countryName.localeCompare(b.countryName),
        //   sortDirections: ['descend', 'ascend'],
        // //   ...getColumnSearchProps('countryName')
        // },
        // {
        //   dataIndex:"currencyName",
        //   title:<div style={{textAlign:'center'}}>Currency</div>,
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.currencyName.localeCompare(b.currencyName),
        //   sortDirections: ['descend', 'ascend'],
        // //   ...getColumnSearchProps('currencyName'),
        // },
        // {
        //   dataIndex:"privateNote",
        //   title:<div style={{textAlign:'center'}}>Private Note</div>,
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('privateNote')
        // },
        // {
        //   dataIndex:"publicNote",
        //   title:<div style={{textAlign:'center'}}>PublicNote</div>,
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('publicNote')
        // },
        // {
        //   dataIndex:"bankAccNo",
        //   title:<div style={{textAlign:'center'}}>BankAccNo</div>,
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('bankAccNo')
        // },
        // {
        //   dataIndex:"bankIfsc",
        //   title:<div style={{textAlign:'center'}}>BankIfsc</div>,
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('bankIfsc')
        // },
        // {
        //   dataIndex:"bankName",
        //   title:<div style={{textAlign:'center'}}>BankName</div>,
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('bankName')
        // },
        // {
        //   dataIndex:"bankBranch",
        //   title:<div style={{textAlign:'center'}}>BankBranch</div>,
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('bankBranch')
        // },

        // {
        //   dataIndex:"emailId",
        //   title:<div style={{textAlign:'center'}}>EmailId</div>,
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('emailId')
        // },

  
       
        {
          title:<div style={{textAlign:'center'}}>Status</div>,
          dataIndex: 'isActive',
          align:'center',
          render: (isActive, rowData) => (
            <>
              {isActive?<Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag>:<Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
              
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
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : any) => (
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
          title:<div style={{textAlign:'center'}}>Action</div>,
          dataIndex: 'action',
          align:'center',
          render: (text, rowData) => (
            <span>   
                 
                <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
                  onClick={() => {
                    if (rowData.isActive) {
                      openFormWithData(rowData);
                    } else {
                      message.error('You Cannot Edit Deactivated Vendor');
                    }
                  }}
                  style={{ color: '#1890ff', fontSize: '14px' }}
                />

              <Divider type="vertical" />
                <Popconfirm onConfirm={e =>{deleteVendor(rowData);}}
                title={
                  rowData.isActive
                    ? 'Are you sure to Deactivate vendor ?'
                    :  'Are you sure to Activate vendor ?'
                }
              >
                <Switch  size="default"
                    className={ rowData.isActive ? 'toggle-activated' : 'toggle-deactivated' }
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
      const onChange=(pagination, filters, sorter, extra)=> {
        console.log('params', pagination, filters, sorter, extra);
      }
    


  return (
    <>
    {/* <Card title={<span style={{color:'white'}}>Vendors</span>}
    style={{textAlign:'center'}} headStyle={{backgroundColor: '#69c0ff', border: 0 }} extra={<Link to='/vendors-form' ><Button className='panel_button' >Create </Button></Link>}
    
    > */}
    <Card title='Vendors' extra={<span><Button onClick={() => navigate('/masters/vendors/vendors-form')} type={'primary'}>New</Button></span>}>
     <Row gutter={24}>
      {/* <Col>
          <Card title={'Total Vendors : ' + vendorsData.length} style={{textAlign: 'left', width: 210, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Active: ' + vendorsData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active :' + vendorsData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
          </Col> */}
           <Col span={4}></Col>
       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 5}}>
        <Alert type='success' message={'Total Vendors: ' + vendorsData.length} style={{fontSize:'15px'}} />
        </Col>
           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 5}}>
          <Alert type='warning' message={'Active: ' + vendorsData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 5}}>
          <Alert type='info' message={'In-Active: ' + vendorsData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        </Col>
          </Row>
          <br></br>
          {/* <Form form={form} layout='vertical' onFinish={getAllVendors}>
            <Row gutter={24}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 4}}>
            <Form.Item label='Vendor Code' name='vendorCode'>
              <Select
                showSearch
                allowClear
                optionFilterProp='children'
                placeholder='Select Vendor Code'
              >
                {
                  vendorCodeData.map((e)=>{
                    return(
                      <Option key={e.vendorCode} value={e.vendorCode}>{e.vendorCode}--{e.vendorName}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 4}}>
            <Form.Item label='Vendor Contact' name='contactNumber'>
              <Select
                showSearch
                allowClear
                optionFilterProp='children'
                placeholder='Select Vendor Contact'
              >
                {
                  vendorContactData.map((e)=>{
                    return(
                      <Option key={e.contactNumber} value={e.contactNumber}>{e.contactNumber}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 4}}>
            <Form.Item label='City' name='city'>
              <Select
                showSearch
                allowClear
                optionFilterProp='children'
                placeholder='Select City'
              >
                {
                  vendorCityData.map((e)=>{
                    return(
                      <Option key={e.city} value={e.city}>{e.city}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 4}}>
            <Form.Item label='GST Number' name='gstNumber'>
              <Select
                showSearch
                allowClear
                optionFilterProp='children'
                placeholder='Select GST Number'
              >
                {
                  vendorCityData.map((e)=>{
                    return(
                      <Option key={e.city} value={e.city}>{e.city}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 2}} style={{marginTop:'2%'}}>

            <Button type="primary" htmlType="submit" >
              Search
                </Button>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 2}} style={{marginTop:'2%'}}>
              <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
                Reset
          </Button>
          </Col>
            </Row>
          </Form> */}
          <Table
          rowKey={record => record.deptId}
          columns={columnsSkelton}
          dataSource={vendorsData}
          scroll={{ x:500 }}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
          onChange={onChange}
          bordered
          size='small' />
        <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '80%' : '85%'}
            onClose={closeDrawer} visible={drawerVisible} closable={true}>
            <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
              <VendorsForm key={Date.now()}
              updateDetails={updateVendor}
                isUpdate={true}
                vendorsData={selectedVendorsData}
                closeForm={closeDrawer} />
            </Card>
          </Drawer>
     </Card>

     </>
  );
}

export default VendorsView;
