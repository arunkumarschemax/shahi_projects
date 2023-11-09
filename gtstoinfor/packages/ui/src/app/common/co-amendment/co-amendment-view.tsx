import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, Select, Form, Tabs } from 'antd';
import Highlighter from 'react-highlight-words';
import { ColumnProps } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import AlertMessages from '../../common/common-functions/alert-messages';
import { StyleOrderService } from '@project-management-system/shared-services';
import FormItem from 'antd/es/form/FormItem';
import form from 'antd/es/form';
import { CoRequest } from '@project-management-system/shared-models';
import TabPane from 'antd/es/tabs/TabPane';
export interface COAmendmentViewProps{}

export const COAmendmentView=(Props:COAmendmentViewProps)=>{
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [variantData, setVariantData] = useState<[]>([]);
    const [cono, setCono] = useState(null);
    const [form] = Form.useForm();
    const [selectedItemNo, setSelectedItemNo] = useState();
    const [searchClicked, setSearchClicked] = useState(false);
    const [mopDataYes, setMOPDataYes] = useState([]);
    const [codata, setCOData] = useState<any[]>([]);
    const [ChangeDeliveryDate, setChangeDeliveryDate] = useState<any[]>([]);
    const [ChangeOrderLine, setChangeOrderLine] = useState([]);
  const [ChangeFOB, setChangeFOB] = useState([]);
    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const columns = useState('');
    const navigate = useNavigate()
    const { Option } = Select;

    useEffect(()=>{
        getCoamendment();
        coNo();
    },[])


const service = new StyleOrderService();

const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
            <Input
                ref={searchInput}
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
            <Button size="small" style={{ width: 90 }}
                onClick={() => {
                    handleReset(clearFilters)
                    setSearchedColumn(dataIndex);
                    confirm({ closeDropdown: true });
                }}>
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
                .includes(value.toLowerCase())
            : false,
    onFilterDropdownVisibleChange: visible => {
        if (visible) { setTimeout(() => searchInput.current.select()); }
    },
    render: text =>
        text ? (
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : text
        )
            : null
})

function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getCoamendment=()=>{

    const req= new CoRequest()
    if(form.getFieldValue('coNumber') !== undefined){
        req.coNumber=form.getFieldValue('coNumber')
      }
    service.getCoamendment().then(res=>{
        if(res.status){
            setVariantData(res.data)
        }else{
            AlertMessages.getErrorMessage(res.internalMessage);

        }
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
        setVariantData([]);
      })
  }

  const coNo=()=>{
    service.getConumber().then((res)=>{
        if(res){
            setCono(res.data)
        }
    })
  }
  const resetForm = () => {
    setCono([]);
};
const search=()=>{
  const req = new CoRequest()
  if(form.getFieldValue('coNumber') != undefined) {
    req.coNumber=selectedItemNo
    setSearchClicked(true);
  }
  service.getCoamendment().then((res)=>{
    if(res.status){
        
    }
    if(res){
        setCono(res.data)
    }
  })
}
const columnsSkelton:any=[
    {
        title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1) 
    },

    {
        title:'Co Number',
        dataIndex: 'coNumber',
        sortDirections: ['descend', 'ascend'],
    },
    {
        title:'Co LineNumber',
        dataIndex: 'coLineNumber',
        ...getColumnSearchProps('coLineNumber')
      },
      {
        title:'Old Value',
        dataIndex: 'oldValue',
        ...getColumnSearchProps('oldValue'),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title:'Updated Value',
        dataIndex: 'updatedValue',
        ...getColumnSearchProps('updatedValue'),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title:'Co Parameter',
        dataIndex: 'parameter',
        // ...getColumnSearchProps('parameter'),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title:'Status',
        dataIndex: 'status',
        filters: [
            {
              text: 'CLOSED',
              value: 'CLOSED',
            },
            {
              text: 'COMPLETED',
              value: 'COMPLETED',
            },
            {
                text: 'CONFIRMED',
                value: 'CONFIRMED',
              },
              {
                text: 'IN_PROGRESS',
                value: 'IN_PROGRESS',
              },
          ],
          filterMultiple: false,
          onFilter: (value, record) => 
          {
            // === is not work
            return record.isActive === value;
          },
    },
]




return (
    <Card title='CoAmendment' extra={<span><Button onClick={()=>('/co-amendment')} type={'primary'}>New</Button></span>}>
<br/>
<Card>
    <Row>
    <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 5 }}
              xl={{ span: 6 }}
            >
              <Form.Item
                style={{ flexDirection: "row" }}
                label="Co Number"
                name="coNumber"
              >
                <Select
                  placeholder="Select Co Number"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                //   onChange={(val, text) => (val, text)}
                >
                  {cono?.map((e) => {
                    return (
                      <Option key={e.co_id} value={e.co_id} >
                        {e.coNumber}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Row>
              <Col>
                <FormItem style={{ flexDirection: "row" }} label=" ">
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={search}
                  >
                    Search
                  </Button>
                  {/* </Col>      
               <Col
               > */}
                  <Button
                    type="default"
                    icon={<UndoOutlined />}
                    style={{ color: "red", marginLeft: "10px" }}
                    onClick={resetForm}
                  >
                    Reset
                  </Button>
                </FormItem>
              </Col>
              </Row>
            </Col>
    </Row>
    <Card>
    <Tabs type={'card'} tabPosition={'top'}>
    <TabPane key="1" tab={<span style={{fontSize:'15px'}}><b>{`MOP`}</b></span>}>

        <Table size='small'
             columns={columnsSkelton}
             dataSource={variantData}
             pagination={{
                onChange(current) {
                  setPage(current);
                }
              }}
              scroll={{x:true}}
            //   onChange={onChange}
              bordered 
                       />
                </TabPane>
        </Tabs>

    </Card>
</Card>
    </Card>
)
}

export default COAmendmentView;