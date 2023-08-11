import { useEffect, useState } from 'react';
import { Button, Card, Col, Descriptions, Divider, Form, message, Row, Select, UploadProps } from 'antd';
import { OrdersService, UploadDocumentService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import AlertMessages from '../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UndoOutlined } from '@ant-design/icons';
import { FileStatusReq } from '@project-management-system/shared-models';
import { useForm } from 'antd/es/form/Form';


export default function DocumentListupload() {
  const [filelist, setFilelist] = useState([]);
  const [poNumber,setPoNumber] = useState<any[]>([])
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const { Option } = Select;
  const service = new UploadDocumentService

  const getPoNumber =()=>{
    service.getPoNumberDropdown().then(res=>{
      if(res.status){
        setPoNumber(res.data)
      }else{
        setPoNumber([])
      }
    })
  }
  useEffect(() =>{
    getPoNumber();
  },[])
  return(
  <Card title='Document Upload'>
    <Form form={form} layout='vertical'>
      <Row gutter={24}>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
          <Form.Item name='poNumber' label='Po Number'>
            <Select placeholder='Select PoNumber' showSearch allowClear>
            {poNumber?.map(obj =>{
                      return <Option key={obj.poNumber} value={obj.poNumber}>{obj.poNumber}</Option>
                    })}
            </Select>
          </Form.Item>
        </Col>

      </Row>

    </Form>

  </Card>
  )
}