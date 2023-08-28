import React, { useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Button, Card, Form, Tooltip,DatePicker, Empty, message } from "antd";
import { OrdersService, UploadDocumentService } from "@project-management-system/shared-services";
require("highcharts/modules/exporting")(Highcharts);



export function PieChart() {
  const [data, setData] = useState<any[]>([]);
  const service = new OrdersService()


  useEffect(() =>{
    getPieChartData()
  },[])

    const getPieChartData=() =>{
    service.documentwisePercentage().then((res) =>{
        if(res.status){
            setData(res.data)
        }else{
            setData([])
        }
    })
 
}


  const chartData = data.map(value => {
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
      text: 'Document wise pending percentage '
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
      <Card  style={{textAlign:'center'}} >      
        {
          data.length ?
          <HighchartsReact highcharts={Highcharts} options={config}  /> : <Empty />
          }
        </Card>

  )
}
export default PieChart;