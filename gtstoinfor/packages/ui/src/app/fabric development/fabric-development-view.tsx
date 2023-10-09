import { BuyersService, FabricDevelopmentService, LocationsService, ProfitControlHeadService } from "@project-management-system/shared-services";
import { Button, Card, Table } from "antd"
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export const FabricDevelopmentView = () =>{
    const navigate = useNavigate()

    const [page, setPage] = React.useState(1);
    const service = new FabricDevelopmentService();
    const LocService = new LocationsService();
    const pchService = new ProfitControlHeadService();
    const buyerService = new BuyersService();
    const [data,setData] = useState([])
    const[locId,setLocId] = useState([]);
    const[pchId,setPchId] = useState([]);
    const[buyerId,setBuyerId] = useState([]);


    useEffect  (()=>{
      getData()
    },[])
    const getData = ()=>{
      service.getFabricDevReqData().then(res=>{
        if(res.status){
              setData(res.data)
              console.log(res,'data');
                
                LocService.getAll().then(res=>{
                  console.log(res.data,'----------')

                  if(res.status){
                        setLocId(res.data)
                        console.log(locId,'Location');
                  }
                })
                pchService.getAllProfitControlHead().then(res=>{
                  console.log(res.data,'----------')

                  if(res.status){
                        setPchId(res.data)
                        console.log(locId,'Location');
                  }
                })
                pchService.getAllProfitControlHead().then(res=>{
                  console.log(res.data,'--ooooooooooo---')

                  if(res.status){
                        setPchId(res.data)
                        console.log(pchId,'pch');
                  }
                })
                
                buyerService.getAllActiveBuyers().then(res=>{
                  console.log(res.data,'----88888----')

                  if(res.status){
                        setBuyerId(res.data)
                        console.log(buyerId,'buyer');
                  }
                })
        }
      })
     
  }
  const Info = (rowData) => {
    navigate(`/fabricdevelopment/fabric-development-request-quality/fabric-development-request-quality-view/`, { state: { rowData } });
  }
  
    const columnsSkelton: any = [
        {
          title: "S No",
          key: "sno",
          width: "70px",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "Location",
          dataIndex: "locationId",
          render: (data) => {
            const location = locId.find((loc) => loc.locationId === data);
            return location ? location.locationName : "N/A";
          },
        },
        {
          title: "PCH",
          dataIndex: "pchId",
          render: (data) => {
            const pch = pchId.find((pch) => pch.profitControlHeadId === data);
            return pch ? pch.profitControlHead : "N/A";
          },
        },
        {
          title: "Buyer",
          dataIndex: "buyerId",
          render: (data) => {
            const buyer = buyerId.find((res) => res.buyerId === data);
            return buyer? buyer.buyerName : "N/A";
          }
        },
        {
          title: `Fabric Type`,
          dataIndex: "type",
        },
        {
            title: `Fabric Responsible`,
            dataIndex: "fabricResponsible",
          },
          {
            title: 'Mapped',
            render: (text, val) => (
              <>
                <Button onClick={() => Info(val)}>More Info</Button>
              </>
            ),
          },
      ];
    return(
        <Card title='Fabric Development request view'  extra={
            <Link to="/fabricdevelopment/FabricDevelopmentrequest/Fabric-Development-Request">
            <span>
              <Button type={"primary"}>New </Button>{""}
            </span>
            </Link>
          }>
            <Table dataSource={data} size="small" columns={columnsSkelton} />
        </Card>
    )
}
export default FabricDevelopmentView