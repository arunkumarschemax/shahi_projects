// import { Tabs } from 'antd';
// import type { TabsProps } from 'antd';
// import { CarOutlined, CheckCircleTwoTone, ExclamationCircleOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
// import { useEffect, useState } from 'react';
// import FabricDevelopmentRequestQuality from './fabric-development-quality-request';
// import { FabricRequestQualitiesRequest } from 'packages/libs/shared-models/src/common/fabric-development/fabric-request-qualities.request';
// import { keys } from 'highcharts';

// export interface FabricDevelopmentTabsProps {
//   key: string;
//   qualities: (qualitiesData: any) => void;

// }
// const FabricDevelopmentTabs = (props: FabricDevelopmentTabsProps) => {

//   const [activeTab, setActiveTab] = useState<any>("");
//   const [newInfo, setNewInfo] = useState<any>([]);
//   const [newInfo1, setNewInfo1] = useState<any>([]);
//   const [newInfo2, setNewInfo2] = useState<any>([]);
//   const [newInfo3, setNewInfo3] = useState<any>([]);
//   const [newInfo4, setNewInfo4] = useState<any>([]);
//   const [newInfo5, setNewInfo5] = useState<any>([]);
//   const [newInfo6, setNewInfo6] = useState<any>([]);
//   const [newInfo7, setNewInfo7] = useState<any>([]);
//   const [newInfo8, setNewInfo8] = useState<any>([]);
//   const [newInfo9, setNewInfo9] = useState<any>([]);
//   const [newInfo10, setNewInfo10] = useState<any>([]);
//   const [newInfo11, setNewInfo11] = useState<any>([]);
//   const [newInfo12, setNewInfo12] = useState<any>([]);

 

//   console.log(newInfo1,"HELLLLLLLLLLLL1")
//   console.log(newInfo2,"HELLLLLLLLLLLL2")
//   console.log(newInfo3,"HELLLLLLLLLLLL3")



//   const onChange = (key: string) => {
//     console.log('onChange', key)
//     setActiveTab(key);
//   };

//   const itemsInfo = (data) => {
//     console.log(data)
//   }

//   useEffect(() => {
//     if(newInfo.length > 0){
//       console.log(newInfo)
//     }
//   },[newInfo1]) 
  
  
  
//   const qualities = []; 
 
//   const qualityInfo = (data) => {
//   console.log((data),"data")
   
//   setNewInfo([...newInfo,data])
//     props.qualities([...newInfo,data])
  
//    }

//    const qualityInfo1 = (data) => {
//     console.log((data),"data1")
     
//       setNewInfo1(data)
//      }
   
//      console.log(newInfo,"8888888")


//      const qualityInfo2 = (data) => {
//       console.log((data),"data2")
//       setNewInfo2(data)
    
//       }
  

//   const qualityInfo3 = (data) => {
//         console.log((data),"data3")
//         setNewInfo3(data)
      
//      }
//    const qualityInfo4 = (data) => {
//           console.log((data),"data4")
//           setNewInfo4(data)
        
//     }
//    const qualityInfo5 = (data) => {
//     console.log((data),"data5")
//       setNewInfo5(data)
          
//       }
//    const qualityInfo6 = (data) => {
//     console.log((data),"data6")
//       setNewInfo6(data)
            
//      }

//      const qualityInfo7 = (data) => {
//       console.log((data),"data7")
//       setNewInfo7(data)
    
//       }

//       const qualityInfo8 = (data) => {
//         console.log((data),"data8")
//         setNewInfo8(data)
      
//     } 

//     const qualityInfo9 = (data) => {
//       console.log((data),"data9")
//       setNewInfo9(data)
    
//       }

//      const qualityInfo10 = (data) => {
//         console.log((data),"data10")
//         setNewInfo7(data)
      
//     } 

//     const qualityInfo11 = (data) => {
//       console.log((data),"data11")
//       setNewInfo7(data)
    
//     }

//     const qualityInfo12 = (data) => {
//       console.log((data),"data12")
//       setNewInfo12(data)
    
//       }
   
   
  

//   //  const qualityInfo = (data) => {
//   //   console.log((data),"data")
//   //   console.log((newInfo),"")
//   //   // const record = qualitieDatai.find((item) => item.Quality === "" );
//   //   // const record1 = qualitieDatai.find((item) => item.Quality === data.Quality )
//   //   const spliceIndex = newInfo.findIndex(item => item.Quality === data.Quality)
//   //   console.log(spliceIndex)

//   // //  console.log(record1,"recordtttt")
  
//   //   if (spliceIndex >= 0){
//   //     console.log(spliceIndex)
//   //     console.log(newInfo)
//   //     console.log(data)
//   //     const nwQulaities = newInfo.splice(spliceIndex,1,data)
//   //     console.log(nwQulaities)
//   //     setNewInfo(nwQulaities)

      
//   //   } else {
//   //     console.log(data)
//   //     console.log('nooooo')
//   //     setNewInfo([...newInfo,data])
  
//   //   } 
//   // }



//   // const qualityInfo1 = (data) => {
//   //   console.log((data),"data")
     
//   //     setQualitieData([...qualitie,data])
//   //     props.qualities([...qualitie,data])
//   //     // console.log((data.length),"tabsdata")
//   //     //  qualities.push(data)
//   //   }
  



//  console.log(activeTab,"key")
//  console.log(qualities,"quali")
//  console.log(qualities.length,"quali length")




 
//   const items: TabsProps['items'] = [
//     {
//       key: 'quality1',
//       label: (
//         <span style={{ color: "green" }}>
//          Quality 1
//         </span>
//       ),
//       children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}  qualityInfo={qualityInfo1}  activeTab={activeTab}/>,
//     },
//     {
//       key: 'quality2',
//       label: (
//         <span style={{ color:"brown" }}>
//          Quality 2
//         </span>
        
//       ),
//       children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo} qualityInfo={qualityInfo2} activeTab={activeTab} />,

//     },
//     {
//       key: 'quality3',
//       label: (
//         <span style={{ color: "green" }}>
//           Quality 3
//         </span>
//       ),
//       children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo} qualityInfo={qualityInfo3} activeTab={activeTab} />,

//     },
//     {
//       key: 'quality4',
//       label: (
//         <span style={{ color:"brown" }}>
//           Quality 4
//         </span>
//       ),
//       children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo} qualityInfo={qualityInfo4} activeTab={activeTab} />,

//     },
//     {
//       key: 'quality5',
//       label: (
//         <span style={{ color: "green" }}>
//           Quality 5
//         </span>
//       ),
//      children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo} qualityInfo={qualityInfo5} activeTab={activeTab}/>,

//     },
//     {
//       key: 'quality6',
//       label: (
//         <span style={{ color:"brown" }}>
//           Quality 6
//         </span>
//       ),
//       children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo} qualityInfo={qualityInfo6} activeTab={activeTab} />
//     },
//     {
//       key: 'quality7',
//       label: (
//         <span style={{ color: "green" }}>
//           Quality 7
//         </span>
//       ),
//         children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo} qualityInfo={qualityInfo7} activeTab={activeTab} />,

//     },
//     {
//       key: 'quality8',
//       label: (
//         <span style={{ color:"brown" }}>
//           Quality 8
//         </span>
//       ),
//         children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo} qualityInfo={qualityInfo8} activeTab={activeTab} />,

//     },
//     {
//       key: 'quality9',
//       label: (
//         <span style={{ color: "green" }}>
//           Quality 9
//         </span>
//       ),
//         children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo} qualityInfo={qualityInfo9} activeTab={activeTab} />,

//     },
//     {
//       key: 'quality10',
//       label: (
//         <span style={{ color:"brown" }}>
//           Quality 10
//         </span>
//       ),
//         children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo} qualityInfo={qualityInfo10} activeTab={activeTab}/>,

//     },
//     {
//       key: 'quality11',
//       label: (
//         <span style={{ color: "green" }}>
//           Quality 11
//         </span>
//       ),
//       children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo} qualityInfo={qualityInfo11} activeTab={activeTab} />,

//     },
//     {
//       key: 'quality12',
//       label: (
//         <span style={{ color:"brown" }}>
//           Quality 12
//         </span>
//       ),
//         children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo} qualityInfo={qualityInfo12} activeTab={activeTab} />,

//     }
    
//   ];

//   return (
//     <Tabs items={items} onChange={onChange} defaultActiveKey={props.key} type="card"  className="custom-tab-styles"  />
//   )
// }

// export default FabricDevelopmentTabs;



import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { CarOutlined, CheckCircleTwoTone, ExclamationCircleOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import FabricDevelopmentRequestQuality from './fabric-development-quality-request';
import { FabricRequestQualitiesRequest } from 'packages/libs/shared-models/src/common/fabric-development/fabric-request-qualities.request';
import { keys } from 'highcharts';
import { QualitiesEnum } from '@project-management-system/shared-models';

export interface FabricDevelopmentTabsProps {
  key: string;
  qualities: (qualitiesData: any) => void;

}
const FabricDevelopmentTabs = (props: FabricDevelopmentTabsProps) => {

  const [activeTab, setActiveTab] = useState<any>("");
  const [qualitiesData, setQualitiesData] = useState<any>([]);



  const onChange = (key: QualitiesEnum) => {
    console.log('onChange', key)
    setActiveTab(key);
  };

  const itemsInfo = (data) => {
    console.log(data)
  }

  const qualityInfo = (data, qualityKey) => {
    console.log(data, "data for qualityKey: ", qualityKey);
    setQualitiesData((prevData) => ({
      ...prevData,
      [qualityKey]: [data],
    }));

    props.qualities((prevData) => ({
      ...prevData,
      [qualityKey]: data,
    }))
  }

  useEffect(() => {
    if (Object.keys(qualitiesData).length > 0) {
      console.log(qualitiesData);
    }
  }, [qualitiesData]);

  console.log(qualitiesData,"India")
  

  const items: TabsProps['items'] = Object.keys(QualitiesEnum).map((quality, index) => ({
    key: `quality${index + 1}`,
    label: (
      <span style={{ color: index % 2 === 0 ? "green" : "brown" }}>
        {quality}
      </span>
    ),
    children: (
      <FabricDevelopmentRequestQuality
        itemsInfo={itemsInfo}
        qualityInfo={(data) => qualityInfo(data, `quality${index + 1}`)}
        activeTab={activeTab}
      />
    ),
  }));



  return (
    <Tabs items={items} onChange={onChange} defaultActiveKey={QualitiesEnum.quality1} type="card"  className="custom-tab-styles"  />
  )
}

export default FabricDevelopmentTabs;








