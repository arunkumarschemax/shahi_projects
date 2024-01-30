
import { FileExcelFilled, RightSquareOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { BomReportModel, BomReportSizeModel, FactoryUpdateRequest, MarketingModel, MarketingReportSizeModel, PpmDateFilterRequest } from '@project-management-system/shared-models';
import { BomService, NikeService } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, message, Space, Tag, Statistic, Modal, TreeSelect, Tooltip, Checkbox, Popconfirm, Switch } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import { ColumnsType } from 'antd/es/table';
import { CSVLink } from "react-csv";
import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup';
import Highlighter from 'react-highlight-words';
import { Link, useNavigate } from 'react-router-dom';
const { diff_match_patch: DiffMatchPatch } = require('diff-match-patch');


const BomCreation = () => {
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
 
  const [hideChildren, setHideChildren] = useState(true);
  const [csvData, setcsvData] = useState([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const customOrder = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "XS-S", "S-S", "M-S", "L-S", "XL-S", "2XL-S", "3XL-S", "4XL-S", "XS-T", "S-T", "M-T", "L-T", "XS-T", "S-T", "M-T", "L-T", "XL-T", "2XL-T", "3XL-T", "4XL-T", "5XL-T", "STT", "MTT", "LTT", "XLTT", "2XLTT", "3XLTT", "S+", "M+", "L+", "Custm"];
  const sizeColumns = [
    {
      title: 'Quantity', dataIndex: 'sizeQty'
    },
    
  ]
  const [selectedSizeColumns, setSelectedSizeColumns] = useState<any[]>(sizeColumns)
const bomservice = new BomService();
  useEffect(() => {

      getData();
    

  }, [])



  const getData = () => {
    
    setTableLoading(true)
    bomservice.getPpmPoLineData().then(res => {
        if (res.status) {
          setGridData(res.data);
          setFilterData(res.data);
          setFilteredData(res.data);         
        } else {
          setGridData([]);
          setFilterData([]);
          setFilteredData([]);
        }
      })
      .catch(_err => {
      }).finally(() => {
        setTableLoading(false)
      });
  };


  


  // const getData = () => {
  //   const req = new PpmDateFilterRequest();
  //   const filterValues = form.getFieldsValue()
  //   const hasValue = Object.values(filterValues).some(val => val !== undefined);
  //   if (!hasValue) { message.info("Please select any one filter criteria"); return; }

  //   const selectedLineItemStatus = form.getFieldValue('DPOMLineItemStatus');

  //   if (form.getFieldValue('lastModifiedDate') !== undefined) {
  //     req.lastModifedStartDate = (form.getFieldValue('lastModifiedDate')[0]).format('YYYY-MM-DD');
  //   }
  //   if (form.getFieldValue('lastModifiedDate') !== undefined) {
  //     req.lastModifedEndtDate = (form.getFieldValue('lastModifiedDate')[1]).format('YYYY-MM-DD');
  //   }
  //   if (form.getFieldValue('documentDate') !== undefined) {
  //     req.documentStartDate = (form.getFieldValue('documentDate')[0]).format('YYYY-MM-DD');
  //   }
  //   if (form.getFieldValue('documentDate') !== undefined) {
  //     req.documentEndDate = (form.getFieldValue('documentDate')[1]).format('YYYY-MM-DD');
  //   }
  //   if (form.getFieldValue('productCode') !== undefined) {
  //     req.productCode = form.getFieldValue('productCode');
  //   }
  //   if (form.getFieldValue('poNumber') !== undefined) {
  //     req.poNumber = form.getFieldValue('poNumber');
  //   }
  //   if (form.getFieldValue('destinationCountry') !== undefined) {
  //     req.destinationCountry = form.getFieldValue('destinationCountry');
  //   }
  //   if (form.getFieldValue('item') !== undefined) {
  //     req.item = form.getFieldValue('item');
  //   }
  //   if (form.getFieldValue('DPOMLineItemStatus') !== undefined) {
  //     req.DPOMLineItemStatus = form.getFieldValue('DPOMLineItemStatus');
  //   }
  //   if (selectedLineItemStatus && selectedLineItemStatus.length > 0) {
  //     req.DPOMLineItemStatus = selectedLineItemStatus;
  //   }
  //   if (form.getFieldValue('docType') !== undefined) {
  //     req.docTypeCode = form.getFieldValue('docType');
  //   }
  //   if (form.getFieldValue('poLineItemNumber') !== undefined) {
  //     req.poLineItemNumber = form.getFieldValue('poLineItemNumber');
  //   }
  //   if (form.getFieldValue('factory') !== undefined) {
  //     req.factory = form.getFieldValue('factory');
  //   }
  //   if (form.getFieldValue('styleNumber') !== undefined) {
  //     req.styleNumber = form.getFieldValue('styleNumber');
  //   }
  //   if (form.getFieldValue('planningSeasonCode') !== undefined) {
  //     req.planningSeasonCode = form.getFieldValue('planningSeasonCode');
  //   }
  //   if (form.getFieldValue('planningSeasonYear') !== undefined) {
  //     req.planningSeasonYear = form.getFieldValue('planningSeasonYear');
  //   }
  //   if (form.getFieldValue('geoCode') !== undefined) {
  //     req.geoCode = form.getFieldValue('geoCode');
  //   }
  //   if (form.getFieldValue('plant') !== undefined) {
  //     req.plant = form.getFieldValue('plant');
  //   }
  //   if (form.getFieldValue('gac') !== undefined) {
  //     req.gacStartDate = (form.getFieldValue('gac')[0]).format('YYYY-MM-DD');
  //   }
  //   if (form.getFieldValue('gac') !== undefined) {
  //     req.gacEndDate = (form.getFieldValue('gac')[1]).format('YYYY-MM-DD');
  //   }
  //   setTableLoading(true)
  //   service.getPPMData(req)
  //     .then(res => {
  //       if (res.status) {
  //         setGridData(res.data);
  //         setFilterData(res.data);
  //         setFilteredData(res.data);         
  //       } else {
  //         setGridData([]);
  //         setFilterData([]);
  //         setFilteredData([]);
  //       }
  //     })
  //     .catch(_err => {
  //     }).finally(() => {
  //       setTableLoading(false)
  //     });
  // };

  console.log(csvData);

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

  
  const totalItemQty = filterData?.map(i => i.totalItemQty)
  const count = totalItemQty.reduce((acc, val) => acc + Number(val), 0);

  // Calculate the overall sum of actualShippedQty across all models
  const overallSumOfActualShippedQty = filterData?.reduce((acc, model) => {
    const sum = model.sizeWiseData.reduce((innerAcc, sizeData) => innerAcc + sizeData.actualShippedQty, 0);
    return acc + sum;
  }, 0);

  const onReset = () => {
    form.resetFields()
    setSelectedSizeColumns(sizeColumns);
    setGridData([])
    setFilterData([])
    setFilteredData([])
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

  const getSizeWiseHeaders = (data: BomReportModel[]) => {
    const sizeHeaders = new Set<string>();
    data?.forEach(rec => rec.sizeWiseData?.forEach(version => {
      sizeHeaders.add('' + version.sizeDescription);
    }))
    const sizeHeadersArr = Array.from(sizeHeaders)

    sizeHeadersArr?.sort((a, b) => customOrder.indexOf(a) - customOrder.indexOf(b));
    return sizeHeadersArr;
  };

  const getMap = (data: BomReportModel[]) => {
    const sizeWiseMap = new Map<string, Map<string, BomReportSizeModel>>();
    // po => size => obj
    data?.forEach(rec => {
      if (!sizeWiseMap.has(rec.poAndLine)) {
        sizeWiseMap.set(rec.poAndLine, new Map<string, BomReportSizeModel>());
      }
      rec.sizeWiseData?.forEach(size => {
        sizeWiseMap.get(rec.poAndLine).set(size.sizeDescription, size);
      })
    });
    return sizeWiseMap;
  }
  let isOdd = false;



  // function generateClassName(index) {
  //   isOdd = !isOdd; 
  //   return isOdd ? 'odd-version' version';
  // }

  const renderReport = (data: BomReportModel[]) => {
    const sizeHeaders = getSizeWiseHeaders(data);
    const sizeWiseMap = getMap(data);
    function renderSizeWiseColumns(_record, _version) {

    }
    const columns: any = [
      {
        title: "S.No",
        width: 120,
        render: (_text: any, record: any, index: number) => {
          const continuousIndex = (page - 1) * pageSize + index + 1;
          return <span>{continuousIndex}</span>;
        },
      },
      {
        title: 'Purchase Order Number',
        dataIndex: 'purchaseOrderNumber', width:120,
        ...getColumnSearchProps('purchaseOrderNumber')
      },
     
     
      {
        title: 'Style Number',
        dataIndex: 'styleNumber', width: 120,
      },
      {
        title: "Destination Country Name ",
        dataIndex: 'destinationCountry', width: 120,
      },
      { title: 'Geo Code', dataIndex: 'geoCode', width: 120, align: 'center' },
  
      // {
      //   title: 'Total Item Qty',
      //   dataIndex: 'totalItemQty', width: 80,
      //   align: 'right',
      //   render: (text, _record) => {
      //     if (!text || text.trim() === '') {
      //       return '-';
      //     } else {
      //       return <strong>{Number(text).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</strong>;
      //     }
      //   },
      // },
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
          children: selectedSizeColumns.map((sc) => {
            return {
              title: <div
                style={{
                  background: sizeClass === 'odd-version' ? '#4ECCEB' : '#01A3FA  ', borderRadius: '2px', display: 'flex', alignItems: 'center',
                  height: 50, justifyContent: 'center', color: 'Black',
                }}
              >{sc.title}</div>,
              dataIndex: sc.dataIndex,
              key: '',
              width: 100,
              align: 'right',
              // render: (_text, record) => {
              //   const sizeData = sizeWiseMap?.get(record.purchaseOrderNumber)?.get(version);

              //   return sizeData ? sizeData[`${sc.dataIndex}`] : '-'
              // }
              render: (_text, record) => {
                const sizeData = record.sizeWiseData?.find((size) => size.sizeDescription === version);
            
                return sizeData ? sizeData.sizeQty : '-';
            }
            }
          })
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
              // render: (_text, record) => {
              //   const sizeData = sizeWiseMap?.get(record.purchaseOrderNumber)?.get(version)?.sizeQty
              //   // const formattedQty = Number(sizeData).toLocaleString('en-IN', { maximumFractionDigits: 0 });
              //   return sizeData ? sizeData : '-';
              // }
              render: (_text, record) => {
                const sizeData = record.sizeWiseData?.find((size) => size.sizeDescription === version);
            
                return sizeData ? sizeData.sizeQty : '-';
            }
            },
            
          ],
        });
      }
    });

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
            // rowClassName={getRowClassName}
          />
        ) : (<Table size='large' />
        )}
      </>
    );

  }


  return (
    <>
      <Card title="Bom Creation" headStyle={{ color: 'black', fontWeight: 'bold' }}>
        {/* <Form
          onFinish={getData}
          form={form}
          layout='vertical'>
          <Card>
            <Row gutter={24}>
              <Col span={6}>
                <Popconfirm onConfirm={_e => { toggleHideChildren() }}
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
                </Popconfirm>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}  >
                <Form.Item label="Size columns" name="sizeColumns">
                  <Select style={{ width: '100%' }} allowClear showSearch placeholder='select isze columns' optionFilterProp="children"
                    mode='multiple' onChange={(_s, opt) => { handleHideSizeColuomns(opt) }}>
                    {
                      sizeColumns.map((s) => {
                        return <Option key={s.dataIndex} value={s.dataIndex}>{s.title}</Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
              {filteredData.length > 0 ? (
                <Col span={1}>
                  <Button
                    type="default"
                    style={{ color: 'green' }}
                    icon={<FileExcelFilled />}><CSVLink className="downloadbtn" filename="marketing-ppm-report.csv" data={csvData}>
                      Export to CSV
                    </CSVLink></Button>
                </Col>
              ) : null}
            </Row>
            <Row gutter={24} style={{ paddingTop: '10px' }}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}  >
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
                    mode='multiple'
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
                  <Select showSearch placeholder="Select Item" optionFilterProp="children" allowClear mode='multiple'>
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
                    mode='multiple'
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
                    mode='multiple'
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
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form> */}
      
        {renderReport(filterData)}
    
     
      </Card>
    </>
  )
}
export default BomCreation

