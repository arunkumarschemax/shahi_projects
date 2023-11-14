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



  const location = useLocation()
  const [selectedQuality,setSelectedQuality] = useState<any>('Quality1')
  const [isModalVisible, setIsModalVisible] = useState(false);

    const record = location.state;
    const qualityOptions = record.rowData.fabricQuantityEntity || [];
    const optionLabels = qualityOptions.map((quality) => quality.quality);
    console.log(qualityOptions,'fabricQuantityEntity');
    
useEffect(()=>{getData()},[])
const getData = () => {
//  styleService.getAllActiveStyle().then(res=>{
//   if(res.data){
//     setStyle(res.data)
//   }else{
//     setStyle([])
//   }
// })
// colorService.getAllActiveColour().then(res=>{
//   if(res.data){
//     setColor(res.data)
//   }else{
//     setColor([])
//   }
// })

// uomServices.getAllActiveUoms().then(res=>{
//   if(res.data){
//     setUom(res.data)
//   }else{
//     setUom([])
//   }
// })
}



    const columnsSkelton: any = [
        {
          title: "S No",
          key: "sno",
          width: "70px",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        // {
        //   title: "Style",
        //   dataIndex: "styleId",
        //   render: (data) => {
        //     const styleId = style.find((res) => res.styleId === data);
        //     return styleId? styleId.style : "N/A";
        //   }
        // },
        {
          title: "Color",
          dataIndex: "colorId",
          render: (data) => {
            const colorId = color.find((res) => res.colourId === data);
            return colorId? colorId.colour : "N/A";
          }
        },
        {
          title: "Garment Quantity",
          dataIndex: "garmentQuantity",
       
        },
        {
          title: "Consumption(YY)",
          dataIndex: "consumption",
       
        },
        {
          title: "Wastage(X%)",
          dataIndex: "wastage",
       
        },

        {
          title: "Fabric Quantity",
          dataIndex: "fabricQuantity",
       
        },
        {
          title: "UOM",
          dataIndex: "uomId",
          render: (data) => {
            const uomId = uom.find((res) => res.uomId === data);
            return uomId? uomId.uom : "N/A";
          }
       
        },

       
          {
            title: 'Mapped',
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
          dataIndex: "itemCode",

        },
        {
          title: "Description",
          dataIndex: "description",
         
        },
       
      
      ];
      const mappedModal =(val,data) =>{
        console.log(val.fabricItemsEntity,'--------');
        // console.log(data,'--------*********');
        setIsModalVisible(true)
        setItemsData(val.fabricItemsEntity)
      }
      const handleModalClose = () => {
        setIsModalVisible(false);
      };
      
      const filterData = qualityOptions.filter(e =>e.quality === selectedQuality)
      const tableData = filterData?.[0]?.fabricEntity
      
    return(
        <Card title ="Fabric Development Request Info" extra={<span> <Button type={"primary"} onClick={() => navigate("/fabricdevelopment/fabric-development-request/fabric-development-request-view")}>Back </Button></span> }>
        <Segmented
        options={optionLabels}
        defaultValue={'Quality1'}
        onChange={(value)=>setSelectedQuality(value)}
        style={{fontWeight:'bold',color:'black'}}
      />

     
          <Descriptions>
            <Descriptions.Item label="Placement" labelStyle={{fontWeight:'bold',color:'black'}}>
            {filterData?.[0]?.placement}
            </Descriptions.Item>
            <Descriptions.Item label="Width"labelStyle={{fontWeight:'bold',color:'black'}}>
            {filterData?.[0]?.width}
            </Descriptions.Item>
            <Descriptions.Item label="Fabric Code"labelStyle={{fontWeight:'bold',color:'black'}}>
            {filterData?.[0]?.fabricCode}
            </Descriptions.Item>
          </Descriptions>
         
       
            <Table dataSource={tableData} size="small" columns={columnsSkelton} />
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