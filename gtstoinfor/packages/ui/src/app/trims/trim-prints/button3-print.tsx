import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { Shahi } from "../SHAHI";
import { HTTP } from "../http";
import React from "react";

export function Button3Print() {

    return (
        <Card>
            <h3>BUTTON - A0726468</h3>

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
                    <td style={{ textAlign: 'center' }} rowSpan={4}>773P</td>
                    <td style={{ textAlign: 'center' }} rowSpan={4}>CJ4456</td>
                    <td style={{ textAlign: 'center' }} rowSpan={4}>FA24
                    </td>
                    <td style={{ textAlign: 'center' }} rowSpan={13}>A0726468
                    </td>
                    <td style={{ textAlign: 'center' }} rowSpan={13}>FA21-MNSW-SWOOSH PACK-RECYCLED
                        POLO BUTTON; BUTTON; FLAT; SHEET;
                        BASE SM: 0; APPROVED;
                        TRIM-HARDWARE; VENDOR #: 5446;
                        PRIMARY SM: YES; 75% POLYESTER,
                        25% POLYETHYLENE TEREPHTHALATE
                        (PET) (MECHANICALLY RECYCLED); #
                        OF HOLES: 4; # OF COLORS: 1; H (MM):
                        0.00; W (MM): 11.00; THK (MM): 3.00;
                        LIGNE: 18; CIRCLE; PIGMENT DYED;
                        APPLICATION TECHNIQUE: SEW ON;
                        VISUAL EFFECT: DULL-MATTE
                    </td>
                    <td style={{ textAlign: 'center' }} rowSpan={13}>18 L
                    </td>
                    <td style={{ textAlign: 'center' }}>BLACK/(WHITE)-010</td>
                    <td style={{ textAlign: 'center' }}>00A BLACK</td>
                    <td style={{ textAlign: 'center' }}>161</td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center' }}>MIDNIGHT NAVY/(WHITE)-410</td>
                    <td style={{ textAlign: 'center' }}>44B MNNAVY </td>
                    <td style={{ textAlign: 'center' }}>100</td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center' }}>MINERAL/(WHITE)-309</td>
                    <td style={{ textAlign: 'center' }}>3DB MINERL</td>
                    <td style={{ textAlign: 'center' }}>100</td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center' }}>WHITE/(BLACK)-100</td>
                    <td style={{ textAlign: 'center' }}>10A WHITE</td>
                    <td style={{ textAlign: 'center' }}>132</td>
                </tr>
                <tr>
                    <td colSpan={3}><br/></td>
                    <td colSpan={3}><br/></td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>584P</td>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>FN3895</td>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>SU24
                    </td>
                    <td style={{ textAlign: 'center' }}>BLACK/(WHITE)-010</td>
                    <td style={{ textAlign: 'center' }}>00A BLACK</td>
                    <td style={{ textAlign: 'center' }}>284</td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center' }}>WHITE/(BLACK)-100</td>
                    <td style={{ textAlign: 'center' }}>10A WHITE </td>
                    <td style={{ textAlign: 'center' }}>88</td>
                </tr>
                <tr>
                    <td colSpan={3}><br/></td>
                    <td colSpan={3}><br/></td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>587P</td>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>FN3894</td>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>FA24
                    </td>
                    <td style={{ textAlign: 'center' }}>BLACK/(WHITE)-010</td>
                    <td style={{ textAlign: 'center' }}>00A BLACK</td>
                    <td style={{ textAlign: 'center' }}>17</td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center' }}>WHITE/(BLACK)-100</td>
                    <td style={{ textAlign: 'center' }}>10A WHITE </td>
                    <td style={{ textAlign: 'center' }}>19</td>
                </tr>
                <tr>
                    <td colSpan={3}><br/></td>
                    <td colSpan={3}><br/></td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>769P</td>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>FN3894</td>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>SU24
                    </td>
                    <td style={{ textAlign: 'center' }}>BLACK/(WHITE)-010</td>
                    <td style={{ textAlign: 'center' }}>00A BLACK</td>
                    <td style={{ textAlign: 'center' }}>45</td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center' }}>WHITE/(BLACK)-100</td>
                    <td style={{ textAlign: 'center' }}>10A WHITE </td>
                    <td style={{ textAlign: 'center' }}>50</td>
                </tr>
               
            </table>
        </Card>

    )


}
export default Button3Print