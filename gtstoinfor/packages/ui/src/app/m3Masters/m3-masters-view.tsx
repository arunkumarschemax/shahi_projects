import { EditOutlined, RightSquareOutlined, SearchOutlined } from "@ant-design/icons"
import { M3MastersService } from "@project-management-system/shared-services"
import { Button, Card, Divider, Drawer, Input, Popconfirm, Space, Switch, Table } from "antd"
import { ColumnProps, ColumnType } from "antd/es/table"
import React, { useEffect, useRef, useState } from "react"
import Highlighter from "react-highlight-words"
import { useNavigate } from "react-router-dom"
import AlertMessages from "../common/common-functions/alert-messages"
import { M3MastersReq } from "@project-management-system/shared-models"
import DeliveryTermsForm from "../masters/delivery-terms/delivery-terms-form"
import M3Masters from "./m3-masters"

export const M3MastersView = () => {
    const navigate = useNavigate()
    const [page, setPage] = React.useState(1);
    const [data,setData] = useState<any[]>([])
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [m3MastersData, setM3MastersData] = useState<any>(undefined);
    const openFormWithData=(viewData:M3MastersReq )=>{
        setDrawerVisible(true);
        setM3MastersData(viewData);
      }
    const service = new M3MastersService()

    useEffect(()=> {
        getAll()
    },[])

    const getAll = () => {
        service.getAll().then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }

    const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }: any) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() =>
                handleSearch(selectedKeys as string[], confirm, dataIndex)
              }
              style={{ marginBottom: 8, display: "block" }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() =>
                  handleSearch(selectedKeys as string[], confirm, dataIndex)
                }
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  handleReset(clearFilters);
                  setSearchedColumn(dataIndex);
                  confirm({ closeDropdown: true });
                }}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase())
            : false,
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ""}
            />
          ) : (
            text
          ),
      });
    
      function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      }
    
      function handleReset(clearFilters) {
        clearFilters();
        setSearchText("");
      }

    const columns : ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            // width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:'Category',
            dataIndex:'category',
            ...getColumnSearchProps('category')
        },
        {
            title:'M3 Code',
            dataIndex:'m3Code',
            ...getColumnSearchProps('m3Code')
        },
        {
            title:`Action`,
            dataIndex: 'action',
            render: (text, rowData) => (
              <span>         
                  <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
                    onClick={() => {
                         openFormWithData(rowData);
                    }}
                    style={{ color: '#1890ff', fontSize: '14px' }}
                  />
                
               
              </span>
            )
          }
    ]
    const updateUser = (Data: M3MastersReq) => {
          service.update(Data).then(res => { console.log(res);
            if (res.status) {
              AlertMessages.getSuccessMessage('Updated Successfully');
              getAll();
              setDrawerVisible(false);
            } else {
              
                AlertMessages.getErrorMessage(res.internalMessage);
              
            }
          }).catch(err => {
            AlertMessages.getErrorMessage(err.message);
          })
         }
         const closeDrawer=()=>{
            setDrawerVisible(false);
          }
        return(
        <Card extra={<span><Button onClick={() => navigate('/m3-masters')} type={'primary'}>New</Button></span>} className="card-header">
            <Table columns={columns} dataSource={data} size='small'/>
            <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
            onClose={closeDrawer} visible={drawerVisible} closable={true}>
             <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
              <M3Masters
                            key={Date.now()}
                            updateDetails={updateUser}
                            isUpdate={true}
                            closeForm={closeDrawer} 
                            m3MasterData={m3MastersData} />
                    </Card> 
          </Drawer>
        </Card>
    )

}

export default M3MastersView