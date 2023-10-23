import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ProductGroup } from './product-group-entity';
import { CommonResponseModel, ProductGroupDto, ProductGroupModel } from '@project-management-system/shared-models';

@Injectable()
export class ProductGroupService{
    constructor(
        @InjectRepository(ProductGroup)

        private ProductGroupRepository: Repository<ProductGroup>,

        ){}

      

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
         return new CommonResponseModel(true,1,'data retrived Sucessfully',[])
        } catch (err) {
          return err;
        }
      }  

      }