import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { CarOutlined, CheckCircleTwoTone, ExclamationCircleOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import FabricDevelopmentRequestQuality from './fabric-development-quality-request';

export interface FabricDevelopmentTabsProps {
  key: string;
}
const FabricDevelopmentTabs = (props: FabricDevelopmentTabsProps) => {

  const [activeTab, setActiveTab] = useState('1');

  const onChange = (key: string) => {
    console.log('onChange', key)
    setActiveTab(key);
  };

  const itemsInfo = (data) => {
    console.log(data)
  }


 console.log(props.key,"key")
  const items: TabsProps['items'] = [
    {
      key: 'quality1',
      label: (
        <span style={{ color: "green" }}>
         Quality 1
        </span>
      ),
      children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}/>,
    },
    {
      key: 'quality2',
      label: (
        <span style={{ color:"brown" }}>
         Quality 2
        </span>
      ),
      children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}/>,

    },
    {
      key: 'quality3',
      label: (
        <span style={{ color: "green" }}>
          Quality 3
        </span>
      ),
      children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}/>,

    },
    {
      key: 'quality4',
      label: (
        <span style={{ color:"brown" }}>
          Quality 4
        </span>
      ),
      children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}/>,

    },
    {
      key: 'quality5',
      label: (
        <span style={{ color: "green" }}>
          Quality 5
        </span>
      ),
     children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}/>,

    },
    {
      key: 'quality6',
      label: (
        <span style={{ color:"brown" }}>
          Quality 6
        </span>
      ),
      children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}/>
    },
    {
      key: 'quality7',
      label: (
        <span style={{ color: "green" }}>
          Quality 7
        </span>
      ),
        children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}/>,

    },
    {
      key: 'quality8',
      label: (
        <span style={{ color:"brown" }}>
          Quality 8
        </span>
      ),
        children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}/>,

    },
    {
      key: 'quality9',
      label: (
        <span style={{ color: "green" }}>
          Quality 9
        </span>
      ),
        children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}/>,

    },
    {
      key: 'quality10',
      label: (
        <span style={{ color:"brown" }}>
          Quality 10
        </span>
      ),
        children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}/>,

    },
    {
      key: 'quality11',
      label: (
        <span style={{ color: "green" }}>
          Quality 11
        </span>
      ),
      children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}/>,

    },
    {
      key: 'quality12',
      label: (
        <span style={{ color:"brown" }}>
          Quality 12
        </span>
      ),
        children: <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo}/>,

    }
    
  ];

  return (
    <Tabs items={items} onChange={onChange} defaultActiveKey={props.key} type="card"  className="custom-tab-styles"  />
  )
}

export default FabricDevelopmentTabs;




