/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import {
  Select,
  Spin,
  message,
  Button,
  Input,
  Row,
  Form,
  Col,
  Typography,
  UploadProps,
  Upload,
  Radio,
  Table,
  Divider,
  Popconfirm,
  DatePicker,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Tesseract from "tesseract.js";
import { pdfjs } from 'react-pdf';
// import { useNavigate, useLocation } from "react-router-dom";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import DocExtractForm from "./doc-extract-form";
// import DocumentForm from "./document-form";
// import DocumentItemForm from "./document-item-form";
import Card from "antd/es/card/Card";
import { CalendarOutlined, UploadOutlined } from "@ant-design/icons";
import {
  BuyersService,
  SharedService,
  VendorService,
} from "@project-management-system/shared-services";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AllScanDto } from "packages/libs/shared-models/src/shared-model/scan.dto";
import { useNavigate } from "react-router-dom";
// const { Title, Text } = Typography;
const { Option } = Select;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


// export interface UploadDocumentFormProps { }

export function UploadDocumentForm() {
  const [GstForm] = Form.useForm();
  const [itemform] = Form.useForm();
  const [uploadForm] = Form.useForm();
  const [submitVisible, setSubmitVisible] = useState<boolean>(false);
  const [file, setFile] = useState<any | null>(null);

  const [pdfData, setPdfData] = useState(null);
  const [jsonData, setJsonData] = useState(null);



  const navigate = useNavigate();
  const service = new SharedService();
  const [extractedData, setExtractedData] = useState<any>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [buttonText, setButtonText] = useState("Add");
  const [formed, setFormed] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [HSN, setHSN] = useState("");
  const [description, setDescription] = useState("");
  const [Taxtype, setTaxtype] = useState("");
  const [Taxamount, setTaxamount] = useState("");
  const [Taxpercentage, setTaxPercentage] = useState("");
  const [Charge, setCharge] = useState("");
  // const [unitprice, setUnitprice] = useState("");
  const [variance, setVariance] = useState("");
  const [unitquantity, setUnitquantity] = useState("");
  const [Unitprice, setUnitprice] = useState("");

  const [quotation, setQuotation] = useState("");
  const [status, setStatus] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomFactor, setZoomFactor] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);


  const [buttonClicked, setButtonClicked] = useState(false);

  const [showCancelButton, setShowCancelButton] = useState(false);
  const [extractionCompleted, setExtractionCompleted] = useState(false);

  interface Item {
    HSN: string;
    description: string;
    Taxtype: string;
    Taxamount: string;
    Charge: string;
    variance: string;
    Unitprice: string;
  }

  const [imageURL, setImageURL] = useState<string | null>(null);
  const [gstNumbers, setGstNumbers] = useState("");
  const [ifscCodes, setIfscCodes] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [Innvoicenum, setInnvoicenum] = useState("");
  const [Cgst, setCgst] = useState("");
  const [Igst, setIgst] = useState("");
  const [Sgst, setSgst] = useState("");
  const [Innvoiceamount, setInnvoiceamount] = useState("");
  const [vendor, setVendor] = useState("");
  const [buyerName, setBuyer] = useState("");
  const [routing, setRouting] = useState("");
  const [comment, setComment] = useState("");
  const [financialyear, setFinancialyear] = useState("");
  const [timecreated, setTimecreated] = useState("");
  const [consoles, setConsoles] = useState("");
  const [cartons, setCartons] = useState("");
  const [po, setPO] = useState("");
  const [dt, setDt] = useState("");
  const [Innvoicecurrency, setInnvoicecurrency] = useState("");

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const [data1, setData1] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>([]);

  const servicess = new VendorService();

  const buyerss = new BuyersService();

  useEffect(() => {
    getdata1();
  }, []);


  const getdata1 = () => {
    servicess
      .getAllVendors()
      .then((res) => {
        if (res.status) {
          setData1(res.data);
        } else {
          setData1([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getdata2();
  }, []);

  const getdata2 = () => {
    buyerss
      .getAllBuyersInfo()
      .then((res) => {
        if (res.status) {
          setData2(res.data);
        } else {
          setData2([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartX;
      const deltaY = e.clientY - dragStartY;
      const newTranslateX = deltaX;
      const newTranslateY = deltaY;
      const image = document.getElementById("imageToDrag");
      if (image) {
        image.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px) scale(${zoomFactor})`;
      }
    }
  };
  const handleTimecreatedChange = (date) => {
    const formattedDate = date ? date.format("YYYY-MM-DD HH:mm:ss") : null;
    setTimecreated(formattedDate);
    setIsDatePickerVisible(false);
  };
  const handleInputChange = (e) => {
    setTimecreated(e.target.value);
  };

  const extractGstNumbers = (text) => {
    const gstNumberRegex =
      /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g;
    const matches = text.match(gstNumberRegex);

    // Return the first match if it exists, otherwise return an empty string
    const extractedGstNumber = matches ? matches[0] : "";

    setGstNumbers(extractedGstNumber); // Set the extracted GST number
    return extractedGstNumber;
  };

  // const extractIgst = (text) => {
  //   const IgstRegex = /(\d,\d{3}\.\d{2})/g;
  //   const match = text.match(IgstRegex);
  //   const extractedIgst = match ? match[0] : "";
  //   return extractedIgst;
  // };

  const extractInnvoiceamount = (text) => {
    const InnvoiceamountRegex = /(\d{1,3}(?:,\d{3})*\.\d{2})/g;
    const match = text.match(InnvoiceamountRegex);
    const extractedInvoiceamount = match ? match[0] : "";
    return extractedInvoiceamount;
  };
  const extractCgst = (text) => {
    const CgstRegex = /^\d+\.\d{2}$/;
    const match = text.match(CgstRegex);
    const extractedCgst = match ? match[0] : "0.00";
    return extractedCgst;
  };

  const extractSgst = (text) => {
    const SgstRegex = /^\d+\.\d{2}$/;
    const match = text.match(SgstRegex);
    const extractedSgst = match ? match[0] : "0.00";
    return extractedSgst;
  };

  const extractVendor = (text) => {
    const vendorregex = /EXPO\sFREIGHT\sPVT\sLTD/i;
    const matches = text.match(vendorregex);
    const extractedvendor = matches || [];
    setIfscCodes(extractedvendor);
    console.log(extractedvendor)
    return extractedvendor;
  };

  // const extractInvoiceDate = (text) => {
  //   const invoiceDateRegex =
  //     /\b(?:\d{1,2}-[A-Za-z]{3}-\d{2}|\d{4} [A-Za-z]{3} \d{1,2})\b/g;
  //   const match = text.match(invoiceDateRegex);

  //   if (match) {
  //     const extractedDate = match[0];
  //     const parts = extractedDate.split(/-| /);

  //     if (parts.length === 3) {
  //       const day = parts[0];
  //       const month = getMonthNumber(parts[1]);
  //       const year = formatYear(parts[2]);

  //       return `${year}-${month}-${day}`;
  //     }
  //   }

  //   return "";
  // };

  // const getMonthNumber = (monthStr) => {
  //   const monthNames = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  //   return String(monthNames.indexOf(monthStr) + 1).padStart(2, "0");
  // };

  // const formatYear = (yearStr) => {
  //   if (yearStr.length === 2) {
  //     return `20${yearStr}`;
  //   } else {
  //     return yearStr;
  //   }
  // };
  // const textWithDate = "Invoice Date: 21-Sep-08";
  // const formattedDate = extractInvoiceDate(textWithDate);
  // console.log("Formatted Date:", formattedDate);

  const extractInnvoicecurrency = (text) => {
    const InvoicecuurencyRegex = /(INR|DOLLARS|DINARS)/g;
    const match = text.match(InvoicecuurencyRegex);
    const extractedInnvoicecurrency = match ? match[0] : "";
    return extractedInnvoicecurrency;
  };

  const extractInnvoiceNum = (text) => {
    const InnvoicenumRegex = /EFL-MAA-\d+/g;
    const match = text.match(InnvoicenumRegex);
    const extractedInnvoicenum = match ? match[0].trim() : "";
    return extractedInnvoicenum;
  };

  const extractFinancialyear = (text) => {
    const FinancialyearRegex = /\b\d{4}-\d{4}\b/g;
    const match = text.match(FinancialyearRegex);
    const extractedFinancialyear = match ? match[0].trim() : "";
    return extractedFinancialyear;
  };

  const getCurrentFinancialYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isAprilOrLater = currentDate.getMonth() >= 3;
    const startYear = isAprilOrLater ? currentYear : currentYear - 1;
    const endYear = startYear + 1;
    return `${startYear}-${endYear}`;
  };

  const handleDateChange = (date) => {
    setInvoiceDate(date);
  };


  const handleAddToTable = () => {
    if (
      !HSN &&
      !Taxtype &&
      !Taxamount &&
      !Taxpercentage &&
      !Charge &&
      !variance &&
      !unitquantity &&
      !quotation
    ) {
      return;
    }

    const newItem = {
      HSN,
      description,
      Taxtype,
      Taxamount,
      Charge,
      Taxpercentage,
      unitquantity,
      quotation,
      variance,
      Unitprice,
    };

    const ChargeFloat = parseFloat(Charge) || 0;
    const QuotationFloat = parseFloat(quotation) || 0;
    newItem.Unitprice = (QuotationFloat - ChargeFloat).toFixed(2);

    if (isEditing) {
      const updatedTableData = extractedData.map((item) =>
        item === editingItem ? { ...newItem } : item
      );
      setExtractedData(updatedTableData);
      setIsEditing(false);
      setEditingItem(null);
      setButtonText('Add');
    } else {
      setExtractedData([...extractedData, newItem]);
    }
    setHSN("");
    setDescription("");
    setTaxtype("");
    setTaxamount("");
    setCharge("");
    setTaxPercentage("");
    setVariance("");
    setUnitquantity("");
    setQuotation("");
  };

  // const handleEdit = (item) => {
  //   setHSN(item.HSN);
  //   setDescription(item.description);
  //   setTaxtype(item.Taxtype);
  //   setTaxamount(item.Taxamount);
  //   setTaxPercentage(item.Taxpercentage);
  //   let editedCharge = "";
  //   if (item.Taxamount !== null && item.Taxpercentage !== null) {
  //     const Taxpercentage = item.Taxpercentage;
  //     const Taxamount = item.Taxamount;
  //     const equivalentFor100Percent = (Taxamount * 100) / Taxpercentage;
  //     editedCharge = `${equivalentFor100Percent.toFixed(2)}`;
  //   } else if (item.Taxamount !== null) {
  //     editedCharge = `${item.Taxamount}`;
  //   }
  //   setCharge(editedCharge);
  //   setVariance(item.unitprice);
  //   setUnitquantity(item.unitquantity);
  //   setQuotation(item.quotation);

  //   setIsEditing(true);
  //   setEditingItem(item);
  //   setButtonText("Update");
  // };

  const handleEdit = (item) => {
    setHSN(item.HSN || "0");
    setDescription(item.description || "");
    setTaxtype(item.Taxtype || "0");
    setTaxamount(item.Taxamount || "0");
    // setCharge(item.Charge || "0");
    // setTaxPercentage(item.Taxpercentage || "0");
    setTaxPercentage(item.Taxpercentage || "0");
    let editedCharge = "";
    if (item.Taxamount !== null && item.Taxpercentage !== null) {
      const Taxpercentage = item.Taxpercentage;
      const Taxamount = item.Taxamount;
      const equivalentFor100Percent = (Taxamount * 100) / Taxpercentage;
      editedCharge = `${equivalentFor100Percent.toFixed(2)}`;
    } else if (item.Taxamount !== null) {
      editedCharge = `${item.Taxamount}`;
    }
    setCharge(editedCharge || "0");
    setVariance(item.unitprice || "0");
    setUnitquantity(item.unitquantity || "0");
    setQuotation(item.quotation || "0");

    setIsEditing(true);
    setEditingItem(item);
    setButtonText("Update");
  };

  const handleDelete = (item) => {
    const updatedTableData = extractedData.filter((data) => data !== item);
    setExtractedData(updatedTableData);
  };
  const handleReset = () => {
    setHSN("");
    setDescription("");
    setTaxtype("");
    setTaxamount("");
    setCharge("");
    setTaxPercentage("");
    setVariance("");
    setUnitquantity("");
    setQuotation("");
    setIsEditing(false);
    setEditingItem(null);
    setButtonText("Add");
  };
  const columns = [
    {
      title: "HSN code",
      dataIndex: "HSN",
      width: "30",
      key: "HSN",
      render: (HSN) => (HSN !== undefined && HSN !== null ? HSN : "0"),
    },
    {
      title: "Tax Type",
      dataIndex: "Taxtype",
      key: "Taxtype",
      render: (Taxtype) => (Taxtype !== undefined && Taxtype !== null ? Taxtype : "0"),
    },
    {
      title: "Tax Amount",
      dataIndex: "Taxamount",
      key: "Taxamount",
      render: (Taxamount) => (Taxamount !== undefined && Taxamount !== null ? `${Taxamount}` : "0"),
    },
    {
      title: "Tax Percentage",
      dataIndex: "Taxpercentage",
      key: "Taxpercentage",
      render: (Taxpercentage, record) => {
        if (Taxpercentage !== undefined && Taxpercentage !== null) {
          return `${Taxpercentage}`;
        } else if (record.Taxpercentage !== undefined && record.Taxpercentage !== null) {
          return `${record.Taxpercentage}`;
        }
        return "0";
      },
    },
    {
      title: "Unit Quantity",
      dataIndex: "unitquantity",
      key: "unitquantity",
      render: (unitquantity) => {
        if (typeof unitquantity === 'undefined' || unitquantity === null || unitquantity === '') {
          return 1;
        }

        return unitquantity;
      },
    },
    {
      title: "Charge",
      dataIndex: "Charge",
      key: "Charge",
      render: (Charge, record, index) => {
        if (record.Taxamount !== null && record.Taxpercentage !== null) {
          const Taxpercentage = record.Taxpercentage;
          const Taxamount = record.Taxamount;
          const equivalentFor100Percent = (Taxamount * 100) / Taxpercentage;
          extractedData[index].charge = equivalentFor100Percent;
          return `${equivalentFor100Percent.toFixed(2)}`;
        } else if (record.Taxamount !== null) {
          return `${record.Taxamount}`;
        }

        return `${Charge || "0"}`;
      },
    },
    {
      title: "Quotation",
      dataIndex: "quotation",
      key: "quotation",
    },


    {
      title: "Variance",
      dataIndex: "variance",
      key: "variance",
      hide: true,
      render: (variance, record) => {
        const Charge = parseFloat(record.Charge) || 0;
        const Quotation = parseFloat(record.quotation) || 0;
        const varianceValue = Quotation - Charge;
        let status;
        if (varianceValue === 0) {
          status = "No Variance";
        } else if (varianceValue > 0) {
          status = "Par Variance";
        } else {
          status = "Negative Variance";
        }

        return `${varianceValue.toFixed(2)}`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <span>
          <Button
            onClick={() => handleEdit(item)}
            icon={<EditOutlined />}
            style={{ color: "blue" }}
          />
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => handleDelete(item)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} style={{ color: "red" }} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  // {
  //   title: "Variance",
  //   dataIndex: "variance",
  //   key: "variance",
  //   hide:true,
  //   render: (variance, record) => {
  //     const Charge = parseFloat(record.Charge) || 0;
  //     const Quotation = parseFloat(record.quotation) || 0;
  //     const varianceValue = Quotation - Charge;
  //     return `${varianceValue.toFixed(2)}`;
  //   },
  // },
  // {
  //   title: "Status",
  //   dataIndex: "status",
  //   key: "status",
  //   render: (status, records) => {
  //     if (!Array.isArray(records) || records.length === 0) {
  //       return "No Variance";
  //     }

  //     // Aggregate variance values for all records
  //     const varianceValues = records.map((record) => {
  //       if (!record.variance || !Array.isArray(record.variance)) {
  //         return 0; // Consider zero for records with missing or non-array variance data
  //       }
  //       return record.variance.reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
  //     });

  //     const hasNonZeroVariance = varianceValues.some((value) => value !== 0);
  //     const hasZeroVariance = varianceValues.some((value) => value === 0);

  //     if (hasNonZeroVariance && hasZeroVariance) {
  //       return "Partially Variance";
  //     } else if (!hasNonZeroVariance) {
  //       return "No Variance";
  //     } else {
  //       return "Fully Variance";
  //     }
  //   },
  // },

  const handleZoomIn = () => {
    if (zoomFactor < 2) {
      setZoomFactor(zoomFactor + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoomFactor > 0.2) {
      setZoomFactor(zoomFactor - 0.1);
    }
  };

  const handleIconClick = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };


  const parseExtractedText = (text) => {
    const lines = text.split('\n');
    const data = [];

    lines.forEach((line, index) => {
      data.push({
        id: index + 1,
        content: line.trim(),
      });
    });

    return data;
  };


  const extractvendorname = (data) => {
    const venodrnamekeywords = ['CNEE : ', 'Payee Name:', 'AccountName ', 'Registered Office Address ',];
    const matchingValues = [];

    for (const keyword of venodrnamekeywords) {
      for (const item of data) {
        if (item.content.includes(keyword)) {
          const value = item.content.replace(keyword, '').trim();
          matchingValues.push(value);
        }
      }
    }

    return matchingValues.join(', ');
  };

  const extractInvoiceNumber = (data) => {
    const keywords = ['INVOICE NUMBER', 'Tax Invoice', 'TAX INVOICE', 'NVOICE NUMBER', 'INVOICE No'];
    const matchingValues = [];

    for (const keyword of keywords) {
      for (const item of data) {
        if (item.content.includes(keyword)) {
          const value = item.content.replace(keyword, '').trim();
          matchingValues.push(value);
        }
      }
    }

    return matchingValues.join(', ');
  };



  const extractInvoiceAmount = (data) => {
    const amountKeywords = [
      '[oueDate ] Taxable Amount {INR)',
      '| ‘ ) Invoice Total INR|',
      'TOTAL INR',
      'TOTAL AMOUNT',
      'Invoice Total Inr',
      'Invoice Total INR',
      'Net Value',
      'Amount Due',
      'Taxable Amount {INR)',
      'OEBIT',
      'p ',
    ];
    const matchingValues = [];

    for (const keyword of amountKeywords) {
      for (const item of data) {
        if (item.content.includes(keyword)) {
          const valueText = item.content.split(keyword)[1].trim();
          const cleanedValue = valueText.replace(/[^0-9.]/g, '');
          matchingValues.push(cleanedValue);
        }
      }
    }
    const filteredValues = matchingValues.filter((value) => value !== '');
    return filteredValues.join(', ');
  };

  const extractIGST = (data) => {
    const igstKeywords = ['AbpiesT "', 'AbbiesT', 'Integrated Tax', 'TOTAL TAXABLE AMOUNT', 'IGST 22,900.93'];
    const matchingValues = [];

    for (const keyword of igstKeywords) {
      for (const item of data) {
        if (item.content.includes(keyword)) {
          const valueText = item.content.split(keyword)[1].trim();
          const cleanedValue = valueText.replace(/[^0-9.,]/g, '');
          matchingValues.push(cleanedValue);
        }
      }
    }
    const filteredValues = matchingValues.filter((value) => value !== '');
    return filteredValues.join(', ');
  }


  // const extractCGST = (data) => {
  //   const cgstKeywords = ['CGST', 'Central Tax', 'SUBTmowTﬁL I'];
  //   const matchingValues = [];

  //   for (const keyword of cgstKeywords) {
  //     for (const item of data) {
  //       if (item.content.includes(keyword)) {
  //         const value = item.content.replace(keyword, '').trim();
  //         matchingValues.push(value);
  //       }
  //     }
  //   }
  //   return matchingValues.join(', ');
  // };

  const extractInvoiceDate = (text) => {
    const invoiceDateRegex =
      /\b(?:\d{1,2}-[A-Za-z]{3}-\d{2}|\d{1,2} [A-Za-z]{3} \d{4}|\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4})\b/g;
    const match = text.match(invoiceDateRegex);

    if (match) {
      const extractedDate = match[0];
      if (/\d{1,2} [A-Za-z]{3} \d{4}/.test(extractedDate)) {
        const parts = extractedDate.split(" ");
        const day = parts[0];
        const month = getMonthNumber(parts[1]);
        const year = parts[2];
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
      if (/\d{1,2}-[A-Za-z]{3}-\d{2}/.test(extractedDate)) {
        const parts = extractedDate.split("-");
        const day = parts[0];
        const month = getMonthNumber(parts[1]);
        const year = formatYear(parts[2]);
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
      if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(extractedDate)) {
        const parts = extractedDate.split("/");
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
      if (/^\d{4}-\d{2}-\d{2}$/.test(extractedDate)) {
        return extractedDate;
      }
    }
    return "";
  };

  function getMonthNumber(monthStr) {
    const monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return monthMap[monthStr] || monthStr;
  }

  function formatYear(yearStr) {
    if (yearStr.length === 2) {
      const currentYear = new Date().getFullYear();
      const currentCentury = Math.floor(currentYear / 100);
      const currentDecade = currentYear % 100;
      const inputDecade = parseInt(yearStr, 10);
      const adjustedYear = currentCentury * 100 + inputDecade;

      if (adjustedYear > currentYear) {
        return (currentCentury - 1) * 100 + inputDecade;
      }

      return adjustedYear;
    } else if (yearStr.length === 4) {
      return yearStr;
    } else {
      return "";
    }
  }

  useEffect(() => {
    extractGstFromJson();
    extractInvoiceAmountFromJson();
  }, [jsonData]);

  const handleGstChange = (e) => {
    setGstNumbers(e.target.value);
  };

  const handleInvoiceAmountChange = (e) => {
    setInnvoiceamount(e.target.value);
  };

  const extractGstFromJson = () => {
    if (jsonData) {
      const gstId = '1-117'; 
      const gstData = jsonData.find((item) => item.id === gstId);

      if (gstData) {
        setGstNumbers(gstData.content);
      }
    }
  };

  const extractInvoiceAmountFromJson = () => {
    if (jsonData) {
      const invoiceAmountId = '1-16'; 
      const invoiceAmountData = jsonData.find((item) => item.id === invoiceAmountId);

      if (invoiceAmountData) {
        setInnvoiceamount(invoiceAmountData.content);
      }
    }
  };

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setFile(info.file);
      displayPdf(info.file.originFileObj); // Automatically display PDF on file upload
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const displayPdf = (pdfBlob) => {
    const reader = new FileReader();
    reader.onload = () => {
      const pdfDataUrl = reader.result;
      setPdfData(pdfDataUrl);
      // Automatically convert PDF to JSON when PDF data is available
      handlePdfToJSON(pdfDataUrl);
    };
    reader.readAsDataURL(pdfBlob);
  };

 const extractTextFromPdf = async (pdfBuffer) => {
  const pdf = await pdfjs.getDocument({ data: pdfBuffer }).promise;
  const numPages = pdf.numPages;
  const extractedData = [];
  let idCounter = 1;

  for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const textContent:any = await page.getTextContent();

    // Extract text from textContent.items
    // eslint-disable-next-line no-loop-func
    textContent.items.forEach((item) => {
      console.log(item.dir,"item")
      const content = item.str;
      extractedData.push({ id: `${pageNumber}-${idCounter}`, content });
      idCounter++;
    });
  }

  return extractedData;
};

  

  const handlePdfToJSON = async (pdfDataUrl) => {
    if (pdfDataUrl) {
      const response = await fetch(pdfDataUrl);
      const pdfBuffer = await response.arrayBuffer();
      const extractedData = await extractTextFromPdf(pdfBuffer);
      setJsonData(extractedData);
      console.log('PDF data in JSON format:', extractedData);
    }
  };

 

  const handleUploadDocument = () => {
    if (file && !buttonClicked) {
      setButtonClicked(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setIsLoading(true);

      console.log("Uploading file:", file);

      Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) }).then(
        ({ data: { text } }) => {
          setIsLoading(false);

          const parsedData = parseExtractedText(text);
          console.log(parsedData, 'ALL CONSOLE');

          const extractedInvoiceNumber = extractInvoiceNumber(parsedData);
          setInnvoicenum(extractedInvoiceNumber);

          const extractedInvoiceAmount = extractInvoiceAmount(parsedData);
          setInnvoiceamount(extractedInvoiceAmount);

          const extractedIGST = extractIGST(parsedData);
          setIgst(extractedIGST);

          // const extractedCGST = extractCGST(parsedData);
          // setCgst(extractedCGST);


          const extractedGstNumbers = extractGstNumbers(text);
          const extractedvendor = extractVendor(text);
          const extractedInvoiceDate = extractInvoiceDate(text);
          // const extractedInnvoicenum = extractInnvoiceNum(text);
          // const extractedInnvoiceamount = extractInnvoiceamount(text);
          const extractedInnvoicecurrency = extractInnvoicecurrency(text);
          // const extractedIgst = extractIgst(text);
          const extractedFinancialyear = extractFinancialyear(text);
          const extractedCgst = extractCgst(text);
          const extractedSgst = extractSgst(text);


          setGstNumbers(extractedGstNumbers);
          // setInnvoiceamount(extractedInnvoiceamount);
          setInnvoicecurrency(extractedInnvoicecurrency);
          setInvoiceDate(extractedInvoiceDate);
          setVendor(extractedvendor);
          // setInnvoicenum(extractedInnvoicenum);
          // setIgst(extractedIgst);
          setCgst(extractedCgst);
          setSgst(extractedSgst);
          setFinancialyear(extractedFinancialyear);



          const lines = text.split("\n");

          const allLines = lines.map((line, index) => ({
            id: index + 1,
            content: line.trim(),
          }));

          const structuredHSNLines = [];
          let currentHSN = null;

          for (const line of allLines) {
            if (line.content.includes("HSN") || line.content.match(/^\d{6}$/)) {
              if (currentHSN) {
                structuredHSNLines.push(currentHSN);
              }
              currentHSN = {
                HSN: line.content.includes("HSN")
                  ? line.content.match(/\d+/)
                  : line.content.trim(),
                Taxtype: line.content.match(/IGST|CGST|SGST|GST/),
                Taxamount: null,
                description: null,
                chargeINR: null,
              };

              const taxAmountMatch = line.content.match(
                /(\d+(\.\d{0,2})?)%=(\d+(\.\d{0,2})?)/
              );
              if (taxAmountMatch) {
                currentHSN.Taxamount = {
                  Taxpercentage: parseFloat(taxAmountMatch[1]),
                  Taxamount: parseFloat(taxAmountMatch[3]),
                };
              }
            } else if (line.content.includes("IGST|CGST|GSTS|GST")) {
              currentHSN.Taxtype = "IGST";
            }
            if (line.content.includes("chargeINR")) {
              const chargeValueMatch = line.content.match(
                /^\d{1,3}(,\d{3})*(\.\d{2})?$/
              );
              if (chargeValueMatch) {
                currentHSN.chargeINR = parseFloat(
                  chargeValueMatch[1].replace(/,/g, "")
                );
              }
            }

            if (currentHSN && !currentHSN.description) {
              currentHSN.description = line.content.trim();
            }
          }

          if (currentHSN) {
            structuredHSNLines.push(currentHSN);
          }

          structuredHSNLines.forEach((line) => {
            if (line.Taxamount) {
              line.Taxpercentage = line.Taxamount.Taxpercentage;
              line.Taxamount = line.Taxamount.Taxamount;
            }
          });

          console.log(
            "Structured HSN Lines (JSON):",
            JSON.stringify(structuredHSNLines, null, 2)
          );

          setExtractedData(structuredHSNLines);

          const result = {
            "Entire Data": allLines,
          };

          const currentFinancialYear = getCurrentFinancialYear();
          setFinancialyear(currentFinancialYear);

          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleString();
          setTimecreated(formattedDate);

          // setShowCancelButton(true);//
          setTimeout(() => {
            setIsLoading(false);
            setExtractionCompleted(true);
            setShowCancelButton(true);
          }, 2000);

          console.log("Result (JSON):", JSON.stringify(result, null, 2));
        }
      );
    } else {
      message.error("Please select a file to upload.");
    }
  };

  console.log(extractedData, "eeeee");

  const gstUploadFieldProps: UploadProps = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: async (file: any) => {
      if (!file.name.match(/\.(pdf|jpg|jpeg|png)$/)) {
        message.error("Only pdf and image files are allowed!");
        return false;
      }
      Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) }).then(
        ({ data: { text } }) => {
          console.log(text);
        }
      );
      setFile(file);
      return false;
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const onFinish = (values) => {
    console.log(values);
    // service
    //   .postdata(values)
    //   .then((res) => {
    //     if (res.status) {
    //       message.success("Success");
    //     } else {
    //     message.error("failed");
    //     }
    //   })
    //   .catch((err: { message: any }) => {
    //     console.log(err.message, 'err message');
    //   });
  };

  const onSumbit = () => {
    const req = new AllScanDto(gstNumbers, vendor, invoiceDate, Cgst, Igst, Sgst, Innvoicenum, Innvoiceamount,
      Innvoicecurrency, routing, comment, timecreated, buyerName, financialyear,
      JSON.parse(localStorage.getItem("currentUser")).user.userName, extractedData, "");
    console.log(req, "submit");
    service
      .postdata(req)
      .then((res) => {
        if (res.status) {
          message.success("Success");
          navigate("/scan-document");
        } else {
          message.error("Fill All Fields");
        }
      })
      .catch((err: { message: any }) => {
        console.log(err.message, "err message");
      });
  };

  const handleCancel = () => {
    setButtonClicked(true);
    window.location.reload();
  };

  return (

    <span style={{ display: "flex", flexDirection: "column" }}>
      <Card>
      <Card>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div style={{ width: '33%', marginRight: '10px' }}>
        <div>
          <Upload
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 0);
            }}
            showUploadList={false}
            onChange={handleFileChange}
            accept=".pdf"
            beforeUpload={(file) => {
              return true;
            }}
          >
            <Button icon={<UploadOutlined />}>Choose PDF</Button>
          </Upload>
        </div>

        <div id="pdfContainer" style={{ marginTop: '20px' }}>
          {pdfData && (
            <iframe
              src={pdfData}
              title="PDF Viewer"
              width="600px"
              height="600px"
              frameBorder="0"
            />
          )}
        </div>
      </div>

      {/* <div style={{ width: '33%', marginRight: '10px' }}>
        <div>
          {jsonData && (
            <div
              style={{
                maxHeight: '600px',
                overflowY: 'scroll',
                width: '800px',
                position: 'relative',
                right: '300px',
              }}
            >
              <Input
                name='GST'
                id='GST'
                placeholder="GST"
                value={gstNumbers}
                onChange={handleGstChange}
                style={{ marginTop: '20px' }}
              />
              <Input
                name='InvoiceAmount'
                id='InvoiceAmount'
                placeholder="Invoice Amount"
                value={Innvoiceamount}
                onChange={handleInvoiceAmountChange}
                style={{ marginTop: '20px' }}
              />
            </div>
          )}
        </div>
      </div> */}
    </div>
          </Card>
      </Card>
      <Card
        title={<span style={{ textAlign: "center" }}>Upload Document</span>}
        bordered={true}
        style={{ flex: 1, width: "600px", height: "100px" }}
        headStyle={{ backgroundColor: "#00FFFF", border: 0 }}
      >
        {/* <Card title="Upload Document" bordered={true} style={{ flex: 1, width: "600px", height: "100px" }} headStyle={{ backgroundColor: '#00FFFF', border: 0 }}> */}
        <Form
          layout="vertical"
          form={uploadForm}
          onFinish={handleUploadDocument}
        >
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item name={"poType"}>
                <Radio.Group name="radiogroup" defaultValue={"po"}>
                  <Radio value={"po"}>PO</Radio>
                  <Radio value={"non_po"}>NON PO</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Document is required",
                  },
                ]}
                label="Upload Document"
                name="file"
              >
                <Upload
                  key="file"
                  name="file"
                  {...gstUploadFieldProps}
                  accept=".pdf,.jpeg,.png,.jpg"
                  multiple 
                  // showUploadList={false}
                >
                  <Button
                    key="file"
                    style={{ color: "black", backgroundColor: "#7ec1ff" }}
                  // icon={<UploadOutlined />}
                  >
                    Choose File
                  </Button>
                  <Typography.Text type="secondary">
                    (Supported formats jpeg, jpg, png)
                  </Typography.Text>
                </Upload>

                <Row>
                  {extractionCompleted ? (
                    <Button
                      type="primary"
                      danger
                      style={{
                        position: 'relative',
                        bottom: '78px',
                        left: '220px',
                      }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      icon={<UploadOutlined />}
                      style={{
                        position: 'relative',
                        bottom: '78px',
                        left: '220px',
                      }}
                      onClick={handleUploadDocument}
                      disabled={isLoading || buttonClicked}
                    >
                      {isLoading ? (
                        <span
                          style={{
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 9999,
                            background: 'rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          <Spin size="large" />
                          <span style={{ marginTop: '10px', color: 'white' }}>
                            Please wait...
                          </span>
                        </span>
                      ) : (
                        'Upload'
                      )}
                    </Button>
                  )}
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title={<span style={{ textAlign: "center" }}>Image Form</span>}
        bordered={true}
        headStyle={{ backgroundColor: "#00FFFF", border: 0 }}
        style={{
          flex: 1,
          width: "600px",
          position: "relative",
          top: "10px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          background: "#fff",
          borderTop: "1px solid #e8e8e8",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "300px",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div
            style={{
              overflow: "auto",
              overflowX: "scroll",
              overflowY: "scroll",
              height: "100%",
            }}
          >
            <img
              id="imageToDrag"
              src={selectedImage}
              style={{
                maxWidth: "100%",
                transform: `scale(${zoomFactor})`,
                transition: "transform 0.2s",
              }}
            />
          </div>
        </div>
        <span style={{ textAlign: "center", marginTop: "10px" }}>
          <Button onClick={handleZoomIn}>Zoom In</Button>
          <Button onClick={handleZoomOut}>Zoom Out</Button>
        </span>
      </Card>

      <Form form={GstForm}>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <Card
            title={<span style={{ textAlign: "center" }}>Document Details</span>}
            headStyle={{ backgroundColor: "#00FFFF", border: 0 }}
            bordered={true}
            style={{
              flex: 1,
              width: "865px",
              position: "relative",
              left: "601px",
              bottom: "705px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              background: "#fff",
              borderTop: "1px solid #e8e8e8",
            }}
          >
            <Card style={{ position: "relative", bottom: "5px" }}>
              <Form.Item>
                <Row gutter={24}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Vendor"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Vendor Name
                    </label>
                    <Select
                      id="Vendor"
                      style={{ width: "190px", borderColor: vendor ? "green" : "red", }}
                      className={vendor ? "green" : vendor === "" ? "red" : "black"}
                      value={vendor}
                      onChange={(value) => setVendor(value)}
                      defaultValue="option1"
                    >
                      {data1.map((option) => (
                        <option value={option.businessName}>
                          {option.businessName}
                        </option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="GST"
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        position: "relative",
                        left: "10px",
                      }}
                    >
                      GST
                    </label>
                    <Input
                      title="GST"
                      name="GST"
                      style={{ width: "190px", height: "30px", borderColor: gstNumbers ? "green" : "red", }}
                      className={gstNumbers ? "green" : gstNumbers === "" ? "red" : "black"}
                      value={gstNumbers}
                      onChange={(e) => setGstNumbers(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Financialyear"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Financial year
                    </label>
                    <Input
                      id="Financialyear"
                      name="Financialyear"
                      style={{ width: "180px", height: "30px", borderColor: financialyear ? "green" : "red", }}
                      className={financialyear ? "green" : financialyear === "" ? "red" : "black"}
                      value={financialyear}
                      onChange={(e) => setFinancialyear(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row gutter={24} style={{ marginTop: "20px" }}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="invoiceDate"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Invoice Date
                    </label>
                    <Input
                      id="invoiceDate"
                      name="invoiceDate"
                      style={{ width: "190px", height: "30px", borderColor: invoiceDate ? "green" : "red", }}
                      className={invoiceDate ? "green" : invoiceDate === "" ? "red" : "black"}
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}

                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="InnvoiceNumber"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Invoice Number
                    </label>
                    <Input
                      id="InnvoiceNumber"
                      name="InnvoiceNumber"
                      style={{ width: "190px", height: "30px", borderColor: Innvoicenum ? "green" : "red", }}
                      className={Innvoicenum ? "green" : Innvoicenum === "" ? "red" : "black"}
                      value={Innvoicenum}
                      onChange={(e) => setInnvoicenum(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="InnvoiceAmount"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Invoice Amount
                    </label>
                    <Input
                      id="InnvoiceAmount"
                      name="InnvoiceAmount"
                      style={{ width: "180px", height: "30px", borderColor: Innvoiceamount ? "green" : "red", }}
                      className={Innvoiceamount ? "green" : Innvoiceamount === "" ? "red" : "black"}
                      value={Innvoiceamount}
                      onChange={(e) => setInnvoiceamount(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row gutter={24} style={{ marginTop: "20px" }}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="IGST"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      IGST
                    </label>
                    <Input
                      id="IGST"
                      name="IGST"
                      style={{ width: "190px", height: "30px", borderColor: Igst ? "green" : "red", }}
                      className={Igst ? "green" : Igst === "" ? "red" : "black"}
                      value={Igst}
                      onChange={(e) => setIgst(e.target.value)}

                    />
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Cgst"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      CSGT
                    </label>
                    <Input
                      id="Cgst"
                      name="Cgst"
                      style={{ width: "190px", height: "30px", borderColor: Cgst ? "green" : "red", }}
                      className={Cgst ? "green" : Cgst === "" ? "red" : "black"}
                      value={Cgst}
                      onChange={(e) => setCgst(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Sgst"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      SGST
                    </label>
                    <Input
                      id="Sgst"
                      name="Sgst"
                      style={{ width: "180px", height: "30px", borderColor: Sgst ? "green" : "red", }}
                      className={Sgst ? "green" : Sgst === "" ? "red" : "black"}
                      value={Sgst}
                      onChange={(e) => setSgst(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row gutter={24} style={{ marginTop: "20px" }}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Innvoice Currency"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Invoice Currency
                    </label>
                    <Input
                      id="Innvoice Currency"
                      name="Innvoice Currency"
                      style={{ width: "190px", height: "30px", borderColor: Innvoicecurrency ? "green" : "red", }}
                      className={Innvoicecurrency ? "green" : Innvoicecurrency === "" ? "red" : "black"}
                      value={Innvoicecurrency}
                      onChange={(e) => setInnvoicecurrency(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Routing"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Routing
                    </label>
                    <Select
                      title="Routing"
                      id="Routing"
                      className="center-options"
                      style={{ width: "190px" }}
                      value={routing}
                      onChange={(value) => setRouting(value)}
                    >
                      <Select.Option value="">Accept</Select.Option>
                      {/* <Select.Option value="Accept">Accept</Select.Option> */}
                    </Select>
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Comment"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Comment
                    </label>
                    <Input
                      id="Comment"
                      name="Comment"
                      style={{ width: "180px", height: "30px", borderColor: comment ? "green" : "red", }}
                      className={comment ? "green" : comment === "" ? "red" : "black"}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required

                    />
                  </Col>
                </Row>

                <Row gutter={16} style={{ marginTop: "20px" }}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Timecreated"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Time Created
                    </label>
                    <Input
                      id="Timecreated"
                      name="Timecreated"
                      style={{
                        width: "200px",
                        height: "30px",
                        paddingRight: "30px",
                        borderColor: timecreated ? "green" : "red",
                      }}
                      className={timecreated ? "green" : timecreated === "" ? "red" : "black"}
                      value={timecreated || ""}
                      onChange={(e) => setTimecreated(e.target.value)}
                    />
                    <CalendarOutlined
                      style={{
                        position: "absolute",
                        top: "30px",
                        right: "-3px",
                        cursor: "pointer",
                      }}
                      onClick={handleIconClick}
                    />
                    {isDatePickerVisible && (
                      <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{
                          position: "absolute",
                          zIndex: 1,
                          top: "21px",
                          left: "8px",
                          width: "200px",
                        }}
                        onChange={handleTimecreatedChange}
                        onBlur={() => setIsDatePickerVisible(false)}
                      />
                    )}
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="buyerName"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Buyer Name
                    </label>
                    <Select
                      id="buyerName"
                      style={{ width: "190px" }}
                      value={buyerName}
                      onChange={(value) => setBuyer(value)}
                      defaultValue="option1"
                    >
                      {data2.map((option) => (
                        <option value={option.buyerName}>
                          {option.buyerName}
                        </option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </Form.Item>
            </Card>

            <Card>
              <Form layout="vertical">
                <Row gutter={12}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="HSN"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      HSN Code
                    </label>
                    <Input
                      id="HSN"
                      name="HSN"
                      style={{ width: "150px", height: "30px" }}
                      value={HSN}
                      onChange={(e) => setHSN(e.target.value)}
                    />
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label htmlFor="Taxtype" style={{ color: "black", fontWeight: "bold" }}>
                      Tax Type
                    </label>
                    <Select
                      id="Taxtype"
                      // name="Taxtype"
                      style={{ width: "150px" }}
                      value={Taxtype}
                      onChange={(value) => setTaxtype(value)}
                    >
                      <Option value="IGST">IGST</Option>
                      <Option value="CSGT & SGST">CSGT & SGST</Option>
                      <Option value="No Tax">No Tax</Option>

                      {/* Add more options as needed */}
                    </Select>
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Taxamount"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Tax Amount
                    </label>
                    <Input
                      id="Taxamount"
                      name="Taxamount"
                      style={{ width: "150px", height: "30px" }}
                      value={Taxamount}
                      onChange={(e) => setTaxamount(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row gutter={12} style={{ marginTop: "10px" }}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Taxpercentage"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Tax Percentage
                    </label>
                    <Input
                      id="Taxpercentage"
                      name="Taxpercentage"
                      style={{ width: "150px", height: "30px" }}
                      value={Taxpercentage}
                      onChange={(e) => setTaxPercentage(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="unitquantity"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Unit Quantity
                    </label>
                    <Input
                      id="unitquantity"
                      name="unitquantity"
                      style={{ width: "150px", height: "30px" }}
                      value={unitquantity}
                      onChange={(e) => setUnitquantity(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Charge"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Charge
                    </label>
                    <Input
                      id="Charge"
                      name="Charge"
                      style={{ width: "150px", height: "30px" }}
                      value={Charge}
                      onChange={(e) => setCharge(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row gutter={12} style={{ marginTop: "10px" }}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="quotation"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Quotation
                    </label>
                    <Input
                      id="quotation"
                      name="quotation"
                      style={{ width: "150px", height: "30px" }}
                      value={quotation}
                      onChange={(e) => setQuotation(e.target.value)}
                    />
                  </Col>

                  {/* <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="variance"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Variance
                    </label>
                    <Input
                      id="variance"
                      name="variance"
                      style={{ width: "150px", height: "30px" }}
                      value={variance}
                      onChange={(e) => setVariance(e.target.value)}
                    />
                  </Col> */}
                </Row>

                <Row gutter={12} style={{ marginTop: "10px" }}></Row>
              </Form>
            </Card>
            <Row justify="end">
              <Button
                style={{
                  position: "relative",
                  top: "10px",
                  backgroundColor: "green",
                }}
                type="primary"
                onClick={handleAddToTable}
              >
                {isEditing ? buttonText : "Add"}
              </Button>
              <Button
                type="primary"
                danger
                style={{
                  position: "relative",
                  top: "10px",
                  marginLeft: "10px",
                }}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ position: "relative", top: "10px", left: "10PX" }}
                onClick={onSumbit}
              >
                Submit
              </Button>
            </Row>
            <br></br>
            <br></br>
            <br></br>
            {/* {extractedData && extractedData.length > 0 ? ( */}
            <Card size="small">
              <Table dataSource={extractedData} columns={columns} size="small" />
            </Card>
            {/* ) : (
              ""
            )} */}
          </Card>
    
        </span>
      </Form>
    </span>
  );
}

export default UploadDocumentForm;
