import { FabricDevReqId } from "@project-management-system/shared-models";
import { ColourService, FabricDevelopmentService, StyleService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Descriptions, Modal, Segmented, Table } from "antd"
import { log } from "console";
import { setOptions } from "highcharts";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { __values } from "tslib";

export const QualityTabsView = () =>{
    const [page, setPage] = React.useState(1);
    const styleService = new StyleService();
    const colorService = new ColourService();
    const uomServices = new UomService();
    const [data,setData] = useState([])
    const [itemsData,setItemsData] = useState([])
    const [options,setOption] = useState([])
    const [style,setStyle] = useState([])
    const [color,setColor] = useState([])
    const [uom,setUom] = useState([])
    const navigate = useNavigate()
const service = new FabricDevelopmentService()


  const location = useLocation()
  const [selectedQuality,setSelectedQuality] = useState<any>('')
  const [isModalVisible, setIsModalVisible] = useState(false);

    const record = location.state;
    
useEffect(()=>{getData()},[])
const getData = () => {
  const req = new FabricDevReqId(record.rowData.fabric_request_id)
 service.getAllFabricDevReqQltyData(req).then(res=>{
  if(res.data){
    setData(res.data)
  }else{
    setData([])
  }
})
}

const optionLabels = data.map((quality) => quality.quality);
let filterData = data.filter(e =>e.quality === selectedQuality)


    const columnsSkelton: any = [
        {
          title: "S No",
          key: "sno",
          width: "70px",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: <div style={{textAlign:'center'}}>Style</div>,
          dataIndex: "style",
         
        },
        {
          title: <div style={{textAlign:'center'}}>Color</div>,
          dataIndex: "colour",
         
        },
        {
          title: <div style={{textAlign:'center'}}>Garment Quantity</div>,
          dataIndex: "garment_quantity",
       
        },
        {
          title: <div style={{textAlign:'center'}}>Consumption(YY)</div>,
          dataIndex: "consumption",
       
        },
        {
          title: <div style={{textAlign:'center'}}>Wastage(X%)</div>,
          dataIndex: "wastage",
       
        },

        {
          title: "Fabric Quantity",
          align:'center',
          dataIndex: "fabric_quantity",
       
        },
        {
          title: "UOM",
          dataIndex: "uom",
          align:'center',
       
        },

       
          {
            title: 'Mapped',
            align:'center',
            render: (text, val) => (
              <>
              <Button onClick={() => mappedModal(text,val) }>Mapped Items</Button>              
              </>
            ),
          },
      ];
      const itemsColumns: any = [
       
        {
          title: "Item Code",
          align:'center',
          dataIndex: "itemCode",

        },
        {
          title: <div style={{textAlign:'center'}}>Description</div>,
          dataIndex: "description",
         
        },
       
      
      ];
    
      const handleModalClose = () => {
        setIsModalVisible(false);
      };
      
      // const tableData = filterData?.[0]?.fabricEntity
      //  console.log(filterData,'filterrrrrrrrrrrr');
      
      const getInfo = (val) =>{   
        const qltId = data.filter(e => e.quality === val)
        setSelectedQuality(val)
        const req = new FabricDevReqId(null,qltId?.[0]?.fabric_req_quality_id)
        
        service.getQltyInfoById(req).then(res =>{
         
          if(res.data){
            setStyle(res.data)
          }else{
            setStyle([])
          }
        })
      }
      const mappedModal =(val,data) =>{
        setIsModalVisible(true)
        const req = new FabricDevReqId(null,null,val.fabric_req_quality_info_id)
        service.getAllItemsById(req).then(res =>{
         
          if(res.data){
            setItemsData(res.data)
          }else{
            setItemsData([])
          }
        })
      }
    return(
        <Card title ="Fabric Development Request Info" extra={<span> <Button type={"primary"} onClick={() => navigate("/fabricdevelopment/fabric-development-request/fabric-development-request-view")}>Back </Button></span> }>
        <Segmented
        options={optionLabels}
        // defaultValue={'Quality1'}
        onChange={(value)=>getInfo(value)}
        style={{fontWeight:'bold',color:'black'}}
      />

     
         {style.length>0 ?( 
          <>
         <Descriptions>
            <Descriptions.Item label="Placement" labelStyle={{fontWeight:'bold',color:'black'}}>
            {filterData?.[0]?.placement}
            </Descriptions.Item>
            <Descriptions.Item label="Width"labelStyle={{fontWeight:'bold',color:'black'}}>
            {filterData?.[0]?.width}
            </Descriptions.Item>
            <Descriptions.Item label="Fabric Code"labelStyle={{fontWeight:'bold',color:'black'}}>
            {filterData?.[0]?.fabric_code}
            </Descriptions.Item>
          </Descriptions>
         
       
            <Table dataSource={style} size="small" columns={columnsSkelton} />
            </>
       ):(<></>)}     
       <Modal
        title="Mapped Items"
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={null}
      >
        <Table dataSource={itemsData} columns={itemsColumns} size="small"/>
      </Modal>

        </Card>
    )
}
export default QualityTabsView