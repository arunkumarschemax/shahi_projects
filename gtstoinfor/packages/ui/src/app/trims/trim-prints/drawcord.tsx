import { Button, Card, Table } from 'antd';
import React from 'react';
export interface DrawcordProps {
    bomInfo: any[]
}
export const  Drawcord = (props: DrawcordProps) => {
  const data = [
    { QTYINYDS:5860 ,QTYINYDS1:3285},
  ];

  const data1 = [
    { QTYINYDS:2865 ,QTYINYDS1:3320},
  ];
  const tableCellStyle: React.CSSProperties = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  };
  return (
    <Card title={'DrawCord'}
                extra={<Button >Print</Button>}>
      <table  style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
          <tr>
            <th style={tableCellStyle}>ITEM</th>
            <th style={tableCellStyle}>STYLE</th>
            <th style={tableCellStyle}>SEASON</th>
            <th style={tableCellStyle}>IM#</th>
            <th style={tableCellStyle}>MATERIAL DESCRIPTION</th>
            <th style={tableCellStyle}>GARMENT COLOUR + CODE </th>
            <th style={tableCellStyle}>TAPE COLOUR </th>
            <th style={tableCellStyle}>QTY IN YDS</th>
          </tr>
        
            <tr >
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3}  >116Q</td>
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3}>DQ5191</td>
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3}>SU24</td>
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3}>A1008825</td>

              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3}>CALI# 598265__ PM#598264__ BRAIDEDDRAWCORD__ 100.0% POLYESTER(100.0% RECYCLED)__ 100.0%POLYESTER (100.0% RECYCLED) 20/1COTTON COUNT, RING SPUN, COMBED,YARN DYE__ HOT CUT__ REACTIVEDYED YARN DYED__ FLAT__ NO FILL__H:0.0000MM__ W:9.0000MM__ EDGE TOEDGE__ MECHANICALLY RECYCLED POLYESTER
              </td>
              </tr>
              <tr>
              
              <td  style={{ ...tableCellStyle,textAlign: 'center' }}  >BLACK/(WHITE)-010</td>
              <td   style={{ ...tableCellStyle,textAlign: 'center' }}>04U BASEGY</td>
              <td   style={{ ...tableCellStyle,textAlign: 'center' }}>5860</td>
              </tr>

              <tr>
              <td  style={{ ...tableCellStyle,textAlign: 'center' }} >DK GREY HEATHER/(WHITE)-063</td>
                <td   style={{ ...tableCellStyle,textAlign: 'center' }}>00A BLACK</td>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }}>3285</td>

            </tr>

       
        <tfoot>
          <tr>
            <td colSpan={7} style={tableCellStyle}></td>
            <td style={{...tableCellStyle,fontWeight:"bolder"}} >{data.reduce((total, item) => total + (item.QTYINYDS+item.QTYINYDS1), 0)}</td>
          </tr>
        </tfoot>
      </table>

      <br/>

      <table  style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
          <tr>
            <th style={tableCellStyle}>ITEM</th>
            <th style={tableCellStyle}>STYLE</th>
            <th style={tableCellStyle}>SEASON</th>
            <th style={tableCellStyle}>IM#</th>
            <th style={tableCellStyle}>MATERIAL DESCRIPTION</th>
            <th style={tableCellStyle}>GARMENT COLOUR + CODE </th>
            <th style={tableCellStyle}>TAPE COLOUR </th>
            <th style={tableCellStyle}>QTY IN YDS</th>
          </tr>
        
            <tr >
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3}  >118Q</td>
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3}>BV2737</td>
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3}>FA24</td>
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3}>A0598265</td>

              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3}>CALI# 598265__ PM#598264__ BRAIDED DRAWCORD__ 100.0% POLYESTER (100.0% RECYCLED)__ 100.0% POLYESTER (100.0% RECYCLED) 20/1 COTTON COUNT, RING SPUN, COMBED, YARN DYE__ HOT CUT__ REACTIVE DYED YARN DYED__ FLAT__ NO FILL__ H:0.0000MM__ W:9.0000MM__ EDGE TO EDGE__ MECHANICALLY RECYCLED POLYESTER__
              </td>
              </tr>
              <tr>
              
              <td  style={{ ...tableCellStyle,textAlign: 'center' }}  >BLACK/BLACK/(WHITE)-010</td>
              <td   style={{ ...tableCellStyle,textAlign: 'center' }}>00A BLACK</td>
              <td   style={{ ...tableCellStyle,textAlign: 'center' }}>2865</td>
              </tr>

              <tr>
              <td  style={{ ...tableCellStyle,textAlign: 'center' }} >DK GREY HEATHER/MSLVR/(WHITE)-063 </td>
                <td   style={{ ...tableCellStyle,textAlign: 'center' }}>01Q MSLVR </td>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }}> 3320</td>

            </tr>

       
        <tfoot>
          <tr>
            <td colSpan={7} style={tableCellStyle}></td>
            <td style={{...tableCellStyle,fontWeight:"bolder"}} >{data1.reduce((total, item) => total + (item.QTYINYDS+item.QTYINYDS1), 0)}</td>
          </tr>
        </tfoot>
      </table>
    </Card>
  );
};



 

export default Drawcord;
