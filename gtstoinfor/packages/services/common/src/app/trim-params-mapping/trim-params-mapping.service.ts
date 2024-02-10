import { Injectable } from "@nestjs/common";
import {  TypeResponseModel,  CommonResponseModel } from "@project-management-system/shared-models";
import { TrimParamsMappingRepository } from "./trim-params-mapping.repo";
import { TrimParamsMapping } from "./trim-params-mapping.entity";
import { TrimParamsMappingRequest } from "./trim-params-mapping.req";
import { TrimIdRequest } from "./trim-id.request";



@Injectable()
export class TrimParamsMappingService {
    constructor(
        private repo : TrimParamsMappingRepository
    ) { }

    // async createMapping(req: TrimParamsMappingRequest,isUpdate:boolean) : Promise<TypeResponseModel>{
        
    //     try{
    //         const entity = new TrimParamsMapping()
    //         if(!isUpdate){
    //             console.log(req,'pp');

    //             const TypeCheck = await this.repo.find({where:{trimType:req.trimType,trimId:req.trimId }})
    //             if(TypeCheck.length >0){
    //                 console.log(TypeCheck,'not update');

    //                 return new TypeResponseModel(false,0,'Trim Mapping already exists')
    //             }
    //         }
    //         // entity.trimMappingId = req.type;
    //         entity.trimType = req.trimType
    //         entity.trimId = req.trimId;
    //         entity.category = req.category;
    //         entity.color = req.color;
    //         entity.content = req.content;
    //             entity.finish = req.finish;
    //             entity.hole = req.hole;
    //             entity.logo = req.logo;
    //             entity.part = req.part;
    //             entity.quality = req.quality;
    //             entity.structure = req.structure;
    //             entity.thickness = req.thickness;
    //             entity.type = req.type;
    //             entity.uom = req.uom;
    //             entity.variety = req.variety;
    //             entity.buyer = req.buyer
    //             entity.length = req.length
    //             entity.line = req.line
    //             entity.ply = req.ply
    //             entity.parts = req.parts
    //             entity.shape = req.shape
    //             entity.slider = req.slider
    //             console.log(entity,'ppppppppp');
                
    //             if(isUpdate){
    //                 entity.updatedUser = req.createdUser
                
    //         } else{
    //             entity.trimId = req.trimId
    //             entity.createdUser = req.createdUser
    //         }
    //         const save = await this.repo.save(entity)
    //         // const convertedData = new TypeModel(save.trimMappingId,save.Type,save.isActive,save.versionFlag)
    //         console.log(save,'service');
    //         return new CommonResponseModel(true,1,isUpdate ? 'Type Updated successfully' : 'Type Saved successfully',[save])

    //     } catch(err){
    //         throw err
    //     }
    // }
    async createMapping(req: TrimParamsMappingRequest, isUpdate: boolean): Promise<TypeResponseModel> {
        try {
            let entity: TrimParamsMapping;
    
            if (!isUpdate) {
                const existingMapping = await this.repo.findOne({ where: { trimType: req.trimType, trimId: req.trimId } });
                if (existingMapping) {
                    return new TypeResponseModel(false, 0, 'Trim Mapping already exists');
                }
               entity = new TrimParamsMapping();
                entity.trimId = req.trimId;
                entity.createdUser = req.createdUser;
            } else {
                entity = await this.repo.findOne({ where: {trimId: req.trimId } }); 
                if (!entity) {
                    return new TypeResponseModel(false, 0, 'Trim Mapping not found');
                }
                console.log(req,'pppppppppppp');
                
                entity.updatedUser = req.createdUser;
            }
            entity.trimType = req.trimType;
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
            entity.buyer = req.buyer;
            entity.length = req.length;
            entity.line = req.line;
            entity.ply = req.ply;
            entity.parts = req.parts;
            entity.shape = req.shape;
            entity.slider = req.slider;
            console.log(entity,'ppppppp');
            
            const savedEntity = await this.repo.save(entity);
            return new CommonResponseModel(true, 1, isUpdate ? 'Trim params mapping Updated successfully' : 'Trim params mapping Saved successfully', [savedEntity]);
        } catch (err) {
            throw err;
        }
    }
    
    async getAllMappedTrimParams():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.getAll()
            if(data.length > 0){
                return new CommonResponseModel(true,1,'Data retrieved',data)
            } else{
                return new CommonResponseModel(false,0,'No data found',data)
            }
            

        } catch(err){
            throw err
        }
   }
   async getMappedParamsByTrim(req:TrimIdRequest):Promise<CommonResponseModel>{
    try{
        const data = await this.repo.find({where:{trimId:req.trimId,trimMappingId: req.trimMapId}})
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