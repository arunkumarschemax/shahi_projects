


import { SearchOutlined, RightSquareOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Table, Input, Popconfirm, Card, Button, Space, Divider, Switch, Tag, message, Tooltip } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import DocumentSharedService from 'packages/libs/shared-services/src/document-service/document-shared-service';
import RoleSharedService from 'packages/libs/shared-services/src/document-role-service/document-role-sharedservice';
import { RoleActivateDeactivateDto } from '@project-management-system/shared-models';

const DocumentRoleGrid = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1)
  const navigate=useNavigate();
  const service = new RoleSharedService();



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

  const columns = [
    { title: 'S.no', render: (text: any, object: any, index: any) => (page - 1) * 10 + (index + 1), },

    {
      title: 'Role',
      dataIndex: 'roleName',
      key: '2',
   
    },

    {
        title: 'Document',
        dataIndex: 'documentName',
        key: '3',
     
      },
  
    {
      key: '4',
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
      
      <Card title='Document Role Mapping' extra={<span><Button onClick={() => navigate('/masters/role-mapping-form')} type={'primary'}>create</Button></span>}>       
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
