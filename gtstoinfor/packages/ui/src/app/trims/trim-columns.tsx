import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useLocation } from "react-router-dom";

import React from "react";

export function TrimColumns() {

    return (
        <Card>
            <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
                    <tr>
                        <th style={{ width: ' 10%' }}>ITEM#</th>
                        <th style={{ width: '10%' }}>STYLE#</th>
                        <th style={{ width: '10%' }}>TRIM#</th>
                        <th style={{ width: '10%' }}>IM#</th>
                        <th style={{ width: '10%' }}>Desc</th>
                        <th style={{ width: '10%' }}>USED AT</th>
                        <th style={{ width: '10%' }}>GMT CLR</th>
                        <th style={{ width: '10%' }}>INTERLINING CLR</th>
                        <th style={{ width: '10%' }}>REQ</th>
                        <th style={{ width: '10%' }}>Season#</th>
                        <th style={{ width: '10%' }}>Material Description</th>
                        <th style={{ width: '10%' }}>Garment Colour-Code</th>
                        <th style={{ width: '10%' }}>Valentine's Patch Label Color</th>
                        <th style={{ width: '10%' }}>Quantity in Pcs</th>
                        <th style={{ width: '10%' }}>Garment Colour + code</th>
                        <th style={{ width: '10%' }}>Tape Colour</th>
                        <th style={{ width: '10%' }}>QTY in YardS</th>
                        <th style={{ width: '10%' }}>Balaji Super Spandex Ref#</th>
                        <th style={{ width: '10%' }}>Consumtion</th>
                        <th style={{ width: '10%' }}>Garment Colors</th>
                        <th style={{ width: '10%' }}>Elastic Color</th>
                        <th style={{ width: '10%' }}>Req In Mtrs</th>
                        <th style={{ width: '10%' }}>Trim Description</th>
                        <th style={{ width: '10%' }}>Snap size</th>
                        <th style={{ width: '10%' }}>Snap Color</th>
                        <th style={{ width: '10%' }}>Req in Gross(with set)</th>
                        <th style={{ width: '10%' }}>Supplier</th>
                        <th style={{ width: '10%' }}>Golf# 3HT Label</th>
                        <th style={{ width: '10%' }}>Swoosh Color</th>
                        <th style={{ width: '10%' }}>QTY in Pcs</th>

                    </tr>
                </table>
            </div>


        </Card>

    )


}
export default TrimColumns