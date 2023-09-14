
import { useEffect, useRef, useState } from 'react';
import {  Button, Card, Form, Input, Table, Space, InputRef, Modal } from 'antd';
import {  DownloadOutlined, SearchOutlined,  } from '@ant-design/icons';
import { AlertMessages, } from '@project-management-system/shared-models';
import { ColumnType } from 'antd/lib/table';
import { OrdersService, UploadDocumentService } from '@project-management-system/shared-services';
import { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import Link from 'antd/lib/typography/Link';
import { redirect, useNavigate } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';
import axios from 'axios';

const DocumentReport =() =>{

return (
    <>
    </>
)
}
export default DocumentReport