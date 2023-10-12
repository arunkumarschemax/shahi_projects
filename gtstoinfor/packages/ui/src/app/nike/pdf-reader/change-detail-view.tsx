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


  useEffect(() => {
    getChangeCompare()
  }, [])

  const getChangeCompare = () => {
    const req = props.data
    service.getChangeComparision(req).then(res => {
      if (res.status)
        setPdfData(res.data)
      else
        setPdfData([])
    })
  }


  const CustomTitle = () => {

    return (
      <div>
        <Space size={"large"}>
          <span style={{ margin: 5 }}>Size Description</span><br /><br /><span> Size Quantity</span><br /><br /><span>Legal Po Qty</span><br />
          <br /><span>Difference in Quantity</span><br /><span>Gross/FOB Price</span><br /><br /><span>FOB Currency</span><br /><br />
          <span>Legal Po Price</span><br /><span>Legal Po Currency</span><br /><span>Difference in Price</span><br />
        </Space>
      </div>
    );
  };


  const childColumns1: any = [
    {
      dataIndex: 'sizeDescription',
      align: 'left'
    },
    {
      dataIndex: 'sizeQuantity',
      align: 'left'

    },
    {
      dataIndex: 'legalPoQty',
      align: 'left'

    },
    {
      dataIndex: 'quantityDifference',
      align: 'center',
      render: (text, record) => {
        const formattedAmount = record.priceDifferance ? parseFloat(record.quantityDifference).toFixed(2) : "-";

        if (Number(formattedAmount) > 0) {
          return <> <span style={{ color: 'green' }}>{formattedAmount}</span></>;

        }
        else if (Number(formattedAmount) < 0) {
          return <> <span style={{ color: 'red' }}>{formattedAmount}</span></>;

        }
        else (Number(formattedAmount) == 0)
        {
          return <> <span style={{ color: 'black' }}>{formattedAmount}</span></>;
        }
      }
    },
    {
      dataIndex: 'grossPriceFOB',
      align: 'left'

    },
    {
      dataIndex: 'FOBCurrencyCode',
      align: 'left'
    },
    {
      dataIndex: 'legalPoPrice',
      align: 'center'
    },
    {
      dataIndex: 'legalPoCurrency',
      align: 'right',
      render: (text, record) => {
        if (!text || text.trim() === '') {
          return '-';
        } else {
          return text;
        }
      },
    },
    {
      dataIndex: 'priceDifferance',
      align: 'right',
      render: (text, record) => {
        const formattedAmount = record.priceDifferance ? parseFloat(record.priceDifferance).toFixed(2) : "-";

        if (Number(formattedAmount) > 0) {
          return <> <span style={{ color: 'green' }}>{formattedAmount}</span></>;

        }
        else if (Number(formattedAmount) < 0) {
          return <> <span style={{ color: 'red' }}>{formattedAmount}</span></>;

        }
        else (Number(formattedAmount) == 0)
        {
          return <> <span style={{ color: 'black' }}>{formattedAmount}</span></>;

        }
      }

    },






  ]
  const columns: any = [
    {
      title: "S.No",
      key: "sno",
      // responsive: ["sm"],
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
      align: 'left',
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
          dataSource={pdfData}
          bordered
           className="table-header"
          pagination={false}
          scroll={{ x: 'max-content', y: 400 }}

        >
        </Table>

      </Card>
    </>
  )
}
export default ChangeComparision


