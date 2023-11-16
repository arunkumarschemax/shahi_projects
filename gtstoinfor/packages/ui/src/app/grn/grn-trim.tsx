import { EditOutlined, EnvironmentOutlined, MinusCircleOutlined, PlusOutlined, UndoOutlined } from "@ant-design/icons"
import { M3MastersCategoryReq, VendorIdReq } from "@project-management-system/shared-models"
import { ColourService, FabricTypeService, FabricWeaveService, M3MastersService, ProfitControlHeadService, PurchaseOrderservice, SampleDevelopmentService, UomService } from "@project-management-system/shared-services"
import { Button, Card, Col, Divider, Form, Input, Popconfirm, Row, Select, Space, Tag, Tooltip, message } from "antd"
import Table, { ColumnProps } from "antd/es/table"
import moment from "moment"
import React from "react"
import { useEffect, useState } from "react"


export const GRNTrimForm =() =>{
    const [typeData, setTypeData]= useState<any[]>([])
    const [fabricData, setFabricData] = useState<any[]>([])

    const [page, setPage] = React.useState(1);
    const {Option}=Select
    const sampleService = new SampleDevelopmentService()
    const poService = new PurchaseOrderservice()
    const uomService = new UomService
    const [uomData, setUomData] = useState<any[]>([])
    let tableData: any[] = []


    useEffect(() =>{
        // getType()
        getAllFabricsByPO()
        getUomData()
    },[])

    // const getType = () =>{
    //     sampleService.getTrimType().then((res)=>{
    //         if(res.status){
    //             setTypeData(res.data)
    //         }
    //     })
    // }
    
    const getAllFabricsByPO = () =>{
      const req = new VendorIdReq()
      poService.getAllFabricsByPO(req).then((res)=>{
            if(res.status){
              setFabricData(res.data)
            }
        })
    }

    const getUomData = () =>{
      uomService.getAllActiveUoms().then((res)=>{
        setUomData(res.data)
      })
    }

    
    
    const columns:any = [
        // {
        //   title: <div style={{textAlign:"center"}}>Fabric Code</div>,
        //   dataIndex: 'fabricCode'
        // },
        {
          title: <div style={{textAlign:"center"}}>M3 Fabric Code</div>,
          dataIndex: 'm3fabricCode',
        },
        {
          title: <div style={{textAlign:"center"}}>Fabric Type</div>,
          dataIndex: 'fabricTypeName',
        },
        {
          title: <div style={{textAlign:"center"}}>PO Qty</div>,
          dataIndex: 'poQuantity',
          align:"right",
          render: (poQuantity, row) => `${poQuantity} ${row.quantityUom}`,
        },
        {
          title: <div style={{textAlign:"center"}}>GRN Qty</div>,
          align:"right",
          dataIndex: 'prevAcceptedQty',
        },
        {
          title: <div style={{textAlign:"center"}}>Received Qty</div>,
          dataIndex: 'receivedQuantity',
          render: (_, record) => (
            <Form.Item
              name={`${record.poFabricId}`+`${record.key}+'receivedQuantity'`}
              rules={[
                {
                  required: true,
                  message: 'Please enter received quantity',
                },
                {
                  type: 'number',
                  min: 0,
                  max: record.poQuantity,
                  message: `Received quantity should be between 0 and ${record.poQuantity}`,
                },
              ]}
            >
              <Input name={`${record.poFabricId}`+`${record.key}+'receivedQuantity'`} placeholder="Received Quantity" />
            </Form.Item>
          ),
        },
        {
          title: <div style={{textAlign:"center"}}>UOM</div>,
          dataIndex: 'receivedUomId',
          render: (index, record) => (
            <Form.Item
            name={`${record.poFabricId}`+`${record.key}+'receivedUomId'`}
            rules={[
                {
                  required: true,
                  message: 'Please select UOM',
                }
              ]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                placeholder="Select UOM"
              >
                {uomData?.map((e) => (
                  <Option key={e.uomId} value={e.uomId} name={`${record.poFabricId}`+`${record.key}+'receivedUomId'`}>
                    {e.uom}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: <div style={{textAlign:"center"}}>Accepted Qty</div>,
          dataIndex: 'acceptedQuantity',
          render: (index, record) => (
              <Form.Item
              name={`${record.poFabricId}`+`${record.key}+'acceptedQuantity'`}
              rules={[
                  {
                    required: true,
                    message: 'Please enter accepted quantity',
                  },
                  {
                    type: 'number',
                    min: 0,
                    max: record.poQuantity,
                    message: `Quantity should be between 0 and ${record.poQuantity}`,
                  },
                ]}
              >
                <Input placeholder="Accepted Quantity" name={`${record.poFabricId}`+`${record.key}+'acceptedQuantity'`}/>
              </Form.Item>
          ),
        },
        {
          title: <div style={{textAlign:"center"}}>UOM</div>,
          dataIndex: 'acceptedUomId',
          render: (index, record) => (
            <Form.Item
            name={`${record.poFabricId}`+`${record.key}+'acceptedUomId'`}
            rules={[
                {
                  required: true,
                  message: 'Please select UOM',
                }
              ]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                placeholder="Select UOM"
              >
                {uomData?.map((e) => (
                  <Option key={e.uomId} value={e.uomId} name={`${record.poFabricId}`+`${record.key}+'acceptedUomId'`}>
                    {e.uom}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: <div style={{textAlign:"center"}}>Rejected Qty</div>,
          dataIndex: 'rejectedQuantity',
          render: (index, record) => (
            <Form.Item
            name={`${record.poFabricId}`+`${record.key}+'rejectedQuantity'`}
              // rules={[
              //   {
              //     type: 'number',
              //     min: 0,
              //     max: record.poQuantity,
              //     message: `Quantity should be between 0 and ${record.poQuantity}`,
              //   },
              // ]}
            >
              <Input placeholder="Accepted Quantity" name={`${record.poFabricId}`+`${record.key}+'rejectedQuantity'`}/>
            </Form.Item>
            ),
        },
        {
          title: <div style={{textAlign:"center"}}>UOM</div>,
          dataIndex: 'rejectedUomId',
          render: (index, record) => (
            <Form.Item
            name={`${record.poFabricId}`+`${record.key}+'acceptedUomId'`}
            rules={[
                {
                  required: true,
                  message: 'Please select UOM',
                }
              ]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                placeholder="Select UOM"
              >
                {uomData?.map((e) => (
                  <Option key={e.uomId} value={e.uomId} name={`${record.poFabricId}`+`${record.key}+'rejectedUomId'`}>
                    {e.uom}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: 'Converted Qty',
          dataIndex: 'convertedQty',
        }
      ]

    return (
       <Form>
        <Row>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <Table columns={columns} dataSource={fabricData} bordered scroll={{ x: 'max-content' }} pagination={false}/>
          </div>
        </Row>
      </Form>
    )

}
export default GRNTrimForm