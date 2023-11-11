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
    const [data, setdata] = useState([]);
    const [selectedItemNo, setSelectedItemNo] = useState();
    const { Option } = Select;
    const [searchClicked, setSearchClicked] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [Value, setValue] = useState([]);
    const [itemData, setItemData] = useState([]);

    useEffect(()=>{
      Substituion();
      Dropdown();
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
    const Dropdown=()=>{
      service.getFgSku().then((res)=>{
        if(res){
          setdata(res.data);
        }
      })
    }

    const FgCode = (val,data) => {
      setSelectedItemNo(data.code);
    };
  
    const Substituion=()=>{
      const req = new fgItemIdReq()
      console.log(req,"=========")
      if(form.getFieldValue('fg_sku') !== undefined){
        console.log(req,"pppppppppppppppppppp")
        req.fgItemCode=form.getFieldValue('fg_sku')
      }
   service.getSubstitution(req).then(res=>{
    if(res.status){
      setItemData(res.data)
    }
   })
    }

    const handledSearch=()=>{
      const req = new fgItemIdReq()
      if(form.getFieldValue('fg_sku') != undefined){
        req.fgItemCode=selectedItemNo
        setSearchClicked(true);

      }
      service.getFgSku(req).then((res)=>{
        if(res){
          setItemData(res.data)
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
            dataIndex:'fg_sku',
              key:'fg_sku',
          },
          {
            title:'Fg ItemCode',
            dataIndex:'fgItemCode',
            key:'fgItemCode',
          },
          {

            title:'Rm SkuCode',
            dataIndex:'rmSku',
            key:'rmSku',

          },
          {

            title:'Rm ItemCode',
            dataIndex:'rmItemCode',
            key:'rmItemCode',

          },
          
          {
            title:'Consumption',
            dataIndex:'consumption',
            key:'consumption',

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
                <Form.Item name='fg_sku' label='Fg SkuCode'>
               <Select showSearch 
               placeholder="Select Fg SkuCode"
                optionFilterProp="children"
                allowClear
                onChange={(val,data)=>FgCode(val,data)}>
          {
            data?.map((e)=>(
              <Option key={e.fg_sku_id} val={e.fg_sku_id} code={e.fg_sku}>
                  {e.fg_sku}
              </Option>
            ))

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
  onClick={handledSearch}
>
 Search
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
                  dataSource={itemData}
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



