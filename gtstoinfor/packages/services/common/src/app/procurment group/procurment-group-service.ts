import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ProcurmentGroup } from './procurment-group-entity';
import { CommonResponseModel, ProcurmentGroupDto, ProcurmentGroupModel } from '@project-management-system/shared-models';

@Injectable()
export class ProcurmentGroupService{
    constructor(
        @InjectRepository(ProcurmentGroup)

        private ProcurmentGroupRepository: Repository<ProcurmentGroup>,

        ){}

      

    async getAllProcurmentGroup(): Promise<ProcurmentGroupModel> {
        try {
         const data = await this.ProcurmentGroupRepository.find()
let response=[]
         for(const res of data){
            response.push(new ProcurmentGroupDto(res.procurmentGroupId,res.procurmentGroup,res.isActive,res.createdUser,res.updatedUser))
         }
         if (data.length>0){
          return new ProcurmentGroupModel(true,1,'data retrived Sucessfully',response)
         }
         return new CommonResponseModel(true,1,'data retrived Sucessfully',[])
        } catch (err) {
          return err;
        }
      }  

      }