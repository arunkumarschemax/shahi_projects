import React, { useEffect, useRef, useState } from 'react';
import {  Divider, Table, Popconfirm, Card, Tooltip, Switch,Input,Button,Tag,Row, Col, Drawer, Space } from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined,RightSquareOutlined,EyeOutlined,EditOutlined,SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnProps, ColumnType } from 'antd/lib/table';
import AlertMessages from '../../common/common-functions/alert-messages';
import { MasterBrandsService } from '@project-management-system/shared-services';
import { MasterBrandsDto } from '@project-management-system/shared-models';
import { Link, useNavigate } from 'react-router-dom';
import MasterBrandsForm from './master-brands-form';

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
        console.groupCollapsed(res.data,'All----')
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
      console.log(res);
      if (res.status) {
        AlertMessages.getSuccessMessage('Success');
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
  const updateBrand = (brandsData: MasterBrandsDto) => {
    brandsData.updatedUser = JSON.parse(localStorage.getItem('username'))
    masterBrandService.updateBrand(brandsData).then(res => {
      console.log(res);
      if (res.status) {
        AlertMessages.getSuccessMessage('Updated Successfully');
        // getAllCurrencys();
        setDrawerVisible(false);
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
     console.log(selectedMasterBrandData);
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
          title: "Brands Name",
          dataIndex: "brandName",
          sorter: (a, b) => a.source.localeCompare(b.source),
          sortDirections: ["ascend", "descend"],
          ...getColumnSearchProps("brandName"),
        },
        {
          title: 'Status',
          dataIndex: 'isActive',
          sorter: (a, b) => a.isActive.localeCompare(b.isActive),
          sortDirections: ["ascend", "descend"],
          ...getColumnSearchProps("isActive"),
          render: (isActive, rowData) => (
            <>
              {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">In Active</Tag>}
            </>
          ),
          // filters: [
          //   {
          //     text: 'Active',
          //     value: true,
          //   },
          //   {
          //     text: 'InActive',
          //     value: false,
          //   },
          // ],
          // filterMultiple: false,
          // onFilter: (value, record) => {
          //   // === is not work
          //   return record.isActive === value;
          // },
    
        },
        {
          title: `Action`,
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
    console.log('params', pagination, filters, sorter, extra);
  }
  const OpenFormTocreateRecord = () => {
   console.log('redirect here');
  }
  return (
    // <Card title={<span style={{color:'white'}}>Brands</span>}
    // style={{textAlign:'center'}} headStyle={{backgroundColor: '#69c0ff', border: 0 }} extra={<Link to='/master-brands-form' ><Button className='panel_button' >Create </Button></Link>}
    
    // >
    //  <br></br>
<Card title='Delivery Terms' extra={<span><Button onClick={() => navigate('/masters/masters-brands/master-brands-form')} type={'primary'}>New</Button></span>}>
     <Row gutter={40} >
      <Col>
          <Card title={'Total Brands: ' + masterBrandData.length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Active: ' + masterBrandData.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          <Col>
           <Card title={'In-Active: ' + masterBrandData.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
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
