import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { ProductReq } from './dto/product-req';

@Injectable()
export class ProductService {
  
    constructor(
        @InjectRepository(Product)
        private repo: Repository<Product>,
      ){}

      async createProduct(dto: ProductDto, isUpdate: boolean = false): Promise<CommonResponseModel> {
        try {
          const entity = new Product();
          entity.product = dto.product;
          entity.isActive = dto.isActive === undefined || dto.isActive === null ? true : dto.isActive;
      
          if (isUpdate) {
            entity.productId = dto.productId;
            entity.updatedUser = dto.updatedUser;
          } else {
            entity.createdUser = dto.createdUser;
          }
      
          const data = await this.repo.save(entity);
          return new CommonResponseModel(true, 1, 'Product created successfully', data);
        } catch (error) {
          return error
        }
      }
      
      
      

    async getAllProducts(): Promise<CommonResponseModel> {
      try {
        const data = await this.repo.find({order:{ product: "ASC"}})
        if(data.length > 0){
          return new CommonResponseModel(true, 1, 'Data retrieved successfully', data)
        }else{
          return new CommonResponseModel(false, 0, 'No data found',[])
        }
      } catch (err) {
        return err;
      }
    }  

    async getAllActiveProducts(): Promise<CommonResponseModel> {
      try {
        const data = await this.repo.find({where:{"isActive":true},order :{product:'ASC'}});
        if(data.length > 0){
          return new CommonResponseModel(true, 1, 'Data retrieved successfully', data)
        }else{
          return new CommonResponseModel(false, 0, 'No data found',[])
        }
      } catch (err) {
        return err;
      }
    }  

async activateOrDeactivateProduct(req:ProductReq): Promise<CommonResponseModel> {
  try {
      const data = await this.getProductById(req.productId);
      if (data) {
          if (!data) {
              throw new ErrorResponse(10113, 'Someone updated the current Product information. Refresh and try again');
          } else {
                  const productStatus =  await this.repo.update({ productId: req.productId },{ isActive: req.isActive,updatedUser: req.updatedUser });
                  if (data.isActive) {
                      if (productStatus.affected) {
                          const productResponse = new CommonResponseModel(true, 10115, 'Product is de-activated successfully');
                          return productResponse;
                      } else {
                          throw new CommonResponseModel(false,10111, 'Product is already deactivated');
                      }
                  } else {
                      if (productStatus.affected) {
                          const productResponse = new CommonResponseModel(true, 10114, 'Product is activated successfully');
                          return productResponse;
                      } else {
                          throw new CommonResponseModel(false,10112, 'Product is already  activated');
                      }
                  }
          }
      } else {
          throw new CommonResponseModel(false,99998, 'No Records Found');
      }
  } catch (err) {
      return err;
  }
}

async getProductById(productId: number): Promise<Product> {
      const Response = await this.repo.findOne({where: {productId: productId}});
     if (Response) {
      return Response;
      } else {
      return null;
      }
  }

}