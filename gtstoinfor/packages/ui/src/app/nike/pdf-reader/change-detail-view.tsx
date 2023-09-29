import { Button, Card, Col, Form, Input, Modal, Row, Select, Space, Table, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { NikeService } from "@project-management-system/shared-services";
import React from "react";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import PoPdfTable from "./po-pdf-table";
import moment from "moment";
import { ChangeDetails } from "@project-management-system/shared-models";

export interface Props {
    data: ChangeDetails
}
const ChangeComparision = (props: Props) => {
 

    const service = new NikeService();
    const navigate = useNavigate();
    const searchInput = useRef(null);
    const [pdfData, setPdfData] = useState<any>([]);
    const [poLine, setPoLine] = useState<any>([]);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [form] = Form.useForm();
    const { Option } = Select;


    useEffect(()=> {
        getChangeCompare()
      
    },[])
    const getChangeCompare = () => {
        service.getPdfFileInfo().then(res => {
            setPdfData(res.data)
        })
    }

   const data = [
    {
      "purchaseOrderNumber": "3503450800",
      "poAndLine": "3503450800-10",
      "sizeWiseData": [
        {
          "purchaseOrderNumber": "3503450800",
          "poAndLine": "3503450800-10",
          "id": 16,
          "sizeDescription": " M",
          "sizeQuantity": 652,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        },
        {
            "purchaseOrderNumber": "3503450800",
            "poAndLine": "3503450800-10",
            "id": 16,
            "sizeDescription": "XL",
            "sizeQuantity": 3,
            "grossPriceFOB": "5.01",
            "FOBCurrencyCode": "USD",
            "legalPoPrice": 5.16,
            "legalPoCurrency": "USD"
          },
          {
            "purchaseOrderNumber": "3503450800",
            "poAndLine": "3503450800-10",
            "id": 16,
            "sizeDescription": "2XL",
            "sizeQuantity": 494,
            "grossPriceFOB": "5.01",
            "FOBCurrencyCode": "USD",
            "legalPoPrice": 5.16,
            "legalPoCurrency": "USD"
          }
      ]},
       {"purchaseOrderNumber": "3503450800",
      "poAndLine": "3503450800-20",
      "sizeWiseData": [
        {
          "purchaseOrderNumber": "3503450800",
          "poAndLine": "3503450800-20",
          "id": 16,
          "sizeDescription": " M",
          "sizeQuantity": 652,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        },
        {
            "purchaseOrderNumber": "3503450800",
            "poAndLine": "3503450800-20",
            "id": 16,
            "sizeDescription": "XL",
            "sizeQuantity": 3,
            "grossPriceFOB": "5.01",
            "FOBCurrencyCode": "USD",
            "legalPoPrice": 5.16,
            "legalPoCurrency": "USD"
          },
          {
            "purchaseOrderNumber": "3503450800",
            "poAndLine": "3503450800-20",
            "id": 16,
            "sizeDescription": "2XL",
            "sizeQuantity": 494,
            "grossPriceFOB": "5.01",
            "FOBCurrencyCode": "USD",
            "legalPoPrice": 5.16,
            "legalPoCurrency": "USD"
          }
      ]
    }
     
  ]

  const CustomTitle = () => {
           
    return (
      <div>
      <Space size={"large"}>
       <span style={{margin:10}}>sizeDescription</span><br/><span><span></span><span></span> legal po qty</span><br/>
       <span>grossPriceFOB</span><br/><span>FOBCurrencyCode</span><br/>
        <span>legalPoPrice</span><br/><span>legalPoCurrency</span><br/>
 
  </Space>
      
      </div>
    );
  };


  const childColumns1: any = [
    {
        // title: 'Size Description ',
        dataIndex: 'sizeDescription',
        align :'right'
      },
   { 
     dataIndex: 'sizeQuantity',
     align :'center'

    },
       { 
         dataIndex: 'grossPriceFOB',
         align :'center'

            },
        { 
             dataIndex: 'FOBCurrencyCode',
             align :'center'

            },
            { 
                 dataIndex: 'legalPoPrice',
             },
             { 
                 dataIndex: 'legalPoCurrency',
             },


]
    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            responsive: ["sm"],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            fixed: 'left'
        },
        // {
        //     title: 'PO Number',
        //     dataIndex: 'purchaseOrderNumber',
        //     fixed: 'left',
        // },
        {
            title: 'Po And Line ',
            dataIndex: 'poAndLine',
            fixed: 'left',
        },
        {
            title: <CustomTitle />,
            dataIndex: "sizeWiseData", 
            align: 'center',
            render: (text: any, record: any) => (
              <Table
                dataSource={record.sizeWiseData} 
                columns={childColumns1}
                pagination={false}
                rowKey={(record) => record.sizeDescription}
              />
            ),
          },
     
          
    ]
    
    return (
        <>
        <Card title="Change Comparision" headStyle={{ fontWeight: 'bold' }}>
        
        <Table
            columns={columns}
            dataSource={data}
            bordered
            className="custom-table-wrapper"
            pagination={{
                onChange(current, pageSize) {
                    setPage(current);
                    setPageSize(pageSize);
                },
            }}
        >
        </Table>
       
        </Card>
        </>
    )
}
export default ChangeComparision


