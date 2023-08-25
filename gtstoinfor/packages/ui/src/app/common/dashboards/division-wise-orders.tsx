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

export interface RoleWiseDocumentsProps { }

export function RoleWiseDocumentsGraph() {
  const form = useForm

  useEffect(() => {
    getRoleWiseData();
  }, [])
  const [roleData, setRoleData] = useState<any[]>([]);

  const getRoleWiseData = () => {
    service.getRoleWiseOrders().then(res => {
      if (res.status) {
        setRoleData(res.data);
      } else {
        if (res) {
          setRoleData([]);
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setRoleData([]);
    })

  }
  const roleName = roleData.map(i => { return i.role_name });
  const completed = roleData.map(i => { return Number(i.Completed) });
  const pending = roleData.map(i => { return Number(i.Pending) });
  const service = new OrdersService();

  const config = {
    colors:['#8ef092', '#77dfec'],
    chart: {
      type: 'column',
      //backgroundColor: '#CCCCFF'
    },

    title: {
      text: 'Role Wise Document Status',
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
        text: 'Roles'
      },
      categories: roleName,
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

