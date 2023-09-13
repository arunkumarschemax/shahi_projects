import { Button, Card, Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane";
import { useState, useEffect } from "react";


export interface StoreIssuesTabsProps{

}

export const StoreIssuesTabs=( )=>{
    const [data, setData] = useState({});



return (
    <Card size='small'>
        <Tabs type={'card'}>tabPosition={'top'}</Tabs>
        <TabPane key="1" tab={<span><b>{`Fabric`}</b></span>}>
        </TabPane>
        <TabPane key="3" tab={<span><b>{`Trims`}</b></span>}>
        </TabPane>
        </Card>
)
}