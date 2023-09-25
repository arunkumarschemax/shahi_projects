import { OrdersService } from "@project-management-system/shared-services"
import { Col, Row, message } from "antd"
import Form, { useForm } from "antd/lib/form/Form"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { title } from "process"
import React, { useEffect, useState } from "react"

export interface DivisionWiseOrdersProps { }

export function DivisionWiseOrders() {
  const [divisionData, setDivisionProData] = useState<any[]>([]);
  const service = new OrdersService();
  const form = useForm

  useEffect(() => {
    getDivisionWiseOrders();
  }, [])


  const getDivisionWiseOrders = () => {
    service.getDivisionWiseOrders().then(res => {
      if (res.status) {
        setDivisionProData(res.data);
      } else {
        if (res.data) {
          setDivisionProData([]);
          message.success("Data retrieve successfully");
        } else {
          message.success("Data retrieve successfully");
        }
      }
    }).catch(err => {
      message.error("Data not found");
      setDivisionProData([]);
    })

  }

  const data = divisionData.map(i =>  [ i.department, Number(i.count)]);
  const count = divisionData.map(i => { return Number(i.count) });
  

  const config = {
    colors: ['#2080E0','#058DC7', '#50B432', '#FFC000', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
      type: 'pie',
    //   backgroundColor: '#CCCCFF'
    },

    title: {
      text: 'Division Wise Orders',
      style: {
        color: 'var(--text-color,black)',
        fontSize: '1.75rem',
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
    },
    subtitle: {
      text: `Total Orders: ${count.reduce((a, b) => a + b, 0)}`,
      style: {
        color: 'var(--text-color,black)',
        fontSize: '0.8rem', // Adjust the font size as needed
        lineHeight: '1.4',
        marginBottom: '0',
        overflow: 'hidden',
        paddingTop: 'calc(2px*var(--scale-factor, 1))',
        position: 'relative',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        zIndex: '5',
        fontFamily: 'visuelt-bold-pro,Arial,sans-serif,Font Awesome\ 5 Pro',
        textAlign: 'left', // Align the subtitle text to the left
      },
    },
    credits: {
      enabled: false // Disable the Highcharts watermark
    },

    
    // tooltip: {
    //     pointFormat: '{series.department_name}: {point.percentage:.1f}%</b>'
    // },


    plotOptions: {
      pie: {
        cursor: 'pointer',
        borderRadius: 5,
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.y}',
          distance: -50,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
        }
      }
    },

    series: [
      {
        name: 'No.of Orders' ,
        data: data,
      }
    ]

  }
  return (
    <Form layout="vertical" name="control-hooks">
      <Row gutter={24}>

        {/* {containerData.length ? */}
        <Col span={24}>
          <div><HighchartsReact highcharts={Highcharts} options={config} /></div>
        </Col>
        {/* : <Empty/> */}
        {/* } */}
      </Row>
    </Form>

  )
}
