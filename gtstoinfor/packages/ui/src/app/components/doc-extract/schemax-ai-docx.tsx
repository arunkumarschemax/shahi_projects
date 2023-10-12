import {  Col, Form, Row } from 'antd';
import DocFormPreview from './doc-form-preview';
import DocReader from './doc-reader';
import { useState } from 'react';


export const SchemaxAIDocx = () => {
  const [data, setData] = useState<string>(undefined);
  const [hsnData, setHsnData] = useState<any[]>([]);


  const [mainForm] = Form.useForm();
  const [readerForm] = Form.useForm();
  const [previewForm] = Form.useForm();


  const getData = (val) => {
    // console.log(val);
    setData(val)
  }
  const getHsnData = (val) => {
    // console.log(val);
    setHsnData(val)
  }
    
    return (
            <Row >
                <Form layout="vertical" form={mainForm}>
                    <Row gutter={24}>
                        <Col span={12} >
                            <DocReader form={readerForm} extractedData = {getData} extractedHsnData = {getHsnData}/>
                        </Col>

                        <Col span={12}>
                            <DocFormPreview form={previewForm} formData={data} hsnData={hsnData} />
                        </Col>
                    </Row>
                </Form>
            </Row>
    );
};

export default SchemaxAIDocx;
