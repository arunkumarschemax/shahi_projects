import { Card, Table } from "antd";

export function FabricTrackerReport() {

    const columns: any = [
        // {
        //     title: 'column name',
        //     dataIndex: 'columnName'
        // },
        // {
        //     title: 'column name 2',
        //     dataIndex: 'columnName2'
        // },
        // {
        //     title: 'column name3',
        //     dataIndex: 'columnName3'
        // },
    ]

    return (
        <>
            <Card title="Fabric Tracker" headStyle={{ fontWeight: 'bold' }}>
                <Table
                    columns={columns}
                    bordered
                ></Table>
            </Card>
        </>
    )
}
export default FabricTrackerReport;