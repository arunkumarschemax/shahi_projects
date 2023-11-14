import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Not, Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ProductGroup } from './product-group-entity';
import { CommonResponseModel, GlobalVariables, ProductGroupDto, ProductGroupModel, ProductGroupRequest } from '@project-management-system/shared-models';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { productGroupDto } from '../rm-items/dto/product-group-filter';

@Injectable()
export class ProductGroupService{
    constructor(
        @InjectRepository(ProductGroup)

        private ProductGroupRepository: Repository<ProductGroup>,
        private readonly dataSource: DataSource,

        ){}

        async createProductGroup(req:ProductGroupRequest):Promise<ProductGroupModel>{
          const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
  try{
      await transactionalEntityManager.startTransaction();
      const entity = new ProductGroup()
      entity.productGroup = req.productGroup;
      entity.productGroupId = req.productGroupId;
      entity.createdUser = req.createdUser;
      entity.isActive = req.isActive;
      entity.versionFlag = req.versionFlag;
      entity.updatedUser = req.updatedUser;
    
      
      if(req.productGroupId){

        entity.updatedUser = req.createdUser

        } else{

          entity.createdUser = req.createdUser
      }
      const save = await transactionalEntityManager.getRepository(ProductGroup).save(entity)
      if(!save){
          await transactionalEntityManager.releaseTransaction()
          return new ProductGroupModel(false,0,'Something went wrong in product Group creation',[])
      } else{
          await transactionalEntityManager.completeTransaction()
          return new ProductGroupModel(true,1,'Created successfully',[])
      }

  } catch(err){
      await transactionalEntityManager.releaseTransaction()
      throw err
  }
}


async updateProductGroup(req:ProductGroupRequest): Promise<ProductGroupModel> {

  try {
      let Product;   
          Product = await this.ProductGroupRepository.update(
              { productGroupId: req.productGroupId },
              { productGroup: req.productGroup }
          )
      if (Product.affected > 0) {
          return new ProductGroupModel(true, 11, 'uploaded successfully', Product);
      }
      else {
          return new ProductGroupModel(false, 11, 'uploaded failed', []);
      }
  }
  catch (error) {
      console.log(error);
  }
}
    async getAllProductGroup(): Promise<ProductGroupModel> {
        try {
         const data = await this.ProductGroupRepository.find()
       let response=[]
         for(const res of data){
            response.push(new ProductGroupDto(res.productGroupId,res.productGroup,res.isActive,res.createdUser,res.updatedUser))
         }
         if (data.length>0){
          return new ProductGroupModel(true,1,'data retrived Sucessfully',response)
         }
         return new ProductGroupModel(true,1,'data retrived Sucessfully',[])
        } catch (err) {
          return err;
        }
      }  
      async getAllActiveProductGroup():Promise<ProductGroupModel>{
        const data = await this.ProductGroupRepository.find({
            where:{isActive:true},
            order:{createdAt:'ASC'}
        })
        if(data.length >0){
            return new ProductGroupModel(true,1,'Active Product Groups Retrived Sucessfully',data)
        }else{
            return new ProductGroupModel(false,0,'No  Employees Found ',[])

        }

    }
  
    async ActivateOrDeactivateProductGroup(req: ProductGroupRequest): Promise<ProductGroupModel> {
        try {
          console.log(req.isActive,'service-----------')
            const Exists = await this.ProductGroupRepository.findOne({where:{productGroupId:req.productGroupId}});
            if (Exists) {
                if (!Exists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Product Group information.Refresh and try again');
                } else {
    
                    const update = await this.ProductGroupRepository.update(
                        { productGroupId: req.productGroupId },
                        { isActive: req.isActive, updatedUser: req.updatedUser });
                    if (Exists.isActive) {
                        if (update.affected) {
                            const ProductGroupResponse: ProductGroupModel = new ProductGroupModel(true, 10115, 'Product Group is de-activated successfully');
                            return ProductGroupResponse;
                        } else {
                            throw new ProductGroupModel(false,10111, 'Product Group is already deactivated');
                        }
                    } else {
                        if (update.affected) {
                            const ProductGroupResponse: ProductGroupModel = new ProductGroupModel(true, 10114, 'Product Group is activated successfully');
                            return ProductGroupResponse;
                        } else {
                            throw new ProductGroupModel(false,10112, 'Product Group is already  activated');
                        }
                    }
                    // }
                }
            } else {
                throw new ProductGroupModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getProductGroupById(req: productGroupDto): Promise<CommonResponseModel> {
        try {
      
          // Add a condition to filter out records with productGroupId = 1
          const data = await this.ProductGroupRepository.find({
            where: {
                productGroupId: Not(GlobalVariables.productGroupId),
              },
          });
      
          return new CommonResponseModel(true, 0, "Data retrieved successfully", data);
        } catch (err) {
          throw err;
        }
      }
      }