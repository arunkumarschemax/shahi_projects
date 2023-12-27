import { YearReq } from '@project-management-system/shared-models';
import { OrdersService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Radio, RadioChangeEvent, Row, Select, Table } from 'antd';
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
    const [flattenedPahseData, setFlattenedPhaseData] = useState<any[]>([])

    const [distinctMonths, setDistinctMonths] = useState<any[]>([])
    const [phseDistinctMonths, setPhaseDistinctMonths] = useState<any[]>([])

     const [form] = Form.useForm();


    useEffect(() => {
        getDistinctYears()
    }, [])

    useEffect(() => {
        getData(undefined)
    }, [selectedYear, selectedCompParam])

    const getData = (value) => {
        const req = new YearReq(selectedYear, selectedCompParam,undefined,undefined,value);
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
                getFlattenPhasewiseData(res.data)
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
                    let inPcsSum =0
                    let inCoeffSum =0
                    const itemRowSpan = phaseIndex == 0 ? rec.monthWiseData.length : 0
                    const phaseType = phase.phaseType
                    // const totalCoeffpcs=phase.totalCoeffpcs
                    // const totalInpcs=phase.totalInpcs
                    const monthsArr: any = []
                    const monthWiseObj = {}
                    for (const month of phase.pcsData) {
                        const monthName = month.monthName
                        monthWiseObj[`${monthName}_inCoeffPcs`] = month.inCoeffPcs,
                            monthWiseObj[`${monthName}_inPcs`] = month.inPcs
                        monthHeadersSet.add("" + monthName);
                        inCoeffSum += parseFloat(month.inCoeffPcs) || 0;
                        inPcsSum +=parseFloat(month.inPcs)
                    }
                    monthsArr.push(monthWiseObj)
                    const obj = {
                        itemName,
                        itemRowSpan,
                        phaseType,
                        monthsArr,
                        inPcsSum,
                        inCoeffSum
                    }
                    flattenedArrTemp.push(obj)

                }
            }
            setFlattenedReportData(flattenedArrTemp)
            console.log(flattenedArrTemp)
            //-----------------------------------------------------------------//
            setDistinctMonths(Array.from(monthHeadersSet))
        }
    }


    function getFlattenPhasewiseData(data: any[]) {
        if(data.length){
            const flattenedArrTemp = []
            const monthHeadersSet = new Set<string>();
            let inPcsSum =0
            let inCoeffSum =0
            for(const rec of data){
                const phaseType=rec.phase
                const monthsArr: any = []
                const monthWiseObj = {}
                let itemRowSpan
                for(const [monthIndex, month] of rec.itemData.entries()){
                     itemRowSpan = monthIndex == 0 ? rec.itemData.length : 0
                    const monthname = month.monthName
                    monthWiseObj[`${monthname}_inPcs`] = month.inPcs
                    monthWiseObj[`${monthname}_coeffPcs`] =  month.coeffPcs
                    monthHeadersSet.add("" + monthname)
                    inCoeffSum += parseFloat(month.coeffPcs) || 0;
                    inPcsSum +=parseFloat(month.inPcs)

                }

                monthsArr.push(monthWiseObj)
                const obj ={
                    itemRowSpan,
                    phaseType,
                    monthsArr,
                    inCoeffSum,
                    inPcsSum
                }
                flattenedArrTemp.push(obj)
            }
            console.log(flattenedArrTemp)
            setFlattenedPhaseData(flattenedArrTemp)
            setPhaseDistinctMonths(Array.from(monthHeadersSet))

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
    const childTitles2 = (noOfTh) => {
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

    const CustomTitle2 = () => {
        return (
            <table className="custom-tbl">
                <thead className="ant-table-thead">
                    <tr>
                        {
                            phseDistinctMonths.length ?
                            phseDistinctMonths.map((m, i) => {
                                    const exCls = i % 2 ? 'even-color' : 'odd-color';

                                    return <th colSpan={2} className={`ant-table-cell ${exCls}`} scope="col" >{m}</th>

                                }) : <th></th>

                        }
                    </tr>
                    <tr>
                        {childTitles2(phseDistinctMonths.length)}
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
    function getMonthWiseColumns2() {
        const monthWiseColumns: { [key: string]: any }[] = [];
        Array.from(phseDistinctMonths).forEach((month) => {
            monthWiseColumns.push({ dataIndex: `${month}_coeffPcs`, width: '60px', render: (value: any) => value ? value : 0 });
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
        {
            title:'Total InPcs',
            dataIndex:'inPcsSum'
        },
        {
            title:'Total InCoeff Pcs',
            dataIndex:'inCoeffSum'
        }
    ]

    const columns2 = [
        {
            title:'Phase Type',
            dataIndex:'phaseType',
            width:'50px',
        },
        {
            title: <CustomTitle2 />,
            dataIndex: "itemData",
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
                    columns={getMonthWiseColumns2()}
                    pagination={false}
                    rowKey={(record) => record.phase}
                />

            ),
        },
        {
            title:'Total InPcs',
            dataIndex:'inPcsSum'
        },
        {
            title:'Total InCoeff Pcs',
            dataIndex:'inCoeffSum'
        }
    ]
    // console.log(flattenedPahseData)
    const itemOnchange = (value) =>{
        getData(value)
    }
    const onResetFunction = () =>{
        form.resetFields(['ItemName'])
        getData(undefined)
    }

    const generateSummary = (data) =>{
        const months = [
            "january",
            "february",
            "march",
            "april",
            "may",
            "june",
            "july",
            "august",
            "september",
            "october",
            "november",
            "december",
          ];
          console.log(data)

          return(
            <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}>Total</Table.Summary.Cell>
              {/* <Table.Summary.Cell index={3}>
                <div>
                  <table className="custom-tbl">
                  <thead>
                        <tr>
                        <th className="ant-table-cell" scope="col" style={{ width: `${colWidth.proPlanType}px` }}></th>
    {totalValues.map((val, index) => (
      <th className="ant-table-cell" scope="col" style={{ width: `${(index % 2) ? colWidth.Pcs : colWidth.coeff}px`, textAlign: 'right' }}>
        {val}
      </th>
    ))}
    <th className="ant-table-cell" scope="col" style={{ width: `${colWidth.totalPcs}px`, textAlign: 'right' }}>{totalPre.toLocaleString()}</th>
    <th className="ant-table-cell" scope="col" style={{ width: `${colWidth.totalcoeff}px`, textAlign: 'right' }}>{totalLat.toLocaleString()}</th>
    
                        </tr>
                        </thead>
                      </table>
                </div>
              </Table.Summary.Cell> */}
            </Table.Summary.Row>
          </>
          )
    }




    return (
        <Card>
            <Form layout='vertical' form={form}>
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
                        <Form.Item name={'ItemName'} label={'Planning Sum'}>
                        <Select
                            showSearch
                            placeholder="Select Planning Sum"
                            optionFilterProp="children"
                            allowClear
                            onChange={itemOnchange}
                          >
                            {monthWiseData.map((e) => (
                              <Option key={e.itemName} value={e.itemName}>
                                {e.itemName}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item name={'reset'}>
                                <Button type='primary' style={{ marginTop: 25 }} onClick={onResetFunction}>{'Reset'}</Button>
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
                    <Col span={4} style={{ marginTop: 17 }}>
                    <Card
                        title={"Total Items : " + monthWiseData.length}
                        style={{
                          textAlign: "center",
                          width: 150,
                          height: 35,
                          borderRadius: 8,
                          backgroundColor: "#EBEBF1",
                        }}
                        size="small"
                      ></Card>
                    </Col>
                </Row>
                <Row>
                    <Table scroll={{ x: 'max-content', y: '1000px' }} bordered columns={columns} dataSource={flattenedReportData} pagination={false} 
                    // summary={generateSummary}
                    />
                    <Table scroll={{ x: 'max-content', y: '1000px' }} bordered columns={columns2} dataSource={flattenedPahseData}/>
                </Row> 
            </Form>

        </Card>
    )
}
