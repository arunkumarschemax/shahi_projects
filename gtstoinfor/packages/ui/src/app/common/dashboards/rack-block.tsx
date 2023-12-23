// import { BinModel, CommonRequestAttrs, RackAndBinModel, RackIdRequest, RacksCreationModel } from "@warehouse-management-system/shared-models";
// import { RackDashboardService, RacksServices } from "@warehouse-management-system/shared-services";
import { Card, Form, Select } from "antd";
// import { useAppSelector } from "packages/ui/src/common";
import { useEffect, useState } from "react";
import BinBlock from "./bin-block";
interface RackBlockProps {
    rackId: number;
    rackLevel: number;
    column: number;
    binInfo: any;
    filterVal: string;
}
const RackBlock = (props: RackBlockProps) => {
    // const user = useAppSelector((state) => state.user.user.user);
    const { rackId, rackLevel, column, binInfo, filterVal } = props;
    useEffect(() => {
        // getBinsData(rackId, rackLevel, column);
        console.log("rackId");
        console.log(rackId);
        console.log(rackLevel);
        console.log(column);
        console.log(binInfo);
        console.log(filterVal);
    }, []);


    return (
        <Card size="small" title={`Level-${rackLevel} | Column-${column} `} id={`${rackLevel}-${column}`} headStyle={{ minHeight: 0, background: '#ded18a', color: '#165790', textAlign: 'center' }} bodyStyle={{ padding: 0, minHeight: '138px' }}  >
            {<BinBlock rackId={rackId} rackLevel={rackLevel} column={column} binInfo={binInfo} filterVal={filterVal} />}

        </Card>
    )
}

export default RackBlock;