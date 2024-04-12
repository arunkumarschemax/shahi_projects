import { NikeService } from "@project-management-system/shared-services"
import { Col, Row, message } from "antd"
import Form, { useForm } from "antd/lib/form/Form"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { title } from "process"
import React, { useEffect, useState } from "react"

export interface DestinationWisePoOrdersGraphProps { }

export function DestinationWisePoOrderGraph() {
  const [destinationData, setDestinationData] = useState<any[]>([]);
  const service = new NikeService();
  const form = useForm

  useEffect(() => {
    getDestinationWisePo();
  }, [])


  const getDestinationWisePo = () => {
    service.getDestinationWisePo().then(res => {
      if (res.status) {
        setDestinationData(res.data);
      } else {
        if (res.data) {
            setDestinationData([]);
          message.success("Data retrieve successfully");
        } else {
          message.success("Data retrieve successfully");
        }
      }
    }).catch(err => {
      message.error("Data not found");
      setDestinationData([]);
    })

  }

  const destination = destinationData.map(i => { return i.destination });
  const poCount = destinationData.map(i => { return Number(i.poCount) });
//   const itemQty = planData.map(i => { return Number(i.qty) });
  

  const config = {
    colors: ['#058DC7', '#50B432', '#FFC000', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
      type: 'bar',
    //   backgroundColor: '#CCCCFF'
    },

    title: {
      text: 'Destination-Wise Purchase Orders ',
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
      text: `Total Orders: ${poCount.reduce((a, b) => a + b, 0)}`,
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

    xAxis: {
      categories: destination,
      labels: {
        autoRotation: false,
        style: {
          color: 'var(--text-color,black)'
        }
      },
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      // tickAmount: 16,
      // tickPixelInterval: 100,
      title: {
        text: 'Accepted & UnAccepted Po s'
      },
      enabled: true,
      style: {
        color: 'var(--text-color,black)',
        fontSize: '1.15rem',
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
      labels: {
        style: {
          color: 'var(--text-color,black)'
        }
      }
    },

    // tooltip: {
    //   formatter: function () {
    //     return '<b>' + this.x + '</b><br/>' + 'No.of Projects: ' + this.y + '<br/>'

    //   }
    // },

    plotOptions: {
      bar: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },

    series: [
      {
        name: 'No of Purchase orders',
        data: poCount,
        // stack: 'male'
      },
    //   {
    //     name: 'Item Qty',
    //     data: itemQty,
    //     // stack: 'male'
    //   },
    ],

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
