import { UpdatedConsumptions } from '@project-management-system/shared-models';
import { BomService } from '@project-management-system/shared-services';
import { InputNumber, Table } from 'antd';
import React, { useEffect, useState } from 'react'

type Props = {
    setTrims: (value: any) => void
}

export default function ConsumptionUpdate(props: Props) {
    const service = new BomService();
    const [trims, setTrims] = useState<any>([]);
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        getAllTrims();
    }, [])

    useEffect(() => {
        props.setTrims(trims)
    }, [trims])


    const getAllTrims = () => {
        service.getAllTrimInfo().then(res => {
            if (res.status) {
                setTrims(res.data);
            }
        })
    }

    const handleFieldChange = (value, fieldName, record) => {
        const updatedTrims = trims.map(trim => {
            if (trim.id === record.id) {
                return { ...trim, [fieldName]: value };
            }
            return trim;
        });
        setTrims(updatedTrims);
    };


    const columns: any = [
        {
            title: "S.No",
            width: 120,
            render: (_text: any, record: any, index: number) => {
                const continuousIndex = (page - 1) * pageSize + index + 1;
                return <span>{continuousIndex}</span>;
            },
        },
        {
            title: 'Trim',
            dataIndex: 'item'
        },
        {
            title: 'Consumption',
            render: (v, r) => <InputNumber
                defaultValue={r.consumption}
                onChange={value => handleFieldChange(value, 'consumption', r)}
                key={r.id}
            />
        },
        {
            title: 'Wastage %',
            render: (v, r) => <InputNumber onChange={value => handleFieldChange(value, 'wastage', r)} defaultValue={r.wastage} key={r.id} />
        },
        {
            title: 'MOQ',
            render: (v, r) => <InputNumber onChange={value => handleFieldChange(value, 'moq', r)} defaultValue={r.moq} key={r.id} />
        },

    ]
    return (
        <Table className="custom-table-wrapper"
            size='small'
            //  pagination={false}
            pagination={false}
            scroll={{ x: 'max-content', y: 450 }}
            bordered
            columns={columns}
            dataSource={trims} />
    )
}
