// import { OrdersService } from "@project-management-system/shared-services"
// import { Col, Row, message } from "antd"
// import Form, { useForm } from "antd/lib/form/Form"
// import Highcharts from "highcharts"
// import HighchartsReact from "highcharts-react-official"
// import { title } from "process"
// import React, { useEffect, useState } from "react"

// export interface UnitWiseOrdersGraphProps { }

// export function UnitWiseOrderGraph() {
//   //const [unitData, setUnitProData] = useState<any[]>([]);
//   const service = new OrdersService();
//   const form = useForm

//   // useEffect(() => {
//   //   getUnitWiseOrders();
//   // }, [])


//   // const getUnitWiseOrders = () => {
//   //   service.getUnitWiseOrders().then(res => {
//   //     if (res.status) {
//   //       setUnitProData(res.data);
//   //     } else {
//   //       if (res.data) {
//   //         setUnitProData([]);
//   //         message.success("Data retrieve successfully");
//   //       } else {
//   //         message.success("Data retrieve successfully");
//   //       }
//   //     }
//   //   }).catch(err => {
//   //     message.error("Data not found");
//   //     setUnitProData([]);
//   //   })

//   // }

//   // const unitName = unitData.map(i => { return i.business_unit });
//   // const count = unitData.map(i => { return Number(i.count) });
  

//   const config = {
//     colors: ['#058DC7', '#50B432', '#FFC000', '#7798BF', '#aaeeee', '#ff0066',
//       '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
//     chart: {
//       type: 'column',
//     //   backgroundColor: '#CCCCFF'
//     },

//     title: {
//       text: 'Unit Wise Uploads',
//       style: {
//         color: 'var(--text-color,black)',
//         fontSize: '1.75rem',
//         lineHeight: '1.4',
//         marginBottom: '0',
//         overflow: 'hidden',
//         // paddingTop: '2px',
//         paddingTop: 'calc(2px*var(--scale-factor, 1))',
//         position: 'relative',
//         textOverFlow: 'ellipsis',
//         whiteSpace: 'nowrap',
//         zIndex: '5',
//         fontFamily: 'visuelt-bold-pro,Arial,sans-serif,Font Awesome\ 5 Pro',
//       },
//     },
//     subtitle: {
//       text: `Total Uploads`,
//       style: {
//         color: 'var(--text-color,black)',
//         fontSize: '0.8rem', // Adjust the font size as needed
//         lineHeight: '1.4',
//         marginBottom: '0',
//         overflow: 'hidden',
//         paddingTop: 'calc(2px*var(--scale-factor, 1))',
//         position: 'relative',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap',
//         zIndex: '5',
//         fontFamily: 'visuelt-bold-pro,Arial,sans-serif,Font Awesome\ 5 Pro',
//         textAlign: 'left', // Align the subtitle text to the left
//       },
//     },

//     xAxis: {
//       categories: 'unitName',
//       labels: {
//         autoRotation: false,
//         style: {
//           color: 'var(--text-color,black)'
//         }
//       },
//     },

//     yAxis: {
//       allowDecimals: false,
//       min: 0,
//       // tickAmount: 16,
//       // tickPixelInterval: 100,
//       title: {
//         text: 'Number of Uploads'
//       },
//       enabled: true,
//       style: {
//         color: 'var(--text-color,black)',
//         fontSize: '1.15rem',
//         lineHeight: '1.4',
//         marginBottom: '0',
//         overflow: 'hidden',
//         // paddingTop: '2px',
//         paddingTop: 'calc(2px*var(--scale-factor, 1))',
//         position: 'relative',
//         textOverFlow: 'ellipsis',
//         whiteSpace: 'nowrap',
//         zIndex: '5',
//         fontFamily: 'visuelt-bold-pro,Arial,sans-serif,Font Awesome\ 5 Pro',
//       },
//       labels: {
//         style: {
//           color: 'var(--text-color,black)'
//         }
//       }
//     },

//     // tooltip: {
//     //   formatter: function () {
//     //     return '<b>' + this.x + '</b><br/>' + 'No.of Projects: ' + this.y + '<br/>'

//     //   }
//     // },

//     plotOptions: {
//       column: {
//         stacking: 'normal',
//         dataLabels: {
//           enabled: true
//         }
//       }
//     },

//     series: [{
//       name: 'units',
//       colorByPoint: true,
//       data: [{
//           name: 'unit-1',
//           y: 70,
//           sliced: true,
//           selected: true
//       }, {
//           name: 'unit-2',
//           y: 14
//       },  {
//           name: 'unit-3',
//           y: 40
//       }]
//   }]

//   }
//   return (
//     <Form layout="vertical" name="control-hooks">
//       <Row gutter={24}>

//         {/* {containerData.length ? */}
//         <Col span={24}>
//           <div><HighchartsReact highcharts={Highcharts} options={config} /></div>
//         </Col>
//         {/* : <Empty/> */}
//         {/* } */}
//       </Row>
//     </Form>

//   )
// }

// import { OrdersService } from "@project-management-system/shared-services"
// import { Col, Row, message } from "antd"
// import Form, { useForm } from "antd/lib/form/Form"
// import Highcharts from "highcharts"
// import HighchartsReact from "highcharts-react-official"
// import { title } from "process"
// import React, { useEffect, useState } from "react"

// export interface DivisionWiseOrdersProps { }

// export function DivisionWiseOrders() {
//  // const [divisionData, setDivisionProData] = useState<any[]>([]);
//   const service = new OrdersService();
//   const form = useForm

//   // useEffect(() => {
//   //   getDivisionWiseOrders();
//   // }, [])


//   // const getDivisionWiseOrders = () => {
//   //   service.getDivisionWiseOrders().then(res => {
//   //     if (res.status) {
//   //       setDivisionProData(res.data);
//   //     } else {
//   //       if (res.data) {
//   //         setDivisionProData([]);
//   //         message.success("Data retrieve successfully");
//   //       } else {
//   //         message.success("Data retrieve successfully");
//   //       }
//   //     }
//   //   }).catch(err => {
//   //     message.error("Data not found");
//   //     setDivisionProData([]);
//   //   })

//   // }

//   // const data = divisionData.map(i =>  [ i.department_name, Number(i.count)]);
//   // const count = divisionData.map(i => { return Number(i.count) });
  

//   const config = {
//     colors: ['#058DC7', '#50B432', '#FFC000', '#7798BF', '#aaeeee', '#ff0066',
//       '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
//     chart: {
//       type: 'pie',
//     //   backgroundColor: '#CCCCFF'
//     },

//     title: {
//       text: 'Division Wise Uploads',
//       style: {
//         color: 'var(--text-color,black)',
//         fontSize: '1.75rem',
//         lineHeight: '1.4',
//         marginBottom: '0',
//         overflow: 'hidden',
//         // paddingTop: '2px',
//         paddingTop: 'calc(2px*var(--scale-factor, 1))',
//         position: 'relative',
//         textOverFlow: 'ellipsis',
//         whiteSpace: 'nowrap',
//         zIndex: '5',
//         fontFamily: 'visuelt-bold-pro,Arial,sans-serif,Font Awesome\ 5 Pro',
//       },
//     },
//     subtitle: {
//       text: `Total Uploads`,
//       style: {
//         color: 'var(--text-color,black)',
//         fontSize: '0.8rem', // Adjust the font size as needed
//         lineHeight: '1.4',
//         marginBottom: '0',
//         overflow: 'hidden',
//         paddingTop: 'calc(2px*var(--scale-factor, 1))',
//         position: 'relative',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap',
//         zIndex: '5',
//         fontFamily: 'visuelt-bold-pro,Arial,sans-serif,Font Awesome\ 5 Pro',
//         textAlign: 'left', // Align the subtitle text to the left
//       },
//     },

    
//     // tooltip: {
//     //     pointFormat: '{series.department_name}: {point.percentage:.1f}%</b>'
//     // },


//     plotOptions: {
//       pie: {
//         cursor: 'pointer',
//         borderRadius: 5,
//         stacking: 'normal',
//         dataLabels: {
//           enabled: true,
//           format: '<b>{point.name}</b><br>{point.y}',
//           distance: -50,
//                 filter: {
//                     property: 'percentage',
//                     operator: '>',
//                     value: 4
//                 }
//         }
//       }
//     },

//     series: [
//       {
//         name: 'No.of Uploads' ,
//         //data: data,
//       }
//     ]

//   }
//   return (
//     <Form layout="vertical" name="control-hooks">
//       <Row gutter={24}>

//         {/* {containerData.length ? */}
//         <Col span={24}>
//           <div><HighchartsReact highcharts={Highcharts} options={config} /></div>
//         </Col>
//         {/* : <Empty/> */}
//         {/* } */}
//       </Row>
//     </Form>

//   )
// }
import { AlertMessages } from "@project-management-system/shared-models"
import { OrdersService } from "@project-management-system/shared-services"
import { Col, Row } from "antd"
import Form, { useForm } from "antd/lib/form/Form"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { title } from "process"
import React, { useEffect, useState } from "react"

export interface DocumentWiseDocumentsProps { }

export function DocumentWiseDocumentsGraph() {
  const form = useForm

  useEffect(() => {
    getDocumentWiseData();
  }, [])
  const [docData, setDocData] = useState<any[]>([]);

  const getDocumentWiseData = () => {
    service.getDocumentWiseDoc().then(res => {
      if (res.status) {
        setDocData(res.data);
      } else {
        if (res) {
          setDocData([]);
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setDocData([]);
    })

  }
  const docName = docData.map(i => { return i.document_name });
  const completed = docData.map(i => { return Number(i.Completed) });
  const pending = docData.map(i => { return Number(i.Pending) });
  const service = new OrdersService();

  const config = {
    colors:['#8ef092', '#77dfec'],
    chart: {
      type: 'column',
      //backgroundColor: '#CCCCFF'
    },

    title: {
      text: 'Document Wise Report',
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

    xAxis: {
      title: {
        text: 'Documents'
      },
      categories: docName,
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
        text: 'Number of Documents'
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
          color: 'var(--text-color,#eee)'
        }
      }
    },

    tooltip: {
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' + 'No.of Documents: ' + this.y + '<br/>'

      }
    },

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
        name: 'Completed',
        data: completed,
        // stack: 'male'
      },
      {
        name: 'Pending',
        data: pending,
        // stack: 'male'
      },
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


