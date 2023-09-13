import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { MarketingModel, PpmDateFilterRequest } from '@project-management-system/shared-models';
import { NikeService } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, message, Space, Tag } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import RangePicker from 'rc-picker/lib/RangePicker';
import React, { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
const { diff_match_patch: DiffMatchPatch } = require('diff-match-patch');


const PPMReport = () => {
  const [ppm, setPPM] = useState([]);
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
  const [colorDesc, setColorDesc] = useState<any>([]);
  const [categoryDesc, setCategoryDesc] = useState<any>([]);
  const [countryDestination, setCountryDestination] = useState<any>([]);
  const [plantCode, setPlantCode] = useState<any>([]);
  const [item, setItem] = useState<any>([]);
  const [factory, setFactory] = useState<any>([]);
  const [poNumber, setPoNumber] = useState<any>([]);



  useEffect(() => {
    getProductCode();
    getPoLine();
    getColorDesc();
    getcategoryDesc();
    getcountrydestination();
    getplantCode();
    getItem();
    getFactory();
    getData();
    getPonumber();
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

  const getColorDesc = () => {
    service.getPpmColorDescForMarketing().then(res => {
      setColorDesc(res.data)
    })
  }

  const getcategoryDesc = () => {
    service.getPpmCategoryDescForMarketing().then(res => {
      setCategoryDesc(res.data)
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
    if (form.getFieldValue('colorDesc') !== undefined) {
      req.colorDesc = form.getFieldValue('colorDesc');
    }
    if (form.getFieldValue('categoryDesc') !== undefined) {
      req.categoryDesc = form.getFieldValue('categoryDesc');
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
    if (form.getFieldValue('factory') !== undefined) {
      req.factory = form.getFieldValue('factory');
    }
    if (form.getFieldValue('DPOMLineItemStatus') !== undefined) {
      req.DPOMLineItemStatus = form.getFieldValue('DPOMLineItemStatus');
    }
    if (selectedLineItemStatus && selectedLineItemStatus.length > 0) {
      req.DPOMLineItemStatus = selectedLineItemStatus;
    }

    console.log(req, "reqppm")
    service.getPPMData(req)
      .then(res => {
        if (res.status) {
          setGridData(res.data);
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
        console.error(err);
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
      { title: 'Item', dataIndex: 'Item' },
      { title: 'Factory', dataIndex: 'Factory',render: (text, record) => {
        if (!text || text.trim() === '') {
            return '-';
        } else {
            return text;
        }} },
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
      { title: 'Plant Code', dataIndex: 'plant' },
      { title: 'plant Name', dataIndex: 'plantName' },
      { title: 'Geo Code', dataIndex: '' },
      { title: 'UPC', dataIndex: 'UPC' },
      { title: 'Sales Order Number', dataIndex: 'directShipSONumber' },
      { title: 'Sales Order Item Number', dataIndex: 'directShipSOItemNumber' },
      { title: 'Customer PO', dataIndex: 'customerPO' },
      { title: 'Ship To Customer Number', dataIndex: 'shipToCustomerNumber' },
      { title: 'Ship To Customer Name', dataIndex: 'shipToCustomerName' },
      { title: 'Ship to Address Legal PO', dataIndex: 'shipToAddressLegalPO' },
      { title: 'Ship to Address DIA', dataIndex: 'shipToAddressDIA' },
      { title: 'Diff of Ship to Address', dataIndex: '' },
      { title: 'CAB Code', dataIndex: 'CABcode' },
      { title: 'Final Destination', dataIndex: '' },
      { title: 'MRGAC', dataIndex: 'MRGAC' },
      { title: 'OGAC', dataIndex: 'OGAC' },
      { title: 'GAC', dataIndex: 'GAC' },
      { title: 'GAC Reason Description', dataIndex: 'GACReasonDesc' },
      { title: 'GAC Reason Code', dataIndex: 'GACReasonCode' },
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
      { title: 'Gross Price/FOB ', dataIndex: 'grossPriceFOB' },
      { title: 'Net including discounts', dataIndex: 'netIncludingDisc' },
      { title: 'Trading Co Net including discounts', dataIndex: 'trCoNetIncludingDisc' },
      { title: 'Legal PO Price', dataIndex: 'price' },
      { title: 'CO Price', dataIndex: 'coPrice' },
      { title: 'Actual Shipped Qty', dataIndex: 'actualShippedQty' },
      { title: 'VAS - Size', dataIndex: 'VASSize' },
      { title: 'Item Vas Text', dataIndex: 'itemVasText' },
      { title: 'Item Vas Text in PDF PO', dataIndex: '' },
      { title: 'Diff of Item Vas Text', dataIndex: '' },
      { title: 'Item Text', dataIndex: 'itemText' },
      { title: 'Change Register', dataIndex: 'displayName', align: 'center', },
    ]

    const columns: ColumnsType<any> = [
      // {
      //   title: "S.No",
      //   render: (_text: any, record: any, index: number) => <span>{index + 1}</span>
      // },
      {
        title: "Po+Line",
        dataIndex: 'Po+Line', fixed: 'left',
        render: (text, record) => `${record.purchaseOrderNumber} - ${record.poLineItemNumber}`,
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
            return text;
          }
        },
      },
      {
        title: 'Factory',
        dataIndex: 'factory',
        render: (text, record) => {
          if (!text || text.trim() === '') {
              return '-';
          } else {
              return text;
          }}
      },
      {
        title: 'PCD',
        dataIndex: 'pcd',
        render: (text, record) => {
            if (!text || text.trim() === '') {
                return '-';
            } else {
                return text;
            }}
        // ...getColumnSearch('factory'),
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
            }}
        
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
            }}
       
    },
    {
        title: 'Planning Season Year',
        dataIndex: 'planningSeasonYear',
        render: (text, record) => {
            if (!text || text.trim() === '') {
                return '-';
            } else {
                return text;
            }}
       
    },

    {
        title: 'CO',
        dataIndex: 'customerOrder',
        render: (text, record) => {
            if (!text || text.trim() === '') {
                return '-';
            } else {
                return text;
            }}
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
          }}
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
      
      { title: 'Geo Code', dataIndex: '' },
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
    },
    {
        title: 'Ship To Customer Number',
        dataIndex: 'shipToCustomerNumber',
        align: 'center',
    },
    {
        title: 'Ship To Customer Name',
        dataIndex: 'shipToCustomerName',
        align: 'center',
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
    { title:"CAB Code",
      dataIndex:'CABCode',},
      {
        title:'Final Destination',
        dataIndex:'',
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
    
    { title: 'GAC Reason Description', dataIndex: 'GACReasonDesc' },
    { title: 'Truck Out Date', dataIndex: 'truckOutDate', className: "right-column", },
    { title: 'Origin Receipt Date', dataIndex: 'originReceiptDate', className: "right-column", },
    { title: 'Factory Delivery Actual Date', dataIndex: 'factoryDeliveryActDate', className: "right-column", },
    
    { title: 'Shipping Type', dataIndex: 'shippingType' },
    { title: 'Planning Priority Number', dataIndex: 'planningPriorityCode', className: 'centered-column', },
    { title: 'Planning Priority Description', dataIndex: 'planningPriorityDesc', render: (text, record) => {
      if (!text || text.trim() === '') {
        return '-';
      } else {
        return text;
      }
    }, },
    
     
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
  {
      title: 'Purchase Group',
      dataIndex: 'purchaseGroupCode',
      className: 'centered-column',
  },
  { title: 'Purchase Group Name', dataIndex: 'purchaseGroupName' },
  
     
      {
        title: 'Total Item Qty',
        dataIndex: 'totalItemQty',
        align: 'center',
        render: (text, record) => {
          if (!text || text.trim() === '') {
            return '-';
          } else {
            return <strong>{text}</strong>;
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
            title: 'Legal PO Price',
            dataIndex: '',
            key: '',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.price
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
            dataIndex: '',
            key: '',
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
            title: 'Price Variation',
            dataIndex: '',
            key: '',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  const priceVariation = sizeData.price - sizeData.coPrice;
                  return (
                    priceVariation
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
            title: 'Legal PO Price',
            dataIndex: '',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  return (
                    sizeData.price
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
            dataIndex: '',
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
            title: 'Price Variation',
            dataIndex: '',
            render: (text, record) => {
              const sizeData = record.sizeWiseData.find(item => item.sizeDescription === version);

              if (sizeData) {
                if (sizeData.sizeQty !== null) {
                  const priceVariation = sizeData.price - sizeData.coPrice;
                  return (
                    priceVariation
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


    const getRowClassName = (record) => {
      if (record.displayName) {
        return 'colored-row';
      }
      return '';
    };
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
      title: 'Gross Price/FOB',
      dataIndex: '',
      // render: (text, record) => {
      //     if (!text || text.trim() === '') {
      //         return '-';
      //     } else {
      //         return text;
      //     }
      // },
  },
  {
    title: 'Gross Price/FOB currency code',
    dataIndex: '',
    // render: (text, record) => {
    //     if (!text || text.trim() === '') {
    //         return '-';
    //     } else {
    //         return text;
    //     }
    // },
},
{
  title: 'Buyer Confirmed Gross Price/FOB',
  dataIndex: '',
  // render: (text, record) => {
  //     if (!text || text.trim() === '') {
  //         return '-';
  //     } else {
  //         return text;
  //     }
  // },
},
{
  title: 'Buyer Confirmed Gross Price/FOB Currency Code',
  dataIndex: '',
 
},{
  title: 'Diff of Price',
  dataIndex: '',
  
},
{
  title: 'Diff of Price Currency',
  dataIndex: '',
  
},{
  title: 'Net including discounts',
  dataIndex: '',
  
},
{
  title: 'Net including discounts currency code',
  dataIndex: '',
  
},
{
  title: 'Trading Co Net including discounts',
  dataIndex: '',
  
},
{
  title: 'Trading Co Net including discounts currency code',
  dataIndex: '',
  
},
{
  title: 'Legal PO Price',
  dataIndex: '',
  
},
{
  title: 'Legal PO Price currency',
  dataIndex: '',
  
},
{
  title: 'CO Price',
  dataIndex: '',
  
},{
  title: 'CO Price currency',
  dataIndex: '',
  
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
  dataIndex: '',
  
},{
  title: 'Legal PO QTY',
  dataIndex: '',
  
},
{
  title: 'Diff of Quantity',
  dataIndex: '',
  
},
{
  title: 'Allowed Excess Ship Qty',
  dataIndex: '',
  
},
{
  title: 'Actual Shipped Qty',
  dataIndex: '',
  
},
{
  title: 'Actual Ship %',
  dataIndex: '',
  
},
{
  title: 'VAS - Size',
  dataIndex: '',
  
},
{
  title: 'Item Vas Text',
  dataIndex: '',
  
},
{
  title: 'Item Vas Text in PDF PO',
  dataIndex: '',
  
},
{
  title: 'Diff of Item Vas Text',
  dataIndex: '',
  
},
{
  title: 'Item Text',
  dataIndex: '',
  
},
{
  title: 'Hanger PO',
  dataIndex: '',
  
},
{
  title: 'Change Register',
  dataIndex: 'displayName',
  align: 'center',
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
            className="custom-table-wrapper"
            rowClassName={getRowClassName}
            bordered
          />
        ) : (<Table size='large' />
        )}
      </>
    );



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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }} style={{ padding: '20px' }} >
              <Form.Item label="Document Date" name="documentDate">
                <RangePicker />

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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ marginTop: 20 }}>
              <Form.Item name='poNumber' label='Po Number' >
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ padding: '20px' }}>
              <Form.Item name='colorDesc' label='Color Description' >
                <Select
                  showSearch
                  placeholder="Select Color Description"
                  optionFilterProp="children"
                  allowClear
                >
                  {colorDesc.map((inc: any) => {
                    return <Option key={inc.id} value={inc.color_desc}>{inc.color_desc}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
              <Form.Item name='categoryDesc' label='Category Description' >
                <Select
                  showSearch
                  placeholder="Select Category Description"
                  optionFilterProp="children"
                  allowClear
                >
                  {categoryDesc.map((inc: any) => {
                    return <Option key={inc.id} value={inc.category_desc}>{inc.category_desc}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
              <Form.Item name='item' label='Item' >
                <Select
                  showSearch
                  placeholder="Select Item"
                  optionFilterProp="children"
                  allowClear
                >
                  {item.map((inc: any) => {
                    return <Option key={inc.id} value={inc.item}>{inc.item}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3.5 }} >
              <Form.Item name="DPOMLineItemStatus" label="PPM Status">
                <Select
                  showSearch
                  placeholder="Select PPM Status"
                  optionFilterProp="children"
                  allowClear mode='multiple'>
                  <Option value="Accepted">ACCEPTED</Option>
                  <Option value="Unaccepted">UNACCEPTED</Option>
                  <Option value="Cancelled">CANCELLED</Option>
                  <Option value="Closed">CLOSED</Option>
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
          </Row>
        </Form>
        <Row gutter={80}>
          <Col >
            <Card title={'Total order Qty: ' + count} style={{ textAlign: 'left', width: 200, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'Total Shipped: ' + '0'} style={{ textAlign: 'left', width: 180, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'Balance to ship: ' + '0'} style={{ textAlign: 'left', width: 180, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
        </Row><br></br>
        <Row gutter={80}>
          <Col >
            <Card title={'Total Po Count: ' + gridData.length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'Accepted Po Count: ' + gridData.filter(el => el.DPOMLineItemStatus == 'Accepted').length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'UnAccepted Po :' + gridData.filter(el => el.DPOMLineItemStatus == 'Unaccepted').length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'Closed Po:' + gridData.filter(el => el.DPOMLineItemStatus == 'Closed').length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'Cancelled Po: ' + gridData.filter(el => el.DPOMLineItemStatus == 'Cancelled').length} style={{ textAlign: 'left', width: 190, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
        </Row><br></br>
        <div>
          {/* <Table columns={Columns} 
          // dataSource={gridData}
           dataSource={filterData}
            bordered
          /> */}
        </div>
        {renderReport(filterData)}
      </Card>
    </>
  )
}

export default PPMReport;
