import { NikeService } from "@project-management-system/shared-services"
import { Col, Row, message } from "antd"
import Form, { useForm } from "antd/lib/form/Form"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { title } from "process"
import React, { useEffect, useState } from "react"

export interface Shipment { }

export function ShipmentGraph() {
  const [shipmentData, setShipmentDataData] = useState<any[]>([]);
  const service = new NikeService();
  const form = useForm

  useEffect(() => {
    getShipmentWiseData();
  }, [])


  const getShipmentWiseData = () => {
    service.getShipmentWiseData().then(res => {
      if (res.status) {
        setShipmentDataData(res.data);
      } else {
        if (res.data) {
            setShipmentDataData([]);
          message.success("Data retrieve successfully");
        } else {
          message.success("Data retrieve successfully");
        }
      }
    }).catch(err => {
      message.error("Data not found");
      setShipmentDataData([]);
    })

  }

  const shipmentName = shipmentData.map(i => { return i.shipping_type });
  const unAccepted = shipmentData.map(i => { return Number(i.unAccepted) });
  const accepted = shipmentData.map(i => { return Number(i.Accepted) });
  
//   Number(topcancelledInfo.approved_budget).toLocaleString('en-IN', undefined)
  const config = {
    colors: ['#058DC7', '#50B432', '#FFC000', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
      type: 'column',
    //   backgroundColor: '#CCCCFF'
    },

    title: {
      text: 'Shipment Tracker',
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
    // subtitle: {
    //   text: `Total UnAccepted Cnt: ${(unAccepted.reduce((a, b) => a + b, 0)).toLocaleString('en-IN', undefined)} Total Accepted Cnt: ${(accepted.reduce((a, b) => a + b, 0)).toLocaleString('en-IN', undefined)}`,
    //   style: {
    //     color: 'var(--text-color,black)',
    //     fontSize: '0.8rem', // Adjust the font size as needed
    //     lineHeight: '1.4',
    //     marginBottom: '0',
    //     overflow: 'hidden',
    //     paddingTop: 'calc(2px*var(--scale-factor, 1))',
    //     position: 'relative',
    //     textOverflow: 'ellipsis',
    //     whiteSpace: 'nowrap',
    //     zIndex: '5',
    //     fontFamily: 'visuelt-bold-pro,Arial,sans-serif,Font Awesome\ 5 Pro',
    //     textAlign: 'left', // Align the subtitle text to the left
    //   },
    // },

    xAxis: {
      categories: shipmentName,
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
        text: 'No.Of Shipments'
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
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },

    series: [
      {
        name: 'Un Accepted',
        data: unAccepted,
        // stack: 'male'
      },
      {
        name: 'Accepted',
        data: accepted,
        // stack: 'male'
      },
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
