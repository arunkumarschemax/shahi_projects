import { IndentRequestDto } from '@project-management-system/shared-models';
import { IndentService } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Row, Select, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useIAMClientState } from '../common/iam-client-react';
const { Option } = Select;

export const IndentReport = () => {
  const service = new IndentService();
  const [data, setData] = useState<any[]>([]);
  const [drop, dropDown] = useState<any[]>([]);
  const [date, setDate] = useState<any[]>([]);
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const page = 1;
  const { IAMClientAuthContext } = useIAMClientState();
  const [isBuyer, setIsBuyer] = useState(false);
  useEffect(() => {
    getIndentData();
    getAll();
    const userrefNo = IAMClientAuthContext.user?.externalRefNo
    if(userrefNo){
      setIsBuyer(true)
      // form.setFieldsValue()
    }
  }, []);

  const getIndentData = () => {
    const req =  new IndentRequestDto()

    //  const req =  new IndentRequestDto(form.getFieldValue('requestNo'),form.getFieldValue('indentDate'),form.getFieldValue('indentDate'),IAMClientAuthContext.user?.externalRefNo)
     req.extRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
    if (form.getFieldValue('requestNo') !== undefined) {
      req.requestNo = form.getFieldValue('requestNo')
    } if (form.getFieldValue('indentDate') !== undefined) {
      req.confirmStartDate = (form.getFieldValue('indentDate')[0]).format('YYYY-MM-DD');
    }
    if (form.getFieldValue('indentDate') !== undefined) {
      req.confirmEndDate = (form.getFieldValue('indentDate')[1]).format('YYYY-MM-DD');
    }
    
    
    if (form.getFieldValue('indentDate') !== undefined) {
      const indentDate = form.getFieldValue('indentDate')
      // filterData = data.filter((e) => e.requestNo === indentDate)
    }
    service.getIndentData(req).then((res) => {
      if (res.status) {
        setData(res.data);
      }
    });
  }
  console.log(IAMClientAuthContext.user?.externalRefNo,"jjj")
  // const getAllDate = (req?: IndentRequestDto) => {
  //   service.getIndentDate().then(res => {
  //     if (form.getFieldValue('indentDate') !== undefined) {
  //       req.confirmStartDate = (form.getFieldValue('indentDate')[0]).format('YYYY-MM-DD');
  //     }
  //     if (form.getFieldValue('indentDate') !== undefined) {
  //       req.confirmEndDate = (form.getFieldValue('indentDate')[1]).format('YYYY-MM-DD');
  //     }
  //     if (res.status) {
  //       setDate(res.data)
  //     }
  //   })
  // }
  const resetHandler = () => {
    form.resetFields();
    getIndentData();

  }
  const getAll = () => {
    service.getIndentDropDown().then(res => {
      if (res.status) {
        dropDown(res.data)
      }
    })
  }
  const renderCellData = (data) => {
    return data ? data : "-";
  }

  // const onSearch = () => {
  //   form.validateFields().then((values) => {
  //     getIndentData(values);
  //   });
  // }

  const columns: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      style: { background: 'red' },
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    // {
    //     title: "Indent Code",
    //     dataIndex: "requestNo",
    //     width: "110px",
    //     onCell: (record: any) => ({
    //         rowSpan: record.rowSpan,
    //     }),
    //     fixed: 'left',
    // },
    {
      title: "Indent Code",
      dataIndex: "requestNo",
      width: '150px',
      sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
      sortDirections: ["descend", "ascend"],

    },

    {
      title: "Style",
      dataIndex: "style",
      width: '150px',
      sorter: (a, b) => a.style.localeCompare(b.style),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Indent Date",
      dataIndex: "indentDate",
      sorter: (a, b) => a.indentDate.localeCompare(b.indentDate),
      sortDirections: ["descend", "ascend"],
      width: '150px', render: (text, record) => { return record.indentDate !== null ? moment(record.indentDate).format('YYYY-MM-DD') : "" },

    },
    {
      title: "Expected Date",
      dataIndex: "expectedDate",
      sorter: (a, b) => a.expectedDate.localeCompare(b.expectedDate),
      sortDirections: ["descend", "ascend"],
      width: '150px',
      render: (text, record) => { return record.expectedDate !== null ? moment(record.expectedDate).format('YYYY-MM-DD') : "" },

    },
    {
      title: <div style={{ textAlign: 'center' }}>Material Type</div>,
      dataIndex: "i_items",
      key: "i_items",
      align: 'center',
      render: (i_items, text) => {
        renderCellData(text)
        return (
          <Table
            dataSource={i_items}
            columns={[
              {
                dataIndex: "materialtype",
                key: "materialtype", align: 'center',
              },

            ]}
            pagination={false}
          />
        );
      }
    },
    // {
    //   title: <div style={{ textAlign: 'center' }}>Material Code</div>,
    //   dataIndex: "mi_items",
    //   key: "mi_items",
    //   align: 'center',
    //   render: (mi_items, text) => {
    //     renderCellData(text)
    //     return (
    //       <Table
    //         dataSource={mi_items}
    //         columns={[
    //           {
    //             dataIndex: "trimCode/m3FabricCode",
    //             key: "trimCode/m3FabricCode", align: 'center',
    //           },

    //         ]}
    //         pagination={false}
    //       />
    //     );
    //   }
    // },
    // {
    //   title: <div style={{ textAlign: 'center' }}>Colour</div>,
    //   dataIndex: "i_items",
    //   key: "i_items",
    //   align: 'center',
    //   render: (i_items, text) => {
    //     renderCellData(text)
    //     return (
    //       <Table
    //         dataSource={i_items}
    //         columns={[
    //           {
    //             dataIndex: "color",
    //             key: "color", align: 'center',
    //           },

    //         ]}
    //         pagination={false}
    //       />
    //     );
    //   }
    // },
    {
      title: <div style={{ textAlign: 'center' }}>Quantity</div>,
      dataIndex: "i_items",
      key: "i_items",
      align: 'center',
      render: (i_items, text) => {
        renderCellData(text)
        return (
          <Table
            dataSource={i_items}
            columns={[
              {
                dataIndex: "quantity",
                key: "quantity", align: 'center',
              },

            ]}
            pagination={false}
          />
        );
      }
    },
    {
      title: <div style={{ textAlign: 'center' }}>M3 Code</div>,
      dataIndex: "i_items",
      key: "i_items",
      align: 'center',
      render: (i_items, text) => {
        renderCellData(text)
        return (
          <Table
            dataSource={i_items}
            columns={[
              {
                dataIndex: "m3Code",
                key: "m3Code", align: 'center',
              },

            ]}
            pagination={false}
          />
        );
      }
    },
    {
      title: "Status",
      dataIndex: "i_items",
      key: "i_items",
      align: 'center',
      render: (i_items, text) => {
        renderCellData(text)
        return (
          <Table
            dataSource={i_items}
            columns={[
              {
                dataIndex: "status",
                key: "status", align: 'center',
              },

            ]}
            pagination={false}
          />
        );
      }

    },

  ]
  return (
    <div>
      <Card title="Indent Report" >
        <Form form={form}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label='Indent Code' style={{ marginBottom: '10px' }} name={'requestNo'}>
                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Indent Code' >

                  {drop.map(e => {
                    return (
                      <Option key={e.requestNo} value={e.requestNo} name={e.requestNo}> {e.requestNo}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
             
                <Form.Item label="Indent Date" name="indentDate">
              <RangePicker />
            </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item style={{ marginBottom: '10px' }}>
                <Button
                  htmlType='submit'
                  type="primary"
                  style={{ width: '80px', marginRight: "10px" }}

                  onClick={getIndentData}
                >Submit</Button>
                <Button htmlType='reset' danger style={{ width: '80px' }} onClick={resetHandler}>Reset</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table columns={columns} dataSource={data} bordered />
      </Card>
    </div>

  )


}

export default IndentReport;