import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { MarketingModel, PpmDateFilterRequest } from '@project-management-system/shared-models';
import { NikeService } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, message, Space, Tag, Statistic } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import RangePicker from 'rc-picker/lib/RangePicker';
import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup';
import Highlighter from 'react-highlight-words';
import { Link, useNavigate } from 'react-router-dom';
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
  let navigate = useNavigate()
  let poFilterData
  const [tableLoading,setTableLoading] = useState<boolean>(false)
  const formatter = (value: number) => <CountUp end={value} separator="," />;



  useEffect(() => {
    getProductCode();
    getPoLine();
    getcountrydestination();
    getplantCode();
    getItem();
    getFactory();
    getData();
    getPonumber();
    getDocType();
    getPpmPoLineForMarketing();
    getStyleNumber();
    getSesonCode();
    getSesonYear();
    getGeoCode();

  }, [])


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
      req.documentEndtDate = (form.getFieldValue('documentDate')[1]).format('YYYY-MM-DD');
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
    if (form.getFieldValue('plant') !== undefined) {
      req.plant = form.getFieldValue('plant');
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
    setTableLoading(true)
    service.getPPMData(req)
      .then(res => {
        if (res.status) {
          setGridData(res.data);
          // console.log(gridData)
          setFilterData(res.data);
          setFilteredData(res.data);
          Finish(res.data);
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

  let exportingColumns: IExcelColumn[] = []

  const handleExport = (e: any) => {
    e.preventDefault();
    const currentDate = new Date()
      .toISOString()
      .slice(0, 10)
      .split("-")
      .join("/");

    const excel = new Excel();
    excel.addSheet("Sheet1");
    excel.addRow();
    excel.addColumns(exportingColumns);
    excel.addDataSource(gridData);
    excel.saveAs(`ppm-report-${currentDate}.xlsx`);
  }

  const totalItemQty = gridData?.map(i => i.totalItemQty)
  const count = totalItemQty.reduce((acc, val) => acc + Number(val), 0);

  const Finish = (data: any) => {
  };


  const onReset = () => {
    form.resetFields()
    getData()
  }

  const toggleHideChildren = () => {
    setHideChildren(!hideChildren);
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

  const getSizeWiseHeaders = (data: MarketingModel[]) => {
    const sizeHeaders = new Set<string>();
    data?.forEach(rec => rec.sizeWiseData?.forEach(version => {
      sizeHeaders.add('' + version.sizeDescription);
    }))
    return Array.from(sizeHeaders);
  };
  const getMap = (data: MarketingModel[]) => {
    const sizeWiseMap = new Map<string, Map<string, number>>();
    data?.forEach(rec => {
      if (!sizeWiseMap.has(rec.purchaseOrderNumber)) {
        sizeWiseMap.set(rec.purchaseOrderNumber, new Map<string, number>());
      }
      rec.sizeWiseData?.forEach(version => {
        sizeWiseMap.get(rec.purchaseOrderNumber).set(' ' + version.sizeDescription, version.sizeQty);
      })
    });
    return sizeWiseMap;
  }

  const renderReport = (data: MarketingModel[]) => {
    const sizeHeaders = getSizeWiseHeaders(data);
    const sizeWiseMap = getMap(data);

    exportingColumns = [
      { title: 'Po+Line ', dataIndex: 'purchaseOrderNumber-poLineItemNumber', render: (text, record) => `${record.purchaseOrderNumber}-${record.poLineItemNumber}` },
      { title: 'Last Modified Date', dataIndex: 'lastModifiedDate', render: (text) => moment(text).format('MM/DD/YYYY') },
      {
        title: 'Item',
        dataIndex: 'item',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            const firstFourDigits = text.substring(0, 4);
            return firstFourDigits;
          }
        },
      },
      {
        title: 'Factory', dataIndex: 'Factory', render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        }
      },
      { title: 'PCD', dataIndex: 'PCD' },
      { title: 'Document Date', dataIndex: 'documentDate', render: (text) => moment(text).format('MM/DD/YYYY') },
      { title: 'Purchase Order Number', dataIndex: 'purchase Order Number' },
      { title: 'PO Line Item Number', dataIndex: 'poLineItemNumber' },
      { title: 'Trading Co PO Number', dataIndex: 'tradingCoPoNumber' },
      { title: 'DPOM Line Item Status', dataIndex: 'DPOMLineItemStatus' },
      { title: 'DocType', dataIndex: 'docTypeCode' },
      { title: 'DocType Description', dataIndex: 'docTypeDesc' },
      { title: 'Style Number', dataIndex: 'styleNumber' },
      { title: 'Product Code', dataIndex: 'productCode' },
      { title: 'Colour Description', dataIndex: 'colorDesc' },
      { title: 'DESCRIPTION WITH FABRIC CONTENT', dataIndex: '' },
      { title: 'Fabric Content as Per Washcare Label', dataIndex: '' },
      { title: 'Planning Season Code', dataIndex: 'planningSeasonCode' },
      { title: 'Planning Season Year', dataIndex: 'planningSeasonYear' },
      { title: 'Co', dataIndex: 'customerOrder' },
      { title: 'CO Final Approval Date', dataIndex: 'coFinalApprovalDate', render: (text, record) => { return record.coFinalApprovalDate ? moment(record.coFinalApprovalDate).format('MM/DD/YYYY') : '-' } },
      { title: 'Plan No', dataIndex: 'planNo' },
      { title: 'Lead Time', dataIndex: 'leadTime' },
      { title: 'Category', dataIndex: 'categoryCode' },
      { title: 'Category Description', dataIndex: 'categoryDesc' },
      { title: 'Vendor Code', dataIndex: 'vendorCode' },
      { title: 'Global Category Core Focus', dataIndex: 'gccFocusCode' },
      { title: 'Global Category Core Focus Description', dataIndex: 'gccFocusDesc' },
      { title: 'Gender Age', dataIndex: 'genderAgeCode' },
      { title: 'Gender Age Description', dataIndex: 'genderAgeDesc' },
      { title: 'Destination Country Code', dataIndex: 'destinationCountryCode' },
      { title: 'Destination Country Name', dataIndex: 'destinationCountry' },
      { title: 'Geo Code', dataIndex: 'geoCode' },
      { title: 'Plant Code', dataIndex: 'plant' },
      { title: 'plant Name', dataIndex: 'plantName' },
      { title: 'UPC', dataIndex: 'UPC' },
      { title: 'Sales Order Number', dataIndex: 'directShipSONumber' },
      { title: 'Sales Order Item Number', dataIndex: 'directShipSOItemNumber' },
      { title: 'Customer PO', dataIndex: 'customerPO' },
      { title: 'Ship To Customer Number', dataIndex: 'shipToCustomerNumber' },
      { title: 'Ship To Customer Name', dataIndex: 'shipToCustomerName' },
      { title: 'Ship to Address Legal PO', dataIndex: 'shipToAddressLegalPO' },
      { title: 'Ship to Address DIA', dataIndex: 'shipToAddressDIA' },
      {
        title: 'Diff of Ship to Address', dataIndex: '',
        render: (text, record) => {
          const lines1 = (record.shipToAddressLegalPO).trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
          const text1 = lines1.join('');

          const lines2 = (record.shipToAddressDIA).trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
          const text2 = lines2.join('');

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
        },
      },
      { title: 'CAB Code', dataIndex: 'CABCode' },
      { title: 'Final Destination', dataIndex: '' },
      { title: 'MRGAC', dataIndex: 'MRGAC', render: (text, record) => { return record.MRGAC ? moment(record.MRGAC).format('MM/DD/YYYY') : '-' } },
      { title: 'OGAC', dataIndex: 'OGAC', render: (text, record) => { return record.OGAC ? moment(record.OGAC).format('MM/DD/YYYY') : '-' } },
      { title: 'GAC', dataIndex: 'GAC', render: (text, record) => { return record.GAC ? moment(record.GAC).format('MM/DD/YYYY') : '-' } },
      { title: 'GAC Reason Code', dataIndex: 'GACReasonCode' },
      { title: 'GAC Reason Description', dataIndex: 'GACReasonDesc' },
      { title: 'Truck Out Date', dataIndex: 'truckOutDate' },
      { title: 'Origin Receipt Date', dataIndex: 'originReceiptDate' },
      { title: 'Factory Delivery Actual Date', dataIndex: 'factoryDeliveryActDate' },
      { title: 'Shipping Type', dataIndex: 'shippingType' },
      { title: 'Planning Priority Number', dataIndex: 'planningPriorityCode' },
      { title: 'Planning Priority Description', dataIndex: 'planningPriorityDesc' },
      { title: 'Launch Code', dataIndex: '"launchCode' },
      { title: 'Mode of Transportation', dataIndex: 'modeOfTransportationCode' },
      { title: 'In Co Terms', dataIndex: 'inCoTerms' },
      { title: 'Inventory Segment Code', dataIndex: 'inventorySegmentCode' },
      { title: 'Purchase Group', dataIndex: 'purchaseGroupCode' },
      { title: 'Purchase Group Name', dataIndex: 'purchaseGroupName' },
      { title: 'Total Item Quantity', dataIndex: 'totalItemQty' },
    ]

    const columns: ColumnsType<any> = [
      // {
      //   title: "S.No",
      //   render: (_text: any, record: any, index: number) => <span>{index + 1}</span>
      // },
      {
        title: "Po+Line",
        dataIndex: 'Po+Line', fixed: 'left',
        // render: (text, record) => `${record.purchaseOrderNumber} - ${record.poLineItemNumber}`,

        render: (text, record) => {
          return <>
            <Button type='link' onClick={e => { DetailedView(record.poAndLine) }}>{record.purchaseOrderNumber} - {record.poLineItemNumber}</Button>
          </>
        }

      },
      {
        title: 'Last Modified Date',
        dataIndex: 'lastModifiedDate',
        render: (text) => moment(text).format('MM/DD/YYYY')
      },
      {
        title: 'Item',
        dataIndex: 'item',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            const firstFourDigits = text.substring(0, 4);
            return firstFourDigits;
          }
        },
      },
      {
        title: 'Factory',
        dataIndex: 'factory',
        align: 'center',
        render: (text, record) => (
          <span style={getFactoryCellStyle(text)}>
            {!text || text.trim() === '' ? '-' : text}
          </span>
        ),
      },
      {
        title: 'PCD',
        dataIndex: 'pcd',
        render: (text: string, record: any) => {
          if (!text || text.trim() === '' || text.length !== 8) {
            return '-';
          } else {
            const year = parseInt(text.slice(0, 4), 10);
            const month = parseInt(text.slice(4, 6), 10);
            const day = parseInt(text.slice(6, 8), 10);

            if (isNaN(year) || isNaN(month) || isNaN(day)) {
              return 'Invalid Date';
            }

            const date = new Date(year, month - 1, day);

            if (isNaN(date.getTime())) {
              return 'Invalid Date';
            }

            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            const yyyy = date.getFullYear();
            return `${mm}/${dd}/${yyyy}`;
          }
        }
      },
      {
        title: 'Document Date',
        dataIndex: 'documentDate',
        render: (text) => moment(text).format('MM/DD/YYYY')
      },
      {
        title: 'Purchase Order Number',
        dataIndex: 'purchaseOrderNumber',
      },
      {
        title: 'PO Line Item Number',
        dataIndex: 'poLineItemNumber'
      },
      {
        title: 'Trading Co PO Number',
        dataIndex: 'tradingCoPoNumber',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        }
      },
      {
        title: 'DPOM Line Item Status',
        dataIndex: 'DPOMLineItemStatus'
      },
      {
        title: 'Doc Type',
        dataIndex: 'docTypeCode',
      },
      {
        title: 'Doc Type Description',
        dataIndex: 'docTypeDesc',
      },
      {
        title: 'Style Number',
        dataIndex: 'styleNumber',
      },
      {
        title: 'Product Code',
        dataIndex: 'productCode',
      },
      {
        title: 'Colour Description',
        dataIndex: 'colorDesc'
      },
      {
        title: 'DESCRIPTION WITH FABRIC CONTENT',
        dataIndex: ''
      },
      {
        title: 'Fabric Content as Per Washcare Label',
        dataIndex: ''
      },
      {
        title: 'Planning Season Code',
        dataIndex: 'planningSeasonCode',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        }
      },
      {
        title: 'Planning Season Year',
        dataIndex: 'planningSeasonYear',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        }

      },
      {
        title: 'CO',
        dataIndex: 'customerOrder',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        }
      },
      {
        title: 'CO Final Approval Date',
        dataIndex: 'coFinalApprovalDate',
        className: "right-column",
        render: (text, record) => {
          return record.documentDate ? moment(record.documentDate).format('MM/DD/YYYY') : '-'
        }
      },
      {
        title: 'Plan No',
        dataIndex: 'planNo',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        }
      },
      {
        title: 'Lead Time',
        dataIndex: 'leadTime',
        render: (text) => {
          if (!isNaN(parseFloat(text))) {
            // If it's a valid number, render it
            return parseFloat(text).toFixed(2); // You can format it as needed
          } else {
            // If it's not a valid number, render a placeholder or an empty string
            return 'N/A'; // Or any other desired text
          }
        }
      },
      {
        title: 'Category',
        dataIndex: 'categoryCode',
      },
      {
        title: 'Category Description',
        dataIndex: 'categoryDesc'
      },
      {
        title: 'Vendor Code',
        dataIndex: 'vendorCode',
      },
      {
        title: 'Global Category Core Focus',
        dataIndex: 'gccFocusCode',
      },
      {
        title: 'Global Category Core Focus Description',
        dataIndex: 'gccFocusDesc',
      },
      {
        title: 'Gender Age',
        dataIndex: 'genderAgeCode',
        className: 'centered-column',
      },
      {
        title: 'Gender Age Description',
        dataIndex: 'genderAgeDesc',
      },
      {
        title: "Destination Country Code",
        dataIndex: 'destinationCountryCode'
      },
      {
        title: "Destination Country Name ",
        dataIndex: 'destinationCountry'
      },
      { title: 'Geo Code', dataIndex: 'geoCode' },
      {
        title: "Plant Code",
        dataIndex: 'plant'
      },
      {
        title: "Plant Name",
        dataIndex: 'plantName'
      },
      {
        title: 'UPC',
        dataIndex: 'UPC',
      },
      {
        title: 'Sales Order Number',
        dataIndex: '',
      },
      {
        title: 'Sales Order Item Number',
        dataIndex: '',
      },
      {
        title: 'Customer PO',
        dataIndex: 'customerPO',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Ship To Customer Number',
        dataIndex: 'shipToCustomerNumber',
        align: 'center',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Ship To Customer Name',
        dataIndex: 'shipToCustomerName',
        align: 'center',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Ship to Address Legal PO',
        dataIndex: 'shipToAddressLegalPO',
        align: 'center',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Ship to Address DIA',
        dataIndex: 'shipToAddressDIA',
        align: 'center',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Diff of Ship to Address',
        dataIndex: '',
        align: 'center',
        render: (text, record) => {
          const lines1 = (record.shipToAddressLegalPO).trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
          const text1 = lines1.join('');

          const lines2 = (record.shipToAddressDIA).trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
          const text2 = lines2.join('');

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
        },
      },
      {
        title: "CAB Code",
        dataIndex: 'CABCode',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Final Destination',
        dataIndex: '',
      },

      {
        title: "MRGAC",
        dataIndex: 'MRGAC', render: (text, record) => {
          return record.MRGAC ? moment(record.MRGAC).format('MM/DD/YYYY') : '-';
        },
      },
      {
        title: 'OGAC', dataIndex: 'OGAC', className: "right-column", render: (text, record) => {
          return record.OGAC ? moment(record.OGAC).format('MM/DD/YYYY') : '-';
        },
      },
      {
        title: 'GAC', dataIndex: 'GAC', className: "right-column", render: (text, record) => {
          return record.GAC ? moment(record.GAC).format('MM/DD/YYYY') : '-';
        },
      },
      {
        title: 'GAC Reason Code', dataIndex: 'GACReasonCode', render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },

      {
        title: 'GAC Reason Description', dataIndex: 'GACReasonDesc', render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Truck Out Date', dataIndex: 'truckOutDate', className: "right-column", render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Origin Receipt Date', dataIndex: 'originReceiptDate', className: "right-column", render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Factory Delivery Actual Date', dataIndex: 'factoryDeliveryActDate', className: "right-column", render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Shipping Type',
        dataIndex: 'shippingType',
        render: (text) => {
          // Replace underscores (_) with spaces
          const transformedText = text ? text.replace(/_/g, ' ') : '-';

          return transformedText;
        },
      },
      {
        title: 'Planning Priority Number', dataIndex: 'planningPriorityCode', className: 'centered-column', render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Planning Priority Description', dataIndex: 'planningPriorityDesc', render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Launch Code', dataIndex: 'launchCode', render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      { title: 'Mode Of Transportation', dataIndex: 'modeOfTransportationCode' },
      { title: 'In Co Terms', dataIndex: 'inCoTerms' },
      { title: 'Inventory Segment Code', dataIndex: 'inventorySegmentCode' },
      { title: 'Purchase Group', dataIndex: 'purchaseGroupCode', className: 'centered-column', },
      { title: 'Purchase Group Name', dataIndex: 'purchaseGroupName' },
      {
        title: 'Total Item Qty',
        dataIndex: 'totalItemQty',
        align: 'center',
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
      columns.push({
        title: version,
        dataIndex: version,
        key: version,
        width: 130,
        align: 'center',
        children: [
          {
            title: 'Quantity',
            dataIndex: '',
            key: '',
            align:'right',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  const formattedQty = Number(sizeData.sizeQty).toLocaleString('en-IN', { maximumFractionDigits: 0 });
                  return (
                    formattedQty
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Gross Price/FOB',
            dataIndex: 'grossFobPrice',
            align:'right',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.grossFobPrice
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Gross Price/FOB currency code',
            dataIndex: 'grossFobCurrencyCode',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.grossFobCurrencyCode
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Buyer Confirmed Gross Price/FOB',
            dataIndex: 'buyerGrossFobPrice',
            align:'right',

            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.buyerGrossFobPrice
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Buyer Confirmed Gross Price/FOB Currency Code',
            dataIndex: 'buyerGrossFobCurrencyCode',
            align:'right',

            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.buyerGrossFobCurrencyCode
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Diff of Price',
            dataIndex: '',
            align:'right',

          },
          {
            title: 'Diff of Price Currency',
            dataIndex: '',
          },
          {
            title: 'Net including discounts',
            dataIndex: 'netIncludingDisc',
            align:'right',

            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.netIncludingDisc
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Net including discounts currency code',
            dataIndex: 'netIncludingDiscCurrencyCode',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.netIncludingDiscCurrencyCode
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Trading Co Net including discounts',
            dataIndex: 'trConetIncludingDisc',
            align:'right',

            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.trConetIncludingDisc
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Trading Co Net including discounts currency code',
            dataIndex: 'trConetIncludingDiscCurrencyCode',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.trConetIncludingDiscCurrencyCode
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Legal PO Price',
            dataIndex: 'legalPoPrice',
            align:'right',

            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.legalPoPrice
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Legal PO Price currency',
            dataIndex: 'legalPoCurrencyCode',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.legalPoCurrencyCode
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'CO Price',
            dataIndex: 'coPrice',
            align:'right',

            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.coPrice
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'CO Price currency',
            dataIndex: 'coPriceCurrencyCode',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.coPriceCurrencyCode
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Diff of Price',
            dataIndex: '',
            align:'right',


          },
          {
            title: 'Diff of Price currency',
            dataIndex: '',
            align:'right',


          },
          {
            title: 'CRM CO QTY',
            dataIndex: 'CRMCoQty',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.CRMCoQty
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Legal PO QTY',
            dataIndex: 'legalPoQty',
            align:'right',

            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.legalPoQty
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Diff of Quantity',
            dataIndex: '',
            align:'right',

          },
          {
            title: 'Allowed Excess Ship Qty',
            dataIndex: '',
            align:'right',

            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  if (record.shippingType === 'DIRECT') {
                    return (
                      '0'
                    );
                  } else {
                    const sizeQty = sizeData.sizeQty;
                    const result = 0.03 * sizeQty;
                    return (
                      result.toFixed(3)
                    );
                  }
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Actual Shipped Qty',
            dataIndex: 'actualShippedQty',
            align:'right',

            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.actualShippedQty
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Actual Ship %',
            align:'right',

            dataIndex: '',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.grossFobPrice
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
        ],
        render: (text, record) => {
          return record.sizeWiseData.find(item => item.sizeDescription === version);
        }
      });

      exportingColumns.push({
        title: version,
        dataIndex: '',
        width: 130,
        align: 'center',
        children: [
          {
            title: 'Quantity',
            dataIndex: '',
            align:'right',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);
              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  const formattedQty = Number(sizeData.sizeQty).toLocaleString('en-IN', { maximumFractionDigits: 0 });
                  return (
                    formattedQty
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Gross Price/FOB',
            dataIndex: 'grossFobPrice',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.grossFobPrice
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Gross Price/FOB currency code',
            dataIndex: 'grossFobCurrencyCode',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.grossFobCurrencyCode
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Buyer Confirmed Gross Price/FOB',
            dataIndex: 'buyerGrossFobPrice',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.buyerGrossFobPrice
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Buyer Confirmed Gross Price/FOB Currency Code',
            dataIndex: 'buyerGrossFobCurrencyCode',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.buyerGrossFobCurrencyCode
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Diff of Price',
            dataIndex: '',
          },
          {
            title: 'Diff of Price Currency',
            dataIndex: '',
          },
          {
            title: 'Net including discounts',
            dataIndex: 'netIncludingDisc',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.netIncludingDisc
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Net including discounts currency code',
            dataIndex: 'netIncludingDiscCurrencyCode',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.netIncludingDiscCurrencyCode
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Trading Co Net including discounts',
            dataIndex: 'trConetIncludingDisc',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.trConetIncludingDisc
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Trading Co Net including discounts currency code',
            dataIndex: 'trConetIncludingDiscCurrencyCode',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.trConetIncludingDiscCurrencyCode
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Legal PO Price',
            dataIndex: 'legalPoPrice',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.legalPoPrice
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Legal PO Price currency',
            dataIndex: 'legalPoCurrencyCode',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.legalPoCurrencyCode
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'CO Price',
            dataIndex: 'coPrice',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.coPrice
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'CO Price currency',
            dataIndex: 'coPriceCurrencyCode',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.coPriceCurrencyCode
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Diff of Price',
            dataIndex: '',

          },
          {
            title: 'Diff of Price currency',
            dataIndex: '',

          },
          {
            title: 'CRM CO QTY',
            dataIndex: 'CRMCoQty',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.CRMCoQty
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Legal PO QTY',
            dataIndex: 'legalPoQty',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.legalPoQty
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Diff of Quantity',
            dataIndex: '',
          },
          {
            title: 'Allowed Excess Ship Qty',
            dataIndex: '',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  if (record.shippingType === 'DIRECT') {
                    return (
                      '0'
                    );
                  } else {
                    const sizeQty = sizeData.sizeQty;
                    const result = 0.03 * sizeQty;
                    return (
                      result.toFixed(3)
                    );
                  }
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Actual Shipped Qty',
            dataIndex: 'actualShippedQty',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.actualShippedQty
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
          {
            title: 'Actual Ship %',
            dataIndex: '',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.grossFobPrice
                  );
                } else {
                  return (
                    '-'
                  );
                }
              } else {
                return '-';
              }
            }
          },
        ],
        render: (text, record) => {
          return record.sizeWiseData.find(item => item.sizeDescription === version);
        }
      });
    });

    // if (hideChildren) {
    //   // If hideChildren is true, show only the first child column
    //   exportingColumns[0].children = exportingColumns[0].children.slice(0, 1);
    // }

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
        title: 'Trading Co PO Number',
        dataIndex: 'tradingCoPoNumber',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'VAS - Size',
        dataIndex: 'VASSize',
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
        dataIndex: 'itemVasText',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Item Vas Text in PDF PO',
        dataIndex: 'itemVasTextPDF',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Diff of Item Vas Text',
        dataIndex: '',
        render: (text, record) => {
          if (record.itemVasText == null || record.itemVasTextPDF == null) {
            return '-';
          } else {
            const lines1 = (record.itemVasText).trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
            const text1 = lines1.join('');

            const lines2 = (record.itemVasTextPDF).trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
            const text2 = lines2.join('');

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
        },
      },
      {
        title: 'Item Text',
        dataIndex: 'itemText',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Hanger PO',
        dataIndex: 'hanger',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Change Register',
        dataIndex: 'displayName',
        align: 'center',
      },
    )

    exportingColumns.push(
      {
        title: 'Trading Co PO Number',
        dataIndex: 'tradingCoPoNumber',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'VAS - Size',
        dataIndex: 'VASSize',
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
        dataIndex: 'itemVasText',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Item Vas Text in PDF PO',
        dataIndex: 'itemVasTextPDF',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Diff of Item Vas Text',
        dataIndex: '',
        render: (text, record) => {
          const lines1 = (record.itemVasText).trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
          const text1 = lines1.join('');

          const lines2 = (record.itemVasTextPDF).trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
          const text2 = lines2.join('');

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
        },
      },
      {
        title: 'Item Text',
        dataIndex: 'itemText',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Hanger PO',
        dataIndex: 'hanger',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: 'Change Register',
        dataIndex: 'displayName',
        align: 'center',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return text;
          }
        },
      },
    )

    return (
      <>

        {filterData.length > 0 ? (
          <Table
            columns={columns}
            dataSource={filterData}
            size='large'
            pagination={{
              onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize);
              }
            }}
            scroll={{ x: 'max-content' }}
            bordered
          />
        ) : (<Table size='large' />
        )}
      </>
    );

  }

  const DetailedView = (record: any) => {
    poFilterData = filterData.filter(item => item.poAndLine == record)
    console.log(poFilterData)
    navigate('/Reports/po-detailed-view', { state: { data: poFilterData } })
  }
 

  return (
    <>
      <Card title="PPM Marketing Report" headStyle={{ color: 'black', fontWeight: 'bold' }}
        extra={filteredData.length > 0 ? (<Button
          type="default"
          style={{ color: 'green' }}
          onClick={handleExport}
          icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
        <Form
          onFinish={getData}
          form={form}
          layout='vertical'>
          <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }} style={{ padding: '20px' }} >
              <Form.Item label="Last Modified Date" name="lastModifiedDate">
                <RangePicker />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3.5 }} style={{ padding: '20px' }}>
              <Form.Item name="DPOMLineItemStatus" label="DPOM Line Item Status">
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='docType' label='Doc Type' >
                <Select
                  showSearch
                  placeholder="Select Doc Type"
                  optionFilterProp="children"
                  allowClear
                >
                  {docType.map((inc: any) => {
                    return <Option key={inc.id} value={inc.doc_type_code}>{inc.doc_type_code}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='item' label='Item' >
                <Select showSearch placeholder="Select Item" optionFilterProp="children" allowClear>
                  {item.map((inc: any) => {
                    const firstFourDigits = inc.item.substring(0, 4);
                    return <Option key={inc.id} value={inc.item}>{firstFourDigits}</Option>
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='factory' label='Factory' >
                <Select
                  showSearch
                  placeholder="Select Factory"
                  optionFilterProp="children"
                  allowClear
                >
                  {factory.map((inc: any) => {
                    return <Option key={inc.id} value={inc.factory}>{inc.factory}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }} style={{ padding: '20px' }} >
              <Form.Item label="Document Date" name="documentDate">
                <RangePicker />

              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ marginTop: 20 }}>
              <Form.Item name='poNumber' label='Purchase Order Number' >
                <Select
                  showSearch
                  placeholder="Select Po Number"
                  optionFilterProp="children"
                  allowClear
                >
                  {poNumber.map((inc: any) => {
                    return <Option key={inc.id} value={inc.po_number}>{inc.po_number}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='poLineItemNumber' label='Po Line Item Number' >
                <Select
                  showSearch
                  placeholder="Select poLineItemNumber"
                  optionFilterProp="children"
                  allowClear
                >
                  {poLineItemNumber.map((inc: any) => {
                    return <Option key={inc.id} value={inc.po_line_item_number}>{inc.po_line_item_number}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='styleNumber' label='Style Number' >
                <Select
                  showSearch
                  placeholder="Select Style Number"
                  optionFilterProp="children"
                  allowClear
                >
                  {styleNumber.map((inc: any) => {
                    return <Option key={inc.id} value={inc.style_number}>{inc.style_number}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='productCode' label='Product Code' >
                <Select
                  showSearch
                  placeholder="Select Product Code"
                  optionFilterProp="children"
                  allowClear
                >
                  {productCode.map((inc: any) => {
                    return <Option key={inc.id} value={inc.product_code}>{inc.product_code}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='planningSeasonCode' label='Planning Season Code' >
                <Select
                  showSearch
                  placeholder="Select Planning Season Code"
                  optionFilterProp="children"
                  allowClear
                >
                  {planSesCode.map((inc: any) => {
                    return <Option key={inc.id} value={inc.planning_season_code}>{inc.planning_season_code}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='planningSeasonYear' label='Planning Season Year' >
                <Select
                  showSearch
                  placeholder="Select Planning Season Year"
                  optionFilterProp="children"
                  allowClear
                >
                  {planSesYear.map((inc: any) => {
                    return <Option key={inc.id} value={inc.planning_season_year}>{inc.planning_season_year}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='destinationCountry' label='Destination Country' >
                <Select
                  showSearch
                  placeholder="Select Destination Country"
                  optionFilterProp="children"
                  allowClear
                >
                  {countryDestination.map((inc: any) => {
                    return <Option key={inc.id} value={inc.destination_country}>{inc.destination_country}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='geoCode' label='Geo Code' >
                <Select
                  showSearch
                  placeholder="Select Geo Code"
                  optionFilterProp="children"
                  allowClear
                >
                  {geoCode.map((inc: any) => {
                    return <Option key={inc.id} value={inc.geo_code}>{inc.geo_code}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='plant' label='Plant Code' >
                <Select
                  showSearch
                  placeholder="Select Plant Code"
                  optionFilterProp="children"
                  allowClear
                >
                  {plantCode.map((inc: any) => {
                    return <Option key={inc.id} value={inc.plant}>{inc.plant}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '15px' }}>
              <Form.Item>
                <Button htmlType="submit"
                  icon={<SearchOutlined />}
                  type="primary">Get Report</Button>
                <Button
                  htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={onReset}
                >
                  RESET
                </Button>
              </Form.Item>
            </Col>
            {/* <Col>
              <Row>
                <Form.Item>
                  <Button onClick={toggleHideChildren}>Toggle Hide</Button>
                </Form.Item>
              </Row></Col> */}
          </Row>
        </Form>
        <Row gutter={24} justify={'space-evenly'}>
                    <Col >
                        <Statistic  loading={tableLoading} title="Total Order Qty:" value={count} formatter={formatter} />
                    </Col>
                    <Col>
                        <Statistic loading={tableLoading} title="Total Shipped:" value={0} formatter={formatter} />
                    </Col>
                    <Col>
                        <Statistic loading={tableLoading} title="Balance to ship:" value={0} formatter={formatter} />
                    </Col>
                     <Col >
                        <Statistic loading={tableLoading} title="Total PO's:" value={gridData.length} formatter={formatter} />
                    </Col>
                    <Col>
                        <Statistic loading={tableLoading} title="Accepted PO's:" value={gridData.filter(el => el.DPOMLineItemStatus === "Accepted").length} formatter={formatter} />
                    </Col>
                    <Col>
                        <Statistic loading={tableLoading} title="Unaccepted PO's:" value={gridData.filter(el => el.DPOMLineItemStatus === "Unaccepted").length} formatter={formatter} />   
                    </Col>
                    <Col>
                        <Statistic loading={tableLoading} title="Closed PO's:" value={gridData.filter(el => el.DPOMLineItemStatus === "Closed").length} formatter={formatter} />
                    </Col>
                    <Col>
                        <Statistic loading={tableLoading} title="Cancelled PO's:" value={gridData.filter(el => el.DPOMLineItemStatus === "Cancelled").length} formatter={formatter} />
                    </Col>
                    </Row><br></br>

        {renderReport(filterData)}
      </Card>
    </>
  )
}

export default PPMReport;
