import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { Shahi } from "../SHAHI";
import { HTTP } from "../http";
import React from "react";

export function Button2Print() {
  
    return (
        <Card>
            <h3>BUTTON - A0715961</h3>
          
            <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
                <tr>
                    <th style={{ width: '3%' }}>ITEM#</th>
                    <th style={{ width: '3%' }}>STYLE#</th>
                    <th style={{ width: '3%' }}>SEASON</th>
                    <th style={{ width: '3%' }}>IM#</th>
                    <th style={{ width: '5%' }}>MATERIAL DESCRIPTION</th>
                    <th style={{ width: '3%' }}>BUTTON SIZE</th>
                    <th style={{ width: '3%' }}>GARMENT COLOR CODE</th>
                    <th style={{ width: '3%' }}>BUTTON COLOR</th>
                    <th style={{ width: '3%' }}>QTY IN PCS</th>

                </tr>
                <tr>
                    <td style={{ textAlign: 'center' }} >768P</td>
                    <td style={{ textAlign: 'center' }} >DZ5366</td>
                    <td style={{ textAlign: 'center' }} >SU24
                    </td>
                    <td style={{ textAlign: 'center' }} >A0715961
                    </td>
                    <td style={{ textAlign: 'center' }} >NIKE GOLF 18L VAPOR MATTE RUBBER
TOUCH BUTTONS; BUTTON; FLAT;
SHEET; BASE SM: 0; APPROVED;
TRIM-HARDWARE; VENDOR #: 715961;
CARE: TUMBLE DRY LOW; PRIMARY SM:
YES; 75% POLYESTER, 25%
POLYETHYLENE TEREPHTHALATE (PET)
(MECHANICALLY RECYCLED); # OF
HOLES: 4; # OF COLORS: 1; H (MM): 2.00;
W (MM): 11.00; THK (MM): 0.00; LIGNE:
18; NIKE TEXT; CIRCLE; PIGMENT DYED;
APPLICATION TECHNIQUE: SEW ON;
FINISH: COATING: OTHER; VISUAL
EFFECT: DULL-MATTE, RUBBERIZED;
COLOR EFFECT: 1ST COLOR; BUTTON
COLOR
                    </td>
                    <td style={{ textAlign: 'center' }} >18 L
                    </td>
                    <td style={{ textAlign: 'center' }}>LT LEMON TWIST/(BLACK)-736</td>
                    <td style={{ textAlign: 'center' }}>00A BLACK</td>
                    <td style={{ textAlign: 'center' }}>100</td>
                    </tr>
                  
                    
<tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td style={{ textAlign: 'center',fontWeight:'bolder' }}>100</td>

</tr>
            </table>
        </Card>

    )


}
export default Button2Print