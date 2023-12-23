// import { BinModel, CommonRequestAttrs, RackAndBinModel, RackIdRequest, RackDTO, WhDashboardFilterEnum, whDasFilEnumDisVal } from "@warehouse-management-system/shared-models";
// import { RackDashboardService, RacksServices } from "@warehouse-management-system/shared-services";
import { Button, Card, Empty, Form, Input, Select, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import RackBlock from "./rack-block";
import Search from "antd/es/input/Search";
import { FilterOutlined, FilterTwoTone } from "@ant-design/icons";
import AlertMessages from "../common-functions/alert-messages";
import { RackDTO, RackIdRequestDto } from "@project-management-system/shared-models";
import { RackPositionService, RacksService } from "@project-management-system/shared-services";

const WarehouseDashboard = () => {
    // const user = useAppSelector((state) => state.user.user.user);
    useEffect(() => {
        getAllRacks();
    }, []);
    const { Option } = Select;
    // const rackService = new RacksServices();
    const rackPositionService = new RackPositionService();
    const racksService = new RacksService();
    const [racksData, setRacksData] = useState<any[]>([]);
    const [binsData, setBinsData] = useState<any[]>([]);
    const [selectedRackId, setSelectedRackId] = useState<number>(0);
    const [filteredCategory, setFilteredCategory] = useState<string>();
    const [filteredVal, setFilteredVal] = useState<string>(undefined);
    const getAllRacks = () => {
        // const commonReq = new CommonRequestAttrs(user?.userName, user?.orgData?.unitCode, user?.orgData?.companyCode, user?.userId);
        racksService.getRacks().then(res => {
            if (res.status) {
                setRacksData(res.data);
            } else {
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        }).catch(err => {
            AlertMessages.getErrorMessage(err.message)
        });
    }
    const changeRack = (rackId: number) => {
        const rackIdReq = new RackIdRequestDto(rackId);
        rackPositionService.getRackPositionByRack(rackIdReq).then(res => {
            if (res.status) {
                console.log(res.data)
                setBinsData(res.data.binData);
                setSelectedRackId(rackId);
            } else {
                setBinsData([]);
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        }).catch(err => {
            setBinsData([]);
            AlertMessages.getErrorMessage(err.message)
        })
    }
    const renderSelectRack = (rackInfo: RackDTO[]) => {
        return <Form style={{ padding: '2px', color: '#fff', fontWeight: 'bold' }}>
            <Form.Item label='Select Rack' noStyle>
                Select Rack : <Select style={{ width: '200px' }} placeholder='Select Rack' onChange={changeRack}>
                    {rackInfo.map(rackObj => {
                        return <Option value={rackObj.rackId} key={`rck-${rackObj.rackId}`}>{rackObj.rackName.concat(`-`, rackObj.rackCode)}</Option>
                    })}
                </Select>
            </Form.Item>
        </Form>
    }
    const renderRackGrid = (rackId: number, racksInfo: any[], binsInfo: any[]) => {
        console.log(binsInfo);
        const rackObj = true;
        if (rackObj) {

            // const { levels, columns } = rackObj;
            const trs = [];
            const ths = [];
            for (let c = 1; c <= 10; c++) {
                ths.push(<th>Column - {c}</th>)
            }

            for (let l = 5; l > 0; l--) {
                const tds = [];
                tds.push(<td key={`ftd${l}`}>Level-{l}</td>)
                for (let c = 1; c <= 10; c++) {
                    const binObj = binsInfo?.find(binEntity => { return binEntity.level == l && binEntity.column == c });
                    console.log(binObj);
                    tds.push(<td key={`td${l}-${c}`} ><RackBlock key={`rc${l}-${c}-${rackId}`}  rackId={rackId} rackLevel={l} column={c} binInfo={binObj} filterVal={filteredVal} /></td>)
                }
                trs.push(<tr key={`tr${l}`}>{tds}</tr>)
            }
            return <table>
                <thead>
                    <tr><th>Levels</th>{ths}</tr>
                </thead>
                <tbody>
                    {trs}
                </tbody>
            </table>
        } else {
            return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        }
    }
    const filter = (val: string) => {
        setFilteredVal(val);

        const packElement = document.querySelector(`[pack-no = '${val}']`);
        const batchElement = document.querySelector(`[batch-no = '${val}']`);
        const rollElement = document.getElementById(val);
        const element = packElement ? packElement : batchElement ? batchElement : rollElement;
        // if (filteredCategory) {
        //     if (filteredCategory == WhDashboardFilterEnum.PACKING_LIST) {
        //         element = document.querySelector(`[pack-no = '${val}']`);
        //     } else if (filteredCategory == WhDashboardFilterEnum.BATCH_NO) {
        //         element = document.querySelector(`[batch-no = '${val}']`);
        //     } else {
        //         element = document.getElementById(val);
        //     }
        // }
        // var element = document.getElementById("RL-91");
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const filterCategory = (val: string) => {
        setFilteredCategory(val);
    }
    const renderFilters = () => {
        return <Space>
            {renderSelectRack(racksData)}
            {/* <div style={{ width: '145px' }}>
                <Select allowClear placeholder='FIlter' onChange={filterCategory} style={{ width: '100%' }}>
                    {Object.keys(WhDashboardFilterEnum).map(whFil => {
                        return <Option value={WhDashboardFilterEnum[whFil]}>{whDasFilEnumDisVal[whFil]}</Option>
                    })}
                </Select>
            </div> */}
            <Tooltip title={"Item | Item Type | Barcode"}>
                <Search name="manB" placeholder="Item | Item Type | Barcode" onSearch={filter} enterButton={<Button icon={<FilterTwoTone />} className="btn-yellow" />} />
            </Tooltip>



        </Space>
    }
    return (
        <Card size="small" title="WAREHOUSE DASHBOARD" bodyStyle={{ overflow: 'scroll' }} headStyle={{ background: '#6ac0a9', color: '#fff', textAlign: 'center' }} extra={renderFilters()} >
             {selectedRackId ? renderRackGrid(selectedRackId, racksData, binsData) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Please Select Rack' />}
        </Card>
    )
}

export default WarehouseDashboard;