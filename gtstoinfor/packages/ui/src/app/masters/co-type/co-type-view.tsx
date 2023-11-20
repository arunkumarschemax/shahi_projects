import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined, SearchOutlined } from "@ant-design/icons"
import { Alert, Button, Card, Checkbox, Col, Divider, Drawer, Input, Popconfirm, Row, Space, Switch, Table, Tag } from "antd"
import { ColumnProps, ColumnType } from "antd/es/table"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import AlertMessages from "../../common/common-functions/alert-messages"
import { BusinessAreaService, CoTypeService } from "@project-management-system/shared-services"
import Highlighter from "react-highlight-words"
import { BusinessAreaActivateReq, BusinessAreaReq, CoTypeActivateReq, CoTypeReq } from "@project-management-system/shared-models"
import CoTypeForm from "./co-type-form"

export const CoTypeView = () => {
    const navigate = useNavigate()
    const [data,setData] = useState<any[]>([])
    const [page, setPage] = useState<number>(1);
    const service = new CoTypeService()
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState(''); 
    const [searchedColumn, setSearchedColumn] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(undefined);
    const [pageSize, setPageSize] = useState<number>(1);



    useEffect(() => {
        getAllData()
    },[])

    const getAllData = () => {
        service.getAllCoTypeInfo().then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }

    const deleteCoType = (rowData) => {
        rowData.isActive = rowData.isActive ?  false : true
        const req = new CoTypeActivateReq(rowData.coTypeId,'admin',rowData.versionFlag,rowData.isActive)
        service.activateOrDeactivateCoType(req).then(res => {
            if(res.status){
                getAllData()
                AlertMessages.getSuccessMessage(res.internalMessage)
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        }).catch(err => {
            AlertMessages.getErrorMessage(err.message);
          })

    } 

    const updateCoType = (data) => {
        const req = new CoTypeReq(data.coType,'admin',data.coTypeId)
        service.updateCoType(req).then(res => {
            if(res.status){
              setDrawerVisible(false)
              getAllData()
              AlertMessages.getSuccessMessage(res.internalMessage)
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }

    const openFormWithData = (rowData) => {
        setDrawerVisible(true)
        setSelectedData(rowData)

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
      
      function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      function handleReset(clearFilters) {
        clearFilters();
        setSearchText('');
      };


    const columns: ColumnProps<any>[] = [
        {
            title: <div style={{textAlign:'center'}}>S No</div>,
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            align:'center',
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            dataIndex:'coType',
            title:<div style={{textAlign:'center'}}>Co Type</div>,
            sorter: (a, b) => a.coType?.localeCompare(b.coType),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('coType')
        },
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
                        AlertMessages.getErrorMessage('You Cannot Edit Deactivated Co Type');
                      }
                    }}
                    style={{ color: '#1890ff', fontSize: '14px' }}
                  />
    
                <Divider type="vertical" />
                  <Popconfirm onConfirm={e =>{deleteCoType(rowData);}}
                  title={
                    rowData.isActive
                      ? 'Are you sure to Deactivate Co Type ?'
                      :  'Are you sure to Activate Co Type ?'
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
          },
    ]

    const closeDrawer=()=>{
        setDrawerVisible(false);
    }

    return (
        <Card title='Co Type' extra={<span><Button onClick={() => navigate('/masters/co-type/co-type-form')} type={'primary'}>New</Button></span>}>
            <Row gutter={24} >
        {/* <Col>
            <Card title={'Total : ' + data.length} style={{textAlign: 'left', width: 210, height: 41,backgroundColor:'#bfbfbf'}}></Card>
            </Col>
            <Col>
            <Card title={'Active: ' + data.filter(el => el.isActive).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
            </Col>
            <Col>
            <Card title={'In-Active :' + data.filter(el => el.isActive == false).length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#f5222d'}}></Card>
            </Col> */}
               <Col span={4}></Col>
       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 5}}>
        <Alert type='success' message={'Total Co Types: ' + data.length} style={{fontSize:'15px'}} />
        </Col>
           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 5}}>
          <Alert type='warning' message={'Active: ' + data.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
           <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 5}}>
          <Alert type='info' message={'InActive: ' + data.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        </Col>
            </Row>
            <br></br>
            <div style={{overflowX :'auto' }}>

            <Table columns={columns} pagination={{
            pageSize: 50,
            onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize);
            }
        }}
                    dataSource={data} size='small' bordered/>
            </div>
            <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '80%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        {/* <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'> */}
          <CoTypeForm key={Date.now()}
            updateDetails={updateCoType}
            isUpdate={true}
            // saveItem={saveVariant}
            coTypeData={selectedData}
            closeForm={closeDrawer} />
        {/* </Card> */}
      </Drawer>
        </Card>
    )

}

export default CoTypeView