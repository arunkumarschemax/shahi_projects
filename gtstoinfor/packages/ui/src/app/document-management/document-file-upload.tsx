import { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Divider, Form, message, UploadProps } from 'antd';
import { OrdersService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import AlertMessages from '../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UndoOutlined } from '@ant-design/icons';
import { FileStatusReq } from '@project-management-system/shared-models';
import { useForm } from 'antd/es/form/Form';


export default function DocumentListupload() {
  const [filelist, setFilelist] = useState([]);
  let navigate = useNavigate();
  const [form] = Form.useForm();

  return(
  <Card title='Document Upload'>
    <Form form={form}>

    </Form>

  </Card>
  )
}