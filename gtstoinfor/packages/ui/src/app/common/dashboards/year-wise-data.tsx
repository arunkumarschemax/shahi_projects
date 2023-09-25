import { OrdersService } from "@project-management-system/shared-services"
import { Col, Empty, Row, message } from "antd"
import Form, { useForm } from "antd/lib/form/Form"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { title } from "process"
import React, { useEffect, useState } from "react"

export interface YearWiseOrdersProps { }

export function YearWiseOrders() {
  const [statusData, setStatusData] = useState<any[]>([]);
  const form = useForm
  const service = new OrdersService();


  useEffect(() => {
    getStatusWiseItems();
  }, [])


  const getStatusWiseItems = () => {
    service.getYearWiseOrders().then(res => {
      if (res.status) {
        setStatusData(res.data);
      } else {
        if (res.data) {
          setStatusData([]);
          message.success("Data retrieve successfully");
        } else {
          message.success("Data retrieve successfully");
        }
      }
    }).catch(err => {
      message.error("Data not found");
      setStatusData([]);
    })

  }

  const data = statusData.map(i =>  [ i.year, Number(i.count)]);
  const count = statusData.map(i => { return  Number(i.count)});
  

  const config = {
    colors: [ '#7798BF', '#f9a556'  , '#DF5353','#99C846', '#FF0000', '#FFC000', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', ],
    chart: {
      type: 'pie',
    //   backgroundColor: '#CCCCFF'
    },

    title: {
      text: 'Year Wise Orders',
      style: {
        color: 'var(--text-color,black)',
        fontSize: '1.75rem',
        lineHeight: '1.4',
        marginBottom: '0',
        overflow: 'hidden',
        //  paddingTop: '2px',
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

    
    // tooltip: {
    //     pointFormat: '{series.department_name}: {point.percentage:.1f}%</b>'
    // },


    // plotOptions: {
    //   pie: {
    //     cursor: 'pointer',
    //     borderRadius: 5,
    //     stacking: 'normal',
    //     dataLabels: {
    //       enabled: true,
    //       format: '<b>{point.name}</b><br>{point.y}',
    //       distance: -50,
    //             filter: {
    //                 property: 'percentage',
    //                 operator: '>',
    //                 value: 4
    //             }
    //     }
    //   }
    // },
    credits: {
      enabled: false // Disable the Highcharts watermark
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.y}  Orders',
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
        }
    },

    series: [
      {
        name: 'No.of Orders' ,
        data: data,
        innerSize: '50%',
      }
    ]

  }
  return (
    <Form layout="vertical" name="control-hooks">
      <Row gutter={24}>

        {statusData.length ?
        <Col span={24}>
          <div><HighchartsReact highcharts={Highcharts} options={config} /></div>
        </Col>
         : <Empty/> 
         } 
      </Row>
    </Form>

  )
}
