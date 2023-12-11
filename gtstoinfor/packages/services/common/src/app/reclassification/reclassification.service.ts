import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, Raw, DataSource } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { CommonResponseModel, RacActiveDeactive, RackCreateRequest, ReclassificationStatusEnum, StockTypeEnum, buyerReq } from "@project-management-system/shared-models";
import { ReclassificationAdapter } from "./reclassification.adaptor";
import { ReclassificationEntity } from "./reclassification.entity";
import { ReclassificationDTO } from "./reclassification.dto";
import { StocksRepository } from "../stocks/repository/stocks.repository";
import { StocksEntity } from "../stocks/stocks.entity";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { ReclassificationApproveRequestDTO } from "./reclassification-approve.request.dto";

@Injectable()
export class ReclassificationService {

  constructor(
    private adapter: ReclassificationAdapter,
    @InjectRepository(ReclassificationEntity)
    private repository: Repository<ReclassificationEntity>,
    private stocksRepository: StocksRepository,
    private readonly dataSource: DataSource,

  ) { }

  async createReclassification(dto: ReclassificationDTO): Promise<CommonResponseModel> {
    const manager = new GenericTransactionManager(this.dataSource)
    try {
      await manager.startTransaction();
      const entity: ReclassificationEntity = this.adapter.convertDtoToEntity(dto);
      const saveReclassification = await manager.getRepository(ReclassificationEntity).save(entity);
      // if(saveReclassification.reclassificationId > 0){
      //     const stocksEntity = new StocksEntity()
      //     stocksEntity.buyerId = dto.buyer;
      //     stocksEntity.grnItemId = dto.grnItemId;
      //     stocksEntity.locationId = dto.location;
      //     stocksEntity.m3Item = dto.itemId;
      //     stocksEntity.quantity = dto.quantity;
      //     stocksEntity.uomId = dto.uomId;
      //     stocksEntity.stockType = StockTypeEnum.RECLASSIFICATION;
      //     let saveStock = await manager.getRepository(StocksEntity).save(stocksEntity)
      //     if(saveStock.id > 0){
      //       let updateStockQty = await manager.getRepository(StocksEntity).update({id:dto.stockId},{ quantity: () => `quantity-${dto.quantity}`});
      //       if(updateStockQty.affected > 0){
      //         await manager.completeTransaction();
      //         const saveDto: ReclassificationDTO = this.adapter.convertEntityToDto(saveReclassification);
      //         return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
      //       }
      //       else{
      //         await manager.releaseTransaction();
      //         return new CommonResponseModel(false, 0, "Something went wrong",);
      //       }
      //     }
      //     else{
      //       await manager.releaseTransaction();
      //       return new CommonResponseModel(false, 0, "Something went wrong",);
      //     }
      // }
      if(saveReclassification){
        await manager.completeTransaction();
        const saveDto: ReclassificationDTO = this.adapter.convertEntityToDto(saveReclassification);
        return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
      }
      else{
        await manager.releaseTransaction();
        return new CommonResponseModel(false, 0, "Something went wrong",);
      }
    } catch (error) {
      await manager.releaseTransaction();
      return new CommonResponseModel(false, 0, error)
    }
  }
  async getAllReclassificationData(req?:buyerReq): Promise<CommonResponseModel> {
    const manager=this.dataSource
    try {
      let query = "select if(s.item_type = 'fabric', CONCAT(mi.item_code,'-',mi.description), mt.trim_code) AS m3ItemCode, r.created_at,r.status AS status,s.uom_id AS uomId,r.location AS locationId,r.item_id AS m3Item,b.external_ref_number AS toExtRef,fb.external_ref_number AS fromExtRef,r.reclassification_id AS reclassificationId,b.buyer_id AS toBuyerId, fb.buyer_id AS fromBuyerId,r.stock_id AS stockId,s.grn_item_id AS grnItemId,u.uom AS uom,b.buyer_name AS toBuyerName, fb.buyer_name AS fromBuyerName, r.quantity, rp.rack_position_name AS location,s.item_type AS itemType  from reclassification r left join buyers b on b.buyer_id = r.buyer left join buyers fb on fb.buyer_id = r.from_buyer left join rack_position rp on rp.position_Id = r.location left join stocks s on s.id = r.stock_id left join uom u on u.id = s.uom_id left join m3_items mi on mi.m3_items_id = r.item_id and s.item_type = 'fabric' left join m3_trims mt on mt.m3_trim_id = r.item_id and s.item_type != 'fabric' where 1=1"
    //   if(req?.extRefNo){
    //     query = query+` AND b.external_ref_number = '${req.extRefNo}'`
    // }
      const data = await manager.query(query)
      if(data){
        return new CommonResponseModel(true, 1, 'Data saved successfully', data);
      }
      else{
        return new CommonResponseModel(false, 0, "Something went wrong",);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  // async getRacks(): Promise<CommonResponseModel> {
  //   const records = await this.repository.find();
  //   if (records.length)
  //     return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
  //   else
  //     return new CommonResponseModel(false, 0, 'No data found')
  // }

  // async activateOrDeactivateRacks(req: RackCreateRequest): Promise<CommonResponseModel> {
  //   try {
  //     const record = await this.repository.findOne({ where: { rackId: req.rackId } });
  //     await this.repository.update({ rackId: req.rackId }, { isActive: !record.isActive });
  //     const internalMessage: string = !record.isActive ? "Activated Sucessfully" : "DeActivated Sucessfully"
  //     return new CommonResponseModel(true, 6876, internalMessage)
  //   } catch (error) {
  //     return new CommonResponseModel(false, 0, error)
  //   }
  // }

async getApproveStockReclassification(req:ReclassificationApproveRequestDTO): Promise<CommonResponseModel> {
  console.log("*******************");
  console.log(req);

  const manager=this.dataSource
    try {
      let query = "update reclassification set status='"+req.status+"' where reclassification_id = "+req.reclassificationId;
      const updateStatus = await manager.query(query)
      console.log(updateStatus)
      if(updateStatus.affectedRows > 0 && req.status === ReclassificationStatusEnum.APPROVED){
        const stocksEntity = new StocksEntity()
          stocksEntity.buyerId = req.buyer;
          stocksEntity.grnItemId = req.grnItemId;
          stocksEntity.locationId = req.location;
          stocksEntity.m3Item = req.itemId;
          stocksEntity.quantity = req.quantity;
          stocksEntity.uomId = req.uomId;
          stocksEntity.styleId = req.styleId;
          stocksEntity.itemType = req.itemType;
          stocksEntity.stockType = StockTypeEnum.RECLASSIFICATION;
          let saveStock = await manager.getRepository(StocksEntity).save(stocksEntity)
          if(saveStock.id > 0){
            let updateStockQty = await manager.getRepository(StocksEntity).update({id:req.stockId},{ transferedQuantity: () => `transfered_quantity+${req.quantity}`});
            if(updateStockQty.affected > 0){
              // await manager.completeTransaction();
              return new CommonResponseModel(true, 1, 'Data saved successfully', );
            }
            else{
              // await manager.releaseTransaction();
              return new CommonResponseModel(false, 0, "Something went wrong",);
            }
          }
          else{
            // await manager.releaseTransaction();
            return new CommonResponseModel(false, 0, "Something went wrong",);
          }
      }
      else if(updateStatus.affectedRows > 0){
        return new CommonResponseModel(true, 1, 'Data saved successfully', );
      }
      else{
        return new CommonResponseModel(false, 0, "Something went wrong",);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
}

}
