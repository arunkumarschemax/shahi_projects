import { M3ItemsService } from '@project-management-system/shared-services';
import { Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';

const M3ItemsView = () => {

    const navigate=useNavigate()
    const service = new M3ItemsService();
    const [itemGroup, setItemGroup] = useState([]);

    useEffect(() => {
        getM3ItemsData();
    }, []);
    
    const getM3ItemsData = () => {
        service.getM3Items().then(res => {
            if (res.status) {
                setItemGroup(res.data);
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }
        })
    }

    const Columns: any = [
        {
            title: "Item Code",
            dataIndex: "itemCode",
        },
        {
            title: "Content",
            dataIndex: "content",
        },
        {
            title: "Fabric Type",
            dataIndex: "fabric_type_name",
        },
        {
            title: "Weave",
            dataIndex: "fabric_weave_name",
        },
        {
            title: "Weight",
            dataIndex: "weight",
            render: (text,record) => {
                return(
                    <>
                    {record.weight ? `${record.weight} ${record.weightUnit}` : '-'}
                    </>
                )
            }
        },
        {
            title: "Construction",
            dataIndex: "construction",
        },
        {
            title: " Yarn Count",
            dataIndex: "yarnCount",
            render: (text,record) => {
                return(
                    <>
                    {record.yarnCount ? `${record.yarnCount} ${record.yarnUnit}` : '-'}
                    </>
                )
            }
        },
        {
            title: "Finish",
            dataIndex: "finish",
        },
        {
            title: "Shrinkage",
            dataIndex: "shrinkage",
        },
    ]

  return (
    <div>
         <Card title={<span>M3 ITEMS</span>} style={{ textAlign: 'center' }} headStyle={{ border: 0 }}
        className="card-header"
        extra={<Button
            onClick={() => navigate('/m3-items')}
            type="primary"
            style={{ background: "white", color: "#3C085C" }}
        >Create</Button>
        }>
          <Table columns={Columns}
          dataSource={itemGroup}
          />
    </Card>
    </div>
  )
}

export default M3ItemsView