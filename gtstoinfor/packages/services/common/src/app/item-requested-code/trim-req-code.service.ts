import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FabricRequestCodeDto } from './dtos/fabric-request-code.dto';
import { CommonResponseModel, MaterialFabricEnum } from '@project-management-system/shared-models';
import { TrimRequestCodeEntity } from './entities/trim-request-code.entity';
import { TrimRequestCodeDto } from './dtos/trim-request-code.dto';

@Injectable()
export class TrimReqCodeService {
    constructor(
        @InjectRepository(TrimRequestCodeEntity) 
        private trimReqRepo: Repository<TrimRequestCodeEntity>
      ) { }

      async createTrimRequestedCode(dto: TrimRequestCodeDto): Promise<CommonResponseModel> {
        try {
            const entity = new TrimRequestCodeEntity();
            entity.buyerId = dto.buyerId
            entity.trimType = dto.trimType
            // entity.part = dto.part;
            entity.categoryId = dto.categoryId;
            // entity.colorId = dto.colorId;
            entity.contentId = dto.contentId;
            entity.finishId = dto.finishId;
            entity.holeId = dto.holeId;
            // entity.logo = dto.logo;
            // entity.part = dto.part;
            // entity.qualityId = dto.qualityId;
            // entity.structureId = dto.structureId;
            // entity.varietyId = dto.varietyId;
            // entity.uomId = dto.uomId;
            entity.typeId = dto.typeId;
            entity.trimCategoryId = dto.trimCategoryId;
            // entity.thicknessId = dto.thicknessId;
            entity.m3Code = dto.m3Code;
            entity.hsnCode= dto.hsnCode;
            entity.status = MaterialFabricEnum.OPEN
        
            const saveTrimReq = await this.trimReqRepo.save(entity)
       
         if (saveTrimReq) {
          const response = new CommonResponseModel(true,1, 'Requested Trim Code created successfully' ,saveTrimReq);
          return response;
        } else {
          throw new ErrorResponse(11106,'Requested Trim Code creation failed');
        }
      }
      catch (error) {
        return error;
      }
    }

    /**
     * gets all   Item categories details  
     * @returns all the  Item category details .
     */
    // @LogActions({ isAsync: true })
    async getAllTrims(): Promise<CommonResponseModel> {  
       try{
        const data = await this.trimReqRepo.find({order:{createdAt:'ASC'}})
        if(data.length >0){
            return new CommonResponseModel(true,1,'Data retrieved successfully',data)
        }else{
            return new CommonResponseModel(false,0,'No data found',[])

        }
       }catch(err){
        throw(err)
       }
    }
}
