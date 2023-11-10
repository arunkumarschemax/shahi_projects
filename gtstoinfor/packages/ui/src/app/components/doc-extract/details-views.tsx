import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Descriptions, Input, Space, Table, Tag } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { Column } from "rc-table";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ColumnType } from "antd/es/table";
import { ServiceFilterDto, StatusEnumDisplay } from "@xpparel/shared-models";
import { PricesService } from "@xpparel/shared-services";

export const ScanDetailView=()=> {

  const navigate = useNavigate();
  const rowData = useLocation();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const [totalAmount, setTotalAmount] = useState<number>();
  const [serviceCodeData, setServiceCodeData] = useState<any>([]);

  const searchInput = useRef(null);

  const service = new PricesService();
  useEffect(() => {
    if (rowData.state.rowData) {
      getServiceCode();
    }

  }, []);

  const getServiceCode = () => {
    const req = new ServiceFilterDto(
      rowData.state.rowData.Vendor,
      rowData.state.rowData.scanentity[0].HSN,
      rowData.state.rowData.scanentity[0].description
    );

    console.log(req, "4545");
    service
      .getServiceCode(req)
      .then((res) => {
        if (res.status) {
          setServiceCodeData(res.data);
          console.log(res.data, "filters");
        } else {
          setServiceCodeData([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  console.log(serviceCodeData, "1111122333");



  const handleBack = () => {
    navigate("/scan-document");
  };

  const handleSearch = (
    selectedKeys: any[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  console.log(rowData.state.rowData, "kkkkkkkkkkk");
  console.log(rowData.state.rowData.scanentity, "entity");
  console.log(rowData.state.rowData.scanentity[0].HSN, "hsn");
  console.log(rowData.state.rowData.scanentity[0].description, "description");

  const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters);
              setSearchedColumn(dataIndex);
              confirm({ closeDropdown: true });
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase())
        : false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // const columns: any = [
  //   {
  //     title: 'S.No',
  //     key: 'sno',
  //     responsive: ['sm'],
  //     render: (text, object, index) => (page - 1) * pageSize + (index + 1),
  //     align: "center"

  //   },
  //   {
  //     title: "HSN Code",
  //     dataIndex: "HSN",
  //     key: "HSN",
  //     ...getColumnSearchProps("HSN"),
  //     sorter: (a, b) => a.HSN.localeCompare(b.HSN),
  //     render: (_, record) =>
  //       record?.HSN || "-",
  //     align: "center"

  //   },
  //   {
  //     title: "Tax Type",
  //     dataIndex: "Taxtype",
  //     key: "Taxtype",
  //     ...getColumnSearchProps("Taxtype"),
  //     sorter: (a, b) => a.Taxtype.localeCompare(b.Taxtype),
  //     render: (_, record) =>
  //       record?.Taxtype || "-",
  //     align: "center"

  //   },
  //   {
  //     title: 'Tax Amount',
  //     dataIndex: 'Taxamount',
  //     key: "Taxamount",
  //     ...getColumnSearchProps("Taxamount"),
  //     sorter: (a, b) => a.Taxamount.localeCompare(b.Taxamount),
  //     render: (_, record) =>
  //       record?.Taxamount || "-",
  //     align: "right",
  //   },
  //   {
  //     title: 'Tax Percentage',
  //     dataIndex: 'Taxpercentage',
  //     key: 'Taxpercentage',
  //     ...getColumnSearchProps('Taxpercentage'),
  //     sorter: (a, b) => a.Taxpercentage.localeCompare(b.Taxpercentage),
  //     render: (_, record) => (record?.Taxpercentage || "-"),
  //     align: "right",
  //   },
  //   {
  //     title: 'Unit Quantity',
  //     dataIndex: 'unitquantity',
  //     key: "unitquantity",
  //     ...getColumnSearchProps("unitquantity"),
  //     sorter: (a, b) => a.unitquantity.localeCompare(b.unitquantity),
  //     render: (_, record) =>
  //       record?.unitquantity || "-",
  //       align: "right",
  //   },
  //   {
  //     title: 'Charge',
  //     dataIndex: 'Charge',
  //     key: 'Charge',
  //     align: "right",
  //     ...getColumnSearchProps('Charge'),
  //     sorter: (a, b) => a.Charge.localeCompare(b.Charge),
  //     render: (text, record) => {
  //       // Parse the "Charge" value as a number
  //       const chargeValue = Number(record.Charge);

  //       // Check if it's a valid number
  //       if (!isNaN(chargeValue)) {
  //         // Format the number to two decimal places
  //         const formattedCharge = chargeValue.toFixed(2);
  //         return <>{formattedCharge}</>;
  //       } else {
  //         // Display a hyphen for non-numeric values
  //         return "-";
  //       }
  //     },
  //   },

  //   {
  //     title: 'Quatation',
  //     dataIndex: 'quotation',
  //     key: "quotation",
  //     ...getColumnSearchProps("quotation"),
  //     sorter: (a, b) => a.quotation.localeCompare(b.quotation),
  //     render: (_, record) =>
  //       record?.quotation || "-",
  //     align: "center"

  //   },

  // ]

  const columns: any = [
    {
      title: "S.No",
      key: "sno",
      responsive: ["sm"],
      render: (text, object, index) => (page - 1) * pageSize + (index + 1),
    },
    {
      title: "HSN Code",
      dataIndex: "HSN",
      key: "HSN",
      ...getColumnSearchProps("HSN"),
      sorter: (a, b) => a.HSN.localeCompare(b.HSN),
      render: (_, record) => record?.HSN || "-",
    },
    {
      title: "Service Code",
      dataIndex: "seviceCode",
      key: "seviceCode",
      sorter: (a, b) => a.seviceCode.localeCompare(b.seviceCode),
      render: (text, record, index) => {
        return (
          <span>
            {serviceCodeData ? serviceCodeData[0]?.serviceCode : "-"}
          </span>
        );
      },
    },
    {
      title: "Service Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
      sorter: (a, b) => a.description.localeCompare(b.description),
      render: (text, record, index) => {
        return <span>{record.description ? record.description : "-"}</span>;
      },
    },
    {
      title: "Tax Type",
      dataIndex: "taxType",
      key: "taxType",
      align:"center",
      ...getColumnSearchProps("taxType"),
      sorter: (a, b) => a.taxType.localeCompare(b.taxType),
      render: (_, record) => record?.taxType || "-",
    },

    {
      title: "Tax Percentage",
      dataIndex: "taxPercentage",
      key: "taxPercentage",
      align:"right",
      ...getColumnSearchProps("taxPercentage"),
      sorter: (a, b) => a.taxPercentage.localeCompare(b.taxPercentage),
      // render: (_, record) => (record?.taxPercentage || "-"),
      render: (text, record) => {
        return <span>{record.taxPercentage ? record.taxPercentage : "-"}</span>;
      },
    },

    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      align:"right",
      ...getColumnSearchProps("unitPrice"),
      sorter: (a, b) => a.unitPrice.localeCompare(b.unitPrice),
      render: (text, record) => {
        return <span>{record.unitPrice ? record.unitPrice : "-"}</span>;
      },
    },

    {
      title: "Unit Quantity",
      dataIndex: "unitQuantity",
      key: "unitQuantity",
      align:"right",
      ...getColumnSearchProps("unitQuantity"),
      sorter: (a, b) => a.unitQuantity.localeCompare(b.unitQuantity),
      // render: (_, record) =>
      //   record?.unitQuantity || "-",
      render: (text, record) => {
        return <span>{record.unitQuantity ? record.unitQuantity : "-"}</span>;
      },
    },
    {
      title: "Subject Amount",
      dataIndex: "unitPrice",
      key: "unitPrice",
      align:"right",
      // ...getColumnSearchProps("SubjectAmount"),
      // sorter: (a, b) => a.SubjectAmount.localeCompare(b.SubjectAmount),
      render: (text, record) => {
        return (
          <span>
            {record.unitPrice
              ? (record.unitPrice * record.unitQuantity).toFixed(2)
              : "-"}
          </span>
        );
      },
    },
    {
      title: "Tax Amount",
      dataIndex: "taxAmount",
      key: "taxAmount",
      align:"right",
      ...getColumnSearchProps("taxAmount"),
      sorter: (a, b) => a.taxAmount.localeCompare(b.taxAmount),
      // render: (_, record) =>
      //   record?.taxAmount || "-",
      render: (text, record) => {
        return (
          <span>
            {record.taxAmount ? parseFloat(record.taxAmount).toFixed(2) : "-"}
          </span>
        );
      },
    },

    {
      title: "Total Amount",
      dataIndex: "unitPrice",
      key: "unitQuantity",
      align:"right",
      // ...getColumnSearchProps("unitquantity"),
      sorter: (a, b) => a.unitQuantity.localeCompare(b.unitQuantity),
      render: (text, record, index) => {
        return (
          <span>
            {record.unitPrice
              ? (
                Number(record.unitPrice * record.unitQuantity) +
                Number(record.taxAmount)
              ).toFixed(2)
              : "-"}
          </span>
        );
      },
    },
    {
      title: "Quotation",
      dataIndex: "quotation",
      key: "quotation",
      sorter: (a, b) => a.quotation.localeCompare(b.quotation),
      render: (text, record, index) => {
        return (
          <span>
            {record.quotation ? Number(record.quotation).toFixed(2) : "-"}
          </span>
        );
      },
    },

    {
      title: "Variance",
      dataIndex: "variance",
      key: "variance",
      sorter: (a, b) => a.variance.localeCompare(b.variance),
      render: (text, record, index) => {
        return <span>{record.variance ? record.variance : "-"}</span>;
      },
    },
  ];



  return (
    <Card
      className="card-header"
      title="Document Details"
      size="small"
      extra={
        <Button className="panel_button" onClick={handleBack}>
          View{" "}
        </Button>
      }
    >
      <Descriptions>
        <Descriptions.Item
          label="Vendor Name"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.venName ? rowData.state.rowData.venName : "--"}
        </Descriptions.Item>
        <Descriptions.Item
          label="GST NUMBER"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.gstNumber ? rowData.state.rowData.gstNumber : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="Invoice Date"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.invoiceDate
            ? rowData.state.rowData.invoiceDate
            : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="Invoice Number"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.invoiceNumber
            ? rowData.state.rowData.invoiceNumber
            : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="IGST"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.igst ? rowData.state.rowData.igst : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="CGST"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.cgst ? rowData.state.rowData.cgst : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="SGST"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.sgst ? rowData.state.rowData.sgst : "--"}
        </Descriptions.Item>

        {/* <Descriptions.Item
          label="Invoice Amount"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.invoiceAmount
            ? parseFloat(rowData.state.rowData.invoiceAmount).toFixed(2)
            : "--"}
        </Descriptions.Item> */}


        <Descriptions.Item
          label="Invoice Amount"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.invoiceAmount ? rowData.state.rowData.invoiceAmount : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="Invoice Currency"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.invoiceCurrency
            ? rowData.state.rowData.invoiceCurrency
            : "--"}
        </Descriptions.Item>

        <Descriptions.Item
          label="Financial year"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.financialYear
            ? rowData.state.rowData.financialYear
            : "--"}
        </Descriptions.Item>
        <Descriptions.Item
          label="Status"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          <Tag
            color={rowData.state.rowData.status === "No Variance" ? "green"
              : rowData.state.rowData.status === "Fully Variance" ? "red"
                : rowData.state.rowData.status === "Partially Variance" ? "blue"
                  : "default"}>
            {rowData.state.rowData.status ? rowData.state.rowData.status : "--"}
          </Tag>
        </Descriptions.Item>

      </Descriptions>

      <Card>
        <>
          <Table
            columns={columns}
            size="small"
            dataSource={rowData.state.rowData.scanentity}
            pagination={false}
            summary={(pageData) => {
              let totalCost: number = 0;
              let taxAmount: number = 0
              let Subjectamount: number = 0

              pageData.forEach(({ taxAmount }) => {
                if (Number(taxAmount)) {
                  taxAmount += Number(taxAmount)
                }
              })

              pageData.forEach((record) => {
                if (
                  Number(record.unitPrice) &&
                  Number(record.unitQuantity)
                ) {
                  Subjectamount +=
                    Number(record.unitPrice * record.unitQuantity)

                }
                {
                  taxAmount +=
                    Number(record.taxAmount)

                }
              });



              pageData.forEach((record) => {
                if (
                  Number(record.unitPrice) &&
                  Number(record.unitQuantity) &&
                  Number(record.taxAmount)
                ) {
                  totalCost +=
                    Number(record.unitPrice * record.unitQuantity) +
                    Number(record.taxAmount);
                  setTotalAmount(totalCost);
                }
              });

              return (
                <>
                  <Table.Summary.Row className="tableFooter">
                    <Table.Summary.Cell index={1} colSpan={3}>
                      <span></span>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={5}>
                      <span style={{ marginLeft: 350 }}>
                        <b>Total</b>
                      </span>
                      <b>
                        <span style={{ marginRight: 10 }}>
                          {" "}
                          ({rowData.state.rowData.invoiceCurrency}) :
                        </span>
                      </b>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={1}>
                      <span>
                        <b>{Number(Subjectamount).toFixed(2)}</b>
                      </span>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={1}>
                      <span>
                        <b>{Number(taxAmount).toFixed(2)}</b>
                      </span>
                    </Table.Summary.Cell>

                    <Table.Summary.Cell index={1} colSpan={1}>
                      <span style={{ textAlign: "end" }}>
                        <b>{Number(totalCost).toFixed(2)}</b>
                      </span>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </>
      </Card>
    </Card>
  );
}

export default ScanDetailView;
