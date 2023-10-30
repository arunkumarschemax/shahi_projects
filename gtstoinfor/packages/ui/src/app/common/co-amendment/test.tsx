import { CloseOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { CustomerOrderStatusEnum } from '@project-management-system/shared-models';
import { Button, Divider, Table } from 'antd'
import React from 'react'
export interface TestProps {
  poData:any
  key:any
}
const Test = (props: TestProps) => {
  console.log(props?.poData[0]?.coLineInfo)


  const [page, setPage] = React.useState(1);


    const columnsSkelton: any = [
        {
          title: "S No",
          key: "sno",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "SKU Code",
          dataIndex: "skuCode",
          
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
          dataIndex: "orderQuantity",
      
        },
        {
          title: "CO Line Number",
          dataIndex: "coLineNumber",
          
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
            <><span>
             <Button 
            //  title={"Detail View"} onClick={() => details(rowData)}
             >
                <EyeOutlined />
              </Button>
            </span>
            <Divider type="vertical"/>
            {
              rowData.status != CustomerOrderStatusEnum.CLOSED ? 
            <span>
                <Button 
                // title={"Cancel Order"} onClick={() => cancelOrder(rowData)}
                 >
                  <CloseOutlined />
                </Button>
              </span>
              : ""
            }
            <Divider type="vertical"/>
            <EditOutlined  className={'editSamplTypeIcon'}  type="edit" 
              // onClick={() => {
              //     openFormWithData(rowData);
              // }}
              style={{ color: '#1890ff', fontSize: '14px' }}
            />
            </>
          )
        }
    
      ];
  return (
    <Table
        size="small"
        dataSource={props?.poData[0]?.styleOrderItems}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        columns={columnsSkelton}
        pagination={false}
      />
  )
}

export default Test