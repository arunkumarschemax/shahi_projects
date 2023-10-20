
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
  fileList :any
  fileobt:(fileobt: any) => void;

  
  

}
const FabricDevelopmentTabs = (props: FabricDevelopmentTabsProps) => {

  const [activeTab, setActiveTab] = useState<any>("");
  const [qualitiesData, setQualitiesData] = useState<any>([]);

  const onChange = (key: QualitiesEnum) => {
    setActiveTab(key);
  };

  const itemsInfo = (data) => {
    
  }

  const filesList = (val) =>{
    props.fileList(val)

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
        filesList={filesList}
        
        
    
      />
    ),
  }));


 
const filesWithKeyNames = {};
props.fileobt(filesWithKeyNames)

for (const qualityKey in qualitiesData) {
  const qualityArray = qualitiesData[qualityKey];
  for (const qualityInfo of qualityArray) {
    if (qualityInfo.qualitiesInfo) {
      for (const qualityItem of qualityInfo.qualitiesInfo) {
        if (qualityItem.file) {
          for (const fileKey in qualityItem.file) {
            const fileName = qualityItem.file[fileKey].uid;
            filesWithKeyNames[fileName] = qualityItem.file[fileKey];
          }
        }
      }
    }
  }
}


console.log(filesWithKeyNames,"()()()");



  return (
    <Tabs items={items} onChange={onChange} defaultActiveKey={QualitiesEnum.quality1} type="card"  className="custom-tab-styles"  />
  )
}

export default FabricDevelopmentTabs;








