// import {
//   ApartmentOutlined,
//   CarOutlined,
//   ExclamationCircleOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";
// import { SampleDevelopmentService } from "@project-management-system/shared-services";
// import {
//   Alert,
//   Button,
//   Card,
//   Col,
//   Descriptions,
//   Form,
//   Input,
//   Popover,
//   Row,
//   Select,
//   Space,
//   Table,
//   Tag,
// } from "antd";
// import { ColumnProps, ColumnType } from "antd/es/table";
// import { ColumnsType, FilterConfirmProps } from "antd/es/table/interface";
// import moment from "moment";
// import { useEffect, useRef, useState } from "react";
// import Highlighter from "react-highlight-words";
// import { useLocation, useNavigate, useParams } from "react-router-dom";

// export interface SampleRequestDetailViewProps {}

// export const SampleDetailedView = (props: SampleRequestDetailViewProps) => {
//   const [data1, setData1] = useState<any[]>([]);
//   const [data2, setData2] = useState<any[]>([]);
//   const [vendorDetails, setVendorDetails] = useState<any[]>([]);
//   const service = new SampleDevelopmentService();
//   const [page, setPage] = useState<number>(1);
//   const [pageSize, setPageSize] = useState<number>();
//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");
//   const searchInput = useRef<any>(null);
//   const [pageSize1, setPageSize1] = useState<number>();
//   const [expanded, setExpanded] = useState(false);
//   let navigate = useNavigate();
//   const { Option } = Select;
//   const { state } = useLocation();
//   const [vendorNames, setVendorNames] = useState<any[]>([]);

//   // const vendorId = localStorage.getItem('vendor_id')
//   let vendorId: number;

//   useEffect(() => {
//     if (state) {
//       getbranches(state.id);
//     }
//   }, [state]);

//   useEffect(() => {
//     getAllVendorNames();
//   }, []);

//   const getAllVendorNames = () => {
//     service.getVendorNamesForVendorDetails().then((res) => {
//       if (res.status) {
//         setVendorNames(res.data);
//       }
//     });
//   };

//   const getbranches = (id: any) => {
//     const req = new VendorIdRequest("", Number(id));
//     branchservice.getVendorById(req).then((res) => {
//       if (res.status) {
//         setVendorDetails(res.data);
//       }
//     });
//     branchservice.getVbsBranchByVendorId(req).then((res) => {
//       if (res.status) {
//         setData1(res.data);
//       }
//     });
//     branchservice.getVbsVehicleInfoByvbs(req).then((res) => {
//       if (res.status) {
//         setData2(res.data);
//       }
//     });
//   };

//   const maxLength = 50;
//   const handleToggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   // if (!vendorDetails || vendorDetails.length === 0 || !vendorDetails[0]) {
//   //   return null;   }
//   // const truncatedText = vendorDetails?.[0]?.description.slice(0, maxLength) + '...';
//   // const fullText = vendorDetails?.[0]?.description;
//   const description = vendorDetails?.[0]?.description;
//   const truncatedText = description
//     ? description.slice(0, maxLength) + "..."
//     : "";
//   const fullText = description || "";

//   const handleSearch = (
//     selectedKeys: string[],
//     confirm: (param?: FilterConfirmProps) => void,
//     dataIndex: string
//   ) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   const handleReset = (clearFilters: () => void) => {
//     clearFilters();
//     setSearchText("");
//   };
//   const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       close,
//     }) => (
//       <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() =>
//             handleSearch(selectedKeys as string[], confirm, dataIndex)
//           }
//           style={{ marginBottom: 8, display: "block" }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() =>
//               handleSearch(selectedKeys as string[], confirm, dataIndex)
//             }
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered: boolean) => (
//       <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex]
//         ? record[dataIndex]
//             .toString()
//             .toLowerCase()
//             .includes((value as string).toLowerCase())
//         : false,
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });
//   const columns: ColumnProps<any>[] = [
//     {
//       title: "S.No",
//       key: "sno",
//       width: 80,
//       responsive: ["sm"],
//       render: (text, object, index) => page - 1 + (index + 1),
//     },
//     // {
//     //   title: 'AGE',
//     //   dataIndex: 'attributeValue',
//     //   render: (text, record) => {
//     //     const attributeName = 'AGE';
//     //     const attribute = record.vbsBranchAttributes.find((attr:any) => attr.attributeName === attributeName);
//     //     if (attribute) {
//     //       return <span key={attribute.id}>{attribute.attributeValue}</span>;
//     //     }
//     //     return '-';
//     //   },
//     // },
//     {
//       title: "GST NO",
//       dataIndex: "attributeValue",
//       render: (text, record) => {
//         const attributeName = "GST NO";
//         const attribute = record.vbsBranchAttributes.find(
//           (attr: any) => attr.attributeName === attributeName
//         );
//         if (attribute) {
//           return <span key={attribute.id}>{attribute.attributeValue}</span>;
//         }
//         return "-";
//       },
//     },

//     {
//       title: "LICENSE NO",
//       dataIndex: "attributeValue",
//       render: (text, record) => {
//         const attributeName = "LICENSE NO";
//         const attribute = record.vbsBranchAttributes.find(
//           (attr: any) => attr.attributeName === attributeName
//         );
//         if (attribute) {
//           return <span key={attribute.id}>{attribute.attributeValue}</span>;
//         }
//         return "-";
//       },
//     },
//     {
//       title: "Branch",
//       dataIndex: "name",
//       // width: 130,
//       align: "left",
//       ...getColumnSearchProps("name"),
//     },
//     {
//       title: "Contact",
//       dataIndex: "contact",
//       // width: 130,
//       align: "left",
//       render: (text) => <a href={`tel:${text}`}>{text}</a>,
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       // width: 130,
//       align: "left",
//       ...getColumnSearchProps("email"),
//     },
//     {
//       title: "State",
//       dataIndex: "state",
//       align: "left",
//       // width: '5',
//       ...getColumnSearchProps("state"),
//     },
//     {
//       title: "City",
//       dataIndex: "city",
//       // width: 130,
//       align: "left",
//       ...getColumnSearchProps("city"),
//     },
//     {
//       title: "Area",
//       dataIndex: "area",
//       align: "left",
//       // width: 130,
//       ...getColumnSearchProps("area"),
//     },
//     {
//       title: "Vehicles Count",
//       dataIndex: "vehiclesCount",
//       render: (_, record) => {
//         return record.vehiclesCount ? record.vehiclesCount : "-";
//       },
//     },

//     // {
//     //     title: "Latitude",
//     //     dataIndex: "latitude",
//     //     width: 130,
//     //     align: 'left',

//     // },
//     // {
//     //     title: "Longitude",
//     //     dataIndex: "longitude",
//     //     width: 130,
//     //     align: 'left',

//     // },
//     {
//       title: "Zipcode",
//       dataIndex: "zipcode",
//       width: 130,
//       align: "left",
//       ...getColumnSearchProps("zipcode"),
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       fixed: "right",
//       render: (text, rowData, index) => (
//         <span>
//           <Button
//             type="primary"
//             onClick={() => {
//               onAddVehicle(rowData);
//             }}
//           >
//             Add Vehicle
//           </Button>
//         </span>
//       ),
//     },
//   ];
//   const childColumns: ColumnsType<any> = [
//     {
//       // title: 'Route',
//       dataIndex: "attributeName-attributeValue",
//       width: 250,
//       render: (_, record) => {
//         return (
//           <span>
//             {record.attributeName}-{record.attributeValue}
//           </span>
//         );
//       },
//     },
//   ];

//   const onAddBranch = () => {
//     navigate("/vendors-form", { state: { data: vendorDetails, key: "2" } });
//   };

//   const onAddVehicle = (rowData: any) => {
//     navigate("/vendors-form", { state: { data: rowData, key: "3" } });
//   };

//   const onVendorNameSearch = (val: any) => {
//     console.log(val, "-----------val");
//     setVendorDetails([]);
//     setData1([]);
//     setData2([]);
//     if (val != undefined) {
//       getbranches(val);
//     }
//   };

//   const Vehiclecolumns: ColumnProps<any>[] = [
//     {
//       title: "S.No",
//       key: "sno",
//       width: 80,
//       responsive: ["sm"],
//       render: (text, object, index) => page - 1 + (index + 1),
//     },
//     {
//       title: "Branch",
//       dataIndex: "branch",
//       ...getColumnSearchProps("vehicleType"),
//     },
//     {
//       title: "Vehicle Category",
//       dataIndex: "vehicleType",
//       ...getColumnSearchProps("vehicleType"),
//     },
//     {
//       title: "Vehicle Type",
//       dataIndex: "vehicleCategory",
//       ...getColumnSearchProps("vehicleCategory"),
//     },

//     {
//       title: "Vehicle Model",
//       dataIndex: "vehicleModel",
//       ...getColumnSearchProps("vehicleModel"),
//     },
//     {
//       title: "Vehicle Number ",
//       dataIndex: "vehicleNumber",
//       ...getColumnSearchProps("vehicleNumber"),
//     },
//     {
//       title: "Insurance Number",
//       dataIndex: "insuranceNumber",
//       width: 100,
//     },

//     {
//       title: "Permit",
//       dataIndex: "permit",
//     },
//     {
//       title: "C-Book Expiry",
//       dataIndex: "expiry",
//       render: (text, record) => {
//         return record.expiry ? moment(record.expiry).format("YYYY-MM-DD") : "-";
//       },
//     },
//     // {
//     //   title:'count',
//     //   dataIndex:'count'
//     // },
//     {
//       title: "Fuel Economy",
//       dataIndex: "attributeValue",
//       render: (text, record) => {
//         const attributeName = "Fuel Economy";
//         const attribute = record.vehicleAttributes.find(
//           (attr: any) => attr.attributeName === attributeName
//         );
//         if (attribute) {
//           return <span key={attribute.id}>{attribute.attributeValue}</span>;
//         }
//         return "-";
//       },
//     },

//     {
//       title: "Condition",
//       dataIndex: "attributeValue",
//       render: (text, record) => {
//         const attributeName = "Condition";
//         const attribute = record.vehicleAttributes.find(
//           (attr: any) => attr.attributeName === attributeName
//         );
//         if (attribute) {
//           return <span key={attribute.id}>{attribute.attributeValue}</span>;
//         }
//         return "-";
//       },
//     },
//   ];

//   return (
//     <>
//       {state == null ? (
//         <>
//           <Form>
//             <Row gutter={8}>
//               <Col
//                 xs={{ span: 24 }}
//                 sm={{ span: 24 }}
//                 md={{ span: 4 }}
//                 lg={{ span: 6 }}
//                 xl={{ span: 8 }}
//               >
//                 <Form.Item label="Vendor Name" name="vendorId">
//                   <Select
//                     showSearch
//                     allowClear
//                     optionFilterProp="children"
//                     placeholder="Select Vendor Name"
//                     onChange={onVendorNameSearch}
//                   >
//                     {vendorNames.map((e) => {
//                       return (
//                         <Option key={e.id} value={e.id}>
//                           {e.name}--{e.businessName}
//                         </Option>
//                       );
//                     })}
//                   </Select>
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Form>
//         </>
//       ) : (
//         <> </>
//       )}
//       {vendorDetails && vendorDetails.length > 0 ? (
//         <>
//           <Descriptions
//             size="small"
//             column={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2 }}
//           >
//             <Descriptions.Item
//               label="Vendor"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//             >
//               {vendorDetails?.[0]?.name}
//             </Descriptions.Item>
//             <Descriptions.Item
//               label="Business Name"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//               key={vendorDetails?.[0]?.id}
//             >
//               {vendorDetails?.[0]?.businessName}
//             </Descriptions.Item>
//             <Descriptions.Item
//               label="Business Short Name"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//               key={vendorDetails?.[0]?.id}
//             >
//               {vendorDetails?.[0]?.businessShortName}
//             </Descriptions.Item>
//             <Descriptions.Item
//               label="Business Contact Person"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//             >
//               {vendorDetails?.[0]?.businessContactPerson}
//             </Descriptions.Item>
//             <Descriptions.Item
//               label="Contact"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//               key={vendorDetails?.[0]?.id}
//             >
//               {vendorDetails?.[0]?.contact}
//             </Descriptions.Item>
//             <Descriptions.Item
//               label="Alternate Contact"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//             >
//               {vendorDetails?.[0]?.alternateContact}
//             </Descriptions.Item>
//             <Descriptions.Item
//               label="Email"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//             >
//               {vendorDetails?.[0]?.email}
//             </Descriptions.Item>
//             <Descriptions.Item
//               label="Location"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//             >
//               {vendorDetails?.[0]?.location}
//             </Descriptions.Item>
//             <Descriptions.Item
//               label="Nominate By"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//             >
//               {vendorDetails?.[0]?.nominatedBy}
//             </Descriptions.Item>
//             <Descriptions.Item
//               label="User Name"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//             >
//               {vendorDetails?.[0]?.userName}
//             </Descriptions.Item>
//             {/* <Descriptions.Item label='Type'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{vendorDetails?.[0]?.type}</Descriptions.Item> */}

//             <Descriptions.Item
//               label="Description"
//               labelStyle={{ fontWeight: "bold", color: "black" }}
//             >
//               <span>
//                 {expanded ? fullText : truncatedText}
//                 {fullText.length > maxLength && (
//                   <span
//                     onClick={handleToggleExpand}
//                     style={{
//                       cursor: "pointer",
//                       color: "blue",
//                       marginLeft: "4px",
//                     }}
//                   >
//                     {expanded ? "Read less" : "Read more"}
//                   </span>
//                 )}
//               </span>
//             </Descriptions.Item>
//           </Descriptions>
//           <Descriptions
//             size="small"
//             title={
//               <span style={{ color: "blue", fontWeight: "bold" }}>
//                 Bank Details:
//               </span>
//             }
//             column={3}
//           >
//             <Descriptions.Item
//               label="Bank Account Number"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//             >
//               {vendorDetails?.[0]?.bankAccountNumber}
//             </Descriptions.Item>
//             <Descriptions.Item
//               label="IFSC Code"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//             >
//               {vendorDetails?.[0]?.ifscCode}
//             </Descriptions.Item>
//             <Descriptions.Item
//               label="Account holder Name"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//             >
//               {vendorDetails?.[0]?.accountHolderName}
//             </Descriptions.Item>
//             <Descriptions.Item
//               label="Branch Name"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//             >
//               {vendorDetails?.[0]?.branchName}
//             </Descriptions.Item>
//             {/* <Descriptions.Item label="Payment Terms"labelStyle={{ color: "black", fontWeight: "bold" }}>{ PaymentTermsDisplay.find((item) => item.name === vendorDetails[0].paymentTerms)?.displayVal}</Descriptions.Item> */}
//             <Descriptions.Item
//               label="Payment Terms"
//               labelStyle={{ color: "black", fontWeight: "bold" }}
//               key={vendorDetails?.[0]?.id}
//             >
//               {
//                 PaymentTermsDisplay.find(
//                   (item) => item.name === vendorDetails[0].paymentTerms
//                 )?.displayVal
//               }
//             </Descriptions.Item>
//           </Descriptions>
//         </>
//       ) : (
//         <></>
//       )}

//       {data1 && data1.length > 0 ? (
//         <Card
//           size="small"
//           title={
//             <span>
//               <ApartmentOutlined />
//               Branches
//             </span>
//           }
//           headStyle={{ color: "blue" }}
//           extra={
//             <Button
//               type="primary"
//               onClick={() => {
//                 onAddBranch();
//               }}
//             >
//               Add Branch
//             </Button>
//           }
//         >
//           {" "}
//           <div style={{ overflowX: "auto" }}>
//             <Table
//               columns={columns}
//               dataSource={data1}
//               rowKey={(record) => record.id}
//               pagination={false}
//               scroll={{ x: "max-content" }}
//               bordered
//               size="small"
//               className="custom-table-wrapper"
//             />
//           </div>
//           {data2 && data2.length > 0 ? (
//             <Card
//               style={{ marginTop: 20 }}
//               title={
//                 <span>
//                   <CarOutlined />
//                   Vehicles
//                 </span>
//               }
//               headStyle={{ color: "blue" }}
//               size="small"
//             >
//               <div style={{ overflowX: "auto" }}>
//                 <Table
//                   rowKey={(record) => record.id}
//                   columns={Vehiclecolumns}
//                   dataSource={data2}
//                   size="small"
//                   bordered
//                   className="custom-table-wrapper"
//                   pagination={false}
//                   scroll={{ x: "max-content" }}
//                 />
//               </div>
//             </Card>
//           ) : (
//             <Alert
//               message="No vehicles are added"
//               type="info"
//               style={{ margin: "auto" }}
//               showIcon
//             />
//           )}
//         </Card>
//       ) : (
//         <>
//           <Row>
//             <Button
//               type="primary"
//               onClick={() => {
//                 onAddBranch();
//               }}
//             >
//               Add Branch
//             </Button>
//             <Alert
//               message="No Branches and vehicles are added"
//               type="info"
//               style={{ margin: "auto", width: 500 }}
//               showIcon
//             />
//           </Row>
//         </>
//       )}
//     </>
//   );
// };
// export default SampleDetailedView;
