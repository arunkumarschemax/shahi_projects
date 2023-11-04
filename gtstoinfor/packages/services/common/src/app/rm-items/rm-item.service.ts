import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { RmCreationAdapter } from './dto/rm-item.adapter';
import { RmCreationDto } from './dto/rm-item.dto';
import { RmCreationEntity } from './rm-items.entity';
import { CommonResponseModel, GlobalVariables, RMCreFilterRequest } from '@project-management-system/shared-models';
import { error } from 'console';
import { RmCreationRepository } from './rm-item.repo';
import { productGroupDto } from './dto/product-group-filter';


@Injectable()
export class RmCreationservice{
    constructor(
        @InjectRepository(RmCreationEntity) private Rmrepository:Repository<RmCreationEntity>,
        private rmAdapter :RmCreationAdapter,
        private repository: RmCreationRepository,
    ){}

    async  CreateRm(rmDto:RmCreationDto,isUpdate:boolean):Promise<CommonResponseModel>{
        try{
            const convertedRmCreationEntity:RmCreationEntity = this.rmAdapter.convertDtoToEntity(rmDto,isUpdate);
            const savedRmCreationEntity:RmCreationEntity =  await this.Rmrepository.save(convertedRmCreationEntity);
            const savedRmcreationDto:RmCreationDto= this.rmAdapter.convertEntityToDto(savedRmCreationEntity)
            if (savedRmcreationDto){
                const response = new CommonResponseModel(true, isUpdate ? 11101: 11100, isUpdate ? 'RmCreation Updated Successfully' : 'RmCreation Created Successfully',savedRmcreationDto)
  return response ;

            }else{
                const response = new CommonResponseModel(false, 10101, 'Something went wrong');
return response;
            }
        }catch (err){
            return err;
        }
    }

    async getAllRMItems(req?:RMCreFilterRequest):Promise<CommonResponseModel>{
        try{
            const data = await this.repository.getAllRmCrted(req)
            if(data.length === 0){
                return new CommonResponseModel(false,0,'No data found')
            } else{
                return new CommonResponseModel(true,1,'Data retrieved',data)

            }
        } catch(err){
            return err
        }
    }



    async getRmItemsData(): Promise<CommonResponseModel> {
        try {
       const data = await this.Rmrepository.find()
       console.log(data,'-----------')
       return new CommonResponseModel(true, 0, "Rm ItemsData  retrieved  successfully", data);
    
          } catch (err) {
            throw err;
          }
        }

     async getRmItemsDatabyProductGroupId(req:productGroupDto): Promise<CommonResponseModel> {
            try {
                console.log(req,"ser")
           const data = await this.Rmrepository.find({
            where:{
               productGroupId:req.productGroupId
            }
           })
           console.log(data,'-----------')
           return new CommonResponseModel(true, 0, "Data  retrieved  successfully", data);
        
              } catch (err) {
                throw err;
              }
     }

    async getRmItemsDatabyProductGroupId1(req: productGroupDto): Promise<CommonResponseModel> {
        try {
          console.log(req, "ser");
      
          // Add a condition to filter out records with productGroupId = 1
          const data = await this.Rmrepository.find({
            where: {
                productGroupId: Not(GlobalVariables.productGroupId),
              },
          });
      
          console.log(data, '-----------');
          return new CommonResponseModel(true, 0, "Data retrieved successfully", data);
        } catch (err) {
          throw err;
        }
      }
    


}