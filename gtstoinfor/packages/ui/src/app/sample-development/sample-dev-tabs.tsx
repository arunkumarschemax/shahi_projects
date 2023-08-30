import { Card, Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane";
import { useState, useEffect } from "react";
import SizeDetail from "./size-detail";
import FabricsForm from "./fabrics";
import TrimsForm from "./trims";
import ProcessForm from "./process";

export const SampleDevTabs = () => {


    return(
        <Card size='small'>
            <Tabs type={'card'} tabPosition={'top'}>
                <TabPane key="1" tab={<span><b>{`Size Detail`}</b></span>}>
                <SizeDetail/>
                </TabPane>
                <TabPane key="2" tab={<span><b>{`Fabric`}</b></span>}>
                <FabricsForm/>
                </TabPane>
                <TabPane key="3" tab={<span><b>{`Trims`}</b></span>}>
                <TrimsForm/>
                </TabPane>
                <TabPane key="4" tab={<span><b>{`Process`}</b></span>}>
                <ProcessForm/>
                </TabPane>
                {/* <TabPane key="5" tab={<span><b>{`Remarks`}</b></span>}>
                    
                </TabPane> */}
            </Tabs>
        </Card>
    )

}

export default SampleDevTabs