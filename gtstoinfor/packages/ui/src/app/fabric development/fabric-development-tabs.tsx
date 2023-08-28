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
 console.log(props.key,"key")
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span style={{ color: "green" }}>
         Quality 1
        </span>
      ),
      children: <FabricDevelopmentRequestQuality />,
    },
    {
      key: '2',
      label: (
        <span style={{ color:"brown" }}>
         Quality 2
        </span>
      ),
      children: <FabricDevelopmentRequestQuality />,

    },
    {
      key: '3',
      label: (
        <span style={{ color: "green" }}>
          Quality 3
        </span>
      ),
      children: <FabricDevelopmentRequestQuality />,

    },
    {
      key: '4',
      label: (
        <span style={{ color:"brown" }}>
          Quality 4
        </span>
      ),
      children: <FabricDevelopmentRequestQuality />,

    },
    {
      key: '5',
      label: (
        <span style={{ color: "green" }}>
          Quality 5
        </span>
      ),
     children: <FabricDevelopmentRequestQuality />,

    },
    {
      key: '6',
      label: (
        <span style={{ color:"brown" }}>
          Quality 6
        </span>
      ),
      children: <FabricDevelopmentRequestQuality />
    },
    {
      key: '7',
      label: (
        <span style={{ color: "green" }}>
          Quality 7
        </span>
      ),
        children: <FabricDevelopmentRequestQuality />,

    },
    {
      key: '8',
      label: (
        <span style={{ color:"brown" }}>
          Quality 8
        </span>
      ),
        children: <FabricDevelopmentRequestQuality />,

    },
    {
      key: '9',
      label: (
        <span style={{ color: "green" }}>
          Quality 9
        </span>
      ),
        children: <FabricDevelopmentRequestQuality />,

    },
    {
      key: '10',
      label: (
        <span style={{ color:"brown" }}>
          Quality 10
        </span>
      ),
        children: <FabricDevelopmentRequestQuality />,

    },
    {
      key: '11',
      label: (
        <span style={{ color: "green" }}>
          Quality 11
        </span>
      ),
      children: <FabricDevelopmentRequestQuality />,

    },
    {
      key: '12',
      label: (
        <span style={{ color:"brown" }}>
          Quality 12
        </span>
      ),
        children: <FabricDevelopmentRequestQuality />,

    }
    
  ];

  return (
    <Tabs items={items} onChange={onChange} defaultActiveKey={props.key} type="card"  className="custom-tab-styles"  />
  )
}

export default FabricDevelopmentTabs;





