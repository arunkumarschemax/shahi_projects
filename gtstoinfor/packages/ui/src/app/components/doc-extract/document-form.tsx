// import React, { useState } from "react";
// import { Select, Spin, message, Button, Input, Row, Form, Col, Card } from "antd";
// import Tesseract from "tesseract.js";
// import { useNavigate,useLocation } from "react-router-dom";
// import { AllScanDto } from "packages/libs/shared-models/src/shared-model/scan.dto";
// import { ScanService } from "@project-management-system/shared-services";
// import DocExtractForm from "./doc-extract-form";

// const { Option } = Select;

// export interface DocumentFormProps {
//     form:any;
// }

// export function DocumentForm(props: DocumentFormProps) {

//     const handleDocument = () => {
//         console.log("hiii")
//     }

//     return (
//         // <Card title={"Document Details"}>
//             <Form layout='vertical' form={props.form} onFinish={handleDocument}>
//                 <Row gutter={24}>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern:  /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='GST No' name='gstNo'>
//                             <Input type={"text"} />
//                         </Form.Item>    
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /[A-Z]{4}0[A-Z0-9]{6}/g,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='IFSC Code' name='ifscCode'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /\b(?:\d{1,2}-[A-Za-z]{3}-\d{2}|\d{4} [A-Za-z]{3} \d{1,2}|\d{1,2}\/\d{1,2}\/(?:\d{2}|\d{4}))\b/g,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Invoice No' name='invoiceNo'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /\b[A-Za-z]\d{11}\b/g,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Payment Reference' name='PayRef'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={24}>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /\bCUSTOMER ID:\s*([A-Za-z\s]+)\b/i,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Customer' name='customer'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /((\d*\.?\d+)([A-Za-z\s])\s*(lbs?|M3))/i,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Volume' name='volume'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern:  /((\d*\.?\d+)\s*(lbs?|KG))/i,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Weight' name='weight'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /((\d*\.?\d+)([A-Za-z\s])+\s*(lbs?|M3))/i,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Chargeable' name='chargeable'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={24}>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /\b(?:\d{1,2}-[A-Za-z]{3}-\d{2}|\d{4} [A-Za-z]{3} \d{1,2}|\d{1,2}\/\d{1,2}\/(?:\d{2}|\d{4}))\b/g,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Invoice Date' name='invoiceDate'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern:  /((\d+)\s*(\d+\s*%))/,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Cartons' name='cartons'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /([A-Z]{1}[0-9]{4})-/,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Po' name='po'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /((\d*\.?\d+)\s*(?:CTN|CTNS))\b/i,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Packages' name='packages'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={24}>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /\b(?:YES|NO)\b/i,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='RCM' name='rcm'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /\b(\d{2}-[A-Za-z]{3}-\d{2})\b/,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='ETA' name='eta'>
//                             <Input type={"text"} />
//                         </Form.Item> 
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /(\d{11})/,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='House Bill' name='houseBill'>
//                             <Input type={"text"} />
//                         </Form.Item> 
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /s*\s*(\d+)\s*(\d+%)\s*(COTTON)\s*(\d+%)\s*(POLYESTER)\s*(\d+%)\s*(ELASTANE)\s*(\w+)\s*(MENS SHORTS)/,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Goods Description' name='goodsDescription'>
//                             <Input type={"text"} />
//                         </Form.Item> 
//                     </Col>
//                 </Row>
//                 <Row gutter={24}>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern:/[A-Z]+\/[A-Z]+\/\d+/,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Ocean Bill' name='oceanBill'>
//                             <Input type={"text"} />
//                         </Form.Item> 
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /([A-Z0-9]+)\s+([0-9]+)/,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Containers' name='containers'>
//                             <Input type={"text"} />
//                         </Form.Item> 
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Vessel' name='vessel'>
//                             <Input type={"text"} />
//                         </Form.Item> 
//                     </Col>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Voyage' name='Voyage'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={24}>
//                     <Col span={6}>
//                         <Form.Item rules={[
//                                     {
//                                         required: true,
//                                         message: 'Owner is required'
//                                     },
//                                     {
//                                         pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
//                                         message: `Should contain only alphabets.`,
//                                     }
//                                 ]} label='Cosign' name='Cosign'>
//                             <Input type={"text"} />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//             </Form>
//         // </Card>
//     )
// }
// export default DocumentForm;