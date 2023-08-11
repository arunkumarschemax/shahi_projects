import { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Divider, Form, message, UploadProps } from 'antd';
import { OrdersService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import AlertMessages from '../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UndoOutlined } from '@ant-design/icons';
import { FileStatusReq } from '@project-management-system/shared-models';


export default function DocumentListupload() {
  const [filelist, setFilelist] = useState([]);
  let navigate = useNavigate();

  return(
  <Card title='Document Upload'></Card>
  )
}