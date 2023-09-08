import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, Table } from "antd"
import { ColumnProps, ColumnType } from "antd/es/table"
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";

export const SorcingRequisitionView = () => {
    const [page, setPage] = React.useState(1);
    const [searchText, setSearchText] = useState(''); 
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate = useNavigate()


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

      function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      function handleReset(clearFilters) {
        clearFilters();
        setSearchText('');
      };
    

    const columns : ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            // width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:'Content',
            dataIndex:'content'
        },
        {
            title:'Fabric Type',
            dataIndex:'fabricType',
            ...getColumnSearchProps('fabricType')
        },
        {
            title:'Weave',
            dataIndex:'weave',
            ...getColumnSearchProps('weave')

        },
        {
            title:'Weight',
            dataIndex:'weigth'
        },
        {
            title:'Width',
            dataIndex:'width'
        },
        {
            title:'Construction',
            dataIndex:'construction'
        },
        {
            title:'Yarn Count',
            dataIndex:'yarnCount'
        },
        {
            title:'Finish',
            dataIndex:'finish'
        },
        {
            title:'Shrinkage',
            dataIndex:'shrinkage'
        },
        {
            title:'Color',
            dataIndex:'color',
            ...getColumnSearchProps('color')

        },
        {
            title:'PCH',
            dataIndex:'pch',
            ...getColumnSearchProps('pch')

        },
        {
            title:'MOQ',
            dataIndex:'moq'
        },
        {
            title:'Season',
            dataIndex:'season',
            ...getColumnSearchProps('season')

        },
        {
            title:'MOQ Price',
            dataIndex:'moqPrice'
        },
        {
            title:'Supplier',
            dataIndex:'supplier',
            ...getColumnSearchProps('supplier')

        },
        {
            title:'GRN Date',
            dataIndex:'grnDate'
        },
        {
            title:'Buyer',
            dataIndex:'buyer',
            ...getColumnSearchProps('buyer')
        },
        {
            title:'XL No',
            dataIndex:'xlNo'
        },
    ]
    return(
        <Card title='Sourcing Requistion View' size='small' extra={<span><Button onClick={() => navigate('/sourcing-requisition')} type={'primary'}>New</Button></span>}>
            <Table columns={columns} dataSource={[]} scroll={{ x: 'max-content' }}  pagination={{
                    onChange(current) {
                        setPage(current);
                    }

                }}/>
        </Card>
    )
}

export default SorcingRequisitionView