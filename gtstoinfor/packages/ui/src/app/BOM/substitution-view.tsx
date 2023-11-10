import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Form, Select, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessages from '../common/common-functions/alert-messages';
import moment from 'moment';
import { SubstitutionService } from '@project-management-system/shared-services';
import { fgItemIdReq } from '@project-management-system/shared-models';


const SubstituionView=() =>{
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const service = new SubstitutionService
    const [style, setStyle] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [Value, setValue] = useState([]);

    useEffect(()=>{
      Substituion();
    },[])

    const resetHandler = () => {
        form.resetFields();
    
    
    }
    const handleRowClick = (record) => {
      // Set the selected row when clicking on a row
      setSelectedRow(record);
    };

    const closeModal = () => {
      // Close the modal by resetting the selected row
      setSelectedRow(null);
    };
  
    const Substituion=()=>{
      const req = new fgItemIdReq()
      if(form.getFieldValue('fgItemCode') !== undefined){
        req.fgItemCode=form.getFieldValue('fgItemCode')
      }
   service.getSubstitution(req).then(res=>{
    if(res.status){
    setValue(res.data)
    }
   })
    }
    const columnsSkelton:any=[
    
        {
            title: 'S No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * 10 + (index + 1)
          },

          {
            title:'Fg SkuCode',
            dataIndex:'fgSku',

          },
          {
            title:'Fg ItemCode',
            dataIndex:'fgItemCode',

          },
          {

            title:'Rm SkuCode',
            dataIndex:'rmSku',

          },
          {

            title:'Rm ItemCode',
            dataIndex:'rmItemCode',

          },
          
          {
            title:'Consumption',
            dataIndex:'consumption',
          }

        ]

        return(
            <>
            <Card title={<span>Substitution</span>} style={{textAlign:'center'}} headStyle={{border:0}}
            extra={<Link to='/'>
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>

      </Link>}>
            <Card>
                <Form form={form} layout='vertical'>
             <Row gutter={24}>
             <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                <Form.Item name='fgItemCode' label='Fg SkuCode'>
               <Select showSearch placeholder="Select Fg SkuCode" optionFilterProp="children" allowClear>
          {

            }
               </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                <Form.Item name='rmSku' label='Rm SkuCode'>
               <Select showSearch placeholder="Select Rm SkuCode" optionFilterProp="children" allowClear>
          {

            }
               </Select>
                </Form.Item>
            </Col>

            <Col >
                       <Form.Item>
                       <Button
  htmlType="submit"
  icon={<SearchOutlined />}
  type="primary"
  style={{ marginBottom: '20px' }}
>
  GET DETAILS
</Button>
<Button
  htmlType="button"
  icon={<UndoOutlined />}
  type="primary"
  style={{
    marginTop: '20px',margin:20,
    backgroundColor: '#162A6D',
    color: 'white',
    position: 'relative',
  }}
  onClick={resetHandler}
>
  RESET
</Button>


</Form.Item>

                    </Col>
             </Row>

            
                </Form>
                <>
       
                <Table size='small'
                rowKey={record => record}
                className='custom-table-wrapper'
                  columns={columnsSkelton}
                  dataSource={Value}
                  pagination={{
                    onChange(current) {
                      setPage(current);
                    }
                  }}
                   scroll={{x: 'max-content'}}
                   bordered/>
                
                </>
            </Card>
            </Card>

            </>
        )
}
export default SubstituionView



