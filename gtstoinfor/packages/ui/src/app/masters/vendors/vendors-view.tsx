import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, message, Form, Select, Alert } from 'antd';
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
  
    const getColumnSearchProps = (dataIndex:any): ColumnType<string> => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={ searchInput }
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
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
          .includes((value as string).toLowerCase()):false,
      onFilterDropdownVisibleChange: visible => {
        if (visible) {    setTimeout(() => searchInput.current.select());   }
      },
      render: text =>
        text ?(
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) :text
        )
        : null
       
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
         align: "center",
 
          responsive: ['sm'],
          render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
          dataIndex:"vendorName",
          title:"Vendor Name",
          // responsive: ['lg'],
          sorter: (a, b) => a.vendorName.localeCompare(b.vendorName),
          sortDirections: ['descend', 'ascend'],
          ...getColumnSearchProps('vendorName')
        },
        {
          dataIndex:"vendorCode",
          title:"Vendor Code",
          // responsive: ['lg'],
          // sorter: (a, b) => a.deptName.length - b.deptName.length,
          // sortDirections: ['descend', 'ascend'],
          // ...getColumnSearchProps('vendorCode')
        },
       
        // {
        //   dataIndex:"priceNeeded",
        //   title:"Price Needed",
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
        //   title:"Website",
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('website')
        // },
        {
          dataIndex:"contactPerson",
          title:"Contact Person",
          width:150,
          // responsive: ['lg'],
          sorter: (a, b) => a.contactPerson.localeCompare(b.contactPerson),
          sortDirections: ['descend', 'ascend'],
          ...getColumnSearchProps('contactPerson')
        },
        {
          dataIndex:"contactNumber",
          title:"Contact Number",
          // responsive: ['lg'],
          // sorter: (a, b) => a.contactNumber.localeCompare(b.contactNumber),
          // sortDirections: ['descend', 'ascend'],
          ...getColumnSearchProps('contactNumber')
        },
        {
          dataIndex:"gstNumber",
          title:"GST Number",
          // responsive: ['lg'],
          // sorter: (a, b) => a.gstNumber.localeCompare(b.gstNumber),
          // sortDirections: ['descend', 'ascend'],
          ...getColumnSearchProps('gstNumber')
        },
        // {
        //   dataIndex:"apartment",
        //   title:"Apartment",
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('apartment')
        // },
        {
          dataIndex:"city",
          title:"City",
          // responsive: ['lg'],
          sorter: (a, b) => a.deptName.length - b.deptName.length,
          sortDirections: ['descend', 'ascend'],
          // ...getColumnSearchProps('city')
        },
        // {
        //   dataIndex:"postalCode",
        //   title:"PostalCode",
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('postalCode')
        // },
        // {
        //   dataIndex:"countryName",
        //   title:"Country",
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.countryName.localeCompare(b.countryName),
        //   sortDirections: ['descend', 'ascend'],
        // //   ...getColumnSearchProps('countryName')
        // },
        // {
        //   dataIndex:"currencyName",
        //   title:"Currency",
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.currencyName.localeCompare(b.currencyName),
        //   sortDirections: ['descend', 'ascend'],
        // //   ...getColumnSearchProps('currencyName'),
        // },
        // {
        //   dataIndex:"privateNote",
        //   title:"Private Note",
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('privateNote')
        // },
        // {
        //   dataIndex:"publicNote",
        //   title:"PublicNote",
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('publicNote')
        // },
        // {
        //   dataIndex:"bankAccNo",
        //   title:"BankAccNo",
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('bankAccNo')
        // },
        // {
        //   dataIndex:"bankIfsc",
        //   title:"BankIfsc",
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('bankIfsc')
        // },
        // {
        //   dataIndex:"bankName",
        //   title:"BankName",
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('bankName')
        // },
        // {
        //   dataIndex:"bankBranch",
        //   title:"BankBranch",
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('bankBranch')
        // },

        // {
        //   dataIndex:"emailId",
        //   title:"EmailId",
        //   // responsive: ['lg'],
        //   sorter: (a, b) => a.deptName.length - b.deptName.length,
        //   sortDirections: ['descend', 'ascend'],
        //   ...getColumnSearchProps('emailId')
        // },

  
       
        {
          title: 'Status',
          dataIndex: 'isActive',
          align:"center",
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
          onFilter: (value, record) => 
          {
            // === is not work
            return record.isActive === value;
          },
          
        },
        {
          title:`Action`,
          dataIndex: 'action',
          align:"center",
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
                    ? 'Are you sure to Deactivate this vendor ?'
                    :  'Are you sure to Activate this vendor ?'
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
    <Card  title='Vendors' extra={<span><Button onClick={() => navigate('/masters/vendors/vendors-form')} type={'primary'}>New</Button></span>} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
     {/* <Row gutter={40}>
      <Col>
          <Card title={'Total Vendors : ' + vendorsData.length} style={{textAlign: 'left', width: 210, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Active: ' + vendorsData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active :' + vendorsData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
          </Col>
          </Row>
          <br></br> */}
          <Row gutter={24}>
      <Col span={4}></Col>
     <Col span={5}>
        
           <Alert type='success' message={'Total Vendors: ' + vendorsData.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + vendorsData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='info' message={'Inactive: ' + vendorsData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        
           
           
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
          <Card>
          <Table
          rowKey={record => record.deptId}
          columns={columnsSkelton}
          dataSource={vendorsData}
          scroll={{x:true,y:500}}
          pagination={{
           pageSize:50,
           onChange(current) {
             setPage(current);
           }
         }}
          onChange={onChange}
          bordered
          size='small' />
          </Card>
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
