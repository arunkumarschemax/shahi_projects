import { NikeService } from "@project-management-system/shared-services";
import { Card, Table } from "antd"
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { receiveMessageOnPort } from "worker_threads";

export const FOBPriceVariationReport = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const service = new NikeService()
    const [data,setData] = useState<any[]>([])

    useEffect(() => {
        getData()
    },[])

    const getData = () => {
        service.getPriceDifferenceReport().then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }


    const columns:  ColumnProps<any>[] = [
        {
            title: 'S.No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            
        },
        {
            title:'PO Number',
            dataIndex :'poNumber'
        },
        {
            title:'PO Line Item Number',
            dataIndex :'poLineItemNumber',
            // align:'right'
        },
        {
            title:'Style Number',
            dataIndex :'styleNumber'
        },
        {
            title:'Size Description',
            dataIndex :'sizeDescription'
        },
        {
            title:'Gross Price',
            dataIndex :'grossPriceFob',
            align:'right',
            render:(text,record) => {
                return(
                    <>
                    {record.grossPriceFob ? `${record.grossPriceFob} ${record.fobCurrencyCode}` : '-'}
                    </>
                )
            }
        },
        {
            title:'Shahi Confirmed Gross Price',
            dataIndex :'shahiConfirmedgrossPrice',
            align:'right',
            render:(text,record) => {
                return(
                    <>
                    {record.shahiConfirmedgrossPrice ? `${record.shahiConfirmedgrossPrice} ${record.shahiCurrencyCode}` : '-'}
                    </>
                )
            }
        },
        {
            title:'Difference',
            dataIndex :'difference',
            align:'right',
            render:(text,record) => {
                let diff;
                let convertedPrice;
                console.log(record.fobCurrencyCode)
                if(record.fobCurrencyCode === 'PHP'){
                    convertedPrice = record.grossPriceFob*0.01765;
                } else if(record.fobCurrencyCode === 'TWD'){
                    convertedPrice = record.grossPriceFob*0.0314;
                }else if(record.fobCurrencyCode === 'THB'){
                    convertedPrice = record.grossPriceFob*0.0284;
                }else if(record.fobCurrencyCode === 'CNY'){
                    convertedPrice = record.grossPriceFob*0.1377;
                }else if(record.fobCurrencyCode === 'NZD'){
                    convertedPrice = record.grossPriceFob*0.5944;
                }else if(record.fobCurrencyCode === 'AUD'){
                    convertedPrice = record.grossPriceFob*0.6450;
                } else if(record.fobCurrencyCode === 'EUR'){
                    convertedPrice = record.grossPriceFob*1.0776;
                } else if(record.fobCurrencyCode === 'USD'){
                    convertedPrice = record.grossPriceFob*1;
                } 
                console.log(convertedPrice)
                diff = record.shahiConfirmedgrossPrice - convertedPrice
                console.log(diff)
                return(
                    <>
                    {record.grossPriceFob ? Number(diff).toLocaleString('en-IN'): '-'}
                    </>
                )
            }
        },

    ]

    return(
        <Card title='FOB Price Variation'>
            <Table  columns={columns} dataSource={data}  pagination={{
            onChange(current, pageSize) {
                setPage(current);
                setPageSize(pageSize)
            }
        }}/>
            
        </Card>
    )

}

export default FOBPriceVariationReport