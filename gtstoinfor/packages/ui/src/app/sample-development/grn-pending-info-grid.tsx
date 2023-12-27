import React, { useEffect, useState } from 'react'
import { ColumnProps, ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Form, Modal, Row, Select, Table, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ExternalRefReq, GRNLocationPropsRequest, GRNTypeEnumDisplay, ItemTypeEnumDisplay } from '@project-management-system/shared-models';
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
    const [remarkModal,setRemarkModal] = useState<boolean>(false)
    const [remarks,setRemarks] = useState<string>('')
    const externalRefNo = JSON.parse(localStorage.getItem('currentUser')).user.externalRefNo
    console.log(externalRefNo,"req")


    const navigate = useNavigate();

    useEffect(() => {
        getAllData()
        getgrn()
        // getMaterial()
    }, [])



    const getAllData = () => {
        const  req = new ExternalRefReq(externalRefNo) 

        if(form.getFieldValue('grnNo') !== undefined){
            req.grnNo=form.getFieldValue('grnNo')
        }
        if(form.getFieldValue('material') !== undefined){
            req.material=form.getFieldValue('material')
        }
                locationService.getAllFabrics(req).then((res) => {
            setFabData(res.data);
             // console.log(res.data, "?????????????????????????????");
        })
    }

    
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
const handleTextClick = (remarks) => {
  setRemarks(remarks)
  setRemarkModal(true)
}
const onRemarksModalOk = () => {
setRemarkModal(false)
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
          title: 'GRN Type',
          dataIndex: "grnType",
          align: 'left',
          sorter: (a, b) => a.grnType - b.grnType,
          render: (text) => {
            const EnumObj = GRNTypeEnumDisplay.find((item) => item.name === text);
            return EnumObj ? EnumObj.displayVal : text;
          },
            sortDirections: ['descend', 'ascend'],
          //   ...getColumnSearchProps('vendorName')
      },
        {
            title: 'GRN Number',
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
            render: (text) => {
              const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
              return EnumObj ? EnumObj.displayVal : text;
            },
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
          title: 'Item Description',
          dataIndex: "description",
          width: '100px',
          align: 'left',
          render:(text,record) => {
            return(
                <>
                {record.description?.length > 30 ? (<><Tooltip title='Cilck to open full description'><p><span onClick={() => handleTextClick(record.description)} style={{ cursor: 'pointer' }}>
                            {record.description.length > 30 ? `${record.description?.substring(0, 30)}....` : record.description}
                        </span></p></Tooltip></>) : (<>{record.description}</>)}
                </>
            )
        }
        },
        {
            title: 'Grn Quantity',
            width: '100px',
            dataIndex: 'acceptedQuantity',
            align: 'left',
            sorter: (a, b) => a.acceptedQuantity - b.acceptedQuantity,
            sortDirections: ['descend', 'ascend'],
            render: (text,val) => {

              return val.acceptedQuantity ? `${val.acceptedQuantity}(${val.uom})` : text;
            },
        },
        // {
        //     title: 'Location Mapped',
        //     width: '100px',
        //     dataIndex: 'allocatedQty',
        //     align: 'left',
        //     sorter: (a, b) => a.allocatedQty - b.allocatedQty,
        //     sortDirections: ['descend', 'ascend'],
        // },
        // {
        //     title: 'Balance',
        //     dataIndex: 'balance',
        //     width: '100px',
        //     align: 'left',
        //     sorter: (a, b) => a.balance - b.balance,
        //     sortDirections: ['descend', 'ascend'],
        // },
        {
            title: 'Allocate',
            // render:(record) =>{
            //     console.log(record,"rowdata")
            //     return('')
            // }
            render: (rowData) => (
                
                <span>
                    <Button type="primary" shape="round" size="small"
                        disabled={Number(rowData.balance) < 0}
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
      const onFinish = (val) => {
        
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
            title={<span >Location Mapping Pending Details</span>}
                // style={{ textAlign: 'center' }}
                 headStyle={{ backgroundColor: '#69c0ff', border: 0 }} >
                    <Form form={form} onFinish={onFinish}>
                        <Row gutter={24}>
                        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                            <Form.Item name="material" label="Material Type">
                   <Select
                   showSearch
                   placeholder="Select MaterialType "
                   optionFilterProp="children"
                   allowClear>
                    {Object.values(ItemTypeEnumDisplay).map((val) => (
            <Select.Option key={val.name} value={val.name}>
              {val.displayVal}
            </Select.Option>
          ))}
                    {/* {material?.map((qc: any) => (
                  <Select.Option key={qc.materialType} value={qc.materialType}>
                    {qc.materialType}
                  </Select.Option>
                ))} */}
                 </Select>
                            </Form.Item>
                       </Col>
                       <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                            <Form.Item name="grnNo" label=" GRN number ">
                   <Select
                   showSearch
                   placeholder="Select MaterialType "
                   optionFilterProp="children"
                   allowClear>
                    {grndata.map((qc: any) => (
                  <Select.Option key={qc.grnNumber} value={qc.grnNumber}>
                    {qc.grnNumber}
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
                        scroll={{x:'max-content',y:500}}
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
                    // scroll={{ x: 500 }}
                    // size='small'
                    bordered
                />
                    <Modal open={remarkModal} onOk={onRemarksModalOk} onCancel={onRemarksModalOk} footer={[<Button onClick={onRemarksModalOk} type='primary'>Ok</Button>]}>
                <Card>
                    <p>{remarks}</p>
                </Card>
            </Modal>
            </Card>
        </div>
    )
}

