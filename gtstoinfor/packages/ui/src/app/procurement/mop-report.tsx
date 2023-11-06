import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message, Form, Select, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {   BuyingHouseService, CompositionService, CurrencyService, CustomGroupsService, EmployeeDetailsService, FactoryService, ItemCategoryService, ItemCreationService, ItemGroupService, ItemTypeService, ItemsService, LiscenceTypeService, MasterBrandsService, ProcurmentGroupService, ProductGroupService, ProfitControlHeadService, ROSLGroupsService, RangeService, RmCreationService, SearchGroupService, StyleService, UomService } from '@project-management-system/shared-services';
import { CompositionDto, ItemCreFilterRequest, LiscenceTypesdDto, RMCreFilterRequest } from '@project-management-system/shared-models';
import AlertMessages from '../common/common-functions/alert-messages';
import moment from 'moment';


const MOPReport = () => {
   const [form] = Form.useForm();
  const [page, setPage] = React.useState(1);

    

    



  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
      title: "Item Type",
      dataIndex: "item_type_id",
      align:'center',
    
      sorter: (a, b) => a.itemTypeId.localeCompare(b.itemTypeId),
      sortDirections: ['descend', 'ascend'],
    },
    {
        title: "Item Code",
        dataIndex: "item_code",
        align:'center',
        sorter: (a, b) => a.item_code.localeCompare(b.item_code),
            sortDirections: ['descend', 'ascend'],
      },

      {
        title: "Item Group",
        dataIndex: "item_group_id",
        align:'center',
             sortDirections: ['descend', 'ascend'],
      }, 
      {
        title: "PCH",
        dataIndex: "pch_id",align:'center',
      
        
      },
      {
        title: "Placement",
        dataIndex: "placement",align:'center',
       
      },
      {
        title: "Facility",
        dataIndex: "facility_id",align:'center',
     
        
       
      },
      {
        title: "Responsible",
        dataIndex: "responsible_person_id",align:'center',
      

      },
      {
        title: "Product Group",
        dataIndex: "product_group_id",align:'center',
      
        
      },
      {
        title: "Procurement Group",
        dataIndex: "procurement_gorup_id",align:'center',
             sortDirections: ['descend', 'ascend'],

      },
      {
        title: "Attached WareHouse",
        dataIndex: "attached_warehouse",
    
      },
      {
        title: "Planner",
        dataIndex: "planner",        
        align:'center',


      },
      {
        title: "Business Area ",
        dataIndex: "business_area",        
        align:'center',


      },
      {
        title: "Basic UOM",
        dataIndex: "basic_uom_id",
        align:'center',
        
      },
      {
        title: "Currency",
        dataIndex: "currency",align:'center',
       
        
      },
      {
        title: "Description",
        dataIndex: "description",align:'center',
      },
      {
        title: "Sales Price",
        dataIndex: "sale_price",
      
        

      },
      {
        title: "Supplier",
        dataIndex: "sale_price",
        align:'center',
     

      },
      
  ];



  


  return (
      <>
      <Card title={<span >MOP Report</span>}style={{textAlign:'center'}} headStyle={{ border: 0 }}>
      <Card >
      <Form  form={form} layout="horizontal">
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='customerOrder' label='Customer Order' >
                            <Select showSearch placeholder="Select Customer Order" optionFilterProp="children" allowClear >
                               
                            </Select>
                        </Form.Item>
                    </Col>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='itemGroup' label='Item Group'>
                            <Select showSearch placeholder="Select Item Group" optionFilterProp="children" allowClear>
                               
                            </Select>
                        </Form.Item>
                    </Col> */}
                  
                </Row>
            </Form>
            <>

        <Table
         size='small'
         rowClassName={(record,index)=>index % 2 === 0? 'table-row-light':'table-row-dark'}

        rowKey={record => record}
        className='custom-table-wrapper'
          columns={columnsSkelton}
        //   dataSource={ItemData}
        
         
           scroll={{x: 'max-content'}}
        //   onChange={onChange}
         />
         </>
      </Card>
   
  
     
      </Card> </>
      
  );
}


export default MOPReport
