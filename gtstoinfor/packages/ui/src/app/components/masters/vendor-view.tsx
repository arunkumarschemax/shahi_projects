import { DownCircleOutlined, EditOutlined, EyeOutlined, FileSearchOutlined, SearchOutlined, UndoOutlined, UpCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Divider, Form, Input, Modal, Popover, Row, Select, Space, Table, Tag, Tooltip, message } from "antd"
import { ColumnProps } from "antd/es/table"
import { useEffect, useState, useRef } from "react";


import form from "antd/es/form";
import { ColumnType, FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import { VendorService } from "@project-management-system/shared-services";

const VendorGrid = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);
 
 
  let navigate = useNavigate();

  const externalRefNo = JSON.parse(localStorage.getItem('currentUser')).user.externalRefNo
  const role = JSON.parse(localStorage.getItem('currentUser')).user.roles


   

  useEffect(() => {
    fetchVendorData();
  }, []);


  const fetchVendorData = async () => {
    try {
      const vendorService = new VendorService();
      const response = await vendorService.getAllVendors();

      if (response.status) {
        setData(response.data);
        message.success(response.internalMessage);
      } else {
        message.error(response.internalMessage);
      }
    } catch (error) {
      console.error("Error fetching vendor data:", error);
      message.error("An error occurred while fetching vendor data: " + error.message);
    }
    
  };

  



  const columns: ColumnProps<any>[] = [
    {
      title: 'S.No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * pageSize + (index + 1)

    },
  
    {
      title: "Name ",
      dataIndex: "name",
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name.localeCompare(b.name)
      
   
    },
    {
      title: "Bussiness Name",
      dataIndex: "businessName",
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.businessName.localeCompare(b.businessName)
    }, 
   
    {
      title: "Business Contact Person",
      dataIndex: "businessContactPerson",
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.businessContactPerson.localeCompare(b.businessContactPerson)
     
    },
   
    {
      title: 'Contact',
      dataIndex: 'contact',
      render: (text) => (
        <a href={`tel:${text}`}>{text}</a>
      ),
      defaultSortOrder: 'descend',
      sorter: (a:any, b:any) => a.contact - b.contact
    },
   
    {
      title: 'Location',
      dataIndex: 'location',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.location.localeCompare(b.location)
    },
    {
      title: 'Type',
      dataIndex: 'type',
      
    },
   
      {
      title: 'Branches Count',
      dataIndex: 'branchesCount',
      defaultSortOrder: 'descend',
      align:'right',
        sorter: (a:any, b:any) => a.branchesCount - b.branchesCount
     
    }
   
   
  ]

  return (
    <Card className="card-header" title="Vendors" size="small">
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          className="custom-table-wrapper"
          pagination={{
            onChange(current, pageSize) {
              setPage(current);
              setPageSize(pageSize);
            },
          }}
          dataSource={data}
          size="small"
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>
    </Card>
  );
}
export default VendorGrid