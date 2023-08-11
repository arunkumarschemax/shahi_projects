


import { SearchOutlined, RightSquareOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Table, Input, Popconfirm, Card, Button, Space, Divider, Switch, Tag } from 'antd';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import DocumentService from 'packages/libs/shared-services/src/document-service/document-shared-service';
import AlertMessages from '../../common/common-functions/alert-messages';


const DepartmentGrid = () => {
  const [data, setData] = useState<any>([]);
  const [selectedDepartmentName, setSelectedDepartmentName] = useState<string | undefined>(undefined);
  const [searchedData, setSearchedData] = useState<any | null>(null);
  const [departmentNames, setDepartmentNames] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);
  const [page, setPage] = useState(1)
  const services = new DocumentService();


  useEffect(() => {
    getDocumentData();
  }, []);

  const getDocumentData = () => {
    services.getAllDocuments()
      .then(res => {
        if (res.status) {
          console.log(res, "data");
          setData(res.data);
        }
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response);
      })
  }
  const activateOrDeactivateDocument = (id: number) => {
    services.activateOrDeactivateDocument({ id: id }).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage(res.data.internalMessage);
        getDocumentData();

      } else {
        if (res.intlCode) {
          AlertMessages.getErrorMessage(res.internalMessage)
        } else {
          AlertMessages.getErrorMessage(res.internalMessage)
        }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message)
    })
  };

  
 

  const columns = [
    { title: 'S.no', render: (text: any, object: any, index: any) => (page - 1) * 10 + (index + 1), },

    {
      title: 'Document Name',
      dataIndex: 'documentName',
      key: '2',
   
    },
  
    {
      key: '5',
      title: "Status",
      dataIndex: "isActive",
      render: (isActive: any, rowData: any) => (
        <>
          {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">InActive</Tag>}
        </>
      ),
      filters: [
        {
          text: 'active',
          value: 1,
        },
        {
          text: 'InActive',
          value: 0,
        },
      ]
    },
    {
      title: 'Actions',
      key: 'actions',

      render: (rowData: any, record: any) => {
        return <>


        
          <Divider type="vertical" />
          <Popconfirm onConfirm={e => { activateOrDeactivateDocument(record.id); }}
            title={
              record.isActive
                ? 'Are you sure to deactivate ?'
                : 'Are you sure to activate ?'
            }
          >
            <Switch size="default"
              className={record.isActive ? 'toggle-activated' : 'toggle-deactivated'}
              checkedChildren={<RightSquareOutlined type="check" />}
              unCheckedChildren={<RightSquareOutlined type="close" />}
              checked={record.isActive}
            />
          </Popconfirm> </>
      }
    },
  ];

  return (
    <div>
      <br />
      <Card
        title={<span style={{ color: 'white' }}>Document Details</span>}
        extra={
          <Link to="/navpage/departForm">
            <span style={{ color: 'white' }}>
              <Button>Create</Button>
            </span>
          </Link>
        }
        headStyle={{ backgroundColor: 'rgb(41, 57, 125)', border: 0 }}
      >
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1600, y: 2200 }}
          rowKey="id"
        />
        
      </Card>
    </div>
  );
}

export default DepartmentGrid;
