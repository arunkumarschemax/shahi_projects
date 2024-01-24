import { Button, Card, Col, Form, Input, Row, Select, Space, Statistic, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { ColumnType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';
import { trimService } from '@project-management-system/shared-services';



const TrimsGrid=()=>{

    const [page,setPage] = useState<number>(1);
    const service = new trimService();
    const [trim,setTrim]=useState<any>([]);


    useEffect(()=>{
        getAll();
    },[])

    const getAll=()=>{
        
        service.getAllTrims().then(res=>{
            console.log(res,'oooooooooooooo');

            if(res){
                setTrim(res);
        console.log(res,'pppppppppppppppppp');
        
            }   
        })
    }
    const columns:any=[
    {
    title: 'S No',
    key: 'sno',
    width: '70px',
    style: { background: 'red' },
    responsive: ['sm'],
    render: (text, object, index) => (page - 1) * 10 + (index + 1),
            
       
        },

        {
       title:'Type of Trims',
        dataIndex:'trim',
        },
        // {
        //     title: 'Format',
        //     dataIndex: 'format',
        //     render: (text: any, record: any) => <span>{record.format.formatId}</span>
        //   },
          
        {
            title:'print',
            dataIndex:''
        },

    ]
    return (
        <div>
            <Card title={<span>Trims</span>} style={{textAlign:'center'}}     
                headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
 >
<Table
 columns={columns}
 dataSource={trim}/>
            </Card>
        </div>
    )
}

export default TrimsGrid