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

//    const data = [
//     {
//       "purchaseOrderNumber": "3503450800",
//       "poAndLine": "3503450800-10",
//       "sizeWiseData": [
//         {
//           "purchaseOrderNumber": "3503450800",
//           "poAndLine": "3503450800-10",
//           "id": 16,
//           "sizeDescription": " M",
//           "sizeQuantity": 652,
//           "grossPriceFOB": "5.01",
//           "FOBCurrencyCode": "USD",
//           "legalPoPrice": 5.16,
//           "legalPoCurrency": "USD"
//         },
//         {
//             "purchaseOrderNumber": "3503450800",
//             "poAndLine": "3503450800-10",
//             "id": 16,
//             "sizeDescription": "XL",
//             "sizeQuantity": 3,
//             "grossPriceFOB": "5.01",
//             "FOBCurrencyCode": "USD",
//             "legalPoPrice": 5.16,
//             "legalPoCurrency": "USD"
//           },
//           {
//             "purchaseOrderNumber": "3503450800",
//             "poAndLine": "3503450800-10",
//             "id": 16,
//             "sizeDescription": "2XL",
//             "sizeQuantity": 494,
//             "grossPriceFOB": "5.01",
//             "FOBCurrencyCode": "USD",
//             "legalPoPrice": 5.16,
//             "legalPoCurrency": "USD"
//           }
//       ]},
//        {"purchaseOrderNumber": "3503450800",
//       "poAndLine": "3503450800-20",
//       "sizeWiseData": [
//         {
//           "purchaseOrderNumber": "3503450800",
//           "poAndLine": "3503450800-20",
//           "id": 16,
//           "sizeDescription": " M",
//           "sizeQuantity": 652,
//           "grossPriceFOB": "5.01",
//           "FOBCurrencyCode": "USD",
//           "legalPoPrice": 5.16,
//           "legalPoCurrency": "USD"
//         },
//         {
//             "purchaseOrderNumber": "3503450800",
//             "poAndLine": "3503450800-20",
//             "id": 16,
//             "sizeDescription": "XL",
//             "sizeQuantity": 3,
//             "grossPriceFOB": "5.01",
//             "FOBCurrencyCode": "USD",
//             "legalPoPrice": 5.16,
//             "legalPoCurrency": "USD"
//           },
//           {
//             "purchaseOrderNumber": "3503450800",
//             "poAndLine": "3503450800-20",
//             "id": 16,
//             "sizeDescription": "2XL",
//             "sizeQuantity": 494,
//             "grossPriceFOB": "5.01",
//             "FOBCurrencyCode": "USD",
//             "legalPoPrice": 5.16,
//             "legalPoCurrency": "USD"
//           }
//       ]
//     }
     
//   ]
const data = [
    {
      "poAndLine": "3503355416-10",
      "sizeWiseData": [
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-10",
          "id": 1,
          "sizeDescription": "2XL",
          "sizeQuantity": 494,
          "legalPoQty": 494,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-10",
          "id": 2,
          "sizeDescription": "3XL",
          "sizeQuantity": 6,
          "legalPoQty": 6,
          "grossPriceFOB": "5.51",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.66,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-10",
          "id": 3,
          "sizeDescription": "4XL",
          "sizeQuantity": 3,
          "legalPoQty": 3,
          "grossPriceFOB": "5.51",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.66,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-10",
          "id": 4,
          "sizeDescription": "L",
          "sizeQuantity": 828,
          "legalPoQty": 828,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-10",
          "id": 5,
          "sizeDescription": "M",
          "sizeQuantity": 652,
          "legalPoQty": 652,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-10",
          "id": 6,
          "sizeDescription": "S",
          "sizeQuantity": 256,
          "legalPoQty": 256,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-10",
          "id": 7,
          "sizeDescription": "XL",
          "sizeQuantity": 736,
          "legalPoQty": 736,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-10",
          "id": 8,
          "sizeDescription": "XS",
          "sizeQuantity": 3,
          "legalPoQty": 3,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        }
      ]
    },
    {
      "poAndLine": "3503355416-20",
      "sizeWiseData": [
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-20",
          "id": 9,
          "sizeDescription": "2XL",
          "sizeQuantity": 499,
          "legalPoQty": 499,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-20",
          "id": 10,
          "sizeDescription": "3XL",
          "sizeQuantity": 6,
          "legalPoQty": 6,
          "grossPriceFOB": "5.51",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.66,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-20",
          "id": 11,
          "sizeDescription": "4XL",
          "sizeQuantity": 3,
          "legalPoQty": 3,
          "grossPriceFOB": "5.51",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.66,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-20",
          "id": 12,
          "sizeDescription": "L",
          "sizeQuantity": 836,
          "legalPoQty": 836,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-20",
          "id": 13,
          "sizeDescription": "M",
          "sizeQuantity": 658,
          "legalPoQty": 658,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-20",
          "id": 14,
          "sizeDescription": "S",
          "sizeQuantity": 258,
          "legalPoQty": 258,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-20",
          "id": 15,
          "sizeDescription": "XL",
          "sizeQuantity": 742,
          "legalPoQty": 742,
          "grossPriceFOB": "5.01",
          "FOBCurrencyCode": "USD",
          "legalPoPrice": 5.16,
          "legalPoCurrency": "USD"
        },
        {
          "purchaseOrderNumber": "3503355416",
          "poAndLine": "3503355416-20",
          "id": 16,
          "sizeDescription": "XS",
          "sizeQuantity": 3,
          "legalPoQty": 3,
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


