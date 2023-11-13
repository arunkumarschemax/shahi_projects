import { BuyerIdReq } from "@project-management-system/shared-models";
import { BuyersService } from "@project-management-system/shared-services";
import { Card, Table } from "antd"
import { ColumnProps } from "antd/es/table"
import { useEffect, useState } from "react";

export interface AddressInfoProps{
    buyerId:number
}

export const AddressInfo = (props:AddressInfoProps) => {

    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);
    const buyerService = new BuyersService()
    const [address,setAddress]= useState<any[]>([])


    useEffect(()=>{
        if(props.buyerId){
            const req = new BuyerIdReq(props.buyerId)
            buyerService.getAddressByBuyerId(req).then(res=>{
                if(res.status){
                setAddress(res.data)
                }
            })
        }
    },[props.buyerId])


    const columns: ColumnProps<any>[] = [
        {
          title: 'S No',
          key: 'sno',
          width: '70px',
          responsive: ['sm'],
          render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:'Country',
            dataIndex:'countryName',
            render:(text,record) => {
                return(
                    <>
                    {record.countryInfo ? record.countryInfo.countryName : '-'}
                    </>
                )
            }
        },
        {
            title:'State',
            dataIndex:'state'
        },
        {
            title:'District',
            dataIndex:'district'
        },
        {
            title:'City',
            dataIndex:'city'
        },
        {
            title:'Landmark',
            dataIndex:'landmark'
        },
        {
            title:'Lane',
            dataIndex:'lane',
            render:(text,record)=>{
                console.log(record.lane2)
                return(
                    <>
                    {record.lane2 !== null ? `${record.lane1}-${record.lane2}` : (<>{record.lane1}</>)}
                    </>
                )
            }
        },
        {
            title:'Pincode',
            dataIndex:'pincode'
        }
    ]
    return(
        <Card>
            <Table columns={columns} dataSource={address} pagination={false}/>
        </Card>
    )

}

export default AddressInfo