import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Divider, Popconfirm, Radio, Row, Switch, Table, Tag, message } from 'antd'
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
      key: 'sno',
      width: 90,
      responsive: ['sm'],
      render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
        title: "Fabric Quality",
        dataIndex: "quality",
     width: 190,

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
      filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
      }) => (
          <div style={{ padding: 7 }}>
              <FormItem>
                  <Radio.Group
                      onChange={(e) => {
                          setSelectedKeys([e.target.value.toString()]);
                      }}
                  >
                      <Radio
                          style={{ marginRight: "11px", marginLeft: "20px" }}
                          value={true}
                      >
                          Active
                      </Radio>
                      <Radio value={false}>InActive</Radio>
                  </Radio.Group>
              </FormItem>
              <Button
                  type="primary"
                  onClick={() => {
                      confirm();
                      setSearchText(selectedKeys[0]);
                      setSearchedColumn("isActive");
                  }}
                  size="small"
                  style={{ width: 90, marginRight: 2, marginTop: 1 }}
              >
                  OK
              </Button>
              <Button
                  onClick={() => {
                      handleReset(clearFilters);
                      confirm();
                  }}
                  size="small"
                  style={{ width: 90 }}
              >
                  Reset
              </Button>
          </div>
      ),
      onFilter: (value, record) => {
          return record.isActive.toString() === value;
      },
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