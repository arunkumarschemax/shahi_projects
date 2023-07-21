import React, { useEffect, useState } from 'react';
import { OrdersService } from "@project-management-system/shared-services";
import { Form } from "react-router-dom";
import { Card, Table } from 'antd';
import { VersionDataModel } from '@project-management-system/shared-models';
import { IExcelColumn } from 'antd-table-saveas-excel/app';

const VersionChanges = () => {

    const service = new OrdersService()
    const [versionData, setVersionData] = useState([])
    // const [form] = Form.useForm();

    useEffect(() => {
        getVersionWiseData();
    }, [])

    const getVersionWiseData = () => {
        service.getVersionWiseData().then((res) => {
            setVersionData(res.data)
        })
    }
    const getVersionHeaders = (data: VersionDataModel[]) => {
        const versionHeaders = new Set<number>();
        data.forEach(rec => rec.versionWiseData.forEach(version => {
            versionHeaders.add(version.version);
        }))
        return Array.from(versionHeaders);
    };

    const getEmpDayWiseConsumptionMap = (data: VersionDataModel[]) => {
        const versionWiseMap = new Map<number, Map<number, number>>();
        data.forEach(rec => {
            if (!versionWiseMap.has(rec.productionPlanId)) {
                versionWiseMap.set(rec.productionPlanId, new Map<number, number>());
            }
            rec.versionWiseData.forEach(version => {
                versionWiseMap.get(rec.productionPlanId).set(version.version, version.orderQtyPcs);
            })
        });
        return versionWiseMap;
    }

    let excelTitles: IExcelColumn[] = [];
    const renderReport = (data: VersionDataModel[]) => {
        const versionHeaders = getVersionHeaders(data);
        const versionWiseDataMap = getEmpDayWiseConsumptionMap(data);
        excelTitles = [
            { title: "Production Plan Id", dataIndex: "production_plan_id" },
            { title: "Item Code", dataIndex: "item_code" },
            { title: "Item Name", dataIndex: "itemName" },
            // { title: "Token Type", dataIndex: "tokenType" }
        ];

        const columns: any = [
            {
                title: 'Production Plan Id',
                dataIndex: 'production_plan_id',
            },
            {
                title: 'Item Code',
                dataIndex: 'item_code'
            },
            {
                title: 'Item Name',
                dataIndex: 'itemName'
            }
        ];

        versionHeaders.forEach(version => {
            columns.push(
                {
                    title: version,
                    key: version,
                    width: 130,
                    render: (value, record: any, index) => {
                        const prodPlanId = record.productionPlanId;
                        const fbConsInfo = versionWiseDataMap.get(prodPlanId);
                        if (fbConsInfo) {
                            return versionWiseDataMap.get(prodPlanId).get(version) ?? 0;
                        } else {
                            return 0;
                        }
                    }
                }
            );
            excelTitles.push({
                title: version, dataIndex: "", render: (value: any, record: any) => {
                    const prodPlanId = record.productionPlanId;
                    const fbConsInfo = versionWiseDataMap.get(prodPlanId);
                    if (fbConsInfo) {
                        const val = versionWiseDataMap.get(prodPlanId).get(version) ?? 0;
                        return Number(val);
                    } else {
                        return 0;
                    }
                }
            });
        });

        return <Table columns={columns} dataSource={versionData} pagination={false} />
    }

    return(
        <div>
            {renderReport(versionData)}
        </div>
    )

}
export default VersionChanges;