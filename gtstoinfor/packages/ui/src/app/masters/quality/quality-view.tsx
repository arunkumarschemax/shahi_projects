import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Checkbox, Col, Divider, Popconfirm, Radio, Row, Switch, Table, Tag, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { QualityService } from '@project-management-system/shared-services'
import AlertMessages from '../../common/common-functions/alert-messages'
import FormItem from 'antd/es/form/FormItem'
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined } from '@ant-design/icons'
import { QualityActiveDeactive } from '@project-management-system/shared-models'

const QualityView = () => {

  const navigate=useNavigate()
  const service = new QualityService();
  const [itemGroup, setItemGroup] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [page, setPage] = useState<number>(1);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
  };
  const [searchText, setSearchText] = useState("");

  const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText("");
  };


  useEffect(() => {
    getQualityData();
}, []);

const getQualityData = () => {
    service.getQuality().then(res => {
        if (res.status) {
            setItemGroup(res.data);
        } else {
            AlertMessages.getErrorMessage(res.internalMessage);
        }
    })
}

const active = (rowData: any) => {
  rowData.isActive = rowData.isActive ? true : false;
  const req = new QualityActiveDeactive(
    rowData.qualityId,
    rowData.isActive,
    'admin'
  );
  service.activateOrDeactivateQuality(req).then((res) => {
    if (res.status) {
      message.success(res.internalMessage);
      getQualityData();
    }
  });
};

  const Columns: any = [
    {
      title: 'S No',
      align: "center",
      key: 'sno',
      width: 120,
      responsive: ['sm'],
      render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
        title: "Fabric Quality",
        dataIndex: "quality",
     width: 300,

    },
    {
      title: "Status",
      dataIndex: "isActive",
      align: "center",
      render: (isActive, rowData) => (
          <>
              {isActive ? (
                  <Tag icon={<CheckCircleOutlined />} color="#87d068">
                      Active
                  </Tag>
              ) : (
                  <Tag icon={<CloseCircleOutlined />} color="#f50">
                      InActive
                  </Tag>
              )}
          </>
      ),
      onFilter: (value, record) => record.isActive === value,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : any) => (
  <div className="custom-filter-dropdown" style={{flexDirection:'row',marginLeft:10}}>
    <Checkbox
      checked={selectedKeys.includes(true)}
      onChange={() => setSelectedKeys(selectedKeys.includes(true) ? [] : [true])}
    >
      <span style={{color:'green'}}>Active</span>
    </Checkbox>
    <Checkbox
      checked={selectedKeys.includes(false)}
      onChange={() => setSelectedKeys(selectedKeys.includes(false) ? [] : [false])}
    >
      <span style={{color:'red'}}>Inactive</span>
    </Checkbox>
    <div className="custom-filter-dropdown-btns" >
    <Button  onClick={() => clearFilters()} className="custom-reset-button">
        Reset
      </Button>
      <Button type="primary" style={{margin:10}} onClick={() => confirm()} className="custom-ok-button">
        OK
      </Button>
    
    </div>
  </div>
       ),
},
  {
    title: `Action`,
    dataIndex: "action",
    
    // width: 190,
    align: "center",
    render: (text, rowData, record: any) => (
      <span>
        <Divider type="vertical" />
        <Popconfirm
          onConfirm={(e) => {
            active(rowData);
          }}
          title={
            rowData.isActive
              ? "Are you sure to Deactivate  ?"
              : "Are you sure to Activate  ?"
          }
        >
          <Switch
            size="default"
            className={
              rowData.isActive ? "toggle-activated" : "toggle-deactivated"
            }
            checkedChildren={<RightSquareOutlined type="check" />}
            unCheckedChildren={<RightSquareOutlined type="close" />}
            checked={rowData.isActive}
          />
        </Popconfirm>
      </span>
    ),
  },
  ]

  return (
    <div>
    <Card title={<span>Fabric Quality</span>} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
        extra={<Button
            onClick={() => navigate('/masters/quality-form')}
            type="primary"
            // style={{ background: "white", color: "#3C085C" }}
        >Create</Button>
        }>
          <Row gutter={24}>
      <Col span={4}></Col>
     <Col span={5}>

           <Alert type='success' message={'Total Fabric Quality: ' + itemGroup.length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='warning' message={'Active: ' + itemGroup.filter(el => el.isActive).length} style={{fontSize:'15px'}} />
        </Col>
        <Col span={5}>
          <Alert type='info' message={'Inactive: ' + itemGroup.filter(el => el.isActive == false).length} style={{fontSize:'15px'}} />
        
           
           
        </Col>
          </Row> 
          <br></br>
          <Card>
          <Table columns={Columns}
          dataSource={itemGroup}
          pagination={{
            onChange(current) {
              setPage(current);
            },
            pageSize:50,
          }}
          scroll={{x:true}}
          size='small'
          />
          </Card>
    </Card>
</div>
  )
}

export default QualityView