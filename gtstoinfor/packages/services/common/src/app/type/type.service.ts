import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

import { TypeRepository } from "./type.repo";
import { TypeReq, TypeResponseModel, TypeModel, TypeActivateReq } from "@project-management-system/shared-models";
import { Type } from "./type.entity";



@Injectable()
export class TypeService {
    constructor(
        private repo : TypeRepository
    ) { }

    async createType(req: TypeReq,isUpdate:boolean) : Promise<TypeResponseModel>{
      
        try{
            const entity = new Type()
            if(!isUpdate){
                const TypeCheck = await this.repo.find({where:{TypeId:req.typeId}})
                if(TypeCheck.length >0){
                    return new TypeResponseModel(false,0,'Type already exists')
                }
            }
            entity.Type = req.type;
            if(isUpdate){

                entity.TypeId = req.typeId;
                entity.updatedUser = req.createdUser
            } else{
                entity.createdUser = req.createdUser
            }
            const save = await this.repo.save(entity)
            const convertedData = new TypeModel(save.TypeId,save.Type,save.isActive,save.versionFlag)
            return new TypeResponseModel(true,1,isUpdate ? 'Type Updated successfully' : 'Type Saved successfully',[convertedData])

        } catch(err){
            throw err
        }
    }

    async getAllTypeInfo():Promise<TypeResponseModel>{
        try{
            const data = await this.repo.find()
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new TypeModel(rec.TypeId,rec.Type,rec.isActive,rec.versionFlag))
                }
                return new TypeResponseModel(true,1,'Data retrieved',info)
            } else{
                return new TypeResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }
   }

   async activateOrDeactivateType(req: TypeActivateReq): Promise<TypeResponseModel> {
    try {
        const TypeExists = await this.repo.findOne({where:{TypeId:req.typeId}});
        if (TypeExists) {

            
            if (req.versionFlag !== TypeExists.versionFlag) {
                return new TypeResponseModel(false,10113, 'Someone updated the current Type information.Refresh and try again');
            } else {

                const TypeStatus = await this.repo.update(
                    { TypeId: req.typeId },
                    { isActive: req.isActive, updatedUser: req.updatedUser });

                if (TypeExists.isActive) {
                    if (TypeStatus.affected) {
                        const busAreaResponse: TypeResponseModel = new TypeResponseModel(true, 10115, 'Type is Deactivated successfully');
                        return busAreaResponse;
                    } else {
                        return new TypeResponseModel(false,10111, 'Type is already Deactivated');
                    }
                } else {
                    if (TypeStatus.affected) {
                        const busAreaResponse: TypeResponseModel = new TypeResponseModel(true, 10114, 'Type is Activated successfully');
                        return busAreaResponse;
                    } else {
                        return new TypeResponseModel(false,10112, 'Type is already Activated');
                    }
                }
                // }
                }
        } else {
            return new TypeResponseModel(false,99998, 'No Records Found');
        }
        } catch (err) {
            return err;
        }
    }

// async activateOrDeactivateType(req: TypeActivateReq): Promise<TypeResponseModel> {
//     try {
//         console.log(req,'oooooooooo');
        
//         const typeExists = await this.getTypeById(req.typeId)
//         if (typeExists) {
//             if (req.versionFlag !== typeExists.versionFlag) {
//                 throw new TypeResponseModel(false,10113, 'Someone updated the current typeMethod information.Refresh and try again');
//             } else {
                
//                     const typeStatus =  await this.repo.update(
//                         { TypeId: req.typeId },
//                         { isActive: req.isActive,updatedUser: req.updatedUser });
                   
//                     if (typeExists.isActive) {
//                         if (typeStatus.affected) {
//                             const typeResponse: TypeResponseModel = new TypeResponseModel(true, 10115, 'typeMethod is de-activated successfully');
//                             return typeResponse;
//                         } else {
//                             throw new TypeResponseModel(false,10111, 'typeMethod is already deactivated');
//                         }
//                     } else {
//                         if (typeStatus.affected) {
//                             const typeResponse: TypeResponseModel = new TypeResponseModel(true, 10114, 'typeMethod is activated successfully');
//                             return typeResponse;
//                         } else {
//                             throw new TypeResponseModel(false,10112, 'typeMethod is already  activated');
//                         }
//                     }
//                 // }
//             }
//         } else {
//             throw new TypeResponseModel(false,99998, 'No Records Found');
//         }
//     } catch (err) {
//         return err;
//     }
// }
async getTypeById(typeId: number): Promise<Type> {
    //  console.log(employeeId);
        const Response = await this.repo.findOne({
        where: {TypeId: typeId},
        });
        // console.log(employeeResponse);
        if (Response) {
        return Response;
        } else {
        return null;
        }
    }
    async getAllActiveTypeInfo():Promise<TypeResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive:true}})
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new TypeModel(rec.TypeId,rec.Type,rec.isActive,rec.versionFlag))
                }
                return new TypeResponseModel(true,1,'Data retrieved',info)
            } else{
                return new TypeResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }
   }
}