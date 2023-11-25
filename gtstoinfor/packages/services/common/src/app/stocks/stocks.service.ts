import { Injectable } from "@nestjs/common";
import { AllStocksResponseModel, CommonResponseModel, M3ItemsDTO, StockFilterRequest, StocksDto } from "@project-management-system/shared-models";
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

    async getAllStocks(req?: M3ItemsDTO): Promise<AllStocksResponseModel> {
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
            console.log(req);
            let query = "SELECT if(s.item_type != 'fabric' , itt.trim_code, concat(it.item_code,'-',it.description)) AS m3Item, s.item_type AS itemType, quantity AS qty, u.uom AS uom, b.buyer_name AS buyer,r.rack_position_name AS location, s.uom_id AS uomId, s.grn_item_id AS grnItemId  from stocks s left join buyers b on b.buyer_id = s.buyer_id left join m3_items it on it.m3_items_Id = s.m3_item and s.item_type = 'Fabric' left join m3_trims itt on itt.m3_trim_id = s.m3_item and s.item_type != 'fabric' left join rack_position r on r.position_Id = s.location_id left join uom u on u.id = s.uom_id where s.id > 0";
            if(req.buyerId != undefined){
                query = query + " and b.buyer_id = "+req.buyerId;
            }
            if(req.construction != undefined){
                query = query + " and it.construction = "+req.construction;
            }if(req.content != undefined){
                query = query + " and it.content = '"+req.content+"'";
            }if(req.fabricType != undefined){
                query = query + " and it.fabric_type = "+req.fabricType;
            }if(req.finish != undefined){
                query = query + " and it.finish = '"+req.finish+"'";
            }
            if(req.shrinkage != undefined){
                query = query + " and it.shrinkage = '"+req.shrinkage+"'";
            }
            if(req.weave != undefined){
                query = query + " and it.weave = "+req.weave;
            }
            if(req.weight != undefined){
                query = query + " and it.weight = '"+req.weight+"'";
            }
            if(req.width != undefined){
                query = query + " and it.width = '"+req.width+"'";
            }
            if(req.yarnCount != undefined){
                query = query + " and it.yarn_count = '"+req.yarnCount+"'";
            }

            if(req.yarnUnit != undefined){
                query = query + " and it.yarn_unit = "+req.yarnUnit;
            }
            if(req.widthUnit != undefined){
                query = query + " and it.width_unit = "+req.widthUnit;
            }
            if(req.weightUnit != undefined){
                query = query + " and it.weight_unit = "+req.weightUnit;
            }
            query = query + " order by b.buyer_name ASC ";

            const res = await AppDataSource.query(query);
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