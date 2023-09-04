import React, { useState } from "react";
import { Select, Spin, message, Button, Input, Row, Form, Col, Card, Table } from "antd";
import Tesseract from "tesseract.js";
import { useNavigate,useLocation } from "react-router-dom";
import { AllScanDto } from "packages/libs/shared-models/src/shared-model/scan.dto";
import { ScanService } from "@project-management-system/shared-services";
import DocExtractForm from "./doc-extract-form";
import { ColumnProps } from "antd/es/table/Column";

const { Option } = Select;

export interface DocumentItemFormProps {
    form:any;
    data:any[]
}

export function DocumentItemForm(props: DocumentItemFormProps) {

    const [submitVisible,setSubmitVisible] = useState<boolean>(false)
    const [page, setPage] = React.useState(1);

    const handleDocument = () => {
        console.log("hiii")
    }

    const columnsSkelton: ColumnProps<any>[] = [
        {
          title: 'HSN',
          dataIndex: 'hsnCode',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Tax Type',
            dataIndex: 'taxType',
        },
        {
            title: 'Tax Amount',
            dataIndex: 'taxAmount',
        },
        {
            title: 'Charge Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Action',
            dataIndex: 'action',
        },
      ];

    return (
        <Card title={"Item Details"} headStyle={{ backgroundColor: '#77dfec', border: 0 }} bordered={true} style={{marginBottom: 16, borderRadius: 8, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', background: '#fff',borderTop: '1px solid #e8e8e8' }}>
            <Form layout='vertical' form={props.form} onFinish={handleDocument}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'HSN is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='hsnCode' label='HSN Code'>
                            <Input type={"text"} />
                        </Form.Item>    
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Description is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='description' label='Description'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Tax Type is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='taxType' label='Tax Type'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'tax amount is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='taxAmount' label='Tax Amount'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'charge Amount is required'
                                    },
                                    {
                                        pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z. ]*$/,
                                        message: `Should contain only alphabets.`,
                                    }
                                ]} name='amount' label='Charge Amount'>
                            <Input type={"text"} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Table pagination={{
        onChange(current) {
        setPage(current);
        }
        }} columns={columnsSkelton}
        dataSource={props.data} scroll={{ x: 500 }}
        size="large"
        bordered />
        </Card>
    )
}
export default DocumentItemForm;