import React, { useEffect } from 'react'
import { ColumnProps, ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Form, Row, Select, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ExternalRefReq, GRNLocationPropsRequest } from '@project-management-system/shared-models';
import { LocationMappingService } from '@project-management-system/shared-services';
import { UndoOutlined } from '@ant-design/icons';

export const GrnPendingInfoGrid = () => {

    const locationService = new LocationMappingService();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState<number>(null);
    const [fabData, setFabData] = React.useState<any>()
    const [grndata, setGrndata] = React.useState<any[]>([]);
    const [material, setmaterial] = React.useState<any[]>([]);

    const [locationData, setLocationData] = React.useState<GRNLocationPropsRequest>();
    const [form] = Form.useForm();
    const { Option } = Select;

    const externalRefNo = JSON.parse(localStorage.getItem('currentUser')).user.externalRefNo
    console.log(externalRefNo,"req")


    const navigate = useNavigate();

    useEffect(() => {
        getAllData()
        getgrn()
        getMaterial()
    }, [])



    const getAllData = () => {
        const  req = new ExternalRefReq(externalRefNo) 

        // console.log(req,"req")
        if(form.getFieldValue('grnNumber') !== undefined){
            req.grnNo=form.getFieldValue('grnNumber')
        }
        if(form.getFieldValue('materialType') !== undefined){
            req.material=form.getFieldValue('materialType')
        }
        locationService.getAllFabrics(req).then((res) => {
            setFabData(res.data);
            // console.log(res.data, "?????????????????????????????");
        })
    }

    console.log(form.getFieldValue('materialType'),"OOOOOOOOOOOOOOO");
    
const getgrn=()=>{
    const  req = new ExternalRefReq(externalRefNo)     
    locationService.getgrn(req).then((res)=>{
        setGrndata(res.data)
    })
}
    
const getMaterial=()=>{
    const  req = new ExternalRefReq(externalRefNo)     
    locationService.getMaterial(req).then((res)=>{
        setmaterial(res.data)
    })
}
    const sampleTypeColumns: ColumnsType<any> = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1)
        },
        {
            title: 'GRN number',
            dataIndex: "grnNumber",
            align: 'left',
            sorter: (a, b) => a.grnNumber - b.grnNumber,

              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Vendor',
            dataIndex: "vendor_name",
            align: 'left',
            sorter: (a, b) => a.vendor_name - b.vendor_name,

              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Buyer',
            dataIndex: "buyerName",
            align: 'left',
            sorter: (a, b) => a.buyerName - b.buyerName,

              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Material Type',
            dataIndex: "materialType",
            align: 'left',
            sorter: (a, b) => a.materialType - b.materialType,

              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Item',
            dataIndex: "itemCode",
            align: 'left',
            sorter: (a, b) => a.itemCode - b.itemCode,
              sortDirections: ['descend', 'ascend'],
            //   ...getColumnSearchProps('vendorName')
        },
        {
            title: 'Grn Quantity',
            dataIndex: 'acceptedQuantity',
            align: 'left',
            sorter: (a, b) => a.acceptedQuantity - b.acceptedQuantity,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Location Mapped',
            dataIndex: 'allocatedQty',
            align: 'left',
            sorter: (a, b) => a.allocatedQty - b.allocatedQty,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            align: 'left',
            sorter: (a, b) => a.balance - b.balance,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Allocate',
            // render:(record) =>{
            //     console.log(record,"rowdata")
            //     return('')
            // }
            render: (rowData) => (
                
                <span>
                    <Button type="primary" shape="round" size="small"
                        disabled={Number(Number(rowData.quantity) - Number(rowData.allocatedQty)) > 0}
                        onClick={() => {
                            setData(rowData);
                        }}>
                        Allocate
                    </Button>
                </span>
            )
        },

    ];
    const onReset = () => {
        form.resetFields();
        getAllData();
      };
      const onFinish = () => {
        getAllData();
      };
    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    }

    const setData = (rowdata) => {
        // console.log(rowdata)

        if (rowdata) {
            navigate("/location-mapping", { state: { data: rowdata } });
        }
    }

    return (
        <div>
            <Card 
            title={<span >GRN Pending Details</span>}
                // style={{ textAlign: 'center' }}
                 headStyle={{ backgroundColor: '#69c0ff', border: 0 }} >
                    <Form form={form} onFinish={onFinish}>
                        <Row gutter={24}>
                        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                            <Form.Item name="materialType" label="Material Type">
                   <Select
                   showSearch
                   placeholder="Select MaterialType "
                   optionFilterProp="children"
                   allowClear>
                    {material.map((qc: any) => (
                  <Select.Option key={qc.materialType} value={qc.materialType}>
                    {qc.materialType}
                  </Select.Option>
                ))}
                 </Select>
                            </Form.Item>
                       </Col>
                       <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                            <Form.Item name="grnNumber" label=" GRN number ">
                   <Select
                   showSearch
                   placeholder="Select MaterialType "
                   optionFilterProp="children"
                   allowClear>
                    {grndata.map((qc: any) => (
                  <Select.Option key={qc.grnNumber} value={qc.grnNumber}>
                    {qc.grnItemNo}
                  </Select.Option>
                ))}
                 </Select>
                            </Form.Item>
                       </Col>
                       <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "green", width: "100%" }}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                danger
                icon={<UndoOutlined />}
                onClick={onReset}
                style={{ width: "100%" }}
              >
                Reset
              </Button>
            </Form.Item>
          </Col>
                        </Row>
                    </Form>
                <Table
                    rowKey={record => record.productId}
                    className="components-table-nested"
                    columns={sampleTypeColumns}
                    dataSource={fabData}
                    pagination={{
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize)
                        }
                    }}
                    onChange={onChange}
                    scroll={{ x: 500 }}
                    // size='small'
                    bordered
                />
            </Card>
        </div>
    )
}

