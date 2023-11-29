import { M3ItemsService } from '@project-management-system/shared-services';
import { Button, Card, Col, Divider, Drawer, Form, Input, Modal, Popconfirm, Radio, Row, Space, Switch, Table, Tag, Tooltip, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import { ColumnProps, ColumnType } from 'antd/es/table'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
const M3ItemsView = () => {

    const navigate=useNavigate()
    const service = new M3ItemsService();
    const [itemGroup, setItemGroup] = useState([]);
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState(''); 
    const [searchedColumn, setSearchedColumn] = useState('');
  const [page, setPage] = useState<number>(1);

    useEffect(() => {
        getM3ItemsData();
    }, []);
    
    const getM3ItemsData = () => {
        service.getM3Items().then(res => {
            if (res.status) {
                setItemGroup(res.data);
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }
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
      function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      function handleReset(clearFilters) {
        clearFilters();
        setSearchText('');
      };
    const Columns: any = [
      {
        title: 'S No',
        key: 'sno',
        width: 50,
        responsive: ['sm'],
        render: (text, object, index) => (page - 1) * 50 + (index + 1)
      },
        {
            title: "Buyer",
            dataIndex: "buyer",
            ...getColumnSearchProps('buyer')
        },
        {
            title: "Item Code",
            dataIndex: "itemCode",
            ...getColumnSearchProps('itemCode')
        },
        {
            title: "Content",
            dataIndex: "content",
            ...getColumnSearchProps('content')
        },
        {
            title: "Fabric Type",
            dataIndex: "fabric_type_name",
            ...getColumnSearchProps('fabric_type_name')
        },
        {
            title: "Weave",
            dataIndex: "fabric_weave_name",
            ...getColumnSearchProps('fabric_weave_name')
        },
        {
            title: "Weight",
            dataIndex: "weight",
            render: (text,record) => {
                return(
                    <>
                    {record.weight ? `${record.weight} ${record.weightUnit}` : '-'}
                    </>
                )
            },
            ...getColumnSearchProps('weight')
        },
        {
            title: "Width",
            dataIndex: "width",
            render: (text,record) => {
                return(
                    <>
                    {record.width ? `${record.width} ${record.widthUnit}` : '-'}
                    </>
                )
            },
            ...getColumnSearchProps('width')
        },
        {
            title: "Construction",
            dataIndex: "construction",
            ...getColumnSearchProps('construction')
        },
        {
            title: " Yarn Count",
            dataIndex: "yarn_count",
            render: (text,record) => {
                return(
                    <>
                    {record.yarn_count ? `${record.yarn_count} ${record.yarnUnit}` : '-'}
                    </>
                )
            },
            ...getColumnSearchProps('yarn_count')
        },
        {
            title: "Finish",
            dataIndex: "finish",
        },
        {
            title: "Shrinkage",
            dataIndex: "shrinkage",
            ...getColumnSearchProps('shrinkage')
        },
        {
            title: "Description",
            dataIndex: "description",
        },
    ]

  return (
    <div>
         <Card title={<span>M3 Items</span>}  headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
        extra={<Button
            onClick={() => navigate('/m3-items')}
            type="primary"
            // style={{ background: "white", color: "#3C085C" }}
        >Create</Button>
        }>
          <Card>
          <Table columns={Columns}
          dataSource={itemGroup}
          // scroll={{x:true,y:500}}
           pagination={{
            pageSize:50,
            onChange(current) {
              setPage(current);
            }
          }} bordered
          />
          </Card>
    </Card>
    </div>
  )
}

export default M3ItemsView