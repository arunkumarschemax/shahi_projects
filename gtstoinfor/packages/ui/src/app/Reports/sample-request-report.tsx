import { SampleDevelopmentService } from '@project-management-system/shared-services';
import { Card, Table } from 'antd'
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

    const Columns:any=[
        {
            title:"Request No",
            dataIndex:"request_no"
            
        },
        {
            title:"Style",
            dataIndex:"m3_style_no"
            
        },
        {
            title:"Date",
            dataIndex:""
            
        },
        {
                title:<div style={{ textAlign: 'center' }}>Item</div> ,
                dataIndex: "sm",
                key: "sm",
                align:'center',
                render: (sm) => {
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
        // {
        //     title:"Required Qty",
        //     dataIndex:""
        // },
        {
            title:"Assigned Qty",
            dataIndex:""
        },
        {
            title:"PO Qty",
            dataIndex:""
        },
        {
            title:"GRN Qty",
            dataIndex:""
        },
        {
            title:"To be Procure",
            dataIndex:""
        },

       
    ]

  return (
    <div>
        <Card title={<span>SAMPLE REQUEST REPORT</span>} style={{textAlign:'center'}} headStyle={{ border: 0 }}>
        <Table columns={Columns}  
        dataSource={data}
            /> 
        </Card>
    </div>
  )
}

export default SampleRequestReport
