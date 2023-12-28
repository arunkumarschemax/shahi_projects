import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../app-datasource";
import { BomStatusEnum, CommonResponseModel, ExternalRefReq, LifeCycleStatusEnum, LocationMappedEnum, LocationMappingReq, MaterialIssueIdreq, MaterialStatusEnum, RackLocationStatusReq, StockTypeEnum } from "@project-management-system/shared-models";
import { StocksEntity } from "../stocks/stocks.entity";
import { StocksRepository } from "../stocks/repository/stocks.repository";
import { StockLogEntity } from "../stocks/stock-log-entity";
import { StockLogRepository } from "../stocks/repository/stock-log.repository";
import { DataSource, Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { GrnItemsEntity } from "../grn/entities/grn-items-entity";
import { SampleRequestService } from "../sample-dev-request/sample-dev-request.service";
import { MaterialAllocationDTO } from "../sample-dev-request/dto/material-allocation-dto";
import { MaterialAllocationEntity } from "../sample-dev-request/entities/material-allocation.entity";
import { MaterialAllocationItemsEntity } from "../sample-dev-request/entities/material-allocation-items";
import { SamplingbomEntity } from "../sample-dev-request/entities/sampling-bom-entity";
import { SampleRequest } from "../sample-dev-request/entities/sample-dev-request.entity";
import { GrnEntity } from "../grn/entities/grn-entity";

@Injectable()
export class LocationMappingService {

    constructor(

    @InjectRepository(StockLogEntity)
    private stockLogRepository: Repository<StockLogEntity>,
    @InjectRepository(StocksEntity)
    private stocksRepository: Repository<StocksEntity>,
    private readonly dataSource: DataSource,
      ) { }

      
    async getAllActiveRackPositions(): Promise<CommonResponseModel> {
        try {
            let dataquery = `SELECT * FROM rack_position WHERE status != 'OCCUPIED'`;
            const res = await AppDataSource.query(dataquery);
            if (res) {
                return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
            }
        } catch (err) {
            return err;
        }
    }

    async getAllFabrics(req?:ExternalRefReq): Promise<CommonResponseModel> {
        try {

            // let dataquery = `SELECT 
            // grn_it.grn_item_id,
            // grn_it.grn_id,
            // grn_it.m3_item_code_id,
            // grn_it.received_quantity,
            // grn_it.accepted_quantity,
            // grn_it.rejected_quantity,
            // grn_it.conversion_quantity,
            // grn_it.uom_id,
            // grn_it.location_mapped_status,
            // g.grn_number,
            // ven.vendor_code,
            // ven.vendor_name,
            // sty.style_id,
            // sty.style,
            // sty.description,
    
            // it.item_name,
            // it.item_code,
            // buyer.buyer_name AS trimBuyerName,
            // buyers.buyer_name AS fabBuyerName,
            // m3items.m3_items_Id,
            //  m3items.item_code AS m3_item_code,
            //  m3trims.trim_code AS m3_trim_code,
            //  m3trims.m3_trim_Id,
            //  sare.buyer_id AS fabricBuyerid,
            //  saree.buyer_id AS trimBuyerId,
            //  g.item_type,
            //  m3items.description AS m3itemDescription,

            // COALESCE(SUM(stk_log.quantity), 0) AS quantity,
            // uom.uom AS acceptedUOM
            
            // FROM grn_items AS grn_it
            
            // LEFT JOIN grn AS g ON g.grn_id = grn_it.grn_id
            // LEFT JOIN vendors AS ven ON ven.vendor_id = g.vendor_id
            // LEFT JOIN style AS sty ON sty.style_id = g.style_id
            // LEFT JOIN items AS it ON it.item_id = grn_it.item_id
            // LEFT JOIN stock_log AS stk_log ON stk_log.grn_item_id = grn_it.grn_item_id
            // LEFT JOIN purchase_order AS po ON po.purchase_order_id = g.po_id
            // LEFT JOIN purchase_order_fabric AS pofab ON pofab.po_fabric_id = po.purchase_order_id
            // LEFT JOIN purchase_order_trim AS potrim ON potrim.po_trim_id = po.purchase_order_id
            // LEFT JOIN indent_fabric AS indfab ON indfab.ifabric_id = pofab.indent_fabric_id
            // LEFT JOIN indent_trims AS indtrim ON indtrim.itrims_id = potrim.indent_trim_id
            // LEFT JOIN indent AS ind ON ind.indent_id = indfab.indent_id
            // LEFT JOIN indent AS indi ON indi.indent_id = indtrim.indent_id
            // LEFT JOIN sample_request AS sare ON sare.sample_request_id = ind.sample_request_id
            // LEFT JOIN sample_request AS saree ON saree.sample_request_id = indi.sample_request_id
            
             
            
            
            // LEFT JOIN buyers AS buyer ON buyer.buyer_id = sare.buyer_id
            // LEFT JOIN buyers AS buyers ON buyers.buyer_id = saree.buyer_id
            // LEFT JOIN  m3_items AS m3items ON m3items.m3_items_Id = grn_it.m3_item_code_id AND g.item_type = "Fabric"
            // LEFT JOIN  m3_trims AS m3trims ON m3trims.m3_trim_Id = grn_it.m3_item_code_id AND g.item_type =!"Fabric"
            // LEFT JOIN  uom AS uom ON uom.id = grn_it.received_uom_id
            
            
            // GROUP BY grn_item_id`

             // LEFT JOIN  sample_request_fabric_info spf ON spf.fabric_info_id = gi.sample_item_id AND g.grn_type = "SAMPLE_ORDER" AND g.item_type = "FABRIC"
            // LEFT JOIN  sample_request_trim_info spt ON spt.trim_info_id = gi.sample_item_id AND g.grn_type = "SAMPLE_ORDER" AND g.item_type != "FABRIC"
            // LEFT JOIN  sample_request sprf ON sprf.sample_request_id = spf.sample_request_id
            // LEFT JOIN  sample_request sprt ON sprf.sample_request_id = spt.sample_request_id
            // LEFT JOIN  buyers sprfb ON sprfb.buyer_id = sprf.buyer_id
            // LEFT JOIN  buyers sprtb ON sprt.buyer_id = sprt.buyer_id
            // LEFT JOIN  indent_fabric indf ON indf.ifabric_id = gi.indent_item_id AND g.grn_type = "INDENT" AND g.item_type = "FABRIC"
            // LEFT JOIN  indent_trims indt ON indt.itrims_id = gi.indent_item_id AND g.grn_type = "INDENT" AND g.item_type != "FABRIC"
            // LEFT JOIN  indent idf ON idf.indent_id = indf.indent_id
            // LEFT JOIN  indent idt ON idt.indent_id = indt.indent_id
            let query = `SELECT poi.colour_id AS colorId,gi.uom_id AS uomId, u.uom AS uom, gi.grn_item_id As grnItemId,g.item_type AS materialType, gi.sample_req_id AS sampleReqId,gi.sample_item_id AS sampleItemId,
            (gi.accepted_quantity - IF(SUM(st.quantity) IS NULL, 0,SUM(st.quantity))) AS balance, gi.grn_item_no AS grnItemNo,gi.style_id AS styleId,sty.style,
            IF(g.item_type = "FABRIC", mit.m3_items_id, mtr.m3_trim_id) AS itemId,IF(SUM(st.quantity) IS NULL, 0,SUM(st.quantity)) AS allocatedQty,
            IF(g.item_type = "FABRIC", mit.item_code, mtr.trim_code) AS itemCode, g.grn_number AS grnNumber, v.vendor_name, gi.accepted_quantity AS acceptedQuantity, gi.buyer_id AS buyerId, idfb.buyer_name AS buyerName,g.grn_id as grnId, g.grn_type AS grnType, gi.item_type AS itemType
            FROM grn_items gi LEFT JOIN grn g ON g.grn_id = gi.grn_id 
            LEFT JOIN vendors v ON v.vendor_id = g.vendor_id
            LEFT JOIN purchae_order_items poi ON poi.purchase_order_item_id = gi.po_item_id
            LEFT JOIN m3_items mit ON mit.m3_items_id = gi.m3_item_code_id AND g.item_type = "FABRIC"
            LEFT JOIN m3_trims mtr ON mtr.m3_trim_Id = gi.m3_item_code_id AND g.item_type != "FABRIC"
            LEFT JOIN stock_log st ON st.grn_item_id = gi.grn_item_id
            LEFT JOIN  buyers idfb ON idfb.buyer_id = gi.buyer_id
            LEFT JOIN  style sty ON sty.style_id = g.style_id
           LEFT JOIN  uom u ON u.id = gi.uom_id
           where gi.location_mapped_status!='COMPLETED' `
            let param :any={}
    if(req){
      if (req.externalRefNo){
        query += ` AND idfb.external_ref_number = '${req.externalRefNo}'`
      }
      if (req.grnNo != undefined){
        query += ` AND g.grn_number = '${req.grnNo}'`
      }
      if (req.material != undefined){
        query += ` AND g.item_type = '${req.material}'`
      }
    }
    
    // const data = await this.datasource.query(query,param)

        query += ` GROUP BY gi.grn_item_id `
            const res = await AppDataSource.query(query,param);
            if (res) {
                return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
            }

        } catch (error) {
            return error;
        }
    }

    
    
    async getgrn(): Promise<CommonResponseModel> {
        try {
            
            let query = `SELECT DISTINCT
             g.grn_number AS grnNumber
            FROM grn_items gi
            LEFT JOIN grn g ON g.grn_id = gi.grn_id 
         
            WHERE gi.location_mapped_status != 'COMPLETED' 
            `
            const data = await this.dataSource.query(query)
            if(data.length >0){
                return new CommonResponseModel(true, 0, "GRN's retrieved successfully", data)
            }else {
                return new CommonResponseModel(false, 1, "No data found", [])
            }

        } catch (error) {
            return error;
        }
    }
   
    async getMaterial(req?:ExternalRefReq): Promise<CommonResponseModel> {
        try {
            console.log(req,"LLLLLL");
            
            let query = `SELECT DISTINCT g.item_type AS materialType,
            IF(g.item_type = "FABRIC", mit.item_code, mtr.trim_code) AS itemCode,
            g.grn_number AS grnNumber
        FROM grn_items gi
        LEFT JOIN grn g ON g.grn_id = gi.grn_id 
        LEFT JOIN vendors v ON v.vendor_id = g.vendor_id
        LEFT JOIN m3_items mit ON mit.m3_items_id = gi.m3_item_code_id AND g.item_type = "FABRIC"
        LEFT JOIN m3_trims mtr ON mtr.m3_trim_Id = gi.m3_item_code_id AND g.item_type != "FABRIC"
        LEFT JOIN stock_log st ON st.grn_item_id = gi.grn_item_id
        LEFT JOIN buyers idfb ON idfb.buyer_id = gi.buyer_id
        LEFT JOIN style sty ON sty.style_id = g.style_id
        LEFT JOIN uom u ON u.id = gi.uom_id
        WHERE gi.location_mapped_status != 'COMPLETED' `
            let param :any={}
    if(req){
      if (req.externalRefNo){
        query += ` AND idfb.external_ref_number = '${req.externalRefNo}'`
      }
      
   
    }
    
            const res = await AppDataSource.query(query,param);
            if (res) {
                return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
            }

        } catch (error) {
            return error;
        }
    }

    async getOneItemAllocateDetails(req: MaterialIssueIdreq): Promise<CommonResponseModel> {
        try {
            let dataquery = `SELECT 
            stk_lg.stock_log_id,
            stk_lg.m3_item,
            stk_lg.buyer_id,
            stk_lg.uom_id,
            stk_lg.item_type,
            stk_lg.location_id,
            stk_lg.quantity,
            stk_lg.grn_item_id,
            stk_lg.stock_id,
            SUM(stk_lg.quantity) AS total_quantity,
            m3_it.item_code AS itemcode,
            m3_it.fabric_type,
            m3_it.item_type as type,
            m3tr.trim_type as type,
            m3_it.yarn_count,
            m3_it.construction,
            m3_it.weave,
            m3_it.finish,
            m3tr.trim_code AS itemcode,
            m3_it.shrinkage,
            m3_it.content,
            rk_po.rack_position_name,
            rk_po.status,
            u.uom,
            grn.grn_item_no,
            grn.received_quantity,
            grn.accepted_quantity,
            grn.rejected_quantity,
            grn.conversion_quantity

        FROM 
            stock_log AS stk_lg
        LEFT JOIN 
            rack_position AS rk_po ON rk_po.position_id = stk_lg.location_id
            LEFT JOIN 
            m3_items AS m3_it ON m3_it.m3_items_id = stk_lg.m3_item
            LEFT JOIN m3_trims AS m3tr ON m3tr.buyer_id= stk_lg.buyer_id
            LEFT JOIN uom AS u  ON  u.id = stk_lg.uom_id
            LEFT JOIN grn_items AS grn ON grn.grn_item_id= stk_lg.grn_item_id


         WHERE 
            stk_lg.grn_item_id = '${req.id}'
        GROUP BY 
            stk_lg.location_id,
            rk_po.rack_position_name,
            rk_po.status;`;

            const res = await AppDataSource.query(dataquery);
            if (res) {
                return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
            }


        } catch (error) {
            return error;
        }
    } 

    async getAllCount(): Promise<any> {
        const query =  `SELECT MAX(id) AS id
        FROM stocks
        ORDER BY created_at DESC`;
        const res = await AppDataSource.query(query)
        if (res) {
            return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
        }
    }



    async postToStockLogs(req: LocationMappingReq) {
         const manager=this.dataSource
        const getGrnData = "select g.grn_type AS grnType, gi.sample_req_id AS sampleOrderId,gi.sample_item_id AS sampleItemId from grn_items gi left join grn g on g.grn_id = gi.grn_id where gi.grn_item_id = "+req.grn_item_id;
        const grnDetails = await manager.query(getGrnData)
        const data = await this.getAllCount();
        console.log(data,"data")
        console.log(data.data[0].id,"data")
         const maxId = data.data[0].id
        try {
            const stock_bar_code = `${req.item_type}/${req.description}/${req.quantity}${req.uomName}/000${maxId+1}`;
            let saveStock :StocksEntity = undefined;
            let stockEntity = new StocksEntity();
            stockEntity.allocateQuanty = grnDetails[0].grnType === "INDENT" ? 0 : req.quantity;
            stockEntity.buyerId = req.buyer_id
            stockEntity.grnItemId = req.grn_item_id;
            stockEntity.issuedQuantity = 0;
            stockEntity.itemType = req.item_type;
            stockEntity.locationId = req.location_id;
            stockEntity.quantity = req.quantity;
            stockEntity.styleId = req.style_id;
            stockEntity.m3Item = req.m3_item;
            stockEntity.stockType = StockTypeEnum.STOCK;
            stockEntity.uomId = req.uom_id;
            stockEntity.stockBarCode = stock_bar_code;
            stockEntity.grnType = req.grnType
            stockEntity.sampleItemId = req.sampleItemId
            stockEntity.sampleReqId = req.sampleReqId

            // stockEntity.uuid = '';
            saveStock = await this.stocksRepository.save(stockEntity)
            if(saveStock){
                let stockLogEntity = new StockLogEntity();
                stockLogEntity.buyerId = req.buyer_id
                stockLogEntity.grnItemId = req.grn_item_id;
                stockLogEntity.itemType = req.item_type;
                stockLogEntity.locationId = req.location_id;
                stockLogEntity.quantity = req.quantity;
                stockLogEntity.m3Item = req.m3_item;
                stockLogEntity.uomId = req.uom_id;
                stockLogEntity.stockId = saveStock.id;
                let saveStockLog = await this.stockLogRepository.save(stockLogEntity)
                if(saveStockLog){
                    let updateGrnItemStatus = await manager.getRepository(GrnItemsEntity).update({grnItemId:req.grn_item_id},{ status: LocationMappedEnum.COMPLETED});
                    // after completin the GRN of th child check for the GRN status of all the items and updated the parent status
                    let grnStatus = LocationMappedEnum.COMPLETED;
                    const grnItems = await manager.getRepository(GrnItemsEntity).find({ select: ['status'], where:{   grnEntity : {grnId:req.grn_id} } });
                    for(const item of grnItems) {
                        if(item.status == LocationMappedEnum.PARTIALLY_COMPLETED) {
                            grnStatus = LocationMappedEnum.PARTIALLY_COMPLETED;
                            break;
                        }
                        if(item.status == LocationMappedEnum.OPEN) {
                            grnStatus = LocationMappedEnum.PARTIALLY_COMPLETED;
                        }
                    }
                    await manager.getRepository(GrnEntity).update({grnId:req.grn_id},{ locationMapStatus: grnStatus});
                
                    console.log(updateGrnItemStatus)
                    console.log("**********************************")
                    if(updateGrnItemStatus.affected > 0 ){
                        if(grnDetails[0].grnType === "INDENT"){
                            return new CommonResponseModel(true, 1111, "Data posted Succesufully");
                        }
                        else{
                            let materialAllocationItemsEntity = new MaterialAllocationItemsEntity();
                            materialAllocationItemsEntity.allocateQuantity = req.quantity;
                            materialAllocationItemsEntity.quantity = req.quantity;
                            materialAllocationItemsEntity.stockId = saveStock.id;
                            materialAllocationItemsEntity.locationId = req.location_id;

                            let materialAllocationEntity = new MaterialAllocationEntity();
                            materialAllocationEntity.buyerId = req.buyer_id
                            materialAllocationEntity.itemType = req.item_type;
                            materialAllocationEntity.m3ItemId = req.m3_item;
                            materialAllocationEntity.totalIssueQty = 0
                            materialAllocationEntity.sampleOrderId = grnDetails[0].sampleOrderId
                            materialAllocationEntity.sampleItemId = grnDetails[0].sampleItemId
                            materialAllocationEntity.materialAllocationinfo = [materialAllocationItemsEntity]
                            let allocateStock = await manager.getRepository(MaterialAllocationEntity).save(materialAllocationEntity);
                            console.log(allocateStock)
                            if(allocateStock.materialAllocationId > 0){
                                const bomQuery = "select * from sampling_bom where sample_request_id = "+grnDetails[0].sampleOrderId+" and status != '"+BomStatusEnum.ALLOCATED+"'";
                                let getBomStatus = await manager.query(bomQuery)
                                // let getBomStatus = await manager.getRepository(SamplingbomEntity).find({where:{sampleRequestId:grnDetails[0].sampleOrderId,status: Not(BomStatusEnum.ALLOCATED)}});
                                let updateBomStatus
                                if(req.item_type === "Fabric"){
                                    updateBomStatus = await manager.getRepository(SamplingbomEntity).update({sampleRequestId:grnDetails[0].sampleOrderId,m3ItemId:req.m3_item,colourId:req.colorId},{receivedQuantity : () => `received_quantity + ${req.quantity}`,status: `${BomStatusEnum.ALLOCATED}`});
                                }
                                else{
                                    updateBomStatus = await manager.getRepository(SamplingbomEntity).update({sampleRequestId:grnDetails[0].sampleOrderId,m3ItemId:req.m3_item},{receivedQuantity : () => `received_quantity + ${req.quantity}`,status: `${BomStatusEnum.ALLOCATED}`});
                                }
                                
                                if(updateBomStatus.affected > 0){
                                    
                                    if(Number(getBomStatus.length) - Number(1) < 1){
                                        let updateSampleOrderStatus = await manager.getRepository(SampleRequest).update({SampleRequestId:grnDetails[0].sampleOrderId},{lifeCycleStatus:LifeCycleStatusEnum.READY_FOR_PRODUCTION});
                                        if(updateSampleOrderStatus.affected > 0){
                                            let updateAllocatedStock = await manager.getRepository(MaterialAllocationEntity).update({sampleOrderId:grnDetails[0].sampleOrderId},{status:MaterialStatusEnum.READY_FOR_PRODUCTION})
                                            if(updateAllocatedStock.affected > 0){
                                                return new CommonResponseModel(true, 1111, "Data posted Succesufully");
                                            }
                                            else{
                                                return new CommonResponseModel(false, 10005, "Data not posted");
                                            }
                                        }
                                        else {
                                            return new CommonResponseModel(false, 10005, "Data not posted");
                                        }
                                    }
                                    else{
                                        return new CommonResponseModel(true, 1111, "Data posted Succesufully");
                                    }
                                }
                                else {
                                    return new CommonResponseModel(false, 10005, "Data not posted");
                                }
                            }
                            else {
                                return new CommonResponseModel(false, 10005, "Data not posted");
                            }
                        }
                    }
                    else {
                        return new CommonResponseModel(false, 10005, "Data not posted");
                    }   

                }
                else {
                    return new CommonResponseModel(false, 10005, "Data not posted");
                }
            }   
            else {
                return new CommonResponseModel(false, 10005, "Data not posted");
            }




            // let dataquery = `INSERT INTO stocks (m3_item, quantity, style_id, uom_id, location_id, buyer_id, item_type, grn_item_id,stock_bar_code) VALUES (${req.m3_item}, ${req.quantity}, ${req.style_id}, ${req.uom_id}, ${req.location_id}, ${req.buyer_id}, '${req.item_type}' , ${req.grn_item_id} , '${stock_bar_code}') `
            // const res = await AppDataSource.query(dataquery);
            // if (res) {
            //     if (res.affectedRows > 0) {
            //         const dataquery2 = `INSERT INTO stock_log (m3_item, item_type, location_id, grn_item_id, quantity,buyer_id,uom_id) VALUES (${req.m3_item}, '${req.item_type}', ${req.location_id}, ${req.grn_item_id}, ${req.quantity},${req.buyer_id},${req.uom_id})`

            //         const res2 = await AppDataSource.query(dataquery2);

            //         if (res2) {
            //             if (res.affectedRows > 0) {
            //                 return new CommonResponseModel(true, 1111, "Data posted Succesufully");
            //             }
            //         }
            //     } else {
            //         return new CommonResponseModel(false, 10005, "Data not posted");
            //     }

            // }
        } catch (error) {
            return error;
        }
    }

    

    async updateRackLocationStatus(req: RackLocationStatusReq) {
        try {
            const dataquery = `UPDATE rack_position
            SET STATUS = '${req.locationStatusValue}', is_active = "${req.isActive}"
            WHERE position_Id = '${req.locationId}'`

            const res = await AppDataSource.query(dataquery);
            if (res) {
                if (res.affectedRows > 0) {
                    return new CommonResponseModel(true, 1111, "Rack position updated Succesufully");
                } else {
                    return new CommonResponseModel(false, 10005, "Rack position not updated");
                }
            }

        } catch (error) {
            return error;
        }
    }

}