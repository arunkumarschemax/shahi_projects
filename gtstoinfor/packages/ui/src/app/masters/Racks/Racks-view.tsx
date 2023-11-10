import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Divider, Form, Input, Popconfirm, Radio, Row, Switch, Table, Tag, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import AlertMessages from '../../common/common-functions/alert-messages';
import { RacksService } from '@project-management-system/shared-services';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import { RacActiveDeactive } from '@project-management-system/shared-models';

const RackView = () => {

    const navigate = useNavigate();
    const service = new RacksService();
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
        getRacksData();
    }, []);

    const getRacksData = () => {
        service.getRacks().then(res => {
            if (res.status) {
                setItemGroup(res.data);
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }
        })
    }

    const active = (rowData: any) => {
        rowData.isActive = rowData.isActive ? true : false;
        const req = new RacActiveDeactive(
          rowData.rackId,
          rowData.isActive,
          'admin'
        );
        service.activateOrDeactivateRacks(req).then((res) => {
          if (res.status) {
            message.success(res.internalMessage);
            getRacksData();
          }
        });
      };

    const Columns: any = [
        {
            title: "Rack Name",
            dataIndex: "rackName"
        },
        {
            title: "Rack Code",
            dataIndex: "rackCode"
        },
        {
            title: "Unit",
            dataIndex: "unit"
        },
        {
            title: "Rack Type",
            dataIndex: "rackType",
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
                                Fabric
                            </Radio>
                            <Radio value={false}>Trim</Radio>
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
            <Card title={<span>RACKS  VIEW</span>} style={{ textAlign: 'center' }} headStyle={{ border: 0 }}
                className="card-header"
                extra={<Button
                    onClick={() => navigate('/masters/rack-form')}
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

export default RackView