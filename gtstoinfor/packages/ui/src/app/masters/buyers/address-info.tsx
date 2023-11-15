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
          title:<div style={{textAlign:'center'}}>S No</div>,
          key: 'sno',
          width: '70px',
          align:'center',
          responsive: ['sm'],
          render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:<div style={{textAlign:'center'}}>Country</div>,
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
            title:<div style={{textAlign:'center'}}>State</div>,
            dataIndex:'state'
        },
        {
            title:<div style={{textAlign:'center'}}>District</div>,
            dataIndex:'district'
        },
        {
            title:<div style={{textAlign:'center'}}>City</div>,
            dataIndex:'city'
        },
        {
            title:<div style={{textAlign:'center'}}>Landmark</div>,
            dataIndex:'landmark'
        },
        {
            title:<div style={{textAlign:'center'}}>Lane</div>,
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
            title:<div style={{textAlign:'center'}}>Pincode</div>,
            dataIndex:'pincode',
            align:'right'
        }
    ]
    return(
        <Card>
            <Table columns={columns} dataSource={address} pagination={false} bordered/>
        </Card>
    )

}

export default AddressInfo