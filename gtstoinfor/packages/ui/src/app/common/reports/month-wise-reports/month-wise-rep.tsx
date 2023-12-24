import { YearReq } from '@project-management-system/shared-models';
import { OrdersService } from '@project-management-system/shared-services';
import { Card, Col, Form, Radio, RadioChangeEvent, Row, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
const { Option } = Select
const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

interface MonthWiseReportModel {
    itemName: string;
    phaseType: string;
}

export default function MonthWiseReportV2() {
    const service = new OrdersService();
    const [monthWiseData, setMonthWiseData] = useState<any[]>([])
    const [phaseWiseData, setphaseWiseData] = useState<any[]>([])
    const [distinctYears, setDistinctYears] = useState<any[]>();
    const [selectedYear, setSelectedYear] = useState<any>()
    const [selectedCompParam, setSelectedCompParam] = useState<any>("ExFactory")
    const [flattenedReportData, setFlattenedReportData] = useState<any[]>([])
    const [distinctMonths, setDistinctMonths] = useState<any[]>([])

    useEffect(() => {
        getDistinctYears()
    }, [])

    useEffect(() => {
        getData()
    }, [selectedYear, selectedCompParam])

    const getData = () => {
        const req = new YearReq(selectedYear, selectedCompParam);
        service.getMonthWiseReportDataNew(req).then((res) => {
            if (res.status) {
                setMonthWiseData(res.data)
                getFlattenReportData(res.data)
            } else {
                setMonthWiseData([]);
            }
        });

        service.getPhaseMonthExcelDataNew(req).then((res) => {
            // console.log(res,"*********")
            if (res.status) {
                setphaseWiseData(res.data);
            } else {
                setphaseWiseData([]);
            }
        });

    };

    const getDistinctYears = () => {
        service.getExfactoryYearData().then((res) => {
            if (res.status) {
                // handleChange(res.data[0])
                setDistinctYears(res.data)
                if (res.data.length > 0) {
                    setSelectedYear(res.data[0].year)
                }
            }
        });
    };

    function yearOnchange(e: RadioChangeEvent) {
        setSelectedYear(e.target.value)
    }

    function comparisionParamsOnChange(value) {
        setSelectedCompParam(value)
    }

    function getFlattenReportData(data: any[]) {
        if (data.length) {
            const flattenedArrTemp = []
            const monthHeadersSet = new Set<string>();

            for (const rec of data) {
                // const itemRowSpan = rec.monthWiseData.length
                const itemName = rec.itemName
                for (const [phaseIndex, phase] of rec.monthWiseData.entries()) {
                    const itemRowSpan = phaseIndex == 0 ? rec.monthWiseData.length : 0
                    const phaseType = phase.phaseType
                    const monthsArr: any = []
                    const monthWiseObj = {}
                    for (const month of phase.pcsData) {
                        const monthName = month.monthName
                        monthWiseObj[`${monthName}_inCoeffPcs`] = month.inCoeffPcs,
                            monthWiseObj[`${monthName}_inPcs`] = month.inPcs

                        //----------------------------------------------------------------//

                        monthHeadersSet.add("" + monthName);

                    }
                    monthsArr.push(monthWiseObj)
                    const obj = {
                        itemName,
                        itemRowSpan,
                        phaseType,
                        monthsArr
                    }
                    flattenedArrTemp.push(obj)

                }
            }
            setFlattenedReportData(flattenedArrTemp)

            //-----------------------------------------------------------------//
            setDistinctMonths(Array.from(monthHeadersSet))
        }
    }

    const childTitles = (noOfTh) => {
        const ths = [];
        for (let i = 0; i < noOfTh; i++) {
            const exCls = i % 2 ? 'even-color' : 'odd-color';
            ths.push(<th className={`ant-table-cell ${exCls}`} scope="col" style={{ width: '60px' }} >In Coef</th>)
            ths.push(<th className={`ant-table-cell ${exCls}`} scope="col" style={{ width: '50px' }} >In Pcs</th>)

        }
        return ths;
    }

    const CustomTitle = () => {
        return (
            <table className="custom-tbl">
                <thead className="ant-table-thead">
                    <tr>
                        {
                            distinctMonths.length ?
                                distinctMonths.map((m, i) => {
                                    const exCls = i % 2 ? 'even-color' : 'odd-color';

                                    return <th colSpan={2} className={`ant-table-cell ${exCls}`} scope="col" >{m}</th>

                                }) : <th></th>

                        }
                    </tr>
                    <tr>
                        {childTitles(distinctMonths.length)}
                    </tr>
                </thead>
            </table>


        );
    };


    function getMonthWiseColumns() {
        const monthWiseColumns: { [key: string]: any }[] = [];
        Array.from(distinctMonths).forEach((month) => {
            monthWiseColumns.push({ dataIndex: `${month}_inCoeffPcs`, width: '60px', render: (value: any) => value ? value : 0 });
            monthWiseColumns.push({ dataIndex: `${month}_inPcs`, width: '50px', render: (value: any) => value ? value : 0 });
        });;
        return monthWiseColumns

    }



    const columns = [
        {
            title: 'Item',
            dataIndex: 'itemName',
            // onCell: (record, index) => {
            //     return {
            //         rowSpan: record.itemRowSpan,
            //     }
            // },
            render: (text, record, index) => {
                const obj: any = {
                    children: text,
                    props: { rowSpan: record.itemRowSpan },
                };
                return obj;
            },
        },
        {
            title: 'Phase type',
            dataIndex: 'phaseType'
        },
        {
            title: <CustomTitle />,
            dataIndex: "monthWiseData",
            // align: "center",
            padding: 0,
            // style: { padding: '0px',textAlign:'center' },
            onHeaderCell: (column: any) => {
                return {
                    style: {
                        padding: 0,
                    },
                };
            },
            render: (text: any, record: any) => (
                <Table
                    showHeader={false}
                    bordered={false}
                    className="report-child-tbl"
                    dataSource={record.monthsArr}
                    columns={getMonthWiseColumns()}
                    pagination={false}
                    rowKey={(record) => record.itemName}
                />

            ),
        },
    ]
    return (
        <Card>
            <Form layout='vertical'>
                <Row gutter={24} style={{ paddingTop: '50px' }}>
                    <Col span={4}>
                        <Form.Item label='Comparision parameter'>
                            <Select
                                showSearch
                                placeholder="Comparision parameter"
                                optionFilterProp="children"
                                allowClear
                                style={{ width: '100%' }}
                                onChange={comparisionParamsOnChange}
                                defaultValue={"ExFactory"}
                            >
                                <Option key={"ExFactory"} value={"ExFactory"}>
                                    Ex-Factory
                                </Option>
                                <Option key={"WareHouse"} value={"WareHouse"}>
                                    WareHouse
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label={'Years'}>
                            <Radio.Group onChange={yearOnchange} buttonStyle='solid' defaultValue={selectedYear} value={selectedYear} style={{ marginBottom: 8 }}>
                                {
                                    distinctYears?.map((y) => {
                                        return <Radio.Button value={y.year}>{y.year}</Radio.Button>
                                    })
                                }
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Table scroll={{ x: 'max-content', y: '1000px' }} bordered columns={columns} dataSource={flattenedReportData} />
                </Row>
            </Form>

        </Card>
    )
}
