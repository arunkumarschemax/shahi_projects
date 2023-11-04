import { Injectable } from "@nestjs/common";
import { AllStocksResponseModel, CommonResponseModel, StocksDto } from "@project-management-system/shared-models";
import { StocksRepository } from "./repository/stocks.repository";
import { StocksAdapter } from "./adapters/stocks.adatpters";
import { AppDataSource } from "../app-datasource";


@Injectable()
export class StocksService {

    constructor(
        private stocksRepository: StocksRepository,
        private adapter: StocksAdapter,
    ) { }

    async testStocks() {
        return "Connected";
    }

    async getAllStocks(): Promise<AllStocksResponseModel> {
        // try{
        //     const data = await this.stocksRepository.find();
        //     const stocksData: StocksDto[] = [];
        //     for (const record of data) {
        //         const adapterData = this.adapter.convertEntityToDto(record);
        //         stocksData.push(adapterData);
        //     }
        //     if(stocksData.length > 0){
        //         console.log(stocksData,"::::::::::::::::::::::");                
        //         return new AllStocksResponseModel(true, 1111, "Data retreived succesufully", stocksData);
        //     }
        //     else{
        //         return new AllStocksResponseModel(false, 1011, "No data found");
        //     }
        // }
        try {
            let dataquery = `SELECT 
            st.m3_item_code,
            st.shahi_item_code,
            it.item_type,
            loc.location_name,
            st.quantity,
            f.name
            
            FROM stocks AS st
            LEFT JOIN location AS loc ON loc.location_id = st.location_id
            LEFT JOIN item_type AS it ON it.item_type_id = st.item_type_id
            LEFT JOIN factory AS f ON f.id = st.plant_id`

            const res = await AppDataSource.query(dataquery);
            if (res) {
                console.log(res, "......................");
                return res;
            } else {
                console.log("NO data");
            }
        }

        catch (error) {
            console.log(error)
            return new AllStocksResponseModel(false, 1011, "No data found");
        }

        // console.log(stocksData, '..................................');        
    }

}