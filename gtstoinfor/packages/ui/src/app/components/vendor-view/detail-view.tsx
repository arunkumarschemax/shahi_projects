import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { detailView } from "@project-management-system/shared-services";

export const VendorBranchInfoGrid = () => {
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const { id } = useParams();
  // console.log("Vendor ID:", id);

  let location = useLocation()

  //console.log(location.state.rowData,"jjjjjjjjjjjjjjjjj")

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

  return (
    <div>
      {loading ? (
        <p>Loading vendor details...</p>
      ) : (
        <>
          {vendorDetails.length > 0 ? (
            <>
              <Descriptions
                size="small"
                column={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2 }}
              >
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
                <Descriptions.Item
                  label="Description"
                  labelStyle={{ fontWeight: "bold", color: "black" }}
                >
                  {location.state.rowData.description}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions
                size="small"
                title={<span style={{ color: "blue", fontWeight: "bold" }}>Bank Details:</span>}
                column={3}
              >
                <Descriptions.Item
                  label="Bank Account Number"
                  labelStyle={{ color: "black", fontWeight: "bold" }}
                >
                  {location.state.rowData.bankAccountNumber}
                </Descriptions.Item>
                <Descriptions.Item
                  label="IFSC Code"
                  labelStyle={{ color: "black", fontWeight: "bold" }}
                >
                  {location.state.rowData.ifscCode}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Account holder Name"
                  labelStyle={{ color: "black", fontWeight: "bold" }}
                >
                  {location.state.rowData.accountHolderName}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Branch Name"
                  labelStyle={{ color: "black", fontWeight: "bold" }}
                >
                  {location.state.rowData.branchName}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Payment Terms"
                  labelStyle={{ color: "black", fontWeight: "bold" }}
                >
                  {location.state.rowData.paymentTerms}
                </Descriptions.Item>
              </Descriptions>
            </>
          ) : (
            <p>No vendor details available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default VendorBranchInfoGrid;
