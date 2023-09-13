import axios from 'axios';
import { CommonAxiosService } from "../common-axios-service-prs";

export class SourceFabricsTrimsService extends CommonAxiosService{


async getAllFabrics():Promise<any>{
    const dummyData=[
        {
            fabricCode:"Fab001",
            description:"Description",
            color:"Brown",
            consumption:"1kg",
            issuedQty:"4kgs",
        },
        {
            fabricCode:"Fab002",
            description:"Description",
            color:"Black",
            consumption:"1/2kg",
            issuedQty:"2kgs",
        },
        {
            fabricCode:"Fab003",
            description:"Description",
            color:"Pink",
            consumption:"1kg",
            issuedQty:"3kgs",
        },
        {
            fabricCode:"Fab004",
            description:"Description",
            color:"Black",
            consumption:"2ks",
            issuedQty:"5kgs",
        },
    ]
    return dummyData

}



async getAllTrims():Promise<any>{
    const dummyData=[
        {
            trimCode:"T001",
            description:"Description",
            color:"Brown",
            consumption:"1kg",
            issuedQty:"4kgs",
        },
        {
            trimCode:"T002",
            description:"Description",
            color:"Black",
            consumption:"1kg",
            issuedQty:"3kgs",
        },
        {
            trimCode:"T003",
            description:"Description",
            color:"Pink",
            consumption:"1kg",
            issuedQty:"3kgs",
        },
        {
            trimCode:"T004",
            description:"Description",
            color:"Black",
            consumption:"2kgs",
            issuedQty:"5kgs",
        },
    ]
    return dummyData

}
}
