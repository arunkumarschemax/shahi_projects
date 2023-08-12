


import { SearchOutlined, RightSquareOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Table, Input, Popconfirm, Card, Button, Space, Divider, Switch, Tag } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import DocumentSharedService from 'packages/libs/shared-services/src/document-service/document-shared-service';
import RoleSharedService from 'packages/libs/shared-services/src/document-role-shared-service/document-role--service';

const DocumentRoleGrid = () => {
  const [data, setData] = useState<any>([]);
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
          console.log(res, "data");
          setData(res.data);
        }
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response);
      })
  }

//   const activateOrDeactivateRole = (id: number) => {
//     service.activateOrDeactivateRole({ id: id }).then(res => {
//       if (res.status) {
//         AlertMessages.getSuccessMessage(res.data.internalMessage);
//         getroleData();

//       } else {
//         if (res.intlCode) {
//           AlertMessages.getErrorMessage(res.internalMessage)
//         } else {
//           AlertMessages.getErrorMessage(res.internalMessage)
//         }
//       }
//     }).catch(err => {
//       AlertMessages.getErrorMessage(err.message)
//     })
//   };

 

  const columns = [
    { title: 'S.no', render: (text: any, object: any, index: any) => (page - 1) * 10 + (index + 1), },

    {
      title: 'Role Name',
      dataIndex: 'roleName',
      key: '2',
   
    },

    {
        title: 'DocumentName',
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
    // {
    //   title: 'Actions',
    //   key: 'actions',

    //   render: (rowData: any, record: any) => {
    //     return <>


        
    //       <Divider type="vertical" />
    //       <Popconfirm onConfirm={e => { activateOrDeactivateRole(record.id); }}
    //         title={
    //           record.isActive
    //             ? 'Are you sure to deactivate ?'
    //             : 'Are you sure to activate ?'
    //         }
    //       >
    //         <Switch size="default"
    //           className={record.isActive ? 'toggle-activated' : 'toggle-deactivated'}
    //           checkedChildren={<RightSquareOutlined type="check" />}
    //           unCheckedChildren={<RightSquareOutlined type="close" />}
    //           checked={record.isActive}
    //         />
    //       </Popconfirm> </>
    //   }
    // },
  ];

  return (
    <div>
      <br />
      
      <Card title='Roles' extra={<span><Button onClick={() => navigate('/masters/role-mapping-form')} type={'primary'}>create</Button></span>}>
        {/* // extra={<span><Button onClick={() => navigate('document-role-form')} type={'primary'}>create</Button></span>} > */}
       
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

export default DocumentRoleGrid;
