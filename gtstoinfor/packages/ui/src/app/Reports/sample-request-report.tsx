import { SampleDevelopmentService } from '@project-management-system/shared-services';
import { Card, Table } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'

const SampleRequestReport = () => {

    const service = new SampleDevelopmentService();
    const [data, setData] = useState<any>([]);

    const getData = () => {
        service.getSampleRequestReport().then(res => {
            if(res.status){
                setData(res.data);
        
            }
        })
      };

      useEffect(() => {
        getData();
      }, []);

      const  renderCellData=(data)=>{
        return  data?data:"-";
      }

    const Columns:any=[
        {
            title:"Request No",
            dataIndex:"request_no"
            
        },
        {
          title:<div style={{ textAlign: 'center' }}>Style</div> ,
          dataIndex: "sm",
          key: "sm",
          align:'center',
          render: (sm,text) => {
            renderCellData(text)
            return (
              <Table
                dataSource={sm}
                columns={[
                  {
                    dataIndex: "style",
                    key: "style", align:'center',
                  },
                 
                ]}
                pagination={false}
              />
            );
          }
        },
 
        // {
        //     title:"Date",
        //     dataIndex:""
            
        // },
        {
          title: <div style={{ textAlign: 'center' }}>Date</div>,
          dataIndex: "sm",
          key: "sm",
          align: 'center',
          render: (sm, record) => {
            return (
              <>
                {record.date ? moment(record.date).format("YYYY-MM-DD") : null}
                <Table
                  dataSource={sm}
                  columns={[
                    {
                      dataIndex: "date",
                      key: "date",
                      align: 'center',
                    }
                  ]}
                  pagination={false}
                />
              </>
            );
          }
        },
        

        {
                title:<div style={{ textAlign: 'center' }}>Item</div> ,
                dataIndex: "sm",
                key: "sm",
                align:'center',
                render: (sm,text) => {
                  renderCellData(text)
                  return (
                    <Table
                      dataSource={sm}
                      columns={[
                        {
                          dataIndex: "code",
                          key: "code", align:'center',
                        },
                       
                      ]}
                      pagination={false}
                    />
                  );
                }
              },
              {
                title:<div style={{ textAlign: 'center' }}>Color</div> ,
                dataIndex: "sm",
                key: "sm",
                align:'center',
                render: (sm) => {
                  return (
                    <Table
                      dataSource={sm}
                      columns={[
                        {
                          dataIndex: "color",
                          key: "color", align:'center',
                        },
                      ]}
                      pagination={false}
                    />
                  );
                }
              },
              {
                title:<div style={{ textAlign: 'center' }}>Required Qty</div> ,
                dataIndex: "sm",
                key: "sm",
                align:'center',
                render: (sm) => {
                  return (
                    <Table
                      dataSource={sm}
                      columns={[
                        {
                          dataIndex: "consumption",
                          key: "consumption", align:'center',
                        },
                      ]}
                      pagination={false}
                    />
                  );
                }
              },
              {
                title:<div style={{ textAlign: 'center' }}>Assigned Qty</div> ,
                dataIndex: "sm",
                key: "sm",
                align:'center',
                render: (sm) => {
                  return (
                    <Table
                      dataSource={sm}
                      columns={[
                        {
                          dataIndex: "quantity",
                          key: "quantity", align:'center',
                        },
                      ]}
                      pagination={false}
                    />
                  );
                }
              },
         
        {
            title:"PO Qty",
            dataIndex:"poQty"
        },
        {
            title:"GRN Qty",
            dataIndex:""
        },
        {
            title:"To be Procure",
            dataIndex:"procure"
        },

       
    ]

  return (
    <div>
        <Card title={<span>Material Requisition</span>} style={{textAlign:'center'}} headStyle={{ border: 0 }}
        className="card-header">
        <Table columns={Columns}  
        dataSource={data}
        className="custom-table-wrapper"
            /> 
        </Card>
    </div>
  )
}

export default SampleRequestReport