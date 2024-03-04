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

  const data2 = [
    { QTYINYDS:1500 ,QTYINYDS1:285,QTYINYDS2:65 ,QTYINYDS3:1590 ,QTYINYDS4:4560 ,QTYINYDS5:7740 ,QTYINYDS6:6235 },
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

      <table  style={{ borderCollapse: 'collapse', borderBlockColor: 'black' }} border={1} cellSpacing="0" cellPadding='0'>
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
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={7}  >118Q</td>
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={7}>BV2737</td>
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={7}>FA24</td>
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={7}>A0598265</td>

              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={7}>CALI# 598265__ PM#598264__ BRAIDED DRAWCORD__ 100.0% POLYESTER (100.0% RECYCLED)__ 100.0% POLYESTER (100.0% RECYCLED) 20/1 COTTON COUNT, RING SPUN, COMBED, YARN DYE__ HOT CUT__ REACTIVE DYED YARN DYED__ FLAT__ NO FILL__ H:0.0000MM__ W:9.0000MM__ EDGE TO EDGE__ MECHANICALLY RECYCLED POLYESTER__
              </td>
             
              <td  style={{ ...tableCellStyle,textAlign: 'center' }}  >BLACK/BLACK/(WHITE)-010</td>
              <td   style={{ ...tableCellStyle,textAlign: 'center' }}>00A BLACK</td>
              <td   style={{ ...tableCellStyle,textAlign: 'center' }}>1500</td>

            </tr>

              <tr>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }} >CHARCOAL HEATHR/ANTHRA/(WHITE)-071 </td>
                <td   style={{ ...tableCellStyle,textAlign: 'center' }}>06F ANTHRA</td>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }}> 285</td>
              </tr>

              <tr>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }} >DK GREY HEATHER/MSLVR/(WHITE)-063</td>
                <td   style={{ ...tableCellStyle,textAlign: 'center' }}>01Q MSLVR </td>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }}> 65</td>
              </tr>
 
             <tr>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }} >FLAX/FLAX/(WHITE)-224</td>
                <td   style={{ ...tableCellStyle,textAlign: 'center' }}>20M FLAX </td>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }}> 1590</td>
              </tr>

              <tr>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }} >KHAKI/KHAKI/(WHITE)-247 </td>
                <td   style={{ ...tableCellStyle,textAlign: 'center' }}>26B KHAKI</td>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }}> 4560</td>
              </tr>

              <tr>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }} >LIFE LIME/LIFE LIME/(WHITE)-751 </td>
                <td   style={{ ...tableCellStyle,textAlign: 'center' }}>75L LFLIME</td>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }}> 7740</td>
              </tr>

              <tr>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }} >PINK FOAM/PINK FOAM/(WHITE)-663 </td>
                <td   style={{ ...tableCellStyle,textAlign: 'center' }}>6JB PNKFOM </td>
                <td  style={{ ...tableCellStyle,textAlign: 'center' }}> 6235</td>
              </tr>
       
        <tfoot>
          <tr>
            <td colSpan={7} style={tableCellStyle}></td>
            <td style={{...tableCellStyle,fontWeight:"bolder"}} >
            {data2.reduce((total, item) => total + (item.QTYINYDS+item.QTYINYDS1+item.QTYINYDS2+item.QTYINYDS3+item.QTYINYDS4+item.QTYINYDS5+item.QTYINYDS6), 0)}</td>
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
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3}  >117Q</td>
              <td style={{...tableCellStyle, textAlign: 'center' }} rowSpan={3}>BV2671</td>
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
