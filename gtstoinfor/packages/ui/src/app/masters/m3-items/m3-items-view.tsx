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
            title: "Buyer",
            dataIndex: "buyer",
        },
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
            title: "Width",
            dataIndex: "width",
            render: (text,record) => {
                return(
                    <>
                    {record.width ? `${record.width} ${record.widthUnit}` : '-'}
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
            dataIndex: "yarn_count",
            render: (text,record) => {
                return(
                    <>
                    {record.yarn_count ? `${record.yarn_count} ${record.yarnUnit}` : '-'}
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
        {
            title: "Description",
            dataIndex: "description",
        },
    ]

  return (
    <div>
         <Card title={<span>M3 ITEMS</span>} style={{ textAlign: 'center' }} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
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