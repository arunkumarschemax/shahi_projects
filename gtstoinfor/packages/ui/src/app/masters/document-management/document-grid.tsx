


import { SearchOutlined,EditOutlined, RightSquareOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Table, Input, Popconfirm, Card, Button, Space, Divider, Switch, Tag, Tooltip, message, Drawer } from 'antd';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
// import DocumentService from 'packages/libs/shared-services/src/document-service/document-shared-service';
import AlertMessages from '../../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';
import DocumentForm from './document-form';
import { DocumentService } from '@project-management-system/shared-services';


const DocumentGrid = () => {
  const [data, setData] = useState<any>([]);
  const [selectedDepartmentName, setSelectedDepartmentName] = useState<string | undefined>(undefined);
  const [searchedData, setSearchedData] = useState<any | null>(null);
  const [departmentNames, setdummyrefresh] = useState<number>(1);
  const [dummyrefresh, setDepartmentNames] = useState<string[]>([]);

  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);
  const [page, setPage] = useState(1)
  const services = new DocumentService();
  const navigate = useNavigate();


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
    // services.activateOrDeactivateDocument({ id: id }).then(res => {
    //   if (res.status) {
    //     AlertMessages.getSuccessMessage(res.data.internalMessage);
    //     getDocumentData();

    //   } else {
    //     if (res.intlCode) {
    //       AlertMessages.getErrorMessage(res.internalMessage)
    //     } else {
    //       AlertMessages.getErrorMessage(res.internalMessage)
    //     }
    //   }
    // }).catch(err => {
    //   AlertMessages.getErrorMessage(err.message)
    // })
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

<Tooltip>
                        <EditOutlined type="edit" style={{ color: '#1890ff', fontSize: '17px' }}
                            onClick={() => {
                                if (rowData.isActive) {
                                    setdummyrefresh(prev => prev + 1);
                                } else {
                                    message.error('you can not edit deactivate data')
                                }
                            }}
                        />
                    </Tooltip>
        
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
        title='Documents' extra={<span><Button onClick={() => navigate('/masters/document-form')} type={'primary'}>create</Button></span>}>


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

export default DocumentGrid;
