import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, RightSquareOutlined } from '@ant-design/icons';
import { SupplierActivateDeactivateDto } from '@project-management-system/shared-models';
import { Button, Card, Divider, Popconfirm, Switch, Table, Tag } from 'antd';
import SupplierService from 'packages/libs/shared-services/src/supplier/supplier-service';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import TableActions from '../../common/table-actions/table-actions';

const SupplierView = () => {
  const [supplier, setSupllier] = useState([]);
  const navigate = useNavigate();
  const service = new SupplierService();


  useEffect(() => {
    getSupplierData() 
  }, []);

  const getSupplierData = () => {
    service.getAllSuppliers().then((res) => {
      if (res.status) {
        setSupllier(res.data);
      } else {

        setSupllier([])
      }
    })
      .catch((error) => {
        console.log(error.response)
      })
  };
  const onEdit = (record: any) => {
    console.log(record)
    navigate('/', { state: { data: record } })

  }
  
  const activateOrDeactivate = (req: SupplierActivateDeactivateDto) => {
    req.isActive = req.isActive? false : true;
    service.ActivateOrDeactivate(req).then(res => {
        if (res.status) {
            console.log(res, "PPPPPPPPPPPPPPp")
            AlertMessages.getSuccessMessage(res.data.internalMessage);
            // getSupplierData();
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


  
}
  
  const Columns: any = [

    {
      
      title: "Category",
      dataIndex: 'category',
      width: 50
    },
    {
      title: "SupplierCode",
      dataIndex: 'supplierCode',
      width: 50
    },
    {
      title: "SupplierName",
      dataIndex: 'supplierName',
      width: 100
    },
    {
      title: "GSTNumber",
      dataIndex: 'GstNumber',
      width: 50
    },
    {
      title: "ContactPerson",
      dataIndex: 'contactPerson',
      width: 50
    },
    {
      title: "Street",
      dataIndex: 'street',
      width: 50
    },
    {
      title: "Apartment",
      dataIndex: 'apartment',
      width: 50
    },
    {
      title: "City",
      dataIndex: 'city',
      width: 50
    },
    {
      title: "State",
      dataIndex: 'state',
      width: 50
    },
    {
      
      title: "District",
      dataIndex: 'district',
      width: 50
    },
    {
      
      title: "PostalCode",
      dataIndex: 'postalCode',
      width: 50
    },
    {
      
      title: "Commision",
      dataIndex: 'commision',
      width: 50
    },
    {
      
      title: "BankAccountNo",
      dataIndex: 'bankAccountNo',
      width: 50
    },
    {
      
      title: "BankIFSC",
      dataIndex: 'bankIFSC',
      width: 50
    },
    {
      
      title: "BankName",
      dataIndex: 'bankName',
      width: 50
    },
    {
      
      title: "BankBranch",
      dataIndex: 'bankBranch',
      width: 50
    },
    {
      
      title: "ContactNumber",
      dataIndex: 'contactNumber',
      width: 50
    },
    {
      
      title: "Email",
      dataIndex: 'email',
      width: 50
    },
    {
      
      title: "CreditPaymentPeriod",
      dataIndex: 'creditPaymentPeriod',
      width: 50
    },
    {
      key: '5',
      title: "Status",
      dataIndex: "isActive",
      width: 50,
      render: (isActive: any, rowData: any) => (
          <>
              {isActive ? <Tag icon={<CheckCircleOutlined />} color="#87d068">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="#f50">InActive</Tag>}
          </>
      ),
      filters: [
          {
              text: 'Active',
              value: true,
          },
          {
              text: 'InActive',
              value: false,
          },
      ]
  

  },
  {
      key: '6',
      title: "Actions",
      width: 50,
      render: (value, record) => {
          return <>
              <EditOutlined style={{ color: 'blue' }} onClick={() => { onEdit(record) }} type="edit" />

              <Divider type="vertical" />
              <Popconfirm onConfirm={e => { activateOrDeactivate(record); }}
                  title={
                      record.isActive
                          ? 'Are you sure to deactivated ?'
                          : 'Are you sure to activated ?'
                  }
              >
                  <Switch size="default"
                      className={record.isActive ? 'toggle-activated' : 'toggle-deactivated'}
                      checkedChildren={<RightSquareOutlined type="check" />}
                      unCheckedChildren={<RightSquareOutlined type="close" />}
                      checked={record.isActive}
                  />
              </Popconfirm>
          </>

      }
  },
  ]
  return (
    <div>
      <Card
        extra={<span><Button onClick={() => navigate('/masters/supplier/supplier-form')} type={'primary'}>New</Button></span>}
        headStyle={{ height: '50px' }}
        bodyStyle={{ height: '300px', paddingTop: '2px', paddingBottom: '5px' }}
        title={<h4 style={{ textAlign: 'left' }}>SupplierView</h4>}

      >

        <Table columns={Columns} dataSource={supplier}
          scroll={{ x: 1500 }} />
      </Card>
      

    </div>
  )
}

export default SupplierView;



