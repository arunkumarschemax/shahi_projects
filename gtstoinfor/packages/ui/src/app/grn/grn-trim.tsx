import { GrnItemsDto, VendorIdReq } from "@project-management-system/shared-models"
import { PurchaseOrderservice, SampleDevelopmentService, UomService } from "@project-management-system/shared-services"
import { Button, Card, Form, Input, Row, Select } from "antd"
import Table from "antd/es/table"
import moment from "moment"
import React from "react"
import { useEffect, useState } from "react"


export const GRNTrimForm =({trimData, onSaveData }) =>{
    const [typeData, setTypeData]= useState<any[]>([])
    const [page, setPage] = React.useState(1);
    const {Option}=Select
    const [form] = Form.useForm();
    const uomService = new UomService()
    const [uomData, setUomData] = useState<any[]>([])
    const [formData, setFormData] = useState([]);
    const [reciveUomName, setReciveUomName] = useState<any>('')
    const [quantity, setQuantity]= useState<any>(undefined)



    useEffect(() =>{
        getUomData()
    },[])

    const getUomData = () =>{
      uomService.getAllActiveUoms().then((res)=>{
        setUomData(res.data)
      })
    }


    const trimForm = () => {
      console.log('1st line');
    
      form
        .validateFields()
        .then((values) => {
          console.log('2nd line');
    
          const updatedFormData = trimData
            .filter((record) => {
              const key = record.key;
              return (
                values[`receivedQuantity_${record.poTrimId}_${key}`] ||
                values[`acceptedQuantity_${record.poTrimId}_${key}`] ||
                values[`rejectedQuantity_${record.poTrimId}_${key}`]
              );
            })
            .map((record) => ({
              poTrimId: record.poTrimId,
              receivedQuantity: values[`receivedQuantity_${record.poTrimId}_${record.key}`],
              receivedUomId: values[`receivedUomId_${record.poTrimId}_${record.key}`],
              acceptedQuantity: values[`acceptedQuantity_${record.poTrimId}_${record.key}`],
              acceptedUomId: values[`acceptedUomId_${record.poTrimId}_${record.key}`],
              rejectedQuantity: values[`rejectedQuantity_${record.poTrimId}_${record.key}`],
              rejectedUomId: values[`rejectedUomId_${record.poTrimId}_${record.key}`],
              conversionQuantity: quantity,
              conversionUomId: values[`acceptedUomId_${record.poFabricId}_${record.key}`],
              ...record,
            }));
    
          console.log('updatedFormData:', updatedFormData);
    
          // Wait for the promise to resolve before creating the grnItemsArray
          return updatedFormData;
        })
        .then((updatedFormData) => {
          // Create the grnItemsArray and call onSaveData after the promise resolves
          const grnItemsArray = [];
          updatedFormData.forEach((record) => {
            const grnItem = new GrnItemsDto();
            grnItem.poTrimId = record.poTrimId;
            grnItem.m3ItemCodeId = record.m3TrimCode;
            // grnItem.productGroupId = record.productGroupId;
            grnItem.receivedQuantity = record.receivedQuantity;
            // grnItem.receivedUomId = record.receivedUomId;
            grnItem.acceptedQuantity = record.acceptedQuantity;
            // grnItem.acceptedUomId = record.acceptedUomId;
            grnItem.rejectedQuantity = record.rejectedQuantity;
            grnItem.rejectedUomId = record.rejectedUomId;
            grnItem.indentTrimId = record.indentTrimId;
            grnItem.conversionQuantity = record.conversionQuantity;
            grnItem.conversionUomId = record.conversionUomId;
            grnItem.remarks = record.remarks;
            grnItemsArray.push(grnItem);
          });
    
          console.log(grnItemsArray, '------------------');
          onSaveData(grnItemsArray);
          console.log('GrnItemsArray:', grnItemsArray);
        })
        .catch((error) => {
          console.error('Error validating fields:', error);
        });
    };
    

    const uomConversionFactors = {
      m: 1,          // 1 meter
      yd: 0.9144,    // 1 yard = 0.9144 meters
      gsm: 1,        // 1 gram per square meter
      'oz/yd²': 33.906, // 1 ounce per square yard = 33.906 grams per square meter
      pc: 1,         // 1 piece
      ly: 1,         // 1 length (assuming length is in meters)
      mm: 0.001,     // 1 millimeter = 0.001 meters
      in: 0.0254,    // 1 inch = 0.0254 meters
      cm: 0.01,      // 1 centimeter = 0.01 meters
      gr: 0.001      // 1 gram
    };

    let convertedQty

    const acceptUomOnchange = (option, value, record) =>{
      const acceptedQuantity = form.getFieldValue(`acceptedQuantity_${record.poTrimId}_${record.key}`);
       convertedQty = convertQuantity(acceptedQuantity, reciveUomName, value?.type?value.type:undefined);
    }
   
    const receiveuomOnChange = (value,option) =>{
      console.log(option.name)
      setReciveUomName(option.name)

    }
    const acceptedQuantityOnchange =(value) =>{
    console.log(value)
    }

    const convertQuantity = (quantity, fromUom, toUom) => {
      if(quantity != null && fromUom != undefined && toUom != undefined){
        console.log(quantity,fromUom,toUom)
        if (fromUom === toUom) {
        console.log(quantity)
        setQuantity(quantity)
          return quantity;
        }
        if (!(fromUom in uomConversionFactors) || !(toUom in uomConversionFactors)) {
          console.log(fromUom in uomConversionFactors)
          throw new Error('Invalid units of measure');
        }
      
        const baseQuantity = quantity * uomConversionFactors[fromUom];
        const convertedQuantity = baseQuantity / uomConversionFactors[toUom];
        console.log(convertedQuantity)
        setQuantity(convertedQuantity)
        return convertedQuantity;
      }  
    };

    
    const columns:any = [
        {
          title: <div style={{textAlign:"center"}}>M3 Trim Code</div>,
          dataIndex: 'm3TrimCode',
        },
        {
          title: <div style={{textAlign:"center"}}>Style</div>,
          dataIndex: 'style',
        },
        {
          title: <div style={{textAlign:"center"}}>Buyer</div>,
          dataIndex: 'buyer',
        },
        {
          title: <div style={{textAlign:"center"}}>PO Qty</div>,
          dataIndex: 'poQuantity',
          align:"right",
          render: (poQuantity, row) => `${poQuantity} ${row.uom}`,
        },
        {
          title: <div style={{textAlign:"center"}}>Previous Qty</div>,
          align:"right",
          dataIndex: 'grnQuantity',
        },
        {
          title: <div style={{textAlign:"center"}}>Received Qty</div>,
          dataIndex: 'receivedQuantity',
          render: (_, record) => (
            <Form.Item
            name={`receivedQuantity_${record.poTrimId}_${record.key}`}
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please enter received quantity',
              //   },
              //   {
              //     type: 'number',
              //     min: 0,
              //     max: record.poQuantity,
              //     message: `Received quantity should be between 0 and ${record.poQuantity}`,
              //   },
              // ]}
            >
              <Input 
              // name={`${record.poTrimId}`+`${record.key}+'receivedQuantity'`} 
              placeholder="Received Quantity" 
              />
            </Form.Item>
          ),
        },
        // {
        //   title: <div style={{textAlign:"center"}}>UOM</div>,
        //   dataIndex: 'receivedUomId',
        //   render: (_, record) => (
        //     <Form.Item
        //     name={`receivedUomId_${record.poTrimId}_${record.key}`}
        //     // rules={[
        //     //     {
        //     //       required: true,
        //     //       message: 'Please select UOM',
        //     //     }
        //     //   ]}
        //     >
        //       <Select
        //         allowClear
        //         style={{ width: "100%" }}
        //         showSearch
        //         optionFilterProp="children"
        //         placeholder="Select UOM"
        //         onChange={receiveuomOnChange}
        //         >
        //         {uomData?.map((e) => (
        //           <Option key={e.uomId} value={e.uomId} name={e.uom}>
        //             {e.uom}
        //           </Option>
        //         ))}
        //       </Select>
        //     </Form.Item>
        //   ),
        // },
        {
          title: <div style={{textAlign:"center"}}>Accepted Qty</div>,
          dataIndex: 'acceptedQuantity',
          render: (_, record) => (
              <Form.Item
              name={`acceptedQuantity_${record.poTrimId}_${record.key}`}
              // rules={[
              //     {
              //       required: true,
              //       message: 'Please enter accepted quantity',
              //     },
              //     {
              //       type: 'number',
              //       min: 0,
              //       max: record.poQuantity,
              //       message: `Quantity should be between 0 and ${record.poQuantity}`,
              //     },
              //   ]}
              >
                <Input 
                placeholder="Accepted Quantity" 
                name={`${record.poTrimId}`+`${record.key}+'acceptedQuantity'`}
                onChange={acceptedQuantityOnchange}
                />
              </Form.Item>
          ),
        },
        // {
        //   title: <div style={{textAlign:"center"}}>UOM</div>,
        //   dataIndex: 'acceptedUomId',
        //   render: (index, record) => (
        //     <Form.Item
        //     name={`acceptedUomId_${record.poTrimId}_${record.key}`}
        //     // rules={[
        //     //     {
        //     //       required: true,
        //     //       message: 'Please select UOM',
        //     //     }
        //     //   ]}
        //     >
        //       <Select
        //         allowClear
        //         style={{ width: "100%" }}
        //         showSearch
        //         optionFilterProp="children"
        //         placeholder="Select UOM"
        //         onChange={(option, value) => acceptUomOnchange(option, value, record)}
        //       >
        //         {uomData?.map((e) => (
        //           <Option key={e.uomId} value={e.uomId} name={`${record.poTrimId}`+`${record.key}+'acceptedUomId'`} type={e.uom}>
        //           {e.uom}
        //         </Option>
        //         ))}
        //       </Select>
        //     </Form.Item>
        //   ),
        // },
        {
          title: <div style={{textAlign:"center"}}>Rejected Qty</div>,
          dataIndex: 'rejectedQuantity',
          render: (index, record) => (
            <Form.Item
            name={`rejectedQuantity_${record.poTrimId}_${record.key}`}
              // rules={[
              //   {
              //     type: 'number',
              //     min: 0,
              //     max: record.poQuantity,
              //     message: `Quantity should be between 0 and ${record.poQuantity}`,
              //   },
              // ]}
            >
              <Input 
              placeholder="Accepted Quantity" 
              name={`${record.poTrimId}`+`${record.key}+'rejectedQuantity'`}
              />
            </Form.Item>
            ),
        },
        {
          title: <div style={{textAlign:"center"}}>UOM</div>,
          dataIndex: 'rejectedUomId',
          render: (index, record) => (
            <Form.Item
            name={`rejectedUomId_${record.poTrimId}_${record.key}`}
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
                  <Option key={e.uomId} value={e.uomId} name={`${record.poTrimId}`+`${record.key}+'rejectedUomId'`}>
                    {e.uom}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: <div style={{ textAlign: 'center' }}>Converted Qty</div>,
          dataIndex: 'convertedQty',
          render: (_, record) => {
            return   <Form.Item  name={`convertedQty_${record.poTrimId}_${record.key}`}>  
              {<span>{Number(quantity)?Number(quantity):''}</span>}</Form.Item>
          },
        },
      ]

      return (
        <Form form={form}>
          <Row>
            <div style={{ overflowX: "auto", width: "100%" }}>
              <Card title={<div style={{ color: "blue", fontSize: "17px",textAlign:"left" }}>Trim Details</div>} style={{ textAlign: 'right' }}>
                <Table columns={columns} dataSource={trimData} bordered scroll={{ x: "max-content" }} pagination={false} />
                <Button type="primary" onClick={trimForm} style={{margin:"10px"}}>
                  Save
                </Button>
              </Card>
            </div>
          </Row>
        </Form>
      );

}
export default GRNTrimForm