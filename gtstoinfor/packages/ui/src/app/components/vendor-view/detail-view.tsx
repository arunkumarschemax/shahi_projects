import React, { useEffect, useState } from "react";
import { Button, Card, Descriptions, Table } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { detailView } from "@xpparel/shared-services";
import { ApartmentOutlined } from "@ant-design/icons";

// Separate function for fetching branch view
const getBranchViewData = async (vendorId: number) => {
  try {
    const detailViews = new detailView();

    const branchViewData = await detailViews.getbranchview({ vendorId: vendorId });
    return branchViewData.data || [];
  } catch (error) {
    console.error("Error fetching branch view data:", error);
    return [];
  }
};



const VendorBranchInfoGrid = () => {
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();



  useEffect(() => {
    if (location.state.rowData) {
      console.log(location.state.rowData.id)
      fetchVendorDetails(location.state.rowData.id)
    }
  }
    , [])
  const fetchVendorDetails = async (vendorId: number) => {
    try {
      const branchData = await getBranchViewData(vendorId);
      if (branchData.length > 0) {
        setVendorDetails(branchData);
        setLoading(false);
      } else {
        console.error("Empty response or invalid branch data received.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching vendor details:", error);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/vendors');
  };

  const columns: ColumnsType<any> = [
    {
      title: "S.No",
      key: "sno",
      width: 80,
      responsive: ["sm"],
      render: (text, object, index) => index + 1,
    },

    {
      title: 'GST NO',
      dataIndex: 'attributeValue',
      render: (text, record) => {
        const attributeName = 'GST NO';
        const attribute = record.vbsBranchAttributes.find((attr: any) => attr.attributeName === attributeName);
        if (attribute) {
          return <span key={attribute.id}>{attribute.attributeValue}</span>;
        }
        return '-';
      },
    },

    // {
    //   title: 'LICENSE NO',
    //   dataIndex: 'attributeValue',
    //   render: (text, record) => {
    //     const attributeName = 'LICENSE NO';
    //     const attribute = record.vbsBranchAttributes.find((attr:any) => attr.attributeName === attributeName);
    //     if (attribute) {
    //       return <span key={attribute.id}>{attribute.attributeValue}</span>;
    //     }
    //     return '-';
    //   },
    // },

    {
      title: "Branch",
      dataIndex: "name",
      align: "left",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      align: "left",
      render: (text) => <a href={`tel:${text}`}>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "left",
      render: (text) => (
        <a href={`mailto:${text}`}>
          {text}
        </a>
      ),
    },
    {
      title: "State",
      dataIndex: "state",
      align: "left",
    },
    {
      title: "City",
      dataIndex: "city",
      align: "left",
    },
    {
      title: "Area",
      dataIndex: "area",
      align: "left",
    },
    // {
    //   title: "Vehicles Count",
    //   dataIndex: "vehiclesCount",
    //   render: (text) => (text ? text : "-"),
    // },
    {
      title: "Zipcode",
      dataIndex: "zipcode",
      width: 130,
      align: "left",
    },
  ];

  return (
    <Card title="Vendor Info" size="small" className="card-header" extra={<Button className='panel_button' onClick={handleBack}>View </Button>}>
      <Descriptions>
        <Descriptions.Item
          label="Business Name"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {location.state.rowData.businessName}
        </Descriptions.Item>
        <Descriptions.Item
          label="Business Short Name"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {location.state.rowData.businessShortName}
        </Descriptions.Item>
        <Descriptions.Item
          label="Business Contact Person"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {location.state.rowData.businessContactPerson}
        </Descriptions.Item>
        <Descriptions.Item
          label="Contact"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          <a href={`tel:${location.state.rowData.contact}`}>
            {location.state.rowData.contact}
          </a>
        </Descriptions.Item>
        <Descriptions.Item
          label="Alternate Contact"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          <a href={`tel:${location.state.rowData.alternateContact}`}>
            {location.state.rowData.alternateContact}
          </a>
        </Descriptions.Item>
        <Descriptions.Item
          label="Email"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          <a href={`mailto:${location.state.rowData.email}`}>
            {location.state.rowData.email}
          </a>
        </Descriptions.Item>

        <Descriptions.Item
          label="Location"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {location.state.rowData.location}
        </Descriptions.Item>
        <Descriptions.Item
          label="Nominate By"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {location.state.rowData.nominatedBy}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Descriptions size="small" title={<span style={{ fontWeight: "bold" }}>Bank Details:</span>} column={3}>
        <Descriptions.Item
          label="Bank Name"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {location.state.rowData.bankName}
          
        </Descriptions.Item>
        <Descriptions.Item
          label="Account Holder Name"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {location.state.rowData.accountHolderName}
        </Descriptions.Item>
        <Descriptions.Item
          label="Bank Account Number"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {location.state.rowData.bankAccountNumber}
        </Descriptions.Item>
        <Descriptions.Item
          label="Branch Name"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {location.state.rowData.branchName}
        </Descriptions.Item>
        <Descriptions.Item
          label="IFSC Code"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {location.state.rowData.ifscCode}
        </Descriptions.Item>
      </Descriptions>
      <br />
      { vendorDetails.length > 0 ? (
        <Card style={{ textAlign: "center" }} size="small" title={<span><ApartmentOutlined />Branches</span>} >
        <Table
          pagination={false}
          columns={columns}
          dataSource={vendorDetails}
          size="small"
        />
      </Card>
     ):"" }
    </Card>
  );
};

export default VendorBranchInfoGrid;
