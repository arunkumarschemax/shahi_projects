import { SearchOutlined } from "@ant-design/icons";
import { BuyersService, FabricTypeService, FabricWeaveService, M3ItemsService, StockService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Space, Table, Select, message, Descriptions, FormInstance } from "antd";
import { ColumnType, ColumnProps } from "antd/es/table";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import AlertMessages from "../common/common-functions/alert-messages";
import { useLocation, useNavigate } from "react-router-dom";

export interface StockDetailsInfoProps {
  data:any,
}

export const StockDetailsInfo = (props:StockDetailsInfoProps) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const columns: ColumnProps<any>[] = [
    {
      title: "S No",
      key: "sno",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    // {
    //   title: "M3 Style",
    //   dataIndex: "m3_style_code",
    //   ...getColumnSearchProps("m3_style_code"),
    //   // sorter: (a, b) => a.plant - b.plant,
    //   // sortDirections: ['descend', 'ascend'],
    // },
    

    {
      title: "Buyer",
      dataIndex: "buyer",
    //   ...getColumnSearchProps("buyer"),
      sorter: (a, b) => a.buyer.localeCompare(b.buyer),
      sortDirections: ["descend", "ascend"],
      
    },
    {
      title: "Material Type",
      dataIndex: "itemType",
    //   ...getColumnSearchProps("itemType"),
      sorter: (a, b) => a.itemType.localeCompare(b.itemType),
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "Item Code",
    //   dataIndex: "code",
    //   render: (text) => (
    //     <span>
    //       {text ? text : "Fab001"} {/* Display data if available, otherwise show "No Data" */}
    //     </span>
    //   ),
    //   ...getColumnSearchProps("item_code"),
    // },
    {
      title: "M3 Item",
      dataIndex: "m3Item",
    //   ...getColumnSearchProps("m3Item"),
      sorter: (a, b) => a.m3Item.localeCompare(b.m3Item),
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "Style",
    //   dataIndex: "style",
    //   ...getColumnSearchProps("style"),
    // },
    {
      title: "Location",
      dataIndex: "location",
    //   ...getColumnSearchProps("location"),

    },

    {
      title: "Quantity",
      dataIndex: "qty",
      render: (record) => (
        <span>
          {record.qty} + " " + {record.uom} 
        </span>
      ),
    //   ...getColumnSearchProps("qty"),
      // sorter: (a, b) => a.itemQuantity - b.itemQuantity,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title:`Action`,
      dataIndex: 'action',
      render: (text, rowData) => (
        <span>  
         <Button style={{backgroundColor:'#69c0ff'}} onClick={(e) => navigate('/reclassification')}><b>Assign Reclassification</b></Button>
        </span>
      )
    }
  ];
  
  return (
    <Card title="Reclassification" headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
        <Table
            className="custom-table-wrapper"
            dataSource={props?.data.length > 0 ? props?.data : undefined}
            columns={columns}
            size="small"
        />
        :""
    </Card>
  );
};
