import { Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import ExFactoryReport from "./ex-factory-report"
import WarehouseReport from "./ware-house-report"

export const MonthWiseReport = () =>{
    return(
        <Tabs>
            <TabPane tab= {'Month Wise ExFactory Report'} key ='1'>
            <ExFactoryReport/>
            </TabPane>
            <TabPane tab= {'Month Wise WareHouse Report'}key ='2'>
            <WarehouseReport/>
            </TabPane>
        </Tabs>
    )
}
export default MonthWiseReport