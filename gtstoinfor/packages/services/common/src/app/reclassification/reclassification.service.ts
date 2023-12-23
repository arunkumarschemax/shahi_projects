import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, Raw, DataSource } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { CommonResponseModel, M3FabricsDTO, RacActiveDeactive, RackCreateRequest, ReclassificationStatusEnum, StockTypeEnum, buyerReq } from "@project-management-system/shared-models";
import { ReclassificationAdapter } from "./reclassification.adaptor";
import { ReclassificationEntity } from "./reclassification.entity";
import { ReclassificationDTO } from "./reclassification.dto";
import { StocksRepository } from "../stocks/repository/stocks.repository";
import { StocksEntity } from "../stocks/stocks.entity";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { ReclassificationApproveRequestDTO } from "./reclassification-approve.request.dto";
import { M3ItemsEntity } from "../m3-items/m3-items.entity";
import { M3TrimsEntity } from "../m3-trims/m3-trims.entity";
import { M3ItemsRepo } from "../m3-items/m3-items.repository";
import { M3TrimsRepo } from "../m3-trims/m3-trims.repository";
import { M3ItemsService, M3TrimsService } from "@project-management-system/shared-services";
import { M3TrimsDTO } from "../m3-trims/m3-trims.dto";
import { Buyers } from "../buyers/buyers.entity";

@Injectable()
export class ReclassificationService {

  constructor(
    private adapter: ReclassificationAdapter,
    @InjectRepository(ReclassificationEntity)
    private repository: Repository<ReclassificationEntity>,
    private stocksRepository: StocksRepository,
    private m3ItemsRepo: M3ItemsRepo,
    private m3TrimsRepo: M3TrimsRepo,
    private m3TrimsService: M3TrimsService,
    private m3ItemsService: M3ItemsService,


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
      let query = "select s.grn_type AS grnType,if(s.item_type = 'fabric', CONCAT(mi.item_code,'-',mi.description), mt.trim_code) AS m3ItemCode, r.created_at,r.status AS status,s.uom_id AS uomId,r.location AS locationId,r.item_id AS m3Item,b.external_ref_number AS toExtRef,fb.external_ref_number AS fromExtRef,r.reclassification_id AS reclassificationId,b.buyer_id AS toBuyerId, fb.buyer_id AS fromBuyerId,r.stock_id AS stockId,s.grn_item_id AS grnItemId,u.uom AS uom,b.buyer_name AS toBuyerName, fb.buyer_name AS fromBuyerName, r.quantity, rp.rack_position_name AS location,s.item_type AS itemType  from reclassification r left join buyers b on b.buyer_id = r.buyer left join buyers fb on fb.buyer_id = r.from_buyer left join rack_position rp on rp.position_Id = r.location left join stocks s on s.id = r.stock_id left join uom u on u.id = s.uom_id left join m3_items mi on mi.m3_items_id = r.item_id and s.item_type = 'fabric' left join m3_trims mt on mt.m3_trim_id = r.item_id and s.item_type != 'fabric' where 1=1"
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
  const manager = new GenericTransactionManager(this.dataSource)
  console.log("*******************");
  console.log(req);

    try {
      await manager.startTransaction();
      let toBuyerDetails = await manager.getRepository(Buyers).findOne({where:{buyerId:req.buyer}});
      let item;
      let itemFlag = true;
      let itemId = 0;
      if(req.itemType === "FABRIC"){
        console.log("if")
        item = await manager.getRepository(M3ItemsEntity).findOne({relations:["buyerInfo","fabricYarnInfo","fabricContentInfo"],where:{m3ItemsId:req.itemId}});
        console.log(item)
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$44");
        if(item.m3ItemsId > 0){
          let checkWithToBuyer = await manager.getRepository(M3ItemsEntity).findOne({relations:["fabricYarnInfo","fabricContentInfo"],where:{fabricType:item.fabricType, weave:item.weave,weightUnit:item.weightUnit,epiConstruction:item.epiConstruction,ppiConstruction:item.ppiConstruction,yarnType:item.yarnType,width:item.width,widthUnit:item.widthUnit,finish:item.finish,shrinkage:item.shrinkage,finishId:item.finishId,buyerId:req.buyer}});
          console.log("checkWithToBuyer");
          console.log(checkWithToBuyer);
          if(checkWithToBuyer != null){
            req.itemId = checkWithToBuyer.m3ItemsId;
          }
          else{
            console.log(item.description)
            item.description = item.description.replace(/^.{2}/g, toBuyerDetails.shortCode)
            console.log(item.description)
            // // console.log("item.description.split('...')")
            // console.log((item.description).split("..."))
            // console.log((item.description).split("...")[0])
            // console.log((item.description).split("...")[0].replace((item.description).split("...")[0], "x"));
          //  (item.description).split("...")[0] = 
            const fabReq = new M3FabricsDTO(0,req.buyer,"",item.fabricType,item.weave,item.weight,item.weightUnit,item.epiConstruction,item.ppiConstruction,item.yarnType,item.width,item.widthUnit,item.finishId,item.shrinkage,item.description,toBuyerDetails.shortCode,"","",item.fabricYarnInfo,item.fabricContentInfo,true,"","",0)
            let saveItem = await this.m3ItemsService.createM3Items(fabReq);
            console.log(saveItem);
            if(!saveItem.status){
              itemFlag = false;
              await manager.releaseTransaction();
              return new CommonResponseModel(false, 0, "Something went wrong",);
            }
            else{
              req.itemId = saveItem.data.m3ItemsId;
            }
          }
        }
      }
      else{
        console.log("else")
        item = await manager.getRepository(M3TrimsEntity).findOne({relations:["buyerInfo"],where:{m3TrimId:req.itemId}});
        console.log(item)
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$44");
        if(item.m3TrimId > 0){
          let checkWithToBuyer = await manager.getRepository(M3TrimsEntity).findOne({relations:["buyerInfo"], where:{trimType:item.trimType,logo:item.logo,part:item.part,trimCategoryId:item.trimCategoryId,trimMappingId:item.trimMappingId,varietyId:item.varietyId,uomId:item.uomId,typeId:item.typeId,thicknessId:item.thicknessId,structureId:item.structureId,qualityId:item.qualityId,holeId:item.holeId,finishId:item.finishId,contentId:item.contentId,categoryId:item.categoryId,colorId:item.colorId,buyerInfo:{buyerId:req.buyer}}});
          console.log(checkWithToBuyer);
          if(checkWithToBuyer != null){
            req.itemId = checkWithToBuyer.m3TrimId;
          }
          else{
            item.description = item.description.replace(/^.{2}/g, toBuyerDetails.shortCode)
            const trimReq = new M3TrimsDTO()
            trimReq.buyerId = req.buyer;
            trimReq.buyerCode = toBuyerDetails.shortCode;
            trimReq.categoryId = item.categoryId;
            trimReq.colorId = item.colorId;
            trimReq.contentId = item.contentId;
            trimReq.description = item.description;
            trimReq.finishId = item.finishId;
            trimReq.holeId = item.holeId;
            trimReq.logo = item.logo;
            trimReq.part = item.part;
            trimReq.qualityId = item.qualityId;
            trimReq.structureId = item.structureId;
            trimReq.thicknessId = item.thicknessId;
            trimReq.trimCategoryId = item.trimCategoryId;
            trimReq.trimMappingId = item.trimMappingId;
            trimReq.trimType = item.trimType;
            trimReq.typeId = item.typeId;
            trimReq.uomId = item.uomId;
            trimReq.varietyId = item.varietyId;
            console.log(trimReq);
            let saveTrim = await this.m3TrimsService.createM3Trims(trimReq);
            console.log(saveTrim);

            if(!saveTrim.status){
              itemFlag = false;
              await manager.releaseTransaction();
              return new CommonResponseModel(false, 0, "Something went wrong",);
            }
            else{
              req.itemId = saveTrim.data.m3TrimId;
            }
          }
        }
        else{
          await manager.releaseTransaction();
          return new CommonResponseModel(false, 0, "Something went wrong",);
        }
      }
      // console.log("**********************");
      // console.log(item);

      // let query = "update reclassification set status='"+req.status+"' where reclassification_id = "+req.reclassificationId;
      const updateStatus = await manager.getRepository(ReclassificationEntity).update({reclassificationId:req.reclassificationId},{status:req.status})
      console.log(updateStatus)
      if(updateStatus.affected > 0 && req.status === ReclassificationStatusEnum.APPROVED){
        const stocksEntity = new StocksEntity()
          stocksEntity.buyerId = req.buyer;
          stocksEntity.grnItemId = req.grnItemId;
          stocksEntity.locationId = req.location;
          stocksEntity.m3Item = req.itemId;
          stocksEntity.quantity = req.quantity;
          stocksEntity.uomId = req.uomId;
          stocksEntity.styleId = req.styleId;
          stocksEntity.itemType = req.itemType;
          stocksEntity.grnType = req.grnType;
          stocksEntity.stockType = StockTypeEnum.RECLASSIFICATION;
          let saveStock = await manager.getRepository(StocksEntity).save(stocksEntity)
          if(saveStock.id > 0){
            let updateStockQty = await manager.getRepository(StocksEntity).update({id:req.stockId},{ transferedQuantity: () => `transfered_quantity+${req.quantity}`});
            if(updateStockQty.affected > 0){
              await manager.completeTransaction();
              return new CommonResponseModel(true, 1, 'Data saved successfully', );
            }
            else{
              await manager.releaseTransaction();
              return new CommonResponseModel(false, 0, "Something went wrong",);
            }
          }
          else{
            await manager.releaseTransaction();
            return new CommonResponseModel(false, 0, "Something went wrong",);
          }
      }
      else if(updateStatus.affected > 0){
        return new CommonResponseModel(true, 1, 'Data saved successfully', );
      }
      else{
        return new CommonResponseModel(false, 0, "Something went wrong",);
      }
    } catch (error) {
      console.log(error)
      return new CommonResponseModel(false, 0, error)
    }
}

}
