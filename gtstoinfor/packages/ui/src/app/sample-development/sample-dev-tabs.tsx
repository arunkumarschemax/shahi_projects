import { Button, Card, Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane";
import { useState, useEffect } from "react";
import SizeDetail from "./size-detail";
import FabricsForm from "./fabrics";
import TrimsForm from "./trims";
import ProcessForm from "./process";

export interface SampleDevTabsProps{
    handleSubmit: (value: any) => void;
    buyerId:any
}

export const SampleDevTabs = (props:SampleDevTabsProps) => {
    const [sizeData, setSizeData] = useState([]);
    const [processData, setProcessData] = useState([]);
    const [fabricsData, setFabricsData] = useState([]);
    const [trimsData, setTrimsData] = useState([]);
    const [data, setData] = useState({});

    const handleSizeDataUpdate = (updatedData) => {
        console.log(updatedData)
        setData((prevData) => ({ ...prevData, sizeData: updatedData }));
        setSizeData(updatedData);
    };

    const handleProcessDataUpdate = (updatedData) => {
        setData((prevData) => ({ ...prevData, processData: updatedData }));
        setProcessData(updatedData);
    };

    const handleFabricsDataUpdate = (updatedData) => {
        setData((prevData) => ({ ...prevData, fabricsData: updatedData }));
        setFabricsData(updatedData);
    };

    const handleTrimsDataUpdate = (updatedData) => {
        setData((prevData) => ({ ...prevData, trimsData: updatedData }));
        setTrimsData(updatedData);
    };

    const onConfirm = () => {
        props.handleSubmit(data)
    }
    console.log(props.buyerId)

    return(
        <Card size='small'>
            <Tabs type={'card'} tabPosition={'top'}>
                <TabPane key="1" tab={<span><b>{`Size Detail`}</b></span>}>
                <SizeDetail props = {handleSizeDataUpdate} buyerId={props.buyerId}/>
                </TabPane>
                <TabPane key="2" tab={<span><b>{`Fabric`}</b></span>}>
                <FabricsForm props = {handleFabricsDataUpdate}/>
                </TabPane>
                <TabPane key="3" tab={<span><b>{`Trims`}</b></span>}>
                <TrimsForm props = {handleTrimsDataUpdate}/>
                </TabPane>
                <TabPane key="4" tab={<span><b>{`Process`}</b></span>}>
                <ProcessForm props={handleProcessDataUpdate}/>
                </TabPane>
                {/* <TabPane key="5" tab={<span><b>{`Remarks`}</b></span>}>
                    
                </TabPane> */}
            </Tabs>
            <Button onClick={onConfirm}>Confirm</Button>
        </Card>
    )

}

export default SampleDevTabs