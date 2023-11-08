import { FileExcelFilled } from '@ant-design/icons';
import { MaterialIssueService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, Select, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './marerial.css';

const MaterialIssueReport = () => {
  const service = new MaterialIssueService();
  const [data, setData] = useState<any[]>([]);
  const page = 1;

  useEffect(() => {
    getAllMaterial();
  }, []);

  const getAllMaterial = () => {
    service.getAllMaterialIssues().then((res) => {
      if (res.status) {
        setData(res.data);
      }
    });
  };

  const colWidth = {
    materialtype: 120,
    fabricCode: 100,
    description: 100,
    color: 50,
    consumption: 80,
    issuedQuantity: 80,
    remarks: 80,

  }
  // const chcol = (noofth) => {
  //   const mat = []
  //   for (let i = 0; i < noofth; i++) {

  //   }
  // }
  // function transformData(miItems) {
  //   // Create an array to hold the transformed data
  //   const transformedData = miItems.map(item => ({
  //     MaterialType: item.fabricCode,
  //     Code: item.materialcode,
  //     Description: item.description,
  //     Colour: item.colorId,
  //     Consumption: item.consumption,
  //     IssuedQuantity: item.issuedQuantity,
  //     OperationStatus: item.remarks,

  //   }));

  //   return transformedData;
  // }

  // const CustomTitle = () => {

  //   return (

  //     // <table style={{borderRadius:0,boxSizing:'border-box', width:'max-content',minWidth:'100%',tableLayout:'auto'}}>
  //     <table className='custom-tbl'>
  //       <thead className='ant-table-thead'>
  //         <tr >
  //           <td style={{ width: `${colWidth}px` }}></td>

  //           <td style={{ width: `${colWidth.materialId}px` }}>Material Type</td>
  //           <td style={{ width: `${colWidth.fabricCode}px` }} >Code</td>
  //           <td style={{ width: `${colWidth.description}px` }} >Description</td>
  //           <td style={{ width: `${colWidth.colorId}px` }} >Colour</td>
  //           <td style={{ width: `${colWidth.consumption}px` }} >Consumption</td>
  //           <td style={{ width: `${colWidth.issuedQuantity}px` }} >Issued Quantity</td>
  //           <td style={{ width: `${colWidth.remarks}px` }} >Operation Status</td>
  //         </tr>

  //       </thead>
  //       <tr>
  //       </tr>
  //     </table>
  //   );
  // };

  // const columns1: any = [
  //   {
  //     dataIndex: "materialId",
  //     width: colWidth.materialId,
  //     render: (text, record) => {
  //       return record.materialId ? record.materialId : '-'

  //     },

  //   },
  //   {
  //     // title: " Code",
  //     dataIndex: "fabricCode",

  //     width: colWidth.fabricCode,
  //     render: (text, record) => {
  //       return record.fabricCode ? record.fabricCode : '-'

  //     },

  //   },

  //   {
  //     // title: "Description",
  //     dataIndex: "description",
  //     width: colWidth.description,
  //     render: (text, record) => {
  //       return record.description ? record.description : '-'

  //     },
  //   },

  //   {
  //     // title: "Color",
  //     dataIndex: "colorId",
  //     width: colWidth.colorId,
  //     render: (text, record) => {
  //       return record.colorId ? record.colorId : '-'

  //     },
  //   },
  //   {
  //     // title: "Consumption",
  //     dataIndex: "consumption",
  //     width: colWidth.consumption,
  //     render: (text, record) => {
  //       return record.consumption ? record.consumption : '-'

  //     },
  //   },
  //   {
  //     // title: "Issued Quantity",
  //     dataIndex: "issuedQuantity",
  //     width: colWidth.issuedQuantity,
  //     render: (text, record) => {
  //       return record.issuedQuantity ? record.issuedQuantity : '-'

  //     },
  //   },
  //   {
  //     // title: "Operation Status",
  //     dataIndex: "remarks",
  //     width: colWidth.remarks,
  //     render: (text, record) => {
  //       return record.remarks

  //     },
  //   },
  // ];

  const columns: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "Request No",
      dataIndex: "request_no",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "M3 Style No",
      dataIndex: "m3_style_no",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "Consumption Code",
      dataIndex: "consumption_code",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      width: '150px',
      fixed: 'left',
    },
    {
      title: "Sample Type",
      dataIndex: "sampleType",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "PCH",
      dataIndex: "pch",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "Sample Indent Date",
      dataIndex: "issue_date",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      render: (text, record) => {
        return record.issue_date
          ? moment(record.issue_date).format('YYYY-MM-DD')
          : "";
      },
    },
    {
      title: "Location",
      dataIndex: "locationname",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: "Style",
      dataIndex: "styleNo",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: " Buyer",
      dataIndex: "buyername",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: "Issued Date",
      dataIndex: "issue_date",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      render: (text, record) => {
        return record.issue_date
          ? moment(record.issue_date).format('YYYY-MM-DD')
          : "";
      },
    },
    {
      title: " Material Type",
      dataIndex: "materialtype",
      width: colWidth.materialtype,
      render: (text, record) => {
        return record.materialtype ? record.materialtype : '-'

      },

    },
    {
      title: " Code",
      dataIndex: "fabricCode",

      width: colWidth.fabricCode,
      render: (text, record) => {
        return record.fabricCode ? record.fabricCode : '-'

      },

    },

    {
      title: "Description",
      dataIndex: "description",
      width: colWidth.description,
      render: (text, record) => {
        return record.description ? record.description : '-'

      },
    },

    {
      title: "Color",
      dataIndex: "color",
      width: colWidth.color,
      render: (text, record) => {
        return record.color ? record.color : '-'

      },
    },
    {
      title: "Consumption",
      dataIndex: "consumption",
      width: colWidth.consumption,
      render: (text, record) => {
        return record.consumption ? record.consumption : '-'

      },
    },
    {
      title: "Issued Quantity",
      dataIndex: "issuedQuantity",
      width: colWidth.issuedQuantity,
      render: (text, record) => {
        return record.issuedQuantity ? record.issuedQuantity : '-'

      },
    },
    {
      title: "Operation Status",
      dataIndex: "remarks",
      width: colWidth.remarks,
      render: (text, record) => {
        return record.remarks

      },
    },

  ];
  const allMaterialsData = (data:any) => {
    const totalData:any[] = [];
    data.forEach((main: any, mainIndex: number) => {
      main.mi_items.forEach((child: any, childIndex: number) => {
        let gridObj: any = {};
        gridObj.request_no = main.request_no;
        gridObj.consumption_code = main.consumption_code;
        gridObj.styleNo = main.styleNo;
        gridObj.sampleType = main.sampleType;
        gridObj.pch = main.pch;
        gridObj.issue_date = main.issue_date;
        gridObj.locationname = main.locationname;
        gridObj.buyername = main.buyername;
        gridObj.m3_style_no = main.m3_style_no;
        gridObj.mi_items = main.mi_items;
        gridObj.rowSpan = 0;
        if (childIndex === 0) {
          gridObj.rowSpan = main.mi_items.length
        }
        gridObj.material_trim_id = child.material_trim_id
        gridObj.fabricCode = child.fabricCode
        gridObj.materialtype=child.materialtype
        gridObj.description = child.description
        gridObj.color = child.color
        gridObj.consumption = child.consumption
        gridObj.issuedQuantity = child.issuedQuantity;
        totalData.push(gridObj)
      })
    });
    return totalData
  };

  console.log(allMaterialsData(data),":::::::::::::::::::::::::::::::::")

  return (
    <div>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <Table
            rowKey={(rec) => rec.request_no}
            size="small"
            columns={columns}
            dataSource={allMaterialsData(data)}
            pagination={{
              total: data.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }} scroll={{ x: 'max-content' }}
            bordered
          />
        </div>
      </Card>
    </div>
  );
};

export default MaterialIssueReport;
