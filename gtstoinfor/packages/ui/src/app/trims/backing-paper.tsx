import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { Shahi } from "./SHAHI";
import { HTTP } from "./http";

export function BackingPaper() {
let totalqty = 100;
let value =50;
    return(
        <Card>
{/*             
        <h4 style={{textAlign:'center',fontFamily:'Arial'}}>Shahi Exports Pvt Ltd Mail - Nike-item#719M,720M IM#A0329862 InterLining Requirement-Freudenberg.</h4>
        <div>
        <Row >
        <Col>
        <b><Shahi/></b>
        </Col>
        <Col style={{marginTop:'-8%',marginLeft:'75%',fontSize:'14px'}}>
        <h5> SHOBHAL  &lt;shobha.lakshmanappa@shahi.co.in &#62;</h5>
        </Col>
        </Row>
        </div>
        <hr/>
        <b style={{fontSize:'16px'}}> Nike -Item# 719, 720Mm IM#A0329862 Interlining Requirement -Freudenberg.</b><br></br>
        <b> 1 message</b>
        <hr/>
        <Row>
        <Col >
        <h5 style={{fontSize:'12px'}}> SHOBHA L  &lt;shobha.lakshmanappa@shahi.co.in &#62;</h5>
        <Col style={{marginLeft:'88%',marginTop:'-30px'}}>
        <h5 style={{fontSize:'10px'}}>  Fri,Jan 19, 2024 at 5:48 PM</h5>
        </Col>
        <h5 style={{marginTop:'-20px',fontSize:'11px'}}>To: Chandra Shekar C &lt;chandrashekar.channappa@shahi.co.in &#62;</h5>
        <h5 style={{marginTop:'-20px',fontSize:'11px'}}>Cc: Lavanya N B &lt;lavanya.babu@shahi.co.in &#62;, Girish B N &lt;girish.nagaraja@shahi.co.in&#62;, Saravana Kumar Mahalingam
        &lt;saravana.kumar@shahi.co.in&#62;, Nike Trims &lt;nike.trims@shahi.co.in&#62;, MEGHANA DINESH &lt;meghana.dinesh@shahi.co.in&#62;</h5>
        </Col>
        </Row>

        <h5 style={{ color: 'blue',fontSize:'11px'}}>Dear Chandru Sir, </h5>
        <h5 style={{ color: 'blue',fontSize:'11px'}}> Pls find below Interlining requirement for SP'24- Nike Kid's jogger for june 2nd buy order.</h5>
        <h5 style={{ color: 'blue',fontSize:'11px'}}> Supplier - FREDENBERG & VILENE IN - TW</h5> */}
        <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%'}} border={1} cellSpacing="0" cellPadding='0'>
        <tr>
        <th style={{width:'3%'}}>ITEM#</th>
        <th style={{width:'3%'}}>STYLE#</th>
        <th style={{width:'3%'}}>TRIM#</th>
        <th style={{width:'3%'}}>IM#</th>
        <th style={{width:'5%'}}>Desc</th>
        <th style={{width:'3%'}}>USED AT</th>
        <th style={{width:'3%'}}>GMT CLR</th>
        <th style={{width:'3%'}}>INTERLINING CLR</th>
        <th style={{width:'3%'}}>REQ</th>
       
        </tr>
        <tr>
        <td style={{textAlign:'center'}}>719M</td> 
        <td  style={{textAlign:'center'}}>FN9103</td>
        <td  style={{textAlign:'center'}} rowSpan={2}>INTERLINING
        </td>
        <td style={{textAlign:'center'}} rowSpan={2}>A0329862
        </td>
        <td  style={{textAlign:'center'}} rowSpan={2}>TEXTILES-NONWOVEN; BASE SM:0; APPROVED; INTERNAL COMPONENT; VENDOR #: VILENE AO203; PRIMARY SM:YES; 80% POLYESTER, 20% RAYON; CONTENT FOR LABELING:80% POLYSTER, 20% RAYON; WT (G/M2):
        50.00; L (CM): 0; W (CM): 100.00;
        EDGE
        TO EDGE; THK (MM): 0.00; UNDYED
        </td>
        <td style={{textAlign:'center'}} rowSpan={2}>BUTTONHOLE</td>
        <td style={{textAlign:'center'}} rowSpan={2}>COURT
        BLUE/LTARMB/(LTARMB)-476,CARGO
        KHAKI/PEAR/(PEAR)-325
        </td>
        <td style={{textAlign:'center'}} rowSpan={2}>GCW#1 <br/>
        FVWHT
        </td>
        <td style={{textAlign:'center'}}> {value}</td>
         </tr>


        <tr>
        <td style={{textAlign:'center'}}>720M</td> 
        <td style={{textAlign:'center'}}>FN9110</td>
        <td style={{textAlign:'center'}}>{value}</td>

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


      <td style={{textAlign:'center',marginLeft:'200%'}}> {totalqty}</td>

      </tr>
        

      </table>
      {/* <h5 style={{ color: 'blue',fontSize:'11px'}}>Confrim EDD </h5>
      <h5 style={{ fontSize:'11px',marginTop:'-20px'}}>Thanks & Regards,</h5>
      <h5 style={{ fontSize:'11px',marginTop:'-20px'}}>Shobha L</h5>
      <h5 style={{ fontSize:'11px',marginTop:'-20px'}}>Shahi Exports Pvt Ltd - knits</h5>
      <h5 style={{ fontSize:'11px',marginTop:'-20px'}}>Mob.No- +91 6363629665</h5>
      <h5 style={{ color: 'blue',fontSize:'11px',marginTop:'-20px'}}>| www.shahi.co.in |</h5> */}

      {/* <tr></tr>
      <tr></tr>
      <tr></tr>
      <tr></tr>
      <HTTP/> */}
      </Card>
        
    )


}
export default BackingPaper