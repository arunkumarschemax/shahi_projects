import {  CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined } from '@ant-design/icons';
import { Table, Input, Popconfirm, Card, Button, Space, Divider, Switch, Tag, Tooltip, message, Drawer, InputNumber, Form, Select } from 'antd';
import { useState, useEffect, useRef, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { DocumentService, UploadDocumentService } from '@project-management-system/shared-services';
import { AlertMessages, DocumentDownloadEnum, DocumentDto } from '@project-management-system/shared-models';
import DocumentForm from './document-form';
import { error } from 'console';



const DocumentGrid = () => {

  const [page, setPage] = useState(1)
  const services = new DocumentService();
  const navigate = useNavigate();
  const [docData,setDocData] = useState<any[]>([])
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRoutesData, setSelectedRoutesData] = useState<any>(undefined);
  const [form] = Form.useForm();
  const {Option} = Select
const docuListService = new UploadDocumentService()
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
  const GetDocAvtiveinAvtivevalidation =(rowData:any) =>{
    docuListService.getDocumentuploadedStaus({documentId:rowData.id}).then(res =>{
      console.log(res)
      if(res.data.length >0){
        deleteMapping(rowData)

      }else{
        message.info('you cannot deactivate this document. you have not upload any files')

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
        navigate('/document-grid')

            
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
const orders = (value, index, rowData) => {
  if (value == 0 || value == null) {
    AlertMessages.getErrorMessage('Orders should be greater than zero')
  }
  else{
    console.log(index);
    console.log(docData);
    console.log(docData.find((rec) => rec.priority === value));
    console.log(docData[index]);
    rowData.priority = value
    console.log(value, 'row value')
    const newData = [...docData];
    newData[index].priority = value;
  
    setDocData(newData);
    services.updatePriority(newData[index]).then((res) => {
      if(res.status){
        getDocumentData();
        window.location.reload()
      }
      else{
        AlertMessages.getErrorMessage("Priority update failed. ")
      }
    })
  }
}

  const updateDownloadStatus =(value,record)=>{  
    console.log(record.id)
    services.updateDownloadStatus({documentId:record.id,isDownload:value}).then(res =>{
  if(res.status){
    message.success(res.internalMessage)
  }else{
    message.error(res.internalMessage)
  }
    })
  }

  const isDownloadOnchange =(value,record) =>{
    console.log(value)
    console.log(record.id)
    updateDownloadStatus(value,record)
    getDocumentData();

  }

  const columns = [
    { title: 'S.no', render: (text: any, object: any, index: any) => (page - 1) * 10 + (index + 1), },

    {
      title: 'Document Name',
      dataIndex: 'documentName',
      key: '2',
   
    },
    {
      title: 'Order',
      dataIndex: 'priority',
      render: (text, rowData, index) => { 
        return (
          <>
          <Form layout={'vertical'} form={form} name="control-hooks" >
            <Form.Item
              name={rowData.id}
              rules={[
                {
                  required: true, message: 'Missing Order',
                }

              ]}
              style={{ margin: 0 }}
              initialValue={rowData.priority}
            >
            <InputNumber key={rowData.id} defaultValue={rowData.priority} name={`priority${rowData.id}`} onChange={(e)=>orders(e,index,rowData)} 
             />
            </Form.Item>
          </Form>
          </>
        )
      }
    },
    {
      title:'Is Download',
      width:'200px',
      render:(value,record)=>{
        return <Form.Item name='isDownload' initialValue={record.isDownload}>
          <Select
          defaultValue={record.isDownload}
          onChange={(value) =>isDownloadOnchange(value,record)}
          >
          {Object.values(DocumentDownloadEnum).map((key,value) => {
                  return <Option key={key} value={key}>{key}</Option>
                })}
          </Select>
        </Form.Item>
      }
    },
    {
      key: '5',
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
      filters: [
        {
          text: 'Active',
          value: 1,
        },
        {
          text: 'Inactive',
          value: 0,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        return record.isActive === value // Use 'true' and 'false' as filter values
      }
     
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
            <Popconfirm onConfirm={e =>{GetDocAvtiveinAvtivevalidation(rowData);}}
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
    <Card size='small' headStyle={{ backgroundColor: '#77dfec', border: 0 }}
        title='Documents' extra={<span><Button onClick={() => navigate('/document-form')} type={'primary'}>Create</Button></span>}>
      
        <Table
          pagination={false}
          rowKey={record => record.id}
          columns={columns}
          dataSource={docData}
        size='small'
        />
          <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '65%' : '85%'}
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
