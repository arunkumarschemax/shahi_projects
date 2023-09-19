import React, { useEffect, useState } from "react";
import { Button, Card, Descriptions, Table } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { detailView } from "@project-management-system/shared-services";
import { ColumnsType } from "antd/es/table";

export const VendorBranchInfoGrid = () => {
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  let location = useLocation();

  // console.log(location.state.rowData, "jjjjjjjjjjjjjjjjj");

  useEffect(() => {
    fetchVendorDetails();
  }, []);

  const fetchVendorDetails = async () => {
    try {
      const detailViews = new detailView();
      const vendorDetailsData = await detailViews.getdetailview();

      if (vendorDetailsData && vendorDetailsData.data.length > 0) {
        //console.log("Vendor Details Data:", vendorDetailsData.data);

        setVendorDetails(vendorDetailsData.data);
        setLoading(false);
      } else {
        console.error("Empty response or invalid data received.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching vendor details:", error);
      setLoading(false);
    }
  };

  const columns: ColumnsType<any> = [
    // {
    //   title: "S.No",
    //   key: "sno",
    //   render: (text, record, index) => (page - 1) * pageSize + (index + 1),
    // },
    {
      title: "Bank Name",
      dataIndex: "bankName",
    },

    {
      title: "Account Holder Name",
      dataIndex: "accountHolderName",
    },
    {
      title: "Bank Account Number",
      dataIndex: "bankAccountNumber",
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
    },
    {
      title: "IFSC Code",
      dataIndex: "ifscCode",
    },
  ];

  const handleBack =() =>{
    navigate('/vendors')
  }

  const rowData = [location.state.rowData];

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
          {location.state.rowData.contact}
        </Descriptions.Item>

        <Descriptions.Item
          label="Alternate Contact"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {location.state.rowData.alternateContact}
        </Descriptions.Item>

        <Descriptions.Item
          label="Email"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {location.state.rowData.email}
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
      <br></br>
      <Descriptions
        size="small"
        title={<span style={{ fontWeight: "bold" }}>Bank Details:</span>}
        column={3}
      ></Descriptions>
      <Table
        pagination={false}
        columns={columns}
        dataSource={rowData}
        size="small"
      />
    </Card>
  );
};

export default VendorBranchInfoGrid;
