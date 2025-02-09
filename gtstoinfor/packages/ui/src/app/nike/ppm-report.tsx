import { FileExcelFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { MarketingModel, PpmDateFilterRequest } from '@project-management-system/shared-models';
import { NikeService } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, message, Space } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import RangePicker from 'rc-picker/lib/RangePicker';
import React, { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';

const PPMReport = () => {
  const [ppm, setPPM] = useState([]);
  const [form] = Form.useForm();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [gridData, setGridData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const service = new NikeService();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterData, setFilterData] = useState<any>([])
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);
  const [productCode, setProductCode] = useState<any>([]);
  const { RangePicker } = DatePicker;
  const [selectedEstimatedFromDate, setSelectedEstimatedFromDate] = useState(undefined);
  const [selectedEstimatedToDate, setSelectedEstimatedToDate] = useState(undefined);
  const { Option } = Select;
  const [poLine, setPoLine] = useState<any>([]);
  const [colorDesc, setColorDesc] = useState<any>([]);
  const [categoryDesc, setCategoryDesc] = useState<any>([]);
  const [countryDestination, setCountryDestination] = useState<any>([]);
  const [plantCode, setPlantCode] = useState<any>([]);
  const [item, setItem] = useState<any>([]);
  const [factory, setFactory] = useState<any>([]);


  useEffect(() => {
    getData();
    getProductCode();
    getPoLine();
    getColorDesc();
    getcategoryDesc();
    getcountrydestination();
    getplantCode();
    getItem();
    getFactory();

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

  const getData = () => {
    const req = new PpmDateFilterRequest()
    if (form.getFieldValue('lastModifiedDate') !== undefined) {
      req.lastModifedStartDate = (form.getFieldValue('lastModifiedDate')[0]).format('YYYY-MM-DD')
    }
    if (form.getFieldValue('lastModifiedDate') !== undefined) {
      req.lastModifedEndtDate = (form.getFieldValue('lastModifiedDate')[1]).format('YYYY-MM-DD')
    }
    if (form.getFieldValue('documentDate') !== undefined) {
      req.documentStartDate = (form.getFieldValue('documentDate')[0]).format('YYYY-MM-DD')
    }
    if (form.getFieldValue('documentDate') !== undefined) {
      req.documentEndtDate = (form.getFieldValue('documentDate')[1]).format('YYYY-MM-DD')
    }
    if (form.getFieldValue('productCode') !== undefined) {
      req.productCode = form.getFieldValue('productCode')
    }
    if (form.getFieldValue('poandLine') !== undefined) {
      req.poandLine = form.getFieldValue('poandLine')
    }
    if (form.getFieldValue('colorDesc') !== undefined) {
      req.colorDesc = form.getFieldValue('colorDesc')
    }
    if (form.getFieldValue('categoryDesc') !== undefined) {
      req.categoryDesc = form.getFieldValue('categoryDesc')
    }
    if (form.getFieldValue('destinationCountry') !== undefined) {
      req.destinationCountry = form.getFieldValue('destinationCountry')
    }
    if (form.getFieldValue('plant') !== undefined) {
      req.plant = form.getFieldValue('plant')
    }
    if (form.getFieldValue('item') !== undefined) {
      req.item = form.getFieldValue('item')
    }
    if (form.getFieldValue('factory') !== undefined) {
      req.factory = form.getFieldValue('factory')
    }

    
    service.getPPMData(req).then(res => {
      if (res.status) {
        setGridData(res.data)
        setFilterData(res.data)
        setFilteredData(res.data)
        Finish(res.data)
      }
    }).catch(err => {
      console.log(err.message)
    })
  }
  const handleExport = (e: any) => {
    e.preventDefault();


    const currentDate = new Date()
      .toISOString()
      .slice(0, 10)
      .split("-")
      .join("/");

    let exportingColumns: IExcelColumn[] = []
    exportingColumns = [
      { title: 'Po+Line ', dataIndex: 'purchaseOrderNumber-poLineItemNumber', render: (text, record) => `${record.purchaseOrderNumber}-${record.poLineItemNumber}` },
      { title: 'Last Modified Date', dataIndex: 'lastModifiedDate' },
      { title: 'Item', dataIndex: 'Item' },
      { title: 'Factory', dataIndex: 'Factory' },
      { title: 'PCD', dataIndex: 'PCD' },
      { title: 'Document Date', dataIndex: 'documentDate' },
      { title: 'Purchase Order Number', dataIndex: 'purchase Order Number' },
      { title: 'PO Line Item Number', dataIndex: 'poLineItemNumber' },
      { title: 'Trading Co PO Number', dataIndex: 'tradingCoPoNumber' },
      { title: 'DPOM Line Item Status', dataIndex: 'DPOMLineItemStatus' },
      { title: 'DocType', dataIndex: 'docTypeCode' },
      { title: 'DocType Description', dataIndex: 'docTypeDesc' },
      { title: 'Style Number', dataIndex: 'styleNumber' },
      { title: 'Product Code', dataIndex: 'productCode' },
      { title: 'Colour Description', dataIndex: 'colorDesc' },
      { title: 'Planning Season Code', dataIndex: 'planningSeasonCode' },
      { title: 'Planning Season Year', dataIndex: 'planningSeasonYear' },
      { title: 'Co', dataIndex: 'customerOrder' },
      { title: 'CO Final Approval Date', dataIndex: 'coFinalApprovalDate' },
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
      { title: 'MRGAC', dataIndex: '"MRGAC' },
      { title: 'OGAC', dataIndex: 'OGAC' },
      { title: 'GAC', dataIndex: 'GAC' },
      { title: 'Truck Out Date', dataIndex: 'truckOutDate' },
      { title: 'Origin Receipt Date', dataIndex: 'originReceiptDate' },
      { title: 'Factory Delivery Actual Date', dataIndex: 'factoryDeliveryActDate' },
      { title: 'GAC Reason Description', dataIndex: 'GACReasonDesc' },
      { title: 'GAC Reason Code', dataIndex: 'GACReasonCode' },
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


    ]


    const excel = new Excel();
    excel.addSheet("Sheet1");
    excel.addRow();
    excel.addColumns(exportingColumns);
    excel.addDataSource(gridData);
    excel.saveAs(`ppm-report-${currentDate}.xlsx`);
  }

  const totalItemQty = gridData?.map(i => i.totalItemQty)
  const count = totalItemQty.reduce((acc, val) => acc + Number(val), 0);

  function convertToYYYYMMDD(inputDate) {
    const formatsToTry = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY', 'YYYY-MM-DD'];
    let formattedDate = null;
    for (const format of formatsToTry) {
      const parsedDate = moment(inputDate, format);
      if (parsedDate.isValid()) {
        formattedDate = parsedDate.format('YYYY-MM-DD');
        break;
      }
    }
    return formattedDate;
  }


  const Finish = (data: any) => {
    const values = form.getFieldsValue();
    if (!values.DPOMLineItemStatus || values.DPOMLineItemStatus.length === 0) {
      setFilterData(gridData);
    } else {
      const filteredData = gridData.filter(item =>
        values.DPOMLineItemStatus.includes(item.DPOMLineItemStatus)
      );
      setFilterData(filteredData);
      getData()
    }
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

    const columns: any = [
      {
        title: "S.No",
        render: (_text: any, record: any, index: number) => <span>{index + 1}</span>

      },

      {

        title: "Po+Line",
        dataIndex: 'Po+Line',
        render: (text, record) => `${record.purchaseOrderNumber} - ${record.poLineItemNumber}`


      },
      {
        title: 'Last Modified Date',
        dataIndex: 'updatedAt',
        render: (text) => moment(text).format('YYYY-MM-DD')

      },
      {
        title: 'Item',
        dataIndex: 'item',

      },
      {
        title: 'Factory',
        dataIndex: 'factory',

      },
      {
        title: 'Document Date',
        dataIndex: 'documentDate',
        // render: (text, record) => {
        //     return record.contracted_date ? convertToYYYYMMDD(record.contracted_date) : '-'
        // }
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
        title: 'DPOM Line Item Status',
        dataIndex: 'DPOMLineItemStatus'
      },
      {
        title: 'Style Number',
        dataIndex: 'styleNumber',


      },
      {
        title: 'Product Code',
        dataIndex: 'productCode',
        sorter: (a, b) => a.productCode.length - b.productCode.length,
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('productCode'),


      },
      {
        title: 'Colour Description',
        dataIndex: 'colorDesc'
      },

      {
        title: 'Category Description',
        dataIndex: 'categoryDesc'

      },
      {
        title: "Destination Country ",
        dataIndex: 'destinationCountry'
      },
      {
        title: "Plant Code",
        dataIndex: 'plant'
      },
      {
        title: 'Total Item Qty',
        dataIndex: 'totalItemQty',
        align: 'center',
        render: (text) => <strong>{text}</strong>
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
    });


    return (<Table columns={columns} dataSource={filterData} pagination={{
      onChange(current, pageSize) {
        setPage(current);
        setPageSize(pageSize)
      }
    }} scroll={{ x: 'max-content' }} />)

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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }} >
              <Form.Item label="Last Modified Date" name="lastModifiedDate">
                <RangePicker />

              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }} >
              <Form.Item label="Document Date" name="documentDate">
                <RangePicker />

              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '20px' }}>
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }} style={{ padding: '20px' }}>
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
              <Form.Item name='poandLine' label='Po+Line' >
                <Select
                  showSearch
                  placeholder="Select Po+Line"
                  optionFilterProp="children"
                  allowClear

                >
                  {poLine.map((inc: any) => {
                    return <Option key={inc.id} value={inc.po_and_line}>{inc.po_and_line}</Option>
                  })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
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


            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 6 }} style={{ marginTop: 25 }} >
              <Form.Item>
                <Button htmlType="submit" type="primary" icon={<SearchOutlined />}>Search</Button>
                <Button style={{ marginLeft: 8 }} htmlType="submit" type="primary" onClick={onReset} icon={<UndoOutlined />}>Reset</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Row gutter={80}>
          <Col >
            <Card title={'Total order Qty: ' + count} style={{ textAlign: 'left', width: 200, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'Total Shipped: ' + ppm.length} style={{ textAlign: 'left', width: 180, height: 40, backgroundColor: 'lightblue' }}></Card>
          </Col>
          <Col>
            <Card title={'Balance to ship: ' + ppm.length} style={{ textAlign: 'left', width: 180, height: 40, backgroundColor: 'lightblue' }}></Card>
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
