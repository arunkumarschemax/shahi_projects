import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, Raw } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { CommonResponseModel, RacActiveDeactive, RackCreateRequest, StockTypeEnum } from "@project-management-system/shared-models";
import { ReclassificationAdapter } from "./reclassification.adaptor";
import { ReclassificationEntity } from "./reclassification.entity";
import { ReclassificationDTO } from "./reclassification.dto";
import { StocksRepository } from "../stocks/repository/stocks.repository";
import { StocksEntity } from "../stocks/stocks.entity";

@Injectable()
export class ReclassificationService {

  constructor(
    private adapter: ReclassificationAdapter,
    @InjectRepository(ReclassificationEntity)
    private repository: Repository<ReclassificationEntity>,
    private stocksRepository: StocksRepository,

  ) { }

  async createReclassification(dto: ReclassificationDTO): Promise<CommonResponseModel> {
    try {
      const entity: ReclassificationEntity = this.adapter.convertDtoToEntity(dto);
      const saveReclassification: ReclassificationEntity = await this.repository.save(entity);
      if(saveReclassification.reclassificationId > 0){
          const stocksEntity = new StocksEntity()
          stocksEntity.buyerId = dto.buyer;
          stocksEntity.grnItemId = dto.grnItemId;
          stocksEntity.locationId = dto.location;
          stocksEntity.m3Item = dto.itemId;
          stocksEntity.quantity = dto.quantity;
          stocksEntity.uomId = dto.uomId;
          stocksEntity.stockType = StockTypeEnum.RECLASSIFICATION;
          let saveStock = await this.stocksRepository.save(stocksEntity)
          if(saveStock.id > 0){
            // let updateStockQty = await this.stocksRepository.update({id:dto.stockId},{ quantity: Raw(alias => `quantity = '${dto.quantity}'`)})

            const saveDto: ReclassificationDTO = this.adapter.convertEntityToDto(saveReclassification);
            return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
          }
          else{
            return new CommonResponseModel(false, 0, "Something went wrong",);
          }
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

}




