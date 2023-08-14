


import {  CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined } from '@ant-design/icons';
import { Table, Input, Popconfirm, Card, Button, Space, Divider, Switch, Tag, Tooltip, message, Drawer } from 'antd';
import { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { DocumentService } from '@project-management-system/shared-services';
import { DocumentDto } from '@project-management-system/shared-models';
import DocumentForm from './document-form';

const DocumentGrid = () => {

  const [page, setPage] = useState(1)
  const services = new DocumentService();
  const navigate = useNavigate();
  const [docData,setDocData] = useState<any[]>([])
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRoutesData, setSelectedRoutesData] = useState<any>(undefined);


  useEffect(() => {
    getDocumentData();
  }, []);

  const getDocumentData =() =>{
    services.getAllDocuments().then(res =>{
      console.log(res)
      if(res.data){
        setDocData(res.data)
      }else{
        setDocData([])
      }
    })
  }
 

  const deleteMapping = (rowData:any) => {
    rowData.isActive = rowData.isActive ? false : true;
    const req = new DocumentDto(rowData.documentName,rowData.isActive,rowData.versionFlag,rowData.id,'','admin')
    services.activateOrDeactivateDocument(req).then(res => {
        if(res.status) {
            message.success(res.internalMessage)
            getDocumentData();
            
        } else {
            message.error(res.internalMessage)
        }
    })
}

const openFormWithData=(viewData: DocumentDto)=>{
  setDrawerVisible(true);
  setSelectedRoutesData(viewData)   
  console.log(viewData,'viewdata') 
}

const updateDoc = (data: DocumentDto) => {
  // let username = localStorage.getItem('username')
  console.log(data,'updatedata')
  const req = new DocumentDto(data.documentName,data.isActive,data.versionFlag,data.id,'','')
  // console.log(req,'req')
  services.updateDocument(req).then( res => {
    // console.log(req,'req')
      if(res.status) {
          message.success(res.internalMessage)
          setDrawerVisible(false)
          getDocumentData();
      } else {
          message.error(res.internalMessage)
      }
  })
}


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
      title:`Action`,
      dataIndex: 'action',
      width:100,
      render: (text, rowData) => (
        <span>    
           <Tooltip placement="top" title='edit'>    
                <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
                  onClick={() => {
                      if(rowData.isActive) {
                          openFormWithData(rowData);
                      } else {
                          message.info('You cannot edit deactivated Routes')
                      }
                  }}
                  style={{ color: '#1890ff', fontSize: '14px' }}
                />
                </Tooltip>
                
              <Divider type="vertical" /> 
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
  
  const closeDrawer=()=>{
    setDrawerVisible(false);
    }

  return (
    <div>
      <br />
      <Card size='small'
        title='Documents' extra={<span><Button onClick={() => navigate('/masters/document-form')} type={'primary'}>create</Button></span>}>
        <Table
          columns={columns}
          dataSource={docData}
        size='small'
          rowKey="id"
        />
          <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '85%' : '85%'}
            onClose={closeDrawer} open={drawerVisible} closable={true}>
             <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
              <DocumentForm key={Date.now()}
                updateDetails={updateDoc}
                isUpdate={true}
                data={selectedRoutesData }
                closeForm={closeDrawer} />
            </Card> 
          </Drawer>
      </Card>
    </div>
  );
}

export default DocumentGrid;
