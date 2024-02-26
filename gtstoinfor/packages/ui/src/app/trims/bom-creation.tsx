
import { FileExcelFilled, RightSquareOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { BomReportModel, BomReportSizeModel, FactoryUpdateRequest, MarketingModel, MarketingReportSizeModel, PpmDateFilterRequest, StyleNumberReq } from '@project-management-system/shared-models';
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

  const service = new NikeService();
  const [filterData, setFilterData] = useState<any>([])
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);
  const [productCode, setProductCode] = useState<any>([]);
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const navigate = useNavigate()
  const [styleNumber, setStyleNumber] = useState<any>([]);
  const [item, setItem] = useState<any>([]);
  const [geoCode, setGeoCode] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);



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
    getStyleNumber();
    getItem();
    getGeoCode();
  }, [])


  const onSelectChange = (newSelectedRowKeys: any) => {
    const len = newSelectedRowKeys.length
    setSelectedRowKeys(newSelectedRowKeys);

  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const getData = () => {
    const req = new PpmDateFilterRequest();
    if (form.getFieldValue('item') !== undefined) {
      req.item = form.getFieldValue('item');
    }
    if (form.getFieldValue('styleNumber') !== undefined) {
      req.styleNumber = form.getFieldValue('styleNumber');
    }
    if (form.getFieldValue('geoCode') !== undefined) {
      req.geoCode = form.getFieldValue('geoCode');
    }
    setTableLoading(true)
    bomservice.getPpmPoLineData(req).then(res => {
      if (res.status) {
        setFilterData(res.data);
      } else {
        setFilterData([]);
      }
    })
      .catch(_err => {
      }).finally(() => {
        setTableLoading(false)
      });
  };

  const getStyleNumber = () => {
    service.getPpmStyleNumberFactory().then(res => {
      setStyleNumber(res.data)
    })
  }


  const getItem = () => {
    service.getPpmItemForFactory().then(res => {
      setItem(res.data)
    })
  }

  const getGeoCode = () => {
    service.getPpmdesGeoCodeFactory().then(res => {
      setGeoCode(res.data)
    })
  }


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
    setFilterData([])
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
    // window.location.reload();

  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
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


  let isOdd = false;


  const renderReport = (data: BomReportModel[]) => {
    const sizeHeaders = getSizeWiseHeaders(data);

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
        dataIndex: 'poAndLine', width: 120,
        ...getColumnSearchProps('poAndLine')
      },
      { title: 'Item', dataIndex: 'itemNo', width: 120, align: 'center' },
      { title: 'Plant code', dataIndex: 'plantCode', width: 120, align: 'center' },
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

    });
    // columns.push({
    //   title: 'Action', dataIndex: 'action', width: 120, align: 'center', fixed: 'right',
    //   render: (text, record) => {
    //     return (
    //       <Button onClick={() => onGenerateBom(record)}>Generate BOM</Button>
    //     )
    //   }

    // })

    const onGenerateBom = (record) => {
      navigate('/bom/trim-List', { state: { info: record } })
    }

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
            rowKey={record => record.id}
            rowSelection={rowSelection}
          // rowClassName={getRowClassName}
          />
        ) : (<Table size='large' />
        )}
      </>
    );

  }

  const onGenerate = () => {
    navigate('/bom/trim-List',{state:{info:selectedRowKeys}})
}

  return (
    <>
      <Card title="Bom Creation" headStyle={{ fontWeight: 'bold' }}>
        <Form onFinish={getData}
          form={form}
          layout='vertical'
        >
          <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }} >
              <Form.Item name='item' label='Item' >
                <Select showSearch placeholder="Select Item" optionFilterProp="children" allowClear mode='multiple'>
                  {item?.map((inc: any) => {
                    return <Option key={inc.id} value={inc.item}>{inc.item}</Option>
                  })}
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} style={{ padding: '15px' }}>
              <Form.Item>
                <Button htmlType="submit"
                  icon={<SearchOutlined />}
                  type="primary">Submit</Button>
                <Button
                  htmlType='button' icon={<UndoOutlined />} style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }}
                >
                  RESET
                </Button>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ padding: '25px' }}>
              <Button onClick={onGenerate} disabled={selectedRowKeys.length > 0 ? false : true} type='primary'>Generate</Button>
            </Col>
          </Row>

        </Form>
        {renderReport(filterData)}
      </Card>
    </>
  )
}
export default BomCreation

