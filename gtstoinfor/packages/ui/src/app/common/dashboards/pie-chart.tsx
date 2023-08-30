import React, { useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Button, Card, Form, Tooltip, DatePicker, Empty, message } from "antd";
import { OrdersService, UploadDocumentService } from "@project-management-system/shared-services";
require("highcharts/modules/exporting")(Highcharts);



export function PieChart() {
  const [data, setData] = useState<any[]>([]);
  const service = new OrdersService()


  useEffect(() => {
    getPieChartData()
  }, [])

  const getPieChartData = () => {
    service.documentwisePercentage().then((res) => {
      if (res.status) {
        setData(res.data)
      } else {
        setData([])
      }
    })

  }


  const chartData = data[0]?.map(value => {
    return {
      name: value.docName,
      y: Number(value.perecent),
    }
  });

  const config = {

    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Document wise pending percentage'
    },
    subtitle: {
      text: `(Uploaded:${data[1]?.[1]?.count},Pending:${data[1]?.[0]?.count})`
    },
    tooltip: {
      pointFormat: ' <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      //   name: 'Reasons',
      colorByPoint: true,
      data: chartData
    }]
  }

  return (
    <Card style={{ textAlign: 'center' }} >
      {
        data.length ?
          <HighchartsReact highcharts={Highcharts} options={config} /> : <Empty />
      }
    </Card>

  )
}
export default PieChart;