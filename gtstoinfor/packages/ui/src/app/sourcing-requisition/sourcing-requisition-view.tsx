import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Space, Table } from "antd"
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

    const [data,setData] = useState<any[]>([
      {
          content:'Natural Fabrics',
          fabricType:'Cotton',
          weave:'Plain Weave',
          weigth:'100kg',
          width:'100',
          construction:'Cotton',
          yarnCount:'100',
          finish:'shrink resistance treatment',
          shrinkage:'2-3 %',
          color:'Blue',
          pch:'Srinivas',
          moq:'100 Pieces',
          season:'Summer',
          moqPrice:'100 INR',
          supplier:'Rajesh',
          grnDate:'09-08-2023',
          buyer:'Naidu',
          xlNo:'24',
          status:'OPEN'
      },
      {
          content:'Natural Fabrics',
          fabricType:'Slik',
          weave:'Plain Weave',
          weigth:'200kg',
          width:'100',
          construction:'Cotton',
          yarnCount:'100',
          finish:'embossed treatment',
          shrinkage:'2-3 %',
          color:'Green',
          pch:'Srinivas',
          moq:'250 Pieces',
          season:'Spring',
          moqPrice:'100 INR',
          supplier:'Rajesh',
          grnDate:'09-08-2023',
          buyer:'Naidu',
          xlNo:'24',
          status:'OPEN'

      },
      {
          content:'Natural Fabrics',
          fabricType:'Wool',
          weave:'Basket Weave',
          weigth:'100kg',
          width:'100',
          construction:'Cotton',
          yarnCount:'100',
          finish:'bulletproofing',
          shrinkage:'2-3 %',
          color:'Yellow',
          pch:'Srinivas',
          moq:'200 Pieces',
          season:'Winter',
          moqPrice:'100 INR',
          supplier:'Rajesh',
          grnDate:'09-08-2023',
          buyer:'Naidu',
          xlNo:'24',
          status:'COMPLETED'

      },
      {
          content:'Natural Fabrics',
          fabricType:'Cotton',
          weave:'Checked Weave',
          weigth:'250kg',
          width:'100',
          construction:'Cotton',
          yarnCount:'100',
          finish:'shrink resistance treatment',
          shrinkage:'2-3 %',
          color:'White',
          pch:'Srinivas',
          moq:'100 Pieces',
          season:'Summer',
          moqPrice:'100 INR',
          supplier:'Rajesh',
          grnDate:'09-08-2023',
          buyer:'Naidu',
          xlNo:'24',
          status:'INPROGRESS'

      }
  ])


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
        {
          title:'Status',
          dataIndex:'status'
        }
    ]
    return(
        <Card title='Sourcing Requistion View' className="card-header" style={{textAlign:'center'}}  extra={<span><Button onClick={() => navigate('/sourcing-requisition')} type={'primary'}>New</Button></span>}>
              <Row gutter={40} >
      <Col>
          <Card title={'Total : ' + data.length} style={{textAlign: 'left', width: 210, height: 41,backgroundColor:'#bfbfbf'}}></Card>
          </Col>
          <Col>
           <Card title={'Open: ' + data.filter(el => el.status === 'OPEN').length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'cyan'}}></Card>
          </Col>
          <Col>
           <Card title={'Inprogress :' + data.filter(el => el.status == 'INPROGRESS').length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'yellow'}}></Card>
          </Col>
          <Col>
           <Card title={'Completed :' + data.filter(el => el.status == 'COMPLETED').length} style={{textAlign: 'left', width: 200, height: 41,backgroundColor:'#52c41a'}}></Card>
          </Col>
          </Row>
          <br></br>
            <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }}  pagination={{
                    onChange(current) {
                        setPage(current);
                    }

                }}/>
        </Card>
    )
}

export default SorcingRequisitionView