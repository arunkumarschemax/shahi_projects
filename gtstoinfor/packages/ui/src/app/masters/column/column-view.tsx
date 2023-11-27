import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined, SearchOutlined } from "@ant-design/icons"
import { Alert, Button, Card, Checkbox, Col, Divider, Drawer, Input, Popconfirm, Row, Space, Switch, Table, Tag } from "antd"
import { ColumnProps, ColumnType } from "antd/es/table"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Highlighter from "react-highlight-words"
import AlertMessages from "../../common/common-functions/alert-messages"
import { ColumnService } from "@project-management-system/shared-services"
import { ColumnActivateReq, ColumnReq } from "@project-management-system/shared-models"
import ColumnForm from "./column-form"

export const columnView = () => {
    const navigate = useNavigate()
    const [data,setData] = useState<any[]>([])
    const [page, setPage] = useState<number>(1);
    const service = new ColumnService()
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
        service.getAllColumnInfo().then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }

    const deletecolumn = (rowData) => {
        rowData.isActive = rowData.isActive ?  false : true
        const req = new ColumnActivateReq(rowData.columnId,'admin',rowData.versionFlag,rowData.isActive)
        service.activateOrDeactivateColumn(req).then(res => {
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

    const updatecolumn = (data) => {
        const req = new ColumnReq(data.column,'admin',data.columnId)
        service.updateColumn(req).then(res => {
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
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            dataIndex:'column',
            title:<div style={{textAlign:'center'}}>column</div>,
            sorter: (a, b) => a.column?.localeCompare(b.column),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('column')
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
                        AlertMessages.getErrorMessage('You Cannot Edit Deactivated column');
                      }
                    }}
                    style={{ color: '#1890ff', fontSize: '14px' }}
                  />
    
                <Divider type="vertical" />
                  <Popconfirm onConfirm={e =>{deletecolumn(rowData);}}
                  title={
                    rowData.isActive
                      ? 'Are you sure to Deactivate column ?'
                      :  'Are you sure to Activate column ?'
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
      
      <Card
      title={<span>Column</span>}
      style={{ textAlign: "center" }}
      headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
      extra={
        <Link to="/masters/column/column-form">
          <span style={{ color: "white" }}>
            <Button type={"primary"}>New </Button>{" "}
          </span>
        </Link>
      }
    >
      <br></br>
      <Row gutter={40}>
        <Col>
          <Card
            title={"Total Columns: " + data.length}
            style={{
              textAlign: "left",
              width: 220,
              height: 41,
              backgroundColor: "#bfbfbf",
            }}
          ></Card>
        </Col>
        <Col>
          <Card
            title={
              "Active: " + data.filter((el) => el.isActive).length
            }
            style={{
              textAlign: "left",
              width: 200,
              height: 41,
              backgroundColor: "#52c41a",
            }}
          ></Card>
        </Col>
        <Col>
          <Card
            title={
              "In-Active: " +
              data.filter((el) => el.isActive == false).length
            }
            style={{
              textAlign: "left",
              width: 200,
              height: 41,
              backgroundColor: "#f5222d",
            }}
          ></Card>
        </Col>
      </Row>
      <br></br>
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
        <ColumnForm
            key={Date.now()}
            updateDetails={updatecolumn}
            isUpdate={true}
            closeForm={closeDrawer} columnData={selectedData}        />
        {/* </Card> */}
      </Drawer>
        </Card>
    )

}

export default columnView