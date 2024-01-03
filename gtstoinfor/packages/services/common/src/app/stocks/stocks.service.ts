import { Injectable } from "@nestjs/common";
import { AllStocksResponseModel, BinPalletModel, CommonResponseModel, CurrentPalletLocationEnum, CurrentPalletStateEnum, M3ItemsDTO, M3trimsDTO, RackBinPalletsModel, RackBinPalletsResponse, RollBasicInfoModel, StockFilterRequest, StocksDto, WarehousePalletRollsModel, statusReq } from "@project-management-system/shared-models";
import { StocksRepository } from "./repository/stocks.repository";
import { StocksAdapter } from "./adapters/stocks.adatpters";
import { AppDataSource } from "../app-datasource";
import { RackPositionIdRequest } from "./dto/rack-position-id.request";
import { DataSource, Raw } from "typeorm";
import { RacksRepo } from "../racks/rack.repository";
import { format } from "url";
import { RollInfoModel } from "packages/libs/shared-models/src/common/stocks/roll-info.model";


@Injectable()
export class StocksService {

    constructor(
        private stocksRepository: StocksRepository,
        private readonly dataSource: DataSource,
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
            let query = "SELECT b.external_ref_number AS refNo,s.location_id AS locationId,s.m3_item AS m3itemId, if(s.item_type != 'fabric' , itt.trim_code, concat(it.item_code,'-',it.description)) AS m3Item, s.item_type AS itemType, (quantity-s.allocatd_quantity-transfered_quantity) AS qty, u.uom AS uom, b.buyer_name AS buyer,r.rack_position_name AS location, s.uom_id AS uomId, s.grn_item_id AS grnItemId,  s.id AS stockId,s.buyer_id,g.grn_number grnNumber  from stocks s left join buyers b on b.buyer_id = s.buyer_id left join m3_items it on it.m3_items_Id = s.m3_item and s.item_type = 'Fabric' left join m3_trims itt on itt.m3_trim_id = s.m3_item left join rack_position r on r.position_Id = s.location_id left join uom u on u.id = s.uom_id left join grn_items gi on gi.grn_item_id = s.grn_item_id left join grn g on g.grn_id = gi.grn_id where s.id > 0 and g.grn_type = 'INDENT' and s.item_type = 'fabric' and (quantity-s.allocatd_quantity-transfered_quantity) > 0 ";
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
            // if (req.extRefNumber != undefined) {
            //     query = query + " and b.external_ref_number = " + `"${req.extRefNumber}"`;
            // }
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
        const data = `select b.buyer_name AS buyerName,IF(stocks.item_type='fabric',it.description,tr.trim_code) AS m3ItemCode,it.item_type AS itemType,
        r.rack_position_name AS location,stocks.quantity FROM stocks stocks
        LEFT JOIN buyers b ON b.buyer_id = stocks.buyer_id
        LEFT JOIN m3_items it ON it.buyer_id = stocks.buyer_id AND stocks.item_type='fabric'
        LEFT JOIN m3_trims tr ON tr.m3_trim_Id=stocks.m3_item AND stocks.item_type!='fabric'
        LEFT JOIN rack_position r ON r.position_Id=stocks.location_id`
        const records = await this.stocksRepository.query(data)
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



    async getAllStockReportData(req?: StockFilterRequest): Promise<CommonResponseModel> {
        console.log(req,'pppppppppp');
        
        try {
            let data = `SELECT m3_item ,b.buyer_name AS buyerName,IF(stocks.item_type='fabric',it.description,tr.trim_code) AS m3ItemCode,
            stocks.uom_id,stocks.item_type,stocks.location_id,stocks.quantity AS available_qty,stocks.style_id,u.uom,
            stocks.grn_item_id,stocks.stock_bar_code,stocks.allocatd_quantity,stocks.issued_quantity,stocks.transfered_quantity,
            stocks.stock_type,stocks.grn_type,r.rack_position_name AS location,g.grn_date
            FROM stocks stocks
            LEFT JOIN m3_trims tr ON tr.m3_trim_Id=stocks.m3_item AND stocks.item_type!='fabric'
            LEFT JOIN m3_items it ON it.buyer_id = stocks.buyer_id AND stocks.item_type='fabric'
            LEFT JOIN buyers b ON b.buyer_id = stocks.buyer_id
            LEFT JOIN grn g ON g.grn_type=stocks.grn_type
            LEFT JOIN  uom u  ON u.id =stocks.uom_id
            LEFT JOIN rack_position r ON r.position_Id=stocks.location_id WHERE 1=1
            GROUP BY  grn_item_id`
            if(req?.extRefNo){
                data = data+` and b.external_ref_number = '${req.extRefNo}'`
            }
            if (req?.itemType) {
                data= data+` and stocks.item_type LIKE '%${req.itemType}%'`
            }
            if (req?.location !== undefined) {
                data +=` and location_id ='${req.location}'`
            }
            const details = await this.stocksRepository.query(data)

            if (details.length > 0) {
                return new CommonResponseModel(true, 0, 'All stocks Requests retrieved successfully', details)
            } 
            else {
                return new CommonResponseModel(false, 1, 'No data found', [])
            }
        } catch (err) {
            throw err
        }
    }


    async update(req?:statusReq): Promise<CommonResponseModel> {
        try {
            console.log(req,"stock-ser")
          const update = await this.stocksRepository.update(
            { id: req.stockId },
            { allocateQuanty:req.allocateQuanty }
          );
          if (update.affected && update.affected > 0) {
            return new CommonResponseModel(true, 1, 'stockUpdate Sucessfully');
          } else {
            return new CommonResponseModel(false, 1, 'some went wrong');
          }
        } catch (err) {
          throw err;
        }
      }

      async getAllTrimStocks(req:M3trimsDTO): Promise<CommonResponseModel> {
        try {
            // CONCAT(it.item_code,'-',it.description) AS m3Item,
            console.log(req);
            let query = ` SELECT b.external_ref_number AS refNo,s.location_id AS locationId,s.m3_item AS m3itemId, s.uom_id AS uomId, s.grn_item_id AS grnItemId,  s.id AS stockId,
            it.trim_code AS m3Item,  tpm.structure, tpm.category, tpm.content, tpm.type, tpm.finish, tpm.hole, tpm.quality, tpm.thickness, tpm.variety, tpm.uom, tpm.color, tpm.logo, tpm.part,
            s.item_type AS itemType, (s.quantity-s.allocatd_quantity-transfered_quantity) AS qty,
             u.uom AS uom, b.buyer_name AS buyer,r.rack_position_name AS location,
             it.thickness_id, it.type_id,it.trim_category_id,it.variety_id,
             s.buyer_id,g.grn_number AS grnNumber  
             FROM stocks s
             LEFT JOIN buyers b ON b.buyer_id = s.buyer_id
             LEFT JOIN m3_trims it ON it.m3_trim_Id = s.m3_item
             LEFT JOIN rack_position r ON r.position_Id = s.location_id
             LEFT JOIN uom u ON u.id = s.uom_id
             LEFT JOIN grn_items gi ON gi.grn_item_id = s.grn_item_id
             LEFT JOIN grn g ON g.grn_id = gi.grn_id
             LEFT JOIN trim_params_mapping tpm ON tpm.trim_mapping_id = it.trim_mapping_id
             WHERE s.id > 0 AND g.grn_type = 'INDENT' AND (quantity-s.allocatd_quantity-transfered_quantity) > 0 AND s.item_type != 'fabric'`
            if(req.buyerId != undefined){
                query = query + " and s.buyer_id = "+req.buyerId;
            }
            // if(req.extRefNumber != undefined){
            //     query = query +"and b.external_ref_number = " + `"${req.extRefNumber}"`
            // }
            if(req.trimCategoryId != undefined){
                query = query +"and it.trim_category_id = " + `"${req.trimCategoryId}"`
            }
            if(req.categoryId != undefined){
                query = query +"and it.category_id = " + `"${req.categoryId}"`
            }
            if(req.colorId != undefined){
                query = query +"and it.color_id = " + `"${req.colorId}"`
            }
            if(req.contentId != undefined){
                query = query +"and it.content_id = " + `"${req.contentId}"`
            }
            if(req.finishId != undefined){
                query = query +"and it.finish_id = " + `"${req.finishId}"`
            }
            if(req.holeId != undefined){
                query = query +"and it.hole_id = " + `"${req.holeId}"`
            }
            if(req.part != undefined){
                query = query +"and it.part = " + `"${req.part}"`
            }
            if(req.logo != undefined){
                query = query +"and it.logo = " + `"${req.logo}"`
            }
            if(req.qualityId != undefined){
                query = query +"and it.quality_id = " + `"${req.qualityId}"`
            }
            if(req.structureId != undefined){
                query = query +"and it.structure_id = " + `"${req.structureId}"`
            }
            if(req.varietyId != undefined){
                query = query +"and it.variety_id = " + `"${req.varietyId}"`
            }
            if(req.uomId != undefined){
                query = query +"and it.uom_id = " + `"${req.uomId}"`
            }
            if(req.typeId != undefined){
                query = query +"and it.type_id = " + `"${req.typeId}"`
            }
            if(req.thicknessId != undefined){
                query = query +"and it.thickness_id = " + `"${req.thicknessId}"`
            }

            query = query + " order by b.buyer_name ASC ";

            const res = await AppDataSource.query(query);
            if (res.length > 0) {
                const modifiedRes = res.map(item => {
                    const trueValues = Object.keys(item)
                    .filter(key => ["structure", "category", "content", "type", "finish", "hole", "quality", "thickness", "variety", "uom", "color", "logo", "part"].includes(key) && item[key] === 1)
                    .map(key => key.toUpperCase());
    
                    const concatenatedValues = trueValues.join('/');
                    const label = trueValues.length > 0 ? "BUYER/TRIM TYPE/TRIM CATEGORY/":""

                    const trimParams = label + concatenatedValues
                    return { ...item, trimParams };
                });
    
                return new CommonResponseModel(true, 1, "Stock retrieved successfully", modifiedRes);
            } else {
                return new CommonResponseModel(false, 0, "No data found");
            }
        }

        catch (error) {
            console.log(error)
            return new CommonResponseModel(false, 1011, "No data found");
        }

    }

    async getBinPalletsWithoutRolls(req: RackPositionIdRequest): Promise<RackBinPalletsResponse> {
        let response:RackBinPalletsModel[] = []
        try{
            const rackDetails = `select r.rack_id AS rackId,r.rack_code AS rackCode, r.rack_name AS rackDesc,count(rp.position_id) AS totalBins from rack_position rp left join racks r on r.rack_id = rp.rack_id where rp.position_id = '${req.rackPositionId}'`;
            const rackInfo = await this.dataSource.query(rackDetails)

            const rackPositionDetails = `select rp.position_id AS binId,rp.position_code AS binCode, rp.rack_position_name AS binDesc, rp.supported_pallets_count AS totalSupportedPallets from rack_position rp left join racks r on r.rack_id = rp.rack_id left join stocks st on st.location_id = rp.position_id  where st.location_id = '${req.rackPositionId}'`;
            const rackPositionInfo = await this.dataSource.query(rackPositionDetails);
            console.log("************************************************");
            console.log(rackPositionInfo);
            let palletModel:BinPalletModel[] = [];
            if(rackPositionInfo[0]?.binId > 0)
            {
                let warehousePalletRollsModel:WarehousePalletRollsModel[] = []
                // let getpalletsIds = "Select group_concat(DISTINCT pallet_id) AS palletIds from stocks where location_id = "+req.rackPositionId+" and (quantity -allocatd_quantity-transfered_quantity) > 0 ";
                // const palletsIds = await this.dataSource.query(getpalletsIds)

                // let palletsdata = "select id AS palletId,pallet_name AS palletCode, max_items AS maxItems, current_pallet_state AS currentPalletState, current_pallet_location AS currentPalletLocation from pallets where id in ("+palletsIds[0].palletIds+")";
                // const palletInfo = await this.dataSource.query(palletsdata)

                const data = await this.stocksRepository.find({where:{locationId:req.rackPositionId, quantity: Raw(alias => `quantity -allocatd_quantity-transfered_quantity > 0 `)}});
                // for(const ress of palletInfo){
                    let rollBasicInfoModel:RollBasicInfoModel[] = [];
                    let rollInfoModel:RollInfoModel[] = []
                    let stockDetails = "Select IF(s.item_type = 'FABRIC',fab.description, mt.description) AS m3ItemName, s.item_type AS itemType,s.id AS rollId,null AS barcode,s.stock_bar_code AS rollNo,SUM(s.quantity - s.allocatd_quantity - s.transfered_quantity) AS originalQty from stocks s left join m3_items fab on fab.m3_items_Id = s.m3_item and s.item_type = 'FABRIC' left join m3_trims mt on mt.m3_trim_Id = s.m3_item and s.item_type != 'FABRIC'  where location_id ="+req.rackPositionId+" group by s.item_type, s.m3_item, s.grn_item_id Having SUM(s.quantity - s.allocatd_quantity - s.transfered_quantity) > 0 order by s.item_type,IF(s.item_type = 'FABRIC',fab.description, mt.description) ASC";
                    const stockInfo = await this.dataSource.query(stockDetails)
                    console.log("Each Roll Info")
                    console.log(stockInfo)

                    for(const ress of stockInfo){
                        let resss = new RollInfoModel(ress.rollId,ress.rollNo,ress.barcode,ress.originalQty,ress.m3ItemName,ress.itemType,"");
                        rollInfoModel.push(resss);
                    }
                    
                    let warehouseData = new WarehousePalletRollsModel("",1,0,"ress.palletCode",0,"",30,CurrentPalletLocationEnum.NONE,CurrentPalletStateEnum.FREE,rollInfoModel,rollBasicInfoModel);
                    warehousePalletRollsModel.push(warehouseData);
                // }
                let binPalletModel = new BinPalletModel(rackPositionInfo[0].binId,rackPositionInfo[0].binCode,rackPositionInfo[0].binDesc,rackPositionInfo[0].totalSupportedPallets,0,0,warehousePalletRollsModel)
                palletModel.push(binPalletModel)
            }
            let res = new RackBinPalletsModel(rackInfo[0].rackId,rackInfo[0].rackCode,rackInfo[0].rackDesc,rackInfo[0].totalBins,palletModel);
            response.push(res);
            return new RackBinPalletsResponse(true,1,"data retrived successfull.",response);
        }catch (error) {
            console.log(error)
            return new RackBinPalletsResponse(false, 1011, "No data found",response);
        }
    }

}