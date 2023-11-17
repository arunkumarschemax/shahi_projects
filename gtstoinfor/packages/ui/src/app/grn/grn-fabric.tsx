import { GrnItemsDto, VendorIdReq } from "@project-management-system/shared-models"
import { PurchaseOrderservice, SampleDevelopmentService, UomService } from "@project-management-system/shared-services"
import { Button, Card, Form, Input, Row, Select } from "antd"
import Table from "antd/es/table"
import moment from "moment"
import React from "react"
import { useEffect, useState } from "react"


export const GRNFabricForm =({fabricData, onSaveData }) =>{
    const [typeData, setTypeData]= useState<any[]>([])
    const [page, setPage] = React.useState(1);
    const {Option}=Select
    const [form] = Form.useForm();
    const uomService = new UomService()
    const [uomData, setUomData] = useState<any[]>([])
    const [formData, setFormData] = useState([]);


    useEffect(() =>{
        getUomData()
    },[])

    const getUomData = () =>{
      uomService.getAllActiveUoms().then((res)=>{
        setUomData(res.data)
      })
    }


    const handleSaveData = () => {
      form.validateFields().then((values) => {
        const updatedFormData = fabricData
          .filter((record) => {
            const key = record.key;
            return (
              values[`receivedQuantity_${record.poFabricId}_${key}`] ||
              values[`acceptedQuantity_${record.poFabricId}_${key}`] ||
              values[`rejectedQuantity_${record.poFabricId}_${key}`]
            );
          })
          .map((record) => ({
            poFabricId: record.poFabricId,
            receivedQuantity: values[`receivedQuantity_${record.poFabricId}_${record.key}`],
            receivedUomId: values[`receivedUomId_${record.poFabricId}_${record.key}`],
            acceptedQuantity: values[`acceptedQuantity_${record.poFabricId}_${record.key}`],
            acceptedUomId: values[`acceptedUomId_${record.poFabricId}_${record.key}`],
            rejectedQuantity: values[`rejectedQuantity_${record.poFabricId}_${record.key}`],
            rejectedUomId: values[`rejectedUomId_${record.poFabricId}_${record.key}`],
            ...record,
          }));
  
        setFormData(updatedFormData);
        console.log("FormData:", updatedFormData);
        fabricForm()
      });
    };

    const fabricForm = () => {
      const grnItemsArray = [];
      formData.forEach((record) => {
        const grnItem = new GrnItemsDto()
        grnItem.poFabricId = record.poFabricId
        grnItem.m3ItemCodeId = record.m3ItemCodeId
        grnItem.productGroupId = record.productGroupId
        grnItem.receivedQuantity = record.receivedQuantity
        grnItem.receivedUomId = record.receivedUomId
        grnItem.acceptedQuantity = record.acceptedQuantity
        grnItem.acceptedUomId = record.acceptedUomId
        grnItem.rejectedQuantity = record.rejectedQuantity
        grnItem.rejectedUomId = record.rejectedUomId
        grnItem.indentFabricId = record.indentFabricId
        grnItem.conversionQuantity = record.conversionQuantity
        grnItem.conversionUomId = record.conversionUomId
        grnItem.remarks = record.remarks
        grnItemsArray.push(grnItem)
      });
      onSaveData(grnItemsArray)
      console.log("GrnItemsArray:", grnItemsArray);
    };
    

    
    const columns:any = [
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
          render: (poQuantity, row) => `${poQuantity} ${row.uom}`,
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
              name={`receivedQuantity_${record.poFabricId}_${record.key}`}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || (Number(value) <= record.poQuantity)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Cannot exceed PO Qty');
                  },
                },
              ]}
            >
              <Input 
                placeholder="Received Quantity" 
                type="number"
                pattern="^[0-9]*$"
              />
            </Form.Item>
          ),
        },
        {
          title: <div style={{textAlign:"center"}}>UOM</div>,
          dataIndex: 'receivedUomId',
          render: (_, record) => (
            <Form.Item
            name={`receivedUomId_${record.poFabricId}_${record.key}`}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                placeholder="Select UOM"
                >
                {uomData?.map((e) => (
                  <Option key={e.uomId} value={e.uomId}>
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
          render: (_, record) => (
              <Form.Item
              name={`acceptedQuantity_${record.poFabricId}_${record.key}`}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || (Number(value) <= record.poQuantity)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Cannot exceed PO Qty');
                  },
                },
              ]}
              >
                <Input 
                placeholder="Accepted Quantity" 
                type="number"
                pattern="^[0-9]*$"
                />
              </Form.Item>
          ),
        },
        {
          title: <div style={{textAlign:"center"}}>UOM</div>,
          dataIndex: 'acceptedUomId',
          render: (index, record) => (
            <Form.Item
            name={`acceptedUomId_${record.poFabricId}_${record.key}`}
            // rules={[
            //     {
            //       required: true,
            //       message: 'Please select UOM',
            //     }
            //   ]}
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
            name={`rejectedQuantity_${record.poFabricId}_${record.key}`}
            >
              <Input 
              placeholder="Rejected Quantity" 
              type="number"
                pattern="^[0-9]*$"
              />
            </Form.Item>
            ),
        },
        {
          title: <div style={{textAlign:"center"}}>UOM</div>,
          dataIndex: 'rejectedUomId',
          render: (index, record) => (
            <Form.Item
            name={`rejectedUomId_${record.poFabricId}_${record.key}`}
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
        <Form form={form}>
          <Row>
            <div style={{ overflowX: "auto", width: "100%" }}>
              <Card title={<div style={{ color: "blue", fontSize: "17px" }}>Fabric Details</div>}>
                <Table columns={columns} dataSource={fabricData} bordered scroll={{ x: "max-content" }} pagination={false} />
                <Button type="primary" onClick={handleSaveData}>
                  Save
                </Button>
              </Card>
            </div>
          </Row>
        </Form>
      );

}
export default GRNFabricForm