import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { Shahi } from "../SHAHI";
import { HTTP } from "../http";
import React from "react";

export function Button1Print() {
    let totalqty = 41930;
    let value = 50;
    return (
        <Card>
            <h3>BUTTON - A0710085</h3>
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
                    <td style={{ textAlign: 'center' }} rowSpan={3}>220P</td>
                    <td style={{ textAlign: 'center' }} rowSpan={3}>DH0858</td>
                    <td style={{ textAlign: 'center' }} rowSpan={3}>SU24
                    </td>
                    <td style={{ textAlign: 'center' }} rowSpan={3}>A0710085
                    </td>
                    <td style={{ textAlign: 'center' }} rowSpan={3}>NIKE GOLF 18L CORE BRANDED GRIND
                        BUTTONS; BUTTON; FLAT; MOLDED;
                        BASE SM: 0; APPROVED;
                        TRIM-HARDWARE; NIKE GRIND;
                        VENDOR #: 0310679; PRIMARY SM: YES;
                        60% THERMOPLASTIC POLYURETHANE
                        (TPU) (RECYCLED), 40%
                        THERMOPLASTIC POLYURETHANE
                        (TPU); # OF HOLES: 4; # OF COLORS: 1;
                        H (MM): 0.00; W (MM): 11.60; THK (MM):
                        0.00; LIGNE: 18; NIKE TEXT; ROUND;
                        PIGMENT DYED; APPLICATION
                        TECHNIQUE: SEW ON; ART TECHNIQUE:
                        DEBOSS; VISUAL EFFECT: DULL-MATTE,
                        RUBBERIZED
                    </td>
                    <td style={{ textAlign: 'center' }} rowSpan={3}>18 L
                    </td>
                    <td style={{ textAlign: 'center' }}>BLACK/(WHITE)-010</td>
                    <td style={{ textAlign: 'center' }}>00A BLACK</td>
                    <td style={{ textAlign: 'center' }}>20180</td>
                    </tr>
                    <tr>
                    <td style={{ textAlign: 'center' }}>GLACIER BLUE/(BLACK)-476</td>
                    <td style={{ textAlign: 'center' }}>43G G BLUE</td>
                    <td style={{ textAlign: 'center' }}>6500</td>
                    </tr>
                    <tr>
                    <td style={{ textAlign: 'center' }}>WHITE/(BLACK)-100</td>
                    <td style={{ textAlign: 'center' }}>10A WHITE</td>
                    <td style={{ textAlign: 'center' }}>15250</td>
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
    <td style={{ textAlign: 'center',fontWeight:'bolder' }}>41930</td>

</tr>
            </table>
            <br/>
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
                    <td style={{ textAlign: 'center' }} rowSpan={2}>221P</td>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>DH0857</td>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>SU24
                    </td>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>A0710085
                    </td>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>NIKE GOLF 18L CORE BRANDED GRIND
BUTTONS; BUTTON; FLAT; MOLDED;
BASE SM: 0; APPROVED;
TRIM-HARDWARE; NIKE GRIND;
VENDOR #: 0310679; PRIMARY SM: YES;
60% THERMOPLASTIC POLYURETHANE
(TPU) (RECYCLED), 40%
THERMOPLASTIC POLYURETHANE
(TPU); # OF HOLES: 4; # OF COLORS: 1;
H (MM): 0.00; W (MM): 11.60; THK (MM):
0.00; LIGNE: 18; NIKE TEXT; ROUND;
PIGMENT DYED; APPLICATION
TECHNIQUE: SEW ON; ART TECHNIQUE:
DEBOSS; VISUAL EFFECT: DULL-MATTE,
RUBBERIZED
                    </td>
                    <td style={{ textAlign: 'center' }} rowSpan={2}>18 L
                    </td>
                    <td style={{ textAlign: 'center' }}>BLACK/(WHITE)-010</td>
                    <td style={{ textAlign: 'center' }}>00A BLACK</td>
                    <td style={{ textAlign: 'center' }}>2460</td>
                    </tr>
                    <tr>
                    <td style={{ textAlign: 'center' }}>RUST FACTOR/(WHITE)-811</td>
                    <td style={{ textAlign: 'center' }}>83U RUSTFC</td>
                    <td style={{ textAlign: 'center' }}>2240</td>
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
    <td style={{ textAlign: 'center',fontWeight:'bolder' }}>4700</td>

</tr>
            </table>
            <br/>
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
                    <td style={{ textAlign: 'center' }} >221P</td>
                    <td style={{ textAlign: 'center' }} >DH0857</td>
                    <td style={{ textAlign: 'center' }} >SU24
                    </td>
                    <td style={{ textAlign: 'center' }} >A0710085
                    </td>
                    <td style={{ textAlign: 'center' }} >NIKE GOLF 18L CORE BRANDED GRIND
BUTTONS; BUTTON; FLAT; MOLDED;
BASE SM: 0; APPROVED;
TRIM-HARDWARE; NIKE GRIND;
VENDOR #: 0310679; PRIMARY SM: YES;
60% THERMOPLASTIC POLYURETHANE
(TPU) (RECYCLED), 40%
THERMOPLASTIC POLYURETHANE
(TPU); # OF HOLES: 4; # OF COLORS: 1;
H (MM): 0.00; W (MM): 11.60; THK (MM):
0.00; LIGNE: 18; NIKE TEXT; ROUND;
PIGMENT DYED; APPLICATION
TECHNIQUE: SEW ON; ART TECHNIQUE:
DEBOSS; VISUAL EFFECT: DULL-MATTE,
RUBBERIZED
                    </td>
                    <td style={{ textAlign: 'center' }} >18 L
                    </td>
                    <td style={{ textAlign: 'center' }}>BLACK/(WHITE)-010</td>
                    <td style={{ textAlign: 'center' }}>00A BLACK</td>
                    <td style={{ textAlign: 'center' }}>2080</td>
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
    <td style={{ textAlign: 'center',fontWeight:'bolder' }}>2080</td>

</tr>
            </table>
        </Card>

    )


}
export default Button1Print