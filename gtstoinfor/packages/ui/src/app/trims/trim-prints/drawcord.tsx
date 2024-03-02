import { Button, Card, Table } from 'antd';
import React from 'react';
export interface DrawcordProps {
    bomInfo: any[]
}
export const  Drawcord = (props: DrawcordProps) => {
  const data = [
    { ITEM: '116Q', STYLE: 'DQ5191', SEASON:'SU24',IM: 'A1008825',MATERIALDESCRIPTION:'CALI# 598265__ PM#598264__ BRAIDEDDRAWCORD__ 100.0% POLYESTER(100.0% RECYCLED)__ 100.0%POLYESTER (100.0% RECYCLED) 20/1COTTON COUNT, RING SPUN, COMBED,YARN DYE__ HOT CUT__ REACTIVEDYED YARN DYED__ FLAT__ NO FILL__H:0.0000MM__ W:9.0000MM__ EDGE TOEDGE__ MECHANICALLY RECYCLED POLYESTER',
    GARMENTCOLOURCODE: 'BLACK/(WHITE)-010',GARMENTCOLOURCODE1:'DK GREY HEATHER/(WHITE)-063', TAPECOLOUR: '00A BLACK ',TAPECOLOUR1:'04U BASEGY',QTYINYDS:5860 ,QTYINYDS1:3285},
  ];

  return (
    <Card title={'DrawCord'}
                extra={<><span><Button >Print</Button></span><span>
                
                </span></>}
            >
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={tableCellStyle}>ITEM#</th>
            <th style={tableCellStyle}>STYLE#</th>
            <th style={tableCellStyle}>SEASON</th>
            <th style={tableCellStyle}>IM#</th>
            <th style={tableCellStyle}>MATERIAL DESCRIPTION</th>
            <th style={tableCellStyle}>GARMENT COLOUR + CODE </th>
            <th style={tableCellStyle}>TAPE COLOUR </th>
            <th style={tableCellStyle}>QTY IN YDS</th>
          </tr>
        </thead>
        
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{item.ITEM}</td>
              <td style={tableCellStyle}>{item.STYLE}</td>
              <td style={tableCellStyle}>{item.SEASON}</td>
              <td style={tableCellStyle}>{item.IM}</td>
              <td style={tableCellStyle}>{item.MATERIALDESCRIPTION}</td>

              <tr>
                <td style={tableCellStyle}>{item.GARMENTCOLOURCODE}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>{item.GARMENTCOLOURCODE1}</td>
              </tr>

              <tr>
                <td  style={tableCellStyle}>{item.TAPECOLOUR}</td>
              </tr>
              <tr>
                <td  style={tableCellStyle}>{item.TAPECOLOUR1}</td>
              </tr>

              <tr>
                <td  style={tableCellStyle}>{item.QTYINYDS}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>{item.QTYINYDS1}</td>
              </tr>

            </tr>

          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} style={tableCellStyle}></td>
            <td style={tableCellStyle}>{data.reduce((total, item) => total + (item.QTYINYDS+item.QTYINYDS1), 0)}</td>
          </tr>
        </tfoot>
      </table>
    </Card>
  );
};

const tableCellStyle: React.CSSProperties = {
  border: '1px solid #dddddd',
  textAlign: 'left',
  padding: '8px',
};

 

export default Drawcord;
