import { Injectable } from "@nestjs/common";
import { AllStocksResponseModel, CommonResponseModel, StockFilterRequest, StocksDto } from "@project-management-system/shared-models";
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
            m3_st.m3_style_code,
            it_ty.item_type,
            it.item_name,
            it.item_code,
            SUM(st.quantity) AS total_quantity,
            rac_pos.rack_position_name,
            rac_pos.status,
            s.style,
            s.description
        FROM 
            stocks AS st
        LEFT JOIN 
            m3_style AS m3_st ON m3_st.m3_style_Id = st.m3_style_id
        LEFT JOIN 
            item_type AS it_ty ON it_ty.item_type_id = st.item_type_id
        LEFT JOIN 
            items AS it ON it.item_id = st.item_id
        LEFT JOIN 
            rack_position AS rac_pos ON rac_pos.position_Id = st.location_id
        LEFT JOIN 
            style AS s ON s.style_id = st.style_id
        GROUP BY 
            m3_st.m3_style_code,
            it_ty.item_type,
            it.item_name,
            it.item_code,
            rac_pos.rack_position_name,
            rac_pos.status,
            s.style,
            s.description;
        `

            const res = await AppDataSource.query(dataquery);
            if (res) {
                return res;
            } else {
                console.log("NO data");
            }
        }

        catch (error) {
            console.log(error)
            return new AllStocksResponseModel(false, 1011, "No data found");
        }

    }

    async getStockReport(): Promise<CommonResponseModel> {
        const records = await this.stocksRepository.find();
        if (records.length)
            return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
        else
            return new CommonResponseModel(false, 0, 'No data found')
    }


    async getAllItemCode(): Promise<CommonResponseModel> {
        const details = await this.stocksRepository.getAllItemCode();
        if (details.length > 0) {
            return new CommonResponseModel(true, 1, 'data retrieved', details)
        } else {
            return new CommonResponseModel(false, 0, 'data not found')
        }
    }

    async getAllItemType(): Promise<CommonResponseModel> {
        const details = await this.stocksRepository.getAllItemType();
        if (details.length > 0) {
            return new CommonResponseModel(true, 1, 'data retrieved', details)
        } else {
            return new CommonResponseModel(false, 0, 'data not found')
        }
    }

    async getAllLocation(): Promise<CommonResponseModel> {
        const details = await this.stocksRepository.getAllLocation();
        if (details.length > 0) {
            return new CommonResponseModel(true, 1, "data retreivedd", details)
        } else {
            return new CommonResponseModel(false, 0, 'data not found')
        }
    }

    async getAllPlant(): Promise<CommonResponseModel> {
        const details = await this.stocksRepository.getAllPlant();
        if (details.length > 0) {
            return new CommonResponseModel(true, 1, "data retreivedd", details)
        } else {
            return new CommonResponseModel(false, 0, 'data not found')
        }
    }



    async getAllStockReportData(request?: StockFilterRequest): Promise<CommonResponseModel> {
        try {
            const details = await this.stocksRepository.getAllStockReportData(request)
            if (details.length > 0) {
                return new CommonResponseModel(true, 0, 'All stocks Requests retrieved successfully', details)
            } else {
                return new CommonResponseModel(false, 1, 'No data found', [])
            }
        } catch (err) {
            throw err
        }
    }



}