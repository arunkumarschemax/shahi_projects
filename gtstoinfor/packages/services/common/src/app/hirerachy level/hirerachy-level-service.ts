import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { HierarchyLevel } from './hirerachy-level-entity';
import { HierarchyLevelDto, HierarchyLevelRequest, hierachyLevelModel } from '@project-management-system/shared-models';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';



@Injectable()
export class HierachyLevelService{
    constructor(
        @InjectRepository(HierarchyLevel)

        private hierachyLevelRepository: Repository<HierarchyLevel>,
        private readonly dataSource: DataSource,
        ){}

      
        async createhierachyLevel(req:HierarchyLevelRequest):Promise<hierachyLevelModel>{
          const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
          console.log(req,'hhhhhhhh');
          
  try{
      await transactionalEntityManager.startTransaction();
      const entity = new HierarchyLevel()
      entity.hierarchyLevel = req.hierarchyLevel;
      entity.hierarchyLevelId = req.hierarchyLevelId;
      entity.createdUser = req.createdUser;
      entity.isActive = req.isActive;
      entity.versionFlag = req.versionFlag;
      entity.updatedUser = req.updatedUser;
    
      
      if(req.hierarchyLevelId){

        entity.updatedUser = req.createdUser

        } else{

          entity.createdUser = req.createdUser
      }
      const save = await transactionalEntityManager.getRepository(HierarchyLevel).save(entity)
      if(!save){
          await transactionalEntityManager.releaseTransaction()
          return new hierachyLevelModel(false,0,'Something went wrong in Hierarchy Level creation',[])
      } else{
          await transactionalEntityManager.completeTransaction()
          return new hierachyLevelModel(true,1,'Created successfully',[])
      }

  } catch(err){
      await transactionalEntityManager.releaseTransaction()
      throw err
  }
}


async updatehierachyLevel(req:HierarchyLevelRequest): Promise<hierachyLevelModel> {

    try {
        let Product;   
            Product = await this.hierachyLevelRepository.update(
                { hierarchyLevelId: req.hierarchyLevelId },
                { hierarchyLevel: req.hierarchyLevel }
            )
        if (Product.affected > 0) {
            return new hierachyLevelModel(true, 11, 'uploaded successfully', Product);
        }
        else {
            return new hierachyLevelModel(false, 11, 'uploaded failed', []);
        }
    }
    catch (error) {
        console.log(error);
    }
  }


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
      async getAllActivehierachyLevel():Promise<hierachyLevelModel>{
        const data = await this.hierachyLevelRepository.find({
            where:{isActive:true},
            order:{createdAt:'ASC'}
        })
        if(data.length >0){
            return new hierachyLevelModel(true,1,'Active Hierarchy Levels Retrived Sucessfully',data)
        }else{
            return new hierachyLevelModel(false,0,'No  Employees Found ',[])

        }

    }
    
   
    async ActivateOrDeactivatehierachyLevel(req: HierarchyLevelRequest): Promise<hierachyLevelModel> {
        try {
          console.log(req.isActive,'service-----------')
            const Exists = await this.hierachyLevelRepository.findOne({where:{hierarchyLevelId:req.hierarchyLevelId}});
            if (Exists) {
                if (!Exists) {
                    throw new ErrorResponse(10113, 'Someone updated the current  Hierarchy Level information.Refresh and try again');
                } else {
    
                    const update = await this.hierachyLevelRepository.update(
                        { hierarchyLevelId: req.hierarchyLevelId },
                        { isActive: req.isActive, updatedUser: req.updatedUser });
                    if (Exists.isActive) {
                        if (update.affected) {
                            const Response: hierachyLevelModel = new hierachyLevelModel(true, 10115, ' Hierarchy Level is de-activated successfully');
                            return Response;
                        } else {
                            throw new hierachyLevelModel(false,10111, ' Hierarchy Level is already deactivated');
                        }
                    } else {
                        if (update.affected) {
                            const Response: hierachyLevelModel = new hierachyLevelModel(true, 10114, ' Hierarchy Level is activated successfully');
                            return Response;
                        } else {
                            throw new hierachyLevelModel(false,10112, ' Hierarchy Level is already  activated');
                        }
                    }
                    // }
                }
            } else {
                throw new hierachyLevelModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
      }