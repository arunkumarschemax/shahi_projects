import { HMStyleSharedService } from '@project-management-system/shared-services';
import { Button, Card, Drawer, Table, Tooltip, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessages from '../../../common/common-functions/alert-messages';
import { HMStylesModelDto } from '@project-management-system/shared-models';
import { EditOutlined } from '@ant-design/icons';
import HMStyleCreation from './hm-style-create';

const HMStyleView = () => {
    const navigate=useNavigate();
    const service = new HMStyleSharedService();
  const [hmStyle, setHMStyle] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedHMStyleData, setSelectedHMStyleData] = useState<any>(undefined);

  useEffect(() => {
    getHMStyleData();
}, []);

const updateHMStyle = (hmStyleDto: HMStylesModelDto) => {


  service.createHMStyle(hmStyleDto).then(res => {
    if (res.status) {
      message.success('HM Styles data Updated Successfully');
      setDrawerVisible(false);
      getHMStyleData();
      // closeDrawer()

    } else {
      // message.error(res.message);
      message.error(res.internalMessage);

    }
  }).catch(err => {
    message.error(err.message);
  })
}

/**
  * 
  * @param pensionerTypeData 
  */

const closeDrawer = () => {
  setDrawerVisible(false);
}

const openFormWithData = (viewData: HMStylesModelDto) => {
  setDrawerVisible(true);
  setSelectedHMStyleData(viewData);
}


const getHMStyleData = () => {
    service.getHMStyle().then(res => {
        if (res.status) {
            setHMStyle(res.data);
        } else {
            AlertMessages.getErrorMessage(res.internalMessage);
        }
    })
}

    const Columns: any = [

        {
          title: "SNo",
          render: (_text: any, record: any, index: number) => <span>{index + 1}</span>,
          width:'100px'
    
        },
    
        {
    
          title: "Style Number",
          dataIndex: 'styleNumber',
          align: 'center',
          width:'150px'
    
    
        },
        {
          title: "Teflon Sheet Size",
          dataIndex: 'teflonSheetSize', 
          align: 'center',
          width:'150px'
    
        },
        {
          title: "Consumption",
          dataIndex: 'consumption',
          align: 'center',
          width:'150px'
    
        },
        {
          title: `Action`,
          dataIndex: 'action',
          width: 100,
          fixed: "right",
          render: (text, rowData) => (
            <span>
              <Tooltip placement="top" title='Edit'>
                <EditOutlined className={'editSamplTypeIcon'} type="edit"
                  onClick={() => {
                    if (rowData.isActive) {
                      openFormWithData(rowData);
                    } else {
                      message.error('You Cannot Edit Deactivated Pensioners');
                    }
                  }}
                  style={{ color: '#1890ff', fontSize: '14px' }}
                />
              </Tooltip>
              {/* <Divider type="vertical" />
              <Popconfirm onConfirm={e => { activateDeactivatePensionerType(rowData); }}
                title={
                  rowData.isActive
                    ? 'Are you sure to Deactivate Pensioner ?'
                    : 'Are you sure to Activate Pensioner ?'
                }
              >
                <Switch size="default"
                  className={rowData.isActive ? 'toggle-activated' : 'toggle-deactivated'}
                  checkedChildren={<RightSquareOutlined type="check" />}
                  unCheckedChildren={<RightSquareOutlined type="close" />}
                  checked={rowData.isActive}
                />
              </Popconfirm> */}
            </span>
          )
        },
      ]

  return (
    <div>
         <Card
            extra={<span><Button type='primary' onClick={() => navigate('/bom/hm-style-creation')}>Create</Button></span>} headStyle={{  height: '40px' }}
            bodyStyle={{ paddingTop: '2px', paddingBottom: '12px' }}
            title={<h4 style={{ textAlign: 'left', padding: '20px' }}>HM STYLES</h4>}>
<Table columns={Columns} dataSource={hmStyle}/>
<Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '65%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <HMStyleCreation
            setDrawerVisible={setDrawerVisible}
            getHmStyle={getHMStyleData}
            key={Date.now()}
            updateHmStyle={updateHMStyle}
            isUpdate={true}
            hmStyleData={selectedHMStyleData}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
            </Card>
    </div>
  )
}

export default HMStyleView