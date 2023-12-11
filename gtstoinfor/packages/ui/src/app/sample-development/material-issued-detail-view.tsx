import { PurchaseOrderservice, SampleDevelopmentService } from '@project-management-system/shared-services';
import { Button, Card, Col, Descriptions, Form, Modal, Row, Select, Table } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { type } from 'os';
import { AllocatedLocationReq, LocationReq, MaterailViewDto, PurchaseViewDto, RequestNoReq } 
from '@project-management-system/shared-models';
import { columnProps } from '../masters/column/column-form';
import { ColumnProps } from 'antd/es/table';

export interface MaterailDetailViewPagesProps {
  requestId:number
}

// export const PurchaseOrderDetailsView = (props:PoDetailViewPagesProps) => {
    export const MaterialIssuesDetailsView = (props:MaterailDetailViewPagesProps) => {

  const [data, setData] = useState<any[]>([])
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const page = 1
  const [childData, setChildData] = useState({});
  const navigate = useNavigate();
  const service = new SampleDevelopmentService();
  const [form] = Form.useForm()
  const [material, setMaterial] = useState<any[]>([])
  const { Option } = Select
  const [drop, setDrop] = useState('')
  const location = useLocation()
  const [sampleData, setSampleData] = useState<any[]>([]);
  const [requestNo, setRequestNo] = useState<any>([]);
  // const [showTabe, setShowTabe] = useState(false);

  useEffect(() => {
      getAllData();

  },[])

const allocatedLocationInfo = (value) => {
  const req = new LocationReq();
  req.sampleRequestItemId = value;
 
  service.allocatedLocation(req).then((res) => {
    if (res.status) {
      setChildData((prev) => {
        return { ...prev, [value]: res.data };
      });
    }
  });
};


  const getAllData = () => {
    const req = new RequestNoReq()
    req.sampreqId = location.state.requestId
    console.log( location.state.requestId,"&&&&&&&&&&");
    
    service.getbyID(req).then((res) => {
        if(res.status){

            // setSampleData(res.data);
        // console.log(res.data, "?????????????????????????????");
        setData(res.data)

        }
        
    })
}
//   }, [props.purchaseOrderId])

function onReset() {
  form.resetFields();
  setData([]);
}
  const renderCellData = (data) => {
    return data ? data : "-";
  }

  const onChange = ((value) => {
    setDrop(value)
    // console.log(value,'[[[[[[[[[[[[[[')
  })

const columns:ColumnProps<any>[]=[
  {
    title: "S No",
    key: "sno",
    width: "70px",
    responsive: ["sm"],
    render: (text, object, index) => (page - 1) * 10 + (index + 1),
  },

  {
    title: "Request No",
    dataIndex: "requestNo",
    render: (text) => text || "-"

  },
  {
    title: "Type",
    dataIndex: "itemType",
    render: (text) => text || "-"

  },
  {
    title: "Brand Name",
    dataIndex: "brandName",
    render: (text) => text || "-"

  },
  {
    title: "Style",
    dataIndex: "style",
    render: (text) => text || "-"

  },
  {
    title: "Colour",
    dataIndex: "colour",
    render:(value,record) => {
      return(<>{value ? value : 'NA'}</>)
    }
  },
  {
    title: "Item Code",
    dataIndex: "itemCode",
    render: (text) => text || "-"
  },
  {
    title: "Consumption",
    dataIndex: "consumption",
    render: (text) => text || "-"

  },
  {
    title: "Qunatity",
    dataIndex: "BOM",
    render:(value,record) => {
      return(<>{value > 0 ? value : record.consumption}</>)
    }
  },
]

const childColumns:ColumnProps<any>[]=[
  {
    title: "Location",
    dataIndex: "location",
    render: (text) => text || "-"

  },
  {
    title: "Item Type",
    dataIndex: "itemType",
    render: (text) => text || "-"

  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    render: (text) => text || "-"

  },
  {
    title: "Allocated Quantity",
    dataIndex: "allocatedQty",
    render: (text) => text || "-"

  },
]

const expandFabricTabel = (record) => {
  return (
    <Table
      rowKey={(record) => record.sampleFabricId}
      columns={childColumns}
      dataSource={childData[record.sample_request_id]}
    ></Table>
  );
};
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const expandTrimTabel = (record) => {
    return (
      <Table
        rowKey={(record) => record.sampleTrimInfoId}
        columns={childColumns}
        dataSource={childData[record.sampleReqTrimId]}
      ></Table>
    );
  };

  /**
 * get form data 
 * @param fromDoc 
 * @param toDoc 
 */
  
  const openPrint = () => {
    setIsModalVisible(true);
  }

  return (
    <div>
      <Card>
        <Card title="Material Detail View" headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
        extra={<span style={{ color: 'white' }} >  <Button className='panel_button' onClick={() => navigate('/masters/material-issued-view')}>Material Issued View</Button> </span>} >
      
        <br></br>
         <><Table
          rowKey={(record) => record.sampleFabricId}
          columns={columns}
          dataSource={data}
          expandable={{
            expandedRowRender: (record) => expandFabricTabel(record),
            onExpand(expanded, record) {
              allocatedLocationInfo(record.sample_request_id);
            },
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          //   className="custom-table-wrapper"
        /></>
        
          
         
        </Card>
      </Card>
    </div>
  )
}

export default MaterialIssuesDetailsView;