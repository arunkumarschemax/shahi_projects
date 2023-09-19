import { FabricDevelopmentService } from "@project-management-system/shared-services";
import { Button, Card, Table } from "antd"
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export const FabricDevelopmentView = () =>{
    const navigate = useNavigate()

    const [page, setPage] = React.useState(1);
    const service = new FabricDevelopmentService();
    const [data,setData] = useState([])

    useEffect  (()=>{
      getData()
    },[])
    const getData = ()=>{
      service.getAll().then(res=>{
              setData(res)
              console.log(res,'data');
              
      })
  }
  const Info = (rowData) => {
    // console.log(rowData, '===============rowData');
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
          dataIndex: "location",

        },
        {
          title: "PCH",
          dataIndex: "PCH",
         
        },
        {
          title: "Buyer",
          dataIndex: "buyer",
       
        },
        {
          title: `Fabric Type`,
          dataIndex: "fabricType",
         
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
        <Card title='Fabric Development reuest view'  extra={
            <Link to="/fabricdevelopment/FabricDevelopmentrequest/Fabric-Development-Request">
    
            <span>
              <Button type={"primary"}>New </Button>{" "}
            </span>
            </Link>
          }>
            <Table dataSource={data} size="small" columns={columnsSkelton} />
        </Card>
    )
}
export default FabricDevelopmentView