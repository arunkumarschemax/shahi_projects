import { Button, Card, Table } from 'antd';
import React from 'react';
export interface InterlinigProps {
    bomInfo: any[]
}
export const  Interlining = (props: InterlinigProps) => {
  const data = [
    { ITEM: '349M', STYLE: 'BV2671', IM: 'A1008825', COLOUR: '10A WHITE', QTY: 230 },
    { ITEM: '350M', STYLE: 'BV2672', IM: 'A1008825', COLOUR: '10A WHITE', QTY: 100 },
    { ITEM: '344M', STYLE: 'BV2737', IM: 'A1008825', COLOUR: '10A WHITE', QTY: 270 }
  ];

  return (
    <Card title={'InterLining'}
                extra={<><span><Button >Print</Button></span><span>
                
                </span></>}
            >
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={tableCellStyle}>ITEM</th>
            <th style={tableCellStyle}>STYLE</th>
            <th style={tableCellStyle}>IM</th>
            <th style={tableCellStyle}>I/L COLOUR</th>
            <th style={tableCellStyle}>QTY REQ IN MTRS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{item.ITEM}</td>
              <td style={tableCellStyle}>{item.STYLE}</td>
              <td style={tableCellStyle}>{item.IM}</td>
              <td style={tableCellStyle}>{item.COLOUR}</td>
              <td style={tableCellStyle}>{item.QTY}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} style={tableCellStyle}></td>
            <td style={tableCellStyle}>{data.reduce((total, item) => total + item.QTY, 0)} mtr</td>
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

 

export default Interlining;
