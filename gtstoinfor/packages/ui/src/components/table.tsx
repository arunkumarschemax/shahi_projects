import { Table, TableProps } from "antd"
import { ColumnProps } from "antd/es/table";


export const ScxTable = (props: React.PropsWithChildren<TableProps<any>> & {
    ref?: React.Ref<HTMLDivElement>;
}) => {
    return (
        <Table {...props} />
    )
}

export default ScxTable;
export enum summeryCriteriaEnum {
    SUM = 'SUM',
    COUNT = 'COUNT'
}
export type CustomColumn<T> = ColumnProps<T> & {
    dataIndex: keyof T;
    isDefaultSelect?: boolean;
    isSummaryColumn?: boolean;
    summaryLabel?: string;
    criteria?: summeryCriteriaEnum;
    key: string,
};