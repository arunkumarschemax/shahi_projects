 

import { BuyingHouseService, CompositionService, CurrencyService, CustomGroupsService, DepartmentService, EmployeeDetailsService, GroupTechClassService, ItemCategoryService, ItemGroupService, ItemTypeService, LiscenceTypeService, MasterBrandsService, OperationsService, ROSLGroupsService, SearchGroupService, StyleService, UomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Descriptions, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LiscenceTypeIdRequest } from "@project-management-system/shared-models";
import AlertMessages from "../common-functions/alert-messages";

export interface Props {
  data: any
}
export function SMKDetailView  (props: Props)  {

    // const [page,setPage] = useState<number>(1);
    // const [sizeData, setSizeData] = useState<any[]>([])
    let location = useLocation();
    const stateData = location.state;

     console.log(stateData,"stateData")
    
    const [licence,setLicence]=useState([])
    const [employedata,setEmployeData] = useState([]);
    const [styledata,setStyle]=useState([]);
    const [compositiondata,setCompositionData] = useState([]);
    const [searchdata,setSearchData] = useState([]);
    const[brand,setBrand]=useState([]);
    const [itemCategory,setItemCategory]= useState([]);
    const [ItemType,setItemType]= useState([]);
    const [house,setHouse]= useState([]);
    const [rosl,setRosl] = useState([]);
    const [customGroup,setCustomGroup]= useState([]);
    const [uomdata,setUomData] = useState([]);
    const [group,setGroup] = useState([]);
    const [currency,setCurrency]= useState([]);
    const [itemgroup,setitemgroup] = useState([]);
    const [operationsData, setOperationsData] = useState<any[]>([]);
    const [departmentData, setDepartmentData] = useState<any[]>([]);
  

    const operationsService = new OperationsService();
    const service =new DepartmentService();  
  



    
  

      
   
      
    return(
        <Card title={<span style={{ color: 'black' }}>SMV Detailed View<span style={{color:'#0A93E1  '}}></span></span>}  headStyle={{ fontWeight: 'bold' }} extra={<Link to='/product-structure/smv-efficiency-view' ><span style={{color:'white'}} >
          <Button className='panel_button' >Back </Button>
           </span></Link>}>
            <span>      
               
                {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> */}
                <Descriptions   column={3} style={{ textAlign: 'center' }}>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Operation</span>} >{(stateData.operation_name)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#617C8A',fontWeight: 'bold' }}>Capacity Type</span>} >{(stateData.capacity_type)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#617C8A',fontWeight: 'bold' }}>Valid From Date</span>} >{moment(stateData.valid_from_date).format('DD-MM-YYYY')}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{color:'#617C8A',fontWeight: 'bold' }}>Valid To Date</span>} >{moment(stateData.valid_to_date).format('DD-MM-YYYY')}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Revision No</span>} >{stateData.revision_no}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Work Center</span>} >{stateData.work_center}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Operation Description</span>} >{stateData.operation_description}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Department</span>} >{(stateData.dept_name)}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Planing Area</span>} >{stateData.planing_area}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Run Time (Mins)</span>} >{stateData.run_time}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Price/time Qty</span>} >{stateData.price_time_qty}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Setup Time</span>} >{stateData.setup_time}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>External Setup</span>} >{stateData.external_setup}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Fixed Time</span>} >{stateData.fixed_time}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Pln no. Machine</span>} >{stateData.plnno_machine}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Pln no. Workers</span>} >{stateData.plnno_workers}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Pln no. setup</span>} >{stateData.plnno_setup}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Phantom Op Mtd</span>} >{stateData.plnno_op_mtd}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Lead tm offset</span>} >{stateData.leadtm_offset}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>P day</span>} >{stateData.p_days}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Options Percent</span>} >{stateData.options_percent}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Scrap pct</span>} >{stateData.scrap_pct}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Setup Scrap</span>} >{stateData.setup_scrap}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Document ID</span>} >{stateData.document_id}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Tool no</span>} >{stateData.tool_no}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Subcontr ctrl</span>} >{stateData.subcontr_ctrl}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Finite</span>} >{stateData.finite}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Qty per Hour</span>} >{stateData.qty_per_hour}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Crit Resource</span>} >{stateData.crit_resource}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Add mtrl Offset</span>} >{stateData.add_mtrl_offset}</Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color:'#617C8A',fontWeight: 'bold' }}>Shipping Buffer</span>} >{stateData.shipping_buffer}</Descriptions.Item>
                    </Descriptions>
                    {/* </div> */}
               

                   </span>
            
    
        </Card>
  
    )
}
export default SMKDetailView
