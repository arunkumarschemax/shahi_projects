import { FabricDevelopmentService } from "@project-management-system/shared-services";
import { Button, Card, Descriptions, Modal, Segmented, Table } from "antd"
import { log } from "console";
import { setOptions } from "highcharts";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { __values } from "tslib";

export const QualityTabsView = () =>{
    const [page, setPage] = React.useState(1);
    const service = new FabricDevelopmentService();
    const [data,setData] = useState([])
    const [itemsData,setItemsData] = useState([])
    const [options,setOption] = useState([])
    const location = useLocation()
  const [selectedQuality,setSelectedQuality] = useState<any>('Quality1')
  const [isModalVisible, setIsModalVisible] = useState(false);

    const record = location.state;
    const qualityOptions = record.rowData.qualities || [];
    const optionLabels = qualityOptions.map((quality) => quality.qualityName);
    


    const columnsSkelton: any = [
        {
          title: "S No",
          key: "sno",
          width: "70px",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "Style",
          dataIndex: "style",

        },
        {
          title: "Color",
          dataIndex: "color",
         
        },
        {
          title: "Garment",
          dataIndex: "garmentQty",
       
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
        console.log(val.items,'--------');
        // console.log(data,'--------*********');
        setIsModalVisible(true)
        setItemsData(val.items)
      }
      const handleModalClose = () => {
        setIsModalVisible(false);
      };
      
      const filterData = qualityOptions.filter(e =>e.qualityName === selectedQuality)
      const tableData = filterData?.[0]?.fabInfo
      
    return(
        <Card>
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