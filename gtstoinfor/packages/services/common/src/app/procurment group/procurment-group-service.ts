import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ProcurmentGroup } from './procurment-group-entity';
import { CommonResponseModel, ProcurmentGroupDto, ProcurmentGroupModel, ProcurmentGroupRequest, ProductGroupModel } from '@project-management-system/shared-models';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';

@Injectable()
export class ProcurmentGroupService{
    constructor(
        @InjectRepository(ProcurmentGroup)

        private ProcurmentGroupRepository: Repository<ProcurmentGroup>,
        private readonly dataSource: DataSource,

        ){}

        async createProcurmentGroup(req:ProcurmentGroupRequest):Promise<ProcurmentGroupModel>{
          const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
  try{
      await transactionalEntityManager.startTransaction();
      const entity = new ProcurmentGroup()
      entity.procurmentGroup = req.procurmentGroup;
      entity.procurmentGroupId = req.procurmentGroupId;
      entity.createdUser = req.createdUser;
      entity.isActive = req.isActive;
      entity.versionFlag = req.versionFlag;
      entity.updatedUser = req.updatedUser;
    
      
      if(req.procurmentGroupId){

        entity.updatedUser = req.createdUser

        } else{

          entity.createdUser = req.createdUser
      }
      const save = await transactionalEntityManager.getRepository(ProcurmentGroup).save(entity)
      if(!save){
          await transactionalEntityManager.releaseTransaction()
          return new ProcurmentGroupModel(false,0,'Something went wrong in product Group creation',[])
      } else{
          await transactionalEntityManager.completeTransaction()
          return new ProcurmentGroupModel(true,1,'Created successfully',[])
      }

  } catch(err){
      await transactionalEntityManager.releaseTransaction()
      throw err
  }
}


async updateProcurmentGroup(req:ProcurmentGroupRequest): Promise<ProcurmentGroupModel> {

    try {
        let Product;   
            Product = await this.ProcurmentGroupRepository.update(
                { procurmentGroupId: req.procurmentGroupId },
                { procurmentGroup: req.procurmentGroup }
            )
        if (Product.affected > 0) {
            return new ProcurmentGroupModel(true, 11, 'uploaded successfully', Product);
        }
        else {
            return new ProcurmentGroupModel(false, 11, 'uploaded failed', []);
        }
    }
    catch (error) {
        console.log(error);
    }
  }

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
      async getAllActiveProcurmentGroup():Promise<ProcurmentGroupModel>{
        const data = await this.ProcurmentGroupRepository.find({
            where:{isActive:true},
            order:{createdAt:'ASC'}
        })
        if(data.length >0){
            return new ProcurmentGroupModel(true,1,'Active Product Groups Retrived Sucessfully',data)
        }else{
            return new ProcurmentGroupModel(false,0,'No  Employees Found ',[])

        }

    }
    async ActivateOrDeactivateProcurmentGroup(req: ProcurmentGroupRequest): Promise<ProcurmentGroupModel> {
        try {
          console.log(req.isActive,'service-----------')
            const Exists = await this.ProcurmentGroupRepository.findOne({where:{procurmentGroupId:req.procurmentGroupId}});
            if (Exists) {
                if (!Exists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Procurment Group information.Refresh and try again');
                } else {
    
                    const update = await this.ProcurmentGroupRepository.update(
                        { procurmentGroupId: req.procurmentGroupId },
                        { isActive: req.isActive, updatedUser: req.updatedUser });
                    if (Exists.isActive) {
                        if (update.affected) {
                            const Response: ProcurmentGroupModel = new ProcurmentGroupModel(true, 10115, 'Procurment Group is de-activated successfully');
                            return Response;
                        } else {
                            throw new ProcurmentGroupModel(false,10111, 'Procurment Group is already deactivated');
                        }
                    } else {
                        if (update.affected) {
                            const Response: ProcurmentGroupModel = new ProcurmentGroupModel(true, 10114, 'Procurment Group is activated successfully');
                            return Response;
                        } else {
                            throw new ProcurmentGroupModel(false,10112, 'Procurment Group is already  activated');
                        }
                    }
                    // }
                }
            } else {
                throw new ProcurmentGroupModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
          }