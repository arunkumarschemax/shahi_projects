import { Injectable } from "@nestjs/common";
import { AllStocksResponseModel, CommonResponseModel, StocksDto } from "@project-management-system/shared-models";
import { StocksRepository } from "./repository/stocks.repository";
import { StocksAdapter } from "./adapters/stocks.adatpters";


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
        try{
            const data = await this.stocksRepository.find();
            const stocksData: StocksDto[] = [];
            for (const record of data) {
                const adapterData = this.adapter.convertEntityToDto(record);
                stocksData.push(adapterData);
            }
            if(stocksData.length > 0){
                console.log(stocksData,"::::::::::::::::::::::");                
                return new AllStocksResponseModel(true, 1111, "Data retreived succesufully", stocksData);
            }
            else{
                return new AllStocksResponseModel(false, 1011, "No data found");
            }
        }
        catch(error){
            console.log(error)
            return new AllStocksResponseModel(false, 1011, "No data found");
        }
        
        // console.log(stocksData, '..................................');        
    }

}