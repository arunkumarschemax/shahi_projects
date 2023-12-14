import { FileExcelFilled, RightSquareOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { FactoryUpdateRequest, MarketingModel, MarketingReportModel, MarketingReportSizeModel, PpmDateFilterRequest } from '@project-management-system/shared-models';
import { NikeService } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, message, Space, Tag, Statistic, Modal, TreeSelect, Tooltip, Checkbox, Popconfirm, Switch } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { CSVLink } from "react-csv";
import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup';
import Highlighter from 'react-highlight-words';
import { Link, useNavigate } from 'react-router-dom';
import { diffChars } from 'diff';
import PoDetailedview from './reports/po-detailed-view';
import { TreeNode } from 'antd/es/tree-select';
// import { CustomColumn } from '../../components';
// import { summaryColumns } from './reports/summary-columns';
const { diff_match_patch: DiffMatchPatch } = require('diff-match-patch');

const PPMReport = () => {
  const [form] = Form.useForm();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [gridData, setGridData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const service = new NikeService();
  const [filterData, setFilterData] = useState<any>([])
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);
  const [productCode, setProductCode] = useState<any>([]);
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const [poLine, setPoLine] = useState<any>([]);
  const [countryDestination, setCountryDestination] = useState<any>([]);
  const [plantCode, setPlantCode] = useState<any>([]);
  const [item, setItem] = useState<any>([]);
  const [factory, setFactory] = useState<any>([]);
  const [poNumber, setPoNumber] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [docType, setDocType] = useState<any>([]);
  const [poLineItemNumber, setPoLineItemNumber] = useState<any>([]);
  const [styleNumber, setStyleNumber] = useState<any>([]);
  const [planSesCode, setPlanSesCode] = useState<any>([]);
  const [planSesYear, setPlanSesYear] = useState<any>([]);
  const [geoCode, setGeoCode] = useState<any>([]);
  const [hideChildren, setHideChildren] = useState(false);
  const [csvData, setcsvData] = useState([]);
  let navigate = useNavigate()
  let poFilterData
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const formatter = (value: number) => <CountUp end={value} separator="," />;
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [poLineProp, setPoLineProp] = useState<any>([]);
  const [remarkModal, setRemarkModal] = useState<boolean>(false)
  const [itemText, setRemarks] = useState<string>('')
  const [expandedActualUnit, setExpandedActualUnit] = useState({});
  const [expandedQuantityAllocation, setExpandedQuantityAllocation] = useState({});
  const [textareaValuesActualUnit, setTextareaValuesActualUnit] = useState({});
  const [textareaValuesQuantityAllocation, setTextareaValuesQuantityAllocation] = useState({});




  useEffect(() => {
    getProductCode();
    getPoLine();
    getcountrydestination();
    getplantCode();
    getItem();
    getFactory();
    //  getData();
    getPonumber();
    getDocType();
    getPpmPoLineForMarketing();
    getStyleNumber();
    getSesonCode();
    getSesonYear();
    getGeoCode();

  }, [])

  const cancelHandle = () => {
    setIsModalOpen1(false);

  };
  const handleCheckboxChange = (column, poAndLine) => {
    if (column === 'ActualUnit') {
      setExpandedActualUnit((prevRows) => ({
        ...prevRows,
        [poAndLine]: !prevRows[poAndLine],
      }));
    } else if (column === 'QuantityAllocation') {
      setExpandedQuantityAllocation((prevRows) => ({
        ...prevRows,
        [poAndLine]: !prevRows[poAndLine],
      }));
    }
  };

  const handleTextareaChange = (column, poAndLine, value) => {
    if (column === 'ActualUnit') {
      setTextareaValuesActualUnit((prevValues) => ({
        ...prevValues,
        [poAndLine]: value,
      }));
    }
    //  else if (column === 'QuantityAllocation') {
    //     setTextareaValuesQuantityAllocation((prevValues) => ({
    //         ...prevValues,
    //         [poAndLine]: value,
    //     }));
    // }
  };
  const updateColumns = (poAndLine, actualUnit, allocatedQuantity) => {
    const req: FactoryUpdateRequest = {
      poAndLine: poAndLine,
    };

    if (actualUnit !== null && actualUnit !== undefined && actualUnit !== '') {
      req.actualUnit = actualUnit;
    }

    // if (
    //     allocatedQuantity !== null &&
    //     allocatedQuantity !== undefined &&
    //     allocatedQuantity !== ''
    // ) {
    //     req.allocatedQuantity = allocatedQuantity;
    // }

    service.updateFactoryStatusColumns(req).then((res) => {
      if (res.status) {
        getData();
        message.success(res.internalMessage);

        // window.location.reload();

      } else {
        message.error(res.internalMessage);
      }
    });
  };


  const getProductCode = () => {
    service.getPpmProductCodeForMarketing().then(res => {
      setProductCode(res.data)
    })
  }

  const getPoLine = () => {
    service.getPpmPoLineForMarketing().then(res => {
      setPoLine(res.data)
    })
  }

  const getcountrydestination = () => {
    service.getPpmDestinationCountryForMarketing().then(res => {
      setCountryDestination(res.data)
    })
  }

  const getplantCode = () => {
    service.getPpmPlantForMarketing().then(res => {
      setPlantCode(res.data)
    })
  }

  const getItem = () => {
    service.getPpmItemForMarketing().then(res => {
      setItem(res.data)
    })
  }

  const getFactory = () => {
    service.getPpmFactoryForMarketing().then(res => {
      setFactory(res.data)
    })
  }
  const getPonumber = () => {
    service.getPppoNumberForMarketing().then(res => {
      setPoNumber(res.data)
    })
  }
  const getDocType = () => {
    service.getPpmDocTypeMarketing().then(res => {
      setDocType(res.data)
    })
  }
  const getPpmPoLineForMarketing = () => {
    service.getPpmPoLineForMarketing().then(res => {
      setPoLineItemNumber(res.data)
    })
  }
  const getStyleNumber = () => {
    service.getPpmStyleNumberMarketing().then(res => {
      setStyleNumber(res.data)
    })
  }
  const getSesonCode = () => {
    service.getPpmPlanningSeasonCodeMarketing().then(res => {
      setPlanSesCode(res.data)
    })
  }
  const getSesonYear = () => {
    service.getPpmPlanningSeasonYearMarketing().then(res => {
      setPlanSesYear(res.data)
    })
  }
  const getGeoCode = () => {
    service.getPpmdesGeoCodeMarketing().then(res => {
      setGeoCode(res.data)
    })
  }


  const getData = () => {
    const req = new PpmDateFilterRequest();
    const selectedLineItemStatus = form.getFieldValue('DPOMLineItemStatus');

    if (form.getFieldValue('lastModifiedDate') !== undefined) {
      req.lastModifedStartDate = (form.getFieldValue('lastModifiedDate')[0]).format('YYYY-MM-DD');
    }
    if (form.getFieldValue('lastModifiedDate') !== undefined) {
      req.lastModifedEndtDate = (form.getFieldValue('lastModifiedDate')[1]).format('YYYY-MM-DD');
    }
    if (form.getFieldValue('documentDate') !== undefined) {
      req.documentStartDate = (form.getFieldValue('documentDate')[0]).format('YYYY-MM-DD');
    }
    if (form.getFieldValue('documentDate') !== undefined) {
      req.documentEndDate = (form.getFieldValue('documentDate')[1]).format('YYYY-MM-DD');
    }
    if (form.getFieldValue('productCode') !== undefined) {
      req.productCode = form.getFieldValue('productCode');
    }
    if (form.getFieldValue('poNumber') !== undefined) {
      req.poNumber = form.getFieldValue('poNumber');
    }
    if (form.getFieldValue('destinationCountry') !== undefined) {
      req.destinationCountry = form.getFieldValue('destinationCountry');
    }
    if (form.getFieldValue('item') !== undefined) {
      req.item = form.getFieldValue('item');
    }
    if (form.getFieldValue('DPOMLineItemStatus') !== undefined) {
      req.DPOMLineItemStatus = form.getFieldValue('DPOMLineItemStatus');
    }
    if (selectedLineItemStatus && selectedLineItemStatus.length > 0) {
      req.DPOMLineItemStatus = selectedLineItemStatus;
    }
    if (form.getFieldValue('docType') !== undefined) {
      req.docTypeCode = form.getFieldValue('docType');
    }
    if (form.getFieldValue('poLineItemNumber') !== undefined) {
      req.poLineItemNumber = form.getFieldValue('poLineItemNumber');
    }
    if (form.getFieldValue('factory') !== undefined) {
      req.factory = form.getFieldValue('factory');
    }
    if (form.getFieldValue('styleNumber') !== undefined) {
      req.styleNumber = form.getFieldValue('styleNumber');
    }
    if (form.getFieldValue('planningSeasonCode') !== undefined) {
      req.planningSeasonCode = form.getFieldValue('planningSeasonCode');
    }
    if (form.getFieldValue('planningSeasonYear') !== undefined) {
      req.planningSeasonYear = form.getFieldValue('planningSeasonYear');
    }
    if (form.getFieldValue('geoCode') !== undefined) {
      req.geoCode = form.getFieldValue('geoCode');
    }
    if (form.getFieldValue('plant') !== undefined) {
      req.plant = form.getFieldValue('plant');
    }
    if (form.getFieldValue('gac') !== undefined) {
      req.gacStartDate = (form.getFieldValue('gac')[0]).format('YYYY-MM-DD');
    }
    if (form.getFieldValue('gac') !== undefined) {
      req.gacEndDate = (form.getFieldValue('gac')[1]).format('YYYY-MM-DD');
    }
    setTableLoading(true)
    service.getPPMData(req)
      .then(res => {
        if (res.status) {
          setGridData(res.data);
          setFilterData(res.data);
          setFilteredData(res.data);
          let csvdata = []
          res.data.forEach(item => {
            csvdata.push({
              'Po+Line': item.poAndLine,
              'Last Modified Date': item.lastModifiedDate,
              'Item': item.item,
              'Factory': item.factory,
              'PCD': item.PCD,
              'Document Date': item.documentDate,
              'Purchase Order Number': item.purchaseOrderNumber,
              'PO Line Item Number': item.poLineItemNumber,
              'Trading Co PO Number': item.tradingCoPoNumber,
              'DPOM Line Item Status': item.DPOMLineItemStatus,
              'Doc Type': item.docTypeCode,
              'Doc Type Description ': item.docTypeDesc,
              'Style Number': item.styleNumber,
              'Product Code': item.productCode,
              'Colour Description': item.colorDesc,
              'Description With Fabric Content': item.fabricContent,
              'Fabric Content as Per Washcare Label': '-',
              'Planning Season Code': item.planningSeasonCode,
              'Planning Season Year': item.planningSeasonYear,
              'CO': item.customerOrder,
              'CO Final Approval Date': item.coFinalApprovalDate,
              'Plan No': item.planNo,
              'Lead Time': item.leadTime ? Math.abs(item.leadTime) : '-',
              'Category': item.categoryCode,
              'Category Description': item.categoryDesc,
              'Vendor Code': item.vendorCode,
              'Global Category Core Focus': item.gccFocusCode,
              'Global Category Core Focus Description': item.gccFocusDesc,
              'Gender Age': item.genderAgeCode,
              'Gender Age Description': '',
              'Destination Country Code ': item.destinationCountryCode,
              'Destination Country Name': item.destinationCountry,
              'Geo Code': item.geoCode,
              'Plant Code': item.plant,
              'Plant Name': item.plantName,
              'UPC': Number(item.UPC),
              'Sales Order Number': '',
              'Sales Order Item Number': '',
              'Customer PO': item.customerPO,
              'Ship To Customer Number': item.shipToCustomerNumber,
              'Ship To Customer Name': item.shipToCustomerName,
              'Ship to Address Legal PO': item.shipToAddressLegalPO,
              'Ship to Address DIA': item.shipToAddressDIA,
              'Diff of Ship to Address': '-',
              'CAB Code': item.CABCode,
              'Final Destination': '-',
              'MRGAC': item.MRGAC,
              'OGAC': item.OGAC,
              'GAC': item.GAC,
              'GAC Reason Code': item.GACReasonCode,
              'GAC Reason Description': item.GACReasonDesc,
              'Truck Out Date': item.truckOutDate,
              'Origin Receipt Date': item.originReceiptDate,
              'Factory Delivery Actual Date': item.factoryDeliveryActDate,
              'Shipping Type': item.shippingType,
              'Planning Priority Number': item.planningPriorityCode,
              'Planning Priority Description': item.planningPriorityDesc,
              'Launch Code': item.launchCode,
              'Mode Of Transportation': item.modeOfTransportationCode,
              'In Co Terms': item.inCoTerms,
              'Inventory Segment Code': item.inventorySegmentCode,
              'Purchase Group': item.purchaseGroupCode,
              'Purchase Group Name': item.purchaseGroupName,
              'Total Item Quantity': item.totalItemQty,
              '2XL (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.sizeQty,
              '2XL (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.grossFobPrice,
              '2XL (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.grossFobCurrencyCode,
              '2XL (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.buyerGrossFobPrice,
              '2XL (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.buyerGrossFobCurrencyCode,
              '2XL (Diff of Price)': '-',
              '2XL (Diff of Currency)': '-',
              '2XL (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.netIncludingDisc,
              '2XL (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.netIncludingDiscCurrencyCode,
              '2XL (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.trConetIncludingDisc,
              '2XL (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.trConetIncludingDiscCurrencyCode,
              '2XL (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.legalPoPrice,
              '2XL (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.legalPoCurrencyCode,
              '2XL (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.coPrice,
              '2XL (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.coPriceCurrencyCode,
              '2XL (Diff of Legal PO & CO Price)': '-',
              '2XL (Diff of legal Po & Co Currency)': '-',
              '2XL (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.CRMCoQty,
              '2XL (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.legalPoQty,
              '2XL (Diff of Quantity)': '-',
              '2XL (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '2XL')?.sizeQty * 0.03).toFixed(0)) : '-',
              '2XL (Actual Shipped Qty)': '-',
              '2XL (Actual Ship %)': '-',
              'XL (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.sizeQty,
              'XL (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.grossFobPrice,
              'XL (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.grossFobCurrencyCode,
              'XL (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.buyerGrossFobPrice,
              'XL (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.buyerGrossFobCurrencyCode,
              'XL (Diff of Price)': '-',
              'XL (Diff of Currency)': '-',
              'XL (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.netIncludingDisc,
              'XL (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.netIncludingDiscCurrencyCode,
              'XL (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.trConetIncludingDisc,
              'XL (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.trConetIncludingDiscCurrencyCode,
              'XL (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.legalPoPrice,
              'XL (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.legalPoCurrencyCode,
              'XL (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.coPrice,
              'XL (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.coPriceCurrencyCode,
              'XL (Diff of Legal PO & CO Price)': '-',
              'XL (Diff of legal Po & Co Currency)': '-',
              'XL (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.CRMCoQty,
              'XL (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.legalPoQty,
              'XL (Diff of Quantity)': '-',
              'XL (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'XL')?.sizeQty * 0.03).toFixed(0)) : '-',
              'XL (Actual Shipped Qty)': '-',
              'XL (Actual Ship %)': '-',
              'L (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.sizeQty,
              'L (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.grossFobPrice,
              'L (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.grossFobCurrencyCode,
              'L (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.buyerGrossFobPrice,
              'L (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.buyerGrossFobCurrencyCode,
              'L (Diff of Price)': '-',
              'L (Diff of Currency)': '-',
              'L (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.netIncludingDisc,
              'L (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.netIncludingDiscCurrencyCode,
              'L (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.trConetIncludingDisc,
              'L (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.trConetIncludingDiscCurrencyCode,
              'L (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.legalPoPrice,
              'L (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.legalPoCurrencyCode,
              'L (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.coPrice,
              'L (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.coPriceCurrencyCode,
              'L (Diff of Legal PO & CO Price)': '-',
              'L (Diff of legal Po & Co Currency)': '-',
              'L (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.CRMCoQty,
              'L (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.legalPoQty,
              'L (Diff of Quantity)': '-',
              'L (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'L')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'L')?.sizeQty * 0.03).toFixed(0)) : '-',
              'L (Actual Shipped Qty)': '-',
              'L (Actual Ship %)': '-',
              'M (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.sizeQty,
              'M (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.grossFobPrice,
              'M (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.grossFobCurrencyCode,
              'M (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.buyerGrossFobPrice,
              'M (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.buyerGrossFobCurrencyCode,
              'M (Diff of Price)': '-',
              'M (Diff of Currency)': '-',
              'M (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.netIncludingDisc,
              'M (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.netIncludingDiscCurrencyCode,
              'M (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.trConetIncludingDisc,
              'M (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.trConetIncludingDiscCurrencyCode,
              'M (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.legalPoPrice,
              'M (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.legalPoCurrencyCode,
              'M (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.coPrice,
              'M (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.coPriceCurrencyCode,
              'M (Diff of Legal PO & CO Price)': '-',
              'M (Diff of legal Po & Co Currency)': '-',
              'M (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.CRMCoQty,
              'M (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.legalPoQty,
              'M (Diff of Quantity)': '-',
              'M (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'M')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'M')?.sizeQty * 0.03).toFixed(0)) : '-',
              'M (Actual Shipped Qty)': '-',
              'M (Actual Ship %)': '-',
              'S (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.sizeQty,
              'S (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.grossFobPrice,
              'S (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.grossFobCurrencyCode,
              'S (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.buyerGrossFobPrice,
              'S (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.buyerGrossFobCurrencyCode,
              'S (Diff of Price)': '-',
              'S (Diff of Currency)': '-',
              'S (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.netIncludingDisc,
              'S (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.netIncludingDiscCurrencyCode,
              'S (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.trConetIncludingDisc,
              'S (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.trConetIncludingDiscCurrencyCode,
              'S (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.legalPoPrice,
              'S (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.legalPoCurrencyCode,
              'S (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.coPrice,
              'S (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.coPriceCurrencyCode,
              'S (Diff of Legal PO & CO Price)': '-',
              'S (Diff of legal Po & Co Currency)': '-',
              'S (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.CRMCoQty,
              'S (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.legalPoQty,
              'S (Diff of Quantity)': '-',
              'S (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'S')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'S')?.sizeQty * 0.03).toFixed(0)) : '-',
              'S (Actual Shipped Qty)': '-',
              'S (Actual Ship %)': '-',
              'XS (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.sizeQty,
              'XS (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.grossFobPrice,
              'XS (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.grossFobCurrencyCode,
              'XS (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.buyerGrossFobPrice,
              'XS (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.buyerGrossFobCurrencyCode,
              'XS (Diff of Price)': '-',
              'XS (Diff of Currency)': '-',
              'XS (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.netIncludingDisc,
              'XS (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.netIncludingDiscCurrencyCode,
              'XS (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.trConetIncludingDisc,
              'XS (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.trConetIncludingDiscCurrencyCode,
              'XS (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.legalPoPrice,
              'XS (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.legalPoCurrencyCode,
              'XS (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.coPrice,
              'XS (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.coPriceCurrencyCode,
              'XS (Diff of Legal PO & CO Price)': '-',
              'XS (Diff of legal Po & Co Currency)': '-',
              'XS (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.CRMCoQty,
              'XS (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.legalPoQty,
              'XS (Diff of Quantity)': '-',
              'XS (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'XS')?.sizeQty * 0.03).toFixed(0)) : '-',
              'XS (Actual Shipped Qty)': '-',
              'XS (Actual Ship %)': '-',
              '3XL (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.sizeQty,
              '3XL (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.grossFobPrice,
              '3XL (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.grossFobCurrencyCode,
              '3XL (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.buyerGrossFobPrice,
              '3XL (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.buyerGrossFobCurrencyCode,
              '3XL (Diff of Price)': '-',
              '3XL (Diff of Currency)': '-',
              '3XL (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.netIncludingDisc,
              '3XL (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.netIncludingDiscCurrencyCode,
              '3XL (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.trConetIncludingDisc,
              '3XL (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.trConetIncludingDiscCurrencyCode,
              '3XL (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.legalPoPrice,
              '3XL (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.legalPoCurrencyCode,
              '3XL (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.coPrice,
              '3XL (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.coPriceCurrencyCode,
              '3XL (Diff of Legal PO & CO Price)': '-',
              '3XL (Diff of legal Po & Co Currency)': '-',
              '3XL (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.CRMCoQty,
              '3XL (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.legalPoQty,
              '3XL (Diff of Quantity)': '-',
              '3XL (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '3XL')?.sizeQty * 0.03).toFixed(0)) : '-',
              '3XL (Actual Shipped Qty)': '-',
              '3XL (Actual Ship %)': '-',
              '4XL (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.sizeQty,
              '4XL (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.grossFobPrice,
              '4XL (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.grossFobCurrencyCode,
              '4XL (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.buyerGrossFobPrice,
              '4XL (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.buyerGrossFobCurrencyCode,
              '4XL (Diff of Price)': '-',
              '4XL (Diff of Currency)': '-',
              '4XL (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.netIncludingDisc,
              '4XL (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.netIncludingDiscCurrencyCode,
              '4XL (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.trConetIncludingDisc,
              '4XL (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.trConetIncludingDiscCurrencyCode,
              '4XL (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.legalPoPrice,
              '4XL (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.legalPoCurrencyCode,
              '4XL (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.coPrice,
              '4XL (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.coPriceCurrencyCode,
              '4XL (Diff of Legal PO & CO Price)': '-',
              '4XL (Diff of legal Po & Co Currency)': '-',
              '4XL (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.CRMCoQty,
              '4XL (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.legalPoQty,
              '4XL (Diff of Quantity)': '-',
              '4XL (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '4XL')?.sizeQty * 0.03).toFixed(0)) : '-',
              '4XL (Actual Shipped Qty)': '-',
              '4XL (Actual Ship %)': '-',
              '5XL (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.sizeQty,
              '5XL (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.grossFobPrice,
              '5XL (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.grossFobCurrencyCode,
              '5XL (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.buyerGrossFobPrice,
              '5XL (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.buyerGrossFobCurrencyCode,
              '5XL (Diff of Price)': '-',
              '5XL (Diff of Currency)': '-',
              '5XL (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.netIncludingDisc,
              '5XL (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.netIncludingDiscCurrencyCode,
              '5XL (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.trConetIncludingDisc,
              '5XL (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.trConetIncludingDiscCurrencyCode,
              '5XL (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.legalPoPrice,
              '5XL (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.legalPoCurrencyCode,
              '5XL (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.coPrice,
              '5XL (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.coPriceCurrencyCode,
              '5XL (Diff of Legal PO & CO Price)': '-',
              '5XL (Diff of legal Po & Co Currency)': '-',
              '5XL (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.CRMCoQty,
              '5XL (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.legalPoQty,
              '5XL (Diff of Quantity)': '-',
              '5XL (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '5XL')?.sizeQty * 0.03).toFixed(0)) : '-',
              '5XL (Actual Shipped Qty)': '-',
              '5XL (Actual Ship %)': '-',
              'L-T (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.sizeQty,
              'L-T (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.grossFobPrice,
              'L-T (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.grossFobCurrencyCode,
              'L-T (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.buyerGrossFobPrice,
              'L-T (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.buyerGrossFobCurrencyCode,
              'L-T (Diff of Price)': '-',
              'L-T (Diff of Currency)': '-',
              'L-T (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.netIncludingDisc,
              'L-T (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.netIncludingDiscCurrencyCode,
              'L-T (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.trConetIncludingDisc,
              'L-T (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.trConetIncludingDiscCurrencyCode,
              'L-T (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.legalPoPrice,
              'L-T (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.legalPoCurrencyCode,
              'L-T (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.coPrice,
              'L-T (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.coPriceCurrencyCode,
              'L-T (Diff of Legal PO & CO Price)': '-',
              'L-T (Diff of legal Po & Co Currency)': '-',
              'L-T (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.CRMCoQty,
              'L-T (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.legalPoQty,
              'L-T (Diff of Quantity)': '-',
              'L-T (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'L-T')?.sizeQty * 0.03).toFixed(0)) : '-',
              'L-T (Actual Shipped Qty)': '-',
              'L-T (Actual Ship %)': '-',
              'L-S (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.sizeQty,
              'L-S (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.grossFobPrice,
              'L-S (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.grossFobCurrencyCode,
              'L-S (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.buyerGrossFobPrice,
              'L-S (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.buyerGrossFobCurrencyCode,
              'L-S (Diff of Price)': '-',
              'L-S (Diff of Currency)': '-',
              'L-S (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.netIncludingDisc,
              'L-S (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.netIncludingDiscCurrencyCode,
              'L-S (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.trConetIncludingDisc,
              'L-S (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.trConetIncludingDiscCurrencyCode,
              'L-S (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.legalPoPrice,
              'L-S (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.legalPoCurrencyCode,
              'L-S (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.coPrice,
              'L-S (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.coPriceCurrencyCode,
              'L-S (Diff of Legal PO & CO Price)': '-',
              'L-S (Diff of legal Po & Co Currency)': '-',
              'L-S (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.CRMCoQty,
              'L-S (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.legalPoQty,
              'L-S (Diff of Quantity)': '-',
              'L-S (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'L-S')?.sizeQty * 0.03).toFixed(0)) : '-',
              'L-S (Actual Shipped Qty)': '-',
              'L-S (Actual Ship %)': '-',
              'M-S (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.sizeQty,
              'M-S (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.grossFobPrice,
              'M-S (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.grossFobCurrencyCode,
              'M-S (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.buyerGrossFobPrice,
              'M-S (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.buyerGrossFobCurrencyCode,
              'M-S (Diff of Price)': '-',
              'M-S (Diff of Currency)': '-',
              'M-S (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.netIncludingDisc,
              'M-S (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.netIncludingDiscCurrencyCode,
              'M-S (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.trConetIncludingDisc,
              'M-S (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.trConetIncludingDiscCurrencyCode,
              'M-S (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.legalPoPrice,
              'M-S (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.legalPoCurrencyCode,
              'M-S (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.coPrice,
              'M-S (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.coPriceCurrencyCode,
              'M-S (Diff of Legal PO & CO Price)': '-',
              'M-S (Diff of legal Po & Co Currency)': '-',
              'M-S (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.CRMCoQty,
              'M-S (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.legalPoQty,
              'M-S (Diff of Quantity)': '-',
              'M-S (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'M-S')?.sizeQty * 0.03).toFixed(0)) : '-',
              'M-S (Actual Shipped Qty)': '-',
              'M-S (Actual Ship %)': '-',
              'M-T (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.sizeQty,
              'M-T (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.grossFobPrice,
              'M-T (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.grossFobCurrencyCode,
              'M-T (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.buyerGrossFobPrice,
              'M-T (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.buyerGrossFobCurrencyCode,
              'M-T (Diff of Price)': '-',
              'M-T (Diff of Currency)': '-',
              'M-T (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.netIncludingDisc,
              'M-T (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.netIncludingDiscCurrencyCode,
              'M-T (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.trConetIncludingDisc,
              'M-T (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.trConetIncludingDiscCurrencyCode,
              'M-T (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.legalPoPrice,
              'M-T (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.legalPoCurrencyCode,
              'M-T (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.coPrice,
              'M-T (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.coPriceCurrencyCode,
              'M-T (Diff of Legal PO & CO Price)': '-',
              'M-T (Diff of legal Po & Co Currency)': '-',
              'M-T (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.CRMCoQty,
              'M-T (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.legalPoQty,
              'M-T (Diff of Quantity)': '-',
              'M-T (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'M-T')?.sizeQty * 0.03).toFixed(0)) : '-',
              'M-T (Actual Shipped Qty)': '-',
              'M-T (Actual Ship %)': '-',
              'S-S (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.sizeQty,
              'S-S (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.grossFobPrice,
              'S-S (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.grossFobCurrencyCode,
              'S-S (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.buyerGrossFobPrice,
              'S-S (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.buyerGrossFobCurrencyCode,
              'S-S (Diff of Price)': '-',
              'S-S (Diff of Currency)': '-',
              'S-S (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.netIncludingDisc,
              'S-S (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.netIncludingDiscCurrencyCode,
              'S-S (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.trConetIncludingDisc,
              'S-S (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.trConetIncludingDiscCurrencyCode,
              'S-S (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.legalPoPrice,
              'S-S (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.legalPoCurrencyCode,
              'S-S (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.coPrice,
              'S-S (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.coPriceCurrencyCode,
              'S-S (Diff of Legal PO & CO Price)': '-',
              'S-S (Diff of legal Po & Co Currency)': '-',
              'S-S (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.CRMCoQty,
              'S-S (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.legalPoQty,
              'S-S (Diff of Quantity)': '-',
              'S-S (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'S-S')?.sizeQty * 0.03).toFixed(0)) : '-',
              'S-S (Actual Shipped Qty)': '-',
              'S-S (Actual Ship %)': '-',
              'S-T (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.sizeQty,
              'S-T (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.grossFobPrice,
              'S-T (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.grossFobCurrencyCode,
              'S-T (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.buyerGrossFobPrice,
              'S-T (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.buyerGrossFobCurrencyCode,
              'S-T (Diff of Price)': '-',
              'S-T (Diff of Currency)': '-',
              'S-T (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.netIncludingDisc,
              'S-T (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.netIncludingDiscCurrencyCode,
              'S-T (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.trConetIncludingDisc,
              'S-T (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.trConetIncludingDiscCurrencyCode,
              'S-T (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.legalPoPrice,
              'S-T (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.legalPoCurrencyCode,
              'S-T (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.coPrice,
              'S-T (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.coPriceCurrencyCode,
              'S-T (Diff of Legal PO & CO Price)': '-',
              'S-T (Diff of legal Po & Co Currency)': '-',
              'S-T (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.CRMCoQty,
              'S-T (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.legalPoQty,
              'S-T (Diff of Quantity)': '-',
              'S-T (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'S-T')?.sizeQty * 0.03).toFixed(0)) : '-',
              'S-T (Actual Shipped Qty)': '-',
              'S-T (Actual Ship %)': '-',
              'XL-T (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.sizeQty,
              'XL-T (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.grossFobPrice,
              'XL-T (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.grossFobCurrencyCode,
              'XL-T (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.buyerGrossFobPrice,
              'XL-T (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.buyerGrossFobCurrencyCode,
              'XL-T (Diff of Price)': '-',
              'XL-T (Diff of Currency)': '-',
              'XL-T (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.netIncludingDisc,
              'XL-T (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.netIncludingDiscCurrencyCode,
              'XL-T (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.trConetIncludingDisc,
              'XL-T (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.trConetIncludingDiscCurrencyCode,
              'XL-T (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.legalPoPrice,
              'XL-T (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.legalPoCurrencyCode,
              'XL-T (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.coPrice,
              'XL-T (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.coPriceCurrencyCode,
              'XL-T (Diff of Legal PO & CO Price)': '-',
              'XL-T (Diff of legal Po & Co Currency)': '-',
              'XL-T (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.CRMCoQty,
              'XL-T (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.legalPoQty,
              'XL-T (Diff of Quantity)': '-',
              'XL-T (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'XL-T')?.sizeQty * 0.03).toFixed(0)) : '-',
              'XL-T (Actual Shipped Qty)': '-',
              'XL-T (Actual Ship %)': '-',
              'XS-S (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.sizeQty,
              'XS-S (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.grossFobPrice,
              'XS-S (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.grossFobCurrencyCode,
              'XS-S (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.buyerGrossFobPrice,
              'XS-S (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.buyerGrossFobCurrencyCode,
              'XS-S (Diff of Price)': '-',
              'XS-S (Diff of Currency)': '-',
              'XS-S (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.netIncludingDisc,
              'XS-S (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.netIncludingDiscCurrencyCode,
              'XS-S (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.trConetIncludingDisc,
              'XS-S (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.trConetIncludingDiscCurrencyCode,
              'XS-S (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.legalPoPrice,
              'XS-S (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.legalPoCurrencyCode,
              'XS-S (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.coPrice,
              'XS-S (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.coPriceCurrencyCode,
              'XS-S (Diff of Legal PO & CO Price)': '-',
              'XS-S (Diff of legal Po & Co Currency)': '-',
              'XS-S (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.CRMCoQty,
              'XS-S (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.legalPoQty,
              'XS-S (Diff of Quantity)': '-',
              'XS-S (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'XS-S')?.sizeQty * 0.03).toFixed(0)) : '-',
              'XS-S (Actual Shipped Qty)': '-',
              'XS-S (Actual Ship %)': '-',
              'XS-T (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.sizeQty,
              'XS-T (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.grossFobPrice,
              'XS-T (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.grossFobCurrencyCode,
              'XS-T (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.buyerGrossFobPrice,
              'XS-T (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.buyerGrossFobCurrencyCode,
              'XS-T (Diff of Price)': '-',
              'XS-T (Diff of Currency)': '-',
              'XS-T (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.netIncludingDisc,
              'XS-T (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.netIncludingDiscCurrencyCode,
              'XS-T (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.trConetIncludingDisc,
              'XS-T (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.trConetIncludingDiscCurrencyCode,
              'XS-T (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.legalPoPrice,
              'XS-T (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.legalPoCurrencyCode,
              'XS-T (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.coPrice,
              'XS-T (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.coPriceCurrencyCode,
              'XS-T (Diff of Legal PO & CO Price)': '-',
              'XS-T (Diff of legal Po & Co Currency)': '-',
              'XS-T (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.CRMCoQty,
              'XS-T (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.legalPoQty,
              'XS-T (Diff of Quantity)': '-',
              'XS-T (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'XS-T')?.sizeQty * 0.03).toFixed(0)) : '-',
              'XS-T (Actual Shipped Qty)': '-',
              'XS-T (Actual Ship %)': '-',
              '2XL-T (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.sizeQty,
              '2XL-T (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.grossFobPrice,
              '2XL-T (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.grossFobCurrencyCode,
              '2XL-T (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.buyerGrossFobPrice,
              '2XL-T (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.buyerGrossFobCurrencyCode,
              '2XL-T (Diff of Price)': '-',
              '2XL-T (Diff of Currency)': '-',
              '2XL-T (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.netIncludingDisc,
              '2XL-T (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.netIncludingDiscCurrencyCode,
              '2XL-T (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.trConetIncludingDisc,
              '2XL-T (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.trConetIncludingDiscCurrencyCode,
              '2XL-T (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.legalPoPrice,
              '2XL-T (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.legalPoCurrencyCode,
              '2XL-T (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.coPrice,
              '2XL-T (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.coPriceCurrencyCode,
              '2XL-T (Diff of Legal PO & CO Price)': '-',
              '2XL-T (Diff of legal Po & Co Currency)': '-',
              '2XL-T (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.CRMCoQty,
              '2XL-T (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.legalPoQty,
              '2XL-T (Diff of Quantity)': '-',
              '2XL-T (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '2XL-T')?.sizeQty * 0.03).toFixed(0)) : '-',
              '2XL-T (Actual Shipped Qty)': '-',
              '2XL-T (Actual Ship %)': '-',
              'XL-S (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.sizeQty,
              'XL-S (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.grossFobPrice,
              'XL-S (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.grossFobCurrencyCode,
              'XL-S (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.buyerGrossFobPrice,
              'XL-S (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.buyerGrossFobCurrencyCode,
              'XL-S (Diff of Price)': '-',
              'XL-S (Diff of Currency)': '-',
              'XL-S (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.netIncludingDisc,
              'XL-S (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.netIncludingDiscCurrencyCode,
              'XL-S (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.trConetIncludingDisc,
              'XL-S (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.trConetIncludingDiscCurrencyCode,
              'XL-S (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.legalPoPrice,
              'XL-S (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.legalPoCurrencyCode,
              'XL-S (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.coPrice,
              'XL-S (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.coPriceCurrencyCode,
              'XL-S (Diff of Legal PO & CO Price)': '-',
              'XL-S (Diff of legal Po & Co Currency)': '-',
              'XL-S (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.CRMCoQty,
              'XL-S (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.legalPoQty,
              'XL-S (Diff of Quantity)': '-',
              'XL-S (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'XL-S')?.sizeQty * 0.03).toFixed(0)) : '-',
              'XL-S (Actual Shipped Qty)': '-',
              'XL-S (Actual Ship %)': '-',
              '2XLTT (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.sizeQty,
              '2XLTT (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.grossFobPrice,
              '2XLTT (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.grossFobCurrencyCode,
              '2XLTT (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.buyerGrossFobPrice,
              '2XLTT (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.buyerGrossFobCurrencyCode,
              '2XLTT (Diff of Price)': '-',
              '2XLTT (Diff of Currency)': '-',
              '2XLTT (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.netIncludingDisc,
              '2XLTT (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.netIncludingDiscCurrencyCode,
              '2XLTT (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.trConetIncludingDisc,
              '2XLTT (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.trConetIncludingDiscCurrencyCode,
              '2XLTT (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.legalPoPrice,
              '2XLTT (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.legalPoCurrencyCode,
              '2XLTT (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.coPrice,
              '2XLTT (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.coPriceCurrencyCode,
              '2XLTT (Diff of Legal PO & CO Price)': '-',
              '2XLTT (Diff of legal Po & Co Currency)': '-',
              '2XLTT (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.CRMCoQty,
              '2XLTT (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.legalPoQty,
              '2XLTT (Diff of Quantity)': '-',
              '2XLTT (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '2XLTT')?.sizeQty * 0.03).toFixed(0)) : '-',
              '2XLTT (Actual Shipped Qty)': '-',
              '2XLTT (Actual Ship %)': '-',
              '3XL-T (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.sizeQty,
              '3XL-T (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.grossFobPrice,
              '3XL-T (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.grossFobCurrencyCode,
              '3XL-T (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.buyerGrossFobPrice,
              '3XL-T (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.buyerGrossFobCurrencyCode,
              '3XL-T (Diff of Price)': '-',
              '3XL-T (Diff of Currency)': '-',
              '3XL-T (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.netIncludingDisc,
              '3XL-T (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.netIncludingDiscCurrencyCode,
              '3XL-T (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.trConetIncludingDisc,
              '3XL-T (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.trConetIncludingDiscCurrencyCode,
              '3XL-T (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.legalPoPrice,
              '3XL-T (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.legalPoCurrencyCode,
              '3XL-T (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.coPrice,
              '3XL-T (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.coPriceCurrencyCode,
              '3XL-T (Diff of Legal PO & CO Price)': '-',
              '3XL-T (Diff of legal Po & Co Currency)': '-',
              '3XL-T (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.CRMCoQty,
              '3XL-T (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.legalPoQty,
              '3XL-T (Diff of Quantity)': '-',
              '3XL-T (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '3XL-T')?.sizeQty * 0.03).toFixed(0)) : '-',
              '3XL-T (Actual Shipped Qty)': '-',
              '3XL-T (Actual Ship %)': '-',
              'LTT (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.sizeQty,
              'LTT (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.grossFobPrice,
              'LTT (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.grossFobCurrencyCode,
              'LTT (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.buyerGrossFobPrice,
              'LTT (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.buyerGrossFobCurrencyCode,
              'LTT (Diff of Price)': '-',
              'LTT (Diff of Currency)': '-',
              'LTT (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.netIncludingDisc,
              'LTT (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.netIncludingDiscCurrencyCode,
              'LTT (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.trConetIncludingDisc,
              'LTT (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.trConetIncludingDiscCurrencyCode,
              'LTT (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.legalPoPrice,
              'LTT (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.legalPoCurrencyCode,
              'LTT (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.coPrice,
              'LTT (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.coPriceCurrencyCode,
              'LTT (Diff of Legal PO & CO Price)': '-',
              'LTT (Diff of legal Po & Co Currency)': '-',
              'LTT (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.CRMCoQty,
              'LTT (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.legalPoQty,
              'LTT (Diff of Quantity)': '-',
              'LTT (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'LTT')?.sizeQty * 0.03).toFixed(0)) : '-',
              'LTT (Actual Shipped Qty)': '-',
              'LTT (Actual Ship %)': '-',
              'XLTT (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.sizeQty,
              'XLTT (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.grossFobPrice,
              'XLTT (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.grossFobCurrencyCode,
              'XLTT (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.buyerGrossFobPrice,
              'XLTT (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.buyerGrossFobCurrencyCode,
              'XLTT (Diff of Price)': '-',
              'XLTT (Diff of Currency)': '-',
              'XLTT (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.netIncludingDisc,
              'XLTT (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.netIncludingDiscCurrencyCode,
              'XLTT (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.trConetIncludingDisc,
              'XLTT (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.trConetIncludingDiscCurrencyCode,
              'XLTT (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.legalPoPrice,
              'XLTT (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.legalPoCurrencyCode,
              'XLTT (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.coPrice,
              'XLTT (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.coPriceCurrencyCode,
              'XLTT (Diff of Legal PO & CO Price)': '-',
              'XLTT (Diff of legal Po & Co Currency)': '-',
              'XLTT (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.CRMCoQty,
              'XLTT (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.legalPoQty,
              'XLTT (Diff of Quantity)': '-',
              'XLTT (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'XLTT')?.sizeQty * 0.03).toFixed(0)) : '-',
              'XLTT (Actual Shipped Qty)': '-',
              'XLTT (Actual Ship %)': '-',
              '2XS (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.sizeQty,
              '2XS (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.grossFobPrice,
              '2XS (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.grossFobCurrencyCode,
              '2XS (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.buyerGrossFobPrice,
              '2XS (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.buyerGrossFobCurrencyCode,
              '2XS (Diff of Price)': '-',
              '2XS (Diff of Currency)': '-',
              '2XS (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.netIncludingDisc,
              '2XS (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.netIncludingDiscCurrencyCode,
              '2XS (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.trConetIncludingDisc,
              '2XS (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.trConetIncludingDiscCurrencyCode,
              '2XS (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.legalPoPrice,
              '2XS (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.legalPoCurrencyCode,
              '2XS (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.coPrice,
              '2XS (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.coPriceCurrencyCode,
              '2XS (Diff of Legal PO & CO Price)': '-',
              '2XS (Diff of legal Po & Co Currency)': '-',
              '2XS (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.CRMCoQty,
              '2XS (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.legalPoQty,
              '2XS (Diff of Quantity)': '-',
              '2XS (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '2XS')?.sizeQty * 0.03).toFixed(0)) : '-',
              '2XS (Actual Shipped Qty)': '-',
              '2XS (Actual Ship %)': '-',
              '4XL-T (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.sizeQty,
              '4XL-T (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.grossFobPrice,
              '4XL-T (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.grossFobCurrencyCode,
              '4XL-T (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.buyerGrossFobPrice,
              '4XL-T (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.buyerGrossFobCurrencyCode,
              '4XL-T (Diff of Price)': '-',
              '4XL-T (Diff of Currency)': '-',
              '4XL-T (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.netIncludingDisc,
              '4XL-T (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.netIncludingDiscCurrencyCode,
              '4XL-T (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.trConetIncludingDisc,
              '4XL-T (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.trConetIncludingDiscCurrencyCode,
              '4XL-T (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.legalPoPrice,
              '4XL-T (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.legalPoCurrencyCode,
              '4XL-T (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.coPrice,
              '4XL-T (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.coPriceCurrencyCode,
              '4XL-T (Diff of Legal PO & CO Price)': '-',
              '4XL-T (Diff of legal Po & Co Currency)': '-',
              '4XL-T (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.CRMCoQty,
              '4XL-T (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.legalPoQty,
              '4XL-T (Diff of Quantity)': '-',
              '4XL-T (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '4XL-T')?.sizeQty * 0.03).toFixed(0)) : '-',
              '4XL-T (Actual Shipped Qty)': '-',
              '4XL-T (Actual Ship %)': '-',
              '2XL-S (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.sizeQty,
              '2XL-S (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.grossFobPrice,
              '2XL-S (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.grossFobCurrencyCode,
              '2XL-S (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.buyerGrossFobPrice,
              '2XL-S (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.buyerGrossFobCurrencyCode,
              '2XL-S (Diff of Price)': '-',
              '2XL-S (Diff of Currency)': '-',
              '2XL-S (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.netIncludingDisc,
              '2XL-S (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.netIncludingDiscCurrencyCode,
              '2XL-S (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.trConetIncludingDisc,
              '2XL-S (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.trConetIncludingDiscCurrencyCode,
              '2XL-S (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.legalPoPrice,
              '2XL-S (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.legalPoCurrencyCode,
              '2XL-S (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.coPrice,
              '2XL-S (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.coPriceCurrencyCode,
              '2XL-S (Diff of Legal PO & CO Price)': '-',
              '2XL-S (Diff of legal Po & Co Currency)': '-',
              '2XL-S (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.CRMCoQty,
              '2XL-S (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.legalPoQty,
              '2XL-S (Diff of Quantity)': '-',
              '2XL-S (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '2XL-S')?.sizeQty * 0.03).toFixed(0)) : '-',
              '2XL-S (Actual Shipped Qty)': '-',
              '2XL-S (Actual Ship %)': '-',
              'MTT (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.sizeQty,
              'MTT (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.grossFobPrice,
              'MTT (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.grossFobCurrencyCode,
              'MTT (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.buyerGrossFobPrice,
              'MTT (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.buyerGrossFobCurrencyCode,
              'MTT (Diff of Price)': '-',
              'MTT (Diff of Currency)': '-',
              'MTT (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.netIncludingDisc,
              'MTT (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.netIncludingDiscCurrencyCode,
              'MTT (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.trConetIncludingDisc,
              'MTT (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.trConetIncludingDiscCurrencyCode,
              'MTT (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.legalPoPrice,
              'MTT (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.legalPoCurrencyCode,
              'MTT (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.coPrice,
              'MTT (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.coPriceCurrencyCode,
              'MTT (Diff of Legal PO & CO Price)': '-',
              'MTT (Diff of legal Po & Co Currency)': '-',
              'MTT (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.CRMCoQty,
              'MTT (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.legalPoQty,
              'MTT (Diff of Quantity)': '-',
              'MTT (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'MTT')?.sizeQty * 0.03).toFixed(0)) : '-',
              'MTT (Actual Shipped Qty)': '-',
              'MTT (Actual Ship %)': '-',
              '3XL-S (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.sizeQty,
              '3XL-S (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.grossFobPrice,
              '3XL-S (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.grossFobCurrencyCode,
              '3XL-S (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.buyerGrossFobPrice,
              '3XL-S (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.buyerGrossFobCurrencyCode,
              '3XL-S (Diff of Price)': '-',
              '3XL-S (Diff of Currency)': '-',
              '3XL-S (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.netIncludingDisc,
              '3XL-S (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.netIncludingDiscCurrencyCode,
              '3XL-S (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.trConetIncludingDisc,
              '3XL-S (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.trConetIncludingDiscCurrencyCode,
              '3XL-S (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.legalPoPrice,
              '3XL-S (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.legalPoCurrencyCode,
              '3XL-S (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.coPrice,
              '3XL-S (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.coPriceCurrencyCode,
              '3XL-S (Diff of Legal PO & CO Price)': '-',
              '3XL-S (Diff of legal Po & Co Currency)': '-',
              '3XL-S (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.CRMCoQty,
              '3XL-S (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.legalPoQty,
              '3XL-S (Diff of Quantity)': '-',
              '3XL-S (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '3XL-S')?.sizeQty * 0.03).toFixed(0)) : '-',
              '3XL-S (Actual Shipped Qty)': '-',
              '3XL-S (Actual Ship %)': '-',
              '4XL-S (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.sizeQty,
              '4XL-S (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.grossFobPrice,
              '4XL-S (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.grossFobCurrencyCode,
              '4XL-S (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.buyerGrossFobPrice,
              '4XL-S (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.buyerGrossFobCurrencyCode,
              '4XL-S (Diff of Price)': '-',
              '4XL-S (Diff of Currency)': '-',
              '4XL-S (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.netIncludingDisc,
              '4XL-S (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.netIncludingDiscCurrencyCode,
              '4XL-S (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.trConetIncludingDisc,
              '4XL-S (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.trConetIncludingDiscCurrencyCode,
              '4XL-S (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.legalPoPrice,
              '4XL-S (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.legalPoCurrencyCode,
              '4XL-S (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.coPrice,
              '4XL-S (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.coPriceCurrencyCode,
              '4XL-S (Diff of Legal PO & CO Price)': '-',
              '4XL-S (Diff of legal Po & Co Currency)': '-',
              '4XL-S (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.CRMCoQty,
              '4XL-S (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.legalPoQty,
              '4XL-S (Diff of Quantity)': '-',
              '4XL-S (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '4XL-S')?.sizeQty * 0.03).toFixed(0)) : '-',
              '4XL-S (Actual Shipped Qty)': '-',
              '4XL-S (Actual Ship %)': '-',
              '3XLTT (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.sizeQty,
              '3XLTT (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.grossFobPrice,
              '3XLTT (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.grossFobCurrencyCode,
              '3XLTT (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.buyerGrossFobPrice,
              '3XLTT (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.buyerGrossFobCurrencyCode,
              '3XLTT (Diff of Price)': '-',
              '3XLTT (Diff of Currency)': '-',
              '3XLTT (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.netIncludingDisc,
              '3XLTT (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.netIncludingDiscCurrencyCode,
              '3XLTT (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.trConetIncludingDisc,
              '3XLTT (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.trConetIncludingDiscCurrencyCode,
              '3XLTT (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.legalPoPrice,
              '3XLTT (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.legalPoCurrencyCode,
              '3XLTT (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.coPrice,
              '3XLTT (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.coPriceCurrencyCode,
              '3XLTT (Diff of Legal PO & CO Price)': '-',
              '3XLTT (Diff of legal Po & Co Currency)': '-',
              '3XLTT (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.CRMCoQty,
              '3XLTT (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.legalPoQty,
              '3XLTT (Diff of Quantity)': '-',
              '3XLTT (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === '3XLTT')?.sizeQty * 0.03).toFixed(0)) : '-',
              '3XLTT (Actual Shipped Qty)': '-',
              '3XLTT (Actual Ship %)': '-',
              'STT (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.sizeQty,
              'STT (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.grossFobPrice,
              'STT (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.grossFobCurrencyCode,
              'STT (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.buyerGrossFobPrice,
              'STT (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.buyerGrossFobCurrencyCode,
              'STT (Diff of Price)': '-',
              'STT (Diff of Currency)': '-',
              'STT (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.netIncludingDisc,
              'STT (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.netIncludingDiscCurrencyCode,
              'STT (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.trConetIncludingDisc,
              'STT (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.trConetIncludingDiscCurrencyCode,
              'STT (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.legalPoPrice,
              'STT (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.legalPoCurrencyCode,
              'STT (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.coPrice,
              'STT (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.coPriceCurrencyCode,
              'STT (Diff of Legal PO & CO Price)': '-',
              'STT (Diff of legal Po & Co Currency)': '-',
              'STT (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.CRMCoQty,
              'STT (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.legalPoQty,
              'STT (Diff of Quantity)': '-',
              'STT (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'STT')?.sizeQty * 0.03).toFixed(0)) : '-',
              'STT (Actual Shipped Qty)': '-',
              'STT (Actual Ship %)': '-',
              'L+ (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.sizeQty,
              'L+ (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.grossFobPrice,
              'L+ (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.grossFobCurrencyCode,
              'L+ (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.buyerGrossFobPrice,
              'L+ (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.buyerGrossFobCurrencyCode,
              'L+ (Diff of Price)': '-',
              'L+ (Diff of Currency)': '-',
              'L+ (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.netIncludingDisc,
              'L+ (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.netIncludingDiscCurrencyCode,
              'L+ (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.trConetIncludingDisc,
              'L+ (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.trConetIncludingDiscCurrencyCode,
              'L+ (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.legalPoPrice,
              'L+ (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.legalPoCurrencyCode,
              'L+ (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.coPrice,
              'L+ (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.coPriceCurrencyCode,
              'L+ (Diff of Legal PO & CO Price)': '-',
              'L+ (Diff of legal Po & Co Currency)': '-',
              'L+ (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.CRMCoQty,
              'L+ (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.legalPoQty,
              'L+ (Diff of Quantity)': '-',
              'L+ (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'L+')?.sizeQty * 0.03).toFixed(0)) : '-',
              'L+ (Actual Shipped Qty)': '-',
              'L+ (Actual Ship %)': '-',
              'M+ (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.sizeQty,
              'M+ (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.grossFobPrice,
              'M+ (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.grossFobCurrencyCode,
              'M+ (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.buyerGrossFobPrice,
              'M+ (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.buyerGrossFobCurrencyCode,
              'M+ (Diff of Price)': '-',
              'M+ (Diff of Currency)': '-',
              'M+ (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.netIncludingDisc,
              'M+ (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.netIncludingDiscCurrencyCode,
              'M+ (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.trConetIncludingDisc,
              'M+ (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.trConetIncludingDiscCurrencyCode,
              'M+ (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.legalPoPrice,
              'M+ (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.legalPoCurrencyCode,
              'M+ (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.coPrice,
              'M+ (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.coPriceCurrencyCode,
              'M+ (Diff of Legal PO & CO Price)': '-',
              'M+ (Diff of legal Po & Co Currency)': '-',
              'M+ (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.CRMCoQty,
              'M+ (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.legalPoQty,
              'M+ (Diff of Quantity)': '-',
              'M+ (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'M+')?.sizeQty * 0.03).toFixed(0)) : '-',
              'M+ (Actual Shipped Qty)': '-',
              'M+ (Actual Ship %)': '-',
              'S+ (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.sizeQty,
              'S+ (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.grossFobPrice,
              'S+ (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.grossFobCurrencyCode,
              'S+ (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.buyerGrossFobPrice,
              'S+ (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.buyerGrossFobCurrencyCode,
              'S+ (Diff of Price)': '-',
              'S+ (Diff of Currency)': '-',
              'S+ (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.netIncludingDisc,
              'S+ (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.netIncludingDiscCurrencyCode,
              'S+ (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.trConetIncludingDisc,
              'S+ (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.trConetIncludingDiscCurrencyCode,
              'S+ (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.legalPoPrice,
              'S+ (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.legalPoCurrencyCode,
              'S+ (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.coPrice,
              'S+ (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.coPriceCurrencyCode,
              'S+ (Diff of Legal PO & CO Price)': '-',
              'S+ (Diff of legal Po & Co Currency)': '-',
              'S+ (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.CRMCoQty,
              'S+ (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.legalPoQty,
              'S+ (Diff of Quantity)': '-',
              'S+ (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'S+')?.sizeQty * 0.03).toFixed(0)) : '-',
              'S+ (Actual Shipped Qty)': '-',
              'S+ (Actual Ship %)': '-',
              'XL+ (Quantity)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.sizeQty,
              'XL+ (Gross FOB or Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.grossFobPrice,
              'XL+ (Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.grossFobCurrencyCode,
              'XL+ (Buyer Confirmed Gross/FOB Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.buyerGrossFobPrice,
              'XL+ (Buyer Confirmed Gross/FOB Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.buyerGrossFobCurrencyCode,
              'XL+ (Diff of Price)': '-',
              'XL+ (Diff of Currency)': '-',
              'XL+ (Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.netIncludingDisc,
              'XL+ (Net including discounts currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.netIncludingDiscCurrencyCode,
              'XL+ (Trading Co Net including discounts)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.trConetIncludingDisc,
              'XL+ (Trading Co Net incl.disc currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.trConetIncludingDiscCurrencyCode,
              'XL+ (Legal PO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.legalPoPrice,
              'XL+ (Legal PO Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.legalPoCurrencyCode,
              'XL+ (CO Price)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.coPrice,
              'XL+ (CO Price Currency)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.coPriceCurrencyCode,
              'XL+ (Diff of Legal PO & CO Price)': '-',
              'XL+ (Diff of legal Po & Co Currency)': '-',
              'XL+ (CO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.CRMCoQty,
              'XL+ (Legal PO Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.legalPoQty,
              'XL+ (Diff of Quantity)': '-',
              'XL+ (Allowed Excess Ship Qty)': item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.sizeQty ? ((item.shippingType === 'DIRECT') ? 0 : (item.sizeWiseData.find(i => i.sizeDescription === 'XL+')?.sizeQty * 0.03).toFixed(0)) : '-',
              'XL+ (Actual Shipped Qty)': '-',
              'XL+ (Actual Ship %)': '-',
              'VAS-Size': item.VASSize,
              'Item Vas Text': item.itemVasText,
              'Item Vas Text in PDF PO': item.itemVasTextPDF,
              'Diff of Item Vas Text': '-',
              'Item Text': item.itemText,
              'Hanger Po': item.hanger,
              'Change Register': item.displayName
            });
          });
          setcsvData(csvdata);
        } else {
          setGridData([]);
          setFilterData([]);
          setFilteredData([]);
        }
      })
      .catch(err => {
      }).finally(() => {
        setTableLoading(false)
      });
  };

  // const handleExport = (e: any) => {
  //   e.preventDefault();
  //   const currentDate = new Date()
  //     .toISOString()
  //     .slice(0, 10)
  //     .split("-")
  //     .join("/");

  //   const excel = new Excel();
  //   excel.addSheet("Sheet1");
  //   excel.addRow();
  //   excel.addColumns(exportingColumns);
  //   excel.addDataSource(gridData);
  //   excel.saveAs(`ppm-report-${currentDate}.xlsx`);
  // }

  const handleExport = () => {

  }

  const totalItemQty = gridData?.map(i => i.totalItemQty)
  const count = totalItemQty.reduce((acc, val) => acc + Number(val), 0);

  const onReset = () => {
    form.resetFields()
    getData()
  }

  const toggleHideChildren = () => {
    setHideChildren(!hideChildren);
    // getData()
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : false,
    onFilterDropdownVisibleChange: visible => {
      if (visible) { setTimeout(() => searchInput.current.select()); }
    },
    render: text =>
      text ? (
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : text
      )
        : null
  });

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    window.location.reload();

  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };

  const getFactoryCellStyle = (text) => {
    if (!text || text.trim() === '') {
      return { backgroundColor: '' };
    }
    return {};
  };

  const getSizeWiseHeaders = (data: MarketingReportModel[]) => {
    const sizeHeaders = new Set<string>();
    data?.forEach(rec => rec.sizeWiseData?.forEach(version => {
      sizeHeaders.add('' + version.sizeDescription);
    }))
    return Array.from(sizeHeaders);
  };

  const getMap = (data: MarketingReportModel[]) => {
    const sizeWiseMap = new Map<string, Map<string, MarketingReportSizeModel>>();
    // po => size => obj
    data?.forEach(rec => {
      if (!sizeWiseMap.has(rec.poAndLine)) {
        sizeWiseMap.set(rec.poAndLine, new Map<string, MarketingReportSizeModel>());
      }
      rec.sizeWiseData?.forEach(size => {
        sizeWiseMap.get(rec.poAndLine).set(size.sizeDescription, size);
      })
    });
    return sizeWiseMap;
  }
  let isOdd = false;

  const handleTextClick = (remarks) => {
    setRemarks(remarks)
    setRemarkModal(true)
  }
  const onRemarksModalOk = () => {
    setRemarkModal(false)
  }

  // function generateClassName(index) {
  //   isOdd = !isOdd; 
  //   return isOdd ? 'odd-version' version';
  // }

  // const summaryColumns: CustomColumn<any>[] = [
  //   { title: 'Po+Line ', dataIndex: 'poAndLine', key: 'poAndLine', isDefaultSelect: true },
  //   { title: 'Last Modified Date', dataIndex: 'lastModifiedDate', key: 'lastModifiedDate', isDefaultSelect: true },
  //   { title: 'Item', dataIndex: 'item', key: 'item', isDefaultSelect: true },
  //   { title: 'Factory', dataIndex: 'Factory', key: 'Factory', isDefaultSelect: true },
  //   { title: 'PCD', dataIndex: 'PCD', key: 'PCD', isDefaultSelect: true },
  //   { title: 'Document Date', dataIndex: 'documentDate', key: 'documentDate', isDefaultSelect: true },
  //   { title: 'Purchase Order Number', dataIndex: 'purchase Order Number', key: 'Purchase Order Number', isDefaultSelect: true },
  //   { title: 'PO Line Item Number', dataIndex: 'poLineItemNumber', key: 'poLineItemNumber', isDefaultSelect: true },
  //   { title: 'DPOM Line Item Status', dataIndex: 'DPOMLineItemStatus', key: 'DPOMLineItemStatus', isDefaultSelect: true },
  //   { title: 'DocType', dataIndex: 'docTypeCode', key: 'deocTypeCode', isDefaultSelect: true },
  //   { title: 'DocType Description', dataIndex: 'docTypeDesc', key: 'deocTypeDesc', isDefaultSelect: true },
  //   { title: 'Style Number', dataIndex: 'styleNumber', key: 'styleNumber', isDefaultSelect: true },
  //   { title: 'Product Code', dataIndex: 'productCode', key: 'productCode', isDefaultSelect: true },
  //   { title: 'Colour Description', dataIndex: 'colorDesc', key: 'colorDesc', isDefaultSelect: true },
  //   { title: 'Description With Fabric Content', dataIndex: 'fabricContent', key: 'fabricContent', isDefaultSelect: true },
  //   { title: 'Fabric Content as Per Washcare Label', dataIndex: '', key: 'fabricContentAsPer', isDefaultSelect: true },
  //   { title: 'Planning Season Code', dataIndex: 'planningSeasonCode', key: 'planningSeasonCode', isDefaultSelect: true },
  //   { title: 'Planning Season Year', dataIndex: 'planningSeasonYear', key: 'planningSeasonYear', isDefaultSelect: true },
  //   { title: 'Co', dataIndex: 'customerOrder', key: 'customerOrder', isDefaultSelect: true },
  //   { title: 'CO Final Approval Date', dataIndex: 'coFinalApprovalDate', key: 'coFinalApprovalDate', isDefaultSelect: true },
  //   { title: 'Plan No', dataIndex: 'planNo', key: 'planNo', isDefaultSelect: true },
  //   { title: 'Lead Time', dataIndex: 'leadTime', key: 'leadTime', isDefaultSelect: true },
  //   { title: 'Category', dataIndex: 'categoryCode', key: 'categoryCode', isDefaultSelect: true },
  //   { title: 'Category Description', dataIndex: 'categoryDesc', key: 'categoryDesc', isDefaultSelect: true },
  //   { title: 'Vendor Code', dataIndex: 'vendorCode', key: 'vendorCode', isDefaultSelect: true },
  //   { title: 'Global Category Core Focus', dataIndex: 'gccFocusCode', key: 'gccFocusCode', isDefaultSelect: true },
  //   { title: 'Global Category Core Focus Description', dataIndex: 'gccFocusDesc', key: 'gccFocusDesc', isDefaultSelect: true },
  //   { title: 'Gender Age', dataIndex: 'genderAgeCode', key: 'genderAgeCode', isDefaultSelect: false },
  //   { title: 'Gender Age Description', dataIndex: 'genderAgeDesc', key: 'genderAgeDesc', isDefaultSelect: false },
  //   { title: 'Destination Country Code', dataIndex: 'destinationCountryCode', key: 'destinationCountryCode', isDefaultSelect: false },
  //   { title: 'Destination Country Name', dataIndex: 'destinationCountry', key: 'destinationCountry', isDefaultSelect: false },
  //   { title: 'Geo Code', dataIndex: 'geoCode', key: 'geoCode', isDefaultSelect: false },
  //   { title: 'Plant Code', dataIndex: 'plant', key: 'plant', isDefaultSelect: false },
  //   { title: 'plant Name', dataIndex: 'plantName', key: 'plantName', isDefaultSelect: false },
  //   { title: 'UPC', dataIndex: 'UPC', key: 'UPC', isDefaultSelect: false },
  //   { title: 'Sales Order Number', dataIndex: 'directShipSONumber', key: 'directShipSONumber', isDefaultSelect: false },
  //   { title: 'Sales Order Item Number', dataIndex: 'directShipSOItemNumber', key: 'directShipSOItemNumber', isDefaultSelect: false },
  //   { title: 'Customer PO', dataIndex: 'customerPO', key: 'customerPO', isDefaultSelect: false },
  //   { title: 'Ship To Customer Number', dataIndex: 'shipToCustomerNumber', key: 'shipToCustomerNumber', isDefaultSelect: false },
  //   { title: 'Ship To Customer Name', dataIndex: 'shipToCustomerName', key: 'shipToCustomerName', isDefaultSelect: false },
  //   { title: 'Ship to Address Legal PO', dataIndex: 'shipToAddressLegalPO', key: 'shipToAddressLegalPO', isDefaultSelect: false },
  //   { title: 'Ship to Address DIA', dataIndex: 'shipToAddressDIA', key: 'shipToAddressDIA', isDefaultSelect: false },
  //   {
  //     title: 'Diff of Ship to Address', dataIndex: '', key: 'diffOfShipToAddress', isDefaultSelect: false,
  //     render: (text, record) => {
  //       const lines1 = (record.shipToAddressLegalPO)?.trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
  //       const text1 = lines1?.join('');

  //       const lines2 = (record.shipToAddressDIA)?.trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
  //       const text2 = lines2?.join('');
  //       if (text1 == null && text2 == null) {
  //         return '-'
  //       } else {
  //         const dmp = new DiffMatchPatch();
  //         const diff = dmp.diff_main(text1, text2);
  //         dmp.diff_cleanupSemantic(diff);

  //         let output = '';
  //         for (const [op, text] of diff) {
  //           if (op === DiffMatchPatch.DIFF_INSERT) {
  //             if (text.trim() !== '') {
  //               output += `${text} `;
  //             }
  //           } else if (op === DiffMatchPatch.DIFF_DELETE) {
  //             if (text.trim() !== '') {
  //               output += `${text} `;
  //             }
  //           }
  //         }
  //         return output.trim()
  //       }
  //     },
  //   },
  //   { title: 'CAB Code', dataIndex: 'CABCode', key: 'CABCode', isDefaultSelect: false },
  //   { title: 'Final Destination', dataIndex: '', key: 'FinalDestination', isDefaultSelect: false },
  //   { title: 'MRGAC', dataIndex: 'MRGAC', key: 'MRGAC', isDefaultSelect: false },
  //   { title: 'OGAC', dataIndex: 'OGAC', key: 'OGAC', isDefaultSelect: false },
  //   { title: 'GAC', dataIndex: 'GAC', key: 'GAC', isDefaultSelect: false },
  //   { title: 'GAC Reason Code', dataIndex: 'GACReasonCode', key: 'GACReasonCode', isDefaultSelect: false },
  //   { title: 'GAC Reason Description', dataIndex: 'GACReasonDesc', key: 'GACReasonDescription', isDefaultSelect: false },
  //   { title: 'Truck Out Date', dataIndex: 'truckOutDate', key: 'truckOutDate', isDefaultSelect: false },
  //   { title: 'Origin Receipt Date', dataIndex: 'originReceiptDate', key: 'originReceiptDate', isDefaultSelect: false },
  //   { title: 'Factory Delivery Actual Date', dataIndex: 'factoryDeliveryActDate', key: 'factoryDeliveryActDate', isDefaultSelect: false },
  //   { title: 'Shipping Type', dataIndex: 'shippingType', key: 'shippingType', isDefaultSelect: false },
  //   { title: 'Planning Priority Number', dataIndex: 'planningPriorityCode', key: 'planningPriorityCode', isDefaultSelect: false },
  //   { title: 'Planning Priority Description', dataIndex: 'planningPriorityDesc', key: 'planningPriorityDescription', isDefaultSelect: false },
  //   { title: 'Launch Code', dataIndex: '"launchCode', key: 'launchCode', isDefaultSelect: false },
  //   { title: 'Mode of Transportation', dataIndex: 'modeOfTransportationCode', key: 'modeOfTransportationCode', isDefaultSelect: false },
  //   { title: 'In Co Terms', dataIndex: 'inCoTerms', key: 'inCoTerms', isDefaultSelect: false },
  //   { title: 'Inventory Segment Code', dataIndex: 'inventorySegmentCode', key: 'inventorySegmentCode', isDefaultSelect: false },
  //   { title: 'Purchase Group', dataIndex: 'purchaseGroupCode', key: 'purchaseGroupCode', isDefaultSelect: false },
  //   { title: 'Purchase Group Name', dataIndex: 'purchaseGroupName', key: 'purchaseGroupName', isDefaultSelect: false },
  //   { title: 'Total Item Quantity', dataIndex: 'totalItemQty', key: 'totalItemQty', isDefaultSelect: false },
  // ]

  const renderReport = (data: MarketingReportModel[]) => {
    const sizeHeaders = getSizeWiseHeaders(data);
    const sizeWiseMap = getMap(data);



    const columns: any = [
      // {
      //   title: "S.No",
      //   render: (_text: any, record: any, index: number) => <span>{index + 1}</span>
      // },
      {
        title: "Po+Line",
        dataIndex: 'poAndLine',
        fixed: 'left',
        render: (text, record) => {
          return <>
            <Button type='link' onClick={() => { showModal1(record) }}>{record.poAndLine}</Button>
          </>
        }
      },
      {
        title: 'Last Modified Date',
        dataIndex: 'lastModifiedDate',
      },
      {
        title: 'Item',
        dataIndex: 'item',
        width: 70, align: 'center',
      },
      {
        title: 'Factory',
        dataIndex: 'factory',
        width: 70,
        align: 'center',
      },
      {
        title: 'Edit Unit Allocation',
        dataIndex: '', width: 70,
        align: "center",
        render: (text, rowData) => (
          <span>
            <Form.Item>
              <Checkbox
                onChange={() => handleCheckboxChange('ActualUnit', rowData.poAndLine)}
                checked={expandedActualUnit[rowData.poAndLine] || false}
              />
            </Form.Item>
          </span>
        ),
      },
      {
        title: 'Actual Unit',
        dataIndex: 'actualUnit',
        align: 'center', width: 160,
        render: (text, rowData) => (
          <div>
            {expandedActualUnit[rowData.poAndLine] ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                  name='actualUnit'
                  allowClear
                  style={{ marginRight: '10px' }}
                  placeholder={rowData.actualUnit ? rowData.actualUnit : "Enter text"}
                  value={textareaValuesActualUnit[rowData.poAndLine] || ''}
                  onChange={(e) =>
                    handleTextareaChange('ActualUnit', rowData.poAndLine, e.target.value)
                  }
                />
                <Button
                  type="primary"
                  onClick={() => {
                    updateColumns(rowData.poAndLine, textareaValuesActualUnit[rowData.poAndLine], '');
                    handleCheckboxChange('ActualUnit', rowData.poAndLine);
                    handleTextareaChange('ActualUnit', rowData.poAndLine, '');
                  }}
                >
                  Submit
                </Button>
              </div>
            ) : rowData.actualUnit}
          </div>
        ),

      },
      // {
      //   title: 'Actual Unit',
      //   dataIndex: 'actualUnit',
      //   width: 70,
      //   align: 'center',
      //   render: (text, record) => {
      //     if (!text || text.trim() === '') {
      //       return '-';
      //     } else {
      //       return text;
      //     }
      //   }
      // },
      {
        title: 'PCD',
        dataIndex: 'PCD',
        width: 70,
      },
      {
        title: 'Document Date',
        dataIndex: 'documentDate',
      },
      {
        title: 'Purchase Order Number',
        dataIndex: 'purchaseOrderNumber', width: 80,
        ...getColumnSearchProps('purchaseOrderNumber')
      },
      {
        title: 'PO Line Item Number',
        dataIndex: 'poLineItemNumber', align: 'center',
        width: 80,
      },
      {
        title: 'Trading Co PO Number',
        dataIndex: 'tradingCoPoNumber',
        width: 80
      },
      {
        title: 'DPOM Line Item Status',
        dataIndex: 'DPOMLineItemStatus', width: 80,
      },
      {
        title: 'Doc Type',
        dataIndex: 'docTypeCode', width: 80,

      },
      {
        title: 'Doc Type Description',
        dataIndex: 'docTypeDesc', width: 80,

      },
      {
        title: 'Style Number',
        dataIndex: 'styleNumber', width: 80,
      },
      {
        title: 'Product Code',
        dataIndex: 'productCode', width: 80,
      },
      {
        title: 'Colour Description',
        dataIndex: 'colorDesc', width: 80,
      },
      {
        title: 'Description With Fabric Content',
        dataIndex: 'fabricContent', width: 85,
      },
      {
        title: 'Fabric Content as Per Washcare Label',
        dataIndex: '', width: 80,
      },
      {
        title: 'Planning Season Code',
        dataIndex: 'planningSeasonCode', width: 80,
      },
      {
        title: 'Planning Season Year',
        dataIndex: 'planningSeasonYear', width: 80, align: 'center',
        // render: (text, record) => {
        //   if (!text || text.trim() === '') {
        //     return '-';
        //   } else {
        //     return text;
        //   }
        // }

      },
      {
        title: 'CO',
        dataIndex: 'customerOrder', width: 80,
      },
      {
        title: 'CO Final Approval Date',
        dataIndex: 'coFinalApprovalDate',
        className: "right-column", width: 80,
      },
      {
        title: 'Plan No',
        dataIndex: 'planNo', width: 80, align: 'center',
      },
      {
        title: 'Lead Time',
        dataIndex: 'leadTime',
        width: 80, align: 'left',
        render: (text) => {
          if (!isNaN(parseFloat(text))) {
            // If it's a valid number, render it
            return Math.abs(text); // You can format it as needed
          } else {
            return '-'; // Or any other desired text
          }
        }
      },
      {
        title: 'Category',
        dataIndex: 'categoryCode', width: 80, align: 'center'
      },
      {
        title: 'Category Description',
        dataIndex: 'categoryDesc', width: 80,
      },
      {
        title: 'Vendor Code',
        dataIndex: 'vendorCode', width: 80, align: 'center'
      },
      {
        title: 'Global Category Core Focus',
        dataIndex: 'gccFocusCode', width: 80, align: 'center'
      },
      {
        title: 'Global Category Core Focus Description',
        dataIndex: 'gccFocusDesc', width: 80,
      },
      {
        title: 'Gender Age',
        dataIndex: 'genderAgeCode',
        className: 'centered-column', width: 80,
      },
      {
        title: 'Gender Age Description',
        dataIndex: 'genderAgeDesc', width: 80,
      },
      {
        title: "Destination Country Code",
        dataIndex: 'destinationCountryCode', width: 80, align: 'center'
      },
      {
        title: "Destination Country Name ",
        dataIndex: 'destinationCountry', width: 80,
      },
      { title: 'Geo Code', dataIndex: 'geoCode', width: 80, align: 'center' },
      {
        title: "Plant Code",
        dataIndex: 'plant', width: 80, align: 'center'
      },
      {
        title: "Plant Name",
        dataIndex: 'plantName', width: 80,
      },
      {
        title: 'UPC',
        dataIndex: 'UPC', width: 80,
      },
      {
        title: 'Sales Order Number',
        dataIndex: '', width: 80,
      },
      {
        title: 'Sales Order Item Number',
        dataIndex: '', width: 80,
      },
      {
        title: 'Customer PO',
        dataIndex: 'customerPO',
        width: 80,
      },
      {
        title: 'Ship To Customer Number',
        dataIndex: 'shipToCustomerNumber', width: 80,
        align: 'center',
      },
      {
        title: 'Ship To Customer Name',
        dataIndex: 'shipToCustomerName', width: 80,
        align: 'center',
        // render: (text, record) => {
        //   if (!text || text.trim() === '') {
        //     return '-';
        //   } else {
        //     return text;
        //   }
        // },
      },
      {
        title: 'Ship to Address Legal PO',
        dataIndex: 'shipToAddressLegalPO', width: 150,
        align: 'center',
        // render: (text, record) => {
        //   if (!text || text.trim() === '') {
        //     return '-';
        //   } else {
        //     return text;
        //   }
        // },
      },
      {
        title: 'Ship to Address DIA',
        dataIndex: 'shipToAddressDIA', width: 150,
        align: 'center',
        // render: (text, record) => {
        //   if (!text || text.trim() === '') {
        //     return '-';
        //   } else {
        //     return text;
        //   }
        // },
      },
      {
        title: 'Diff of Ship to Address',
        dataIndex: '', width: 80,
        align: 'center',
        render: (text, record) => {
          const text1 = record.shipToAddressLegalPO
          const text2 = record.shipToAddressDIA
          if (text1 == null && text2 == null) {
            return '-';
          } else if (text1 == null) {
            return text2
          } else if (text2 == null) {
            return text1
          } else {
            const normalizeText = (text) => text.toLowerCase().replace(/\s/g, '');
            const normalizedText1 = normalizeText(text1);
            const normalizedText2 = normalizeText(text2);
            const differences = diffChars(normalizedText1, normalizedText2);
            // Map the differences to display added and removed parts
            const result = differences
              .filter((part) => part.added || part.removed)
              .map((part, index) => {
                const style = part.added ? { backgroundColor: 'lightgreen' } : { backgroundColor: 'lightcoral' };
                return (
                  <span key={index} style={style}>
                    {part.value}
                  </span>
                );
              });
            return result;
          }
        },
      },
      {
        title: "CAB Code",
        dataIndex: 'CABCode', width: 80,
      },
      {
        title: 'Final Destination',
        dataIndex: '', width: 80,
      },
      {
        title: "MRGAC", width: 80,
        dataIndex: 'MRGAC',
      },
      {
        title: 'OGAC', dataIndex: 'OGAC', width: 80,
      },
      {
        title: 'GAC', dataIndex: 'GAC', width: 80
      },
      {
        title: 'GAC Reason Code', width: 80, dataIndex: 'GACReasonCode', align: 'center'
      },
      {
        title: 'GAC Reason Description', width: 80, dataIndex: 'GACReasonDesc'
      },
      {
        title: 'Truck Out Date', dataIndex: 'truckOutDate', width: 80
      },
      {
        title: 'Origin Receipt Date', dataIndex: 'originReceiptDate', width: 80
      },
      {
        title: 'Factory Delivery Actual Date', dataIndex: 'factoryDeliveryActDate', width: 80
      },
      {
        title: 'Shipping Type',
        dataIndex: 'shippingType', width: 80,
        // render: (text) => {
        //   // Replace underscores (_) with spaces
        //   const transformedText = text ? text.replace(/_/g, ' ') : '-';
        //   return transformedText;
        // },
      },
      {
        title: 'Planning Priority Number', width: 80, dataIndex: 'planningPriorityCode', align: 'center', className: 'centered-column',
        // render: (text, record) => {
        //   if (!text || text.trim() === '') {
        //     return '-';
        //   } else {
        //     return text;
        //   }
        // },
      },
      {
        title: 'Planning Priority Description', width: 80, dataIndex: 'planningPriorityDesc',
        // render: (text, record) => {
        //   if (!text || text.trim() === '') {
        //     return '-';
        //   } else {
        //     return text;
        //   }
        // },
      },
      {
        title: 'Launch Code', dataIndex: 'launchCode', width: 80,
        // render: (text, record) => {
        //   if (!text || text.trim() === '') {
        //     return '-';
        //   } else {
        //     return text;
        //   }
        // },
      },
      { title: 'Mode Of Transportation', dataIndex: 'modeOfTransportationCode', width: 90, },
      { title: 'In Co Terms', dataIndex: 'inCoTerms', width: 80, },
      { title: 'Inventory Segment Code', dataIndex: 'inventorySegmentCode', align: 'center', width: 80, },
      { title: 'Purchase Group', dataIndex: 'purchaseGroupCode', align: 'center', className: 'centered-column', width: 80, },
      { title: 'Purchase Group Name', dataIndex: 'purchaseGroupName', width: 80, },
      {
        title: 'Total Item Qty',
        dataIndex: 'totalItemQty', width: 80,
        align: 'right',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return <strong>{Number(text).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</strong>;
          }
        },
      },
    ]

    sizeHeaders?.forEach(version => {
      isOdd = !isOdd;
      const sizeClass = isOdd ? 'odd-version' : 'even-version';
      if (hideChildren) {
        columns.push({
          title: (
            <div
              style={{
                backgroundColor: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                height: 40, justifyContent: 'center', padding: '1px', color: 'white',
              }}
            >
              {version}
            </div>
          ),
          dataIndex: version,
          key: version,
          // width: 130,
          align: 'center',
          className: sizeClass,
          children: [
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Quantity</div>
              ),
              dataIndex: '',
              key: '',
              width: 60,
              align: 'right',
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.sizeQty
                // const formattedQty = Number(sizeData).toLocaleString('en-IN', { maximumFractionDigits: 0 });
                return sizeData ? sizeData : '-';
              }
            },
          ]
        })
      } else {
        columns.push({
          title: (
            <div
              style={{
                backgroundColor: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                height: 40, justifyContent: 'center', padding: '1px', color: 'white',
              }}
            >
              {version}
            </div>
          ),
          dataIndex: version,
          key: version,
          // width: 130,
          align: 'center',
          className: sizeClass,
          children: [
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Quantity</div>
              ),
              dataIndex: '',
              key: '',
              width: 60,
              align: 'right',
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.sizeQty
                // const formattedQty = Number(sizeData).toLocaleString('en-IN', { maximumFractionDigits: 0 });
                return sizeData ? sizeData : '-';
              }
            },
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Gross FOB or Price</div>
              ),
              dataIndex: 'grossFobPrice',
              width: 70,
              align: 'right',
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.grossFobPrice;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Gross/FOB Currency </div>
              ),
              dataIndex: 'grossFobCurrencyCode',
              width: 70,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.grossFobCurrencyCode;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Buyer Confirmed Gross/FOB Price </div>
              ),
              dataIndex: 'buyerGrossFobPrice',
              align: 'right',
              width: 70,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.buyerGrossFobPrice;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Buyer Confirmed Gross/FOB Currency </div>
              ),
              dataIndex: 'buyerGrossFobCurrencyCode',
              align: 'right', width: 90,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.buyerGrossFobCurrencyCode;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '1px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Diff of Price</div>
              ),
              dataIndex: '',
              align: 'center',
              width: 50,
              render: (text, record) => {
                const shprice = sizeWiseMap?.get(record.poAndLine)?.get(version)?.grossFobPrice;
                const buyerprice = sizeWiseMap?.get(record.poAndLine)?.get(version)?.buyerGrossFobPrice;

                if (isNaN(shprice) || isNaN(buyerprice)) {
                  return '-';
                } else {
                  let diff = Number(shprice) - Number(buyerprice);
                  return (diff).toFixed(2);
                }
              }
            },
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Diff of Currency</div>
              ),
              dataIndex: '',
              width: 90,
              render: (text, record) => {
                const currency1 = sizeWiseMap?.get(record.poAndLine)?.get(version)?.grossFobCurrencyCode;
                const currency2 = sizeWiseMap?.get(record.poAndLine)?.get(version)?.buyerGrossFobCurrencyCode;
                // Using the equality operator (strict equality)
                const areEqual = currency1 === currency2;
                if (areEqual) {
                  return '-'
                } else {
                  return 'Different'
                }
              }
            },
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Net including discounts</div>
              ),
              dataIndex: 'netIncludingDisc',
              align: 'center',
              width: 70,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.netIncludingDisc;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Net including discounts currency</div>
              ),
              dataIndex: 'netIncludingDiscCurrencyCode',
              width: 70,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.netIncludingDiscCurrencyCode;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Trading Co Net including discounts</div>
              ),
              dataIndex: 'trConetIncludingDisc',
              align: 'right',
              width: 70,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.trConetIncludingDisc;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (<div
                style={{
                  background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                  height: 130, justifyContent: 'center', color: 'Black',
                }}
              >Trading Co Net incl.disc currency</div>
              ),
              dataIndex: 'trConetIncludingDiscCurrencyCode',
              className: sizeClass ? 'odd-version' : 'even-version',
              width: 70,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.trConetIncludingDiscCurrencyCode;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px',
                    display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Legal PO Price</div>
              ),
              dataIndex: 'legalPoPrice',
              align: 'right',
              width: 60,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.legalPoPrice;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Legal PO currency</div>
              ),
              dataIndex: 'legalPoCurrencyCode',
              width: 60,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.legalPoCurrencyCode;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    backgroundColor: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >CO Price</div>
              ),
              dataIndex: 'coPrice',
              align: 'right',
              width: 60,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.coPrice;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    backgroundColor: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >CO currency</div>
              ),
              dataIndex: 'coPriceCurrencyCode',
              width: 65,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.coPriceCurrencyCode;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    backgroundColor: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Diff of legal Po,Co Price</div>
              ),
              dataIndex: '',
              align: 'center',
              width: 70,
              render: (text, record) => {
                const poCurrency = sizeWiseMap?.get(record.poAndLine)?.get(version)?.legalPoCurrencyCode;
                const coCurrency = sizeWiseMap?.get(record.poAndLine)?.get(version)?.coPriceCurrencyCode;
                // let diff = Number(Poprice) - Number(coprice)
                if (poCurrency && coCurrency !== null) {
                  return poCurrency + ' ' + coCurrency
                }
                else {
                  return "-"
                }
              }
            },
            {
              title: (
                <div
                  style={{
                    backgroundColor: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Diff of legal Po,Co Currency</div>
              ),
              dataIndex: '',
              align: 'center',
              width: 70,
              render: (text, record) => {
                const currency1 = sizeWiseMap?.get(record.poAndLine)?.get(version)?.legalPoCurrencyCode;
                const currency2 = sizeWiseMap?.get(record.poAndLine)?.get(version)?.coPriceCurrencyCode;
                // Using the equality operator (strict equality)
                const areEqual = currency1 === currency2;
                if (areEqual) {
                  return '-'
                } else {
                  return 'Different'
                }
              }
            },
            {
              title: (
                <div
                  style={{
                    backgroundColor: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >CRM CO QTY</div>
              ),
              dataIndex: 'CRMCoQty',
              width: 60, align: 'right',
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.CRMCoQty;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    backgroundColor: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Legal PO QTY</div>
              ),
              dataIndex: 'legalPoQty',
              align: 'right',
              width: 60,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.legalPoQty;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    backgroundColor: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Diff of Quantity</div>
              ),
              dataIndex: '',
              align: 'right',
              width: 60,
              render: (text, record) => {
                const PoQty = sizeWiseMap?.get(record.poAndLine)?.get(version)?.legalPoQty;
                const coQty = sizeWiseMap?.get(record.poAndLine)?.get(version)?.CRMCoQty;
                let diff = Number(PoQty) - Number(coQty)
                if (Number(PoQty) && Number(coQty) !== null) {
                  return diff
                }
                else {
                  return "-"
                }
              }
            },
            {
              title: (
                <div
                  style={{
                    backgroundColor: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Allowed Excess Ship Qty</div>
              ),
              dataIndex: '',
              align: 'right',
              width: 70,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.sizeQty;
                if (record.sizeQty === null || isNaN(sizeData)) {
                  return '-';
                } else {
                  if (record.shippingType === 'DIRECT') {
                    return 0;
                  } else {
                    const result = 0.03 * sizeData;
                    return result.toFixed(0);
                  }
                }
              }
            },
            {
              title: (
                <div
                  style={{
                    backgroundColor: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Actual Shipped Qty</div>
              ),
              dataIndex: 'actualShippedQty',
              align: 'right',
              width: 70,
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.actualShippedQty;
                return sizeData ? sizeData : '-'
              }
            },
            {
              title: (
                <div
                  style={{
                    backgroundColor: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ',
                    borderRadius: '2px', display: 'flex', alignItems: 'center',
                    height: 130, justifyContent: 'center', color: 'Black',
                  }}
                >Actual Ship %</div>
              ),
              align: 'right',
              width: 70,
              dataIndex: '',
              render: (text, record) => {
                const sizeData = sizeWiseMap?.get(record.poAndLine)?.get(version)?.grossFobPrice;
                return sizeData ? sizeData : '-'
              }
            },
          ],
        });
      }
      // summaryColumns.push({
      //   title: version,
      //   dataIndex: '',
      //   width: 130,
      //   align: 'center',
      //   children: [
      //     {
      //       title: 'Quantity',
      //       dataIndex: '',
      //       align: 'right',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             const formattedQty = Number(sizeData.sizeQty).toLocaleString('en-IN', { maximumFractionDigits: 0 });
      //             return (
      //               formattedQty
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Gross/FOB Price',
      //       dataIndex: 'grossFobPrice',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.grossFobPrice
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Gross/FOB currency ',
      //       dataIndex: 'grossFobCurrencyCode',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.grossFobCurrencyCode
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Buyer Confirmed Gross/FOB Price',
      //       dataIndex: 'buyerGrossFobPrice',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.buyerGrossFobPrice
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Buyer Confirmed Gross/FOB Currency',
      //       dataIndex: 'buyerGrossFobCurrencyCode',

      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.buyerGrossFobCurrencyCode
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Diff of Price',
      //       dataIndex: '',
      //     },
      //     {
      //       title: 'Diff of Price Currency',
      //       dataIndex: '',
      //     },
      //     {
      //       title: 'Net including discounts',
      //       dataIndex: 'netIncludingDisc',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.netIncludingDisc
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Net including discounts Currency ',
      //       dataIndex: 'netIncludingDiscCurrencyCode',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.netIncludingDiscCurrencyCode
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Trading Co Net including discounts',
      //       dataIndex: 'trConetIncludingDisc',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.trConetIncludingDisc
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Trading Co Net including discounts currency',
      //       dataIndex: 'trConetIncludingDiscCurrencyCode',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.trConetIncludingDiscCurrencyCode
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Legal PO Price',
      //       dataIndex: 'legalPoPrice',
      //       width: 60,
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.legalPoPrice
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Legal PO currency',
      //       dataIndex: 'legalPoCurrencyCode',
      //       width: 60,
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.legalPoCurrencyCode
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'CO Price',
      //       dataIndex: 'coPrice',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.coPrice
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'CO Price currency',
      //       dataIndex: 'coPriceCurrencyCode',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.coPriceCurrencyCode
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Diff of Price',
      //       dataIndex: '',
      //     },
      //     {
      //       title: 'Diff of Price currency',
      //       dataIndex: '',
      //     },
      //     {
      //       title: 'CRM CO QTY',
      //       dataIndex: 'CRMCoQty',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.CRMCoQty
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Legal PO QTY',
      //       dataIndex: 'legalPoQty',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.legalPoQty
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Diff of Quantity',
      //       dataIndex: '',
      //     },
      //     {
      //       title: 'Allowed Excess Ship Qty',
      //       dataIndex: '',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             if (record.shippingType === 'DIRECT') {
      //               return (
      //                 '0'
      //               );
      //             } else {
      //               const sizeQty = sizeData.sizeQty;
      //               const result = 0.03 * sizeQty;
      //               return (
      //                 result.toFixed(3)
      //               );
      //             }
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Actual Shipped Qty',
      //       dataIndex: 'actualShippedQty',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.actualShippedQty
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //     {
      //       title: 'Actual Ship %',
      //       dataIndex: '',
      //       render: (text, record) => {
      //         const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

      //         if (sizeData) {
      //           if (sizeData.sizeQty !== null) {
      //             return (
      //               sizeData.grossFobPrice
      //             );
      //           } else {
      //             return (
      //               '-'
      //             );
      //           }
      //         } else {
      //           return '-';
      //         }
      //       }
      //     },
      //   ],
      // });
    });

    const getRowClassName = (record) => {
      let classNames = '';

      if (record.displayName) {
        classNames += 'colored-row ';
      }

      if (!record.factory || !record.item) {
        classNames += 'colored-factory-empty-row ';
      } else if (record.factory.includes("_")) {
        classNames += 'colored-row-withUnderscore ';
      }

      return classNames.trim();
    };

    // const getRowClassName2 = (record) => {
    //   if (record.factory) {
    //     if (record.factory.includes("_")) {
    //       return 'colored-row-withUnderscore';
    //     } else {
    //       return 'colored-factory-empty-row';
    //     }
    //   }
    //   return '';
    // };

    columns.push(
      {
        title: 'VAS - Size',
        dataIndex: 'VASSize',
        width: 80,
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Item Vas Text',
        dataIndex: 'itemVasText', width: 80,
        render: (text, record) => {
          return (
            <>
              {record.itemVasText?.length > 30 ? (<><Tooltip title='Cilck to open full itemVasText'><p><span onClick={() => handleTextClick(record.itemVasText)} style={{ cursor: 'pointer' }}>
                {record.itemVasText.length > 30 ? `${record.itemVasText?.substring(0, 30)}....` : record.itemVasText}
              </span></p></Tooltip></>) : (<>{record.itemVasText}</>)}
            </>
          )
        },
      },
      {
        title: 'Item Vas Text in PDF PO',
        dataIndex: 'itemVasTextPDF', width: 80,
        render: (text, record) => {
          return (
            <>
              {record.itemVasTextPDF?.length > 30 ? (<><Tooltip title='Cilck to open full itemVasTextPDF'><p><span onClick={() => handleTextClick(record.itemVasTextPDF)} style={{ cursor: 'pointer' }}>
                {record.itemVasTextPDF.length > 30 ? `${record.itemVasTextPDF?.substring(0, 30)}....` : record.itemVasTextPDF}
              </span></p></Tooltip></>) : (<>{record.itemVasTextPDF}</>)}
            </>
          )
        },
      },
      {
        title: 'Diff of Item Vas Text',
        dataIndex: '', width: 80,
        render: (text, record) => {
          if (record.itemVasText == null || record.itemVasTextPDF == null) {
            return '-';
          } else {
            const lines1 = (record.itemVasText)?.trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
            const text1 = lines1?.join('');

            const lines2 = (record.itemVasTextPDF)?.trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
            const text2 = lines2?.join('');
            if (text1 == null && text2 == null) {
              return '-'
            } else {
              const dmp = new DiffMatchPatch();
              const diff = dmp.diff_main(text1, text2);
              dmp.diff_cleanupSemantic(diff);

              let output = '';
              for (const [op, text] of diff) {
                if (op === DiffMatchPatch.DIFF_INSERT) {
                  if (text.trim() !== '') {
                    output += `${text} `;
                  }
                } else if (op === DiffMatchPatch.DIFF_DELETE) {
                  if (text.trim() !== '') {
                    output += `${text} `;
                  }
                }
              }
              return output.trim()
            }
          }
        },
      },
      {
        title: 'Item Text',
        dataIndex: 'itemText', width: 80,
        render: (text, record) => {
          return (
            <>
              {record.itemText?.length > 30 ? (<><Tooltip title='Cilck to open full itemText'><p><span onClick={() => handleTextClick(record.itemText)} style={{ cursor: 'pointer' }}>
                {record.itemText.length > 30 ? `${record.itemText?.substring(0, 30)}....` : record.itemText}
              </span></p></Tooltip></>) : (<>{record.itemText}</>)}
            </>
          )
        }
      },
      {
        title: 'Hanger PO',
        dataIndex: 'hanger', width: 80,
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            const data = record.itemVasText
            const isHangerRequired = data?.includes("HANGING IS REQUIRED");
            return isHangerRequired ? 'YES' : 'NO';
          }
        },
      },
      {
        title: 'Change Register',
        dataIndex: 'displayName',
        align: 'center', width: 80,
      },
    )

    // summaryColumns.push(
    //   {
    //     title: 'Trading Co PO Number',
    //     dataIndex: 'tradingCoPoNumber',
    //     render: (text, record) => {
    //       if (!text || text.trim() === '') {
    //         return '-';
    //       } else {
    //         return text;
    //       }
    //     },
    //   },
    //   {
    //     title: 'VAS - Size',
    //     dataIndex: 'VASSize',
    //     render: (text, record) => {
    //       if (!text || text.trim() === '') {
    //         return '-';
    //       } else {
    //         return text;
    //       }
    //     },
    //   },
    //   {
    //     title: 'Item Vas Text',
    //     dataIndex: 'itemVasText',
    //     render: (text, record) => {
    //       if (!text || text.trim() === '') {
    //         return '-';
    //       } else {
    //         return text;
    //       }
    //     },
    //   },
    //   {
    //     title: 'Item Vas Text in PDF PO',
    //     dataIndex: 'itemVasTextPDF',
    //     render: (text, record) => {
    //       if (!text || text.trim() === '') {
    //         return '-';
    //       } else {
    //         return text;
    //       }
    //     },
    //   },
    //   {
    //     title: 'Diff of Item Vas Text',
    //     dataIndex: '',
    //     render: (text, record) => {
    //       const lines1 = (record.itemVasText)?.trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
    //       const text1 = lines1?.join('');

    //       const lines2 = (record.itemVasTextPDF)?.trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
    //       const text2 = lines2?.join('');
    //       if (text1 == null && text2 == null) {
    //         return '-'
    //       } else if (text1 == null) {
    //         return text2;
    //       } else if (text2 == null) {
    //         return text1;
    //       } else {
    //         const dmp = new DiffMatchPatch();
    //         const diff = dmp.diff_main(text1, text2);
    //         dmp.diff_cleanupSemantic(diff);

    //         let output = '';
    //         for (const [op, text] of diff) {
    //           if (op === DiffMatchPatch.DIFF_INSERT) {
    //             if (text.trim() !== '') {
    //               output += `${text} `;
    //             }
    //           } else if (op === DiffMatchPatch.DIFF_DELETE) {
    //             if (text.trim() !== '') {
    //               output += `${text} `;
    //             }
    //           }
    //         }
    //         return output.trim()
    //       }
    //     },
    //   },
    //   {
    //     title: 'Item Text',
    //     dataIndex: 'itemText',
    //     render: (text, record) => {
    //       if (!text || text.trim() === '') {
    //         return '-';
    //       } else {
    //         return text;
    //       }
    //     },
    //   },
    //   {
    //     title: 'Hanger PO',
    //     dataIndex: 'hanger',
    //     render: (text, record) => {
    //       if (!text || text.trim() === '') {
    //         return '-';
    //       } else {
    //         return text;
    //       }
    //     },
    //   },
    //   {
    //     title: 'Change Register',
    //     dataIndex: 'displayName',
    //     align: 'center',
    //     render: (text, record) => {
    //       if (!text || text.trim() === '') {
    //         return '-';
    //       } else {
    //         return text;
    //       }
    //     },
    //   },
    // )

    return (
      <>

        {filterData.length > 0 ? (
          <Table
            columns={columns}
            dataSource={filterData}
            className="custom-table-wrapper"
            size='small'
            //  pagination={false}
            pagination={{
              pageSize: 50,

              onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize);
              }
            }}
            scroll={{ x: 'max-content', y: 450 }}
            bordered
          />
        ) : (<Table size='large' />
        )}
      </>
    );

  }

  // const [searchedText, setSearchedText] = useState("");
  // const [firstColumn, ...restColumns] = summaryColumns;
  // const modifiedFirstColumn = {
  //   ...firstColumn,
  //   filteredValue: [String(searchedText).toLowerCase()],
  //   onFilter: (value, record) => {
  //     const aaa = new Set(Object.keys(record).map((key) => {
  //       return String(record[key]).toLowerCase().includes(value.toLocaleString())
  //     }))
  //     if (aaa.size && aaa.has(true))
  //       return true;
  //     else
  //       return false;
  //   },
  // };
  // const packListPreviewColumnsWithFilter = [modifiedFirstColumn, ...restColumns];
  // const [visibleColumns, setVisibleColumns] = useState(
  //   packListPreviewColumnsWithFilter.filter((column) => column.isDefaultSelect == true).map(column => column.key)
  // );
  // const dynamicColumns = packListPreviewColumnsWithFilter.filter((column) => visibleColumns.includes(column.key));
  // const handleColumnToggle = (checkedValues) => {
  //   setVisibleColumns(checkedValues);
  // };

  // const columnChooserOptions = packListPreviewColumnsWithFilter.map((column) => ({
  //   label: column.title,
  //   value: column.key,
  //   isDefaultSelect: column.isDefaultSelect
  // }));


  // const columnChooser = (
  //   <>
  //     <span style={{ marginRight: '8px' }}>Select columns to show:</span>

  //     <TreeSelect
  //       showSearch
  //       treeCheckable
  //       treeDefaultExpandAll
  //       style={{ width: '200px' }}
  //       value={visibleColumns}
  //       onChange={handleColumnToggle}
  //       dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
  //       placeholder="Select Columns"
  //       tagRender={() => <></>}
  //     >
  //       {columnChooserOptions.map((option) => (
  //         <TreeNode key={option.value} value={option.value} title={option.label} disableCheckbox={option.isDefaultSelect} disabled={option.isDefaultSelect} />
  //       ))}
  //     </TreeSelect>
  //   </>
  // );

  const showModal1 = (record) => {
    setPoLineProp(record)

    setIsModalOpen1(true);
    // DetailedView(record);
    // console.log(poLineProp,"record")
  };
  //  console.log(poLineProp,"record")

  const DetailedView = (record: any) => {
    poFilterData = filterData.filter(item => item.poAndLine == record)
    // console.log(poFilterData)
    // showModal1(record)
    // navigate('/Reports/po-detailed-view', { state: { data: poFilterData } })
  }


  return (
    <>
      <Card title="PPM Marketing Report" headStyle={{ color: 'black', fontWeight: 'bold' }}
        extra={
          <>
            <Popconfirm onConfirm={e => { toggleHideChildren() }}
              title={
                hideChildren
                  ? 'Unhide Columns?'
                  : 'Hide Columns?'
              }
            > Hide/Unhide Columns
              <Switch size="default"
                className={hideChildren ? 'toggle-activated' : 'toggle-deactivated'}
                checkedChildren={<RightSquareOutlined type="check" />}
                unCheckedChildren={<RightSquareOutlined type="close" />}
                checked={hideChildren}
              />
            </Popconfirm>&nbsp;&nbsp;
            {filteredData.length > 0 ? (
              <Button
                type="default"
                style={{ color: 'green' }}
                icon={<FileExcelFilled />}><CSVLink className="downloadbtn" filename="marketing-ppm-report.csv" data={csvData}>
                  Export to CSV
                </CSVLink></Button>) : null} </>}>
        <Form
          onFinish={getData}
          form={form}
          layout='vertical'>
          <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }}  >
              <Form.Item label="Last Modified Date" name="lastModifiedDate">
                <RangePicker />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3.5 }} >
              <Form.Item name="DPOMLineItemStatus" label="Line Item Status">
                <Select
                  showSearch
                  placeholder="Select Line Status"
                  optionFilterProp="children"
                  allowClear mode='multiple'>
                  <Option value="Accepted">ACCEPTED</Option>
                  <Option value="Unaccepted">UNACCEPTED</Option>
                  <Option value="Cancelled">CANCELLED</Option>
                  <Option value="Closed">CLOSED</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} >
              <Form.Item name='docType' label='Doc Type' >
                <Select
                  showSearch
                  placeholder="Select Doc Type"
                  optionFilterProp="children"
                  allowClear
                >
                  {docType?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.doc_type_code}>{inc.doc_type_code}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
              <Form.Item name='item' label='Item' >
                <Select showSearch placeholder="Select Item" optionFilterProp="children" allowClear>
                  {item?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.item}>{inc.item}</Option>
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
              <Form.Item name='factory' label='Factory' >
                <Select
                  showSearch
                  placeholder="Select Factory"
                  optionFilterProp="children"
                  allowClear
                >
                  {factory?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.factory}>{inc.factory}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }}  >
              <Form.Item label="Document Date" name="documentDate">
                <RangePicker />

              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
              <Form.Item name='poNumber' label='Purchase Order Number' >
                <Select
                  showSearch
                  placeholder="Select Po Number"
                  optionFilterProp="children"
                  allowClear
                >
                  {poNumber?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.po_number}>{inc.po_number}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} >
              <Form.Item name='poLineItemNumber' label='Po Line Item Number' >
                <Select
                  showSearch
                  placeholder="Select poLineItemNumber"
                  optionFilterProp="children"
                  allowClear
                >
                  {poLineItemNumber?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.po_line_item_number}>{inc.po_line_item_number}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} >
              <Form.Item name='styleNumber' label='Style Number' >
                <Select
                  showSearch
                  placeholder="Select Style Number"
                  optionFilterProp="children"
                  allowClear
                >
                  {styleNumber?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.style_number}>{inc.style_number}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} >
              <Form.Item name='productCode' label='Product Code' >
                <Select
                  showSearch
                  placeholder="Select Product Code"
                  optionFilterProp="children"
                  allowClear
                >
                  {productCode?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.product_code}>{inc.product_code}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} >
              <Form.Item name='planningSeasonCode' label='Planning Season Code' >
                <Select
                  showSearch
                  placeholder="Select Planning Season Code"
                  optionFilterProp="children"
                  allowClear
                >
                  {planSesCode?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.planning_season_code}>{inc.planning_season_code}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
              <Form.Item name='planningSeasonYear' label='Planning Season Year' >
                <Select
                  showSearch
                  placeholder="Select Planning Season Year"
                  optionFilterProp="children"
                  allowClear
                >
                  {planSesYear?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.planning_season_year}>{inc.planning_season_year}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
              <Form.Item name='destinationCountry' label='Destination Country' >
                <Select
                  showSearch
                  placeholder="Select Destination Country"
                  optionFilterProp="children"
                  allowClear
                >
                  {countryDestination?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.destination_country}>{inc.destination_country}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
              <Form.Item name='geoCode' label='Geo Code' >
                <Select
                  showSearch
                  placeholder="Select Geo Code"
                  optionFilterProp="children"
                  allowClear
                >
                  {geoCode?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.geo_code}>{inc.geo_code}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
              <Form.Item name='plant' label='Plant Code' >
                <Select
                  showSearch
                  placeholder="Select Plant Code"
                  optionFilterProp="children"
                  allowClear
                >
                  {plantCode?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.plant}>{inc.plant}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 4 }}  >
              <Form.Item label="GAC" name="gac">
                <RangePicker />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 10 }} style={{ padding: '15px' }}>
              <Form.Item>
                <Button htmlType="submit"
                  icon={<SearchOutlined />}
                  type="primary">GET REPORT</Button>
                <Button
                  htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={onReset}
                >
                  RESET
                </Button>
                {/* <Button style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={toggleHideChildren}>Hide Columns</Button> */}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row gutter={24} justify={'space-evenly'}>
          <Col xs={24} sm={12} md={8} lg={6} xl={3}> <Card bordered style={{ backgroundColor: 'aqua', height: 100, alignItems: 'center' }}  >
            <b> <Statistic loading={tableLoading} title="Total Order Qty:" style={{ color: 'white' }} value={count} formatter={formatter} /></b></Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={3}><Card bordered style={{ backgroundColor: '#CBADF7', height: 100, alignItems: 'center' }}>
            <b><Statistic loading={tableLoading} title="Total Shipped:" value={0} formatter={formatter} />
            </b></Card></Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={3}> <Card bordered style={{ backgroundColor: '#A1EBB5', height: 100, alignItems: 'center' }} >
            <b><Statistic loading={tableLoading} title="Balance to ship:" value={0} formatter={formatter} />
            </b></Card></Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={3}> <Card bordered style={{ backgroundColor: '#E1F5A5', height: 100, alignItems: 'center' }}>
            <b><Statistic loading={tableLoading} title="Total PO's:" value={gridData.length} formatter={formatter} />
            </b> </Card> </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={3}><Card bordered style={{ backgroundColor: '#A5F5D7', height: 100, alignItems: 'center' }}>
            <b><Statistic loading={tableLoading} title="Accepted PO's:" value={gridData.filter(el => el.DPOMLineItemStatus === "Accepted").length} formatter={formatter} />
            </b></Card></Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={3}><Card bordered style={{ backgroundColor: '#F5BCB1', height: 100, alignItems: 'center' }}>
            <b><Statistic loading={tableLoading} title="Unaccepted PO's:" value={gridData.filter(el => el.DPOMLineItemStatus === "Unaccepted").length} formatter={formatter} />
            </b></Card> </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={3}><Card bordered style={{ backgroundColor: '#B1BDF5', height: 100, alignItems: 'center' }}>
            <b><Statistic loading={tableLoading} title="Closed PO's:" value={gridData.filter(el => el.DPOMLineItemStatus === "Closed").length} formatter={formatter} />
            </b> </Card> </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={3}><Card bordered style={{ backgroundColor: '#F1776A', height: 100, alignItems: 'center' }}>
            <b><Statistic loading={tableLoading} title="Cancelled PO's:" value={gridData.filter(el => el.DPOMLineItemStatus === "Cancelled").length} formatter={formatter} />
            </b></Card></Col>
        </Row><br></br>
        {/* <Row>
          <Col>
            {columnChooser}
          </Col>
          <Col>
            <Input.Search placeholder="Search" allowClear onChange={(e) => { setSearchedText(e.target.value) }} onSearch={(value) => { setSearchedText(value) }} style={{ width: 200, float: "right" }} />
          </Col>
        </Row> */}
        {renderReport(filterData)}
        <Modal
          className='print-docket-modal'
          key={'modal1' + Date.now()}
          width={'700%'}
          style={{ top: 30, alignContent: 'center' }}
          visible={isModalOpen1}
          title={<React.Fragment>
          </React.Fragment>}
          onCancel={cancelHandle}
          footer={[]}
        >
          {isModalOpen1 ? <PoDetailedview data={{ poLineProp }} /> : <></>}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button size='large' onClick={cancelHandle} style={{ color: 'white', backgroundColor: 'red', flexDirection: 'column-reverse' }}>Close</Button></div>
        </Modal>
        <Modal open={remarkModal} onOk={onRemarksModalOk} onCancel={onRemarksModalOk} footer={[<Button onClick={onRemarksModalOk} type='primary'>Ok</Button>]}>
          <Card>
            <p>{itemText}</p>
          </Card>
        </Modal>
      </Card>
    </>
  )
}

export default PPMReport;
