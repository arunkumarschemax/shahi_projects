import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { TypeReq, TypeResponseModel, TypeModel, TypeActivateReq, CommonResponseModel } from "@project-management-system/shared-models";
import { TrimParamsMappingRepository } from "./trim-params-mapping.repo";
import { TrimParamsMapping } from "./trim-params-mapping.entity";
import { TrimParamsMappingRequest } from "./trim-params-mapping.req";
import { TrimIdRequest } from "./trim-id.request";



@Injectable()
export class TrimParamsMappingService {
    constructor(
        private repo : TrimParamsMappingRepository
    ) { }

    async createMapping(req: TrimParamsMappingRequest,isUpdate:boolean) : Promise<TypeResponseModel>{
      
        try{
            const entity = new TrimParamsMapping()
            if(!isUpdate){
                const TypeCheck = await this.repo.find({where:{trimId:req.trimId}})
                if(TypeCheck.length >0){
                    return new TypeResponseModel(false,0,'Trim Mapping already exists')
                }
            }
            // entity.trimMappingId = req.type;
            if(isUpdate){

                entity.trimId = req.trimId;
                entity.category = req.category;
                entity.color = req.color;
                entity.content = req.content;
                entity.finish = req.finish;
                entity.hole = req.hole;
                entity.logo = req.logo;
                entity.part = req.part;
                entity.quality = req.quality;
                entity.structure = req.structure;
                entity.thickness = req.thickness;
                entity.type = req.type;
                entity.uom = req.uom;
                entity.variety = req.variety;
                entity.updatedUser = req.createdUser
            } else{
                entity.createdUser = req.createdUser
            }
            const save = await this.repo.save(entity)
            // const convertedData = new TypeModel(save.trimMappingId,save.Type,save.isActive,save.versionFlag)
            return new CommonResponseModel(true,1,isUpdate ? 'Type Updated successfully' : 'Type Saved successfully',[save])

        } catch(err){
            throw err
        }
    }

    async getMappedParamsByTrim(req:TrimIdRequest):Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{trimId:req.trimId}})
            if(data.length > 0){
                return new CommonResponseModel(true,1,'Data retrieved',data)
            } else{
                return new CommonResponseModel(false,0,'No data found',data)
            }

        } catch(err){
            throw err
        }
   }
}