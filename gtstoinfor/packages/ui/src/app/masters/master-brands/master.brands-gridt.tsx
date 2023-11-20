import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, Space, Checkbox, message, Alert } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps, ColumnType } from 'antd/lib/table';
import AlertMessages from '../../common/common-functions/alert-messages';
import { MasterBrandsService } from '@project-management-system/shared-services';
import { MasterBrandsDto } from '@project-management-system/shared-models';
import { Link, useNavigate } from 'react-router-dom';
import MasterBrandsForm from './master-brands-form';
import { config } from 'packages/libs/shared-services/config';

/* eslint-disable-next-line */
export interface MasterBrandsGridProps {}

export function MasterBrandsGrid(
  props: MasterBrandsGridProps,
 
) {
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');
  const [variantData, setVariantData] = useState<MasterBrandsDto[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [masterBrandData, setMasterBrandData] = useState<MasterBrandsDto[]>([]);
  const [selectedMasterBrandData, setSelectedMasterBrandData] = useState<any>(undefined);
  const [onUpdate,setOnUpdate] = useState(1)
  const masterBrandService=new MasterBrandsService;
  const username = localStorage.getItem('username')
  const navigate = useNavigate()

  useEffect(() => {
    getAllMasterBrands();
    
  }, [onUpdate]);

  /**
   * 
   */
 
  const getAllMasterBrands= () => {
    masterBrandService.getAllBrands().then(res => {
      if (res.status) {
        setMasterBrandData(res.data);
      } else {
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setMasterBrandData([]);
    })
  }

//   const getAllMasterBrands= () => {
//     masterBrandService.getAllBrands(new UserRequestDto(JSON.parse(localStorage.getItem('username')))).then(res => {
//       if (res.status) {
//         setMasterBrandData(res.data);
//       } else {
//         if (res.intlCode) {
//           setMasterBrandData([]);
//             AlertMessages.getErrorMessage(res.internalMessage);
//         } else {
//          AlertMessages.getErrorMessage(res.internalMessage);
//         }
//       }
//     }).catch(err => {
//       setMasterBrandData([]);
//       AlertMessages.getErrorMessage(err.message);
//     })
//   }
  
const deleteVariant = (BrandsViewData: MasterBrandsDto) => {
    BrandsViewData.isActive = BrandsViewData.isActive ? false : true;
    masterBrandService.ActivateDeActivateBrand(BrandsViewData).then(res => {
      if (res.status) {
        message.success(res.internalMessage, 2);
        getAllMasterBrands()
      } else {
        // if (res.intlCode) {
        //   AlertMessages.getErrorMessage(res.internalMessage);
        // } else {
          message.error(res.internalMessage, 2);
        // }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }
  const updateBrand = (brandsData: MasterBrandsDto) => {
    brandsData.updatedUser = JSON.parse(localStorage.getItem('username'))
    masterBrandService.updateBrand(brandsData).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Successfully');
        // getAllCurrencys();
        setDrawerVisible(false);
        getAllMasterBrands()
      } else {
      
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }
   /**
   * used for column filter
   * @param dataIndex column data index
   */
  // const getColumnSearchProps = (dataIndex:string) => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         ref={ searchInput }
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{ width: 188, marginBottom: 8, display: 'block' }}
  //       />
  //       <Button
  //         type="primary"
  //         onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         icon={<SearchOutlined />}
  //         size="small"
  //         style={{ width: 90, marginRight: 8 }}
  //       >
  //         Search
  //       </Button>
  //       <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
  //         Reset
  //       </Button>
  //     </div>
  //   ),
  //   filterIcon: filtered => (
  //     <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
  //   ),
  //   onFilter: (value, record) =>
  //   record[dataIndex]
  //   ? record[dataIndex]
  //      .toString()
  //       .toLowerCase()
  //       .includes(value.toLowerCase())
  //       : false,
  //   onFilterDropdownVisibleChange: visible => {
  //     if (visible) {    setTimeout(() => searchInput.current.select());   }
  //   },
  //   render: text =>
  //     text ?(
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text.toString()}
  //       />
  //     ) :text
  //     )
  //     : null
     
  // });

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

  function handleReset(clearFilters:() => void) {
    clearFilters();
    setSearchText('');
  };

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

    //drawer related
    const closeDrawer=()=>{
      setDrawerVisible(false);
    }
  
    //TO open the form for updation
    const openFormWithData=(viewData: MasterBrandsDto)=>{
      setDrawerVisible(true);
     
      setSelectedMasterBrandData(viewData);
    }
  
    const columnsSkelton: any = [
        {
          title: 'S No',
          key: 'sno',
          width: '70px',
          responsive: ['sm'],
          render: (text, object, index) => (page - 1) * 10 + (index + 1)
        },
        {
          title:<div style={{textAlign:'center'}}>Brand Name</div>,
          dataIndex: "brandName",
          sorter: (a, b) => a.brandName.localeCompare(b.brandName),
          sortDirections: ["ascend", "descend"],
          ...getColumnSearchProps("brandName"),
        },
        {
          title: 'Brand Logo',
          align:'center',
          dataIndex: 'fileName',
          responsive: ['lg'],
          
          render: (fileName,rowData) => {
    
            const updateImage = config.upload_file_path+ rowData.fileName;

return (
  <div>
    <img
      src={updateImage} 
      alt={fileName}
      style={{ maxWidth: '100px', maxHeight: '100px' }} 
    />
    <div>{fileName}</div>
  </div>
);

            // const updateImage ='http://165.22.220.143/crm/gtstoinfor/dist/packages/services/common/upload-files/'+rowData.fileName
            // return(
            // <div>
            //   <img
            //   src={updateImage} 
            //   // alt={fileName}
            //   style={{ maxWidth: '100px', maxHeight: '100px' }} 
            //   />
            //   <div>{fileName}</div>
            // </div>
            // )
          }
        },
        {
          title: 'Status',
          align:'center',
          dataIndex: 'isActive',
          // sorter: (a, b) => a.isActive.localeCompare(b.isActive),
          // sortDirections: ["ascend", "descend"],
          // ...getColumnSearchProps("isActive"),
          render: (isActive, rowData) => (
            <>
              {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
            </>
          ),
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
          filterMultiple: false,
         
    
        },
        {
          title: `Action`,
          align:'center',
          dataIndex: 'action',
          render: (text, rowData) => (
            <span>
              <EditOutlined className={'editSamplTypeIcon'} type="edit"
                onClick={() => {
                  if (rowData.isActive) {
                    openFormWithData(rowData);
                  } else {
                    AlertMessages.getErrorMessage('You Cannot Edit Deactivated Brands');
                  }
                }}
                style={{ color: '#1890ff', fontSize: '14px' }}
              />
    
              <Divider type="vertical" />
              <Popconfirm onConfirm={e => { deleteVariant(rowData); }}
                title={
                  rowData.isActive
                    ? 'Are you sure to Deactivate this Brand ?'
                    : 'Are you sure to Activate this Brand ?'
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
  const onChange=(pagination, filters, sorter, extra)=> {
  }
  const OpenFormTocreateRecord = () => {
  }
  return (
    // <Card title={<span style={{color:'white'}}>Brands</span>}
    // style={{textAlign:'center'}} headStyle={{backgroundColor: '#69c0ff', border: 0 }} extra={<Link to='/master-brands-form' ><Button className='panel_button' >Create </Button></Link>}
    
    // >
    //  <br></br>
<Card title='Brands' extra={<span><Button onClick={() => navigate('/masters/brands/brand-form')} type={'primary'}>New</Button></span>}>
     <Row gutter={40} >
     <Col span={4}></Col>

      <Col span={5}>
      <Alert type='success' message={'Total Brands: ' + masterBrandData.length} style={{fontSize:'15px'}} />

          {/* <Card title={'Total Brands: ' + masterBrandData.length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#bfbfbf'}}></Card> */}
          </Col>
          <Col span={5}>
          <Alert type='warning' message={'Active: ' + masterBrandData.filter(el => el.isActive).length} style={{fontSize:'15px'}} />

           {/* <Card title={'Active: ' + masterBrandData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card> */}
          </Col>
          <Col span={5}>
          <Alert type='info' message={'In-Active: ' + masterBrandData.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />

           {/* <Card title={'In-Active: ' + masterBrandData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card> */}
          </Col>
          {/* <Col>
        <span><Button onClick={() => navigate('/masters/brands/brand-form')}
              type={'primary'}>New</Button></span>
        </Col> */}
          </Row>
          <br></br>
          <Table
          rowKey={record => record.brandId}

          columns={columnsSkelton}
          dataSource={masterBrandData}
          scroll = {{x:true}}
          pagination={{
            pageSize: 50 ,
            onChange(current) {
              setPage(current);
            }
          }}
          onChange={onChange}
          bordered />
          <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
            onClose={closeDrawer} visible={drawerVisible} closable={true}>
            <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
              <MasterBrandsForm key={Date.now()}
                updateMasterBrand={ updateBrand }
                isUpdate={true}
                masterBrandData={selectedMasterBrandData}
                closeForm={closeDrawer} />
            </Card>
          </Drawer> 
      </Card> 
     
  );
}

export default MasterBrandsGrid;
