import { Button, Card, Col, Form, Input, Modal, Row, Select, Space, Statistic, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { ColumnType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';
import { trimService } from '@project-management-system/shared-services';
import { PrinterOutlined } from '@ant-design/icons';
import BackingPaper from './backing-paper';
import { useLocation } from 'react-router-dom';



const TrimsGrid=()=>{

    const [page,setPage] = useState<number>(1);
    const service = new trimService();
    const [trim,setTrim]=useState<any>([]);
    const [selectedPrintId, setSelectedPrintId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const location = useLocation()

    useEffect(()=>{
        getAll();
    },[])

    const handlePrint = (printId) => {
        console.log(printId,'yyyyyyy');
        
        setSelectedPrintId(printId);
        if(printId === 1 ){
            setIsModalVisible(true);

        }else {
            setIsModalVisible(false);


        }

        
        setIsModalVisible(true);
      };
    // const handlePrint = (printId) => {
    //     console.log(printId, 'yyyyyyy');
    //     setSelectedPrintId(printId);
    //     setIsModalVisible(true);
    //   };
      const handleModalCancel = () => {
        // Handle modal Cancel button click here
        setIsModalVisible(false);
      };
    const getAll=()=>{
        
        service.getAllTrims().then(res=>{
            console.log(res,'oooooooooooooo');

            if(res){
                setTrim(res);
        console.log(res,'pppppppppppppppppp');
        
            }   
        })
    }
    const getModalContent = () => {
        switch (selectedPrintId) {
          case 1:
            return <BackingPaper />;
          // Add more cases for other printIds if needed
          default:
            return null;
        }
      };
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
        width:'500px'
        },
        
   
        {
            title: 'Format',
            dataIndex: 'format',
            width:'500px',

            render: (val) => {
            //   console.log(val.map((i) => i.formatId), "22222222222");
              const value = (val ?? []).map((i, index) => (
                <div
                  key={index}
                  style={{
                    padding: '5px',
                    borderBottom: index !== (val ?? []).length - 1 ? '1px solid #e8e8e8' : 'none'
                  }}
                >
                  {i.formatId }
                </div>
              ));
          
              return <div style={{ display: 'flex', flexDirection: 'column' }}>{value}</div>;
            }
          },
          
          
        {
            title: 'Print',
            dataIndex: 'format',
            width:'500px',

            render: (val) => {
            //   console.log(val.map((i) => i.formatId), "22222222222");
              const value = (val ?? []).map((i, index) => (
               
                 <Button
              type="link"
              icon={<PrinterOutlined />}
              onClick={() => handlePrint(i.printId)}
             >
           Print
            </Button>
               ));
          
              return (<>{value}</>);
            }
          },
    //       {
    //         title: 'Print',
    //         dataIndex: '',
    //         render: (text, record) => {
                
    //     <Button
    //      type="link"
    //      icon={<PrinterOutlined />}
    //      onClick={() => handlePrint(record.printId)}
    //     >
    //   Print
    //    </Button>            },
    //       },

    ]
    return (
        <div>
            <Card title={<span>Trims</span>} style={{textAlign:'center'}}     
                headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
 >
<Table
 columns={columns}
 dataSource={trim}/>


            <Modal
            //   className='print-docket-modal'
            //  key={'modal'}
              width={'90%'}
              style={{ top: 30, alignContent: 'right' }}
              visible={isModalVisible}
              title={<React.Fragment>
              </React.Fragment>}
              onCancel={()=>handleModalCancel()}
              footer={[

              ]}
            >
          {selectedPrintId === 1 && <BackingPaper/>}
         
            </Modal>
            </Card>
        </div>
    )
}

export default TrimsGrid