import { Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import ExFactoryReportWithComparision from "./ex-factory-report-with-comparision"
import WareHouseComparision from "./warehouse-comparision"

export const MonthWiseComparisionReport = () =>{
    return(
        <Tabs>
            <TabPane tab= {'Comparision ExFactory Report'} key ='1'>
            <ExFactoryReportWithComparision/>
            </TabPane>
            <TabPane tab= {'Comparision WareHouse Report'}key ='2'>
            <WareHouseComparision/>
            </TabPane>
        </Tabs>
    )
}
export default MonthWiseComparisionReport