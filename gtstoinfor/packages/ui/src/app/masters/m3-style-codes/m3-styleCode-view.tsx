import { M3StyleService } from '@project-management-system/shared-services'
import { Button, Card, Divider, Popconfirm, Radio, Switch, Table, Tag, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessages from '../../common/common-functions/alert-messages'
import { M3StyleActiveDeactive } from '@project-management-system/shared-models'
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'



const M3StyleCodeView = () => {

    const navigate=useNavigate()
    const service = new M3StyleService();
    const [itemGroup, setItemGroup] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState("");
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
    getM3StyleData();
}, []);

const getM3StyleData = () => {
    service.getM3Style().then(res => {
        if (res.status) {
            setItemGroup(res.data);
        } else {
            AlertMessages.getErrorMessage(res.internalMessage);
        }
    })
}

const active = (rowData: any) => {
  rowData.isActive = rowData.isActive ? true : false;
  const req = new M3StyleActiveDeactive(
    rowData.m3StyleId,
    rowData.isActive,
    'admin'
  );
  service.activateOrDeactivateM3Style(req).then((res) => {
    if (res.status) {
      message.success(res.internalMessage);
      getM3StyleData();
    }
  });
};

    const Columns: any = [
        {
            title: "M3 Style Code",
            dataIndex: "m3StyleCode",
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
    <Card title={<span>M3 STYLE CODES</span>} style={{ textAlign: 'center' }} headStyle={{ border: 0 }}
        className="card-header"
        extra={<Button
            onClick={() => navigate('/masters/m3-styleCodes-form')}
            type="primary"
            style={{ background: "white", color: "#3C085C" }}
        >Create</Button>
        }>
          <Table columns={Columns}
          dataSource={itemGroup}
          />
    </Card>
</div>
  )
}

export default M3StyleCodeView