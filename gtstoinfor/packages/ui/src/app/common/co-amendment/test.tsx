import { CloseOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd'
import React from 'react'

function Test() {

  const [page, setPage] = React.useState(1);


    const columnsSkelton: any = [
        {
          title: "S No",
          key: "sno",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "Size",
          dataIndex: "size",
          
        },
    
        {
          title: "Color",
          dataIndex: "color",
        },
        {
          title: "Destination",
          dataIndex: "destination",
        
        },
        {
          title: "Qty",
          dataIndex: "order_quantity",
        render:(data,val) =>{
           return( <span>{val.order_quantity}-{val.uom}</span>)
        }
        },
        {
          title: "CO Line Number",
          dataIndex: "coline_number",
          
          //   sorter: (a, b) => a.coNum.localeCompare(b.coNum),
          // ...getColumnSearchProps("coNum"),
        },
    
        {
          title: "Status",
          dataIndex: "status",
          
          //   sorter: (a, b) => a.coNum.localeCompare(b.coNum),
          // ...getColumnSearchProps("coNum"),
        },
        {
      
          title: `Action`,
          dataIndex: 'action',
          render: (text, rowData) => (
            <>
            
            //   rowData.status != CustomerOrderStatusEnum.CLOSED ? 
            <span>
                <Button  >
                  <CloseOutlined />
                </Button>
              </span>
              
            
            </>
          )
        }
    
      ];
  return (
    <Table
        size="small"
        // dataSource={data}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        columns={columnsSkelton}
        pagination={false}
      />
  )
}

export default Test