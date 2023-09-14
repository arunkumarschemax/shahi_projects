import React, { useState, useEffect } from 'react';
import { BackTop, Card, Col, Form, Select, Row } from 'antd';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment';
import { NikeService } from '@project-management-system/shared-services';
import { PoDataResDto, PoQtyDReqDto, ReportType } from '@project-management-system/shared-models';
import { title } from 'process';

export interface PoQuantityWiseProps { }

export function PoQuantityWiseGraph() {
  const [Data, setData] = useState<any[]>([]);
  const service = new NikeService();
  const [poData, setPoData] = useState<PoDataResDto>();
  const [graphType, setGraphType] = useState(ReportType.DAYWISE)
   const [form] = Form.useForm();
    const [selectedMonth, setSelectedMonth] = useState<any>(moment().month() + 1);
    const [selectedYear, setSelectedYear] = useState<any>(moment().year());
    const { Option } = Select;

 

  Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});


    useEffect(() => {
        const currentMonth = moment().month()
        getPoQty(currentMonth);
        years(0);
    }, [selectedMonth, graphType, selectedYear])

    const getPoQty = (currentMonth?: number) => {
        const req = new PoQtyDReqDto
        req.month = Number(selectedMonth)
        
        req.year = Number(selectedYear)
        req.reportType = graphType;
        service.getPoAndQtyDashboard(req).then((res) => {
            if (res.status) {
                setPoData(res.data)
                //console.log(res.data, 'data')
                //AlertMessages.getSuccessMessage(res.internalMessage);
            } else {
                setPoData(undefined);
                //AlertMessages.getErrorMessage(res.internalMessage);
            }
        });
    };

    const poGraphData = poData?.PoData.poQty.map(i => { return { y: Number(i), color: '#2578CB ', name: '' } })
    console.log(poGraphData, '----')



    
    const options = {
        title: { text: "Temporal Quantity Trends" },
        chart: {
            
            type: 'column',
            style: {
                color: 'var(--text-color,black)',
                fontSize: '1rem',
                lineHeight: '1.4',
                marginBottom: '0',
                overflow: 'hidden',
                // paddingTop: '2px',
                paddingTop: 'calc(2px*var(--scale-factor, 1))',
                position: 'relative',
                textOverFlow: 'ellipsis',
                whiteSpace: 'nowrap',
                zIndex: '5',
                fontFamily: 'visuelt-bold-pro,Arial,sans-serif,Font Awesome\ 5 Pro',
            },
            backgroundColor: '#FFFFFF'
        },
        series: [

            {
                data: poGraphData,
                name: "PoQty",
                borderWidth: 0,
                point: {
                    events: {}
                },
                dataLabels: {
                    enabled: false,
                    overflow: "allow",
                    crop: false
                },
                legendIndex: 1
            },
           


        ],
       
    plotOptions: {
        series: {
            cursor: "pointer",
            stickyTracking: false,
        },
        column: {
            groupPadding: 0.05,
            pointPadding: 0.05,
            dataLabels: {
                enabled: graphType === ReportType.WEEKWISE || graphType === ReportType.QUARTERWISE, 
                format: '{point.y}',
                style: {
                    color: 'var(--text-color,black)',
                    fontWeight: 'bold',
                },
            },
        }
    },
        xAxis: {
            title: {
                text: graphType,
                style: {
                    color: 'var(--text-color,black)',
                   // fontFamily: 'Your Preferred Font, sans-serif', 
                    
                }
            },
            enabled: true,
            stackLabels: {
                enabled: true
            },
            
            labels: {
                style: {
                    color: 'var(--text-color,black)'
                }
            },
            
            type: "category",
            categories: poData?.names ?? [] ,
            reversed: false,
           
                plotOptions: {
                    column: {
                      stacking: 'normal',
                      format: '{total}',
                      dataLabels: {
                        enabled: true
                      }
                    }
                  },

        },
        yAxis: [
            {
                id: "default: 0",
                title: {
                    text: "Po Qty",
                    style: {
                        color: 'black'
                    },
                },
                enabled: true,
                labels: {
                    style: {
                        color: 'var(--text-color,black)'
                    },
                    
                },
               
            },
        ],

       
    };

    const months = [
        {
            month: 'January',
            monthId: 1
        }, {
            month: 'February',
            monthId: 2
        }, {
            month: 'March',
            monthId: 3
        }, {
            month: 'April',
            monthId: 4
        }
        , {
            month: 'May',
            monthId: 5
        }
        , {
            month: 'June',
            monthId: 6
        }
        , {
            month: 'July',
            monthId: 7
        }
        , {
            month: 'August',
            monthId: 8
        }
        , {
            month: 'September',
            monthId: 9
        }
        , {
            month: 'October',
            monthId: 10
        }
        , {
            month: 'November',
            monthId: 11
        }
        , {
            month: 'December',
            monthId: 12
        }
    ]

    const years = (back) => {
        const year = new Date().getFullYear();
        return Array.from({ length: back }, (v, i) => year - back + i + 1);
    }
    const lastTenYears = years(10)

    return (
        <>
        
            <Form layout="vertical" form={form} name="control-hooks">
                <Row gutter={24} justify='center'>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }}>
                        <Form.Item name="graphType" label="Graph" initialValue={ReportType.DAYWISE}
                            rules={[
                                {
                                    required: true, message: 'Missing Graph Type',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select Graph Type"
                                allowClear
                                onChange={(value) => { setGraphType(value) }}
                                defaultValue={ReportType.DAYWISE}
                            >
                                <Option key={0} value={null}>Select Graph Type</Option>
                                {Object.values(ReportType).map((value) => {
                                    return <Option key={value} value={value}>{value}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 5 }} style={{ display: (graphType == ReportType.DAYWISE || graphType == ReportType.WEEKWISE) ? 'unset' : 'none' }}>
                        <Form.Item name="monthWise" label="Month"
                            rules={[
                                {
                                    required: false,
                                },
                            ]} >
                            <Select
                                placeholder="Select Month"
                                allowClear
                                onSelect={(value) => { setSelectedMonth(value) }}
                                defaultValue={(moment().format('MMMM'))}
                            >
                                {months.map((i) => {
                                    return <Option key={i.monthId} value={i.monthId}>{i.month}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} style={{ display: graphType == ReportType.QUARTERWISE ? 'unset' : 'none' }}>
                        <Form.Item name="quarterly" label="Years"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}>
                            <Select
                                placeholder="Select Year"
                                allowClear
                                onSelect={(value) => { setSelectedYear(value) }}
                                defaultValue={moment().format('YYYY')}
                            >
                                {lastTenYears.map((value) => {
                                    return <Option key={value} value={value}>{value}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <br /><br />
            <div>
                <HighchartsReact key={Date.now()} highcharts={Highcharts} options={options} />
            </div>
           
        </>
    )
}
export default PoQuantityWiseGraph;

