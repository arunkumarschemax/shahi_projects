import { BuyerExtrnalRefIdReq, BuyerIdReq, MenusAndScopesEnum } from "@project-management-system/shared-models";
import { BuyersService, EmployeeDetailsService, FabricDevelopmentService, LocationsService, ProfitControlHeadService, StyleService } from "@project-management-system/shared-services";
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
    const employeeService = new EmployeeDetailsService()
    const styleService = new StyleService()
    const [data,setData] = useState([])
    const[locId,setLocId] = useState([]);
    const[pchId,setPchId] = useState([]);
    const[buyerId,setBuyerId] = useState([]);
    const[empId,setEmpId] = useState([]);
    const[styId,setStyId] = useState([]);
    const [userId, setUserId] = useState([]); 
    const [loginBuyer,setLoginBuyer] = useState<number>(0)
    const externalRefNo = JSON.parse(localStorage.getItem('currentUser')).user.externalRefNo
    const role = JSON.parse(localStorage.getItem('currentUser')).user.roles
  let userRef



    useEffect  (()=>{
      getData()
      Login()
    },[])
    
    const Login = () =>{
      const req = new BuyerExtrnalRefIdReq()
      if(role === MenusAndScopesEnum.roles.crmBuyer){
        req.extrnalRefId = externalRefNo
      }
      buyerService.getBuyerByRefId(req).then(res=>{
        if(res.status){
          setUserId(res.data)
    setLoginBuyer(res.data.buyerId)
        }
      })
      buyerService.getAllActiveBuyers().then(res=>{
        if(res.status){
              setBuyerId(res.data)
              console.log(buyerId,'buyer');
        }
      })
    }
    const getData = ()=>{
      const loginId = new BuyerIdReq(loginBuyer)
      console.log(loginId,'/////////');
      
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
              

                employeeService.getAllActiveEmploee().then(res =>{
                  console.log(res.data,"emp")
                  if (res.data){
                   setEmpId(res.data)
                  }
                })


                styleService.getAllActiveStyle().then(res =>{
                  console.log(res.data,"emp")
                  if (res.data){
                   setStyId(res.data)
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
          dataIndex: "location_name",
        
        },
        {
          title: "Style",
          dataIndex: "style",
          
        },
        {
          title: "PCH",
          dataIndex: "profit_control_head",
         
        },
        {
          title: "Buyer",
          dataIndex: "buyer_name",
          
        },
        {
          title: `Fabric Type`,
          dataIndex: "type",
        },
        {
            title: `Fabric Responsible`,
            dataIndex: "firstName",
            render: (VAL,data) => {
              const ftname = `${data?.first_name} ${data?.last_name}`;
              return ftname;
            }
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
            <Table dataSource={data}
                    size="small" columns={columnsSkelton} />
        </Card>
    )
}
export default FabricDevelopmentView