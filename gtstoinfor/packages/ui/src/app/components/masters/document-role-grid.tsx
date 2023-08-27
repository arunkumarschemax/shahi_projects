


import { SearchOutlined, RightSquareOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Table, Input, Popconfirm, Card, Button, Space, Divider, Switch, Tag, message, Tooltip } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RoleSharedService from 'packages/libs/shared-services/src/document-role-service/document-role-sharedservice';
import { RoleActivateDeactivateDto } from '@project-management-system/shared-models';
import Highlighter from 'react-highlight-words';

const DocumentRoleGrid = () => {
  const searchInput = useRef(null);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1)
  const navigate=useNavigate();
  const service = new RoleSharedService();

  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');         ``

  useEffect(() => {
    getroleData();
  }, []);

  const getroleData = () => {
    service.getAllDocMappings()
      .then(res => {
        if (res.status) {
          setData(res.data);
        }else{
          setData([])
        }
      })
     
  }


  const deleteMapping = (rowData:any) => {
    rowData.isActive = rowData.isActive ? false : true;
    const req = new RoleActivateDeactivateDto(rowData.docMappingId,rowData.versionFlag,'admin',rowData.isActive)
    service.activateOrDeactivate(req).then(res => {
        if(res.status) {
            message.success(res.internalMessage)
            getroleData();
            
        } else {
            message.error(res.internalMessage)
        }
    })
}

function handleSearch(selectedKeys, confirm, dataIndex) {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

function handleReset(clearFilters) {
  clearFilters();
  setSearchText('');
};

const getColumnSearchProps = (dataIndex:string) => ({
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
      .includes(value.toLowerCase())
      : false,
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

  const columns = [
    { title: 'S.no', render: (text: any, object: any, index: any) => (page - 1) * 10 + (index + 1), },

    {
      title: 'Role',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (text, record, index) => {
        if (index === 0 || record.roleName !== data[index - 1].roleName) {
          const rowSpan = data.filter(item => item.roleName === record.roleName).length;
          return {
            children: text,
            props: {
              rowSpan: rowSpan,
            },
          };
        } else {
          return {
            children: null,
            props: {
              rowSpan: 0,
            },
          };
        }
      },
   
    },

    {
        title: 'Document',
        dataIndex: 'documentName',
        key: 'documentName',
     
      },
  
    {
      key: 'isActive',
      title: "Status",
      dataIndex: "isActive",
   
      render: (isActive, rowData) => (
        <>
          {isActive == 1? (
            <Tag icon={<CheckCircleOutlined />} color="#87d068">
              Active
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="#f50">
              Inactive
            </Tag>
          )}
        </>
      ),
      // filters: [
      //   {
      //     text: 'Active',
      //     value: 1,
      //   },
      //   {
      //     text: 'Inactive',
      //     value: 0,
      //   },
      // ],
      // filterMultiple: false,
      // onFilter: (value, record) => {
      //   return record.isActive === value // Use 'true' and 'false' as filter values
      // }
     
    },
    {
      title:`Action`,
      dataIndex: 'action',
      width:100,
      render: (text, rowData) => (
        <span>     
               <Tooltip placement='top' title='Activate or Deactivate'>
            <Popconfirm onConfirm={e =>{deleteMapping(rowData);}}
            title={
              rowData.isActive
                ? 'Are you sure to Deactivate  ?'
                :  'Are you sure to Activate ?'
            }
          >
            <Switch  size="default"
                className={ rowData.isActive ? 'toggle-activated' : 'toggle-deactivated' }
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                checked={rowData.isActive}
              />
            
          </Popconfirm>
          </Tooltip>
        </span>
      )
    }
  ];



  return (
    <div>
      <br />
      
      <Card title='Document Role Mapping' size='small' extra={<span><Button onClick={() => navigate('/role-mapping-form')} type={'primary'}>Create</Button></span>}>       
        <Table
          columns={columns}
          dataSource={data}
         size='small'
          rowKey="id"
        />
        
      </Card>
    </div>
  );
}

export default DocumentRoleGrid;
