import { CommonAxiosService } from "../../common-axios-service-prs";


export class BuyersService extends CommonAxiosService {
    private url = "https://crm-backend.shahiapps.in/api";



    async getAllBuyersInfo(): Promise<any> {
        // console.log('*****************************');
        return this.getvendorpostcall("https://crm-backend.shahiapps.in/api/buyers/getAllBuyersInfo");
    }



}