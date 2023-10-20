import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { HierarchyLevel } from './hirerachy-level-entity';
import { HierarchyLevelDto, hierachyLevelModel } from '@project-management-system/shared-models';



@Injectable()
export class HierachyLevelService{
    constructor(
        @InjectRepository(HierarchyLevel)

        private hierachyLevelRepository: Repository<HierarchyLevel>,

        ){}

      

    async getAllhierachyLevel(): Promise<hierachyLevelModel> {
        try {
         const data = await this.hierachyLevelRepository.find()
let response=[]
         for(const res of data){
            response.push(new HierarchyLevelDto(res.hierarchyLevelId,res.hierarchyLevel,res.isActive,res.createdUser,res.updatedUser))
         }
         if (data.length>0){
          return new hierachyLevelModel(true,1,'data retrived Sucessfully',response)
         }
         return new hierachyLevelModel(true,1,'data retrived Sucessfully',[])
        } catch (err) {
          return err;
        }
      }  

      }