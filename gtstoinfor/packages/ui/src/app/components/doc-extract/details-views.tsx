import React from 'react';
import { Descriptions } from 'antd';
import { useLocation } from 'react-router-dom';

function ScanDetailView() {
  // Check if location and location.state are defined

  const  rowData  = useLocation();
  
  console.log(rowData.state.rowData,"kkkkkkkkkkk")
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
  <Descriptions size="small" column={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2 }}>
        <Descriptions.Item
          label="typedId"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.typeId}
        </Descriptions.Item>
        <Descriptions.Item
          label="Gst"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Gst}
        </Descriptions.Item>
        <Descriptions.Item
          label="Ifsc"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Ifsc}

        </Descriptions.Item>
        <Descriptions.Item
          label="Innvoice"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Innvoice}

        </Descriptions.Item>
        <Descriptions.Item
          label="Customer"
          labelStyle={{ color: "black", fontWeight: "bold" }}
        >
          {rowData.state.rowData.Customer}

        </Descriptions.Item>
       
      </Descriptions>

  
     
    </>
  );
}

export default ScanDetailView;


// import React from 'react'
// import { useLocation } from 'react-router-dom'


// function ScanDetailView() {

//   const  location = useLocation();

//   console.log(location.state.rowData.state,"rowdata.state")
//   return (
//     <div>ScanDetailView</div>
//   )
// }

// export default ScanDetailView



