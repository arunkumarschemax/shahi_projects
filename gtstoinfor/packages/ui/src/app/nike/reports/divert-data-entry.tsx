import { FileExcelFilled, RightSquareOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { FactoryUpdateRequest, MarketingModel, MarketingReportModel, MarketingReportSizeModel, PpmDateFilterRequest } from '@project-management-system/shared-models';
import { NikeService } from '@project-management-system/shared-services';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, message, Space, Tag, Statistic, Modal, TreeSelect, Tooltip, Checkbox, Popconfirm, Switch } from 'antd';
import { CSVLink } from "react-csv";
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
    const [docType, setDocType] = useState<any>([]);
    const [poLineItemNumber, setPoLineItemNumber] = useState<any>([]);
    const [styleNumber, setStyleNumber] = useState<any>([]);
    const [planSesCode, setPlanSesCode] = useState<any>([]);
    const [planSesYear, setPlanSesYear] = useState<any>([]);
    const [geoCode, setGeoCode] = useState<any>([]);
    const [hideChildren, setHideChildren] = useState(true);
    const [csvData, setcsvData] = useState([]);
    let navigate = useNavigate()
    const [tableLoading, setTableLoading] = useState<boolean>(false)
    const formatter = (value: number) => <CountUp end={value} separator="," />;
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [poLineProp, setPoLineProp] = useState<any>([]);
    const [remarkModal, setRemarkModal] = useState<boolean>(false)
    const [itemText, setRemarks] = useState<string>('')
    const [expandedActualUnit, setExpandedActualUnit] = useState({});
    const [expandedQuantityAllocation, setExpandedQuantityAllocation] = useState({});
    const [textareaValuesActualUnit, setTextareaValuesActualUnit] = useState({});

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


    const onReset = () => {
        form.resetFields()
        setGridData([])
        setFilterData([])
        setFilteredData([])
    }


    const showModal1 = (record: any) => {
        setPoLineProp(record)
        setIsModalOpen1(true);
    };

    return (
        <>
            <Card title="PPM Marketing Report" headStyle={{ color: 'black', fontWeight: 'bold' }}>
                <Form
                    //   onFinish={}
                    form={form}
                    layout='vertical'>
                    <Card>
                        <Row gutter={24}>
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
                                    {/* <Button style={{ margin: 10, backgroundColor: "#162A6D", color: "white", position: "relative" }} onClick={toggleHideChildren}>Hide Columns</Button> */}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Form>
                {/* <Modal
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
        </Modal> */}
            </Card>
        </>
    )
}

export default PPMReport;
